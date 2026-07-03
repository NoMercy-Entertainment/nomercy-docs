// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Time & seeking: time()/duration() driving a real scrubber, plus
 * rewind()/forward() as a relative alternative. The scrubber reads position
 * from the 'time' event and length from 'duration' instead of polling, and
 * ignores incoming 'time' updates while the user is actively dragging.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-time-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const rewind = player.createButton('nm-tour-time-rewind', 'Rewind 10 seconds', () => {
		void player.rewind(10);
	});
	rewind.textContent = '−10s';
	rewind.style.cssText
		= 'height:2rem;padding:0 .6rem;border:0;border-radius:.4rem;background:transparent;'
			+ 'color:#fff;font-size:.8rem;cursor:pointer;flex:none;';

	const scrubber = player.createElement('input', 'nm-tour-time-scrubber').appendTo(bar).get();
	scrubber.type = 'range';
	scrubber.min = '0';
	scrubber.max = String(player.duration() || 0);
	scrubber.step = '0.1';
	scrubber.value = '0';
	scrubber.style.cssText = 'flex:1;accent-color:#fff;cursor:pointer;';
	scrubber.setAttribute('aria-label', 'Seek');

	const forward = player.createButton('nm-tour-time-forward', 'Forward 10 seconds', () => {
		void player.forward(10);
	});
	forward.textContent = '+10s';
	forward.style.cssText = rewind.style.cssText;

	bar.append(rewind, scrubber, forward);

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
		player.off('duration', onDuration);
		player.off('time', onTime);
		scrubber.removeEventListener('pointerdown', onPointerDown);
		scrubber.removeEventListener('change', onChange);
		bar.remove();
	};
}

export default { config, onReady, player: 'music' as const };
