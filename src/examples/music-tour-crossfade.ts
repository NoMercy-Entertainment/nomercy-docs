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
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlaylistItem, MusicPlayerConfig, NMMusicPlayer } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
	crossfadeDefaults: { duration: 4, curve: 'equal-power' },
};

class CrossfadeTourPlugin extends Plugin<NMMusicPlayer> {
	static override readonly id = 'nm-tour-crossfade';
	static override readonly description = 'Manual crossfade button + status line for the Crossfade tour page.';

	private status!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-crossfade-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const crossfadeButton = this.createButton('nm-tour-crossfade-button', 'Crossfade to the next track', () => {
			const upNext = this.player.peekNext();
			if (upNext)
				void this.player.crossfadeTo(upNext);
		});
		crossfadeButton.textContent = 'Crossfade to next track';
		crossfadeButton.style.cssText
			= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

		this.status = this.createElement('span', 'nm-tour-crossfade-status').appendTo(bar).get();
		this.status.style.cssText = 'font-size:.85rem;opacity:.8;';

		bar.append(crossfadeButton, this.status);

		this.on('item', ({ item }) => {
			this.status.textContent = item ? `Playing: ${item.name}` : '';
		});
		this.on('crossfadeStart', ({ to }: { to: MusicPlaylistItem }) => {
			this.status.textContent = `Crossfading to ${to.name}…`;
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(CrossfadeTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
