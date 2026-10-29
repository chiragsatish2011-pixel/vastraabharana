const fs = require('fs');

const html = fs.readFileSync('./extracted_raw/home.html', 'utf-8');

// Find all Shopify sections
const sections = [...html.matchAll(/id="shopify-section-([^"]+)"\s+class="shopify-section\s*([^"]*)"/gi)].map(m => ({
  id: m[1],
  classes: m[2]
}));

console.log('Total Shopify sections on Homepage:', sections.length);
sections.forEach((s, idx) => {
  console.log(`${idx + 1}. [${s.id}] (classes: ${s.classes})`);
});

// Check header, announcement, navigation
const headerSection = html.match(/<header[^>]*>([\s\S]*?)<\/header>/i)?.[0] || '';
console.log('\n--- Header Navigation Links ---');
const navLinks = [...headerSection.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
  .map(m => ({
    url: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim()
  }))
  .filter(l => l.text && !l.text.startsWith('http') && !l.url.startsWith('#'));

const uniqueNav = [];
const seenUrls = new Set();
for (const l of navLinks) {
  if (!seenUrls.has(l.url + ':' + l.text)) {
    seenUrls.add(l.url + ':' + l.text);
    uniqueNav.push(l);
  }
}
uniqueNav.forEach(l => console.log(`- ${l.text} -> ${l.url}`));

// Check footer links
const footerSection = html.match(/<footer[^>]*>([\s\S]*?)<\/footer>/i)?.[0] || '';
console.log('\n--- Footer Links ---');
const footerLinks = [...footerSection.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
  .map(m => ({
    url: m[1],
    text: m[2].replace(/<[^>]+>/g, '').trim()
  }))
  .filter(l => l.text && !l.url.startsWith('#'));

const uniqueFooter = [];
const seenFooter = new Set();
for (const l of footerLinks) {
  if (!seenFooter.has(l.url + ':' + l.text)) {
    seenFooter.add(l.url + ':' + l.text);
    uniqueFooter.push(l);
  }
}
uniqueFooter.forEach(l => console.log(`- ${l.text} -> ${l.url}`));
