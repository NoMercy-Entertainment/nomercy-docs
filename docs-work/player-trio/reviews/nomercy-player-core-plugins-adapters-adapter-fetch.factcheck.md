# Fact check: /nomercy-player-core/plugins-adapters/adapter-fetch
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-fetch.mdx
Reviewed-SHA: 5f5299a80f8a8c0a
Previous verdict: PASS (Reviewed-SHA 3deb420b67d21a6e, equal to the page at `7f53a5d`); fixes verified: none open. Scope of this review: only the sentences added since `7f53a5d` (`git diff 7f53a5d -- <page>`: one line added, page line 46). The rest of the page stands on the previous PASS.

Source: nomercy-player-core `src` at `e3d2de5`. Example unchanged since `7f53a5d`; type check of the example against the package SOURCE (scratch tsconfig outside the repo) exit 0; snippet ranges "3 OK, 0 bad" against the lock.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L46 `RequestInit` and `Response` are the standard fetch types from the DOM lib, not defined by this package | `src/adapters/fetch/IFetch.ts:22-24` (`(url: string, opts?: RequestInit): Promise<Response>`); the file has no `import` (`grep -n import` empty), so both names resolve to globals; package `tsconfig.json:4` `"lib": ["ES2022", "DOM", "DOM.Iterable", "WebWorker"]` | Supported |
