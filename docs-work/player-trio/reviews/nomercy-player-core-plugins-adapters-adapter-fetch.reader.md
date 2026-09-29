# Reader: /nomercy-player-core/plugins-adapters/adapter-fetch

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-fetch.mdx

Reviewed-SHA: 3deb420b67d21a6e

## Findings

### Unexplained types in interface table

The Interface section introduces `RequestInit` and `Response` without explanation:

> | Part | Type |
> |---|---|
> | `key opts` | `RequestInit`, optional |
> | Return | `Promise<Response>` |

**Cost to reader:** A reader new to the Fetch API or TypeScript DOM types cannot tell what `RequestInit` is. The table defines the contract for IFetch, so every type in it must be explained or linked. `RequestInit` is the standard TypeScript type for fetch options (headers, body, method, etc.), and `Response` is the standard Fetch API response type. Neither is explained on this page or on the assumed page (adapter-event-bus). 

**Fix:** Add a note after the table clarifying that `RequestInit` and `Response` are standard Fetch API types, with a link or reference to MDN or TypeScript docs, or add a brief inline explanation in the table's `Type` column.

