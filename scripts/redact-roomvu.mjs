#!/usr/bin/env node
/**
 * Redact the agents' phone numbers from Roomvu's product image.
 *
 * The image is Roomvu's own published marketing asset, but the phone mockups
 * inside it carry real agents' direct numbers. Those are fine on Roomvu's own
 * site and are not ours to re-publish on someone else's portfolio, so each
 * number is blurred before the image ships.
 *
 * Boxes are in source-image pixels (1024x576).
 *
 * Two passes on purpose. sharp applies composite AFTER resize, so compositing
 * and resizing in one chain would place these patches in resized coordinates
 * and miss every number. The redaction is baked at native size first, then the
 * flattened result is resized.
 */
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = process.argv[3];

/** [left, top, width, height] around each visible phone number. */
const BOXES = [
  [88, 489, 62, 18], // Kat Miller
  [282, 471, 60, 24], // Mathan Markandu, direct line and licence number
  [485, 471, 60, 18], // Carolina Aguiar
  [650, 452, 60, 18], // Steven Thomas
  [901, 441, 62, 18], // Chase Rackley
];

const patches = await Promise.all(
  BOXES.map(async ([left, top, width, height]) => ({
    input: await sharp(SRC)
      .extract({ left, top, width, height })
      .blur(9)
      .toBuffer(),
    left,
    top,
  })),
);

// Pass one: bake the redactions at the source's own scale.
const redacted = await sharp(SRC).composite(patches).png().toBuffer();

// Pass two: only now resize to the size the page ships.
await sharp(redacted)
  .resize(1400, 788, { fit: "cover", position: "top" })
  .webp({ quality: 86 })
  .toFile(OUT);

console.log(`${OUT}: ${BOXES.length} numbers redacted`);
