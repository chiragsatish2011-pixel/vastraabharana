const fs = require('fs');

const html = fs.readFileSync('./data/materia_home.html', 'utf-8');

const heroSection = html.match(/id="shopify-section-template--30438572392793__hero_section_pro_qqh7EY"[\s\S]*?(?=<div id="shopify-section-template--30438572392793__waves_divider)/i)?.[0] || '';

console.log('Hero section length:', heroSection.length);

// Extract classes, styles, scripts inside hero
const classes = [...heroSection.matchAll(/class="([^"]+)"/g)].map(m => m[1]);
console.log('Unique classes in hero:', [...new Set(classes.flatMap(c => c.split(' ')))].slice(0, 30));

// Extract text and headings
const headings = [...heroSection.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings in hero:', headings);

// Extract image URLs in hero
const imgs = [...heroSection.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(m => m[1]);
console.log('Images in hero:', imgs);

// Look for inline script or data attributes
const dataAttrs = [...heroSection.matchAll(/data-[a-zA-Z0-9-]+="([^"]*)"/g)].map(m => m[0]);
console.log('Data attrs in hero:', dataAttrs.slice(0, 15));

// Check CSS rules for hero
const heroStyles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).filter(s => s.includes('hero_section_pro') || s.includes('break') || s.includes('mold'));
console.log('Hero style rules count:', heroStyles.length);
if (heroStyles.length > 0) {
  console.log('Hero style snippet:', heroStyles[0].slice(0, 1000));
}
