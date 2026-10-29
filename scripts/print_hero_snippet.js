const fs = require('fs');

const html = fs.readFileSync('c:/Users/chira/OneDrive/Documents/VA Website/data/materia_home.html', 'utf8');

const start = 445000;
const end = 453000;
console.log('=== HERO HTML SNIPPET ===');
console.log(html.substring(start, end));
