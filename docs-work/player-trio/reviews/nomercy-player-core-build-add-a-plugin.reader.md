# Reader review: /nomercy-player-core/build/add-a-plugin

Verdict: FAIL

Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx

Reviewed-SHA: 412420972b88e283

## Four criteria checks

**1. Every term explained at or before first use on this page or prerequisite pages**

Prerequisite pages from map: /nomercy-player-core/handbook/timing (covers plugin timer helpers). 
The page links to /nomercy-player-core/tour/plugin-base for subclassing and lifecycle, and /nomercy-player-core/handbook/registration for timing, checks, and removal.

Terms used:
- `fn on`, `fn emit`, `fn dispose` introduced in "Inside `fn use`, use the protected helpers" section.
- `fn on` is described as "listens on the player or on another plugin by class"
- `fn emit` is described as "fires under `plugin:<id>:`"  
- `fn dispose` is described as "only for resources those helpers never tracked"

The page does not show what these methods look like or how to call them. The prerequisite handbook/listening page is assumed to teach listening patterns.

**2. Reader can do the task from page alone**

Stated task from description: "Ship a Plugin subclass with static id and description, override use to subscribe, then register it before setup."

Steps given on page:
- Subclass `cls Plugin`
- Set static `key id` and `key description`
- Override `fn use` to subscribe and start the work
- Pass class to `fn addPlugin` with options
- Call `fn addPlugin` before `fn setup`

What is missing: The page says "Inside `fn use`, use the protected helpers" but never shows a minimal working `use()` implementation. The sentence "Returning true from `fn canParse` is a commitment" does not apply to this page - it appears to be copied from custom-cue-parser.

A reader can structure a plugin class but cannot write the body of `use()` without reading prerequisite pages or the snippet file.

**3. Code examples don't lean on missing content**

The inline example shows:
```ts
player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });
player.setup({ logLevel: 'info', baseUrl: FILMS_BASE });
```

This fragment is self-contained. The snippet file `core-build-add-a-plugin` would need inspection to confirm no scaffolding, but the directive `live="false"` suggests it's a full example program.

**4. No sentence needs second read**

Most sentences are direct. "Inside `fn use`, use the protected helpers" is concise but vague.

## Findings

- [Concept] The page says "Inside `fn use`, use the protected helpers" with brief explanations of `fn on`, `fn emit`, `fn dispose`, but never shows what these look like when called. A reader cannot write a working use() override → Add a minimal example showing one helper in use().

- [Link check] Page assumes reader has read /nomercy-player-core/handbook/timing (prerequisite), but that page is referenced only in the map, not linked. Reader does not know to read it first → Add a prerequisite link at the top explaining what must be read first.
