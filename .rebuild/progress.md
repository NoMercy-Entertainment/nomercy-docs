# Docs v2 rebuild — content ledger (branch docs/v2-rebuild)
Contract: DOCS-CONTRACT.md. Backup tag: docs-content-backup-f353481. His CLAUDE.md WIP: stash stoney-claude-md-wip.
Engine (cherry-picked, verified): PlayerExample, remark-snippet, check-docs, media.ts, playwright gate, dev fix.
Arc per library (identical order): 1 introduction, 2 quickstart, 3 tour/*, 4 build/*, 5 recipes/*, 6 plugins-adapters/*, 7 reference/*.
Altitude: core = compose-your-own-player (under the hood); video/music = consumer.

## Status
- [x] core content: DONE, all 7 arc stages (intro, quickstart, tour, build, recipes,
  plugins-adapters, reference). check-docs no longer reports ARC-SECTION-MISSING for core.
- [x] video content: DONE, all 7 arc stages (intro, quickstart, tour, build, recipes,
  plugins-adapters, reference). check-docs no longer reports ARC-SECTION-MISSING for video.
- [x] music content: DONE, all 7 arc stages (intro, quickstart, tour, build, recipes,
  plugins-adapters, reference). check-docs no longer reports ARC-SECTION-MISSING for music.
- [x] final cross-library verify: `npm run check:docs` reports "Contract OK — 3 trio
  collection(s) checked" (core + video + music, zero ARC-SECTION-MISSING / CROSS-MEDIUM-TOKEN /
  MISSING-TITLE / MISSING-ORDER / OVER-BUDGET anywhere), `check:nav` and `check:links` both
  green, `npx astro build` exit 0 (378 pages), Playwright snippet gate 2/2. Trio rebuild complete.
checkpoint (uncommitted): video intro+quickstart — reused src/examples/quickstart.ts + media.ts
(no new example needed) + nav-structure.ts Getting Started group + navigation.ts/index.astro/
core's introduction.mdx+reference/utilities.mdx cross-link fixes (/overview -> /introduction).
See .rebuild/video-intro-report.md for full detail.
checkpoint e69b6e9: core intro+quickstart + baseUrl fix (core republished rc.21, join keeps base path)
checkpoint (uncommitted): core tour/* (10 pages: lifecycle, event-bus, transport, time-and-state, queue,
plugin-base, adapters, i18n, cue-parsers, errors) + 11 new src/examples/tour-*.ts + tour-player.ts shared
scaffold + nav-structure.ts Guided Tour group + check-docs.mjs ARC_SECTIONS 'tour' prefix fix
checkpoint (uncommitted): core build/recipes/plugins-adapters/reference — 36 pages, 7 new
src/examples/*.ts (build-2/3/4, 4x recipe-*) + tour-player.ts declare-block extension (cue-parser +
url-resolver methods, reused by recipes) + nav-structure.ts 4 new groups + check-docs.mjs
ARC_SECTIONS 'build'/'reference' prefix fixes + 2 pre-existing broken links fixed in intro.mdx.
See .rebuild/core-rest-report.md for full detail. Core arc is now complete end to end.
checkpoint (uncommitted): video tour/* (8 pages: transport, volume, queue, subtitles, audio-tracks,
quality, chapters, state-events) + build/* (5 pages: shell, scrubber, volume, subtitle-menu,
fullscreen) + 8 new src/examples/video-tour-*.ts + 5 new src/examples/video-build-*.ts +
nav-structure.ts Guided Tour/Build a Player groups + quickstart.mdx forward link into the tour.
PlayerExample.tsx gained two small, additive, backward-compatible hooks (`configure` — pre-setup,
for `addPlugin()`; `onReady` — post-setup, returns a cleanup fn) so the build stage can mount a
real hand-built overlay (not just a config) and stay genuinely live; every prior config-only
snippet is unaffected (both hooks default to undefined). video/tour/subtitles + build/subtitle-menu
also register `SubtitleOverlayPlugin` via `configure` so cue text actually paints, not just
selection state. ARC-SECTION-MISSING for nomercy-video-player now lists only recipes,
plugins-adapters, reference — the 3 stages still out of scope. See
.rebuild/video-tour-report.md for full detail.
checkpoint (uncommitted): video recipes/* (9 pages: vue-integration, react-integration,
svelte-integration, vanilla-integration, resume-playback, keyboard-shortcuts, quality-selection,
playlist-queue, auth-tokens) + plugins-adapters/* (15 pages: desktop-ui, tv-key-handler,
key-handler, cast-sender, subtitle-overlay, octopus, media-session, drm, touch-zones,
live-transcoding, v1-compat, adapter-video-backend, adapter-chapter-source,
adapter-thumbnail-source, adapter-subtitle-style-store) + reference/* (4 pages: player-methods,
config, events, types) + 4 new src/examples/video-recipe-*.ts (vanilla-integration,
resume-playback, quality-selection, playlist-queue — the framework pages and most task recipes
stay code-block-only, matching core's plugins-adapters/reference precedent) + nav-structure.ts
Recipes/Plugins & Adapters/Reference groups for nomercy-video-player + build/fullscreen.mdx
forward link into recipes. Video arc is now complete end to end (7/7 stages), matching core.
See .rebuild/video-rest-report.md for full detail.
checkpoint (uncommitted): music intro+quickstart (arc stages 1-2, first content since the old
56-file music collection was wiped) — introduction.mdx (headless audio engine: swappable
audio-element/web-audio backend, crossfade defaulting true, lyrics plugin, audio-output device
selection, equalizer via the kit's shared AudioGraphPlugin; zero video mentions) + quickstart.mdx
(live snippet, real FMA track "Where Dreams Drift" by Ketsa, baseUrl pattern, explains there is
no music-level autoPlay config — item(0,{autoplay:true}) after ready() is the real pattern) + new
src/examples/music-quickstart.ts + media.ts gained MUSIC_BASE/firstSong/songs (3 real,
HEAD-verified FMA tracks, baseUrl-relative `url`) + e2e/media.spec.ts gained matching song HEAD
tests (15/15 pass) + PlayerExample.tsx extended additively with a `player: 'video' | 'music'`
snippet field (default 'video', every prior snippet unaffected) — music branch listens for
`firstFrame` (music has no consumer `canplay`) instead of `canplay`, mounts
`nomercy-music-player` instead of `nomercy-video-player` + nav-structure.ts nomercy-music-player
entry replaced (was ~76 phantom slugs from the wiped collection) with the same
Getting-Started-only pattern used for video/core's first checkpoint + navigation.ts/index.astro/
core's reference/utilities.mdx cross-link fixes (/overview -> /introduction). check:nav green,
`npx astro build` exit 0, `npx playwright test e2e/snippets.spec.ts` 2/2 (music island +
every pre-existing video island reach data-player-ready). See .rebuild/music-intro-report.md.
checkpoint (uncommitted): music tour/* (9 pages: transport, time, volume, queue, crossfade,
equalizer, audio-output, lyrics, state-events) + build/* (5 pages: shell, scrubber, volume,
track-list, now-playing) + 14 new src/examples/music-{tour,build}-*.ts + nav-structure.ts Guided
Tour/Build a Player groups for nomercy-music-player. Music ships no native chrome (no `controls`
equivalent), so every tour/build snippet builds a small real DOM overlay in `onReady()` instead of
relying on a native bar; build steps are cumulative same shape as video's tutorial, tour snippets
are each a standalone minimal demo. `media.ts` gained a real, HEAD-verified `lyricsUrl` on all 3
songs (real `.lrc` fixture in nomercy-media, `[00:00.00]Instrumental`), documented as NOT
baseUrl-resolved (fetched as-is by LyricsPlugin, unlike item.url) — e2e/media.spec.ts gained a
matching lyricsUrl HEAD check (18/18 pass). check:nav green, `npx astro build` exit 0 (355 pages),
check:docs reports only the expected ARC-SECTION-MISSING (recipes/plugins-adapters/reference, out
of scope), `npx playwright test e2e/snippets.spec.ts` 2/2 (every music + video island reaches
data-player-ready). See .rebuild/music-tour-report.md.
checkpoint (uncommitted): music recipes/* (10 pages: vue-integration, react-integration,
svelte-integration, vanilla-integration, crossfade-gapless, lyrics-sync, equalizer-presets,
scrobbling, queue-playlist, audio-output-switching) + plugins-adapters/* (9 pages: scrobble,
auto-advance, lyrics, media-session, key-handler, cast-sender, v1-compat, adapter-audio-backend,
adapter-similarity-engine — similarity-engine documented as reserved/not-wired, no default
adapter, no consumer, not re-exported from either package entry point) + reference/* (4 pages:
player-methods, config, events, types) + 6 new src/examples/music-recipe-*.ts (vanilla-integration,
crossfade-gapless, lyrics-sync, queue-playlist, audio-output-switching — the framework pages,
equalizer-presets, and scrobbling stay code-block-only, matching core/video's plugins-adapters/
reference precedent) + nav-structure.ts Recipes/Plugins & Adapters/Reference groups for
nomercy-music-player. crossfade-gapless recipe introduces `GaplessTransitionStrategy` (core,
video's default) as music's opt-in true-hard-cut alternative to the default `CrossfadeTransitionStrategy`,
switchable at runtime via `setTransitionStrategy()`. Fixed one pre-existing broken link
(`/nomercy-music-player/overview` -> `/introduction`) in core's introduction.mdx, dangling since
the music collection was wiped, this stage's new pages also retroactively resolved the ~40 other
pre-existing dangling forward-links from music's stage 1-4 content (recipes/plugins-adapters/
reference now exist). Music arc is now complete end to end (7/7 stages), matching core and video —
**the full player trio doc rebuild is complete.** See .rebuild/music-rest-report.md for full detail.
