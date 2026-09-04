// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Playback state & events: the typed coarse-state readers (playState(),
 * bufferState(), networkState()) plus a play/pause button so toggling state
 * is visible immediately. bufferState()/networkState() have no dedicated
 * push event on this library, so this polls them on a short interval
 * instead of subscribing.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper, and `this.interval()` cancels itself on dispose,
 * so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

class StateEventsTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-state-events';
	static override readonly description = 'Play/pause button plus polled state readout for the Playback state & events tour page.';

	private playPause!: HTMLButtonElement;
	private status!: HTMLSpanElement;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-state-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		this.playPause = this.createButton('nm-tour-state-play-pause', 'Play', () => {
			void this.player.togglePlayback();
		});
		this.playPause.style.cssText
			= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
				+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';

		this.status = this.createElement('span', 'nm-tour-state-status').appendTo(bar).get();
		this.status.style.cssText = 'font-size:.8rem;opacity:.8;font-family:monospace;';

		bar.append(this.playPause, this.status);

		this.on('play', () => this.syncPlayPause());
		this.on('pause', () => this.syncPlayPause());
		this.on('playing', () => this.syncPlayPause());
		this.syncPlayPause();

		this.interval(() => this.renderStatus(), 1000);
	}

	private renderStatus(): void {
		this.status.textContent
			= `play:${this.player.playState()} buffer:${this.player.bufferState()} network:${this.player.networkState()}`;
	}

	private syncPlayPause(): void {
		const playing = this.player.playState() === PlayState.PLAYING;
		this.playPause.textContent = playing ? '⏸' : '▶';
		this.playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
		this.renderStatus();
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(StateEventsTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	player.item(0, { autoplay: false });
}

export default { config, configure, onReady, player: 'music' as const };
