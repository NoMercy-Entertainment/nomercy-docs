Core collection, arc stage 3 (guided tour) — docs/v2-rebuild

## Pages written

`src/content/nomercy-player-core/en/tour/` (10 pages, one concept each, all `live="false"`
snippets since `PlayerExample.tsx` is hardcoded to `@nomercy-entertainment/nomercy-video-player`
and core is headless):

- `lifecycle.mdx` — the `setup()` pipeline (`setupStart` → ... → `ready`), the closed phase
  machine, `_assertReady()` / `setupState()`, and `dispose()`'s cancellable teardown.
- `event-bus.mdx` — `EventEmitter<E>`: typed `on`/`once`/`off`/`emit`, the `on('all', fn)`
  firehose, snapshot-before-iterate semantics.
- `transport.mdx` — `play`/`pause`/`stop`/`next`/`previous`/`rewind`/`forward`/`restart` and
  the shared cancellable `before*` → `preventDefault()` → `xPrevented` contract.
- `time-and-state.mdx` — `time()`/`duration()`/`timeData()`/`playbackRate()` plus the typed
  coarse-state readers (`bufferState`, `networkState`, `streamState`, `visibilityState`).
- `queue.mdx` — `MediaList<T>`, the cursor-aware list both real players delegate to; the full
  `queue*`/`backlog*` surface; why `playItem`/`playNow` exist (the `item()`+`play()` race).
- `plugin-base.mdx` — the `Plugin` base class: scoped logger/storage, auto-cleanup helpers,
  `dispatchBefore`, `fetch`/`websocket`, `t()`, static contract fields (`requires`, `replaces`,
  `minCoreVersion`, `translations`), registration via `addPlugin`/`getPlugin`.
- `adapters.mdx` — every swappable port (`IStorage`, `IPlatform`, `IStreamSource`,
  `IUrlResolver`, `ITranslator`, `ICueParser`, `IPreloadStrategy`, `ITransitionStrategy`,
  `IShuffleStrategy`, `RealtimeFactory`) in a table, plus `composeMixins` /
  `resolvePlayerConstructor` / `initPlayerCoreState`.
- `i18n.mdx` — `DefaultTranslator`: BCP-47 fallback chain, `{var}` interpolation, plugin
  translation bundles (eager + lazy), title-token interpolation.
- `cue-parsers.mdx` — `CueList` (binary-searched `active`/`next`/`prev`), the built-in VTT /
  sprite-VTT / LRC parsers, `CueParserRegistry` resolution order.
- `errors.mdx` — the `PlayerError` hierarchy, severity tiers, `DEFAULT_RETRY_POLICY`.

