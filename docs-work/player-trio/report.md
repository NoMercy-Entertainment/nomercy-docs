# Player trio report

Gate: D5 batch gate, batch 02. INCOMPLETE 18 of 172.

```
docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)

    STATUS: INCOMPLETE
    Pages reviewed: 18 of 172
    Drafted, not reviewed: 0    Planned, not written: 154
    Review verdicts: 36 PASS, 0 FAIL, 308 missing
    Coverage: PASS

    This set is not delivered. Report it as INCOMPLETE, lead with these
    numbers, and do not describe the work as a finished pass.
```

This is not a finished pass. Batch 02 adds the eleven remaining core tour pages. The next batch starts at the first planned core row after the tour, `/nomercy-player-core/handbook/anatomy`.

Batch 02 site checks that passed after the table-row trim: `check:prose` clean, `check:density` 0 long paragraphs and 139 long sentences, `check:tiers` 0 rows over budget, `check:nav` ok, `check:links` ok, `check:docs` 2 passed and 431 snippet blocks parsed, `astro build` 489 pages. Atlas `reviews` still fails only on rows that are planned. Atlas `links` still fails only on `native/` targets.

## Pilot gate, kept below

Gate: D5 batch gate, pilot. INCOMPLETE 7 of 172.

```
docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)

    STATUS: INCOMPLETE
    Pages reviewed: 7 of 172
    Drafted, not reviewed: 0    Planned, not written: 165
    Review verdicts: 14 PASS, 0 FAIL, 330 missing
    Coverage: PASS

    This set is not delivered. Report it as INCOMPLETE, lead with these
    numbers, and do not describe the work as a finished pass.
```

This is not a finished pass. The next batch starts at the first planned core row, /nomercy-player-core/tour/adapters.

## D1. The atlas checks

```
===== status =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)

    STATUS: INCOMPLETE
    Pages reviewed: 7 of 172
    Drafted, not reviewed: 0    Planned, not written: 165
    Review verdicts: 14 PASS, 0 FAIL, 330 missing
    Coverage: PASS

    This set is not delivered. Report it as INCOMPLETE, lead with these
    numbers, and do not describe the work as a finished pass.


===== coverage =====

  read: 985 of 985 source files, across 986 listed path(s)
  skipped as secret-bearing: 6 file(s): ../../packages/player-web/nomercy-player-core/src/__tests__/append-auth-token-param.test.ts, ../../packages/player-web/nomercy-player-core/src/__tests__/title-tokens.test.ts, ../../packages/player-web/nomercy-player-core/src/core/append-auth-token-param.ts, ../../packages/player-web/nomercy-player-core/src/core/title-tokens.ts, ../../packages/player-web/nomercy-video-player/src/__tests__/plugins/title-token-ingest.test.ts
coverage: PASS

===== map =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)
  coverage: 985 of 985 source files claimed
map: PASS

===== reviews =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)
reviews: FAIL (165)
  - /nomercy-player-core/tour/adapters: still planned, so the set is not delivered
  - /nomercy-player-core/tour/composition-boundary: still planned, so the set is not delivered
  - /nomercy-player-core/tour/cue-parsers: still planned, so the set is not delivered
  - /nomercy-player-core/tour/errors: still planned, so the set is not delivered
  - /nomercy-player-core/tour/event-bus: still planned, so the set is not delivered
  - /nomercy-player-core/tour/i18n: still planned, so the set is not delivered
  - /nomercy-player-core/tour/lifecycle: still planned, so the set is not delivered
  - /nomercy-player-core/tour/plugin-base: still planned, so the set is not delivered
  - /nomercy-player-core/tour/state: still planned, so the set is not delivered
  - /nomercy-player-core/tour/time: still planned, so the set is not delivered
  - /nomercy-player-core/tour/transport: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/anatomy: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/building-dom: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/emitting: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/errors-state: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/i18n: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/listening: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/network: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/registration: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/styling: still planned, so the set is not delivered
  - /nomercy-player-core/handbook/timing: still planned, so the set is not delivered
  - /nomercy-player-core/build/add-a-plugin: still planned, so the set is not delivered
  - /nomercy-player-core/build/add-i18n: still planned, so the set is not delivered
  - /nomercy-player-core/build/backend-contract: still planned, so the set is not delivered
  - /nomercy-player-core/recipes/custom-cue-parser: still planned, so the set is not delivered
  - /nomercy-player-core/recipes/custom-url-resolver: still planned, so the set is not delivered
  - /nomercy-player-core/recipes/swap-an-adapter: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-audio-output: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-clock: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-cue-parser: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-element-factory: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-fetch: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-id-generator: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-language-matcher: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-logger: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-media-element: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-media-list: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-platform: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-preload-strategy: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-quality: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-realtime-channel: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-retry-policy: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-shuffle-strategy: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-storage: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-stream-source: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-subtitle-renderer: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-transition-strategy: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-translator: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/adapter-url-resolver: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/audio-graph: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/canvas: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/cast-sender: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/embed: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/equalizer: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/key-handler: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/media-session: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/message: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/mixer: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/spectrum: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/tab-leader: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/visualization: still planned, so the set is not delivered
  - /nomercy-player-core/plugins-adapters/volume-memory: still planned, so the set is not delivered
  - /nomercy-player-core/reference/composition: still planned, so the set is not delivered
  - /nomercy-player-core/reference/config: still planned, so the set is not delivered
  - /nomercy-player-core/reference/errors: still planned, so the set is not delivered
  - /nomercy-player-core/reference/events: still planned, so the set is not delivered
  - /nomercy-player-core/reference/metrics-and-accessibility: still planned, so the set is not delivered
  - /nomercy-player-core/reference/types: still planned, so the set is not delivered
  - /nomercy-player-core/reference/utilities: still planned, so the set is not delivered
  - /nomercy-video-player: still planned, so the set is not delivered
  - /nomercy-video-player/quickstart: still planned, so the set is not delivered
  - /nomercy-video-player/tour/audio-tracks: still planned, so the set is not delivered
  - /nomercy-video-player/tour/chapters: still planned, so the set is not delivered
  - /nomercy-video-player/tour/how-it-works: still planned, so the set is not delivered
  - /nomercy-video-player/tour/quality: still planned, so the set is not delivered
  - /nomercy-video-player/tour/queue: still planned, so the set is not delivered
  - /nomercy-video-player/tour/state-events: still planned, so the set is not delivered
  - /nomercy-video-player/tour/subtitles: still planned, so the set is not delivered
  - /nomercy-video-player/tour/transport: still planned, so the set is not delivered
  - /nomercy-video-player/tour/volume: still planned, so the set is not delivered
  - /nomercy-video-player/build/full-plugin: still planned, so the set is not delivered
  - /nomercy-video-player/build/fullscreen-speed: still planned, so the set is not delivered
  - /nomercy-video-player/build/play-pause: still planned, so the set is not delivered
  - /nomercy-video-player/build/progress-bar: still planned, so the set is not delivered
  - /nomercy-video-player/build/seek-preview: still planned, so the set is not delivered
  - /nomercy-video-player/build/selectors: still planned, so the set is not delivered
  - /nomercy-video-player/build/shell: still planned, so the set is not delivered
  - /nomercy-video-player/build/time-skip: still planned, so the set is not delivered
  - /nomercy-video-player/build/title-bar: still planned, so the set is not delivered
  - /nomercy-video-player/build/volume: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/auth-tokens: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/keyboard-shortcuts: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/migrate-from-v1: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/playlist-queue: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/quality-selection: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/react-integration: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/resume-playback: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/svelte-integration: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/vanilla-integration: still planned, so the set is not delivered
  - /nomercy-video-player/recipes/vue-integration: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/adapter-chapter-source: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/adapter-subtitle-style-store: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/adapter-thumbnail-source: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/adapter-video-backend: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/cast-sender: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/desktop-ui: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/desktop-ui-options: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/drm: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/key-handler: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/live-transcoding: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/media-session: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/octopus: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/plugin-development: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/subtitle-overlay: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/touch-zones: still planned, so the set is not delivered
  - /nomercy-video-player/plugins-adapters/tv-key-handler: still planned, so the set is not delivered
  - /nomercy-video-player/reference/config: still planned, so the set is not delivered
  - /nomercy-video-player/reference/events: still planned, so the set is not delivered
  - /nomercy-video-player/reference/player-methods: still planned, so the set is not delivered
  - /nomercy-video-player/reference/playlist-item: still planned, so the set is not delivered
  - /nomercy-video-player/reference/streams: still planned, so the set is not delivered
  - /nomercy-video-player/reference/types: still planned, so the set is not delivered
  - /nomercy-music-player: still planned, so the set is not delivered
  - /nomercy-music-player/quickstart: still planned, so the set is not delivered
  - /nomercy-music-player/tour/audio-output: still planned, so the set is not delivered
  - /nomercy-music-player/tour/crossfade: still planned, so the set is not delivered
  - /nomercy-music-player/tour/equalizer: still planned, so the set is not delivered
  - /nomercy-music-player/tour/how-it-works: still planned, so the set is not delivered
  - /nomercy-music-player/tour/lyrics: still planned, so the set is not delivered
  - /nomercy-music-player/tour/queue: still planned, so the set is not delivered
  - /nomercy-music-player/tour/state-events: still planned, so the set is not delivered
  - /nomercy-music-player/tour/time: still planned, so the set is not delivered
  - /nomercy-music-player/tour/transport: still planned, so the set is not delivered
  - /nomercy-music-player/tour/volume: still planned, so the set is not delivered
  - /nomercy-music-player/build/now-playing: still planned, so the set is not delivered
  - /nomercy-music-player/build/scrubber: still planned, so the set is not delivered
  - /nomercy-music-player/build/shell: still planned, so the set is not delivered
  - /nomercy-music-player/build/track-list: still planned, so the set is not delivered
  - /nomercy-music-player/build/volume: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/audio-output-switching: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/crossfade-gapless: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/equalizer-presets: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/lyrics-sync: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/migrate-from-v1: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/queue-playlist: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/react-integration: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/scrobbling: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/svelte-integration: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/vanilla-integration: still planned, so the set is not delivered
  - /nomercy-music-player/recipes/vue-integration: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/adapter-audio-backend: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/adapter-similarity-engine: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/auto-advance: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/cast-sender: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/key-handler: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/lyrics: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/media-session: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/plugin-development: still planned, so the set is not delivered
  - /nomercy-music-player/plugins-adapters/scrobble: still planned, so the set is not delivered
  - /nomercy-music-player/reference/config: still planned, so the set is not delivered
  - /nomercy-music-player/reference/events: still planned, so the set is not delivered
  - /nomercy-music-player/reference/player-methods: still planned, so the set is not delivered
  - /nomercy-music-player/reference/streams: still planned, so the set is not delivered
  - /nomercy-music-player/reference/types: still planned, so the set is not delivered

===== links-core =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)
  links: 218 internal link(s) checked
links: FAIL (2)
  - src/content/nomercy-player-core\en\native\quickstart.mdx: '/nomercy-player-core/native/methods' resolves to no page on the map
  - src/content/nomercy-player-core\en\native\quickstart.mdx: '/nomercy-player-core/native/errors' resolves to no page on the map

===== links-video =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)
  links: 172 internal link(s) checked
links: FAIL (2)
  - src/content/nomercy-video-player\en\native\quickstart.mdx: '/nomercy-video-player/native/methods' resolves to no page on the map
  - src/content/nomercy-video-player\en\native\quickstart.mdx: '/nomercy-video-player/native/migration' resolves to no page on the map

===== links-music =====

docs-work/player-trio/map.md: 172 page(s), 8 excluded path(s)
  links: 152 internal link(s) checked
links: FAIL (2)
  - src/content/nomercy-music-player\en\native\quickstart.mdx: '/nomercy-music-player/native/methods' resolves to no page on the map
  - src/content/nomercy-music-player\en\native\quickstart.mdx: '/nomercy-music-player/native/migration' resolves to no page on the map
```

