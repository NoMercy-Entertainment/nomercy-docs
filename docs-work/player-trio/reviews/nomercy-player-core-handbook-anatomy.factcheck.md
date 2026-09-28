# Fact check: /nomercy-player-core/handbook/anatomy
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/anatomy.mdx
Reviewed-SHA: 199a60e4e07f5d35

Source: `packages/player-web/nomercy-player-core/src` (`core/index.ts` `playerCoreMethods`, `core/mixins/base-url-audio-context.ts`, `core/state.ts` `setPlayerAudioContext`). Example: `src/examples/core-handbook-anatomy.ts`. Cross-check: music/video `composeMixins(..., ...playerCoreMethods)`. Method: read page, example, and source; SHA via python `hashlib.sha256` of page bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Focus re-check: video/music spread `playerCoreMethods`; `setPlayerAudioContext` writes `_audioContext`; page `baseUrl` sample uses `https://api.example.com/files`.

## Gate checks

| Gate | Result |
| --- | --- |
| Video and music spread `playerCoreMethods` | Pass (music `index.ts:773`; video `index.ts:1276`) |
| `setPlayerAudioContext` writes the audio context | Pass (`state.ts:514-516`; mixin read-only `audioContext()` at `base-url-audio-context.ts:57-59`) |
| Page `baseUrl` example host is `api.example.com` | Pass (page `:51`; example `:70`) |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| British spelling | none |
| Snippet `live="false"` | Pass (page `:55`) |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass (max sentence 19; max paragraph 42) |
| Table data rows ≤ 6 non-separator lines | Pass (4: header + 3 rows) |
| Example imports match package exports | Pass (`index.ts` EventEmitter, types, `initPlayerCoreState`, `playerCoreMethods`, `resolvePlayerConstructor`, `composeMixins`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `playerCoreMethods` is every shared mixin in one `as const` list | `core/index.ts:94-129` | Supported |
| Spread into `composeMixins` on the prototype | `core/index.ts:97`; `compose.ts:38`; example `:53` | Supported |
| Video and music players take the same list | music `index.ts:773`; video `index.ts:1276` | Supported |
| Lifecycle and base URL accessors come early in that list | `core/index.ts:103-105` (`lifecycleMethods`, then `baseUrlAudioContextMethods`) | Supported |
| Adding a new shared mixin means appending to that list | `core/index.ts:98-99` | Supported |
| Core re-exports constructor helper, state seed, error helpers, and each mixin | `core/index.ts:42-86,58+` | Supported |
| After composition, `baseUrl` and `audioContext` live on the instance | `base-url-audio-context.ts:38-59`; example declares + spreads | Supported |
| `baseUrl()` returns prefix or `undefined` | `base-url-audio-context.ts:47-49` | Supported |
| `baseUrl(url)` stores that prefix | `base-url-audio-context.ts:50` | Supported |
| `audioContext()` returns shared context or `undefined` | `base-url-audio-context.ts:57-59` | Supported |
| `baseUrl` does not need another `setup` | `base-url-audio-context.ts:44-45` | Supported |
| String argument replaces the stored prefix; no arg only reads | `base-url-audio-context.ts:47-50` | Supported |
| `audioContext` is read-only on the player | Mixin exposes getter only (`base-url-audio-context.ts:57-59`) | Supported |
| Something else writes via `setPlayerAudioContext` | `state.ts:514-516`; AudioGraphPlugin callers | Supported |
| Until that write, getter returns `undefined` | `state.ts:445-446` init; contract tests | Supported |
| Plugins needing Web Audio should read this instead of creating their own | `base-url-audio-context.ts:53-55` | Supported |
| Inline sample uses `https://api.example.com/files` | Page `:51`; example `:70` | Supported |
| Next link Building DOM path | Path as written: `/nomercy-player-core/handbook/building-dom` | Supported (path as written) |

## Notes (not failures)

- Example also sets `player.baseUrl(FILMS_BASE)` before the `api.example.com` write (`core-handbook-anatomy.ts:66-70`); the page’s illustrated host remains `api.example.com`.
- `setup({ baseUrl })` can seed `_baseUrl` in lifecycle; the page documents the runtime accessor, which still does not require a second `setup` to change the prefix.
