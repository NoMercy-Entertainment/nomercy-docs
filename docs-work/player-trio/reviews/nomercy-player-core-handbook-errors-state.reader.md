# Reader: /nomercy-player-core/handbook/errors-state
Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/errors-state.mdx

Reviewed-SHA: 50b05ce3747bdca1

## Task clarity: escalate a fault, pause its work, or expose a snapshot

The page covers three plugin jobs:

**Escalating faults:** Lines 16-46 explain `fn throw` (halts and throws) vs `fn report` (surfaces but continues). The code example shows both, with realistic payloads: `{ code: 'plugin:spectrum/bad-config', message: '...', suggestion: '...' }`. A developer understands which to call and how to populate the payload.

**Pausing work:** Lines 63-76 explain `fn enable` and `fn disable` with no arguments. "A new plugin starts enabled" (line 66). "Disable may pass a reason" (line 70). The flow is clear: call enable/disable to flip the flag, check `fn enabled` inside handlers to skip work.

**Exposing state:** Lines 78-96 show `fn state` returns a PluginState snapshot, and `fn options` reads/writes plugin options with change notification. Code example on lines 85-90 shows the override pattern for getRuntimeState.

## Payload and type fields

`ThrowPayload` is described (not formally typed, but lines 27-28 list the fields: "Fill `key code`, and optionally `key message`, `key cause`, `key context`, `key suggestion`, `key severity`, and `key id`"). The examples show usage. A developer can construct these without a schema.

## Enable/disable context

Line 73 states "Listeners from `fn on` stay subscribed either way." This refers to event listeners attached with the player's event bus (from the Errors and State chapter assuming the prior handbook page, Building DOM). The note is that disable does not unsubscribe listeners — the plugin remains subscribed but should check `fn enabled` to stop doing work. This is clearly stated for the player-scope, though the mechanics of plugin handlers could be clearer for a reader unfamiliar with the prior tour.

## Scope and automatic fields

Line 13 mentions "They stamp `var scope.kind` as `str plugin` with your id." The word `scope` appears without introduction, but the action is automatic — the developer does not manage it. This is a detail, not a gap in capability.

## Code examples

First block (throw and report) — complete and realistic. Second block (getRuntimeState) — shows the override pattern. Both align with the sections they illustrate.

## Why PASS

A plugin developer can read this page and understand when to throw vs report, how to populate the payload, when to enable/disable, and how to snapshot state and options. The examples are concrete. Automatic behaviors (scope stamping) are noted without requiring the reader to set them up.
