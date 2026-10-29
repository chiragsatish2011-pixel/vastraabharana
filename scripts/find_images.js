const fs = require('fs');
const path = require('path');

function scanDir(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full, list);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(f)) {
      list.push({ path: full, name: f, size: stat.size });
    }
  }
  return list;
}

const root = 'c:\\Users\\chira\\OneDrive\\Documents\\VA Website\\assets\\images';
const all = scanDir(root);
console.log(`Found ${all.length} images`);
console.log('Top 20 images by size:');
all.sort((a,b) => b.size - a.size);
all.slice(0, 20).forEach(x => console.log(x.size, x.name, x.path));
