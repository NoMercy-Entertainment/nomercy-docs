# Slice: core-i18n
Files given: 79
Files opened: 79

## Files opened
- nomercy-player-core/src/i18n/af.ts
- nomercy-player-core/src/i18n/ar.ts
- nomercy-player-core/src/i18n/bg.ts
- nomercy-player-core/src/i18n/bn.ts
- nomercy-player-core/src/i18n/ca.ts
- nomercy-player-core/src/i18n/cs.ts
- nomercy-player-core/src/i18n/cy.ts
- nomercy-player-core/src/i18n/da.ts
- nomercy-player-core/src/i18n/de.ts
- nomercy-player-core/src/i18n/el.ts
- nomercy-player-core/src/i18n/en.ts
- nomercy-player-core/src/i18n/es.ts
- nomercy-player-core/src/i18n/et.ts
- nomercy-player-core/src/i18n/eu.ts
- nomercy-player-core/src/i18n/fa.ts
- nomercy-player-core/src/i18n/fi.ts
- nomercy-player-core/src/i18n/fr.ts
- nomercy-player-core/src/i18n/ga.ts
- nomercy-player-core/src/i18n/gl.ts
- nomercy-player-core/src/i18n/gu.ts
- nomercy-player-core/src/i18n/he.ts
- nomercy-player-core/src/i18n/hi.ts
- nomercy-player-core/src/i18n/hr.ts
- nomercy-player-core/src/i18n/hu.ts
- nomercy-player-core/src/i18n/hy.ts
- nomercy-player-core/src/i18n/id.ts
- nomercy-player-core/src/i18n/is.ts
- nomercy-player-core/src/i18n/it.ts
- nomercy-player-core/src/i18n/ja.ts
- nomercy-player-core/src/i18n/ka.ts
- nomercy-player-core/src/i18n/kk.ts
- nomercy-player-core/src/i18n/km.ts
- nomercy-player-core/src/i18n/kn.ts
- nomercy-player-core/src/i18n/ko.ts
- nomercy-player-core/src/i18n/ku.ts
- nomercy-player-core/src/i18n/ky.ts
- nomercy-player-core/src/i18n/lo.ts
- nomercy-player-core/src/i18n/lt.ts
- nomercy-player-core/src/i18n/lv.ts
- nomercy-player-core/src/i18n/mk.ts
- nomercy-player-core/src/i18n/ml.ts
- nomercy-player-core/src/i18n/mn.ts
- nomercy-player-core/src/i18n/mr.ts
- nomercy-player-core/src/i18n/ms.ts
- nomercy-player-core/src/i18n/my.ts
- nomercy-player-core/src/i18n/nb.ts
- nomercy-player-core/src/i18n/ne.ts
- nomercy-player-core/src/i18n/nl.ts
- nomercy-player-core/src/i18n/nn.ts
- nomercy-player-core/src/i18n/no.ts
- nomercy-player-core/src/i18n/oc.ts
- nomercy-player-core/src/i18n/pa.ts
- nomercy-player-core/src/i18n/pl.ts
- nomercy-player-core/src/i18n/pt-BR.ts
- nomercy-player-core/src/i18n/pt.ts
- nomercy-player-core/src/i18n/ro.ts
- nomercy-player-core/src/i18n/ru.ts
- nomercy-player-core/src/i18n/si.ts
- nomercy-player-core/src/i18n/sk.ts
- nomercy-player-core/src/i18n/sl.ts
- nomercy-player-core/src/i18n/sq.ts
- nomercy-player-core/src/i18n/sr.ts
- nomercy-player-core/src/i18n/sv.ts
- nomercy-player-core/src/i18n/sw.ts
- nomercy-player-core/src/i18n/ta.ts
- nomercy-player-core/src/i18n/te.ts
- nomercy-player-core/src/i18n/tg.ts
- nomercy-player-core/src/i18n/th.ts
- nomercy-player-core/src/i18n/tl.ts
- nomercy-player-core/src/i18n/tr.ts
- nomercy-player-core/src/i18n/uk.ts
- nomercy-player-core/src/i18n/ur.ts
- nomercy-player-core/src/i18n/uz.ts
- nomercy-player-core/src/i18n/vi.ts
- nomercy-player-core/src/i18n/xh.ts
- nomercy-player-core/src/i18n/yo.ts
- nomercy-player-core/src/i18n/zh-TW.ts
- nomercy-player-core/src/i18n/zh.ts
- nomercy-player-core/src/i18n/zu.ts

## Public surface

| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `enTranslations` | `export const enTranslations: Record<string, string> = {` | `nomercy-player-core/src/i18n/en.ts:22` |
| `defaultTranslations` | `export const defaultTranslations = {` | `nomercy-player-core/src/i18n/en.ts:87` |
| default export | `export default enTranslations;` | `nomercy-player-core/src/i18n/en.ts:91` |
| `<locale>Translations` (78 non-English locale files) | `export const <locale>Translations: Record<string, string> = {` and `export default <locale>Translations;` on the same file | pattern `nomercy-player-core/src/i18n/<tag>.ts:23,72` (line 75 for `nl.ts` default export) |

