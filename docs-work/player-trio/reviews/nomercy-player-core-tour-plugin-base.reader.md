# Reader: /nomercy-player-core/tour/plugin-base

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/tour/plugin-base.mdx

Reviewed-SHA: fbcf1d074a214d85

## Same-voice comparison (queue + introduction)

The opening definition matches [What is Player Core](/nomercy-player-core/introduction) verbatim in spirit: “A plugin is extra behavior you add to a player, such as counting each play,” then one more sentence on when to write one. That aligns the tour with the intro’s plugin sentence before this page goes into mechanics.

Like [The Queue](/nomercy-player-core/tour/queue), the page assumes a composed `player`, teaches in short sections with the same typography (`fn`, `key`, `str`, `cls`), pairs prose with a small inline block, and places the full runnable snippet immediately before **Next**. Queue opens with when to use the feature and what not to expect; plugin-base opens with what a plugin is and the three-step shape (subclass, register, lifecycle)—same direct, behavior-first rhythm.

## Snippet

`core-tour-plugin-base.ts` (via `:::snippet{file="core-tour-plugin-base" live="false"}` before **Next**). It defines `PlayCounterPlugin` extending `Plugin` with static `id` and `description`, overrides `use()` to subscribe to `play`, registers with `player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 })` **before** `setup` / `await ready()`, reads `getPlugin`, logs `enabled()` and `state().runtime`, listens for `plugin:play-counter:milestone`, then `removePlugin` and `dispose`. The MDX does not show the tour player boilerplate (`composeMixins`, mount div, etc.); judgment below is for the MDX page only, with the snippet as the embedded example.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already have a composed class from Quickstart and compose-methods.

The first paragraph defines **plugin** in plain language before the page asks me to subclass `cls Plugin` or call `fn addPlugin`. The H1 says “Plugins,” but the very next prose block is the definition, so I am not left guessing what the word means.

**How to add a plugin** is explicit:

1. Subclass `cls Plugin` and set static `key id` and `key description`.
2. Pass that **class** (not an instance) to `fn addPlugin`, with options when needed.
3. The player constructs the instance and wires teardown; I override `fn use` to start behavior.

The inline block `player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });` is enough to copy the registration call. The snippet reinforces the class shape and `use()` subscription pattern without contradicting the prose.

**Added, enabled, disposed** walks installation (`fn addPlugin` → construct → `fn use` → `str plugin:installed`), default enabled state, `fn enable` / `fn disable` and their events, `fn removePlugin` / player dispose → `fn dispose` / `str plugin:disposed`, and introspection via `fn getPlugin` and `fn state`. I know how to register, turn behavior on or off without unloading, and tear down.

**Next** points forward to the queue tour and names one reason a plugin might listen there—after plugin is defined on this page.

Doc typography matches queue and other tour pages. The prose stays on player behavior; it does not describe the doc site or this page as an artifact.

## Friction (does not fail the rubric)

- Call order (`addPlugin` before `setup` / `ready`) appears only in the snippet, not in the MDX bullets; the page still states clearly **what** to pass to `addPlugin` and that the player installs it.
- `fn enable` / `fn disable` are named but not shown in the inline block; lifecycle prose covers them.
- Typed plugin events (`plugin:play-counter:milestone`) are illustrated only in the snippet listener, not in the MDX event list style used on the queue page.

## Why PASS

I can add a plugin by subclassing `Plugin`, setting static `id` and `description`, overriding `use`, and calling `player.addPlugin(PluginClass, opts)` without constructing the instance myself. **Plugin** is defined in the first prose under the heading before the page relies on the term for actions. Under the stated fail conditions (must know how to add a plugin; must not use **plugin** before it is explained), this passes.
