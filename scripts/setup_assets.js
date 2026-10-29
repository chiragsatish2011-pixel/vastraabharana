const fs = require('fs');
const path = require('path');

const publicDir = 'c:\\Users\\chira\\OneDrive\\Documents\\VA Website\\storefront\\public\\images';
const modelsDir = path.join(publicDir, 'models');

if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

// Copy cutout to root images dir if needed
const srcCutout = path.join(modelsDir, 'hero_model_cutout_clean.png');
const dstCutout = path.join(publicDir, 'hero_saree_model_cutout.png');
if (fs.existsSync(srcCutout)) {
  fs.copyFileSync(srcCutout, dstCutout);
  console.log('Copied hero cutout to:', dstCutout);
}

// Copy saris_banner into models if not already there
const srcBanner = path.join(publicDir, 'saris_banner.jpg');
const dstBanner = path.join(modelsDir, 'saris_banner.jpg');
if (fs.existsSync(srcBanner) && !fs.existsSync(dstBanner)) {
  fs.copyFileSync(srcBanner, dstBanner);
  console.log('Copied saris banner to models dir');
}

console.log('Available models:');
fs.readdirSync(modelsDir).forEach(f => {
  const stat = fs.statSync(path.join(modelsDir, f));
  console.log(` - ${f} (${Math.round(stat.size / 1024)} KB)`);
});