Reading D1 for this batch: 
eviews problem lines are the 165 rows still planned. None of them is a page in the done set. links problem lines are all inside a 
ative/ folder.

## D2. The site checks

```
===== npm run build:native-reference =====

> nomercy-docs@0.0.1 build:native-reference
> node scripts/build-native-reference.mjs

native reference: 7 page(s) written from contract 2.2.3

===== npm run check:doc-imports =====

> nomercy-docs@0.0.1 check:doc-imports
> node scripts/check-doc-imports.mjs

Doc import specifiers OK ΓÇö 242 trio specifier(s) across 88 file(s) validated against the exports maps.

===== npm run check:symbols =====

> nomercy-docs@0.0.1 check:symbols
> node scripts/check-doc-symbols.mjs

check-doc-symbols: 238 named import(s) across 27 specifier(s) all resolve.

===== npm run check:examples =====

> nomercy-docs@0.0.1 check:examples
> tsc -p tsconfig.examples.json


===== npm run check:examples:published =====

> nomercy-docs@0.0.1 check:examples:published
> tsc -p tsconfig.examples-published.json


===== npm run check:api-coverage =====

> nomercy-docs@0.0.1 check:api-coverage
> node scripts/check-api-coverage.mjs

methods: 152/152 documented
events: 175/175 documented
error codes: 67/67 documented
api coverage: every symbol in contract 2.2.3 is documented

===== npm run check:prose =====

> nomercy-docs@0.0.1 check:prose
> node scripts/check-prose.mjs

check-prose: clean.

===== npm run check:density =====

> nomercy-docs@0.0.1 check:density
> node scripts/check-density.mjs

check-density: 0 long paragraph(s), 139 long sentence(s) across 435 pages ΓÇö under budget, lower BUDGET in scripts/check-density.mjs to 0 / 139

===== npm run check:tiers =====

> nomercy-docs@0.0.1 check:tiers
> node scripts/check-tiers.mjs

check-tiers: 0 intro table row(s) over budget, 0 same-tier collision(s), 0 spec-first catalogue page(s) across 172 pages

===== npm run check:nav =====

> nomercy-docs@0.0.1 check:nav
> node scripts/check-nav.js

Navigation manifest OK ΓÇö every page is placed exactly once.

===== npm run check:links =====

> nomercy-docs@0.0.1 check:links
> node scripts/check-links.js

Internal links OK (316 pages, 134 redirects).

===== npm run build:search =====

> nomercy-docs@0.0.1 build:search
> node scripts/build-search-index.js

Found 71 files in ./src/content/nomercy-player-core
Found 56 files in ./src/content/nomercy-video-player
Found 45 files in ./src/content/nomercy-music-player
Found 50 files in ./src/content/nomercy-media-server
Found 48 files in ./src/content/nomercy-app-web
Found 51 files in ./src/content/nomercy-api

Γ£ô Search index built with 316 documents
Γ£ô Search index saved to ./public/searchIndex.json

===== npm run check:docs =====

> nomercy-docs@0.0.1 check:docs
> node scripts/check-docs.mjs

Contract OK — 3 trio collection(s) checked.

Contract lint passed — running the Playwright snippet gate...
[WebServer] 
[WebServer] > nomercy-docs@0.0.1 build:search
[WebServer] > node scripts/build-search-index.js
[WebServer] 
[WebServer] Found 71 files in ./src/content/nomercy-player-core
[WebServer] Found 56 files in ./src/content/nomercy-video-player
[WebServer] Found 45 files in ./src/content/nomercy-music-player
[WebServer] Found 50 files in ./src/content/nomercy-media-server
[WebServer] Found 48 files in ./src/content/nomercy-app-web
[WebServer] Found 51 files in ./src/content/nomercy-api
[WebServer] 
[WebServer] ✓ Search index built with 316 documents
[WebServer] ✓ Search index saved to ./public/searchIndex.json
[WebServer] 20:58:16 [content] Syncing content
[WebServer] 20:58:16 [content] Synced content
[WebServer] 20:58:16 [types] Generated 704ms
[WebServer] 20:58:16 [build] output: "static"
[WebServer] 20:58:16 [build] mode: "static"
[WebServer] 20:58:16 [build] directory: C:\Users\Alexander\Documents\Alex\20 Ontwikkeling\NoMercy Support\nomercy\docs\nomercy-docs\dist-e2e\
[WebServer] 20:58:16 [build] Collecting build info...
[WebServer] 20:58:16 [build] ✓ Completed in 801ms.
[WebServer] 20:58:17 [build] Building static entrypoints...
[WebServer] 20:59:13 [vite] ✓ built in 56.05s
[WebServer] 20:59:13 [WARN] [vite] 
[WebServer] new URL("./styles.css", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
[WebServer] 20:59:13 [WARN] [vite] 
[WebServer] new URL("/subtitles-octopus-worker.js", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
[WebServer] 20:59:13 [WARN] [vite] 
[WebServer] new URL("/subtitles-octopus-worker-legacy.js", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
[WebServer] 20:59:13 [WARN] [vite] 
[WebServer] new URL("/default.ttf", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
[WebServer] 20:59:14 [WARN] [vite] [plugin builtin:vite-reporter] 
[WebServer] (!) Some chunks are larger than 500 kB after minification. Consider:
[WebServer] - Using dynamic import() to code-split the application
[WebServer] - Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
[WebServer] - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
[WebServer] 20:59:14 [WARN] [vite] [COMMONJS_VARIABLE_IN_ESM] The CommonJS `module` variable is treated as a global variable in an ECMAScript module and may not work as expected
[WebServer]      ╭─[ node_modules/@nomercy-entertainment/nomercy-subtitle-octopus/dist/nomercy-subtitle-octopus.js:712:77 ]
[WebServer]      │
[WebServer]  712 │ typeof exports < "u" && typeof module < "u" && module.exports && (exports = module.exports = U);
[WebServer]      │                                                                             ───┬──  
[WebServer]      │                                                                                ╰──── 
[WebServer]      │ 
[WebServer]  856 │ export {
[WebServer]      │ ───┬──  
[WebServer]      │    ╰──── This file is considered to be an ECMAScript module because of the `export` keyword here:
[WebServer] ─────╯
[WebServer] 
[WebServer] 20:59:14 [vite] ✓ built in 1.29s
[WebServer] 20:59:15 [build] Rearranging server assets...
[WebServer] 
[WebServer]  generating static routes 
[WebServer] 20:59:16   ├─ /api/search[WebServer]  (+21ms) 
[WebServer] 20:59:16   ├─ /app/index/index.html[WebServer]  (+3ms) 
[WebServer] 20:59:16   ├─ /app/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:16   ├─ /attachments/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /contacts/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /conversations/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /groups/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /mediaserver/configuration/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /mediaserver/index/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /mediaserver/overview/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /mediaserver/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:16   ├─ /messages/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:16   ├─ /nm-components/index.html[WebServer]  (+100ms) 
[WebServer] 20:59:16   ├─ /nm-components/box/index.html[WebServer]  (+57ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/accordion/index.html[WebServer]  (+57ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/alert/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/avatar/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/badge/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/badge-group/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:16   ├─ /nm-components/components/breadcrumb/index.html[WebServer]  (+44ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/button/index.html[WebServer]  (+54ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/button-group/index.html[WebServer]  (+35ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/card/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/carousel/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/chat/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/checkbox/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/checkbox-group/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/color-picker/index.html[WebServer]  (+43ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/combobox/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/command-palette/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/content-footer/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/content-header/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/date-picker/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/divider/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/drawer/index.html[WebServer]  (+52ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/dropdown/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/empty-state/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/file-upload/index.html[WebServer]  (+44ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/form-label/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/helper/index.html[WebServer]  (+47ms) 
[WebServer] 20:59:17   ├─ /nm-components/components/icon-picker/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/image/index.html[WebServer]  (+59ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/input/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/link/index.html[WebServer]  (+51ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/list/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/metrics/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/modal/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/navigation/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/pagination/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/popover/index.html[WebServer]  (+53ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/progress/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/radio/index.html[WebServer]  (+47ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/radio-group/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/rating/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/search-input/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/segmented/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/select/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/skeleton/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/slider/index.html[WebServer]  (+52ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/spinner/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/step-indicator/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:18   ├─ /nm-components/components/stepper/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/table/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/tabs/index.html[WebServer]  (+59ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/tag/index.html[WebServer]  (+116ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/textarea/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/toast/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/toggle/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/toggles/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/tooltip/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:19   ├─ /nm-components/components/tree-view/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:19   ├─ /nm-components/dashboards/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:19   ├─ /nm-components/overview/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:19   ├─ /nm-components/payloads/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:19   ├─ /nm-components/theming/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/authentication/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/errors/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/kitchen-sink/index.html[WebServer]  (+64ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/overview/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/pagination/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/rest/albums/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/rest/artists/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/rest/collections/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:19   ├─ /nomercy-api/rest/config/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/content-segments/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/devices/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/encoder-bundles/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/encoder-profiles/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/encoding-history/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/encoding-presets/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/genres/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/hardware-benchmark/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/home/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/libraries/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/libraries-admin/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/logs-api/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/movies/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/music/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/music-genres/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/optical-media/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/people/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/playlists/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/plugins-api/index.html[WebServer]  (+57ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/recommendations/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/search/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/server/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/server-activity/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/specials/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/storage-browser/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/streaming/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/tasks/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/tracks/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/tv-shows/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/user-data/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/users-admin/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/rest/workers/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/signalr/cast-hub/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:20   ├─ /nomercy-api/signalr/content-analysis-hub/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/dashboard-hub/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/device-hub/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/drives-hub/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/music-hub/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/overview/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/ripper-hub/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:21   ├─ /nomercy-api/signalr/video-hub/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/connecting/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/devices/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/libraries/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/logs/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/overview/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/server-info/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/dashboard/users/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/foreground-service/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/home/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/info/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/install/phone/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/install/tv/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/libraries/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/library/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/cards/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/cast/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/genres/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/home/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/list/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/mini-player/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/player/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/music/queue/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/notifications/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/overview/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/person/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/preferences/about/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/preferences/devices/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/preferences/display/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/preferences/profile/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/search/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/auth-handoff/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/login-phone/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/login-tv/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/name-device/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/select-server/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/setup/server-offline/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/troubleshooting/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/cast/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/quality/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/remote-control/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/subtitles/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/tv-remote/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/watch/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-android/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/chromecast/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/connecting/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/activity/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/content-analysis/index.html[WebServer]  (+19ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/devices/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/distribution/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/encoder-profiles/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/hardware/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/libraries/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/live-sessions/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/logs/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/notifications/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/overview/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/plugins/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/recommendations/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/ripper/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/specials/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/storage/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/dashboard/users/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/home/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/info/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/libraries/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/library/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/music/album/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/music/artist/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/music/home/index.html[WebServer]  (+19ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/music/playlist/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/overview/index.html[WebServer]  (+17ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/person/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/platforms/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:21   ├─ /nomercy-app-web/preferences/devices/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/preferences/display/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/preferences/profile/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/preferences/subtitles/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/quality/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/search/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/setup/first-run/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/setup/name-device/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/setup/select-server/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/setup/server-offline/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/subtitles/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/troubleshooting/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:22   ├─ /nomercy-app-web/watch/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/autostart/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/config/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/logs/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/overview/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/plugins-cli/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/queue/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/start-stop/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/cli/update/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/configuration/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/connect/overview/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/formats/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/hardware/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/history/index.html[WebServer]  (+19ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/model/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/overview/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/encoding/profiles/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/first-run/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation-guide/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/docker/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/linux-arch/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/linux-deb/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/linux-rpm/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/macos/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/nas/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/installation/windows/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/libraries/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/maintenance/backups/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:22   ├─ /nomercy-media-server/maintenance/migrate/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/maintenance/upgrade/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/media/metadata/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/media/optical/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/media/scanning/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/media/specials/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/networking/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/overview/index.html[WebServer]  (+19ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/plugins/developing/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/plugins/installing/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/plugins/overview/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/plugins/repository-index/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/plugins/trusted-publishers/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/security/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/storage/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/storage-model/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/troubleshooting/common-issues/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/troubleshooting/diagnostics/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/troubleshooting/error-codes/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/troubleshooting/logs/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:23   ├─ /nomercy-media-server/users/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/introduction/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/build/now-playing/index.html[WebServer]  (+61ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/build/scrubber/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/build/shell/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/build/track-list/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/build/volume/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/native/events/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/native/methods/index.html[WebServer]  (+131ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/native/migration/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/native/quickstart/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:23   ├─ /nomercy-music-player/plugins-adapters/adapter-audio-backend/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/adapter-similarity-engine/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/auto-advance/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/cast-sender/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/key-handler/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/lyrics/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/media-session/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/plugin-development/index.html[WebServer]  (+110ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/plugins-adapters/scrobble/index.html[WebServer]  (+61ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/quickstart/index.html[WebServer]  (+44ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/audio-output-switching/index.html[WebServer]  (+64ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/crossfade-gapless/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/equalizer-presets/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/lyrics-sync/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/migrate-from-v1/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/queue-playlist/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/react-integration/index.html[WebServer]  (+58ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/scrobbling/index.html[WebServer]  (+35ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/svelte-integration/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/vanilla-integration/index.html[WebServer]  (+74ms) 
[WebServer] 20:59:24   ├─ /nomercy-music-player/recipes/vue-integration/index.html[WebServer]  (+66ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/reference/config/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/reference/events/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/reference/player-methods/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/reference/types/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/audio-output/index.html[WebServer]  (+47ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/crossfade/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/equalizer/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/how-it-works/index.html[WebServer]  (+35ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/lyrics/index.html[WebServer]  (+43ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/queue/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/state-events/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/time/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/transport/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:25   ├─ /nomercy-music-player/tour/volume/index.html[WebServer]  (+54ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/introduction/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/build/add-a-plugin/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/build/add-i18n/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/build/backend-contract/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/build/compose-methods/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/handbook/anatomy/index.html[WebServer]  (+57ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/handbook/building-dom/index.html[WebServer]  (+55ms) 
[WebServer] 20:59:25   ├─ /nomercy-player-core/handbook/emitting/index.html[WebServer]  (+60ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/errors-state/index.html[WebServer]  (+58ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/i18n/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/listening/index.html[WebServer]  (+59ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/network/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/registration/index.html[WebServer]  (+54ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/styling/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/handbook/timing/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/native/errors/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/native/events/index.html[WebServer]  (+85ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/native/methods/index.html[WebServer]  (+139ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/native/migration/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/native/quickstart/index.html[WebServer]  (+83ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/plugins-adapters/adapter-audio-output/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/plugins-adapters/adapter-cue-parser/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/plugins-adapters/adapter-event-bus/index.html[WebServer]  (+53ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:26   ├─ /nomercy-player-core/plugins-adapters/adapter-platform/index.html[WebServer]  (+49ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-preload-strategy/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-realtime-channel/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-shuffle-strategy/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-storage/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-stream-source/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-transition-strategy/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-translator/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/adapter-url-resolver/index.html[WebServer]  (+42ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/audio-graph/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/canvas/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/cast-sender/index.html[WebServer]  (+51ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/embed/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/equalizer/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/key-handler/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/media-session/index.html[WebServer]  (+47ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/message/index.html[WebServer]  (+45ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/mixer/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/spectrum/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/tab-leader/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/visualization/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/plugins-adapters/volume-memory/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/quickstart/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/recipes/auth-fetch/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:27   ├─ /nomercy-player-core/recipes/custom-cue-parser/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/recipes/custom-url-resolver/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/recipes/swap-an-adapter/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/composition/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/config/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/errors/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/events/index.html[WebServer]  (+84ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/metrics-and-accessibility/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/testing/index.html[WebServer]  (+48ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/types/index.html[WebServer]  (+165ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/reference/utilities/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/adapters/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/composition-boundary/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/cue-parsers/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/errors/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/event-bus/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/i18n/index.html[WebServer]  (+43ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/lifecycle/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/plugin-base/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:28   ├─ /nomercy-player-core/tour/queue/index.html[WebServer]  (+81ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-core/tour/state/index.html[WebServer]  (+64ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-core/tour/time/index.html[WebServer]  (+61ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-core/tour/transport/index.html[WebServer]  (+53ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/introduction/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/build/add-a-plugin/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/build/add-i18n/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/build/backend-contract/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/build/compose-methods/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/anatomy/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/building-dom/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/emitting/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/errors-state/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/i18n/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/listening/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/network/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/registration/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/styling/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/handbook/timing/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/native/errors/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/native/events/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/native/methods/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/native/migration/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/native/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-audio-output/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-cue-parser/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-event-bus/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-lifecycle-registry/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-platform/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-preload-strategy/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-realtime-channel/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-shuffle-strategy/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-storage/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-stream-source/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-transition-strategy/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-translator/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/adapter-url-resolver/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/audio-graph/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/canvas/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/cast-sender/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/embed/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/equalizer/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/key-handler/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/media-session/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/message/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/mixer/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/spectrum/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/tab-leader/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/visualization/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/plugins-adapters/volume-memory/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/recipes/auth-fetch/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/recipes/custom-cue-parser/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/recipes/custom-url-resolver/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/recipes/swap-an-adapter/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/composition/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/config/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/errors/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/events/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/metrics-and-accessibility/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/testing/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/types/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/reference/utilities/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/adapters/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/composition-boundary/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/cue-parsers/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/errors/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/event-bus/index.html[WebServer]  (+3ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/i18n/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/lifecycle/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/plugin-base/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/queue/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/state/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/time/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-player-kit/tour/transport/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/index.html[WebServer]  (+54ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/audio-tools/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/auth-claims/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/browser-headless/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/cast-send/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/encoder-dispatch/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/encoder-profile/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/events-publish/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/events-subscribe/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/hub/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/jobs-dispatch/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/jobs-status/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/library-import/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/library-read/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/library-watch/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/library-write/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-live/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-proxy/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-record/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-remux/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-source/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/media-transcode/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:29   ├─ /nomercy-plugins/capabilities/metadata-provide/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/metadata-query/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/music-analysis-read/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/music-analysis-write/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/native-code/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/network-dial/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/network-discover/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/network-fetch/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/network-listen/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/notifications-push/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/player-control/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/player-queue/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/player-source/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/player-state/index.html[WebServer]  (+27ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/process-spawn/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/rest/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/scheduler/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/secrets/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/server-info/index.html[WebServer]  (+30ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/settings/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/storage-derived/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/storage-path/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/storage-private/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/storage-temp/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/ui-input/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/ui-mount/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/ui-overlay/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/ui-webview/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/user-identity/index.html[WebServer]  (+29ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/user-playlists/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/user-preferences/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/user-watch/index.html[WebServer]  (+33ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/capabilities/users-list/index.html[WebServer]  (+28ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/handbook/runtime-and-isolation/index.html[WebServer]  (+36ms) 
[WebServer] 20:59:30   ├─ /nomercy-plugins/overview/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/introduction/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/plugins/auto-advance/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/plugins/tv-ui/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/index.html[WebServer]  (+35ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/build/full-plugin/index.html[WebServer]  (+307ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/build/fullscreen-speed/index.html[WebServer]  (+181ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/build/play-pause/index.html[WebServer]  (+95ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/build/progress-bar/index.html[WebServer]  (+118ms) 
[WebServer] 20:59:31   ├─ /nomercy-video-player/build/seek-preview/index.html[WebServer]  (+304ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/build/selectors/index.html[WebServer]  (+263ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/build/shell/index.html[WebServer]  (+69ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/build/time-skip/index.html[WebServer]  (+116ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/build/title-bar/index.html[WebServer]  (+141ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/build/volume/index.html[WebServer]  (+180ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/native/events/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:32   ├─ /nomercy-video-player/native/methods/index.html[WebServer]  (+168ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/native/migration/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/native/quickstart/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/adapter-chapter-source/index.html[WebServer]  (+47ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/adapter-subtitle-style-store/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/adapter-thumbnail-source/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/adapter-video-backend/index.html[WebServer]  (+66ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/cast-sender/index.html[WebServer]  (+35ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/desktop-ui/index.html[WebServer]  (+108ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/desktop-ui-options/index.html[WebServer]  (+70ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/drm/index.html[WebServer]  (+70ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/key-handler/index.html[WebServer]  (+128ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/media-session/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/octopus/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/plugin-development/index.html[WebServer]  (+86ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/subtitle-overlay/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/touch-zones/index.html[WebServer]  (+32ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/plugins-adapters/tv-key-handler/index.html[WebServer]  (+37ms) 
[WebServer] 20:59:33   ├─ /nomercy-video-player/quickstart/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/auth-tokens/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/keyboard-shortcuts/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/migrate-from-v1/index.html[WebServer]  (+56ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/playlist-queue/index.html[WebServer]  (+79ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/quality-selection/index.html[WebServer]  (+63ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/react-integration/index.html[WebServer]  (+69ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/resume-playback/index.html[WebServer]  (+59ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/svelte-integration/index.html[WebServer]  (+46ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/vanilla-integration/index.html[WebServer]  (+87ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/recipes/vue-integration/index.html[WebServer]  (+76ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/config/index.html[WebServer]  (+41ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/events/index.html[WebServer]  (+44ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/player-methods/index.html[WebServer]  (+62ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/playlist-item/index.html[WebServer]  (+40ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/streams/index.html[WebServer]  (+31ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/reference/types/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/tour/audio-tracks/index.html[WebServer]  (+50ms) 
[WebServer] 20:59:34   ├─ /nomercy-video-player/tour/chapters/index.html[WebServer]  (+58ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/how-it-works/index.html[WebServer]  (+39ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/quality/index.html[WebServer]  (+60ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/queue/index.html[WebServer]  (+71ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/state-events/index.html[WebServer]  (+64ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/subtitles/index.html[WebServer]  (+69ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/transport/index.html[WebServer]  (+72ms) 
[WebServer] 20:59:35   ├─ /nomercy-video-player/tour/volume/index.html[WebServer]  (+52ms) 
[WebServer] 20:59:35   ├─ /player/advanced/custom-adapter/index.html[WebServer]  (+3ms) 
[WebServer] 20:59:35   ├─ /player/advanced/custom-backend/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/advanced/custom-plugin/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/advanced/distributed-playback/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/advanced/embedding/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/advanced/migration-from-other-players/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/advanced/multi-instance/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/advanced/performance/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/advanced/server-side-rendering/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/advanced/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/architecture/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/faq/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/adapters/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/kit/auth-fetch/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/errors/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/kit/event-system/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/kit/i18n/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/kit/lifecycle/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/kit/metrics/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/plugins/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/testing/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/kit/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/migration-v1-v2/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/music/api-methods/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/music/configuration/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/crossfade/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/music/equalizer/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/music/events/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/framework-react/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/framework-vue/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/music/lyrics/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/migration-v1-v2/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/plugin-development/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/music/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/plugin-authoring/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/plugin-standard/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/recipes/auth-and-tokens/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/chapters/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/recipes/crossfade-and-gapless/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/keyboard-shortcuts/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/lyrics-and-equalizer/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/media-session/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/persistence/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/recipes/playlist-and-queue/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/recipes/quality-selection/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/recipes/subtitles/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/recipes/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/troubleshooting/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/versioning/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/api-methods/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/video/cast-sender/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/video/chapters/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/configuration/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/video/desktop-ui/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/events/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/framework-react/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/framework-vue/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /player/video/hls/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/migration-v1-v2/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/plugin-development/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/skipper/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/subtitle-overlay/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/video/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /player/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /quickstart/index.html[WebServer]  (+1ms) 
[WebServer] 20:59:35   ├─ /sdks/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /webhooks/index.html[WebServer]  (+2ms) 
[WebServer] 20:59:35   ├─ /index.html[WebServer]  (+19ms) 
[WebServer] 20:59:35   ├─ /en/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:35   ├─ /authentication/index.html[WebServer]  (+19ms) 
[WebServer] 20:59:35   ├─ /errors/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:35   ├─ /kitchen-sink/index.html[WebServer]  (+38ms) 
[WebServer] 20:59:35   ├─ /overview/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:35   ├─ /pagination/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:35   ├─ /rest/albums/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:35   ├─ /rest/artists/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:35   ├─ /rest/collections/index.html[WebServer]  (+26ms) 
[WebServer] 20:59:35   ├─ /rest/config/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:35   ├─ /rest/content-segments/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:35   ├─ /rest/devices/index.html[WebServer]  (+13ms) 
[WebServer] 20:59:35   ├─ /rest/encoder-bundles/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:35   ├─ /rest/encoder-profiles/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:35   ├─ /rest/encoding-history/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:35   ├─ /rest/encoding-presets/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:35   ├─ /rest/genres/index.html[WebServer]  (+17ms) 
[WebServer] 20:59:35   ├─ /rest/hardware-benchmark/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:35   ├─ /rest/home/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:35   ├─ /rest/libraries/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:35   ├─ /rest/libraries-admin/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:36   ├─ /rest/logs-api/index.html[WebServer]  (+22ms) 
[WebServer] 20:59:36   ├─ /rest/movies/index.html[WebServer]  (+24ms) 
[WebServer] 20:59:36   ├─ /rest/music/index.html[WebServer]  (+15ms) 
[WebServer] 20:59:36   ├─ /rest/music-genres/index.html[WebServer]  (+16ms) 
[WebServer] 20:59:36   ├─ /rest/optical-media/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:36   ├─ /rest/people/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:36   ├─ /rest/playlists/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:36   ├─ /rest/plugins-api/index.html[WebServer]  (+34ms) 
[WebServer] 20:59:36   ├─ /rest/recommendations/index.html[WebServer]  (+15ms) 
[WebServer] 20:59:36   ├─ /rest/search/index.html[WebServer]  (+17ms) 
[WebServer] 20:59:36   ├─ /rest/server/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:36   ├─ /rest/server-activity/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:36   ├─ /rest/specials/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:36   ├─ /rest/storage-browser/index.html[WebServer]  (+13ms) 
[WebServer] 20:59:36   ├─ /rest/streaming/index.html[WebServer]  (+25ms) 
[WebServer] 20:59:36   ├─ /rest/tasks/index.html[WebServer]  (+16ms) 
[WebServer] 20:59:36   ├─ /rest/tracks/index.html[WebServer]  (+20ms) 
[WebServer] 20:59:36   ├─ /rest/tv-shows/index.html[WebServer]  (+21ms) 
[WebServer] 20:59:36   ├─ /rest/user-data/index.html[WebServer]  (+17ms) 
[WebServer] 20:59:36   ├─ /rest/users-admin/index.html[WebServer]  (+23ms) 
[WebServer] 20:59:36   ├─ /rest/workers/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:36   ├─ /signalr/cast-hub/index.html[WebServer]  (+13ms) 
[WebServer] 20:59:36   ├─ /signalr/content-analysis-hub/index.html[WebServer]  (+16ms) 
[WebServer] 20:59:36   ├─ /signalr/dashboard-hub/index.html[WebServer]  (+13ms) 
[WebServer] 20:59:36   ├─ /signalr/device-hub/index.html[WebServer]  (+16ms) 
[WebServer] 20:59:36   ├─ /signalr/drives-hub/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:36   ├─ /signalr/music-hub/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:36   ├─ /signalr/overview/index.html[WebServer]  (+14ms) 
[WebServer] 20:59:36   ├─ /signalr/ripper-hub/index.html[WebServer]  (+13ms) 
[WebServer] 20:59:36   ├─ /signalr/video-hub/index.html[WebServer]  (+18ms) 
[WebServer] 20:59:36 ✓ Completed in 21.34s.
[WebServer] 
[WebServer] 20:59:36 [build] ✓ Completed in 1m 19s.
[WebServer] 20:59:36 [build] 489 page(s) built in 1m 21s
[WebServer] 20:59:36 [build] Complete!
[WebServer] Preview ready at http://localhost:4323/

Running 2 tests using 1 worker

(node:4584) Warning: The 'NO_COLOR' env is ignored due to the 'FORCE_COLOR' env being set.
(Use `node --trace-warnings ...` to show where the warning was created)
  ok 1 e2e\snippets.spec.ts:101:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (20.1s)
  ok 2 e2e\snippets.spec.ts:141:3 › live snippet gate › the built site has doc pages to gate (90ms)

  2 passed (1.8m)

Playwright snippet gate passed — checking every rendered snippet parses...
Snippet syntax OK — 437 block(s) parsed, 553 marked partial and skipped.

===== npx astro build =====

21:00:46 [content] Syncing content
21:00:46 [content] Synced content
21:00:46 [types] Generated 759ms
21:00:46 [build] output: "static"
21:00:46 [build] mode: "static"
21:00:46 [build] directory: C:\Users\Alexander\Documents\Alex\20 Ontwikkeling\NoMercy Support\nomercy\docs\nomercy-docs\dist\
21:00:46 [build] Collecting build info...
21:00:46 [build] ✓ Completed in 838ms.
21:00:47 [build] Building static entrypoints...
21:01:48 [vite] ✓ built in 1m 1s
21:01:48 [WARN] [vite] 
new URL("./styles.css", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
21:01:48 [WARN] [vite] 
new URL("/subtitles-octopus-worker.js", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
21:01:48 [WARN] [vite] 
new URL("/subtitles-octopus-worker-legacy.js", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
21:01:48 [WARN] [vite] 
new URL("/default.ttf", import.meta.url) doesn't exist at build time, it will remain unchanged to be resolved at runtime. If this is intended, you can use the /* @vite-ignore */ comment to suppress this warning.
21:01:49 [WARN] [vite] [plugin builtin:vite-reporter] 
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
21:01:49 [WARN] [vite] [33m[COMMONJS_VARIABLE_IN_ESM] [0mThe CommonJS `module` variable is treated as a global variable in an ECMAScript module and may not work as expected
     [38;5;246m╭[0m[38;5;246m─[0m[38;5;246m[[0m node_modules/@nomercy-entertainment/nomercy-subtitle-octopus/dist/nomercy-subtitle-octopus.js:712:77 [38;5;246m][0m
     [38;5;246m│[0m
 [38;5;246m712 │[0m [38;5;249mt[0m[38;5;249my[0m[38;5;249mp[0m[38;5;249me[0m[38;5;249mo[0m[38;5;249mf[0m[38;5;249m [0m[38;5;249me[0m[38;5;249mx[0m[38;5;249mp[0m[38;5;249mo[0m[38;5;249mr[0m[38;5;249mt[0m[38;5;249ms[0m[38;5;249m [0m[38;5;249m<[0m[38;5;249m [0m[38;5;249m"[0m[38;5;249mu[0m[38;5;249m"[0m[38;5;249m [0m[38;5;249m&[0m[38;5;249m&[0m[38;5;249m [0m[38;5;249mt[0m[38;5;249my[0m[38;5;249mp[0m[38;5;249me[0m[38;5;249mo[0m[38;5;249mf[0m[38;5;249m [0m[38;5;249mm[0m[38;5;249mo[0m[38;5;249md[0m[38;5;249mu[0m[38;5;249ml[0m[38;5;249me[0m[38;5;249m [0m[38;5;249m<[0m[38;5;249m [0m[38;5;249m"[0m[38;5;249mu[0m[38;5;249m"[0m[38;5;249m [0m[38;5;249m&[0m[38;5;249m&[0m[38;5;249m [0m[38;5;249mm[0m[38;5;249mo[0m[38;5;249md[0m[38;5;249mu[0m[38;5;249ml[0m[38;5;249me[0m[38;5;249m.[0m[38;5;249me[0m[38;5;249mx[0m[38;5;249mp[0m[38;5;249mo[0m[38;5;249mr[0m[38;5;249mt[0m[38;5;249ms[0m[38;5;249m [0m[38;5;249m&[0m[38;5;249m&[0m[38;5;249m [0m[38;5;249m([0m[38;5;249me[0m[38;5;249mx[0m[38;5;249mp[0m[38;5;249mo[0m[38;5;249mr[0m[38;5;249mt[0m[38;5;249ms[0m[38;5;249m [0m[38;5;249m=[0m[38;5;249m [0mmodule[38;5;249m.[0m[38;5;249me[0m[38;5;249mx[0m[38;5;249mp[0m[38;5;249mo[0m[38;5;249mr[0m[38;5;249mt[0m[38;5;249ms[0m[38;5;249m [0m[38;5;249m=[0m[38;5;249m [0m[38;5;249mU[0m[38;5;249m)[0m[38;5;249m;[0m
 [38;5;240m    │[0m                                                                             ───┬──  
 [38;5;240m    │[0m                                                                                ╰──── 
 [38;5;240m    │[0m 
 [38;5;246m856 │[0m export[38;5;249m [0m[38;5;249m{[0m
 [38;5;240m    │[0m ───┬──  
 [38;5;240m    │[0m    ╰──── This file is considered to be an ECMAScript module because of the `export` keyword here:
[38;5;246m─────╯[0m

21:01:49 [vite] ✓ built in 1.28s
21:01:50 [build] Rearranging server assets...

 generating static routes 
21:01:51   ├─ /api/search (+24ms) 
21:01:51   ├─ /app/index/index.html (+2ms) 
21:01:51   ├─ /app/index.html (+1ms) 
21:01:51   ├─ /attachments/index.html (+2ms) 
21:01:51   ├─ /contacts/index.html (+2ms) 
21:01:51   ├─ /conversations/index.html (+2ms) 
21:01:51   ├─ /groups/index.html (+2ms) 
21:01:51   ├─ /mediaserver/configuration/index.html (+2ms) 
21:01:51   ├─ /mediaserver/index/index.html (+3ms) 
21:01:51   ├─ /mediaserver/overview/index.html (+2ms) 
21:01:51   ├─ /mediaserver/index.html (+1ms) 
21:01:51   ├─ /messages/index.html (+1ms) 
21:01:51   ├─ /nm-components/index.html (+123ms) 
21:01:51   ├─ /nm-components/box/index.html (+65ms) 
21:01:51   ├─ /nm-components/components/accordion/index.html (+71ms) 
21:01:51   ├─ /nm-components/components/alert/index.html (+58ms) 
21:01:52   ├─ /nm-components/components/avatar/index.html (+49ms) 
21:01:52   ├─ /nm-components/components/badge/index.html (+48ms) 
21:01:52   ├─ /nm-components/components/badge-group/index.html (+43ms) 
21:01:52   ├─ /nm-components/components/breadcrumb/index.html (+47ms) 
21:01:52   ├─ /nm-components/components/button/index.html (+55ms) 
21:01:52   ├─ /nm-components/components/button-group/index.html (+45ms) 
21:01:52   ├─ /nm-components/components/card/index.html (+49ms) 
21:01:52   ├─ /nm-components/components/carousel/index.html (+49ms) 
21:01:52   ├─ /nm-components/components/chat/index.html (+49ms) 
21:01:52   ├─ /nm-components/components/checkbox/index.html (+40ms) 
21:01:52   ├─ /nm-components/components/checkbox-group/index.html (+44ms) 
21:01:52   ├─ /nm-components/components/color-picker/index.html (+46ms) 
21:01:52   ├─ /nm-components/components/combobox/index.html (+46ms) 
21:01:52   ├─ /nm-components/components/command-palette/index.html (+36ms) 
21:01:52   ├─ /nm-components/components/content-footer/index.html (+48ms) 
21:01:52   ├─ /nm-components/components/content-header/index.html (+48ms) 
21:01:52   ├─ /nm-components/components/date-picker/index.html (+55ms) 
21:01:52   ├─ /nm-components/components/divider/index.html (+48ms) 
21:01:52   ├─ /nm-components/components/drawer/index.html (+48ms) 
21:01:52   ├─ /nm-components/components/dropdown/index.html (+49ms) 
21:01:52   ├─ /nm-components/components/empty-state/index.html (+47ms) 
21:01:53   ├─ /nm-components/components/file-upload/index.html (+43ms) 
21:01:53   ├─ /nm-components/components/form-label/index.html (+57ms) 
21:01:53   ├─ /nm-components/components/helper/index.html (+53ms) 
21:01:53   ├─ /nm-components/components/icon-picker/index.html (+49ms) 
21:01:53   ├─ /nm-components/components/image/index.html (+52ms) 
21:01:53   ├─ /nm-components/components/input/index.html (+54ms) 
21:01:53   ├─ /nm-components/components/link/index.html (+57ms) 
21:01:53   ├─ /nm-components/components/list/index.html (+55ms) 
21:01:53   ├─ /nm-components/components/metrics/index.html (+63ms) 
21:01:53   ├─ /nm-components/components/modal/index.html (+49ms) 
21:01:53   ├─ /nm-components/components/navigation/index.html (+44ms) 
21:01:53   ├─ /nm-components/components/pagination/index.html (+38ms) 
21:01:53   ├─ /nm-components/components/popover/index.html (+43ms) 
21:01:53   ├─ /nm-components/components/progress/index.html (+54ms) 
21:01:53   ├─ /nm-components/components/radio/index.html (+63ms) 
21:01:53   ├─ /nm-components/components/radio-group/index.html (+51ms) 
21:01:53   ├─ /nm-components/components/rating/index.html (+64ms) 
21:01:53   ├─ /nm-components/components/search-input/index.html (+50ms) 
21:01:53   ├─ /nm-components/components/segmented/index.html (+50ms) 
21:01:54   ├─ /nm-components/components/select/index.html (+57ms) 
21:01:54   ├─ /nm-components/components/skeleton/index.html (+45ms) 
21:01:54   ├─ /nm-components/components/slider/index.html (+53ms) 
21:01:54   ├─ /nm-components/components/spinner/index.html (+39ms) 
21:01:54   ├─ /nm-components/components/step-indicator/index.html (+55ms) 
21:01:54   ├─ /nm-components/components/stepper/index.html (+45ms) 
21:01:54   ├─ /nm-components/components/table/index.html (+48ms) 
21:01:54   ├─ /nm-components/components/tabs/index.html (+54ms) 
21:01:54   ├─ /nm-components/components/tag/index.html (+50ms) 
21:01:54   ├─ /nm-components/components/textarea/index.html (+47ms) 
21:01:54   ├─ /nm-components/components/toast/index.html (+50ms) 
21:01:54   ├─ /nm-components/components/toggle/index.html (+46ms) 
21:01:54   ├─ /nm-components/components/toggles/index.html (+52ms) 
21:01:54   ├─ /nm-components/components/tooltip/index.html (+42ms) 
21:01:54   ├─ /nm-components/components/tree-view/index.html (+46ms) 
21:01:54   ├─ /nm-components/dashboards/index.html (+42ms) 
21:01:54   ├─ /nm-components/overview/index.html (+28ms) 
21:01:54   ├─ /nm-components/payloads/index.html (+45ms) 
21:01:54   ├─ /nm-components/theming/index.html (+40ms) 
21:01:54   ├─ /nomercy-api/index.html (+36ms) 
21:01:54   ├─ /nomercy-api/authentication/index.html (+31ms) 
21:01:54   ├─ /nomercy-api/errors/index.html (+33ms) 
21:01:55   ├─ /nomercy-api/kitchen-sink/index.html (+78ms) 
21:01:55   ├─ /nomercy-api/overview/index.html (+38ms) 
21:01:55   ├─ /nomercy-api/pagination/index.html (+38ms) 
21:01:55   ├─ /nomercy-api/rest/albums/index.html (+40ms) 
21:01:55   ├─ /nomercy-api/rest/artists/index.html (+33ms) 
21:01:55   ├─ /nomercy-api/rest/collections/index.html (+35ms) 
21:01:55   ├─ /nomercy-api/rest/config/index.html (+38ms) 
21:01:55   ├─ /nomercy-api/rest/content-segments/index.html (+40ms) 
21:01:55   ├─ /nomercy-api/rest/devices/index.html (+34ms) 
21:01:55   ├─ /nomercy-api/rest/encoder-bundles/index.html (+28ms) 
21:01:55   ├─ /nomercy-api/rest/encoder-profiles/index.html (+40ms) 
21:01:55   ├─ /nomercy-api/rest/encoding-history/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/encoding-presets/index.html (+41ms) 
21:01:55   ├─ /nomercy-api/rest/genres/index.html (+37ms) 
21:01:55   ├─ /nomercy-api/rest/hardware-benchmark/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/home/index.html (+35ms) 
21:01:55   ├─ /nomercy-api/rest/libraries/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/libraries-admin/index.html (+41ms) 
21:01:55   ├─ /nomercy-api/rest/logs-api/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/movies/index.html (+36ms) 
21:01:55   ├─ /nomercy-api/rest/music/index.html (+32ms) 
21:01:55   ├─ /nomercy-api/rest/music-genres/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/optical-media/index.html (+45ms) 
21:01:55   ├─ /nomercy-api/rest/people/index.html (+30ms) 
21:01:55   ├─ /nomercy-api/rest/playlists/index.html (+36ms) 
21:01:55   ├─ /nomercy-api/rest/plugins-api/index.html (+62ms) 
21:01:56   ├─ /nomercy-api/rest/recommendations/index.html (+33ms) 
21:01:56   ├─ /nomercy-api/rest/search/index.html (+28ms) 
21:01:56   ├─ /nomercy-api/rest/server/index.html (+39ms) 
21:01:56   ├─ /nomercy-api/rest/server-activity/index.html (+36ms) 
21:01:56   ├─ /nomercy-api/rest/specials/index.html (+34ms) 
21:01:56   ├─ /nomercy-api/rest/storage-browser/index.html (+34ms) 
21:01:56   ├─ /nomercy-api/rest/streaming/index.html (+43ms) 
21:01:56   ├─ /nomercy-api/rest/tasks/index.html (+49ms) 
21:01:56   ├─ /nomercy-api/rest/tracks/index.html (+32ms) 
21:01:56   ├─ /nomercy-api/rest/tv-shows/index.html (+35ms) 
21:01:56   ├─ /nomercy-api/rest/user-data/index.html (+32ms) 
21:01:56   ├─ /nomercy-api/rest/users-admin/index.html (+34ms) 
21:01:56   ├─ /nomercy-api/rest/workers/index.html (+38ms) 
21:01:56   ├─ /nomercy-api/signalr/cast-hub/index.html (+39ms) 
21:01:56   ├─ /nomercy-api/signalr/content-analysis-hub/index.html (+29ms) 
21:01:56   ├─ /nomercy-api/signalr/dashboard-hub/index.html (+31ms) 
21:01:56   ├─ /nomercy-api/signalr/device-hub/index.html (+32ms) 
21:01:56   ├─ /nomercy-api/signalr/drives-hub/index.html (+33ms) 
21:01:56   ├─ /nomercy-api/signalr/music-hub/index.html (+36ms) 
21:01:56   ├─ /nomercy-api/signalr/overview/index.html (+36ms) 
21:01:56   ├─ /nomercy-api/signalr/ripper-hub/index.html (+30ms) 
21:01:56   ├─ /nomercy-api/signalr/video-hub/index.html (+38ms) 
21:01:56   ├─ /nomercy-app-android/connecting/index.html (+3ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/devices/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/libraries/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/logs/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/overview/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/server-info/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/dashboard/users/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/foreground-service/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/home/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/info/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/install/phone/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/install/tv/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/libraries/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/library/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/cards/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/cast/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/genres/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/home/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/list/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/music/mini-player/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/player/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/music/queue/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/notifications/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/overview/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/person/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/preferences/about/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/preferences/devices/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/preferences/display/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/preferences/profile/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/search/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/setup/auth-handoff/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/setup/login-phone/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/setup/login-tv/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/setup/name-device/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/setup/select-server/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/setup/server-offline/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/troubleshooting/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-android/watch/cast/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/watch/quality/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/watch/remote-control/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/watch/subtitles/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/watch/tv-remote/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/watch/index.html (+2ms) 
21:01:56   ├─ /nomercy-app-android/index.html (+1ms) 
21:01:56   ├─ /nomercy-app-web/index.html (+33ms) 
21:01:56   ├─ /nomercy-app-web/chromecast/index.html (+27ms) 
21:01:56   ├─ /nomercy-app-web/connecting/index.html (+34ms) 
21:01:56   ├─ /nomercy-app-web/dashboard/activity/index.html (+29ms) 
21:01:56   ├─ /nomercy-app-web/dashboard/content-analysis/index.html (+30ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/devices/index.html (+29ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/distribution/index.html (+31ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/encoder-profiles/index.html (+30ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/hardware/index.html (+33ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/libraries/index.html (+32ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/live-sessions/index.html (+31ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/logs/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/notifications/index.html (+29ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/overview/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/plugins/index.html (+35ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/recommendations/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/ripper/index.html (+34ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/specials/index.html (+27ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/storage/index.html (+34ms) 
21:01:57   ├─ /nomercy-app-web/dashboard/users/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/home/index.html (+34ms) 
21:01:57   ├─ /nomercy-app-web/info/index.html (+31ms) 
21:01:57   ├─ /nomercy-app-web/libraries/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/library/index.html (+29ms) 
21:01:57   ├─ /nomercy-app-web/music/album/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/music/artist/index.html (+28ms) 
21:01:57   ├─ /nomercy-app-web/music/home/index.html (+31ms) 
21:01:57   ├─ /nomercy-app-web/music/playlist/index.html (+29ms) 
21:01:57   ├─ /nomercy-app-web/overview/index.html (+27ms) 
21:01:57   ├─ /nomercy-app-web/person/index.html (+26ms) 
21:01:57   ├─ /nomercy-app-web/platforms/index.html (+33ms) 
21:01:57   ├─ /nomercy-app-web/preferences/devices/index.html (+27ms) 
21:01:57   ├─ /nomercy-app-web/preferences/display/index.html (+34ms) 
21:01:57   ├─ /nomercy-app-web/preferences/profile/index.html (+25ms) 
21:01:57   ├─ /nomercy-app-web/preferences/subtitles/index.html (+34ms) 
21:01:57   ├─ /nomercy-app-web/quality/index.html (+30ms) 
21:01:57   ├─ /nomercy-app-web/search/index.html (+30ms) 
21:01:57   ├─ /nomercy-app-web/setup/first-run/index.html (+28ms) 
21:01:58   ├─ /nomercy-app-web/setup/name-device/index.html (+31ms) 
21:01:58   ├─ /nomercy-app-web/setup/select-server/index.html (+27ms) 
21:01:58   ├─ /nomercy-app-web/setup/server-offline/index.html (+32ms) 
21:01:58   ├─ /nomercy-app-web/subtitles/index.html (+25ms) 
21:01:58   ├─ /nomercy-app-web/troubleshooting/index.html (+34ms) 
21:01:58   ├─ /nomercy-app-web/watch/index.html (+31ms) 
21:01:58   ├─ /nomercy-media-server/index.html (+35ms) 
21:01:58   ├─ /nomercy-media-server/cli/autostart/index.html (+36ms) 
21:01:58   ├─ /nomercy-media-server/cli/config/index.html (+32ms) 
21:01:58   ├─ /nomercy-media-server/cli/logs/index.html (+37ms) 
21:01:58   ├─ /nomercy-media-server/cli/overview/index.html (+39ms) 
21:01:58   ├─ /nomercy-media-server/cli/plugins-cli/index.html (+34ms) 
21:01:58   ├─ /nomercy-media-server/cli/queue/index.html (+35ms) 
21:01:58   ├─ /nomercy-media-server/cli/start-stop/index.html (+37ms) 
21:01:58   ├─ /nomercy-media-server/cli/update/index.html (+48ms) 
21:01:58   ├─ /nomercy-media-server/configuration/index.html (+60ms) 
21:01:58   ├─ /nomercy-media-server/connect/overview/index.html (+32ms) 
21:01:58   ├─ /nomercy-media-server/encoding/formats/index.html (+27ms) 
21:01:58   ├─ /nomercy-media-server/encoding/hardware/index.html (+35ms) 
21:01:58   ├─ /nomercy-media-server/encoding/history/index.html (+26ms) 
21:01:58   ├─ /nomercy-media-server/encoding/model/index.html (+33ms) 
21:01:58   ├─ /nomercy-media-server/encoding/overview/index.html (+32ms) 
21:01:58   ├─ /nomercy-media-server/encoding/profiles/index.html (+34ms) 
21:01:58   ├─ /nomercy-media-server/first-run/index.html (+33ms) 
21:01:58   ├─ /nomercy-media-server/installation-guide/index.html (+39ms) 
21:01:58   ├─ /nomercy-media-server/installation/docker/index.html (+41ms) 
21:01:58   ├─ /nomercy-media-server/installation/linux-arch/index.html (+29ms) 
21:01:58   ├─ /nomercy-media-server/installation/linux-deb/index.html (+35ms) 
21:01:58   ├─ /nomercy-media-server/installation/linux-rpm/index.html (+25ms) 
21:01:59   ├─ /nomercy-media-server/installation/macos/index.html (+33ms) 
21:01:59   ├─ /nomercy-media-server/installation/nas/index.html (+31ms) 
21:01:59   ├─ /nomercy-media-server/installation/windows/index.html (+31ms) 
21:01:59   ├─ /nomercy-media-server/libraries/index.html (+34ms) 
21:01:59   ├─ /nomercy-media-server/maintenance/backups/index.html (+31ms) 
21:01:59   ├─ /nomercy-media-server/maintenance/migrate/index.html (+29ms) 
21:01:59   ├─ /nomercy-media-server/maintenance/upgrade/index.html (+30ms) 
21:01:59   ├─ /nomercy-media-server/media/metadata/index.html (+35ms) 
21:01:59   ├─ /nomercy-media-server/media/optical/index.html (+33ms) 
21:01:59   ├─ /nomercy-media-server/media/scanning/index.html (+33ms) 
21:01:59   ├─ /nomercy-media-server/media/specials/index.html (+33ms) 
21:01:59   ├─ /nomercy-media-server/networking/index.html (+27ms) 
21:01:59   ├─ /nomercy-media-server/overview/index.html (+31ms) 
21:01:59   ├─ /nomercy-media-server/plugins/developing/index.html (+37ms) 
21:01:59   ├─ /nomercy-media-server/plugins/installing/index.html (+33ms) 
21:01:59   ├─ /nomercy-media-server/plugins/overview/index.html (+30ms) 
21:01:59   ├─ /nomercy-media-server/plugins/repository-index/index.html (+41ms) 
21:01:59   ├─ /nomercy-media-server/plugins/trusted-publishers/index.html (+35ms) 
21:01:59   ├─ /nomercy-media-server/security/index.html (+43ms) 
21:01:59   ├─ /nomercy-media-server/storage/index.html (+38ms) 
21:01:59   ├─ /nomercy-media-server/storage-model/index.html (+40ms) 
21:01:59   ├─ /nomercy-media-server/troubleshooting/common-issues/index.html (+66ms) 
21:01:59   ├─ /nomercy-media-server/troubleshooting/diagnostics/index.html (+59ms) 
21:01:59   ├─ /nomercy-media-server/troubleshooting/error-codes/index.html (+36ms) 
21:01:59   ├─ /nomercy-media-server/troubleshooting/logs/index.html (+42ms) 
21:01:59   ├─ /nomercy-media-server/users/index.html (+38ms) 
21:01:59   ├─ /nomercy-music-player/introduction/index.html (+2ms) 
21:01:59   ├─ /nomercy-music-player/index.html (+48ms) 
21:02:00   ├─ /nomercy-music-player/build/now-playing/index.html (+121ms) 
21:02:00   ├─ /nomercy-music-player/build/scrubber/index.html (+50ms) 
21:02:00   ├─ /nomercy-music-player/build/shell/index.html (+57ms) 
21:02:00   ├─ /nomercy-music-player/build/track-list/index.html (+91ms) 
21:02:00   ├─ /nomercy-music-player/build/volume/index.html (+57ms) 
21:02:00   ├─ /nomercy-music-player/native/events/index.html (+36ms) 
21:02:00   ├─ /nomercy-music-player/native/methods/index.html (+239ms) 
21:02:00   ├─ /nomercy-music-player/native/migration/index.html (+35ms) 
21:02:00   ├─ /nomercy-music-player/native/quickstart/index.html (+50ms) 
21:02:00   ├─ /nomercy-music-player/plugins-adapters/adapter-audio-backend/index.html (+87ms) 
21:02:00   ├─ /nomercy-music-player/plugins-adapters/adapter-similarity-engine/index.html (+47ms) 
21:02:00   ├─ /nomercy-music-player/plugins-adapters/auto-advance/index.html (+59ms) 
21:02:00   ├─ /nomercy-music-player/plugins-adapters/cast-sender/index.html (+54ms) 
21:02:00   ├─ /nomercy-music-player/plugins-adapters/key-handler/index.html (+53ms) 
21:02:01   ├─ /nomercy-music-player/plugins-adapters/lyrics/index.html (+66ms) 
21:02:01   ├─ /nomercy-music-player/plugins-adapters/media-session/index.html (+50ms) 
21:02:01   ├─ /nomercy-music-player/plugins-adapters/plugin-development/index.html (+124ms) 
21:02:01   ├─ /nomercy-music-player/plugins-adapters/scrobble/index.html (+66ms) 
21:02:01   ├─ /nomercy-music-player/quickstart/index.html (+57ms) 
21:02:01   ├─ /nomercy-music-player/recipes/audio-output-switching/index.html (+67ms) 
21:02:01   ├─ /nomercy-music-player/recipes/crossfade-gapless/index.html (+81ms) 
21:02:01   ├─ /nomercy-music-player/recipes/equalizer-presets/index.html (+50ms) 
21:02:01   ├─ /nomercy-music-player/recipes/lyrics-sync/index.html (+87ms) 
21:02:01   ├─ /nomercy-music-player/recipes/migrate-from-v1/index.html (+70ms) 
21:02:01   ├─ /nomercy-music-player/recipes/queue-playlist/index.html (+77ms) 
21:02:01   ├─ /nomercy-music-player/recipes/react-integration/index.html (+98ms) 
21:02:01   ├─ /nomercy-music-player/recipes/scrobbling/index.html (+53ms) 
21:02:01   ├─ /nomercy-music-player/recipes/svelte-integration/index.html (+76ms) 
21:02:02   ├─ /nomercy-music-player/recipes/vanilla-integration/index.html (+122ms) 
21:02:02   ├─ /nomercy-music-player/recipes/vue-integration/index.html (+106ms) 
21:02:02   ├─ /nomercy-music-player/reference/config/index.html (+41ms) 
21:02:02   ├─ /nomercy-music-player/reference/events/index.html (+38ms) 
21:02:02   ├─ /nomercy-music-player/reference/player-methods/index.html (+62ms) 
21:02:02   ├─ /nomercy-music-player/reference/types/index.html (+52ms) 
21:02:02   ├─ /nomercy-music-player/tour/audio-output/index.html (+68ms) 
21:02:02   ├─ /nomercy-music-player/tour/crossfade/index.html (+62ms) 
21:02:02   ├─ /nomercy-music-player/tour/equalizer/index.html (+58ms) 
21:02:02   ├─ /nomercy-music-player/tour/how-it-works/index.html (+36ms) 
21:02:02   ├─ /nomercy-music-player/tour/lyrics/index.html (+61ms) 
21:02:02   ├─ /nomercy-music-player/tour/queue/index.html (+48ms) 
21:02:02   ├─ /nomercy-music-player/tour/state-events/index.html (+68ms) 
21:02:02   ├─ /nomercy-music-player/tour/time/index.html (+79ms) 
21:02:02   ├─ /nomercy-music-player/tour/transport/index.html (+64ms) 
21:02:03   ├─ /nomercy-music-player/tour/volume/index.html (+66ms) 
21:02:03   ├─ /nomercy-player-core/introduction/index.html (+2ms) 
21:02:03   ├─ /nomercy-player-core/index.html (+29ms) 
21:02:03   ├─ /nomercy-player-core/build/add-a-plugin/index.html (+74ms) 
21:02:03   ├─ /nomercy-player-core/build/add-i18n/index.html (+75ms) 
21:02:03   ├─ /nomercy-player-core/build/backend-contract/index.html (+61ms) 
21:02:03   ├─ /nomercy-player-core/build/compose-methods/index.html (+57ms) 
21:02:03   ├─ /nomercy-player-core/handbook/anatomy/index.html (+104ms) 
21:02:03   ├─ /nomercy-player-core/handbook/building-dom/index.html (+146ms) 
21:02:03   ├─ /nomercy-player-core/handbook/emitting/index.html (+63ms) 
21:02:03   ├─ /nomercy-player-core/handbook/errors-state/index.html (+69ms) 
21:02:03   ├─ /nomercy-player-core/handbook/i18n/index.html (+64ms) 
21:02:03   ├─ /nomercy-player-core/handbook/listening/index.html (+72ms) 
21:02:03   ├─ /nomercy-player-core/handbook/network/index.html (+56ms) 
21:02:03   ├─ /nomercy-player-core/handbook/registration/index.html (+62ms) 
21:02:04   ├─ /nomercy-player-core/handbook/styling/index.html (+57ms) 
21:02:04   ├─ /nomercy-player-core/handbook/timing/index.html (+57ms) 
21:02:04   ├─ /nomercy-player-core/native/errors/index.html (+36ms) 
21:02:04   ├─ /nomercy-player-core/native/events/index.html (+97ms) 
21:02:04   ├─ /nomercy-player-core/native/methods/index.html (+148ms) 
21:02:04   ├─ /nomercy-player-core/native/migration/index.html (+30ms) 
21:02:04   ├─ /nomercy-player-core/native/quickstart/index.html (+30ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-audio-output/index.html (+34ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-cue-parser/index.html (+44ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-event-bus/index.html (+58ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry/index.html (+45ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-platform/index.html (+56ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-preload-strategy/index.html (+53ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-realtime-channel/index.html (+45ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-shuffle-strategy/index.html (+38ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-storage/index.html (+49ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-stream-source/index.html (+56ms) 
21:02:04   ├─ /nomercy-player-core/plugins-adapters/adapter-transition-strategy/index.html (+37ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/adapter-translator/index.html (+41ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/adapter-url-resolver/index.html (+54ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/audio-graph/index.html (+48ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/canvas/index.html (+38ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/cast-sender/index.html (+59ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/embed/index.html (+50ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/equalizer/index.html (+63ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/key-handler/index.html (+51ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/media-session/index.html (+53ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/message/index.html (+45ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/mixer/index.html (+39ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/spectrum/index.html (+47ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/tab-leader/index.html (+31ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/visualization/index.html (+41ms) 
21:02:05   ├─ /nomercy-player-core/plugins-adapters/volume-memory/index.html (+33ms) 
21:02:05   ├─ /nomercy-player-core/quickstart/index.html (+37ms) 
21:02:05   ├─ /nomercy-player-core/recipes/auth-fetch/index.html (+45ms) 
21:02:05   ├─ /nomercy-player-core/recipes/custom-cue-parser/index.html (+39ms) 
21:02:05   ├─ /nomercy-player-core/recipes/custom-url-resolver/index.html (+51ms) 
21:02:05   ├─ /nomercy-player-core/recipes/swap-an-adapter/index.html (+40ms) 
21:02:05   ├─ /nomercy-player-core/reference/composition/index.html (+41ms) 
21:02:05   ├─ /nomercy-player-core/reference/config/index.html (+56ms) 
21:02:06   ├─ /nomercy-player-core/reference/errors/index.html (+45ms) 
21:02:06   ├─ /nomercy-player-core/reference/events/index.html (+97ms) 
21:02:06   ├─ /nomercy-player-core/reference/metrics-and-accessibility/index.html (+52ms) 
21:02:06   ├─ /nomercy-player-core/reference/testing/index.html (+58ms) 
21:02:06   ├─ /nomercy-player-core/reference/types/index.html (+195ms) 
21:02:06   ├─ /nomercy-player-core/reference/utilities/index.html (+43ms) 
21:02:06   ├─ /nomercy-player-core/tour/adapters/index.html (+47ms) 
21:02:06   ├─ /nomercy-player-core/tour/composition-boundary/index.html (+38ms) 
21:02:06   ├─ /nomercy-player-core/tour/cue-parsers/index.html (+47ms) 
21:02:06   ├─ /nomercy-player-core/tour/errors/index.html (+39ms) 
21:02:06   ├─ /nomercy-player-core/tour/event-bus/index.html (+58ms) 
21:02:06   ├─ /nomercy-player-core/tour/i18n/index.html (+49ms) 
21:02:06   ├─ /nomercy-player-core/tour/lifecycle/index.html (+40ms) 
21:02:06   ├─ /nomercy-player-core/tour/plugin-base/index.html (+62ms) 
21:02:06   ├─ /nomercy-player-core/tour/queue/index.html (+82ms) 
21:02:06   ├─ /nomercy-player-core/tour/state/index.html (+62ms) 
21:02:07   ├─ /nomercy-player-core/tour/time/index.html (+54ms) 
21:02:07   ├─ /nomercy-player-core/tour/transport/index.html (+53ms) 
21:02:07   ├─ /nomercy-player-kit/introduction/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/build/add-a-plugin/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/build/add-i18n/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/build/backend-contract/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/build/compose-methods/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/anatomy/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/building-dom/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/emitting/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/errors-state/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/i18n/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/listening/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/network/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/registration/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/styling/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/handbook/timing/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/native/errors/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/native/events/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/native/methods/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/native/migration/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/native/quickstart/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-audio-output/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-cue-parser/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-event-bus/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-lifecycle-registry/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-platform/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-preload-strategy/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-realtime-channel/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-shuffle-strategy/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-storage/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-stream-source/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-transition-strategy/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-translator/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/adapter-url-resolver/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/audio-graph/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/canvas/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/cast-sender/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/embed/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/equalizer/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/key-handler/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/media-session/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/message/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/mixer/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/spectrum/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/tab-leader/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/visualization/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/plugins-adapters/volume-memory/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/quickstart/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/recipes/auth-fetch/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/recipes/custom-cue-parser/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/recipes/custom-url-resolver/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/recipes/swap-an-adapter/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/reference/composition/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/reference/config/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/reference/errors/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/reference/events/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/reference/metrics-and-accessibility/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/reference/testing/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/reference/types/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/reference/utilities/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/adapters/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/tour/composition-boundary/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/cue-parsers/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/errors/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/event-bus/index.html (+3ms) 
21:02:07   ├─ /nomercy-player-kit/tour/i18n/index.html (+2ms) 
21:02:07   ├─ /nomercy-player-kit/tour/lifecycle/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/plugin-base/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/queue/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/state/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/time/index.html (+1ms) 
21:02:07   ├─ /nomercy-player-kit/tour/transport/index.html (+1ms) 
21:02:07   ├─ /nomercy-plugins/index.html (+24ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/index.html (+46ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/audio-tools/index.html (+26ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/auth-claims/index.html (+25ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/browser-headless/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/cast-send/index.html (+22ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/encoder-dispatch/index.html (+29ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/encoder-profile/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/events-publish/index.html (+28ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/events-subscribe/index.html (+29ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/hub/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/jobs-dispatch/index.html (+22ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/jobs-status/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/library-import/index.html (+24ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/library-read/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/library-watch/index.html (+26ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/library-write/index.html (+26ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-live/index.html (+27ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-proxy/index.html (+29ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-record/index.html (+26ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-remux/index.html (+30ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-source/index.html (+26ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/media-transcode/index.html (+28ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/metadata-provide/index.html (+29ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/metadata-query/index.html (+31ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/music-analysis-read/index.html (+25ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/music-analysis-write/index.html (+24ms) 
21:02:07   ├─ /nomercy-plugins/capabilities/native-code/index.html (+27ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/network-dial/index.html (+29ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/network-discover/index.html (+21ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/network-fetch/index.html (+27ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/network-listen/index.html (+26ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/notifications-push/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/player-control/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/player-queue/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/player-source/index.html (+22ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/player-state/index.html (+28ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/process-spawn/index.html (+26ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/rest/index.html (+27ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/scheduler/index.html (+30ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/secrets/index.html (+30ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/server-info/index.html (+24ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/settings/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/storage-derived/index.html (+28ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/storage-path/index.html (+27ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/storage-private/index.html (+24ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/storage-temp/index.html (+24ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/ui-input/index.html (+26ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/ui-mount/index.html (+32ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/ui-overlay/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/ui-webview/index.html (+34ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/user-identity/index.html (+30ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/user-playlists/index.html (+32ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/user-preferences/index.html (+29ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/user-watch/index.html (+27ms) 
21:02:08   ├─ /nomercy-plugins/capabilities/users-list/index.html (+25ms) 
21:02:08   ├─ /nomercy-plugins/handbook/runtime-and-isolation/index.html (+31ms) 
21:02:08   ├─ /nomercy-plugins/overview/index.html (+22ms) 
21:02:08   ├─ /nomercy-video-player/introduction/index.html (+2ms) 
21:02:08   ├─ /nomercy-video-player/plugins/auto-advance/index.html (+2ms) 
21:02:08   ├─ /nomercy-video-player/plugins/tv-ui/index.html (+1ms) 
21:02:08   ├─ /nomercy-video-player/index.html (+37ms) 
21:02:08   ├─ /nomercy-video-player/build/full-plugin/index.html (+358ms) 
21:02:09   ├─ /nomercy-video-player/build/fullscreen-speed/index.html (+208ms) 
21:02:09   ├─ /nomercy-video-player/build/play-pause/index.html (+102ms) 
21:02:09   ├─ /nomercy-video-player/build/progress-bar/index.html (+131ms) 
21:02:09   ├─ /nomercy-video-player/build/seek-preview/index.html (+319ms) 
21:02:09   ├─ /nomercy-video-player/build/selectors/index.html (+327ms) 
21:02:10   ├─ /nomercy-video-player/build/shell/index.html (+92ms) 
21:02:10   ├─ /nomercy-video-player/build/time-skip/index.html (+140ms) 
21:02:10   ├─ /nomercy-video-player/build/title-bar/index.html (+213ms) 
21:02:10   ├─ /nomercy-video-player/build/volume/index.html (+308ms) 
21:02:11   ├─ /nomercy-video-player/native/events/index.html (+41ms) 
21:02:11   ├─ /nomercy-video-player/native/methods/index.html (+251ms) 
21:02:11   ├─ /nomercy-video-player/native/migration/index.html (+38ms) 
21:02:11   ├─ /nomercy-video-player/native/quickstart/index.html (+56ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/adapter-chapter-source/index.html (+57ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/adapter-subtitle-style-store/index.html (+60ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/adapter-thumbnail-source/index.html (+79ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/adapter-video-backend/index.html (+83ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/cast-sender/index.html (+46ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/desktop-ui/index.html (+137ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/desktop-ui-options/index.html (+87ms) 
21:02:11   ├─ /nomercy-video-player/plugins-adapters/drm/index.html (+54ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/key-handler/index.html (+59ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/media-session/index.html (+38ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/octopus/index.html (+48ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/plugin-development/index.html (+101ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/subtitle-overlay/index.html (+37ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/touch-zones/index.html (+40ms) 
21:02:12   ├─ /nomercy-video-player/plugins-adapters/tv-key-handler/index.html (+39ms) 
21:02:12   ├─ /nomercy-video-player/quickstart/index.html (+42ms) 
21:02:12   ├─ /nomercy-video-player/recipes/auth-tokens/index.html (+39ms) 
21:02:12   ├─ /nomercy-video-player/recipes/keyboard-shortcuts/index.html (+41ms) 
21:02:12   ├─ /nomercy-video-player/recipes/migrate-from-v1/index.html (+63ms) 
21:02:12   ├─ /nomercy-video-player/recipes/playlist-queue/index.html (+85ms) 
21:02:12   ├─ /nomercy-video-player/recipes/quality-selection/index.html (+60ms) 
21:02:12   ├─ /nomercy-video-player/recipes/react-integration/index.html (+84ms) 
21:02:12   ├─ /nomercy-video-player/recipes/resume-playback/index.html (+60ms) 
21:02:12   ├─ /nomercy-video-player/recipes/svelte-integration/index.html (+58ms) 
21:02:12   ├─ /nomercy-video-player/recipes/vanilla-integration/index.html (+87ms) 
21:02:13   ├─ /nomercy-video-player/recipes/vue-integration/index.html (+82ms) 
21:02:13   ├─ /nomercy-video-player/reference/config/index.html (+46ms) 
21:02:13   ├─ /nomercy-video-player/reference/events/index.html (+45ms) 
21:02:13   ├─ /nomercy-video-player/reference/player-methods/index.html (+63ms) 
21:02:13   ├─ /nomercy-video-player/reference/playlist-item/index.html (+44ms) 
21:02:13   ├─ /nomercy-video-player/reference/streams/index.html (+26ms) 
21:02:13   ├─ /nomercy-video-player/reference/types/index.html (+48ms) 
21:02:13   ├─ /nomercy-video-player/tour/audio-tracks/index.html (+51ms) 
21:02:13   ├─ /nomercy-video-player/tour/chapters/index.html (+44ms) 
21:02:13   ├─ /nomercy-video-player/tour/how-it-works/index.html (+37ms) 
21:02:13   ├─ /nomercy-video-player/tour/quality/index.html (+50ms) 
21:02:13   ├─ /nomercy-video-player/tour/queue/index.html (+56ms) 
21:02:13   ├─ /nomercy-video-player/tour/state-events/index.html (+44ms) 
21:02:13   ├─ /nomercy-video-player/tour/subtitles/index.html (+54ms) 
21:02:13   ├─ /nomercy-video-player/tour/transport/index.html (+58ms) 
21:02:13   ├─ /nomercy-video-player/tour/volume/index.html (+47ms) 
21:02:13   ├─ /player/advanced/custom-adapter/index.html (+3ms) 
21:02:13   ├─ /player/advanced/custom-backend/index.html (+1ms) 
21:02:13   ├─ /player/advanced/custom-plugin/index.html (+1ms) 
21:02:13   ├─ /player/advanced/distributed-playback/index.html (+2ms) 
21:02:13   ├─ /player/advanced/embedding/index.html (+1ms) 
21:02:13   ├─ /player/advanced/migration-from-other-players/index.html (+1ms) 
21:02:13   ├─ /player/advanced/multi-instance/index.html (+2ms) 
21:02:13   ├─ /player/advanced/performance/index.html (+1ms) 
21:02:13   ├─ /player/advanced/server-side-rendering/index.html (+1ms) 
21:02:13   ├─ /player/advanced/index.html (+1ms) 
21:02:13   ├─ /player/architecture/index.html (+1ms) 
21:02:13   ├─ /player/faq/index.html (+1ms) 
21:02:13   ├─ /player/kit/adapters/index.html (+2ms) 
21:02:13   ├─ /player/kit/auth-fetch/index.html (+1ms) 
21:02:13   ├─ /player/kit/errors/index.html (+1ms) 
21:02:13   ├─ /player/kit/event-system/index.html (+1ms) 
21:02:13   ├─ /player/kit/i18n/index.html (+2ms) 
21:02:13   ├─ /player/kit/lifecycle/index.html (+2ms) 
21:02:13   ├─ /player/kit/metrics/index.html (+1ms) 
21:02:13   ├─ /player/kit/plugins/index.html (+1ms) 
21:02:13   ├─ /player/kit/quickstart/index.html (+1ms) 
21:02:13   ├─ /player/kit/testing/index.html (+1ms) 
21:02:13   ├─ /player/kit/index.html (+1ms) 
21:02:13   ├─ /player/migration-v1-v2/index.html (+2ms) 
21:02:13   ├─ /player/music/api-methods/index.html (+2ms) 
21:02:13   ├─ /player/music/configuration/index.html (+2ms) 
21:02:13   ├─ /player/music/crossfade/index.html (+1ms) 
21:02:13   ├─ /player/music/equalizer/index.html (+2ms) 
21:02:13   ├─ /player/music/events/index.html (+1ms) 
21:02:13   ├─ /player/music/framework-react/index.html (+1ms) 
21:02:13   ├─ /player/music/framework-vue/index.html (+1ms) 
21:02:13   ├─ /player/music/lyrics/index.html (+1ms) 
21:02:13   ├─ /player/music/migration-v1-v2/index.html (+1ms) 
21:02:13   ├─ /player/music/plugin-development/index.html (+1ms) 
21:02:13   ├─ /player/music/quickstart/index.html (+1ms) 
21:02:13   ├─ /player/music/index.html (+1ms) 
21:02:13   ├─ /player/plugin-authoring/index.html (+1ms) 
21:02:13   ├─ /player/plugin-standard/index.html (+1ms) 
21:02:13   ├─ /player/quickstart/index.html (+1ms) 
21:02:13   ├─ /player/recipes/auth-and-tokens/index.html (+2ms) 
21:02:13   ├─ /player/recipes/chapters/index.html (+1ms) 
21:02:13   ├─ /player/recipes/crossfade-and-gapless/index.html (+2ms) 
21:02:13   ├─ /player/recipes/keyboard-shortcuts/index.html (+2ms) 
21:02:13   ├─ /player/recipes/lyrics-and-equalizer/index.html (+1ms) 
21:02:13   ├─ /player/recipes/media-session/index.html (+1ms) 
21:02:13   ├─ /player/recipes/persistence/index.html (+1ms) 
21:02:13   ├─ /player/recipes/playlist-and-queue/index.html (+1ms) 
21:02:13   ├─ /player/recipes/quality-selection/index.html (+1ms) 
21:02:13   ├─ /player/recipes/subtitles/index.html (+1ms) 
21:02:13   ├─ /player/recipes/index.html (+1ms) 
21:02:13   ├─ /player/troubleshooting/index.html (+1ms) 
21:02:13   ├─ /player/versioning/index.html (+1ms) 
21:02:13   ├─ /player/video/api-methods/index.html (+2ms) 
21:02:13   ├─ /player/video/cast-sender/index.html (+1ms) 
21:02:13   ├─ /player/video/chapters/index.html (+1ms) 
21:02:13   ├─ /player/video/configuration/index.html (+1ms) 
21:02:13   ├─ /player/video/desktop-ui/index.html (+1ms) 
21:02:13   ├─ /player/video/events/index.html (+1ms) 
21:02:13   ├─ /player/video/framework-react/index.html (+1ms) 
21:02:13   ├─ /player/video/framework-vue/index.html (+1ms) 
21:02:13   ├─ /player/video/hls/index.html (+1ms) 
21:02:13   ├─ /player/video/migration-v1-v2/index.html (+1ms) 
21:02:13   ├─ /player/video/plugin-development/index.html (+1ms) 
21:02:13   ├─ /player/video/quickstart/index.html (+1ms) 
21:02:13   ├─ /player/video/skipper/index.html (+1ms) 
21:02:13   ├─ /player/video/subtitle-overlay/index.html (+1ms) 
21:02:13   ├─ /player/video/index.html (+1ms) 
21:02:13   ├─ /player/index.html (+1ms) 
21:02:13   ├─ /quickstart/index.html (+1ms) 
21:02:13   ├─ /sdks/index.html (+1ms) 
21:02:13   ├─ /webhooks/index.html (+1ms) 
21:02:13   ├─ /index.html (+14ms) 
21:02:13   ├─ /en/index.html (+17ms) 
21:02:13   ├─ /authentication/index.html (+16ms) 
21:02:13   ├─ /errors/index.html (+18ms) 
21:02:13   ├─ /kitchen-sink/index.html (+37ms) 
21:02:14   ├─ /overview/index.html (+18ms) 
21:02:14   ├─ /pagination/index.html (+12ms) 
21:02:14   ├─ /rest/albums/index.html (+15ms) 
21:02:14   ├─ /rest/artists/index.html (+20ms) 
21:02:14   ├─ /rest/collections/index.html (+20ms) 
21:02:14   ├─ /rest/config/index.html (+15ms) 
21:02:14   ├─ /rest/content-segments/index.html (+21ms) 
21:02:14   ├─ /rest/devices/index.html (+15ms) 
21:02:14   ├─ /rest/encoder-bundles/index.html (+13ms) 
21:02:14   ├─ /rest/encoder-profiles/index.html (+22ms) 
21:02:14   ├─ /rest/encoding-history/index.html (+14ms) 
21:02:14   ├─ /rest/encoding-presets/index.html (+23ms) 
21:02:14   ├─ /rest/genres/index.html (+17ms) 
21:02:14   ├─ /rest/hardware-benchmark/index.html (+16ms) 
21:02:14   ├─ /rest/home/index.html (+21ms) 
21:02:14   ├─ /rest/libraries/index.html (+22ms) 
21:02:14   ├─ /rest/libraries-admin/index.html (+23ms) 
21:02:14   ├─ /rest/logs-api/index.html (+17ms) 
21:02:14   ├─ /rest/movies/index.html (+22ms) 
21:02:14   ├─ /rest/music/index.html (+17ms) 
21:02:14   ├─ /rest/music-genres/index.html (+17ms) 
21:02:14   ├─ /rest/optical-media/index.html (+17ms) 
21:02:14   ├─ /rest/people/index.html (+13ms) 
21:02:14   ├─ /rest/playlists/index.html (+25ms) 
21:02:14   ├─ /rest/plugins-api/index.html (+34ms) 
21:02:14   ├─ /rest/recommendations/index.html (+15ms) 
21:02:14   ├─ /rest/search/index.html (+15ms) 
21:02:14   ├─ /rest/server/index.html (+19ms) 
21:02:14   ├─ /rest/server-activity/index.html (+17ms) 
21:02:14   ├─ /rest/specials/index.html (+14ms) 
21:02:14   ├─ /rest/storage-browser/index.html (+12ms) 
21:02:14   ├─ /rest/streaming/index.html (+19ms) 
21:02:14   ├─ /rest/tasks/index.html (+22ms) 
21:02:14   ├─ /rest/tracks/index.html (+17ms) 
21:02:14   ├─ /rest/tv-shows/index.html (+17ms) 
21:02:14   ├─ /rest/user-data/index.html (+15ms) 
21:02:14   ├─ /rest/users-admin/index.html (+17ms) 
21:02:14   ├─ /rest/workers/index.html (+17ms) 
21:02:14   ├─ /signalr/cast-hub/index.html (+17ms) 
21:02:14   ├─ /signalr/content-analysis-hub/index.html (+18ms) 
21:02:14   ├─ /signalr/dashboard-hub/index.html (+16ms) 
21:02:14   ├─ /signalr/device-hub/index.html (+25ms) 
21:02:14   ├─ /signalr/drives-hub/index.html (+16ms) 
21:02:14   ├─ /signalr/music-hub/index.html (+22ms) 
21:02:14   ├─ /signalr/overview/index.html (+15ms) 
21:02:14   ├─ /signalr/ripper-hub/index.html (+12ms) 
21:02:14   ├─ /signalr/video-hub/index.html (+19ms) 
21:02:14 ✓ Completed in 24.55s.

21:02:15 [build] ✓ Completed in 1m 28s.
21:02:15 [build] 489 page(s) built in 1m 29s
21:02:15 [build] Complete!
```

