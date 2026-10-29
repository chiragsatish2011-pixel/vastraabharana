const fs = require('fs');
const path = require('path');

const src = 'c:/Users/chira/OneDrive/Documents/VA Website/data/materia_tshirt.webp';
const dst = 'c:/Users/chira/OneDrive/Documents/VA Website/storefront/public/images/materia_tshirt.webp';

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dst);
  console.log('Copied materia_tshirt.webp to storefront public images:', fs.statSync(dst).size);
}

const srcBg = 'c:/Users/chira/OneDrive/Documents/VA Website/data/materia_hero_bg.png';
const dstBg = 'c:/Users/chira/OneDrive/Documents/VA Website/storefront/public/images/materia_hero_bg.png';
if (fs.existsSync(srcBg)) {
  fs.copyFileSync(srcBg, dstBg);
  console.log('Copied materia_hero_bg.png to storefront public images:', fs.statSync(dstBg).size);
}
