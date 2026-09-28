# Reader: /nomercy-player-core/recipes/auth-fetch

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/recipes/auth-fetch.mdx

Reviewed-SHA: d76c9e1f22ccbea6

Same-voice comparison skipped (not requested for this pass).

## Snippet

The page embeds `core-recipes-auth-fetch`, which matches `src/examples/core-recipes-auth-fetch.ts`. The sample passes an `AuthConfig` with `bearerToken: () => accessToken` into `authFetch` and states in a comment that `Authorization: Bearer` is set only when that resolver returns a non-empty value. That matches the ordered pipeline in "What `fn authFetch` applies".

## Reader notes (JavaScript background, first visit)

The intro separates two call sites: `authFetch` for your own code (you pass `AuthConfig` and `signal`) and `this.fetch` inside a plugin (player auth, abort signal, and scope are already wired). Import path and required `AbortController` ownership are stated up front.

The page answers when a token is sent before diving into retries:

- No `auth`, or `bearerToken` unset: no `Authorization` header.
- `bearerToken` resolves to a non-empty string: `Authorization: Bearer <token>` on step 2 of the pipeline.
- Media URLs are a different switch: set `mediaAuthorization` when media should carry auth; leave it unset and media requests send no token.

I can tell both the API-style bearer case and the default "no token on media" case without reading package source. The snippet shows the "token sent" path; the prose covers the "token not sent" paths explicitly.

Other first-visit material that landed: optional `AuthConfig` fields and merge order (`transformUrl`, bearer, `headers`, `signRequest`), required `signal`, the failure table (401 refresh once when configured, hard stop on 403, other 4xx, retryable 5xx/network with default `{ attempts: 0 }`), redacted `auth()` snapshot versus raw config for `this.fetch`, `responseType` table, and links to compose-methods auth and the event bus page.

## Why PASS

The rubric fails only if a newcomer cannot tell when a token is sent. Bearer attachment is conditional on a non-empty resolved `bearerToken`, and media auth is optional with an explicit no-token default. PASS.
