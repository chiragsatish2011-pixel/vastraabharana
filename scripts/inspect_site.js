const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vastraabharana.com';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
};

async function fetchText(url) {
  const res = await fetch(url, { headers: HEADERS });
  return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text: await res.text() };
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  return await res.json();
}

async function main() {
  console.log('Fetching homepage...');
  const home = await fetchText(BASE_URL + '/');
  
  // Save raw homepage
  fs.mkdirSync('./extracted_raw', { recursive: true });
  fs.writeFileSync('./extracted_raw/home.html', home.text, 'utf-8');
  fs.writeFileSync('./extracted_raw/home_headers.json', JSON.stringify(home.headers, null, 2), 'utf-8');

  console.log('Homepage saved, length:', home.text.length);

  // Extract meta tags
  const titleMatch = home.text.match(/<title>([^<]*)<\/title>/i);
  const metaTags = [];
  const metaRegex = /<meta\s+([^>]+)>/gi;
  let match;
  while ((match = metaRegex.exec(home.text)) !== null) {
    metaTags.push(match[1]);
  }

  // Extract Shopify Theme details
  const shopifyObjMatch = home.text.match(/var Shopify = Shopify \|\| {};[\s\S]*?(?=<\/script>)/i);
  const shopifyThemeMatch = home.text.match(/Shopify\.theme\s*=\s*({[^}]+})/i);
  const shopifyShopMatch = home.text.match(/Shopify\.shop\s*=\s*["']([^"']+)["']/i);

  // Extract CSS
  const cssLinks = [];
  const linkRegex = /<link\s+([^>]+)>/gi;
  while ((match = linkRegex.exec(home.text)) !== null) {
    const tag = match[1];
    if (tag.includes('rel="stylesheet"') || tag.includes("rel='stylesheet'") || tag.includes('as="style"')) {
      const href = tag.match(/href=["']([^"']+)["']/i);
      if (href) cssLinks.push(href[1]);
    }
  }

  // Extract JS Scripts
  const scripts = [];
  const scriptRegex = /<script\s+([^>]+)>/gi;
  while ((match = scriptRegex.exec(home.text)) !== null) {
    const tag = match[1];
    const src = tag.match(/src=["']([^"']+)["']/i);
    if (src) scripts.push(src[1]);
  }

  // Extract inline scripts summary
  const inlineScripts = [...home.text.matchAll(/<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m => m[1]);

  // Extract Images
  const imgRegex = /<img\s+([^>]+)>/gi;
  const images = [];
  while ((match = imgRegex.exec(home.text)) !== null) {
    const tag = match[1];
    const src = tag.match(/src=["']([^"']+)["']/i);
    const srcset = tag.match(/srcset=["']([^"']+)["']/i);
    const alt = tag.match(/alt=["']([^"']*)["']/i);
    images.push({
      src: src ? src[1] : null,
      srcset: srcset ? srcset[1] : null,
      alt: alt ? alt[1] : null
    });
  }

  // Extract CSS background images and URLs from HTML
  const urlRegex = /url\(["']?([^"')]+)["']?\)/gi;
  const cssUrls = [];
  while ((match = urlRegex.exec(home.text)) !== null) {
    cssUrls.push(match[1]);
  }

  // Search for analytics / trackers (Facebook Pixel, GA, TikTok, etc.)
  const trackers = {
    googleAnalytics: /G-[A-Z0-9]+|UA-[0-9]+-[0-9]+/i.test(home.text) ? home.text.match(/(?:G-[A-Z0-9]+|UA-[0-9]+-[0-9]+)/gi) : [],
    googleTagManager: /GTM-[A-Z0-9]+/i.test(home.text) ? home.text.match(/GTM-[A-Z0-9]+/gi) : [],
    facebookPixel: /fbq\(|fbevents\.js|connect\.facebook\.net/i.test(home.text),
    facebookPixelIds: [...home.text.matchAll(/fbq\(['"]init['"],\s*['"]([0-9]+)['"]\)/gi)].map(m => m[1]),
    shopifyAnalytics: home.text.includes('ShopifyAnalytics'),
    omegaInstagram: home.text.includes('omega') || home.text.includes('instagram-tiktok-feed')
  };

  // Inspect Products catalog
  console.log('Fetching products list...');
  let allProducts = [];
  let page = 1;
  while (true) {
    const pJson = await fetchJson(`${BASE_URL}/products.json?limit=250&page=${page}`);
    if (!pJson || !pJson.products || pJson.products.length === 0) break;
    allProducts.push(...pJson.products);
    console.log(`Fetched page ${page}: ${pJson.products.length} products (total: ${allProducts.length})`);
    if (pJson.products.length < 250) break;
    page++;
  }

  // Inspect Collections
  console.log('Fetching collections list...');
  const collectionsJson = await fetchJson(`${BASE_URL}/collections.json`);

  const report = {
    title: titleMatch ? titleMatch[1] : null,
    theme: shopifyThemeMatch ? shopifyThemeMatch[1] : null,
    shop: shopifyShopMatch ? shopifyShopMatch[1] : null,
    metaTagsCount: metaTags.length,
    cssLinksCount: cssLinks.length,
    cssLinks: [...new Set(cssLinks)],
    scriptsCount: scripts.length,
    scripts: [...new Set(scripts)],
    imagesCount: images.length,
    imagesSample: images.slice(0, 10),
    trackers,
    totalProducts: allProducts.length,
    productTypes: [...new Set(allProducts.map(p => p.product_type).filter(Boolean))],
    vendors: [...new Set(allProducts.map(p => p.vendor).filter(Boolean))],
    collectionsCount: collectionsJson ? collectionsJson.collections.length : 0,
    collections: collectionsJson ? collectionsJson.collections.map(c => ({ id: c.id, title: c.title, handle: c.handle })) : []
  };

  fs.writeFileSync('./extracted_raw/initial_report.json', JSON.stringify(report, null, 2), 'utf-8');
  console.log('Report saved to extracted_raw/initial_report.json');
  console.log('Summary:', JSON.stringify({
    title: report.title,
    theme: report.theme,
    shop: report.shop,
    cssCount: report.cssLinksCount,
    scriptsCount: report.scriptsCount,
    trackers: report.trackers,
    totalProducts: report.totalProducts,
    productTypes: report.productTypes,
    collectionsCount: report.collectionsCount
  }, null, 2));
}

main().catch(err => console.error(err));
