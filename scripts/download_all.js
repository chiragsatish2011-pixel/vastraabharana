const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_URL = 'https://vastraabharana.com';
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath)) {
    const stats = fs.statSync(destPath);
    if (stats.size > 0) return true; // already downloaded
  }
  ensureDir(path.dirname(destPath));

  let fullUrl = url;
  if (fullUrl.startsWith('//')) fullUrl = 'https:' + fullUrl;
  else if (fullUrl.startsWith('/')) fullUrl = BASE_URL + fullUrl;

  try {
    const res = await fetch(fullUrl, { headers: HEADERS });
    if (!res.ok) {
      console.warn(`Failed ${res.status}: ${fullUrl}`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
    return true;
  } catch (err) {
    console.error(`Error downloading ${fullUrl}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('--- Starting Complete Site Asset Download ---');

  // 1. Download HTML Pages
  console.log('1. Downloading core HTML pages and agentic discovery...');
  const pagesToDownload = [
    { url: '/', file: 'html_pages/index.html' },
    { url: '/pages/contact', file: 'html_pages/contact.html' },
    { url: '/pages/about-us', file: 'html_pages/about-us.html' },
    { url: '/pages/terms-conditions', file: 'html_pages/terms-conditions.html' },
    { url: '/pages/privacy-policy', file: 'html_pages/privacy-policy.html' },
    { url: '/pages/returns-cancellations', file: 'html_pages/returns-cancellations.html' },
    { url: '/pages/shipping-policy', file: 'html_pages/shipping-policy.html' },
    { url: '/robots.txt', file: 'html_pages/robots.txt' },
    { url: '/sitemap.xml', file: 'html_pages/sitemap.xml' },
    { url: '/agents.md', file: 'html_pages/agents.md' },
    { url: '/.well-known/ucp', file: 'data/ucp_profile.json' }
  ];

  for (const p of pagesToDownload) {
    console.log(`Downloading ${p.url} -> ${p.file}`);
    await downloadFile(p.url, path.join(__dirname, '..', p.file));
  }

  // 2. Read deep_analysis.json for CSS and JS
  const deep = JSON.parse(fs.readFileSync('./extracted_raw/deep_analysis.json', 'utf-8'));
  const homeHtml = fs.readFileSync('./extracted_raw/home.html', 'utf-8');

  // 3. Download all CSS files
  console.log('2. Downloading all CSS stylesheets...');
  const cssList = deep.cdnAssetsSummary.distinctCss;
  console.log(`Found ${cssList.length} CSS stylesheets.`);
  for (const c of cssList) {
    let cleanName = path.basename(c.split('?')[0]);
    if (!cleanName.endsWith('.css')) cleanName += '.css';
    const dest = path.join(__dirname, '..', 'css', cleanName);
    console.log(`Downloading CSS: ${cleanName}`);
    await downloadFile(c, dest);
  }

  // 4. Download all JS files
  console.log('3. Downloading all JS scripts...');
  const jsList = deep.cdnAssetsSummary.distinctJs;
  console.log(`Found ${jsList.length} JS scripts.`);
  for (const j of jsList) {
    let cleanName = path.basename(j.split('?')[0]);
    if (!cleanName.endsWith('.js')) cleanName += '.js';
    const dest = path.join(__dirname, '..', 'js', cleanName);
    console.log(`Downloading JS: ${cleanName}`);
    await downloadFile(j, dest);
  }

  // 5. Download Fonts
  console.log('4. Downloading web fonts...');
  for (const f of deep.cdnAssetsSummary.distinctFonts) {
    const fName = path.basename(f.split('?')[0]);
    const dest = path.join(__dirname, '..', 'assets', 'fonts', fName);
    console.log(`Downloading Font: ${fName}`);
    await downloadFile(f, dest);
  }

  // 6. Download Banners & Core Images
  console.log('5. Downloading Banners, Logos & Section Images...');
  const bannerImages = [
    'https://vastraabharana.com/cdn/shop/files/ChatGPT_Image_Sep_24__2026__12_39_12_PM-removebg-preview.png?v=1790234522&width=1000',
    'https://vastraabharana.com/cdn/shop/files/i1.png?v=1784977074&width=3840',
    'https://vastraabharana.com/cdn/shop/files/2e3a56cf-bab6-4aba-8e08-56579b60940d.png?v=1784975435&width=3840',
    'https://vastraabharana.com/cdn/shop/files/WhatsApp_Image_2025-12-16_at_7.24.46_PM.jpg?v=1766993228&width=3840',
    'https://vastraabharana.com/cdn/shop/files/Colorful_Modern_Social_Media_Banner_1000_x_1000_px.png?v=1765043421&width=3840',
    'https://vastraabharana.com/cdn/shop/files/Colorful_Modern_Social_Media_Banner_1000_x_1000_mm_d8a88a9f-a40d-49e6-8178-63f8203625dd.png?v=1765043747&width=3840',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_24bce767-db64-4b4a-95ff-501aad89711d.jpg?v=1764679530&width=3200',
    'https://vastraabharana.com/cdn/shop/files/saris-and-lenghas-natural-2-top.jpg?v=1746501246&width=1500',
    'https://vastraabharana.com/cdn/shop/files/IMG-20260329_135103_png.png?v=1774789653&width=1000'
  ];

  for (const b of bannerImages) {
    const bName = path.basename(b.split('?')[0]);
    const dest = path.join(__dirname, '..', 'assets', 'images', 'banners', bName);
    console.log(`Downloading Banner: ${bName}`);
    await downloadFile(b, dest);
  }

  // 7. Download Collection Images
  console.log('6. Downloading Collection category images...');
  const collImages = [
    'https://vastraabharana.com/cdn/shop/collections/Blouses.jpg?v=1767719872&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/IMG-20250519_144629.jpg?v=1767685385&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/rn-image_picker_lib_temp_42763c5e-dea8-45a1-abb2-4f06cc4c56b2.png?v=1772433037&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/rn-image_picker_lib_temp_0f4260e0-47c0-4e53-80ec-f41ac2984758.jpg?v=1768653333&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/rn-image_picker_lib_temp_18896c4d-fe3d-4f21-a663-07295a5dfb7e.jpg?v=1786624716&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/rn-image_picker_lib_temp_bad7f380-5656-4d72-bf27-c7e3fb671dfa.png?v=1772612602&width=1500',
    'https://vastraabharana.com/cdn/shop/collections/rn-image_picker_lib_temp_2218bc09-f33e-45d2-a454-d02c1bd0e992.png?v=1773393991&width=1500'
  ];

  for (const c of collImages) {
    const cName = path.basename(c.split('?')[0]);
    const dest = path.join(__dirname, '..', 'assets', 'images', 'collections', cName);
    console.log(`Downloading Collection Image: ${cName}`);
    await downloadFile(c, dest);
  }

  // 8. Download Featured Product Images
  console.log('7. Downloading Featured Product Images...');
  const featuredProductImgs = [
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_444fa1e0-b764-4e58-b542-fdb879a35a29.jpg?v=1792586379&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_cdf39921-0cf7-43c8-aafa-0fda6d9cc775.png?v=1792586382&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_1454070c-5207-40ea-8cd2-029258775d68.jpg?v=1792586379&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_ec938fb9-467a-4d02-80c8-838e799c6ae6.png?v=1792586381&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_b0a1ddf6-7363-4956-bce8-039d044ac218.jpg?v=1792586379&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_1770e1a0-9a51-4503-932d-b9d840b01ab3.png?v=1792586381&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_eeb28a93-29da-4761-b276-926f3b1ec715.jpg?v=1792586379&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_000daa21-43d1-4b16-8d13-1f6556e7385c.png?v=1792586381&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_a58bef01-9fca-43c9-bf2c-08cb3c383560.jpg?v=1792586379&width=1000',
    'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_826c89bf-56c1-4169-8ab2-b2134bca6b06.jpg?v=1792586378&width=1000'
  ];

  for (const p of featuredProductImgs) {
    const pName = path.basename(p.split('?')[0]);
    const dest = path.join(__dirname, '..', 'assets', 'images', 'products', pName);
    console.log(`Downloading Product Image: ${pName}`);
    await downloadFile(p, dest);
  }

  // 9. Download Favicon and SVG icons
  console.log('8. Extracting SVGs and icons from home...');
  const svgs = [...homeHtml.matchAll(/<svg[^>]*>([\s\S]*?)<\/svg>/gi)].map(m => m[0]);
  ensureDir(path.join(__dirname, '..', 'assets', 'icons'));
  svgs.forEach((svg, idx) => {
    fs.writeFileSync(path.join(__dirname, '..', 'assets', 'icons', `icon_${idx + 1}.svg`), svg, 'utf-8');
  });
  console.log(`Saved ${svgs.length} SVG icons to assets/icons/`);

  // 10. Save Full Catalog & Metadata
  console.log('9. Saving product catalog and metadata to data/...');
  ensureDir(path.join(__dirname, '..', 'data'));
  
  // Download full products (all pages)
  let allProducts = [];
  let page = 1;
  while (true) {
    try {
      const res = await fetch(`${BASE_URL}/products.json?limit=250&page=${page}`, { headers: HEADERS });
      const pJson = await res.json();
      if (!pJson.products || pJson.products.length === 0) break;
      allProducts.push(...pJson.products);
      if (pJson.products.length < 250) break;
      page++;
    } catch (e) {
      break;
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'data', 'products_full_catalog.json'), JSON.stringify(allProducts, null, 2), 'utf-8');
  console.log(`Full catalog saved: ${allProducts.length} products.`);

  // Download collections
  const collRes = await fetch(`${BASE_URL}/collections.json`, { headers: HEADERS });
  const collJson = await collRes.json();
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'collections.json'), JSON.stringify(collJson, null, 2), 'utf-8');

  // Save CSS tokens
  fs.writeFileSync(path.join(__dirname, '..', 'data', 'css_design_tokens.json'), JSON.stringify(deep.allCssVariables, null, 2), 'utf-8');

  console.log('--- Download Complete! ---');
}

run().catch(console.error);
