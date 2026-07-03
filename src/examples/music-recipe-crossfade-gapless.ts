// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Crossfade & Gapless Playback. Toggles the queue's automatic
 * boundary transition between `CrossfadeTransitionStrategy` (the music
 * default, an overlapping fade) and `GaplessTransitionStrategy` (a hard cut,
 * video's default) via `setTransitionStrategy()`, and exposes a manual
 * `crossfadeTo()` call independent of whichever mode is active.
 */

import type { IMusicPlayer, MusicPlaylistItem, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { CrossfadeTransitionStrategy, GaplessTransitionStrategy } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
	crossfadeDefaults: { duration: 4, curve: 'equal-power' },
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-recipe-fade-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.6rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	let gapless = false;

	const modeButton = player.createButton('nm-recipe-fade-mode', 'Toggle transition mode', () => {
		gapless = !gapless;
		player.setTransitionStrategy(
			gapless
				? new GaplessTransitionStrategy()
				: new CrossfadeTransitionStrategy({ leadSeconds: 3, tailSeconds: 3, curve: 'equal-power' }),
		);
		syncMode();
	});
	modeButton.style.cssText
		= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

	const crossfadeButton = player.createButton('nm-recipe-fade-now', 'Crossfade to the next track now', () => {
		const upNext = player.peekNext();
		if (upNext)
			void player.crossfadeTo(upNext, { duration: 3, curve: 'equal-power' });
	});
	crossfadeButton.textContent = 'Crossfade now';
	crossfadeButton.style.cssText
		= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:rgba(255,255,255,.15);'
			+ 'color:#fff;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

	const status = player.createElement('span', 'nm-recipe-fade-status').appendTo(bar).get();
	status.style.cssText = 'font-size:.8rem;opacity:.85;';

	bar.append(modeButton, crossfadeButton, status);

	const syncMode = (): void => {
		modeButton.textContent = gapless ? 'Mode: Gapless (hard cut)' : 'Mode: Crossfade';
	};
	syncMode();

	const onItem = ({ item }: { item?: MusicPlaylistItem }): void => {
		status.textContent = item ? `Playing: ${item.name}` : '';
	};
	const onCrossfadeStart = ({ to }: { to: MusicPlaylistItem }): void => {
		status.textContent = `Crossfading to ${to.name}…`;
	};
	player.on('item', onItem);
	player.on('crossfadeStart', onCrossfadeStart);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('item', onItem);
		player.off('crossfadeStart', onCrossfadeStart);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
