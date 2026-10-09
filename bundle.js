const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

// Replace CSS link with inline style
let bundled = html.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${css}\n</style>`);

// Replace JS script tag with inline script
bundled = bundled.replace('<script src="app.js"></script>', `<script>\n${js}\n</script>`);

fs.writeFileSync('model3.html', bundled, 'utf8');
console.log('model3.html bundled successfully, size:', bundled.length);

const downloadPath = 'C:\\Users\\Nihal\\Downloads\\Fertilizer Traceability - Model 3.html';
fs.writeFileSync(downloadPath, bundled, 'utf8');
console.log('Saved to Downloads successfully at:', downloadPath);
