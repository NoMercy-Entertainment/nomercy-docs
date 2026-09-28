# Slice: video-desktop-ui
Files given: 27
Files opened: 27

## Files opened
- nomercy-video-player/src/plugins/desktop-ui/data/buttons.ts
- nomercy-video-player/src/plugins/desktop-ui/data/icons.ts
- nomercy-video-player/src/plugins/desktop-ui/data/language-names.ts
- nomercy-video-player/src/plugins/desktop-ui/data/utils.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/activity.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/buttonState.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/chapters.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/menuControl.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/progressBar.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/sprite.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/tooltips.ts
- nomercy-video-player/src/plugins/desktop-ui/helpers/topBar.ts
- nomercy-video-player/src/plugins/desktop-ui/index.ts
- nomercy-video-player/src/plugins/desktop-ui/internals.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/activityMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/chapterMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/feedbackMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/iconStateMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/menuMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/shortcutsMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/spriteMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/mixins/transportStateMethods.ts
- nomercy-video-player/src/plugins/desktop-ui/styles.css

## Public surface
| Symbol | Signature (verbatim) | File:line |
|---|---|---|
| `DesktopUiPlugin` | `export class DesktopUiPlugin extends Plugin<IVideoPlayer<VideoPlaylistItem>, DesktopUiOptions, DesktopUiEvents>` | nomercy-video-player/src/plugins/desktop-ui/index.ts:334 |
| `id` | `static override readonly id: string = 'desktop-ui'` | nomercy-video-player/src/plugins/desktop-ui/index.ts:335 |
| `version` | `static override readonly version: string = '2.0.0'` | nomercy-video-player/src/plugins/desktop-ui/index.ts:336 |
| `description` | `static override readonly description: string = 'Official desktop UI overlay (v2 rewrite)'` | nomercy-video-player/src/plugins/desktop-ui/index.ts:337 |
| `moduleUrl` | `static override readonly moduleUrl: string = import.meta.url` | nomercy-video-player/src/plugins/desktop-ui/index.ts:338 |
| `translations` | `static override readonly translations: Translations = translationsFromGlob('./i18n/*.ts')` | nomercy-video-player/src/plugins/desktop-ui/index.ts:340 |
| `desktopUiPlugin` | `export const desktopUiPlugin = DesktopUiPlugin` | nomercy-video-player/src/plugins/desktop-ui/index.ts:685 |
| `DesktopUiButtonOptions` | `export interface DesktopUiButtonOptions` with `play?`, `mute?`, `volume?`, `fullscreen?`, `settings?`, `next?`, `previous?`, `theater?`, `pip?`, `speed?`, `quality?`, `subtitles?`, `audio?`, `playlist?`, `chapterPrev?`, `chapterNext?`, `seekBack?`, `seekForward?`, `aspectRatio?`, `cast?: boolean` | nomercy-video-player/src/plugins/desktop-ui/index.ts:139-161 |
| `ButtonPriorityList` | `export type ButtonPriorityList = ReadonlyArray<keyof DesktopUiButtonOptions>` | nomercy-video-player/src/plugins/desktop-ui/index.ts:171 |
| `Breakpoint` | `export interface Breakpoint { name: string; maxWidth: number; hideAfterRank: number }` | nomercy-video-player/src/plugins/desktop-ui/index.ts:183-190 |
| `LayoutBreakpointPayload` | `export interface LayoutBreakpointPayload { from: string; to: string; visibleButtons: ReadonlyArray<keyof DesktopUiButtonOptions>; hiddenButtons: ReadonlyArray<keyof DesktopUiButtonOptions> }` | nomercy-video-player/src/plugins/desktop-ui/index.ts:202-211 |
| `DesktopUiOptions` | `export interface DesktopUiOptions` with `hideTitle?`, `disableClickToPause?`, `inactivityMs?`, `imageBaseUrl?`, `buttons?`, `buttonOrder?`, `settingsItems?`, `subtitleMenuActions?`, `settingsMenuActions?`, `buttonPriority?`, `portraitHidden?`, `breakpoints?`, `collapseStages?`, `volumeSlider?: 'horizontal' \| 'vertical' \| 'auto'` | nomercy-video-player/src/plugins/desktop-ui/index.ts:213-321 |
| `DesktopUiEvents` | `export interface DesktopUiEvents { 'shortcuts-toggle': undefined; 'layout:breakpoint': LayoutBreakpointPayload; 'opts:changed': DesktopUiOptions }` | nomercy-video-player/src/plugins/desktop-ui/index.ts:324-328 |
| `SettingsToggleItem` | `export interface SettingsToggleItem { id: string; label: () => string; get: () => boolean; set: (value: boolean) => void }` | nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:94-99 |
| `SubtitleMenuAction` | `export interface SubtitleMenuAction { id: string; label: () => string; icon?: string; onSelect: (player: IVideoPlayer) => void \| Promise<void> }` | nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:114-120 |
| `overlay` | `overlay(): HTMLElement \| null` | nomercy-video-player/src/plugins/desktop-ui/index.ts:563-565 |
| `holdChrome` | `holdChrome(): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:576-579 |
| `releaseChrome` | `releaseChrome(): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:586-590 |
| `use` | `override use(): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:459 |
| `disable` | `override disable(reason?: string): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:530 |
| `enable` | `override enable(): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:543 |
| `dispose` | `override dispose(): void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:551 |
| mixin methods (public `declare` on the class) | `wireFeedback: () => void`; `showMessage: (text: string, ms?: number, isFeedback?: boolean) => void`; `hideMessage: () => void`; `toggleShortcuts: () => void`; `showShortcuts: () => void`; `hideShortcuts: () => void`; `bumpActivity: () => void`; `maybeHide: () => void`; `dismissOverlay: () => void`; `openMainMenu: () => void`; `openSubMenu: (id: SubMenuId) => void`; `wireMenuKeyboardNav: () => void`; `closeAllMenus: () => void`; `syncActiveIndexes: () => void`; `repaintSubsIfOpen: () => void`; `repaintAudioIfOpen: () => void`; `repaintQualityIfOpen: () => void`; `repaintSpeedIfOpen: () => void`; `repaintPlaylistIfOpen: () => void`; `repaintAspectRatioIfOpen: () => void`; `applyVolume: (level: number) => void`; `applyMuted: (muted: boolean) => void`; `applyMutedIcon: () => void`; `applyPopupMuteIcon: (muted: boolean) => void`; `applyRate: () => void`; `applyAudioIcon: () => void`; `applyQualityIcon: () => void`; `playingQualityLabel: () => string \| undefined`; `resolvePlayingQualityIdx: () => number \| null`; `applyFullscreen: () => void`; `applyTheaterIcon: (active: boolean) => void`; `applySubsIcon: () => void`; `applyMenuSubsIcon: () => void`; `applyPipIcon: (active: boolean) => void`; `applyAspectRatioIcon: () => void`; `setPlayingState: (playing: boolean) => void`; `handleCurrentChange: (item: VideoPlaylistItem \| undefined \| null) => void`; `applyTime: (seconds: number) => void`; `applyDuration: (dur: number) => void`; `_formatRemaining: (cur: number, dur: number) => string`; `applyStateVisibility: () => void`; `setContentHidden: (btn: HTMLButtonElement, hidden: boolean) => void`; `refreshCapabilityVisibility: () => void`; `refreshTransportEnablement: () => void`; `setDisabled: (btn: HTMLButtonElement, disabled: boolean) => void`; `safeCurrentIndex: () => number`; `safeQueueLength: () => number`; `resolveDuration: () => number`; `refreshChaptersAndDuration: () => void`; `renderChapterMarkers: () => void`; `updateChapterProgress: (pct: number) => void`; `updateChapterBuffer: (pct: number) => void`; `updateChapterHover: (pct: number) => void`; `findChapterTitle: (time: number) => string \| undefined`; `previousChapter: () => void`; `nextChapter: () => void`; `getScrubTime: (event: Event) => { scrubTime: number; scrubTimePlayer: number }`; `clampPopOffset: (pct: number) => number`; `paintSpriteAt: (time: number) => void`; `_resolveSpriteUrl: (item: VideoPlaylistItem \| undefined \| null) => string \| undefined`; `_revokeSpriteObjectUrl: () => void`; `loadSpritesForItem: (item: VideoPlaylistItem \| undefined \| null) => Promise<void>`; `buildDom: () => void`; `wireTooltips: () => void`; `applyInitialState: () => void`; `wireKeybindHint: () => void`; `wireSliderBar: () => void`; `wireEvents: () => void` | nomercy-video-player/src/plugins/desktop-ui/index.ts:594-669 |
| overlay mount | `this.mount('overlay')` then class `overlay`; children: `top-bar`, `center`, `bottom-bar`, `menu-frame-dialog`, `#nmplayer-keybinds-dialog` | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:40-123 |
| top bar | `buildTitleBar`: `#back-btn`, `#cast-btn`, `#close-btn`, `#title`, `#show-info` | nomercy-video-player/src/plugins/desktop-ui/helpers/topBar.ts:51-121 |
| center | `buildCenter`: `#center` > `#spinner` + `#center-btn` | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:125-148 |
| bottom bar | `buildBottomBar`: `#bottom-bar` > `#bottom-bar-shadow`, `#top-row`/`#slider-bar`, `#bottom-row` buttons and `#volume-container` | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:154-186 |
| toast | `.player-message` appended to `this.player.container`, not the overlay | nomercy-video-player/src/plugins/desktop-ui/mixins/feedbackMethods.ts:69-73 |

