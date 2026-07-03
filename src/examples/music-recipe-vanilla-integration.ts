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

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

interface PlayerSnapshot {
	playing: boolean;
	name: string;
}

/**
 * Owns one player instance plus every listener it needs, and exposes a
 * single `onChange` callback instead of a reactive object — the lowest
 * common denominator every framework's reactivity system can wrap. Returns
 * one `destroy()` that unwinds every listener it added, the same contract
 * `onUnmounted` (Vue), a cleanup function (React `useEffect`), or `onDestroy`
 * (Svelte) all call into.
 */
function createPlayerController(player: IMusicPlayer, onChange: (snapshot: PlayerSnapshot) => void): () => void {
	const emit = (): void => {
		onChange({
			playing: player.playState() === PlayState.PLAYING,
			name: player.item()?.name ?? '',
		});
	};

	player.on('play', emit);
	player.on('pause', emit);
	player.on('playing', emit);
	player.on('item', emit);
	emit();

	return () => {
		player.off('play', emit);
		player.off('pause', emit);
		player.off('playing', emit);
		player.off('item', emit);
	};
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const badge = player.createElement('div', 'nm-vanilla-badge').appendTo(container).get();
	badge.style.cssText
		= 'position:absolute;left:1rem;bottom:1rem;padding:.35rem .6rem;border-radius:.5rem;'
			+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;pointer-events:none;';

	const destroyController = createPlayerController(player, (snapshot) => {
		badge.textContent = `${snapshot.playing ? 'Playing' : 'Paused'} — ${snapshot.name}`;
	});

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		destroyController();
		badge.remove();
	};
}

export default { config, onReady, player: 'music' as const };
