# Fact check: /nomercy-player-core/plugins-adapters/adapter-audio-output
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-audio-output.mdx
Reviewed-SHA: 86a74ee1e5a1d753
Previous verdict: FAIL; fixes verified: finding 1 (page no longer built on the internal AudioOutputState); earlier note on the hand-written StubPlayer block also resolved (now `:::snippet lines="16,39-46"`)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2). Snippet ranges `15,18-37` and `16,39-46` match `src/examples/snippet-ranges.lock.json` (the lock script regenerated the file with no diff, `git status` clean for `src/examples/`). Browser picker and `setSinkId` paths not run (not checked at runtime). No URLs.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 2, 10-13, 49-58 | Title "Audio output", built on the three `IPlayer` methods; "the player keeps the chosen device id itself; you never touch that state"; no `AudioOutputState` anywhere on the page | `types/player.ts:551-552,863,870`; internal field written at `core/mixins/audio-output.ts:99` | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| Three methods on `IPlayer`; no setup field replaces them | `types/player.ts:551-552,863,870`; no audio-output field in `types/config.ts` (previous verdict grep) | Supported |
| `playerCoreMethods` includes them | `core/index.ts:18,121` | Supported |
| `audioOutputs` resolves `audiooutput` devices or `[]`; never throws for a missing API | `audio-output.ts:44-50` | Supported |
| `selectAudioOutput` throws `core:policy/audioOutputPickerUnsupported`; message names Chrome 105 | `audio-output.ts:56-61` | Supported |
| `AbortError` / `NotAllowedError` resolve `null`; other rejections rethrown | `audio-output.ts:66-70` | Supported |
| `audioOutput(deviceId)` calls `setSinkId`, then stores; empty string stores `null` | `audio-output.ts:98-99` | Supported |
| Throws `core:policy/setSinkIdUnsupported` when element missing or no `setSinkId` | `audio-output.ts:95-96` | Supported |
| `audioOutput()` reads live `sinkId`, else stored; empty string reads `null` | `audio-output.ts:90-92` | Supported |
| Member table return types | `types/player.ts:551-552,863,870` | Supported |
| `StubPlayer` stubs all three: `[]`, `null`, `null`, write resolves | `testing/stub-player.ts:361-365,705-711`; `package.json` `./testing` key (`:188`) | Supported |
| Link: adapter-clock | file exists | Supported |

## New findings

None.
