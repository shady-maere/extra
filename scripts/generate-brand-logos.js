const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const brands = [
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Apple', color: '#000000' },
  { name: 'Sony', color: '#000000' },
  { name: 'LG', color: '#A50034' },
  { name: 'JBL', color: '#FF0000' },
  { name: 'Bose', color: '#000000' }
];

const brandsDir = path.join(__dirname, '../public/images/brands');

// Create brands directory if it doesn't exist
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// Create a placeholder logo for each brand
brands.forEach(brand => {
  const canvas = createCanvas(200, 100);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 200, 100);

  // Add brand name
  ctx.fillStyle = brand.color;
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(brand.name, 100, 50);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(brandsDir, `${brand.name.toLowerCase()}.png`), buffer);
});

console.log('Brand logos generated successfully!');
