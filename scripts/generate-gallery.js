const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, '../public/gallery');
const files = fs.readdirSync(galleryDir);

const images = files
  .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
  .map(f => `/gallery/${f}`)
  .sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || "0");
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || "0");
    return numA - numB;
  });

const outputFilePath = path.join(__dirname, '../src/gallery-data.json');
fs.writeFileSync(outputFilePath, JSON.stringify(images, null, 2));

console.log(`Generated gallery-data.json with ${images.length} images.`);