## Literal defaults
| Setting | Default (verbatim) | Read by | File:line |
|---|---|---|---|
| `DesktopUiPlugin.id` | `'desktop-ui'` | plugin registry / event namespace `plugin:desktop-ui:` | nomercy-video-player/src/plugins/desktop-ui/index.ts:335 |
| `DesktopUiPlugin.version` | `'2.0.0'` | plugin metadata | nomercy-video-player/src/plugins/desktop-ui/index.ts:336 |
| `inactivityMs` | `4000` | `bumpActivity` (`this.opts?.inactivityMs ?? 4000`) | nomercy-video-player/src/plugins/desktop-ui/mixins/activityMethods.ts:30 |
| `volumeSlider` | `'auto'` | `wireVolumeSlider` (`opts?.volumeSlider ?? 'auto'`) | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:461 |
| auto vertical width | `520` (`AUTO_VERTICAL_THRESHOLD`) | `wireVolumeSlider` evaluate | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:516-518 |
| `hideTitle` | unset / falsy (title column shown) | `this.topBarRefs.right.hidden = !!this.opts?.hideTitle` | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:45 |
| `disableClickToPause` | unset / falsy (video click toggles playback) | container click handler | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:323 |
| `imageBaseUrl` | `''` when concatenating; plugin opt then player `options.baseImageUrl` | playlist card `img.src` | nomercy-video-player/src/plugins/desktop-ui/helpers/menuControl.ts:353-354, nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:944 |
| `buttons` default-on | `'play'`, `'mute'`, `'volume'`, `'fullscreen'`, `'settings'`, `'next'`, `'previous'`, `'chapterPrev'`, `'chapterNext'` | `buttonVisible` / `DEFAULT_ON_BUTTONS` | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:33-51 |
| `buttons.cast` | off (`!opts?.buttons?.cast`) | `castBtn.hidden` and `applyStateVisibility` | nomercy-video-player/src/plugins/desktop-ui/helpers/topBar.ts:84, nomercy-video-player/src/plugins/desktop-ui/mixins/transportStateMethods.ts:114 |
| `buttonPriority` | `DEFAULT_PRIORITY` (`play`, `mute`, `volume`, `fullscreen`, `settings`, `next`, `previous`, `chapterPrev`, `chapterNext`, `seekForward`, `quality`, `subtitles`, `audio`, `seekBack`, `theater`, `pip`, `speed`, `aspectRatio`, `playlist`) | `applyAllVisibilityRules` | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:59-90,283 |
| `portraitHidden` | `PORTRAIT_HIDDEN` (`chapterPrev`, `chapterNext`, `previous`, `next`, `subtitles`, `audio`, `quality`, `playlist`) | `resolvePortraitHidden` | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:47-56,233-234 |
| `breakpoints` | `DEFAULT_BREAKPOINTS` xs 320/rank 1, sm 480/rank 4, md 720/rank 8, lg 1024/rank 13, xl Infinity/Infinity | `resolveBreakpoints` | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:100-106,158-173 |
| `collapseStages` xs/xl ranks | xs `hideAfterRank: 1`, xl `Infinity` (sm/md/lg from the tuple) | `resolveBreakpoints` when `breakpoints` absent | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:164-170 |
| `_showRemaining` | `true` (`(stored as boolean \| null) ?? true`) | remaining-time label | nomercy-video-player/src/plugins/desktop-ui/index.ts:434,515-516 |
| volume slider DOM | `min = '0'`, `max = '100'`, `value = '100'` | `buildBottomRow` | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:252-255 |
| tooltip delay | `500` | `addTooltip` `scheduleTimeout(..., 500)` | nomercy-video-player/src/plugins/desktop-ui/helpers/tooltips.ts:97 |
| `BUTTON_WIDTH` | `40` | `buttonFootprint` | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:36,201 |
| `VOL_SLIDER_EXPANDED_WIDTH` | `96` | mute footprint when not no-hover | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:37,201-203 |
| reserved chrome | `148` (`RESERVED_CHROME_WIDTH`) | fit pass | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:289 |
| playback rates fallback | `[0.5, 0.75, 1, 1.25, 1.5, 2]` | `renderSpeedPane` | nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:471 |
| `defaultSubtitleStyles` | `{ fontSize: 100, fontFamily: 'ReithSans, sans-serif', textColor: 'white', textOpacity: 100, backgroundColor: 'black', backgroundOpacity: 0, edgeStyle: 'textShadow', areaColor: 'black', windowOpacity: 0 }` | subtitle settings | nomercy-video-player/src/plugins/desktop-ui/data/buttons.ts:333-343 |
| seek step on bar buttons | `10` | rewind/forward click | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:493-494 |
| keybind hint toast | `ms: 12000` | first `play` | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:188 |

