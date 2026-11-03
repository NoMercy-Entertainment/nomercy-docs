import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const file = 'src/content/nomercy-video-player/en/build/shell.mdx';
const page = process.env.AUDIT_BASELINE
  ? execFileSync('git', ['show', `origin/master:${file}`], { encoding: 'utf8' })
  : readFileSync(file, 'utf8');
const example = readFileSync('src/examples/video-build-1-shell.ts', 'utf8');
const media = readFileSync('src/examples/media.ts', 'utf8');

test('step-one item matches the live tutorial film', () => {
  const item = example.match(/playlist: \[(\w+)\]/)?.[1];
  assert.ok(item);
  const title = media.match(new RegExp(`export const ${item}: VideoPlaylistItem = \\{[\\s\\S]*?title: '([^']+)'`))?.[1];
  assert.ok(title);
  const snippet = page.match(/## The playlist item[\s\S]*?```ts([\s\S]*?)```/)?.[1] ?? '';
  assert.match(snippet, new RegExp(`title: '${title}'`));
  assert.doesNotMatch(snippet, /subtitles:/);
});
