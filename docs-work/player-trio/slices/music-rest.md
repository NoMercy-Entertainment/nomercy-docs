# Slice: music-rest
Files given: 26
Files opened: 26

## Files opened
- nomercy-music-player/src/adapters/audio-backend/html5-audio.ts
- nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts
- nomercy-music-player/src/adapters/audio-backend/index.ts
- nomercy-music-player/src/adapters/audio-backend/web-audio.ts
- nomercy-music-player/src/adapters/index.ts
- nomercy-music-player/src/adapters/similarity-engine/index.ts
- nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts
- nomercy-music-player/src/iife-entry.ts
- nomercy-music-player/src/index.ts
- nomercy-music-player/src/player/preload.ts
- nomercy-music-player/src/plugins/auto-advance/index.ts
- nomercy-music-player/src/plugins/auto-advance/IPlaylistGenerator.ts
- nomercy-music-player/src/plugins/auto-advance/linear.ts
- nomercy-music-player/src/plugins/auto-advance/smart-shuffle.ts
- nomercy-music-player/src/plugins/cast-sender/index.ts
- nomercy-music-player/src/plugins/index.ts
- nomercy-music-player/src/plugins/key-handler/index.ts
- nomercy-music-player/src/plugins/lyrics/index.ts
- nomercy-music-player/src/plugins/media-session/index.ts
- nomercy-music-player/src/plugins/scrobble/index.ts
- nomercy-music-player/src/plugins/scrobble/IScrobbler.ts
- nomercy-music-player/src/plugins/scrobble/noop.ts
- nomercy-music-player/src/plugins/v1-compat.ts
- nomercy-music-player/src/streams/hls.ts
- nomercy-music-player/src/streams/native.ts
- nomercy-music-player/src/types.ts

## Public surface

| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `nmplayer` | `export function nmplayer<T extends MusicPlaylistItem = MusicPlaylistItem>(id?: string | number): NMMusicPlayer<T>` | nomercy-music-player/src/index.ts:885 |
| default export | `export default nmplayer` | nomercy-music-player/src/index.ts:892 |
| IIFE default | `export { nmplayer as default } from './index'` | nomercy-music-player/src/iife-entry.ts:9 |
| `NMMusicPlayer` | `export class NMMusicPlayer<T extends MusicPlaylistItem = MusicPlaylistItem> extends EventEmitter<MusicEventMap<T>> implements IPlayer<MusicEventMap<T>>, IMusicPlayer<T>` | nomercy-music-player/src/index.ts:140-142 |
| `NMMusicPlayer` constructor | `constructor(id?: string | number)` | nomercy-music-player/src/index.ts:321 |
| `NMMusicPlayer.playerId` | `readonly playerId: string = ''` | nomercy-music-player/src/index.ts:143 |
| `NMMusicPlayer.container` | `container!: HTMLElement` | nomercy-music-player/src/index.ts:144 |
| `NMMusicPlayer.id` | `get id(): string` | nomercy-music-player/src/index.ts:146 |
| `NMMusicPlayer.__eventMap__` | `declare readonly __eventMap__: MusicEventMap<T>` | nomercy-music-player/src/index.ts:156 |
| `NMMusicPlayer.options` | `declare options: MusicPlayerConfig<T>` | nomercy-music-player/src/index.ts:158 |
| `NMMusicPlayer._currentEpoch` | `declare _currentEpoch: number | undefined` | nomercy-music-player/src/index.ts:163 |
| `NMMusicPlayer.setup` | `declare setup: (config: MusicPlayerConfig<T>) => this` | nomercy-music-player/src/index.ts:169 |
| `NMMusicPlayer.ready` | `declare ready: () => Promise<void>` | nomercy-music-player/src/index.ts:170 |
| `NMMusicPlayer.dispose` | `declare dispose: () => Promise<void>` (prototype then wrapped) | nomercy-music-player/src/index.ts:171,784 |
| `NMMusicPlayer.setupState` | `declare setupState: () => SetupState` | nomercy-music-player/src/index.ts:172 |
| `NMMusicPlayer.phase` | `declare phase: () => PlayerPhase` | nomercy-music-player/src/index.ts:173 |
| `NMMusicPlayer.dispatching` | `declare dispatching: () => ReadonlyArray<string>` | nomercy-music-player/src/index.ts:174 |
| `NMMusicPlayer.baseUrl` | `declare baseUrl: { (): string | undefined; (url: string): void }` | nomercy-music-player/src/index.ts:176-179 |
| `NMMusicPlayer.audioContext` | `declare audioContext: () => AudioContext | undefined` | nomercy-music-player/src/index.ts:181 |
| `NMMusicPlayer.experimental` | `declare experimental: PlayerExperimental` | nomercy-music-player/src/index.ts:182 |
| `NMMusicPlayer.t` | `declare t: { (key: string, vars?: Record<string, string>): string; (PluginClass: PluginCtorWithId, key: string, vars?: Record<string, string>): string }` | nomercy-music-player/src/index.ts:184-187 |
| `NMMusicPlayer.language` | `declare language: { (): string; (lang: string): Promise<void> }` | nomercy-music-player/src/index.ts:189-192 |
| `NMMusicPlayer.addTranslations` | `declare addTranslations: (bundle: Translations) => void` | nomercy-music-player/src/index.ts:194 |
| `NMMusicPlayer.translation` | `declare translation: { (lang: string, key: string): string | undefined; (lang: string, key: string, value: string): void }` | nomercy-music-player/src/index.ts:195-198 |
| `NMMusicPlayer.removeTranslations` | `declare removeTranslations: (prefix: string, lang?: string) => void` | nomercy-music-player/src/index.ts:200 |
| `NMMusicPlayer.registerCueParser` | `declare registerCueParser: (parser: ICueParser, prepend?: boolean) => void` | nomercy-music-player/src/index.ts:202 |
| `NMMusicPlayer.unregisterCueParser` | `declare unregisterCueParser: (id: string) => void` | nomercy-music-player/src/index.ts:203 |
| `NMMusicPlayer.resolveCueParser` | `declare resolveCueParser: (url: string) => ICueParser | undefined` | nomercy-music-player/src/index.ts:204 |
| `NMMusicPlayer.play` | `declare play: (opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:206 |
| `NMMusicPlayer.pause` | `declare pause: (opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:207 |
| `NMMusicPlayer.stop` | `declare stop: (opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:208 |
| `NMMusicPlayer.togglePlayback` | `declare togglePlayback: (opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:209 |
| `NMMusicPlayer.next` | `declare next: (opts?: LoadOptions) => Promise<void>` | nomercy-music-player/src/index.ts:210 |
| `NMMusicPlayer.previous` | `declare previous: (opts?: LoadOptions) => Promise<void>` | nomercy-music-player/src/index.ts:211 |
| `NMMusicPlayer.rewind` | `declare rewind: (seconds?: number, opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:212 |
| `NMMusicPlayer.forward` | `declare forward: (seconds?: number, opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:213 |
| `NMMusicPlayer.restart` | `declare restart: (opts?: ActionOptions) => Promise<void>` | nomercy-music-player/src/index.ts:214 |
| `NMMusicPlayer.registerTitleTokens` | `declare registerTitleTokens: (tokens: Record<string, string>) => void` | nomercy-music-player/src/index.ts:215 |
| `NMMusicPlayer.time` | `declare time: { (): number; (seconds: number, opts?: ActionOptions): Promise<void> }` | nomercy-music-player/src/index.ts:217-220 |
| `NMMusicPlayer.duration` | `declare duration: () => number` | nomercy-music-player/src/index.ts:222 |
| `NMMusicPlayer.buffered` | `declare buffered: () => number` | nomercy-music-player/src/index.ts:223 |
| `NMMusicPlayer.bufferedRanges` | `declare bufferedRanges: () => TimeRanges` | nomercy-music-player/src/index.ts:224 |
| `NMMusicPlayer.seekable` | `declare seekable: () => TimeRanges` | nomercy-music-player/src/index.ts:225 |
| `NMMusicPlayer.timeData` | `declare timeData: () => KitTimeState` | nomercy-music-player/src/index.ts:226 |
| `NMMusicPlayer.seekByPercentage` | `declare seekByPercentage: (pct: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:228 |
| `NMMusicPlayer.playbackRate` | `declare playbackRate: { (): number; (rate: number): Promise<void> }` | nomercy-music-player/src/index.ts:230-233 |
| `NMMusicPlayer.playbackRates` | `declare playbackRates: () => number[]` | nomercy-music-player/src/index.ts:235 |
| `NMMusicPlayer.volume` | `declare volume: { (): number; (level: number): Promise<void> }` | nomercy-music-player/src/index.ts:237-240 |
| `NMMusicPlayer.mute` | `declare mute: () => Promise<void>` | nomercy-music-player/src/index.ts:242 |
| `NMMusicPlayer.unmute` | `declare unmute: () => Promise<void>` | nomercy-music-player/src/index.ts:243 |
| `NMMusicPlayer.toggleMute` | `declare toggleMute: () => void` | nomercy-music-player/src/index.ts:244 |
| `NMMusicPlayer.volumeUp` | `declare volumeUp: (step?: number) => void` | nomercy-music-player/src/index.ts:245 |
| `NMMusicPlayer.volumeDown` | `declare volumeDown: (step?: number) => void` | nomercy-music-player/src/index.ts:246 |
| `NMMusicPlayer.bumpActivity` | `declare bumpActivity: () => void` | nomercy-music-player/src/index.ts:248 |
| `NMMusicPlayer.activityTracking` | `declare activityTracking: { (): boolean; (enabled: boolean): void }` | nomercy-music-player/src/index.ts:249-252 |
| `NMMusicPlayer.playState` | `declare playState: () => PlayState` | nomercy-music-player/src/index.ts:254 |
| `NMMusicPlayer.volumeState` | `declare volumeState: () => VolumeState` | nomercy-music-player/src/index.ts:255 |
| `NMMusicPlayer.repeatState` | `declare repeatState: { (): RepeatState; (state: RepeatState): Promise<void> }` | nomercy-music-player/src/index.ts:256-259 |
| `NMMusicPlayer.shuffleState` | `declare shuffleState: { (): ShuffleState; (state: ShuffleState | boolean): Promise<void> }` | nomercy-music-player/src/index.ts:261-264 |
| `NMMusicPlayer.queue` | `declare queue: { (): ReadonlyArray<T>; (items: T[], opts?: ActionOptions): void }` | nomercy-music-player/src/index.ts:266-269 |
| `NMMusicPlayer.queueAppend` | `declare queueAppend: (item: T | T[], opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:271 |
| `NMMusicPlayer.queuePrepend` | `declare queuePrepend: (item: T | T[], opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:272 |
| `NMMusicPlayer.queueInsert` | `declare queueInsert: (item: T | T[], index: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:273 |
| `NMMusicPlayer.queueRemove` | `declare queueRemove: (id: string | number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:274 |
| `NMMusicPlayer.queueRemoveAt` | `declare queueRemoveAt: (index: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:275 |
| `NMMusicPlayer.queueMove` | `declare queueMove: (from: number, to: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:276 |
| `NMMusicPlayer.queueClear` | `declare queueClear: (opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:277 |
| `NMMusicPlayer.queueShuffle` | `declare queueShuffle: (opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:278 |
| `NMMusicPlayer.queueSort` | `declare queueSort: (compare: (itemA: T, itemB: T) => number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:279 |
| `NMMusicPlayer.peekNext` | `declare peekNext: () => T | undefined` | nomercy-music-player/src/index.ts:280 |
| `NMMusicPlayer.peekPrevious` | `declare peekPrevious: () => T | undefined` | nomercy-music-player/src/index.ts:281 |
| `NMMusicPlayer.queueLength` | `declare queueLength: () => number` | nomercy-music-player/src/index.ts:282 |
| `NMMusicPlayer.queueIndexOf` | `declare queueIndexOf: (id: string | number) => number` | nomercy-music-player/src/index.ts:283 |
| `NMMusicPlayer.item` | `declare item: { (): T | undefined; (target: T | string | number, opts?: LoadOptions): void }` | nomercy-music-player/src/index.ts:285-288 |
| `NMMusicPlayer.index` | `declare index: () => number` | nomercy-music-player/src/index.ts:290 |
| `NMMusicPlayer.seekToIndex` | `declare seekToIndex: (position: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:291 |
| `NMMusicPlayer.playItem` | `declare playItem: (target: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean), opts?: LoadOptions) => void` | nomercy-music-player/src/index.ts:293-296 |
| `NMMusicPlayer.playNow` | `declare playNow: (items: BasePlaylistItem[], start?: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean), opts?: LoadOptions) => void` | nomercy-music-player/src/index.ts:298-302 |
| `NMMusicPlayer.backlog` | `declare backlog: { (): ReadonlyArray<T>; (items: T[]): void }` | nomercy-music-player/src/index.ts:304-307 |
| `NMMusicPlayer.backlogAppend` | `declare backlogAppend: (item: T | T[]) => void` | nomercy-music-player/src/index.ts:309 |
| `NMMusicPlayer.backlogRemove` | `declare backlogRemove: (id: string | number) => void` | nomercy-music-player/src/index.ts:310 |
| `NMMusicPlayer.backlogClear` | `declare backlogClear: () => void` | nomercy-music-player/src/index.ts:311 |
| `NMMusicPlayer.addPlugin` | `declare addPlugin: <P extends Plugin<any, any, any>>(PluginClass: PluginCtorWithId & (new () => P), opts?: P['opts']) => this` | nomercy-music-player/src/index.ts:313 |
| `NMMusicPlayer.getPlugin` | `declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined` | nomercy-music-player/src/index.ts:314 |
| `NMMusicPlayer.getPluginById` | `declare getPluginById: <P extends object = object>(id: string) => P | undefined` | nomercy-music-player/src/index.ts:315 |
| `NMMusicPlayer.removePlugin` | `declare removePlugin: <P extends Plugin<any, any, any>>(PluginClass: PluginCtorWithId & (new () => P)) => void` | nomercy-music-player/src/index.ts:316 |
| `NMMusicPlayer.removePluginById` | `declare removePluginById: (id: string) => void` | nomercy-music-player/src/index.ts:317 |
| `NMMusicPlayer.plugins` | `declare plugins: () => ReadonlyArray<Plugin>` | nomercy-music-player/src/index.ts:318 |
| `NMMusicPlayer.enabledPlugins` | `declare enabledPlugins: () => ReadonlyArray<Plugin>` | nomercy-music-player/src/index.ts:319 |
| `NMMusicPlayer._resetRegistry` | `static _resetRegistry(): void` | nomercy-music-player/src/index.ts:338 |
| `NMMusicPlayer.registerStream` | `declare registerStream: (factory: IStreamFactory, prepend?: boolean) => this` | nomercy-music-player/src/index.ts:343 |
| `NMMusicPlayer.unregisterStream` | `declare unregisterStream: (id: string) => this` | nomercy-music-player/src/index.ts:344 |
| `NMMusicPlayer.streams` | `declare streams: () => ReadonlyArray<string>` | nomercy-music-player/src/index.ts:345 |
| `NMMusicPlayer.getStreamFactory` | `declare getStreamFactory: (id: string) => IStreamFactory | undefined` | nomercy-music-player/src/index.ts:346 |
| `NMMusicPlayer.backend` | `backend(): IAudioBackend; backend(kind: AudioBackendKind): Promise<void>` | nomercy-music-player/src/index.ts:365-366 |
| `NMMusicPlayer.crossfadeTo` | `async crossfadeTo(item: T, opts?: CrossfadeOptions & ActionOptions): Promise<void>` | nomercy-music-player/src/index.ts:573 |
| `NMMusicPlayer.isTransitioning` | `isTransitioning(): boolean` | nomercy-music-player/src/index.ts:668 |
| `NMMusicPlayer.bufferState` | `declare bufferState: () => BufferState` | nomercy-music-player/src/index.ts:673 |
| `NMMusicPlayer.networkState` | `declare networkState: () => NetworkState` | nomercy-music-player/src/index.ts:674 |
| `NMMusicPlayer.streamState` | `declare streamState: () => string` | nomercy-music-player/src/index.ts:675 |
| `NMMusicPlayer.visibilityState` | `declare visibilityState: () => VisibilityState` | nomercy-music-player/src/index.ts:676 |
| `NMMusicPlayer.qualityMode` | `declare qualityMode: { (): QualityState; (target: number | 'auto'): void }` | nomercy-music-player/src/index.ts:677-680 |
| `NMMusicPlayer.audioTrackMode` | `declare audioTrackMode: { (): AudioTrackState; (idx: number): void }` | nomercy-music-player/src/index.ts:682-685 |
| `NMMusicPlayer.platform` | `declare platform: () => IPlatform` | nomercy-music-player/src/index.ts:688 |
| `NMMusicPlayer.isTv` | `declare isTv: () => boolean` | nomercy-music-player/src/index.ts:689 |
| `NMMusicPlayer.isMobile` | `declare isMobile: () => boolean` | nomercy-music-player/src/index.ts:690 |
| `NMMusicPlayer.isDesktop` | `declare isDesktop: () => boolean` | nomercy-music-player/src/index.ts:691 |
| `NMMusicPlayer.device` | `declare device: () => DeviceCapabilities` | nomercy-music-player/src/index.ts:692 |
| `NMMusicPlayer.canPlay` | `declare canPlay: (profile: { contentType: string; width?: number; height?: number; bitrate?: number; framerate?: number }) => Promise<CanPlayResult>` | nomercy-music-player/src/index.ts:695 |
| `NMMusicPlayer.bandwidth` | `declare bandwidth: () => number` | nomercy-music-player/src/index.ts:696 |
| `NMMusicPlayer.bandwidthEstimator` | `declare bandwidthEstimator: { (): (() => number) | undefined; (fn: () => number): void }` | nomercy-music-player/src/index.ts:697-700 |
| `NMMusicPlayer.audioOutputs` | `declare audioOutputs: () => Promise<MediaDeviceInfo[]>` | nomercy-music-player/src/index.ts:703 |
| `NMMusicPlayer.selectAudioOutput` | `declare selectAudioOutput: () => Promise<MediaDeviceInfo | null>` | nomercy-music-player/src/index.ts:704 |
| `NMMusicPlayer.audioOutput` | `declare audioOutput: { (): Promise<string | null>; (deviceId: string): Promise<void> }` | nomercy-music-player/src/index.ts:705-708 |
| `NMMusicPlayer.audioTracks` | `declare audioTracks: () => AudioTrack[]` | nomercy-music-player/src/index.ts:713 |
| `NMMusicPlayer.audioTrack` | `declare audioTrack: { (): CurrentAudioTrackSelection | null; (idx: number): Promise<void> }` | nomercy-music-player/src/index.ts:714-717 |
| `NMMusicPlayer.qualityLevels` | `declare qualityLevels: { (): QualityLevel[]; (opts: { includeUnsupported: true }): QualityLevel[] }` | nomercy-music-player/src/index.ts:719-722 |
| `NMMusicPlayer.quality` | `declare quality: { (): CurrentQualitySelection | 'auto'; (idx: number | 'auto'): void }` | nomercy-music-player/src/index.ts:724-727 |
| `NMMusicPlayer.chapters` | `declare chapters: () => Chapter[]` | nomercy-music-player/src/index.ts:729 |
| `NMMusicPlayer.chapter` | `declare chapter: { (): Chapter | null; (idx: number): void }` | nomercy-music-player/src/index.ts:730-733 |
| `NMMusicPlayer.seekToChapter` | `declare seekToChapter: (idx: number, opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:735 |
| `NMMusicPlayer.nextChapter` | `declare nextChapter: (opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:736 |
| `NMMusicPlayer.previousChapter` | `declare previousChapter: (opts?: ActionOptions) => void` | nomercy-music-player/src/index.ts:737 |
| `NMMusicPlayer.castState` | `declare castState: () => CastState` | nomercy-music-player/src/index.ts:740 |
| `NMMusicPlayer.transferTo` | `declare transferTo: (target: CastTarget) => Promise<void>` | nomercy-music-player/src/index.ts:741 |
| `NMMusicPlayer.auth` | `declare auth: { (): Readonly<AuthConfig> | undefined; (config: AuthConfig): void; (partial: Partial<AuthConfig>): void; (clear: null): void }` | nomercy-music-player/src/index.ts:744-749 |
| `NMMusicPlayer.refreshAuth` | `declare refreshAuth: () => Promise<void>` | nomercy-music-player/src/index.ts:751 |
| `NMMusicPlayer.resolveUrl` | `declare resolveUrl: (url: string, category?: UrlCategory) => Promise<ResolvedUrl>` | nomercy-music-player/src/index.ts:752 |
| `NMMusicPlayer.urlResolver` | `declare urlResolver: { (): IUrlResolver | undefined; (resolver: IUrlResolver | undefined): void }` | nomercy-music-player/src/index.ts:753-756 |
| `NMMusicPlayer.metrics` | `declare metrics: () => PlaybackMetrics` | nomercy-music-player/src/index.ts:759 |
| `NMMusicPlayer.recordMetric` | `declare recordMetric: (name: string, value: number) => void` | nomercy-music-player/src/index.ts:760 |
| `NMMusicPlayer.now` | `declare now: () => number` | nomercy-music-player/src/index.ts:761 |
| `NMMusicPlayer.announce` | `declare announce: (text: string, level?: AriaLiveLevel) => void` | nomercy-music-player/src/index.ts:762 |
| `NMMusicPlayer.setPreloadStrategy` | `declare setPreloadStrategy: (strategy: IPreloadStrategy) => void` | nomercy-music-player/src/index.ts:765 |
| `NMMusicPlayer.setTransitionStrategy` | `declare setTransitionStrategy: (strategy: ITransitionStrategy) => void` | nomercy-music-player/src/index.ts:766 |
| `NMMusicPlayer.preloadStrategy` | `declare preloadStrategy: () => IPreloadStrategy` | nomercy-music-player/src/index.ts:767 |
| `NMMusicPlayer.transitionStrategy` | `declare transitionStrategy: () => ITransitionStrategy` | nomercy-music-player/src/index.ts:768 |
| `MusicPreloadStrategy` | `export class MusicPreloadStrategy extends DefaultPreloadStrategy` | nomercy-music-player/src/player/preload.ts:22 |
| `MusicPreloadStrategy.assetsToPreload` | `override assetsToPreload(item: BasePlaylistItem): PreloadAsset[]` | nomercy-music-player/src/player/preload.ts:23 |
| `V1MusicCompatPlugin` | `export class V1MusicCompatPlugin extends Plugin<NMMusicPlayer>` | nomercy-music-player/src/plugins/v1-compat.ts:120 |
| `MusicPlaylistItem` | `export interface MusicPlaylistItem extends BasePlaylistItem` | nomercy-music-player/src/types.ts:27 |
| `MusicEventMap` | `export interface MusicEventMap<T extends MusicPlaylistItem = MusicPlaylistItem> extends BaseEventMap<T>` | nomercy-music-player/src/types.ts:81 |
| `CrossfadeOptions` | `export interface CrossfadeOptions { duration: number; curve?: CrossfadeCurve; startAt?: number }` | nomercy-music-player/src/types.ts:101-106 |
| `AudioBackendFactory` | `export type AudioBackendFactory = (kind: AudioBackendKind, config: MusicPlayerConfig<BasePlaylistItem>) => IAudioBackend` | nomercy-music-player/src/types.ts:114-117 |
| `IMusicPlayer` | `export interface IMusicPlayer<T extends MusicPlaylistItem = MusicPlaylistItem> extends IPlayer<MusicEventMap<T>>` | nomercy-music-player/src/types.ts:124-125 |
| `IMusicPlayer.backend` | `backend(): IAudioBackend; backend(kind: AudioBackendKind): Promise<void>` | nomercy-music-player/src/types.ts:126-127 |
| `IMusicPlayer.crossfadeTo` | `crossfadeTo(item: T, opts?: CrossfadeOptions & ActionOptions): Promise<void>` | nomercy-music-player/src/types.ts:128 |
| `IMusicPlayer.isTransitioning` | `isTransitioning(): boolean` | nomercy-music-player/src/types.ts:129 |
| `IMusicPlayer.setTransitionStrategy` | `setTransitionStrategy(strategy: ITransitionStrategy): void` | nomercy-music-player/src/types.ts:132 |
| `MusicPlayerConfig` | `export interface MusicPlayerConfig<T extends BasePlaylistItem = MusicPlaylistItem> extends BasePlayerConfig` | nomercy-music-player/src/types.ts:156 |
| `PlayState` / `VolumeState` / `RepeatState` / `ShuffleState` / `QualityState` / `AudioTrackState` | re-export from `@nomercy-entertainment/nomercy-player-core` | nomercy-music-player/src/types.ts:56-63 |
| `TimeState` | `export type { TimeState } from '@nomercy-entertainment/nomercy-player-core'` | nomercy-music-player/src/types.ts:66 |
| `CrossfadeCurve` | `export type { CrossfadeCurve }` | nomercy-music-player/src/types.ts:99 |
| `AudioBackendKind` | `export type AudioBackendKind = typeof AUDIO_BACKEND_KIND[keyof typeof AUDIO_BACKEND_KIND]` | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:23 |
| `AUDIO_BACKEND_KIND` | `export const AUDIO_BACKEND_KIND = { AUDIO_ELEMENT: 'audio-element', WEBAUDIO: 'webaudio' } as const` | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:17-20 |
| `BackendEvent` | `export type BackendEvent = keyof BackendEventPayload` | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:30 |
| `BackendEventPayload` | `export interface BackendEventPayload extends MinimalBackendEventPayload` | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:40 |
| `IAudioBackend` | `export interface IAudioBackend` | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:85 |
| `AudioElementBackend` | `export class AudioElementBackend extends MediaElementBackend<HTMLAudioElement, BackendEventPayload> implements IAudioBackend` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:41-43 |
| `AudioElementBackend` constructor | `constructor(container?: HTMLElement, opts?: { element?: HTMLAudioElement })` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:59 |
| `WebAudioBackend` | `export class WebAudioBackend extends MediaElementBackend<HTMLAudioElement, BackendEventPayload> implements IAudioBackend` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:87-89 |
| `WebAudioBackend` constructor | `constructor(container?: HTMLElement, opts?: { audioContext?: AudioContext })` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:110 |
| `ISimilarityEngine` | `export interface ISimilarityEngine<T extends BasePlaylistItem = BasePlaylistItem>` | nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts:26 |
| `ISimilarityEngine.findSimilar` | `findSimilar(seed: T, opts?: SimilarityQueryOptions): Promise<T[]>` | nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts:38-41 |
| `SimilarityQueryOptions` | `export interface SimilarityQueryOptions` | nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts:45 |
| `hlsFactory` (default too) | `export { default, hlsFactory } from '@nomercy-entertainment/nomercy-player-core/streams/hls'` | nomercy-music-player/src/streams/hls.ts:9 |
| `nativeFactory` (default too) | `export { default, nativeFactory } from '@nomercy-entertainment/nomercy-player-core/streams/native'` | nomercy-music-player/src/streams/native.ts:9 |
| `AutoAdvancePlugin` | `export class AutoAdvancePlugin extends Plugin<NMMusicPlayer, AutoAdvanceOptions>` | nomercy-music-player/src/plugins/auto-advance/index.ts:47 |
| `autoAdvancePlugin` | `export const autoAdvancePlugin = AutoAdvancePlugin` | nomercy-music-player/src/plugins/auto-advance/index.ts:178 |
| `AutoAdvancePlugin.advance` | `async advance(): Promise<void>` | nomercy-music-player/src/plugins/auto-advance/index.ts:75 |
| `AutoAdvancePlugin.preloadNext` | `async preloadNext(): Promise<void>` | nomercy-music-player/src/plugins/auto-advance/index.ts:92 |
| `AutoAdvancePlugin.addEndedHandler` | `addEndedHandler(fn: EndedHandler): void` | nomercy-music-player/src/plugins/auto-advance/index.ts:106 |
| `AutoAdvancePlugin.addPreloadHandler` | `addPreloadHandler(fn: PreloadHandler): void` | nomercy-music-player/src/plugins/auto-advance/index.ts:111 |
| `AutoAdvancePlugin.addCrossfadeHandler` | `addCrossfadeHandler(fn: CrossfadeHandler): void` | nomercy-music-player/src/plugins/auto-advance/index.ts:116 |
| `AutoAdvanceOptions` | `export interface AutoAdvanceOptions` | nomercy-music-player/src/plugins/auto-advance/index.ts:19 |
| `IPlaylistGenerator` | `export interface IPlaylistGenerator<T extends BasePlaylistItem = BasePlaylistItem>` | nomercy-music-player/src/plugins/auto-advance/IPlaylistGenerator.ts:29 |
| `IPlaylistGenerator.next` | `next(items: ReadonlyArray<T>, currentIndex: number): number | undefined` | nomercy-music-player/src/plugins/auto-advance/IPlaylistGenerator.ts:42 |
| `IPlaylistGenerator.previous` | `previous(items: ReadonlyArray<T>, currentIndex: number): number | undefined` | nomercy-music-player/src/plugins/auto-advance/IPlaylistGenerator.ts:52 |
| `LinearPlaylistGenerator` | `export class LinearPlaylistGenerator<T extends BasePlaylistItem = BasePlaylistItem> implements IPlaylistGenerator<T>` | nomercy-music-player/src/plugins/auto-advance/linear.ts:22-23 |
| `SmartShuffleGenerator` | `export class SmartShuffleGenerator<T extends BasePlaylistItem = BasePlaylistItem> implements IPlaylistGenerator<T>` | nomercy-music-player/src/plugins/auto-advance/smart-shuffle.ts:34-35 |
| `CastSenderPlugin` | `export class CastSenderPlugin<T extends MusicPlaylistItem = MusicPlaylistItem> extends BaseCastSenderPlugin<NMMusicPlayer<T>, T>` | nomercy-music-player/src/plugins/cast-sender/index.ts:32 |
| `castSenderPlugin` | `export const castSenderPlugin = CastSenderPlugin` | nomercy-music-player/src/plugins/cast-sender/index.ts:64 |
| `KeyHandlerPlugin` | `export class KeyHandlerPlugin<T extends MusicPlaylistItem = MusicPlaylistItem> extends BaseKeyHandler<NMMusicPlayer<T>>` | nomercy-music-player/src/plugins/key-handler/index.ts:23 |
| `keyHandlerPlugin` | `export const keyHandlerPlugin = KeyHandlerPlugin` | nomercy-music-player/src/plugins/key-handler/index.ts:48 |
| `LyricsPlugin` | `export class LyricsPlugin<T extends MusicPlaylistItem = MusicPlaylistItem> extends Plugin<NMMusicPlayer<T>, LyricsOptions, LyricsEvents>` | nomercy-music-player/src/plugins/lyrics/index.ts:53 |
| `lyricsPlugin` | `export const lyricsPlugin = LyricsPlugin` | nomercy-music-player/src/plugins/lyrics/index.ts:186 |
| `LyricsPlugin.current` | `current(): LyricPayload | undefined` | nomercy-music-player/src/plugins/lyrics/index.ts:88 |
| `LyricsPlugin.all` | `all(): ReadonlyArray<Cue<LyricPayload>>` | nomercy-music-player/src/plugins/lyrics/index.ts:93 |
| `LyricsPlugin.clear` | `clear(): void` | nomercy-music-player/src/plugins/lyrics/index.ts:98 |
| `LyricsPlugin.fetchLyrics` | `async fetchLyrics(url: string): Promise<CueList<LyricPayload> | undefined>` | nomercy-music-player/src/plugins/lyrics/index.ts:112 |
| `LyricsEvents` | `export interface LyricsEvents` | nomercy-music-player/src/plugins/lyrics/index.ts:21 |
| `LyricsOptions` | `export interface LyricsOptions` | nomercy-music-player/src/plugins/lyrics/index.ts:30 |
| `MediaSessionPlugin` | `export class MediaSessionPlugin<T extends MusicPlaylistItem = MusicPlaylistItem> extends BaseMediaSession<T, NMMusicPlayer<T>>` | nomercy-music-player/src/plugins/media-session/index.ts:27 |
| `mediaSessionPlugin` | `export const mediaSessionPlugin = MediaSessionPlugin` | nomercy-music-player/src/plugins/media-session/index.ts:42 |
| `ScrobblePlugin` | `export class ScrobblePlugin extends Plugin<NMMusicPlayer, ScrobbleOptions, ScrobbleEvents>` | nomercy-music-player/src/plugins/scrobble/index.ts:54 |
| `scrobblePlugin` | `export const scrobblePlugin = ScrobblePlugin` | nomercy-music-player/src/plugins/scrobble/index.ts:190 |
| `ScrobblePlugin.listened` | `listened(): number` | nomercy-music-player/src/plugins/scrobble/index.ts:97 |
| `ScrobblePlugin.isScrobbled` | `isScrobbled(): boolean` | nomercy-music-player/src/plugins/scrobble/index.ts:102 |
| `ScrobbleOptions` | `export interface ScrobbleOptions` | nomercy-music-player/src/plugins/scrobble/index.ts:20 |
| `ScrobbleEvents` | `export interface ScrobbleEvents` | nomercy-music-player/src/plugins/scrobble/index.ts:32 |
| `IScrobbler` | `export interface IScrobbler<T extends BasePlaylistItem = BasePlaylistItem>` | nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:25 |
| `IScrobbler.scrobble` | `scrobble(item: T, context: ScrobbleContext): Promise<void>` | nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:35 |
| `IScrobbler.nowPlaying` | `nowPlaying?(item: T): Promise<void>` | nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:44 |
| `ScrobbleContext` | `export interface ScrobbleContext` | nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:48 |
| `NoopScrobbler` | `export class NoopScrobbler<T extends BasePlaylistItem = BasePlaylistItem> implements IScrobbler<T>` | nomercy-music-player/src/plugins/scrobble/noop.ts:21-22 |
| plugins barrel (core re-exports) | `audioGraphPlugin`, `AudioGraphPlugin`, `canvasPlugin`, `CanvasPlugin`, `equalizerPlugin`, `EqualizerPlugin`, `mixerPlugin`, `MixerPlugin`, `spectrumPlugin`, `SpectrumPlugin`, `VisualizationPlugin`, `volumeMemoryPlugin`, `VolumeMemoryPlugin`, `embedPlugin`, `EmbedPlugin`, `messagePlugin`, `MessagePlugin`, `tabLeaderPlugin`, `TabLeaderPlugin` plus matching option/event types | nomercy-music-player/src/plugins/index.ts:38-87 |
| `NotImplementedError` | `export { NotImplementedError } from '@nomercy-entertainment/nomercy-player-core'` | nomercy-music-player/src/index.ts:99 |

## Literal defaults

| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `backend` | `'audio-element'` | `NMMusicPlayer.backend()` getter via `opts?.backend ?? 'audio-element'` | nomercy-music-player/src/index.ts:371 |
| `preloadLeadSeconds` | `10` | wrapped `setup` | nomercy-music-player/src/index.ts:820 |
| `crossfadeLeadSeconds` | `3` | wrapped `setup` | nomercy-music-player/src/index.ts:821 |
| `crossfadeTailSeconds` | `3` | wrapped `setup` | nomercy-music-player/src/index.ts:822 |
| `crossfadeEnabled` | `true` | injected by wrapped `setup`; `_wireAutomaticCrossfade` treats only `=== false` as off | nomercy-music-player/src/index.ts:826,544 |
| `CrossfadeTransitionStrategy.curve` | `'equal-power'` | wrapped `setup` when `config.crossfadeDefaults?.curve` is absent | nomercy-music-player/src/index.ts:836 |
| `crossfadeTo` duration | `5` (seconds, then `* 1000`) | `opts?.duration ?? this.options?.crossfadeDefaults?.duration ?? 5` | nomercy-music-player/src/index.ts:577 |
| `crossfadeTo` curve | unresolved / omitted (backend treats omitted as linear) | `opts?.curve ?? this.options?.crossfadeDefaults?.curve` | nomercy-music-player/src/index.ts:578,649-651 |
| first-track prime `autoplay` | `false` | wrapped `setup` after `ready()` | nomercy-music-player/src/index.ts:859 |
| first-track prime `source` | `'auto-play'` | wrapped `setup` | nomercy-music-player/src/index.ts:860 |
| created `<audio>.preload` (html5) | `'metadata'` | `AudioElementBackend.resolveElement` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:94 |
| `load()` preload (html5) | `'auto'` | `opts?.preload ?? 'auto'` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:114 |
| html5 HLS `autoStartLoad` | `true` | `attachHlsOrFallback` on primary `load` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:152 |
| html5 HLS `enableWorker` | `true` | primary `load` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:153 |
| html5 HLS `lowLatencyMode` | `false` | primary `load` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:154 |
| html5 HLS `enableCEA708Captions` | `true` | primary `load` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:155 |
| `prevVolume` (html5) | `1` | mute / volume bookkeeping | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:49 |
| `_secondaryVol` | `0` | secondary gain | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:57 |
| created `<audio>.preload` (webaudio) | `'metadata'` | `WebAudioBackend.resolveElement` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:139 |
| created `<audio>.crossOrigin` (webaudio) | `'anonymous'` | `resolveElement` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:141 |
| `load()` preload (webaudio) | `'auto'` | `opts?.preload ?? 'auto'` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:186 |
| `EQUAL_POWER_CURVE_SAMPLES` | `129` | `equalPowerCurve` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:36 |
| `analyserNode.fftSize` | `2048` | `ensureGraph` and `loadSecondary` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:171,473 |
| volume `setTargetAtTime` time constant | `0.01` | `volume(level)` and `secondaryGain(value)` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:335,758 |
| secondary dispose ramp time constant | `0.005` | `disposeSecondary` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:549 |
| `outputProtectionState` (html5) | `'unsupported'` | `outputProtectionState()` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:367 |
| `outputProtectionState` (webaudio) | `'unrestricted'` | `outputProtectionState()` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:419 |
| `AutoAdvanceOptions.enabled` | `true` (off only when `=== false`) | `use()` | nomercy-music-player/src/plugins/auto-advance/index.ts:21,58 |
| `AutoAdvanceOptions.preloadNextOnEnding` | `false` (on only when `=== true`) | `onItemEndingSoon` | nomercy-music-player/src/plugins/auto-advance/index.ts:23,152 |
| `AutoAdvanceOptions.crossfade` | `false` (on only when `=== true`) | `onItemEndingSoon` | nomercy-music-player/src/plugins/auto-advance/index.ts:25,156 |
| `AutoAdvanceOptions.crossfadeDuration` | `0` | `this.opts?.crossfadeDuration ?? 0` | nomercy-music-player/src/plugins/auto-advance/index.ts:27,150 |
| `LyricsOptions.autoFetch` | `true` (off only when `=== false`) | `use()` | nomercy-music-player/src/plugins/lyrics/index.ts:34,67 |
| `ScrobbleOptions.thresholdRatio` | `0.5` | `maybeScrobble` | nomercy-music-player/src/plugins/scrobble/index.ts:24,157 |
| `ScrobbleOptions.thresholdSeconds` | `240` | `maybeScrobble` | nomercy-music-player/src/plugins/scrobble/index.ts:26,158 |
| `ScrobbleOptions.minDurationSeconds` | `30` | `maybeScrobble` | nomercy-music-player/src/plugins/scrobble/index.ts:28,153 |
| `ScrobbleContext.source` (always passed) | `'user'` | `IScrobbler.scrobble` | nomercy-music-player/src/plugins/scrobble/index.ts:171 |
| listened-time seek discard | `delta < 2` | `trackListenedTime` | nomercy-music-player/src/plugins/scrobble/index.ts:127 |
| Cast default content type | `'audio/mpeg'` | `defaultContentType()` | nomercy-music-player/src/plugins/cast-sender/index.ts:39 |
| `V1MusicCompatPlugin.id` | `'v1-music-compat'` | plugin registry | nomercy-music-player/src/plugins/v1-compat.ts:121 |
| `V1MusicCompatPlugin.version` | `'1.0.0'` | plugin registry | nomercy-music-player/src/plugins/v1-compat.ts:122 |
| `AutoAdvancePlugin.id` | `'auto-advance'` | plugin registry | nomercy-music-player/src/plugins/auto-advance/index.ts:48 |
| `AutoAdvancePlugin.version` | `'2.0.0'` | plugin registry | nomercy-music-player/src/plugins/auto-advance/index.ts:49 |
| `LyricsPlugin.id` / `version` | `'lyrics'` / `'2.0.0'` | plugin registry | nomercy-music-player/src/plugins/lyrics/index.ts:54-55 |
| `ScrobblePlugin.id` / `version` | `'scrobble'` / `'2.0.0'` | plugin registry | nomercy-music-player/src/plugins/scrobble/index.ts:55-56 |
| `CastSenderPlugin.id` | `'cast-sender'` | plugin registry | nomercy-music-player/src/plugins/cast-sender/index.ts:33 |
| `KeyHandlerPlugin.id` | `'key-handler'` | plugin registry | nomercy-music-player/src/plugins/key-handler/index.ts:24 |
| `MediaSessionPlugin.id` | `'media-session'` | plugin registry | nomercy-music-player/src/plugins/media-session/index.ts:28 |
| `LinearPlaylistGenerator.id` | `'linear'` | generator identity | nomercy-music-player/src/plugins/auto-advance/linear.ts:24 |
| `SmartShuffleGenerator.id` | `'smart-shuffle'` | generator identity | nomercy-music-player/src/plugins/auto-advance/smart-shuffle.ts:36 |
| `NoopScrobbler.id` | `'noop'` | scrobbler identity | nomercy-music-player/src/plugins/scrobble/noop.ts:23 |
| `AUDIO_BACKEND_KIND.AUDIO_ELEMENT` | `'audio-element'` | kind token | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:18 |
| `AUDIO_BACKEND_KIND.WEBAUDIO` | `'webaudio'` | kind token | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:19 |
| cover-art preload category / mode | `'poster'` / `'auto'` | `MusicPreloadStrategy.assetsToPreload` | nomercy-music-player/src/player/preload.ts:38-40 |
| lyrics preload category / mode | `'lyrics'` / `'auto'` | `MusicPreloadStrategy.assetsToPreload` | nomercy-music-player/src/player/preload.ts:47-49 |
| media preload category / mode | `'media'` / `'metadata'` | `MusicPreloadStrategy.assetsToPreload` | nomercy-music-player/src/player/preload.ts:30-31 |

## Comment versus code

| Claim in the comment | What the code does | File:line |
|---|---|---|
| Lyrics auto-fetch runs on the `current` event (`autoFetch` "on `current` event"; class JSDoc "On every `current` event"; `fetchLyrics` "takes precedence over `current`-event auto-fetch") | `use()` listens to `'item'`, never `'current'` | nomercy-music-player/src/plugins/lyrics/index.ts:33,43,62-64,108 |
| MediaSession "Reads canonical `MusicPlaylistItem` fields" including `cover` | `getMetadata` returns only `title` / `artist` / `album` from `name` / `artist` / `album`. No `cover` and no `image` | nomercy-music-player/src/plugins/media-session/index.ts:15-17,30-38 |
| `LinearPlaylistGenerator` "is the implicit default" and "AutoAdvancePlugin without `opts.generator` behaves identically to this generator via the player's own `next()`" | No generator means `player.next()` / `player.peekNext()`, which honor kit repeat and shuffle. `LinearPlaylistGenerator.next` is always `currentIndex + 1` with no wrap | nomercy-music-player/src/plugins/auto-advance/linear.ts:19-20; nomercy-music-player/src/plugins/auto-advance/index.ts:75-85,120-123 |
| WebAudio class JSDoc signal chain is `<audio> → MediaElementAudioSourceNode → AnalyserNode → destination` | `ensureGraph` wires `sourceNode → gainNode → analyserNode → destination` | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:78-79,164-175 |
| `MusicPlayerConfig.backendFactory` "overrides the kit's default `audio-element` / `webaudio` resolution" | Resolution is `NMMusicPlayer._createBackend`, not a kit factory | nomercy-music-player/src/types.ts:159-161; nomercy-music-player/src/index.ts:356-362 |
| `NMMusicPlayer` adds "Music-specific stubs (backends, crossfade, audio output devices, etc.)" | Backends and `crossfadeTo` are full implementations in this class; audio output is a kit mixin declare | nomercy-music-player/src/index.ts:138,356-387,573-666,702-708 |
| `ISimilarityEngine` is "Reserved for ... the `SmartShuffleGenerator` when tag-based similarity is insufficient" | `SmartShuffleGenerator` never imports or calls `ISimilarityEngine` | nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts:14-15; nomercy-music-player/src/plugins/auto-advance/smart-shuffle.ts:34-99 |
| `crossfadeTo` "then linear" after per-call curve and `crossfadeDefaults.curve`; wrapped `setup` "Music defaults to crossfading" with strategy `curve: ... ?? 'equal-power'` | Automatic `transitionStart` calls `crossfadeTo(incoming)` with no curve. Unless the consumer set `crossfadeDefaults.curve`, the backend fade is linear while the strategy was constructed as equal-power | nomercy-music-player/src/index.ts:543-553,568-571,578,649-651,818-837 |
| `MusicPlaylistItem.cover` "Music reads `image` first and falls back to `cover`" | True in `MusicPreloadStrategy` and Cast `buildMetadata`. False in `MediaSessionPlugin.getMetadata` | nomercy-music-player/src/types.ts:30-36; nomercy-music-player/src/player/preload.ts:35; nomercy-music-player/src/plugins/cast-sender/index.ts:54; nomercy-music-player/src/plugins/media-session/index.ts:30-38 |
| `SmartShuffleGenerator` does "tag-aware shuffle within the library" | Candidates are indices in the current queue snapshot only | nomercy-music-player/src/plugins/auto-advance/smart-shuffle.ts:20-21,46-48 |
| WebAudio `outputProtectionState` "Returns `'unrestricted'` as a placeholder" | Always returns `'unrestricted'`. Html5 backend always returns `'unsupported'` for the same method | nomercy-music-player/src/adapters/audio-backend/web-audio.ts:415-419; nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:364-367 |
| wrapped `setup`: "Music has no autoPlay config knob (unlike video)" | `...config` still forwards whatever `BasePlayerConfig` accepted, then the prime forces `{ autoplay: false, source: 'auto-play' }` | nomercy-music-player/src/index.ts:825-861 |

## Traps

| Behavior | Why it surprises | File:line |
|---|---|---|
| `ISimilarityEngine` / `SimilarityQueryOptions` are exported from `./adapters` and `./adapters/similarity-engine` | Port is documented as unused. Nothing in this slice constructs, registers, or calls `findSimilar`. `limit` / `excludeIds` / `minScore` are accepted on the type and never read | nomercy-music-player/src/adapters/similarity-engine/ISimilarityEngine.ts:14-17,45-51; nomercy-music-player/src/adapters/index.ts:10 |
| `hlsFactory` and `nativeFactory` are public subpath exports | `NMMusicPlayer` never imports them and never `registerStream`s them. HLS on the default path is `attachHlsOrFallback` inside each backend `load` | nomercy-music-player/src/streams/hls.ts:9; nomercy-music-player/src/streams/native.ts:9; nomercy-music-player/src/index.ts:343-346 |
| `AUDIO_BACKEND_KIND` is a public const on `IAudioBackend.ts` | `adapters/audio-backend/index.ts` re-exports types `BackendEvent`, `BackendLoaderState`, `BackendState`, `IAudioBackend` only. The const is not on the advertised adapters barrel | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:17; nomercy-music-player/src/adapters/audio-backend/index.ts:11-16 |
| `BackendEventPayload['backend:sourceswap']` is on the shared contract | `WebAudioBackend.crossfade` emits it. `AudioElementBackend.crossfade` swaps elements and re-attaches DOM bridges with no `backend:sourceswap`. Audio-graph remount on html5 crossfade never gets that event | nomercy-music-player/src/adapters/audio-backend/IAudioBackend.ts:66; nomercy-music-player/src/adapters/audio-backend/web-audio.ts:740-743; nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:500-527 |
| `AudioElementBackend.loadSecondary` assigns `el.src = url` | Primary `load` uses HLS + `appendAuthTokenParam`. Secondary load skips both, so an HLS or authed incoming URL that worked on primary can fail the crossfade buffer | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:149-162,417-418; nomercy-music-player/src/adapters/audio-backend/web-audio.ts:512-524 |
| `MusicPlaylistItem.duration?: number | string` | `_makeLoadedMetadataHandler` only publishes `item.duration` when `typeof itemDuration === 'number'`. A `'3:42'` string is type-legal and never becomes a duration event | nomercy-music-player/src/types.ts:50; nomercy-music-player/src/index.ts:442-445 |
| `IPlaylistGenerator.previous` | `AutoAdvancePlugin` only calls `generator.next`. `previous()` on Linear and SmartShuffle is dead at runtime unless a consumer calls it | nomercy-music-player/src/plugins/auto-advance/IPlaylistGenerator.ts:52; nomercy-music-player/src/plugins/auto-advance/index.ts:126-131 |
| `ScrobbleContext.source: 'user' | 'auto' | 'radio'` | `maybeScrobble` always passes `source: 'user'`, including after `AutoAdvancePlugin` `next({ source: 'auto-advance' })` | nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:56; nomercy-music-player/src/plugins/scrobble/index.ts:167-172 |
| `NMMusicPlayer._resetRegistry` is a public static | Comment says "Test-only: clear the registry. Not part of the public API." Any consumer can call it | nomercy-music-player/src/index.ts:337-339 |
| `declare _currentEpoch` has no `private` / `protected` | Looks like public instance state. Comment says it exists so the setup wrapper can read it | nomercy-music-player/src/index.ts:162-163 |
| `V1MusicCompatPlugin` emits `'speed'` and `'playlist'` | Those names are not on `MusicEventMap`. Typed `on('speed')` does not exist; the shim still fires them | nomercy-music-player/src/plugins/v1-compat.ts:363-364; nomercy-music-player/src/types.ts:81-97 |
| `V1MusicCompatPlugin` is exported from `src/index.ts` only | `plugins/index.ts` does not re-export it. `import { V1MusicCompatPlugin } from '.../plugins'` fails | nomercy-music-player/src/index.ts:79; nomercy-music-player/src/plugins/index.ts:9-34 |
| `CastSenderPlugin.defaultContentType` / `buildMetadata`, `KeyHandlerPlugin.addMediaKeys`, `MediaSessionPlugin.getMetadata` | `protected override` hooks. They look like the plugin's public music API in the file; consumers cannot call them without a subclass | nomercy-music-player/src/plugins/cast-sender/index.ts:38-46; nomercy-music-player/src/plugins/key-handler/index.ts:27; nomercy-music-player/src/plugins/media-session/index.ts:30 |
| `AudioElementBackend(container, { element })` and `WebAudioBackend(container, { audioContext })` | `_createBackend` calls `new WebAudioBackend(this.container)` / `new AudioElementBackend(this.container)` only. Those constructor options are accepted and unread on the default wiring path | nomercy-music-player/src/index.ts:360-362; nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:59; nomercy-music-player/src/adapters/audio-backend/web-audio.ts:110 |
| Player automatic crossfade vs `AutoAdvanceOptions.crossfade` | Setup installs `CrossfadeTransitionStrategy` and `_wireAutomaticCrossfade` with default duration 5s. Auto-advance crossfade default is `0` (hard cut). The in-flight guard drops the second caller | nomercy-music-player/src/index.ts:537-554,577; nomercy-music-player/src/plugins/auto-advance/index.ts:25-27,150-158 |
| html5 primary HLS sets `enableCEA708Captions: true` | Caption flag on an audio-element music backend. WebAudio primary HLS passes only `xhrSetup` | nomercy-music-player/src/adapters/audio-backend/html5-audio.ts:151-157; nomercy-music-player/src/adapters/audio-backend/web-audio.ts:222-226 |
| `ScrobblePlugin` emits `nowPlaying` after `nowPlaying?.(item)` | If a custom `IScrobbler` omits `nowPlaying`, the optional call is a no-op and the plugin event still fires | nomercy-music-player/src/plugins/scrobble/index.ts:133-136; nomercy-music-player/src/plugins/scrobble/IScrobbler.ts:44 |
| First-track prime uses `source: 'auto-play'` with `autoplay: false` | Source token says play; the load is armed silent. `play()` must still be called | nomercy-music-player/src/index.ts:841-861 |
| `playItem` / `playNow` take `BasePlaylistItem`, not `T` | Music-typed player methods accept the kit item shape, so a non-`MusicPlaylistItem` can enter the queue through those two declares | nomercy-music-player/src/index.ts:293-302 |
