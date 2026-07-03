// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Crossfade: crossfadeTo(item, opts) fades the outgoing track out while the
 * incoming one fades in, over a duration this config sets as the default.
 * beforeCrossfade / crossfadeStart / crossfadeComplete drive the status line
 * below instead of guessing at timing from the outside.
 */

import type { IMusicPlayer, MusicPlaylistItem, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
	crossfadeDefaults: { duration: 4, curve: 'equal-power' },
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-crossfade-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const crossfadeButton = player.createButton('nm-tour-crossfade-button', 'Crossfade to the next track', () => {
		const upNext = player.peekNext();
		if (upNext)
			void player.crossfadeTo(upNext);
	});
	crossfadeButton.textContent = 'Crossfade to next track';
	crossfadeButton.style.cssText
		= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

	const status = player.createElement('span', 'nm-tour-crossfade-status').appendTo(bar).get();
	status.style.cssText = 'font-size:.85rem;opacity:.8;';

	bar.append(crossfadeButton, status);

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
