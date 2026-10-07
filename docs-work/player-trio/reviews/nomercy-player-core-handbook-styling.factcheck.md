# Fact check: /nomercy-player-core/handbook/styling
Verdict: PASS
Reviewed: src/content/nomercy-player-core/en/handbook/styling.mdx
Reviewed-SHA: 8ad6c6cbcb6343ce

Delta review of the fix for the two findings of the previous verdict (FAIL, Reviewed-SHA `32161161a435f843`): `key styleId` on a positional parameter (finding 1, lines 19 and 40) and "exactly one is present" for `active` / `inactive` (finding 2, line 58).

Date: 2026-09-29. Source: nomercy-player-core `src` at `e3d2de5` (read only): `src/core/plugin/base.ts`, `src/core/mixins/container-class-emit.ts`, `src/core/mixins/activity.ts`, `src/core/mixins/lifecycle.ts`, `src/types/config.ts`. Tag meanings: `src/lib/mdx/rehype.ts:110` (`var` = a value), `:126-128` (`key` = an object key). Method: `git -C C:/Projects/worktrees/docs-batch-05 diff HEAD -- src/content/nomercy-player-core/en/handbook/styling.mdx` (three changed lines: 19, 40, 58); each checked against the source; the two sections around them re-read. Not run in a browser (traced in the source).

## Changed lines

| Page line | Claim | Supported by | Status |
| --- | --- | --- | --- |
| 19 | Both helpers take a `var styleId` you choose (positional) | `base.ts:866` (`appendStyles(href: string, styleId: string)`), `base.ts:892` (`appendInlineStyles(cssText: string, styleId: string)`) | Supported (finding 1 fixed) |
| 40 | Each helper looks up `var styleId` in the document before writing | same signatures; the lookup at `base.ts:869-870,895-896` (carried review) | Supported (finding 1 fixed) |
| 58 | Exactly one of `active` / `inactive` is present once `activity` has fired | `container-class-emit.ts:114-119` (`activity` is a `binary` rule, `whenTrue: 'active'`, `whenFalse: 'inactive'`), `:162-167` (adds one class and removes the other on every event) | Supported |
| 58 | Setup fires `activity` unless `inactivityMs` is `0` (`key inactivityMs` is a config key; tag correct) | `lifecycle.ts:137` (setup calls `wireActivityTracking`); `activity.ts:110-113` (`inactivityMs` `0` returns before any listener or bump), `:163` (initial `bump()`), `:55-62` (`_setActivity(true)` emits `activity { active: true }`); `config.ts:319` (`inactivityMs?: number`) | Supported (finding 2 fixed) |

## Section re-read

- Lines 17-27 and 38-48 ("Put CSS in the document", "One id wins"): unchanged claims, still true of `base.ts:866-900`.
- Lines 50-65 (container classes table and the notes under it): the other three rows and lines 62-65 are unchanged and were supported in the carried review.
- Edge not on the page: `wireActivityTracking` also returns early without a `document` or container (`activity.ts:108-109`); then there is no container to carry classes, so the row stays true.
- `key` tag audit: `key moduleUrl` (static class property, `base.ts:178`) and `key inactivityMs` (config key) remain; no positional parameter is tagged `key`.

## Findings

None.

## Carried from the previous review

> Verdict: FAIL
> Reviewed: src/content/nomercy-player-core/en/handbook/styling.mdx
> Reviewed-SHA: 32161161a435f843

Previous verdict: PASS (Reviewed-SHA 9c0245792f023f2c), no findings raised, so nothing to verify as fixed. The page changed since (last page commit `d40ea36`), so every claim was checked fresh, including the ones the previous review passed.

Source: nomercy-player-core `src` at `e3d2de5` (working tree clean): `src/core/plugin/base.ts`, `src/core/mixins/container-class-emit.ts`, `src/core/mixins/lifecycle.ts`, `src/core/mixins/activity.ts`, `src/core/mixins/media-tracks.ts`, `src/types/tracks.ts`, `package.json`. Example `src/examples/core-handbook-styling.ts`. Site tag rules `src/lib/mdx/rehype.ts:103-129`.

Method: read the whole page, the whole example, and each source line cited. Type-checked the example against the package SOURCE with a scratch tsconfig outside the repo: `tsc exit 0`. `git ls-files | grep -iE "\.(css|scss)$"` in nomercy-player-core: no output. Container-class and activity behaviour traced in the source; not run in a browser (not checked at runtime).

### Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 19, 40 | `base.ts:866` (`appendStyles(href: string, styleId: string)`), `base.ts:892` (`appendInlineStyles(cssText: string, styleId: string)`); `rehype.ts:126-128` (`key` = an object key), `rehype.ts:110` (`var` = a value) | `styleId` is the second positional parameter of both helpers, not an object key. The page tags it `key styleId`, which renders it as an object property. | Line 19: "Both take a `var styleId` you choose." Line 40: "Before writing, each helper looks up `var styleId` in the document." |
| 2 | 58 | `container-class-emit.ts:114-119,162-167` (the classes change only on an `activity` event); `activity.ts:110-113` (`inactivityMs: 0` returns before any listener or bump); `activity.ts:161-163` (the initial `bump()` that adds `active` runs only past that return); `lifecycle.ts:137` | "exactly one is present" is not always true. With the default options, setup's initial bump emits `activity { active: true }`, so `active` is present. With `inactivityMs: 0`, the tracker returns before that bump, so the container carries neither class until a plugin emits `activity` or the code calls `bumpActivity()`. | Replace the row's meaning cell with: "User activity; exactly one is present once `str activity` has fired, which setup does unless `key inactivityMs` is `0`". |

### Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L12 the package ships no stylesheet | no tracked `.css`/`.scss` (command above); `package.json:201-209` `files` is docs, `dist`, `scripts` | Supported |
| L13 CSS enters through plugin helpers; the player stamps state classes on its container | `base.ts:866-900`; `container-class-emit.ts:233-241` | Supported |
| L17 `appendStyles` / `appendInlineStyles` on a `Plugin` subclass, in `use` | `base.ts:866,892` (`protected`); example `:39-46` | Supported |
| L18 both write into `document.head` | `base.ts:877,900` | Supported |
| L19 both take a `styleId` you choose | `base.ts:866,892` | Supported as a fact; tag wrong (finding 1) |
| L21 `appendStyles` adds a stylesheet link for a URL | `base.ts:873-877` | Supported |
| L22-23 relative URL resolves against `moduleUrl` when set, else `document.baseURI` (`key moduleUrl` is a static class property, `base.ts:178`; tag correct) | `base.ts:871-872` | Supported |
| L25-27 `appendInlineStyles` writes a style element with the CSS text; rules present when the call returns | `base.ts:895-900` (synchronous `appendChild`) | Supported |
| L29-34 hand-written block: `appendInlineStyles(css, 'plugin-badge-inline')` | signature `base.ts:892`; same call shape as example `:40-46` | Supported |
| L31 class `.nmplayer-badge-root` matches the mount name | example `:35,51`; `base.ts:916` (`nmplayer-${this.id}-${name}`) | Supported |
| L36 no `document`: both return without writing | `base.ts:867-868,893-894` | Supported |
| L40-42 each helper looks up the id; existing id means no-op; first call wins | `base.ts:869-870,895-896`; example `:48-49` | Supported; tag wrong (finding 1) |
| L44-45 stable plugin-specific id; reusing another plugin's id silences your sheet | follows from `base.ts:869-870,895-896` | Supported |
| L47-48 neither helper removes its node on dispose; a later registration skips the write | `base.ts:866-900` (no `addCleanup`); contrast `mount` cleanup `base.ts:931-934`; example `:111-113` | Supported |
| L52 after `setup`, the container carries `nomercyplayer` | `lifecycle.ts:122` | Supported |
| L53 emitted events keep further classes in sync | `container-class-emit.ts:233-241` | Supported |
| L57 `playing` `paused` `stopped` `ended` `loading` `buffering`: play and load presentation | `container-class-emit.ts:22` (`PLAY_STATE_CLASSES`), `:44-92,113,170-199` | Supported |
| L58 `active` `inactive`: user activity; exactly one is present | `container-class-emit.ts:114-119,162-167`; `activity.ts:110-113,161-163` | FAIL (finding 2) |
| L59 `muted`: mute is on | `container-class-emit.ts:93-97,156-159` | Supported |
| L60 `fullscreen` `pip` `theater`: display mode is on | `container-class-emit.ts:98-112,156-159` | Supported |
| L62 `buffering` from `waiting` or `stalled` | `container-class-emit.ts:70-79` | Supported |
| L63 `canplay` or an advancing `time` clears it | `container-class-emit.ts:80-92` | Supported |
| L64 the first `loading` phase can add that class | `container-class-emit.ts:184-197` | Supported |
| L65 after the first `ready`, a later `loading` phase leaves the classes alone | `container-class-emit.ts:177-178,193-194` | Supported |
| L67-71 CSS `.nomercyplayer.inactive .nmplayer-badge-root` | class names from `lifecycle.ts:122`, `container-class-emit.ts:117`, `base.ts:916` | Supported |
| L75 `addClasses` / `removeClasses` add or drop names on a node you hold | `base.ts:835-845` | Supported |
| L76 `mount` claims a div under the container, class `nmplayer-<id>-<name>` | `base.ts:914-935` | Supported |
| L81 `subtitleStyle()` returns the current `SubtitleStyle` | `media-tracks.ts:703-710` (returns a copy, `{ ...this._subtitleStyle }`) | Supported |
| L82-83 a partial merges fields and emits `subtitleStyle` with the merged object | `media-tracks.ts:712-717` | Supported |
| L85-88 hand-written block `subtitleStyle()` / `subtitleStyle({ fontSize: 120 })` | `media-tracks.ts:703`; `tracks.ts:166` (`fontSize: number`); example `:108-109` | Supported |
| L90 snippet (whole file) | `core-handbook-styling.ts`; `tsc exit 0` | Supported |
| L95 Next: Timing covers timers, frame loops, and signals that dispose cancels | `handbook/timing.mdx:3` (timeout, interval, frame, abortable, observe), sections at `:17,30,42,58` | Supported |

### Notes

- `key` tag audit: `key styleId` (L19, L40) names a positional parameter (finding 1). `key moduleUrl` (L22) is a static class property (`base.ts:178`); correct.
- L81: the read returns a shallow copy (`media-tracks.ts:710`); mutating it does not change the player's style. The page does not claim otherwise; no finding.
- Two hand-written `ts` blocks (L29-34, L85-88) remain on the page. Both are true of the source. Whether they must become `:::snippet` lines is a docs-site rule (`check:code-blocks`), not a fact; left to the writer and the reader review.
