# Slice: core-adapters
Files given: 79
Files opened: 79

## Files opened
- nomercy-player-core/src/adapters/clock/IClock.ts
- nomercy-player-core/src/adapters/clock/index.ts
- nomercy-player-core/src/adapters/clock/system.ts
- nomercy-player-core/src/adapters/cue-parser/built-ins.ts
- nomercy-player-core/src/adapters/cue-parser/ICueParser.ts
- nomercy-player-core/src/adapters/cue-parser/ICueParserRegistry.ts
- nomercy-player-core/src/adapters/cue-parser/index.ts
- nomercy-player-core/src/adapters/cue-parser/lrc.ts
- nomercy-player-core/src/adapters/cue-parser/registry.ts
- nomercy-player-core/src/adapters/cue-parser/timestamp.ts
- nomercy-player-core/src/adapters/cue-parser/vtt.ts
- nomercy-player-core/src/adapters/element-factory/dom.ts
- nomercy-player-core/src/adapters/element-factory/index.ts
- nomercy-player-core/src/adapters/event-bus/default.ts
- nomercy-player-core/src/adapters/event-bus/IEventBus.ts
- nomercy-player-core/src/adapters/event-bus/index.ts
- nomercy-player-core/src/adapters/fetch/default.ts
- nomercy-player-core/src/adapters/fetch/IFetch.ts
- nomercy-player-core/src/adapters/fetch/index.ts
- nomercy-player-core/src/adapters/id-generator/default.ts
- nomercy-player-core/src/adapters/id-generator/IIdGenerator.ts
- nomercy-player-core/src/adapters/id-generator/index.ts
- nomercy-player-core/src/adapters/language-matcher/bcp47.ts
- nomercy-player-core/src/adapters/language-matcher/ILanguageMatcher.ts
- nomercy-player-core/src/adapters/language-matcher/index.ts
- nomercy-player-core/src/adapters/lifecycle-registry/default.ts
- nomercy-player-core/src/adapters/lifecycle-registry/ILifecycleRegistry.ts
- nomercy-player-core/src/adapters/lifecycle-registry/index.ts
- nomercy-player-core/src/adapters/logger/default.ts
- nomercy-player-core/src/adapters/logger/ILogger.ts
- nomercy-player-core/src/adapters/logger/index.ts
- nomercy-player-core/src/adapters/media-element/backend-lifecycle-bridge.ts
- nomercy-player-core/src/adapters/media-element/backend-state.ts
- nomercy-player-core/src/adapters/media-element/helpers.ts
- nomercy-player-core/src/adapters/media-element/index.ts
- nomercy-player-core/src/adapters/media-element/MediaElementBackend.ts
- nomercy-player-core/src/adapters/media-list/default.ts
- nomercy-player-core/src/adapters/media-list/IMediaList.ts
- nomercy-player-core/src/adapters/media-list/index.ts
- nomercy-player-core/src/adapters/platform/browser.ts
- nomercy-player-core/src/adapters/platform/index.ts
- nomercy-player-core/src/adapters/platform/IPlatform.ts
- nomercy-player-core/src/adapters/preload/default.ts
- nomercy-player-core/src/adapters/preload/index.ts
- nomercy-player-core/src/adapters/quality/display-range.ts
- nomercy-player-core/src/adapters/quality/hdr-policy.ts
- nomercy-player-core/src/adapters/quality/size-policy.ts
- nomercy-player-core/src/adapters/realtime/index.ts
- nomercy-player-core/src/adapters/realtime/IRealtimeChannel.ts
- nomercy-player-core/src/adapters/realtime/websocket.ts
- nomercy-player-core/src/adapters/retry-policy/default.ts
- nomercy-player-core/src/adapters/retry-policy/index.ts
- nomercy-player-core/src/adapters/retry-policy/IRetryPolicy.ts
- nomercy-player-core/src/adapters/shuffle-strategy/default.ts
- nomercy-player-core/src/adapters/shuffle-strategy/index.ts
- nomercy-player-core/src/adapters/shuffle-strategy/IShuffleStrategy.ts
- nomercy-player-core/src/adapters/storage/index.ts
- nomercy-player-core/src/adapters/storage/indexed-db.ts
- nomercy-player-core/src/adapters/storage/IStorage.ts
- nomercy-player-core/src/adapters/storage/local-storage.ts
- nomercy-player-core/src/adapters/storage/memory.ts
- nomercy-player-core/src/adapters/stream/hls.ts
- nomercy-player-core/src/adapters/stream/index.ts
- nomercy-player-core/src/adapters/stream/IStreamRegistry.ts
- nomercy-player-core/src/adapters/stream/IStreamSource.ts
- nomercy-player-core/src/adapters/stream/native.ts
- nomercy-player-core/src/adapters/stream/registry.ts
- nomercy-player-core/src/adapters/subtitle-renderer/dom.ts
- nomercy-player-core/src/adapters/subtitle-renderer/index.ts
- nomercy-player-core/src/adapters/subtitle-renderer/ISubtitleRenderer.ts
- nomercy-player-core/src/adapters/translator/index.ts
- nomercy-player-core/src/adapters/translator/ITranslator.ts
- nomercy-player-core/src/adapters/translator/translator.ts
- nomercy-player-core/src/adapters/translator/loaders/index.ts
- nomercy-player-core/src/adapters/translator/loaders/ITranslationLoader.ts
- nomercy-player-core/src/adapters/translator/loaders/translation-loader.ts
- nomercy-player-core/src/adapters/translator/loaders/translations-glob.ts
- nomercy-player-core/src/adapters/url-resolver/index.ts
- nomercy-player-core/src/adapters/url-resolver/IUrlResolver.ts

