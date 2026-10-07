# Fact check: /nomercy-player-core/recipes/auth-fetch
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/recipes/auth-fetch.mdx
Reviewed-SHA: 71df5efdadb57ab9

Full review. Previous verdict: PASS (Reviewed-SHA `d76c9e1f22ccbea6`, the page at `cc9b94c`), no findings. The page changed since (`git diff cc9b94c c844686`): pseudo-tags on header names, the failure table split into one row per status with its code, and the `text` row reworded. Every claim was checked fresh; the Next link line is unchanged since the previous PASS and is settled.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/core/auth-fetch/attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`; `src/core/mixins/auth.ts`; `src/types/config.ts`; `src/core/plugin/base.ts`, `fetch.ts`; video `src/index.ts:654`, music `src/index.ts:507`. Example `src/examples/core-recipes-auth-fetch.ts` (whole file). Tag meanings: `src/lib/mdx/rehype.ts:110,126-128`.

Method: read the whole page, the whole example, and every source line cited. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (`--listFiles`: 153 files from `nomercy-player-core/src`, 0 from `node_modules/@nomercy-entertainment`): `EXIT 0`. Not run against a server (behaviour traced in the source).

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-14 `authFetch` for code outside a plugin; `this.fetch` inside runs the same pipeline with the player's auth, the abort signal, and the plugin scope | `base.ts:713-718`; `fetch.ts:60-77` (`_rawAuth` or `config.auth`, `lifecycle.abortable()` signal, `pluginId`, `scope`, then `authFetch`) | Supported |
| L16 `authFetch` from the package root | `auth-fetch/index.ts:22`; root re-export `src/index.ts:218` (`export { authFetch, isAuthError, isNetworkError } from './core/auth-fetch'`) | Supported |
| L17 `url`, optional `AuthConfig`, required `signal` (options-object keys; `key` tags correct) | `types.ts:17-20` | Supported |
| L18 the caller owns the `AbortController` | `types.ts:20`; example `:30,36,54` | Supported |
| L21-22 `mediaAuthorization` gives a media URL its `Authorization` value; unset sends none | `config.ts:49-63`; video `index.ts:654`, music `index.ts:507` (`this.auth()?.mediaAuthorization?.(url)`) | Supported |
| L26 one `Request` per attempt, bounded retry loop | `attempt.ts:106`; `orchestrator.ts:46-81` | Supported |
| L27-28 `AuthConfig` fields optional; no `auth` or no `bearerToken` adds no authorization header | `config.ts:41-63` (all `?`); `prepare.ts:51-56` | Supported |
| L32 `transformUrl` rewrites the URL first | `prepare.ts:22-26,101` | Supported |
| L33 `Bearer` only when `bearerToken` resolves to a non-empty string | `prepare.ts:51-56` (`if (token)`) | Supported |
| L34 `headers` merge in; per-call `headers` win | `prepare.ts:58-71` (auth headers, then `opts.headers`) | Supported |
| L35 `signRequest` runs last | `prepare.ts:81-85` | Supported |
| L37 `signal` required | `types.ts:20` (not optional) | Supported |
| L43 401: hook called once when set and `retryAfterRefresh` not `0`; retry without a slot; a throwing hook ends the call (`refresh-failed`); a second 401 or no refresh left throws `unauthenticated` | `prepare.ts:160` (`maxRefreshes` 0 or 1); `attempt.ts:141-165`; `orchestrator.ts:67-69` | Supported |
| L44 403 throws `core:auth/forbidden`, no refresh, no retry | `attempt.ts:168-173` | Supported |
| L45-49 404, 408, 410, 429, other 4xx throw their codes, no retry | `attempt.ts:67-75,175-180` | Supported |
| L50 500 retries per `RetryConfig`, then throws `server-error`; default `{ attempts: 0 }` | `attempt.ts:79,182-191`; `prepare.ts:20,158-159`; `orchestrator.ts:80-81` | Supported |
| L51-54 502, 503, 504, other 5xx codes; retry then throw | `attempt.ts:77-85,182-191` | Supported |
| L55 no response within `timeoutMs`: retry, then `core:network/timeout` | `attempt.ts:21-31,123-136` | Supported |
| L56 network failure: retry, then `core:network/offline` | `attempt.ts:123-136` | Supported |
| L58 live player auth through `auth` on the composed player; Compose the Methods link | `mixins/auth.ts:51-88`; `build/compose-methods.mdx` exists | Supported |
| L59 `auth()` returns a redacted snapshot without `bearerToken` | `mixins/auth.ts:40-43,72-75` | Supported |
| L60 `this.fetch` reads the raw config at call time | `fetch.ts:62-64` (`_rawAuth()` read per call) | Supported |
| L62 snippet (whole file): `AuthConfig` with `bearerToken` getter and refresh hook, `authFetch` with `signal`, `json`, `timeoutMs`, guards | example `:20-54`; `EXIT 0` | Supported |
| L65 the host stands for your own backend | example `:34` `https://api.example.com/profile` with comment `// your own backend`; the reader's own host by the page's own words; not fetched | Supported |
| L69-75 `responseType` table: `text` default (string, or the `parser` result), `json` cast to `T`, `arrayBuffer` | `types.ts:58-62`; `decode.ts:19-64` | Supported |
| L77 a thrown `parser` or invalid JSON gives `core:network/parse-failed` | `decode.ts:36-40,53-57` | Supported |
| L78 narrow with `isAuthError` and `isNetworkError` | `auth-fetch/index.ts:26-33` | Supported |
| L82 Next: IEventBus link | unchanged since the previous PASS; settled | Supported (settled) |

## Notes

- `key` tag audit: `url`, `signal`, `auth`, `bearerToken`, `mediaAuthorization`, `transformUrl`, `headers`, `signRequest`, `refreshOnUnauthenticated`, `retryAfterRefresh`, `timeoutMs`, `responseType`, `parser` are object keys (`types.ts:17-62`, `config.ts:41-63`). `key authorization` names a header, a key of the request headers (`prepare.ts:55`). No positional parameter is tagged `key`.
- The table omits the `core:network/aborted` path (`attempt.ts:115-121`, `orchestrator.ts:71-77`). The page does not claim the table is complete; no finding.
