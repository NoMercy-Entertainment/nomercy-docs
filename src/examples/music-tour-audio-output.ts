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
 * once in `onReady()`, so this only touches the enumeration path
 * automatically, never the permission-gated picker, matching how a real app
 * would render a device list without prompting on load.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-output-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

async function renderDeviceList(player: IMusicPlayer, list: HTMLElement): Promise<void> {
	const devices = await player.audioOutputs();
	list.replaceChildren();

	if (devices.length === 0) {
		list.textContent = 'No output devices reported by this browser.';
		return;
	}

	devices.forEach((device, index) => {
		const option = player.createButton(`nm-tour-output-device-${index}`, device.label || `Output ${index + 1}`, () => {
			void player.audioOutput(device.deviceId);
		});
		option.textContent = device.label || `Output ${index + 1}`;
		option.style.cssText
			= 'height:1.8rem;padding:0 .6rem;border:0;border-radius:.35rem;background:rgba(255,255,255,.15);'
				+ 'color:#fff;font-size:.75rem;cursor:pointer;';
		list.appendChild(option);
	});
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const pickerButton = player.createButton('nm-tour-output-picker', 'Choose output device', () => {
		void player.selectAudioOutput().then((device) => {
			if (device)
				void player.audioOutput(device.deviceId);
		});
	});
	pickerButton.textContent = 'Choose device…';
	pickerButton.style.cssText
		= 'height:2.25rem;padding:0 .9rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';

	const list = player.createElement('div', 'nm-tour-output-list').appendTo(bar).get();
	list.style.cssText = 'display:flex;gap:.4rem;flex-wrap:wrap;font-size:.8rem;opacity:.9;';

	bar.append(pickerButton, list);
	void renderDeviceList(player, list);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
