// Records the first and last line of every `:::snippet{... lines="..."}` range
// in src/examples/snippet-ranges.lock.json. The snippet plugin fails the build
// when a range's lines no longer match, so an edit to an example file can never
// quietly shift what a page shows. Run this after checking the page shows the
// right lines: `npm run snippets:lock`.
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src', 'content');
const examplesDir = path.join(root, 'src', 'examples');
const lockPath = path.join(examplesDir, 'snippet-ranges.lock.json');

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.mdx') ? [full] : [];
  });
}

const lock = {};
let ranges = 0;
for (const page of walk(contentDir)) {
  const text = readFileSync(page, 'utf8');
  for (const m of text.matchAll(/^:::snippet\{file="([^"]+)"[^}]*\blines="([^"]+)"[^}]*\}/gm)) {
    const [, file, spec] = m;
    const example = ['ts', 'tsx'].map((ext) => path.join(examplesDir, `${file}.${ext}`)).find(existsSync);
    if (!example) throw new Error(`${path.relative(root, page)}: no example file "${file}".`);
    const lines = readFileSync(example, 'utf8').split('\n');
    for (const part of spec.split(',')) {
      const r = /^\s*(\d+)\s*(?:-\s*(\d+))?\s*$/.exec(part);
      if (!r) throw new Error(`${path.relative(root, page)}: "${part}" in lines="${spec}" is not a line or a range.`);
      const start = Number(r[1]);
      const end = Number(r[2] ?? r[1]);
      if (end < start || end > lines.length) throw new Error(`${path.relative(root, page)}: range ${part} does not fit ${file} (${lines.length} lines).`);
      const first = lines[start - 1].trim();
      const last = lines[end - 1].trim();
      // An empty first or last line is almost always a mis-counted number.
      if (!first || !last) throw new Error(`${path.relative(root, page)}: range ${part} of ${file} starts or ends on an empty line.`);
      lock[`${file}:${start}-${end}`] = { first, last };
      // Printed so the author sees what each range really holds before trusting it.
      console.log(`  ${file}:${start}-${end}  ${first}${end > start ? `  …  ${last}` : ''}`);
      ranges++;
    }
  }
}

const sorted = Object.fromEntries(Object.entries(lock).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(lockPath, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`snippet-ranges.lock.json: ${ranges} range(s) recorded.`);
