# Reader: /nomercy-player-core/quickstart

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/quickstart.mdx

Reviewed-SHA: 96af8a7012c0b5d6

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

`core-quickstart.ts` (via `:::snippet{file="core-quickstart" live="false"}` in the Compose the class section).

## Reader notes (JavaScript background, first visit)

I read Install, then Compose the class (numbered steps plus the expanded snippet), and stopped once I had a class that extends the package `EventEmitter`, runs `resolvePlayerConstructor` and `initPlayerCoreState` in the constructor, and calls `composeMixins` on the prototype with `playerCoreMethods`. I did not use player source.

Install is one command and the page states that it is the only package to install. That is enough to start.

The three numbered steps name the same exports the snippet imports and match the order of work in the constructor and the post-class `composeMixins` call. The snippet is a full composition sample, not a fragment: instance map, class body, factory export, and the `declare` lines for methods that mixins add at runtime. The inline comment on those `declare` lines tells me why they exist without opening the library.

I could copy the Compose section into a project and have a composed class without inventing API shapes. The prose after the snippet (`composeMixins` copies descriptors, later modules win on duplicate keys, `playerCoreMethods` is what the real players spread) reinforces why the spread in `composeMixins(CorePlayer.prototype, ...playerCoreMethods)` is there even though step 3 does not say "spread" explicitly.

## Friction (does not fail the rubric)

The sample is TypeScript (`declare`, type-only imports). The page never labels it as TypeScript. As a JavaScript-only reader I would drop types and the `declare` block and keep the same structure; that is familiar JS tooling friction, not a missing library step.

Step 1 says extend `EventEmitter` before the snippet shows it comes from the same package (not Node `events`). I would not fail on that because the snippet sits in the same section and lists the import.

The numbered list alone is not enough to write the constructor (no mention of the instance `Map`, the `'CorePlayer'` label argument, or the `existing` return path). The page assumes I use the snippet as the canonical code, which matches the directive treating `core-quickstart.ts` as what the page shows.

Mount and set up explains `resolvePlayerConstructor` ids and DOM rules for when I run the sample; that is after composition. The snippet also includes mount, `setup`, top-level `await`, and `dispose`, which are runtime/demo lines, not required to understand how the class is composed.

## Why PASS

Under the rubric (install through a composed class without guessing), the page gives a clear install line, a step list tied to real export names, and a complete composition example I can follow without reading implementation code. I know what to install, what to import, how to wire the constructor, and where to call `composeMixins`.
