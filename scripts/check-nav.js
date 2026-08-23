// Navigation manifest checker.
//
// The sidebar structure lives in src/lib/nav-structure.ts (the single source of truth).
// This guards the two ways that manifest can drift from reality:
//   1. a non-draft content page that no manifest group lists  -> it would fall into "Other"
//   2. a manifest slug that has no matching content file       -> a phantom sidebar entry
//   3. the same slug listed twice in a collection              -> duplicate sidebar entry
// Any of these fails the build, so adding a page forces a one-line manifest edit instead
// of silently disappearing or 404ing.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { readNavManifest } from './_nav-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src', 'content');

const COLLECTIONS = [
  'nomercy-media-server',
  'nomercy-app-web',
  'nomercy-player-core',
  'nomercy-video-player',
  'nomercy-music-player',
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

function slugOf(collection, file) {
  let rel = path.relative(path.join(contentDir, collection), file).split(path.sep).join('/');
  return rel.replace(/\.(mdx|md)$/, '').replace(/^[a-z]{2}\//, '').replace(/^[a-z]{2}$/, '');
}

function isDraft(raw) {
  const fm = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  return fm ? /\bdraft:\s*true\b/.test(fm[1]) : false;
}

// Flatten the shared manifest to { collection: [slug, ...] } in declared order.
const manifestGroups = readNavManifest();
const manifest = Object.fromEntries(
  Object.entries(manifestGroups).map(([collection, groups]) => [
    collection,
    groups.flatMap((group) => group.pages),
  ])
);
let problems = 0;

for (const collection of COLLECTIONS) {
  const dir = path.join(contentDir, collection);
  let files;
  try {
    files = walk(dir);
  } catch {
    continue;
  }

  const eligible = new Set();
  for (const file of files) {
    if (isDraft(readFileSync(file, 'utf8'))) continue;
    const slug = slugOf(collection, file);
    if (slug === '' || slug === 'index' || slug.endsWith('/index')) continue;
    eligible.add(slug);
  }

  const listed = manifest[collection] ?? [];
  const listedSet = new Set();

  for (const slug of listed) {
    if (listedSet.has(slug)) {
      console.error(`DUPLICATE  ${collection}: '${slug}' listed more than once in nav-structure.ts`);
      problems += 1;
    }
    listedSet.add(slug);
    if (!eligible.has(slug)) {
      console.error(`PHANTOM    ${collection}: '${slug}' is in nav-structure.ts but has no content file (or is draft)`);
      problems += 1;
    }
  }

  for (const slug of eligible) {
    if (!listedSet.has(slug)) {
      console.error(`UNLISTED   ${collection}: '${slug}' exists but is not in nav-structure.ts (would fall into "Other")`);
      problems += 1;
    }
  }
}

if (problems > 0) {
  console.error(`\n${problems} navigation problem(s). Edit src/lib/nav-structure.ts to resolve.`);
  process.exit(1);
}
console.log('Navigation manifest OK — every page is placed exactly once.');
