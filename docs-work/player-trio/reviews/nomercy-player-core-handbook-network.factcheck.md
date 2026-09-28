# Fact check: /nomercy-player-core/handbook/network
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
Reviewed-SHA: e84c4ea7d68f63be

Source: `packages/player-web/nomercy-player-core/src/core/auth-fetch/` (`attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`); playlist call site `src/core/mixins/loading.ts` `loadQueue`. Example: `src/examples/core-handbook-network.ts`. Method: read page, example, auth-fetch sources, and `loadQueue`; SHA256 of the mdx bytes (first 16 hex); no site browser gate. Em dash / en dash scan (U+2013, U+2014) over the page and example: none. Old library nickname (the old nickname): none on the page or in the example. Snippet: `live="false"`. Sentence and paragraph word gates: all sentences ≤30 words, all paragraphs ≤60 words. Table: 5 non-separator lines (header + 4 data). British spelling: none.

## Gate checks

| Gate | Result |
| --- | --- |
| Claims vs `auth-fetch` + `loadQueue` call site | Pass |
| Playlist URL loads share `authFetch` | Pass (`loading.ts` `loadQueue` `:317-325` calls `authFetch`) |
| Old library nickname (the old nickname) on page or example | none |
| No em dash / en dash on page or example | Pass |
| Snippet uses `live="false"` | Pass (page `:86`) |
| Sentence ≤30 words / paragraph ≤60 words | Pass |
| Table ≤6 non-separator lines | Pass (5) |
| British spelling | none |
| Example imports from package root | Pass (`src/index.ts:218`) |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Use `authFetch` for auth headers, typed decoding, bounded retry | `orchestrator.ts:36-81`; `prepare.ts` / `decode.ts` / `attempt.ts` | Supported |
| Playlist URL loads share this same pipeline | `loading.ts` `loadQueue` `:305-325` (`authFetch` with playlist URL) | Supported |
| Import `authFetch`, `isAuthError`, `isNetworkError` from package | `src/index.ts:218`; `auth-fetch/index.ts:22-32` | Supported |
| Every call needs `url` and required `signal`; `auth` optional | `types.ts:18-20` | Supported |
| One attempt: build `Request`, race optional `timeoutMs`, classify | `attempt.ts:105-113`; `timeoutPromise` `:21-30` | Supported |
| No default HTTP timeout; omit / `≤0` → only abort stops hung fetch | `attempt.ts:21-24`; no default in `prepare.ts` | Supported |
| Aborted fetch → `core:network/aborted` | `attempt.ts:116-120` | Supported |
| Timeout or offline throw → retry outcome + stash terminal error | `attempt.ts:123-136` | Supported |
| 401 refreshes once when hook set and budget open; no retry slot | `attempt.ts:141-159`; `prepare.ts:160` | Supported |
| 401 with no budget → `core:auth/unauthenticated` | `attempt.ts:162-165` | Supported |
| 403 → `core:auth/forbidden` at once | `attempt.ts:168-172` | Supported |
| Other 4xx → matching network code, no retry | `attempt.ts:67-74,175-179` | Supported |
| 5xx → retry outcome + stash matching server code | `attempt.ts:77-84,182-190` | Supported |
| Success → decoder | `attempt.ts:193` | Supported |
| Fixed 4xx table: 404 / 408 / 410 / 429; else `client-error` | `attempt.ts:67-74` | Supported |
| `responseType` text (default + optional `parser`) / json / arrayBuffer | `decode.ts:19-64`; `types.ts:58-62` | Supported |
| Thrown parser or invalid JSON → `core:network/parse-failed` | `decode.ts:36-40,53-57` | Supported |
| Retry loop until value, throw, or budget gone | `orchestrator.ts:46-81` | Supported |
| `RetryConfig` default `{ attempts: 0 }` → `maxAttempts` 1 | `prepare.ts:20,158-159` | Supported |
| Default: retryable failure waits backoff, then throws stashed error | `orchestrator.ts:46-81` (one attempt, sleep, then throw `lastError`) | Supported |
| Backoff linear default; `exponential`; `baseMs` 500; `maxMs` 30_000 | `attempt.ts:56-62` | Supported |
| Refresh retry: 0 delay, no attempt slot; budget ≤1 when hook set and `retryAfterRefresh` not `0` | `attempt.ts:154-159`; `prepare.ts:160` | Supported |
| `emit` optional for `fetch:start` / `retry` / `complete`; without emit = no-ops | `prepare.ts:104-118` | Supported |
| `scope`: `plugin` / `player` / `silent`; default `plugin` if `pluginId`, else `player` | `prepare.ts:105-112` | Supported |
| Thrown `AuthError` / `NetworkError`; guards; check auth first | `auth-fetch/index.ts:26-32`; example `:33-38` | Supported |
| Example: json + retry + timeout + silent + auth-first narrow | `core-handbook-network.ts:22-41` | Supported |

## Prior FAIL resolution

Page line 13: “Playlist URL loads share this same pipeline.”

Previous FAIL treated cover as `auth-fetch/*` only (comment at `index.ts:9-11`). Explicit call-site check: `loading.ts` `loadQueue` awaits `authFetch` at `:317-325` with the playlist URL, auth, parser, emit, and `scope: 'player'`. Claim supported.

## Example alignment

- Package-root `authFetch` / `isAuthError` / `isNetworkError`; required `signal`; `responseType: 'json'`; explicit retry + `timeoutMs`; `scope: 'silent'`; auth guard before network.
- Matches handbook narrow-a-failure order; does not contradict playlist sharing.
