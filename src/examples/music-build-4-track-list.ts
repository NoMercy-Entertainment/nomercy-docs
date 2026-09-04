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
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: songs,
};

class TrackListPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-build-track-list';
	static override readonly description = 'Track-list toggle for the Build a Player tutorial.';

	private list!: HTMLDivElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		const root = this.mount('root');
		root.style.cssText = 'position:absolute;inset:0;pointer-events:none;';

		this.list = this.createElement('div', 'nm-build-track-list').appendTo(root).get();
		this.list.style.cssText
			= 'position:absolute;right:.75rem;top:2.75rem;display:none;flex-direction:column;'
				+ 'gap:.25rem;padding:.5rem;border-radius:.5rem;background:rgba(0,0,0,.85);min-width:12rem;'
				+ 'pointer-events:auto;';

		const toggle = this.createButton('nm-build-track-list-toggle', 'Track list', () => {
			const open = this.list.style.display === 'flex';
			if (open) {
				this.list.style.display = 'none';
				return;
			}
			this.renderList();
			this.list.style.display = 'flex';
		});
		toggle.textContent = '☰';
		toggle.style.cssText
			= 'position:absolute;right:.75rem;top:.75rem;height:2rem;padding:0 .6rem;border:0;'
				+ 'border-radius:.4rem;background:rgba(0,0,0,.65);color:#fff;font-size:.9rem;'
				+ 'cursor:pointer;pointer-events:auto;';
		root.appendChild(toggle);

		this.on('item', () => {
			if (this.list.style.display === 'flex')
				this.renderList();
		});
	}

	private renderList(): void {
		this.list.replaceChildren();
		const items = this.player.queue();
		const activeIndex = this.player.index();

		items.forEach((item: MusicPlaylistItem, index) => {
			const option = this.createButton(`nm-build-track-${index}`, item.name, () => {
				this.player.item(index, { autoplay: true });
				this.renderList();
			});
			option.textContent = item.name;
			option.style.cssText
				= `display:block;width:100%;text-align:left;padding:.25rem .5rem;border:0;`
					+ `border-radius:.25rem;background:${index === activeIndex ? '#fff' : 'transparent'};`
					+ `color:${index === activeIndex ? '#000' : '#fff'};cursor:pointer;font-size:.85rem;`;
			this.list.appendChild(option);
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(TrackListPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.item(0, { autoplay: false });
}

export default { config, configure, onReady, player: 'music' as const };
