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
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlaylistItem, MusicPlayerConfig, NMMusicPlayer } from '@nomercy-entertainment/nomercy-music-player';
import { CrossfadeTransitionStrategy, GaplessTransitionStrategy, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
	crossfadeDefaults: { duration: 4, curve: 'equal-power' },
};

class CrossfadeTogglePlugin extends Plugin<NMMusicPlayer> {
	static override readonly id = 'nm-recipe-crossfade-toggle';
	static override readonly description = 'Crossfade/gapless mode toggle for the Crossfade & Gapless Playback recipe.';

	private gapless = false;
	private modeButton!: HTMLButtonElement;
	private status!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-recipe-fade-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.6rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		this.modeButton = this.createButton('nm-recipe-fade-mode', 'Toggle transition mode', () => {
			this.gapless = !this.gapless;
			this.player.setTransitionStrategy(
				this.gapless
					? new GaplessTransitionStrategy()
					: new CrossfadeTransitionStrategy({ leadSeconds: 3, tailSeconds: 3, curve: 'equal-power' }),
			);
			this.syncMode();
		});
		this.modeButton.style.cssText
			= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

		const crossfadeButton = this.createButton('nm-recipe-fade-now', 'Crossfade to the next track now', () => {
			const upNext = this.player.peekNext();
			if (upNext)
				void this.player.crossfadeTo(upNext, { duration: 3, curve: 'equal-power' });
		});
		crossfadeButton.textContent = 'Crossfade now';
		crossfadeButton.style.cssText
			= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:rgba(255,255,255,.15);'
				+ 'color:#fff;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

		this.status = this.createElement('span', 'nm-recipe-fade-status').appendTo(bar).get();
		this.status.style.cssText = 'font-size:.8rem;opacity:.85;';

		bar.append(this.modeButton, crossfadeButton, this.status);

		this.syncMode();

		this.on('item', ({ item }) => {
			this.status.textContent = item ? `Playing: ${item.name}` : '';
		});
		this.on('crossfadeStart', ({ to }: { to: MusicPlaylistItem }) => {
			this.status.textContent = `Crossfading to ${to.name}…`;
		});
	}

	private syncMode(): void {
		this.modeButton.textContent = this.gapless ? 'Mode: Gapless (hard cut)' : 'Mode: Crossfade';
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(CrossfadeTogglePlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