Export name differs from `enTranslations` on every non-English file (expected). Hyphenated tags use camelCase binding names: `ptBrTranslations` (`nomercy-player-core/src/i18n/pt-BR.ts:23`), `zhTwTranslations` (`nomercy-player-core/src/i18n/zh-TW.ts:23`). Only `en.ts` defines `defaultTranslations`; package entry re-exports `defaultTranslations` and `enTranslations` from `./i18n/en` and named `nlTranslations` only (`nomercy-player-core/src/index.ts:301-302`). The other 77 locale bindings are not re-exported from the package root; they load through `kitTranslations` (`nomercy-player-core/src/kit-translations.ts:24`).

Key set vs `en.ts` (32 keys): `nl.ts` matches. Every other locale file (77 tags) is missing `'core.chapters.untitled'` (31 keys each). No locale file adds keys beyond the English set.

## Literal defaults

| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `defaultTranslations` | `{ en: enTranslations, } as const` (single `en` entry) | consumers spreading into `setup({ translations })`; `_initTranslator` merges consumer `en` over `enTranslations` | `nomercy-player-core/src/i18n/en.ts:87-89`, `nomercy-player-core/src/core/mixins/lifecycle.ts:421-425` |
| `core.network.offline` | `'No internet connection.'` | `DefaultTranslator.t` on seeded/fallback `en` bundle | `nomercy-player-core/src/i18n/en.ts:24` |
| `core.network.timeout` | `'The connection timed out. Trying again…'` | same | `nomercy-player-core/src/i18n/en.ts:25` |
| `core.network.serverError` | `'The server is having issues. Try again in a moment.'` | same | `nomercy-player-core/src/i18n/en.ts:26` |
| `core.network.notFound` | `'That content could not be found.'` | same | `nomercy-player-core/src/i18n/en.ts:27` |
| `core.network.rateLimited` | `'Too many requests. Please slow down.'` | same | `nomercy-player-core/src/i18n/en.ts:28` |
| `core.auth.unauthenticated` | `'Sign in again to refresh your session.'` | same | `nomercy-player-core/src/i18n/en.ts:31` |
| `core.auth.forbidden` | `'Your account doesn\'t have access to this content.'` | same | `nomercy-player-core/src/i18n/en.ts:32` |
| `core.auth.refreshFailed` | `'Could not refresh your session. Please sign in again.'` | same | `nomercy-player-core/src/i18n/en.ts:33` |
| `core.policy.autoplayBlocked` | `'Tap or click anywhere to start playback.'` | same | `nomercy-player-core/src/i18n/en.ts:36` |
| `core.policy.userGestureRequired` | `'Tap to enable audio.'` | same | `nomercy-player-core/src/i18n/en.ts:37` |
| `core.policy.pipDenied` | `'Picture-in-picture is not allowed in this context.'` | same | `nomercy-player-core/src/i18n/en.ts:38` |
| `core.policy.fullscreenDenied` | `'Fullscreen is not allowed in this context.'` | same | `nomercy-player-core/src/i18n/en.ts:39` |
| `core.policy.wakeLockDenied` | `'The screen may dim during playback.'` | same | `nomercy-player-core/src/i18n/en.ts:40` |
| `core.media.unsupported` | `'This format is not supported by your browser.'` | same | `nomercy-player-core/src/i18n/en.ts:43` |
| `core.media.decodeFailed` | `'Playback failed  - switching to the next available source.'` | same | `nomercy-player-core/src/i18n/en.ts:44` |
| `core.media.allDecodeFailed` | `'No playable source is available for this content.'` | same | `nomercy-player-core/src/i18n/en.ts:45` |
| `core.drm.outputProtection` | `'Your display does not meet the protection requirements for this content.'` | same | `nomercy-player-core/src/i18n/en.ts:48` |
| `core.drm.licenseFailed` | `'Could not get a license for this content.'` | same | `nomercy-player-core/src/i18n/en.ts:49` |
| `core.drm.keySystemUnsupported` | `'Your browser does not support the required protection system.'` | same | `nomercy-player-core/src/i18n/en.ts:50` |
| `core.state.queueEmpty` | `'There is nothing in the queue.'` | same | `nomercy-player-core/src/i18n/en.ts:53` |
| `core.state.notReady` | `'The player is not ready yet.'` | same | `nomercy-player-core/src/i18n/en.ts:54` |
| `core.a11y.playing` | `'Playing {title}'` | same | `nomercy-player-core/src/i18n/en.ts:57` |
| `core.a11y.paused` | `'Paused'` | same | `nomercy-player-core/src/i18n/en.ts:58` |
| `core.a11y.stopped` | `'Stopped'` | same | `nomercy-player-core/src/i18n/en.ts:59` |
| `core.a11y.seeking` | `'Seeking to {time}'` | same | `nomercy-player-core/src/i18n/en.ts:60` |
| `core.a11y.trackChange` | `'Now playing {title}'` | same | `nomercy-player-core/src/i18n/en.ts:61` |
| `core.a11y.error` | `'An error occurred during playback'` | same | `nomercy-player-core/src/i18n/en.ts:62` |
| `core.a11y.muted` | `'Muted'` | same | `nomercy-player-core/src/i18n/en.ts:63` |
| `core.a11y.unmuted` | `'Unmuted'` | same | `nomercy-player-core/src/i18n/en.ts:64` |
| `plugin.tab-leader.lost` | `'Playback paused  - another tab is now playing.'` | same | `nomercy-player-core/src/i18n/en.ts:67` |
| `plugin.media-session.unsupported` | `'OS media controls are not available in this browser.'` | same | `nomercy-player-core/src/i18n/en.ts:68` |
| `core.chapters.untitled` | `'Chapter'` | same | `nomercy-player-core/src/i18n/en.ts:71` |

