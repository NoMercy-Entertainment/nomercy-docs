// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Playback state & events: the typed coarse-state readers (playState(),
 * bufferState(), networkState()) plus a play/pause button so toggling state
 * is visible immediately. bufferState()/networkState() have no dedicated
 * push event on this library, so this polls them on a short interval
 * instead of subscribing.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-state-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const playPause = player.createButton('nm-tour-state-play-pause', 'Play', () => {
		void player.togglePlayback();
	});
	playPause.style.cssText
		= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';

	const status = player.createElement('span', 'nm-tour-state-status').appendTo(bar).get();
	status.style.cssText = 'font-size:.8rem;opacity:.8;font-family:monospace;';

	bar.append(playPause, status);

	const renderStatus = (): void => {
		status.textContent = `play:${player.playState()} buffer:${player.bufferState()} network:${player.networkState()}`;
	};
	const syncPlayPause = (): void => {
		const playing = player.playState() === PlayState.PLAYING;
		playPause.textContent = playing ? '⏸' : '▶';
		playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
		renderStatus();
	};
	player.on('play', syncPlayPause);
	player.on('pause', syncPlayPause);
	player.on('playing', syncPlayPause);
	syncPlayPause();

	const pollId = window.setInterval(renderStatus, 1000);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		window.clearInterval(pollId);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
