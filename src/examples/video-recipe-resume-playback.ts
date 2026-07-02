// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Persistence & Resume. Saves the watch position to `localStorage` on
 * every `'progress'` event (throttled by `progressIntervalMs`, cheap enough
 * to persist on every fire) and seeks back to it once the backend confirms
 * the source is ready. This is the same mechanism `autoPlay` + `item.progress`
 * automate across a real page reload — this example proves it within one
 * mounted session since the docs preview can't reload the page for you.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const STORAGE_KEY = 'nm-docs-recipe-resume:sintel';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	playlist: [sintel],
};

interface SavedProgress {
	time: number;
	percentage: number;
	timestamp: number;
}

function readSavedProgress(): SavedProgress | null {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as SavedProgress) : null;
	}
	catch {
		return null;
	}
}

function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const badge = player.createElement('div', 'nm-resume-badge').appendTo(container).get();
	badge.style.cssText
		= 'position:absolute;right:1rem;top:1rem;padding:.35rem .6rem;border-radius:.5rem;'
			+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .75rem system-ui,sans-serif;pointer-events:none;';

	const saved = readSavedProgress();
	badge.textContent = saved ? `Resuming at ${Math.round(saved.time)}s` : 'No saved position yet';

	// mediaReady is the kit's signal that the backend accepted the source and
	// duration is known — seeking any earlier can be silently dropped.
	const resumeOnce = (): void => {
		if (saved && saved.time > 0)
			void player.time(saved.time);
		player.off('mediaReady', resumeOnce);
	};
	player.on('mediaReady', resumeOnce);

	const onProgress = ({ time, percentage }: { time: number; duration: number; percentage: number }): void => {
		const record: SavedProgress = { time, percentage, timestamp: Date.now() };
		localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
		badge.textContent = `Saved at ${Math.round(time)}s (${Math.round(percentage)}%)`;
	};
	player.on('progress', onProgress);

	return () => {
		player.off('mediaReady', resumeOnce);
		player.off('progress', onProgress);
		badge.remove();
	};
}

export default { config, onReady };
