# Slice: core-kernel
Files given: 27
Files opened: 27

## Files opened
- nomercy-player-core/src/core/auth-fetch/attempt.ts
- nomercy-player-core/src/core/auth-fetch/decode.ts
- nomercy-player-core/src/core/auth-fetch/index.ts
- nomercy-player-core/src/core/auth-fetch/orchestrator.ts
- nomercy-player-core/src/core/auth-fetch/prepare.ts
- nomercy-player-core/src/core/auth-fetch/types.ts
- nomercy-player-core/src/core/chapters/fill-gaps.ts
- nomercy-player-core/src/core/compose.ts
- nomercy-player-core/src/core/config-merge.ts
- nomercy-player-core/src/core/constructor.ts
- nomercy-player-core/src/core/cues/cue.ts
- nomercy-player-core/src/core/cues/tracker.ts
- nomercy-player-core/src/core/dispatch.ts
- nomercy-player-core/src/core/format.ts
- nomercy-player-core/src/core/index.ts
- nomercy-player-core/src/core/kit-version.ts
- nomercy-player-core/src/core/plugin-translations.ts
- nomercy-player-core/src/core/plugin/base.ts
- nomercy-player-core/src/core/plugin/dispatch.ts
- nomercy-player-core/src/core/plugin/fetch.ts
- nomercy-player-core/src/core/plugin/index.ts
- nomercy-player-core/src/core/plugin/lifecycle.ts
- nomercy-player-core/src/core/plugin/throw.ts
- nomercy-player-core/src/core/plugin/translations.ts
- nomercy-player-core/src/core/resolved-url.ts
- nomercy-player-core/src/core/state.ts
- nomercy-player-core/src/core/volume-curve.ts