## Comment versus code

| Claim in the comment | What the code does | File:line |
|---|---|---|
| Default English translations bundle. The file comment says the bundle ships with this package, using the old nickname, and that consumers add bundles via `setup({ translations })` or `player.setLanguage(lang)`. | Bundles live in package `nomercy-player-core` under `src/i18n/`. Default setup also registers all 79 files through `kitTranslations = translationsFromGlob('./i18n/*.ts')` and lazy-loads the active language without requiring the consumer to import each file. | `nomercy-player-core/src/i18n/en.ts:10-12`, `nomercy-player-core/src/kit-translations.ts:14-24`, `nomercy-player-core/src/core/mixins/lifecycle.ts:396-435` |
| "Mirrors every key in `en.ts`." (non-English locale file headers) | True only for `nl.ts` (32 keys). The other 77 locale files omit `'core.chapters.untitled'`. | `nomercy-player-core/src/i18n/nl.ts:10,72`, `nomercy-player-core/src/i18n/af.ts:10` (same header pattern on the other 76 locale files) |
| `@example` uses `nl: { ...nlBundle }` under `defaultTranslations` | `nl.ts` documents `nl: nlTranslations` in its own example; there is no `nlBundle` symbol in this tree. | `nomercy-player-core/src/i18n/en.ts:79-84`, `nomercy-player-core/src/i18n/nl.ts:15-20` |
| "Pre-shipped translations object  - consumers spread this into their `setup({ translations })` config to inherit defaults." | `defaultTranslations` contains only the `en` entry; other languages are not pre-wired in that object and rely on `kitTranslations` lazy loading or explicit consumer bundles. | `nomercy-player-core/src/i18n/en.ts:74-89` |

## Traps

| Behavior | Why it surprises | File:line |
|---|---|---|
| The English file comment uses the old nickname for this package | These files are the `nomercy-player-core` package (`nomercy-player-core/src/i18n/`). The path is not a second package. | `nomercy-player-core/src/i18n/en.ts:10` |
| 77 locale files claim to mirror every `en.ts` key but omit `'core.chapters.untitled'` | Audits that diff key counts against `en.ts` fail unless `nl.ts` is treated separately; runtime may still show English for that key via fallback because `enTranslations` is seeded eagerly. | `nomercy-player-core/src/i18n/en.ts:71`, `nomercy-player-core/src/i18n/de.ts:23-71` (representative; same omission on all locale files except `en.ts` and `nl.ts`) |
| Only `enTranslations`, `defaultTranslations`, and `nlTranslations` are exported from the package entry | Importing `deTranslations` (etc.) by name from `@nomercy-entertainment/nomercy-player-core` is not supported; German still resolves when `language('de')` triggers the lazy `kitTranslations` loader. | `nomercy-player-core/src/index.ts:301-302`, `nomercy-player-core/src/kit-translations.ts:24` |
| `en.ts` is both eagerly imported in `_initTranslator` and included in the lazy `./i18n/*.ts` glob | English is marked loaded before the lazy loader runs; duplicate registration is documented as harmless but easy to misread as double shipping. | `nomercy-player-core/src/kit-translations.ts:19-22`, `nomercy-player-core/src/core/mixins/lifecycle.ts:397-424` |
| Lazy glob discovery prefers `export default` over a named export keyed by BCP-47 tag | Files use `export default deTranslations` while the named symbol is `deTranslations`, not `de`; default export is required for `extractBundle` unless a tag-named export exists. | `nomercy-player-core/src/adapters/translator/loaders/translations-glob.ts:189-193`, `nomercy-player-core/src/i18n/de.ts:23,72` |

Checked by reading all 79 files under `nomercy-player-core/src/i18n/` (full pass).
