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
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-recipe-output-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.6rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

async function renderSelect(player: IMusicPlayer, select: HTMLSelectElement): Promise<void> {
	const [devices, current] = await Promise.all([player.audioOutputs(), player.audioOutput()]);
	select.replaceChildren();

	if (devices.length === 0) {
		const option = document.createElement('option');
		option.textContent = 'No output devices reported by this browser';
		select.appendChild(option);
		select.disabled = true;
		return;
	}

	devices.forEach((device, index) => {
		const option = document.createElement('option');
		option.value = device.deviceId;
		option.textContent = device.label || `Output ${index + 1}`;
		if (device.deviceId === current)
			option.selected = true;
		select.appendChild(option);
	});
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const select = player.createElement('select', 'nm-recipe-output-select').appendTo(bar).get();
	select.style.cssText
		= 'height:2rem;padding:0 .5rem;border:0;border-radius:.4rem;background:rgba(255,255,255,.15);'
			+ 'color:#fff;font-size:.78rem;max-width:10rem;';
	select.setAttribute('aria-label', 'Audio output device');

	const onChange = (): void => {
		void player.audioOutput(select.value);
	};
	select.addEventListener('change', onChange);

	const pickerButton = player.createButton('nm-recipe-output-picker', 'Choose output device via browser picker', () => {
		void player.selectAudioOutput().then(async (device) => {
			if (device) {
				await player.audioOutput(device.deviceId);
				await renderSelect(player, select);
			}
		});
	});
	pickerButton.textContent = 'Browser picker…';
	pickerButton.style.cssText
		= 'height:2rem;padding:0 .7rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.75rem;font-weight:600;cursor:pointer;flex:none;';

	bar.append(select, pickerButton);
	void renderSelect(player, select);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		select.removeEventListener('change', onChange);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