Wiring (player constructs vs export-only), from call sites under `nomercy-player-core/src` excluding tests:

| Interface | Built-in | Player constructs it |
|---|---|---|
| `IClock` | `systemClock` | No. `now()` calls `options.clockSource()` or `Date.now()`. `systemClock` is never imported outside adapters + tests. |
| `ICueParser` / `ICueParserRegistry` | `CueParserRegistry`, `builtInCueParsers` (`lrcParser`, `vttSubtitleParser`, `spriteVttParser`) | Yes. `initPlayerCoreState` does `new CueParserRegistry()`. Lifecycle registers `builtInCueParsers` then `options.cueParsers`. |
| `CreateElement` / `AddClasses` / `AppendTo` (no `I*` factory) | `createElement`, `createButton`, `createSVG`, `addClasses`, `removeClasses` | Yes. `Plugin` wraps `createElement` / `createButton` / `createSVG`. |
| `IEventBus` | `EventEmitter` | Yes as a base, not as a setup slot. `MediaList`, `MediaElementBackend`, `StubPlayer` extend `EventEmitter`. Comment on `IEventBus` says there is no `eventBus` setup option. |
| `IFetch` | `defaultFetch` | No. No production import of `defaultFetch` or `IFetch` under `src/core`. |
| `IIdGenerator` | `defaultIdGenerator` | Yes. Media-tracks mixin calls `defaultIdGenerator.next()` for runtime subtitle ids. |
| `ILanguageMatcher` | `bcp47FallbackChain` | Yes. `DefaultTranslator`, i18n mixin, plugin-translations. |
| `ILifecycleRegistry` | `LifecycleRegistry` | Yes. Plugin registration does `new LifecycleRegistry()`. |
| `ILogger` | `Logger` | Yes. `new Logger({...})` when `options.logger` is omitted. |
| none in this folder (substrate, not `IVideoBackend`) | `MediaElementBackend` | No. Abstract class. Core exports it. No subclass in this package. |
| `IMediaList` | `MediaList` | Yes. `new MediaList()` for queue and backlog. |
| `IPlatform` | `browserPlatform` | Yes. `options.platform ?? browserPlatform`. |
| `IPreloadStrategy` | `DefaultPreloadStrategy` | Yes. `new DefaultPreloadStrategy(10)`. |
| `ITransitionStrategy` | `CrossfadeTransitionStrategy`, `GaplessTransitionStrategy` | No. Core seeds `_NOOP_TRANSITION`. Comments tell music/video libraries to overwrite. Core never constructs either class. |
| `DisplayRangeProbe` (probe, not a player slot) | `browserDisplayRangeProbe`, `detectDisplayHdr` | Partial. Device mixin calls `detectDisplayHdr()`. `hdrDecision` / `hdrAbrCeiling` / `sizeAbrCeiling` / `abrCeiling` / `panePixels` are never imported by mixins. |
| `IRealtimeChannel` / `RealtimeFactory` | `nativeWebSocketAdapter` | Yes. `Plugin.websocket()` fallback: `opts?.factory ?? config.websocketFactory ?? nativeWebSocketAdapter`. |
| `IRetryPolicy` | `DEFAULT_RETRY_POLICY` | No. Re-exported. Never looked up. Auth fetch defaults to `{ attempts: 0 }`. |
| `IShuffleStrategy` | `FisherYatesShuffle` / `fisherYatesShuffle` | Yes. `MediaList` field defaults to `fisherYatesShuffle`. Lifecycle applies `options.shuffleStrategy` if set. |
| `IStorage` | `LocalStorageBackend` (default), `IndexedDBBackend`, `MemoryStorageBackend` | `LocalStorageBackend` yes (`config.storage ?? new LocalStorageBackend()`). IndexedDB and Memory: export only. |
| `IStreamSource` / `IStreamFactory` / `IStreamRegistry` | `StreamRegistry`, `hlsFactory`, `nativeFactory`, `HlsStreamSource` | Registry yes. Factories are registered. Production load path calls `resolveCustom` (skips `native` and `hls`), never `resolve()`. HLS/progressive playback in this package goes through `attachHlsOrFallback`, not `HlsStreamSource`. |
| `ISubtitleRenderer` | `buildSubtitleFragment` (function, not a class) | No. Nothing implements `ISubtitleRenderer`. Nothing constructs a renderer. Function is exported for callers. |
| `ITranslator` | `DefaultTranslator` | Yes. `new DefaultTranslator({...})` unless `options.translator` is set. |
| none named `ITranslationLoader` | `createNetworkTranslationLoader`, `translationsFromGlob` | Glob helper yes (`kitTranslations`). Network loader: export only. |
| `IUrlResolver` | none | No built-in class. Optional `options.urlResolver`. Default path is `auth.transformUrl` + `buildResolvedUrl` in the auth mixin. |

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `IClock` | `export interface IClock { now(): number; }` | nomercy-player-core/src/adapters/clock/IClock.ts:17 |
| `systemClock` | `export const systemClock: IClock = { now: () => Date.now() }` | nomercy-player-core/src/adapters/clock/system.ts:15 |
| `ICueParser` | `export interface ICueParser<T = unknown> { readonly id: string; canParse(url: string, contentType?: string): boolean; parse(raw: string, opts?: { baseUrl?: string }): CueList<T>; }` | nomercy-player-core/src/adapters/cue-parser/ICueParser.ts:20 |
| `ICueParserRegistry` | `export interface ICueParserRegistry { register(parser: ICueParser, prepend?: boolean): void; unregister(id: string): void; resolve(url: string, contentType?: string): ICueParser \| undefined; findById(id: string): ICueParser \| undefined; list(): string[]; dispose(): void; }` | nomercy-player-core/src/adapters/cue-parser/ICueParserRegistry.ts:16 |
| `CueParserRegistry.register` | `register(parser: ICueParser, prepend?: boolean): void` | nomercy-player-core/src/adapters/cue-parser/registry.ts:24 |
| `parseLrc` | `export function parseLrc(text: string): CueList<LrcPayload>` | nomercy-player-core/src/adapters/cue-parser/lrc.ts:44 |
| `parseTimestamp` | `export function parseTimestamp(ts: string): number` | nomercy-player-core/src/adapters/cue-parser/timestamp.ts:33 |
| `parseDurationSeconds` | `export function parseDurationSeconds(value: string): number \| undefined` | nomercy-player-core/src/adapters/cue-parser/timestamp.ts:70 |
| `parseVtt` | `export function parseVtt(text: string): CueList<string>` | nomercy-player-core/src/adapters/cue-parser/vtt.ts:107 |
| `parseVttSubtitles` | `export function parseVttSubtitles(text: string): CueList<VTTSubtitlePayload>` | nomercy-player-core/src/adapters/cue-parser/vtt.ts:123 |
| `parseVttSprite` | `export function parseVttSprite(text: string, baseUrl?: string): CueList<VTTSpritePayload>` | nomercy-player-core/src/adapters/cue-parser/vtt.ts:164 |
| `lrcParser` | `export const lrcParser: ICueParser<LrcPayload>` | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:35 |
| `vttSubtitleParser` | `export const vttSubtitleParser: ICueParser<VTTSubtitlePayload>` | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:50 |
| `spriteVttParser` | `export const spriteVttParser: ICueParser<VTTSpritePayload>` | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:69 |
| `builtInCueParsers` | `export const builtInCueParsers: ReadonlyArray<ICueParser>` | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:88 |
| `createElement` | `export function createElement<K extends keyof HTMLElementTagNameMap>(type: K, id: string, unique?: boolean): CreateElement<HTMLElementTagNameMap[K]>` | nomercy-player-core/src/adapters/element-factory/dom.ts:39 |
| `createSVG` | `export function createSVG(id: string, viewBox: string): SVGSVGElement` | nomercy-player-core/src/adapters/element-factory/dom.ts:102 |
| `createButton` | `export function createButton(id: string, label: string, onClick: (event: Event) => void): HTMLButtonElement` | nomercy-player-core/src/adapters/element-factory/dom.ts:115 |
| `IEventBus` | `export interface IEventBus<E extends Record<string, any> = Record<string, any>>` with `on` / `once` / `off` / `emit` / `hasListeners` / `listenerCount()` | nomercy-player-core/src/adapters/event-bus/IEventBus.ts:18 |
| `EventEmitter` | `export class EventEmitter<E extends Record<string, any> = Record<string, any>>` | nomercy-player-core/src/adapters/event-bus/default.ts:61 |
| `IFetch` | `export interface IFetch { (url: string, opts?: RequestInit): Promise<Response>; }` | nomercy-player-core/src/adapters/fetch/IFetch.ts:22 |
| `defaultFetch` | `export const defaultFetch: IFetch = (url, opts) => fetch(url, opts)` | nomercy-player-core/src/adapters/fetch/default.ts:16 |
| `IIdGenerator` | `export interface IIdGenerator { next(): string; }` | nomercy-player-core/src/adapters/id-generator/IIdGenerator.ts:14 |
| `defaultIdGenerator` | `export const defaultIdGenerator: IIdGenerator` | nomercy-player-core/src/adapters/id-generator/default.ts:16 |
| `ILanguageMatcher` | `export interface ILanguageMatcher { (tag: string): string[]; }` | nomercy-player-core/src/adapters/language-matcher/ILanguageMatcher.ts:16 |
| `bcp47FallbackChain` | `export const bcp47FallbackChain: ILanguageMatcher = (tag) => { ... }` | nomercy-player-core/src/adapters/language-matcher/bcp47.ts:17 |
| `ILifecycleRegistry` | `export interface ILifecycleRegistry { addCleanup(fn: () => void): void; listen(...): void; timeout(fn: () => void, ms: number): number; interval(fn: () => void, ms: number): number; observe<O extends { disconnect(): void }>(observer: O): O; abortable(): AbortController; frame(fn: (deltaMs: number, time: number) => void): void; dispose(): void; isDisposed(): boolean; }` | nomercy-player-core/src/adapters/lifecycle-registry/ILifecycleRegistry.ts:14 |
| `LifecycleRegistry.frame` | `frame(fn: (deltaMs: number, time: number) => void): () => void` | nomercy-player-core/src/adapters/lifecycle-registry/default.ts:174 |
| `ILogger` | `export interface ILogger { trace/debug/info/warn/error(...args: unknown[]): void; level(): LogLevel; level(value: LogLevel): void; addSink(fn: LogSink): () => void; child(suffix: string): ILogger; }` | nomercy-player-core/src/adapters/logger/ILogger.ts:62 |
| `Logger` | `export class Logger implements ILogger { constructor(opts?: LoggerOptions) }` | nomercy-player-core/src/adapters/logger/default.ts:27 |
| `MediaElementBackend` | `export abstract class MediaElementBackend<TEl extends HTMLMediaElement, TPayload extends MinimalBackendEventPayload> extends EventEmitter<TPayload>` | nomercy-player-core/src/adapters/media-element/MediaElementBackend.ts:96 |
| `AuthHeaderProvider` | `export type AuthHeaderProvider = (url: string) => string \| undefined` | nomercy-player-core/src/adapters/media-element/MediaElementBackend.ts:58 |
| `attachHlsOrFallback` | `export function attachHlsOrFallback(HlsModule: unknown, el: HTMLMediaElement, url: string, headerValue: string \| undefined, hlsConfig: HlsLoaderConfig): HlsHandle \| undefined` | nomercy-player-core/src/adapters/media-element/helpers.ts:95 |
| `bridgeBackendPlayState` | `export function bridgeBackendPlayState<TPayload extends MinimalBackendEventPayload>(backend: BackendLifecycleSource<TPayload>, options: BackendLifecycleBridgeOptions<TPayload>): void` | nomercy-player-core/src/adapters/media-element/backend-lifecycle-bridge.ts:81 |
| `IMediaList` | `export interface IMediaList<T extends BasePlaylistItem>` (`get`/`set`/`length`/`current`/`currentIndex`/`replaceItem`/`setCurrent`/`peekNext`/`peekPrevious`/`append`/`prepend`/`insert`/`remove`/`removeAt`/`move`/`clear`/`shuffle`/`sort`/`dispose`) | nomercy-player-core/src/adapters/media-list/IMediaList.ts:33 |
| `MediaList` | `export class MediaList<T extends BasePlaylistItem> extends EventEmitter<MediaListEventMap<T>>` | nomercy-player-core/src/adapters/media-list/default.ts:44 |
| `MediaList.setShuffleStrategy` | `setShuffleStrategy(strategy: IShuffleStrategy): void` | nomercy-player-core/src/adapters/media-list/default.ts:356 |
| `IPlatform` | `export interface IPlatform { wakeLock: IWakeLock; network: INetworkMonitor; visibility: IVisibilityMonitor; capabilities: ICapabilitiesProbe; fullscreen?: IFullscreenController; pip?: IPipController; }` | nomercy-player-core/src/adapters/platform/IPlatform.ts:31 |
| `browserPlatform` | `export const browserPlatform: IPlatform` | nomercy-player-core/src/adapters/platform/browser.ts:359 |
| `IPreloadStrategy` | `export interface IPreloadStrategy { shouldPreload(context: PreloadContext): boolean; assetsToPreload(item: BasePlaylistItem): PreloadAsset[]; cancel(): void; }` | nomercy-player-core/src/adapters/preload/default.ts:99 |
| `DefaultPreloadStrategy` | `export class DefaultPreloadStrategy implements IPreloadStrategy { constructor(private readonly _leadSeconds: number = 10) }` | nomercy-player-core/src/adapters/preload/default.ts:223 |
| `ITransitionStrategy` | `export interface ITransitionStrategy { shouldTransition(context: PreloadContext): boolean; tick(context: TransitionContext, backend: ITransitionBackend \| null): void; start(outgoing: BasePlaylistItem, incoming: BasePlaylistItem, backend: ITransitionBackend \| null): void; complete(from: BasePlaylistItem, to: BasePlaylistItem): void; cancel(reason: string): void; }` | nomercy-player-core/src/adapters/preload/default.ts:173 |
| `CrossfadeTransitionStrategy` | `export class CrossfadeTransitionStrategy implements ITransitionStrategy { constructor(opts: { leadSeconds?: number; tailSeconds?: number; curve?: CrossfadeCurve } = {}) }` | nomercy-player-core/src/adapters/preload/default.ts:271 |
| `GaplessTransitionStrategy` | `export class GaplessTransitionStrategy implements ITransitionStrategy` | nomercy-player-core/src/adapters/preload/default.ts:339 |
| `detectDisplayHdr` | `export function detectDisplayHdr(probe: DisplayRangeProbe \| null = browserDisplayRangeProbe()): boolean` | nomercy-player-core/src/adapters/quality/display-range.ts:61 |
| `hdrDecision` | `export function hdrDecision(levels: ReadonlyArray<QualityLevel>, displayHdr: boolean, backendCanToneMap: boolean, fallback: HdrOnSdrFallback = 'play'): HdrDecision` | nomercy-player-core/src/adapters/quality/hdr-policy.ts:113 |
| `sizeAbrCeiling` | `export function sizeAbrCeiling(levels: ReadonlyArray<QualityLevel>, paneWidthPx: number, paneHeightPx: number): QualityLevel \| null` | nomercy-player-core/src/adapters/quality/size-policy.ts:38 |
| `IRealtimeChannel` | `export interface IRealtimeChannel { send(data: string \| ArrayBuffer \| Blob): void; close(code?: number, reason?: string): void; on(event: 'open' \| 'message' \| 'close' \| 'error', fn: (data?: unknown) => void): void; off(event: 'open' \| 'message' \| 'close' \| 'error', fn: (data?: unknown) => void): void; readonly readyState: 'connecting' \| 'open' \| 'closing' \| 'closed'; }` | nomercy-player-core/src/adapters/realtime/IRealtimeChannel.ts:15 |
| `RealtimeFactory` | `export type RealtimeFactory = (url: string, opts?: RealtimeFactoryOptions) => IRealtimeChannel` | nomercy-player-core/src/adapters/realtime/IRealtimeChannel.ts:94 |
| `nativeWebSocketAdapter` | `export const nativeWebSocketAdapter: RealtimeFactory = (url, opts) => { ... }` | nomercy-player-core/src/adapters/realtime/websocket.ts:23 |
| `RetryConfig` | `export interface RetryConfig { attempts: number; backoff?: 'linear' \| 'exponential'; baseMs?: number; maxMs?: number; refreshFirst?: boolean; }` | nomercy-player-core/src/adapters/retry-policy/IRetryPolicy.ts:20 |
| `IRetryPolicy` | `export type IRetryPolicy = Record<string, RetryConfig>` | nomercy-player-core/src/adapters/retry-policy/IRetryPolicy.ts:38 |
| `DEFAULT_RETRY_POLICY` | `export const DEFAULT_RETRY_POLICY: IRetryPolicy` | nomercy-player-core/src/adapters/retry-policy/default.ts:20 |
| `IShuffleStrategy` | `export interface IShuffleStrategy { order<T extends BasePlaylistItem>(items: ReadonlyArray<T>, currentIndex: number): T[]; }` | nomercy-player-core/src/adapters/shuffle-strategy/IShuffleStrategy.ts:28 |
| `FisherYatesShuffle` | `export class FisherYatesShuffle implements IShuffleStrategy` | nomercy-player-core/src/adapters/shuffle-strategy/default.ts:20 |
| `IStorage` | `export interface IStorage { get(key: string): string \| null \| Promise<string \| null>; set(key: string, value: string): void \| Promise<void>; remove(key: string): void \| Promise<void>; getJSON<T>(key: string): T \| null \| Promise<T \| null>; setJSON<T>(key: string, value: T): void \| Promise<void>; }` | nomercy-player-core/src/adapters/storage/IStorage.ts:24 |
| `LocalStorageBackend` | `export class LocalStorageBackend implements IStorage` | nomercy-player-core/src/adapters/storage/local-storage.ts:20 |
| `IndexedDBBackend` | `export class IndexedDBBackend implements IStorage { constructor(opts?: { dbName?: string; storeName?: string; version?: number }) }` | nomercy-player-core/src/adapters/storage/indexed-db.ts:23 |
| `MemoryStorageBackend` | `export class MemoryStorageBackend implements IStorage` | nomercy-player-core/src/adapters/storage/memory.ts:15 |
| `IStreamSource` | `export interface IStreamSource { readonly kind: 'native' \| 'hls' \| 'dash'; attach(element: HTMLMediaElement): Promise<void>; detach(): void; destroy(): void; state(): StreamSourceState; getLevels?(): StreamLevel[]; setLevel?(idx: number): void; getCurrentLevel?(): StreamLevel \| undefined; setLevelStrategy?(fn: (levels: StreamLevel[], ctx: { bandwidth: number; bufferedSeconds: number }) => number): void; on/off }` | nomercy-player-core/src/adapters/stream/IStreamSource.ts:119 |
| `IStreamFactory` | `export interface IStreamFactory { readonly id: string; canPlay(url: string, contentType?: string, capabilities?: StreamCapabilities): boolean; create(opts: StreamFactoryOptions): IStreamSource; }` | nomercy-player-core/src/adapters/stream/IStreamSource.ts:177 |
| `IStreamRegistry` | `export interface IStreamRegistry { register(factory: IStreamFactory, prepend?: boolean): void; unregister(id: string): void; resolve(opts: StreamFactoryOptions): IStreamSource; has(id: string): boolean; findById(id: string): IStreamFactory \| undefined; list(): string[]; intercept(fn: StreamInterceptor): () => void; runInterceptors(url: string, response: Response): Promise<Response>; dispose(): void; }` | nomercy-player-core/src/adapters/stream/IStreamRegistry.ts:19 |
| `StreamRegistry.resolveCustom` | `resolveCustom(opts: StreamFactoryOptions): IStreamSource \| undefined` | nomercy-player-core/src/adapters/stream/registry.ts:106 |
| `HlsStreamSource` | `export class HlsStreamSource implements IStreamSource { constructor(private readonly url: string, private readonly registry?: StreamRegistry) }` | nomercy-player-core/src/adapters/stream/hls.ts:48 |
| `hlsFactory` | `export const hlsFactory: IStreamFactory` | nomercy-player-core/src/adapters/stream/hls.ts:406 |
| `nativeFactory` | `export const nativeFactory: IStreamFactory` | nomercy-player-core/src/adapters/stream/native.ts:138 |
| `ISubtitleRenderer` | `export interface ISubtitleRenderer { render(markup: string): DocumentFragment \| HTMLElement; }` | nomercy-player-core/src/adapters/subtitle-renderer/ISubtitleRenderer.ts:17 |
| `buildSubtitleFragment` | `export function buildSubtitleFragment(markup: string): DocumentFragment` | nomercy-player-core/src/adapters/subtitle-renderer/dom.ts:24 |
| `ITranslator` | `export interface ITranslator { t(key: string, vars?: Record<string, string>): string; language(): string; language(lang: string): Promise<void>; addTranslations(bundle: Translations): void; translation(lang: string, key: string): string \| undefined; translation(lang: string, key: string, value: string): void; removeTranslations(prefix: string, lang?: string): void; dispose(): void; }` | nomercy-player-core/src/adapters/translator/ITranslator.ts:20 |
| `DefaultTranslator` | `export class DefaultTranslator implements ITranslator { constructor(opts?: DefaultTranslatorOptions) }` | nomercy-player-core/src/adapters/translator/translator.ts:33 |
| `createNetworkTranslationLoader` | `export function createNetworkTranslationLoader(opts: NetworkTranslationLoaderOptions): NetworkTranslationLoader` | nomercy-player-core/src/adapters/translator/loaders/translation-loader.ts:71 |
| `translationsFromGlob` | `export function translationsFromGlob(input: string): Translations` / `export function translationsFromGlob(modules: Record<string, GlobModule \| GlobLazyLoader>): Translations` | nomercy-player-core/src/adapters/translator/loaders/translations-glob.ts:78 |
| `IUrlResolver` | `export interface IUrlResolver { (url: string, ctx: UrlResolverContext): Promise<ResolvedUrl> \| ResolvedUrl; }` | nomercy-player-core/src/adapters/url-resolver/IUrlResolver.ts:101 |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `Logger` level | `opts?.level ?? 'info'` | `Logger` constructor | nomercy-player-core/src/adapters/logger/default.ts:33 |
| `Logger` prefix | `opts?.prefix ? `[${opts.prefix}]` : '[nmplayer]'` | `Logger` constructor | nomercy-player-core/src/adapters/logger/default.ts:34 |
| `LoggerOptions.level` comment | `'info'` | constructor when `opts.level` omitted | nomercy-player-core/src/adapters/logger/ILogger.ts:46 |
| `DefaultPreloadStrategy` lead | `_leadSeconds: number = 10` | `shouldPreload` (`currentTime >= duration - this._leadSeconds`) | nomercy-player-core/src/adapters/preload/default.ts:226 |
| Core preload seed | `new DefaultPreloadStrategy(10)` | `initPlayerCoreState` | (call site outside adapters: core/state.ts:500) |
| Crossfade `leadSeconds` | `opts.leadSeconds ?? 3` | `shouldTransition` | nomercy-player-core/src/adapters/preload/default.ts:277 |
| Crossfade `tailSeconds` | `opts.tailSeconds ?? 3` | stored; `tick` does not read it | nomercy-player-core/src/adapters/preload/default.ts:278 |
| Crossfade `curve` | `opts.curve ?? 'equal-power'` | `_applyGainCurve` | nomercy-player-core/src/adapters/preload/default.ts:279 |
| IndexedDB `dbName` | `opts?.dbName ?? 'nomercy-player'` | `indexedDB.open` | nomercy-player-core/src/adapters/storage/indexed-db.ts:30 |
| IndexedDB `storeName` | `opts?.storeName ?? 'kv'` | object store name | nomercy-player-core/src/adapters/storage/indexed-db.ts:31 |
| IndexedDB `version` | `opts?.version ?? 1` | `indexedDB.open` | nomercy-player-core/src/adapters/storage/indexed-db.ts:32 |
| `DefaultTranslator` language | `opts?.language ?? 'en'` | `t()` / `language()` | nomercy-player-core/src/adapters/translator/translator.ts:42 |
| `DefaultTranslator` fallback language | `opts?.fallbackLanguage === null ? null : (opts?.fallbackLanguage ?? 'en')` | `t()` chain append | nomercy-player-core/src/adapters/translator/translator.ts:53 |
| HLS js config in `HlsStreamSource` | `autoStartLoad: true`, `enableWorker: true`, `lowLatencyMode: false` | `new Hls({...})` | nomercy-player-core/src/adapters/stream/hls.ts:97 |
| LRC last-cue duration | `const DEFAULT_TRAILING_DURATION = 5` | last cue `end = cue.start + 5` | nomercy-player-core/src/adapters/cue-parser/lrc.ts:31 |
| `HdrOnSdrFallback` | `'play'` | `hdrDecision` last branch | nomercy-player-core/src/adapters/quality/hdr-policy.ts:117 |
| `detectDisplayHdr` with no probe | `false` | `if (probe === null) return false` | nomercy-player-core/src/adapters/quality/display-range.ts:62 |
| Secondary audio `preload` | `'auto'` | `createSecondaryAudioElement` | nomercy-player-core/src/adapters/media-element/helpers.ts:313 |
| `bridgeBackendPlayState` reset events | `options.resetEvents ?? ['loadstart']` | reset handler subscribe | nomercy-player-core/src/adapters/media-element/backend-lifecycle-bridge.ts:113 |
| Retry backoff fill-in | `retry.baseMs ?? 500`, `retry.maxMs ?? 30_000`, omitted `backoff` is linear | `computeBackoff` (core/auth-fetch, not this folder) | nomercy-player-core/src/adapters/retry-policy/IRetryPolicy.ts:11 |
| `DEFAULT_RETRY_POLICY['*']` | `{ attempts: 0 }` | unused by player | nomercy-player-core/src/adapters/retry-policy/default.ts:62 |
| `DEFAULT_RETRY_POLICY['core:auth/unauthenticated']` | `{ attempts: 1, refreshFirst: true }` | unused by player | nomercy-player-core/src/adapters/retry-policy/default.ts:39 |
| `PreloadAsset.mode` | `'metadata'` (comment only; field optional) | described for callers | nomercy-player-core/src/adapters/preload/default.ts:85 |
| `MediaList` empty cursor | `-1` | `currentIndex()` | nomercy-player-core/src/adapters/media-list/default.ts:46 |
| `MediaList` shuffle | `fisherYatesShuffle` | `shuffle()` | nomercy-player-core/src/adapters/media-list/default.ts:47 |
| `HlsStreamSource` initial state | `'idle'` | `state()` | nomercy-player-core/src/adapters/stream/hls.ts:56 |
| Network loader parser | `JSON.parse` then object-or-`{}` | `createNetworkTranslationLoader` | nomercy-player-core/src/adapters/translator/loaders/translation-loader.ts:72 |
| `URL_CATEGORY` built-in tokens | `'media'`, `'subtitle'`, `'font'`, `'poster'`, `'sprite'`, `'lyrics'`, `'cast'`, `'license'` | documented for resolvers | nomercy-player-core/src/adapters/url-resolver/IUrlResolver.ts:29 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| Consumers inject a server-synced clock via `setup({ clockSource })`. The default (`systemClock`) delegates to `Date.now()`. | Config type is `clockSource?: () => number`, not `IClock`. Player `now()` never reads `systemClock`. It calls `clockSource()` or `Date.now()`. | nomercy-player-core/src/adapters/clock/IClock.ts:12 |
| The core's `authFetch` orchestrator uses `IFetch` / `defaultFetch` unless the consumer injects a custom transport. | `defaultFetch` is not imported by `src/core`. Auth fetch uses the global `fetch`. | nomercy-player-core/src/adapters/fetch/IFetch.ts:10 |
| `prepend: true` puts the parser at the LOW-priority end. Built-ins use this to seed defaults that can be overridden. | `prepend` does `unshift`. Built-ins are registered with `register(parser)` (no prepend) in lifecycle. Consumer parsers registered after still win because resolve is newest-first. Built-ins do not pass `prepend: true`. | nomercy-player-core/src/adapters/cue-parser/registry.ts:21 |
| The core auto-registers built-in cue parsers at low priority during setup. Consumers do not need to install these manually. Call `player.cueRegistry.unregister(id)` to remove one. | Auto-register is true. The public field on the player is not named `cueRegistry` in this folder. Barrel `cue-parser/index.ts` does not export `builtInCueParsers` / `lrcParser`. | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:12 |
| `parseDurationSeconds` parses `"H:M:S"` / `"M:S"` (integer parts only, no fraction). Returns `undefined` for unrecognised input or zero parts. | `value.split(':').map(Number)` accepts a fractional last part (`"1:24:14.5"`). `split` never yields zero parts. A 4-part string still reduces. | nomercy-player-core/src/adapters/cue-parser/timestamp.ts:60 |
| Sprite VTT activates for `*.sprite.vtt` / `*.sprites.vtt`. | Regex is `/sprite\.vtt(?:\?|$)|sprites?\.vtt(?:\?|$)/i`, so `mysprite.vtt` also matches. | nomercy-player-core/src/adapters/cue-parser/built-ins.ts:32 |
| `ILifecycleRegistry.frame(...)` returns `void`. | Class `frame` returns `() => void` (cancel disposer). | nomercy-player-core/src/adapters/lifecycle-registry/ILifecycleRegistry.ts:21 |
| Children share the parent's registered sinks so consumer-installed pipes capture every plugin's output uniformly. | `child()` copies the sink array at spawn time. Later `addSink` on the parent does not reach existing children. | nomercy-player-core/src/adapters/logger/default.ts:101 |
| `CrossfadeTransitionStrategy` is the default for music. `GaplessTransitionStrategy` is the default for video. | Core sets `_transitionStrategy` to a local `_NOOP_TRANSITION` (`shouldTransition: () => false`). Neither class is constructed under `src`. | nomercy-player-core/src/adapters/preload/default.ts:168 |
| `DefaultPreloadStrategy.cancel` aborts in-flight prefetch initiated by this strategy. | `_abortController` is only ever set to `null`. Nothing assigns a controller. `cancel()` is a no-op. | nomercy-player-core/src/adapters/preload/default.ts:224 |
| ABR calls `canDecode()` to skip variants the device can't handle smoothly. | ABR mixin `canPlay` does call `platform.capabilities.canDecode`. `hdrDecision` / `sizeAbrCeiling` are not called from mixins. | nomercy-player-core/src/adapters/platform/IPlatform.ts:147 |
| Missing `Plugin.onError` entries fall back to `DEFAULT_RETRY_POLICY` in `errors.ts`. | `DEFAULT_RETRY_POLICY` is never read. Plugin recovery looks up `static onError` only. Auth fetch default retry is `{ attempts: 0 }`. | nomercy-player-core/src/adapters/retry-policy/default.ts:14 |
| Default storage is `LocalStorageBackend`. Swap via `setup({ storage })`. | True for the plugin root (`config.storage ?? new LocalStorageBackend()`). | nomercy-player-core/src/adapters/storage/IStorage.ts:14 |
| Built-in stream factories (`native`, `hls`) are pre-registered. When the backend needs to load a URL it calls `resolve()`. | Player production path is `resolveCustomStream` -> `resolveCustom`, which skips ids `native` and `hls`. `StreamRegistry.resolve()` has no production call site under `src`. | nomercy-player-core/src/adapters/stream/registry.ts:28 |
| `hlsFactory` ships pre-registered at the second-highest priority. On native HLS the source sets `element.src` and skips hls.js. | Native branch never sets `_state` to `'ready'` (stays `'loading'` after metadata). Interceptors are not run on the native path (comment there is accurate). | nomercy-player-core/src/adapters/stream/hls.ts:75 |
| The default subtitle implementation (`dom.ts`) builds a `DocumentFragment`. Consumers inject a custom renderer via a plugin. The core does not expose this as a `setup()` field. | `buildSubtitleFragment` exists. No class implements `ISubtitleRenderer`. No plugin in this package injects one. | nomercy-player-core/src/adapters/subtitle-renderer/ISubtitleRenderer.ts:10 |
| `t(key)` resolution: (1) BCP-47 chain (2) `onMissingTranslation` (3) the key itself. | After the BCP-47 chain, `'en'` is appended unless `fallbackLanguage` is `null` or already in the chain. Then missing handler, then key. | nomercy-player-core/src/adapters/translator/translator.ts:23 |
| File `ITranslationLoader.ts` is a loader contract. | File only re-exports `NetworkTranslationLoader`, `NetworkTranslationLoaderOptions`, `GlobModule`. There is no `ITranslationLoader` symbol. | nomercy-player-core/src/adapters/translator/loaders/ITranslationLoader.ts:9 |
| `IEventBus` is a type to write against, not a slot to fill: there is no `eventBus` setup option. | Confirmed: no `eventBus` on config. `EventEmitter` is the class both players extend. | nomercy-player-core/src/adapters/event-bus/IEventBus.ts:13 |
| `hasListeners` is useful before constructing an expensive payload. | `hasListeners` ignores `on('all', ...)` firehose listeners. `listenerCount()` includes them. | nomercy-player-core/src/adapters/event-bus/default.ts:264 |
| `IMediaList` is the queue contract both players delegate to. | Interface omits `setShuffleStrategy`. The class has it. Injecting shuffle via the interface type is impossible. | nomercy-player-core/src/adapters/media-list/IMediaList.ts:33 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `systemClock` is exported (subpath `./adapters/clock`) and documented as the player default. | The player never constructs or reads it. Passing `systemClock` into `setup({ clockSource })` is a type error (`IClock` vs `() => number`). | nomercy-player-core/src/adapters/clock/system.ts:15 |
| `defaultFetch` / `IFetch` are exported as the auth-fetch transport. | Dead export. Swapping fetch for tests or native HTTP requires wrapping `authFetch`, not this adapter. | nomercy-player-core/src/adapters/fetch/default.ts:16 |
| `CrossfadeTransitionStrategy` and `GaplessTransitionStrategy` are exported as the music/video defaults. | Core never constructs them. A caller who only uses player-core gets a no-op transition until a library overwrites `_transitionStrategy`. | nomercy-player-core/src/adapters/preload/default.ts:271 |
| `DEFAULT_RETRY_POLICY` is a detailed per-code table (5 attempts on timeout, 3 on 5xx, 0 on `*`). | Nothing in the player consults it. Per-call fetch retry defaults to zero attempts. | nomercy-player-core/src/adapters/retry-policy/default.ts:20 |
| `hlsFactory` and `nativeFactory` are registered on the player. | `resolveCustom` skips those ids. Registering a factory that claims `.m3u8` works; expecting the built-in `HlsStreamSource` to run on HLS URLs does not. Playback uses `attachHlsOrFallback`. | nomercy-player-core/src/adapters/stream/registry.ts:106 |
| `IndexedDBBackend` and `MemoryStorageBackend` ship next to the default. | Player constructs only `LocalStorageBackend`. Callers must pass `setup({ storage })` themselves. | nomercy-player-core/src/adapters/storage/indexed-db.ts:23 |
| `createNetworkTranslationLoader` is documented as the `setup({ loadTranslations })` helper. | Core never calls it. Core i18n uses `translationsFromGlob` / `getLazyTranslationLoader`. | nomercy-player-core/src/adapters/translator/loaders/translation-loader.ts:71 |
| `ISubtitleRenderer` looks like a setup-injectable renderer. | No implementing class. `render` vs `buildSubtitleFragment` names differ. Injecting one has no player slot. | nomercy-player-core/src/adapters/subtitle-renderer/ISubtitleRenderer.ts:17 |
| `MediaElementBackend` is exported as the HTMLMediaElement substrate. | Abstract. Core does not instantiate it. Music/video backends live in other packages. | nomercy-player-core/src/adapters/media-element/MediaElementBackend.ts:96 |
| `IUrlResolver` has no built-in class in this folder. | Only the interface. Default resolve is not an adapter instance; it is inline in the auth mixin. | nomercy-player-core/src/adapters/url-resolver/IUrlResolver.ts:101 |
| `hdrDecision`, `sizeAbrCeiling`, `abrCeiling`, `panePixels` are public. | Device mixin only calls `detectDisplayHdr()`. The policy functions are unused by core mixins, so an HDR ladder on an SDR pane is not capped here. | nomercy-player-core/src/adapters/quality/hdr-policy.ts:113 |
| `LifecycleRegistry.frame` returns a cancel function. | The published interface types that return as `void`. Callers typed against `ILifecycleRegistry` cannot cancel a loop without a cast. | nomercy-player-core/src/adapters/lifecycle-registry/default.ts:174 |
| Native HLS `HlsStreamSource.attach` waits for `loadedmetadata` then returns. | `_state` stays `'loading'`. `state()` never becomes `'ready'` on the native path. | nomercy-player-core/src/adapters/stream/hls.ts:76 |
| `CrossfadeTransitionStrategy.tick` computes `outGain` then `void outGain`. | Tick only writes `secondaryGain`. Outgoing volume is not applied here. Comment says the real ramp is `backend.crossfade()`, but core never constructs this class anyway. | nomercy-player-core/src/adapters/preload/default.ts:305 |
| `cue-parser/index.ts` does not export `builtInCueParsers`, `parseTimestamp`, or `parseDurationSeconds`. | Package root `index.ts` re-exports timestamp helpers from the file directly. Subpath `./adapters/cue-parser` does not. | nomercy-player-core/src/adapters/cue-parser/index.ts:9 |
| `browserPlatform` getters allocate a new controller on every access. | `{ ...browserPlatform, wakeLock: x }` works because spread invokes getters once. `player.platform().wakeLock` twice is two sentinels; `isHeld()` on the second does not see the first `acquire()`. | nomercy-player-core/src/adapters/platform/browser.ts:359 |
| `IStreamSource.kind` includes `'dash'`. | This package ships `native` and `hls` only. No DASH factory. | nomercy-player-core/src/adapters/stream/IStreamSource.ts:120 |
| Comment in `attachHlsOrFallback` tells the reader not to add defaults or merge config in that helper. | Instruction to the reader, not runtime behavior. The function already adds no defaults. | nomercy-player-core/src/adapters/media-element/helpers.ts:92 |
| `LAZY_TRANSLATIONS_MARKER`: the comment says the export is for player core and that plugin authors never reference it. | Instruction to callers. The symbol is on the public translator barrel. | nomercy-player-core/src/adapters/translator/loaders/translations-glob.ts:19 |
| `EventEmitter.listenersOf` comment tells plugin authors not to call it and to use `on(event, fn)` instead. | Instruction to the reader. Method is public on the class, absent from `IEventBus`. | nomercy-player-core/src/adapters/event-bus/default.ts:291 |
