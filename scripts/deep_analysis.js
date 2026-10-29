const fs = require('fs');

async function analyze() {
  const html = fs.readFileSync('./extracted_raw/home.html', 'utf-8');

  // Extract CSS variables from <style> tags
  const styleTags = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]);
  const rootVars = {};
  for (const style of styleTags) {
    const rootMatches = style.match(/:root\s*\{([\s\S]*?)\}/g);
    if (rootMatches) {
      for (const rm of rootMatches) {
        const varMatches = [...rm.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)];
        for (const [_, k, v] of varMatches) {
          rootVars[k.trim()] = v.trim();
        }
      }
    }
  }

  // Extract fonts
  const fontFaces = [];
  for (const style of styleTags) {
    const fonts = [...style.matchAll(/@font-face\s*\{([\s\S]*?)\}/gi)];
    for (const f of fonts) {
      fontFaces.push(f[1].replace(/\s+/g, ' ').trim());
    }
  }

  // Extract Announcement bar
  const announcement = html.match(/class="[^"]*announcement-bar[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[0];
  const announcementText = announcement ? announcement.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : 'None';

  // Extract Social links
  const socialLinks = [...html.matchAll(/href="(https?:\/\/(?:www\.)?(?:instagram\.com|facebook\.com|youtube\.com|wa\.me|api\.whatsapp\.com|pinterest\.com|twitter\.com|x\.com)[^"]*)"/gi)].map(m => m[1]);

  // Extract contact info (phone, email, whatsapp)
  const phoneMatches = [...html.matchAll(/(?:\+?91[-\s]?)?[6-9]\d{9}/g)].map(m => m[0]);
  const emailMatches = [...html.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)].map(m => m[0]);
  const telLinks = [...html.matchAll(/href="tel:([^"]+)"/gi)].map(m => m[1]);
  const mailtoLinks = [...html.matchAll(/href="mailto:([^"]+)"/gi)].map(m => m[1]);

  // Extract Payment icons/badges
  const paymentIcons = [...html.matchAll(/class="[^"]*payment[^"]*"[\s\S]*?<\/ul>/gi)];
  const paymentSVGs = [...html.matchAll(/<svg[^>]*aria-labelledby="pi-([^"]+)"/gi)].map(m => m[1]);

  // Extract Navigation menu items
  const navMatches = [...html.matchAll(/<nav[^>]*>([\s\S]*?)<\/nav>/gi)];

  // Extract all distinct assets (images, stylesheets, scripts)
  const allImages = [...html.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  const allSrcsets = [...html.matchAll(/srcset="([^">]+)"/gi)].map(m => m[1]);
  
  // Extract all CDN URLs
  const cdnUrls = [...html.matchAll(/(?:https?:)?\/\/(?:vastraabharana\.com\/cdn\/|cdn\.shopify\.com\/)[^\s"'><)]+/gi)].map(m => m[0]);

  // Categorize CDN URLs
  const cdnCategorized = {
    css: cdnUrls.filter(u => u.includes('.css')),
    js: cdnUrls.filter(u => u.includes('.js')),
    images: cdnUrls.filter(u => /\.(jpg|jpeg|png|webp|gif|svg|avif)(\?|$)/i.test(u)),
    fonts: cdnUrls.filter(u => /\.(woff|woff2|ttf|eot)(\?|$)/i.test(u)),
    others: cdnUrls.filter(u => !/\.(css|js|jpg|jpeg|png|webp|gif|svg|avif|woff|woff2|ttf|eot)(\?|$)/i.test(u))
  };

  const results = {
    announcementText,
    socialLinks: [...new Set(socialLinks)],
    contactInfo: {
      phoneNumbers: [...new Set([...phoneMatches, ...telLinks])],
      emails: [...new Set([...emailMatches, ...mailtoLinks])]
    },
    paymentMethods: [...new Set(paymentSVGs)],
    fontFacesCount: fontFaces.length,
    sampleFontFaces: fontFaces.slice(0, 5),
    cssVariablesCount: Object.keys(rootVars).length,
    sampleCssVariables: Object.fromEntries(Object.entries(rootVars).slice(0, 30)),
    allCssVariables: rootVars,
    cdnAssetsSummary: {
      totalCdnUrls: cdnUrls.length,
      distinctCss: [...new Set(cdnCategorized.css)],
      distinctJs: [...new Set(cdnCategorized.js)],
      distinctImagesCount: [...new Set(cdnCategorized.images)].length,
      distinctImagesSample: [...new Set(cdnCategorized.images)].slice(0, 25),
      distinctFonts: [...new Set(cdnCategorized.fonts)]
    }
  };

  fs.writeFileSync('./extracted_raw/deep_analysis.json', JSON.stringify(results, null, 2), 'utf-8');
  console.log('Deep analysis written to extracted_raw/deep_analysis.json');
  console.log('Announcement:', announcementText);
  console.log('Socials:', results.socialLinks);
  console.log('Contacts:', results.contactInfo);
  console.log('Payment Badges:', results.paymentMethods);
  console.log('CSS Variables found:', Object.keys(rootVars).length);
  console.log('CSS files:', results.cdnAssetsSummary.distinctCss.length);
  console.log('JS files:', results.cdnAssetsSummary.distinctJs.length);
  console.log('Distinct Images:', results.cdnAssetsSummary.distinctImagesCount);
  console.log('Fonts:', results.cdnAssetsSummary.distinctFonts);
}

analyze().catch(console.error);
