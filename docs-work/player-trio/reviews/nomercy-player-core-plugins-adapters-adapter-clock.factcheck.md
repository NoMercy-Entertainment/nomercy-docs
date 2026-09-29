# Fact check: /nomercy-player-core/plugins-adapters/adapter-clock
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-clock.mdx
Reviewed-SHA: 281f61edfd23a9bf

Source: nomercy-player-core at `5ed4538` (toolchain.md; checkout is `e3d2de5`, `git diff --stat 5ed4538 e3d2de5 -- src` is empty). Files: `src/adapters/clock/IClock.ts`, `system.ts`, `index.ts`; `src/types/config.ts`; `src/types/player.ts`; `src/core/mixins/metrics.ts`; `src/core/index.ts`; `package.json` (`exports`). Example: `src/examples/core-adapter-clock.ts`.

Method: read page, example and sources. Ran `npm run check:examples`: `tsc` exit 0, `Autoplay OK: 127 example files checked.` The example was not run in a browser (not checked at runtime); the `now()` result it logs is traced by reading `metrics.ts:51-53`. Hand-written block page 58-68 is not compiled by any check; traced by reading. No URLs.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IClock` gives current wall time as a Unix-epoch millisecond integer | `IClock.ts:10-11,17-19` | Supported |
| `clockSource` on `setup` is `() => number`, not an `IClock` object | `types/config.ts:335-336` | Supported |
| Import `IClock` (type) and `systemClock` from `/adapters/clock` | `package.json:36-38`; `adapters/clock/index.ts:9-10` | Supported |
| `systemClock` is the shipped `IClock`; its `now` calls `Date.now()` | `system.ts:15-17` | Supported |
| The player does not construct or read `systemClock` | grep `systemClock` over `src/`: only `adapters/clock/*` (IClock.ts:14 comment, index.ts:10, system.ts:15) | Supported |
| Player `now` calls `clockSource` when set, else `Date.now()` itself | `core/mixins/metrics.ts:51-53`; `types/player.ts:972-977`; `metricsMethods` in `playerCoreMethods` (`core/index.ts:124`) | Supported |
| `interface IClock { now(): number; }` | `IClock.ts:17-19` | Supported |
| Implement `IClock` to fix time in tests or share one timeline for sync | `IClock.ts:10-15` | Supported |
| Custom block: `const fixed: IClock = { now: () => 1_700_000_000_000 }`; `setup({ clockSource: () => fixed.now() })` | `IClock.ts:17-19`; `config.ts:336` | Supported |
| Example: composed player with `playerCoreMethods`, `clockSource` from a fixed clock, `player.now()` logs `1700000000000` | `core-adapter-clock.ts:31-79`; `metrics.ts:51-53`; tsc exit 0 | Supported |
| Link: Adapters tour page | `src/content/nomercy-player-core/en/tour/adapters.mdx` exists | Supported |
| See also: Cue Parser page | `plugins-adapters/adapter-cue-parser.mdx` exists | Supported |

## Notes (not failures)

- Page line 56 "Pass the integer through `clockSource`": `clockSource` takes a function that returns the integer (`config.ts:336`). Lines 16-18 and the block under it state the shape correctly, so this is loose wording, not a false claim. Suggested wording: "Pass a function that returns it through `clockSource` on `setup`."
- Page 58-68 is a hand-written code block, not a `:::snippet` from a compiled example. The docs rule says short blocks come from a compiled example file. Not a fact error.
- No elided snippet on the page.
