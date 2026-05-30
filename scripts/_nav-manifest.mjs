// Shared reader so node-land scripts (check-nav, build-search-index) and the Astro
// runtime all agree on ONE structure source: src/lib/nav-structure.ts. Node can't import
// the .ts directly, so we parse its regular shape. The file is generated/edited in a fixed
// format ({ group: "...", pages: ['a', 'b'] }); check-nav guards against drift.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Returns { [collection]: Array<{ group: string, pages: string[] }> } in declared order.
export function readNavManifest() {
  const src = readFileSync(path.join(root, 'src', 'lib', 'nav-structure.ts'), 'utf8');
  const manifest = {};
  const colRe = /'([^']+)':\s*\[([\s\S]*?)\n {2}\],/g;
  let colMatch;
  while ((colMatch = colRe.exec(src)) !== null) {
    const groups = [];
    const grpRe = /\{\s*group:\s*"([^"]*)"\s*,\s*pages:\s*\[([^\]]*)\]\s*\}/g;
    let grpMatch;
    while ((grpMatch = grpRe.exec(colMatch[2])) !== null) {
      const pages = grpMatch[2]
        .split(',')
        .map((s) => s.trim().replace(/^'|'$/g, ''))
        .filter(Boolean);
      groups.push({ group: grpMatch[1], pages });
    }
    manifest[colMatch[1]] = groups;
  }
  return manifest;
}

// Flat lookup: { [collection]: Map<slug, { category, order }> } where category is the
// page's group label and order is its absolute position in the collection's reading order.
export function readNavLookup() {
  const manifest = readNavManifest();
  const lookup = {};
  for (const [collection, groups] of Object.entries(manifest)) {
    const map = new Map();
    let position = 0;
    for (const { group, pages } of groups) {
      for (const slug of pages) {
        map.set(slug, { category: group, order: position });
        position += 1;
      }
    }
    lookup[collection] = map;
  }
  return lookup;
}
