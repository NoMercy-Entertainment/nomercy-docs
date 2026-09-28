# Fact check: /nomercy-player-core
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/introduction.mdx
Reviewed-SHA: 3e10f4a927156e16

Source: `packages/player-web/nomercy-player-core` (`package.json`, `README.md`, `src/index.ts`, `src/base-player.ts`, auth/plugin/lifecycle surfaces named below). Method: read the rewritten page and those sources; recompute SHA; no site build. Byte scan of the page for U+2013, U+2014, and the old library nickname: none.

## Gate checks

| Gate | Result |
| --- | --- |
| Old library nickname on page | none |
| No em dash or en dash on page | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Install `@nomercy-entertainment/nomercy-player-core` alone only when writing a plugin or building your own player; otherwise use video or music | Owner rule; package `README.md` (install alone only for plugin or new player package; pull video or music otherwise) | Supported |
| Package name `@nomercy-entertainment/nomercy-player-core` | `package.json` `name` | Supported |
| A plugin is extra player behavior (example: counting each play) | `README.md` `PlayCountPlugin` / `addPlugin`; `Plugin` base and `pluginRegistrationMethods` | Supported |
| Video and music packages already include Player Core; do not install it again | `nomercy-video-player/package.json` and `nomercy-music-player/package.json` both depend on `@nomercy-entertainment/nomercy-player-core` | Supported |
| Player Core is the shared engine: ordered play list, token on requests, subscriptions | `queueMethods` / `MediaList`; `authMethods` / `authFetch` bearer token on requests; typed `EventEmitter` event bus (`index.ts`, README) | Supported |
| It does not draw a picture or play sound by itself | README (nothing renders a UI / medium on its own); `base-player.ts` (shared logic for NMMusicPlayer and NMVideoPlayer, not either library) | Supported |
| Video and music need that list, those requests, and those subscriptions; one package so a fix lands once | `package.json` description (shared spine); `base-player.ts` comment (change lands once); both consumer packages depend on core | Supported |
| Build your own player by attaching those methods to your class, then adding only the medium-specific piece | README quick start (`composeMixins`); `src/core/compose.ts`; video/music add the medium backend | Supported |
| Nothing runs until you ask; a plugin stays off until you add it | README (everything opt-in; no plugin until `addPlugin`); `plugin-registration.ts` `addPlugin`; config plugins use the same path | Supported |
| Pass your own storage or logger into `setup`; omitted pieces keep defaults | `types/config.ts` (`storage?`, `logger?`); `lifecycle.ts` (`options.logger ?? new Logger`); Plugin root storage `config.storage ?? new LocalStorageBackend()`; README adapters via `setup()` | Supported |
| Next link: Quickstart shows how to attach the engine to a class at `/nomercy-player-core/quickstart` | `en/quickstart.mdx` exists and documents `composeMixins` / stamping `playerCoreMethods` onto a class | Supported |
