# Fact check: /nomercy-player-core/plugins-adapters/adapter-media-element
Verdict: FAIL
Reviewed: src/content/nomercy-player-core/en/plugins-adapters/adapter-media-element.mdx
Reviewed-SHA: d29b4d45fe9e0919
Previous verdict: PASS (Reviewed-SHA c7ebb979a7cb0770, equal to the page at `7f53a5d`); fixes verified: none open. Scope of this review: only the sentences changed since `7f53a5d` (page line 43, and the backend ID sentence moved to page line 50 with new glosses). The rest of the page stands on the previous PASS.

Source: nomercy-player-core (`src` at `e3d2de5`), nomercy-video-player and nomercy-music-player `src`. Example unchanged since `7f53a5d`; type check exit 0; snippet ranges "5 OK, 0 bad".

## Findings

| # | Page line | Source | What is wrong | Fix |
| --- | --- | --- | --- | --- |
| 1 | 50 | core `src/errors/code.ts:16` (the ID union, no meaning attached); core `src/adapters/media-element/helpers.ts:19` (`BackendId` is that union); the ID is only read into error scopes: `helpers.ts:365,391,436`, `MediaElementBackend.ts:299,303,315`; video `src/adapters/video-backend/html5.ts:273-285` (creates or reuses a `<video>` element, then `super(element, ownsElement, 'html5')`); video `src/index.ts:627` ("Only `'html5'` has a built-in implementation"); video `src/adapters/video-backend/IVideoBackend.ts:111-115` (`html5`, `mse`, `webcodecs`); music `src/adapters/audio-backend/html5-audio.ts:61` (`'audio-element'`), `web-audio.ts:112` (`'webaudio'`) | The glosses for `video` and `html5` are not supported. `str video` "(a `<video>` element)": no backend in the three packages passes `'video'` (search of the three `src` trees: no backend or scope uses it), and the shipped `<video>` backend passes `html5`. `str html5` "(a plain HTML5 media element backend)" hides that it is the video player's `<video>` backend. A reader who writes a `<video>` backend from these glosses picks `video`, unlike the shipped one. The purpose clauses "for adaptive streaming" and "for custom decode handling" describe backends that do not exist (`mse` and `webcodecs` have no implementation). The page does not say what the ID does: it only labels the backend in error scopes. | Replace line 50 with: "The ID labels the backend in the `key scope` of its errors. It is one of `str audio-element`, `str webaudio`, `str video`, `str html5`, `str mse` or `str webcodecs`. The built-in backends use `str html5` (the video player's `<video>` backend), `str audio-element` (the music player's `<audio>` backend) and `str webaudio` (the music player's Web Audio backend). `str mse` (Media Source Extensions) and `str webcodecs` (the WebCodecs API) have no built-in backend, and no built-in backend uses `str video`." |

## Claim table

| Claim | Supported by | Status |
| --- | --- | --- |
| L43 `pauseLoader`/`resumeLoader` stop and start the HLS (HTTP Live Streaming) loader when one is attached | core `MediaElementBackend.ts:277-290` (`this.hlsInstance?.stopLoad()` / `startLoad()`) | Supported |
| L50 the six IDs | core `src/errors/code.ts:16` | Supported |
| L50 `audio-element` is an `<audio>` element | music `html5-audio.ts:44,61` | Supported |
| L50 `webaudio` is the Web Audio API | music `web-audio.ts:52-64` ("Web Audio API is not available in this environment."), `:112` | Supported |
| L50 `video` is a `<video>` element | no backend passes `'video'` | FAIL (finding 1) |
| L50 `html5` is a plain HTML5 media element backend | video `html5.ts:273-285` (the `<video>` backend) | FAIL (finding 1) |
| L50 `mse` for adaptive streaming; `webcodecs` for custom decode handling | expansions are the standard API names; no built-in backend (video `src/index.ts:627`) | FAIL (finding 1, purpose clauses) |
