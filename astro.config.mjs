// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { remarkPlugins } from "./src/lib/mdx/remark.ts";
import { rehypePlugins } from "./src/lib/mdx/rehype.ts";
import { recmaPlugins } from "./src/lib/mdx/recma.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://docs.nomercy.tv",
  redirects: {
    // Legacy /nomercy-player-kit/ URLs, kept working after the rename to core.
    // /overview was core's old landing slug; core now lands on the base route.
    "/nomercy-player-kit": "/nomercy-player-core/",
    "/nomercy-player-kit/[...slug]": "/nomercy-player-core/[...slug]",
    // The wildcard above only resolves slugs that still exist as [...slug]
    // routes in nomercy-player-core; introduction moved to the base route
    // (see the trio block below), so it needs its own exact-match entry.
    "/nomercy-player-kit/introduction": "/nomercy-player-core/",

    // -----------------------------------------------------------------------
    // /player/kit/ → /nomercy-player-core/
    // -----------------------------------------------------------------------
    "/player/kit/": "/nomercy-player-core/",
    "/player/kit/adapters": "/nomercy-player-core/tour/adapters",
    "/player/kit/auth-fetch": "/nomercy-player-core/recipes/auth-fetch",
    "/player/kit/errors": "/nomercy-player-core/tour/errors",
    "/player/kit/event-system": "/nomercy-player-core/tour/event-bus",
    "/player/kit/i18n": "/nomercy-player-core/tour/i18n",
    "/player/kit/lifecycle": "/nomercy-player-core/tour/lifecycle",
    "/player/kit/metrics": "/nomercy-player-core/reference/metrics-and-accessibility",
    "/player/kit/plugins": "/nomercy-player-core/tour/plugin-base",
    "/player/kit/quickstart": "/nomercy-player-core/quickstart",
    "/player/kit/testing": "/nomercy-player-core/reference/testing",

    // -----------------------------------------------------------------------
    // /player/ root pages → /nomercy-player-core/
    // No successor page exists for architecture / faq / migration-v1-v2 (core
    // has no v1 compat plugin of its own) / troubleshooting / versioning —
    // same "301 to section root" fallback used below for the protocol-template
    // archive, rather than a redirect chain into a 404.
    // -----------------------------------------------------------------------
    "/player/": "/nomercy-player-core/",
    "/player/architecture": "/nomercy-player-core/reference/composition",
    "/player/faq": "/nomercy-player-core/",
    "/player/migration-v1-v2": "/nomercy-player-core/",
    "/player/plugin-authoring": "/nomercy-player-core/build/add-a-plugin",
    "/player/plugin-standard": "/nomercy-player-core/tour/plugin-base",
    "/player/quickstart": "/nomercy-player-core/quickstart",
    "/player/troubleshooting": "/nomercy-player-core/",
    "/player/versioning": "/nomercy-player-core/",

    // -----------------------------------------------------------------------
    // /player/video/ → /nomercy-video-player/
    // -----------------------------------------------------------------------
    "/player/video/": "/nomercy-video-player/",
    "/player/video/api-methods": "/nomercy-video-player/reference/player-methods",
    "/player/video/cast-sender": "/nomercy-video-player/plugins-adapters/cast-sender",
    "/player/video/chapters": "/nomercy-video-player/tour/chapters",
    "/player/video/configuration": "/nomercy-video-player/reference/config",
    "/player/video/desktop-ui": "/nomercy-video-player/plugins-adapters/desktop-ui",
    "/player/video/events": "/nomercy-video-player/reference/events",
    "/player/video/framework-react": "/nomercy-video-player/recipes/react-integration",
    "/player/video/framework-vue": "/nomercy-video-player/recipes/vue-integration",
    "/player/video/hls": "/nomercy-video-player/plugins-adapters/adapter-video-backend",
    "/player/video/migration-v1-v2": "/nomercy-video-player/recipes/migrate-from-v1",
    "/player/video/plugin-development": "/nomercy-video-player/plugins-adapters/plugin-development",
    "/player/video/quickstart": "/nomercy-video-player/quickstart",
    // v1's skip-segment feature has no v2 data model yet — see migrate-from-v1's
    // "What has no v2 equivalent" section rather than a page that doesn't exist.
    "/player/video/skipper": "/nomercy-video-player/recipes/migrate-from-v1",
    "/player/video/subtitle-overlay": "/nomercy-video-player/plugins-adapters/subtitle-overlay",

    // -----------------------------------------------------------------------
    // /player/music/ → /nomercy-music-player/
    // -----------------------------------------------------------------------
    "/player/music/": "/nomercy-music-player/",
    "/player/music/api-methods": "/nomercy-music-player/reference/player-methods",
    "/player/music/configuration": "/nomercy-music-player/reference/config",
    "/player/music/crossfade": "/nomercy-music-player/tour/crossfade",
    "/player/music/equalizer": "/nomercy-music-player/tour/equalizer",
    "/player/music/events": "/nomercy-music-player/reference/events",
    "/player/music/framework-react": "/nomercy-music-player/recipes/react-integration",
    "/player/music/framework-vue": "/nomercy-music-player/recipes/vue-integration",
    "/player/music/lyrics": "/nomercy-music-player/tour/lyrics",
    "/player/music/migration-v1-v2": "/nomercy-music-player/recipes/migrate-from-v1",
    "/player/music/plugin-development": "/nomercy-music-player/plugins-adapters/plugin-development",
    "/player/music/quickstart": "/nomercy-music-player/quickstart",

    // -----------------------------------------------------------------------
    // /player/recipes/ — split by destination per R5 placements (git log)
    // -----------------------------------------------------------------------
    "/player/recipes/": "/nomercy-player-core/",
    "/player/recipes/auth-and-tokens": "/nomercy-video-player/recipes/auth-tokens",
    "/player/recipes/media-session": "/nomercy-video-player/plugins-adapters/media-session",
    "/player/recipes/persistence": "/nomercy-video-player/recipes/resume-playback",
    "/player/recipes/chapters": "/nomercy-video-player/tour/chapters",
    "/player/recipes/keyboard-shortcuts": "/nomercy-video-player/recipes/keyboard-shortcuts",
    "/player/recipes/quality-selection": "/nomercy-video-player/recipes/quality-selection",
    "/player/recipes/subtitles": "/nomercy-video-player/tour/subtitles",
    "/player/recipes/playlist-and-queue": "/nomercy-video-player/recipes/playlist-queue",
    "/player/recipes/crossfade-and-gapless": "/nomercy-music-player/recipes/crossfade-gapless",
    "/player/recipes/lyrics-and-equalizer": "/nomercy-music-player/recipes/lyrics-sync",

    // -----------------------------------------------------------------------
    // /player/advanced/ — split by destination per git log. None of these
    // sub-pages exist today; each points at the current page that covers the
    // same ground (SSR-safety and multi-instance resolution both live in
    // Composition Primitives, distributed playback's clock hook lives in
    // Metrics/Clock/Accessibility) instead of a redirect chain into a 404.
    // -----------------------------------------------------------------------
    "/player/advanced/": "/nomercy-player-core/",
    "/player/advanced/custom-adapter": "/nomercy-player-core/recipes/swap-an-adapter",
    "/player/advanced/custom-plugin": "/nomercy-player-core/build/add-a-plugin",
    "/player/advanced/multi-instance": "/nomercy-player-core/reference/composition",
    "/player/advanced/custom-backend": "/nomercy-player-core/build/backend-contract",
    "/player/advanced/distributed-playback": "/nomercy-player-core/reference/metrics-and-accessibility",
    "/player/advanced/embedding": "/nomercy-player-core/plugins-adapters/embed",
    "/player/advanced/migration-from-other-players": "/nomercy-video-player/recipes/migrate-from-v1",
    "/player/advanced/performance": "/nomercy-video-player/tour/quality",
    "/player/advanced/server-side-rendering": "/nomercy-player-core/reference/composition",

    // -----------------------------------------------------------------------
    // Video plugin renames / removals (v2 API consolidation)
    // -----------------------------------------------------------------------
    "/nomercy-video-player/plugins/tv-ui": "/nomercy-video-player/plugins-adapters/tv-key-handler",
    // video-player never had its own auto-advance plugin — the v1 concept is
    // now the video-native `autoAdvance` config field; music's real
    // AutoAdvancePlugin is a different library's page, not this one's target.
    "/nomercy-video-player/plugins/auto-advance": "/nomercy-video-player/reference/config",

    // -----------------------------------------------------------------------
    // Trio introduction pages now render at the section base route
    // (index.astro loads en/introduction.mdx directly) instead of at
    // /introduction, so the old sub-route redirects here instead of
    // duplicating the same content at two URLs.
    // -----------------------------------------------------------------------
    "/nomercy-player-core/introduction": "/nomercy-player-core/",
    "/nomercy-video-player/introduction": "/nomercy-video-player/",
    "/nomercy-music-player/introduction": "/nomercy-music-player/",

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
    // /nomercy-app-android/ → / (section archived 2026-08: app retired,
    // superseded by nomercy-app-kmp, which has no docs-site section yet; same
    // "301 to /" fallback as the protocol-template archive below)
    // -----------------------------------------------------------------------
    "/nomercy-app-android": "/",
    "/nomercy-app-android/connecting": "/",
    "/nomercy-app-android/dashboard/devices": "/",
    "/nomercy-app-android/dashboard/libraries": "/",
    "/nomercy-app-android/dashboard/logs": "/",
    "/nomercy-app-android/dashboard/overview": "/",
    "/nomercy-app-android/dashboard/server-info": "/",
    "/nomercy-app-android/dashboard/users": "/",
    "/nomercy-app-android/foreground-service": "/",
    "/nomercy-app-android/home": "/",
    "/nomercy-app-android/info": "/",
    "/nomercy-app-android/install/phone": "/",
    "/nomercy-app-android/install/tv": "/",
    "/nomercy-app-android/libraries": "/",
    "/nomercy-app-android/library": "/",
    "/nomercy-app-android/music/cards": "/",
    "/nomercy-app-android/music/cast": "/",
    "/nomercy-app-android/music/genres": "/",
    "/nomercy-app-android/music/home": "/",
    "/nomercy-app-android/music/list": "/",
    "/nomercy-app-android/music/mini-player": "/",
    "/nomercy-app-android/music/player": "/",
    "/nomercy-app-android/music/queue": "/",
    "/nomercy-app-android/notifications": "/",
    "/nomercy-app-android/overview": "/",
    "/nomercy-app-android/person": "/",
    "/nomercy-app-android/preferences/about": "/",
    "/nomercy-app-android/preferences/devices": "/",
    "/nomercy-app-android/preferences/display": "/",
    "/nomercy-app-android/preferences/profile": "/",
    "/nomercy-app-android/search": "/",
    "/nomercy-app-android/setup/auth-handoff": "/",
    "/nomercy-app-android/setup/login-phone": "/",
    "/nomercy-app-android/setup/login-tv": "/",
    "/nomercy-app-android/setup/name-device": "/",
    "/nomercy-app-android/setup/select-server": "/",
    "/nomercy-app-android/setup/server-offline": "/",
    "/nomercy-app-android/troubleshooting": "/",
    "/nomercy-app-android/watch": "/",
    "/nomercy-app-android/watch/cast": "/",
    "/nomercy-app-android/watch/quality": "/",
    "/nomercy-app-android/watch/remote-control": "/",
    "/nomercy-app-android/watch/subtitles": "/",
    "/nomercy-app-android/watch/tv-remote": "/",

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
      dedupe: ["react", "react-dom", "react/jsx-runtime"],
    },
    optimizeDeps: {
      // Pre-bundle the deps every layout island pulls, so Vite never discovers
      // them mid-session and re-optimizes (which invalidates the hash the SSR'd
      // HTML already referenced and 504s "Outdated Optimize Dep", breaking
      // island hydration). Keeping react here alongside dedupe also pins a
      // single React copy through the pre-bundle.
      include: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "framer-motion",
        "zustand",
        "@headlessui/react",
        "clsx",
        "@nomercy-entertainment/nomercy-player-core",
        "@nomercy-entertainment/nomercy-video-player",
        "@nomercy-entertainment/nomercy-music-player",
        // Deep plugin subpath exports a docs example imports directly
        // (`.../plugins/<name>`) are a SEPARATE dependency graph entry from
        // the package's main export above — Vite doesn't pre-bundle them
        // just because the parent package is listed. Left out, a page whose
        // `PlayerExample` island dynamically imports that example module
        // fails in a production build/preview with "Failed to fetch
        // dynamically imported module" (the un-pre-bundled subpath never
        // gets a resolvable chunk); dev mode hides it via Vite's on-demand
        // optimize-on-discovery. Add every plugin subpath a `src/examples/`
        // file imports here — this is the exhaustive, verified list, not a
        // sample.
        "@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui",
        "@nomercy-entertainment/nomercy-video-player/plugins/subtitle-overlay",
        "@nomercy-entertainment/nomercy-music-player/plugins/lyrics",
      ],
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
