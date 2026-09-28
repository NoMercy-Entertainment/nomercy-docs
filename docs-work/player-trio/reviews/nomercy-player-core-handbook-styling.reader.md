# Reader: /nomercy-player-core/handbook/styling

Verdict: PASS

Reviewed: src/content/nomercy-player-core/en/handbook/styling.mdx

Reviewed-SHA: 9c0245792f023f2c

## Same-voice comparison

Compared to [The Queue](/nomercy-player-core/tour/queue) (`tour/queue.mdx`).

Both open with a tight scope statement, then walk one concern per `##` section in the order a integrator would hit it. Typography matches (`fn`, `key`, `str`, `cls`), with short imperative sentences and concrete outcomes (what gets written, what is skipped, what stays in the document). Styling adds a state-class table and a CSS selector example where Queue uses event names in prose; both end with a non-live snippet and a **Next** link. Styling assumes a `cls Plugin` subclass rather than a bare `player`, which fits the handbook lane.

## Snippet

`core-handbook-styling.ts` (via `:::snippet{file="core-handbook-styling" live="false"}` before **Next**). It defines `BadgePlugin` with `appendInlineStyles` (including a second call with the same `styleId` to show dedupe), `mount('root')`, and `addClasses` on the mounted node; constructs a minimal composed player, runs `setup` and `ready`, logs `nomercyplayer` on the container and the injected style element id, patches and reads `subtitleStyle`, then `dispose` while noting the style node remains. It does not demonstrate `appendStyles` with a URL or `removeClasses`. Judgment below is for the MDX page only.

## Reader notes (JavaScript background, plugin pattern familiar)

I read the page in order without opening player source, assuming I already know how to register a plugin from earlier handbook or tour material.

The opening states the package ships no stylesheet: CSS enters through plugin helpers, and the player puts state classes on its container. That sets expectations before API names.

**Put CSS in the document** tells me where to hook (`fn use` on a `cls Plugin` subclass) and the two write paths: `fn appendStyles` for a linked URL and `fn appendInlineStyles` for CSS text, both targeting `document.head` with a `key styleId` I choose. URL resolution against `key moduleUrl` on the class versus `document.baseURI` is spelled out for relative links. The inline TypeScript block shows `appendInlineStyles` with a class rule. Missing `document` is a no-op.

**One id wins** explains dedupe by `styleId`, first call wins, stable plugin-specific ids, and that nodes are not removed on dispose so later registrations skip re-write. I know how to avoid clobbering another plugin’s sheet and why a hot reload might not replace CSS.

**Classes on the container** names the base `nomercyplayer` class after `fn setup` and lists every emitted state class in a table (`playing`, `paused`, `stopped`, `ended`, `loading`, `buffering`, `active`, `inactive`, `muted`, `fullscreen`, `pip`, `theater`) with short meanings. Buffering and loading class timing (`waiting`, `stalled`, `canplay`, advancing `time`, first `loading` vs post-`ready`) is enough to write selectors that track playback and activity. The CSS example ties `nomercyplayer`, `inactive`, and a plugin mount class together.

**Names on your elements** covers `fn addClasses`, `fn removeClasses`, and `fn mount`, including the `nmplayer-<id>-<name>` pattern so rules stay unique per plugin.

**Subtitle style values** separates read (`fn subtitleStyle()` returns `cls SubtitleStyle`) from patch (partial merge and `str subtitleStyle` with the merged object). The small TypeScript block matches that split.

I can ship CSS from a plugin in `use`, target container state with the listed classes on `.nomercyplayer`, and style mounted nodes via the mount naming scheme without reading source.

## Friction (does not fail the rubric)

The page does not show `appendStyles` with a URL in an inline block; only prose describes it. `key moduleUrl` is named as something the class sets but not where on `cls Plugin` it lives (static field is implied). `cls SubtitleStyle` fields beyond `fontSize` in the example are not listed here. Media event names (`waiting`, `stalled`, `canplay`) and lifecycle `ready` / `loading` phase wording assume prior lifecycle or transport reading. `fn removeClasses` is named but not shown in the MDX inline examples.

## Why PASS

Every API the page introduces is tied to behavior, dedupe rules, or the container class table, and the CSS path (`appendInlineStyles` or `appendStyles` in `use` with a `styleId`) is explicit. I know the full set of container state classes and the base `nomercyplayer` marker. The page does not talk about itself as documentation. Under the stated fail conditions (unexplained names, or not knowing how to add CSS or which container classes exist), this passes.
