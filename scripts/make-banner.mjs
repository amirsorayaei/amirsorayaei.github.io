#!/usr/bin/env node
/**
 * Crop the brand band from a full-page capture of a company's public site.
 *
 * Usage: node scripts/make-banner.mjs <input.png> <output.png> [bandHeight]
 *
 * The band is the top strip: the wordmark and nav. Deliberately not the hero,
 * because company hero imagery is usually a photograph of a person and that is
 * not ours to republish as decoration on someone else's portfolio.
 */
import sharp from "sharp";

const [input, output, height = "132"] = process.argv.slice(2);
if (!input || !output) {
  console.error("usage: make-banner.mjs <input.png> <output.png> [height]");
  process.exit(1);
}

const band = Number(height);
const image = sharp(input);
const { width } = await image.metadata();

await image
  .extract({ left: 0, top: 0, width, height: band })
  .resize({ width: 1240 })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(output);

console.log(`${output}: ${width}x${band} band`);
