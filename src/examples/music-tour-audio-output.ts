// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Audio output devices: audioOutputs() enumerates them (no picker needed),
 * selectAudioOutput() opens the browser's own picker on a real click, and
 * audioOutput(deviceId) routes playback there. `renderDeviceList()` runs
 * once in `use()`, so this only touches the enumeration path automatically,
 * never the permission-gated picker, matching how a real app would render a
 * device list without prompting on load.
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

class OutputDevicesTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-output-devices';
	static override readonly description = 'Audio output device list for the Audio Output Devices tour page.';

	private list!: HTMLDivElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-output-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const pickerButton = this.createButton('nm-tour-output-picker', 'Choose output device', () => {
			void this.player.selectAudioOutput().then((device) => {
				if (device)
					void this.player.audioOutput(device.deviceId);
			});
		});
		pickerButton.textContent = 'Choose device…';
		pickerButton.style.cssText
			= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

		this.list = this.createElement('div', 'nm-tour-output-list').appendTo(bar).get();
		this.list.style.cssText = 'display:flex;gap:.4rem;flex-wrap:wrap;font-size:.8rem;opacity:.9;';

		bar.append(pickerButton, this.list);
		void this.renderDeviceList();
	}

	private async renderDeviceList(): Promise<void> {
		const devices = await this.player.audioOutputs();
		this.list.replaceChildren();

		if (devices.length === 0) {
			this.list.textContent = 'No output devices reported by this browser.';
			return;
		}

		devices.forEach((device, index) => {
			const option = this.createButton(`nm-tour-output-device-${index}`, device.label || `Output ${index + 1}`, () => {
				void this.player.audioOutput(device.deviceId);
			});
			option.textContent = device.label || `Output ${index + 1}`;
			option.style.cssText
				= 'height:1.8rem;padding:0 .6rem;border:0;border-radius:.35rem;background:rgba(255,255,255,.15);'
					+ 'color:#fff;font-size:.75rem;cursor:pointer;';
			this.list.appendChild(option);
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(OutputDevicesTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