Every page: one-line intent open, `{/* Source: ... */}` comment(s) citing the real files verified
against, a `Next steps` close pointing at the next tour page (the last page, `errors`, points back
to `introduction` since arc stage 4 doesn't exist yet — no dead links introduced).

## Example files

`src/examples/` (11 new files, Apache-2.0 SPDX header, tab-indented to match the existing
`minimal-player.ts`/`quickstart.ts` convention — not the repo's `.prettierrc.json`, which is
unused for this directory: no `format` npm script exists and the two precedent files already
predate/ignore it):

- `tour-lifecycle.ts` — reuses the existing `minimal-player.ts` (only needs setup/ready/
  dispose/phase, already declared there).
- `tour-event-bus.ts`, `tour-cue-parsers.ts`, `tour-errors.ts` — standalone, no player instance
  (pure functions / a bare `EventEmitter`).
- `tour-player.ts` — new shared scaffold, same composition as `minimal-player.ts`
  (`composeMixins(..., ...playerCoreMethods)`) but with a wider `declare` block, the guided tour
  exercises more of the kit's surface than the quickstart's narrow demo. Reused by:
  `tour-transport.ts`, `tour-time-and-state.ts`, `tour-queue.ts`, `tour-plugin-base.ts`,
  `tour-adapters.ts`, `tour-i18n.ts`.

Every example is real runnable code, not pseudocode: `tour-transport.ts` actually cancels a
`play()` call and checks the `playPrevented` reason; `tour-adapters.ts` injects a custom
`IShuffleStrategy` at `setup()` and asserts the resulting queue order; `tour-plugin-base.ts`
defines and registers a real `Plugin` subclass and reads its `state().runtime` back.

## Supporting fixes (direct consequence of adding tour/*, not scope creep)

- `src/lib/nav-structure.ts` — added a `"Guided Tour"` group under `nomercy-player-core` listing
  all 10 `tour/*` slugs in reading order. Without this, `check-nav.js` reports all 10 as
  `UNLISTED`.
- `scripts/check-docs.mjs` — `ARC_SECTIONS`'s `tour` stage only matched slugs `architecture` /
  `overview` (no `prefix`), so no page under `tour/*` could ever satisfy it, same class of gap
  the prior slice found and fixed for `introduction`. Added `prefix: ['tour']`, mirroring the
  existing `build`/`recipes`/`plugins-adapters` entries which already use `prefix`.
- `.rebuild/progress.md` — marked tour done in the standing ledger, added a checkpoint note.

## Real build result

```
npm run check:nav
Navigation manifest OK — every page is placed exactly once.

npx astro build
...
├─ /nomercy-player-core/tour/adapters/index.html (+73ms)
├─ /nomercy-player-core/tour/cue-parsers/index.html (+78ms)
├─ /nomercy-player-core/tour/errors/index.html (+87ms)
├─ /nomercy-player-core/tour/event-bus/index.html (+81ms)
├─ /nomercy-player-core/tour/i18n/index.html (+69ms)
├─ /nomercy-player-core/tour/lifecycle/index.html (+81ms)
├─ /nomercy-player-core/tour/plugin-base/index.html (+90ms)
├─ /nomercy-player-core/tour/queue/index.html (+85ms)
├─ /nomercy-player-core/tour/time-and-state/index.html (+73ms)
├─ /nomercy-player-core/tour/transport/index.html (+75ms)
...
[build] 390 page(s) built in 1m 18s
[build] Complete!
```

Exit code 0. `grep -c data-player-example` on all 10 built HTML files returns `0` (confirmed no
live islands were injected, as intended). No MDX/snippet compile errors anywhere in the log; the
only "error"-matching lines are a pre-existing `Entry ... en/index.mdx was not found` notice for
the collection landing page (predates this change, same as the intro/quickstart slice) and two
pre-existing infra warnings (an `@astrojs/mdx` deprecation notice, a CSS-optimizer notice)
unrelated to any content here.

## Snippet verification (no live islands, so no Playwright run)

Every example is code-only by design (`live="false"` throughout, since `PlayerExample.tsx` can
only mount `nomercy-video-player`), so there is no live island for `e2e/snippets.spec.ts` to
check — it would pass vacuously. Real verification instead: standalone `tsc --noEmit` (`--strict
--target ESNext --module ESNext --moduleResolution bundler --verbatimModuleSyntax
--skipLibCheck`, matching this project's `astro/tsconfigs/strict`) run against all 11 new example
files plus the reused `minimal-player.ts`, resolving `@nomercy-entertainment/nomercy-player-core`
from this repo's own `node_modules` (the real published `2.0.0-rc.21`). Two real bugs were caught
and fixed this way before the final clean pass: a `queue()` no-arg call needing a proper
overloaded `declare` (the union-return version didn't narrow away `void`), and an inline object
literal with an extra field failing TypeScript's excess-property check against `queueAppend`'s
parameter type (fixed by typing the local `const` first). Final run: zero diagnostics.

## Known, pre-existing, out-of-scope gaps (not introduced by this change)

- `npm run check:docs` (full contract lint, not the mandated verify command) reports one
  remaining violation for `nomercy-player-core`: `ARC-SECTION-MISSING ... build, recipes,
  plugins-adapters, reference` — expected, this slice ships only arc stage 3 of the phased
  rebuild. The `tour` stage itself is no longer listed as missing (confirms the `check-docs.mjs`
  fix above worked). Zero `CROSS-MEDIUM-TOKEN`, `OVER-BUDGET`, `MISSING-TITLE`, or
  `MISSING-ORDER` violations from anything in this slice.
- `npm run check:links` was not run (not in the mandated verify list); the intro/quickstart slice
  already documented 93 pre-existing broken links from before this rebuild started.
- A stale, orphaned `nomercy-player-kit` content tree (pre-rename leftover, already present
  before this task) still builds its own `/nomercy-player-kit/tour/*` routes alongside the real
  ones — untouched, out of scope, same as it was for the prior slice.

## Verification not run

- `npm run check:docs` end-to-end and the Playwright snippet gate — not run to completion, for
  the same reasons the intro/quickstart slice documented: the contract lint fails first by design
  (known gap above) so the Playwright step never gets reached in that script, and there is no
  live island on any of these 10 pages for it to check. `astro build` plus the standalone `tsc`
  check above are the real, load-bearing proofs for this slice.
