import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/content/nomercy-plugins/en/capabilities');

test('capability manifest samples follow their scope contract', () => {
  for (const name of readdirSync(dir).filter((file) => file.endsWith('.mdx'))) {
    const source = readFileSync(path.join(dir, name), 'utf8');
    const scope = source.match(/^\| Scope \| (.+) \|$/m)?.[1];
    if (!scope) continue;
    assert.doesNotMatch(source, /"scope": "\*"/, name);
    assert.doesNotMatch(source, /The scope is \(always\)/, name);
    if (scope === 'none') assert.doesNotMatch(source, /"scope":/, name);
  }
});
