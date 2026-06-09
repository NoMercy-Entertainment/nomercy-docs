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
  'nomercy-player-kit': [
    { group: "Getting Started", pages: ['overview', 'quickstart', 'versioning'] },
    { group: "Foundations", pages: ['architecture', 'foundations/plugins-and-adapters'] },
    { group: "Lifecycle", pages: ['lifecycle', 'setup', 'dispose'] },
    { group: "Playback Control", pages: ['transport', 'seeking', 'time', 'volume'] },
    { group: "Queue", pages: ['queue', 'queue-navigation', 'backlog', 'playlist-item'] },
    { group: "Tracks and Media", pages: ['media-tracks', 'chapters', 'loading'] },
    { group: "State", pages: ['player-state', 'playback-state', 'phase', 'mutation-guards'] },
    { group: "Auth and Fetch", pages: ['auth-fetch'] },
    { group: "Event System", pages: ['event-system', 'events-reference'] },
    { group: "Plugins", pages: ['plugins', 'plugin-registration', 'plugins-builtin'] },
    { group: "Adapter Ports", pages: ['adapters', 'storage', 'streams', 'cue-parsers', 'preload-transition', 'platform', 'adapters/clock', 'adapters/element-factory', 'adapters/event-bus', 'adapters/id-generator', 'adapters/lifecycle-registry', 'adapters/logger', 'adapters/media-list', 'adapters/realtime', 'adapters/url-resolver'] },
    { group: "Internationalisation", pages: ['i18n'] },
    { group: "Metrics and Diagnostics", pages: ['abr', 'metrics'] },
    { group: "Cast and Device", pages: ['cast', 'device', 'audio-output'] },
    { group: "DOM Utilities", pages: ['dom'] },
    { group: "Types Reference", pages: ['types/classes', 'types/errors', 'types/enums', 'types/interfaces'] },
    { group: "Writing Plugins", pages: ['plugin-authoring', 'plugin-standard'] },
    { group: "Recipes", pages: ['recipes-index', 'recipes/media-session', 'recipes/persistence', 'recipes/auth-and-tokens'] },
    { group: "Troubleshooting", pages: ['troubleshooting'] },
    { group: "Advanced", pages: ['experimental', 'advanced/custom-adapter', 'advanced/custom-plugin', 'advanced/writing-a-backend', 'advanced/multi-instance', 'testing'] },
    { group: "Reference", pages: ['changelog', 'errors', 'faq'] },
    { group: "Migration", pages: ['migration-v1-v2'] },
  ],
  'nomercy-video-player': [
    { group: "Getting Started", pages: ['overview', 'installation', 'quickstart', 'configuration'] },
    { group: "Building", pages: ['plugin-development', 'guides/build-ui-overview', 'guides/build-ui-1-shell-and-layout', 'guides/build-ui-2-play-pause', 'guides/build-ui-3-progress-bar', 'guides/build-ui-4-time-and-skip', 'guides/build-ui-5-volume', 'guides/build-ui-6-title-bar', 'guides/build-ui-7-fullscreen-and-speed', 'guides/build-ui-8-selectors', 'guides/build-ui-9-seek-preview', 'guides/build-ui-10-touch-zones'] },
    { group: "Framework Integration", pages: ['framework-integration', 'framework-vue', 'framework-react', 'framework-svelte', 'framework-angular', 'framework-vanilla'] },
    { group: "Plugins", pages: ['plugins/desktop-ui', 'plugins/subtitle-overlay', 'plugins/octopus', 'plugins/touch-zones', 'plugins/key-handler', 'plugins/skipper', 'plugins/drm', 'plugins/live-transcoding', 'plugins/cast-sender', 'plugins/media-session', 'plugins/tv-key-handler', 'plugins/tab-leader', 'plugins/message', 'plugins/embed', 'plugins/audio-graph', 'plugins/v1-compat'] },
    { group: "API Reference", pages: ['api-methods', 'api/factory', 'api/playback-state', 'api/aspect-ratio', 'api/cycling', 'api/backend', 'api/kit-methods', 'api/utility-functions', 'events', 'types', 'playlist-item'] },
    { group: "Adapters", pages: ['adapters/video-backend', 'adapters/thumbnail-source', 'adapters/chapter-source', 'adapters/subtitle-style-store'] },
    { group: "Recipes", pages: ['recipes/overview', 'recipes/subtitles', 'recipes/chapters', 'recipes/quality-selection', 'recipes/playlist-and-queue', 'recipes/keyboard-shortcuts', 'recipes/live-transcoding'] },
    { group: "Advanced", pages: ['hls', 'advanced/server-side-rendering', 'advanced/custom-adapter', 'advanced/embedding', 'advanced/distributed-playback', 'advanced/performance', 'advanced/migration-from-other-players'] },
    { group: "Troubleshooting", pages: ['troubleshooting', 'faq'] },
    { group: "Migration", pages: ['migration-v1-v2'] },
  ],
  'nomercy-music-player': [
    { group: "Getting Started", pages: ['overview', 'installation', 'quickstart', 'configuration', 'architecture'] },
    { group: "Framework Integration", pages: ['framework-vue', 'framework-react'] },
    { group: "Plugins", pages: ['plugins/auto-advance', 'plugins/lyrics', 'plugins/cast-sender', 'plugins/media-session', 'plugins/key-handler', 'plugins/music-ui', 'plugins/tab-leader', 'plugins/group-listening', 'plugins/drm', 'plugins/live-transcoding', 'plugins/embed', 'plugins/message', 'plugins/audio-graph', 'lyrics', 'equalizer', 'plugin-development', 'plugins/v1-compat'] },
    { group: "API Reference", pages: ['api-methods', 'api/factory', 'api/backend', 'api/crossfade', 'api/kit-methods', 'crossfade', 'events', 'types', 'playlist-item'] },
    { group: "Adapters", pages: ['backends/overview', 'backends/audio-element', 'backends/web-audio', 'backends/backend-interface', 'adapters/lyric-source', 'adapters/scrobbler', 'adapters/now-playing-art', 'adapters/playlist-generator', 'adapters/similarity-engine'] },
    { group: "Recipes", pages: ['recipes/overview', 'recipes/playlist-and-queue', 'recipes/crossfade-and-gapless', 'recipes/lyrics-and-equalizer'] },
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
