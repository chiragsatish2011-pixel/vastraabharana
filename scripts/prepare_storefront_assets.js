const fs = require('fs');
const path = require('path');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

console.log('--- Preparing Storefront Assets ---');

// 1. Copy 3D Model
ensureDir('./storefront/public/models');
const glbSrc = './public/models/vastra_heritage_3d.glb';
const glbDest = './storefront/public/models/vastra_heritage_3d.glb';
if (fs.existsSync(glbSrc)) {
  fs.copyFileSync(glbSrc, glbDest);
  console.log('3D GLB Model copied to storefront/public/models/');
}

// 2. Copy Images
ensureDir('./storefront/public/images');
copyDir('./assets/images', './storefront/public/images');
console.log('Images copied to storefront/public/images/');

// 3. Curate Catalog from products_full_catalog.json
const rawProducts = JSON.parse(fs.readFileSync('./data/products_full_catalog.json', 'utf-8'));
console.log(`Processing ${rawProducts.length} raw products...`);

// Select representative items with images from each key category
const curated = [];
const seenTitles = new Set();

// Helper to determine combo or badge
function getBadge(p) {
  const title = p.title.toLowerCase();
  if (title.includes('buy 3') || title.includes('combo')) return 'COMBO SPECIAL';
  if (title.includes('mysore silk') || title.includes('pure silk')) return 'ROYAL SILK';
  if (title.includes('malchanderi') || title.includes('a - line') || title.includes('aline')) return 'TRENDING';
  if (title.includes('designer')) return 'EXCLUSIVE';
  return 'NEW DROP';
}

function getRating(p) {
  // deterministic high rating between 4.8 and 5.0
  const hash = p.id.toString().split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return (4.8 + (hash % 3) * 0.1).toFixed(1);
}

function getReviewsCount(p) {
  const hash = p.id.toString().split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return 12 + (hash % 85);
}

for (const p of rawProducts) {
  if (!p.images || p.images.length === 0) continue;
  if (seenTitles.has(p.title)) continue;
  seenTitles.add(p.title);

  const price = parseFloat(p.variants[0]?.price || '999');
  const compareAt = p.variants[0]?.compare_at_price ? parseFloat(p.variants[0].compare_at_price) : Math.round(price * 1.35);

  curated.push({
    id: p.id,
    title: p.title,
    handle: p.handle,
    type: p.product_type || 'Ethnic Wear',
    vendor: p.vendor,
    price: price,
    compareAtPrice: compareAt,
    discountPercent: Math.round(((compareAt - price) / compareAt) * 100),
    badge: getBadge(p),
    rating: getRating(p),
    reviewsCount: getReviewsCount(p),
    image: p.images[0].src,
    images: p.images.map(i => i.src).slice(0, 4),
    variants: p.variants.map(v => ({
      id: v.id,
      title: v.title,
      price: parseFloat(v.price),
      available: v.available !== false
    })),
    options: p.options || [{ name: 'Size', values: ['S', 'M', 'L', 'XL', '2XL', '3XL'] }],
    description: (p.body_html || 'Exquisite handcrafted ethnic attire from Vastra Abharana. Premium fabric with timeless elegance and comfort.').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 220) + '...'
  });
}

console.log(`Curated ${curated.length} high-quality products.`);

ensureDir('./storefront/src/data');
// Save top 120 curated items for ultra-responsive instant client search & filtering
fs.writeFileSync('./storefront/src/data/curated_products.json', JSON.stringify(curated.slice(0, 150), null, 2), 'utf-8');

// Also create collection metadata
const rawCollections = JSON.parse(fs.readFileSync('./data/collections.json', 'utf-8')).collections || [];
const featuredCollections = [
  {
    id: 'sarees',
    title: 'Mysore & Festive Sarees',
    subtitle: '780+ Handcrafted Drapes',
    handle: 'mysore-silk-collections',
    badge: 'ROYAL WEAVES',
    image: 'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_444fa1e0-b764-4e58-b542-fdb879a35a29.jpg?v=1792586379&width=800',
    description: 'Authentic Mysore silk and festive bridal weaves woven by master artisans.'
  },
  {
    id: 'salwars',
    title: 'Aarvi Pure Cotton & Suits',
    subtitle: '760+ Designer Ensembles',
    handle: 'wholesale-kurtis',
    badge: 'BESTSELLER',
    image: 'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_cdf39921-0cf7-43c8-aafa-0fda6d9cc775.png?v=1792586382&width=800',
    description: 'Soft Malchanderi, A-line silhouettes and pure cotton festive suits.'
  },
  {
    id: 'combos',
    title: 'Viral Combo Offers',
    subtitle: 'Buy 3 @ ₹1,200 & ₹1,400',
    handle: 'buy-3-at-1200',
    badge: 'MAX SAVINGS',
    image: 'https://vastraabharana.com/cdn/shop/files/rn-image_picker_lib_temp_1454070c-5207-40ea-8cd2-029258775d68.jpg?v=1792586379&width=800',
    description: 'Mix & match 3 premium ethnic sets for everyday luxury at unmissable prices.'
  },
  {
    id: 'blouses',
    title: 'Designer Blouses',
    subtitle: '100+ Zari & Maggam Work',
    handle: 'blouses',
    badge: 'HAND-EMBROIDERED',
    image: 'https://vastraabharana.com/cdn/shop/collections/Blouses.jpg?v=1767719872&width=800',
    description: 'Ready-to-wear and tailored blouses with intricate zari motifs.'
  },
  {
    id: 'jewellery',
    title: 'Temple Jewelry & Crystals',
    subtitle: '95+ Handpicked Ornaments',
    handle: 'jewellery-collection',
    badge: 'HERITAGE SHINE',
    image: 'https://vastraabharana.com/cdn/shop/files/IMG-20260329_135103_png.png?v=1774789653&width=800',
    description: 'Gold-plated ruby crystal necklaces, antique bangles, and bridal haras.'
  }
];

fs.writeFileSync('./storefront/src/data/featured_collections.json', JSON.stringify(featuredCollections, null, 2), 'utf-8');
console.log('Saved curated_products.json and featured_collections.json!');
