# Code findings

These are places a written lead disagreed with the source. The source is what the pages state. They are not player bugs to file, unless a later page shows a name that promises something else.

## Queue selection event

Lead in `3-player-trio-facts.md`: `current` is the one event for a new queue item.

Source: `nomercy-player-core/src/core/mixins/queue.ts` emits `item`. `current` is the `beforeMutation` method name, and an old event name that warns the caller toward `item`.

## Time after the cursor moves

Lead: after `item`, `time()` and `duration()` still belong to the outgoing item until `mediaReady`.

Source: on cursor change the queue mixin zeroes internal time and duration before it emits `item`. The cursor still moves before the media element switches, but an `item` listener does not observe the outgoing end position.

## Activity hide while buffering

Lead in `activity.ts`: paused, stopped, buffering, and ended keep the controls up.

Source: `_maybeHide` returns early only when `playState` is not `playing`. Buffering does not change that state, and there is no `ended` play state. The lifecycle page states the code.

## Setup after dispose

Lead in the `setup` JSDoc: after dispose, `setup` throws `core:player/disposed`.

Source: `_guardSetup` checks `_setupCalled` first and never clears it. A second `setup` after `dispose` throws `core:lifecycle/already-setup`. The disposed branch runs only when the phase is already disposed and setup never set the flag.

## IFetch has no consumer

Lead in `nomercy-player-core/src/adapters/fetch/IFetch.ts:10-13` and `default.ts:12-14`: the `authFetch` orchestrator uses `IFetch` and `defaultFetch` unless the consumer injects a transport.

Source: nothing in `src/` outside `adapters/fetch/` imports either name. `src/core/auth-fetch/attempt.ts:111` calls the global `fetch(request)`. `BasePlayerConfig` in `src/types/config.ts` has no fetch option. The page states that the type never reaches the player.

## IIdGenerator cannot be injected

Lead in `nomercy-player-core/src/adapters/id-generator/IIdGenerator.ts:9-13`: tests inject a sequential counter.

Source: `src/core/mixins/media-tracks.ts:34` imports `defaultIdGenerator` directly and line 753 calls it. `BasePlayerConfig` has no ID generator option. The page states there is no slot.

## Default wake lock is a new controller on every read

Lead in `nomercy-player-core/src/core/mixins/lifecycle.ts:553-560`: `'always'` releases at dispose, and `'auto'` releases on pause, stop, end and dispose.

Source: `src/adapters/platform/browser.ts:359-366` builds a new controller on every read of `browserPlatform.wakeLock`, and the sentinel lives in that controller (`browser.ts:64`). `_wireWakeLockPolicy` reads `platform.wakeLock` again for each `acquire`, `isHeld` and `release` (`lifecycle.ts:566-588`). With the default bundle, `isHeld()` on a fresh controller is always false, so `'auto'` never releases and acquires again on each play, and the `'always'` release at dispose acts on a controller that holds nothing. Found by reading, not run. A bundle made with a spread holds one controller per field and does not hit this.

## Resolve-URL warning only reaches a consumer logger

Lead in `nomercy-player-core/src/core/mixins/auth.ts:146-151`: warn when a URL resolves to a relative path.

Source: the warning goes to `this.options?.logger?.warn`. Without `setup({ logger })` the root logger built at `lifecycle.ts:621` never sees it, so the warning is silent at every `logLevel`.

## Logger child does not share later sinks

Lead in `nomercy-player-core/src/adapters/logger/default.ts:101-102`: children share the parent's registered sinks.

Source: `child()` copies the sink array and the level at creation (`default.ts:105-106`). A sink added to the parent afterwards does not reach existing children, and plugin loggers are children made at registration. Also, `default.ts:122` writes to the console only while no sink exists, so the first `addSink` stops console output, while the class comment at `default.ts:21-22` reads as if sinks add to the console.

## Preload asset fields are not applied

Lead in `nomercy-player-core/src/adapters/preload/default.ts:68` and line 83 on `PreloadAsset`: the player's auth pipeline is applied, `category` drives the `urlResolver` and auth headers, and `mode` defaults to `'metadata'`.

Source: `_runPreload` in `src/core/mixins/lifecycle.ts:1035-1038` sends `new Request(asset.url, { method: 'HEAD', mode: 'no-cors' })` to the global `fetch` and reads neither `category` nor `mode`. The page states what the code sends.

## preloadLeadSeconds 0 does not disable preloading

Lead in `nomercy-player-core/src/types/config.ts:405-409`: set to `0` to disable preloading.

Source: `lifecycle.ts:807-808` builds `new DefaultPreloadStrategy(0)`, and `shouldPreload` returns `currentTime >= duration - 0`, which is true at the end of every item that has a next item. `DefaultPreloadStrategy.cancel()` also aborts `_abortController`, which nothing ever assigns.

## MediaElementBackend volume does not read back what was written

Source: `nomercy-player-core/src/adapters/media-element/MediaElementBackend.ts` `volume(value)` writes `perceptualGain(clamped)`, the square (`src/core/volume-curve.ts:63-67`), and `volume()` returns `element.volume`. `volume(0.5)` then `volume()` returns `0.25`. The page states the round trip.

## Two defaults do not declare their interface

Source: `nomercy-player-core/src/adapters/lifecycle-registry/default.ts` declares `class LifecycleRegistry` with no `implements ILifecycleRegistry`, and its `frame()` returns `() => void` where `ILifecycleRegistry.ts` declares `void`. Code typed against the interface cannot stop one frame loop. `MediaList` in `src/adapters/media-list/default.ts` also has no `implements IMediaList`, and adds `setShuffleStrategy`.
