# Fact check: /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-lifecycle-registry.mdx
Reviewed-SHA: 9953e0dbeaf123f8

Source: `nomercy-player-core/src/adapters/lifecycle-registry/` (`ILifecycleRegistry.ts`, `default.ts`, `index.ts`), `src/core/mixins/plugin-registration.ts`, `src/core/plugin/base.ts`, `src/types/config.ts`, `src/index.ts`, `package.json` `exports`. Source at `e3d2de5`. Example: `src/examples/core-adapter-lifecycle-registry.ts`. Linked page checked: `src/content/nomercy-player-core/en/handbook/timing.mdx`.

Method: read the page, the example and every Covers file. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo; `--traceResolution` shows `.../adapters/lifecycle-registry` resolved to `src/adapters/lifecycle-registry/index.ts`, root to `src/index.ts`): `tsc` exit 0. Ran the example: esbuild bundle with both the root and the subpath aliased to `src/adapters/lifecycle-registry/index.ts` (root `src/index.ts:45` re-exports the same class from `default.ts`; the full root needs the Vite translations plugin), DOM from happy-dom (the package's own dev dependency), global `fetch` replaced by a local stub that never touches the network. Output: `fetch called https://api.example.com/catalog.json aborted at call: false`, `signal aborted`, `true`, `-1`, and no `hint hidden` within 3.5 s. That matches example comments `:51-52` and shows `dispose` aborted the controller and cleared the 3000 ms timeout. Snippet ranges 17-18, 20-23, 25-52 match `snippet-ranges.lock.json` (scratch script: OK). Em dash / en dash on page and example: none. Headings carry no code spans.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 83 | `src/content/nomercy-player-core/en/handbook/timing.mdx:1-20` (title `Timing`, description "Volume is a 0 to 100 slider position ...", Source comment `volume.ts`, `volume-curve.ts`); headings `:15,42,67` are about volume level, curve and mute; map row 48 Covers `volume.ts; volume-curve.ts` | The See also line says Timing "teaches the plugin helpers that record into this registry". The Timing page teaches volume, not `timeout`, `interval`, `frame`, `abortable` or `observe`. A grep over `src/content/nomercy-player-core/en/` for those helpers finds only this page. The claim about the linked page is false. | Replace page line 83 with: "- [Listening](/nomercy-player-core/handbook/listening) teaches `fn listen`, the plugin helper that records DOM listeners into this registry." (Listening's own fact check `nomercy-player-core-handbook-listening.factcheck.md` passed on `listen` recording into `LifecycleRegistry`, `default.ts:65-74`.) |
| 2 | 50 (snippet, example `:37`) | `src/examples/core-adapter-lifecycle-registry.ts:37` | The example calls `fetch('https://api.example.com/catalog.json', ...)`, a placeholder host. Plain GET (query-free): `curl` exit 6, status `000`, the host does not resolve. The page never says this host stands for the reader's own API. | Add one line after the Usage snippet (after page line 51): "The host in the sample stands for your own API." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| The player builds a new `LifecycleRegistry` for every plugin it registers | `plugin-registration.ts:375-382` (`_registerPlugin`, `new LifecycleRegistry()`), passed to `initialize` `:388`, stored `:467` | Supported |
| No `lifecycleRegistry` option in `setup` | No `lifecycle`/`lifecycleRegistry` key in `src/types/config.ts` (grep) | Supported |
| `LifecycleRegistry` from root and subpath; `ILifecycleRegistry` only on the subpath | `src/index.ts:45` (class only); `adapters/lifecycle-registry/index.ts:9-10`; `package.json` exports `./adapters/lifecycle-registry` | Supported |
| `dispose` removes DOM listeners first; then timeouts, intervals, frame loops, observers, controllers | `default.ts:225-270` in that order | Supported |
| `addCleanup` callbacks run last, most recent first | `default.ts:275-287` (reverse loop) | Supported |
| A callback that throws is caught and logged; teardown goes on | `default.ts:281-286`, `logHandlerError` `:295-298` | Supported |
| A throw in `timeout`, `interval`, `frame` body is caught and logged | `default.ts:92-97,116-121,189-194` | Supported |
| After dispose: `addCleanup` runs at once | `default.ts:48-53` | Supported |
| After dispose: `listen` attaches nothing | `default.ts:66-67` | Supported |
| After dispose: `timeout`, `interval` schedule nothing, return `-1` | `default.ts:86-87,111-112`; run output `-1` | Supported |
| After dispose: `observe` records nothing, returns the observer | `default.ts:137-138` | Supported |
| After dispose: `abortable` returns an already aborted controller | `default.ts:151-154` | Supported |
| After dispose: `frame` starts nothing, returns a no-op canceller | `default.ts:175-176` | Supported |
| After dispose: `dispose` returns without a second teardown | `default.ts:221-222` | Supported |
| `frame` starts nothing where `requestAnimationFrame` is missing | `default.ts:177-178` | Supported |
| Interface has exactly the nine members listed | `ILifecycleRegistry.ts:14-24` | Supported |
| `listen` calls `addEventListener` with same arguments, removed on dispose | `default.ts:68,232` | Supported |
| `timeout` / `interval` wrap `setTimeout` / `setInterval`, return the timer ID | `default.ts:88,100,113,124` | Supported |
| `observe` keeps any object with `disconnect()`, returns it for chaining | `default.ts:136-141`; example `:21` | Supported |
| `abortable` returns a new controller that dispose aborts | `default.ts:151,156,262-270`; run output `signal aborted` | Supported |
| `frame` callback gets `(deltaMs, time)` each frame | `default.ts:184-190` | Supported |
| `isDisposed` reports whether dispose ran | `default.ts:291-293`; run output `true` | Supported |
| Interface `frame` returns `void`; class returns `() => void` stopping that one loop | `ILifecycleRegistry.ts:21`; `default.ts:174,205-209` | Supported |
| Code typed against the interface cannot reach the canceller | Return type `void` on `ILifecycleRegistry.ts:21` | Supported |
| The player never takes a registry from you | Only construction site `plugin-registration.ts:382`; no config key | Supported |
| See also: Timing teaches the plugin helpers that record here | `handbook/timing.mdx` is about volume | FAIL (finding 1) |
| See also: Logger is the next catalog entry | `adapter-logger.mdx` exists; map row 65 Next column | Supported |

## Note outside this page

`handbook/timing.mdx` is titled Timing but covers volume, and no page in `nomercy-player-core/en/` now teaches the plugin timer helpers (`base.ts:997,1005,1019,1029`). `src/examples/handbook-timing.ts` covers them but no page includes it (grep over `src/content`: no hit). Not checked further; for the map owner.
