import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src/content');

async function pages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return pages(full);
    return entry.isFile() && entry.name.endsWith('.mdx') ? [full] : [];
  }));
  return nested.flat();
}

const files = (await pages(root)).sort();
const stubs = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) continue;
  const [, frontmatter, body] = match;
  const draft = /^draft:\s*true\s*$/m.test(frontmatter);
  const marker = /\b(stub|placeholder|drafted out)\b/i.test(body);
  if (draft && marker) stubs.push(path.relative(process.cwd(), file).replaceAll('\\', '/'));
}

console.log(`Empty stub inventory: ${stubs.length} of ${files.length} MDX pages`);
console.log('Criterion: draft: true with stub, placeholder, or drafted out in the body.');
for (const file of stubs) console.log(file);
