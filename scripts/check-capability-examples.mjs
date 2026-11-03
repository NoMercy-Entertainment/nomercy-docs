import { readdirSync, readFileSync } from 'node:fs';

const dir = new URL('../src/content/nomercy-plugins/en/capabilities/', import.meta.url);
let checked = 0;
let failed = 0;

for (const name of readdirSync(dir).filter(name => name.endsWith('.mdx'))) {
  const page = readFileSync(new URL(name, dir), 'utf8');
  if (!page.includes('## Asking for it')) continue;
  checked++;
  const scope = page.match(/\| Scope \| ([^|]+) \|/)?.[1].trim();
  const grant = page.match(/\{ "name": "[^"]+"(?:, "scope": "([^"]+)")? \}/);
  if (!scope || !grant || grant[1] === '*' || page.includes('The scope is (always).') ||
      (scope === 'none' && grant[1] !== undefined) ||
      (scope !== 'none' && grant[1] === undefined)) {
    console.error(`Invalid capability scope example: ${name}`);
    failed++;
  }
}

if (failed) process.exit(1);
console.log(`Capability examples OK: ${checked} pages checked.`);
