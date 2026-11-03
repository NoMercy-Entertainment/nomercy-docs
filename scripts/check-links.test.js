import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('check:links rejects a link to a missing heading', () => {
  const dir = mkdtempSync(path.join(root, 'src/content/nomercy-player-core/en/link-check-'));
  try {
    writeFileSync(path.join(dir, 'index.mdx'), '---\ntitle: Link check fixture\n---\n\n[Missing](/nomercy-player-core/tour/queue#heading-that-does-not-exist)\n');
    const result = spawnSync(process.execPath, ['scripts/check-links.js'], { cwd: root, encoding: 'utf8' });
    assert.notEqual(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stderr, /queue#heading-that-does-not-exist/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
