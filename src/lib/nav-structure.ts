// Sidebar structure — the SINGLE source of truth for navigation grouping and order.
//
// To reorder a page:        move its slug within a group's `pages` array.
// To move a page elsewhere:  move its slug to another group's `pages`.
// To reorder sections:       move the whole { group, pages } block.
// To rename a section label: edit the `group` string (must exist in categoryOrder in navigation.ts).
//
// Page titles come from each page's frontmatter `title`. This file owns ONLY structure —
// pages no longer need `category`/`order` in frontmatter. Slugs are the path under
// <collection>/en/ without the .mdx extension. A non-draft page missing here, or a slug
// here with no matching file, fails `npm run check:nav` (runs in the build).

export interface NavGroupDef {
  group: string;
  pages: string[];
}

import { nmComponentsNav } from './nav-structure.nm';

export const navStructure: Record<string, NavGroupDef[]> = {
  // Generated from the component manifest, so a new component cannot be added
  // to the system and left out of the docs.
  'nm-components': nmComponentsNav,

  'nomercy-media-server': [
    { group: "Getting Started", pages: ['installation-guide', 'overview', 'installation/windows', 'installation/linux-deb', 'installation/linux-rpm', 'installation/linux-arch', 'installation/macos', 'installation/docker', 'installation/nas', 'first-run'] },
    { group: "Plugins", pages: ['plugins/overview', 'plugins/installing', 'plugins/repository-index', 'plugins/trusted-publishers', 'plugins/developing'] },
    { group: "Configuration", pages: ['configuration', 'libraries', 'users', 'storage', 'networking', 'security'] },
    { group: "The CLI", pages: ['cli/overview', 'cli/start-stop', 'cli/logs', 'cli/config', 'cli/plugins-cli', 'cli/queue', 'cli/update', 'cli/autostart'] },
    { group: "Media", pages: ['media/scanning', 'media/metadata', 'media/specials', 'media/optical'] },
    { group: "Encoding", pages: ['encoding/overview', 'encoding/profiles', 'encoding/hardware', 'encoding/formats', 'encoding/history'] },
    { group: "Remote Access & Sync", pages: ['connect/overview', 'connect/watch-parties'] },
    { group: "Maintenance", pages: ['maintenance/backups', 'maintenance/upgrade', 'maintenance/migrate'] },
    { group: "Troubleshooting", pages: ['troubleshooting/logs', 'troubleshooting/common-issues', 'troubleshooting/diagnostics', 'troubleshooting/error-codes'] },
  ],
  'nomercy-app-web': [
    { group: "Getting Started", pages: ['overview', 'platforms', 'connecting'] },
    { group: "Setup", pages: ['setup/name-device', 'setup/select-server', 'setup/first-run', 'setup/server-offline'] },
    { group: "Browsing", pages: ['home', 'libraries', 'library', 'search', 'info', 'person'] },
    { group: "Watching & Listening", pages: ['watch', 'music/home', 'music/artist', 'music/album', 'music/playlist', 'subtitles', 'chromecast', 'quality'] },
    { group: "Preferences", pages: ['preferences/display', 'preferences/subtitles', 'preferences/controls', 'preferences/profile', 'preferences/devices'] },
    { group: "Dashboard (Admin)", pages: ['dashboard/overview', 'dashboard/libraries', 'dashboard/users', 'dashboard/encoder-profiles', 'dashboard/hardware', 'dashboard/storage', 'dashboard/devices', 'dashboard/dlna', 'dashboard/ripper', 'dashboard/specials', 'dashboard/recommendations', 'dashboard/content-analysis', 'dashboard/distribution', 'dashboard/plugins', 'dashboard/logs', 'dashboard/schedule', 'dashboard/notifications', 'dashboard/live-sessions', 'dashboard/metadata', 'dashboard/activity'] },
    { group: "Troubleshooting", pages: ['troubleshooting'] },
  ],
  // v2 rebuild (see .rebuild/progress.md) — full 7-stage arc: introduction,
  // quickstart, tour, build, recipes, plugins-adapters, reference.
  'nomercy-player-core': [
    { group: "Getting Started", pages: ['introduction', 'quickstart'] },
    { group: "Guided Tour", pages: ['tour/lifecycle', 'tour/event-bus', 'tour/transport', 'tour/time-and-state', 'tour/queue', 'tour/composition-boundary', 'tour/plugin-base', 'tour/adapters', 'tour/i18n', 'tour/cue-parsers', 'tour/errors'] },
    { group: "Build a Player", pages: ['build/compose-methods', 'build/backend-contract', 'build/add-a-plugin', 'build/add-i18n'] },
    { group: "Recipes", pages: ['recipes/swap-an-adapter', 'recipes/custom-cue-parser', 'recipes/auth-fetch', 'recipes/custom-url-resolver'] },
    { group: "Plugins & Adapters", pages: ['plugins-adapters/audio-graph', 'plugins-adapters/equalizer', 'plugins-adapters/mixer', 'plugins-adapters/canvas', 'plugins-adapters/spectrum', 'plugins-adapters/visualization', 'plugins-adapters/cast-sender', 'plugins-adapters/embed', 'plugins-adapters/key-handler', 'plugins-adapters/media-session', 'plugins-adapters/message', 'plugins-adapters/tab-leader', 'plugins-adapters/adapter-storage', 'plugins-adapters/adapter-platform', 'plugins-adapters/adapter-stream-source', 'plugins-adapters/adapter-url-resolver', 'plugins-adapters/adapter-translator', 'plugins-adapters/adapter-cue-parser', 'plugins-adapters/adapter-preload-strategy', 'plugins-adapters/adapter-transition-strategy', 'plugins-adapters/adapter-shuffle-strategy', 'plugins-adapters/adapter-realtime-channel'] },
    { group: "Reference", pages: ['reference/composition', 'reference/config', 'reference/events', 'reference/types', 'reference/errors', 'reference/utilities', 'reference/metrics-and-accessibility', 'reference/testing'] },
    { group: "Native (KMP)", pages: ['native/quickstart', 'native/migration', 'native/methods', 'native/events', 'native/errors'] },
  ],
  // v2 rebuild (see .rebuild/progress.md) — full 7-stage arc: introduction,
  // quickstart, tour, build, recipes, plugins-adapters, reference.
  'nomercy-video-player': [
    { group: "Getting Started", pages: ['introduction', 'quickstart'] },
    { group: "Guided Tour", pages: ['tour/transport', 'tour/volume', 'tour/queue', 'tour/subtitles', 'tour/audio-tracks', 'tour/quality', 'tour/chapters', 'tour/state-events'] },
    { group: "Build a Player", pages: ['build/shell', 'build/play-pause', 'build/progress-bar', 'build/time-skip', 'build/volume', 'build/title-bar', 'build/fullscreen-speed', 'build/selectors', 'build/seek-preview', 'build/full-plugin'] },
    { group: "Recipes", pages: ['recipes/vue-integration', 'recipes/react-integration', 'recipes/svelte-integration', 'recipes/vanilla-integration', 'recipes/resume-playback', 'recipes/keyboard-shortcuts', 'recipes/quality-selection', 'recipes/playlist-queue', 'recipes/auth-tokens', 'recipes/migrate-from-v1'] },
    { group: "Plugins & Adapters", pages: ['plugins-adapters/plugin-development', 'plugins-adapters/desktop-ui', 'plugins-adapters/tv-key-handler', 'plugins-adapters/key-handler', 'plugins-adapters/cast-sender', 'plugins-adapters/subtitle-overlay', 'plugins-adapters/octopus', 'plugins-adapters/media-session', 'plugins-adapters/drm', 'plugins-adapters/touch-zones', 'plugins-adapters/adapter-video-backend', 'plugins-adapters/adapter-chapter-source', 'plugins-adapters/adapter-thumbnail-source', 'plugins-adapters/adapter-subtitle-style-store'] },
    { group: "Reference", pages: ['reference/config', 'reference/player-methods', 'reference/events', 'reference/types'] },
    { group: "Native (KMP)", pages: ['native/quickstart', 'native/migration', 'native/methods', 'native/events'] },
  ],
  // v2 rebuild (see .rebuild/progress.md) — full 7-stage arc: introduction,
  // quickstart, tour, build, recipes, plugins-adapters, reference.
  'nomercy-music-player': [
    { group: "Getting Started", pages: ['introduction', 'quickstart'] },
    { group: "Guided Tour", pages: ['tour/transport', 'tour/time', 'tour/volume', 'tour/queue', 'tour/crossfade', 'tour/equalizer', 'tour/audio-output', 'tour/lyrics', 'tour/state-events'] },
    { group: "Build a Player", pages: ['build/shell', 'build/scrubber', 'build/volume', 'build/track-list', 'build/now-playing'] },
    { group: "Recipes", pages: ['recipes/vue-integration', 'recipes/react-integration', 'recipes/svelte-integration', 'recipes/vanilla-integration', 'recipes/crossfade-gapless', 'recipes/lyrics-sync', 'recipes/equalizer-presets', 'recipes/scrobbling', 'recipes/queue-playlist', 'recipes/audio-output-switching', 'recipes/migrate-from-v1'] },
    { group: "Plugins & Adapters", pages: ['plugins-adapters/plugin-development', 'plugins-adapters/scrobble', 'plugins-adapters/auto-advance', 'plugins-adapters/lyrics', 'plugins-adapters/media-session', 'plugins-adapters/key-handler', 'plugins-adapters/cast-sender', 'plugins-adapters/adapter-audio-backend', 'plugins-adapters/adapter-similarity-engine'] },
    { group: "Reference", pages: ['reference/config', 'reference/player-methods', 'reference/events', 'reference/types'] },
    { group: "Native (KMP)", pages: ['native/quickstart', 'native/migration', 'native/methods', 'native/events'] },
  ],
  'nomercy-api': [
    { group: "Getting Started", pages: ['overview'] },
    { group: "Media", pages: ['rest/home', 'rest/libraries', 'rest/movies', 'rest/tv-shows', 'rest/collections', 'rest/people', 'rest/genres', 'rest/search', 'rest/user-data', 'rest/specials', 'rest/content-segments'] },
    { group: "Reference", pages: ['kitchen-sink'] },
    { group: "Guides", pages: ['authentication', 'pagination', 'errors'] },
    { group: "Music", pages: ['rest/music', 'rest/artists', 'rest/albums', 'rest/tracks', 'rest/playlists', 'rest/music-genres'] },
    { group: "Dashboard", pages: ['rest/server', 'rest/config', 'rest/libraries-admin', 'rest/users-admin', 'rest/devices', 'rest/encoder-profiles', 'rest/encoder-bundles', 'rest/encoding-history', 'rest/encoding-presets', 'rest/hardware-benchmark', 'rest/optical-media', 'rest/plugins-api', 'rest/recommendations', 'rest/server-activity', 'rest/storage-browser', 'rest/tasks', 'rest/workers', 'rest/logs-api'] },
    { group: "Streaming", pages: ['rest/streaming'] },
    { group: "SignalR Hubs", pages: ['signalr/overview', 'signalr/video-hub', 'signalr/music-hub', 'signalr/device-hub', 'signalr/drives-hub', 'signalr/content-analysis-hub', 'signalr/cast-hub', 'signalr/dashboard-hub', 'signalr/ripper-hub'] },
  ],
};
