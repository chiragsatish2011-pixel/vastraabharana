const fs = require('fs');
const path = require('path');

const urls = [
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/1000380342.jpg?v=1793170387', name: 'saree_lavender.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/1000380351.jpg?v=1793170125', name: 'saree_rani_pink.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/rn-image_picker_lib_temp_ed62dbca-8ac2-4d2f-873a-38dd5527db27.jpg?v=1792669335', name: 'saree_soft_silk.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/rn-image_picker_lib_temp_b2a54ff8-0ed0-49d0-a144-451af53f05cc.jpg?v=1792669335', name: 'saree_bottle_green.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/1000380347.jpg?v=1793170247', name: 'saree_peacock_blue.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0616/4778/2117/files/1000380348.jpg?v=1793170216', name: 'saree_mustard_yellow.jpg' }
];

async function downloadModels() {
  const dir = './storefront/public/images/models';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const item of urls) {
    console.log(`Downloading ${item.name}...`);
    try {
      const res = await fetch(item.url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(dir, item.name), buffer);
        console.log(`Saved ${item.name} (${buffer.length} bytes)`);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}

downloadModels();
