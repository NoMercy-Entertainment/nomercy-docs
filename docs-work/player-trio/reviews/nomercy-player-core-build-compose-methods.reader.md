# Reader: /nomercy-player-core/build/compose-methods

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/compose-methods.mdx

Reviewed-SHA: a19b03f824aed51d

## Same-voice comparison

Skipped. No approved reference page was requested for this review.

## Snippet

`core-build-compose.ts` (via `:::snippet{file="core-build-compose" live="false"}`). It matches the page: shared `Map` registry, `resolvePlayerConstructor` with a fixed class name string, mount path with `initPlayerCoreState(this, { className: 'ComposedPlayer' })` aligned to that string, assignment of `playerId` and `container`, registration, early return on `existing`, and post-class `composeMixins(ComposedPlayer.prototype, ...playerCoreMethods)`. The demo mount and lifecycle calls illustrate non-media behavior only.

## Reader notes (JavaScript background, first visit)

I read only the MDX prose first, without opening the example file or library source.

`composeMixins` and `resolvePlayerConstructor` are documented with signatures, behavior, and error cases. The mount versus existing split is explicit. On mount, the page now states that `initPlayerCoreState` must receive `{ className }` matching the `className` argument to `resolvePlayerConstructor`, then bind `playerId` and `container`, then register the instance. On existing, return the registered instance. That closes the gap from the prior review where a reader could call `initPlayerCoreState(this)` with no options and still follow the bullets.

`playerCoreMethods` is named as the exported tuple real players spread, with a one-line `composeMixins(MyPlayer.prototype, ...playerCoreMethods)` example. The closing paragraph names the four structural moves: extend `EventEmitter`, resolve the constructor, seed state, stamp the aggregate.

From that text I can wire a working class: hold a `Map<string, C>` for the second argument to `resolvePlayerConstructor`, use a stable class name string in both resolver and `initPlayerCoreState`, branch on `resolved.kind`, and call `composeMixins` on the prototype after the class declaration. I would still call `super()` in the constructor as usual for a subclass; the page does not spell that out, but it is not a library-specific hidden step.

## Friction (does not fail the rubric)

The prose does not list imports, TypeScript `declare` lines for mixin methods, or a `get id()` accessor. The snippet carries those details. For a JavaScript-only reader, dropping types and `declare` while keeping the constructor and `composeMixins` call is enough.

The page does not define the instance map in a dedicated sentence; the `resolvePlayerConstructor` signature requires `instances: Map<string, C>`, which is sufficient to introduce one.

## Why PASS

Under the rubric (fail when a required step between signatures and a working composed class is missing from the prose), the mount checklist now includes the `initPlayerCoreState` options object and its alignment with `resolvePlayerConstructor`. Together with the API sections and the `playerCoreMethods` usage line, a newcomer can construct the class from the page text without guessing a required library argument.
