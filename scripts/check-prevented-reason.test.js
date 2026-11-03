import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = 'src/content/nomercy-player-core/en/reference/types.mdx';
const source = process.env.AUDIT_BASELINE
  ? execFileSync('git', ['show', `origin/master:${file}`], { encoding: 'utf8' })
  : readFileSync(file, 'utf8');

test('PreventedReason reference includes backend refusal', () => {
  const union = source.match(/type PreventedReason = ([\s\S]*?);/)?.[1] ?? '';
  assert.match(union, /'backend-refused'/);
});
