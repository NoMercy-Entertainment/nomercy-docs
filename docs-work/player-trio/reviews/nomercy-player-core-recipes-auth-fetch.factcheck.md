# Fact check: /nomercy-player-core/recipes/auth-fetch
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/recipes/auth-fetch.mdx
Reviewed-SHA: d76c9e1f22ccbea6

Source: `packages/player-web/nomercy-player-core/src/core/auth-fetch/` (`orchestrator.ts`, `prepare.ts`, `attempt.ts`, `decode.ts`, `types.ts`, `index.ts`) and `src/core/mixins/auth.ts`; plugin path `src/core/plugin/fetch.ts` / `base.ts`. Example: `src/examples/core-recipes-auth-fetch.ts`. Media header wiring checked in `nomercy-video-player` / `nomercy-music-player` `setAuthHeaderProvider`. Method: read page, example, and source; no site build. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname: none on the page or in the example. Package name appears as plain backticks, not inside a `str` tag.

## Gate checks

| Gate | Result |
| --- | --- |
| `authFetch` vs `this.fetch` | Pass (`authFetch` public; `Plugin.fetch` -> `pluginFetch` -> `authFetch` with live auth, lifecycle signal, plugin scope) |
| `bearerToken` vs `mediaAuthorization` | Pass (pipeline uses `bearerToken` only; media path is separate `AuthConfig.mediaAuthorization`) |
| Status-code behavior (401 / 403 / other 4xx / 5xx-network-timeout) | Pass (`attempt.ts`, `orchestrator.ts`, `prepare.ts` default retry) |
| Package name not inside a `str` tag | Pass (line 16: `@nomercy-entertainment/nomercy-player-core` in plain backticks) |
| Old library nickname on page or example | none |
| No em dash / en dash on page or example | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Call pipeline outside a plugin with `authFetch`, inside with `this.fetch` | `index.ts` export; `plugin/base.ts:713-719`; `plugin/fetch.ts:60-75` | Supported |
| `authFetch` exported from `@nomercy-entertainment/nomercy-player-core` | `src/index.ts:218` | Supported |
| Pass `url`, optional `AuthConfig`, required `signal` | `auth-fetch/types.ts:18-20` (`signal: AbortSignal`) | Supported |
| `this.fetch` wraps same pipeline; supplies auth, signal, plugin scope | `plugin/fetch.ts:60-75` (`_rawAuth` / `config.auth`, lifecycle abort signal, `pluginId` + scope) | Supported |
| `mediaAuthorization` is separate; unset means media sends no token | `types/config.ts:49-63`; video/music `setAuthHeaderProvider` reads `auth()?.mediaAuthorization?.(url)` | Supported |
| Builds one `Request` per attempt, then bounded retry loop | `attempt.ts:106`; `orchestrator.ts:46-78` | Supported |
| `AuthConfig` fields optional; omit `auth` or unset `bearerToken` -> no `Authorization` | `prepare.ts:51-56` | Supported |
| Order: `transformUrl`, Bearer when non-empty, headers (per-call wins), `signRequest` last | `prepare.ts:22-26,100-101,48-87` | Supported |
| Caller owns `AbortController` / required `signal` | `types.ts:20`; example `:30,36` | Supported |
| 401: `refreshOnUnauthenticated` once when set and `retryAfterRefresh` not `0`; retry without consuming attempt | `prepare.ts:160`; `attempt.ts:141-159` | Supported |
| 403: throws `core:auth/forbidden`; no refresh, no retry | `attempt.ts:168-172` | Supported |
| Other 4xx: matching `core:network/*`; no retry | `attempt.ts:67-74,175-179` | Supported |
| 5xx / network / timeout: retry per `RetryConfig`; default `{ attempts: 0 }` | `attempt.ts:115-136,182-190`; `prepare.ts:20,158-159` | Supported |
| Live player auth via `auth()`; redacted snapshot strips `bearerToken` | `mixins/auth.ts:40-43,71-76` | Supported |
| `this.fetch` reads raw config at call time | `plugin/fetch.ts:63-64` (`_rawAuth`) | Supported |
| `responseType` text (default + optional parser) / json / arrayBuffer | `decode.ts:19-64`; `types.ts:58-62` | Supported |
| Thrown parser or invalid JSON -> `core:network/parse-failed` | `decode.ts:36-40,53-57` | Supported |
| Narrow with `isAuthError` / `isNetworkError` | `auth-fetch/index.ts`; example `:43-48` | Supported |
| Example: `AuthConfig` + `authFetch` + required signal + json | Example `:22-39`; matches API | Supported |
| Next link Event Bus path | Path shape only; not re-verified against nav | Supported (path as written) |
