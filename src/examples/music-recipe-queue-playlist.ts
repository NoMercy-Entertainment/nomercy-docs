// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Queue / "Up Next" Panel. Renders `queue()` as a clickable list,
 * highlights the active item from `item()`, and re-renders on `'item'`
 * (cursor moved) and `'queue'` (items changed) instead of polling. Jumping
 * uses `playItem(id)`, which closes the `item(); play()` race described in
 * The Queue — a plain `item(id)` here would risk `play()` reaching the
 * backend before the new source is set.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

class QueuePanelPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-recipe-queue-panel';
	static override readonly description = 'Up Next queue panel for the Queue / Up Next recipe.';

	private panel!: HTMLDivElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		this.panel = this.createElement('div', 'nm-recipe-queue-panel').appendTo(this.mount('root')).get();
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
			const row = this.createButton(`nm-recipe-queue-row-${index}`, `${item.name}${item.artist ? ` — ${item.artist}` : ''}`, () => {
				this.player.playItem(item.id);
			});
			row.textContent = `${index + 1}. ${item.name}`;
			row.style.cssText
				= 'display:block;width:100%;text-align:left;padding:.35rem .5rem;border:0;'
					+ 'border-radius:.4rem;background:transparent;color:#fff;'
					+ 'font:600 .78rem system-ui,sans-serif;cursor:pointer;';
			if (item.id === activeId)
				row.style.background = 'rgba(255,255,255,.2)';
			this.panel.appendChild(row);
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(QueuePanelPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
