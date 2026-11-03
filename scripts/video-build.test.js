import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const example = (step) => readFileSync(path.join(root, 'src/examples', step), 'utf8');

test('each tutorial buffer bar ends at the absolute buffered position', () => {
  const steps = ['3-progress-bar', '4-time-skip', '5-volume', '6-title-bar',
    '7-fullscreen-speed', '8-selectors', '9-seek-preview', '10-full-plugin'];
  for (const step of steps) {
    const source = example(`video-build-${step}.ts`);
    const expression = source.match(/sliderBuffer\.style\.width = `\$\{(.+?)\}%`;/)?.[1];
    assert.ok(expression, `step ${step} has a buffer expression`);
    const width = Function('position', 'buffered', 'duration', `return ${expression}`)(100, 150, 600);
    assert.equal(width, 25, `step ${step}`);
  }
});

test('tutorial buttons announce their current playback and mute action', () => {
  const steps = ['2-play-pause', '3-progress-bar', '4-time-skip', '5-volume',
    '6-title-bar', '7-fullscreen-speed', '8-selectors', '9-seek-preview', '10-full-plugin'];
  for (const step of steps) {
    const source = example(`video-build-${step}.ts`);
    assert.match(source, /this\.on\('pause', \(\) => \{\s*this\.playbackButton\.ariaLabel = 'Play';/, `step ${step} pause`);
    assert.match(source, /this\.on\('play', \(\) => \{\s*this\.playbackButton\.ariaLabel = 'Pause';/, `step ${step} play`);
    if (Number.parseInt(step, 10) >= 5) {
      assert.match(source, /volumeButton\.ariaLabel = muted \? 'Unmute' : 'Mute';/, `step ${step} mute`);
    }
  }
});
