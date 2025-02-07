const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const generatePlaceholder = (width, height, text, bgColor = '#f0f0f0', textColor = '#333333') => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = textColor;
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  return canvas.toBuffer();
};

const products = [
  { path: 'speakers/jbl-flip-essential.jpg', text: 'JBL Flip Essential' },
  { path: 'phones/iphone-14-pro-max.jpg', text: 'iPhone 14 Pro Max' },
  { path: 'phones/samsung-s23-ultra.jpg', text: 'Samsung S23 Ultra' },
  { path: 'fashion/mens/nike-airmax-270.jpg', text: 'Nike Air Max 270' },
  { path: 'accessories/fossil-gen6.jpg', text: 'Fossil Gen 6' },
];

const baseDir = path.join(__dirname, '..', 'public', 'images', 'products');

products.forEach(product => {
  const filePath = path.join(baseDir, product.path);
  const dirPath = path.dirname(filePath);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Generate and save placeholder image
  const imageBuffer = generatePlaceholder(400, 400, product.text);
  fs.writeFileSync(filePath, imageBuffer);
  console.log(`Generated placeholder: ${product.path}`);
});
