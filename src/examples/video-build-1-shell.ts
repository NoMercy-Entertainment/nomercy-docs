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
 * `controls: false` turns off the browser's native bar — everything visible
 * from here on is DOM this file builds itself, driven by the exact same
 * methods the native controls called in the Guided Tour. `player.container`
 * is the real mounted `<div>`; `createElement`/`createButton` are the kit's
 * own DOM helpers (`nomercy-player-core`'s `domMethods` mixin), so no CSS
 * framework or extra dependency is assumed.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { PlayState } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	playlist: [sintel],
};

/** Bottom overlay bar, absolutely positioned over the video. Every later step appends into it. */
function buildBar(player: IVideoPlayer, container: HTMLElement): HTMLDivElement {
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
function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const playPause = player.createButton('nm-build-play-pause', 'Play', () => {
		void player.togglePlayback();
	});
	playPause.style.cssText
		= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;';
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

	return () => {
		player.off('play', sync);
		player.off('pause', sync);
		player.off('playing', sync);
		bar.remove();
	};
}

export default { config, onReady };
