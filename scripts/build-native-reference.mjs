#!/usr/bin/env node
// The native API reference, written from the contract.
//
//   node scripts/build-native-reference.mjs
//
// Three pages per collection, listing every method, event and error code the
// ecosystem contract names for that library. Generated rather than typed,
// because the alternative is a hand-maintained list of 289 methods that goes
// stale the first time one is added and stays stale until somebody notices.
//
// The prose pages around these are hand-written and stay that way. This covers
// the one stage of the arc that is a table by definition: full signatures and
// types. check-api-coverage.mjs then asserts what was generated still covers
// what the contract says, so a regeneration nobody ran shows up as a red build
// rather than as a page quietly missing a symbol.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
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

// Which slice of the contract each collection answers for.
//
// Core carries the shared surface plus every error code, because errors are not
// split by player and a consumer looking one up should not have to guess which
// of three pages it is on.
//
// Video and music each carry their WHOLE surface, shared half included, which
// means the shared 133 appear on both. That is deliberate: a music developer
// looking up play() should find it on the music pages rather than being sent to
// core to read about a player they are not using. Splitting it the other way
// produced a music reference naming two methods.
//
// The contract tags every method with the player that declares it, and there is
// no "base" tag: a shared method is one both players declare, which the
// generator works out rather than being told. Tagging it would have been the
// obvious design and it is the web's own — the two players inherit the shared
// half from a common base, so the generator sees it twice and says so twice.
//
// This was a silent hole for one run: filtering core on `player === 'base'`
// produced a page reading "the core player answers for 0 methods", and the
// coverage gate passed anyway because video and music between them name every
// symbol. A gate that measures the union cannot see an empty page inside it.
const COLLECTIONS = [
  {
    name: 'nomercy-player-core',
    title: 'Core',
    methods: (entry, shared) => shared.has(entry.name),
    events: (entry) => entry.map === 'base',
    errors: true,
  },
  {
    name: 'nomercy-video-player',
    title: 'Video',
    methods: (entry) => entry.player === 'video',
    events: (entry) => entry.map === 'video',
    errors: false,
  },
  {
    name: 'nomercy-music-player',
    title: 'Music',
    methods: (entry) => entry.player === 'music',
    events: (entry) => entry.map === 'music',
    errors: false,
  },
];

// A method both players declare is the shared surface, and it is documented on
// the core pages once rather than on the other two twice.
function sharedMethodNames(methods) {
  const byName = new Map();
  for (const entry of methods) {
    if (!byName.has(entry.name)) byName.set(entry.name, new Set());
    byName.get(entry.name).add(entry.player);
  }
  return new Set([...byName].filter(([, players]) => players.size > 1).map(([name]) => name));
}

function findContract() {
  const found = CONTRACT_CANDIDATES.find((candidate) => existsSync(candidate));
  if (!found) {
    console.error('no contract.json found. Looked in:');
    for (const candidate of CONTRACT_CANDIDATES) console.error(`  ${candidate}`);
    process.exit(2);
  }
  return JSON.parse(readFileSync(found, 'utf8'));
}

// A signature is multi-line TypeScript in the contract. It goes in a fenced
// block rather than a table cell, because a table cell holding a newline is a
// table cell that renders as one long unreadable line.
function signatureBlock(signature) {
  return signature
    .split('\n')
    .map((line) => line.replace(/\t/g, '  ').trimEnd())
    .filter((line, index, all) => line !== '' || (index > 0 && index < all.length - 1))
    .join('\n')
    .trim();
}

