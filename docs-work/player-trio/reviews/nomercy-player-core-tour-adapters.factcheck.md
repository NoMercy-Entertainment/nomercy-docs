# Fact check: /nomercy-player-core/tour/adapters
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/adapters.mdx
Reviewed-SHA: 451ef3f03e7ec404

Source: `packages/player-web/nomercy-player-core/src/adapters/clock/IClock.ts`, `adapters/clock/system.ts`, `adapters/clock/index.ts`; `types/config.ts` (`clockSource?: () => number`); `core/mixins/metrics.ts` (`now()`). Example: `src/examples/core-tour-adapters.ts`. Method: read page, example, and those source lines; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Snippet: `live="false"`. Distinction checked: `systemClock` is the adapter that calls `Date.now()`; player `now()` falls back to `Date.now()` when `clockSource` is omitted (not via `systemClock`). Setup wording: page defines `setup` as the call that hands config, then passes `clockSource` on that call — matches example `player.setup({ clockSource: () => fixed.now() })`.

## Gate checks

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

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IClock` has one method `now()` returning Unix-epoch ms integer | `IClock.ts:10-18` | Supported |
| Shipped adapter default is `systemClock` calling `Date.now()` | `system.ts:15-16`; `IClock.ts:14` | Supported |
| Import type `IClock` and `systemClock` from `.../adapters/clock` | `adapters/clock/index.ts:9-10`; `package.json` `./adapters/clock` | Supported |
| `setup` hands config; pass `clockSource` on that call | example `:74-77`; `config.ts:336` | Supported |
| `clockSource` is `() => number`; wrap clock as `() => clock.now()` | `config.ts:336`; example `:76` | Supported |
| Player `now()` uses `clockSource()` when set, else `Date.now()` (not `systemClock`) | `metrics.ts:51-53` | Supported |
| Example: `systemClock.now()`, fixed `IClock`, `clockSource: () => fixed.now()`, `player.now()` | `core-tour-adapters.ts:29-35,74-79` | Supported |
