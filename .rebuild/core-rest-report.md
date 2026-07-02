Core collection, arc stages 4-7 (build, recipes, plugins & adapters, reference) — docs/v2-rebuild

This completes the nomercy-player-core arc. Stages 1-3 (introduction, quickstart, tour) already
existed; this slice adds the remaining four and closes out ARC-SECTION-MISSING for core.

## Pages written

### Stage 4 — `src/content/nomercy-player-core/en/build/` (4 pages)

A cumulative, step-by-step "assemble a minimal player from the kit" tutorial. Each step is a
complete, typechecked file that grows the same `KitPlayer` class:

- `compose-methods.mdx` — recaps Quickstart's three-ingredient shell (reuses `minimal-player.ts`
  directly, no new file) as the base every later step extends.
- `backend-contract.mdx` — adds a `backend()` method, the exact integration point `NMVideoPlayer`
  uses for its `<video>` element, so `play`/`time`/`volume` stop being no-ops.
- `add-a-plugin.mdx` — registers a `Plugin` subclass (`addPlugin` before `setup()`) that reacts to
  the events the backend wiring now fires.
- `add-i18n.mdx` — passes `language`/`translations` straight into `setup()`, finishing the player.

### Stage 5 — `src/content/nomercy-player-core/en/recipes/` (4 pages)

Real kit tasks, framework-neutral (core has no UI to frame a recipe around):

- `swap-an-adapter.mdx` — storage swapped to `IndexedDBBackend`, proven via a plugin that reads
  through `this.storage`.
- `custom-cue-parser.mdx` — a proprietary chapter-marker format registered via
  `setup({ cueParsers })` alongside the built-ins, resolved end to end with `resolveCueParser`.
- `auth-fetch.mdx` — `authFetch` called standalone (no plugin, no player) with a real
  `AbortController`, 401-refresh, and `isAuthError`/`isNetworkError` branching.
- `custom-url-resolver.mdx` — a category-branching `IUrlResolver` that signs `media` URLs and
  delegates everything else to `ctx.defaultResolve`.

### Stage 6 — `src/content/nomercy-player-core/en/plugins-adapters/` (22 pages)

One page per shared core plugin (everything under `src/plugins/`) and one per adapter port
(the 10 DI ports [Adapters & Dependency Injection](tour/adapters) already tabulates). Every page:
purpose, options table, events table (where applicable), rules & restrictions, how to extend.

Plugins (12, dependency order — `AudioGraphPlugin` first since 4 others `require` it):
`audio-graph`, `equalizer`, `mixer`, `canvas`, `spectrum`, `visualization` (abstract base;
documents the real `WaveformVisualization` reference subclass), `cast-sender`, `embed`,
`key-handler`, `media-session`, `message`, `tab-leader`. The last four are subpath-only exports
(`plugins/key-handler` etc., not in the main barrel) — called out explicitly on each page so a
reader doesn't try `import { KeyHandlerPlugin } from '@nomercy-entertainment/nomercy-player-core'`
and get a missing-export error.

Adapters (10): `adapter-storage`, `adapter-platform`, `adapter-stream-source`,
`adapter-url-resolver`, `adapter-translator`, `adapter-cue-parser`, `adapter-preload-strategy`,
`adapter-transition-strategy`, `adapter-shuffle-strategy`, `adapter-realtime-channel`.

No plugin was invented — every one exists in `src/plugins/` and every static `id` string, options
field, and event name was verified against source before writing (spot-checked every `static
override readonly id` and `requires` array against the actual files after drafting).

### Stage 7 — `src/content/nomercy-player-core/en/reference/` (6 pages)

Signature-dense, curated from `src/index.ts`'s actual export list (not the wider internal
`base-player.ts` facade — cross-checked which mixin groups are and aren't publicly exported):

- `composition.mdx` — `composeMixins`, `resolvePlayerConstructor`, `initPlayerCoreState`,
  `KIT_VERSION`, `playerCoreMethods`, and which of the 16 individually-exported mixin groups exist
  vs. the 9 internal-only ones bundled in the aggregate.
- `config.mdx` — every `BasePlayerConfig` field, grouped (core, auth, i18n, adapters, timing,
  runtime behavior).
- `events.mdx` — `BaseEventMap` in full, ~120 events grouped into the same sections the source
  file itself uses.
- `types.mdx` — `BasePlaylistItem`, time/track/quality types, all 11 state enums, `Chapter`,
  `DeviceCapabilities`, `PlaybackMetrics`, plugin-declaration types (`PluginCtorWithId`,
  `RequireSpec`, `PluginAdvisory`), `PlayerExperimental`.
- `errors.mdx` — the `PlayerError` hierarchy, factories, the 8-digit numeric code schema, and the
  `DEFAULT_RETRY_POLICY` table in full.
- `utilities.mdx` — `authFetch`, format/escape/clamp helpers, `perceptualGain` (the dB volume
  taper), `interpolateTitleTokens`, `buildResolvedUrl`, `appendAuthTokenParam`, DOM element
  helpers.

## Example files

`src/examples/` (7 new files, Apache-2.0 SPDX header, tab-indented matching the existing
`minimal-player.ts` convention):

- `build-2-backend-contract.ts`, `build-3-add-a-plugin.ts`, `build-4-add-i18n.ts` — each is a
  complete, cumulative "full file so far" (same pattern the video-player build-UI guides use),
  not a diff — every step's code block is copy-pasteable on its own.
- `recipe-swap-an-adapter.ts`, `recipe-custom-cue-parser.ts`, `recipe-auth-fetch.ts`,
  `recipe-custom-url-resolver.ts`.

