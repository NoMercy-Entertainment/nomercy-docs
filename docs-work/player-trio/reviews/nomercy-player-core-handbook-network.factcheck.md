# Fact check: /nomercy-player-core/handbook/network
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
Reviewed-SHA: c01b9b344544dde5
Previous verdict: FAIL (Reviewed-SHA c6b3c16af4e67799); fixes verified: finding 1 in part. The build-time cases the fix names are true (probe output from the previous review, and `attempt.ts:106` before the `try` at `:109`), and the link #24 is open and describes exactly them (`gh issue view 24`: "fix(auth-fetch): errors while building the request escape as raw errors, not NetworkError or AuthError", OPEN). But the fix narrows the exception to request building, and failures after the request is built also leave raw (finding 1).

Source: nomercy-player-core `src` at `e3d2de5`: `src/core/auth-fetch/attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`; `src/index.ts`. Example `src/examples/core-handbook-network.ts` (no change since `7f53a5d`).

Method: re-read the whole page and `git diff 7f53a5d` for it (line 37 reworded, line 96 added). Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc` exit 0. Ran a probe (scratch files outside the repo; `auth-fetch/index.ts` bundled from source with the docs worktree's `esbuild`; a local `node:http` server on 127.0.0.1; Node v22.14.0). Output, verbatim:

```
bodyCutText | auth: false | net: false | name: TypeError | code: undefined | msg: terminated
bodyCutArrayBuffer | auth: false | net: false | name: TypeError | code: undefined | msg: terminated
abortDuringBodyText | auth: false | net: false | name: AbortError | code: 20 | msg: This operation was aborted
emitThrows | auth: false | net: false | name: Error | code: undefined | msg: listener failed
getWithBody | auth: false | net: false | name: TypeError | code: undefined | msg: Request with GET/HEAD method cannot have body.
bodyCutJson | auth: false | net: true | name: NetworkError | code: core:network/parse-failed | msg: response body is not valid JSON
abortDuringBodyJson | auth: false | net: true | name: NetworkError | code: core:network/parse-failed | msg: response body is not valid JSON
```

(`bodyCut`: status 200 sent, socket destroyed mid-body. `abortDuringBody`: status 200 sent, body never ends, signal aborted after 100 ms. `emitThrows`: an `emit` option that throws. `getWithBody`: default `GET` with `body: 'x'`.)

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 37, 56, 96 | `decode.ts:21` (`await response.arrayBuffer()`) and `decode.ts:44` (`await response.text()`), both outside any `try`; `attempt.ts:193` (`return decodeBody(...)` after the `try` at `:109-137`); `orchestrator.ts:39,50,55,59` (`ctx.dispatch`/`ctx.complete` call the `emit` option, unguarded); `prepare.ts:73-81` (`new Request(url, init)` with `method` default `GET` and `body`) | Line 37 "Once the request is built, every failure ends with one of these codes" is false: a body read that fails on the text or `arrayBuffer` path leaves `authFetch` raw (`bodyCutText`, `bodyCutArrayBuffer`), and so does an `emit` callback that throws (`emitThrows`). Line 56 "The abort signal fired → `core:network/aborted`" is false when the signal fires while the body is read: the text path throws a raw `AbortError` (`abortDuringBodyText`), the json path throws `core:network/parse-failed` (`abortDuringBodyJson`). Line 96 "The exception is building the request: ..." presents request building as the only exception, and its list misses a `GET` or `HEAD` call with a `key body` (`getWithBody`). The body-read and `emit` cases are code defects not covered by #17 to #24; add them to #24 or file a new issue on nomercy-player-core (plus the KMP port check). | Line 37: "Most failures end with one of these codes:". Row line 56: cause "The abort signal fired before the response arrived, or during a retry wait". Line 96: "Some failures leave `fn authFetch` as the raw error instead ([#24](https://github.com/NoMercy-Entertainment/nomercy-player-core/issues/24)): building the request (a malformed URL, a `str GET` or `str HEAD` call with a `key body`, or a `key transformUrl`, `key bearerToken`, header or `key signRequest` callback that throws), a body that fails while it is read on the text or `str arrayBuffer` path (a dropped connection, or the abort signal firing mid-body), and a `key emit` callback that throws. On the `str json` path a body read failure surfaces as `str core:network/parse-failed`." Link the new issue too if one is filed. |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 auth headers, typed decoding, bounded retry | `orchestrator.ts:36-82`; `prepare.ts:48-88`; `decode.ts:19-65` | Supported |
| L13 playlist URL loads share the pipeline | `src/core/mixins/loading.ts:20,317` (previous review; file unchanged at `e3d2de5`) | Supported |
| L14 recipe link | `recipes/auth-fetch.mdx` exists (previous review) | Supported |
| L16 three names on the package root | `src/index.ts:218` | Supported |
| L17-18 `url`, required `signal`, optional `auth` | `types.ts:18-21` | Supported |
| L22-24 one `Request` raced against optional `timeoutMs`; no default; `<= 0` means none | `attempt.ts:21-23,106-113` | Supported |
| L26 thrown fetch with aborted signal gives `core:network/aborted` | `attempt.ts:116-120` | Supported |
| L27 timeout or offline throw becomes a retry and stashes an error | `attempt.ts:123-136` | Supported |
| L29-31 401 refresh once, free retry; no budget gives `unauthenticated`; 403 `forbidden` | `attempt.ts:141-172`; `prepare.ts:160` | Supported |
| L33-35 other 4xx throw, 5xx retry and stash, success to decoder | `attempt.ts:175-193` | Supported |
| L37 once built, every failure ends with a table code | see finding 1; probe `bodyCut*`, `abortDuringBodyText`, `emitThrows` | FAIL |
| Table rows 401 refresh-failed .. 4xx client-error | `attempt.ts:67-75,147-151,162-179` | Supported |
| Table rows 500, 502, 503, 504, other 5xx | `attempt.ts:77-85,182-190` | Supported |
| Table rows timeout, offline (retried) | `attempt.ts:123-136` | Supported |
| Table row aborted | `attempt.ts:116-120`; `orchestrator.ts:71-77`; mid-body abort see finding 1 | FAIL |
| Table row parse-failed | `decode.ts:36-40,53-57` | Supported |
| L59 a retried failure throws its code when attempts run out | `orchestrator.ts:80-81` | Supported |
| L63-69 decode paths; `parser` only on text; parse failures | `types.ts:58-62`; `decode.ts:19-65` | Supported |
| L73-75 loop; default `{ attempts: 0 }`, `maxAttempts` 1; default still waits the backoff, then throws | `orchestrator.ts:46-81`; `prepare.ts:158-159` | Supported |
| L77-79 linear unless `exponential`; `baseMs` 500; `maxMs` 30_000 | `attempt.ts:56-63` | Supported |
| L81-82 refresh retry 0 delay, no slot; budget at most one, needs the hook and `retryAfterRefresh` not 0 | `attempt.ts:154-159`; `prepare.ts:160` | Supported |
| L86-91 `emit` events, silent without `emit`; `scope` shapes and defaults | `prepare.ts:104-119` | Supported |
| L95 thrown values are `AuthError` or `NetworkError` | qualified by L96; see finding 1 | FAIL (with L96) |
| L96 the only exception is building the request, with the listed causes; #24 | listed causes true (`attempt.ts:106`, `prepare.ts:48-88,101`); #24 open and matching; "only" false and list incomplete, see finding 1 | FAIL |
| L97-98 the two guards; check auth first | `src/core/auth-fetch/index.ts:26-35` | Supported |
| L103 the host stands for your own API | the example's only URL host is `api.example.com` (previous review; example unchanged) | Supported |
| L107 Next: Registration | `handbook/registration.mdx` exists (previous review) | Supported |

## Notes

- The doc comment `orchestrator.ts:33-34` ("Throws `NetworkError` or `AuthError` only") disagrees with the code for all probe cases above except the two json ones.
- Whether the player's own bus `emit` can throw into `authFetch` (a listener that throws) is not checked; the `emitThrows` case uses a caller-supplied `emit`.
