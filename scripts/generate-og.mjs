#!/usr/bin/env node
/**
 * Build-time Open Graph cards.
 *
 * Rendered in the site's own world rather than drawn separately: same ferro
 * blue ground, same ruled sheet, same Archivo, same survey orange used only
 * where it means something. A share card that looks like a different brand
 * than the page it opens is a broken promise before the visitor arrives.
 *
 * Static export has no runtime, so these are produced ahead of time and shipped
 * as files. They are committed, and Next copies public/ into the export, so the
 * deploy never needs a browser. Run this by hand when the copy changes.
 *
 * Reads the compiled font, so run `next build` first.
 *
 * Usage: npm run og
 */
import { readdir, readFile, mkdir, cp, access } from "node:fs/promises";
import { join } from "node:path";
import puppeteer from "puppeteer";

const OUT_DIR = "public/og";
const W = 1200;
const H = 630;

// The compiled Archivo file, so the card is set in the same face as the site.
const mediaDir = "out/_next/static/media";
const files = await readdir(mediaDir);
const fontFile = files.find((f) => f.endsWith(".woff2"));
if (!fontFile) {
  console.error("No compiled font found. Run `npm run build` first.");
  process.exit(1);
}
const fontData = await readFile(join(mediaDir, fontFile));
const fontUri = `data:font/woff2;base64,${fontData.toString("base64")}`;

/** Cards to produce. `eyebrow` is a field label, not a marketing kicker. */
const CARDS = [
  {
    file: "default.png",
    eyebrow: "Senior Full-Stack Developer",
    title: "I build the product, then I find out if it worked.",
    foot: "amirsorayaei.com",
  },
  {
    file: "levita-health.png",
    eyebrow: "Levita Health · 2025 to 2026",
    title: "Taking over a half-built telemedicine platform",
    foot: "amirsorayaei.com/work/levita-health",
  },
  {
    file: "roomvu.png",
    eyebrow: "Roomvu · 2023 to 2025",
    title: "The page people visited and did not subscribe from",
    foot: "amirsorayaei.com/work/roomvu",
  },
  {
    file: "top-menu.png",
    eyebrow: "A.P.P Software Solutions · 2020 to 2023",
    title: "A 4MB bundle and 400 restaurants",
    foot: "amirsorayaei.com/work/top-menu",
  },
  {
    file: "ecatalog.png",
    eyebrow: "A.P.P Software Solutions · 2020 to 2023",
    title: "Setting the architecture, then handing it over",
    foot: "amirsorayaei.com/work/ecatalog",
  },
  {
    file: "resume.png",
    eyebrow: "Amir Sorayaei",
    title: "Seven years, four companies, every number sourced.",
    foot: "amirsorayaei.com/resume",
  },
];

const card = ({ eyebrow, title, foot }) => `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: "Archivo";
    src: url("${fontUri}") format("woff2");
    font-weight: 100 900;
    font-stretch: 62% 125%;
    font-display: block;
  }
  * { margin: 0; box-sizing: border-box; }
  body {
    width: ${W}px; height: ${H}px;
    background: oklch(0.276 0.073 253);
    color: oklch(0.945 0.014 242);
    font-family: Archivo, sans-serif;
    font-variant-numeric: tabular-nums;
    display: flex; flex-direction: column; justify-content: space-between;
    padding: 68px 76px;
    position: relative; overflow: hidden;
  }
  /* the ruled sheet, same two frequencies as the site */
  body::before {
    content: ""; position: absolute; inset: 0;
    background-image:
      linear-gradient(to right, oklch(0.792 0.036 244 / 17%) 1px, transparent 1px),
      linear-gradient(to bottom, oklch(0.792 0.036 244 / 17%) 1px, transparent 1px),
      linear-gradient(to right, oklch(0.792 0.036 244 / 10%) 1px, transparent 1px),
      linear-gradient(to bottom, oklch(0.792 0.036 244 / 10%) 1px, transparent 1px);
    background-size: 80px 80px, 80px 80px, 10px 10px, 10px 10px;
    -webkit-mask-image: radial-gradient(ellipse 120% 95% at 50% 0%, black 0%, transparent 78%);
  }
  .row { position: relative; display: flex; align-items: baseline; justify-content: space-between; gap: 32px; }
  .label {
    font-stretch: 82%; font-weight: 500; letter-spacing: 0.14em;
    text-transform: uppercase; font-size: 17px;
    color: oklch(0.788 0.035 245);
  }
  h1 {
    position: relative;
    font-size: 66px; font-weight: 600; line-height: 1.02;
    letter-spacing: -0.038em; max-width: 17ch;
  }
  /* the measure: a hairline with tick extensions, as everywhere on the site */
  .measure { position: relative; height: 1px; background: oklch(0.792 0.036 244 / 30%); margin-bottom: 30px; }
  .measure::before, .measure::after {
    content: ""; position: absolute; top: -5px; width: 1px; height: 11px;
    background: oklch(0.606 0.052 250);
  }
  .measure::before { left: 0; }
  .measure::after { right: 0; }
  .dot { width: 11px; height: 11px; border-radius: 50%; background: oklch(0.735 0.166 53); }
</style>
<body>
  <div class="row">
    <span class="label">${eyebrow}</span>
    <span class="dot"></span>
  </div>
  <h1>${title}</h1>
  <div>
    <div class="measure"></div>
    <div class="row">
      <span class="label">${foot}</span>
      <span class="label">Amir Sorayaei</span>
    </div>
  </div>
</body>`;

await mkdir(OUT_DIR, { recursive: true });
const browser = await puppeteer.launch({
  headless: "new",
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });

for (const c of CARDS) {
  await page.setContent(card(c), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT_DIR, c.file) });
  console.log(`${OUT_DIR}/${c.file}`);
}

await browser.close();

// The export has already been written by this point, so mirror the cards into
// it rather than forcing a second full build.
try {
  await access("out");
  await cp(OUT_DIR, "out/og", { recursive: true });
  console.log("mirrored into out/og");
} catch {
  // no export yet; the next build will pick them up from public/
}
