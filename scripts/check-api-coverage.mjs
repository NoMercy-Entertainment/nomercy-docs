#!/usr/bin/env node
// Every symbol the ecosystem contract names has somewhere to be looked up.
//
//   node scripts/check-api-coverage.mjs
//
// "The library is documented" is the kind of claim that stays true in a README
// long after it stopped being true on disk. The contract already knows every
// method, event and error code the trio has, so this asks the only question
// worth asking: is each of them findable in the native reference pages.
//
// It reads the contract from the generator's own repository when that is
// checked out beside this one, and falls back to the copy vendored into the
// core port. Either way it is one file that something else produces, never a
// list maintained here — a checklist you write yourself checks nothing.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const monorepo = path.resolve(root, '..', '..');

const CONTRACT_CANDIDATES = [
  // An explicit path wins, so CI can clone the contract wherever it likes
  // rather than having to reproduce the monorepo's directory layout around a
  // standalone checkout.
  process.env.PLAYER_CONTRACT,
  path.join(monorepo, 'tools', 'player-contract', 'contract', 'contract.json'),
  path.join(monorepo, 'packages-native', 'nomercy-player-core-kmp', 'contract', 'contract.json'),
].filter(Boolean);

const COLLECTIONS = [
  'nomercy-player-core',
  'nomercy-video-player',
  'nomercy-music-player',
];

// A method is looked for in the methods pages and nowhere else.
//
// Scanning every page in the directory for every kind of symbol was the first
// version, and it could not fail: `fullscreen` is a method AND an event, so
// deleting the method entry left the event entry answering for it. The same
// held for a dozen names. A gate that cannot tell which question a match
// answered is a gate that answers yes to all of them.
const PAGES = {
  method: 'methods.mdx',
  event: 'events.mdx',
  'error code': 'errors.mdx',
};

function findContract() {
  const found = CONTRACT_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    console.error('no contract.json found. Looked in:');
    for (const candidate of CONTRACT_CANDIDATES) console.error(`  ${candidate}`);
    console.error('Check out tools/player-contract, or run the native conformance gate to vendor one.');
    process.exit(2);
  }
  return JSON.parse(readFileSync(found, 'utf8'));
}

// A symbol counts as documented when it appears as a code span. Prose that
// mentions a name in passing is not a reference entry, and counting it would
// make this gate pass on a page that merely talks about the API.
function codeSpansIn(file) {
  const found = new Set();
  if (!existsSync(file)) return found;
  const text = readFileSync(file, 'utf8');
  const codeSpan = /`([A-Za-z][A-Za-z0-9_:/-]*)`/g;
  let match;
  while ((match = codeSpan.exec(text)) !== null) found.add(match[1]);
  return found;
}

function documentedByKind() {
  const byKind = new Map();
  for (const [kind, page] of Object.entries(PAGES)) {
    const found = new Set();
    for (const collection of COLLECTIONS) {
      const file = path.join(root, 'src', 'content', collection, 'en', 'native', page);
      for (const symbol of codeSpansIn(file)) found.add(symbol);
    }
    byKind.set(kind, found);
  }
  return byKind;
}

// Per collection, not just in total.
//
// The union is what "is this symbol documented anywhere" needs and it is blind
// to an empty page inside it: the generator wrote a core methods page reading
// "answers for 0 methods" and an earlier version of this gate stayed green,
// because video and music between them named every symbol.
const MINIMUM_PER_PAGE = 2;

function thinPages() {
  const thin = [];
  for (const collection of COLLECTIONS) {
    for (const page of Object.values(PAGES)) {
      const file = path.join(root, 'src', 'content', collection, 'en', 'native', page);
      // errors.mdx lives on core only, by design.
      if (!existsSync(file)) continue;
      const size = codeSpansIn(file).size;
      if (size < MINIMUM_PER_PAGE) thin.push(`${collection}/native/${page} names ${size} symbol(s)`);
    }
  }
  return thin;
}

function main() {
  const contract = findContract();
  const documented = documentedByKind();

  const thin = thinPages();
  if (thin.length > 0) {
    for (const line of thin) console.error(line);
    console.error('\nThose pages are empty or missing. Regenerate: node scripts/build-native-reference.mjs');
    return 1;
  }

  const groups = [
    ['method', [...new Set((contract.methods ?? []).map((entry) => entry.name))]],
    ['event', [...new Set((contract.events ?? []).map((entry) => entry.name))]],
    ['error code', [...new Set(contract.errors ?? [])]],
  ];

  let missingTotal = 0;
  for (const [label, names] of groups) {
    const known = documented.get(label) ?? new Set();
    if (known.size === 0) {
      console.error(`no ${label} reference pages found, so this checked nothing`);
      return 1;
    }
    const missing = names.filter((name) => !known.has(name)).sort();
    console.log(`${label}s: ${names.length - missing.length}/${names.length} documented`);
    if (missing.length === 0) continue;
    missingTotal += missing.length;
    for (const name of missing.slice(0, 20)) console.error(`  undocumented ${label}: ${name}`);
    if (missing.length > 20) console.error(`  ... and ${missing.length - 20} more`);
  }

  if (missingTotal > 0) {
    console.error(
      `\napi coverage FAILED: ${missingTotal} symbol(s) in contract ${contract.version} have no reference entry.`,
    );
    console.error('Regenerate the reference pages: node scripts/build-native-reference.mjs');
    return 1;
  }

  console.log(`api coverage: every symbol in contract ${contract.version} is documented`);
  return 0;
}

process.exit(main());
