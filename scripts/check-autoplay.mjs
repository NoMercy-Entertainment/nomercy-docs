// Fails when an example starts playback on its own without a way to stop it.
//
// Stoney's rule (2026-09-29): no autoplay unless the reader can start and
// stop the player. An example "starts on its own" when its config sets
// `autoPlay: true`, or when its `onReady` calls `item(..., { autoplay: true })`
// (that runs at load, not on a click). It "can be stopped" when its config
// sets `controls: true` (the browser's bar) or it wires its own
// `togglePlayback()` / `pause()` control.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? new URL('../src/examples/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

function onReadyBody(source) {
  const start = source.search(/function onReady\s*\(/);
  if (start === -1)
    return '';
  const open = source.indexOf('{', source.indexOf(')', start));
  let depth = 0;
  for (let i = open; i < source.length; i++) {
    if (source[i] === '{')
      depth++;
    else if (source[i] === '}' && --depth === 0)
      return source.slice(open, i + 1);
  }
  return '';
}

const failures = [];
const files = readdirSync(dir).filter(name => /\.(ts|tsx)$/.test(name));
for (const name of files) {
  const source = readFileSync(join(dir, name), 'utf8');
  const startsOnLoad = /\bautoPlay:\s*true\b/.test(source) || /autoplay:\s*true/.test(onReadyBody(source));
  if (!startsOnLoad)
    continue;
  const canStop = /\bcontrols:\s*true\b/.test(source) || /\.togglePlayback\(|\.pause\(\)/.test(source);
  if (!canStop)
    failures.push(name);
}

if (failures.length) {
  console.error('Autoplay without a way to stop it (set autoPlay/autoplay to false, or give the reader controls):');
  for (const name of failures)
    console.error(`  src/examples/${name}`);
  process.exit(1);
}
console.log(`Autoplay OK: ${files.length} example files checked.`);
