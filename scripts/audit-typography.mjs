#!/usr/bin/env node
/**
 * Typographic audit against the rendered page.
 *
 * Complements the impeccable detector: it reports measure, all-caps runs,
 * leading and tap targets per element, so a finding points at the thing to fix
 * rather than at a colour pair.
 *
 * Note: it measures each element's own box, so a wide flex container that wraps
 * correctly inside can read as a long line. Trust the innermost text element.
 *
 * Usage: node scripts/audit-typography.mjs [url] (dev server must be running)
 */
import puppeteer from 'puppeteer';
const b = await puppeteer.launch({headless:'new'});
const p = await b.newPage();
await p.setViewport({width:1440,height:900});
const url = process.argv[2] || 'http://localhost:3000';
await p.goto(url, {waitUntil:'networkidle0'});
const out = await p.evaluate(() => {
  const res = {long:[], caps:[], tight:[], tap:[]};
  for (const el of document.querySelectorAll('p,li,dd,dt,span,h1,h2,h3,figcaption,a')) {
    const cs = getComputedStyle(el);
    const txt = (el.innerText||'').trim();
    if (!txt || el.children.length > 2) continue;
    const w = el.getBoundingClientRect().width;
    const fs = parseFloat(cs.fontSize);
    const approxChars = w / (fs * 0.5);
    if (txt.length > 60 && approxChars > 80) {
      res.long.push({tag:el.tagName, cls:el.className.toString().slice(0,70), chars:Math.round(approxChars), txt:txt.slice(0,60)});
    }
    if (cs.textTransform === 'uppercase' && txt.length > 30) {
      res.caps.push({cls:el.className.toString().slice(0,60), len:txt.length, txt:txt.slice(0,70)});
    }
    const lh = parseFloat(cs.lineHeight)/fs;
    if (lh < 1.3 && txt.length > 40 && el.getClientRects().length > 1) {
      res.tight.push({cls:el.className.toString().slice(0,60), lh:lh.toFixed(2), txt:txt.slice(0,50)});
    }
  }
  for (const el of document.querySelectorAll('a,button')) {
    const r = el.getBoundingClientRect();
    if (r.width && r.height && (r.height < 24 || r.width < 24)) {
      res.tap.push({tag:el.tagName, h:Math.round(r.height), w:Math.round(r.width), txt:(el.innerText||'').trim().slice(0,40)});
    }
  }
  return res;
});
for (const [k,v] of Object.entries(out)) {
  console.log(`\n### ${k} (${v.length})`);
  const seen=new Set();
  for (const x of v) { const key=JSON.stringify(x).slice(0,90); if(seen.has(key))continue; seen.add(key); console.log('  ', JSON.stringify(x)); }
}
await b.close();
