# Music docs: Stage 5 (Recipes & Frameworks) + Stage 6 (Plugins & Adapters) + Stage 7 (Reference)

Branch: `docs/v2-rebuild`. Not committed, tree left changed per instructions. This closes out
the `nomercy-music-player` arc, all 7 stages now exist (matching core and video) — **the full
player trio doc rebuild (core + video + music) is now complete.**

## Pages per stage

**Stage 5 — Recipes & Frameworks** (`src/content/nomercy-music-player/en/recipes/`, 10 pages):
`vue-integration`, `react-integration`, `svelte-integration`, `vanilla-integration` (framework
wrappers, the controller-plus-callback pattern generalized to each framework's own reactivity
primitive) + `crossfade-gapless`, `lyrics-sync`, `equalizer-presets`, `scrobbling`,
`queue-playlist`, `audio-output-switching` (the 6 task recipes named directly in the brief).
`crossfade-gapless` introduces `GaplessTransitionStrategy` (from `nomercy-player-core`, video's
own default) as music's opt-in true-hard-cut alternative to the default
`CrossfadeTransitionStrategy`, switchable at runtime via `setTransitionStrategy()` — both are
medium-neutral kit primitives, verified against `packages/nomercy-player-core/src/adapters/
preload/default.ts` and its public export from the kit's `index.ts`.

**Stage 6 — Plugins & Adapters** (`src/content/nomercy-music-player/en/plugins-adapters/`, 9
pages): one page per real plugin in `packages/nomercy-music-player/src/plugins/` (`scrobble`,
`auto-advance`, `lyrics`, `media-session`, `key-handler`, `cast-sender`, `v1-compat`) and one per
real adapter in `src/adapters/` (`adapter-audio-backend`, `adapter-similarity-engine`). No
invented plugins, cross-checked directory-by-directory against source. `adapter-similarity-engine`
is documented explicitly as **reserved, not wired**: no default implementation ships, no plugin
calls `findSimilar()` (`SmartShuffleGenerator` does its own local tag scoring instead), and the
interface isn't re-exported from either the `.`/`./adapters` public entry point — verified against
`src/adapters/index.ts` (only re-exports `audio-backend`) and `package.json`'s `exports` map (no
`./adapters/similarity-engine` subpath). Cross-library plugins re-exported from the music barrel
for ergonomic imports (equalizer/audio-graph) already have core pages and are intentionally not
re-documented here, `equalizer-presets` links out to them instead.

**Stage 7 — Reference** (`src/content/nomercy-music-player/en/reference/`, 4 pages):
`player-methods` (the `IMusicPlayer`-only method delta on top of `IPlayer` — `backend()`,
`crossfadeTo()`, `isTransitioning()`, audio output, the track/quality/chapter methods as they
apply to audio, and the `subtitles()`/`subtitle()`/`subtitleStyle()` → `NotImplementedError`
overrides — everything inherited is left to the Guided Tour, matching core/video precedent),
`config` (`MusicPlayerConfig` fields beyond `BasePlayerConfig`, plus the `crossfadeEnabled: true`
+ `MusicPreloadStrategy` + `CrossfadeTransitionStrategy` defaults `setup()` injects), `events`
(`MusicEventMap` in full, plus a plugin-namespaced-event index), `types` (`MusicPlaylistItem`,
`CrossfadeOptions`, `AudioBackendFactory`, `IMusicPlayer`, re-exported kit enums).

Registered in `src/lib/nav-structure.ts` under three new groups ("Recipes", "Plugins & Adapters",
"Reference") for `nomercy-music-player`.

## New example files (`src/examples/`)

5 new live files, one per recipe where a rendered player genuinely helps (framework-wrapper pages,
`equalizer-presets`, and `scrobbling` stay code-block-only, matching core/video's
plugins-adapters/reference precedent of plain fenced snippets for illustrative subclass/interface
examples with no visual component):

- `music-recipe-vanilla-integration.ts` — the controller-plus-callback badge, music-typed
  (`name`/`artist` instead of `title`).
- `music-recipe-crossfade-gapless.ts` — a live toggle between `CrossfadeTransitionStrategy` and
  `GaplessTransitionStrategy` via `setTransitionStrategy()`, plus a manual `crossfadeTo()` button
  independent of either mode.
- `music-recipe-lyrics-sync.ts` — a full scrolling lyrics panel built from `LyricsPlugin.all()`,
  matching the active line by `cue.payload` object identity (not text) so a repeated line, a
  chorus, highlights only the current occurrence.
- `music-recipe-queue-playlist.ts` — a queue panel using `playItem()` to close the
  `item()`/`play()` race, music-typed (`name`/`artist`).
