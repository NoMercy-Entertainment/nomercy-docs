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
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside. `this.mount('root')` claims
 * an auto-cleaned wrapper, and `this.listen()` detaches its DOM listeners on
 * dispose, so nothing has to be torn down by hand.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: [firstSong],
};

class TimeTourPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-tour-time';
	static override readonly description = 'Rewind/forward buttons plus a scrubber for the Time & seeking tour page.';

	private scrubber!: HTMLInputElement;
	private dragging = false;

	override use(): void {
		const bar = this.createElement('div', 'nm-tour-time-bar').appendTo(this.mount('root')).get();
		bar.style.cssText
			= 'display:flex;align-items:center;gap:.75rem;height:100%;padding:0 1.25rem;color:#fff;font-family:system-ui,sans-serif;';

		const rewind = this.createButton('nm-tour-time-rewind', 'Rewind 10 seconds', () => {
			void this.player.rewind(10);
		});
		rewind.textContent = '−10s';
		rewind.style.cssText
			= 'height:2rem;padding:0 .6rem;border:0;border-radius:.4rem;background:transparent;'
				+ 'color:#fff;font-size:.8rem;cursor:pointer;flex:none;';

		this.scrubber = this.createElement('input', 'nm-tour-time-scrubber').appendTo(bar).get();
		this.scrubber.type = 'range';
		this.scrubber.min = '0';
		this.scrubber.max = String(this.player.duration() || 0);
		this.scrubber.step = '0.1';
		this.scrubber.value = '0';
		this.scrubber.style.cssText = 'flex:1;accent-color:#fff;cursor:pointer;';
		this.scrubber.setAttribute('aria-label', 'Seek');

		const forward = this.createButton('nm-tour-time-forward', 'Forward 10 seconds', () => {
			void this.player.forward(10);
		});
		forward.textContent = '+10s';
		forward.style.cssText = rewind.style.cssText;

		bar.append(rewind, this.scrubber, forward);

		this.listen(this.scrubber, 'pointerdown', () => { this.dragging = true; });
		this.listen(this.scrubber, 'change', () => {
			this.dragging = false;
			void this.player.time(Number(this.scrubber.value));
		});

		this.on('duration', ({ duration }) => {
			this.scrubber.max = String(duration);
		});
		this.on('time', ({ time }) => {
			if (!this.dragging)
				this.scrubber.value = String(time);
		});
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(TimeTourPlugin);
}

function onReady(player: IMusicPlayer): void {
	player.item(0, { autoplay: false });
}

export default { config, configure, onReady, player: 'music' as const };
