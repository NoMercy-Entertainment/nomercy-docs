# Reader: /nomercy-player-core/handbook/listening

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/listening.mdx

Reviewed-SHA: 6ae38fde2576c285

## Same-voice comparison (approved: tour/queue)

Like [The Queue](/nomercy-player-core/tour/queue), the page opens with when to use this surface and what it is not: plugin helpers that tear down on dispose, with raw player `fn on` / `fn once` / `fn off` / `fn emit` deferred to [The Event Bus](/nomercy-player-core/tour/event-bus). Sections stay short, behavior-first, with the same typography (`fn`, `key`, `str`, `cls`) and one or two inline blocks before the runnable snippet and a single **Next** link.

Queue ties list edits to `fn on` on the first `fn queue` call; listening ties every subscription helper to dispose-driven cleanup and warns against bypassing it with `this.player.on`. Both pages name the API on the instance I already have (player vs plugin `this`) without describing the doc site.

## Snippet

`core-handbook-listening.ts` (via `:::snippet{file="core-handbook-listening" live="false"}` before **Next**). It defines `BeatPlugin` and `BeatLightPlugin`, wires `use()` with class-form `on(BeatPlugin, 'beat')`, player `on('item')`, `once('play')`, `listen(document, 'visibilitychange')`, and early `off('time', this.onTime)` after `on('ended')`, registers both plugins, loads the queue, selects an item, then `await player.dispose()`. `BeatPlugin` uses `hasListeners(BeatPlugin, 'beat')` before `this.emit('beat', …)` on `time`. The MDX does not show `composeMixins`, mount boilerplate, or the tour player class; judgment below is for the MDX page only, with the snippet reinforcing dispose at the end.

## Reader notes (JavaScript background, player already composed)

I read the page in order without opening player source, assuming I already subclass `cls Plugin`, override `fn use`, and know player dispose runs plugin teardown from earlier tour material.

The opening states the contract: inside a plugin, use helpers that clean up on dispose, and use the event-bus tour for the raw player bus.

**DOM events** explains `fn listen` as the registered stand-in for `addEventListener` on `cls EventTarget`, including options, and that dispose removes each entry. Raw `addEventListener` is called out as outside the registry. After dispose, further `fn listen` calls do nothing.

**Player and other plugins** covers the two forms of `fn on` and `fn once` (player string names such as `str item` / `str play`, or another plugin by class → `plugin:<id>:<event>` on the player bus). The table aligns `fn off` and `fn hasListeners` with the same forms. The critical line for teardown is explicit: both `fn on` and `fn once` hit the player bus, then record cleanup that runs `fn off` on dispose, including `fn once` that never fired. The anti-pattern `this.player.on` is named as skipping registration.

**Stop early** explains matching `fn off` forms and references; dispose remains the default path.

**Check before you work** describes `fn hasListeners` for skipping expensive work when nobody subscribed. The inline block uses `BeatPlugin` in the class form already shown in the prior section’s `on(BeatPlugin, 'beat', …)` example.

**Priority order** mentions static `key priority`, `fn enabledPlugins`, and clarifies that sort order is not handler order on one bus event.

Doc typography matches queue and other tour pages. The prose stays on plugin listening behavior; it does not describe the doc site or this page as an artifact.

## Friction (does not fail the rubric)

`this.emit` in the **Check before you work** block is not defined on this page (event-bus tour centers on player `fn emit`). `fn enabledPlugins` is described by return value but not call site or link to handbook registration. `key priority` is given a default without pointing at the static field on the plugin class (the snippet shows `priority = 5`). `dispose` is named as the cleanup trigger without re-stating player vs plugin dispose from plugin-base. The **Priority order** section is adjacent context, not required to subscribe safely.

## Why PASS

I can subscribe from a plugin with `this.listen`, `this.on`, and `this.once`, rely on dispose to run the registered `fn off` / DOM removals without hand-unsubscribing, and avoid `this.player.on` which skips that registry. Under the stated fail conditions (every name I need for that path must be explained; I must see how subscribe ties to dispose cleanup), this passes.
