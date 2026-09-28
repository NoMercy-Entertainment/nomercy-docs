# Reader: /nomercy-player-core/handbook/anatomy

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/anatomy.mdx

Reviewed-SHA: 199a60e4e07f5d35

## Same-voice comparison

Compared to `src/content/nomercy-player-core/en/tour/queue.mdx`. Anatomy matches the tour voice: a short opening that states when to use the page, sections that name APIs with `fn` typography before showing calls, small inline TypeScript blocks, a non-live snippet before **Next**, and a single handbook link for what comes after. Sentences stay imperative and behavior-first rather than describing the doc site.

## Snippet

`core-handbook-anatomy.ts` (via `:::snippet{file="core-handbook-anatomy" live="false"}` before **Next**). It builds `AnatomyPlayer` with `resolvePlayerConstructor`, `initPlayerCoreState`, `composeMixins(...playerCoreMethods)`, then `setup`, `ready`, `baseUrl` read/write, and `audioContext()` (still `undefined` because nothing calls `setPlayerAudioContext`). Judgment below is for the MDX page only; the snippet fills in constructor and lifecycle wiring the prose does not re-teach.

## Reader notes (JavaScript background, new to this handbook)

I read the page in order without opening player source, assuming I already have a class and only need the shared method tuple and two early accessors.

The opening ties the page to a **composed class** and names the tuple plus URL prefix and shared audio context. That matches the frontmatter description and tells me this is about shape after composition, not how to mount DOM or write plugins end to end.

**The shared tuple** introduces `playerCoreMethods` as one ordered `as const` list, then tells me to spread it with `composeMixins` on the prototype. Video and music using the same list is orientation, not a second task. The inline block is enough to copy the one line I need. Notes about tuple order, appending new shared mixins, and core re-exports are catalog color; they do not block the main action.

**Base URL and audio context** gives a table for `baseUrl` (read vs store) and `audioContext` (read-only). The prose says `baseUrl` does not need another `setup`, that a string replaces the stored prefix, and that something else must call `setPlayerAudioContext` before the getter returns anything other than `undefined`. Plugin authors get a clear read path instead of creating their own graph. The second inline block shows the three calls in order.

Doc typography (`fn`, table roles) matches the tour pages. The page stays on instance behavior; it does not talk about itself as documentation.

## Friction (does not fail the rubric)

`Lifecycle` in the tuple-order sentence is not mapped to method names on this page. `setup` is mentioned only to contrast with `baseUrl`; I am expected to know lifecycle from an earlier build or tour page. The re-export sentence names “constructor helper, state seed, error helpers” without tying them to exports I would import. This handbook page does not show how or when to call `setPlayerAudioContext` if I want a defined `audioContext` in my own app—that write path lives elsewhere. The snippet imports and declares several symbols the MDX never names; that is fine for a full example but not required to follow the two sections.

## Why PASS

I can tell what to do on the page: spread `playerCoreMethods` with `composeMixins` on my prototype, then read or set `baseUrl` and read `audioContext` on the instance, knowing the context stays undefined until another part of the stack sets it. Every API the prose asks me to use (`playerCoreMethods`, `composeMixins`, `baseUrl`, `audioContext`, `setPlayerAudioContext` as the writer hook) is introduced in the same section or the sentence before it is needed. Under the stated fail conditions, this passes.
