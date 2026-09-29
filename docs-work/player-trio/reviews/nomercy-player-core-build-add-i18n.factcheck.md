# Fact check: /nomercy-player-core/build/add-i18n
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/build/add-i18n.mdx
Reviewed-SHA: e82914203ba6724b

Source: `nomercy-player-core` at `5ed4538` (toolchain.md). Working tree HEAD is `e3d2de5`; the commits between touch only `.github/workflows/*`, so `src/` was read from the working tree. Example: `src/examples/core-build-add-i18n.ts`.

Method: read page, example and sources. Type-checked the example against the package source (scratch tsconfig outside the repo): `tsc` exit 0. Ran the example (esbuild bundle against `nomercy-player-core/dist/index.js`, happy-dom). Output: `[ 'en' ]`, `There is nothing in the queue.`, `Nothing to show yet`, `There is nothing in the queue.`, `Ready to play`, `Nothing to show yet`, which matches every example comment. No URLs on the page or in the example.

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| English `core.*` strings are on the player after `setup` | `lifecycle.ts:406-438` (`_initTranslator` seeds `enTranslations`); run output `player.t('core.state.queueEmpty')` | Supported |
| `enTranslations` is the flat English map | `i18n/en.ts:22` | Supported |
| `defaultTranslations` is `{ en: enTranslations }` | `i18n/en.ts:87-89` | Supported |
| Both importable from the package root | `index.ts:301` | Supported |
| Map covers network, auth, browser policy, media, DRM, queue state, accessibility, chapter titles | `i18n/en.ts:23-71` | Supported |
| Keys use `core.<feature>.<message>` | `i18n/en.ts:14`, keys `:24-71` | Supported |
| Map also holds a few `plugin.<id>.*` strings | `i18n/en.ts:67-68` | Supported |
| `language` and `translations` on `setup` | `lifecycle.ts:412-435` | Supported |
| Your English keys win over matching defaults | `lifecycle.ts:421-425` (`...enTranslations, ...consumerTranslations.en`) | Supported |
| Spread `defaultTranslations` as a base alongside other tags | `i18n/en.ts:74-86` | Supported |
| Static `translations` on a Plugin subclass | `base.ts:239-255` | Supported |
| Keys must already carry `plugin.<id>.` | `plugin-translations.ts:56-60` merges keys as given (no prefixing); `base.ts:946-947` looks up `plugin.<id>.<key>` | Supported |
| Registration merges the map into the live table | `plugin-registration.ts:395-424` | Supported |
| `t` on the plugin prepends `plugin.<id>.` | `base.ts:946-951` | Supported |
| Links: tour/i18n, build/backend-contract | files exist | Supported |
