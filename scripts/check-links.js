// Internal link checker for the docs content collections.
//
// Why this exists: navigation and URLs are derived from file paths, and pages
// cross-link with absolute paths like `](/nomercy-video-player/hls)`. Markdown
// links are NOT validated at build time, so a moved or renamed page silently
// 404s every link that pointed at its old URL. This script makes that failure
// loud: it resolves every internal link against the set of real page URLs plus
// the redirect map in astro.config.mjs, and exits non-zero on any miss.
//
// Decoupling rule this enforces: when a page's URL must change, add ONE redirect
// entry (old -> new) instead of editing every referencing file. Reorganising the
// sidebar is done via frontmatter `category`/`order`, which never changes a URL.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');

const COLLECTIONS = [
  'nomercy-player-core',
  'nomercy-video-player',
  'nomercy-music-player',
  'nomercy-media-server',
  'nomercy-app-web',
  'nomercy-app-android',
  'nomercy-api',
];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (full.endsWith('.mdx') || full.endsWith('.md')) out.push(full);
  }
  return out;
}

// Collections whose served URL base differs from the folder/collection name.
const URL_BASE = {};

// Turn a content file path into the URL Astro serves it at.
// `<collection>/en/foo/bar.mdx` -> `/<urlBase>/foo/bar`; `index` -> root.
function urlFor(collection, file) {
  const base = URL_BASE[collection] ?? collection;
  let rel = path
    .relative(path.join(contentDir, collection), file)
    .replace(/\\/g, '/')
    .replace(/\.(mdx|md)$/, '');
  rel = rel.replace(/^[a-z]{2}\//, '').replace(/^[a-z]{2}$/, '');
  if (rel === 'index' || rel === '') return `/${base}`;
  return `/${base}/${rel.replace(/\/index$/, '')}`;
}

function frontmatterDraft(raw) {
  const match = raw.match(/^﻿?---\n([\s\S]*?)\n---/);
  return match ? /\bdraft:\s*true\b/.test(match[1]) : false;
}

// Pull redirect source keys out of astro.config.mjs (string keys of the
// `redirects` object). These are valid link targets even with no backing file.
function readRedirects() {
  const cfg = readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  const block = cfg.match(/redirects:\s*\{([\s\S]*?)\n {2}\},/);
  if (!block) return new Set();
  const keys = block[1].match(/"([^"]+)"\s*:/g) || [];
  return new Set(keys.map((key) => key.replace(/"/g, '').replace(/\s*:$/, '').replace(/\/$/, '')));
}

const valid = new Set();
const drafts = new Set();
const files = [];

for (const collection of COLLECTIONS) {
  const dir = path.join(contentDir, collection);
  let entries;
  try {
    entries = walk(dir);
  } catch {
    continue;
  }
  for (const file of entries) {
    files.push({ collection, file });
    const url = urlFor(collection, file);
    if (frontmatterDraft(readFileSync(file, 'utf8'))) drafts.add(url);
    else valid.add(url);
  }
}

const redirects = readRedirects();
const linkRe = /\]\((\/(?:nomercy-[a-z-]+)[^)\s#]*)(?:#[^)\s]*)?\)/g;

let broken = 0;
for (const { file } of files) {
  const raw = readFileSync(file, 'utf8');
  let match;
  while ((match = linkRe.exec(raw)) !== null) {
    const target = match[1].replace(/\/$/, '');
    if (valid.has(target) || redirects.has(target)) continue;
    const hint = drafts.has(target) ? ' (target is draft:true — excluded from build)' : '';
    console.error(`BROKEN  ${path.relative(root, file)}  ->  ${target}${hint}`);
    broken += 1;
  }
}

if (broken > 0) {
  console.error(`\n${broken} broken internal link(s). Fix the link, or add a redirect in astro.config.mjs.`);
  process.exit(1);
}
console.log(`Internal links OK (${valid.size} pages, ${redirects.size} redirects).`);
