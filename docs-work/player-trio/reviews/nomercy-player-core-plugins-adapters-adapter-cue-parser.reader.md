# Reader review: /nomercy-player-core/plugins-adapters/adapter-cue-parser

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-cue-parser.mdx

Reviewed-SHA: b604a5d785d9692a

## Four criteria checks

**1. Every term explained at or before first use**

Prerequisite: /nomercy-player-core/plugins-adapters/adapter-clock. New terms: `cls ICueParser`, `fn canParse`, `fn parse`, `cls CueParserRegistry`, `fn register`, `key id`, `key prepend`, `fn unregisterCueParser`, `fn registerCueParser`, `fn resolveCueParser`, `key cueParsers`.

Each explained: canParse(url) returns true when format owns URL, parse(raw) returns cue list, registry walks newest first.

Built-in adapters table shows three seeded parsers with their claimed extensions.

**2. Reader can do the task from page alone**

Task: Implement a cue-parser adapter and register it.

Steps: 1) Implement ICueParser with id, canParse(), parse() methods, 2) Pass in cueParsers on setup, or call registerCueParser() at runtime, 3) Use prepend: true for low priority, 4) Call resolveCueParser() to test.

Reader can build and register a format from this page. Exported helpers (parseLrc, parseVtt variants) are named for reuse.

**3. Code examples don't lean on missing content**

Custom implementation shows complete beats parser example with createCueList call. No scaffolding beyond the parser.

Snippet shows usage. Code is self-contained.

**4. No sentence needs second read**

Clear language. "Fetching is the caller's job" clearly states separation of concerns for parse() method.

## Findings

None. Page passes all criteria.
