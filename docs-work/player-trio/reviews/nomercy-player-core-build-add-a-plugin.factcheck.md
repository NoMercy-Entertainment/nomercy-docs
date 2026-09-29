# Fact check: /nomercy-player-core/build/add-a-plugin
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/build/add-a-plugin.mdx
Reviewed-SHA: c9f0dbfdc14099ad

Source: `nomercy-player-core` at `5ed4538` (toolchain.md). Working tree HEAD is `e3d2de5`; `git log 5ed4538..e3d2de5` touches only `.github/workflows/*`, so `src/` is identical and was read from the working tree. Example: `src/examples/core-build-add-a-plugin.ts`.

Method: read page, example and sources. Type-checked the example against the package source (scratch tsconfig outside the repo, `paths` to `nomercy-player-core/src/index.ts`): `tsc` exit 0. Note: the worktree's own `tsconfig.examples.json` resolves the package to `node_modules/.../dist/index.d.ts@2.2.1`, not the source (`tsc --traceResolution`). Ran the example: bundled with esbuild against `nomercy-player-core/dist/index.js` (source needs the Vite translations plugin; the only `src` commit after the dist build is `0ee5e50` "style: fix the 10 lint errors"), under happy-dom. Output: `milestone: 2`, `true`, `{ plays: 2 }`, which matches the example comments. URL: `FILMS_BASE` + `/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8` GET 200.

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 29 | `src/core/plugin/base.ts:166-167`; `src/types/plugin.ts:24`; `grep -rnw description src` (non-test) | The table gives `description` the role "One-line listing and error text". No code in core reads `description`: the only hits are the declaration (`base.ts:167`), the type field (`types/plugin.ts:24`) and built-in plugins setting it. Error messages in `plugin-registration.ts:512-617` use `id` only. The "shown in listings, used in error messages" wording exists only in the doc comment at `base.ts:166`, which the code does not back. | Change the role to what is true, for example "One-line human-readable summary of the plugin (metadata; core does not read it)", or drop the role cell's claim about listings and errors. |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Subclass `Plugin`; static `id` and `description` | `base.ts:153-167` | Supported |
| `version` is a semver string on the class | `base.ts:160-161` (default `'0.0.0'`) | Supported |
| Override `use` to subscribe and start the work | `base.ts:307-312` | Supported |
| Pass the class to `addPlugin`, with options; you do not construct the instance | `plugin-registration.ts:508`, `:596-613` (registration instantiates) | Supported |
| `id`: stable name for events and storage | `base.ts:499` (`plugin:${this.id}:`), `base.ts:304` (`nmplayer-${this.id}-` storage) | Supported |
| `description`: one-line listing and error text | no reader in `src` | FAIL (finding 1) |
| `use`: subscribe and start | `base.ts:307-312` | Supported |
| Options on `addPlugin` configure that install | `plugin-registration.ts:508`, `:597-599` | Supported |
| `on` listens on the player or another plugin by class | `base.ts:427-442` | Supported |
| `emit` fires under `plugin:<id>:` | `base.ts:496-500` | Supported |
| `dispose` only for resources the helpers never tracked | `base.ts:314-326` | Supported |
| `addPlugin` before `setup` queues for the setup pipeline | `plugin-registration.ts:40-46`, `:596-602` | Supported |
| After setup the call still installs, and `ready` waits for it | `plugin-registration.ts:49-59`, `:604-619` | Supported |
| `plugins` on setup is sugar over `addPlugin`; class or `{ plugin, opts }` | `lifecycle.ts:351-368`; `types/plugin.ts:87-89` | Supported |
| Namespaced name `plugin:play-counter:milestone` | `base.ts:499`; run output `milestone: 2` | Supported |
| `getPlugin` returns the live typed instance or `undefined` | `plugin-registration.ts:621-629` | Supported |
| Example: `enabled()` true, `state().runtime` `{ plays: 2 }` | run output | Supported |
| Links: tour/plugin-base, handbook/registration, build/add-i18n | files exist under `src/content/nomercy-player-core/en/` | Supported |