function methodsPage(title, methods, version) {
  const lines = [
    '---',
    `title: ${title} player methods`,
    `description: Every method the ${title.toLowerCase()} surface answers for, from ecosystem contract ${version}.`,
    '---',
    '',
    `The ${title.toLowerCase()} player answers for ${methods.length} methods. Each is the same name,`,
    'the same arguments and the same return on Kotlin and Swift as on the web,',
    'because all three are generated from one contract and checked against it.',
    '',
    'Kotlin uses the bare-noun getter and setter pair the web contract defines:',
    '`time()` reads and `time(seconds)` writes. Swift sees the same two through',
    'Objective-C interop with the argument label spelled out.',
    '',
  ];
  for (const method of methods) {
    // A signature is a type, not a program, so it carries the sanctioned
    // partial marker. Without it the snippet-syntax gate tries to parse
    // `{ (): boolean }` as a standalone module and reports a syntax error on
    // every one of 156 entries.
    lines.push(
      `### \`${method.name}\``,
      '',
      '{/* partial */}',
      '```ts',
      signatureBlock(method.signature),
      '```',
      '',
    );
  }
  return lines.join('\n');
}

function eventsPage(title, events, version) {
  const lines = [
    '---',
    `title: ${title} player events`,
    `description: Every event the ${title.toLowerCase()} surface announces, from ecosystem contract ${version}.`,
    '---',
    '',
    `The ${title.toLowerCase()} surface announces ${events.length} events. Subscribe with the`,
    'typed key rather than the string: the key carries the payload type, so a',
    'rename becomes a compile error instead of a listener that never fires.',
    '',
    'The `before` events are the cancellable seam. They are dispatched directly',
    'rather than through the emitter, so a firehose subscription does not see',
    'them and anything watching for one has to subscribe by name.',
    '',
    '| Event | Payload |',
    '| --- | --- |',
  ];
  for (const event of events) {
    const payload = (event.payload ?? 'void').replace(/\n/g, ' ').replace(/\|/g, '\\|');
    lines.push(`| \`${event.name}\` | \`${payload}\` |`);
  }
  lines.push('');
  return lines.join('\n');
}

function errorsPage(errors, version) {
  const lines = [
    '---',
    'title: Error codes',
    `description: Every error code the trio raises, from ecosystem contract ${version}.`,
    '---',
    '',
    'Every error carries a code of the form `namespace:category/reason`. The code',
    'is the part to switch on: messages are for people and change, codes are',
    'contract and do not.',
    '',
    'These are the codes the whole trio raises, listed here rather than split',
    'across three pages because an error is not a video or a music thing and',
    'looking one up should not start with guessing which player raised it.',
    '',
  ];
  const byNamespace = new Map();
  for (const code of [...errors].sort()) {
    const namespace = code.split('/', 1)[0];
    if (!byNamespace.has(namespace)) byNamespace.set(namespace, []);
    byNamespace.get(namespace).push(code);
  }
  for (const [namespace, codes] of byNamespace) {
    lines.push(`### \`${namespace}\``, '');
    for (const code of codes) lines.push(`- \`${code}\``);
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  const contract = findContract();
  const version = contract.version;
  let written = 0;

  const shared = sharedMethodNames(contract.methods ?? []);

  for (const collection of COLLECTIONS) {
    const directory = path.join(root, 'src', 'content', collection.name, 'en', 'native');
    mkdirSync(directory, { recursive: true });

    // Deduplicated by name: the shared half appears once per player in the
    // contract and a reference page listing it twice is a reference page
    // somebody scrolls past.
    const seen = new Set();
    const methods = (contract.methods ?? [])
      .filter((entry) => collection.methods(entry, shared))
      .filter((entry) => (seen.has(entry.name) ? false : seen.add(entry.name)));
    const events = (contract.events ?? []).filter(collection.events);

    writeFileSync(path.join(directory, 'methods.mdx'), methodsPage(collection.title, methods, version));
    writeFileSync(path.join(directory, 'events.mdx'), eventsPage(collection.title, events, version));
    written += 2;

    if (collection.errors) {
      writeFileSync(path.join(directory, 'errors.mdx'), errorsPage(contract.errors ?? [], version));
      written += 1;
    }
  }

  console.log(`native reference: ${written} page(s) written from contract ${version}`);
  return 0;
}

process.exit(main());
