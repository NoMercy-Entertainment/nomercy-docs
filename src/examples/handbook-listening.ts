// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The full listening surface across two plugins. BeatPlugin emits a
 * namespaced event, but only when hasListeners says someone subscribed.
 * BeatLightPlugin requires it, subscribes with the typed class form of on(),
 * uses once() for one-shot setup, listen() for a DOM listener, and off() to
 * detach a handler early. Every subscription is released on dispose.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface BeatEvents {
	beat: { at: number };
}

class BeatPlugin extends Plugin<IPlayer<BaseEventMap>, unknown, BeatEvents> {
	static override readonly id = 'beat';
	static override readonly version = '1.0.0';
	static override readonly description = 'Detects beats and emits them, skipping the work when nobody listens.';

	override use(): void {
		this.on('time', () => {
			// Pure read; skip the detection work when nothing subscribed.
			if (!this.hasListeners(BeatPlugin, 'beat'))
				return;
			this.emit('beat', { at: Date.now() }); // plugin:beat:beat on the wire
		});
	}
}

class BeatLightPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'beat-light';
	static override readonly version = '1.0.0';
	static override readonly description = 'Flashes a light on every beat from the beat plugin.';
	static override readonly requires = [BeatPlugin];
	static override readonly priority = 5; // ahead of default-priority plugins in enabledPlugins()

	private readonly onTime = (): void => {
		this.logger.debug('still watching time');
	};

	override use(): void {
		// Class form: event and payload typed from BeatPlugin's event map.
		this.on(BeatPlugin, 'beat', ({ at }) => {
			this.logger.debug('beat at', at);
		});

		// One occurrence, then auto-removed. Removed on dispose if never fired.
		this.once('play', () => {
			this.logger.info('first play of this session');
		});

		// Memory-safe DOM listener: recorded with its options, removed on dispose.
		this.listen(document, 'visibilitychange', () => {
			if (document.hidden)
				this.logger.debug('tab hidden');
		});

		// Early detach: same function reference in on() and off().
		this.on('time', this.onTime);
		this.on('ended', () => this.off('time', this.onTime));
	}
}

const player = tourPlayer('handbook-listening');
player.addPlugin(BeatPlugin); // the dependency registers first
player.addPlugin(BeatLightPlugin);

player.setup({ logLevel: 'debug' });
await player.ready();

await player.play();

player.dispose(); // every player handler and the document listener are released
