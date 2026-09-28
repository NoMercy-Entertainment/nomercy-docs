# Slice: video-rest
Files given: 36
Files opened: 36

## Files opened
- nomercy-video-player/src/iife-entry.ts
- nomercy-video-player/src/index.ts
- nomercy-video-player/src/types.ts
- nomercy-video-player/src/adapters/index.ts
- nomercy-video-player/src/adapters/chapter-source/IChapterSource.ts
- nomercy-video-player/src/adapters/chapter-source/index.ts
- nomercy-video-player/src/adapters/chapter-source/vtt-chapters.ts
- nomercy-video-player/src/adapters/subtitle-style-store/index.ts
- nomercy-video-player/src/adapters/subtitle-style-store/ISubtitleStyleStore.ts
- nomercy-video-player/src/adapters/subtitle-style-store/storage-backed.ts
- nomercy-video-player/src/adapters/thumbnail-source/index.ts
- nomercy-video-player/src/adapters/thumbnail-source/IThumbnailSource.ts
- nomercy-video-player/src/adapters/thumbnail-source/vtt-sprite.ts
- nomercy-video-player/src/adapters/video-backend/html5.ts
- nomercy-video-player/src/adapters/video-backend/index.ts
- nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts
- nomercy-video-player/src/adapters/video-backend/source-outage.ts
- nomercy-video-player/src/player/itemImage.ts
- nomercy-video-player/src/player/normalize-item.ts
- nomercy-video-player/src/player/preload.ts
- nomercy-video-player/src/player/start-selection.ts
- nomercy-video-player/src/player/track-language-memory.ts
- nomercy-video-player/src/plugins/index.ts
- nomercy-video-player/src/plugins/v1-compat.ts
- nomercy-video-player/src/plugins/cast-sender/index.ts
- nomercy-video-player/src/plugins/drm/index.ts
- nomercy-video-player/src/plugins/key-handler/index.ts
- nomercy-video-player/src/plugins/live-transcoding/index.ts
- nomercy-video-player/src/plugins/media-session/index.ts
- nomercy-video-player/src/plugins/octopus/font-names.ts
- nomercy-video-player/src/plugins/octopus/index.ts
- nomercy-video-player/src/plugins/subtitle-overlay/index.ts
- nomercy-video-player/src/plugins/touch-zones/index.ts
- nomercy-video-player/src/plugins/tv-key-handler/index.ts
- nomercy-video-player/src/streams/hls.ts
- nomercy-video-player/src/streams/native.ts

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `default` (IIFE) | `export { nmplayer as default } from './index';` | nomercy-video-player/src/iife-entry.ts:9 |
| `NMVideoPlayer` | `export class NMVideoPlayer<T extends VideoPlaylistItem = VideoPlaylistItem> extends EventEmitter<VideoEventMap<T>> implements IPlayer<VideoEventMap<T>>, IVideoPlayer<T>` | nomercy-video-player/src/index.ts:178 |
| `nmplayer` | `export function nmplayer<T extends BasePlaylistItem = VideoPlaylistItem>(id?: string | number): NMVideoPlayer<T>` | nomercy-video-player/src/index.ts:1433 |
| `default` (ESM) | `export default nmplayer;` | nomercy-video-player/src/index.ts:1437 |
| `NMVideoPlayer` constructor | `constructor(id?: string \| number)` | nomercy-video-player/src/index.ts:369 |
| `NMVideoPlayer.id` | `get id(): string` | nomercy-video-player/src/index.ts:185 |
| `NMVideoPlayer._resetRegistry` | `static _resetRegistry(): void` | nomercy-video-player/src/index.ts:592 |
| `NMVideoPlayer.backend` | `backend(): IVideoBackend;` / `backend(kind: VideoBackendKind): Promise<void>;` / `backend(kind?: VideoBackendKind): IVideoBackend \| Promise<void>` | nomercy-video-player/src/index.ts:606 |
| `NMVideoPlayer.fullscreen` | `fullscreen(): FullscreenState;` / `fullscreen(state: FullscreenState \| boolean): void;` / `fullscreen(state?: FullscreenState \| boolean): FullscreenState \| void` | nomercy-video-player/src/index.ts:853 |
| `NMVideoPlayer.pip` | `pip(): PipState;` / `pip(state: PipState \| boolean): void;` / `pip(state?: PipState \| boolean): PipState \| void` | nomercy-video-player/src/index.ts:884 |
| `NMVideoPlayer.theater` | `theater(): TheaterState;` / `theater(state: TheaterState \| boolean): void;` / `theater(state?: TheaterState \| boolean): TheaterState \| void` | nomercy-video-player/src/index.ts:911 |
| `NMVideoPlayer.subtitleState` | `subtitleState(): SubtitleState` | nomercy-video-player/src/index.ts:932 |
| `NMVideoPlayer.toggleFullscreen` | `toggleFullscreen(): void` | nomercy-video-player/src/index.ts:948 |
| `NMVideoPlayer.togglePip` | `togglePip(): void` | nomercy-video-player/src/index.ts:953 |
| `NMVideoPlayer.toggleTheater` | `toggleTheater(): void` | nomercy-video-player/src/index.ts:958 |
| `NMVideoPlayer.cycleSubtitles` | `cycleSubtitles(): void` | nomercy-video-player/src/index.ts:963 |
| `NMVideoPlayer.aspectRatio` | `aspectRatio(): Stretching;` / `aspectRatio(value: Stretching): void;` / `aspectRatio(value?: Stretching): Stretching \| void` | nomercy-video-player/src/index.ts:992 |
| `NMVideoPlayer.cycleAspectRatio` | `cycleAspectRatio(): void` | nomercy-video-player/src/index.ts:1003 |
| `NMVideoPlayer.videoRect` | `videoRect(): VideoRect \| null` | nomercy-video-player/src/index.ts:1032 |
| `NMVideoPlayer.playSegment` | `playSegment(opts: SegmentOptions): void` | nomercy-video-player/src/index.ts:1094 |
| `NMVideoPlayer.clearSegment` | `clearSegment(): void` | nomercy-video-player/src/index.ts:1129 |
| `NMVideoPlayer.normalizePlaylistItem` | `normalizePlaylistItem(item: BasePlaylistItem): BasePlaylistItem` | nomercy-video-player/src/index.ts:1146 |
| `NMVideoPlayer._disposeBackend` | `_disposeBackend(): void` | nomercy-video-player/src/index.ts:1263 |
| `containedRect` | `export function containedRect(videoW: number, videoH: number, containerW: number, containerH: number): VideoRect \| null` | nomercy-video-player/src/types.ts:189 |
| `IVideoPlayer` | `export interface IVideoPlayer<T extends VideoPlaylistItem = VideoPlaylistItem> extends IPlayer<VideoEventMap<T>>` | nomercy-video-player/src/types.ts:440 |
| `VideoPlayerConfig` | `export interface VideoPlayerConfig<T extends BasePlaylistItem = VideoPlaylistItem> extends BasePlayerConfig` | nomercy-video-player/src/types.ts:370 |
| `VideoPlaylistItem` | `export interface VideoPlaylistItem extends BasePlaylistItem` | nomercy-video-player/src/types.ts:66 |
| `VideoEventMap` | `export interface VideoEventMap<T extends VideoPlaylistItem = VideoPlaylistItem> extends BaseEventMap<T>` | nomercy-video-player/src/types.ts:271 |
| `VideoBackendFactory` | `export type VideoBackendFactory = (kind: VideoBackendKind, config: VideoPlayerConfig<BasePlaylistItem>) => IVideoBackend;` | nomercy-video-player/src/types.ts:365 |
| `Stretching` | `export type Stretching = 'uniform' \| 'fill' \| 'exactfit' \| 'none';` | nomercy-video-player/src/types.ts:346 |
| `HtmlPreloadMode` | `export type HtmlPreloadMode = 'auto' \| 'metadata' \| 'none';` | nomercy-video-player/src/types.ts:357 |
| `FullscreenState` | `export enum FullscreenState { OFF = 'off', ON = 'on' }` | nomercy-video-player/src/types.ts:130 |
| `PipState` | `export enum PipState { OFF = 'off', ON = 'on' }` | nomercy-video-player/src/types.ts:136 |
| `TheaterState` | `export enum TheaterState { OFF = 'off', ON = 'on' }` | nomercy-video-player/src/types.ts:142 |
| `SubtitleState` | `export enum SubtitleState { OFF = 'off', ON = 'on' }` | nomercy-video-player/src/types.ts:148 |
| `IChapterSource` | `export interface IChapterSource` with `load(item: BasePlaylistItem): Promise<Chapter[]>`, `current(timeSeconds: number): Chapter \| null`, `all(): Chapter[]`, `unload(): void` | nomercy-video-player/src/adapters/chapter-source/IChapterSource.ts:19 |
| `VttChapterSource` | `export class VttChapterSource implements IChapterSource` | nomercy-video-player/src/adapters/chapter-source/vtt-chapters.ts:26 |
| `ISubtitleStyleStore` | `export interface ISubtitleStyleStore` with `load(): Promise<Partial<SubtitleStyle> \| null>`, `save(style: SubtitleStyle): Promise<void>`, `clear(): Promise<void>` | nomercy-video-player/src/adapters/subtitle-style-store/ISubtitleStyleStore.ts:22 |
| `StorageBackedSubtitleStyleStore` | `export class StorageBackedSubtitleStyleStore implements ISubtitleStyleStore` / `constructor(storage: IStorage)` | nomercy-video-player/src/adapters/subtitle-style-store/storage-backed.ts:23 |
| `IThumbnailSource` | `export interface IThumbnailSource` with `load(item: BasePlaylistItem): Promise<boolean>`, `lookup(timeSeconds: number): ThumbnailFrame \| null`, `unload(): void` | nomercy-video-player/src/adapters/thumbnail-source/IThumbnailSource.ts:43 |
| `ThumbnailFrame` | `export interface ThumbnailFrame` | nomercy-video-player/src/adapters/thumbnail-source/IThumbnailSource.ts:19 |
| `VttSpriteThumbnailSource` | `export class VttSpriteThumbnailSource implements IThumbnailSource` | nomercy-video-player/src/adapters/thumbnail-source/vtt-sprite.ts:28 |
| `IVideoBackend` | `export interface IVideoBackend` | nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:130 |
| `StreamResolver` | `export type StreamResolver = (url: string, contentType?: string) => IStreamSource \| undefined;` | nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:18 |
| `VIDEO_BACKEND_KIND` | `export const VIDEO_BACKEND_KIND = { HTML5: 'html5', MSE: 'mse', WEBCODECS: 'webcodecs' } as const;` | nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:111 |
| `VideoBackendKind` | `export type VideoBackendKind = typeof VIDEO_BACKEND_KIND[keyof typeof VIDEO_BACKEND_KIND];` | nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:118 |
| `Html5VideoBackend` | `export class Html5VideoBackend extends MediaElementBackend<HTMLVideoElement, BackendEventPayload> implements IVideoBackend` | nomercy-video-player/src/adapters/video-backend/html5.ts:150 |
| `Html5VideoBackend.isRecoveringFromOutage` | `get isRecoveringFromOutage(): boolean` | nomercy-video-player/src/adapters/video-backend/html5.ts:1046 |
| `SOURCE_OUTAGE_BACKOFF_MS` | `export const SOURCE_OUTAGE_BACKOFF_MS: readonly number[]` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:28 |
| `HTTP_STATUS_RETRY_LIMIT` | `export const HTTP_STATUS_RETRY_LIMIT = 5;` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:47 |
| `sourceOutageBudgetMs` | `export function sourceOutageBudgetMs(): number` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:50 |
| `isOriginDownStatus` | `export function isOriginDownStatus(httpStatus: number): boolean` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:64 |
| `NO_RETRIES` | `export const NO_RETRIES = 0;` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:72 |
| `isMediaAbsentStatus` | `export function isMediaAbsentStatus(httpStatus: number): boolean` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:83 |
| `sourceOutageRetryLimit` | `export function sourceOutageRetryLimit(httpStatus: number, sawConnectionFailure: boolean): number` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:102 |
| `MEDIA_ABSENT` | `export const MEDIA_ABSENT = 'core:stream/media-absent';` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:126 |
| `readItemImage` | `export function readItemImage(item: unknown): string \| undefined` | nomercy-video-player/src/player/itemImage.ts:16 |
| `normalizeVideoPlaylistItem` | `export function normalizeVideoPlaylistItem(item: BasePlaylistItem): VideoPlaylistItem` | nomercy-video-player/src/player/normalize-item.ts:154 |
| `VideoPreloadStrategy` | `export class VideoPreloadStrategy extends DefaultPreloadStrategy` / `override assetsToPreload(item: BasePlaylistItem): PreloadAsset[]` | nomercy-video-player/src/player/preload.ts:34 |
| `pickStartItem` | `export function pickStartItem(items: ReadonlyArray<VideoPlaylistItem>): StartSelection` | nomercy-video-player/src/player/start-selection.ts:23 |
| `TrackLanguageMemory` | `export class TrackLanguageMemory` / `constructor(private readonly storage?: IStorage)` | nomercy-video-player/src/player/track-language-memory.ts:33 |
| `SUBTITLES_OFF` | `export const SUBTITLES_OFF = 'off';` | nomercy-video-player/src/player/track-language-memory.ts:15 |
| `matchSubtitleTrack` | `export function matchSubtitleTrack(tracks: ReadonlyArray<SubtitleTrack>, wanted: SubtitleDescriptor, matchLanguage: (languages: Array<string \| undefined>, wantedLanguage: string) => number): number` | nomercy-video-player/src/player/track-language-memory.ts:139 |
| `formatOf` | `export function formatOf(track: Pick<SubtitleTrack, 'url'>): string \| undefined` | nomercy-video-player/src/player/track-language-memory.ts:105 |
| `CastSenderPlugin` | `export class CastSenderPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends BaseCastSenderPlugin<NMVideoPlayer<T>, T>` | nomercy-video-player/src/plugins/cast-sender/index.ts:42 |
| `castSenderPlugin` | `export const castSenderPlugin = CastSenderPlugin;` | nomercy-video-player/src/plugins/cast-sender/index.ts:91 |
| `DrmPlugin` | `export class DrmPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends Plugin<NMVideoPlayer<T>, DrmOptions, DrmEvents>` | nomercy-video-player/src/plugins/drm/index.ts:55 |
| `DrmPlugin.fetchLicense` | `async fetchLicense(challenge: ArrayBuffer): Promise<ArrayBuffer>` | nomercy-video-player/src/plugins/drm/index.ts:90 |
| `DrmPlugin.mediaKeys` | `mediaKeys(): MediaKeys \| null` | nomercy-video-player/src/plugins/drm/index.ts:135 |
| `drmPlugin` | `export const drmPlugin = DrmPlugin;` | nomercy-video-player/src/plugins/drm/index.ts:181 |
| `KeyHandlerPlugin` | `export class KeyHandlerPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends BaseKeyHandler<NMVideoPlayer<T>>` | nomercy-video-player/src/plugins/key-handler/index.ts:33 |
| `keyHandlerPlugin` | `export const keyHandlerPlugin = KeyHandlerPlugin;` | nomercy-video-player/src/plugins/key-handler/index.ts:287 |
| `LiveTranscodingPlugin` | `export class LiveTranscodingPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends Plugin<NMVideoPlayer<T>, LiveTranscodingOptions, LiveTranscodingEvents>` | nomercy-video-player/src/plugins/live-transcoding/index.ts:61 |
| `LiveTranscodingPlugin.transcodedTo` | `transcodedTo(): number` | nomercy-video-player/src/plugins/live-transcoding/index.ts:114 |
| `liveTranscodingPlugin` | `export const liveTranscodingPlugin = LiveTranscodingPlugin;` | nomercy-video-player/src/plugins/live-transcoding/index.ts:182 |
| `MediaSessionPlugin` | `export class MediaSessionPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends BaseMediaSession<T, NMVideoPlayer<T>>` | nomercy-video-player/src/plugins/media-session/index.ts:29 |
| `mediaSessionPlugin` | `export const mediaSessionPlugin = MediaSessionPlugin;` | nomercy-video-player/src/plugins/media-session/index.ts:45 |
| `OctopusPlugin` | `export class OctopusPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends Plugin<NMVideoPlayer<T>, OctopusOptions>` | nomercy-video-player/src/plugins/octopus/index.ts:106 |
| `OctopusPlugin.subtitle` | `subtitle(): string \| null;` / `subtitle(url: string \| null): Promise<void>;` / `subtitle(url?: string \| null): string \| null \| Promise<void>` | nomercy-video-player/src/plugins/octopus/index.ts:173 |
| `OctopusPlugin.fonts` | `fonts(): readonly string[];` / `fonts(urls: string[]): Promise<void>;` / `fonts(urls?: string[]): readonly string[] \| Promise<void>` | nomercy-video-player/src/plugins/octopus/index.ts:193 |
| `OctopusPlugin.renderer` | `renderer(): SubtitleOctopusInstance \| null` | nomercy-video-player/src/plugins/octopus/index.ts:212 |
| `octopusPlugin` | `export const octopusPlugin = OctopusPlugin;` | nomercy-video-player/src/plugins/octopus/index.ts:484 |
| `readFontFamilyNames` | `export function readFontFamilyNames(buffer: ArrayBuffer): string[]` | nomercy-video-player/src/plugins/octopus/font-names.ts:68 |
| `SubtitleOverlayPlugin` | `export class SubtitleOverlayPlugin extends Plugin<NMVideoPlayer, SubtitleOverlayOptions>` | nomercy-video-player/src/plugins/subtitle-overlay/index.ts:50 |
| `subtitleOverlayPlugin` | `export const subtitleOverlayPlugin = SubtitleOverlayPlugin;` | nomercy-video-player/src/plugins/subtitle-overlay/index.ts:552 |
| `TouchZonesPlugin` | `export class TouchZonesPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends Plugin<NMVideoPlayer<T>, TouchZonesOptions>` | nomercy-video-player/src/plugins/touch-zones/index.ts:147 |
| `touchZonesPlugin` | `export const touchZonesPlugin = TouchZonesPlugin;` | nomercy-video-player/src/plugins/touch-zones/index.ts:496 |
| `TvKeyHandlerPlugin` | `export class TvKeyHandlerPlugin<T extends VideoPlaylistItem = VideoPlaylistItem> extends KeyHandlerPlugin<T>` | nomercy-video-player/src/plugins/tv-key-handler/index.ts:62 |
| `tvKeyHandlerPlugin` | `export const tvKeyHandlerPlugin = TvKeyHandlerPlugin;` | nomercy-video-player/src/plugins/tv-key-handler/index.ts:242 |
| `V1VideoCompatPlugin` | `export class V1VideoCompatPlugin extends Plugin<NMVideoPlayer>` | nomercy-video-player/src/plugins/v1-compat.ts:220 |
| `hlsFactory` | `export { default, hlsFactory } from '@nomercy-entertainment/nomercy-player-core/streams/hls';` | nomercy-video-player/src/streams/hls.ts:9 |
| `nativeFactory` | `export { default, nativeFactory } from '@nomercy-entertainment/nomercy-player-core/streams/native';` | nomercy-video-player/src/streams/native.ts:9 |

