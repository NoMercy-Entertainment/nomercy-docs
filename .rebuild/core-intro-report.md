Core collection, arc stages 1-2 (introduction, quickstart) — docs/v2-rebuild

## Files written

- `src/content/nomercy-player-core/en/introduction.mdx` — what the kit is, who it's for (someone
  composing their own player, not an end-user app), why it exists (one shared implementation
  instead of two that drift), the JWPlayer-style "setup is strict, everything after is yours"
  thesis, a "What you get" list grounded in the real `src/index.ts` exports, and a `LayerStack`
  showing core as the shared foundation under both real players.
- `src/content/nomercy-player-core/en/quickstart.mdx` — composes a minimal headless player
  straight from the kit and explains mounting it (the three-form `resolvePlayerConstructor`
  contract). Points to the two real quickstarts for anyone who wants a player that actually
  plays something.
- `src/examples/minimal-player.ts` — new runnable example (see below).

Supporting fixes made in the same pass, all required for the two pages to have a working position
and working links (not scope creep — each is a direct consequence of adding these two pages):

- `src/lib/nav-structure.ts` — the `'nomercy-player-core'` collection had no entry (only a stale,
  orphaned `'nomercy-player-kit'` key left over from before the collection was renamed, pointing
  at ~76 now-deleted slugs). Replaced it with a real entry: `{ group: "Getting Started", pages:
  ['introduction', 'quickstart'] }`. Without this, `check-nav.js` reports both pages as
  `UNLISTED`.
- `scripts/check-docs.mjs` — `ARC_SECTIONS`'s `introduction` stage only matched slugs `index` /
  `overview`. Added `'introduction'` to that list so a page literally named `introduction.mdx`
  (the name this task specified) is recognized once the rest of the arc lands.
- `src/lib/navigation.ts`, `src/pages/index.astro`, `src/content/nomercy-video-player/en/api/kit-methods.mdx`
  — all three hardcoded `/nomercy-player-core/overview` (top nav, homepage card, one cross-link).
  That page no longer exists under the new naming; repointed all three to
  `/nomercy-player-core/introduction`. Two other stale cross-links in the same `kit-methods.mdx`
  block (`/nomercy-player-core/event-system`, `/nomercy-player-core/lifecycle`) were left alone —
  those pages belong to the "tour" arc stage, not yet built in this phased rebuild, same as before
  this change.
- `src/lib/mdx/remark-snippet.ts` — see below.

## Why `remark-snippet.ts` changed

`:::snippet{file="..."}` unconditionally emits a code block *and* a live `<PlayerExample>` island.
`PlayerExample.tsx` is hardcoded to `@nomercy-entertainment/nomercy-video-player` — it dynamically
imports that package specifically and calls `.setup(config)` on it. Pure `nomercy-player-core` has
no media backend and renders nothing; using the directive as-is on a core page would have either
silently mounted an unrelated video player on a core page (direct video contamination, forbidden by
the contract) or left the island permanently in an error state — either way a faked result, which
the task explicitly ruled out.

Added one optional attribute: `:::snippet{file="..." live="false"}` emits only the code block, no
island. Omitting `live` (every existing/future video or music usage) is byte-for-byte the original
always-live behavior — confirmed no existing content used the directive yet (`grep` across
`src/content/` before the change returned zero hits), so this is a strict, backward-compatible
addition, not a behavior change to anything live today.

## The example file

`src/examples/minimal-player.ts` composes `MinimalPlayer`: extends `EventEmitter<BaseEventMap>`,
resolves the three-form constructor via `resolvePlayerConstructor` + `initPlayerCoreState` (the
exact pattern `NMVideoPlayer`'s and `NMMusicPlayer`'s own constructors use, verified against
`packages/nomercy-video-player/src/index.ts`), then stamps `playerCoreMethods` — the same
aggregate mixin set those two classes compose, not a hand-picked subset — onto the prototype with
`composeMixins`. Exports `minimalPlayer(id)`, with a usage comment showing `setup()` /
`ready()` / `phase()` / `dispose()`.

Referenced from `quickstart.mdx` via `:::snippet{file="minimal-player" live="false"}`.

## Real build result

```
npx astro build
...
22:38:17   ├─ /nomercy-player-core/index.html (+7ms)
22:38:17   ├─ /nomercy-player-core/introduction/index.html (+54ms)
22:38:17   ├─ /nomercy-player-core/quickstart/index.html (+56ms)
...
[build] 380 page(s) built in 1m 12s
[build] Complete!
```

Zero errors, zero MDX/snippet errors, exit code 0. The two new routes are in the output; the
`:::snippet{..., live="false"}` directive resolved the code block from the real file with no
`PlayerExample` import injected (verified — `grep -c data-player-example` on both built HTML files
returns `0`).

`npm run check:nav` — **passes**: `Navigation manifest OK — every page is placed exactly once.`

## How the snippet was verified (no live island, so no Playwright run)

The example is code-only by design (see above), so there is no live island for the Playwright
snippet gate to check — `e2e/snippets.spec.ts` scans built HTML for `data-player-example`, finds
none on these two pages, and would pass vacuously. Real verification instead: standalone `tsc
--noEmit` (strict, `verbatimModuleSyntax`, `moduleResolution: Bundler`, matching this project's own
`astro/tsconfigs/strict`) run directly against `src/examples/minimal-player.ts`, resolving
`@nomercy-entertainment/nomercy-player-core` from this repo's own `node_modules` — i.e. the actual
published `2.0.0-rc.20` package, not monorepo source. Exit code `0`, zero diagnostics.

## Known, pre-existing, out-of-scope gaps (not introduced by this change)

- `npm run check:docs` (the full contract lint) fails on `ARC-SECTION-MISSING` for
  `nomercy-player-core`: `tour, build, recipes, plugins-adapters, reference` — expected. The
  contract requires a non-empty collection to cover all 7 arc stages; this slice intentionally
  ships only stages 1-2 of a phased rebuild (see `.rebuild/progress.md`). This is why the task's
  own mandated verify command is `npx astro build` directly, not `npm run build`.
  `npm run check:nav` (position/placement) passes cleanly on its own.
- `npm run check:links` reports 93 pre-existing broken internal links, all in `nomercy-video-player`
  / `nomercy-music-player` content pointing at old core page slugs (`/nomercy-player-core/transport`,
  `/adapters`, `/plugin-authoring`, etc.) that were deleted from disk before this task started (the
  76 staged deletions already present in git status when this task began). None of these were
  introduced by this change; they'll resolve as the remaining core arc stages land in later slices.

## Verification not run

- `npm run check:docs` / the Playwright snippet gate end-to-end — not run to completion, since (a)
  the contract lint fails first by design (see above) so the Playwright step never gets reached in
  that script, and (b) there is no live island on these two pages for it to check. `astro build`
  plus the standalone `tsc` check above are the real, load-bearing proofs for this slice.