- `music-recipe-audio-output-switching.ts` — a `<select>` pre-selected to the currently active
  device (`audioOutput()` read on mount), plus the native browser picker as a fallback, resyncing
  the dropdown after a native-picker choice.

Every playlist uses `baseUrl` (`MUSIC_BASE`) + relative item paths from `src/examples/media.ts`,
`player: 'music' as const` set on every module so `PlayerExample` mounts the music package instead
of defaulting to video. All 5 carry the Apache-2.0 SPDX header.

## Verification

**`npx astro build`**, exit 0, 378 pages built, all 23 new content pages present under
`dist/nomercy-music-player/{recipes,plugins-adapters,reference}/`, no snippet or MDX errors:
```
02:38:00 [build] ✓ Completed in 1m 16s.
02:38:00 [build] 378 page(s) built in 1m 18s
02:38:00 [build] Complete!
```

**`npx playwright test e2e/snippets.spec.ts`**, GREEN:
```
Running 2 tests using 1 worker

  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (52.2s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (67ms)

  2 passed (56.3s)
```
Site-wide gate, covers all 5 new live islands plus every pre-existing one in one pass. None
reported `data-player-error`.

**`npm run check:docs`**, contract lint + Playwright gate, both green:
```
Contract OK — 3 trio collection(s) checked.

Contract lint passed — running the Playwright snippet gate...
  ✓  1 e2e\snippets.spec.ts:99:3 › ... (3.8s)
  ✓  2 e2e\snippets.spec.ts:139:3 › ... (84ms)
  2 passed (7.2s)
```
**All three trio collections (core + video + music) report zero violations** — no
`ARC-SECTION-MISSING`, no `CROSS-MEDIUM-TOKEN`, no `MISSING-TITLE`/`MISSING-ORDER`, no
`OVER-BUDGET`, anywhere. This is the first time all three have passed together in the same run.

**Music arc completeness**, verified directly against `ARC_SECTIONS` in `scripts/check-docs.mjs`
(39 total pages in the collection):
```
introduction     : 1 page(s)
quickstart       : 1 page(s)
tour             : 9 page(s)
build            : 5 page(s)
recipes          : 10 page(s)
plugins-adapters : 9 page(s)
reference        : 4 page(s)
```

**`npm run check:nav`**, OK:
```
Navigation manifest OK — every page is placed exactly once.
```

**`npm run check:links`**, OK after one fix:
```
Internal links OK (319 pages, 86 redirects).
```
One pre-existing broken link found and fixed: `nomercy-player-core/en/introduction.mdx` pointed
to `/nomercy-music-player/overview` (dead since the old music collection was wiped, the real slug
is `/introduction`) — one-line fix, unrelated file, adjacent to this task's surface. This stage's
new pages also retroactively resolved roughly 40 other pre-existing dangling forward-links from
music's stage 1–4 content (`tour/*`, `build/*` "Next steps" links into recipes/plugins-adapters/
reference, which didn't exist until this pass) — flagged in the prior video-rest-report.md as
"pre-existing, out of scope" and now genuinely fixed as a side effect of finishing the arc.

**Full pipeline** (`npm run build` = check:docs → check:nav → check:links → build:search →
astro build), exit 0 end to end, re-run after the link fix to confirm nothing regressed.

## Concerns / follow-ups

- The `nomercy-music-player` arc is now complete end to end (7/7 stages), matching core and
  video. **The full player trio (core + video + music) doc rebuild is complete** — tracked in
  `.rebuild/progress.md`.
- `adapter-similarity-engine.mdx` documents a genuinely unwired, unexported interface. Worth a
  deliberate look before the next audit pass: either wire it into `SmartShuffleGenerator` (or a
  future radio-mode plugin) and ship a default adapter, or leave it reserved as-is — the docs page
  itself doesn't take a position, it states current status accurately either way.
- Zero video contamination: `plugins-adapters`/`reference`/`recipes` content checked against
  `VIDEO_ONLY_TOKENS` (`chapter-source`, `thumbnail-source`, `subtitle-style-store`,
  `subtitle-overlay`, `octopusplugin`, `skipperplugin`, `desktopuiplugin`, `tvkeyhandlerplugin`) —
  zero occurrences, confirmed by the `check:docs` CROSS-MEDIUM-TOKEN check passing with zero
  violations.
- Tree left uncommitted per instructions: 3 new content directories, 5 new example files, 1
  edited `nav-structure.ts`, 1 edited `nomercy-player-core/en/introduction.mdx` (link fix), 1
  edited `.rebuild/progress.md`, and the regenerated `public/searchIndex.json` /
  `dist/` build artifacts.
