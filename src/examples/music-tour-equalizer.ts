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
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { AudioGraphPlugin, EqualizerPlugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function configure(player: IMusicPlayer): void {
	player.addPlugin(AudioGraphPlugin);
	player.addPlugin(EqualizerPlugin);
}

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-eq-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const bassButton = player.createButton('nm-tour-eq-full-bass', 'Full Bass preset', () => {
		player.getPlugin(EqualizerPlugin)?.preset('Full Bass');
	});
	bassButton.textContent = 'Full Bass';

	const flatButton = player.createButton('nm-tour-eq-flat', 'Flat preset', () => {
		player.getPlugin(EqualizerPlugin)?.preset('Flat');
	});
	flatButton.textContent = 'Flat';

	for (const button of [bassButton, flatButton]) {
		button.style.cssText
			= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';
	}
	bar.append(bassButton, flatButton);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		bar.remove();
	};
}

export default { config, configure, onReady, player: 'music' as const };
