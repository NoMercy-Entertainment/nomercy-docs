# Slice: core-mixins
Files given: 26
Files opened: 26

## Files opened
- nomercy-player-core/src/core/mixins/abr.ts
- nomercy-player-core/src/core/mixins/activity.ts
- nomercy-player-core/src/core/mixins/audio-output.ts
- nomercy-player-core/src/core/mixins/auth.ts
- nomercy-player-core/src/core/mixins/base-url-audio-context.ts
- nomercy-player-core/src/core/mixins/cast.ts
- nomercy-player-core/src/core/mixins/container-class-emit.ts
- nomercy-player-core/src/core/mixins/cue-parser.ts
- nomercy-player-core/src/core/mixins/device.ts
- nomercy-player-core/src/core/mixins/experimental.ts
- nomercy-player-core/src/core/mixins/i18n.ts
- nomercy-player-core/src/core/mixins/lifecycle.ts
- nomercy-player-core/src/core/mixins/loading.ts
- nomercy-player-core/src/core/mixins/media-tracks.ts
- nomercy-player-core/src/core/mixins/metrics.ts
- nomercy-player-core/src/core/mixins/play-queue.ts
- nomercy-player-core/src/core/mixins/player-state.ts
- nomercy-player-core/src/core/mixins/plugin-registration.ts
- nomercy-player-core/src/core/mixins/preload-strategy-mixin.ts
- nomercy-player-core/src/core/mixins/queue.ts
- nomercy-player-core/src/core/mixins/sidecar-util.ts
- nomercy-player-core/src/core/mixins/state-mutators.ts
- nomercy-player-core/src/core/mixins/stream-registration.ts
- nomercy-player-core/src/core/mixins/time.ts
- nomercy-player-core/src/core/mixins/transport.ts
- nomercy-player-core/src/core/mixins/volume.ts

