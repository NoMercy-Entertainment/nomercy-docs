// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import path from "path";
import { fileURLToPath } from "url";

import { remarkPlugins } from "./src/lib/mdx/remark.ts";
import { rehypePlugins } from "./src/lib/mdx/rehype.ts";
import { recmaPlugins } from "./src/lib/mdx/recma.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://docs.nomercy.tv",
  redirects: {
    // Legacy /nomercy-player-kit/ URLs, kept working after the rename to core.
    "/nomercy-player-kit": "/nomercy-player-core/overview",
    "/nomercy-player-kit/[...slug]": "/nomercy-player-core/[...slug]",

    // -----------------------------------------------------------------------
    // /player/kit/ → /nomercy-player-core/
    // -----------------------------------------------------------------------
    "/player/kit/": "/nomercy-player-core/",
    "/player/kit/adapters": "/nomercy-player-core/adapters",
    "/player/kit/auth-fetch": "/nomercy-player-core/auth-fetch",
    "/player/kit/errors": "/nomercy-player-core/errors",
    "/player/kit/event-system": "/nomercy-player-core/event-system",
    "/player/kit/i18n": "/nomercy-player-core/i18n",
    "/player/kit/lifecycle": "/nomercy-player-core/lifecycle",
    "/player/kit/metrics": "/nomercy-player-core/metrics",
    "/player/kit/plugins": "/nomercy-player-core/plugins",
    "/player/kit/quickstart": "/nomercy-player-core/quickstart",
    "/player/kit/testing": "/nomercy-player-core/testing",

    // -----------------------------------------------------------------------
    // /player/ root pages → /nomercy-player-core/
    // -----------------------------------------------------------------------
    "/player/": "/nomercy-player-core/overview",
    "/player/architecture": "/nomercy-player-core/architecture",
    "/player/faq": "/nomercy-player-core/faq",
    "/player/migration-v1-v2": "/nomercy-player-core/migration-v1-v2",
    "/player/plugin-authoring": "/nomercy-player-core/plugin-authoring",
    "/player/plugin-standard": "/nomercy-player-core/plugin-standard",
    "/player/quickstart": "/nomercy-player-core/quickstart",
    "/player/troubleshooting": "/nomercy-player-core/troubleshooting",
    "/player/versioning": "/nomercy-player-core/versioning",

    // -----------------------------------------------------------------------
    // /player/video/ → /nomercy-video-player/
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // /player/music/ → /nomercy-music-player/
    // -----------------------------------------------------------------------
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

    // -----------------------------------------------------------------------
    // /player/recipes/ — split by destination per R5 placements (git log)
    // -----------------------------------------------------------------------
    "/player/recipes/": "/nomercy-player-core/recipes-index",
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

    // -----------------------------------------------------------------------
    // /player/advanced/ — split by destination per git log
    // -----------------------------------------------------------------------
    "/player/advanced/": "/nomercy-player-core/advanced/",
    "/player/advanced/custom-adapter": "/nomercy-player-core/advanced/custom-adapter",
    "/player/advanced/custom-plugin": "/nomercy-player-core/advanced/custom-plugin",
    "/player/advanced/multi-instance": "/nomercy-player-core/advanced/multi-instance",
    "/player/advanced/custom-backend": "/nomercy-player-core/advanced/writing-a-backend",
    "/player/advanced/distributed-playback": "/nomercy-video-player/advanced/distributed-playback",
    "/player/advanced/embedding": "/nomercy-video-player/advanced/embedding",
    "/player/advanced/migration-from-other-players": "/nomercy-video-player/advanced/migration-from-other-players",
    "/player/advanced/performance": "/nomercy-video-player/advanced/performance",
    "/player/advanced/server-side-rendering": "/nomercy-video-player/advanced/server-side-rendering",

    // -----------------------------------------------------------------------
    // Video plugin renames / removals (v2 API consolidation)
    // -----------------------------------------------------------------------
    "/nomercy-video-player/plugins/tv-ui": "/nomercy-video-player/plugins/tv-key-handler",
    "/nomercy-video-player/plugins/auto-advance": "/nomercy-video-player/recipes/playlist-and-queue",

    // -----------------------------------------------------------------------
    // /mediaserver/ → /nomercy-media-server/
    // -----------------------------------------------------------------------
    "/mediaserver/": "/nomercy-media-server/",
    "/mediaserver/index": "/nomercy-media-server/",
    "/mediaserver/configuration": "/nomercy-media-server/configuration",
    "/mediaserver/overview": "/nomercy-media-server/overview",

    // -----------------------------------------------------------------------
    // /app/ → /nomercy-app-web/
    // -----------------------------------------------------------------------
    "/app/": "/nomercy-app-web/",
    "/app/index": "/nomercy-app-web/",

    // -----------------------------------------------------------------------
    // Protocol-template archive pages → root (410 semantics not available in
    // Astro redirects; 301 to / is the safe fallback for SEO)
    // -----------------------------------------------------------------------
    "/contacts": "/",
    "/conversations": "/",
    "/messages": "/",
    "/groups": "/",
    "/attachments": "/",
    "/sdks": "/",
    "/webhooks": "/",
    "/quickstart": "/",
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react({
      include: ["**/react/**", "**/*.{tsx,jsx}"],
    }),
    mdx({
      remarkPlugins,
      rehypePlugins,
      recmaPlugins,
      // optimize: true pre-renders MDX to static HTML and bypasses the
      // `components` prop on <Content components={...} />. That kills every
      // custom MDX component override — most importantly the h2 → Heading
      // mapping that wraps headings in clickable `<a href="#id">` anchors.
      // Without that wrapper, URL-based heading deep links still work
      // (rehype-slug still adds ids) but users can't click a heading to
      // grab its link. Keep optimize off until we have a build-perf reason
      // strong enough to give up custom components.
      // Disable Astro's rehypeShiki so it never sees ::button; we handle highlighting in rehype
      syntaxHighlight: false,
    }),
  ],
  markdown: {
    // Completely disable Shiki - we handle syntax highlighting in rehype
    syntaxHighlight: "prism",
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // Ensure a single React instance to avoid "Invalid hook call" from duplicate React
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    ssr: {
      noExternal: ["react", "react-dom"],
    },
    server: {
      watch: {
        // Use polling for WSL/network filesystems - helps with file change detection
        usePolling: true,
        interval: 1000,
      },
    },
  },
  server: {
    host: true, // Use 'true' instead of '0.0.0.0' - allows Astro to auto-detect the best host
    port: 4321,
    allowedHosts: true,
  },
});
