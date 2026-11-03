import { readFileSync, readdirSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const failures = [];

const media = read('src/examples/media.ts');
const shell = read('src/content/nomercy-video-player/en/build/shell.mdx');
const shellExample = read('src/examples/video-build-1-shell.ts');
const item = media.match(/export const bigBuckBunnyItem: VideoPlaylistItem = (\{[\s\S]*?\n\});/)?.[1];
if (!item || !shell.includes(`const bigBuckBunnyItem: VideoPlaylistItem = ${item}`) ||
    !shellExample.includes("import { bigBuckBunnyItem") ||
    !shellExample.includes('playlist: [bigBuckBunnyItem]'))
  failures.push('Build step 1 playlist item differs from the example source');

const progress = read('src/content/nomercy-video-player/en/build/progress-bar.mdx');
const steps = Array.from({ length: 8 }, (_, index) => `src/examples/video-build-${index + 3}-`);
const examples = readdirSync(new URL('src/examples/', root));
const formula = /sliderBuffer\.style\.width\s*=\s*`\$\{Math\.min\(100, \(buffered \/ duration\) \* 100\)\}%`/;
for (const prefix of steps) {
  const name = examples.find(name => `src/examples/${name}`.startsWith(prefix));
  if (!name || !formula.test(read(`src/examples/${name}`)))
    failures.push(`${prefix} buffer fill does not use the absolute buffer end`);
}
if (!formula.test(progress)) failures.push('Progress bar page uses a different buffer formula');

for (const failure of failures) console.error(failure);
if (failures.length) process.exit(1);
console.log('Audit examples OK: playlist item and 8 buffer examples checked.');
