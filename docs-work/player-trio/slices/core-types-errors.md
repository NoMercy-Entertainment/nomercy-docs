# Slice: core-types-errors
Files given: 28
Files opened: 28

## Files opened
- nomercy-player-core/src/errors/auth.ts
- nomercy-player-core/src/errors/code.ts
- nomercy-player-core/src/errors/drm.ts
- nomercy-player-core/src/errors/index.ts
- nomercy-player-core/src/errors/media.ts
- nomercy-player-core/src/errors/network.ts
- nomercy-player-core/src/errors/not-implemented.ts
- nomercy-player-core/src/errors/player.ts
- nomercy-player-core/src/errors/plugin.ts
- nomercy-player-core/src/errors/policy.ts
- nomercy-player-core/src/errors/severity.ts
- nomercy-player-core/src/types/chapter.ts
- nomercy-player-core/src/types/config.ts
- nomercy-player-core/src/types/cues.ts
- nomercy-player-core/src/types/device.ts
- nomercy-player-core/src/types/events.ts
- nomercy-player-core/src/types/experimental.ts
- nomercy-player-core/src/types/index.ts
- nomercy-player-core/src/types/log.ts
- nomercy-player-core/src/types/metrics.ts
- nomercy-player-core/src/types/playback.ts
- nomercy-player-core/src/types/player.ts
- nomercy-player-core/src/types/playlist.ts
- nomercy-player-core/src/types/plugin.ts
- nomercy-player-core/src/types/state.ts
- nomercy-player-core/src/types/tracks.ts
- nomercy-player-core/src/types/translations.ts
- nomercy-player-core/src/types/url.ts

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `CreateElement` | `export type { CreateElement } from '../adapters/element-factory';` | nomercy-player-core/src/types/index.ts:9 |
| `Chapter` | `export interface Chapter {` | nomercy-player-core/src/types/chapter.ts:14 |
| `AuthConfig` | `export interface AuthConfig {` | nomercy-player-core/src/types/config.ts:41 |
| `AuthHeaderValue` | `export type AuthHeaderValue = string \| (() => string) \| (() => Promise<string>);` | nomercy-player-core/src/types/config.ts:30 |
| `BasePlayerConfig` | `export interface BasePlayerConfig {` | nomercy-player-core/src/types/config.ts:180 |
| `CastConfig` | `export interface CastConfig {` | nomercy-player-core/src/types/config.ts:130 |
| `CastTarget` | `export type CastTarget = 'cast' \| 'airplay' \| 'remote-playback' \| 'local';` | nomercy-player-core/src/types/config.ts:123 |
| `DrmConfig` | `export interface DrmConfig {` | nomercy-player-core/src/types/config.ts:104 |
| `CueEventPayload` | `export interface CueEventPayload {` | nomercy-player-core/src/types/cues.ts:53 |
| `SubtitleCue` | `export interface SubtitleCue {` | nomercy-player-core/src/types/cues.ts:19 |
| `SubtitleCueChange` | `export interface SubtitleCueChange {` | nomercy-player-core/src/types/cues.ts:41 |
| `DeviceCapabilities` | `export interface DeviceCapabilities {` | nomercy-player-core/src/types/device.ts:15 |
| `BaseEventMap` | `export interface BaseEventMap<I extends BasePlaylistItem = BasePlaylistItem> {` | nomercy-player-core/src/types/events.ts:64 |
| `BeforeEvent` | `export interface BeforeEvent<TData> {` | nomercy-player-core/src/types/events.ts:40 |
| `PlayerExperimental` | `export interface PlayerExperimental {` | nomercy-player-core/src/types/experimental.ts:26 |
| `LogLevel` | `export type { LogLevel, LogSink } from '../adapters/logger/ILogger';` | nomercy-player-core/src/types/log.ts:9 |
| `LogSink` | `export type { LogLevel, LogSink } from '../adapters/logger/ILogger';` | nomercy-player-core/src/types/log.ts:9 |
| `PlaybackMetrics` | `export interface PlaybackMetrics {` | nomercy-player-core/src/types/metrics.ts:34 |
| `AriaLiveLevel` | `export type AriaLiveLevel = 'polite' \| 'assertive';` | nomercy-player-core/src/types/playback.ts:16 |
| `TimeState` | `export interface TimeState {` | nomercy-player-core/src/types/playback.ts:23 |
| `ACTION_SOURCE` | `export const ACTION_SOURCE = { USER: 'user', REMOTE: 'remote', PLUGIN: 'plugin', } as const;` | nomercy-player-core/src/types/player.ts:105 |
| `ActionOptions` | `export interface ActionOptions {` | nomercy-player-core/src/types/player.ts:124 |
| `ActionSource` | `export type ActionSource = typeof ACTION_SOURCE[keyof typeof ACTION_SOURCE] \| (string & {});` | nomercy-player-core/src/types/player.ts:117 |
| `IPlayer` | `export interface IPlayer<E extends BaseEventMap<any> = BaseEventMap>` | nomercy-player-core/src/types/player.ts:261 |
| `IPlayerBackend` | `export interface IPlayerBackend {` | nomercy-player-core/src/types/player.ts:57 |
| `LoadOptions` | `export interface LoadOptions extends ActionOptions {` | nomercy-player-core/src/types/player.ts:142 |
| `PlayerConstructorId` | `export type PlayerConstructorId = string \| number;` | nomercy-player-core/src/types/player.ts:247 |
| `PlayerPhase` | `export type PlayerPhase = \| 'idle' \| 'setup' \| 'ready' \| 'loading' \| 'starting' \| 'playing' \| 'paused' \| 'buffering' \| 'seeking' \| 'ended' \| 'stopped' \| 'disposing' \| 'disposed';` | nomercy-player-core/src/types/player.ts:201 |
| `PreventedReason` | `export type PreventedReason = \| 'listener-prevented' \| 'delay-rejected' \| 'delay-timeout' \| 'backend-refused';` | nomercy-player-core/src/types/player.ts:220 |
| `WithCurrentItem` | `export interface WithCurrentItem<T extends BasePlaylistItem = BasePlaylistItem> {` | nomercy-player-core/src/types/player.ts:92 |
| `BasePlaylistItem` | `export interface BasePlaylistItem {` | nomercy-player-core/src/types/playlist.ts:23 |
| `PluginAdvisory` | `export interface PluginAdvisory {` | nomercy-player-core/src/types/plugin.ts:104 |
| `PluginCtorWithId` | `export type PluginCtorWithId = (new (...args: never[]) => unknown) & {` | nomercy-player-core/src/types/plugin.ts:21 |
| `PluginSpec` | `export type PluginSpec = \| PluginCtorWithId \| { plugin: PluginCtorWithId; opts?: unknown };` | nomercy-player-core/src/types/plugin.ts:87 |
| `RequireSpec` | `export type RequireSpec = \| PluginCtorWithId \| { plugin: PluginCtorWithId; optional?: boolean; minVersion?: string };` | nomercy-player-core/src/types/plugin.ts:59 |
| `AudioTrackState` | `export enum AudioTrackState { DEFAULT = 'default', MANUAL = 'manual', }` | nomercy-player-core/src/types/state.ts:85 |
| `BufferState` | `export enum BufferState { IDLE = 'idle', LOADING = 'loading', SEEKING = 'seeking', STALLED = 'stalled', }` | nomercy-player-core/src/types/state.ts:31 |
| `CastState` | `export enum CastState { UNAVAILABLE = 'unavailable', AVAILABLE = 'available', CONNECTING = 'connecting', CONNECTED = 'connected', DISCONNECTED = 'disconnected', }` | nomercy-player-core/src/types/state.ts:151 |
| `NetworkState` | `export enum NetworkState { ONLINE = 'online', OFFLINE = 'offline', SLOW = 'slow', }` | nomercy-player-core/src/types/state.ts:47 |
| `PlayState` | `export enum PlayState { IDLE = 'idle', LOADING = 'loading', PLAYING = 'playing', PAUSED = 'paused', STOPPED = 'stopped', ERROR = 'error', }` | nomercy-player-core/src/types/state.ts:122 |
| `QualityState` | `export enum QualityState { AUTO = 'auto', MANUAL = 'manual', }` | nomercy-player-core/src/types/state.ts:73 |
| `RepeatState` | `export enum RepeatState { OFF = 'off', ALL = 'all', ONE = 'one', }` | nomercy-player-core/src/types/state.ts:101 |
| `SetupState` | `export enum SetupState { NOT_SETUP = 'not-setup', SETTING_UP = 'setup', READY = 'ready', DISPOSED = 'disposed', }` | nomercy-player-core/src/types/state.ts:14 |
| `ShuffleState` | `export enum ShuffleState { OFF = 'off', ON = 'on', }` | nomercy-player-core/src/types/state.ts:114 |
| `VisibilityState` | `export enum VisibilityState { VISIBLE = 'visible', HIDDEN = 'hidden', }` | nomercy-player-core/src/types/state.ts:61 |
| `VolumeState` | `export enum VolumeState { UNMUTED = 'unmuted', MUTED = 'muted', }` | nomercy-player-core/src/types/state.ts:140 |
| `AudioTrack` | `export interface AudioTrack {` | nomercy-player-core/src/types/tracks.ts:57 |
| `CanPlayResult` | `export interface CanPlayResult {` | nomercy-player-core/src/types/tracks.ts:14 |
| `CurrentAudioTrackSelection` | `export interface CurrentAudioTrackSelection {` | nomercy-player-core/src/types/tracks.ts:140 |
| `CurrentQualitySelection` | `export interface CurrentQualitySelection {` | nomercy-player-core/src/types/tracks.ts:152 |
| `CurrentSubtitleSelection` | `export interface CurrentSubtitleSelection {` | nomercy-player-core/src/types/tracks.ts:128 |
| `QualityLevel` | `export interface QualityLevel {` | nomercy-player-core/src/types/tracks.ts:28 |
| `SidecarSubtitleInput` | `export interface SidecarSubtitleInput {` | nomercy-player-core/src/types/tracks.ts:105 |
| `SubtitleStyle` | `export interface SubtitleStyle {` | nomercy-player-core/src/types/tracks.ts:164 |
| `SubtitleTrack` | `export interface SubtitleTrack {` | nomercy-player-core/src/types/tracks.ts:78 |
| `TranslationLoader` | `export type TranslationLoader = (lang: string) => Promise<Record<string, string> \| undefined>;` | nomercy-player-core/src/types/translations.ts:27 |
| `Translations` | `export type Translations = Record<string, Record<string, string>>;` | nomercy-player-core/src/types/translations.ts:13 |
| `IUrlResolver` | `export type { IUrlResolver, ResolvedUrl, UrlCategory, UrlResolverContext } from '../adapters/url-resolver/IUrlResolver';` | nomercy-player-core/src/types/url.ts:9 |
| `ResolvedUrl` | `export type { IUrlResolver, ResolvedUrl, UrlCategory, UrlResolverContext } from '../adapters/url-resolver/IUrlResolver';` | nomercy-player-core/src/types/url.ts:9 |
| `UrlCategory` | `export type { IUrlResolver, ResolvedUrl, UrlCategory, UrlResolverContext } from '../adapters/url-resolver/IUrlResolver';` | nomercy-player-core/src/types/url.ts:9 |
| `UrlResolverContext` | `export type { IUrlResolver, ResolvedUrl, UrlCategory, UrlResolverContext } from '../adapters/url-resolver/IUrlResolver';` | nomercy-player-core/src/types/url.ts:9 |
| `DEFAULT_RETRY_POLICY` | `export { DEFAULT_RETRY_POLICY } from '../adapters/retry-policy/default';` | nomercy-player-core/src/errors/index.ts:18 |
| `IRetryPolicy` | `export type { IRetryPolicy, RetryConfig } from '../adapters/retry-policy/IRetryPolicy';` | nomercy-player-core/src/errors/index.ts:19 |
| `RetryConfig` | `export type { IRetryPolicy, RetryConfig } from '../adapters/retry-policy/IRetryPolicy';` | nomercy-player-core/src/errors/index.ts:19 |
| `AuthError` | `export class AuthError extends NetworkError {` | nomercy-player-core/src/errors/auth.ts:17 |
| `CodeFields` | `export interface CodeFields {` | nomercy-player-core/src/errors/code.ts:36 |
| `ErrorScope` | `export type ErrorScope = \| { kind: 'core' } \| { kind: 'backend'; id: 'audio-element' \| 'webaudio' \| 'video' \| 'html5' \| 'mse' \| 'webcodecs' } \| { kind: 'stream'; id: 'native' \| 'hls' \| 'dash' } \| { kind: 'cue'; id: 'lrc' \| 'vtt' \| 'sprite-vtt' \| 'ttml' } \| { kind: 'network' } \| { kind: 'auth' } \| { kind: 'plugin'; id: string };` | nomercy-player-core/src/errors/code.ts:14 |
| `formatCode` | `export function formatCode(code: number): string {` | nomercy-player-core/src/errors/code.ts:71 |
| `makeCode` | `export function makeCode(fields: CodeFields): number {` | nomercy-player-core/src/errors/code.ts:44 |
| `parseCode` | `export function parseCode(code: number): CodeFields {` | nomercy-player-core/src/errors/code.ts:61 |
| `VENDOR` | `export const VENDOR = { KIT: 1, MUSIC: 2, VIDEO: 3, } as const;` | nomercy-player-core/src/errors/code.ts:76 |
| `DrmError` | `export class DrmError extends PlayerError {` | nomercy-player-core/src/errors/drm.ts:16 |
| `MediaFormatError` | `export class MediaFormatError extends PlayerError {` | nomercy-player-core/src/errors/media.ts:17 |
| `mediaFormatError` | `export function mediaFormatError( code: string, message: string, context?: Record<string, unknown>, ): MediaFormatError {` | nomercy-player-core/src/errors/media.ts:49 |
| `ResourceError` | `export class ResourceError extends PlayerError {` | nomercy-player-core/src/errors/media.ts:36 |
| `resourceError` | `export function resourceError( code: string, message: string, context?: Record<string, unknown>, ): ResourceError {` | nomercy-player-core/src/errors/media.ts:71 |
| `StreamError` | `export class StreamError extends PlayerError {` | nomercy-player-core/src/errors/media.ts:27 |
| `NetworkError` | `export class NetworkError extends PlayerError {` | nomercy-player-core/src/errors/network.ts:16 |
| `NotImplementedError` | `export class NotImplementedError extends PlayerError { constructor(message: string, feature?: string) {` | nomercy-player-core/src/errors/not-implemented.ts:24 |
| `PlayerError` | `export class PlayerError extends Error {` | nomercy-player-core/src/errors/player.ts:46 |
| `PlayerErrorEvent` | `export interface PlayerErrorEvent {` | nomercy-player-core/src/errors/player.ts:91 |
| `PlayerErrorInit` | `export interface PlayerErrorInit {` | nomercy-player-core/src/errors/player.ts:12 |
| `makePlayerErrorEvent` | `export function makePlayerErrorEvent( error: PlayerError, severity: Severity, scope: ErrorScope, timestamp: number = Date.now(), ): PlayerErrorEvent {` | nomercy-player-core/src/errors/player.ts:115 |
| `StateError` | `export class StateError extends PlayerError {` | nomercy-player-core/src/errors/player.ts:79 |
| `stateError` | `export function stateError( code: string, message: string, context?: Record<string, unknown>, ): StateError {` | nomercy-player-core/src/errors/player.ts:147 |
| `PluginError` | `export class PluginError extends PlayerError {` | nomercy-player-core/src/errors/plugin.ts:19 |
| `pluginError` | `export function pluginError( code: string, message: string, opts?: { severity?: Severity; pluginId?: string; context?: Record<string, unknown>; }, ): PluginError {` | nomercy-player-core/src/errors/plugin.ts:34 |
| `BrowserPolicyError` | `export class BrowserPolicyError extends PlayerError {` | nomercy-player-core/src/errors/policy.ts:17 |
| `browserPolicyError` | `export function browserPolicyError( code: string, message: string, opts?: { suggestion?: string; context?: Record<string, unknown>; }, ): BrowserPolicyError {` | nomercy-player-core/src/errors/policy.ts:30 |
| `SEVERITY` | `export const SEVERITY = { FATAL: 'fatal', ERROR: 'error', WARNING: 'warning', INFO: 'info', } as const;` | nomercy-player-core/src/errors/severity.ts:14 |
| `Severity` | `export type Severity = typeof SEVERITY[keyof typeof SEVERITY];` | nomercy-player-core/src/errors/severity.ts:22 |
| `SEVERITY_LEVEL` | `export const SEVERITY_LEVEL: Record<Severity, 1 \| 2 \| 3 \| 4> = { [SEVERITY.INFO]: 1, [SEVERITY.WARNING]: 2, [SEVERITY.ERROR]: 3, [SEVERITY.FATAL]: 4, };` | nomercy-player-core/src/errors/severity.ts:25 |
| `'beforeSetup'` | `'beforeSetup': void;` | nomercy-player-core/src/types/events.ts:71 |
| `'setupStart'` | `'setupStart': { container: HTMLElement };` | nomercy-player-core/src/types/events.ts:72 |
| `'configResolved'` | `'configResolved': { config: BasePlayerConfig };` | nomercy-player-core/src/types/events.ts:73 |
| `'pluginsRegistering'` | `'pluginsRegistering': void;` | nomercy-player-core/src/types/events.ts:74 |
| `'pluginsRegistered'` | `'pluginsRegistered': void;` | nomercy-player-core/src/types/events.ts:75 |
| `'streamsReady'` | `'streamsReady': void;` | nomercy-player-core/src/types/events.ts:76 |
| `'authReady'` | `'authReady': void;` | nomercy-player-core/src/types/events.ts:77 |
| `'playlistResolving'` | `'playlistResolving': { url: string };` | nomercy-player-core/src/types/events.ts:78 |
| `'playlistReady'` | `'playlistReady': { length: number };` | nomercy-player-core/src/types/events.ts:79 |
| `'playlistError'` | `'playlistError': { url: string; error: Error; code: string };` | nomercy-player-core/src/types/events.ts:80 |
| `'mediaReady'` | `'mediaReady': void;` | nomercy-player-core/src/types/events.ts:81 |
| `'ready'` | `'ready': void;` | nomercy-player-core/src/types/events.ts:82 |
| `'setupStartError'` | `'setupStartError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:84 |
| `'configResolvedError'` | `'configResolvedError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:85 |
| `'pluginsRegisteringError'` | `'pluginsRegisteringError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:86 |
| `'pluginsRegisteredError'` | `'pluginsRegisteredError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:87 |
| `'streamsReadyError'` | `'streamsReadyError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:88 |
| `'authReadyError'` | `'authReadyError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:89 |
| `'playlistResolveError'` | `'playlistResolveError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:90 |
| `'mediaReadyError'` | `'mediaReadyError': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:91 |
| `'beforePlay'` | `'beforePlay': BeforeEvent<ActionOptions>;` | nomercy-player-core/src/types/events.ts:97 |
| `'firstFrame'` | `'firstFrame': void;` | nomercy-player-core/src/types/events.ts:98 |
| `'playing'` | `'playing': void;` | nomercy-player-core/src/types/events.ts:106 |
| `'playPrevented'` | `'playPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:107 |
| `'beforePause'` | `'beforePause': BeforeEvent<ActionOptions>;` | nomercy-player-core/src/types/events.ts:108 |
| `'pausePrevented'` | `'pausePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:109 |
| `'beforeStop'` | `'beforeStop': BeforeEvent<ActionOptions>;` | nomercy-player-core/src/types/events.ts:110 |
| `'stopPrevented'` | `'stopPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:111 |
| `'beforeNext'` | `'beforeNext': BeforeEvent<ActionOptions>;` | nomercy-player-core/src/types/events.ts:112 |
| `'nextPrevented'` | `'nextPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:113 |
| `'beforePrevious'` | `'beforePrevious': BeforeEvent<ActionOptions>;` | nomercy-player-core/src/types/events.ts:114 |
| `'previousPrevented'` | `'previousPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:115 |
| `'beforeSeek'` | `'beforeSeek': BeforeEvent<{ time: number; source?: ActionSource }>;` | nomercy-player-core/src/types/events.ts:116 |
| `'seekPrevented'` | `'seekPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:117 |
| `'beforeLoad'` | `'beforeLoad': BeforeEvent<{ item: I; source?: ActionSource }>;` | nomercy-player-core/src/types/events.ts:118 |
| `'loadPrevented'` | `'loadPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:119 |
| `'beforeMutation'` | `'beforeMutation': BeforeEvent<{ method: string; args: ReadonlyArray<unknown>; phase: PlayerPhase; dispatchStack: ReadonlyArray<string>; }>;` | nomercy-player-core/src/types/events.ts:130 |
| `'mutationPrevented'` | `'mutationPrevented': { method: string; reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:136 |
| `'phase'` | `'phase': { from: PlayerPhase; to: PlayerPhase };` | nomercy-player-core/src/types/events.ts:142 |
| `'play'` | `'play': ActionOptions;` | nomercy-player-core/src/types/events.ts:146 |
| `'pause'` | `'pause': ActionOptions;` | nomercy-player-core/src/types/events.ts:147 |
| `'stop'` | `'stop': ActionOptions;` | nomercy-player-core/src/types/events.ts:148 |
| `'next'` | `'next': ActionOptions;` | nomercy-player-core/src/types/events.ts:149 |
| `'previous'` | `'previous': ActionOptions;` | nomercy-player-core/src/types/events.ts:150 |
| `'ended'` | `'ended': void;` | nomercy-player-core/src/types/events.ts:151 |
| `'seek'` | `'seek': { time: number; source?: ActionSource };` | nomercy-player-core/src/types/events.ts:152 |
| `'seeked'` | `'seeked': { time: number };` | nomercy-player-core/src/types/events.ts:159 |
| `'progress'` | `'progress': { time: number; duration: number; percentage: number };` | nomercy-player-core/src/types/events.ts:166 |
| `'time'` | `'time': TimeState;` | nomercy-player-core/src/types/events.ts:174 |
| `'dispose'` | `'dispose': void;` | nomercy-player-core/src/types/events.ts:175 |
| `'beforeDispose'` | `'beforeDispose': BeforeEvent<void>;` | nomercy-player-core/src/types/events.ts:183 |
| `'disposePrevented'` | `'disposePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:184 |
| `'language'` | `'language': { lang: string };` | nomercy-player-core/src/types/events.ts:190 |
| `'beforeLanguage'` | `'beforeLanguage': BeforeEvent<{ lang: string }>;` | nomercy-player-core/src/types/events.ts:197 |
| `'languagePrevented'` | `'languagePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:198 |
| `'volume'` | `'volume': { level: number };` | nomercy-player-core/src/types/events.ts:202 |
| `'beforeVolume'` | `'beforeVolume': BeforeEvent<{ level: number }>;` | nomercy-player-core/src/types/events.ts:211 |
| `'volumePrevented'` | `'volumePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:212 |
| `'mute'` | `'mute': { muted: boolean };` | nomercy-player-core/src/types/events.ts:214 |
| `'beforeMute'` | `'beforeMute': BeforeEvent<{ muted: boolean }>;` | nomercy-player-core/src/types/events.ts:221 |
| `'mutePrevented'` | `'mutePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:222 |
| `'repeat'` | `'repeat': { state: RepeatState };` | nomercy-player-core/src/types/events.ts:224 |
| `'beforeRepeat'` | `'beforeRepeat': BeforeEvent<{ state: RepeatState }>;` | nomercy-player-core/src/types/events.ts:227 |
| `'repeatPrevented'` | `'repeatPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:228 |
| `'shuffle'` | `'shuffle': { state: ShuffleState };` | nomercy-player-core/src/types/events.ts:230 |
| `'beforeShuffle'` | `'beforeShuffle': BeforeEvent<{ state: ShuffleState }>;` | nomercy-player-core/src/types/events.ts:237 |
| `'shufflePrevented'` | `'shufflePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:238 |
| `'playbackRate'` | `'playbackRate': { rate: number };` | nomercy-player-core/src/types/events.ts:240 |
| `'beforePlaybackRate'` | `'beforePlaybackRate': BeforeEvent<{ rate: number }>;` | nomercy-player-core/src/types/events.ts:248 |
| `'playbackRatePrevented'` | `'playbackRatePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:249 |
| `'fatal'` | `'fatal': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:257 |
| `'error'` | `'error': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:258 |
| `'warning'` | `'warning': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:259 |
| `'info'` | `'info': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:260 |
| `'item'` | `'item': { item: I \| undefined; index: number };` | nomercy-player-core/src/types/events.ts:266 |
| `'queue'` | `'queue': I[];` | nomercy-player-core/src/types/events.ts:272 |
| `'queue:append'` | `'queue:append': { items: I[]; from: number };` | nomercy-player-core/src/types/events.ts:273 |
| `'queue:prepend'` | `'queue:prepend': { items: I[] };` | nomercy-player-core/src/types/events.ts:274 |
| `'queue:insert'` | `'queue:insert': { items: I[]; index: number };` | nomercy-player-core/src/types/events.ts:275 |
| `'queue:remove'` | `'queue:remove': { id: string \| number; index: number; item: I };` | nomercy-player-core/src/types/events.ts:276 |
| `'queue:move'` | `'queue:move': { from: number; to: number };` | nomercy-player-core/src/types/events.ts:277 |
| `'queue:clear'` | `'queue:clear': { previousLength: number };` | nomercy-player-core/src/types/events.ts:278 |
| `'queue:shuffle'` | `'queue:shuffle': void;` | nomercy-player-core/src/types/events.ts:279 |
| `'queue:sort'` | `'queue:sort': void;` | nomercy-player-core/src/types/events.ts:280 |
| `'queue:exhausted'` | `'queue:exhausted': void;` | nomercy-player-core/src/types/events.ts:288 |
| `'backlog'` | `'backlog': I[];` | nomercy-player-core/src/types/events.ts:295 |
| `'backlog:append'` | `'backlog:append': { items: I[] };` | nomercy-player-core/src/types/events.ts:296 |
| `'backlog:remove'` | `'backlog:remove': { id: string \| number; index: number; item: I };` | nomercy-player-core/src/types/events.ts:297 |
| `'backlog:clear'` | `'backlog:clear': { previousLength: number };` | nomercy-player-core/src/types/events.ts:298 |
| `'itemEndingSoon'` | `'itemEndingSoon': { remaining: number; item: I };` | nomercy-player-core/src/types/events.ts:312 |
| `'duration'` | `'duration': { duration: number };` | nomercy-player-core/src/types/events.ts:319 |
| `'backend:changed'` | `'backend:changed': { kind: string };` | nomercy-player-core/src/types/events.ts:323 |
| `'backend:loading'` | `'backend:loading': { url: string; kind: string };` | nomercy-player-core/src/types/events.ts:324 |
| `'backend:loaded'` | `'backend:loaded': { url: string; kind: string; duration: number };` | nomercy-player-core/src/types/events.ts:325 |
| `'backend:error'` | `'backend:error': { error: PlayerErrorEvent['error']; kind: string };` | nomercy-player-core/src/types/events.ts:326 |
| `'backend:stalled'` | `'backend:stalled': { time: number };` | nomercy-player-core/src/types/events.ts:327 |
| `'backend:ratechange'` | `'backend:ratechange': { rate: number };` | nomercy-player-core/src/types/events.ts:328 |
| `'backend:waiting'` | `'backend:waiting': void;` | nomercy-player-core/src/types/events.ts:329 |
| `'auth:refreshed'` | `'auth:refreshed': { tokenAcquiredAt: number };` | nomercy-player-core/src/types/events.ts:333 |
| `'auth:failed'` | `'auth:failed': { error: PlayerErrorEvent['error'] };` | nomercy-player-core/src/types/events.ts:334 |
| `'stream:manifest-loaded'` | `'stream:manifest-loaded': { url: string };` | nomercy-player-core/src/types/events.ts:340 |
| `'stream:level-switched'` | `'stream:level-switched': { level: number; label: string };` | nomercy-player-core/src/types/events.ts:341 |
| `'stream:fragment-loaded'` | `'stream:fragment-loaded': { url: string; durationMs: number };` | nomercy-player-core/src/types/events.ts:342 |
| `'stream:level-considered'` | `'stream:level-considered': { candidate: number; decided: number; reason: string };` | nomercy-player-core/src/types/events.ts:343 |
| `'stream:error'` | `'stream:error': { details: string; fatal: boolean };` | nomercy-player-core/src/types/events.ts:344 |
| `'stream:encrypted'` | `'stream:encrypted': { initData: ArrayBuffer; initDataType: string };` | nomercy-player-core/src/types/events.ts:345 |
| `'cue:enter'` | `'cue:enter': CueEventPayload;` | nomercy-player-core/src/types/events.ts:349 |
| `'cue:exit'` | `'cue:exit': CueEventPayload;` | nomercy-player-core/src/types/events.ts:350 |
| `'subtitleCue'` | `'subtitleCue': SubtitleCueChange;` | nomercy-player-core/src/types/events.ts:357 |
| `'subtitleStyle'` | `'subtitleStyle': SubtitleStyle;` | nomercy-player-core/src/types/events.ts:364 |
| `'subtitle'` | `'subtitle': { track: number \| null };` | nomercy-player-core/src/types/events.ts:365 |
| `'beforeSubtitle'` | `'beforeSubtitle': BeforeEvent<{ track: number \| null }>;` | nomercy-player-core/src/types/events.ts:372 |
| `'subtitlePrevented'` | `'subtitlePrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:373 |
| `'subtitles'` | `'subtitles': { tracks: ReadonlyArray<SubtitleTrack> };` | nomercy-player-core/src/types/events.ts:381 |
| `'audioTrack'` | `'audioTrack': { id: number \| null };` | nomercy-player-core/src/types/events.ts:387 |
| `'beforeAudioTrack'` | `'beforeAudioTrack': BeforeEvent<{ id: number }>;` | nomercy-player-core/src/types/events.ts:390 |
| `'audioTrackPrevented'` | `'audioTrackPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:391 |
| `'chapter'` | `'chapter': { index: number; title: string };` | nomercy-player-core/src/types/events.ts:399 |
| `'chapters'` | `'chapters': { chapters: ReadonlyArray<Chapter> };` | nomercy-player-core/src/types/events.ts:400 |
| `'castState'` | `'castState': { state: CastState };` | nomercy-player-core/src/types/events.ts:406 |
| `'beforeTransfer'` | `'beforeTransfer': BeforeEvent<{ target: CastTarget }>;` | nomercy-player-core/src/types/events.ts:416 |
| `'transferPrevented'` | `'transferPrevented': { reason: PreventedReason; cause?: unknown };` | nomercy-player-core/src/types/events.ts:417 |
| `'qualityState'` | `'qualityState': { state: 'auto' \| 'manual' };` | nomercy-player-core/src/types/events.ts:424 |
| `'audioTrackState'` | `'audioTrackState': { state: 'default' \| 'manual' };` | nomercy-player-core/src/types/events.ts:425 |
| `'level-switched'` | `'level-switched': { level: number };` | nomercy-player-core/src/types/events.ts:432 |
| `'plugin:installed'` | `'plugin:installed': { id: string; version: string };` | nomercy-player-core/src/types/events.ts:436 |
| `'plugin:enabled'` | `'plugin:enabled': { id: string };` | nomercy-player-core/src/types/events.ts:437 |
| `'plugin:disabled'` | `'plugin:disabled': { id: string; reason?: string };` | nomercy-player-core/src/types/events.ts:438 |
| `'plugin:opts:changed'` | `'plugin:opts:changed': { id: string; opts: unknown };` | nomercy-player-core/src/types/events.ts:439 |
| `'plugin:disposed'` | `'plugin:disposed': { id: string };` | nomercy-player-core/src/types/events.ts:440 |
| `'plugin:failed'` | `'plugin:failed': { id: string; error: PlayerErrorEvent['error'] };` | nomercy-player-core/src/types/events.ts:441 |
| `'plugin:error'` | `'plugin:error': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:442 |
| `'plugin:warning'` | `'plugin:warning': PlayerErrorEvent;` | nomercy-player-core/src/types/events.ts:443 |
| `'network:online'` | `'network:online': void;` | nomercy-player-core/src/types/events.ts:447 |
| `'network:offline'` | `'network:offline': void;` | nomercy-player-core/src/types/events.ts:448 |
| `'network:slow'` | `'network:slow': { rttMs: number \| undefined };` | nomercy-player-core/src/types/events.ts:456 |
| `'visibility:visible'` | `'visibility:visible': void;` | nomercy-player-core/src/types/events.ts:457 |
| `'visibility:hidden'` | `'visibility:hidden': void;` | nomercy-player-core/src/types/events.ts:458 |
| `'playback:metrics'` | `'playback:metrics': PlaybackMetrics;` | nomercy-player-core/src/types/events.ts:462 |
| `'fetch:start'` | `'fetch:start': { url: string; pluginId?: string };` | nomercy-player-core/src/types/events.ts:465 |
| `'fetch:retry'` | `'fetch:retry': { url: string; attempt: number; reason: 'unauthenticated' \| 'http-5xx' \| 'timeout' \| 'network'; delayMs: number; pluginId?: string };` | nomercy-player-core/src/types/events.ts:466 |
| `'fetch:complete'` | `'fetch:complete': { url: string; ok: boolean; status?: number; durationMs: number; pluginId?: string };` | nomercy-player-core/src/types/events.ts:467 |
| `'activity'` | `'activity': { active: boolean };` | nomercy-player-core/src/types/events.ts:478 |
| `'listeners-changed'` | `'listeners-changed': { name: string; count: number };` | nomercy-player-core/src/types/events.ts:484 |
| `'preloadStart'` | `'preloadStart': { item: I; assets: ReadonlyArray<{ url: string; category: string }> };` | nomercy-player-core/src/types/events.ts:490 |
| `'preloadProgress'` | `'preloadProgress': { item: I; loaded: number; total: number };` | nomercy-player-core/src/types/events.ts:493 |
| `'preloadComplete'` | `'preloadComplete': { item: I };` | nomercy-player-core/src/types/events.ts:496 |
| `'preloadError'` | `'preloadError': { item: I; error: unknown };` | nomercy-player-core/src/types/events.ts:499 |
| `'transitionStart'` | `'transitionStart': { outgoing: I; incoming: I };` | nomercy-player-core/src/types/events.ts:504 |
| `'transitionProgress'` | `'transitionProgress': { outgoing: I; incoming: I; fraction: number };` | nomercy-player-core/src/types/events.ts:510 |
| `'transitionComplete'` | `'transitionComplete': { from: I; to: I };` | nomercy-player-core/src/types/events.ts:513 |
| `'transitionCancelled'` | `'transitionCancelled': { reason: string };` | nomercy-player-core/src/types/events.ts:516 |
| `IPlayer.setup` | `setup(config: Record<string, unknown>): this;` | nomercy-player-core/src/types/player.ts:638 |
| `IPlayer.volume` | `volume(): number;` / `volume(level: number): Promise<void>;` | nomercy-player-core/src/types/player.ts:687 |
| `IPlayer.rewind` | `rewind(seconds?: number, opts?: ActionOptions): Promise<void>;` | nomercy-player-core/src/types/player.ts:670 |
| `IPlayer.forward` | `forward(seconds?: number, opts?: ActionOptions): Promise<void>;` | nomercy-player-core/src/types/player.ts:673 |
| `IPlayer.announce` | `announce(text: string, level?: AriaLiveLevel): void;` | nomercy-player-core/src/types/player.ts:938 |
| `IPlayer.resolveUrl` | `resolveUrl(url: string, category?: UrlCategory): Promise<ResolvedUrl>;` | nomercy-player-core/src/types/player.ts:365 |
| `IPlayer.addPlugin` | `addPlugin<P extends Plugin<any, any, any>>(PluginClass: PluginCtorWithId & (new () => P), opts?: P['opts']): this;` | nomercy-player-core/src/types/player.ts:894 |
| `PlayerError.isHttp` | `isHttp(century: 1 \| 2 \| 3 \| 4 \| 5): boolean {` | nomercy-player-core/src/errors/player.ts:68 |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `BaseEventMap` generic `I` | `= BasePlaylistItem` | consumers of `BaseEventMap` without a type argument | nomercy-player-core/src/types/events.ts:64 |
| `IPlayer` generic `E` | `= BaseEventMap` | consumers of `IPlayer` without a type argument | nomercy-player-core/src/types/player.ts:261 |
| `WithCurrentItem` generic `T` | `= BasePlaylistItem` | plugins constraining `WithCurrentItem` | nomercy-player-core/src/types/player.ts:92 |
| `ACTION_SOURCE.USER` | `'user'` | `ActionSource` union | nomercy-player-core/src/types/player.ts:106 |
| `ACTION_SOURCE.REMOTE` | `'remote'` | `ActionSource` union | nomercy-player-core/src/types/player.ts:107 |
| `ACTION_SOURCE.PLUGIN` | `'plugin'` | `ActionSource` union | nomercy-player-core/src/types/player.ts:108 |
| `PlayerError.severity` | `init.severity ?? 'error'` | `PlayerError` constructor | nomercy-player-core/src/errors/player.ts:60 |
| `PlayerError.message` | `init.message ?? init.code` | `super(...)` | nomercy-player-core/src/errors/player.ts:57 |
| `makePlayerErrorEvent.timestamp` | `= Date.now()` | `PlayerErrorEvent.timestamp` | nomercy-player-core/src/errors/player.ts:119 |
| `pluginError` severity | `opts?.severity ?? 'error'` | `PluginError` constructor | nomercy-player-core/src/errors/plugin.ts:45 |
| `pluginError` scope | `opts?.pluginId ? { kind: 'plugin', id: opts.pluginId } : { kind: 'core' }` | `PluginError` constructor | nomercy-player-core/src/errors/plugin.ts:47 |
| `mediaFormatError` / `resourceError` / `stateError` / `browserPolicyError` severity | `'error'` | respective constructors | nomercy-player-core/src/errors/media.ts:56, nomercy-player-core/src/errors/media.ts:78, nomercy-player-core/src/errors/player.ts:154, nomercy-player-core/src/errors/policy.ts:40 |
| `NotImplementedError` code | `feature ? \`core:not-implemented/${feature}\` : 'core:not-implemented'` | `super({ code, ... })` | nomercy-player-core/src/errors/not-implemented.ts:28 |
| `VENDOR.KIT` | `1` | numeric code builders | nomercy-player-core/src/errors/code.ts:77 |
| `VENDOR.MUSIC` | `2` | numeric code builders | nomercy-player-core/src/errors/code.ts:78 |
| `VENDOR.VIDEO` | `3` | numeric code builders | nomercy-player-core/src/errors/code.ts:79 |
| `SEVERITY.FATAL` | `'fatal'` | `Severity` union and `SEVERITY_LEVEL` | nomercy-player-core/src/errors/severity.ts:15 |
| `SEVERITY_LEVEL[INFO]` | `1` | `makeCode` severity digit | nomercy-player-core/src/errors/severity.ts:26 |
| `SEVERITY_LEVEL[WARNING]` | `2` | `makeCode` severity digit | nomercy-player-core/src/errors/severity.ts:27 |
| `SEVERITY_LEVEL[ERROR]` | `3` | `makeCode` severity digit | nomercy-player-core/src/errors/severity.ts:28 |
| `SEVERITY_LEVEL[FATAL]` | `4` | `makeCode` severity digit | nomercy-player-core/src/errors/severity.ts:29 |
| `AuthConfig.retryAfterRefresh` | `?? 1` | `prepareAttempt` `maxRefreshes` | nomercy-player-core/src/types/config.ts:93 (field); read at nomercy-player-core/src/core/auth-fetch/prepare.ts:160 |
| `BasePlayerConfig.defaultVolume` | no `=` on the type; runtime seed `_internalVolume = 100` | `initPlayerCoreState`; `lifecycle` overwrites only when `typeof options.defaultVolume === 'number'` | nomercy-player-core/src/types/config.ts:194; read at nomercy-player-core/src/core/state.ts:455 and nomercy-player-core/src/core/mixins/lifecycle.ts:382 |
| `BasePlayerConfig.metricsIntervalMs` | `?? 10_000` | `_wireMetrics` interval | nomercy-player-core/src/types/config.ts:288; read at nomercy-player-core/src/core/mixins/lifecycle.ts:690 |
| `BasePlayerConfig.progressIntervalMs` | `?? 5_000` | progress throttle | nomercy-player-core/src/types/config.ts:296; read at nomercy-player-core/src/core/mixins/lifecycle.ts:758 |
| `BasePlayerConfig.pauseWhenHidden` | unset is falsy | `_wireVisibility`; skipped unless truthy | nomercy-player-core/src/types/config.ts:299; read at nomercy-player-core/src/core/mixins/lifecycle.ts:495 |
| `BasePlayerConfig.inactivityMs` | `?? DEFAULT_INACTIVITY_MS` where `DEFAULT_INACTIVITY_MS = 4000` | `_inactivityMs` | nomercy-player-core/src/types/config.ts:319; read at nomercy-player-core/src/core/mixins/activity.ts:40 |
| `BasePlayerConfig.onOffline` | `?? 'continue-buffered'` | network policy wire | nomercy-player-core/src/types/config.ts:322; read at nomercy-player-core/src/core/mixins/lifecycle.ts:521 |
| `BasePlayerConfig.pluginInitTimeoutMs` | `?? 30_000` | setup plugin drain and post-setup `addPlugin` | nomercy-player-core/src/types/config.ts:349; read at nomercy-player-core/src/core/mixins/lifecycle.ts:909 and nomercy-player-core/src/core/mixins/plugin-registration.ts:609 |
| `BasePlayerConfig.beforeEventTimeoutMs` | `?? 10_000` | plugin `dispatchBefore` | nomercy-player-core/src/types/config.ts:356; read at nomercy-player-core/src/core/plugin/base.ts:558 |
| `BasePlayerConfig.itemEndingSoonThreshold` | `?? 10` | `time` mixin latch | nomercy-player-core/src/types/config.ts:403; read at nomercy-player-core/src/core/mixins/time.ts:249 |
| `BasePlayerConfig.preloadLeadSeconds` | `?? 10` | preload orchestration | nomercy-player-core/src/types/config.ts:410; read at nomercy-player-core/src/core/mixins/lifecycle.ts:806 |
| `BasePlayerConfig.crossfadeLeadSeconds` | `?? 3` | transition window | nomercy-player-core/src/types/config.ts:417; read at nomercy-player-core/src/core/mixins/lifecycle.ts:1092 |
| `BasePlayerConfig.crossfadeTailSeconds` | `?? 3` | transition window | nomercy-player-core/src/types/config.ts:424; read at nomercy-player-core/src/core/mixins/lifecycle.ts:1093 |
| `BasePlayerConfig.crossfadeEnabled` | `?? false` | preload/transition orchestration | nomercy-player-core/src/types/config.ts:434; read at nomercy-player-core/src/core/mixins/lifecycle.ts:842 |
| `BasePlayerConfig.language` | `options.language ?? navigator.language ?? 'en'` | setup pipeline | nomercy-player-core/src/types/config.ts:211; read at nomercy-player-core/src/core/mixins/lifecycle.ts:932 |
| `BasePlayerConfig.clockSource` | `Date.now()` when unset | `player.now()` | nomercy-player-core/src/types/config.ts:336; read at nomercy-player-core/src/core/mixins/metrics.ts:53 |
| `BasePlayerConfig.hdrOnSdr` | no read in this package; video uses `?? 'play'` | `NMVideoPlayer` backend bridge | nomercy-player-core/src/types/config.ts:205; read at nomercy-video-player/src/index.ts:666 |
| `BasePlayerConfig.controls` | no read in this package; libraries set `mediaElement().controls = true` when truthy | music/video `index.ts` | nomercy-player-core/src/types/config.ts:309; read at nomercy-music-player/src/index.ts:518 and nomercy-video-player/src/index.ts:683 |
| `CastConfig.autoLoad` | unset is falsy | `transferTo('cast')` throws unless SDK already present | nomercy-player-core/src/types/config.ts:140; read at nomercy-player-core/src/core/mixins/cast.ts:266 |
| `CastConfig.scriptUrl` | `?? DEFAULT_CAST_SCRIPT` = `'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1'` | `_ensureCastLoaded` | nomercy-player-core/src/types/config.ts:164; read at nomercy-player-core/src/core/mixins/cast.ts:51,104 |
| `CastConfig.loadTimeoutMs` | `?? DEFAULT_LOAD_TIMEOUT_MS` = `10_000` | `_ensureCastLoaded` timer | nomercy-player-core/src/types/config.ts:171; read at nomercy-player-core/src/core/mixins/cast.ts:52,105 |
| `CastConfig.autoJoinPolicy` | `?? 'origin-scoped'` | `_initCastContext` | nomercy-player-core/src/types/config.ts:155; read at nomercy-player-core/src/core/mixins/cast.ts:185 |
| `CastConfig.resumeSavedSession` | `?? true` | `_initCastContext` `setOptions` | nomercy-player-core/src/types/config.ts:158; read at nomercy-player-core/src/core/mixins/cast.ts:193 |
| `CastConfig.receiverApplicationId` | `?? defaultAppId` (`chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID ?? 'CC1AD845'`) | `_initCastContext` | nomercy-player-core/src/types/config.ts:147; read at nomercy-player-core/src/core/mixins/cast.ts:188 |
| `LoadOptions.slot` | JSDoc `'current'`; no `=` on the type | load pipeline | nomercy-player-core/src/types/player.ts:148 |
| `rewind` / `forward` seconds | `seconds = 5` | `transport` mixin | nomercy-player-core/src/types/player.ts:669; read at nomercy-player-core/src/core/mixins/transport.ts:335,347 |
| `volumeUp` / `volumeDown` step | `step = 5` | `volume` mixin | nomercy-player-core/src/types/player.ts:698; read at nomercy-player-core/src/core/mixins/volume.ts:172,180 |
| `announce` level | `'polite'` unless `'assertive'` | `metrics` mixin | nomercy-player-core/src/types/player.ts:938; read at nomercy-player-core/src/core/mixins/metrics.ts:65 |
| `resolveUrl` category | `?? 'media'` | `auth` mixin | nomercy-player-core/src/types/player.ts:365; read at nomercy-player-core/src/core/mixins/auth.ts:117 |
| `SubtitleCue.size` | `typeof payload.size === 'number' ? payload.size : 100` | cue normaliser | nomercy-player-core/src/types/cues.ts:30; read at nomercy-player-core/src/core/mixins/media-tracks.ts:231 |
| `SubtitleStyle.fontSize` | `100` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:166; read at nomercy-player-core/src/core/mixins/media-tracks.ts:237 |
| `SubtitleStyle.fontFamily` | `'ReithSans, sans-serif'` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:168; read at nomercy-player-core/src/core/mixins/media-tracks.ts:238 |
| `SubtitleStyle.textColor` | `'white'` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:170; read at nomercy-player-core/src/core/mixins/media-tracks.ts:239 |
| `SubtitleStyle.textOpacity` | `100` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:172; read at nomercy-player-core/src/core/mixins/media-tracks.ts:240 |
| `SubtitleStyle.backgroundColor` | `'black'` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:174; read at nomercy-player-core/src/core/mixins/media-tracks.ts:241 |
| `SubtitleStyle.backgroundOpacity` | `0` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:176; read at nomercy-player-core/src/core/mixins/media-tracks.ts:242 |
| `SubtitleStyle.edgeStyle` | `'textShadow'` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:178; read at nomercy-player-core/src/core/mixins/media-tracks.ts:243 |
| `SubtitleStyle.areaColor` | `'black'` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:180; read at nomercy-player-core/src/core/mixins/media-tracks.ts:244 |
| `SubtitleStyle.windowOpacity` | `0` | `DEFAULT_SUBTITLE_STYLE` | nomercy-player-core/src/types/tracks.ts:182; read at nomercy-player-core/src/core/mixins/media-tracks.ts:245 |
| `SidecarSubtitleInput.default` | no `=` on the type; JSDoc `Default false` | `addSubtitleTrack` | nomercy-player-core/src/types/tracks.ts:119 |
| `DeviceCapabilities.hdrDisplay` | JSDoc `Defaults to false`; no literal on the type | `player.device()` snapshot | nomercy-player-core/src/types/device.ts:45 |

JSDoc-only numbers on type fields (`retryAfterRefresh` "Default 1", `defaultVolume` "Default 100", intervals, Cast timeouts) were checked against the read sites above. No eslint jsdoc plugin; comments are unchecked.

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| `Every before* event is cancellable (preventDefault())` | `'beforeSetup': void` is not a `BeforeEvent`. Setup calls `this.emit('beforeSetup')`, not `_dispatchBefore`. | nomercy-player-core/src/types/events.ts:56,71; emit at nomercy-player-core/src/core/mixins/lifecycle.ts:139 |
| Phase diagram box `setting-up` | The union member is `'setup'`. | nomercy-player-core/src/types/player.ts:170,203 |
| `phase()` lists `idle / setup / ready / playing / paused / stopped / ended / disposed` | `PlayerPhase` also has `'loading'`, `'starting'`, `'buffering'`, `'seeking'`, `'disposing'`. | nomercy-player-core/src/types/player.ts:391,201 |
| `item(target)` `Emits the current event when the cursor moves` | No `emit('current')` in this package. Cursor moves emit `'item'`. | nomercy-player-core/src/types/player.ts:100; emit at nomercy-player-core/src/core/mixins/queue.ts:107 |
| `seekToIndex` `Fires beforeMutation / current` | Public event is `'item'`, not `'current'`. | nomercy-player-core/src/types/player.ts:781 |
| `Every transport / queue mutation accepts a source (default 'user')` | `ActionOptions.source` says `Passed through untouched, with no default applied.` Transport passes `opts.source` through. | nomercy-player-core/src/types/player.ts:113,125; nomercy-player-core/src/core/mixins/transport.ts:44 |
| `Invoked on setLanguage(lang)` | Public method is `language(lang: string): Promise<void>`. There is no `setLanguage` on `IPlayer`. | nomercy-player-core/src/types/config.ts:217; nomercy-player-core/src/types/translations.ts:17; nomercy-player-core/src/types/player.ts:447 |
| `Pass a class ... to player.use()` | `IPlayer` exposes `addPlugin`, not `use`. | nomercy-player-core/src/types/plugin.ts:14; nomercy-player-core/src/types/player.ts:894 |
| `joinTime`: `ms from page load to the first play() call` | Metrics table says `firstFrame event`. Runtime: `Date.now() - self._metricsStartedAt` on `firstFrame`, and `_metricsStartedAt` is set in `_wireMetrics` during setup. | nomercy-player-core/src/types/metrics.ts:25,62; nomercy-player-core/src/core/mixins/lifecycle.ts:642,655 |
| `SubtitleTrack.id`: `Pass to subtitle(id)` | `subtitle(idx)` takes a list index (`number \| null`), not the string `id`. `IPlayer` does not declare `subtitle` at all. | nomercy-player-core/src/types/tracks.ts:79; nomercy-player-core/src/core/mixins/media-tracks.ts:608 |
| `mutationGuards` always-on list includes `setCurrent`, `setSubtitle` | Public player methods are `item()` / `subtitle()`. `setCurrent` is `MediaList`. | nomercy-player-core/src/types/config.ts:368 |
| `PluginAdvisory.method` example `'setCurrent'` | Same: player-facing mutation is `item()`, not `setCurrent`. | nomercy-player-core/src/types/plugin.ts:105 |
| Music default `crossfadeEnabled: true` | Core read site is `self.options.crossfadeEnabled ?? false`. Music factory later writes `crossfadeEnabled: true` in its own package. | nomercy-player-core/src/types/config.ts:430; nomercy-player-core/src/core/mixins/lifecycle.ts:842 |
| Stream events are `Re-exposed from the active IStreamSource` | No `emit('stream:...')` in nomercy-player-core/src. HLS emits unprefixed `manifest-loaded` / `level-switched` on the stream source. Payloads also disagree (`stream:encrypted` claims `initData`/`initDataType`; `IStreamSource` uses `keyUri`/`keyFormat`). | nomercy-player-core/src/types/events.ts:337 |
| `playing` is emitted by per-library backend wiring, not by the player-core transport mixin | Matches: music/video `index.ts` emit `'playing'`. Core production code does not. The source comment uses the old nickname for that transport. | nomercy-player-core/src/types/events.ts:103 |
| `PlayerErrorEvent` shape includes `markHandled` / `preventDefault` | `Plugin.surfaceError` emits a plain `{ error, severity, scope, timestamp }` object, not `makePlayerErrorEvent(...)`. | nomercy-player-core/src/errors/player.ts:91; emit at nomercy-player-core/src/core/plugin/base.ts:605 |
| Config `storage` / `websocketFactory` `not read by any player mixin` | `storage`: no mixin read found. `websocketFactory` is read by `Plugin.websocket()` (`config.websocketFactory ?? nativeWebSocketAdapter`), which matches the rest of that comment. | nomercy-player-core/src/types/config.ts:233,247; nomercy-player-core/src/core/plugin/base.ts:774 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `'beforeSetup'` is `void` and `emit`'d | Named like the cancellable `before*` family, but cannot `preventDefault` or `delay`. | nomercy-player-core/src/types/events.ts:71 |
| `stream:manifest-loaded`, `stream:level-switched`, `stream:fragment-loaded`, `stream:level-considered`, `stream:encrypted` | Declared on `BaseEventMap`. Searched nomercy-player-core/src for `emit('stream:...')`: no production emit. Stream adapters emit unprefixed names on the source, not the player. Video later emits `stream:error` (and `stream:recovering`, which is not on this map). | nomercy-player-core/src/types/events.ts:340 |
| `'firstFrame'`, `'ended'`, `'time'`, `'duration'`, `'backend:changed'`, `'backend:loading'`, `'backend:error'`, `'backend:stalled'`, `'backend:waiting'` | Declared here. No `emit('thatName')` in nomercy-player-core production src (tests and `self.on('firstFrame'/'time'/'backend:waiting'/'backend:loaded')` only). Music/video libraries emit several of these. Core metrics still subscribe as if they will arrive. | nomercy-player-core/src/types/events.ts:98,151,174,319,323 |
| `'level-switched'` on the player map | Core HLS adapter `emit('level-switched')` is on the stream source. Player-level emit is in nomercy-video-player, not this package. Duplicate of `stream:level-switched` which is never emitted. | nomercy-player-core/src/types/events.ts:432 |
| `'playlistError'` vs `'playlistResolveError'` | Two playlist-failure events. Lifecycle emits `{ url, error, code }`. Loading emits `PlayerErrorEvent` as `'playlistResolveError'` plus `'error'`. | nomercy-player-core/src/types/events.ts:80,90 |
| `'fetch:start'` / `'fetch:retry'` / `'fetch:complete'` | Not `emit('fetch:start')` at call sites. `prepareAttempt` maps suffix `'start'` to name `` `fetch:${suffix}` `` (or `plugin:<id>:fetch:*`) then `rawEmit`. Default plugin scope therefore does not fire the names on this map. | nomercy-player-core/src/types/events.ts:465; nomercy-player-core/src/core/auth-fetch/prepare.ts:107 |
| `'plugin:error'` | Not a literal `emit('plugin:error')`. `surfaceError` does `emit(\`plugin:${error.severity}\`)` only for `'warning'` and `'error'`. Fatal goes to `'fatal'` only. Payload is not a full `PlayerErrorEvent`. | nomercy-player-core/src/types/events.ts:442; nomercy-player-core/src/core/plugin/base.ts:616 |
| `'cue:enter'` / `'cue:exit'` | Tracker internally `emit('enter'/'exit')` then, if `playerRef` is set, `playerRef.emit('cue:enter'/'cue:exit', ...)`. Subscribe on the player, not the tracker event names. | nomercy-player-core/src/types/events.ts:349; nomercy-player-core/src/core/cues/tracker.ts:216 |
| Setup stages via `emit(stage)` | `'setupStart'` and friends are not written as `emit('setupStart')`. `_runStage` does `self.emit(stage, successPayload)`. Same helper emits `'setupStartError'` etc. plus `'error'` or `'fatal'`. | nomercy-player-core/src/types/events.ts:72; nomercy-player-core/src/core/mixins/lifecycle.ts:1184 |
| `IPlayer` has no `subtitle` / `subtitles` / `subtitleStyle` / `addSubtitleTrack` | Events and `SubtitleTrack` assume those methods. They live on the media-tracks mixin, not this interface. | nomercy-player-core/src/types/player.ts:261 |
| `IPlayer.setup(config: Record<string, unknown>)` | Config type is `BasePlayerConfig`, but the typed player accepts `Record<string, unknown>`. | nomercy-player-core/src/types/player.ts:638 |
| `ACTION_SOURCE` is exported from `types/player.ts` and omitted from `types/index.ts` and `src/index.ts` | Root package exports `ActionSource` the type, not the const. | nomercy-player-core/src/types/player.ts:105; nomercy-player-core/src/types/index.ts:27 |
| `PlayerError.name` typed `string`; `DrmError.name` is the literal `'DrmError'` | `AuthError` and `NetworkError` also use `readonly name: string = 'AuthError'`. Discriminating on `error.name` does not narrow those three. | nomercy-player-core/src/errors/player.ts:47; nomercy-player-core/src/errors/auth.ts:18; nomercy-player-core/src/errors/drm.ts:17 |
| `'beforeAudioTrack'` data is `{ id: number }` | `'audioTrack'` allows `id: number \| null`. Subtitle's before-hook allows `null` to disable; audio's does not. | nomercy-player-core/src/types/events.ts:387,390 |
| `audioTrack()` getter vs event | Getter returns `CurrentAudioTrackSelection \| null`. Event payload is `{ id: number \| null }` where `id` is the list index, not `AudioTrack.id` (a string). | nomercy-player-core/src/types/player.ts:513; nomercy-player-core/src/types/tracks.ts:59; nomercy-player-core/src/types/events.ts:387 |
| `IPlayer.queue()` is `ReadonlyArray<BasePlaylistItem>` | Event map is generic in `I`. Queue accessors on `IPlayer` are not. | nomercy-player-core/src/types/player.ts:752 |
| `SetupState.SETTING_UP = 'setup'` equals `PlayerPhase` `'setup'` | Same string, different enums/unions. `setupState()` is coarser than `phase()`. | nomercy-player-core/src/types/state.ts:18; nomercy-player-core/src/types/player.ts:203 |
| `makeCode` does not range-check `severity` | Comment says severity is `1=info ... 4=fatal`. `CodeFields.severity` is typed `1 \| 2 \| 3 \| 4` but the function only throws on vendor/category/event ranges. | nomercy-player-core/src/errors/code.ts:51 |
| Numeric codes are optional | Barrel comment: string codes always work; `makeCode` ids are supplementary. | nomercy-player-core/src/errors/index.ts:13 |
| `DrmConfig` is in this package and not on `BasePlayerConfig` | Comment says configure DRM through a video plugin. Easy to look for `setup({ drm })` and find nothing. | nomercy-player-core/src/types/config.ts:100 |
| `volume()` returns `0` when muted | Stored level is kept in `_internalVolume`; the getter lies about the stored value while muted. | nomercy-player-core/src/types/player.ts:686; nomercy-player-core/src/core/mixins/volume.ts:88 |

Checked every file in both directories for unused events (emit search across nomercy-player-core/src), JSDoc vs read sites, and barrel omissions. `types/log.ts` and `types/url.ts` are re-export-only; no extra traps in those two beyond the re-export itself.
