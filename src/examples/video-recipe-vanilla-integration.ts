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
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	playlist: [sintel],
};

interface PlayerSnapshot {
	playing: boolean;
	title: string;
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
		});
	};

	player.on('play', emit);
	player.on('pause', emit);
	player.on('playing', emit);
	player.on('current', emit);
	emit();

	return () => {
		player.off('play', emit);
		player.off('pause', emit);
		player.off('playing', emit);
		player.off('current', emit);
	};
}

function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const badge = player.createElement('div', 'nm-vanilla-badge').appendTo(container).get();
	badge.style.cssText
		= 'position:absolute;left:1rem;bottom:1rem;padding:.35rem .6rem;border-radius:.5rem;'
			+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;pointer-events:none;';

	const destroyController = createPlayerController(player, (snapshot) => {
		badge.textContent = `${snapshot.playing ? 'Playing' : 'Paused'} — ${snapshot.title}`;
	});

	return () => {
		destroyController();
		badge.remove();
	};
}

export default { config, onReady };