All eight (these 7 + reused `minimal-player.ts`) use `:::snippet{file="..." live="false"}`,
consistent with every existing core example — `PlayerExample.tsx` only ever mounts
`nomercy-video-player`, so a "live" island on a headless-kit page would either render an unrelated
video player or sit in a permanent error state. Plugin/adapter/reference pages use short
hand-written `ts` fences instead of the runnable-snippet system (matching the precedent already in
`quickstart.mdx`'s "Mounting it" section) since they're one-line usage illustrations of a
reference entry, not standalone runnable programs.

### Supporting change to `src/examples/tour-player.ts`

Extended the shared tour/recipes scaffold's `declare` block with `registerCueParser` /
`unregisterCueParser` / `resolveCueParser` / `resolveUrl` / `urlResolver` — the recipes collection
reuses this same class, and those five methods are real `playerCoreMethods` surface `composeMixins`
already stamps onto the prototype at runtime; they just weren't `declare`d yet because no earlier
tour page exercised them. Purely additive, no existing tour page's behavior changed.

## Supporting fixes

- `scripts/check-docs.mjs` — `ARC_SECTIONS`'s `build` stage only matched `guides/build*` (a
  video-player-shaped prefix) and `reference` only matched `api`/`types` prefixes, neither could
  ever match a `build/*` or `reference/*` slug under core. Added `'build'` and `'reference'` to
  their respective `prefix` arrays, the same class of fix the two prior slices made for
  `introduction` and `tour`. `recipes` (prefix `'recipes'`) and `plugins-adapters` (prefix
  `'plugins'`, which `'plugins-adapters/...'` already satisfies as a literal substring) needed no
  change.
- `src/lib/nav-structure.ts` — added four new groups under `nomercy-player-core`: "Build a
  Player", "Recipes", "Plugins & Adapters", "Reference", all 36 new slugs in the reading order the
  pages' own `Next steps` links follow.
- `src/content/nomercy-player-core/en/introduction.mdx` — fixed two pre-existing broken links
  (`/nomercy-video-player/introduction` → `/nomercy-video-player/overview`, same for music). Found
  because my own `reference/utilities.mdx` made the identical mistake copying the same wrong slug;
  fixed both in one pass rather than just my own.
- `.rebuild/progress.md` — marked core content complete.

## Real verification output

```
npx astro build
...
[build] 426 page(s) built in 1m 18s
[build] Complete!
```

Exit code 0. All 36 new routes present under `dist/nomercy-player-core/{build,recipes,
plugins-adapters,reference}/*`.

```
npm run check:nav
Navigation manifest OK — every page is placed exactly once.
```

```
node scripts/check-docs.mjs
Contract OK — 3 trio collection(s) checked.

Contract lint passed — running the Playwright snippet gate...
Running 2 tests using 1 worker
  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (39.6s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (72ms)
  2 passed (41.7s)
```

`nomercy-player-core` no longer reports `ARC-SECTION-MISSING` — all seven arc stages present. Zero
`CROSS-MEDIUM-TOKEN`, `OVER-BUDGET`, `MISSING-TITLE`, or `MISSING-ORDER` violations anywhere in the
collection.

### Example typecheck (the mandated "must typecheck against published core" proof)

No `typescript`/`astro check` package is installed in this repo (this project runs on Astro's
built-in type stripping, not a standalone `tsc`), and the `live="false"` snippet convention core
uses means none of these files are imported by any Astro page for `astro build` to typecheck as a
side effect. Verified instead with the `typescript@6.0.3` binary already present in the sibling
`packages/nomercy-player-core/node_modules` (same monorepo, borrowed the compiler only, not its
types), run against a standalone project (`target/module ESNext`, `moduleResolution bundler`,
`strict`, `skipLibCheck`, matching `astro/tsconfigs/strict`'s options) over
`src/examples/**/*.ts`, resolving `@nomercy-entertainment/nomercy-player-core` from this repo's own
`node_modules` (the real published `2.0.0-rc.21`, not the monorepo source):

```
tsc --project <standalone tsconfig> src/examples/**/*.ts
(zero output — zero diagnostics across all 20 example files, old and new)
```

Two real backend-contract-shape questions got resolved by this exact typecheck loop while writing
`build-2-backend-contract.ts`: confirming `IPlayerBackend` (the public type) doesn't declare
`play`/`pause`/`currentTime`/`volume` (those live on the internal, non-exported `BackendShape`),
so the example's `FakeBackendShape` interface extends `IPlayerBackend` and adds the transport
fields locally by name rather than importing a type that isn't public.

### check:links (not in the mandated verify list, run anyway)

91 pre-existing broken links remain (down from 95 — fixed 2 in `introduction.mdx` plus the 2 I
transiently introduced in `reference/utilities.mdx` before catching them with this same check).
Confirmed zero broken links originate from, or target, any of the 36 new pages or their examples.
The remaining 91 are all stale `/nomercy-player-core/*` cross-links inside not-yet-rebuilt
`nomercy-video-player`/`nomercy-music-player` content (pointing at v1-era slugs like
`/nomercy-player-core/storage`, `/nomercy-player-core/plugins`) — out of scope for a core-only
slice, will resolve naturally when video/music get their own v2 rebuild pass.

## Known, pre-existing, out-of-scope gaps (not introduced by this change)

- A stale, orphaned `nomercy-player-kit` content tree (pre-rename leftover) still builds its own
  `/nomercy-player-kit/*` routes alongside the real `nomercy-player-core` ones — untouched, flagged
  by both prior slices, still out of scope here.
- video-player and music-player collections still report their own gaps against this same
  contract (not run in this slice — core-only scope).
