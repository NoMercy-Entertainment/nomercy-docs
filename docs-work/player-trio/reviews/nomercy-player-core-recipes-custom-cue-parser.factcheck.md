# Fact check: /nomercy-player-core/recipes/custom-cue-parser
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/recipes/custom-cue-parser.mdx
Reviewed-SHA: cf3f55be7344ef16

Source: `nomercy-player-core` at `5ed4538` (toolchain.md). Working tree HEAD is `e3d2de5`; the commits between touch only `.github/workflows/*`, so `src/` was read from the working tree. Example: `src/examples/core-recipes-custom-cue-parser.ts`.

Method: read page, example and sources. Type-checked the example against the package source (scratch tsconfig outside the repo): `tsc` exit 0. Ran the example (esbuild bundle against `nomercy-player-core/dist/index.js`, happy-dom, with a `custom-cue-parser-demo` div standing in for the docs host mount). Output: `demo:chapter-markers`, `vtt`, `undefined`, which matches every example comment. No URLs are fetched; `movie.chapters.txt` and `captions.vtt` are only matched by `canParse`.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `ICueParser` and `createCueList` import from the package root | `index.ts:9`, `index.ts:229` | Supported |
| A parser has `id`, `canParse`, `parse` | `adapters/cue-parser/ICueParser.ts:20-39` | Supported |
| `id` is used to unregister | `core/mixins/cue-parser.ts` `unregisterCueParser(id)`; `registry.ts:35-39` | Supported |
| `canParse` returns true when the format owns the URL | `ICueParser.ts:27-32` | Supported |
| `parse` turns raw text into a cue list | `ICueParser.ts:34-38` | Supported |
| Returning true is a commitment; nothing else is tried | `registry.ts:47-55` (returns the first match) | Supported |
| `cueParsers` on `setup` | `types/config.ts:285`; `lifecycle.ts:468-477` | Supported |
| Built-ins seeded first, then yours | `lifecycle.ts:469-476` | Supported |
| A later match wins | `registry.ts:47-55` (walks from the end) | Supported |
| `registerCueParser` adds one after setup | `cue-parser.ts` `registerCueParser` | Supported |
| `prepend: true` puts it at the low-priority end | `registry.ts:19-31` | Supported |
| `unregisterCueParser` removes by id | `registry.ts:35-39` | Supported |
| Re-registering the same id replaces the old entry | `registry.ts:25-27` | Supported |
| `resolveCueParser` returns the winner or `undefined` | `cue-parser.ts` `resolveCueParser`; `registry.ts:47-55`; run output | Supported |
| Built-in `.vtt` still resolves to `vtt` | `built-ins.ts` `vttSubtitleParser` (`id: 'vtt'`); run output | Supported |
| Link: recipes/custom-url-resolver | file exists | Supported |
