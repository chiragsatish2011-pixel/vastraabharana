const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('./screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const brainDir = 'C:\\Users\\chira\\.gemini\\antigravity\\brain\\7d258d2e-307f-4236-ac6d-fc116759d5b2\\screenshots';
if (!fs.existsSync(brainDir)) fs.mkdirSync(brainDir, { recursive: true });

console.log('Taking screenshots of http://localhost:3000 ...');

// 1. Hero Viewport
const heroOut = path.join(outDir, 'screenshot_hero.png');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${heroOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000`, { stdio: 'inherit' });

// 2. Bento Grid Viewport
const bentoOut = path.join(outDir, 'slice_bento.png');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${bentoOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000/#collections`, { stdio: 'inherit' });

// 3. Catalog Viewport
const catalogOut = path.join(outDir, 'slice_catalog.png');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${catalogOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000/#catalog`, { stdio: 'inherit' });

// 4. Full Page
const fullOut = path.join(outDir, 'screenshot_full.png');
execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${fullOut}" --window-size=1440,3600 --virtual-time-budget=2500 http://localhost:3000`, { stdio: 'inherit' });

// Copy all to brainDir
fs.copyFileSync(heroOut, path.join(brainDir, 'screenshot_hero.png'));
fs.copyFileSync(bentoOut, path.join(brainDir, 'slice_bento.png'));
fs.copyFileSync(catalogOut, path.join(brainDir, 'slice_catalog.png'));
fs.copyFileSync(fullOut, path.join(brainDir, 'screenshot_full.png'));

console.log('Screenshots completed successfully!');
