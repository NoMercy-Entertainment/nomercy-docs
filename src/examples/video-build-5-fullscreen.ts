// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 5: a fullscreen button, completing the overlay
 * this tutorial has been building since Step 1.
 *
 * `toggleFullscreen()` flips `fullscreen()` through the platform's
 * `FullscreenController` (`setup({ platform })`, defaulting to
 * `browserPlatform`); the `'fullscreen'` event carries the settled
 * `{ active }` state back, the same event-driven pattern every other button
 * in this overlay already uses. Requesting fullscreen requires a real user
 * gesture, so nothing here calls it automatically — only the click handler does.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FullscreenState, PlayState, VolumeState } from '@nomercy-entertainment/nomercy-video-player';
import { SubtitleOverlayPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/subtitle-overlay';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	defaultSubtitleLanguage: 'eng',
	playlist: [sintel],
};

function configure(player: IVideoPlayer): void {
	player.addPlugin(SubtitleOverlayPlugin);
}

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

	// ── Step 4: subtitle menu ────────────────────────────────────────────
	const menu = player.createElement('div', 'nm-build-subtitle-menu').appendTo(container).get();
	menu.style.cssText
		= 'position:absolute;right:1rem;bottom:3.5rem;display:none;flex-direction:column;'
			+ 'gap:.25rem;padding:.5rem;border-radius:.5rem;background:rgba(0,0,0,.9);min-width:8rem;';

	const renderMenu = (): void => {
		menu.replaceChildren();
		const tracks = player.subtitles();
		const current = player.subtitle();

		const addOption = (label: string, active: boolean, onClick: () => void): void => {
			const option = player.createButton(`nm-build-subtitle-${label}`, label, onClick);
			option.textContent = label;
			option.style.cssText
				= `display:block;width:100%;text-align:left;padding:.25rem .5rem;border:0;`
					+ `border-radius:.25rem;background:${active ? '#fff' : 'transparent'};`
					+ `color:${active ? '#000' : '#fff'};cursor:pointer;font-size:.85rem;`;
			menu.appendChild(option);
		};

		addOption('Off', current === null, () => { void player.subtitle(null); renderMenu(); });
		tracks.forEach((track, index) => {
			addOption(track.label, current?.index === index, () => { void player.subtitle(index); renderMenu(); });
		});
	};

	const ccButton = player.createButton('nm-build-cc', 'Subtitles', () => {
		const open = menu.style.display === 'flex';
		if (open) {
			menu.style.display = 'none';
			return;
		}
		renderMenu();
		menu.style.display = 'flex';
	});
	ccButton.textContent = 'CC';
	ccButton.style.cssText
		= 'height:2rem;padding:0 .6rem;border:0;border-radius:.4rem;background:transparent;'
			+ 'color:#fff;font-size:.8rem;font-weight:600;cursor:pointer;flex:none;';
	bar.appendChild(ccButton);

	// ── Step 5: fullscreen ────────────────────────────────────────────────
	const fullscreenButton = player.createButton('nm-build-fullscreen', 'Fullscreen', () => {
		player.toggleFullscreen();
	});
	fullscreenButton.style.cssText
		= 'width:2rem;height:2rem;border:0;border-radius:.4rem;background:transparent;'
			+ 'color:#fff;font-size:1rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(fullscreenButton);

	const syncFullscreen = (): void => {
		const active = player.fullscreen() === FullscreenState.ON;
		fullscreenButton.textContent = active ? '⤢' : '⛶';
		fullscreenButton.setAttribute('aria-label', active ? 'Exit fullscreen' : 'Fullscreen');
	};
	player.on('fullscreen', syncFullscreen);
	syncFullscreen();

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		player.off('duration', onDuration);
		player.off('time', onTime);
		player.off('mute', syncMute);
		player.off('volume', onVolume);
		player.off('fullscreen', syncFullscreen);
		scrubber.removeEventListener('pointerdown', onPointerDown);
		scrubber.removeEventListener('change', onChange);
		volumeSlider.removeEventListener('input', onVolumeInput);
		menu.remove();
		bar.remove();
	};
}

export default { config, configure, onReady };
