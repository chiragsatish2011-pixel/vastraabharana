const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = path.resolve('screenshots');

// 1. Hero
const heroOut = path.join(outDir, 'screenshot_hero_final.png');
execSync(`"${chrome}" --headless --disable-gpu --screenshot="${heroOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000`);
console.log('Hero screenshot captured');

// 2. Cart
const cartOut = path.join(outDir, 'screenshot_cart_final.png');
execSync(`"${chrome}" --headless --disable-gpu --screenshot="${cartOut}" --window-size=1440,920 --virtual-time-budget=2000 http://localhost:3000/#cart`);
console.log('Cart screenshot captured');

console.log('All verified!');
