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
 *
 * DOM construction (`createElement`) lives on the plugin, not the player —
 * `this.createElement(...)` inside `use()`, never `player.createElement(...)`
 * from the outside. `this.mount('root')` claims an auto-cleaned wrapper so
 * nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

class LyricsTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-lyrics';
	static override readonly description = 'Synced lyric line for the Lyrics tour page.';
	static override readonly requires = [{ plugin: LyricsPlugin, optional: true }];

	private line!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-lyrics-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;justify-content:center;height:100%;padding:0 1.25rem;'
				+ 'color:#fff;font-family:system-ui,sans-serif;text-align:center;';

		this.line = this.createElement('span', 'nm-tour-lyrics-line').appendTo(bar).get();
		this.line.style.cssText = 'font-size:1rem;opacity:.9;';
		this.line.textContent = 'Loading lyrics…';

		// LyricsPlugin's namespaced events are subscribed through the typed
		// class-form listener instead of the raw `'plugin:lyrics:<event>'` string.
		this.on(LyricsPlugin, 'lineEnter', ({ text }) => {
			this.line.textContent = text;
		});
		this.on(LyricsPlugin, 'loaded', ({ count }) => {
			if (count === 0)
				this.line.textContent = 'No synced lines in this file.';
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
	player.addPlugin(LyricsTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
