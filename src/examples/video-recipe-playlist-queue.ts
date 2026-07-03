// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Playlist / "Up Next" Panel. Renders `queue()` as a clickable list,
 * highlights the active item from `item()`, and re-renders on `'item'`
 * (cursor moved) and `'queue'` (items changed) instead of polling. Jumping
 * uses `playItem(id)`, which closes the `item(); play()` race described in
 * The Queue & Playlist — a plain `item(id)` here would risk `play()` reaching
 * the backend before the new source is set.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, films } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	playlist: films,
};

function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const panel = player.createElement('div', 'nm-queue-panel').appendTo(container).get();
	panel.style.cssText
		= 'position:absolute;top:1rem;right:1rem;width:13rem;max-height:70%;overflow:auto;'
			+ 'border-radius:.6rem;background:rgba(0,0,0,.72);padding:.35rem;';

	const render = (): void => {
		panel.replaceChildren();
		const activeId = player.item()?.id;
		player.queue().forEach((item, index) => {
			const row = document.createElement('button');
			row.type = 'button';
			row.textContent = `${index + 1}. ${item.title ?? String(item.id)}`;
			row.style.cssText
				= 'display:block;width:100%;text-align:left;padding:.35rem .5rem;border:0;'
					+ 'border-radius:.4rem;background:transparent;color:#fff;'
					+ 'font:600 .78rem system-ui,sans-serif;cursor:pointer;';
			if (item.id === activeId)
				row.style.background = 'rgba(255,255,255,.2)';
			row.addEventListener('click', () => player.playItem(item.id));
			panel.appendChild(row);
		});
	};

	player.on('item', render);
	player.on('queue', render);
	render();

	return () => {
		player.off('item', render);
		player.off('queue', render);
		panel.remove();
	};
}

export default { config, onReady };
