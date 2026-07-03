// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 4 of 5: a track-list toggle.
 *
 * `controls: true`'s native bar has no concept of a playlist — this is the
 * first thing in this tutorial actually worth hand-building, because nothing
 * shipped covers it. One small button (not a whole transport bar) opens a
 * panel built fresh from `queue()`/`index()` on every open, so it's always
 * correct the moment it's shown instead of relying on stale state from the
 * last render. `item(index, { autoplay: true })` on click matches the
 * [Queue](/nomercy-music-player/tour/queue) page's cursor-navigation methods.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: songs,
};

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const list = player.createElement('div', 'nm-build-track-list').appendTo(container).get();
	list.style.cssText
		= 'position:absolute;right:.75rem;top:.75rem;display:none;flex-direction:column;'
			+ 'gap:.25rem;padding:.5rem;border-radius:.5rem;background:rgba(0,0,0,.85);min-width:12rem;';

	const renderList = (): void => {
		list.replaceChildren();
		const items = player.queue();
		const activeIndex = player.index();

		items.forEach((item: MusicPlaylistItem, index) => {
			const option = player.createButton(`nm-build-track-${index}`, item.name, () => {
				player.item(index, { autoplay: true });
				renderList();
			});
			option.textContent = item.name;
			option.style.cssText
				= `display:block;width:100%;text-align:left;padding:.25rem .5rem;border:0;`
					+ `border-radius:.25rem;background:${index === activeIndex ? '#fff' : 'transparent'};`
					+ `color:${index === activeIndex ? '#000' : '#fff'};cursor:pointer;font-size:.85rem;`;
			list.appendChild(option);
		});
	};

	const toggle = player.createButton('nm-build-track-list-toggle', 'Track list', () => {
		const open = list.style.display === 'flex';
		if (open) {
			list.style.display = 'none';
			return;
		}
		renderList();
		list.style.display = 'flex';
	});
	toggle.textContent = '☰';
	toggle.style.cssText
		= 'position:absolute;right:.75rem;top:.75rem;height:2rem;padding:0 .6rem;border:0;'
			+ 'border-radius:.4rem;background:rgba(0,0,0,.65);color:#fff;font-size:.9rem;'
			+ 'cursor:pointer;z-index:1;';
	container.appendChild(toggle);
	list.style.top = '2.75rem';

	const onItem = (): void => {
		if (list.style.display === 'flex')
			renderList();
	};
	player.on('item', onItem);

	void player.item(0);

	return () => {
		player.off('item', onItem);
		toggle.remove();
		list.remove();
	};
}

export default { config, onReady, player: 'music' as const };
