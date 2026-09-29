# Fact check: /nomercy-player-core/build/add-a-plugin
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx
Reviewed-SHA: 3d0049e98dc518c1
Previous verdict: PASS (Reviewed-SHA 412420972b88e283), with a note that page lines 43-46 were a hand-written block; fixes verified: the hand-written `setup` block is now `:::snippet lines="98-102"` (page line 48), and a new `:::snippet lines="36-44"` (page line 40) shows `use`. Both ranges show exactly what the sentence above them says (see the range table). The fresh review of the whole page found no new gap.

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean; same `src` as the pinned `5ed4538`). Example `src/examples/core-build-add-a-plugin.ts` (last changed in `e5fe1a9`; `26055e2` did not touch it).

Method: re-read the whole page; `git diff 26055e2~1 26055e2` for the page; read `src/core/plugin/base.ts:152-170,296-326,420-436,490-500`, `src/core/mixins/plugin-registration.ts:585-630`, `src/core/mixins/lifecycle.ts:155-177,321-328,352-369`, `src/types/plugin.ts:87-89`, `src/types/config.ts:346-349`; `grep -rn "\.description\b"` over `src` (tests excluded): no reader. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo (same `paths` as `tsconfig.examples.json`): `tsc` exit 0. Snippet ranges `36-44` and `98-102` match `src/examples/snippet-ranges.lock.json` (read-only script: "ranges ok=2 bad=0"). Hand-written ts/js blocks on the page: 0. URL: `FILMS_BASE` + `/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8` (the first `films` item, `src/examples/media.ts:30-31,41`), plain GET: `200`. The example was traced, not run.

## Snippet range check

| Page line | Range | Sentence above it | What the range holds | Status |
| --- | --- | --- | --- | --- |
| 40 | `36-44` | L38 "Here `fn use` counts plays with `fn on` and reports every second one with `fn emit`" | the whole `override use()` body: `every = this.opts.everyNPlays ?? 2`; `this.on('play', ...)` increments `plays`; `this.emit('milestone', ...)` when `plays % every === 0`. Starts on the method, ends on its closing brace. "Every second one" holds for the default `2` shown on line 37 and for the `everyNPlays: 2` the page registers at line 98. | Matches |
| 48 | `98-102` | L45 "Call `fn addPlugin` before `fn setup`" | `player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });` then the full `player.setup({ logLevel, baseUrl })` call, ending on its closing `});`. No other statement. | Matches |

## Findings

None.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L19-20 subclass `Plugin`; static `id` and `description` | `core/plugin/base.ts:152,158,167` | Supported |
| L21 `version` is a semver string on the class | `base.ts:160-161` | Supported |
| L22 override `use` to subscribe and start | `base.ts:307-312` | Supported |
| L23-24 pass the class to `addPlugin` with options; you do not construct it | `plugin-registration.ts:591-617` (takes `PluginClass`, `opts`; `_registerPlugin` builds it) | Supported |
| L28 `id` names events and storage | `base.ts:304` (`nmplayer-${this.id}-`), `base.ts:499` (`plugin:${this.id}:`) | Supported |
| L29 `description` is for people; core does not read it | declared `base.ts:167`; no `.description` reader in `src` (grep, tests excluded) | Supported |
| L31 options on `addPlugin` configure that install | `plugin-registration.ts:593-596,610` | Supported |
| L33 protected helpers | `base.ts:427-431,497-498` (`protected on`, `protected emit`) | Supported |
| L34 `on` on the player or another plugin by class | `base.ts:427-436` (two overloads, `resolveListenerArgs`) | Supported |
| L35 `emit` fires under `plugin:<id>:` | `base.ts:498-500` | Supported |
| L36 `dispose` only for resources the helpers never tracked | `base.ts:314-326` | Supported |
| L38-40 range `36-44` | see range table; tsc exit 0 | Supported |
| L45 `addPlugin` before `setup` queues for the setup pipeline | `plugin-registration.ts:591-597`; `lifecycle.ts:908` (`pluginsRegistering` stage) | Supported |
| L46 after setup it still installs, and `ready` waits | `plugin-registration.ts:599-617`; `lifecycle.ts:177,327` | Supported |
| L48 range `98-102` | see range table | Supported |
| L51 `plugins` on setup is sugar over `addPlugin` | `lifecycle.ts:360-369` | Supported |
| L52 a class or `{ plugin, opts }` | `types/plugin.ts:87-89`; `types/config.ts:346` | Supported |
| L56-57 consumer listens for `plugin:play-counter:milestone` | `base.ts:499`; example `:30,107` | Supported |
| L58 `getPlugin` returns the typed instance or `undefined` | `plugin-registration.ts:620-628` | Supported |
| L60 full example (a `build/` page may show a complete program) | example `:1-118`; tsc exit 0 | Supported |
| Links: `tour/plugin-base`, `handbook/registration`, `build/add-i18n` | the three `.mdx` files exist under `src/content/nomercy-player-core/en/` | Supported |

## Notes

- `base.ts:166` comments that `description` is "used in error messages"; no code in `src` reads it. The page follows the code. Comment drift for the package owner; not filed by this review.
