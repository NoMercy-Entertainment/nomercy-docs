// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Audio Output Switching. A `<select>` populated from
 * `audioOutputs()`, pre-selected to whatever `audioOutput()` currently
 * reports, wired so picking a different option routes playback there —
 * the full device-switcher pattern the Audio Output Devices tour page's
 * button list only sketches.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

class OutputSwitcherPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-recipe-output-switcher';
	static override readonly description = 'Audio output device switcher for the Audio Output Switching recipe.';

	private select!: HTMLSelectElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-recipe-output-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.6rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		this.select = this.createElement('select', 'nm-recipe-output-select').appendTo(bar).get();
		this.select.style.cssText
			= 'height:2rem;padding:0 .5rem;border:0;border-radius:.4rem;background:rgba(255,255,255,.15);'
				+ 'color:#fff;font-size:.78rem;max-width:10rem;';
		this.select.setAttribute('aria-label', 'Audio output device');
		this.select.addEventListener('change', () => {
			void this.player.audioOutput(this.select.value);
		});

		const pickerButton = this.createButton('nm-recipe-output-picker', 'Choose output device via browser picker', () => {
			void this.player.selectAudioOutput().then(async (device) => {
				if (device) {
					await this.player.audioOutput(device.deviceId);
					await this.renderSelect();
				}
			});
		});
		pickerButton.textContent = 'Browser picker…';
		pickerButton.style.cssText
			= 'height:2rem;padding:0 .7rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.75rem;font-weight:600;cursor:pointer;flex:none;';

		bar.append(this.select, pickerButton);
		void this.renderSelect();
	}

	private async renderSelect(): Promise<void> {
		const [devices, current] = await Promise.all([this.player.audioOutputs(), this.player.audioOutput()]);
		this.select.replaceChildren();

		if (devices.length === 0) {
			const option = document.createElement('option');
			option.textContent = 'No output devices reported by this browser';
			this.select.appendChild(option);
			this.select.disabled = true;
			return;
		}

		devices.forEach((device, index) => {
			const option = document.createElement('option');
			option.value = device.deviceId;
			option.textContent = device.label || `Output ${index + 1}`;
			if (device.deviceId === current)
				option.selected = true;
			this.select.appendChild(option);
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(OutputSwitcherPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
