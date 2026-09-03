// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Equalizer: AudioGraphPlugin + EqualizerPlugin, both shared kit plugins, not
 * anything music-specific. `player.addPlugin()` runs in `configure()` — the
 * only place plugin registration is valid, before `setup()` — then two
 * buttons swap between two of the plugin's 19 built-in presets.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { AudioGraphPlugin, EqualizerPlugin, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

class EqualizerTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-equalizer';
	static override readonly description = 'Preset toggle buttons for the Equalizer tour page.';

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-eq-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const bassButton = this.createButton('nm-tour-eq-full-bass', 'Full Bass preset', () => {
			this.player.getPlugin(EqualizerPlugin)?.preset('Full Bass');
		});
		bassButton.textContent = 'Full Bass';

		const flatButton = this.createButton('nm-tour-eq-flat', 'Flat preset', () => {
			this.player.getPlugin(EqualizerPlugin)?.preset('Flat');
		});
		flatButton.textContent = 'Flat';

		for (const button of [bassButton, flatButton]) {
			button.style.cssText
				= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
					+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';
		}
		bar.append(bassButton, flatButton);
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(AudioGraphPlugin);
	player.addPlugin(EqualizerPlugin);
	player.addPlugin(EqualizerTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