Kit-composed methods on `NMVideoPlayer` (`setup`, `play`, `load`, `queue`, `subtitle`, `quality`, …) are `declare`d in `index.ts` and implemented by `composeMixins(NMVideoPlayer.prototype, ...playerCoreMethods)` at `index.ts:1276`. This slice wraps `dispose`, `setup`, and `quality` after that compose.

`plugins/index.ts` re-exports the video plugins above plus kit plugins (`AudioGraphPlugin`, `EmbedPlugin`, `MessagePlugin`, `TabLeaderPlugin`, …) and also `DesktopUiPlugin` (desktop-ui slice). Main barrel `index.ts` re-exports only `KeyHandlerPlugin`, `OctopusPlugin`, and `V1VideoCompatPlugin` from plugins.

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `_aspectRatio` | `'uniform'` | `aspectRatio()` getter; `cycleAspectRatio()`; `_createBackend` stretching seed | nomercy-video-player/src/index.ts:983 |
| `_OBJECT_FIT_MAP.uniform` | `'contain'` | `_applyObjectFit` | nomercy-video-player/src/index.ts:986 |
| `_OBJECT_FIT_MAP.fill` | `'fill'` | `_applyObjectFit` | nomercy-video-player/src/index.ts:987 |
| `_OBJECT_FIT_MAP.exactfit` | `'cover'` | `_applyObjectFit` | nomercy-video-player/src/index.ts:988 |
| `_OBJECT_FIT_MAP.none` | `'none'` | `_applyObjectFit` | nomercy-video-player/src/index.ts:989 |
| `autoAdvance` when unset | treated as true (`=== false` is the only disable) | `ended` handler calling `next({ source: 'auto-advance' })` | nomercy-video-player/src/index.ts:403 |
| `autoPlay` when unset | `false` (`enrichedConfig.autoPlay ?? false`) | wrapped `setup` prime-and-play | nomercy-video-player/src/index.ts:1382 |
| `preloadLeadSeconds` when unset | `10` | wrapped `setup`; `VideoPreloadStrategy` constructor | nomercy-video-player/src/index.ts:1364 |
| `crossfadeEnabled` injected | `false` | kit setup via `enrichedConfig` | nomercy-video-player/src/index.ts:1366 |
| `preloadStrategy` when unset | `new VideoPreloadStrategy(leadSeconds)` | wrapped `setup` | nomercy-video-player/src/index.ts:1369 |
| `transitionStrategy` when unset | `new GaplessTransitionStrategy()` | wrapped `setup` | nomercy-video-player/src/index.ts:1370 |
| `hdrOnSdr` when unset | `'play'` (`this.options?.hdrOnSdr ?? 'play'`) | `_createBackend` → `setHdrOnSdrFallback` | nomercy-video-player/src/index.ts:666 |
| `backend()` kind when unset | `'html5'` | `_createBackend('html5')` | nomercy-video-player/src/index.ts:612 |
| `Html5VideoBackend.kind` | `'html5' as const` | `IVideoBackend.kind` | nomercy-video-player/src/adapters/video-backend/html5.ts:153 |
| `Html5VideoBackend.canStartAt` | `true` | kit skip of post-load seek | nomercy-video-player/src/adapters/video-backend/html5.ts:299 |
| `waitForLoadedMetadata` timeout | `10_000` | `load()` metadata wait | nomercy-video-player/src/adapters/video-backend/html5.ts:1512 |
| HLS media-error escalate window | `5_000` | `_attachHlsErrorHandler` | nomercy-video-player/src/adapters/video-backend/html5.ts:1200 |
| `_hdrOnSdrFallback` at ABR apply | `'play'` (`this._hdrOnSdrFallback ?? 'play'`) | `_applyAbrConstraints` | nomercy-video-player/src/adapters/video-backend/html5.ts:1404 |
| `QUALITY` unsupported cache miss | `true` (`cached ?? true`) | `qualityLevels()` | nomercy-video-player/src/adapters/video-backend/html5.ts:769 |
| `SOURCE_OUTAGE_BACKOFF_MS` | `[1_000, 2_000, 4_000, 8_000, 15_000, 15_000, 15_000, 15_000, 15_000, 15_000]` | `_rideOutNetworkError` | nomercy-video-player/src/adapters/video-backend/source-outage.ts:28 |
| `HTTP_STATUS_RETRY_LIMIT` | `5` | `sourceOutageRetryLimit` for other HTTP statuses | nomercy-video-player/src/adapters/video-backend/source-outage.ts:47 |
| `NO_RETRIES` | `0` | 404/410 with no prior connection failure | nomercy-video-player/src/adapters/video-backend/source-outage.ts:72 |
| `MEDIA_ABSENT` | `'core:stream/media-absent'` | `_escalateHlsError` on absent media | nomercy-video-player/src/adapters/video-backend/source-outage.ts:126 |
| subtitle style storage key | `'subtitle-style'` | `StorageBackedSubtitleStyleStore` | nomercy-video-player/src/adapters/subtitle-style-store/storage-backed.ts:13 |
| audio language storage key | `'nmplayer-language-audio'` | `TrackLanguageMemory` | nomercy-video-player/src/player/track-language-memory.ts:11 |
| subtitle language storage key | `'nmplayer-language-subtitle'` | `TrackLanguageMemory` | nomercy-video-player/src/player/track-language-memory.ts:12 |
| `SUBTITLES_OFF` | `'off'` | language memory + `_applyDefaultTracks` | nomercy-video-player/src/player/track-language-memory.ts:15 |
| start-item rollover | `percentage > 90` | `pickStartItem` | nomercy-video-player/src/player/start-selection.ts:31 |
| `CastSenderPlugin` content type | `'video/mp4'` | `defaultContentType()` | nomercy-video-player/src/plugins/cast-sender/index.ts:49 |
| `KeyHandlerPlugin` speed ladder fallback | `[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]` | `addSpeedKeys` when `playbackRates()` missing | nomercy-video-player/src/plugins/key-handler/index.ts:213 |
| frame advance | `1 / 30` seconds | `addFrameAdvanceKey` | nomercy-video-player/src/plugins/key-handler/index.ts:236 |
| `LiveTranscodingPlugin.waitFor` timeout | `this.opts?.seekTimeoutMs ?? 10_000` | `beforeSeek` / `beforeLoad` gate | nomercy-video-player/src/plugins/live-transcoding/index.ts:164 |
| `OctopusOptions.renderMode` | `'wasm-blend'` | `load()` constructor opts | nomercy-video-player/src/plugins/octopus/index.ts:419 |
| `OctopusOptions.renderAhead` | `10` | `load()` constructor opts | nomercy-video-player/src/plugins/octopus/index.ts:422 |
| `TouchZonesOptions.doubleTapThreshold` | `300` | `doubleTap` delay | nomercy-video-player/src/plugins/touch-zones/index.ts:267 |
| `TouchZonesOptions.seekSeconds` | `10` | seek zones + indicator label | nomercy-video-player/src/plugins/touch-zones/index.ts:323 |
| v1 `doubleTap` threshold | `300` | `V1VideoCompatPlugin.doubleTap` | nomercy-video-player/src/plugins/v1-compat.ts:638 |
| `TvKeyHandlerOptions.arrowSeekSeconds` | `5` | TV arrow seek | nomercy-video-player/src/plugins/tv-key-handler/index.ts:89 |
| `TvKeyHandlerOptions.infoDisplayMs` | `5000` | Info OSD | nomercy-video-player/src/plugins/tv-key-handler/index.ts:172 |
| MessagePlugin OSD fallback ms | `3000` | `osdMessage` when `durationMs` omitted | nomercy-video-player/src/plugins/tv-key-handler/index.ts:232 |
| `allowFullscreen` initial | `true` | v1 `enterFullscreen` gate | nomercy-video-player/src/plugins/v1-compat.ts:340 |
| `stretchOptions` | `['uniform', 'fill', 'exactfit', 'none']` | v1 shim field | nomercy-video-player/src/plugins/v1-compat.ts:359 |
| `Html5VideoBackend` qualityLevels empty | `[]` when no HLS levels | `qualityLevels()` | nomercy-video-player/src/adapters/video-backend/html5.ts:754 |
| `outputProtectionState` | `'unrestricted'` | `Html5VideoBackend.outputProtectionState()` | nomercy-video-player/src/adapters/video-backend/html5.ts:875 |
| `VttChapterSource` empty load | `[]` when no inline `chapters` | `load()` | nomercy-video-player/src/adapters/chapter-source/vtt-chapters.ts:42 |

