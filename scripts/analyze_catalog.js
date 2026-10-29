const fs = require('fs');

const products = JSON.parse(fs.readFileSync('./data/products_full_catalog.json', 'utf-8'));
const collections = JSON.parse(fs.readFileSync('./data/collections.json', 'utf-8'));

console.log(`Analyzing ${products.length} products...`);

let prices = [];
let vendors = {};
let types = {};
let tags = {};
let createdDates = [];
let totalVariants = 0;
let totalImages = 0;

for (const p of products) {
  vendors[p.vendor] = (vendors[p.vendor] || 0) + 1;
  const t = p.product_type || 'Uncategorized';
  types[t] = (types[t] || 0) + 1;

  for (const v of p.variants) {
    totalVariants++;
    const price = parseFloat(v.price);
    if (!isNaN(price)) prices.push(price);
  }

  totalImages += p.images ? p.images.length : 0;
  createdDates.push(p.created_at);

  if (p.tags) {
    const pTags = Array.isArray(p.tags) ? p.tags : p.tags.split(',').map(s => s.trim());
    for (const tag of pTags) {
      if (tag) tags[tag] = (tags[tag] || 0) + 1;
    }
  }
}

prices.sort((a, b) => a - b);
createdDates.sort();

const minPrice = prices[0];
const maxPrice = prices[prices.length - 1];
const medianPrice = prices[Math.floor(prices.length / 2)];
const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

const summary = {
  totalProducts: products.length,
  totalVariants,
  totalImages,
  priceRangeINR: {
    min: minPrice,
    max: maxPrice,
    median: medianPrice,
    average: avgPrice
  },
  earliestProductCreated: createdDates[0],
  latestProductCreated: createdDates[createdDates.length - 1],
  typesBreakdown: types,
  topVendors: vendors,
  topTags: Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 30),
  collectionsCount: collections.collections ? collections.collections.length : 0,
  collectionsList: collections.collections ? collections.collections.map(c => ({ id: c.id, title: c.title, handle: c.handle })) : []
};

fs.writeFileSync('./data/catalog_summary.json', JSON.stringify(summary, null, 2), 'utf-8');
console.log(JSON.stringify(summary, null, 2));
