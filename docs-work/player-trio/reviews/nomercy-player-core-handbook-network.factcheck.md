# Fact check: /nomercy-player-core/handbook/network
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
Reviewed-SHA: 4b9f85310985e857
Previous verdict: FAIL (Reviewed-SHA c01b9b344544dde5); fixes verified: finding 1 in full as asked. Line 37 now reads "Most failures end with one of these codes:"; the `aborted` row (line 56) now names "before the response arrived, or during a retry wait" (`attempt.ts:109-121`, `orchestrator.ts:71-77`); lines 96-102 now list request building (with `GET`/`HEAD` plus `body`), body-read failures on the text and `arrayBuffer` paths, a throwing `emit`, and the `json` path mapping to `parse-failed`. Each is re-proved by a probe run this review (output below). The fresh review found one gap in the fixed line 98 (finding 1).

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean; same `src` as the pinned `5ed4538`): `src/core/auth-fetch/attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`; `src/types/config.ts:41-94`; `src/adapters/retry-policy/IRetryPolicy.ts:20-26`; `src/core/mixins/loading.ts:310-330`; `src/index.ts:218`. Example `src/examples/core-handbook-network.ts` (whole file, no `lines=`).

Method: re-read the whole page and `git diff 26055e2~1 26055e2` for it. Read the six auth-fetch files in full at the lines cited. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc` exit 0. Bundled `src/core/auth-fetch/index.ts` from source with the docs worktree's `esbuild` into the scratchpad and ran two probes there (Node v22.14.0; a local `node:http` server on 127.0.0.1 for the body cases). Output, verbatim:

```
bodyCutText | auth: false | net: false | name: TypeError | code: undefined | msg: terminated
bodyCutArrayBuffer | auth: false | net: false | name: TypeError | code: undefined | msg: terminated
bodyCutJson | auth: false | net: true | name: NetworkError | code: core:network/parse-failed | msg: response body is not valid JSON
abortDuringBody_text | auth: false | net: false | name: AbortError | code: 20 | msg: This operation was aborted
abortDuringBody_json | auth: false | net: true | name: NetworkError | code: core:network/parse-failed | msg: response body is not valid JSON
emitThrows | auth: false | net: false | name: Error | code: undefined | msg: listener failed
getWithBody | auth: false | net: false | name: TypeError | code: undefined | msg: Request with GET/HEAD method cannot have body.
```

```
headerValueNewline | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "a
b" is an invalid header value.
headerNameSpace | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "bad name" is an invalid header name.
bearerNonLatin1 | auth: false | net: false | name: TypeError | code: undefined | msg: Cannot convert argument to a ByteString because the character at index 10 has a value of 8364 which is greater than 255.
urlWithCredentials | auth: false | net: false | name: TypeError | code: undefined | msg: Request cannot be constructed from a URL that includes credentials: http://u:p@127.0.0.1:9/
```

(`headerValueNewline`: `headers: { 'X-A': 'a\nb' }`. `headerNameSpace`: `headers: { 'bad name': 'x' }`. `bearerNonLatin1`: static `auth.bearerToken` with a `€`. `urlWithCredentials`: `url: 'http://u:p@127.0.0.1:9/'`, a well-formed URL.)

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 98 | `prepare.ts:55,62,69` (`headers.set(...)`, no `try`); `prepare.ts:81` (`new Request(url, init)`, no `try`); `attempt.ts:106` (`buildRequest` before the `try` at `:109`); `orchestrator.ts:47` (no `try`) | The "Building the request" bullet lists its causes as a closed list, but two more causes leave `fn authFetch` raw, both proved by the probe: a header name or value that is not valid (a static `key headers` / `auth.headers` entry, or a `key bearerToken` value with a newline or a character above 255: `headerValueNewline`, `headerNameSpace`, `bearerNonLatin1`), and a well-formed URL that carries a user name and password (`urlWithCredentials`), which "a malformed URL" does not cover. | Replace line 98 with: "- Building the request: a malformed URL or one with a user name and password in it, a header name or value that is not valid (this includes the `key bearerToken` value), a `str GET` or `str HEAD` call with a `key body`, or a `key transformUrl`, `key bearerToken`, header or `key signRequest` callback that throws." These are the same defect class as #24; add the two cases to #24 when it is next updated (the settled scope of #24 is not re-raised here). |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 auth headers, typed decoding, bounded retry | `prepare.ts:48-88`; `decode.ts:19-65`; `orchestrator.ts:36-82` | Supported |
| L13 playlist URL loads share the pipeline | `src/core/mixins/loading.ts:20,317` | Supported |
| L14 recipe link | `src/content/nomercy-player-core/en/recipes/auth-fetch.mdx` exists | Supported |
| L16 three names on the package root | `src/index.ts:218` | Supported |
| L17-18 `url`, required `signal`, optional `auth` | `types.ts:18-20` | Supported |
| L22 one `Request` per pass, raced against optional `timeoutMs` | `attempt.ts:106,110-113`; `orchestrator.ts:46-47` | Supported |
| L23-24 no default timeout; omitted or `<= 0` means only the signal stops it | `attempt.ts:21-24`; `types.ts:47` (optional, no default) | Supported |
| L26 thrown fetch with aborted signal gives `core:network/aborted` | `attempt.ts:115-121` | Supported |
| L27 timeout or offline throw becomes a retry and stashes a terminal error | `attempt.ts:123-136` | Supported |
| L29 401 refreshes once with hook and budget, retries without a slot | `attempt.ts:141-159` | Supported |
| L30 401 without budget gives `core:auth/unauthenticated` | `attempt.ts:162-165` | Supported |
| L31 403 gives `core:auth/forbidden` at once | `attempt.ts:168-173` | Supported |
| L33 other 4xx throw a matching network code, no retry | `attempt.ts:67-75,175-180` | Supported |
| L34 5xx retries and stashes the server code | `attempt.ts:77-85,182-191` | Supported |
| L35 success goes to the decoder | `attempt.ts:193` | Supported |
| L37 "Most failures" end with a table code | qualified; exceptions listed at L96-102 | Supported (fix verified) |
| Table rows 401 refresh-failed, unauthenticated, 403 | `attempt.ts:147-151,162-173` | Supported |
| Table rows 404, 408, 410, 429, other 4xx (No) | `attempt.ts:67-75,175-180` | Supported |
| Table rows 500, 502, 503, 504, other 5xx (while attempts remain) | `attempt.ts:77-85,182-191`; `orchestrator.ts:46,67-69,80-81` | Supported |
| Table rows timeout, offline (while attempts remain) | `attempt.ts:123-136` | Supported |
| L56 aborted before the response or during a retry wait (No) | `attempt.ts:115-121`; `orchestrator.ts:71-77`; mid-body abort is not this row (probe `abortDuringBody_*`) | Supported (fix verified) |
| Table row parse-failed (No) | `decode.ts:36-40,53-57` | Supported |
| L59 a retried failure throws its code when attempts run out | `orchestrator.ts:80-81` | Supported |
| L63-67 `responseType` paths; text default; `parser` only on text; `json` casts; `arrayBuffer` buffer | `types.ts:59-61`; `decode.ts:19-65` | Supported |
| L69 thrown `parser` or invalid JSON gives `parse-failed` | `decode.ts:36-40,53-57` | Supported |
| L73 loop until value, throw, or budget gone | `orchestrator.ts:46-81` | Supported |
| L74 `RetryConfig` default `{ attempts: 0 }`, `maxAttempts` 1 | `prepare.ts:20,158-159`; `IRetryPolicy.ts:20-26` | Supported |
| L75 default still waits the backoff, then throws the stashed error | `orchestrator.ts:67-81`; `attempt.ts:134` | Supported (see note) |
| L77-79 linear unless `exponential`; `baseMs` 500; `maxMs` 30_000 | `attempt.ts:56-63` | Supported |
| L81 refresh retry 0 delay, no slot | `attempt.ts:154-159` | Supported |
| L82 refresh budget at most one, needs the hook and `retryAfterRefresh` not 0 | `prepare.ts:160`; `config.ts:90,93` ("Default 1. Set to 0 to disable") | Supported (see note) |
| L86-87 `fetch:start`/`retry`/`complete` with `emit`; silent no-ops without | `prepare.ts:104,107-119`; `orchestrator.ts:39,55,59,75,80` | Supported |
| L89-91 `scope` shapes and defaults | `prepare.ts:105,107-113`; `types.ts:29-38` | Supported |
| L95 thrown values are `AuthError` or `NetworkError`, with L96 exceptions | `prepare.ts:132-156` | Supported |
| L96 raw-error cases, #24 | settled scope (#24) | Supported |
| L98 building the request, the listed causes | listed causes true (probe `getWithBody`; `prepare.ts:22-33,48-88,101`); list incomplete | FAIL (finding 1) |
| L99 body read failure on text or `arrayBuffer` path, dropped connection or mid-body abort | `decode.ts:21,44` (no `try`); probe `bodyCutText`, `bodyCutArrayBuffer`, `abortDuringBody_text` | Supported |
| L100 a throwing `emit` | `prepare.ts:115-119` (unguarded `rawEmit`); probe `emitThrows` | Supported |
| L102 `json` path body read failure gives `parse-failed` | `decode.ts:29-41`; probe `bodyCutJson`, `abortDuringBody_json` | Supported |
| L103 the two type guards | `src/core/auth-fetch/index.ts:26-33` | Supported |
| L104 check auth first | the guards are `instanceof` checks (`index.ts:27,32`) on two separate classes; advice | Supported |
| L106 example (whole file) | `core-handbook-network.ts`; tsc exit 0; `retry` fields match `IRetryPolicy.ts:20-26` | Supported |
| L109 the host stands for your own API | example `:23` `https://api.example.com/...`, the only URL; plainly the reader's own, not fetched | Supported |
| L113 Next: Registration | `src/content/nomercy-player-core/en/handbook/registration.mdx` exists | Supported |

## Notes

- L82: `prepare.ts:160` gives a budget only when `(retryAfterRefresh ?? 1) > 0`, so a negative value also disables it. The page's "only when ... is not `0`" is a necessary condition and stays true; `config.ts:93` documents only 0. No finding.
- L75: the doc comment `IRetryPolicy.ts:17-18` ("The kit checks this before scheduling any delay, so `baseMs` / `maxMs` are irrelevant when `attempts` is 0") disagrees with `orchestrator.ts:67-72`, which sleeps the backoff even when `attempts` is 0. The page follows the code. Comment drift for the package owner; not filed by this review.
- The doc comment `orchestrator.ts:33-34` ("Throws `NetworkError` or `AuthError` only") disagrees with the code for the raw cases above (settled, #24).
