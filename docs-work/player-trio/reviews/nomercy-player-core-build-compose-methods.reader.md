# Reader: /nomercy-player-core/build/compose-methods

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/build/compose-methods.mdx

Reviewed-SHA: a807aaf9a3c8cf11

Same-voice comparison skipped (not requested for this pass).

## First read

The page splits into two jobs: stamp shared methods with `composeMixins`, then decide mount versus reuse with `resolvePlayerConstructor`. The opening paragraph states both goals before the sections, which helped me know what to look for.

## List items (one sentence each)

Under **Mount or reuse**, every bullet is a single sentence. None use a second period or read like two independent statements glued together.

## Mount versus reuse, including className

From the prose alone I could follow the id cases in the bullet list (no id, empty registry, number index, known string, new string with DOM lookup, errors).

The two closing sentences in that section spell out the constructor outcome:

- New mount: call `initPlayerCoreState` with `{ className }` matching the third argument to `resolvePlayerConstructor`, then store id, `div`, and register.
- Reuse: if the id is already registered, return the existing player.

The snippet (`core-build-compose.ts`) mirrors that: pass `'ComposedPlayer'` into `resolvePlayerConstructor`, branch on `resolved.kind === 'existing'`, otherwise `initPlayerCoreState(this, { className: 'ComposedPlayer' })` and register in the map. I did not need to guess that className must stay aligned across those two calls.

## Snippet as the page code

The live snippet matches the example file: constructor resolution, `initPlayerCoreState`, `composeMixins` on the prototype, and a minimal mount demo. That tied the API section to something I could trace line by line.

## Minor newcomer notes (not failures)

I had to connect `resolvePlayerConstructor` to "your constructor" myself; the page describes the helper and the mount/reuse rules but does not label a `constructor()` block in the MDX. The snippet closed that gap.

Undefined id behavior ("Nothing returns the first player you already created") assumes I already created at least one player; the empty-registry bullet covers the opposite case.

## Summary

PASS: list discipline holds, and mount versus reuse plus className is explicit in **Mount or reuse** and confirmed by the snippet.
