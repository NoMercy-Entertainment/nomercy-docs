# Fact check: /nomercy-player-core/recipes/custom-url-resolver
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/recipes/custom-url-resolver.mdx
Reviewed-SHA: 85b992a5c6fdbea8

Source: `nomercy-player-core` at `5ed4538` (toolchain.md). Working tree HEAD is `e3d2de5`; the commits between touch only `.github/workflows/*`, so `src/` was read from the working tree. Example: `src/examples/core-recipes-custom-url-resolver.ts`.

Method: read page, example and sources. Type-checked the example against the package source (scratch tsconfig outside the repo): `tsc` exit 0. Ran the example (esbuild bundle against `nomercy-player-core/dist/index.js`, happy-dom, with a `url-resolver-demo` div standing in for the docs host mount). Output: `sig-from-your-backend`, `null`, `undefined`, which matches every example comment.

URLs: `https://api.example.com/media`, `.../media/films/sintel/playlist.m3u8`, `.../art/poster.jpg`. Plain GET: no response (curl code `000`, reserved host). Page line 29 says the host stands for the reader's own backend, and the example only resolves these strings and never fetches them, so the value is plainly the reader's own. Not a finding.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| `IUrlResolver` is for consumers that need a finished URL string, not a header | `adapters/url-resolver/IUrlResolver.ts` doc on `IUrlResolver` ("final form to hand to a non-`fetch()` consumer") | Supported |
| `urlResolver` on `setup` replaces the built-in resolve for later `resolveUrl` calls | `types/config.ts:258`; `lifecycle.ts:377`; `auth.ts:158-177` | Supported |
| `category` on the context names the consumer | `IUrlResolver.ts` `UrlResolverContext.category`, `URL_CATEGORY`; `auth.ts:117,168` | Supported |
| `defaultResolve` for the categories you leave alone | `IUrlResolver.ts` `defaultResolve`; `auth.ts:130-156,170` | Supported |
| `resolveUrl` returns a `ResolvedUrl` with `href`, `searchParams`, `ext` | `IUrlResolver.ts` `ResolvedUrl`; `auth.ts:116` | Supported |
| `ext` survives query strings and fragments | `core/resolved-url.ts:19,46` (`extractExt(pathname)`); doc on `ResolvedUrl.ext` | Supported |
| `relative` is true when the input stayed relative with no base | `resolved-url.ts:46-58,73-80` | Supported |
| `urlResolver()` returns the custom resolver or `undefined` | `auth.ts:192-195`; run output | Supported |
| Pass a function to replace, `undefined` to revert; applies on the next `resolveUrl` | `auth.ts:188-197` | Supported |
| Example: media signed, poster unsigned | run output `sig-from-your-backend`, `null` | Supported |
| Links: recipes/auth-fetch, recipes/swap-an-adapter (setup-time replace of a port) | files exist; `swap-an-adapter.mdx:3,12-14` | Supported |
