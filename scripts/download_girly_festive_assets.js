const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\chira\\OneDrive\\Documents\\VA Website\\storefront\\public\\images\\festive';
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const images = [
  {
    name: 'marigold_jasmine_garland.jpg',
    url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85' // Festive marigold & yellow floral petals
  },
  {
    name: 'model_yellow_saree_flowers.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85' // Indian model in silk saree with traditional look
  },
  {
    name: 'temple_jhumka_gold.jpg',
    url: 'https://images.unsplash.com/photo-1611591475870-07e868848d7c?auto=format&fit=crop&w=800&q=85' // Indian gold jhumka earrings
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, item.name);
    const file = fs.createWriteStream(dest);
    https.get(item.url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, redirectedRes => {
          redirectedRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      } else {
        reject(new Error(`Status ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    try {
      console.log(`Downloading ${img.name}...`);
      await download(img);
      console.log(`Saved ${img.name}`);
    } catch (e) {
      console.log(`Skipped ${img.name}:`, e.message);
    }
  }
}

run();
