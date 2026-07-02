# Video docs: Stage 3 (Guided Tour) + Stage 4 (Build a Player)

Branch: `docs/v2-rebuild`. Not committed — tree left changed per instructions.

## Pages per stage

**Stage 3 — Guided Tour** (`src/content/nomercy-video-player/en/tour/`, 8 pages):
transport, volume, queue, subtitles, audio-tracks, quality, chapters, state-events.

**Stage 4 — Build a Player** (`src/content/nomercy-video-player/en/build/`, 5 pages):
shell, scrubber, volume, subtitle-menu, fullscreen.

Registered in `src/lib/nav-structure.ts` under two new groups ("Guided Tour", "Build a
Player") for `nomercy-video-player`, same group names Core already uses. Added a forward
link from `quickstart.mdx`'s Next Steps into `tour/transport` (previously a dead end since
stage 3 didn't exist yet).

## New example files (`src/examples/`)

Tour (8, config-only, live): `video-tour-transport.ts`, `video-tour-volume.ts`,
`video-tour-queue.ts`, `video-tour-subtitles.ts`, `video-tour-audio-tracks.ts`,
`video-tour-quality.ts`, `video-tour-chapters.ts`, `video-tour-state-events.ts`.

Build (5, config + a real hand-built DOM overlay, live, cumulative): `video-build-1-shell.ts`,
`video-build-2-scrubber.ts`, `video-build-3-volume.ts`, `video-build-4-subtitle-menu.ts`,
`video-build-5-fullscreen.ts`. Each step's file contains that step's full overlay code plus
every step before it (self-contained, copy-pasteable), matching Core's build-stage convention.

Every playlist uses `baseUrl` (`FILMS_BASE`) + relative item paths from `src/examples/media.ts`
— `sintel` for single-item pages, `films` for the queue page. No pre-joined URLs.

## Engine change: `PlayerExample.tsx`

The existing harness only ever called `nmplayer(id).setup(config)` — sufficient for
config-only tour pages, but Stage 4 needs a genuinely live, hand-built overlay (buttons,
scrubber, subtitle menu) per step, not just a config. Added two small, additive,
backward-compatible hooks to `SnippetModule`:

- `configure?(player)` — called on the constructed instance **before** `setup()`, the only
  valid place to `addPlugin()` (`tour/subtitles` and `build/subtitle-menu` use it to register
  `SubtitleOverlayPlugin`, since `subtitle(idx)` only changes selection state — painting cue
  text needs the plugin).
- `onReady?(player, container)` — called once, synchronously, right after `setup()`; returns
  an optional cleanup function invoked on unmount. The 5 build-step files use this to build a
  real DOM overlay against `player.createElement`/`createButton` (the kit's own DOM helpers)
  and wire it to real methods/events (`togglePlayback()`, `time()`, `volume()`, `subtitle()`,
  `toggleFullscreen()`, ...).

Both fields are `undefined` on every existing config-only snippet (quickstart, all 8 tour
files), so behavior for every prior page is unchanged — verified by the Playwright run below,
which re-checks every page site-wide, not just the new ones.

## Verification

**`npx astro build`** — exit 0, 367 pages built, including all 13 new pages, no snippet
errors:
```
00:56:49 [build] ✓ Completed in 48.46s.
00:56:49 [build] 367 page(s) built in 49.91s
00:56:49 [build] Complete!
```
(One pre-existing unrelated warning appears during the build — `Entry nomercy-video-player →
en/index.mdx was not found` / `en/overview.mdx` — from a sitemap/redirect probe for slugs this
collection never used; present before this change, not touched by it.)

**`npx playwright test e2e/snippets.spec.ts`** — GREEN, both tests pass:
```
Running 2 tests using 1 worker

  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (32.6s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (47ms)

  2 passed (36.1s)
```
This is a site-wide gate — it walks every built page carrying a `[data-player-example]` and
waits for `data-player-ready`, so it covers all 13 new live islands (8 tour + 5 build) plus
the pre-existing quickstart island in one pass. None reported `data-player-error`.

**`npm run check:nav`** — OK:
```
Navigation manifest OK — every page is placed exactly once.
```

**`npm run check:links`** — 42 broken links reported, all pre-existing and all in
`nomercy-music-player` (never touched by this task; that collection's content predates the
v2 rebuild and references old core slugs). Zero broken links from any file this task touched
or created.

**`npm run check:docs`** — contract lint reports one violation:
```
ARC-SECTION-MISSING  nomercy-video-player  missing arc section(s): recipes, plugins-adapters, reference
```
Expected and pre-existing in shape: `.rebuild/progress.md` already tracked video content as
"2/7 stages done" before this task (intro + quickstart only); this task's scope was stages 3
and 4 only. Video is now 4/7 (recipes, plugins-adapters, reference remain, out of scope here).
Once that single lint item is satisfied, `check:docs` also re-runs the same Playwright gate
above internally and it passed standalone.

**TypeScript**: no dedicated typecheck script or `@types/node`/`astro check` dependency
exists in this repo (verified — neither is installed). A best-effort bare `tsc --noEmit`
against a temporarily-fetched TypeScript surfaces only pre-existing, unrelated environmental
gaps (missing `@types/node`, missing `mdx-annotations` type declarations, two pre-existing
issues in `Search.tsx`/`navigation.ts`); zero errors were attributed to any new `video-tour-*`
or `video-build-*` example file. The stronger proof is the Playwright gate above: it actually
executes the built JS from every new example against the real installed
`@nomercy-entertainment/nomercy-video-player@2.0.0-rc.21` in a real browser and confirms
`canplay` fires — a wrong method/event name would throw at runtime and surface as
`data-player-error`, which none did.

## Concerns / follow-ups

- Stages 5-7 (recipes, plugins-adapters, reference) for video remain unbuilt — separate task,
  tracked in `.rebuild/progress.md`.
- The 42 pre-existing broken links in `nomercy-music-player` are unrelated debt, flagged here
  only so they aren't mistaken for something this change introduced.