`VideoPlayerConfig.autoAdvance` comment says default `true`; there is no assignment of `autoAdvance = true` in this slice. Unset is true because the ended handler only returns on `=== false`.

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| `IChapterSource`: "Implementations are registered on the player and queried after each item loads. The default implementation (`VttChapterSource`) fetches a WebVTT chapter file from the item's `tracks` list (kind = \"chapters\") and parses the cue text as chapter titles." | No production file in this package constructs `VttChapterSource` or registers `IChapterSource`. `VttChapterSource.load` copies `item.chapters` when that array is non-empty and otherwise returns `[]`. It never fetches a VTT and never reads `tracks`. | nomercy-video-player/src/adapters/chapter-source/IChapterSource.ts:14; nomercy-video-player/src/adapters/chapter-source/vtt-chapters.ts:29 |
| `VttChapterSource` class comment shows a WebVTT cue block and calls it "the format produced by the NoMercy media-server chapter extractor". | `load` never parses VTT. Inline `Chapter[]` only. | nomercy-video-player/src/adapters/chapter-source/vtt-chapters.ts:17 |
| `IThumbnailSource`: "Implementations are registered on the player and queried when the user hovers the progress bar." | No production file constructs `VttSpriteThumbnailSource` or registers `IThumbnailSource`. Hover sprites in desktop-ui call `loadSpriteSet` directly. | nomercy-video-player/src/adapters/thumbnail-source/IThumbnailSource.ts:39 |
| `HtmlPreloadMode` / `VideoPlayerConfig.preload`: "passed to the `preload` config field and the backend `load()` call." | This slice never reads `options.preload`. Kit `loading.ts` calls `backend.load(url, startAt !== undefined ? { startTime: startAt } : undefined)` with no `preload` field. `Html5VideoBackend.load` would honor `opts.preload` only if a caller passed it. | nomercy-video-player/src/types.ts:349; nomercy-video-player/src/adapters/video-backend/html5.ts:308 |
| `VideoPreloadStrategy`: "preloading so the next item starts instantly" (wrapped setup) vs the strategy comment that a `HEAD` with `mode: 'no-cors'` "warms no media and the next item does not start any sooner." | Setup comment still claims instant start. Strategy comment matches `_runPreload` in core: observable output is `preloadProgress` / `preloadComplete` only. | nomercy-video-player/src/index.ts:1361; nomercy-video-player/src/player/preload.ts:27 |
| `videoRect` / `containedRect`: "computed from `object-fit: contain` geometry." | `videoRect()` always calls `containedRect` (contain math). `aspectRatio` can set `object-fit` to `fill` / `cover` / `none`. The rectangle does not follow those modes. | nomercy-video-player/src/index.ts:1023; nomercy-video-player/src/types.ts:157 |
| `IVideoPlayer.backend(kind)`: "emits `backend:changed`." | `backend(kind)` does `this.emit('backend:changed', { kind })`. `VideoEventMap` in this slice does not declare `'backend:changed'`. | nomercy-video-player/src/types.ts:474; nomercy-video-player/src/index.ts:621 |
| `DrmPlugin`: "Handles license acquisition for Widevine / FairPlay / PlayReady and routes HDCP / output-protection signals." | `use()` only calls `requestMediaKeySystemAccess`. It never creates a `MediaKeySession`, never calls `fetchLicense`, never `setMediaKeys`, never reads `hdcpRequired` or `certificate`. | nomercy-video-player/src/plugins/drm/index.ts:46 |
| `OctopusPlugin` font cache: "Memoised per item - the `current` event resets the cache." | `use()` listens to `'item'`, not `'current'`. | nomercy-video-player/src/plugins/octopus/index.ts:152 |
| `OctopusPlugin` class comment: "`@nomercy-entertainment/nomercy-subtitle-octopus` is a regular `dependency`". `loadCtor` comment: "optional peer ... not available". | Both comments sit in the same file. Runtime treats a failed import as degrade-to-null. | nomercy-video-player/src/plugins/octopus/index.ts:103; nomercy-video-player/src/plugins/octopus/index.ts:249 |
| v1 `subtitleFile`: "Dynamic sidecar subtitle loading has no v2 API. Add the track to the playlist item's tracks field instead." | `IVideoPlayer.addSubtitleTrack` exists on the v2 surface (`index.ts` declare + types). The shim still throws `NotImplementedError`. | nomercy-video-player/src/plugins/v1-compat.ts:446; nomercy-video-player/src/types.ts:531 |
| `VideoEventMap['display-message']`: `{ text: string; ms?: number }`. | `V1VideoCompatPlugin.displayMessage` does `player.emit(displayEvent, text)` (a string), then `player.emit(removeEvent, text)` for `remove-message`. Key-handler / TV handler emit `{ text }` / `{ text, ms }`. | nomercy-video-player/src/types.ts:303; nomercy-video-player/src/plugins/v1-compat.ts:616 |
| `Html5VideoBackend` header: "MSE / WebCodecs backends ship later." `VIDEO_BACKEND_KIND` already lists `MSE` and `WEBCODECS`. | `_createBackend` throws `NotImplementedError` for any kind other than `'html5'` unless `options.backendFactory` supplies one. | nomercy-video-player/src/adapters/video-backend/html5.ts:147; nomercy-video-player/src/index.ts:634 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `VttChapterSource`, `VttSpriteThumbnailSource`, and `StorageBackedSubtitleStyleStore` are exported from the main barrel and `./adapters`. Production player code never instantiates any of them. | Looks like the default chapter / sprite / subtitle-style pipeline. Chapters come from the kit mixin + item field. Sprites are loaded by desktop-ui helpers. Subtitle style stays in memory unless the consumer wires the store. `ISubtitleStyleStore` documents the unwired store; the other two interfaces claim player registration that does not exist. | nomercy-video-player/src/index.ts:74; searched: no `new VttChapterSource` / `new VttSpriteThumbnailSource` / `new StorageBackedSubtitleStyleStore` outside tests |
| `hlsFactory` / `nativeFactory` are package subpath exports (`./streams/hls`, `./streams/native`). `NMVideoPlayer` never `registerStream`s them. HLS is handled inside `Html5VideoBackend.load` via dynamic `import('hls.js')` or native `src`. | Importing the stream factories does not change playback unless the consumer calls `registerStream` itself. | nomercy-video-player/src/streams/hls.ts:9; nomercy-video-player/src/index.ts:656 |
| `VIDEO_BACKEND_KIND` includes `'mse'` and `'webcodecs'` but is not re-exported from `index.ts` or `adapters/index.ts`. `backend('mse')` without `backendFactory` throws. | The kind union looks like three shipping backends. Only `'html5'` is built in. | nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:111; nomercy-video-player/src/index.ts:634 |
| `VideoPlayerConfig.preload` is accepted and documented as going to `backend.load()`. Kit load never forwards it. | Setting `setup({ preload: 'none' })` does not set `HTMLVideoElement.preload`. | nomercy-video-player/src/types.ts:375 |
| `VideoPlayerConfig.playbackRates` is accepted. Kit `playbackRates()` always returns `[0.5, 0.75, 1, 1.25, 1.5, 2]`. This slice never reads the config field. | Speed menus and `[` / `]` keys ignore the option. | nomercy-video-player/src/types.ts:374 |
| `DrmOptions.certificate` and `DrmOptions.hdcpRequired` are on the options type and never read. | FairPlay certificate and HDCP requirements type-check and do nothing. | nomercy-video-player/src/plugins/drm/index.ts:20 |
| `LiveTranscodingOptions.pollIntervalMs`, `resumeAheadSeconds`, and `preferredHeight` are on the options type and never read. `waitFor` polls every `100` ms regardless. Timeout resolves success, not `job:error`. | Passing those fields is a silent no-op. A seek that never transcodes still proceeds after `seekTimeoutMs`. | nomercy-video-player/src/plugins/live-transcoding/index.ts:23 |
| `DrmPlugin.use` never calls `fetchLicense`. Handshake stops at `requestMediaKeySystemAccess`. | Adding the plugin with `licenseUrl` does not attach keys to the `<video>` element. Encrypted playback still needs a consumer to call `fetchLicense` and `setMediaKeys`. | nomercy-video-player/src/plugins/drm/index.ts:71 |
| Player `_createBackend` does not bridge `stream:error`, `stream:recovering`, `encrypted`, `ratechange`, `resize`, `loadeddata`, or `emptied` onto `VideoEventMap`. | Listening on the player for HLS fatal / recovering never fires. Those events exist only on `IVideoBackend.on(...)`. `stream:error` comment says the player will emit a top-level `error` next; that emit is on the backend, not `NMVideoPlayer`. | nomercy-video-player/src/index.ts:704; nomercy-video-player/src/adapters/video-backend/IVideoBackend.ts:65 |
| Player emits `'level-switched'` and `'backend:changed'`. Neither name is a key of `VideoEventMap` in this slice. Desktop-ui does listen for `'level-switched'`. | Typed `player.on('level-switched', …)` is not on the video event map. Runtime still emits it. | nomercy-video-player/src/index.ts:819; nomercy-video-player/src/types.ts:271 |
| `VideoEventMap` declares `'back'`, `'close'`, and `'cast'`. This slice never emits them. Desktop-ui top bar does. | Headless player plus key-handler never fires navigation/cast intents. Buttons only appear when desktop-ui is loaded. | nomercy-video-player/src/types.ts:312 |
| Custom stream path in `Html5VideoBackend.load`: if `setStreamResolver` returns a source, `attach` runs, `_state = 'ready'`, and the method returns without `waitForLoadedMetadata` and without `emit('loadedmetadata', …)`. | A `registerStream` factory can skip the duration / first-frame metadata path the player bridges from `loadedmetadata`. `startTime` is also not applied on that branch. | nomercy-video-player/src/adapters/video-backend/html5.ts:372 |
| `METADATA_TIMEOUT_MS` is `10_000`. Outage ladder sums to ~105 s (`sourceOutageBudgetMs`). | A first `load()` of a restarting origin can reject at 10 s while the backend is still in `stream:recovering`. | nomercy-video-player/src/adapters/video-backend/html5.ts:1512; nomercy-video-player/src/adapters/video-backend/source-outage.ts:28 |
| `_disposeBackend()` has no `private` keyword. `_resetRegistry()` is a public static. `_currentEpoch` is a public `declare`. | Underscore names look internal. Any consumer can call `_disposeBackend()` or `_resetRegistry()` and drop the registry / tear the backend. | nomercy-video-player/src/index.ts:592; nomercy-video-player/src/index.ts:1263 |
| `Html5VideoBackend.isRecoveringFromOutage` is a public getter not declared on `IVideoBackend`. | Code typed against `player.backend()` does not see the flag. A cast to `Html5VideoBackend` is required. | nomercy-video-player/src/adapters/video-backend/html5.ts:1046 |
| `KeyHandlerPlugin` group methods (`addPlaybackKeys`, `addModifierSeekKeys`, …) are `protected`. `CastSenderPlugin.defaultContentType` / `buildMetadata` are `protected`. | They look like the public plugin API in docs/examples. They are only for subclasses (`TvKeyHandlerPlugin`). | nomercy-video-player/src/plugins/key-handler/index.ts:29; nomercy-video-player/src/plugins/cast-sender/index.ts:48 |
| `V1VideoCompatPlugin` is exported from the main barrel, not from `./plugins`. | `import { V1VideoCompatPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins'` fails. | nomercy-video-player/src/index.ts:100; nomercy-video-player/src/plugins/index.ts (no v1-compat) |
| `allowFullscreen` only gates `enterFullscreen()`. `player.fullscreen(true)` and `toggleFullscreen()` are ungated. | Setting `allowFullscreen = false` does not block the v2 fullscreen API. | nomercy-video-player/src/plugins/v1-compat.ts:62 |
| `pickStartItem`: `resumeTime ? { index, resumeTime }` treats `0` as absent. `percentage > 90` on the last item rolls to itself via `Math.min(index + 1, length - 1)`. | A saved position of 0 seconds starts at 0 (same as "no resume") but is still the selected item. A finished last episode still primes that last item. | nomercy-video-player/src/player/start-selection.ts:31 |
| `fullscreen` / `pip` emit `{ active }` immediately and swallow the platform promise. Getter prefers `ctrl.isActive()` then falls back to `_fullscreenActive` / `_pipActive`. | If `requestFullscreen` is rejected, the event already claimed ON and the next getter may read browser OFF. | nomercy-video-player/src/index.ts:874 |
| `OctopusPlugin.subtitle()` / `fonts()` live on the plugin instance, not the player. | `player.subtitle` is the kit track selector. `getPlugin(OctopusPlugin).subtitle(url)` is a side door for ASS URLs not on the item. | nomercy-video-player/src/plugins/octopus/index.ts:173 |
| Constructor reuses `container.querySelector('video')` if present (`ownsElement = false`), so `dispose` will not remove that element. | Mounting into a host that already has a `<video>` leaves that node behind after `player.dispose()`. | nomercy-video-player/src/adapters/video-backend/html5.ts:273 |

`StreamResolver` is exported from `IVideoBackend.ts` but not from the main barrel or `adapters/index.ts`. Same for `VIDEO_BACKEND_KIND`, `readItemImage`, `normalizeVideoPlaylistItem`, `pickStartItem`, `TrackLanguageMemory`, `readFontFamilyNames`, and the source-outage constants: file-level `export`, not the package `.` entry.
