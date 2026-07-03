// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 1 of 5: the shell and a play/pause button.
 *
 * Music ships no chrome at all, not even an optional native bar to switch
 * on, so everything visible from here on is DOM this file builds itself.
 * `player.container` is the real mounted `<div>`;
 * `createElement`/`createButton` are the kit's own DOM helpers
 * (`nomercy-player-core`'s `domMethods` mixin), so no CSS framework or extra
 * dependency is assumed.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

/** Bottom bar, laid out across the full width of the container. Every later step appends into it. */
function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	if (!container.style.position)
		container.style.position = 'relative';

	const bar = player.createElement('div', 'nm-build-bar').appendTo(container).get();
	bar.style.cssText
		= 'position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;'
			+ 'gap:.75rem;padding:.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.85));';
	return bar;
}

/**
 * Called once, synchronously, right after `setup()` — the same moment your
 * own app has a live player instance to build UI against. Returns a cleanup
 * function; the docs site calls it on unmount, your app calls it whenever it
 * tears the overlay down.
 */
function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const playPause = player.createButton('nm-build-play-pause', 'Play', () => {
		void player.togglePlayback();
	});
	playPause.style.cssText
		= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(playPause);

	const sync = (): void => {
		const playing = player.playState() === PlayState.PLAYING;
		playPause.textContent = playing ? '⏸' : '▶';
		playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	};
	player.on('play', sync);
	player.on('pause', sync);
	player.on('playing', sync);
	sync();

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('play', sync);
		player.off('pause', sync);
		player.off('playing', sync);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
