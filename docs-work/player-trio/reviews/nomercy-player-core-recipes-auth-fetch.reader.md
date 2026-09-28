# Reader: /nomercy-player-core/recipes/auth-fetch

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/auth-fetch.mdx

Reviewed-SHA: 6153dd1f0498e28c

## Same-voice comparison

Skipped. There is no approved reference page yet for this section.

## Snippet

The page pulls in `core-recipes-auth-fetch`, which matches `src/examples/core-recipes-auth-fetch.ts`. The sample builds an `AuthConfig` with `bearerToken: () => accessToken`, passes it to `authFetch`, and comments that `Authorization: Bearer …` appears only when that resolver returns a non-empty value. That lines up with the prose in "What `fn authFetch` applies".

## Reader notes (JavaScript background, first visit)

The opening states two entry points: `authFetch` outside a plugin (you supply `AuthConfig` and `signal`) and `this.fetch` inside a plugin (auth and signal come from the player). That split is easy to follow.

The page answers the token question in plain terms before the pipeline details:

- Omit `auth`, or leave `bearerToken` unset: no `Authorization` header.
- `bearerToken` resolves to a non-empty string: `Authorization: Bearer <token>` is set (step 2 in the ordered list).
- Media URLs are separate: set `mediaAuthorization` when a media backend should send auth for a URL; leave it unset and media requests send no token.

So I can tell both when a bearer token goes out on API-style calls and when media calls stay unauthenticated. The example is the "token sent" case; the doc explicitly describes the "token not sent" cases without requiring me to read source.

Other useful material for a first read: required `signal` and owning the `AbortController`, the failure table (401 refresh path vs 403 vs other 4xx vs retryable errors), default `{ attempts: 0 }` for retries, `responseType` and parse errors, and pointers to compose-methods auth and the event bus adapter page.

## Why PASS

Under the rubric for this review (fail only if you cannot tell when a token is sent and when it is not), the page passes. Bearer behavior is conditional on a non-empty resolved `bearerToken`, and media auth is an optional, separate flag with an explicit "no token" default.
