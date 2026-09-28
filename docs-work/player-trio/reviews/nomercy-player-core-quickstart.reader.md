# Reader: /nomercy-player-core/quickstart

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/quickstart.mdx

Reviewed-SHA: 98dbd955d5a28b32

Same-voice comparison: skipped (not requested for this review).

## Can you compose the class from the page?

Yes. The numbered block under **Compose the class** is a complete recipe, and the embedded snippet is the code the page shows.

| Step in the doc | What you do in JavaScript |
| --- | --- |
| Extend `EventEmitter` | `class CorePlayer extends EventEmitter<BaseEventMap>` |
| `resolvePlayerConstructor` | Call it in the constructor with an instances map, the string `'CorePlayer'`, and the optional id |
| `initPlayerCoreState` with the same class name | `initPlayerCoreState(this, { className: 'CorePlayer' })` after you know you are creating a new instance |
| `composeMixins` with `playerCoreMethods` | `composeMixins(CorePlayer.prototype, ...playerCoreMethods)` after the class body |

The snippet fills in behavior the four bullets do not spell out: handling `resolved.kind === 'existing'`, assigning `playerId` and `container`, storing in the map, `declare` lines for TypeScript, a small `corePlayer()` factory, and a demo mount plus `setup`, `ready`, and `dispose`. None of that contradicts the steps; it is the natural implementation of step 2 and 3 inside a constructor.

Install is one package; the prose matches `npm install @nomercy-entertainment/nomercy-player-core` and the imports in the snippet.

**Mount and set up** ties step 2 to the DOM: string id looks up a `div`, wrong or missing nodes throw the named errors, and the sample creates a labeled `div` and passes its id. That is enough to run the bottom of the snippet without guessing mount rules.

## List item sentence rule

Each of the four numbered items under **Compose the class** is a single sentence. No FAIL on this rule.

## Gaps and friction (not FAIL)

- The steps do not say that `composeMixins` runs once on the prototype after the class definition, but step 4 wording ("onto the prototype") plus the snippet make that obvious.
- Generic `BaseEventMap` on `EventEmitter` appears only in the snippet, not in step 1; you copy it from the example import block.
- The paragraph after the snippet explains mixin order (later bundle wins) and what `playerCoreMethods` includes; helpful context, not required to wire the class.

## Summary

A JavaScript reader can install Core, follow the four compose steps, use the snippet as the canonical shape, and mount with a `div` id as described. Verdict remains **PASS**.
