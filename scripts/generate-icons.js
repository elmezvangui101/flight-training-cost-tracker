const fs = require('fs');
const path = require('path');

// Since we don't have image processing libraries, we'll copy the main icon
// for all sizes. In production, you'd want to properly resize these.

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = path.join(__dirname, '../public/icons/icon-1024x1024.png');

iconSizes.forEach(size => {
  const targetIcon = path.join(__dirname, `../public/icons/icon-${size}x${size}.png`);
  
  // Copy the main icon to all sizes
  fs.copyFileSync(sourceIcon, targetIcon);
  console.log(`Created icon-${size}x${size}.png`);
});

console.log('All PWA icons created successfully!');