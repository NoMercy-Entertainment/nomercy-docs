# Toolchain

Versions recorded at setup, each package's `master`:

- nomercy-player-core `5ed4538` v2.2.3
- nomercy-video-player `f44e12e` v2.2.3
- nomercy-music-player `f7ac6ce` v2.2.3
- nomercy-docs `f6a5ddc`
- NoMercyLabs/skills (atlas) `c4c6e32`

Harness: this session can start sub-agents in separate contexts. Scanners run in parallel. Writers run in parallel per batch. The fact-checker and the reader of a page are different contexts, and neither is the context that wrote the page.

The three player packages are TypeScript libraries with the same house rules. Answers below are from those repos. The docs site's own checks are named where a page claim is proved by them.

## TypeScript (all three packages)

### 1. What makes a declaration reachable by a consumer?

Two gates, both required.

The module path must be a key in that package's `package.json` `exports` map. Core's map is in `packages/player-web/nomercy-player-core/package.json` (`exports`, including `"."`, `./adapters/*`, `./plugins/*`, `./streams/hls`, `./testing`). Video adds `./plugins/desktop-ui` in `packages/player-web/nomercy-video-player/package.json`. A file that exists under `src/` and is not reached by one of those keys is not an import a reader can write.

The symbol must be exported from the module that key points at (root `"."` is built from `src/index.ts`). A class member is callable from outside only when it is public. `protected` and `private` are not part of the consumer surface. TypeScript `export` inside an unlisted file does not make the symbol importable.

### 2. Everywhere a value can be defaulted, and which layer wins

Three layers, later wins.

1. Literals written in `initPlayerCoreState` (`nomercy-player-core/src/core/state.ts`). Examples observed there: `_internalVolume = 100`, `_volumeBeforeMute = 100`, `_playbackRate = 1`, `_repeatState = RepeatState.OFF`, `_shuffleState = ShuffleState.OFF`, `_volumeState = VolumeState.UNMUTED`. Plugin modules do the same with `DEFAULT_*` constants, for example `DEFAULT_PERSIST_KEY = 'volume'` in `src/plugins/volume-memory/index.ts`.
2. Constructor or plugin options override those literals at the read site, in the form `this.opts?.persistKey ?? DEFAULT_PERSIST_KEY` (volume-memory, line 57).
3. A later method call overrides the stored value. `volume(level)` in `src/core/mixins/volume.ts` clamps to 0..100 and writes `_internalVolume`.

The latest successful method call wins. If the caller never sets the option and never calls the method, the literal from layer 1 is what the player uses.

### 3. What is a test file here?

`vitest.config.ts` in each package sets `test.include` to `src/**/__tests__/**/*.test.ts` and `test.environment` to `happy-dom`. The suite command is `npm test`, which runs `vitest run` (`package.json` `scripts.test`). CI in `nomercy-player-core/.github/workflows/ci.yml` runs that after `npm run typecheck` and `npm run lint`. Video and music use the same `test` script. Their `test:e2e` script is Playwright and is not part of `npm test`.

Coverage skips `__tests__/` directories and `*.test.ts`. Those files are not source slices.

### 4. What is the doc-comment convention, and does anything check it?

Methods and exported types carry `/** ... */` comments (see `volume` in `src/core/mixins/volume.ts`). `eslint.config.js` uses `@antfu/eslint-config` and `@nomercy-entertainment/eslint-plugin-player`. It has no jsdoc plugin, and CI does not run a doc-comment compiler. A comment can rot without a check failing. Comments are leads, not proof.

### 5. What command formats a snippet the way this project would?

`npm run lint:fix`, which is `eslint . --fix --max-warnings 0`. The style is in `eslint.config.js` `stylistic`: `indent: 'tab'`, `quotes: 'single'`, `semi: true`. There is no Prettier config. Docs snippets follow the docs site's example rules in the brief, not this eslint run, because snippet files live in `nomercy-docs/src/examples/`.

### 6. What is the cheapest command that proves a claim?

For a type or an export in a player package: `npm run typecheck` in that package (`tsc --noEmit`). Ran in nomercy-player-core on this setup: exit 0.

For a named import written on a docs page: `npm run check:symbols` in `nomercy-docs` (probes the live package types). It passed in the baseline: 234 named imports across 27 specifiers.

For a runnable example: `npm run check:examples` (`tsc -p tsconfig.examples.json`), then `npm run check:docs` for the live player. Behavior that types cannot see still needs `npm test` in the package that owns the code.

### 7. What has already drifted?

Checked against the source, not assumed.

- Docs still call the base library "the kit". `src/content/nomercy-player-core/en/tour/time.mdx` line 10 says every time value the kit reports is a number of seconds. The package is `@nomercy-entertainment/nomercy-player-core`. Source comments drifted the same way: `src/i18n/en.ts` lines 10-12 say the English bundle ships with the kit, and `src/core/state.ts` line 437 calls `Internals` a kit-private type. The drift pattern is a rename the words did not follow.
- `nomercy-video-player/package.json` `description` says the package has no UI and the reader builds their own. The same file's `exports` map publishes `./plugins/desktop-ui`, and `src/plugins/desktop-ui/` is in the tree. The description denies a surface the package ships.

## Docs site

Page proof commands, from `nomercy-docs/package.json` `scripts.build`, run one at a time. Contract generation reads `PLAYER_CONTRACT`, set to the full path of `tools/nomercy-player-conformance/contract/contract.json`.
