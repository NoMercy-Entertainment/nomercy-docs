// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Vanilla Integration. No framework, no build-time component syntax,
 * just a small controller function that owns the player instance and exposes
 * a plain callback for state changes. This is the shape every framework
 * wrapper (Vue composable, React hook, Svelte store) is built around
 * underneath — see Recipes: Vue / React / Svelte for the same pattern
 * adapted to each framework's own reactivity primitive.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { PlayState } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, films } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	playlist: films,
};

interface PlayerSnapshot {
	playing: boolean;
	title: string;
	currentTime: number;
	duration: number;
}

/**
 * Owns one player instance plus every listener it needs, and exposes a
 * single `onChange` callback instead of a reactive object — the lowest
 * common denominator every framework's reactivity system can wrap. Returns
 * one `destroy()` that unwinds every listener it added, the same contract
 * `onUnmounted` (Vue), a cleanup function (React `useEffect`), or `onDestroy`
 * (Svelte) all call into.
 */
function createPlayerController(player: IVideoPlayer, onChange: (snapshot: PlayerSnapshot) => void): () => void {
	const emit = (): void => {
		onChange({
			playing: player.playState() === PlayState.PLAYING,
			title: player.item()?.title ?? '',
			currentTime: player.time(),
			duration: player.duration(),
		});
	};

	player.on('play', emit);
	player.on('pause', emit);
	player.on('playing', emit);
	player.on('ended', emit);
	player.on('item', emit);
	player.on('time', emit);
	player.on('duration', emit);
	emit();

	return () => {
		player.off('play', emit);
		player.off('pause', emit);
		player.off('playing', emit);
		player.off('ended', emit);
		player.off('item', emit);
		player.off('time', emit);
		player.off('duration', emit);
	};
}

/**
 * Builds the title, progress slider, and play/pause button directly on the
 * player's own container — the same three controls every framework recipe in
 * this section renders, here addressed as plain DOM nodes instead of bound
 * through a template.
 */
function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const title = player.createElement('div', 'nm-vanilla-title').appendTo(container).get();
	title.style.cssText
		= 'position:absolute;left:1rem;top:1rem;padding:.35rem .6rem;border-radius:.5rem;'
			+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;pointer-events:none;';

	const bar = player.createElement('div', 'nm-vanilla-progress').appendTo(container).get();
	bar.style.cssText
		= 'position:absolute;left:1rem;right:1rem;bottom:3.5rem;height:.35rem;border-radius:999px;'
			+ 'background:rgba(255,255,255,.25);cursor:pointer;';
	bar.setAttribute('role', 'slider');
	bar.setAttribute('aria-valuemin', '0');
	bar.setAttribute('aria-valuemax', '100');
	bar.tabIndex = 0;

	const fill = player.createElement('div', 'nm-vanilla-progress-fill').appendTo(bar).get();
	fill.style.cssText = 'height:100%;border-radius:999px;background:#fff;width:0%;';

	const button = player.createButton('nm-vanilla-toggle', 'Play', () => void player.togglePlayback());
	button.style.cssText
		= 'position:absolute;left:1rem;bottom:1rem;padding:.35rem .75rem;border-radius:.5rem;border:0;'
			+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;cursor:pointer;';
	container.appendChild(button);

	function seek(event: MouseEvent): void {
		const ratio = event.offsetX / bar.clientWidth;
		player.seekByPercentage(ratio * 100);
	}
	bar.addEventListener('click', seek);

	const destroyController = createPlayerController(player, (snapshot) => {
		title.textContent = snapshot.title || 'Nothing playing';
		const progress = snapshot.duration > 0 ? (snapshot.currentTime / snapshot.duration) * 100 : 0;
		fill.style.width = `${progress}%`;
		bar.setAttribute('aria-valuenow', String(progress));
		button.textContent = snapshot.playing ? 'Pause' : 'Play';
		button.setAttribute('aria-label', snapshot.playing ? 'Pause' : 'Play');
	});

	return () => {
		destroyController();
		bar.removeEventListener('click', seek);
		title.remove();
		bar.remove();
		button.remove();
	};
}

export default { config, onReady };
