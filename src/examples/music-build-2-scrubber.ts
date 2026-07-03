// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 2 of 5: a scrubber/progress bar next to Step 1's
 * play/pause button.
 *
 * A native `<input type="range">` reads its position from the `'time'` event
 * and its length from `'duration'` — both fired by the kit, not polled. A
 * `dragging` flag stops incoming `'time'` updates from fighting the user's
 * own drag; `time(seconds)` only runs once the user releases the thumb
 * (`change`, not `input`), the same seek `time()` on the Guided Tour describes.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	if (!container.style.position)
		container.style.position = 'relative';

	const bar = player.createElement('div', 'nm-build-bar').appendTo(container).get();
	bar.style.cssText
		= 'position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;'
			+ 'gap:.75rem;padding:.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.85));';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
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

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		player.off('duration', onDuration);
		player.off('time', onTime);
		scrubber.removeEventListener('pointerdown', onPointerDown);
		scrubber.removeEventListener('change', onChange);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
