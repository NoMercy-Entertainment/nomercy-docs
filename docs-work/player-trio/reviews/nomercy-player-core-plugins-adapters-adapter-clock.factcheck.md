# Fact check: /nomercy-player-core/plugins-adapters/adapter-clock
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-clock.mdx
Reviewed-SHA: ab4831abcc88479d
Previous verdict: PASS (with a wording note); fixes verified: note on page line 56 (clockSource takes a function)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2). The hand-written block page 59-67 type-checks against the source (scratch file, `player` declared as a stub with `setup(BasePlayerConfig)`; `tsc` exit 0). No URLs.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| note | 56 | "Pass a function that returns the integer through `key clockSource` on `fn setup`." | `types/config.ts:336` (`clockSource?: () => number`) | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| `IClock` gives Unix-epoch millisecond wall time | `adapters/clock/IClock.ts:9-19` | Supported |
| `clockSource` is `() => number`, not an `IClock` | `types/config.ts:336` | Supported |
| Import type `IClock` and `systemClock` from `/adapters/clock` | `package.json:36`; `adapters/clock/index.ts:10` | Supported |
| `systemClock.now` returns `Date.now()` | `adapters/clock/system.ts:15-17` | Supported |
| Player does not construct or read `systemClock` | grep `systemClock` over `src/`: only `adapters/clock/IClock.ts:14` (comment), `index.ts:10`, `system.ts:15` | Supported |
| Player `now` calls `clockSource` when set, else `Date.now()` | `core/mixins/metrics.ts:51-53` | Supported |
| Interface block 48-50 | `IClock.ts:17-19` | Supported |
| Links: tour/adapters, adapter-cue-parser | files exist | Supported |

## New findings

None.

## Notes (not failures)

- Page 20-23 and 58-68 are hand-written code blocks, not `:::snippet lines=` ranges from the compiled example. Not a fact error.
