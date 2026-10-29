const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('./screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log('Capturing verified screenshots...');

// 1. Hero
const heroOut = path.join(outDir, 'screenshot_hero.png');
execSync(`"${chrome}" --headless --disable-gpu --screenshot="${heroOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000`);

// 2. Bento
const bentoOut = path.join(outDir, 'slice_bento.png');
execSync(`"${chrome}" --headless --disable-gpu --screenshot="${bentoOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000/#collections`);

// 3. Welded 2026 Section
const archiveOut = path.join(outDir, 'screenshot_2026.png');
execSync(`"${chrome}" --headless --disable-gpu --screenshot="${archiveOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000`);

console.log('Done capturing screenshots!');
