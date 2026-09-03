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
 *
 * DOM construction (`createElement`) lives on the plugin, not the player —
 * `this.createElement(...)` inside `use()`, never `player.createElement(...)`
 * from the outside. `this.mount('root')` claims an auto-cleaned wrapper so
 * nothing has to be torn down by hand.
 */

import type { IVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const STORAGE_KEY = 'nm-docs-recipe-resume:sintel';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
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

class ResumeBadgePlugin extends Plugin<IVideoPlayer> {
	static override readonly id = 'nm-recipe-resume-badge';
	static override readonly description = 'Resume-position badge for the Persistence & Resume recipe.';

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		const badge = this.createElement('div', 'nm-resume-badge').appendTo(this.mount('root')).get();
		badge.style.cssText
			= 'position:absolute;right:1rem;top:1rem;padding:.35rem .6rem;border-radius:.5rem;'
				+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .75rem system-ui,sans-serif;pointer-events:none;';

		const saved = readSavedProgress();
		badge.textContent = saved ? `Resuming at ${Math.round(saved.time)}s` : 'No saved position yet';

		// mediaReady is the kit's signal that the backend accepted the source and
		// duration is known — seeking any earlier can be silently dropped.
		this.once('mediaReady', () => {
			if (saved && saved.time > 0)
				void this.player.time(saved.time);
		});

		this.on('progress', ({ time, percentage }) => {
			const record: SavedProgress = { time, percentage, timestamp: Date.now() };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
			badge.textContent = `Saved at ${Math.round(time)}s (${Math.round(percentage)}%)`;
		});
	}
}

function configure(player: IVideoPlayer): void {
	player.addPlugin(ResumeBadgePlugin);
}

export default { config, configure };
