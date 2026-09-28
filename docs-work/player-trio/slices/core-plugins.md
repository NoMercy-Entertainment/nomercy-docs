# Slice: core-plugins
Files given: 14
Files opened: 14

## Files opened
- nomercy-player-core/src/plugins/audio-graph/index.ts
- nomercy-player-core/src/plugins/canvas/index.ts
- nomercy-player-core/src/plugins/cast-sender/index.ts
- nomercy-player-core/src/plugins/embed/index.ts
- nomercy-player-core/src/plugins/equalizer/index.ts
- nomercy-player-core/src/plugins/equalizer/presets.ts
- nomercy-player-core/src/plugins/key-handler/index.ts
- nomercy-player-core/src/plugins/media-session/index.ts
- nomercy-player-core/src/plugins/message/index.ts
- nomercy-player-core/src/plugins/mixer/index.ts
- nomercy-player-core/src/plugins/spectrum/index.ts
- nomercy-player-core/src/plugins/tab-leader/index.ts
- nomercy-player-core/src/plugins/visualization/index.ts
- nomercy-player-core/src/plugins/volume-memory/index.ts

`src/index.ts` re-exports: `audioGraphPlugin`, `AudioGraphPlugin`, `AudioGraphEvents`, `AudioGraphOptions`, `canvasPlugin`, `CanvasPlugin`, `CanvasEvents`, `CanvasOptions`, `CanvasRenderFn`, `castSenderPlugin`, `CastSenderPlugin`, `CastMediaInfo`, `CastMediaMetadata`, `CastSenderEvents`, `CastSenderOptions`, `ChromeCastMediaCtors`, `embedPlugin`, `EmbedPlugin`, `EmbedCommand`, `EmbedEventMessage`, `EmbedOptions`, `equalizerPlugin`, `EqualizerPlugin`, `EqBand`, `EqPreset`, `EqualizerEvents`, `EqualizerOptions`, `mixerPlugin`, `MixerPlugin`, `MixerEvents`, `MixerOptions`, `spectrumPlugin`, `SpectrumPlugin`, `SpectrumOptions`, `VisualizationPlugin`, `VisualizationFrame`, `VisualizationOptions`, `volumeMemoryPlugin`, `VolumeMemoryPlugin`, `VolumeMemoryOptions`.