`package.json` `exports` for this package has `"."` (built from `src/index.ts`) and adapter/plugin/testing subpaths. There is no `./core` subpath. Reachable consumer names below are those re-exported from `src/index.ts`. `core/index.ts` also re-exports mixin method objects owned by the mixins slice; those names are not listed here.

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `appendAuthTokenParam` | `export function appendAuthTokenParam(url: string, headerValue: string \| undefined): string` | nomercy-player-core/src/core/append-auth-token-param.ts:27; re-exported from src/index.ts |
| `authFetch` | `export async function authFetch<T = string>(opts: AuthFetchOptions<T>): Promise<T>` | nomercy-player-core/src/core/auth-fetch/orchestrator.ts:36; re-exported from src/index.ts |
| `isAuthError` | `export function isAuthError(err: unknown): err is AuthError` | nomercy-player-core/src/core/auth-fetch/index.ts:26; re-exported from src/index.ts |
| `isNetworkError` | `export function isNetworkError(err: unknown): err is NetworkError` | nomercy-player-core/src/core/auth-fetch/index.ts:31; re-exported from src/index.ts |
| `AuthFetchOptions` | `export type AuthFetchOptions<T> = AuthFetchBase & ( \| { responseType?: 'text'; parser?: (raw: string) => T } \| { responseType: 'json' } \| { responseType: 'arrayBuffer' })` | nomercy-player-core/src/core/auth-fetch/types.ts:58; re-exported from src/index.ts |
| `CHAPTER_GAP_EPSILON_SECONDS` | `export const CHAPTER_GAP_EPSILON_SECONDS = 0.25` | nomercy-player-core/src/core/chapters/fill-gaps.ts:20; re-exported from src/index.ts |
| `fillChapterGaps` | `export function fillChapterGaps(chapters: ReadonlyArray<Chapter>, duration: number, makeFillerTitle: () => string): ChapterGapFillResult` | nomercy-player-core/src/core/chapters/fill-gaps.ts:63; re-exported from src/index.ts |
| `ChapterGapFillResult` | `export interface ChapterGapFillResult { chapters: ReadonlyArray<Chapter>; changed: boolean; }` | nomercy-player-core/src/core/chapters/fill-gaps.ts:23; re-exported from src/index.ts |
| `composeMixins` | `export function composeMixins<T extends object>(prototype: T, ...modules: object[]): void` | nomercy-player-core/src/core/compose.ts:38; re-exported from src/index.ts |
| `mergeConfig` | `export function mergeConfig<T>(defaults: T, user?: Partial<T> \| undefined): T` | nomercy-player-core/src/core/config-merge.ts:23; re-exported from src/index.ts |
| `resolvePlayerConstructor` | `export function resolvePlayerConstructor<C>(id: string \| number \| undefined, instances: Map<string, C>, className: string): PlayerCtorResolution<C>` | nomercy-player-core/src/core/constructor.ts:55; re-exported from src/index.ts |
| `PlayerCtorResolution` | `export type PlayerCtorResolution<C> = \| { kind: 'existing'; instance: C } \| { kind: 'mount'; id: string; div: HTMLDivElement }` | nomercy-player-core/src/core/constructor.ts:22; re-exported from src/index.ts |
| `Cue` | `export interface Cue<T = unknown> { start: number; end: number; payload: T; id?: string \| number; }` | nomercy-player-core/src/core/cues/cue.ts:10; re-exported from src/index.ts |
| `CueList` | `export interface CueList<T = unknown> { readonly cues: ReadonlyArray<Cue<T>>; active(time: number): Cue<T>[]; next(time: number): Cue<T> \| undefined; prev(time: number): Cue<T> \| undefined; }` | nomercy-player-core/src/core/cues/cue.ts:27; re-exported from src/index.ts |
| `MutableCueList` | `export interface MutableCueList<T = unknown> extends CueList<T> { add(cue: Cue<T>): void; remove(id: string \| number): boolean; clear(): void; subscribe(fn: (cues: ReadonlyArray<Cue<T>>) => void): () => void; }` | nomercy-player-core/src/core/cues/cue.ts:40; re-exported from src/index.ts |
| `createCueList` | `export function createCueList<T>(cues: ReadonlyArray<Cue<T>>): CueList<T>` | nomercy-player-core/src/core/cues/cue.ts:61; re-exported from src/index.ts |
| `createMutableCueList` | `export function createMutableCueList<T>(initial?: ReadonlyArray<Cue<T>>): MutableCueList<T>` | nomercy-player-core/src/core/cues/cue.ts:128; re-exported from src/index.ts |
| `CueTracker` | `export class CueTracker<T>` | nomercy-player-core/src/core/cues/tracker.ts:49; re-exported from src/index.ts |
| `CueTracker` constructor | `constructor(private readonly list: CueList<T>, opts?: CueTrackerOptions)` | nomercy-player-core/src/core/cues/tracker.ts:63; public via `CueTracker` |
| `CueTracker.trackerId` | `readonly trackerId: string` | nomercy-player-core/src/core/cues/tracker.ts:61; public via `CueTracker` |
| `CueTracker.attach` | `attach(player: CueTrackerTarget): void` | nomercy-player-core/src/core/cues/tracker.ts:73; public via `CueTracker` |
| `CueTracker.detach` | `detach(): void` | nomercy-player-core/src/core/cues/tracker.ts:87; public via `CueTracker` |
| `CueTracker.on` | `on(event: TrackerEvent, fn: Handler<T>): void` | nomercy-player-core/src/core/cues/tracker.ts:105; public via `CueTracker` |
| `CueTracker.off` | `off(event: TrackerEvent, fn: Handler<T>): void` | nomercy-player-core/src/core/cues/tracker.ts:115; public via `CueTracker` |
| `CueTracker.suspend` | `suspend(): void` | nomercy-player-core/src/core/cues/tracker.ts:128; public via `CueTracker` |
| `CueTracker.resume` | `resume(): void` | nomercy-player-core/src/core/cues/tracker.ts:133; public via `CueTracker` |
| `CueTracker.history` | `history(count?: number): Cue<T>[]` | nomercy-player-core/src/core/cues/tracker.ts:138; public via `CueTracker` |
| `CueTracker.dispose` | `dispose(): void` | nomercy-player-core/src/core/cues/tracker.ts:144; public via `CueTracker` |
| `CueTrackerOptions` | `export interface CueTrackerOptions { tolerance?: number; trackerId?: string; historyMax?: number; }` | nomercy-player-core/src/core/cues/tracker.ts:23; re-exported from src/index.ts |
| `runDispatchBefore` | `export async function runDispatchBefore<TData>(target: DispatchTarget, eventName: string, initialData: TData, opts?: DispatchBeforeOpts): Promise<BeforeDispatchOutcome<TData>>` | nomercy-player-core/src/core/dispatch.ts:110; re-exported from src/index.ts |
| `BeforeDispatchOutcome` | `export interface BeforeDispatchOutcome<TData> { data: TData; prevented: boolean; reason?: PreventedReason; cause?: unknown; }` | nomercy-player-core/src/core/dispatch.ts:41; re-exported from src/index.ts |
| `DispatchTarget` | `export interface DispatchTarget { listenersOf?: (event: string) => ReadonlyArray<(data: unknown) => void>; pushDispatch?: (name: string) => void; popDispatch?: () => string \| undefined; }` | nomercy-player-core/src/core/dispatch.ts:55; re-exported from src/index.ts |
| `DispatchBeforeOpts` | `export interface DispatchBeforeOpts { timeoutMs?: number; }` | nomercy-player-core/src/core/dispatch.ts:64; re-exported from src/index.ts |
| `escapeHtml` | `export function escapeHtml(str: string): string` | nomercy-player-core/src/core/format.ts:23; re-exported from src/index.ts |
| `formatSeconds` | `export function formatSeconds(seconds: number): string` | nomercy-player-core/src/core/format.ts:44; re-exported from src/index.ts |
| `clampVolume` | `export function clampVolume(value: number): number` | nomercy-player-core/src/core/format.ts:65; re-exported from src/index.ts |
| `formatDuration` | `export function formatDuration(duration: number \| string \| undefined): string` | nomercy-player-core/src/core/format.ts:83; re-exported from src/index.ts |
| `playerCoreMethods` | `export const playerCoreMethods = [lifecycleMethods, baseUrlAudioContextMethods, experimentalDescriptor, i18nMethods, cueParserMethods, transportMethods, timeMethods, volumeMethods, stateMethods, playerStateMethods, queueMethods, playQueueMethods, pluginRegistrationMethods, authMethods, streamRegistrationMethods, mediaTracksMethods, deviceMethods, audioOutputMethods, castMethods, abrMethods, metricsMethods, loadingMethods, containerClassEmitMethods, activityMethods, preloadStrategyMethods] as const` | nomercy-player-core/src/core/index.ts:103; re-exported from src/index.ts |
| `KIT_VERSION` | `export const KIT_VERSION: string = pkg.version` | nomercy-player-core/src/core/kit-version.ts:21; re-exported from src/index.ts |
| `Plugin` | `export class Plugin<P extends IPlayer<BaseEventMap> & DispatchTarget = IPlayer & DispatchTarget, O = unknown, E extends Record<string, any> = Record<string, never>>` | nomercy-player-core/src/core/plugin/base.ts:152; re-exported from src/index.ts |
| `Plugin.id` (static) | `static readonly id: string = 'plugin'` | nomercy-player-core/src/core/plugin/base.ts:158; public via `Plugin` |
| `Plugin.version` (static) | `static readonly version: string = '0.0.0'` | nomercy-player-core/src/core/plugin/base.ts:161; public via `Plugin` |
| `Plugin.minCoreVersion` (static) | `static readonly minCoreVersion?: string` | nomercy-player-core/src/core/plugin/base.ts:164; public via `Plugin` |
| `Plugin.description` (static) | `static readonly description: string = ''` | nomercy-player-core/src/core/plugin/base.ts:167; public via `Plugin` |
| `Plugin.moduleUrl` (static) | `static readonly moduleUrl?: string` | nomercy-player-core/src/core/plugin/base.ts:178; public via `Plugin` |
| `Plugin.requires` (static) | `static readonly requires?: ReadonlyArray<RequireSpec>` | nomercy-player-core/src/core/plugin/base.ts:202; public via `Plugin` |
| `Plugin.replaces` (static) | `static readonly replaces?: string` | nomercy-player-core/src/core/plugin/base.ts:208; public via `Plugin` |
| `Plugin.priority` (static) | `static readonly priority: number = 0` | nomercy-player-core/src/core/plugin/base.ts:219; public via `Plugin` |
| `Plugin.onError` (static) | `static readonly onError?: Readonly<Record<string, PluginRecoveryAction>>` | nomercy-player-core/src/core/plugin/base.ts:225; public via `Plugin` |
| `Plugin.advisories` (static) | `static readonly advisories?: ReadonlyArray<PluginAdvisory>` | nomercy-player-core/src/core/plugin/base.ts:237; public via `Plugin` |
| `Plugin.translations` (static) | `static readonly translations?: Translations` | nomercy-player-core/src/core/plugin/base.ts:255; public via `Plugin` |
| `Plugin.player` | `declare player: P` | nomercy-player-core/src/core/plugin/base.ts:257; public via `Plugin` |
| `Plugin.opts` | `declare opts: O` | nomercy-player-core/src/core/plugin/base.ts:258; public via `Plugin` |
| `Plugin.__events__` | `declare readonly __events__: E` | nomercy-player-core/src/core/plugin/base.ts:260; public via `Plugin` |
| `Plugin.id` (instance) | `get id(): string` | nomercy-player-core/src/core/plugin/base.ts:269; public via `Plugin` |
| `Plugin.initialize` | `initialize(player: P, opts: O, lifecycle: LifecycleRegistry): void` | nomercy-player-core/src/core/plugin/base.ts:290; public via `Plugin` |
| `Plugin.use` | `use(): void \| Promise<void>` | nomercy-player-core/src/core/plugin/base.ts:312; public via `Plugin` |
| `Plugin.dispose` | `dispose(): void` | nomercy-player-core/src/core/plugin/base.ts:326; public via `Plugin` |
| `Plugin.enabled` | `enabled(): boolean` | nomercy-player-core/src/core/plugin/base.ts:331; public via `Plugin` |
| `Plugin.enable` | `enable(): void` | nomercy-player-core/src/core/plugin/base.ts:339; public via `Plugin` |
| `Plugin.disable` | `disable(reason?: string): void` | nomercy-player-core/src/core/plugin/base.ts:349; public via `Plugin` |
| `Plugin.state` | `state(): PluginState<O>` | nomercy-player-core/src/core/plugin/base.ts:365; public via `Plugin` |
| `Plugin.options` | `options(): Readonly<O>; options(partial: Partial<O>): void` | nomercy-player-core/src/core/plugin/base.ts:391; public via `Plugin` |
| `Plugin.derive` | `static derive<C extends typeof Plugin<any, any, any>>(this: C, opts: Partial<InstanceType<C>['opts']>, newId?: string): C` | nomercy-player-core/src/core/plugin/base.ts:1040; public via `Plugin` |
| `Plugin.clone` | `clone(): typeof Plugin` | nomercy-player-core/src/core/plugin/base.ts:1070; public via `Plugin` |
| `Plugin.export` | `export(): O` | nomercy-player-core/src/core/plugin/base.ts:1083; public via `Plugin` |
| `PluginThrow` | `export class PluginThrow extends Error { constructor(public readonly payload: ThrowPayload, public readonly pluginId: string) }` | nomercy-player-core/src/core/plugin/throw.ts:50; re-exported from src/index.ts |
| `ThrowPayload` | `export interface ThrowPayload { code: string; severity?: Severity; message?: string; cause?: unknown; context?: Record<string, unknown>; suggestion?: string; retry?: RetryConfig \| null; id?: number; }` | nomercy-player-core/src/core/plugin/throw.ts:20; re-exported from src/index.ts |
| `PluginRecoveryAction` | `export type PluginRecoveryAction = typeof PLUGIN_RECOVERY_ACTION[keyof typeof PLUGIN_RECOVERY_ACTION]` | nomercy-player-core/src/core/plugin/throw.ts:43; re-exported from src/index.ts |
| `FetchOptions` | `export type FetchOptions<T> = \| (FetchHttp & { responseType?: 'text'; parser?: (raw: string) => T }) \| (FetchHttp & { responseType: 'json' }) \| (FetchHttp & { responseType: 'arrayBuffer' })` | nomercy-player-core/src/core/plugin/fetch.ts:31; re-exported from src/index.ts |
| `DispatchBeforeOptions` | `export interface DispatchBeforeOptions { timeoutMs?: number; }` | nomercy-player-core/src/core/plugin/dispatch.ts:18; re-exported from src/index.ts |
| `BeforeDispatchResult` | `export type BeforeDispatchResult<TData> = BeforeDispatchOutcome<TData>` | nomercy-player-core/src/core/plugin/dispatch.ts:15; re-exported from src/index.ts |
| `PluginState` | `export interface PluginState<O = unknown> { id: string; version: string; enabled: boolean; opts: Readonly<O>; runtime: Record<string, unknown>; }` | nomercy-player-core/src/core/plugin/lifecycle.ts:13; re-exported from src/index.ts |
| `buildResolvedUrl` | `export function buildResolvedUrl(raw: string, transformed: string, baseUrl?: string): ResolvedUrl` | nomercy-player-core/src/core/resolved-url.ts:89; re-exported from src/index.ts |
| `initPlayerCoreState` | `export function initPlayerCoreState(player: object, opts: { className: string }): void` | nomercy-player-core/src/core/state.ts:439; re-exported from src/index.ts |
| `setPlayerAudioContext` | `export function setPlayerAudioContext(player: object, ctx: AudioContext \| undefined): void` | nomercy-player-core/src/core/state.ts:514; re-exported from src/index.ts |
| `interpolateTitleTokens` | `export function interpolateTitleTokens(text: string, translator: ITranslator \| undefined, registry: TokenRegistry): string` | nomercy-player-core/src/core/title-tokens.ts:43; re-exported from src/index.ts |
| `TokenRegistry` | `export type TokenRegistry = Readonly<Record<string, string>>` | nomercy-player-core/src/core/title-tokens.ts:21; re-exported from src/index.ts |
| `perceptualGain` | `export function perceptualGain(position01: number): number` | nomercy-player-core/src/core/volume-curve.ts:63; re-exported from src/index.ts |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `Plugin.id` | `'plugin'` | `get id()`, `state()`, namespacing | nomercy-player-core/src/core/plugin/base.ts:158 |
| `Plugin.version` | `'0.0.0'` | `state()` | nomercy-player-core/src/core/plugin/base.ts:161 |
| `Plugin.description` | `''` | (static field; registration lives in mixins) | nomercy-player-core/src/core/plugin/base.ts:167 |
| `Plugin.priority` | `0` | (static field; `enabledPlugins()` lives in mixins) | nomercy-player-core/src/core/plugin/base.ts:219 |
| `Plugin._enabled` | `true` | `enabled()`, `enable()`, `disable()`, `state()` | nomercy-player-core/src/core/plugin/base.ts:279 |
| Logger prefix when `config.logger` is absent | `{ prefix: 'nmplayer', level: config.logLevel }` | `initialize()` | nomercy-player-core/src/core/plugin/base.ts:297 |
| Storage backend when `config.storage` is absent | `new LocalStorageBackend()` | `initialize()` | nomercy-player-core/src/core/plugin/base.ts:303 |
| Storage key prefix | `` `nmplayer-${this.id}-` `` | `_namespacedStorage` | nomercy-player-core/src/core/plugin/base.ts:304 |
| `dispatchBefore` timeout | `opts?.timeoutMs ?? config.beforeEventTimeoutMs ?? 10_000` | `Plugin.dispatchBefore` | nomercy-player-core/src/core/plugin/base.ts:558 |
| `runDispatchBefore` timeout | `opts?.timeoutMs ?? DEFAULT_TIMEOUT_MS` with `const DEFAULT_TIMEOUT_MS = 10_000` | `runDispatchBefore` | nomercy-player-core/src/core/dispatch.ts:73,116 |
| `throw` severity | `payload.severity ?? 'error'` | `buildError` | nomercy-player-core/src/core/plugin/base.ts:592 |
| `report` severity | `payload.severity ?? 'warning'` | `report` | nomercy-player-core/src/core/plugin/base.ts:583 |
| `Plugin.fetch` `scope` | `options?.scope ?? 'plugin'` | `pluginFetch` | nomercy-player-core/src/core/plugin/fetch.ts:65 |
| `authFetch` `scope` | `opts.scope ?? (opts.pluginId ? 'plugin' : 'player')` | `prepareAttempt` | nomercy-player-core/src/core/auth-fetch/prepare.ts:105 |
| HTTP method | `opts.method ?? 'GET'` | `buildRequest` | nomercy-player-core/src/core/auth-fetch/prepare.ts:74 |
| Fetch credentials | `opts.auth?.credentials ?? 'same-origin'` | `buildRequest` | nomercy-player-core/src/core/auth-fetch/prepare.ts:76 |
| Fetch retry | `opts.retry ?? DEFAULT_RETRY` where `const DEFAULT_RETRY: RetryConfig = { attempts: 0 }` | `prepareAttempt` (`maxAttempts = Math.max(1, retry.attempts + 1)`) | nomercy-player-core/src/core/auth-fetch/prepare.ts:20,158 |
| 401 refresh budget | `(opts.auth?.refreshOnUnauthenticated && (opts.auth.retryAfterRefresh ?? 1) > 0) ? 1 : 0` | `prepareAttempt` `maxRefreshes` | nomercy-player-core/src/core/auth-fetch/prepare.ts:160 |
| Backoff `baseMs` | `retry.baseMs ?? 500` | `computeBackoff` | nomercy-player-core/src/core/auth-fetch/attempt.ts:57 |
| Backoff `maxMs` | `retry.maxMs ?? 30_000` | `computeBackoff` | nomercy-player-core/src/core/auth-fetch/attempt.ts:58 |
| Backoff curve | linear unless `retry.backoff === 'exponential'` | `computeBackoff` | nomercy-player-core/src/core/auth-fetch/attempt.ts:59 |
| Fetch `responseType` | omitted means text (`decodeBody` falls through to `response.text()`) | `decodeBody` | nomercy-player-core/src/core/auth-fetch/decode.ts:44 |
| Websocket factory | `opts?.factory ?? config.websocketFactory ?? nativeWebSocketAdapter` | `Plugin.websocket` | nomercy-player-core/src/core/plugin/base.ts:774 |
| `CueTrackerOptions.tolerance` | `opts?.tolerance ?? 0` | `computeActive` | nomercy-player-core/src/core/cues/tracker.ts:64 |
| `CueTrackerOptions.historyMax` | `opts?.historyMax ?? 32` | `recordHistory` | nomercy-player-core/src/core/cues/tracker.ts:69 |
| `CueTrackerOptions.trackerId` | `` `tracker-${Math.random().toString(36).slice(2, 10)}` `` | `cue:enter` / `cue:exit` payload | nomercy-player-core/src/core/cues/tracker.ts:65 |
| Chapter gap epsilon | `0.25` (seconds) | `fillChapterGaps` | nomercy-player-core/src/core/chapters/fill-gaps.ts:20 |
| `_phase` | `'idle'` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:442 |
| `_playState` | `PlayState.IDLE` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:451 |
| `_volumeState` | `VolumeState.UNMUTED` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:452 |
| `_repeatState` | `RepeatState.OFF` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:453 |
| `_shuffleState` | `ShuffleState.OFF` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:454 |
| `_internalVolume` | `100` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:455 |
| `_volumeBeforeMute` | `100` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:456 |
| `_internalCurrentTime` | `0` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:457 |
| `_internalDuration` | `0` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:458 |
| `_playbackRate` | `1` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:461 |
| `_currentSubtitleIdx` | `null` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:470 |
| `_currentAudioTrackIdx` | `null` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:471 |
| `_currentQualityIdx` | `'auto'` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:472 |
| `_qualityState` | `QualityState.AUTO` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:474 |
| `_audioTrackState` | `AudioTrackState.DEFAULT` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:475 |
| `_activityTrackingEnabled` | `true` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:496 |
| `_titleTokenRegistry` | `{}` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:498 |
| `_preloadStrategy` | `new DefaultPreloadStrategy(10)` | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:500 |
| `_transitionStrategy` | `_NOOP_TRANSITION` (`shouldTransition: () => false`) | `initPlayerCoreState` | nomercy-player-core/src/core/state.ts:420,501 |
| `formatSeconds` invalid input | `'0:00'` | `formatSeconds` | nomercy-player-core/src/core/format.ts:46 |
| `formatDuration` null/zero/non-finite | `''` | `formatDuration` | nomercy-player-core/src/core/format.ts:85,91 |
| `clampVolume` range | `Math.round(Math.max(0, Math.min(100, value)))` | `clampVolume` | nomercy-player-core/src/core/format.ts:66 |
| `perceptualGain` | `clamped ** 2` after clamp to `[0, 1]` | `perceptualGain` | nomercy-player-core/src/core/volume-curve.ts:64 |
| `KIT_VERSION` | `pkg.version` (package.json `"2.2.3"` at time of read) | registration version check (mixins) | nomercy-player-core/src/core/kit-version.ts:21 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| `this.throw(...)` internally raises `PluginThrow` so the kit can identify structured plugin throws | `throw()` builds a `PlayerError`, surfaces it, and `throw error`. `PluginThrow` is imported and re-exported from `base.ts` but never constructed in this slice | nomercy-player-core/src/core/plugin/throw.ts:45; nomercy-player-core/src/core/plugin/base.ts:569 |
| The kit applies retry policy from the throw payload and falls back to console if no handler called `markHandled()` | `ThrowPayload.retry` is never read. `buildError` / `surfaceError` ignore it. `markHandled` does not appear anywhere in this slice | nomercy-player-core/src/core/plugin/throw.ts:17; nomercy-player-core/src/core/plugin/base.ts:588 |
| `enable()`: handlers short-circuit on `enabled() === false` | `on()` / `once()` register `fn` on the player with no `enabled()` wrapper | nomercy-player-core/src/core/plugin/base.ts:336; nomercy-player-core/src/core/plugin/base.ts:433 |
| `enabled()` default is `true` after `use()` resolves | `_enabled = true` at field init, before `use()` | nomercy-player-core/src/core/plugin/base.ts:330; nomercy-player-core/src/core/plugin/base.ts:279 |
| `Plugin.fetch` `scope: 'player'` also emits player-global `fetch:*` | `prepareAttempt` emits either `plugin:<id>:fetch:*` or `fetch:*`, never both | nomercy-player-core/src/core/plugin/base.ts:701; nomercy-player-core/src/core/auth-fetch/prepare.ts:107 |
| `Plugin.emit`: listeners that throw are caught and routed via the standard error path | `emit` calls `this.player.emit(namespaced, data)` with no try/catch | nomercy-player-core/src/core/plugin/base.ts:490; nomercy-player-core/src/core/plugin/base.ts:498 |
| `options(partial)` emits `opts:changed` on the plugin and player channels | Emits `plugin:opts:changed`, then `plugin:<id>:opts:changed` with `{ id, opts }`, then `this.emit('opts:changed', this.opts)` which is the same namespaced name again with a different payload (`opts` only) | nomercy-player-core/src/core/plugin/base.ts:386; nomercy-player-core/src/core/plugin/base.ts:399 |
| Active/next/prev are O(log n) via binary search | Binary search finds the first `start > time`, then `active` and `prev` scan backward through every earlier cue | nomercy-player-core/src/core/cues/cue.ts:19; nomercy-player-core/src/core/cues/cue.ts:83 |
| `fillChapterGaps` covers `[0, duration)` | Trailing filler is pushed with `end: duration` | nomercy-player-core/src/core/chapters/fill-gaps.ts:37; nomercy-player-core/src/core/chapters/fill-gaps.ts:101 |
| No-ops listed: empty list, unknown duration, or already covered | Also no-ops when every remaining chapter is `synthetic: true` (`real.length === 0`) | nomercy-player-core/src/core/chapters/fill-gaps.ts:50; nomercy-player-core/src/core/chapters/fill-gaps.ts:82 |
| `null` user value overwrites the default | Top-level `user === null` returns `defaults` unchanged. Nested `null` does overwrite | nomercy-player-core/src/core/config-merge.ts:14; nomercy-player-core/src/core/config-merge.ts:24 |
| Token registry maps uppercase or lowercase letters | `TOKEN_RE` is case-insensitive, but lookup is `registry[letter]` with the matched case, so `%s01` does not hit a key `S` | nomercy-player-core/src/core/title-tokens.ts:12; nomercy-player-core/src/core/title-tokens.ts:57 |
| Observability is on by default for `authFetch` | If `opts.emit` is omitted, `rawEmit` is a no-op | nomercy-player-core/src/core/auth-fetch/orchestrator.ts:29; nomercy-player-core/src/core/auth-fetch/prepare.ts:104 |
| `on()` comment: `static requires = ['<id>']` already guarantees the class is loaded | `requires` is `ReadonlyArray<RequireSpec>` (class refs / object form), not string ids | nomercy-player-core/src/core/plugin/base.ts:421; nomercy-player-core/src/core/plugin/base.ts:202 |
| `this.t('line.empty')` missing keys default to the key itself | If `player.t` is absent, returns the namespaced key `plugin.<id>.<key>`, not the original `key` | nomercy-player-core/src/core/plugin/base.ts:944; nomercy-player-core/src/core/plugin/base.ts:952 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `ThrowPayload.retry` is accepted on the exported interface and documented as a per-throw retry override | Unread. `buildError` never copies it onto `PlayerError`. Passing `{ retry: null }` does not disable retries | nomercy-player-core/src/core/plugin/throw.ts:28 |
| `PluginThrow` is a public export | Production `Plugin.throw` throws `PlayerError`. `new PluginThrow` appears only outside this slice (tests). `instanceof PluginThrow` will not see kit throws | nomercy-player-core/src/core/plugin/throw.ts:50; nomercy-player-core/src/core/plugin/base.ts:569 |
| `PLUGIN_RECOVERY_ACTION` is `export const` with the four string values | Not re-exported from `plugin/index.ts` or `src/index.ts`. Consumers get the type `PluginRecoveryAction` only | nomercy-player-core/src/core/plugin/throw.ts:33; nomercy-player-core/src/core/plugin/index.ts:23 |
| `AnyPluginCtor`, `PlayerEventMap`, `PluginEventMap` are exported from the plugin barrel | Not re-exported from `src/index.ts`. Not a consumer import from the package root | nomercy-player-core/src/core/plugin/index.ts:14 |
| `CueTrackerTarget` is an exported interface; `TrackerEvent` / `Handler` are file-private | `src/index.ts` re-exports `CueTracker` and `CueTrackerOptions` only. `attach` still types against `CueTrackerTarget` | nomercy-player-core/src/core/cues/tracker.ts:16; nomercy-player-core/src/core/cues/tracker.ts:32 |
| `PlayerCoreState`, `MixinSurface`, `Internals` are exported from `state.ts` / `core/index.ts` | Not re-exported from `src/index.ts`. Internal "this" shape, not a consumer type | nomercy-player-core/src/core/state.ts:97,264,409 |
| `loadPluginStaticTranslations` is `export function` | Not re-exported from `src/index.ts`. Internal registration helper | nomercy-player-core/src/core/plugin-translations.ts:39 |
| `pluginFetch`, `AuthFetchBase`, `Outcome`, `AttemptCtx`, `prepareAttempt`, `buildRequest`, `attemptOnce`, `decodeBody`, `computeBackoff`, `sleep` are exported from their files | Not on `src/index.ts`. Not consumer-reachable through `"."` | nomercy-player-core/src/core/plugin/fetch.ts:60; nomercy-player-core/src/core/auth-fetch/index.ts:22 |
| `Plugin.on` / `once` / `off` / `emit` / `dispatchBefore` / `throw` / `report` / `fetch` / `t` / `mount` / `websocket` and the other helpers are `protected` | JSDoc presents them as the plugin author API. A consumer holding a `Plugin` instance cannot call them. Subclass authors can | nomercy-player-core/src/core/plugin/base.ts:427,496,569,713 |
| `initialize` is public | JSDoc says plugin authors never call it; the player does. A caller with a `Plugin` instance can still invoke it | nomercy-player-core/src/core/plugin/base.ts:287 |
| Public volume is 0..100 (`clampVolume`, `_internalVolume = 100`) | `perceptualGain` takes and returns 0..1 amplitude. Slider position and gain are different units | nomercy-player-core/src/core/format.ts:63; nomercy-player-core/src/core/state.ts:455; nomercy-player-core/src/core/volume-curve.ts:58 |
| `Cue.start` / `Cue.end` are unannotated `number` | `CueTrackerOptions.tolerance` is documented as seconds. Same time domain, only one field names the unit | nomercy-player-core/src/core/cues/cue.ts:11; nomercy-player-core/src/core/cues/tracker.ts:24 |
| `formatDuration(0)` is `''`; `formatSeconds(0)` is `'0:00'` | Same seconds input, two public formatters, two answers for zero | nomercy-player-core/src/core/format.ts:46,90 |
| Default fetch retry is `{ attempts: 0 }` so `maxAttempts` is 1 | JSDoc on `Plugin.fetch` says 5xx / timeout / network retry per `RetryConfig`. Omitting `retry` means no extra attempt | nomercy-player-core/src/core/auth-fetch/prepare.ts:20; nomercy-player-core/src/core/plugin/base.ts:711 |
| `auth.retryAfterRefresh` is read only as `(value ?? 1) > 0`, then `maxRefreshes` is hardcoded `1` | Setting `retryAfterRefresh: 3` still refreshes at most once | nomercy-player-core/src/core/auth-fetch/prepare.ts:160 |
| After a retryable failure, the orchestrator always `dispatch('retry')` and `sleep`s, then may exit the loop without another fetch | With `attempts: 0`, a 5xx still emits `fetch:retry` and waits `delayMs` before throwing `lastError` | nomercy-player-core/src/core/auth-fetch/orchestrator.ts:59 |
| `timeoutMs` omitted or `<= 0` makes `timeoutPromise` a never-resolving Promise | There is no default HTTP timeout. `timeoutMs: 0` does not mean "immediate timeout" | nomercy-player-core/src/core/auth-fetch/attempt.ts:22 |
| `DispatchBeforeOpts` and `DispatchBeforeOptions` are both public | Same `{ timeoutMs?: number }` shape, two names, two files | nomercy-player-core/src/core/dispatch.ts:64; nomercy-player-core/src/core/plugin/dispatch.ts:18 |
| `fillChapterGaps` walks `real` in input order and does not sort | Unsorted or overlapping chapters produce fillers from a moving `cursor = max(cursor, chapter.end)`, not from a timeline sort | nomercy-player-core/src/core/chapters/fill-gaps.ts:93 |
| `Plugin.disable` does not unsubscribe listeners | Matches the "stay subscribed" half of the JSDoc; the short-circuit half is not implemented, so a disabled plugin still runs its `on()` handlers | nomercy-player-core/src/core/plugin/base.ts:349; nomercy-player-core/src/core/plugin/base.ts:433 |
| `CueTracker.resume` does not re-evaluate immediately | Time/seek while suspended are ignored, so `active` stays frozen. The next `time`/`seek` then diffs against that stale set | nomercy-player-core/src/core/cues/tracker.ts:132 |
| `options()` then `this.emit('opts:changed')` fires `plugin:<id>:opts:changed` twice | First payload `{ id, opts }`, second payload is `opts` alone | nomercy-player-core/src/core/plugin/base.ts:403 |
| `static translations` keys must already include `plugin.<id>.*`; `t()` also prefixes `plugin.<id>.` | `this.t('empty')` looks up `plugin.<id>.empty`. A static key of `empty` will not match | nomercy-player-core/src/core/plugin/base.ts:242; nomercy-player-core/src/core/plugin/base.ts:948 |
| `loadTranslations` JSDoc: keys merged by this hook alone survive `dispose()` | `Plugin.dispose` is an empty public method. Teardown of static vs async translations is not in this class | nomercy-player-core/src/core/plugin/base.ts:962; nomercy-player-core/src/core/plugin/base.ts:326 |
| `plugin/translations.ts` tells W6/W12 where to insert an `ITranslationLoader` adapter | Comment directed at later workstreams. File runtime is `export type {}` | nomercy-player-core/src/core/plugin/translations.ts:17 |
| `PlayerCoreState` JSDoc: underscore fields are structural, "do not rename" | Instruction to the reader, not runtime behavior | nomercy-player-core/src/core/state.ts:91 |
| `surfaceError` emits `error.severity` and only adds `plugin:error` / `plugin:warning` | `fatal` and `info` do not get a `plugin:` companion event. throw.ts JSDoc lists `error` / `warning` / `info` plus `plugin:error` / `plugin:warning` | nomercy-player-core/src/core/plugin/base.ts:612; nomercy-player-core/src/core/plugin/throw.ts:15 |
| `appendAuthTokenParam` always appends `access_token=` | JSDoc says the middleware also accepts `token`. Duplicate `access_token` is not stripped if the URL already has one | nomercy-player-core/src/core/append-auth-token-param.ts:40 |
| `priority` higher sorts BEFORE lower | Opposite of typical "higher priority runs later" intuition. Comment says it does not reorder event handlers | nomercy-player-core/src/core/plugin/base.ts:211 |
