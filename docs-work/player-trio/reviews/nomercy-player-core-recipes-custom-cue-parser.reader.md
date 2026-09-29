# Reader review: /nomercy-player-core/recipes/custom-cue-parser

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/custom-cue-parser.mdx

Reviewed-SHA: cf3f55be7344ef16

## Review summary

Opens with context: use this when built-in formats do not fit. Three-step shape: write parser, register it, resolve by URL.

**Write the Parser**: Imports named (ICueParser, createCueList). Table with three pieces: id, canParse, parse. One sentence on commitment of returning true.

**Register on the Player**: Pass cueParsers in setup, order rule (built-ins first, later match wins), or registerCueParser after setup with prepend option. unregisterCueParser named. Re-registering replaces. Short, clear.

**Prove the Match**: resolveCueParser takes URL and returns parser or undefined. One sentence on use case. Snippet provided.

Voice is recipe voice (step-by-step, present tense). Consistent with prerequisites (auth-fetch recipe). No repetition of earlier recipe material. All terms (ICueParser, createCueList) are named on first use or linked. Density acceptable.
