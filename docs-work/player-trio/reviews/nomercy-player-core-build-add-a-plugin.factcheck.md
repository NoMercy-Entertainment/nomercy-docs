# Fact check: /nomercy-player-core/build/add-a-plugin
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx
Reviewed-SHA: 412420972b88e283
Previous verdict: FAIL; fixes verified: finding 1 (description role, page line 29)

Source: nomercy-player-core `src/` at `e3d2de5` (equals the pinned `5ed4538` for `src/`). Method common to this batch: read the previous verdict, the fix diff (`git show b7190ca`), the whole page, its example and the source. `npm run check:examples` (published dist 2.2.1): `Autoplay OK: 127 example files checked.`, exit 0. All 7 example files type-checked against the package source with a scratch tsconfig outside the repo: `tsc` exit 0 (negative control: an added type error gave `TS2322`, exit 2). Example URL `FILMS_BASE` + `/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8`: plain GET 200.

## Fix verification

| # | Page line | Now says | Source | Status |
| --- | --- | --- | --- | --- |
| 1 | 29 | "A one-line summary for people; core does not read it" | `grep -rnw description src` (non-test): only the declaration `core/plugin/base.ts:167`, the type field `types/plugin.ts:24`, and built-in plugins that set it; `grep '\.description\b'` over `src`: no reader | Verified fixed |

## Claim table (fresh)

| Claim | Supported by | Status |
| --- | --- | --- |
| Static `id`, `description`; `version` semver on the class | `core/plugin/base.ts:157-167` | Supported |
| Override `use` to subscribe and start | `base.ts:307-312` | Supported |
| You pass the class, not an instance, with options | `core/mixins/plugin-registration.ts:591-617` | Supported |
| `id`: name for events and storage | `base.ts:304` (`nmplayer-${id}-`), `base.ts:499` (`plugin:${id}:`) | Supported |
| `on` on player or another plugin by class | `base.ts:427-436` | Supported |
| `emit` fires under `plugin:<id>:` | `base.ts:496-500` | Supported |
| `dispose` only for resources the helpers never tracked | `base.ts:314-326` | Supported |
| `addPlugin` before `setup` queues for the setup pipeline | `plugin-registration.ts:591-597` | Supported |
| After setup it still installs; `ready` waits | `plugin-registration.ts:599-617`; `core/mixins/lifecycle.ts:177,327-328` | Supported |
| `plugins` on setup is sugar; class or `{ plugin, opts }` | `lifecycle.ts:360-367`; `types/plugin.ts:87-89` | Supported |
| Code block page 44-45 | example `core-build-add-a-plugin.ts:98-102` (same calls; `setup` object reflowed to one line) | Supported |
| `plugin:play-counter:milestone`; `getPlugin` returns instance or `undefined` | `base.ts:499`; `plugin-registration.ts:626-628` | Supported |
| Links: tour/plugin-base, handbook/registration, build/add-i18n | files exist | Supported |

## New findings

None.

## Notes (not failures)

- Page 43-46 is a hand-written code block, not a `:::snippet lines=` range from the compiled example. The docs rule says short blocks come from the example file (here `core-build-add-a-plugin.ts:98-102`). Not a fact error; the content is true.
