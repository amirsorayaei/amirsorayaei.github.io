#!/usr/bin/env node
/**
 * Turns the GitHub Pages export into a redirect to Vercel.
 *
 * amirsorayaei.github.io is the address already shared on LinkedIn, but Vercel
 * Web Analytics only counts pages Vercel serves. So every HTML page in out/ is
 * replaced with a stub that forwards to the same path, query and hash on
 * Vercel, where the visit is counted. 404.html does the same for any path
 * Pages does not know, so old links still land somewhere real.
 *
 * Each stub keeps the original page's title, description and Open Graph tags,
 * so a link to github.io still previews properly where crawlers do not follow
 * redirects. Everything that is not HTML (the resume PDF, the OG images) stays
 * in place, so direct file links keep working.
 *
 * Runs after `next build`, in the Pages workflow only.
 *
 * Usage: node scripts/redirect-pages.mjs
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
const TARGET = "https://amirsorayaei-github-io.vercel.app";

/** Every .html file under dir, recursively. */
async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name);
      if (e.isDirectory()) return htmlFiles(path);
      return e.name.endsWith(".html") ? [path] : [];
    }),
  );
  return nested.flat();
}

/** The public path a file is served at, matching `trailingSlash: true`. */
function servedPath(file) {
  const rel = relative(OUT, file).split(sep).join("/");
  if (rel === "404.html") return null;
  if (rel === "index.html") return "/";
  return "/" + rel.replace(/index\.html$/, "");
}

/** The head tags worth keeping for link previews. */
function previewTags(html) {
  const tags = html.match(
    /<title>[^<]*<\/title>|<meta (?:name|property)="(?:description|og:[^"]+|twitter:[^"]+)"[^>]*>/g,
  );
  return (tags ?? []).join("\n");
}

const stub = (path, tags) => {
  const fallback = TARGET + (path ?? "/");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
${path ? `<link rel="canonical" href="${fallback}">` : ""}
<meta http-equiv="refresh" content="0; url=${fallback}">
${tags}
<script>location.replace(${JSON.stringify(TARGET)} + location.pathname + location.search + location.hash);</script>
</head>
<body>
<p>Moved to <a href="${fallback}">${fallback}</a>.</p>
</body>
</html>
`;
};

const files = await htmlFiles(OUT);
for (const file of files) {
  const html = await readFile(file, "utf8");
  await writeFile(file, stub(servedPath(file), previewTags(html)));
}
console.log(`${files.length} pages now redirect to ${TARGET}`);
