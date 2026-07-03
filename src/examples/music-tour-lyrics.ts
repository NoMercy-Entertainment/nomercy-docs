// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Lyrics: LyricsPlugin fetches `item.lyricsUrl`, parses it through the kit's
 * cue parser registry (an `.lrc` file here), and fires `plugin:lyrics:line`
 * on every active-line change.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
}

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	const bar = player.createElement('div', 'nm-tour-lyrics-bar').appendTo(container).get();
	bar.style.cssText
		= 'display:flex;align-items:center;justify-content:center;height:100%;padding:0 1.25rem;'
			+ 'color:#fff;font-family:system-ui,sans-serif;text-align:center;';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	const line = player.createElement('span', 'nm-tour-lyrics-line').appendTo(bar).get();
	line.style.cssText = 'font-size:1rem;opacity:.9;';
	line.textContent = 'Loading lyrics…';

	// LyricsPlugin's own events are auto-namespaced onto the player's event bus
	// as `plugin:lyrics:<event>` — there's no separate emitter on the plugin
	// instance to subscribe to directly.
	const onLine = (payload: { text: string }): void => {
		line.textContent = payload.text;
	};
	const onLoaded = ({ count }: { count: number }): void => {
		if (count === 0)
			line.textContent = 'No synced lines in this file.';
	};
	player.on('plugin:lyrics:lineEnter', onLine);
	player.on('plugin:lyrics:loaded', onLoaded);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('plugin:lyrics:lineEnter', onLine);
		player.off('plugin:lyrics:loaded', onLoaded);
		bar.remove();
	};
}

export default { config, configure, onReady, player: 'music' as const };