## Comment versus code
| Claim in the comment | What the code does | File:line |
|---|---|---|
| File map lists `feedbackMethods.ts`, `activity.ts`, `dom.ts` as files in `desktop-ui/` | Mixins live under `mixins/`. Free functions live under `helpers/`. | nomercy-video-player/src/plugins/desktop-ui/index.ts:14-42 |
| `volumeSlider`: `'- \'horizontal\'  - inline slider that expands on hover (default).'` | Runtime default is `'auto'` (`opts?.volumeSlider ?? 'auto'`). Horizontal is only used when the consumer sets it. | nomercy-video-player/src/plugins/desktop-ui/index.ts:316-317 vs nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:458-461 |
| `buttonPriority` default order: `seekBack → seekForward → theater → pip → speed → quality → subtitles → audio → aspectRatio → playlist` | `DEFAULT_PRIORITY` is `seekForward`, then `quality`, `subtitles`, `audio`, then `seekBack`, `theater`, `pip`, `speed`, `aspectRatio`, `playlist`. | nomercy-video-player/src/plugins/desktop-ui/index.ts:263-266 vs nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:59-90 |
| `DEFAULT_BREAKPOINTS` lg: `'+ theater / pip / speed (rank 0–13)'` | Rank 13 is `seekBack`. `theater` is 14, `pip` is 15, `speed` is 16. | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:97 vs 59-90,104 |
| Navigation is `'always-on when queue has multiple items: next, previous'` | `next`/`previous` are default-on even for a one-item queue. They are disabled, not hidden, when index cannot move. | nomercy-video-player/src/plugins/desktop-ui/index.ts:131 vs nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:33-42,205-207 and nomercy-video-player/src/plugins/desktop-ui/mixins/transportStateMethods.ts:186-189 |
| `iconBtn` `'Wraps player.createButton'` | Calls `createButton` imported from `@nomercy-entertainment/nomercy-player-core`, not `player.createButton`. | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:56-66 |
| Subtitle settings: `IVideoPlayer` `'doesn't expose a subtitleStyle() API, so the active style is kept in module state'` | There is no module-level style bag. `readSubtitleStyle` is `player.subtitleStyle?.() ?? { ...defaultSubtitleStyles }`. | nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:617-619 vs 639-641 |
| `addTooltip`: tooltip `'never escapes the player container's left/right edge'` | `clampTooltip` fences to the slider-bar rect, and only falls back to the container if that rect is missing. | nomercy-video-player/src/plugins/desktop-ui/helpers/tooltips.ts:55-56 vs 114-115 |
| `subtitleTrackLabel` examples include `'Nederlands (SDH)'` as a translated variant | Only `'full'` and `'sign'` hit `TRANSLATED_VARIANTS`. `sdh` is rendered as the raw `track.type`. | nomercy-video-player/src/plugins/desktop-ui/data/language-names.ts:52-53 vs 49 |
| CSS xs comment `'xs (≤ 360 px)'` | JS `DEFAULT_BREAKPOINTS` xs is `maxWidth: 320`. CSS container query is `360px`. | nomercy-video-player/src/plugins/desktop-ui/styles.css:1561 vs nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:101 |
| Menu tree comment lists only language, subtitle, quality, speed panes | `panes` also includes `playlist`, `subtitleSettings`, `aspectRatio`. | nomercy-video-player/src/plugins/desktop-ui/helpers/menus.ts:20-23 vs 158-166 |
| `previousChapter` / `nextChapter` docs say `'relative to time'` | Neither function takes `time`. They read `player.time?.() ?? 0`. | nomercy-video-player/src/plugins/desktop-ui/helpers/chapters.ts:39-59 |
| `lookupCue`: last cue `'if time falls past the end of the table'` | `found ?? set.cues.at(-1)` also returns the last cue for times before the first cue. | nomercy-video-player/src/plugins/desktop-ui/helpers/sprite.ts:115-123 |
| `fluentIcons.play.title` is `'Pause'`; `fluentIcons.pause.title` is `'Play'` | Titles are swapped relative to the glyph. `iconBtn(..., 'play')` therefore seeds the play button with accessible name Pause. | nomercy-video-player/src/plugins/desktop-ui/data/buttons.ts:108-136 |

