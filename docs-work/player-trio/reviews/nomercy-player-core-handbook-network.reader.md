# Reader: /nomercy-player-core/handbook/network

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx

Reviewed-SHA: e84c4ea7d68f63be

## Same-voice comparison

Compared to `src/content/nomercy-player-core/en/tour/queue.mdx`. Network matches the tour voice: a short opening that states when to use `fn authFetch` and points to the recipe for call-site detail, sections that walk behavior in order with `fn`, `key`, `str`, and `cls` typography before tables or lists, a non-live snippet before **Next**, and one handbook link for what comes after. Sentences stay imperative and pipeline-first rather than describing the doc site.

## Snippet

`core-handbook-network.ts` (via `:::snippet{file="core-handbook-network" live="false"}` before **Next**). It calls `authFetch` with `responseType: 'json'`, an explicit `retry` object, `timeoutMs`, `scope: 'silent'`, and a `try`/`catch` that checks `isAuthError` before `isNetworkError`. It does not pass `auth`, `emit`, or refresh hooks. Judgment below is for the MDX page only; the snippet shows where `retry` and `timeoutMs` sit on the options object.

## Reader notes (JavaScript background, new to this handbook)

I read the page in order without opening player source, assuming I know fetch and abort signals and that the auth-fetch recipe covers bearer headers when I need them.

The opening ties `fn authFetch` to auth headers, typed decoding, and a bounded retry loop, and notes playlist URL loads use the same pipeline. Import path and required `key url` and `key signal` are up front; `key auth` is optional.

**What one attempt does** is the single-pass picture: build one `Request`, race it against optional `key timeoutMs`, then classify. No default HTTP timeout unless I set one or rely on `key signal`. Aborted signal throws `str core:network/aborted`. Timeout or offline failure becomes a retry outcome and stashes an error for later throw. `401` can refresh once when the refresh hook and budget allow, then retry without spending a retry slot; exhausted auth budget throws `str core:auth/unauthenticated`. `403` throws `str core:auth/forbidden` immediately. Other `4xx` throw matching network codes with no retry. `5xx` is retryable and stashes the server code. Success goes to the decoder. The fixed `4xx` table names the common codes.

**How the body is decoded** maps `key responseType` (`text` default, `json`, `arrayBuffer`) and optional `key parser` on the text path. Parse failures throw `str core:network/parse-failed`.

**How the retry loop spends its budget** closes the loop: keep calling until a value returns, a throw ends the call, or the attempt budget is gone. `cls RetryConfig` default `{ attempts: 0 }` means `maxAttempts` is `1`; even then a retryable failure waits backoff once, then throws the stashed error. Backoff is linear by default or `str exponential` with `key baseMs` and `key maxMs`. Refresh retries use zero delay and skip an attempt slot when `key refreshOnUnauthenticated` is set and `key retryAfterRefresh` is not `0`, with at most one refresh.

**Where fetch events land** covers optional `key emit` for `str fetch:start`, `str fetch:retry`, and `str fetch:complete`, and `key scope` (`plugin`, `player`, `silent`) plus default rules when `key pluginId` is set.

**Narrow a failure** names `cls AuthError` and `cls NetworkError` and the two type guards, with auth checked first.

Doc typography matches tour and recipe pages. The prose stays on pipeline behavior; it does not describe this page as documentation.

## Friction (does not fail the rubric)

`key auth` is optional here without repeating `cls AuthConfig` fields; the linked auth-fetch recipe carries bearer and header detail. The first `401` sentence says “that hook” before `key refreshOnUnauthenticated` is named in the retry section; reading through, the two sections align. The MDX describes `cls RetryConfig` and its fields but never labels the call option as `key retry` (the snippet does). `key emit` is not typed here; event-bus docs are elsewhere. Playlist URL loads are named as sharing the pipeline without re-explaining playlist loading.

## Why PASS

I can trace one attempt (request build, timeout race, status and throw classification, decode on success) and the retry loop (attempt budget from `cls RetryConfig`, backoff between retryable outcomes, refresh as a free retry, terminal throw when the budget is spent or the failure is non-retryable). Every API identifier the prose asks me to use on this page is introduced in the same section or the sentence before it is needed, aside from deferring the refresh hook’s option name by one section while still naming it before the page ends. Under the stated fail conditions, this passes.
