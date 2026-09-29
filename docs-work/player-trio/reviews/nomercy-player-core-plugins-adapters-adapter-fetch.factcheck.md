# Fact check: /nomercy-player-core/plugins-adapters/adapter-fetch
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-fetch.mdx
Reviewed-SHA: 9e6a0e356325d69f

Source: `nomercy-player-core/src/adapters/fetch/` (`IFetch.ts`, `default.ts`, `index.ts`), `src/core/auth-fetch/attempt.ts`, `src/core/mixins/lifecycle.ts`, `src/types/config.ts`, `package.json` `exports`. Source at `e3d2de5`. Example: `src/examples/core-adapter-fetch.ts`.

Method: read the page, the example and every Covers file. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo, `paths` to `nomercy-player-core/src`; `--traceResolution` shows `.../adapters/fetch` resolved to `src/adapters/fetch/index.ts`): `tsc` exit 0. Ran the example (esbuild bundle aliased to the source, Node): output `{ items: [] }` then `[ 'https://api.example.com/catalog.json' ]`, which matches the comment on example line 49. Snippet ranges 17-18, 20-32, 34-49 match `snippet-ranges.lock.json` (scratch script compared first and last lines: OK). Em dash / en dash on page and example: none. Headings carry no code spans. URL fetch: see finding 1.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 31 (snippet, example `:31`) and 49 (snippet, example `:48-49`) | `src/examples/core-adapter-fetch.ts:31,48` | The example uses the placeholder host `https://api.example.com/catalog.json`. Plain GET (query-free): no response, `curl` exit 6 (host does not resolve), status `000`. The page never says this host stands for the reader's own API. Same finding as `build-backend-contract` review, finding 3. | Add one line after the Usage snippet (after page line 32): "The host in the sample stands for your own API." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IFetch` is a call signature shaped like global `fetch`, taking a string URL | `IFetch.ts:22-24` | Supported |
| There is no `fetch` option in `setup` | No `fetch` key in `src/types/config.ts` (grep for a `fetch?:` / `fetch:` property over `src` finds only `src/testing/mock-fetch.ts:37`, a test helper, not config) | Supported (issue #19 behaviour) |
| The player and `authFetch` call global `fetch` directly; the type never reaches the player | `auth-fetch/attempt.ts:111` `fetch(request)`; `mixins/lifecycle.ts:1039` `fetch(request)` | Supported |
| `defaultFetch` is the shipped `IFetch`; forwards URL and options to global `fetch`, returns its promise | `default.ts:16` | Supported |
| Nothing inside the package calls `defaultFetch` | grep `defaultFetch` over `src`: only `default.ts:16`, `index.ts:9`, and a doc comment `IFetch.ts:19` | Supported |
| Both names importable from `adapters/fetch` | `adapters/fetch/index.ts:9-10`; `package.json` exports `./adapters/fetch` | Supported |
| `IFetch` has one call signature and no members | `IFetch.ts:22-24` | Supported |
| Table: `url` `string`; `opts` `RequestInit`, optional; return `Promise<Response>` | `IFetch.ts:23` | Supported |
| A custom `IFetch` answers without a network; the helper takes it unchanged | Example `:37-48`; ran, output `{ items: [] }` | Supported |
| See also: ID Generator is the next catalog entry | `adapter-id-generator.mdx` exists; map row 62 Next column | Supported |

## Source note (not a page defect)

`IFetch.ts:10-13` and `default.ts:12-14` comments say `authFetch` uses this adapter. The code does not (`attempt.ts:111` calls global `fetch`). The page states the code's behaviour, which is correct. The comment drift is covered by nomercy-player-core #19.
