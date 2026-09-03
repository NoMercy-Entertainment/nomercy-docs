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
 *
 * DOM construction (`createElement`) lives on the plugin, not the player —
 * `this.createElement(...)` inside `use()`, never `player.createElement(...)`
 * from the outside. `this.mount('root')` claims an auto-cleaned wrapper so
 * nothing has to be torn down by hand.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: films,
};

class QueuePanelPlugin extends Plugin<IVideoPlayer> {
	static override readonly id = 'nm-recipe-queue-panel';
	static override readonly description = 'Up Next queue panel for the Queue & Playlist recipe.';

	private panel!: HTMLDivElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		this.panel = this.createElement('div', 'nm-queue-panel').appendTo(this.mount('root')).get();
		this.panel.style.cssText
			= 'position:absolute;top:1rem;right:1rem;width:13rem;max-height:70%;overflow:auto;'
				+ 'border-radius:.6rem;background:rgba(0,0,0,.72);padding:.35rem;';

		this.on('item', () => this.render());
		this.on('queue', () => this.render());
		this.render();
	}

	private render(): void {
		this.panel.replaceChildren();
		const activeId = this.player.item()?.id;
		this.player.queue().forEach((item, index) => {
			const row = document.createElement('button');
			row.type = 'button';
			row.textContent = `${index + 1}. ${item.title ?? String(item.id)}`;
			row.style.cssText
				= 'display:block;width:100%;text-align:left;padding:.35rem .5rem;border:0;'
					+ 'border-radius:.4rem;background:transparent;color:#fff;'
					+ 'font:600 .78rem system-ui,sans-serif;cursor:pointer;';
			if (item.id === activeId)
				row.style.background = 'rgba(255,255,255,.2)';
			this.listen(row, 'click', () => this.player.playItem(item.id));
			this.panel.appendChild(row);
		});
	}
}

function configure(player: IVideoPlayer): void {
	player.addPlugin(QueuePanelPlugin);
}

export default { config, configure };
