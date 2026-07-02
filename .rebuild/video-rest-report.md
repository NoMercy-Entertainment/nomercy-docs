# Video docs: Stage 5 (Recipes & Frameworks) + Stage 6 (Plugins & Adapters) + Stage 7 (Reference)

Branch: `docs/v2-rebuild`. Not committed, tree left changed per instructions. This closes out
the `nomercy-video-player` arc, all 7 stages now exist (matching core, which finished earlier).

## Pages per stage

**Stage 5 — Recipes & Frameworks** (`src/content/nomercy-video-player/en/recipes/`, 9 pages):
`vue-integration`, `react-integration`, `svelte-integration`, `vanilla-integration` (framework
wrappers, the controller-plus-callback pattern generalized to each framework's own reactivity
primitive), `resume-playback`, `keyboard-shortcuts`, `quality-selection`, `playlist-queue`,
`auth-tokens` (task recipes named directly in the brief).

**Stage 6 — Plugins & Adapters** (`src/content/nomercy-video-player/en/plugins-adapters/`, 15
pages): one page per real plugin in `packages/nomercy-video-player/src/plugins/` (`desktop-ui`,
`tv-key-handler`, `key-handler`, `cast-sender`, `subtitle-overlay`, `octopus`, `media-session`,
`drm`, `touch-zones`, `live-transcoding`, `v1-compat`) and one per real adapter in
`src/adapters/` (`adapter-video-backend`, `adapter-chapter-source`, `adapter-thumbnail-source`,
`adapter-subtitle-style-store`). No invented plugins, cross-checked directory-by-directory
against source. Cross-library plugins re-exported from the video barrel for ergonomic imports
(audio-graph, canvas, equalizer, mixer, spectrum, visualization, embed, message, tab-leader)
already have core pages and are intentionally not re-documented here.

**Stage 7 — Reference** (`src/content/nomercy-video-player/en/reference/`, 4 pages):
`player-methods` (the `IVideoPlayer`-only method delta on top of `IPlayer`, everything inherited
is left to the Guided Tour, matching how core's own reference stage never duplicates its tour),
`config` (`VideoPlayerConfig` fields beyond `BasePlayerConfig`), `events` (`VideoEventMap`
in full), `types` (`VideoPlaylistItem`, `WatchProgress`, `VideoRect`/`containedRect()`,
`Stretching`, segment types, video-owned enums).

Registered in `src/lib/nav-structure.ts` under three new groups ("Recipes", "Plugins &
Adapters", "Reference") for `nomercy-video-player`. Added a forward link from
`build/fullscreen.mdx`'s Next Steps into `recipes/vue-integration` (previously dead-ended back
into the Guided Tour since stage 5 didn't exist yet).

## New example files (`src/examples/`)

4 new live files, one per recipe where a rendered player genuinely helps (framework-wrapper
pages and most task recipes stay code-block-only, matching core's own recipes/plugins-adapters
pages, which use plain fenced snippets rather than the runnable-snippet system for illustrative
subclass/interface examples):

- `video-recipe-vanilla-integration.ts`, `video-recipe-resume-playback.ts`,
  `video-recipe-quality-selection.ts`, `video-recipe-playlist-queue.ts`.

Every playlist uses `baseUrl` (`FILMS_BASE`) + relative item paths from `src/examples/media.ts`.
`resume-playback` additionally proves persistence within one mounted session (reads/writes
`localStorage` on `'progress'`/`'mediaReady'`), the closest a docs preview can get to a real
cross-reload resume without actually reloading the page.

## Verification

**`npx astro build`**, exit 0, 395 pages built, all 28 new pages present, no snippet or MDX
errors:
```
01:26:30 [build] ✓ Completed in 1m 11s.
01:26:30 [build] 395 page(s) built in 1m 13s
01:26:30 [build] Complete!
```
(The same pre-existing, unrelated warning from the prior stage report still appears,
`Entry nomercy-video-player → en/index.mdx was not found` / `en/overview.mdx`, from a
redirect/sitemap probe for slugs this collection never used. Present before this task, not
touched by it, does not affect exit code.)

One real bug caught and fixed during this pass: 6 frontmatter `description` fields used a
backslash-escaped apostrophe (`the kit\'s ...`) inside a single-quoted YAML string, invalid
YAML, the first `astro build` failed on it (`bad indentation of a mapping entry`). Fixed by
rephrasing each to avoid the possessive, re-verified every new page's frontmatter parses with
`gray-matter` before rebuilding.

**`npx playwright test e2e/snippets.spec.ts`**, GREEN:
```
Running 2 tests using 1 worker

  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (52.7s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (94ms)

  2 passed (56.9s)
```
Site-wide gate, covers all 4 new live islands plus every pre-existing one in one pass. None
reported `data-player-error`.

**`npm run check:docs`**, contract lint + Playwright gate, both green:
```
Contract OK — 3 trio collection(s) checked.

Contract lint passed — running the Playwright snippet gate...
  ✓  1 e2e\snippets.spec.ts:99:3 › ... (2.4s)
  ✓  2 e2e\snippets.spec.ts:139:3 › ... (106ms)
  2 passed (5.7s)
```
No `ARC-SECTION-MISSING`, no `CROSS-MEDIUM-TOKEN`, no `MISSING-TITLE`/`MISSING-ORDER`, no
`OVER-BUDGET` for any of the three trio collections.

**Video arc completeness**, verified directly against `ARC_SECTIONS` in `scripts/check-docs.mjs`
(43 total pages in the collection):
```
introduction : 1 page(s)
quickstart : 1 page(s)
tour : 8 page(s)
build : 5 page(s)
recipes : 9 page(s)
plugins-adapters : 15 page(s)
reference : 4 page(s)
Violations: []
```

**`npm run check:nav`**, OK:
```
Navigation manifest OK — every page is placed exactly once.
```

**`npm run check:links`**, 42 broken links reported, all pre-existing and all in
`nomercy-music-player` (unrelated, out of scope, zero music contamination rule respected, this
collection was never touched). Zero broken links from any file this task created or edited,
including the two music-side links that happen to point at `nomercy-video-player` paths
(`/nomercy-video-player`, `/nomercy-video-player/adapters/video-backend`), both pre-existing
wrong paths in music content this task did not author.

## Concerns / follow-ups

- The `nomercy-video-player` arc is now complete end to end (7/7 stages), matching core. Only
  `nomercy-music-player` remains for the trio-wide rebuild (tracked in `.rebuild/progress.md`).
- The 42 pre-existing broken links in `nomercy-music-player` are unrelated debt, flagged only so
  they are not mistaken for something this change introduced.
- `chapter-source` / `thumbnail-source` / `subtitle-style-store` adapters are documented as
  standalone, consumer-driven interfaces, verified against source that neither the player's
  built-in `chapters()` reader nor `DesktopUiPlugin`'s own scrub-preview actually route through
  them (both call their own internal helpers directly), so the docs describe this honestly
  rather than implying a wiring that does not exist.
