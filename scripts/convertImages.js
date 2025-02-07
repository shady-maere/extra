const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertImages(directory) {
    try {
        const files = await fs.readdir(directory);
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = await fs.stat(filePath);
            
            if (stats.isDirectory()) {
                await convertImages(filePath);
            } else if (file.endsWith('.webp')) {
                const outputPath = filePath.replace('.webp', '.jpg');
                await sharp(filePath)
                    .jpeg({ quality: 90 })
                    .toFile(outputPath);
                console.log(`Converted ${file} to jpg`);
            }
        }
    } catch (error) {
        console.error('Error converting images:', error);
    }
}

// Convert images in the public/images directory
convertImages(path.join(__dirname, '../public/images'));
