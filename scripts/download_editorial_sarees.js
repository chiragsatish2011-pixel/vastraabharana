const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = 'c:\\Users\\chira\\OneDrive\\Documents\\VA Website\\storefront\\public\\images\\models';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high quality Indian ethnic wear & fashion model photographs
const images = [
  {
    name: 'model_hero_woman.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85' // Elegant Indian model draped in traditional silk saree
  },
  {
    name: 'model_saree_maroon.jpg',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85' // High fashion Indian bride / saree editorial
  },
  {
    name: 'model_saree_gold.jpg',
    url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85' // South Indian traditional saree & temple jewelry
  },
  {
    name: 'model_jewelry_detail.jpg',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85' // Close up luxury gold necklace jewelry
  },
  {
    name: 'model_editorial_duo.jpg',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85' // Editorial portrait
  },
  {
    name: 'model_fashion_pose.jpg',
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85' // High fashion model pose
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
        reject(new Error(`Failed with status ${res.statusCode}`));
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
    } catch (err) {
      console.error(`Error downloading ${img.name}:`, err.message);
    }
  }
}

run();
