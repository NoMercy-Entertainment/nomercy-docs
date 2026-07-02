# Docs v2 rebuild — content ledger (branch docs/v2-rebuild)
Contract: DOCS-CONTRACT.md. Backup tag: docs-content-backup-f353481. His CLAUDE.md WIP: stash stoney-claude-md-wip.
Engine (cherry-picked, verified): PlayerExample, remark-snippet, check-docs, media.ts, playwright gate, dev fix.
Arc per library (identical order): 1 introduction, 2 quickstart, 3 tour/*, 4 build/*, 5 recipes/*, 6 plugins-adapters/*, 7 reference/*.
Altitude: core = compose-your-own-player (under the hood); video/music = consumer.

## Status
- [x] core content: DONE, all 7 arc stages (intro, quickstart, tour, build, recipes,
  plugins-adapters, reference). check-docs no longer reports ARC-SECTION-MISSING for core.
- [ ] video content: intro+quickstart+tour+build done (4/7 stages), recipes/plugins-adapters/reference remain
- [ ] music content
- [ ] final cross-library verify (check-docs + build + nav + a11y)
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