Not re-exported: `KeyHandlerPlugin`, `keyHandlerPlugin`, `KeyHandlerOptions`, `KeyBindings`, `MediaSessionPlugin`, `mediaSessionPlugin`, `MediaSessionOptions`, `MediaSessionMetadata`, `MessagePlugin`, `messagePlugin`, `MessageOptions`, `MessageInput`, `TabLeaderPlugin`, `tabLeaderPlugin`, `TabLeaderOptions`, `TabLeaderEvents`, `SpectrumEvents`, `VisualizationEvents`, `WaveformVisualization`, `waveformVisualization`, `EmbedSerializedError`, `EmbedForwardedEvent`, `EqBandFrequency`, `EqSliderValues`, `SliderRange`, `DEFAULT_BANDS`, `DEFAULT_SLIDER_VALUES`, `BUILTIN_PRESETS`.

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `AudioGraphPlugin` | `export class AudioGraphPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, AudioGraphOptions, AudioGraphEvents>` | nomercy-player-core/src/plugins/audio-graph/index.ts:104 |
| `audioGraphPlugin` | `export const audioGraphPlugin = AudioGraphPlugin;` | nomercy-player-core/src/plugins/audio-graph/index.ts:629 |
| `AudioGraphOptions` | `export interface AudioGraphOptions` | nomercy-player-core/src/plugins/audio-graph/index.ts:15 |
| `AudioGraphEvents` | `'context:ready': { sampleRate: number };` `'context:closed': void;` `'chain:rebuilt': void;` `'unsupported': { reason: string };` | nomercy-player-core/src/plugins/audio-graph/index.ts:38-47 |
| `CanvasPlugin` | `export class CanvasPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, CanvasOptions, CanvasEvents>` | nomercy-player-core/src/plugins/canvas/index.ts:133 |
| `canvasPlugin` | `export const canvasPlugin = CanvasPlugin;` | nomercy-player-core/src/plugins/canvas/index.ts:482 |
| `CanvasOptions` | `export interface CanvasOptions` | nomercy-player-core/src/plugins/canvas/index.ts:14 |
| `CanvasEvents` | `mounted: { width: number; height: number };` `resized: { width: number; height: number };` `frame: { deltaMs: number; time: number };` | nomercy-player-core/src/plugins/canvas/index.ts:76-90 |
| `CastSenderPlugin` | `export class CastSenderPlugin<TPlayer extends IPlayer<BaseEventMap> = IPlayer, TItem extends BasePlaylistItem = BasePlaylistItem> extends Plugin<TPlayer, CastSenderOptions, CastSenderEvents>` | nomercy-player-core/src/plugins/cast-sender/index.ts:176 |
| `castSenderPlugin` | `export const castSenderPlugin = CastSenderPlugin;` | nomercy-player-core/src/plugins/cast-sender/index.ts:654 |
| `CastSenderOptions` | `export interface CastSenderOptions` | nomercy-player-core/src/plugins/cast-sender/index.ts:51 |
| `CastSenderEvents` | `'cast:connected': { deviceName: string };` `'cast:disconnected': void;` `'cast:error': { error: Error };` `'cast:remote-state': { time: number; state: 'playing' \| 'paused' \| 'buffering' };` `'cast:media-changed': { contentId: string };` `'unsupported': { reason: string };` | nomercy-player-core/src/plugins/cast-sender/index.ts:75-82 |
| `EmbedPlugin` | `export class EmbedPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, EmbedOptions>` | nomercy-player-core/src/plugins/embed/index.ts:139 |
| `embedPlugin` | `export const embedPlugin = EmbedPlugin;` | nomercy-player-core/src/plugins/embed/index.ts:419 |
| `EmbedOptions` | `export interface EmbedOptions` | nomercy-player-core/src/plugins/embed/index.ts:68 |
| `EmbedPlugin` events | none; no plugin event map; host traffic is `postMessage` `nm:event` / `nm:command` | nomercy-player-core/src/plugins/embed/index.ts:139 |
| `EqualizerPlugin` | `export class EqualizerPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, EqualizerOptions, EqualizerEvents>` | nomercy-player-core/src/plugins/equalizer/index.ts:156 |
| `equalizerPlugin` | `export const equalizerPlugin = EqualizerPlugin;` | nomercy-player-core/src/plugins/equalizer/index.ts:719 |
| `EqualizerOptions` | `export interface EqualizerOptions` | nomercy-player-core/src/plugins/equalizer/index.ts:39 |
| `EqualizerEvents` | `'ready': void;` `'band:changed': { band: EqBand };` `'preset:changed': { name: string \| undefined };` `'change': { bands: EqBand[]; selectedPreset: string \| undefined };` `'saved': void;` | nomercy-player-core/src/plugins/equalizer/index.ts:90-101 |
| `KeyHandlerPlugin` | `export class KeyHandlerPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, KeyHandlerOptions<P>>` | nomercy-player-core/src/plugins/key-handler/index.ts:114 |
| `keyHandlerPlugin` | `export const keyHandlerPlugin = KeyHandlerPlugin;` | nomercy-player-core/src/plugins/key-handler/index.ts:436 |
| `KeyHandlerOptions` | `export interface KeyHandlerOptions<P>` | nomercy-player-core/src/plugins/key-handler/index.ts:23 |
| `KeyHandlerPlugin` events | none; no plugin event map | nomercy-player-core/src/plugins/key-handler/index.ts:114 |
| `MediaSessionPlugin` | `export class MediaSessionPlugin<I extends BasePlaylistItem = BasePlaylistItem, P extends IPlayer<BaseEventMap> & WithCurrentItem<I> = IPlayer<BaseEventMap> & WithCurrentItem<I>> extends Plugin<P, MediaSessionOptions>` | nomercy-player-core/src/plugins/media-session/index.ts:110 |
| `mediaSessionPlugin` | `export const mediaSessionPlugin = MediaSessionPlugin;` | nomercy-player-core/src/plugins/media-session/index.ts:472 |
| `MediaSessionOptions` | `export interface MediaSessionOptions {}` | nomercy-player-core/src/plugins/media-session/index.ts:40 |
| `MediaSessionPlugin` events | none; no plugin event map | nomercy-player-core/src/plugins/media-session/index.ts:110 |
| `MessagePlugin` | `export class MessagePlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, MessageOptions>` | nomercy-player-core/src/plugins/message/index.ts:59 |
| `messagePlugin` | `export const messagePlugin = MessagePlugin;` | nomercy-player-core/src/plugins/message/index.ts:275 |
| `MessageOptions` | `export interface MessageOptions` | nomercy-player-core/src/plugins/message/index.ts:13 |
| `MessagePlugin` events | none; no plugin event map | nomercy-player-core/src/plugins/message/index.ts:59 |
| `MixerPlugin` | `export class MixerPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, MixerOptions, MixerEvents>` | nomercy-player-core/src/plugins/mixer/index.ts:90 |
| `mixerPlugin` | `export const mixerPlugin = MixerPlugin;` | nomercy-player-core/src/plugins/mixer/index.ts:322 |
| `MixerOptions` | `export interface MixerOptions` | nomercy-player-core/src/plugins/mixer/index.ts:15 |
| `MixerEvents` | `'gain:changed': { gain: number };` `'pan:changed': { pan: number };` `'mute:changed': { muted: boolean };` `'saved': void;` | nomercy-player-core/src/plugins/mixer/index.ts:42-51 |
| `SpectrumPlugin` | `export class SpectrumPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, SpectrumOptions, SpectrumEvents>` | nomercy-player-core/src/plugins/spectrum/index.ts:102 |
| `spectrumPlugin` | `export const spectrumPlugin = SpectrumPlugin;` | nomercy-player-core/src/plugins/spectrum/index.ts:692 |
| `SpectrumOptions` | `export interface SpectrumOptions` | nomercy-player-core/src/plugins/spectrum/index.ts:16 |
| `SpectrumEvents` | `'frame': { frame: VisualizationFrame; energy: { bass: number; mid: number; treble: number } };` `'opts:changed': SpectrumOptions;` | nomercy-player-core/src/plugins/spectrum/index.ts:48-64 |
| `TabLeaderPlugin` | `export class TabLeaderPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, TabLeaderOptions, TabLeaderEvents>` | nomercy-player-core/src/plugins/tab-leader/index.ts:100 |
| `tabLeaderPlugin` | `export const tabLeaderPlugin = TabLeaderPlugin;` | nomercy-player-core/src/plugins/tab-leader/index.ts:260 |
| `TabLeaderOptions` | `export interface TabLeaderOptions` | nomercy-player-core/src/plugins/tab-leader/index.ts:13 |
| `TabLeaderEvents` | `'leader-acquired': void;` `'leader-released': void;` `'unsupported': void;` `[key: string]: unknown;` | nomercy-player-core/src/plugins/tab-leader/index.ts:41-62 |
| `VisualizationPlugin` | `export abstract class VisualizationPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, VisualizationOptions, VisualizationEvents>` | nomercy-player-core/src/plugins/visualization/index.ts:181 |
| `VisualizationOptions` | `export interface VisualizationOptions` | nomercy-player-core/src/plugins/visualization/index.ts:118 |
| `VisualizationEvents` | `unsupported: { reason: string };` `rendered: { frame: VisualizationFrame };` | nomercy-player-core/src/plugins/visualization/index.ts:136-141 |
| `WaveformVisualization` | `export class WaveformVisualization<P extends IPlayer<BaseEventMap> = IPlayer> extends VisualizationPlugin<P>` | nomercy-player-core/src/plugins/visualization/index.ts:385 |
| `waveformVisualization` | `export const waveformVisualization = WaveformVisualization;` | nomercy-player-core/src/plugins/visualization/index.ts:417 |
| `VolumeMemoryPlugin` | `export class VolumeMemoryPlugin<P extends IPlayer<BaseEventMap> = IPlayer> extends Plugin<P, VolumeMemoryOptions, BaseEventMap>` | nomercy-player-core/src/plugins/volume-memory/index.ts:47 |
| `volumeMemoryPlugin` | `export const volumeMemoryPlugin = VolumeMemoryPlugin;` | nomercy-player-core/src/plugins/volume-memory/index.ts:106 |
| `VolumeMemoryOptions` | `export interface VolumeMemoryOptions` | nomercy-player-core/src/plugins/volume-memory/index.ts:14 |
| `VolumeMemoryPlugin` events | none of its own; third generic is `BaseEventMap`; listens to player `volume` / `mute` | nomercy-player-core/src/plugins/volume-memory/index.ts:47 |

