# Reader review: /nomercy-player-core/build/add-a-plugin

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx

Reviewed-SHA: 3d0049e98dc518c1

## Four criteria checks

**1. Every term explained at or before first use on this page or prerequisite pages**

Prerequisite page from map: /nomercy-player-core/handbook/timing (covers plugin timer helpers).

The page links to /nomercy-player-core/tour/plugin-base and /nomercy-player-core/handbook/registration but does NOT link to the timing handbook, which is listed as a prerequisite in the map.

Terms used on this page:
- `fn on`, `fn emit`, `fn dispose` introduced in "Inside `fn use`, use the protected helpers" section.
- These are described with one-line explanations.

The rendered snippet shows a full example with these helpers in use.

**2. Reader can do the task from page alone**

Stated task: "Ship a Plugin subclass with static id and description, override use to subscribe, then register it before setup."

Steps on page:
- Subclass `cls Plugin`
- Set static `key id` and `key description`
- Override `fn use` to subscribe and start the work
- Pass class to `fn addPlugin` with options
- Call `fn addPlugin` before `fn setup`

The rendered snippet shows `override use()` with a working example using `this.on()` and `this.emit()`. A reader can follow these steps and see a concrete example.

**3. Code examples don't lean on missing content**

The snippet shows a complete use() implementation. The code is from a compiled snippet (live="false"), so it is fully rendered. No hidden gaps.

**4. No sentence needs second read**

The page is direct. All instructions are clear.

## Findings

- **[Link check] Missing prerequisite link**: The map lists /nomercy-player-core/handbook/timing as a prerequisite page, but the rendered page only links to /nomercy-player-core/tour/plugin-base and /nomercy-player-core/handbook/registration. The timing page covers the plugin timer helpers that a reader may need when implementing use(). The text says "Registration covers timing, checks, and removal" but this does not link the reader to the handbook/timing page explicitly. A reader may not know to read handbook/timing first → Add an explicit link to /nomercy-player-core/handbook/timing at the top or in the opening section.

## Why FAIL

The previous finding about missing code examples is resolved (the snippet renders and shows use() in action). The prerequisite link issue remains: the page assumes handbook/timing is read first (per the map) but does not link to it directly. The text mentions "Registration covers timing" which is confusing—it suggests the timing content is in Registration, but the map says Timing is a separate prerequisite page. A reader following links may not reach handbook/timing before implementing use().
