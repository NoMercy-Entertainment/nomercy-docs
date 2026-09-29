# Fact check: /nomercy-player-core/tour/adapters
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/tour/adapters.mdx
Reviewed-SHA: 41cbd7ff62391f16

Delta review of the reader fix to the clock sentences (lines 16 and 39-41). The previous fact check (PASS, Reviewed-SHA `c2f205d2768a9048`) raised no finding; this change came from the reader review and is checked here against the source.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/adapters/clock/IClock.ts`, `src/adapters/clock/system.ts`, `src/types/config.ts`, `src/core/mixins/metrics.ts`. Example `src/examples/core-tour-adapters.ts`. Method: `git -C C:/Projects/worktrees/docs-batch-05 diff HEAD -- src/content/nomercy-player-core/en/tour/adapters.mdx` (changed lines 16, 40, 41); each checked against the source and the page's own snippet; the whole page re-read (48 lines). Snippet re-type-checked with a scratch tsconfig outside the repo against the package SOURCE: `EXIT 0`.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 16 | `IClock.now` returns the time in milliseconds | `IClock.ts:10-11` ("current time as a Unix-epoch millisecond integer"), `:18` (`now(): number`) | Supported |
| 16 | ... "the same number `fn Date.now` returns" | `IClock.ts:11-12` (a consumer injects a server-synced implementation); `IClock.ts:14-15` (tests inject a controllable fake); the page's own snippet, example `:31-33` (`now: () => 1_700_000_000_000`) and `:79` (logs `1700000000000`) | Unsupported (finding 1) |
| 40 | `setup`'s `key clockSource` option takes a function that returns that number (config key; tag correct) | `config.ts:336` (`clockSource?: () => number`); example `:74-77` | Supported |
| 41 | Wrap your clock as `() => clock.now()` and pass it there | example `:76`; `metrics.ts:51-53` (`now()` calls `clockSource()` when it is a function) | Supported |

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 16 | `IClock.ts:10-15`; example `core-tour-adapters.ts:31-33,79` | The sentence says `IClock.now` returns "the same number `Date.now` returns". That is true only of `systemClock` (`system.ts:15-16`). The interface exists so an implementation can return a different number: a server-synced clock, or the fixed clock on this very page, which returns `1700000000000`. What the interface keeps from `Date.now` is the unit and the epoch, not the value. | Line 16: "It returns the time in milliseconds, counted the same way as `fn Date.now`." |

## Section re-read

- Line 17 ("The shipped default is `var systemClock`, which calls `Date.now()`"): `system.ts:15-16`. True.
- Lines 38-39: unchanged, supported in the carried review.
- `key` tag audit: `key clockSource` (L40) is a key of the config object passed to `setup` (`config.ts:336`); correct. No positional parameter is tagged `key`.

## Carried from the previous review

> Verdict: PASS
> Reviewed: src/content/nomercy-player-core/en/tour/adapters.mdx
> Reviewed-SHA: c2f205d2768a9048

Delta review since 2e9c15c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 2e9c15c -- src/content/nomercy-player-core/en/tour/adapters.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

Snippet type-check: `tsc -p` on a scratch tsconfig outside the repo (paths to the core package SOURCE, as in `tsconfig.examples.json`) over `core-tour-adapters.ts`, `core-tour-i18n.ts`, `core-tour-plugin-base.ts`, `core-handbook-emitting.ts`: `EXIT 0`. Ranges match `src/examples/snippet-ranges.lock.json` (read).

### Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 17, 30 | `var systemClock` is a value | `src/adapters/clock/system.ts:15` `export const systemClock: IClock` | Supported |
| 21 | `str adapters/clock` import path | `package.json` exports key `./adapters/clock`; `src/adapters/clock/index.ts:10` | Supported |
| 43 | Snippet `lines="31-33,74,76-79"`: a fixed `IClock`, then `setup({ ... clockSource: () => fixed.now() })`, `player.now()` logs `1700000000000` | example `core-tour-adapters.ts:31-33,74-79`; `now()` returns `options.clockSource()` when set: `src/core/mixins/metrics.ts:51-54`; `setup` stores options: `lifecycle.ts:348`; `metricsMethods` in `playerCoreMethods`: `src/core/index.ts:124` | Supported |
| 43 | Elided line 75 (`logLevel`) hides nothing the section explains | example `:75` | Supported |

### Findings

None.

### Carried from the full review at 2e9c15c


Source: `packages/player-web/nomercy-player-core/src/adapters/clock/IClock.ts`, `adapters/clock/system.ts`, `adapters/clock/index.ts`; `types/config.ts` (`clockSource?: () => number`); `core/mixins/metrics.ts` (`now()`). Example: `src/examples/core-tour-adapters.ts`. Method: read page, example, and those source lines; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`. Distinction checked: `systemClock` is the adapter that calls `Date.now()`; player `now()` falls back to `Date.now()` when `clockSource` is omitted (not via `systemClock`). Setup wording: page defines `setup` as the call that hands config, then passes `clockSource` on that call — matches example `player.setup({ clockSource: () => fixed.now() })`.

### Gate checks

| Gate | Result |
| --- | --- |
| Claims supported by clock adapter / config / metrics `now()` | Pass |
| Imports and symbols match package export | Pass (`package.json` `./adapters/clock`; `adapters/clock/index.ts`) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (no tables) |
| `clockSource` is `() => number`; wrap `IClock` as `() => clock.now()` | Pass |
| `setup` hands config; `clockSource` passed on that call | Pass |
| `systemClock` ≠ player `now()` omitted-`clockSource` fallback | Pass (adapter default vs `Date.now()` in `metrics.ts`) |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IClock` has one method `now()` returning Unix-epoch ms integer | `IClock.ts:10-18` | Supported |
| Shipped adapter default is `systemClock` calling `Date.now()` | `system.ts:15-16`; `IClock.ts:14` | Supported |
| Import type `IClock` and `systemClock` from `.../adapters/clock` | `adapters/clock/index.ts:9-10`; `package.json` `./adapters/clock` | Supported |
| `setup` hands config; pass `clockSource` on that call | example `:74-77`; `config.ts:336` | Supported |
| `clockSource` is `() => number`; wrap clock as `() => clock.now()` | `config.ts:336`; example `:76` | Supported |
| Player `now()` uses `clockSource()` when set, else `Date.now()` (not `systemClock`) | `metrics.ts:51-53` | Supported |
| Example: `systemClock.now()`, fixed `IClock`, `clockSource: () => fixed.now()`, `player.now()` | `core-tour-adapters.ts:29-35,74-79` | Supported |
