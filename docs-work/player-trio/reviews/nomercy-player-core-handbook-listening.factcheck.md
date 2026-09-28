# Fact check: /nomercy-player-core/handbook/listening
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/listening.mdx
Reviewed-SHA: 6ae38fde2576c285

Source: `packages/player-web/nomercy-player-core/src/core/plugin/base.ts` (`listen`, `on`/`once`/`off`/`hasListeners`, `resolveListenerArgs`, `static priority`); `src/adapters/lifecycle-registry/default.ts` (`LifecycleRegistry.listen` / `dispose`); `src/core/mixins/plugin-registration.ts` (`enabledPlugins`). Example: `src/examples/core-handbook-listening.ts`. Method: read page, example, and those sources; SHA256 of the mdx bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. Table: 4 non-separator lines (header + 3 data). British spelling: none. Raw-listener memory claim: none (page states registry miss + dispose does not remove; does not claim the plugin stays in memory).

## Gate checks

| Gate | Result |
| --- | --- |
| `listen` tracks DOM listeners; dispose removes with same options | Pass (`lifecycle-registry/default.ts:65-74,225-238`) |
| Raw `addEventListener` not in registry; dispose does not remove it | Pass (only `listen` pushes `ListenerRecord`; page `:30-31`) |
| Page does not claim a raw listener keeps the plugin in memory | Pass (no memory/retention wording) |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:86`) |
| Sentence ≤30 words / paragraph ≤60 words | Pass (max sentence 19; max paragraph 45) |
| Table ≤6 non-separator lines | Pass (4) |
| British spelling | none |
| Example imports from package root | Pass (`index.ts` exports named imports) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Plugin helpers clean up on dispose; Event Bus page covers raw player `on`/`once`/`off`/`emit` | `base.ts:412-454,988-989`; page links Event Bus | Supported |
| `listen` is drop-in for `addEventListener` on `EventTarget`; records target, event, handler, options | `default.ts:58-74`; `base.ts:983-989` | Supported |
| Dispose removes each listener with those same options; further `listen` after dispose is a no-op | `default.ts:65-67,225-238` | Supported |
| Raw `addEventListener` is not in that registry; dispose will not remove it | Registry only via `listen`; raw path never recorded | Supported |
| `on` / `once` two forms: player string, or other plugin by class → `plugin:<id>:<event>` | `base.ts:70-84,412-454` | Supported |
| Both call the player bus, then record cleanup that runs `off` on dispose; unused `once` still cleared | `base.ts:433-436,450-453`; `default.ts:47-55,277-287` | Supported |
| `this.player.on` from a plugin skips cleanup registration | Direct bus call bypasses `lifecycle.addCleanup` | Supported |
| `off` same two forms; same function reference; dispose removes helper registrations | `base.ts:456-469`; example `:68-69` | Supported |
| `hasListeners` same forms; pure read via player bus | `base.ts:471-484` | Supported |
| `priority` defaults to `0`; `enabledPlugins` sorts enabled by priority descending; ties keep registration order | `base.ts:210-219`; `plugin-registration.ts:752-766` | Supported |
| That list order does not reorder handlers on one bus event; handlers run in subscription order | `base.ts:214-217`; event bus insertion order | Supported |
| Example: `hasListeners` gate, class `on`, `once('play')`, `listen` DOM, early `off`, `item` | `core-handbook-listening.ts:31-69` | Supported |
| Next: Network Helpers path | `/nomercy-player-core/handbook/network` exists | Supported |

## Example alignment

- Package-root imports; `BeatPlugin` emits only when `hasListeners(BeatPlugin, 'beat')`; `BeatLightPlugin` uses class `on`, `once('play')`, `listen(document, 'visibilitychange', …)`, and early `off('time', …)`.
- Matches handbook: registry-backed `listen` / `on` / `once`, early `off`, and dispose tearing down registrations (example ends with `await player.dispose()`).
