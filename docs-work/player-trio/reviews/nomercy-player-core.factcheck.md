# Fact check: /nomercy-player-core
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/introduction.mdx
Reviewed-SHA: 1f7b25194b199e57

Source: `packages/player-web/nomercy-player-core` (`package.json` description, `src/index.ts`, `src/base-player.ts`, and the mixin or adapter each sentence names). Method: read page and those sources; recompute SHA; no site build. Em dash / en dash scan (U+2013, U+2014) over the page: none. Word `kit`: none on the page. Word `headless`: none on the page.

## Gate checks

| Gate | Result |
| --- | --- |
| No `kit` on page | Pass |
| No `headless` on page | Pass |
| No em dash / en dash on page | Pass |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| Frontmatter: shared spine for music and video players: queue, transport, time, volume, events, plugins, adapters | `package.json:5` (shared spine for nomercy-music-player and nomercy-video-player); mixins/adapters below | Supported |
| Package `@nomercy-entertainment/nomercy-player-core` is Player Core | `package.json:2` (`name`); `package.json:5` (NoMercy player core) | Supported |
| Shared logic that `nomercy-music-player` and `nomercy-video-player` are built from | `package.json:5`; `index.ts:183-185`; `base-player.ts:9-12` | Supported |
| Not a music player or a video player by itself | `index.ts:183-185` (composed onto NMMusicPlayer + NMVideoPlayer); `base-player.ts:9-12` | Supported |
| `nomercy-music-player` / `nomercy-video-player` are the music and video libraries; each adds medium playback; shared behavior lives here | `base-player.ts:9-12` (neither library); `index.ts:183-185`; `package.json:5` | Supported |
| Queue is the ordered list of items, and which item is current | `core/mixins/queue.ts` (`queueMethods`, `_queueList`); `adapters/media-list/default.ts:30-41,93-95` (cursor-aware ordered list, `current()`) | Supported |
| Transport is play, pause, and seek | `core/mixins/transport.ts:90-91,130,175` (`play` / `pause` / seek scaffolding); re-export `base-player.ts:49` | Supported |
| Time is the playback position and the duration | `core/mixins/time.ts:67-69` (`time()`), `:99-100` (`duration()`); re-export `base-player.ts:48` | Supported |
| Volume is loudness on a scale from 0 to 100 | `core/mixins/volume.ts:18-19,75-83` (0..100 API); re-export `base-player.ts:50` | Supported |
| Events are messages the player emits (e.g. phase change) that you subscribe to | `adapters/event-bus/default.ts:61,108` (`EventEmitter`, `on`); `core/mixins/player-state.ts:91-104` (`emit('phase', { from, to })`); `index.ts:41` | Supported |
| Plugins are extra behavior you register on the player | `core/mixins/plugin-registration.ts:508` (`addPlugin`); `index.ts:199,250`; `package.json:5` (Plugin runtime) | Supported |
| Adapters are swappable pieces (events delivery or stream open) | `adapters/event-bus/` (`EventEmitter` / `IEventBus`); `adapters/stream/` (`StreamRegistry`, HLS); `index.ts` adapter exports; `package.json` `./adapters/*` exports | Supported |
| Package ships helpers around that spine; lifecycle helpers are `setup`, `ready`, and `dispose` | `package.json:5`; `core/mixins/lifecycle.ts:115,161,207`; re-export `base-player.ts:37` (`lifecycleMethods`) | Supported |
| Streams are how a media address is opened, including HLS | `adapters/stream/registry.ts:19,28` (built-in `native`, `hls`); `adapters/stream/hls.ts`; `index.ts:151-164`; `package.json:5` | Supported |
| A cue is a timed span with start, end, and payload | `core/cues/cue.ts:9-13` (`Cue`: `start`, `end`, `payload`); `index.ts:228-233` | Supported |
| Errors are named failures such as a missing mount element | `core/constructor.ts:99` (`core:player/element-missing`); `index.ts:267-289` (error exports); `package.json:5` | Supported |
| Auth is optional credentials on requests the player makes | `core/mixins/auth.ts:26,51-60` (`_authConfig` optional); `types/config.ts:41-69,208` (`AuthConfig`, `auth?`); `index.ts:187,218` | Supported |
| Next link path `/nomercy-player-core/quickstart` | Path as written on the page | Supported (path as written) |
