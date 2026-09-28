# Reader: /nomercy-player-core/handbook/errors-state

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/errors-state.mdx

Reviewed-SHA: 993d15b2ae56df1b

## Same-voice comparison (queue)

Reference: `src/content/nomercy-player-core/en/tour/queue.mdx`. Both pages open with when to use the API, keep sections short and behavior-first, and use the same typography (`fn`, `key`, `str`, `cls`). Read vs write paths are split where it matters (`fn options` with no argument vs partial merge). Side effects are named as event strings with payload shape. A non-live snippet sits before **Next**; **Next** links to the next handbook page with one reason to read it.

This page matches that rhythm and does not meta-describe the doc site.

## Snippet

`core-handbook-errors-state.ts` (via `:::snippet{file="core-handbook-errors-state" live="false"}` before **Next**). Judgment below is for the MDX page; the snippet is supplementary end-to-end example (`SpectrumPlugin`, `onError`, `throw`/`report`, listeners, enable/options/state).

## Reader notes (JavaScript background, plugin author)

Read in order without opening player source, assuming I already subclass `Plugin` and register with `addPlugin`.

Opening: use these helpers to escalate, pause work, or expose a snapshot; faults are stamped with plugin scope and my id; catching typed `PlayerError` is on the [Errors](/nomercy-player-core/tour/errors) tour.

### How a plugin reports a failure (rubric)

| Goal | Call | Outcome |
| --- | --- | --- |
| Stop the current operation | `this.throw({ code, ... })` | Builds `PlayerError`, surfaces the fault, throws. Default severity `error`. |
| Continue after a fault | `this.report({ code, ... })` | Surfaces the fault and returns. Default severity `warning`. |

Both use a payload: required `code`; optional `message`, `cause`, `context`, `suggestion`, `severity`, `id`. Inline examples use `plugin:spectrum/...` codes.

Player emits the severity channel (`error`, `warning`, `info`, `fatal`); for `error` and `warning` also `plugin:error` or `plugin:warning` with `{ error, severity, scope, timestamp }`. Raw `throw new Error(...)` skips stamp and events.

### Runtime snapshot sample

**Snapshot and options** includes a small inline class `PlayCounter extends Plugin` overriding `getRuntimeState()` to return `{ framesRendered: this.framesRendered }`. That shows where `key runtime` on `PluginState` comes from without opening the snippet.

### Recovery, enablement, state, options, logger

**Recover with `onError`**: map fault `code` to `ignore`, `disable`, `retry-once`, or `fallback` (table says what runs). Map runs after surfacing; I own optional `retryLastOperation` / `activateFallback` bodies.

**Enable and disable**: `enabled`, `enable`, `disable`, events, listeners stay subscribed, check `enabled` in handlers, `dep-failed:<id>` disable reason.

**Snapshot and options**: `PluginState` fields; `getRuntimeState` default `{}`; frozen shallow `options()` read; partial merge write with events; hand-mutating `this.opts` skips events.

**Logger and storage**: id-prefixed child logger and storage before `use`, following player adapters.

## Friction (does not fail rubric)

- `PluginRecoveryAction` is a type label; values come from the Action column.
- `onError` placement as a static map on the class is shown in the snippet, not spelled in prose.
- `bare and id-namespaced` for events is handbook shorthand; exact names are inferable from registration-style wording elsewhere.

## Why PASS

I can report failures with `this.throw` or `this.report`, use the documented payload fields, and listen on the documented channels. The inline `PlayCounter` sample explains overriding runtime snapshot on a `Plugin` subclass. No name required for reporting or recovery is left undefined under the stated fail conditions.
