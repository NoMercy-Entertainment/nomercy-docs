# Fact check: /nomercy-player-core/plugins-adapters/adapter-fetch
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-fetch.mdx
Reviewed-SHA: 3deb420b67d21a6e
Previous verdict: FAIL; fixes verified: finding 1 (placeholder host `api.example.com` now named as the reader's own API, page line 34, directly under the Usage snippet that contains it)

Source: `nomercy-player-core/src` at `e3d2de5` (package checkout HEAD is `e3d2de5`). Example `src/examples/core-adapter-fetch.ts` (unchanged since the previous review; the fix commit `e029a04` touched only the mdx).

Method: re-read the whole page. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (`paths` to `player-web/*/src`; `--traceResolution` shows adapter imports resolve into `nomercy-player-core/src/adapters/...`): `tsc` exit 0.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IFetch` is a call signature shaped like global `fetch`, string URL | `src/adapters/fetch/IFetch.ts:22-24` | Supported |
| No `fetch` option in `setup` | `src/types/config.ts`: no `fetch` property (grep hits are comments only, lines 33-34, 53, 61, 68, 72, 107, 207, 218, 383, 406, 450) | Supported |
| Player and `authFetch` call global `fetch` directly | `src/core/auth-fetch/attempt.ts:111`; `src/core/mixins/lifecycle.ts:1039` | Supported |
| `defaultFetch` forwards URL and options to global `fetch` | `src/adapters/fetch/default.ts:16` | Supported |
| Nothing inside the package calls `defaultFetch` | grep over `src` (non-test): `default.ts:16`, `IFetch.ts:19` (comment), `index.ts:9` only | Supported |
| Both names import from `adapters/fetch` | `src/adapters/fetch/index.ts:9-10`; `package.json:56` `./adapters/fetch` | Supported |
| Table: `url` string, `opts` RequestInit optional, returns `Promise<Response>` | `IFetch.ts:23` | Supported |
| Line 34: the host stands for your own API | the host appears only in example lines 31, 48, 49 | Supported |
| Custom transport works with the helper unchanged | example `:37-48`; type check exit 0 | Supported |

## Source note (not a page defect)

`IFetch.ts:10-13` and `default.ts:12-14` say `authFetch` uses this adapter; the code does not. Covered by nomercy-player-core #19.
