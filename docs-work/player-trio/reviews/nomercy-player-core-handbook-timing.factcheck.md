# Fact check: /nomercy-player-core/handbook/timing
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/handbook/timing.mdx
Reviewed-SHA: 8dd526dfadf37de5

Full review. The page was rewritten (commit `d40ea36`): it now teaches the plugin timer helpers; the volume content the previous review (SHA `e116ad7f1b714ace`, PASS) checked has left this page. No claim of the previous review applies, so nothing settled is carried.

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/core/plugin/base.ts`, `src/adapters/lifecycle-registry/default.ts`, `src/core/mixins/plugin-registration.ts`, `src/core/plugin/fetch.ts`. Example `src/examples/core-handbook-timers.ts`. Tag meanings: `src/lib/mdx/rehype.ts:110` (`var` = a value), `:126-128` (`key` = an object key).

Method: read the whole page, the whole example, and every source line cited. Snippet ranges checked against `src/examples/snippet-ranges.lock.json:210-229` (first and last lines match). Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (paths to `nomercy-player-core/src/index.ts`; `--listFiles` shows 153 files from `packages/player-web/nomercy-player-core/src` and 0 from `node_modules/@nomercy-entertainment`): `EXIT 0`. Not run in a browser (runtime behaviour traced in the source, not checked live). The example has no URL.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 46 | `base.ts:1019` (`frame(fn: (deltaMs: number, time: number) => void)`); `default.ts:174,190` (`fn(delta, now)`); `rehype.ts:126-128` (`key` = an object key), `rehype.ts:110` (`var` = a value) | `deltaMs` is the first positional parameter of the frame callback, not an object key. The page tags it `key deltaMs`, which renders it as an object property. | Line 46: change `` `key deltaMs` `` to `` `var deltaMs` ``. |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12-13 helpers clean up on dispose; each records its timer, loop, signal, or observer in the lifecycle registry | `base.ts:997-1031` (each delegates to `this.lifecycle`); `default.ts:28-34,99,123,139,156,203` | Supported |
| L14 the player builds one registry for every plugin it registers | `plugin-registration.ts:382` (`new LifecycleRegistry()` per registration), `:388` (`instance.initialize(..., lifecycle)`) | Supported |
| L15 dispose cancels everything in it | `default.ts:220-288` | Supported |
| L19 `timeout` takes a callback and a delay in ms, like `setTimeout` | `base.ts:997`; `default.ts:85,88` | Supported |
| L20 dispose cancels it if it has not fired | `default.ts:240-241`; fired ids leave the set at `:89` | Supported |
| L21 a throwing callback is caught and logged to the console | `default.ts:92-97,295-298` (`console.error`) | Supported |
| L23-25 returns a numeric handle; `clearTimeout` on it cancels one timer early | `base.ts:997`; `default.ts:100` (`Number(id)`); example `:34,40` | Supported |
| L27 snippet lines 31-40 | example `:31-40`; lock `:210-213` | Supported |
| L32 `interval` takes a callback and a period in ms, like `setInterval` | `base.ts:1005`; `default.ts:110,113` | Supported |
| L33 dispose cancels it | `default.ts:243-244` | Supported |
| L34 a throwing tick is caught and logged; the next tick still runs | `default.ts:116-121` (catch inside the tick; `setInterval` keeps running) | Supported |
| L36 snippet lines 42-45 | example `:42-45`; lock `:214-217` | Supported |
| L39-40 returns a numeric handle; `clearInterval` stops that interval early | `default.ts:124`; `base.ts:1005` | Supported |
| L44-45 `frame` runs every animation frame; callback receives `(deltaMs, time)` | `base.ts:1019`; `default.ts:184-199` (re-requests each frame) | Supported |
| L46 `deltaMs` is the ms since the previous frame | `default.ts:187-188` | Supported as a fact; tag wrong (finding 1) |
| L47 the first delta counts from the `frame` call | `default.ts:181` (`lastTime` set at call time) | Supported |
| L49-50 returns a stop function for that one loop; other loops keep running; dispose still stops every loop | `default.ts:180,205-209` (per-loop `cancelled` flag), `:246-250` | Supported |
| L51 a throwing frame is caught and logged; the loop goes on | `default.ts:189-199` | Supported |
| L53 snippet lines 47-53 | example `:47-53`; lock `:218-221` | Supported |
| L56 without `requestAnimationFrame` (Node, server rendering) `frame` starts nothing | `default.ts:177-178` | Supported |
| L60-62 `abortable` returns a new `AbortController`; dispose aborts it; pass its `signal` (`key signal` is a property of `AbortController`; tag correct) | `base.ts:1029-1030`; `default.ts:150-157,262-270` | Supported |
| L64 the plugin's own `fetch` already does this for each request | `base.ts:713-719` (`pluginFetch`); `fetch.ts:61,70` (`host.lifecycle.abortable()`, `signal: ctrl.signal`) | Supported |
| L67 snippet lines 55-63 | example `:55-63`; lock `:222-225`; `navigator.locks.request(name, { signal }, cb)` type-checks (`EXIT 0`) | Supported |
| L72 observers go through `this.lifecycle.observe`, the registry | `base.ts:261` (`protected lifecycle`); `default.ts:136` | Supported |
| L73 the plugin has no `observe` helper of its own | `grep -n "observe(" base.ts`: no method (no output) | Supported |
| L74 takes `ResizeObserver`, `MutationObserver`, `IntersectionObserver`, or any object with `disconnect` | `default.ts:16,127-136` (`O extends DisconnectableObserver`) | Supported |
| L76 dispose disconnects it | `default.ts:252-260` | Supported |
| L77 returns the observer unchanged, so the call chains into its own `observe` | `default.ts:131-132,139-140`; example `:67-70` | Supported |
| L79 snippet lines 65-70 | example `:65-70`; lock `:226-229` | Supported |
| L87-93 table: one helper per kind of work; each row cleans up on dispose | `default.ts:240-270` | Supported |
| L95-96 raw `setTimeout`, `setInterval`, `requestAnimationFrame` are not in the registry; dispose will not cancel them | only the registry methods add to its sets (`default.ts:99,123,203`) | Supported |
| L100 the player calls the plugin's `dispose` first, then the registry's | `plugin-registration.ts:303-304,330` (`instance.dispose()`, then `lifecycle.dispose()`); `base.ts:321-323` | Supported |
| L101-102 helpers' work is still live inside your own `dispose`; you do not cancel it there | same lines | Supported |
| L104 a helper called after dispose schedules nothing and returns a safe value | `default.ts:86-87` (`-1`), `:111-112` (`-1`), `:137-138` (observer returned, not recorded), `:152-155` (pre-aborted controller), `:175-176` (no-op stop) | Supported |
| L105 the ILifecycleRegistry page lists what each call returns then | `plugins-adapters/adapter-lifecycle-registry.mdx:35-43` (a "Call after dispose" table) | Supported |
| L109 Next: Add a plugin | `build/add-a-plugin.mdx` exists in the collection (not re-reviewed here) | Supported (path) |

## Notes

- `key` tag audit: `key deltaMs` (L46) is a positional parameter (finding 1). `key signal` (L62) is a property of `AbortController`; correct. No other `key` tag on the page.
- Example comments (`:31`, `:39`, `:42`, `:47-48`, `:55-57`, `:65-66`, `:81`, `:83`) agree with `default.ts`.
