const fs = require('fs');
const jpeg = require('jpeg-js');
const PNG = require('pngjs').PNG;

function processImage(inputPath, outputPath) {
  console.log(`Processing ${inputPath}...`);
  
  try {
    const buffer = fs.readFileSync(inputPath);
    let width, height, data;

    // Detect format
    if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
      console.log("- Format detected: PNG");
      const png = PNG.sync.read(buffer);
      width = png.width;
      height = png.height;
      data = png.data;
    } else if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      console.log("- Format detected: JPEG");
      const rawImageData = jpeg.decode(buffer, { useTascii: false, colorTransform: true });
      width = rawImageData.width;
      height = rawImageData.height;
      data = rawImageData.data;
    } else {
      console.error("- Unsupported image format");
      return;
    }

    console.log(`- Image size: ${width}x${height}`);

    // Flood fill queue
    const queue = [];
    const visited = new Uint8Array(width * height);

    // Add corners to queue
    const corners = [
      { x: 0, y: 0 },
      { x: width - 1, y: 0 },
      { x: 0, y: height - 1 },
      { x: width - 1, y: height - 1 }
    ];

    for (const corner of corners) {
      const idx = corner.y * width + corner.x;
      queue.push(corner);
      visited[idx] = 1;
    }

    let removedCount = 0;

    while (queue.length > 0) {
      const { x, y } = queue.shift();
      const idx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      // Check if this pixel is background (white, light grey, checkerboard, or black)
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const isNeutral = (max - min) < 35; // low saturation
      const isLight = min > 45; // lower threshold to catch dark grey checkerboard squares
      const isDark = max < 50; // dark/black background

      const isBg = ((isNeutral && isLight) || isDark);

      // If it looks like background, traverse its neighbors
      if (isBg) {
        if (a > 0) {
          data[idx + 3] = 0; // set alpha to 0 (transparent)
          removedCount++;
        }

        // Add neighbors
        const neighbors = [
          { x: x + 1, y },
          { x: x - 1, y },
          { x, y: y + 1 },
          { x, y: y - 1 }
        ];

        for (const n of neighbors) {
          if (n.x >= 0 && n.x < width && n.y >= 0 && n.y < height) {
            const nIdx = n.y * width + n.x;
            if (visited[nIdx] === 0) {
              visited[nIdx] = 1;
              queue.push(n);
            }
          }
        }
      }
    }

    console.log(`- Removed ${removedCount} background pixels.`);

    // Create a new PNG from the raw image data
    const png = new PNG({ width, height });
    png.data = data;

    const outBuffer = PNG.sync.write(png);
    fs.writeFileSync(outputPath, outBuffer);
    console.log(`- Saved transparent PNG to ${outputPath}\n`);

  } catch (err) {
    console.error(`- Error processing image ${inputPath}:`, err);
  }
}

// Process the assets
processImage('D:/SITESEBYAIY/public/hero-sub.png', 'D:/SITESEBYAIY/public/hero-sub.png');
processImage('D:/SITESEBYAIY/public/combo.png', 'D:/SITESEBYAIY/public/combo.png');
processImage('D:/SITESEBYAIY/public/pizza.png', 'D:/SITESEBYAIY/public/pizza.png');
processImage('D:/SITESEBYAIY/public/burger.png', 'D:/SITESEBYAIY/public/burger.png');
processImage('D:/SITESEBYAIY/public/chicken-wings.png', 'D:/SITESEBYAIY/public/chicken-wings.png');
processImage('D:/SITESEBYAIY/public/pizza_3d.png', 'D:/SITESEBYAIY/public/pizza_3d.png');
processImage('D:/SITESEBYAIY/public/ojja_3d.png', 'D:/SITESEBYAIY/public/ojja_3d.png');
processImage('D:/SITESEBYAIY/public/makloub_3d.png', 'D:/SITESEBYAIY/public/makloub_3d.png');
processImage('D:/SITESEBYAIY/public/baguette_farcie_3d.png', 'D:/SITESEBYAIY/public/baguette_farcie_3d.png');
processImage('D:/SITESEBYAIY/public/spaghetti_3d.png', 'D:/SITESEBYAIY/public/spaghetti_3d.png');
processImage('D:/SITESEBYAIY/public/tacos_3d.png', 'D:/SITESEBYAIY/public/tacos_3d.png');
processImage('D:/SITESEBYAIY/public/boisson_3d.png', 'D:/SITESEBYAIY/public/boisson_3d.png');
processImage('D:/SITESEBYAIY/public/frites_3d.png', 'D:/SITESEBYAIY/public/frites_3d.png');
processImage('D:/SITESEBYAIY/public/pizza_fruits_de_mer_3d.png', 'D:/SITESEBYAIY/public/pizza_fruits_de_mer_3d.png');