## Public surface
| Symbol | Signature (verbatim) | File:line |
| --- | --- | --- |
| nomercy-player-core volumeMethods | export const volumeMethods = { | volume.ts:71 |
| nomercy-player-core volume | volume(this: Internals, level?: number): number \| Promise<void> | volume.ts:86 |
| nomercy-player-core mute | mute(this: Internals): Promise<void> | volume.ts:142 |
| nomercy-player-core unmute | unmute(this: Internals): Promise<void> | volume.ts:152 |
| nomercy-player-core toggleMute | toggleMute(this: Internals): void | volume.ts:162 |
| nomercy-player-core volumeUp | volumeUp(this: Internals, step = 5): void | volume.ts:172 |
| nomercy-player-core volumeDown | volumeDown(this: Internals, step = 5): void | volume.ts:180 |
| nomercy-player-core transportMethods | export const transportMethods = { | transport.ts:96 |
| nomercy-player-core play | async play(this: Internals, opts: ActionOptions = {}): Promise<void> | transport.ts:130 |
| nomercy-player-core pause | async pause(this: Internals, opts: ActionOptions = {}): Promise<void> | transport.ts:175 |
| nomercy-player-core stop | async stop(this: Internals, opts: ActionOptions = {}): Promise<void> | transport.ts:201 |
| nomercy-player-core togglePlayback | async togglePlayback(this: Internals, opts?: ActionOptions): Promise<void> | transport.ts:224 |
| nomercy-player-core next | async next(this: Internals, opts: LoadOptions = {}): Promise<void> | transport.ts:242 |
| nomercy-player-core previous | async previous(this: Internals, opts: LoadOptions = {}): Promise<void> | transport.ts:305 |
| nomercy-player-core rewind | async rewind(this: Internals, seconds = 5, opts: ActionOptions = {}): Promise<void> | transport.ts:335 |
| nomercy-player-core forward | async forward(this: Internals, seconds = 5, opts: ActionOptions = {}): Promise<void> | transport.ts:347 |
| nomercy-player-core restart | async restart(this: Internals, opts: ActionOptions = {}): Promise<void> | transport.ts:359 |
| nomercy-player-core timeMethods | export const timeMethods = { | time.ts:52 |
| nomercy-player-core time | time(this: Internals, seconds?: number, opts: ActionOptions = {}): number \| Promise<void> | time.ts:67 |
| nomercy-player-core duration | duration(this: Internals): number | time.ts:100 |
| nomercy-player-core buffered | buffered(this: Internals): number | time.ts:113 |
| nomercy-player-core bufferedRanges | bufferedRanges(this: Internals): TimeRanges | time.ts:122 |
| nomercy-player-core seekable | seekable(this: Internals): TimeRanges | time.ts:132 |
| nomercy-player-core timeData | timeData(this: Internals): TimeState | time.ts:163 |
| nomercy-player-core seekByPercentage | seekByPercentage(this: Internals, pct: number, opts?: ActionOptions): void | time.ts:175 |
| nomercy-player-core playbackRate | playbackRate(this: Internals, rate?: number): number \| Promise<void> | time.ts:198 |
| nomercy-player-core playbackRates | playbackRates(this: Internals): number[] | time.ts:226 |
| nomercy-player-core resetItemEndingSoonLatch | resetItemEndingSoonLatch(this: Internals): void | time.ts:272 |
| nomercy-player-core streamRegistrationMethods | export const streamRegistrationMethods = { | stream-registration.ts:58 |
| nomercy-player-core registerStream | registerStream(this: Internals, factory: IStreamFactory, prepend?: boolean): unknown | stream-registration.ts:67 |
| nomercy-player-core unregisterStream | unregisterStream(this: Internals, id: string): unknown | stream-registration.ts:72 |
| nomercy-player-core streams | streams(this: Internals): ReadonlyArray<string> | stream-registration.ts:77 |
| nomercy-player-core resolveCustomStream | resolveCustomStream(this: Internals, url: string, contentType?: string): IStreamSource \| undefined | stream-registration.ts:89 |
| nomercy-player-core getStreamFactory | getStreamFactory(this: Internals, id: string): IStreamFactory \| undefined | stream-registration.ts:96 |
| nomercy-player-core stateMethods | export const stateMethods = { | state-mutators.ts:80 |
| nomercy-player-core playState | playState(this: Internals): PlayState | state-mutators.ts:86 |
| nomercy-player-core volumeState | volumeState(this: Internals): VolumeState | state-mutators.ts:94 |
| nomercy-player-core repeatState | repeatState(this: Internals, state?: RepeatState): RepeatState \| Promise<void> | state-mutators.ts:112 |
| nomercy-player-core shuffleState | shuffleState(this: Internals, state?: ShuffleState \| boolean): ShuffleState \| Promise<void> | state-mutators.ts:152 |
| nomercy-player-core queueMethods | export const queueMethods = { | queue.ts:146 |
| nomercy-player-core queue | queue(this: Internals, items?: BasePlaylistItem[], _opts?: ActionOptions): ReadonlyArray<BasePlaylistItem> \| void | queue.ts:157 |
| nomercy-player-core queueAppend | queueAppend(this: Internals, item: BasePlaylistItem \| BasePlaylistItem[], _opts?: ActionOptions): void | queue.ts:168 |
| nomercy-player-core queuePrepend | queuePrepend(this: Internals, item: BasePlaylistItem \| BasePlaylistItem[], _opts?: ActionOptions): void | queue.ts:177 |
| nomercy-player-core queueInsert | queueInsert(this: Internals, item: BasePlaylistItem \| BasePlaylistItem[], index: number, _opts?: ActionOptions): void | queue.ts:187 |
| nomercy-player-core queueRemove | queueRemove(this: Internals, id: string \| number, _opts?: ActionOptions): void | queue.ts:196 |
| nomercy-player-core queueRemoveAt | queueRemoveAt(this: Internals, index: number, _opts?: ActionOptions): void | queue.ts:205 |
| nomercy-player-core queueMove | queueMove(this: Internals, from: number, to: number, _opts?: ActionOptions): void | queue.ts:215 |
| nomercy-player-core queueClear | queueClear(this: Internals, _opts?: ActionOptions): void | queue.ts:223 |
| nomercy-player-core queueShuffle | queueShuffle(this: Internals, _opts?: ActionOptions): void | queue.ts:231 |
| nomercy-player-core queueSort | queueSort(this: Internals, compare: (itemA: BasePlaylistItem, itemB: BasePlaylistItem) => number, _opts?: ActionOptions): void | queue.ts:240 |
| nomercy-player-core peekNext | peekNext(this: Internals): BasePlaylistItem \| undefined | queue.ts:250 |
| nomercy-player-core peekPrevious | peekPrevious(this: Internals): BasePlaylistItem \| undefined | queue.ts:258 |
| nomercy-player-core queueLength | queueLength(this: Internals): number | queue.ts:265 |
| nomercy-player-core queueIndexOf | queueIndexOf(this: Internals, id: string \| number): number | queue.ts:273 |
| nomercy-player-core item | item(this: Internals, target?: BasePlaylistItem \| string \| number \| ((item: BasePlaylistItem) => boolean), opts?: LoadOptions): BasePlaylistItem \| undefined \| void | queue.ts:287 |
| nomercy-player-core index | index(this: Internals): number | queue.ts:368 |
| nomercy-player-core seekToIndex | seekToIndex(this: Internals, position: number, _opts?: ActionOptions): void | queue.ts:381 |
| nomercy-player-core backlog | backlog(this: Internals, items?: BasePlaylistItem[]): ReadonlyArray<BasePlaylistItem> \| void | queue.ts:407 |
| nomercy-player-core backlogAppend | backlogAppend(this: Internals, item: BasePlaylistItem \| BasePlaylistItem[]): void | queue.ts:418 |
| nomercy-player-core backlogRemove | backlogRemove(this: Internals, id: string \| number): void | queue.ts:427 |
| nomercy-player-core backlogClear | backlogClear(this: Internals): void | queue.ts:435 |
| nomercy-player-core registerTitleTokens | registerTitleTokens(this: Internals, tokens: Record<string, string>): void | queue.ts:451 |
| nomercy-player-core pluginRegistrationMethods | export const pluginRegistrationMethods = { | plugin-registration.ts:345 |
| nomercy-player-core addPlugin | addPlugin<P extends Plugin<any, any, any>>(this: Internals, PluginClass: PluginCtorWithId & (new () => P), opts?: P['opts']): unknown | plugin-registration.ts:508 |
| nomercy-player-core getPlugin | getPlugin<P extends object>(this: Internals, PluginClass: PluginCtorWithId & (new () => P)): P \| undefined | plugin-registration.ts:626 |
| nomercy-player-core getPluginById | getPluginById<P extends object = object>(this: Internals, id: string): P \| undefined | plugin-registration.ts:636 |
| nomercy-player-core removePlugin | removePlugin<P extends Plugin<any, any, any>>(this: Internals, PluginClass: PluginCtorWithId & (new () => P), opts?: { cascade?: boolean }): void | plugin-registration.ts:650 |
| nomercy-player-core removePluginById | removePluginById(this: Internals, id: string, opts?: { cascade?: boolean }): void | plugin-registration.ts:660 |
| nomercy-player-core plugins | plugins(this: Internals): ReadonlyArray<Plugin> | plugin-registration.ts:742 |
| nomercy-player-core enabledPlugins | enabledPlugins(this: Internals): ReadonlyArray<Plugin> | plugin-registration.ts:752 |
| nomercy-player-core preloadStrategyMethods | export const preloadStrategyMethods = { | preload-strategy-mixin.ts:37 |
| nomercy-player-core setPreloadStrategy | setPreloadStrategy(this: Internals, strategy: IPreloadStrategy): void | preload-strategy-mixin.ts:42 |
| nomercy-player-core setTransitionStrategy | setTransitionStrategy(this: Internals, strategy: ITransitionStrategy): void | preload-strategy-mixin.ts:52 |
| nomercy-player-core preloadStrategy | preloadStrategy(this: Internals): IPreloadStrategy | preload-strategy-mixin.ts:64 |
| nomercy-player-core transitionStrategy | transitionStrategy(this: Internals): ITransitionStrategy | preload-strategy-mixin.ts:69 |
| nomercy-player-core playQueueMethods | export const playQueueMethods = { | play-queue.ts:27 |
| nomercy-player-core playItem | playItem(this: Internals, target: BasePlaylistItem \| string \| number \| ((item: BasePlaylistItem) => boolean), opts?: LoadOptions): void | play-queue.ts:47 |
| nomercy-player-core playNow | playNow(this: Internals, items: BasePlaylistItem[], start?: BasePlaylistItem \| string \| number \| ((item: BasePlaylistItem) => boolean), opts?: LoadOptions): void | play-queue.ts:75 |
| nomercy-player-core playerStateMethods | export const playerStateMethods = { | player-state.ts:89 |
| nomercy-player-core bufferState | bufferState(this: Internals): BufferState | player-state.ts:193 |
| nomercy-player-core networkState | networkState(this: Internals): NetworkState | player-state.ts:209 |
| nomercy-player-core streamState | streamState(this: Internals): string | player-state.ts:227 |
| nomercy-player-core visibilityState | visibilityState(this: Internals): VisibilityState | player-state.ts:239 |
| nomercy-player-core qualityMode | qualityMode(this: Internals, target?: number \| 'auto'): QualityState \| void | player-state.ts:253 |
| nomercy-player-core audioTrackMode | audioTrackMode(this: Internals, idx?: number): AudioTrackState \| void | player-state.ts:269 |
| nomercy-player-core metricsMethods | export const metricsMethods = { | metrics.ts:29 |
| nomercy-player-core metrics | metrics(this: Internals): PlaybackMetrics | metrics.ts:36 |
| nomercy-player-core recordMetric | recordMetric(this: Internals, name: string, value: number): void | metrics.ts:43 |
| nomercy-player-core now | now(this: Internals): number | metrics.ts:51 |
| nomercy-player-core announce | announce(this: Internals, text: string, level?: AriaLiveLevel): void | metrics.ts:60 |
| nomercy-player-core mediaTracksMethods | export const mediaTracksMethods = { | media-tracks.ts:406 |
| nomercy-player-core resolveItemTrackUrls | async resolveItemTrackUrls<T extends BasePlaylistItem>(this: Internals, item: T): Promise<T> | media-tracks.ts:433 |
| nomercy-player-core subtitles | subtitles(this: Internals): ReadonlyArray<SubtitleTrack> | media-tracks.ts:590 |
| nomercy-player-core subtitle | subtitle(this: Internals, idx?: number \| null): CurrentSubtitleSelection \| null \| Promise<void> | media-tracks.ts:608 |
| nomercy-player-core subtitleStyle | subtitleStyle(this: Internals, patch?: Partial<SubtitleStyle>): SubtitleStyle \| void | media-tracks.ts:703 |
| nomercy-player-core addSubtitleTrack | addSubtitleTrack(this: Internals, input: SidecarSubtitleInput, _opts?: ActionOptions): SubtitleTrack | media-tracks.ts:736 |
| nomercy-player-core removeSubtitleTrack | removeSubtitleTrack(this: Internals, id: string, _opts?: ActionOptions): void | media-tracks.ts:785 |
| nomercy-player-core audioTracks | audioTracks(this: Internals): ReadonlyArray<AudioTrack> | media-tracks.ts:817 |
| nomercy-player-core audioTrack | audioTrack(this: Internals, idx?: number): CurrentAudioTrackSelection \| null \| Promise<void> | media-tracks.ts:841 |
| nomercy-player-core cycleAudioTracks | cycleAudioTracks(this: Internals): void | media-tracks.ts:886 |
| nomercy-player-core qualityLevels | qualityLevels(this: Internals, opts?: { includeUnsupported?: true }): ReadonlyArray<QualityLevel> | media-tracks.ts:919 |
| nomercy-player-core quality | quality(this: Internals, idx?: number \| 'auto'): CurrentQualitySelection \| 'auto' \| void | media-tracks.ts:939 |
| nomercy-player-core chapters | chapters(this: Internals): ReadonlyArray<Chapter> | media-tracks.ts:974 |
| nomercy-player-core seekToChapter | seekToChapter(this: Internals, idx: number, opts?: ActionOptions): void | media-tracks.ts:986 |
| nomercy-player-core nextChapter | nextChapter(this: Internals, opts?: ActionOptions): void | media-tracks.ts:1007 |
| nomercy-player-core previousChapter | previousChapter(this: Internals, opts?: ActionOptions): void | media-tracks.ts:1026 |
| nomercy-player-core chapter | chapter(this: Internals, idx?: number): Chapter \| null \| void | media-tracks.ts:1057 |
| nomercy-player-core loadingMethods | export const loadingMethods = { | loading.ts:47 |
| nomercy-player-core load | async load<T extends BasePlaylistItem>(this: Internals, item: T, opts?: LoadOptions): Promise<void> | loading.ts:87 |
| nomercy-player-core loadQueue | async loadQueue<T extends BasePlaylistItem>(this: Internals, url: string, parser?: (raw: string) => T[]): Promise<void> | loading.ts:305 |
| nomercy-player-core lifecycleMethods | export const lifecycleMethods = { | lifecycle.ts:95 |
| nomercy-player-core setup | setup(this: Internals, config: BasePlayerConfig): unknown | lifecycle.ts:115 |
| nomercy-player-core ready | ready(this: Internals): Promise<void> | lifecycle.ts:161 |
| nomercy-player-core dispose | async dispose(this: Internals): Promise<void> | lifecycle.ts:207 |
| nomercy-player-core setupState | setupState(this: Internals): SetupState | lifecycle.ts:265 |
| nomercy-player-core phase | phase(this: Internals): PlayerPhase | lifecycle.ts:280 |
| nomercy-player-core dispatching | dispatching(this: Internals): ReadonlyArray<string> | lifecycle.ts:290 |
| nomercy-player-core pushDispatch | pushDispatch(this: Internals, name: string): void | lifecycle.ts:299 |
| nomercy-player-core popDispatch | popDispatch(this: Internals): string \| undefined | lifecycle.ts:304 |
| nomercy-player-core platform | platform(this: Internals): IPlatform | lifecycle.ts:314 |
| nomercy-player-core i18nMethods | export const i18nMethods = { | i18n.ts:74 |
| nomercy-player-core t | t(this: Internals, keyOrClass: string \| PluginCtorWithId, keyOrVars?: string \| Record<string, string>, vars?: Record<string, string>): string | i18n.ts:89 |
| nomercy-player-core language | language(this: Internals, lang?: string): string \| Promise<void> | i18n.ts:126 |
| nomercy-player-core addTranslations | addTranslations(this: Internals, bundle: Translations): void | i18n.ts:219 |
| nomercy-player-core translation | translation(this: Internals, lang: string, key: string, value?: string): string \| undefined \| void | i18n.ts:232 |
| nomercy-player-core removeTranslations | removeTranslations(this: Internals, prefix: string, lang?: string): void | i18n.ts:244 |
| nomercy-player-core experimentalDescriptor | export const experimentalDescriptor = { | experimental.ts:40 |
| nomercy-player-core experimental | get experimental(): PlayerExperimental | experimental.ts:47 |
| nomercy-player-core deviceMethods | export const deviceMethods = { | device.ts:83 |
| nomercy-player-core isTv | isTv(this: Internals): boolean | device.ts:89 |
| nomercy-player-core isMobile | isMobile(this: Internals): boolean | device.ts:98 |
| nomercy-player-core isDesktop | isDesktop(this: Internals): boolean | device.ts:106 |
| nomercy-player-core device | device(this: Internals): DeviceCapabilities | device.ts:124 |
| nomercy-player-core cueParserMethods | export const cueParserMethods = { | cue-parser.ts:32 |
| nomercy-player-core registerCueParser | registerCueParser(this: Internals, parser: ICueParser, prepend?: boolean): void | cue-parser.ts:38 |
| nomercy-player-core unregisterCueParser | unregisterCueParser(this: Internals, id: string): void | cue-parser.ts:42 |
| nomercy-player-core resolveCueParser | resolveCueParser(this: Internals, url: string): ICueParser \| undefined | cue-parser.ts:46 |
| nomercy-player-core containerClassEmitMethods | export const containerClassEmitMethods = { | container-class-emit.ts:211 |
| nomercy-player-core emit | emit(this: Internals, event: any, data?: any): void | container-class-emit.ts:233 |
| nomercy-player-core castMethods | export const castMethods = { | cast.ts:206 |
| nomercy-player-core castState | castState(this: Internals): _CastStateEnum | cast.ts:213 |
| nomercy-player-core transferTo | async transferTo(this: Internals, target: CastTarget): Promise<void> | cast.ts:246 |
| nomercy-player-core baseUrlAudioContextMethods | export const baseUrlAudioContextMethods = { | base-url-audio-context.ts:38 |
| nomercy-player-core baseUrl | baseUrl(this: Internals, url?: string): string \| undefined \| void | base-url-audio-context.ts:47 |
| nomercy-player-core audioContext | audioContext(this: Internals): AudioContext \| undefined | base-url-audio-context.ts:57 |
| nomercy-player-core authMethods | export const authMethods = { | auth.ts:51 |
| nomercy-player-core auth | auth(this: Internals, configOrPartial?: AuthConfig \| Partial<AuthConfig> \| null): Readonly<AuthConfig> \| undefined \| void | auth.ts:71 |
| nomercy-player-core hasAuth | hasAuth(this: Internals): boolean | auth.ts:91 |
| nomercy-player-core resolveUrl | async resolveUrl(this: Internals, url: string, category?: UrlCategory): Promise<ResolvedUrl> | auth.ts:116 |
| nomercy-player-core urlResolver | urlResolver(this: Internals, resolver?: IUrlResolver \| undefined): IUrlResolver \| undefined \| void | auth.ts:192 |
| nomercy-player-core refreshAuth | async refreshAuth(this: Internals): Promise<void> | auth.ts:204 |
| nomercy-player-core audioOutputMethods | export const audioOutputMethods = { | audio-output.ts:37 |
| nomercy-player-core audioOutputs | async audioOutputs(this: Internals): Promise<MediaDeviceInfo[]> | audio-output.ts:44 |
| nomercy-player-core selectAudioOutput | async selectAudioOutput(this: Internals): Promise<MediaDeviceInfo \| null> | audio-output.ts:56 |
| nomercy-player-core audioOutput | async audioOutput(this: Internals, deviceId?: string): Promise<string \| null \| void> | audio-output.ts:86 |
| nomercy-player-core activityMethods | export const activityMethods = { | activity.ts:166 |
| nomercy-player-core bumpActivity | bumpActivity(this: Internals): void | activity.ts:174 |
| nomercy-player-core activityTracking | activityTracking(this: Internals, enabled?: boolean): boolean | activity.ts:184 |
| nomercy-player-core abrMethods | export const abrMethods = { | abr.ts:42 |
| nomercy-player-core bandwidth | bandwidth(this: Internals): number | abr.ts:50 |
| nomercy-player-core bandwidthEstimator | bandwidthEstimator(this: Internals, fn?: () => number): (() => number) \| void | abr.ts:62 |
| nomercy-player-core canPlay | async canPlay(this: Internals, profile: { contentType: string; width?: number; height?: number; bitrate?: number; framerate?: number }): Promise<CanPlayResult> | abr.ts:72 |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
| --- | --- | --- | --- |
| _internalVolume | 100 | volume | volume.ts:88 |
| _volumeBeforeMute | 100 | unmute | volume.ts:60 |
| _playbackRate | 1 | playbackRate | time.ts:200 |
| _itemEndingSoonEmitted | false | _checkItemEndingSoon | time.ts:243 |
| _activityTrackingEnabled | true | activityTracking | activity.ts:186 |
| DefaultPreloadStrategy lead | new DefaultPreloadStrategy(configuredLeadSeconds) with configuredLeadSeconds from preloadLeadSeconds ?? 10 | _wirePreloadAndTransition | lifecycle.ts:808 |
| volumeUp step | step = 5 | volumeUp | volume.ts:172 |
| volumeDown step | step = 5 | volumeDown | volume.ts:180 |
| rewind seconds | seconds = 5 | rewind | transport.ts:335 |
| forward seconds | seconds = 5 | forward | transport.ts:347 |
| play opts | opts: ActionOptions = {} | play | transport.ts:130 |
| pause opts | opts: ActionOptions = {} | pause | transport.ts:175 |
| stop opts | opts: ActionOptions = {} | stop | transport.ts:201 |
| next opts | opts: LoadOptions = {} | next | transport.ts:242 |
| previous opts | opts: LoadOptions = {} | previous | transport.ts:305 |
| restart opts | opts: ActionOptions = {} | restart | transport.ts:359 |
| time opts | opts: ActionOptions = {} | time | time.ts:67 |
| itemEndingSoonThreshold | this.options?.itemEndingSoonThreshold ?? 10 | _checkItemEndingSoon | time.ts:249 |
| playbackRates list | [0.5, 0.75, 1, 1.25, 1.5, 2] | playbackRates | time.ts:227 |
| playbackRate clamp | Math.max(0.25, Math.min(2, rate)) | playbackRate | time.ts:202 |
| volume clamp | Math.max(0, Math.min(100, level)) | _applyVolume | volume.ts:114 |
| HOT_MUTATIONS | ['time', 'bandwidth', 'recordMetric'] | _shouldGuardMutation | state-mutators.ts:47 |
| pluginInitTimeoutMs (post-setup addPlugin) | this.options.pluginInitTimeoutMs ?? 30_000 | addPlugin | plugin-registration.ts:609 |
| pluginInitTimeoutMs (setup pipeline) | self.options.pluginInitTimeoutMs ?? 30_000 | _runSetupPipeline | lifecycle.ts:909 |
| plugin static priority | itemA.entry.ctor.priority ?? 0 | enabledPlugins | plugin-registration.ts:760 |
| required plugin version fallback | (reg?.ctor.version ?? queued?.ctor.version ?? '0.0.0') | addPlugin | plugin-registration.ts:556 |
| DEFAULT_SUBTITLE_STYLE | { fontSize: 100, fontFamily: 'ReithSans, sans-serif', textColor: 'white', textOpacity: 100, backgroundColor: 'black', backgroundOpacity: 0, edgeStyle: 'textShadow', areaColor: 'black', windowOpacity: 0 } | subtitleStyle | media-tracks.ts:236 |
| subtitle cue align | payload.alignment ?? 'center' | _toSubtitleCue | media-tracks.ts:230 |
| subtitle cue size | typeof payload.size === 'number' ? payload.size : 100 | _toSubtitleCue | media-tracks.ts:231 |
| addSubtitleTrack default flag | input.default ?? false | addSubtitleTrack | media-tracks.ts:759 |
| previousChapter restart window | intoChapter > 10 | previousChapter | media-tracks.ts:1043 |
| fadeIn steps | const steps = 20 | load | loading.ts:229 |
| Logger prefix (setup) | prefix: 'nmplayer' | _wireLogger | lifecycle.ts:623 |
| Logger prefix (plugins) | prefix: 'nmplayer' | makePlayerLogger | plugin-registration.ts:82 |
| pauseWhenHidden | if (!self.options.pauseWhenHidden) return | _wireVisibilityPolicy | lifecycle.ts:495 |
| onOffline | self.options.onOffline ?? 'continue-buffered' | _wireNetworkPolicy | lifecycle.ts:521 |
| wakeLock | self.options.wakeLock ?? 'never' | _wireWakeLockPolicy | lifecycle.ts:562 |
| metricsIntervalMs | self.options.metricsIntervalMs ?? 10_000 | _wireMetrics | lifecycle.ts:690 |
| progressIntervalMs | self.options.progressIntervalMs ?? 5_000 | _wireProgressEmit | lifecycle.ts:758 |
| preloadLeadSeconds | self.options.preloadLeadSeconds ?? 10 | _wirePreloadAndTransition | lifecycle.ts:806 |
| crossfadeEnabled | self.options.crossfadeEnabled ?? false | _wirePreloadAndTransition | lifecycle.ts:842 |
| crossfadeLeadSeconds | player.options.crossfadeLeadSeconds ?? 3 | _runTransition | lifecycle.ts:1092 |
| crossfadeTailSeconds | player.options.crossfadeTailSeconds ?? 3 | _runTransition | lifecycle.ts:1093 |
| setup language fallback | ?? 'en' | _runSetupPipeline | lifecycle.ts:934 |
| platform | this._platform ?? browserPlatform | platform / device / canPlay / network | lifecycle.ts:315 |
| network slow threshold | downlink < 1.5 | networkState | player-state.ts:216 |
| network slow emit threshold | downlink < 1.5 | _wireNetworkPolicy | lifecycle.ts:533 |
| announce aria-live | level === 'assertive' ? 'assertive' : 'polite' | announce | metrics.ts:65 |
| announce node lifetime | 1500 | announce | metrics.ts:78 |
| resolveUrl category | category ?? 'media' | resolveUrl | auth.ts:117 |
| DEFAULT_CAST_SCRIPT | 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1' | _ensureCastLoaded | cast.ts:51 |
| DEFAULT_LOAD_TIMEOUT_MS | 10_000 | _ensureCastLoaded | cast.ts:52 |
| cast autoJoinPolicy | cfg?.autoJoinPolicy ?? 'origin-scoped' | _initCastContext | cast.ts:185 |
| cast receiverApplicationId | cfg?.receiverApplicationId ?? defaultAppId / 'CC1AD845' | _initCastContext | cast.ts:188 |
| cast resumeSavedSession | cfg?.resumeSavedSession ?? true | _initCastContext | cast.ts:193 |
| DEFAULT_INACTIVITY_MS | 4000 | _inactivityMs | activity.ts:40 |
| inactivityMs | self.options?.inactivityMs ?? DEFAULT_INACTIVITY_MS | wireActivityTracking / _bump | activity.ts:43 |
| bandwidth fallback | backend?.bandwidthEstimate?.() ?? 0 | bandwidth | abr.ts:55 |
| buffered fallback | this._resolveBackend()?.buffered?.() ?? 0 | buffered | time.ts:114 |
| now fallback | Date.now() | now | metrics.ts:53 |
| clockSource | this.options?.clockSource | now | metrics.ts:52 |
| defaultVolume | self.options.defaultVolume | _seedFromOptions | lifecycle.ts:382 |
| beforeEventTimeoutMs | this.options?.beforeEventTimeoutMs | _dispatchBefore | player-state.ts:183 |
| mutationGuards | self.options?.mutationGuards | _shouldGuardMutation | state-mutators.ts:58 |
| prevented reason | result.reason ?? 'listener-prevented' | volume / transport / time / i18n / media-tracks / cast / lifecycle | volume.ts:46 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
| --- | --- | --- |
| announce "removes it on the next animation frame so the DOM doesn't grow" | Removes the node with `setTimeout(..., 1500)`, not `requestAnimationFrame` | metrics.ts:58 |
| CueParserState: registry is "Pre-seeded with VTT in `initPlayerCoreState`" | `initPlayerCoreState` constructs an empty `CueParserRegistry`. Built-ins (LRC, VTT-subtitle, sprite-VTT) are registered later in `_registerCueParsers` during `setup()` | cue-parser.ts:22 |
| buffered() "shares a frame of reference with `currentTime()` and `duration()`" | There is no `currentTime()` on this mixin. The getter is `time()` | time.ts:108 |
| shuffleState('on') "randomises the queue order immediately via `queueShuffle()`" | Calls `this._queueList.shuffle()` directly, not `queueShuffle()`, so `_wireQueue` is not forced first | state-mutators.ts:139 |
| QueueState `_backlogList`: "Held so `previous()` can reach back past the queue head" | `previous()` uses `_queueList.peekPrevious()` only. It never reads `_backlogList` | queue.ts:30 |
| seekToIndex "Fires the same `beforeMutation` / `current` lifecycle as `item(target)`" | Shares `_emitBeforeMutation('current', ...)` and `setCurrent`, then returns. It does not `load()` or `play()` | queue.ts:377 |
| I18nState: `_translator` is "`undefined` until the first translation bundle resolves; kit code that calls `this.t(...)` guards on this" | `t()` calls `_ensureTranslator`, which constructs `new DefaultTranslator()` if missing. No guard, no wait for a bundle | i18n.ts:26 |
| experimental `overrides()`: "Each entry names the method and which layer installed it" | `override()` always stores `by: 'consumer'` | experimental.ts:100 |
| setup() JSDoc pipeline: `authReady` then `playlistReady` then `mediaReady` then `ready` | Between `pluginsRegistered` and `streamsReady` the pipeline also calls `language(initialLanguage)` with no stage event | lifecycle.ts:107 |
| `_wireProgressEmit`: first `time` after setup always fires `progress` "because `_lastProgressEmit` starts at 0" | The comparison is `Date.now() - self._lastProgressEmit < progressInterval`. A seed of 0 makes the first tick always pass because `Date.now()` is far above 5000 | lifecycle.ts:755 |
| addSubtitleTrack is a "Video-only surface" and "NMMusicPlayer does not declare this method even though the kit composes it onto both prototypes" | `playerCoreMethods` still copies `addSubtitleTrack` onto every prototype that uses the kit mixin tuple | media-tracks.ts:730 |
| volume / playbackRate JSDoc: see `HOT_MUTATIONS` as the reason they skip `beforeMutation` | `HOT_MUTATIONS` is `['time', 'bandwidth', 'recordMetric']`. volume and playbackRate never call `_emitBeforeMutation`; they have dedicated `beforeVolume` / `beforePlaybackRate` hooks | state-mutators.ts:47 |
| load() JSDoc: "Play state: `playState()` reports `LOADING` from the moment the load is committed" | True: `_playState = PlayState.LOADING` after `beforeLoad` passes. A failed load restores `priorPlayState` and emits no error event | loading.ts:153 |
| registerStream: "Pass `prepend: true` to push the factory to the back of the queue instead" | This file only forwards `prepend` to `StreamRegistry.register`. The surprising name lives here | stream-registration.ts:63 |

## Traps
| Behavior | Why it surprises | File:line |
| --- | --- | --- |
| Public volume is 0..100; backend `volume` is 0..1 | `_applyVolume` stores `_internalVolume` on 0..100 then calls `backend.volume(this._internalVolume / 100)` | volume.ts:133 |
| `volume()` getter returns 0 when muted; `volumeUp` / `volumeDown` add to `_internalVolume` | A muted player still steps the stored pre-mute level. `_applyVolume` then unmutes if the stored level is > 0 | volume.ts:88 |
| `seekToIndex` is 1-based; `item(number)` is a 0-based index | Same cursor, two ordinal systems. `seekToIndex(1)` is `setCurrent(0)` | queue.ts:386 |
| `item(target)` autoplays unless `opts.autoplay === false` | JSDoc on `item()` does not mention autoplay. Default matches `playItem` | queue.ts:342 |
| `seekToIndex` does not load or play | Looks like `item(index)` navigation. It only moves the cursor | queue.ts:396 |
| `_emitBeforeMutation` is only called with method `'current'` | `HOT_MUTATIONS` lists `'time'`, `'bandwidth'`, `'recordMetric'`, but `time()`, `bandwidth()`, and `recordMetric()` never call the guard. `mutationGuards: ['time']` does not wrap `time()` | queue.ts:292 |
| Queue mutators take `_opts?: ActionOptions` and never read it | `source` / `silent` on queue writes are accepted and dropped | queue.ts:157 |
| `_backlogList` is not transport history | `next()` / `previous()` ignore it. Consumers must fill it themselves | transport.ts:316 |
| `next()` honours `RepeatState.ALL` wrap; `previous()` does not | At the start of the queue, `previous()` returns with no event and no wrap | transport.ts:317 |
| `beforeSeek` payload `time` is a delta for rewind/forward and an absolute time for `time()` / `restart` | Same event, two meanings. `rewind(5)` sends `time: -5` while seeking to `current - 5` | transport.ts:338 |
| `itemEndingSoon` latch is set before the current-item check | If `item()` is empty at threshold, the event never fires for that item | time.ts:255 |
| Two `_ensureStreamRegistry` helpers | Mixin version seeds `native` then `hls` on first touch. Lifecycle version creates an empty registry, then `streamsReady` registers missing built-ins | stream-registration.ts:39 |
| `_rawAuth` sits on exported `authMethods` | Comment says "Never expose on a public interface." The key is still composed onto the player | auth.ts:100 |
| `_applyVolume` sits on exported `volumeMethods` | Comment says "Internal-only". Same composition path as `volume()` | volume.ts:113 |
| Underscore mixin methods look public | `_seekingTransition`, `_dispatchBefore`, `_registerPlugin`, `_disposeAllPlugins`, `_transitionPhase`, `_resolveBackend`, `_emitBeforeMutation`, `_disposeSidecarSubtitle`, `_mediaIsStale`, `_rawAuth` have no TypeScript private/protected. They are keys of exported objects | player-state.ts:155 |
| `pushDispatch` / `popDispatch` / `resolveItemTrackUrls` / `resetItemEndingSoonLatch` have no underscore | They are kit plumbing with public names | lifecycle.ts:299 |
| `IPlayer` does not declare many mixin methods | `subtitle`, `subtitles`, `subtitleStyle`, `addSubtitleTrack`, `removeSubtitleTrack`, `cycleAudioTracks`, `hasAuth`, `refreshAuth`, `isTv`, `isMobile`, `isDesktop`, `plugins`, `enabledPlugins`, `removePlugin`, `streams`, `unregisterStream`, `getStreamFactory`, `setPreloadStrategy`, `registerTitleTokens`, `resetItemEndingSoonLatch` exist on the composed prototype and are missing from `IPlayer` | media-tracks.ts:590 |
| Mixin `*State` interfaces are exported from these files and not re-exported by the package root | `VolumeMixinState`, `BackendShape`, `SidecarTrack`, and the rest are wired into `PlayerCoreState` internally, not importable from `"."` | volume.ts:15 |
| `hdrOnSdr` and `controls` are accepted on `setup(config: BasePlayerConfig)` and never read by any mixin | `_normalizeOptions` copies the whole config onto `options`. No mixin reads `options.hdrOnSdr` or `options.controls` | lifecycle.ts:347 |
| `storage` and `websocketFactory` are accepted the same way | Mixins never read them. Plugin code is the intended reader | lifecycle.ts:347 |
| `AuthConfig.mediaAuthorization` and `retryAfterRefresh` are stored on `_authConfig` | The auth mixin only redacts `bearerToken` and reads `transformUrl` / `refreshOnUnauthenticated`. It never reads `mediaAuthorization` or `retryAfterRefresh` | auth.ts:40 |
| `plugin:enabled`, `plugin:disabled`, `plugin:opts:changed`, `plugin:error` are never emitted here | Registration emits `plugin:installed` / `plugin:failed` / `plugin:disposed` (bare and id-namespaced). `disable()` on dependents does not emit `plugin:disabled` | plugin-registration.ts:146 |
| Container rules listen for `ended`, `waiting`, `stalled`, `canplay`, `fullscreen`, `pip`, `theater` | This slice never `emit`s those names. Classes only change if some other layer emits them | container-class-emit.ts:65 |
| `waiting` / `stalled` only remove class `playing` | Other play-state classes can remain beside `buffering` | container-class-emit.ts:70 |
| `phase=loading` after first `ready` is a no-op for container classes | `load()` still transitions phase to `loading`. CSS will not show `loading` on a primed player | container-class-emit.ts:193 |
| `fatal` flips `_playState` to `ERROR` inside `emit` | Any `emit('fatal', ...)` from a plugin or consumer changes play state, including `stopImmediatePropagation` listeners | container-class-emit.ts:234 |
| Playlist fetch uses two error events | Setup URL playlist emits `playlistError`. `loadQueue()` emits `playlistResolveError` and `error` | lifecycle.ts:63 |
| `load()` failure rethrows and emits no severity event | JSDoc states this. `playState()` is restored; listeners on `error` / `fatal` hear nothing from this catch | loading.ts:255 |
| `load({ fadeIn })` reads `volume()` for the target | While muted, `volume()` returns 0, so the ramp ends at 0 | loading.ts:226 |
| Silent `ActionOptions.silent` skips `before*` dispatch entirely | `_dispatchBefore` returns not-prevented without running listeners | player-state.ts:175 |
| `quality()` has no `beforeQuality` | `subtitle` and `audioTrack` are cancellable. `quality` writes immediately and emits only `qualityState` | media-tracks.ts:954 |
| `audioTrackMode` can only set `MANUAL` | There is no `'auto'` / default path on this setter. `audioTrack(idx)` also forces `MANUAL` | player-state.ts:272 |
| `qualityMode(idx)` and `quality(idx)` both write `_qualityState` | Two public setters for the same token | player-state.ts:256 |
| AirPlay `transferTo('cast')` vs `'airplay'` | `'airplay'` sets `CONNECTING`, may call `webkitShowPlaybackTargetPicker`, and never sets `CONNECTED` | cast.ts:296 |
| `'local'` only writes `DISCONNECTED` | No Cast session teardown | cast.ts:321 |
| Cast SDK `autoLoad` default is off | First `transferTo('cast')` throws `core:policy/castUnavailable` unless the consumer set `cast: { autoLoad: true }` or already injected the script | cast.ts:266 |
| `experimental.override` last writer wins | No stacking. `by` cannot distinguish plugin vs consumer | experimental.ts:98 |
| Device detection is module-cached | First player to call `isTv` / `device` freezes UA classification for every later instance in the page | device.ts:38 |
| `inactivityMs: 0` disables built-in listeners | After that, `activity` only fires from `bumpActivity()` or a plugin | activity.ts:111 |
| Crossfade default in this mixin is `false` | Music-library `true` must be passed in `setup()`. The mixin `?? false` wins if omitted | lifecycle.ts:842 |
| Preload HEAD uses `mode: 'no-cors'` | Failures are swallowed; `preloadComplete` can still fire | lifecycle.ts:1039 |
| Comment in `_rawAuth`: "Never expose on a public interface" | Instructional comment, not a compiler check. The method remains on the composed object | auth.ts:98 |
| Comment in playNow: "Call `stop()` first when a clean teardown before the transition matters" | Instructional comment. `playNow` does not stop | play-queue.ts:71 |
