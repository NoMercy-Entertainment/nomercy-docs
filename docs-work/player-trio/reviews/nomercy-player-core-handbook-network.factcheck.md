# Fact check: /nomercy-player-core/handbook/network
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
Reviewed-SHA: 043a0fc223926e75

Delta review of the fix for finding 1 of the previous verdict (FAIL, Reviewed-SHA `bdbf4ae4189e8026`): the list of raw-error causes omitted a request `body` that is a `ReadableStream`.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/core/auth-fetch/types.ts`, `prepare.ts`, `attempt.ts`. Method: `git -C C:/Projects/worktrees/docs-batch-05 diff HEAD -- src/content/nomercy-player-core/en/handbook/network.mdx` (one added line, page line 102); checked against the source; the whole "Narrow a failure" section re-read (lines 93-113). The probe was not re-run in this review: the cited source lines are unchanged since the previous review (same package commit `e3d2de5`), and its verbatim output (`postStreamBodyNoDuplex | ... TypeError ... RequestInit: duplex option is required when sending a body.`) is carried below. Not run in a browser (not checked).

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 102 | A `key body` that is a `cls ReadableStream` leaves `authFetch` as the raw error | `types.ts:40` (`body?: BodyInit`, which admits a `ReadableStream`); `prepare.ts:73-79` (the `RequestInit` sets no `duplex`); `prepare.ts:81` (`new Request(url, init)`, no `try`); `attempt.ts:106` (`buildRequest` runs before the `try` at `:109`); probe `postStreamBodyNoDuplex` in the carried review | Supported (finding 1 fixed; the bullet is the exact fix the previous review asked for) |

## Section re-read

- Lines 96-104 now list seven raw causes; the other six are unchanged and were supported in the carried review (their page lines moved by one after line 101: the old L102 body-read line is now L103, the old L103 `emit` line is now L104).
- `key body` names the `body` key of the options object (`types.ts:40`); `cls ReadableStream` names a class. No positional parameter is tagged `key`.

## Findings

None.

## Carried from the previous review

> Verdict: FAIL
> Reviewed: src/content/nomercy-player-core/en/handbook/network.mdx
> Reviewed-SHA: bdbf4ae4189e8026

Previous verdict: FAIL (Reviewed-SHA 4b9f85310985e857), one finding: the request-building bullet missed an invalid header name or value (including `bearerToken`) and a URL with a user name and password. Fix verified: page lines 98-101 now split that bullet into four; line 98 names the URL with credentials and line 99 names the invalid header name or value, including the `bearerToken` value. Both re-proved by a probe run in this review (output below). The fresh review found one more request-building cause the list omits (finding 1).

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean): `src/core/auth-fetch/attempt.ts`, `decode.ts`, `index.ts`, `orchestrator.ts`, `prepare.ts`, `types.ts`; `src/types/config.ts:85-94`; `src/adapters/retry-policy/IRetryPolicy.ts:15-26`; `src/core/mixins/loading.ts:20,317`; `src/index.ts:218`. Example `src/examples/core-handbook-network.ts` (whole file, no `lines=`). Issue #24 read with `gh issue view 24`.

Method: read the whole page, `git diff 26055e2 df0abbe` for it (only lines 98-101 changed), and the six auth-fetch files in full. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (paths to `nomercy-player-core/src/index.ts`): `tsc exit 0`. Bundled `src/core/auth-fetch/index.ts` from source with the docs worktree's `esbuild` into the scratchpad and ran it on Node v22.14.0 against a local `node:http` server on 127.0.0.1. Output, verbatim:

```
urlMalformed | auth: false | net: false | name: TypeError | code: undefined | msg: Failed to parse URL from http://[bad
urlWithCredentials | auth: false | net: false | name: TypeError | code: undefined | msg: Request cannot be constructed from a URL that includes credentials: http://u:p@127.0.0.1:59576/
headerValueNewline | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "a b" is an invalid header value.
headerNameSpace | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "bad name" is an invalid header name.
authHeaderValueNewline | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "a b" is an invalid header value.
bearerNonLatin1 | auth: false | net: false | name: TypeError | code: undefined | msg: Cannot convert argument to a ByteString because the character at index 10 has a value of 8364 which is greater than 255.
bearerNewline | auth: false | net: false | name: TypeError | code: undefined | msg: Headers.set: "Bearer a b" is an invalid header value.
bearerFnThrows | auth: false | net: false | name: Error | code: undefined | msg: token fn failed
transformUrlThrows | auth: false | net: false | name: Error | code: undefined | msg: transform failed
headerFnThrows | auth: false | net: false | name: Error | code: undefined | msg: header fn failed
signRequestThrows | auth: false | net: false | name: Error | code: undefined | msg: sign failed
getWithBody | auth: false | net: false | name: TypeError | code: undefined | msg: Request with GET/HEAD method cannot have body.
headWithBody | auth: false | net: false | name: TypeError | code: undefined | msg: Request with GET/HEAD method cannot have body.
postStreamBodyNoDuplex | auth: false | net: false | name: TypeError | code: undefined | msg: RequestInit: duplex option is required when sending a body.
emitThrows | auth: false | net: false | name: Error | code: undefined | msg: listener failed
plainOk | value: ok
```

(The newline in the header value is printed as a space by the probe's message join. `postStreamBodyNoDuplex`: `method: 'POST'`, `body: new ReadableStream(...)`.)

### Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 96-103 | `types.ts:40` (`body?: BodyInit`, which includes `ReadableStream`); `prepare.ts:73-79` (the `RequestInit` sets no `duplex`); `prepare.ts:81` (`new Request(url, init)`, no `try`); `attempt.ts:106` (`buildRequest` before the `try` at `:109`) | The list of raw-error causes omits a request body that is a `ReadableStream`. `buildRequest` never sets `duplex`, and the Fetch standard's `Request` constructor throws a `TypeError` for a stream body without `duplex`, so every `authFetch` call with a stream `body` leaves raw. Proved on Node (probe `postStreamBodyNoDuplex`); not run in a browser (not checked). | Add a bullet after line 100: "- A `key body` that is a `cls ReadableStream`." The cause is the same class as #24 (request building before the `try`); add it to #24 when it is next updated (settled scope of #24 is not re-raised). |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 auth headers, typed decoding, bounded retry | `prepare.ts:48-88`; `decode.ts:19-65`; `orchestrator.ts:36-82` | Supported |
| L13 playlist URL loads share the pipeline | `src/core/mixins/loading.ts:20,317` | Supported |
| L14 recipe link | `src/content/nomercy-player-core/en/recipes/auth-fetch.mdx` exists | Supported |
| L16 three names on the package root | `src/index.ts:218` | Supported |
| L17-18 `url`, required `signal`, optional `auth` (all object keys; `key` tags correct) | `types.ts:18-20` | Supported |
| L22 one `Request` per pass, raced against optional `timeoutMs` | `attempt.ts:106,110-113`; `orchestrator.ts:46-47` | Supported |
| L23-24 no default timeout; omitted or `<= 0` means only the signal stops it | `attempt.ts:21-24`; `types.ts:47` | Supported |
| L26 thrown fetch with aborted signal gives `core:network/aborted` | `attempt.ts:115-121` | Supported |
| L27 timeout or offline throw becomes a retry and stashes a terminal error | `attempt.ts:123-136` | Supported |
| L29 401 refreshes once with hook and budget, retries without a slot | `attempt.ts:141-159` | Supported |
| L30 401 without budget gives `core:auth/unauthenticated` | `attempt.ts:162-165` | Supported |
| L31 403 gives `core:auth/forbidden` at once | `attempt.ts:168-173` | Supported |
| L33 other 4xx throw a matching network code, no retry | `attempt.ts:67-75,175-180` | Supported |
| L34 5xx retries and stashes the server code | `attempt.ts:77-85,182-191` | Supported |
| L35 success goes to the decoder | `attempt.ts:193` | Supported |
| L37 "Most failures" end with a table code | qualified; exceptions at L96-105 | Supported |
| L41-43 refresh-failed, unauthenticated, forbidden (No) | `attempt.ts:147-151,162-173` | Supported |
| L44-48 404, 408, 410, 429, other 4xx (No) | `attempt.ts:67-75,175-180` | Supported |
| L49-53 500, 502, 503, 504, other 5xx (while attempts remain) | `attempt.ts:77-85,182-191`; `orchestrator.ts:46,67-69,80-81` | Supported |
| L54-55 timeout, offline (while attempts remain) | `attempt.ts:123-136` | Supported |
| L56 aborted before the response or during a retry wait (No) | `attempt.ts:115-121`; `orchestrator.ts:71-77` | Supported |
| L57 parse-failed (No) | `decode.ts:36-40,53-57` | Supported |
| L59 a retried failure throws its code when attempts run out | `orchestrator.ts:80-81` | Supported |
| L63-67 `responseType` paths; text default; `parser` only on text; `json` casts; `arrayBuffer` buffer | `types.ts:58-62`; `decode.ts:19-65` | Supported |
| L69 thrown `parser` or invalid JSON gives `parse-failed` | `decode.ts:36-40,53-57` | Supported |
| L73 loop until value, throw, or budget gone | `orchestrator.ts:46-81` | Supported |
| L74 `RetryConfig` default `{ attempts: 0 }`, `maxAttempts` 1 | `prepare.ts:20,158-159`; `IRetryPolicy.ts:20-26` | Supported |
| L75 default still waits the backoff, then throws the stashed error | `orchestrator.ts:67-81`; `attempt.ts:134` | Supported (doc comment `IRetryPolicy.ts:17-18` disagrees with the code; page follows the code) |
| L77-79 linear unless `exponential`; `baseMs` 500; `maxMs` 30_000 | `attempt.ts:56-63` | Supported |
| L81 refresh retry 0 delay, no slot | `attempt.ts:154-159` | Supported |
| L82 refresh budget at most one, needs the hook and `retryAfterRefresh` not 0 | `prepare.ts:160`; `config.ts:90,93` | Supported |
| L86-87 `fetch:start`/`retry`/`complete` with `emit`; silent no-ops without | `prepare.ts:104,107-119`; `orchestrator.ts:39,55,59,75,80` | Supported |
| L89-91 `scope` shapes and defaults | `prepare.ts:105,107-113`; `types.ts:29-38` | Supported |
| L95 thrown values are `AuthError` or `NetworkError`, with the listed exceptions | `prepare.ts:132-156` | Supported |
| L96 raw-error cases, link #24 | issue #24 exists and covers request-building raws; settled scope | Supported |
| L98 malformed URL, or one with a user name and password | `prepare.ts:81`; probes `urlMalformed`, `urlWithCredentials` | Supported (fix verified) |
| L99 invalid header name or value, including the `bearerToken` value | `prepare.ts:55,62,69`; probes `headerValueNewline`, `headerNameSpace`, `authHeaderValueNewline`, `bearerNonLatin1`, `bearerNewline` | Supported (fix verified) |
| L100 `GET` or `HEAD` with a `body` | `prepare.ts:74,78,81`; probes `getWithBody`, `headWithBody` | Supported |
| L101 throwing `transformUrl`, `bearerToken`, header or `signRequest` callback | `prepare.ts:22-33,53,60,83,101`; probes `transformUrlThrows`, `bearerFnThrows`, `headerFnThrows`, `signRequestThrows` | Supported |
| L96-103 list as the set of raw causes | omits a `ReadableStream` body (probe `postStreamBodyNoDuplex`) | FAIL (finding 1) |
| L102 body read failure on text or `arrayBuffer` path | `decode.ts:21,44` (no `try`); previous review probes `bodyCutText`, `bodyCutArrayBuffer`, `abortDuringBody_text`; not re-run this review, code unchanged | Supported |
| L103 a throwing `emit` | `prepare.ts:115-119`; probe `emitThrows` | Supported |
| L105 `json` path body read failure gives `parse-failed` | `decode.ts:29-41` (`response.json()` inside the `try`) | Supported |
| L106 the two type guards | `index.ts:26-33` | Supported |
| L107 check auth first | advice; guards are separate `instanceof` checks (`index.ts:27,32`) | Supported |
| L109 example (whole file) | `core-handbook-network.ts`; `tsc exit 0`; `retry` fields match `IRetryPolicy.ts:20-26` | Supported |
| L112 the host stands for your own API | example `:23` `https://api.example.com/...`, the only URL; plainly the reader's own, not fetched | Supported |
| L116 Next: Registration | `handbook/registration.mdx` exists | Supported |

### Notes

- `key` tag audit: every `key` on the page (`url`, `signal`, `auth`, `timeoutMs`, `responseType`, `parser`, `maxAttempts`, `backoff`, `baseMs`, `maxMs`, `refreshOnUnauthenticated`, `retryAfterRefresh`, `emit`, `scope`, `pluginId`, `bearerToken`, `body`, `transformUrl`, `signRequest`) names an object key (`types.ts:17-62`, `config.ts`, `IRetryPolicy.ts:20-26`, `prepare.ts:159` for the `maxAttempts` context field). No positional parameter is tagged `key`.
- The doc comment `orchestrator.ts:33-34` ("Throws `NetworkError` or `AuthError` only") disagrees with the code for the raw cases (settled, #24).
