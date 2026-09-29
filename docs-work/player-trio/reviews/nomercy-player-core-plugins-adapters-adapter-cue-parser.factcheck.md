# Fact check: /nomercy-player-core/plugins-adapters/adapter-cue-parser
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-cue-parser.mdx
Reviewed-SHA: 435287a0da6fba53

Source: nomercy-player-core at `5ed4538` (toolchain.md; checkout is `e3d2de5`, `git diff --stat 5ed4538 e3d2de5 -- src` is empty). Files: `src/adapters/cue-parser/ICueParser.ts`, `ICueParserRegistry.ts`, `registry.ts`, `built-ins.ts`, `lrc.ts`, `index.ts`; `src/core/mixins/cue-parser.ts`; `src/core/mixins/lifecycle.ts`; `src/core/state.ts`; `src/core/cues/cue.ts`; `src/types/config.ts`; `src/types/player.ts`; `src/index.ts`; `package.json` (`exports`). Example: `src/examples/core-adapter-cue-parser.ts`.

Method: read page, example and sources. Ran `npm run check:examples`: `tsc` exit 0, `Autoplay OK: 127 example files checked.` The example's logged values were traced by reading `registry.ts`, `cue.ts:83-95` and `lrc.ts:92-99` (not run). The sprite URL rule was run: a scratch copy of `SPRITE_VTT_HINT_RE` (`built-ins.ts:32`) over sample URLs, output below. The hand-written block page 78-102 is not compiled by any check; traced by reading. No URLs to fetch.

## Findings

1. Page line 42: "`sprite-vtt` claims a URL that contains `sprite.vtt` or `sprites.vtt`". The rule is anchored: `/sprite\.vtt(?:\?|$)|sprites?\.vtt(?:\?|$)/i` (`src/adapters/cue-parser/built-ins.ts:32`, used at `:75`). The name must end the URL or be followed by `?`. Run output:

   ```
   a/sprite.vtt true
   a/sprites.vtt?x=1 true
   a/sprite.vtt#t false
   a/sprite.vtt.bak false
   a/thumbs-sprite.vtt true
   a/sprite.vtt/other.vtt false
   ```

   A URL can contain `sprite.vtt` and not be claimed (`a/sprite.vtt/other.vtt`, `a/sprite.vtt#t`). The source comment at `built-ins.ts:17-18` says "contains" too; the code is the truth. Fix: "A URL that ends in `sprite.vtt` or `sprites.vtt` (a query string may follow)".

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| A parser has `id`, `canParse`, synchronous `parse` that returns a cue list | `ICueParser.ts:20-39` | Supported |
| Root imports `CueParserRegistry`, `createCueList`, `parseLrc`, type `ICueParser` | `src/index.ts:9,10,12,229` | Supported |
| Registry and parse helpers also on `adapters/cue-parser`; `ICueParser` on root and that path | `package.json:44-46`; `adapters/cue-parser/index.ts:9-15` | Supported |
| Registry is constructed by you or owned by the player | `registry.ts:16`; `core/state.ts:449` | Supported |
| Resolution walks newest first | `registry.ts:47-55` | Supported |
| `register` with same id replaces the entry | `registry.ts:24-27` | Supported |
| `prepend: true` parks the parser at the low-priority end | `registry.ts:19-22,29-31` | Supported |
| During `setup`, three parsers seeded by id | `lifecycle.ts:115,125,468-471`; `built-ins.ts:88-92` (ids `lrc`, `vtt`, `sprite-vtt` at `:36,51,70`) | Supported |
| You do not import those parser objects | `lrcParser`/`vttSubtitleParser`/`spriteVttParser` not in `src/index.ts` nor `adapters/cue-parser/index.ts`; `package.json` keys `./adapters/cue-parser/vtt` and `/lrc` point at `vtt.ts`/`lrc.ts`, not `built-ins.ts` (`package.json:180-186`) | Supported |
| Address them with `unregisterCueParser` and by re-registering the id | `cue-parser.ts:42-44`; `registry.ts:24-27` | Supported |
| `lrc`: `.lrc`, or `application/x-lrc`, `application/x-lyrics`, `text/lrc` | `built-ins.ts:28-29,37-43` | Supported |
| `vtt`: `.vtt` or `text/vtt`, unless sprite URL | `built-ins.ts:30-31,52-62` | Supported |
| `sprite-vtt`: URL that contains `sprite.vtt` or `sprites.vtt` | `built-ins.ts:32,75`; run output | Unsupported (finding 1) |
| Package exports `parseLrc`, `parseVttSubtitles`, `parseVttSprite`, `parseVtt` | `src/index.ts:10,18-20` | Supported |
| Player `registerCueParser`, `unregisterCueParser`, `resolveCueParser` wrap the registry | `cue-parser.ts:38-48`; `types/player.ts:480-486` | Supported |
| `resolveCueParser` takes a URL only | `cue-parser.ts:46-47`; `types/player.ts:486` | Supported |
| `cueParsers` at setup, or `registerCueParser` at runtime, outrank a seeded parser | `types/config.ts:285`; `lifecycle.ts:469-475` (user parsers pushed after built-ins); `registry.ts:31,48` | Supported |
| Interface block (lines 60-64) | `ICueParser.ts:20-39` | Supported |
| `canParse` true is a commitment; first match, no fall-through | `ICueParser.ts:27-31`; `registry.ts:52-53` | Supported |
| `parse` gets the full file as a string; fetching is the caller's job | `ICueParser.ts:38` (`raw: string`); no core caller fetches and parses (grep over `src/`: only `cue-parser.ts:47` resolves) | Supported |
| Optional `baseUrl` helps relative references in cue bodies | `built-ins.ts:77-78` (sprite parser passes it to `parseVttSprite`) | Supported |
| Any object with the three members is a parser; hand it through `cueParsers` or `registerCueParser` | `ICueParser.ts:20`; `config.ts:285`; `cue-parser.ts:38` | Supported |
| Example: bare registry empty; `resolve('captions.vtt')` is `undefined` | `registry.ts:17,55` | Supported |
| Example: `beats.parse` gives 2 cues; `active(12.5)[0].payload.label` is `'Drop'` | `cue.ts:61,83-95` (`end >= time`, start=end=12.5 included) | Supported |
| Example: LRC lines at 0 s and 5 s; `active(1)[0].payload.text` is `'First line'` | `lrc.ts:22-25,92-99` (end = next start) | Supported |
| See also: Element Factory page | `plugins-adapters/adapter-element-factory.mdx` exists | Supported |

## Notes (not failures)

- Source comment drift in the package (code is the truth, page follows the code): `built-ins.ts:12` says built-ins register "at low priority", but `lifecycle.ts:470` calls `register(parser)` without `prepend`. `built-ins.ts:85` names `player.cueRegistry`, which does not exist (grep over `src/`: only that comment). `core/mixins/cue-parser.ts:22` says the registry is "Pre-seeded with VTT in `initPlayerCoreState`", but `state.ts:449` creates it empty and `setup` seeds it (`lifecycle.ts:125`). Consequence not on the page: a `registerCueParser` call made before `setup` is outranked by the built-ins for the same URL, because the built-ins are pushed after it.
- Page 78-102 is a hand-written code block, not a `:::snippet` from a compiled example. `player` is not declared in it. Not a fact error.
- No elided snippet on the page.
