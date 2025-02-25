const fs = require('fs');
const path = require('path');
const { faviconData } = require('../src/assets/images/favicon');

// Function to convert base64 to buffer
function base64ToBuffer(base64) {
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = base64.split(',')[1];
  return Buffer.from(base64Data, 'base64');
}

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate favicon.ico
const favicon16Buffer = base64ToBuffer(faviconData.favicon16);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), favicon16Buffer);
console.log('favicon.ico generated successfully');

// Generate logo192.png
const favicon32Buffer = base64ToBuffer(faviconData.favicon32);
fs.writeFileSync(path.join(publicDir, 'logo192.png'), favicon32Buffer);
console.log('logo192.png generated successfully');

// Generate logo512.png (using the same image for now)
fs.writeFileSync(path.join(publicDir, 'logo512.png'), favicon32Buffer);
console.log('logo512.png generated successfully');

console.log('All favicon assets generated successfully!'); 