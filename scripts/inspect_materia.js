const fs = require('fs');

const path = 'c:/Users/chira/OneDrive/Documents/VA Website/data/materia_home.html';
if (!fs.existsSync(path)) {
  console.log('File does not exist:', path);
  process.exit(1);
}

const html = fs.readFileSync(path, 'utf8');
console.log('HTML size:', html.length);

// Search for hero or BREAK or MOLD
const terms = ['BREAK', 'MOLD', 'FOR THE CULTURE', 'hero', 'materia'];
for (const t of terms) {
  let idx = 0;
  let count = 0;
  while ((idx = html.indexOf(t, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`\nMatch for "${t}" at ${idx}:`);
      console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 350)));
    }
    idx += t.length;
  }
  console.log(`Total matches for "${t}": ${count}`);
}
