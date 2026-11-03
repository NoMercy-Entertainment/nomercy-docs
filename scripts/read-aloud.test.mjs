import assert from 'node:assert/strict';
import { test } from 'node:test';
import { build } from 'esbuild';

const bundled = await build({
  entryPoints: ['src/components/ReadAloud.tsx'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
});
const { useReadAloud } = await import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].contents).toString('base64')}`);

test('speed changes after the current sentence without restarting it', () => {
  const spoken = [];
  let cancellations = 0;
  const saved = new Map();
  const block = {
    tagName: 'P',
    textContent: 'First sentence. Second sentence.',
    closest: () => null,
    querySelector: () => null,
    getClientRects: () => [{}],
    getBoundingClientRect: () => ({ top: 120, bottom: 140, height: 20 }),
    cloneNode() {
      return { textContent: this.textContent, querySelectorAll: () => [] };
    },
    setAttribute: () => {},
  };
  globalThis.document = {
    documentElement: { lang: 'en' },
    getElementById: () => ({ querySelectorAll: () => [block] }),
    querySelectorAll: () => [],
  };
  globalThis.window = {
    innerHeight: 800,
    speechSynthesis: {
      cancel: () => { cancellations += 1; },
      speak: utterance => { spoken.push(utterance); },
    },
  };
  globalThis.localStorage = {
    getItem: key => saved.get(key) ?? null,
    setItem: (key, value) => saved.set(key, value),
  };
  globalThis.SpeechSynthesisUtterance = class {
    constructor(text) { this.text = text; }
  };

  try {
    useReadAloud.getState().start();
    assert.equal(spoken.length, 1);
    assert.equal(spoken[0].text, 'First sentence.');
    assert.equal(spoken[0].rate, 1);

    useReadAloud.getState().cycleRate();
    assert.equal(useReadAloud.getState().rate, 1.25);
    assert.equal(saved.get('read-aloud-rate'), '1.25');
    assert.equal(cancellations, 1);
    assert.equal(spoken.length, 1);

    spoken[0].onend();
    assert.equal(spoken.length, 2);
    assert.equal(spoken[1].text, 'Second sentence.');
    assert.equal(spoken[1].rate, 1.25);
  }
  finally {
    useReadAloud.getState().stop();
    delete globalThis.SpeechSynthesisUtterance;
    delete globalThis.localStorage;
    delete globalThis.window;
    delete globalThis.document;
  }
});
