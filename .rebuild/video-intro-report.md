Video Player collection, arc stages 1-2 (introduction, quickstart) — docs/v2-rebuild

## Files written

- `src/content/nomercy-video-player/en/introduction.mdx` — what the library is (headless HTML5
  video player, HLS + subtitle rendering, plugin-driven, built on `nomercy-player-core`), who it's
  for (video-watching apps that want a real UI, not skinned chrome), why it exists (one hard job,
  reliable adaptive playback across browsers, owned by a swappable backend), the JWPlayer/video.js
  "setup is strict, everything after is yours" thesis with `nmplayer(id)` named explicitly as the
  factory, a "What you get" list grounded in the real `src/index.ts` + `src/types.ts` exports, and
  a `LayerStack` showing video-player between the app and `nomercy-player-core`.
- `src/content/nomercy-video-player/en/quickstart.mdx` — install to a real Sintel stream playing.
  Uses the existing `:::snippet{file="quickstart"}` directive (live island) against the already
  -proven `src/examples/quickstart.ts` + `src/examples/media.ts`, explains the mandatory `baseUrl`
  pattern with the exact join semantics verified against source (raw string concatenation, base
  path kept, not `new URL()` resolution), and shows mounting into a consumer's own container with
  `nmplayer(id)`.

No new example `.ts` file was needed, both existing files (`quickstart.ts`, `media.ts`) were
reused exactly as instructed.

## Supporting fixes (direct consequence of adding these two pages)

- `src/lib/nav-structure.ts` — the `'nomercy-video-player'` entry held ~76 slugs from the
  pre-rebuild structure, all now pointing at deleted files (would have failed `check:nav` with
  PHANTOM errors). Replaced with `{ group: "Getting Started", pages: ['introduction', 'quickstart'] }`,
  mirroring the exact pattern already established for `nomercy-player-core`, plus the same
  phased-rebuild comment.
- `src/lib/navigation.ts`, `src/pages/index.astro` — both hardcoded `/nomercy-video-player/overview`
  (top nav product link, homepage card). Repointed to `/nomercy-video-player/introduction`.
- `src/content/nomercy-player-core/en/introduction.mdx`, `.../reference/utilities.mdx` — both had a
  stale cross-link to `/nomercy-video-player/overview`. Repointed to `/nomercy-video-player/introduction`.
  Their `/nomercy-music-player/overview` links were left alone; that collection hasn't been
  rebuilt yet and the page still exists under that slug.

## Real verification (anti-hollow)

**`npx astro build`** — exit 0, 354 pages built, zero MDX/snippet errors. Cleared the stale
`.astro` / `node_modules/.astro` content cache first and rebuilt from scratch to rule out any
cache artifact. Both new routes present:

```
├─ /nomercy-video-player/introduction/index.html (+45ms)
├─ /nomercy-video-player/quickstart/index.html (+44ms)
[build] 354 page(s) built in 48.93s
[build] Complete!
```

Two pre-existing, unrelated warnings appear in the log and are not new: `Entry nomercy-video-player
→ en/index.mdx was not found` / `en/overview.mdx was not found` (the collection-root
`src/pages/nomercy-video-player/index.astro` falls back through both slugs then redirects to `/`;
every other collection in the site logs the identical pair for the identical reason, this is not
specific to video or to this change). Two other routes, `/nomercy-video-player/plugins/tv-ui` and
`/nomercy-video-player/plugins/auto-advance`, also appear; these are static entries in
`astro.config.mjs`'s `redirects` map (pre-existing, dangling until later arc stages land their
target pages), not content pages, confirmed by grepping the raw content data store.

**`npm run check:nav`** — passes:

```
Navigation manifest OK — every page is placed exactly once.
```

**`npx playwright test e2e/snippets.spec.ts`** — 2/2 passed, exit 0 (this itself runs a fresh
`npm run preview`, i.e. its own `astro build` + `astro preview`, before testing):

```
Running 2 tests using 1 worker

  ✓  1 e2e\snippets.spec.ts:99:3 › live snippet gate › every built doc page with a player example reaches data-player-ready (47.2s)
  ✓  2 e2e\snippets.spec.ts:139:3 › live snippet gate › the built site has doc pages to gate (122ms)

  2 passed (52.5s)
```

Test 1 is the load-bearing proof: it scans every built page for `data-player-example`, finds the
quickstart page's live island, and waits for its `role="region"` mount target to reach
`data-player-ready="true"` (or fails on `data-player-error` / a 20s timeout). It passed, so the
Sintel HLS stream genuinely loaded and reached `canplay` in a real headless browser via `baseUrl`
resolution, not a stub.

## Known, pre-existing, out-of-scope gaps (not introduced by this change)

- `npm run check:docs` (the full contract lint, which chains into the arc-section check) will
  report `ARC-SECTION-MISSING` for `nomercy-video-player`: `tour, build, recipes,
  plugins-adapters, reference`. Expected, this slice intentionally ships only arc stages 1-2 of a
  phased rebuild (see `.rebuild/progress.md`, same pattern core went through). This is why the
  mandated verify command is `npx astro build` directly, not `npm run build`. Not run to
  completion for this reason (same rationale as `core-intro-report.md`).
- `astro.config.mjs` has several dangling `redirects` entries under `/nomercy-video-player/...`
  targeting pages that don't exist yet in this phased rebuild (`plugins/tv-ui` →
  `plugins/tv-key-handler`, `plugins/auto-advance` → `recipes/playlist-and-queue`, and likely
  others under the same prefix). Not touched, out of scope for a two-page slice; will resolve as
  later arc stages land the same way the analogous `check:links` gaps did for core.
- A stale, orphaned `nomercy-player-kit` collection still exists in `nav-structure.ts` /
  `src/pages/` from before the core rename (visible in the build log as `/nomercy-player-kit/...`
  routes). Pre-existing, not touched.

## Concern worth flagging (not fixed, out of repo scope)

`@nomercy-entertainment/nomercy-video-player@2.0.0-rc.21`'s published `package.json` declares
`hls.js` in neither `dependencies` nor `peerDependencies` (`peerDependencies` is `undefined`),
even though the backend's own source comment says explicitly: `"peer dep — not bundled ... ESM
build resolves it from the consumer's node_modules"`. A fresh `npm install
@nomercy-entertainment/nomercy-video-player@rc` alone would not pull in `hls.js`, so HLS playback
would fail outside Safari on a truly clean install. The quickstart page documents the accurate,
working install command (`npm install @nomercy-entertainment/nomercy-video-player@rc hls.js`)
rather than the aspirational "installs automatically" claim music-player's existing (pre-rebuild)
quickstart makes, that same claim looks equally unverified there. This is a packaging gap in the
`nomercy-video-player` repo, not something this docs-only task can fix; flagging for
`library-manager` to add the formal `peerDependencies` entry.
