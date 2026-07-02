Music Player collection, arc stages 1-2 (introduction, quickstart) — docs/v2-rebuild

## Files written

- `src/content/nomercy-music-player/en/introduction.mdx` — what the library is (headless audio
  engine: gapless queue playback, crossfade between tracks, a swappable audio backend —
  `AudioElementBackend` default / `WebAudioBackend` for sample-accurate crossfades and a Web
  Audio graph tap — synced lyrics, plugin-driven), who it's for (listening apps that want a real
  UI, not skinned chrome), why it exists (seamless track-to-track transitions owned by the
  swappable backend), the JWPlayer-style "setup is strict, everything after is yours" thesis with
  `nmplayer(id)` named explicitly as the factory, a "What you get" list grounded in the real
  `src/index.ts` + `src/types.ts` exports (crossfade defaults `true` for music, audio output
  device selection, the kit's shared `AudioGraphPlugin`/equalizer chain available on either
  backend, the opt-in `LyricsPlugin`, `V1MusicCompatPlugin` bundled while media-session/
  cast-sender/key-handler/scrobble/auto-advance ship as opt-in subpaths), and a `LayerStack`
  showing music-player between the app and `nomercy-player-core`. Zero video mentions anywhere in
  the prose (checked by grep — the only two "video" occurrences are the generic browser-autoplay-
  policy sentence and the "not video, not music" line mirrored from video's own introduction).
- `src/content/nomercy-music-player/en/quickstart.mdx` — install to a real FMA track ("Where
  Dreams Drift" by Ketsa) playing. Uses the new `:::snippet{file="music-quickstart"}` directive
  (live island) against the new `src/examples/music-quickstart.ts` + extended `media.ts`,
  explains the mandatory `baseUrl` pattern using music's `url` field, and — the one real API
  difference from video worth calling out — explains there is no `MusicPlayerConfig.autoPlay`
  sugar: `setup()` loads the queue but starts nothing, `player.item(0, { autoplay: true })` after
  `ready()` is the real, verified pattern (confirmed against `core/mixins/queue.ts`'s `item()`
  implementation, `LoadOptions.autoplay` is a shared kit-level option, not video-only).

## Two things wired up

1. **`src/examples/media.ts`** — added `MUSIC_BASE` (same origin the testbed's `fmaDefaults.ts`
   uses: `.../nomercy-media/master/Music`, no trailing slash) plus `firstSong` (singleton, mirrors
   `sintel`) and `songs` (3-item array, mirrors `films`) — real Free Music Archive tracks by
   Ketsa and bent wyre. `url` on every item is baseUrl-relative (leading slash, no `MUSIC_BASE`
   prefix), matching the same string-concatenation join `films`/`file` uses (verified against
   `nomercy-player-core`'s `auth.ts` `resolveUrl`: `prefixBase + transformed`, not `new URL()`).
   `cover` is a full URL rather than baseUrl-relative on purpose — cover art resolves through the
   `'poster'` category (`baseImageUrl`, not `baseUrl`) and these tracks don't ship a separate
   image origin, so a relative `cover` would silently 404 without also wiring `baseImageUrl`.
   Every track and cover URL was HEAD-verified for real (curl, all `200`, then re-verified via a
   new Playwright suite, see below).
2. **`src/components/PlayerExample.tsx`** — extended additively. `SnippetModule` gained an
   optional `player?: 'video' | 'music'` field (default `'video'`) alongside a widened
   `AnyPlayer = VideoPlayer | MusicPlayer` type for `config`/`configure`/`onReady`. `mount()` now
   branches on `kind = playerKind ?? 'video'`: the video branch is the exact pre-existing code
   (same `canplay` listener, same comment, moved verbatim into an `else`), the new music branch
   dynamically imports `nomercy-music-player` instead and listens for `firstFrame` — music has no
   consumer-facing `canplay` event (that's video-only, declared on `IVideoPlayer`/`types.ts`
   only); `firstFrame` is the medium-neutral kit event both packages actually emit once the
   backend can play, verified by grepping both packages' `index.ts`. The snippet-then-package
   import is now sequential instead of one `Promise.all` (the target package isn't known until
   the snippet's own `player` field is read) — still a bundle-size win over the alternative of
   eagerly loading both packages, and every pre-existing video snippet's behavior is byte-for-byte
   unchanged (proved by the Playwright run below, not just by inspection).

## Real verification (anti-hollow)

**`npx astro build`** — exit 0, 341 pages built, zero MDX/snippet errors. Cache cleared first
(`.astro`, `node_modules/.astro`, `dist`) to rule out a stale artifact. Both new routes present:

```
├─ /nomercy-music-player/introduction/index.html (+77ms)
├─ /nomercy-music-player/quickstart/index.html (+87ms)
```

The only music-related log lines are the universal, pre-existing `Entry nomercy-music-player →
en/index.mdx was not found` / `en/overview.mdx was not found` pair — every other collection in
the site logs the identical pair for the identical reason (the collection-root `index.astro`
fallback chain), not specific to this change.

**`npm run check:nav`** — passes:

```
Navigation manifest OK — every page is placed exactly once.
```

**`npx playwright test e2e/snippets.spec.ts`** — 2/2 passed, exit 0:

```
Running 2 tests using 1 worker

  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (40.1s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (92ms)

  2 passed (44.2s)
```

Test 1 scans every built page for `data-player-example` and waits for `data-player-ready`. Its
pass covers the new `music-quickstart` island (confirmed present in
`dist/nomercy-music-player/quickstart/index.html`, `data-player-example="music-quickstart"`)
*and* every pre-existing video island on every other page — one green run proves both the new
music branch works live and the `PlayerExample.tsx` change didn't regress video.

**Extra (not mandated, ran anyway since the media.ts docstring claims every URL is verified by
`e2e/media.spec.ts`)** — extended that spec with matching song/cover HEAD checks so the claim
stays true. `npx playwright test e2e/media.spec.ts` — 15/15 passed (9 pre-existing film/anime
tests + 6 new song tests, all real HTTP 200s against the FMA fixture repo).

**`node scripts/check-docs.mjs`** (informational only — not one of the mandated gates) reports
exactly one violation, the expected one:

```
ARC-SECTION-MISSING  nomercy-music-player  missing arc section(s): tour, build, recipes, plugins-adapters, reference
```

No `MISSING-TITLE`, `MISSING-ORDER`, `CROSS-MEDIUM-TOKEN`, or `OVER-BUDGET` violation on either
new page. `npm run build` (the full gate chain) was not run for this reason, same rationale as
`video-intro-report.md`/`core-intro-report.md` — this is intentionally a two-page slice of a
phased rebuild.

## Supporting fixes (direct consequence of adding these two pages)

- `src/lib/nav-structure.ts` — the `'nomercy-music-player'` entry held ~76 slugs from the wiped
  pre-rebuild structure, all pointing at deleted files (PHANTOM errors in `check:nav`). Replaced
  with `{ group: "Getting Started", pages: ['introduction', 'quickstart'] }`, mirroring the exact
  pattern already established for core and video's first checkpoints, plus the same phased-rebuild
  comment.
- `src/lib/navigation.ts`, `src/pages/index.astro` — both hardcoded `/nomercy-music-player/overview`
  (top nav product link, homepage card). Repointed to `/nomercy-music-player/introduction`.
- `src/content/nomercy-player-core/en/reference/utilities.mdx` — had a stale cross-link
  `[Music Player](/nomercy-music-player/overview)`. Repointed to `/nomercy-music-player/introduction`.
  (`nomercy-player-core/en/introduction.mdx` mentions music by name but carries no `/overview`
  href, nothing to fix there.)
- `e2e/media.spec.ts` — added song/cover HEAD-check tests (see above), kept the file's own claim
  ("every URL here... verified live") true for the new catalogue entries too.

## Known, pre-existing, out-of-scope gaps (not introduced by this change)

- `astro.config.mjs` has ~11 dangling `redirects` entries under `/player/music/...` targeting
  pages that don't exist yet in this phased rebuild (`api-methods`, `configuration`, `crossfade`,
  `equalizer`, `events`, `framework-react`, `framework-vue`, `lyrics`, `migration-v1-v2`,
  `plugin-development`). `/player/music/quickstart` now resolves correctly since this slice added
  that page. Not touched — same rationale as the analogous video/core gaps, resolves as later arc
  stages land.
- The collection-root `src/pages/nomercy-music-player/index.astro` still falls back through
  `en/index.mdx` → `en/overview.mdx` → redirect to `/`, identical to every other collection's
  root page (including video's, unfixed there too). Not specific to this change.

## Concerns

- None new. The install story for music is simpler than video's: `nomercy-music-player`'s only
  dependency is `nomercy-player-core` (a regular dependency, not a peer), so
  `npm install @nomercy-entertainment/nomercy-music-player@rc` is genuinely sufficient, verified
  against the published `package.json`. No equivalent of video's missing-`hls.js`-peerDependency
  gap exists here (music's `streams/hls` subpath is an opt-in `registerStream()` factory, not
  something the quickstart needs).
