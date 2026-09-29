# Reader review: /nomercy-player-core/plugins-adapters/adapter-cue-parser

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-cue-parser.mdx

Reviewed-SHA: b604a5d785d9692a

## Review summary

Catalog page for ICueParser adapter. Opens: use ICueParser when timed text arrives in a format you need to claim. Each parser has id, canParse gate, and synchronous parse returning cue list. Imports shown (CueParserRegistry, createCueList, parseLrc).

States that CueParserRegistry and parse helpers also live on adapters/cue-parser path; ICueParser on root and that path. Clear import guidance.

**Built-in Adapter**: CueParserRegistry is the ordered list you construct or player owns. Resolution walks newest first. fn register with same id replaces. Pass prepend: true for low-priority. During setup, Player Core seeds three parsers by id (not imported directly, addressed by id). Table: lrc (claims .lrc, three content types), vtt (.vtt, text/vtt, not sprite), sprite-vtt (ends in sprite.vtt or sprites.vtt, query may follow). Exports listed: parseLrc, parseVttSubtitles, parseVttSprite, parseVtt. Player wraps registry in registerCueParser, unregisterCueParser, resolveCueParser. Pass cueParsers at setup or call registerCueParser at runtime to outrank seeded parser.

**Usage**: Register on registry or reuse exported reader. Snippet provided.

**Interface**: Snippet line window shown, type definition below.

Voice matches adapter-clock. All terms named. Density acceptable. Snippet partial (expected for interface).
