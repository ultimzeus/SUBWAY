const fs = require('fs');
const PNG = require('pngjs').PNG;

function cleanLogo(inputPath, outputPath) {
  console.log(`Processing ${inputPath}...`);
  try {
    const buffer = fs.readFileSync(inputPath);
    const png = PNG.sync.read(buffer);
    const { width, height, data } = png;

    const queue = [];
    const visited = new Uint8Array(width * height);

    // Initial seeds (corners)
    const seeds = [
      { x: 0, y: 0 },
      { x: width - 1, y: 0 },
      { x: 0, y: height - 1 },
      { x: width - 1, y: height - 1 }
    ];

    // Add seeds inside the loops of B and A if we can find them.
    // Let's also add seeds along the top, bottom, left and right edges to be thorough.
    for (let x = 0; x < width; x++) {
      seeds.push({ x, y: 0 });
      seeds.push({ x, y: height - 1 });
    }
    for (let y = 0; y < height; y++) {
      seeds.push({ x: 0, y });
      seeds.push({ x: width - 1, y });
    }

    for (const seed of seeds) {
      const idx = seed.y * width + seed.x;
      if (visited[idx] === 0) {
        queue.push(seed);
        visited[idx] = 1;
      }
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
      const isNeutral = (max - min) < 45; // slightly higher tolerance for compression artifacts
      const isLight = min > 80;
      const isDark = max < 40;

      const isBg = ((isNeutral && isLight) || isDark);

      if (isBg) {
        if (a > 0) {
          data[idx + 3] = 0; // set alpha to 0
          removedCount++;
        }

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

    // Write output
    const outBuffer = PNG.sync.write(png);
    fs.writeFileSync(outputPath, outBuffer);
    console.log(`- Saved cleaned image to ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
}

cleanLogo('d:/SITESEBYAIY/public/subway_logo.png', 'd:/SITESEBYAIY/public/subway_logo.png');
