const fs = require('fs');

const html = fs.readFileSync('./extracted_raw/home.html', 'utf-8');

// Match sections and their image sources
const sectionRegex = /id="shopify-section-([^"]+)"[\s\S]*?(?=(?:id="shopify-section-|$))/gi;
let match;
const sectionImages = [];

while ((match = sectionRegex.exec(html)) !== null) {
  const sectionId = match[1];
  const sectionContent = match[0];
  
  const imgs = [...sectionContent.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
  const headings = [...sectionContent.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  
  sectionImages.push({
    sectionId,
    headings,
    imageCount: imgs.length,
    images: imgs.slice(0, 10)
  });
}

console.log(JSON.stringify(sectionImages, null, 2));
