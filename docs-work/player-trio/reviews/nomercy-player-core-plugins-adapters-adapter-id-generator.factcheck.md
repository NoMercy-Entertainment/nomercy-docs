# Fact check: /nomercy-player-core/plugins-adapters/adapter-id-generator
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-id-generator.mdx
Reviewed-SHA: dc1795e836c94d2a

Source: `nomercy-player-core/src/adapters/id-generator/` (`IIdGenerator.ts`, `default.ts`, `index.ts`), `src/core/mixins/media-tracks.ts`, `src/types/config.ts`, `package.json` `exports`. Source at `e3d2de5`. Example: `src/examples/core-adapter-id-generator.ts`.

Method: read the page, the example and every Covers file. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo; `--traceResolution` shows `.../adapters/id-generator` resolved to `src/adapters/id-generator/index.ts`): `tsc` exit 0. Ran the example (esbuild bundle aliased to the source, Node): output `48c7adb2-7132-4b96-95ec-207946c2600f`, `track-1`, `track-2`, which matches the comments on example lines 20, 36, 37. Ran the fallback path (same bundle with `globalThis.crypto` replaced by `{}`): output `mumzvqyx-gk8s4vyx37`, a base 36 time, a dash, a base 36 random string. Snippet ranges 17-18, 20, 22-37 match `snippet-ranges.lock.json` (scratch script: OK). Em dash / en dash on page and example: none. Headings carry no code spans. No URLs on the page or in the example.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IIdGenerator` returns a fresh string ID per call; one member | `IIdGenerator.ts:14-16` (`next(): string`) | Supported |
| The player uses the default for the ID of a subtitle track added at runtime | `media-tracks.ts:34` import; `:753` inside `addSubtitleTrack` (`:736`) | Supported |
| No `idGenerator` option in `setup`, so that ID always comes from the default | grep `idGenerator` in `src/types/config.ts`: none; `media-tracks.ts:753` calls `defaultIdGenerator` directly | Supported (issue #19 behaviour) |
| `defaultIdGenerator` is the shipped `IIdGenerator`; `next` returns `crypto.randomUUID()` | `default.ts:16-20` | Supported |
| Where missing: time in base 36, a dash, random base 36 string | `default.ts:21-22`; fallback run output above | Supported |
| `addSubtitleTrack` builds the ID as `subtitle-runtime-` plus `next` | `media-tracks.ts:752-753` (new track path; an existing match at `:746-750` is returned unchanged) | Supported |
| Both names importable from `adapters/id-generator` | `adapters/id-generator/index.ts:9-10`; `package.json` exports `./adapters/id-generator` | Supported |
| Table: `next` returns `string`, a new ID per call | `IIdGenerator.ts:15`; `default.ts:17-22` | Supported |
| A counter gives the same sequence every run | Example `:22-37`; ran, `track-1`, `track-2` | Supported |
| See also: Language Matcher is the next catalog entry | `adapter-language-matcher.mdx` exists; map row 63 Next column | Supported |

Line numbers for `id-generator/*.ts` are file lines (the license header takes lines 1-8).
