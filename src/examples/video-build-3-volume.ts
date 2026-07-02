// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 3 of 5: a volume slider and mute button next to
 * Step 2's scrubber.
 *
 * Unlike the scrubber, volume applies on every `input` event, not just on
 * release — `volume(level)` is cheap and every consumer expects a slider to
 * track the pointer live. The mute button calls `toggleMute()` and reflects
 * `volumeState()` (`VolumeState.MUTED`/`UNMUTED`) instead of tracking its own
 * boolean, so it stays correct if something else mutes the player too.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { PlayState, VolumeState } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	playlist: [sintel],
};

function buildBar(player: IVideoPlayer, container: HTMLElement): HTMLDivElement {
	if (!container.style.position)
		container.style.position = 'relative';

	const bar = player.createElement('div', 'nm-build-bar').appendTo(container).get();
	bar.style.cssText
		= 'position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;'
			+ 'gap:.75rem;padding:.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.85));';
	return bar;
}

function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	// ── Step 1: play/pause ──────────────────────────────────────────────
	const playPause = player.createButton('nm-build-play-pause', 'Play', () => {
		void player.togglePlayback();
	});
	playPause.style.cssText
		= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(playPause);

	const syncPlayPause = (): void => {
		const playing = player.playState() === PlayState.PLAYING;
		playPause.textContent = playing ? '⏸' : '▶';
		playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	};
	player.on('play', syncPlayPause);
	player.on('pause', syncPlayPause);
	player.on('playing', syncPlayPause);
	syncPlayPause();

	// ── Step 2: scrubber ─────────────────────────────────────────────────
	const scrubber = player.createElement('input', 'nm-build-scrubber').appendTo(bar).get();
	scrubber.type = 'range';
	scrubber.min = '0';
	scrubber.max = String(player.duration() || 0);
	scrubber.step = '0.1';
	scrubber.value = '0';
	scrubber.style.cssText = 'flex:1;accent-color:#fff;cursor:pointer;';
	scrubber.setAttribute('aria-label', 'Seek');

	let dragging = false;
	const onPointerDown = (): void => { dragging = true; };
	const onChange = (): void => {
		dragging = false;
		void player.time(Number(scrubber.value));
	};
	scrubber.addEventListener('pointerdown', onPointerDown);
	scrubber.addEventListener('change', onChange);

	const onDuration = ({ duration }: { duration: number }): void => {
		scrubber.max = String(duration);
	};
	const onTime = ({ time }: { time: number }): void => {
		if (!dragging)
			scrubber.value = String(time);
	};
	player.on('duration', onDuration);
	player.on('time', onTime);

	// ── Step 3: volume + mute ────────────────────────────────────────────
	const muteButton = player.createButton('nm-build-mute', 'Mute', () => {
		player.toggleMute();
	});
	muteButton.style.cssText
		= 'width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;'
			+ 'color:#fff;font-size:1rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(muteButton);

	const volumeSlider = player.createElement('input', 'nm-build-volume').appendTo(bar).get();
	volumeSlider.type = 'range';
	volumeSlider.min = '0';
	volumeSlider.max = '100';
	volumeSlider.step = '1';
	volumeSlider.value = String(player.volume());
	volumeSlider.style.cssText = 'width:5rem;accent-color:#fff;cursor:pointer;flex:none;';
	volumeSlider.setAttribute('aria-label', 'Volume');

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

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		player.off('duration', onDuration);
		player.off('time', onTime);
		player.off('mute', syncMute);
		player.off('volume', onVolume);
		scrubber.removeEventListener('pointerdown', onPointerDown);
		scrubber.removeEventListener('change', onChange);
		volumeSlider.removeEventListener('input', onVolumeInput);
		bar.remove();
	};
}

export default { config, onReady };
