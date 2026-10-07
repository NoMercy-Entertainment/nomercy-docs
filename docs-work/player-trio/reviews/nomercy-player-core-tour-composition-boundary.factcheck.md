# Fact check: /nomercy-player-core/tour/composition-boundary
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/composition-boundary.mdx
Reviewed-SHA: 0a53bdcbf948d5a9

Delta review since 2e9c15c; the full review before it passed.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5`. Method: `git diff 2e9c15c -- src/content/nomercy-player-core/en/tour/composition-boundary.mdx`; every added or changed line checked; the section around each hunk re-read. The pseudo-tags used (`fn`, `var`, `str`, `el`, `attr`, `key`, `cls`, inline `ts`) are all defined in `src/lib/mdx/rehype.ts:102-126` and `:184`.

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 45-46 | `var specificMethods` / `var generalMethods` name the values in the block at page line 41 | page lines 40-42 | Supported |

## Findings

None.

## Carried from the full review at 2e9c15c


Source: `packages/player-web/nomercy-player-core/src/core/compose.ts` (`composeMixins` at `:38-45`). Example: `src/examples/core-tour-composition-boundary.ts`. Method: read page, example, and `compose.ts`; SHA256 of page bytes, first 16 hex; no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example.

### Gate checks

| Gate | Result |
| --- | --- |
| False claim vs `compose.ts` | Pass (all four stamp rules match implementation) |
| Import path | Pass (`@nomercy-entertainment/nomercy-player-core`; package `name` matches; re-export `src/index.ts:226`) |
| Em dash / en dash on page or example | Pass (none) |
| Old library nickname (the old nickname) | none |
| Snippet `live` is `false` | Pass (`live="false"`) |
| Sentence over 30 words | Pass (max prose sentence ≤14 words) |
| Paragraph over 60 words | Pass (max prose paragraph 37 words) |
| Table over 6 data rows | Pass (4 data rows) |

### Claim table (prove against `compose.ts`)

| Claim | Supported by | Status |
| --- | --- | --- |
| Order left to right: each module applied in turn | `compose.ts:39-44` — `for (const module of modules)` then `Object.defineProperty` per key | Supported |
| Later key wins: later module replaces earlier same key | `compose.ts:22-25` (doc); defineProperty overwrite in loop `:41-43` | Supported |
| Accessors preserved / not invoked during copy | `compose.ts:26-28,40-43` — `Object.getOwnPropertyDescriptors` + `Object.defineProperty` | Supported |
| Repeat is safe: second stamp overwrites with same descriptors | `compose.ts:30-31` (doc); same defineProperty path `:41-43` | Supported |
| Stamp onto class prototype with rest modules | `compose.ts:38` signature `(prototype, ...modules)`; page call and example match | Supported |
| After stamp, later module owns its keys; earlier keys remain | Follows from order + later-wins; example `role()` → `'specific'` | Supported |
| Example import `{ composeMixins }` from package entry | `package.json` name; `src/index.ts:226` `export { composeMixins } from './core/compose'` | Supported |

### Example alignment

- `composeMixins(BoundaryPlayer.prototype, sharedMethods, specificMethods)` matches page pattern and `compose.ts:19` call-site shape.
- Shared first, specific last; `player.role()` logs `'specific'` — later key wins.
