// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Volume: volume(level) applied live on every drag, and a mute button that
 * reads volumeState() instead of tracking its own boolean, so it can't drift
 * when something else (a keyboard shortcut, a Connect sync) changes mute
 * state out from under it.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper, and `this.listen()` detaches its DOM listener on
 * dispose, so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { VolumeState } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

class VolumeTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-volume';
	static override readonly description = 'Mute button plus volume slider for the Volume tour page.';

	private muteButton!: HTMLButtonElement;
	private volumeSlider!: HTMLInputElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-volume-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		this.muteButton = this.createButton('nm-tour-volume-mute', 'Mute', () => {
			this.player.toggleMute();
		});
		this.muteButton.style.cssText
			= 'width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;'
				+ 'color:#fff;font-size:1rem;line-height:1;cursor:pointer;flex:none;';

		this.volumeSlider = this.createElement('input', 'nm-tour-volume-slider').appendTo(bar).get();
		this.volumeSlider.type = 'range';
		this.volumeSlider.min = '0';
		this.volumeSlider.max = '100';
		this.volumeSlider.step = '1';
		this.volumeSlider.value = String(this.player.volume());
		this.volumeSlider.style.cssText = 'width:8rem;accent-color:#fff;cursor:pointer;flex:none;';
		this.volumeSlider.setAttribute('aria-label', 'Volume');

		bar.append(this.muteButton, this.volumeSlider);

		this.listen(this.volumeSlider, 'input', () => {
			void this.player.volume(Number(this.volumeSlider.value));
		});

		this.on('mute', () => this.syncMute());
		this.on('volume', ({ level }) => {
			this.volumeSlider.value = String(level);
		});
		this.syncMute();
	}

	private syncMute(): void {
		// Starts muted so the browser allows autoplay without a click; this
		// renders the mute icon in that real starting state.
		const muted = this.player.volumeState() === VolumeState.MUTED;
		this.muteButton.textContent = muted ? '🔇' : '🔊';
		this.muteButton.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(VolumeTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
