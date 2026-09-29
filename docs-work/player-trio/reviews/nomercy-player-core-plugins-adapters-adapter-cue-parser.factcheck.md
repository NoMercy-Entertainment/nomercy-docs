# Fact check: /nomercy-player-core/plugins-adapters/adapter-cue-parser
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-cue-parser.mdx
Reviewed-SHA: b604a5d785d9692a
Previous verdict: FAIL; fixes verified: finding 1 (sprite-vtt URL rule)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. The example also type-checks against the package source (scratch tsconfig outside the repo, `tsc` exit 0; negative control gave `TS2322`, exit 2). The hand-written block page 79-101 type-checks against the source (scratch file, `player` declared as a stub with `setup(BasePlayerConfig)`; `tsc` exit 0). No URLs.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 42 | "A URL that ends in `sprite.vtt` or `sprites.vtt`; a query string may follow" | `adapters/cue-parser/built-ins.ts:32` (`/sprite\.vtt(?:\?|$)|sprites?\.vtt(?:\?|$)/i`), used at `:75`; unanchored at the start, so `thumbs-sprite.vtt` still "ends in" `sprite.vtt` | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| `id`, `canParse`, synchronous `parse` returning a cue list; interface block 60-64 | `adapters/cue-parser/ICueParser.ts:20,25,32,38` | Supported |
| Resolution newest first; same id replaces; `prepend` parks at low-priority end | `registry.ts:24-31,47-55` | Supported |
| Setup seeds three parsers by id | `core/mixins/lifecycle.ts:468-471` | Supported |
| `lrc` and `vtt` claim rules | `built-ins.ts:28-31` | Supported |
| `cueParsers` at setup, or runtime `registerCueParser`, outrank a seeded parser | `lifecycle.ts:469-475` (user parsers pushed after built-ins); `registry.ts:48` | Supported |
| First match, no fall-through | `registry.ts:48-53` | Supported |
| Root exports `CueParserRegistry`, `createCueList`, `parseLrc`, type `ICueParser`; parse helpers and registry also on `adapters/cue-parser` | `src/index.ts:9,10,12,229`; `adapters/cue-parser/index.ts:9-14`; `package.json` key `./adapters/cue-parser` (`:44`) | Supported |
| Package exports `parseLrc`, `parseVttSubtitles`, `parseVttSprite`, `parseVtt` | `src/index.ts:10,18-20` | Supported |
| Player `registerCueParser`, `unregisterCueParser`, `resolveCueParser` wrap the registry; `resolveCueParser` takes a URL only | `core/mixins/cue-parser.ts:38,42,46`; `types/player.ts:480,483,486` | Supported |
| Link: adapter-element-factory | file exists | Supported |

## New findings

None.

## Notes (not failures)

- Page 15-22, 59-65 and 78-102 are hand-written code blocks, not `:::snippet lines=` ranges from the compiled example. The docs rule says short blocks come from the example file. Not a fact error.
- Source comment drift reported last time still stands in the package (`built-ins.ts:12` "low priority", `built-ins.ts:85` `player.cueRegistry`); the page follows the code.