## D3. The house checks

1. Em dash (U+2014) in the done-set pages, their core-*.ts examples, and docs-work/player-trio: no match
2. Old library nickname, whole word, and the joined form of that nickname with "player", any case.
   Done-set pages and core-*.ts examples: no match
   docs-work/player-trio matches (source identifiers):
docs-work\player-trio\map.md:32
docs-work\player-trio\map.md:101
docs-work\player-trio\questions.md:4
docs-work\player-trio\slices\core-entry.md:8
docs-work\player-trio\slices\core-entry.md:363
docs-work\player-trio\slices\core-entry.md:413
docs-work\player-trio\slices\core-entry.md:421
docs-work\player-trio\slices\core-i18n.md:95
docs-work\player-trio\slices\core-i18n.md:141
docs-work\player-trio\slices\core-i18n.md:152
docs-work\player-trio\slices\core-i18n.md:153
docs-work\player-trio\slices\core-kernel.md:21
docs-work\player-trio\slices\core-kernel.md:77
docs-work\player-trio\slices\core-kernel.md:172
docs-work\player-trio\slices\core-types-errors.md:108
docs-work\player-trio\slices\core-types-errors.md:307

3. Player source: git status --short in nomercy-player-core, nomercy-video-player, and nomercy-music-player printed no lines.
4. Docs tree after 06df60f, git status --short:

```
 M src/lib/mdx/recma.ts
 M src/lib/remToPx.ts
 M src/lib/stores/code-preferences.ts
 M src/lib/stores/mobile-navigation.ts
 M src/pages/api/search.js
```

Those five files are the line-ending noise from A8. Nothing else is modified.
