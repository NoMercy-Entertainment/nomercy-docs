// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Transport: play(), pause(), togglePlayback(), next()/previous(). Music
 * ships no play button of its own, so this builds the smallest possible bar
 * to give the same methods Build a Player wires later something visible to
 * drive. `player.mute()` + `item(0, { autoplay: true })` starts the live
 * preview without a click, the same bootstrap Quick Start uses.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-transport-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const previous = player.createButton('nm-tour-transport-previous', 'Previous', () => {
		void player.previous();
	});
	previous.textContent = '⏮';

	const playPause = player.createButton('nm-tour-transport-play-pause', 'Play', () => {
		void player.togglePlayback();
	});

	const next = player.createButton('nm-tour-transport-next', 'Next', () => {
		void player.next();
	});
	next.textContent = '⏭';

	for (const button of [previous, playPause, next]) {
		button.style.cssText
			= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
	}
	bar.append(previous, playPause, next);

	const nowPlaying = player.createElement('span', 'nm-tour-transport-now-playing').appendTo(bar).get();
	nowPlaying.style.cssText = 'margin-left:.5rem;font-size:.85rem;opacity:.8;';

	const syncPlayPause = (): void => {
		const playing = player.playState() === PlayState.PLAYING;
		playPause.textContent = playing ? '⏸' : '▶';
		playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	};
	const onItem = ({ item }: { item?: MusicPlaylistItem }): void => {
		nowPlaying.textContent = item?.name ?? '';
	};
	player.on('play', syncPlayPause);
	player.on('pause', syncPlayPause);
	player.on('playing', syncPlayPause);
	player.on('item', onItem);
	syncPlayPause();

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		player.off('item', onItem);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
