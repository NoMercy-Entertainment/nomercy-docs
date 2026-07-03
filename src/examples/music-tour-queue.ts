// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The queue: a real three-item queue. `index()` and `queueLength()` read the
 * cursor position, `next()`/`previous()` (Transport) step through it, and
 * `queueShuffle()` reorders it in place while the cursor follows the playing
 * item to its new position. `songs` shares one `baseUrl` — every item's
 * `url` stays relative, exactly the shape a real media server sends.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-queue-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const previous = player.createButton('nm-tour-queue-previous', 'Previous', () => {
		void player.previous();
	});
	previous.textContent = '⏮';

	const next = player.createButton('nm-tour-queue-next', 'Next', () => {
		void player.next();
	});
	next.textContent = '⏭';

	const shuffle = player.createButton('nm-tour-queue-shuffle', 'Shuffle', () => {
		player.queueShuffle();
	});
	shuffle.textContent = '🔀';

	for (const button of [previous, next, shuffle]) {
		button.style.cssText
			= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
	}

	const position = player.createElement('span', 'nm-tour-queue-position').appendTo(bar).get();
	position.style.cssText = 'margin-left:.5rem;font-size:.85rem;opacity:.8;';

	bar.append(previous, next, shuffle, position);

	const renderPosition = (item?: MusicPlaylistItem): void => {
		const current = item ?? player.item();
		position.textContent = current
			? `${player.index() + 1}/${player.queueLength()} · ${current.name}`
			: '';
	};
	const onItem = ({ item }: { item?: MusicPlaylistItem }): void => renderPosition(item);
	const onShuffle = (): void => renderPosition();
	player.on('item', onItem);
	player.on('queue:shuffle', onShuffle);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('item', onItem);
		player.off('queue:shuffle', onShuffle);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