Emitted (all declared plugin events above fire except none were declared-and-dead): `AudioGraphPlugin` emits `unsupported`, `context:ready`, `chain:rebuilt`, `context:closed`. `CanvasPlugin` emits `resized`, `mounted`, `frame`. `CastSenderPlugin` emits `unsupported`, `cast:connected`, `cast:error`, `cast:disconnected`, `cast:remote-state`, `cast:media-changed`. `EqualizerPlugin` emits `ready`, `band:changed`, `preset:changed`, `change`, `saved`. `MixerPlugin` emits `gain:changed`, `pan:changed`, `mute:changed`, `saved`. `SpectrumPlugin` emits `frame`; `opts:changed` is emitted by `Plugin.options()` in the base class. `TabLeaderPlugin` emits `unsupported`, `leader-acquired`, `leader-released`. `VisualizationPlugin` emits `unsupported`, `rendered`. `CastSenderEvents['cast:remote-state']` allows `'buffering'` but the only emit uses `'paused' | 'playing'`.

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `AudioGraphOptions.latencyHint` | `'playback'` | `AudioGraphPlugin.createContext` | nomercy-player-core/src/plugins/audio-graph/index.ts:437 |
| `AudioGraphOptions.fftSize` | `2048` | `AudioGraphPlugin.analyserSource` | nomercy-player-core/src/plugins/audio-graph/index.ts:327 |
| `AudioGraphOptions.smoothing` | `0.8` | `AudioGraphPlugin.analyserSource` | nomercy-player-core/src/plugins/audio-graph/index.ts:328 |
| `CanvasOptions.mount` | player `container` when omitted | `CanvasPlugin.resolveMountParent` | nomercy-player-core/src/plugins/canvas/index.ts:195-196 |
| `CanvasOptions.fps` | `60` | `CanvasPlugin.startRenderLoop` | nomercy-player-core/src/plugins/canvas/index.ts:427 |
| `CanvasOptions.pixelRatio` | `devicePixelRatio` else `1` | `CanvasPlugin.size` | nomercy-player-core/src/plugins/canvas/index.ts:347 |
| `CanvasOptions.compositeMode` | `'clear'` | `CanvasPlugin.startRenderLoop` | nomercy-player-core/src/plugins/canvas/index.ts:444 |
| `CanvasOptions.pointerEvents` | `'none'` | `CanvasPlugin.use` | nomercy-player-core/src/plugins/canvas/index.ts:166 |
| `CastSenderOptions.resumeLocalOnDisconnect` | `true` (`!== false`) | `CastSenderPlugin.handleRemoteDisconnect` | nomercy-player-core/src/plugins/cast-sender/index.ts:500 |
| `CastSenderOptions.live` | `false` (falsy branch) | `CastSenderPlugin.forwardCurrent` | nomercy-player-core/src/plugins/cast-sender/index.ts:553 |
| `CastSenderPlugin.defaultContentType()` | `'application/octet-stream'` | `forwardCurrent` when item has no `mime`/`contentType` and opts omit `defaultContentType` | nomercy-player-core/src/plugins/cast-sender/index.ts:349-350,541-544 |
| `EmbedOptions.allowedOrigins` | `[]` | `EmbedPlugin.use` / `isOriginAllowed` | nomercy-player-core/src/plugins/embed/index.ts:161,409-414 |
| `EmbedOptions.forwardEvents` | `['ready', 'play', 'pause', 'ended', 'time', 'volume', 'mute']` | `EmbedPlugin.use` | nomercy-player-core/src/plugins/embed/index.ts:182-191 |
| `EmbedOptions.applyIframeTweaks` | `this.inIframe()` | `EmbedPlugin.use` | nomercy-player-core/src/plugins/embed/index.ts:166 |
| `EqualizerOptions.bands` | `DEFAULT_BANDS` | `EqualizerPlugin.use`, `reset` | nomercy-player-core/src/plugins/equalizer/index.ts:191-193,454-456 |
| `EqualizerOptions.sliderValues` | `DEFAULT_SLIDER_VALUES` | `EqualizerPlugin.use` | nomercy-player-core/src/plugins/equalizer/index.ts:195 |
| `EqualizerOptions.autoLoad` | `true` (`!== false`) | `EqualizerPlugin.loadPersisted` | nomercy-player-core/src/plugins/equalizer/index.ts:691 |
| `EqualizerOptions.autoSave` | `!!this.opts?.persistKey` | `EqualizerPlugin.autoSave` | nomercy-player-core/src/plugins/equalizer/index.ts:685 |
| `EqualizerOptions.smoothingTimeConstantSeconds` | `0.05` | `EqualizerPlugin.smoothingTau` | nomercy-player-core/src/plugins/equalizer/index.ts:657 |
| `PRE_GAIN_SNAP_THRESHOLD` | `0.05` | `EqualizerPlugin.snapPreGain` | nomercy-player-core/src/plugins/equalizer/index.ts:36,652-654 |
| `DEFAULT_SLIDER_VALUES.pre` | `{ min: -1, max: 3, step: 0.01, default: 0, totalSteps: 4 }` | slider helpers / `DEFAULT_BANDS` Pre gain | nomercy-player-core/src/plugins/equalizer/presets.ts:57-63 |
| `DEFAULT_SLIDER_VALUES.band` | `{ min: -12, max: 12, step: 0.01, default: 0, totalSteps: 24 }` | slider helpers / `DEFAULT_BANDS` | nomercy-player-core/src/plugins/equalizer/presets.ts:64-70 |
| `KeyHandlerOptions.scope` | `document` | `KeyHandlerPlugin.scope` | nomercy-player-core/src/plugins/key-handler/index.ts:259-260 |
| `KeyHandlerOptions.extend` | `true` (only `false` clears defaults) | `KeyHandlerPlugin.applyOptions` | nomercy-player-core/src/plugins/key-handler/index.ts:272 |
| `KeyHandlerOptions.cooldownMs` | `300` | `KeyHandlerPlugin.handleKeydown` | nomercy-player-core/src/plugins/key-handler/index.ts:405 |
| `KeyHandlerOptions.disableMediaControls` | `false` | `KeyHandlerPlugin.addMediaKeys` | nomercy-player-core/src/plugins/key-handler/index.ts:343 |
| `MessageOptions.durationMs` | `3000` | `MessagePlugin.queue`; `show` param default (not opts) | nomercy-player-core/src/plugins/message/index.ts:98,173 |
| `MixerOptions.gain` | `0` | `MixerPlugin.use` | nomercy-player-core/src/plugins/mixer/index.ts:136 |
| `MixerOptions.pan` | `0` | `MixerPlugin.use` | nomercy-player-core/src/plugins/mixer/index.ts:137 |
| `MixerOptions.maxGainDb` | `24` | `MixerPlugin.gain` | nomercy-player-core/src/plugins/mixer/index.ts:175 |
| `MixerOptions.smoothingTimeConstantSeconds` | `0.02` | `MixerPlugin.rampParam` | nomercy-player-core/src/plugins/mixer/index.ts:285 |
| `SpectrumOptions.stereo` | `false` (`=== true` to enable) | `SpectrumPlugin.use` | nomercy-player-core/src/plugins/spectrum/index.ts:168 |
| `TabLeaderOptions.onLost` | `'pause'` | `TabLeaderPlugin.releaseLock` | nomercy-player-core/src/plugins/tab-leader/index.ts:227 |
| `TabLeaderOptions.handoffOnVisible` | `true` (`!== false`) | `TabLeaderPlugin.use` visibility listener | nomercy-player-core/src/plugins/tab-leader/index.ts:126 |
| `TabLeaderPlugin` lock key | `'nomercy-player-leader'` | `TabLeaderPlugin.getLockKey` | nomercy-player-core/src/plugins/tab-leader/index.ts:64,249 |
| `VolumeMemoryOptions.persistKey` | `'volume'` | `VolumeMemoryPlugin.use` | nomercy-player-core/src/plugins/volume-memory/index.ts:28,57 |
| MediaSession seek fallback | `5` | `MediaSessionPlugin.addSeekActions` | nomercy-player-core/src/plugins/media-session/index.ts:432,436 |
| MediaSession artwork `sizes` | `'512x512'` | `MediaSessionPlugin._pushMetadata` | nomercy-player-core/src/plugins/media-session/index.ts:346 |
| `mimeFromUrl` fallback | `'image/jpeg'` | `MediaSessionPlugin._pushMetadata` | nomercy-player-core/src/plugins/media-session/index.ts:36,347 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| Audio graph topology: `preEffects` are "e.g. EQ BiquadFilters" | `EqualizerPlugin` inserts pre-gain and filters with `insertEffect(..., 'post')` | nomercy-player-core/src/plugins/audio-graph/index.ts:76; nomercy-player-core/src/plugins/equalizer/index.ts:220 |
| `context:closed` fires "on dispose or when the browser suspends it" | Emitted only from `tearDownGraph` after `ctx.close()`, not on `AudioContext` suspend | nomercy-player-core/src/plugins/audio-graph/index.ts:41,617 |
| Cast sender forwards player event "`current` (loadMedia)" | `use()` subscribes to `'item'` | nomercy-player-core/src/plugins/cast-sender/index.ts:37,215 |
| `applyIframeTweaks` applies "smaller controls, suppressed popout button, etc." | Adds CSS class `nm-embed` on `player.container` only | nomercy-player-core/src/plugins/embed/index.ts:91-93,166-168 |
| `EqualizerOptions.presets`: same-name entry "to override" a built-in | `resolvePreset` prefers `BUILTIN_PRESETS` then custom then `opts.presets`; `presets()` skips duplicate names (first wins) | nomercy-player-core/src/plugins/equalizer/index.ts:54-55,382-383,421-431,611-623 |
| `bandSliderValue`: "centre position (0 gain) maps to 50%" | Band path does; Pre uses `offset = Math.floor(range.max / 2)` so gain `0` maps to `25` with default pre range | nomercy-player-core/src/plugins/equalizer/index.ts:513-522 |
| `'Custom'` "leaves the chain at unity for every band" | Preset values omit `'Pre'`; omitted bands keep current gain | nomercy-player-core/src/plugins/equalizer/presets.ts:140-157,28-31 |
| MediaSession wires "`current` item event" / `_pushMetadata` "Called by the `current` event handler" | Listens to `'item'` | nomercy-player-core/src/plugins/media-session/index.ts:77,136,326 |
| `VisualizationFrame.time`: "Current playback time in seconds" | Spectrum writes RAF `time`; visualization overwrites with canvas RAF `time` (`DOMHighResTimeStamp`) | nomercy-player-core/src/plugins/visualization/index.ts:29-30,339-346; nomercy-player-core/src/plugins/spectrum/index.ts:653 |
| Tab-leader sample: `player.on('plugin:tab-leader:leader-lost', ...)` | Declared/emitted name is `leader-released` | nomercy-player-core/src/plugins/tab-leader/index.ts:97,49-51,226 |
| `onLost`: "when this tab loses leadership (another tab takes over)" | `onLost` runs only inside `releaseLock()` after this tab held the lock; hide does not release | nomercy-player-core/src/plugins/tab-leader/index.ts:15-20,202-234 |
| Mixer `description`: "pre-gain + stereo pan" | Master `GainNode` in dB plus `StereoPannerNode` | nomercy-player-core/src/plugins/mixer/index.ts:93,128-130 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `CastSenderOptions.chromecastAppId`, `enableAirPlay`, `customReceiverNamespace` | Accepted on the options type; never read; `connect()` never configures CastContext with an app id | nomercy-player-core/src/plugins/cast-sender/index.ts:52-57,291-321 |
| `CastSenderPlugin.forwardVolume` | Comment and code treat player volume as 0-100, then `level / 100` clamped to 0-1 for Cast `volumeLevel` | nomercy-player-core/src/plugins/cast-sender/index.ts:607-619 |
| `CastSenderEvents['cast:remote-state'].state` includes `'buffering'` | Only emit uses `remote.isPaused ? 'paused' : 'playing'` | nomercy-player-core/src/plugins/cast-sender/index.ts:79,436-439 |
| Remote `VOLUME_LEVEL_CHANGED` / `IS_MUTED_CHANGED` | Present on the SDK event-type typings; `attachRemoteListeners` never subscribes, so receiver volume/mute is not mirrored | nomercy-player-core/src/plugins/cast-sender/index.ts:130-137,416-462 |
| `SpectrumOptions.frameRate` | Typed and documented; comment says unused; never read | nomercy-player-core/src/plugins/spectrum/index.ts:30-34 |
| `VisualizationOptions.clearBeforeRender`, `tick` | Typed (`tick` comment: only `'frame'` is active); never read | nomercy-player-core/src/plugins/visualization/index.ts:119-132 |
| `VisualizationPlugin.onResize`, `onBeat` | `protected` override hooks; `_renderTick` never calls them | nomercy-player-core/src/plugins/visualization/index.ts:294-302,309-363 |
| `EqualizerPlugin.bandSliderValue` | Public helper is 0-100; `band()` / `preGain()` use raw dB / pre-gain units | nomercy-player-core/src/plugins/equalizer/index.ts:516-522 |
| `EqualizerPlugin.preGain` vs `GainNode` | Slider `0` is written as `value + 1` on the node (unity is 1.0) | nomercy-player-core/src/plugins/equalizer/index.ts:200,296-297 |
| `MessagePlugin.show` vs `durationMs` | `show(text, ms = 3000)` ignores `opts.durationMs`; `displayMessage` can pass `undefined` and skip the parameter default | nomercy-player-core/src/plugins/message/index.ts:98,136-141 |
| `TabLeaderPlugin.dispose` | Calls `releaseLock()`, which pauses or mutes the player when this tab was leader | nomercy-player-core/src/plugins/tab-leader/index.ts:141-143,225-233 |
| `TabLeaderPlugin` visibility | `handoffOnVisible` only `requestLock()` on visible; hidden tabs keep the lock until close/`releaseLock` | nomercy-player-core/src/plugins/tab-leader/index.ts:124-132 |
| Protected methods that read as the plugin API | `AudioGraphPlugin.createContext` / `mountSource`; `CanvasPlugin.createCanvas`; `EmbedPlugin.inIframe` / `handleCommand` / `formatEvent` / `serializeError` / `isOriginAllowed`; `CastSenderPlugin.defaultContentType` / `buildMetadata` / `castContext` / `chromeCastMedia`; `MixerPlugin.getGainNode` / `getPannerNode`; `KeyHandlerPlugin.addPlaybackKeys` and other `add*Keys`; `MediaSessionPlugin.setPlaybackState` / `getMetadata` / `add*Actions`; `TabLeaderPlugin.getLockKey`; `VisualizationPlugin.render` / `setup` | various `protected` declarations in those files |
| `KeyHandlerPlugin`, `MediaSessionPlugin`, `MessagePlugin`, `TabLeaderPlugin`, `WaveformVisualization` | Public classes in `src/plugins` but not re-exported from `src/index.ts` | see re-export list above |
| `SpectrumEvents`, `VisualizationEvents` | Declared and emitted; `src/index.ts` re-exports `SpectrumOptions` / `VisualizationOptions` only | nomercy-player-core/src/index.ts:341-347 |
