#!/usr/bin/env python3
"""
One-off sweep: rewrite every `/player/...` link in MDX content to its new IA
target. The redirect map matches what astro.config.mjs declares — keeping the
source aligned so users follow live links instead of 301-bouncing.

Run from repo root:
    python docs/nomercy-docs/scripts/rewrite-old-player-links.py
"""

from __future__ import annotations

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
CONTENT_DIR = REPO_ROOT / "docs" / "nomercy-docs" / "src" / "content"

REDIRECTS: dict[str, str] = {
    "/player/kit/": "/nomercy-player-kit/",
    "/player/kit/adapters": "/nomercy-player-kit/adapters",
    "/player/kit/auth-fetch": "/nomercy-player-kit/auth-fetch",
    "/player/kit/errors": "/nomercy-player-kit/errors",
    "/player/kit/event-system": "/nomercy-player-kit/event-system",
    "/player/kit/i18n": "/nomercy-player-kit/i18n",
    "/player/kit/lifecycle": "/nomercy-player-kit/lifecycle",
    "/player/kit/metrics": "/nomercy-player-kit/metrics",
    "/player/kit/plugins": "/nomercy-player-kit/plugins",
    "/player/kit/quickstart": "/nomercy-player-kit/quickstart",
    "/player/kit/testing": "/nomercy-player-kit/testing",
    "/player/": "/nomercy-player-kit/player-overview",
    "/player/architecture": "/nomercy-player-kit/architecture",
    "/player/faq": "/nomercy-player-kit/faq",
    "/player/migration-v1-v2": "/nomercy-player-kit/migration-v1-v2",
    "/player/plugin-authoring": "/nomercy-player-kit/plugin-authoring",
    "/player/plugin-standard": "/nomercy-player-kit/plugin-standard",
    "/player/quickstart": "/nomercy-player-kit/quickstart-kit",
    "/player/troubleshooting": "/nomercy-player-kit/troubleshooting",
    "/player/versioning": "/nomercy-player-kit/versioning",
    "/player/video/": "/nomercy-video-player/",
    "/player/video/api-methods": "/nomercy-video-player/api-methods",
    "/player/video/cast-sender": "/nomercy-video-player/cast-sender",
    "/player/video/chapters": "/nomercy-video-player/chapters",
    "/player/video/configuration": "/nomercy-video-player/configuration",
    "/player/video/desktop-ui": "/nomercy-video-player/desktop-ui",
    "/player/video/events": "/nomercy-video-player/events",
    "/player/video/framework-react": "/nomercy-video-player/framework-react",
    "/player/video/framework-vue": "/nomercy-video-player/framework-vue",
    "/player/video/hls": "/nomercy-video-player/hls",
    "/player/video/migration-v1-v2": "/nomercy-video-player/migration-v1-v2",
    "/player/video/plugin-development": "/nomercy-video-player/plugin-development",
    "/player/video/quickstart": "/nomercy-video-player/quickstart",
    "/player/video/skipper": "/nomercy-video-player/skipper",
    "/player/video/subtitle-overlay": "/nomercy-video-player/subtitle-overlay",
    "/player/music/": "/nomercy-music-player/",
    "/player/music/api-methods": "/nomercy-music-player/api-methods",
    "/player/music/configuration": "/nomercy-music-player/configuration",
    "/player/music/crossfade": "/nomercy-music-player/crossfade",
    "/player/music/equalizer": "/nomercy-music-player/equalizer",
    "/player/music/events": "/nomercy-music-player/events",
    "/player/music/framework-react": "/nomercy-music-player/framework-react",
    "/player/music/framework-vue": "/nomercy-music-player/framework-vue",
    "/player/music/lyrics": "/nomercy-music-player/lyrics",
    "/player/music/migration-v1-v2": "/nomercy-music-player/migration-v1-v2",
    "/player/music/plugin-development": "/nomercy-music-player/plugin-development",
    "/player/music/quickstart": "/nomercy-music-player/quickstart",
    "/player/recipes/": "/nomercy-player-kit/recipes-index",
    "/player/recipes/auth-and-tokens": "/nomercy-video-player/recipes/auth-and-tokens",
    "/player/recipes/media-session": "/nomercy-video-player/recipes/media-session",
    "/player/recipes/persistence": "/nomercy-video-player/recipes/persistence",
    "/player/recipes/chapters": "/nomercy-video-player/recipes/chapters",
    "/player/recipes/keyboard-shortcuts": "/nomercy-video-player/recipes/keyboard-shortcuts",
    "/player/recipes/quality-selection": "/nomercy-video-player/recipes/quality-selection",
    "/player/recipes/subtitles": "/nomercy-video-player/recipes/subtitles",
    "/player/recipes/playlist-and-queue": "/nomercy-video-player/recipes/playlist-and-queue",
    "/player/recipes/crossfade-and-gapless": "/nomercy-music-player/recipes/crossfade-and-gapless",
    "/player/recipes/lyrics-and-equalizer": "/nomercy-music-player/recipes/lyrics-and-equalizer",
    "/player/advanced/": "/nomercy-player-kit/advanced/",
    "/player/advanced/custom-adapter": "/nomercy-player-kit/advanced/custom-adapter",
    "/player/advanced/custom-plugin": "/nomercy-player-kit/advanced/custom-plugin",
    "/player/advanced/multi-instance": "/nomercy-player-kit/advanced/multi-instance",
    "/player/advanced/custom-backend": "/nomercy-player-kit/advanced/writing-a-backend",
    "/player/advanced/distributed-playback": "/nomercy-video-player/advanced/distributed-playback",
    "/player/advanced/embedding": "/nomercy-video-player/advanced/embedding",
    "/player/advanced/migration-from-other-players": "/nomercy-video-player/advanced/migration-from-other-players",
    "/player/advanced/performance": "/nomercy-video-player/advanced/performance",
    "/player/advanced/server-side-rendering": "/nomercy-video-player/advanced/server-side-rendering",
    # /player/kit/<topic> paths that the original redirect map missed but
    # have direct /nomercy-player-kit/<topic> mirrors. Verified all 26
    # targets exist in src/content/nomercy-player-kit/en/.
    "/player/kit/audio-output": "/nomercy-player-kit/audio-output",
    "/player/kit/backlog": "/nomercy-player-kit/backlog",
    "/player/kit/cast": "/nomercy-player-kit/cast",
    "/player/kit/chapters": "/nomercy-player-kit/chapters",
    "/player/kit/device": "/nomercy-player-kit/device",
    "/player/kit/dispose": "/nomercy-player-kit/dispose",
    "/player/kit/events-reference": "/nomercy-player-kit/events-reference",
    "/player/kit/loading": "/nomercy-player-kit/loading",
    "/player/kit/media-tracks": "/nomercy-player-kit/media-tracks",
    "/player/kit/mutation-guards": "/nomercy-player-kit/mutation-guards",
    "/player/kit/overview": "/nomercy-player-kit/overview",
    "/player/kit/phase": "/nomercy-player-kit/phase",
    "/player/kit/platform": "/nomercy-player-kit/platform",
    "/player/kit/playback-state": "/nomercy-player-kit/playback-state",
    "/player/kit/player-state": "/nomercy-player-kit/player-state",
    "/player/kit/playlist-item": "/nomercy-player-kit/playlist-item",
    "/player/kit/plugin-registration": "/nomercy-player-kit/plugin-registration",
    "/player/kit/plugins-builtin": "/nomercy-player-kit/plugins-builtin",
    "/player/kit/queue": "/nomercy-player-kit/queue",
    "/player/kit/queue-navigation": "/nomercy-player-kit/queue-navigation",
    "/player/kit/seeking": "/nomercy-player-kit/seeking",
    "/player/kit/setup": "/nomercy-player-kit/setup",
    "/player/kit/storage": "/nomercy-player-kit/storage",
    "/player/kit/time": "/nomercy-player-kit/time",
    "/player/kit/transport": "/nomercy-player-kit/transport",
    "/player/kit/volume": "/nomercy-player-kit/volume",
    "/player/kit/types/classes": "/nomercy-player-kit/types/classes",
    "/player/kit/types/enums": "/nomercy-player-kit/types/enums",
    "/player/kit/types/errors": "/nomercy-player-kit/types/errors",
    "/player/kit/types/interfaces": "/nomercy-player-kit/types/interfaces",
    # /player/music and /player/video without trailing slash (old anchors)
    "/player/music": "/nomercy-music-player",
    "/player/video": "/nomercy-video-player",
    # Recipes that live under kit (auth, media-session, persistence are
    # kit-level concerns), wrongly linked under video/music in older docs.
    "/nomercy-video-player/recipes/auth-and-tokens": "/nomercy-player-kit/recipes/auth-and-tokens",
    "/nomercy-video-player/recipes/media-session": "/nomercy-player-kit/recipes/media-session",
    "/nomercy-video-player/recipes/persistence": "/nomercy-player-kit/recipes/persistence",
    "/nomercy-music-player/recipes/persistence": "/nomercy-player-kit/recipes/persistence",
    # writing-plugins → plugin-authoring (actual file name on disk)
    "/nomercy-player-kit/writing-plugins": "/nomercy-player-kit/plugin-authoring",
    # Per-plugin kit docs don't exist as separate pages — point at the
    # consolidated plugins-builtin reference until per-plugin pages land.
    "/nomercy-player-kit/plugins/audio-graph": "/nomercy-player-kit/plugins-builtin",
    "/nomercy-player-kit/plugins/embed": "/nomercy-player-kit/plugins-builtin",
    "/nomercy-player-kit/plugins/key-handler": "/nomercy-player-kit/plugins-builtin",
    "/nomercy-player-kit/plugins/message": "/nomercy-player-kit/plugins-builtin",
    "/nomercy-player-kit/plugins/tab-leader": "/nomercy-player-kit/plugins-builtin",
    # multi-instance lives under kit/advanced, not video/advanced
    "/nomercy-video-player/advanced/multi-instance": "/nomercy-player-kit/advanced/multi-instance",
}

# Longest-first to avoid `/player/` swallowing `/player/kit/`.
ORDERED = sorted(REDIRECTS.items(), key=lambda kv: len(kv[0]), reverse=True)


def rewrite_text(text: str) -> tuple[str, int]:
    """Apply every redirect substitution. Return (new_text, change_count)."""
    changes = 0
    for old_path, new_path in ORDERED:
        # Match links inside markdown `](...)` only — never raw text mentions.
        pattern = re.compile(r"\]\(" + re.escape(old_path) + r"(?=[#)?/])")
        new_text, n = pattern.subn(f"]({new_path}", text)
        if n:
            changes += n
            text = new_text
    return text, changes


def main() -> None:
    total_files = 0
    total_subs = 0
    for mdx in CONTENT_DIR.rglob("*.mdx"):
        original = mdx.read_text(encoding="utf-8")
        rewritten, n = rewrite_text(original)
        if n:
            mdx.write_text(rewritten, encoding="utf-8")
            total_files += 1
            total_subs += n
            print(f"{mdx.relative_to(REPO_ROOT)}: {n} replacements")
    print(f"\n{total_subs} replacements across {total_files} files.")


if __name__ == "__main__":
    main()
