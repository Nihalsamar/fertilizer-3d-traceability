const fs = require('fs');
const path = require('path');

// 1. Bundle Farm-to-Fork Spatial UI Model
const farmHtml = fs.readFileSync('index.html', 'utf8');
const farmCss = fs.readFileSync('styles.css', 'utf8');
const farmJs = fs.readFileSync('app.js', 'utf8');

let farmBundled = farmHtml.replace('<link rel="stylesheet" href="styles.css">', `<style>\n${farmCss}\n</style>`);
farmBundled = farmBundled.replace('<script src="app.js"></script>', `<script>\n${farmJs}\n</script>`);

fs.writeFileSync('model3.html', farmBundled, 'utf8');
console.log('model3.html (Spatial Farm-to-Fork) bundled successfully, size:', farmBundled.length);

const farmDownloadPath = 'C:\\Users\\Nihal\\Downloads\\Farm to Fork Traceability - Spatial Model.html';
fs.writeFileSync(farmDownloadPath, farmBundled, 'utf8');
console.log('Saved Farm-to-Fork to Downloads at:', farmDownloadPath);

// 2. Bundle Fertilizer Model 3 (Safe Backup)
if (fs.existsSync('fertilizer.html')) {
  const fertHtml = fs.readFileSync('fertilizer.html', 'utf8');
  const fertCss = fs.readFileSync('fertilizer_styles.css', 'utf8');
  const fertJs = fs.readFileSync('fertilizer_app.js', 'utf8');

  let fertBundled = fertHtml.replace('<link rel="stylesheet" href="fertilizer_styles.css">', `<style>\n${fertCss}\n</style>`);
  fertBundled = fertBundled.replace('<script src="fertilizer_app.js"></script>', `<script>\n${fertJs}\n</script>`);

  fs.writeFileSync('fertilizer_standalone.html', fertBundled, 'utf8');
  const fertDownloadPath = 'C:\\Users\\Nihal\\Downloads\\Fertilizer Traceability - Model 3.html';
  fs.writeFileSync(fertDownloadPath, fertBundled, 'utf8');
  console.log('Saved Safe Fertilizer Model 3 to Downloads at:', fertDownloadPath);
}

