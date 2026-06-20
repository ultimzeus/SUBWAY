const fs = require('fs');
const jpeg = require('jpeg-js');
const PNG = require('pngjs').PNG;

function maskPizza(inputPath, outputPath) {
  console.log(`Masking ${inputPath}...`);
  try {
    const buffer = fs.readFileSync(inputPath);
    let width, height, data;

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
      data = rawImageData.data; // RGBA buffer
    } else {
      console.error("- Unsupported image format");
      return;
    }

    console.log(`- Image size: ${width}x${height}`);

    const cx = width * 0.485;
    const cy = height * 0.58;
    const rx = width * 0.29;
    const ry = height * 0.245;
    const feather = 0.05;

    const png = new PNG({ width, height });
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        
        const dx = (x - cx) / rx;
        const dy = (y - cy) / ry;
        const dist = dx * dx + dy * dy; // Distance squared in normalized ellipse coordinates
        
        let alpha = 255;
        if (dist > 1 + feather) {
          alpha = 0;
        } else if (dist > 1 - feather) {
          // Interpolate alpha
          const t = (dist - (1 - feather)) / (2 * feather);
          alpha = Math.max(0, Math.min(255, Math.round((1 - t) * 255)));
        }
        
        png.data[idx] = r;
        png.data[idx + 1] = g;
        png.data[idx + 2] = b;
        png.data[idx + 3] = alpha;
      }
    }

    const outBuffer = PNG.sync.write(png);
    fs.writeFileSync(outputPath, outBuffer);
    console.log(`- Saved masked PNG to ${outputPath}\n`);

  } catch (err) {
    console.error(`- Error processing image:`, err);
  }
}

maskPizza('d:/SITESEBYAIY/public/makloub_escalope_raw.png', 'd:/SITESEBYAIY/public/makloub_escalope_3d.png');
