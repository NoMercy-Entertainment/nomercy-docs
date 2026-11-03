import { readFileSync, readdirSync } from 'node:fs';

const search = readFileSync('scripts/build-search-index.js', 'utf8');
const collections = readdirSync('src/content', { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'pages')
  .map((entry) => entry.name);
const missing = collections.filter((name) => !search.includes(`product: '${name}'`));
if (missing.length) {
  console.error(`Search index omits collections: ${missing.join(', ')}`);
  process.exitCode = 1;
}

if (!process.exitCode) console.log(`Content coverage: ${collections.length} collections indexed`);
