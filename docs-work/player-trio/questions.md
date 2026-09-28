# Questions for the owner

- The quickstart and build pages are supposed to keep a live player. The site island only mounts `nomercy-video-player` or `nomercy-music-player` and becomes ready on `canplay`. A player composed from core alone has no media backend, so it cannot reach that signal. The pilot shows those samples with `live="false"` rather than mounting a video player on a core page. Say if the pilot should instead show the video player there.
