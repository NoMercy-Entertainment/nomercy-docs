# Fact check: /nomercy-player-core/handbook/network
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
Reviewed-SHA: c6b3c16af4e67799
Previous verdict: PASS; fixes verified: none (no finding was open). The one added sentence, page line 102 "The host in the sample stands for your own API.", is true (checked below). The fresh review found a claim the previous review marked supported without testing it (finding 1).

Source: nomercy-player-core `src` at `e3d2de5`: `src/core/auth-fetch/attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`; `src/core/mixins/loading.ts`; `src/types/config.ts`; `src/index.ts`. Example `src/examples/core-handbook-network.ts` (unchanged).

Method: re-read the whole page. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Ran a probe (scratch file outside the repo, bundled with the docs worktree's `esbuild` straight from `nomercy-player-core/src/core/auth-fetch/index.ts`, Node v22.14.0). Output, verbatim:

```
bearerThrows | auth: false | net: false | name: Error | code: undefined | msg: token store down
badUrl | auth: false | net: false | name: TypeError | code: undefined | msg: Failed to parse URL from http://[bad
transformThrows | auth: false | net: false | name: Error | code: undefined | msg: rewrite failed
refused | auth: false | net: true | name: NetworkError | code: core:network/offline | msg: network error
```

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 37 and 95 | `prepare.ts:101` (`applyTransformUrl` outside any try); `attempt.ts:106` (`buildRequest` runs before the `try` at `:109`); `prepare.ts:48-87` (`resolveHeader` calls the `bearerToken`/header callback, `new Request(url, init)`, `signRequest`, all unguarded); `orchestrator.ts:37,47` (no catch around either) | Line 37 says "Every failure ends with one of these codes". Line 95 says "Thrown values are `AuthError` or `NetworkError`". Both are false when building the request throws: a malformed URL, or a `transformUrl`, `bearerToken`, header or `signRequest` callback that throws. The raw error leaves `authFetch` with no code, and both guards return `false` (probe output above: `bearerThrows`, `badUrl`, `transformThrows`). A reader who checks only the two guards misses these errors. The doc comment `orchestrator.ts:33-34` ("Throws `NetworkError` or `AuthError` only") disagrees with the code the same way; this is a code defect not covered by #17 to #23 and should be filed on nomercy-player-core (plus the KMP port check). | Line 37: "Once the request is built, every failure ends with one of these codes:". Line 95: "Thrown values are `cls AuthError` or `cls NetworkError`. The exception is building the request: a malformed URL, or a `key transformUrl`, `key bearerToken`, header or `key signRequest` callback that throws, leaves `fn authFetch` as the raw error." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 auth headers, typed decoding, bounded retry | `orchestrator.ts:36-81`; `prepare.ts:48-87`; `decode.ts:19-64` | Supported |
| L13 playlist URL loads share the pipeline | `src/core/mixins/loading.ts:20,317` | Supported |
| L14 recipe link | `recipes/auth-fetch.mdx` exists | Supported |
| L16 three names on the package root | `src/index.ts:218` | Supported |
| L17-18 `url`, required `signal`, optional `auth` | `types.ts:18-20` | Supported |
| L22-24 one `Request` raced against optional `timeoutMs`; no default; `<= 0` means none | `attempt.ts:21-24,105-113` | Supported |
| L26 aborted signal gives `core:network/aborted` | `attempt.ts:116-120` | Supported |
| L27 timeout or offline throw becomes a retry and stashes an error | `attempt.ts:123-136` | Supported |
| L29-31 401 refresh once, free retry; no budget gives `unauthenticated`; 403 `forbidden` | `attempt.ts:141-172`; `prepare.ts:160` | Supported |
| L33-35 other 4xx throw, 5xx retry and stash, success to decoder | `attempt.ts:175-193` | Supported |
| L37 every failure ends with a table code | see finding 1 | FAIL |
| Table rows 401 refresh-failed .. 4xx client-error | `attempt.ts:67-75,147-151,162-172` | Supported |
| Table rows 500, 502, 503, 504, other 5xx | `attempt.ts:77-85,182-190` | Supported |
| Table rows timeout, offline (retried) | `attempt.ts:123-136` | Supported |
| Table row aborted (also during backoff) | `attempt.ts:116-120`; `orchestrator.ts:71-77` | Supported |
| Table row parse-failed | `decode.ts:36-40,53-57` | Supported |
| L59 a retried failure throws its code when attempts run out | `orchestrator.ts:80-81` (`throw ctx.lastError`) | Supported |
| L63-69 decode paths; `parser` only on text; parse failures | `types.ts:58-62`; `decode.ts:19-64` | Supported |
| L73-75 loop; default `{ attempts: 0 }`, `maxAttempts` 1; default still waits the backoff, then throws | `orchestrator.ts:46-81`; `prepare.ts:20,158-159` | Supported |
| L77-79 linear unless `exponential`; `baseMs` 500; `maxMs` 30_000 | `attempt.ts:56-63` | Supported |
| L81-82 refresh retry 0 delay, no slot; budget at most one, needs the hook and `retryAfterRefresh` not 0 | `attempt.ts:154-159`; `prepare.ts:160` | Supported |
| L86-91 `emit` events, silent without `emit`; `scope` shapes and defaults | `prepare.ts:104-119` | Supported |
| L95 thrown values are `AuthError` or `NetworkError` | see finding 1 | FAIL |
| L96-97 the two guards; check auth first | `src/core/auth-fetch/index.ts:26-35` | Supported |
| L102 the host stands for your own API | the example's only URL host is `api.example.com` | Supported |
| L106 Next: Registration | `handbook/registration.mdx` exists | Supported |
