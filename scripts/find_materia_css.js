const fs = require('fs');

const html = fs.readFileSync('c:/Users/chira/OneDrive/Documents/VA Website/data/materia_home.html', 'utf8');

function findCss(selector) {
  const re = new RegExp(selector + '\\s*\\{[^\\}]+\\}', 'g');
  const matches = html.match(re);
  console.log(`CSS for ${selector}:`, matches ? matches.slice(0, 3) : 'None');
}

findCss('\\.hero-title');
findCss('\\.image-over-text');
findCss('\\.cta-button');
findCss('\\.announcement-bar');
