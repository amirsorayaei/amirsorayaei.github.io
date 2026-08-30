#!/usr/bin/env node
/**
 * Claim validator.
 *
 * Two jobs, both of which fail the build:
 *
 *   1. Provenance. Every record in src/content/claims.ts must carry an id, an
 *      evidence class, display wording, and a source. A claim nobody can trace
 *      is not a claim, it is a rumour.
 *
 *   2. Denylist. Certain claims have been permanently retired because they were
 *      unsourced, causally overstated, or in one case invented outright. They
 *      must never reappear in shipped content, whoever writes it and however
 *      good it would look.
 *
 * Authority: resume-source/MASTER-RESUME-EVIDENCE.md, "Claims permanently retired".
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "src", "content");
const SCAN_DIRS = [join(ROOT, "src")];
const SCAN_EXT = new Set([".ts", ".tsx", ".md", ".mdx"]);

/** Retired claims. Each entry: [pattern, why it is retired]. */
const DENYLIST = [
  [/\b34\s?%/, "A.P.P legacy page-load claim with no defined baseline"],
  [/\b60\s?%/, "A.P.P legacy deployment-time claim, contradicted by Amir"],
  [/\b25\s?%\s+increase\s+in\s+user\s+engagement/i, "A.P.P legacy engagement claim"],
  [/\b40\s?%\s+(fewer|reduction)/i, "Hoomaan bug-reduction claim, admitted invented"],
  [/\b50\s?%.{0,40}(one[- ]tap|google one)/i, "Roomvu Google One-Tap claim has no measurement"],
  [/\b1\s?M\+?\s+(active\s+)?users/i, "Unreconciled with the 400K paid figure"],
  [/built\s+the\s+entire\s+platform\s+from\s+scratch/i, "Levita apps existed and were incomplete"],
  [/\bfour\s+apps\b/i, "Levita retired phrasing, the product has more portals"],
  [/\bseven\s+languages\b|\b7\s+languages\b/i, "Levita retired claim, three active locales"],
  [/\b24\s+specialties\b/i, "Levita retired claim"],
  [/\bHIPAA\b/i, "No compliance certification or audit has been verified"],
  [/\bGDPR\b/i, "No compliance certification or audit has been verified"],
  [/\b(99|100)(\.\d+)?\s?%\s*uptime/i, "No uptime record exists"],
  [/ready\s+to\s+certify/i, "Retired cloud-certification claim"],
  [/\bproven\s+track\s+record\b/i, "Banned phrasing"],
  [/\bpassionate\s+about\b/i, "Banned phrasing"],
  [/\bspearheaded\b/i, "Banned phrasing"],
  [/\bleverag(e|ed|ing)\b/i, "Banned phrasing"],
  [/\bworld[- ]class\b/i, "Banned phrasing"],
  [/\benterprise[- ]grade\b/i, "Banned phrasing"],
  [/\bdeep\s+expertise\b/i, "Banned phrasing"],
];

/** Em-dashes are Amir's standing objection and the fastest AI tell. */
const EM_DASH = /—/;

const errors = [];
const scanned = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (SCAN_EXT.has(extname(full))) scanned.push(full);
  }
}
SCAN_DIRS.forEach(walk);

// --- 1. provenance -------------------------------------------------------
const claimsSrc = readFileSync(join(CONTENT, "claims.ts"), "utf8");

// Each record literal must carry all four required fields.
const records = claimsSrc.match(/\{\s*\n\s*id:\s*"[^"]+"[\s\S]*?\n\s{2}\}/g) ?? [];
if (records.length === 0) {
  errors.push("claims.ts: no claim records found. The validator cannot be a no-op.");
}
for (const record of records) {
  const id = record.match(/id:\s*"([^"]+)"/)?.[1] ?? "(unknown)";
  for (const field of ["evidence", "display", "source"]) {
    if (!new RegExp(`\\b${field}:`).test(record)) {
      errors.push(`claims.ts: claim "${id}" is missing a ${field} field.`);
    }
  }
  const evidence = record.match(/evidence:\s*"([^"]+)"/)?.[1];
  const allowed = ["confirmed", "approximate", "team_scale", "code_supported"];
  if (evidence && !allowed.includes(evidence)) {
    errors.push(`claims.ts: claim "${id}" has unknown evidence class "${evidence}".`);
  }
}

// --- 2. denylist and em-dashes across all shipped content ----------------
for (const file of scanned) {
  const text = readFileSync(file, "utf8");
  const rel = file.slice(ROOT.length + 1);

  for (const [pattern, why] of DENYLIST) {
    const hit = text.match(pattern);
    if (hit) {
      // The denylist file describes the patterns, so it is allowed to contain them.
      if (rel.startsWith("scripts/")) continue;
      errors.push(`${rel}: retired claim "${hit[0]}" (${why}).`);
    }
  }

  if (EM_DASH.test(text)) {
    const line = text.split("\n").findIndex((l) => EM_DASH.test(l)) + 1;
    errors.push(`${rel}:${line}: em-dash. Amir's standing preference is none.`);
  }
}

// --- report ---------------------------------------------------------------
if (errors.length > 0) {
  console.error("\nClaim validation failed:\n");
  for (const e of errors) console.error(`  ${e}`);
  console.error(
    `\n${errors.length} problem${errors.length === 1 ? "" : "s"}. ` +
      "Nothing ships that cannot be defended in an interview.\n",
  );
  process.exit(1);
}

console.log(
  `Claims OK. ${records.length} records carry provenance, ` +
    `${scanned.length} files clear of retired claims.`,
);
