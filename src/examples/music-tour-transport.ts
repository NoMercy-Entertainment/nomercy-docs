// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Transport: play(), pause(), togglePlayback(), next()/previous(). Music
 * ships no play button of its own, so this builds the smallest possible bar
 * to give the same methods Build a Player wires later something visible to
 * drive. `item(0, { autoplay: false })` cues the first track so the bar has
 * something to act on; pressing play is what starts it, which is also the
 * gesture the browser's autoplay policy wants.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

class TransportTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-transport';
	static override readonly description = 'Previous/play-pause/next transport bar for the Transport tour page.';

	private playPause!: HTMLButtonElement;
	private nowPlaying!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-transport-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const previous = this.createButton('nm-tour-transport-previous', 'Previous', () => {
			void this.player.previous();
		});
		previous.textContent = '⏮';

		this.playPause = this.createButton('nm-tour-transport-play-pause', 'Play', () => {
			void this.player.togglePlayback();
		});

		const next = this.createButton('nm-tour-transport-next', 'Next', () => {
			void this.player.next();
		});
		next.textContent = '⏭';

		for (const button of [previous, this.playPause, next]) {
			button.style.cssText
				= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
					+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
		}
		bar.append(previous, this.playPause, next);

		this.nowPlaying = this.createElement('span', 'nm-tour-transport-now-playing').appendTo(bar).get();
		this.nowPlaying.style.cssText = 'margin-left:.5rem;font-size:.85rem;opacity:.8;';

		this.on('play', () => this.syncPlayPause());
		this.on('pause', () => this.syncPlayPause());
		this.on('playing', () => this.syncPlayPause());
		this.on('item', ({ item }) => {
			this.nowPlaying.textContent = item?.name ?? '';
		});
		this.syncPlayPause();
	}

	private syncPlayPause(): void {
		const playing = this.player.playState() === PlayState.PLAYING;
		this.playPause.textContent = playing ? '⏸' : '▶';
		this.playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(TransportTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	player.item(0, { autoplay: false });
}

export default { config, configure, onReady, player: 'music' as const };