## Traps
| Behavior | Why it surprises | File:line |
|---|---|---|
| `'shortcuts-toggle'` is on `DesktopUiEvents` | The plugin never emits it. `?` calls `toggleShortcuts()` directly. The plugin only *listens* for `plugin:desktop-ui:shortcuts-toggle` (tests and consumers fire it inbound). TV help emits `plugin:tv-key-handler:shortcuts-toggle`, a different namespace. | nomercy-video-player/src/plugins/desktop-ui/index.ts:325, nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:303-306,348 |
| `'opts:changed'` is on `DesktopUiEvents` | This class never `emit('opts:changed')`. Core `Plugin.options(partial)` emits it. This plugin only subscribes and then refreshes title visibility, capability gating, and `settingsMenuActions` rows. Other option keys are not rebuilt live (`buttons`, `buttonOrder`, `volumeSlider`, DOM structure). | nomercy-video-player/src/plugins/desktop-ui/index.ts:327, nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:548-564 |
| Mixin methods are public `declare` on `DesktopUiPlugin` | Underscored names (`_formatRemaining`, `_resolveSpriteUrl`, `_revokeSpriteObjectUrl`) look private. `buildDom`, `wireEvents`, `openMainMenu` look like you may call them. They are public instance members, not `protected`. | nomercy-video-player/src/plugins/desktop-ui/index.ts:592-669 |
| `DesktopUiInternals` re-declares Plugin helpers as public | `on`, `emit`, `listen`, `storage`, `t`, `mount` are `protected` on `Plugin`. The internals interface is an internal mixin `this` type, not the package export, but it reads like a public API. | nomercy-video-player/src/plugins/desktop-ui/internals.ts:16-22,131-164 |
| `SettingsToggleItem` / `SubtitleMenuAction` are not re-exported from `index.ts` | Package export is only `./plugins/desktop-ui` → `index`. Consumers need those types to fill `settingsItems` / `subtitleMenuActions` / `settingsMenuActions`. | nomercy-video-player/src/plugins/desktop-ui/index.ts:97,237-257 vs helpers/menus.ts:94-120 |
| `volumeSlider` JSDoc says horizontal is the default | Code defaults to `'auto'` (vertical at width ≤ 520 or no-hover). | nomercy-video-player/src/plugins/desktop-ui/index.ts:316-320, nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:461 |
| `buttonOrder` accepts every `DesktopUiButtonOptions` key | `byKey` has no `volume` and no `cast`. `mute` re-appends `volBtn` onto the bottom row, which pulls it out of `.volume-container`. | nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:415-434 |
| `buttonPriority` includes `'volume'`; `initButtonMap().volume` is `null` | The volume *key* is skipped in the fit pass. Slider space is charged to `'mute'` via `buttonFootprint`. `buttons.volume: false` hides the slider at build but does not shrink the mute footprint. | nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:197-204,241-265,296-299 |
| `settingsMenuActions` does not keep the settings button visible | `settingsEmpty` checks speeds, audio, subs, `subtitleMenuActions`, and `settingsItems` only. A settings menu that only has consumer action rows still hides `#settings`. | nomercy-video-player/src/plugins/desktop-ui/mixins/transportStateMethods.ts:161-167 |
| `maybeHide` ignores `_activityState.isScrubbing` | Scrub sets `isScrubbing` on the activity bag, but only `dismissOverlay` reads it. Hover-pin is mouse-only (`pointerType === 'mouse'`). Touch scrub while playing can still auto-hide. | nomercy-video-player/src/plugins/desktop-ui/helpers/activity.ts:96-109 vs 116-127, nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:335-345 |
| `applyInitialState` never calls `setPlayingState` | Play button is created from the `play` icon whose `title` is `'Pause'`. Until a play/pause event, the control can show a play glyph with a Pause name. | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:160-178, nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:201 |
| `hideTitle` hides `.top-bar-right` only | Back, cast, and close stay. CSS needs `.top-bar-right[hidden] { display: none }` because UA `[hidden]` loses to the column rule. | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:45, nomercy-video-player/src/plugins/desktop-ui/styles.css:58-66 |
| CSS xs is 360px, JS xs is 320px | Container queries and `data-breakpoint` disagree on what "xs" means. | nomercy-video-player/src/plugins/desktop-ui/styles.css:1561, nomercy-video-player/src/plugins/desktop-ui/helpers/responsive.ts:101 |
| `buttons.next` / `buttons.previous` default on | Interface copy says they are always-on when the queue has multiple items. They stay visible (disabled) on a single item. | nomercy-video-player/src/plugins/desktop-ui/index.ts:131, nomercy-video-player/src/plugins/desktop-ui/helpers/dom.ts:33-42 |
| Index file-map comments tell you where files live | Those paths are wrong. Treat the map as a trap, not a TOC. | nomercy-video-player/src/plugins/desktop-ui/index.ts:12-42 |
| `wireEvents` comments instruct about tests (`Every previous test dispatched straight at document`) | Operational comments aimed at the reader, not runtime. `?` is stopped on the container so KeyHandlerPlugin on document does not double-toggle. | nomercy-video-player/src/plugins/desktop-ui/mixins/domMethods.ts:297-306 |
