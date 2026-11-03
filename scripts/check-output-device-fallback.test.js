import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = 'src/examples/music-tour-audio-output.ts';
const source = process.env.AUDIT_BASELINE
  ? execFileSync('git', ['show', `origin/master:${file}`], { encoding: 'utf8' })
  : readFileSync(file, 'utf8');

test('output picker fallback survives device-list rerender', () => {
  const fallback = source.match(/\.catch\(\(\) => \{([\s\S]*?)\n\s*\}\);/)?.[1] ?? '';
  assert.match(fallback, /this\.status\.textContent = 'This browser has no output picker/);
  assert.match(fallback, /this\.renderDeviceList\(\)/);
  assert.match(source, /this\.status = this\.createElement\('div'/);
  assert.match(source, /this\.list\.replaceChildren\(\)/);
});
