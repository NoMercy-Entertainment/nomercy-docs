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
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { VolumeState } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-volume-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const muteButton = player.createButton('nm-tour-volume-mute', 'Mute', () => {
		player.toggleMute();
	});
	muteButton.style.cssText
		= 'width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;'
			+ 'color:#fff;font-size:1rem;line-height:1;cursor:pointer;flex:none;';

	const volumeSlider = player.createElement('input', 'nm-tour-volume-slider').appendTo(bar).get();
	volumeSlider.type = 'range';
	volumeSlider.min = '0';
	volumeSlider.max = '100';
	volumeSlider.step = '1';
	volumeSlider.value = String(player.volume());
	volumeSlider.style.cssText = 'width:8rem;accent-color:#fff;cursor:pointer;flex:none;';
	volumeSlider.setAttribute('aria-label', 'Volume');

	bar.append(muteButton, volumeSlider);

	const onVolumeInput = (): void => {
		void player.volume(Number(volumeSlider.value));
	};
	volumeSlider.addEventListener('input', onVolumeInput);

	const syncMute = (): void => {
		const muted = player.volumeState() === VolumeState.MUTED;
		muteButton.textContent = muted ? '🔇' : '🔊';
		muteButton.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
	};
	const onVolume = ({ level }: { level: number }): void => {
		volumeSlider.value = String(level);
	};
	player.on('mute', syncMute);
	player.on('volume', onVolume);
	syncMute();

	// Starts muted so the browser allows autoplay without a click; syncMute()
	// above already renders the mute icon in that real starting state.
	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('mute', syncMute);
		player.off('volume', onVolume);
		volumeSlider.removeEventListener('input', onVolumeInput);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
