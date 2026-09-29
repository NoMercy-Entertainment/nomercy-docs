# Fact check: /nomercy-player-core/plugins-adapters/adapter-audio-output
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-audio-output.mdx
Reviewed-SHA: 71a1c110b067f0e9

Source: nomercy-player-core at `5ed4538` (toolchain.md; checkout is `e3d2de5`, `git diff --stat 5ed4538 e3d2de5 -- src` is empty). Files: `src/core/mixins/audio-output.ts`, `src/core/state.ts`, `src/core/index.ts`, `src/index.ts`, `src/types/player.ts`, `src/testing/stub-player.ts`, `src/testing/index.ts`, `src/errors/policy.ts`, `package.json` (`exports`). Example: `src/examples/core-adapter-audio-output.ts`.

Method: read page, example and sources. Ran `npm run check:examples`: `tsc` exit 0, `Autoplay OK: 127 example files checked.` The browser paths (picker, `setSinkId`) were not run (not checked at runtime). The hand-written `StubPlayer` block (page 81-89) is not compiled by any check; traced by reading `stub-player.ts`. No URLs.

## Findings

1. Page lines 2, 10, 12, 57-59, 62: the page is titled and built around `AudioOutputState` and shows `interface AudioOutputState` as if a reader can use it. It is not consumer surface. It is declared in `src/core/mixins/audio-output.ts:17-20` and only imported by `src/core/state.ts:33,108`. `src/index.ts` does not export it (grep for `AudioOutputState` over `src/`: only those 3 lines), and no `package.json` `exports` key points at `core/mixins/` or `core/state` (`package.json:31-196`). Its field `_currentAudioOutputId` lives on `Internals`, which the source calls "a kit-private type" (`src/core/state.ts:409,437`). By toolchain.md answer 1, a reader cannot import it. Fix: title and lead the page with the three `IPlayer` methods; if `AudioOutputState` stays, say it is internal player state that no import reaches, and drop the `Interface` block for it.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `AudioOutputState` holds the selected device id | `audio-output.ts:17-20` | True, but not exported (finding 1) |
| Three methods live on `IPlayer` | `types/player.ts:551-552,863,870` | Supported |
| No setup field replaces them | grep `audio.?output\|sink` over `types/config.ts`: no match | Supported |
| `playerCoreMethods` includes them | `core/index.ts:103,121`; root export `src/index.ts:196` | Supported |
| `audioOutputs` resolves to `audiooutput` devices, or `[]` when enumeration is missing; never throws for a missing API | `audio-output.ts:44-50` | Supported |
| `selectAudioOutput` throws `BrowserPolicyError` `core:policy/audioOutputPickerUnsupported` when picker absent | `audio-output.ts:60-62`; `errors/policy.ts:30-46` | Supported |
| Throw message names Chrome 105 and later | `audio-output.ts:61` ("Chrome ≥105 only.") | Supported |
| `AbortError` / `NotAllowedError` resolve to `null`; any other rejection rethrown | `audio-output.ts:66-71` | Supported |
| `audioOutput(deviceId)` calls `setSinkId` on the bound element, then stores the id | `audio-output.ts:87-88,98-99` | Supported |
| Empty string clears stored id to `null` | `audio-output.ts:99` | Supported |
| Throws `core:policy/setSinkIdUnsupported` when element missing or no `setSinkId` | `audio-output.ts:95-97` | Supported |
| `audioOutput()` reads live `sinkId` when present, else stored id; empty string reads back as `null` | `audio-output.ts:90-93` | Supported |
| `_currentAudioOutputId` written by `audioOutput(deviceId)` | `audio-output.ts:18,99` | Supported (internal, finding 1) |
| IPlayer signatures shown (lines 68-71) | `types/player.ts:551-552,863,870` | Supported |
| `IPlayer` importable as a type from the root | `src/index.ts:373` | Supported |
| `StubPlayer` from `/testing`; `new StubPlayer()` with no args | `package.json:188-190`; `testing/index.ts:45`; `stub-player.ts:108` (opts optional) | Supported |
| Stub: `audioOutputs` resolves `[]`; `selectAudioOutput` and bare `audioOutput` resolve `null`; write resolves without routing | `stub-player.ts:361-366,705-711` | Supported |
| Example: list, pick, route, read back against `IPlayer` | `core-adapter-audio-output.ts:17-36`; tsc exit 0 | Supported |
| See also: IClock page path | `plugins-adapters/adapter-clock.mdx` exists | Supported |

## Notes (not failures)

- Elided snippet: page 66-72 `interface IPlayer { // ... }` has no complete form on this page. Reported per the role; the reader reviewer judges whether an earlier page carries it.
- Page 81-89 is a hand-written code block, not a `:::snippet` from a compiled example. The docs rule says short blocks come from a compiled example file. Not a fact error; the content is true per `stub-player.ts`.
