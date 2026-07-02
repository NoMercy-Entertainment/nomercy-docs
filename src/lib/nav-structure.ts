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

export const navStructure: Record<string, NavGroupDef[]> = {
  'nomercy-media-server': [
    { group: "Getting Started", pages: ['installation-guide', 'overview', 'installation/windows', 'installation/linux-deb', 'installation/linux-rpm', 'installation/linux-arch', 'installation/macos', 'installation/docker', 'installation/nas', 'first-run'] },
    { group: "Plugins", pages: ['plugins/overview', 'plugins/installing', 'plugins/trusted-publishers', 'plugins/developing'] },
    { group: "Configuration", pages: ['configuration', 'libraries', 'users', 'storage', 'networking'] },
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
  'nomercy-app-android': [
    { group: "Getting Started", pages: ['overview', 'install/phone', 'install/tv', 'connecting'] },
    { group: "Setup", pages: ['setup/name-device', 'setup/select-server', 'setup/server-offline', 'setup/login-phone', 'setup/login-tv', 'setup/auth-handoff'] },
    { group: "Browsing", pages: ['home', 'libraries', 'library', 'search', 'info', 'person'] },
    { group: "Watching Video", pages: ['watch', 'watch/subtitles', 'watch/quality', 'watch/cast', 'watch/remote-control', 'watch/tv-remote'] },
    { group: "Listening to Music", pages: ['music/home', 'music/cards', 'music/list', 'music/genres', 'music/player', 'music/mini-player', 'music/queue', 'music/cast'] },
    { group: "Preferences", pages: ['preferences/display', 'preferences/profile', 'preferences/devices', 'preferences/about'] },
    { group: "Dashboard (Admin)", pages: ['dashboard/overview', 'dashboard/libraries', 'dashboard/users', 'dashboard/devices', 'dashboard/server-info', 'dashboard/logs'] },
    { group: "Notifications & Background", pages: ['notifications', 'foreground-service'] },
    { group: "Troubleshooting", pages: ['troubleshooting'] },
  ],
  // v2 rebuild (see .rebuild/progress.md) — full 7-stage arc: introduction,
  // quickstart, tour, build, recipes, plugins-adapters, reference.
  'nomercy-player-core': [
    { group: "Getting Started", pages: ['introduction', 'quickstart'] },
    { group: "Guided Tour", pages: ['tour/lifecycle', 'tour/event-bus', 'tour/transport', 'tour/time-and-state', 'tour/queue', 'tour/plugin-base', 'tour/adapters', 'tour/i18n', 'tour/cue-parsers', 'tour/errors'] },
    { group: "Build a Player", pages: ['build/compose-methods', 'build/backend-contract', 'build/add-a-plugin', 'build/add-i18n'] },
    { group: "Recipes", pages: ['recipes/swap-an-adapter', 'recipes/custom-cue-parser', 'recipes/auth-fetch', 'recipes/custom-url-resolver'] },
    { group: "Plugins & Adapters", pages: ['plugins-adapters/audio-graph', 'plugins-adapters/equalizer', 'plugins-adapters/mixer', 'plugins-adapters/canvas', 'plugins-adapters/spectrum', 'plugins-adapters/visualization', 'plugins-adapters/cast-sender', 'plugins-adapters/embed', 'plugins-adapters/key-handler', 'plugins-adapters/media-session', 'plugins-adapters/message', 'plugins-adapters/tab-leader', 'plugins-adapters/adapter-storage', 'plugins-adapters/adapter-platform', 'plugins-adapters/adapter-stream-source', 'plugins-adapters/adapter-url-resolver', 'plugins-adapters/adapter-translator', 'plugins-adapters/adapter-cue-parser', 'plugins-adapters/adapter-preload-strategy', 'plugins-adapters/adapter-transition-strategy', 'plugins-adapters/adapter-shuffle-strategy', 'plugins-adapters/adapter-realtime-channel'] },
    { group: "Reference", pages: ['reference/composition', 'reference/config', 'reference/events', 'reference/types', 'reference/errors', 'reference/utilities'] },
  ],
  // v2 rebuild (see .rebuild/progress.md) — full 7-stage arc: introduction,
  // quickstart, tour, build, recipes, plugins-adapters, reference.
  'nomercy-video-player': [
    { group: "Getting Started", pages: ['introduction', 'quickstart'] },
    { group: "Guided Tour", pages: ['tour/transport', 'tour/volume', 'tour/queue', 'tour/subtitles', 'tour/audio-tracks', 'tour/quality', 'tour/chapters', 'tour/state-events'] },
    { group: "Build a Player", pages: ['build/shell', 'build/scrubber', 'build/volume', 'build/subtitle-menu', 'build/fullscreen'] },
    { group: "Recipes", pages: ['recipes/vue-integration', 'recipes/react-integration', 'recipes/svelte-integration', 'recipes/vanilla-integration', 'recipes/resume-playback', 'recipes/keyboard-shortcuts', 'recipes/quality-selection', 'recipes/playlist-queue', 'recipes/auth-tokens'] },
    { group: "Plugins & Adapters", pages: ['plugins-adapters/desktop-ui', 'plugins-adapters/tv-key-handler', 'plugins-adapters/key-handler', 'plugins-adapters/cast-sender', 'plugins-adapters/subtitle-overlay', 'plugins-adapters/octopus', 'plugins-adapters/media-session', 'plugins-adapters/drm', 'plugins-adapters/touch-zones', 'plugins-adapters/live-transcoding', 'plugins-adapters/v1-compat', 'plugins-adapters/adapter-video-backend', 'plugins-adapters/adapter-chapter-source', 'plugins-adapters/adapter-thumbnail-source', 'plugins-adapters/adapter-subtitle-style-store'] },
    { group: "Reference", pages: ['reference/player-methods', 'reference/config', 'reference/events', 'reference/types'] },
  ],
  'nomercy-music-player': [
    { group: "Getting Started", pages: ['overview', 'installation', 'quickstart'] },
    { group: "Foundations", pages: ['architecture'] },
    { group: "Framework Integration", pages: ['framework-vue', 'framework-react'] },
    { group: "Plugins", pages: ['plugins/auto-advance', 'plugins/lyrics', 'plugins/cast-sender', 'plugins/media-session', 'plugins/key-handler', 'plugins/music-ui', 'plugins/tab-leader', 'plugins/group-listening', 'plugins/drm', 'plugins/live-transcoding', 'plugins/embed', 'plugins/message', 'plugins/audio-graph', 'lyrics', 'equalizer', 'plugin-development', 'plugins/v1-compat'] },
    { group: "API Reference", pages: ['configuration', 'api-methods', 'api/factory', 'api/backend', 'api/crossfade', 'api/kit-methods', 'crossfade', 'events', 'types', 'playlist-item'] },
    { group: "Adapters", pages: ['backends/overview', 'backends/audio-element', 'backends/web-audio', 'backends/backend-interface', 'adapters/lyric-source', 'adapters/scrobbler', 'adapters/now-playing-art', 'adapters/playlist-generator', 'adapters/similarity-engine'] },
    { group: "Recipes", pages: ['recipes/overview', 'recipes/playlist-and-queue', 'recipes/crossfade-and-gapless', 'recipes/lyrics-and-equalizer', 'recipes/authentication'] },
    { group: "Advanced", pages: ['advanced/crossfade-tuning', 'advanced/equalizer-customization', 'advanced/lyrics-sync-deep-dive', 'advanced/custom-plugin', 'advanced/writing-an-audio-backend'] },
    { group: "Troubleshooting", pages: ['troubleshooting', 'faq'] },
    { group: "Migration", pages: ['migration-v1-v2'] },
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
