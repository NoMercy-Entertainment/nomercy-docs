# Reader: /nomercy-player-core/tour/composition-boundary

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/composition-boundary.mdx

Reviewed-SHA: dee83a13626563ea

## Same-voice comparison

Reference: `src/content/nomercy-player-core/en/tour/queue.mdx`.

Both pages open with when to use the API and the one rule that shapes every call (queue: list edits vs playback timing; composition boundary: shared modules before overrides). Sections are short, imperative, and behavior-first. `fn composeMixins` follows the same `fn` typography as `fn queue` and `fn item`. Inline TypeScript is minimal; the tour snippet carries the runnable story, matching queue’s pattern. The **Next** link hands off to the following tour step instead of re-explaining build docs.

## Snippet

`core-tour-composition-boundary.ts` (via `:::snippet{file="core-tour-composition-boundary" live="false"}` before **Next**). It imports `composeMixins`, defines `sharedMethods` and `specificMethods` objects with a colliding `role` key, declares `BoundaryPlayer`, stamps `BoundaryPlayer.prototype` with shared then specific, and logs `'specific'`. Judgment below is for the MDX page plus how the snippet completes the inline block.

## Reader notes (JavaScript background, new to composeMixins)

I read the page in order without opening `compose.ts`.

The opening states the contract in two sentences: early arguments are shared behavior you keep; last arguments are what the class adds or overrides. That answers *why* order matters before the mechanics section.

**Keep shared first** makes the override rule explicit: pass general modules before specific ones; a later export replaces an earlier one on the same key. The table restates order, later-wins, accessor preservation, and idempotent re-stamp without introducing new names.

**Add only what is yours** gives the workflow: define the class, then stamp onto its prototype; skip a later module when shared behavior is enough, add one when a key must differ. The one-line call shows the full argument list:

`composeMixins(MyPlayer.prototype, generalMethods, specificMethods)`.

So the first argument is the prototype (not a module), and the first *module* argument is the shared layer. The follow-up sentence assigns ownership: keys from `specificMethods` win; everything else still comes from `generalMethods`.

The snippet names `sharedMethods` / `specificMethods` instead of `generalMethods` / `specificMethods`, but the collision and order match the prose. I could tell what to pass first (shared module object) and why (later key wins) without opening source.

## Friction (does not fail the rubric)

The inline block uses placeholder names (`MyPlayer`, `generalMethods`, `specificMethods`) that only become concrete in the snippet. “Method modules” are plain objects in the example; the page does not spell out “object whose keys are method names” in one definitional sentence. “Descriptors” in the repeat-is-safe note is ECMAScript jargon. None of that blocked the pass conditions.

## Why PASS

Under the rubric I know the call shape (prototype, then modules left to right), that shared/general modules go first and specific/override modules last, and that later exports replace earlier ones on the same key so the class can override one method without rewriting shared code. No API name is used in a way that contradicts a later explanation. Voice aligns with the queue tour page.
