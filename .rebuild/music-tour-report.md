# Music player: Guided Tour + Build a Player (arc stages 3-4)

Branch: `docs/v2-rebuild`. Not committed, tree left changed per instructions.

## Pages

Stage 3 (Guided Tour), `src/content/nomercy-music-player/en/tour/` (9 pages):
transport, time, volume, queue, crossfade, equalizer, audio-output, lyrics, state-events.

Stage 4 (Build a Player), `src/content/nomercy-music-player/en/build/` (5 pages):
shell, scrubber, volume, track-list, now-playing.

All 14 registered in `src/lib/nav-structure.ts` under new "Guided Tour" / "Build a Player" groups
for `nomercy-music-player`.

## New example files

`src/examples/`: `music-tour-transport.ts`, `music-tour-time.ts`, `music-tour-volume.ts`,
`music-tour-queue.ts`, `music-tour-crossfade.ts`, `music-tour-equalizer.ts`,
`music-tour-audio-output.ts`, `music-tour-lyrics.ts`, `music-tour-state-events.ts`,
`music-build-1-shell.ts`, `music-build-2-scrubber.ts`, `music-build-3-volume.ts`,
`music-build-4-track-list.ts`, `music-build-5-now-playing.ts` (14 total, all Apache-2.0 SPDX
header, all `player: 'music'`, all real `baseUrl` + FMA items from `media.ts`, all muted-autoplay
bootstrap matching quickstart's pattern). Every tour/build snippet builds a small real DOM overlay
in `onReady()` (music ships no native chrome to fall back on, unlike video's `controls: true`), so
every live island is genuinely interactive, not just a silent audio tag.

Since music has no native controls, tour pages each build a standalone minimal demo (a few
buttons/sliders scoped to that page's concept); the build stage is the cumulative one, growing
from a bare play/pause button in step 1 to a full shell + scrubber + volume + track list +
now-playing/lyrics panel in step 5, same shape as the finished video build tutorial.

`media.ts` gained a real `lyricsUrl` on all three `songs` entries (verified live: each resolves to
an actual `.lrc` file in the `nomercy-media` fixture repo, e.g. `[00:00.00]Instrumental`, since
these are instrumental CC-BY tracks) — `lyricsUrl` is fetched as-is by `LyricsPlugin`, not resolved
against `baseUrl` the way `item.url` is, so it's set as a fully-qualified URL, matching the existing
`cover` convention. `e2e/media.spec.ts` gained a matching HEAD-check per song for `lyricsUrl`.

## Verification

`npx astro build`: exit 0, 355 pages built, all 14 new routes present in `dist/`.

`npm run check:nav`: "Navigation manifest OK — every page is placed exactly once."

`npm run check:docs`: 1 violation, `ARC-SECTION-MISSING nomercy-music-player missing arc
section(s): recipes, plugins-adapters, reference` — expected, those 3 stages are out of scope for
this task (same intermediate state video's tour+build checkpoint reported before its own
recipes/plugins-adapters/reference passes landed). Zero other violations: no word/line budget
hits, no cross-medium token hits, every page has a resolved title + order.

`npx playwright test e2e/snippets.spec.ts`: **2/2 passed**. Every built page carrying a live
island — all 14 new music tour/build snippets plus every pre-existing video island — reached
`data-player-ready` with no `data-player-error`.

`npx playwright test e2e/media.spec.ts`: 18/18 passed, including the 3 new `lyricsUrl` HEAD checks.

## Concerns

- Zero-contamination pass: swept all new prose and example-file comments for video-domain terms
  (video/subtitle/chapter/fullscreen/HLS) and removed every comparative mention; only the two
  pre-existing "not video, not music" / `<video>` references in `introduction.mdx`/`quickstart.mdx`
  (both out of scope, already shipped) remain.
- `bufferState()`/`networkState()` have no push event on the music event map (video gets
  `waiting`/`stalled`, music doesn't) — `tour/state-events` and its snippet poll on a 1s interval
  instead of subscribing; documented as a real, honest asymmetry rather than glossed over.
- Stages 5-7 (recipes, plugins-adapters, reference) remain unwritten for music — same gap the
  video/core collections had at this point in their own rebuild, tracked separately.
