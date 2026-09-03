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
	playlist: songs,
};

class QueueTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-queue';
	static override readonly description = 'Previous/next/shuffle transport plus queue position for the Queue tour page.';

	private position!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-queue-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const previous = this.createButton('nm-tour-queue-previous', 'Previous', () => {
			void this.player.previous();
		});
		previous.textContent = '⏮';

		const next = this.createButton('nm-tour-queue-next', 'Next', () => {
			void this.player.next();
		});
		next.textContent = '⏭';

		const shuffle = this.createButton('nm-tour-queue-shuffle', 'Shuffle', () => {
			this.player.queueShuffle();
		});
		shuffle.textContent = '🔀';

		for (const button of [previous, next, shuffle]) {
			button.style.cssText
				= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
					+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
		}

		this.position = this.createElement('span', 'nm-tour-queue-position').appendTo(bar).get();
		this.position.style.cssText = 'margin-left:.5rem;font-size:.85rem;opacity:.8;';

		bar.append(previous, next, shuffle, this.position);

		this.on('item', ({ item }) => this.renderPosition(item));
		this.on('queue:shuffle', () => this.renderPosition());
		this.renderPosition();
	}

	private renderPosition(item?: MusicPlaylistItem): void {
		const current = item ?? this.player.item();
		this.position.textContent = current
			? `${this.player.index() + 1}/${this.player.queueLength()} · ${current.name}`
			: '';
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(QueueTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
