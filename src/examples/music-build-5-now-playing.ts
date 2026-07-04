// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 5: now-playing (cover, title, artist) plus a
 * synced lyric line, completing the panel this tutorial has been building
 * since Step 4 — the native `controls: true` bar handles transport, this
 * handles everything it can't.
 *
 * `LyricsPlugin` registers through `addPlugin()` in `configure()`, exactly
 * like a plugin you wrote yourself (the `plugins` array in `setup()` config
 * is the declarative equivalent). Artwork reads the canonical `image`
 * field first, falling back to the deprecated `cover`, matching how
 * `MusicPreloadStrategy`/`CastSenderPlugin` resolve it inside the package
 * itself (see the [Quickstart](/nomercy-music-player/quickstart)).
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: songs,
};

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const nowPlaying = player.createElement('div', 'nm-build-now-playing').appendTo(container).get();
	nowPlaying.style.cssText
		= 'position:absolute;left:.75rem;top:.75rem;right:3.5rem;display:flex;align-items:center;'
			+ 'gap:.75rem;color:#fff;font-family:system-ui,sans-serif;';

	const cover = player.createElement('img', 'nm-build-cover').appendTo(nowPlaying).get();
	cover.style.cssText = 'width:2.75rem;height:2.75rem;border-radius:.4rem;object-fit:cover;flex:none;';
	cover.alt = '';

	const meta = player.createElement('div', 'nm-build-meta').appendTo(nowPlaying).get();
	meta.style.cssText = 'display:flex;flex-direction:column;gap:.15rem;min-width:0;';

	const title = player.createElement('span', 'nm-build-title').appendTo(meta).get();
	title.style.cssText = 'font-size:.9rem;font-weight:600;';

	const artist = player.createElement('span', 'nm-build-artist').appendTo(meta).get();
	artist.style.cssText = 'font-size:.75rem;opacity:.75;';

	const lyricLine = player.createElement('span', 'nm-build-lyric-line').appendTo(meta).get();
	lyricLine.style.cssText = 'font-size:.75rem;opacity:.9;font-style:italic;';

	const renderNowPlaying = (item?: MusicPlaylistItem): void => {
		const current = item ?? player.item();
		const art = current?.image ?? current?.cover ?? '';
		cover.src = art;
		cover.style.visibility = art ? 'visible' : 'hidden';
		title.textContent = current?.name ?? '';
		artist.textContent = current?.artist ?? '';
		lyricLine.textContent = '';
	};
	const onItem = ({ item }: { item?: MusicPlaylistItem }): void => renderNowPlaying(item);
	// LyricsPlugin's own events are auto-namespaced onto the player's event
	// bus as `plugin:lyrics:<event>` — there's no separate emitter on the
	// plugin instance to subscribe to directly.
	const onLyricLine = (payload: { text: string }): void => {
		lyricLine.textContent = payload.text;
	};
	player.on('item', onItem);
	player.on('plugin:lyrics:lineEnter', onLyricLine);
	renderNowPlaying();

	void player.item(0);

	return () => {
		player.off('item', onItem);
		player.off('plugin:lyrics:lineEnter', onLyricLine);
		nowPlaying.remove();
	};
}

export default { config, configure, onReady, player: 'music' as const };
