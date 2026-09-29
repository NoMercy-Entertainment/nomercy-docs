// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

// Proves the site's own remark chain turns the "::Name ... ::" blocks into their components. Since remark-directive
// joined the chain (2026-07-02, for :::snippet), every "::Name" line parsed as a directive node, the paragraph-based
// plugins never saw it, and the live site rendered an empty <div> with the content loose below it.
// Run with `node --test scripts/remark-directives.test.mjs`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createJiti } from 'jiti';

const jiti = createJiti(import.meta.url);
const { remarkPlugins } = await jiti.import('../src/lib/mdx/remark.ts');
const { unified } = await import('unified');
const { default: remarkParse } = await import('remark-parse');
const { default: remarkMdx } = await import('remark-mdx');

// remark-snippet is async, so the chain has to run with `run`, not `runSync`.
async function tree(md) {
  const processor = unified().use(remarkParse).use(remarkMdx);
  for (const plugin of remarkPlugins) processor.use(...[plugin].flat());
  return processor.run(processor.parse(md), md);
}

async function blocks(md) {
  return (await tree(md)).children.map((n) => n.name ? `${n.type}:${n.name}` : n.type);
}

function text(node) {
  if (node.value !== undefined) return node.value;
  return (node.children ?? []).map(text).join('');
}

test('::Troubleshooting becomes the Troubleshooting component with its content inside', async () => {
  const out = await blocks('::Troubleshooting\n\n**Symptom.**\nWhat to do.\n\n::\n');
  assert.deepEqual(out, ['mdxJsxFlowElement:Troubleshooting']);
});

test('::Callout becomes the Callout component', async () => {
  assert.deepEqual(await blocks('::Callout\n\nText.\n\n::\n'), ['mdxJsxFlowElement:Callout']);
});

test('::row and ::col become Row and Col', async () => {
  assert.deepEqual(await blocks('::row\n\n::col\n\nText.\n\n::\n\n::\n'), ['mdxJsxFlowElement:Row']);
});

test('a directive the site does not know stays as its literal text', async () => {
  assert.deepEqual(await blocks('::nothing\n'), ['paragraph']);
});

test('colons inside prose stay text (no silent textDirective)', async () => {
  const md = 'Set key:value, a 16:9 ratio, at 10:30, see note:here.\n';
  assert.equal(text(await tree(md)).trim(), md.trim());
});

test(':::snippet still becomes a code block', async () => {
  const out = await blocks(':::snippet{file="video-tour-queue" live="false"}\n:::\n');
  assert.deepEqual(out, ['code']);
});
