# Fact check: /nomercy-player-core/tour/cue-parsers
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/tour/cue-parsers.mdx
Reviewed-SHA: fd13b96e18bb3da6

Source: `packages/player-web/nomercy-player-core/src/adapters/cue-parser/` (`vtt.ts`, `lrc.ts`, `timestamp.ts`, `built-ins.ts`, `registry.ts`, `ICueParser.ts`); `core/cues/cue.ts`, `core/cues/tracker.ts`; `core/mixins/cue-parser.ts`, `core/mixins/lifecycle.ts` (`_registerCueParsers`); root `src/index.ts` and `package.json` `"."` export. Example: `src/examples/core-tour-cue-parsers.ts`. Method: read page, example, and those source lines; SHA256 of page bytes (first 16 hex); no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Page does not claim parse failures go through the player error pipeline.

## Gate checks

| Gate | Result |
| --- | --- |
| Parse-failure / error-pipeline claim without call site | Pass (page does not make that claim) |
| Imports named on page or example are package-root exports | Pass (`src/index.ts`: `parseLrc`, `parseVtt`, `parseVttSubtitles`, `parseVttSprite`, `parseTimestamp`, `parseDurationSeconds`, `CueParserRegistry`, `createCueList`, `createMutableCueList`, `CueTracker`, `ICueParser`; `package.json` `"."`) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass |
| Sentence ≤ 30 words; paragraph ≤ 60 words | Pass |
| Table data rows ≤ 6 on page | Pass (one format table, 3 data rows; 4 non-separator lines) |
| Wrong symbols (`fn` / `cls` / `str` / `key`) | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Import helpers from `@nomercy-entertainment/nomercy-player-core` | `package.json` `"."`; `src/index.ts` cue exports | Supported |
| `parseVttSubtitles` → plain `text`, optional `markup`; `b`/`i`/`u` kept in markup; settings → `alignment` / `linePosition` / `size` | `vtt.ts:123-157`, `93-97` | Supported |
| `parseVtt` raw string body; `parseVttSprite` `#xywh=` + optional `baseUrl` for relative URLs | `vtt.ts:107-114,164-186` | Supported |
| `parseLrc` plain / word-level; end from next start; last cue +5 s | `lrc.ts:31,44-102` | Supported |
| `parseTimestamp` WebVTT-style → seconds; `parseDurationSeconds` `H:M:S` / `M:S` | `timestamp.ts:33-80` | Supported |
| `createCueList` immutable, sorts by `start` | `cue.ts:61-62` | Supported |
| `active(time)` → every cue whose interval contains that time | `cue.ts:83-96` (`start ≤ time` via upperBound, `end ≥ time`) | Supported |
| `next(time)` → nearest cue that starts after it | `cue.ts:98-101` (first `start > time`) | Supported |
| `prev(time)` → nearest cue that already ended before it | `cue.ts:103-113` (walk back; first `end < time`) | Supported |
| Overlapping cues remain in `active` | `cue.ts:22-25,83-96` | Supported |
| `createMutableCueList` empty or initial; `add` / `remove` / `clear` + `subscribe` | `cue.ts:128-234` | Supported |
| `CueTracker` on `time` / `seek`; `enter` / `exit`; player `cue:enter` / `cue:exit` with `trackerId` + `cue` | `tracker.ts:72-81,104-112,211-221` | Supported |
| Setup registers three built-ins; later `registerCueParser` or `cueParsers` wins | `lifecycle.ts:125,468-476`; `built-ins.ts:88-92`; `config.ts:285` | Supported |
| Built-in ids / match rules: `lrc`, `vtt` (not sprite), `sprite-vtt` | `built-ins.ts:28-80` | Supported |
| `CueParserRegistry` newest-first; `register` replaces `id`; `prepend: true` = low priority | `registry.ts:24-56` | Supported |
| Player `registerCueParser` / `unregisterCueParser` / `resolveCueParser` (URL only) | `cue-parser.ts:38-48` | Supported |
| Parser needs `id`, `canParse`, `parse`; `parse` may get `{ baseUrl }` | `ICueParser.ts:20-38` | Supported |
| Example: root imports; `active` / `next` on list; bare empty registry | `core-tour-cue-parsers.ts:16-69`; `registry.ts:17` | Supported |
