import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const components = 'src/content/nm-components/en/components';
for (const file of readdirSync(components).filter((name) => name.endsWith('.mdx'))) {
  const lines = readFileSync(path.join(components, file), 'utf8').split('\n');
  for (const [index, line] of lines.entries()) {
    if (/^\| `[^`]+` \|.*\| x \|/.test(line)) {
      console.error(`${file}:${index + 1}: option default is literal x`);
      process.exitCode = 1;
    }
  }
}
if (!process.exitCode) console.log('Component defaults: no literal x option defaults');
