# Fact check: /nomercy-player-core/plugins-adapters/adapter-lifecycle-registry
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-lifecycle-registry.mdx
Reviewed-SHA: 8cdb78625e5d4a9f
Previous verdict: FAIL; fixes verified: finding 1 (See also no longer says the old volume-only Timing page teaches the helpers; line 85 now points to Listening for `listen`, and line 86, added in `d40ea36`, points to the rewritten Timing page, which now teaches `timeout`, `interval`, `frame`, `abortable`), finding 2 (placeholder host named as the reader's own API, page line 53)

Source: `nomercy-player-core/src` at `e3d2de5`. Example `src/examples/core-adapter-lifecycle-registry.ts` (unchanged since the previous review). Page history: `e029a04` (fixes), then `d40ea36` (the Timing see-also line).

Method: re-read the whole page. Type-checked the example against the package SOURCE (scratch tsconfig outside the repo): `tsc` exit 0. Snippet ranges `17-18`, `20-23`, `25-52` match `snippet-ranges.lock.json` and the example (scratch script: 3 of 3 OK). The previous run output (`true`, `-1`, abort seen) is not re-run; `default.ts` is unchanged at `e3d2de5`. Read the linked pages `handbook/listening.mdx` and `handbook/timing.mdx`.

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L14 player builds a new `LifecycleRegistry` for every plugin | `src/core/mixins/plugin-registration.ts:382` | Supported |
| L15 no `lifecycleRegistry` option | no such key in `src/types/config.ts` (grep) | Supported |
| L20-21 class from root and subpath; interface only on subpath | `src/index.ts:45`; `src/adapters/lifecycle-registry/index.ts:9-10` | Supported |
| L25-27 dispose order: listeners, then timeouts, intervals, frames, observers, controllers; cleanups last, newest first | `src/adapters/lifecycle-registry/default.ts:225-287` | Supported |
| L29-30 throws caught and logged | `default.ts:281-286` and the timer/frame wrappers (unchanged from previous review) | Supported |
| Table after dispose (7 rows) | `default.ts:48-53` (addCleanup runs at once), `:86-87` (timeout `-1`), `:137-138` (observe), `:151-154` (abortable pre-aborted), `:175-176` (frame no-op), `:221-222` (dispose), listen/interval as in previous review | Supported |
| L44 `frame` starts nothing without `requestAnimationFrame` | `default.ts:177-178` | Supported |
| L53 the host stands for your own API | host only in example line 37 | Supported (fix verified) |
| Interface table: 9 members | `ILifecycleRegistry.ts:15-23` | Supported |
| L71-73 interface `frame` returns `void`; class returns a canceller | `ILifecycleRegistry.ts:21`; `default.ts:174` | Supported |
| L78 the player never takes a registry from you | single construction site `plugin-registration.ts:382`; no config key | Supported |
| L85 Listening teaches `listen`, which records DOM listeners into this registry | `handbook/listening.mdx:14-23`; `src/core/plugin/base.ts:989` (`this.lifecycle.listen`) | Supported (fix verified) |
| L86 Timing teaches `timeout`, `interval`, `frame`, `abortable`, which record into this registry | `handbook/timing.mdx:17-67` (one section each); `base.ts:998,1006,1020,1030` delegate to `this.lifecycle.*` | Supported |
| L87 Logger is the next catalog entry | `adapter-logger.mdx` exists | Supported |
