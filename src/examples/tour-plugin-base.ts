// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The `Plugin` base class. Subclassing it gets you a scoped logger,
 * namespaced storage, a cancellable `dispatchBefore` surface, namespaced
 * i18n, and auto-cleanup timers/listeners — all torn down together when the
 * plugin (or the player) disposes. This plugin counts `play()` calls and
 * emits a namespaced milestone event every N plays.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface PlayCounterEvents {
	milestone: { count: number };
}

class PlayCounterPlugin extends Plugin<IPlayer<BaseEventMap>, { everyNPlays?: number }, PlayCounterEvents> {
	static override readonly id = 'play-counter';
	static override readonly version = '1.0.0';
	static override readonly description = 'Counts play() calls and reports a milestone every N plays.';

	private plays = 0;

	override use(): void {
		const every = this.opts.everyNPlays ?? 5;

		this.on('play', () => {
			this.plays += 1;
			this.logger.debug(`play #${this.plays}`);
			if (this.plays % every === 0) {
				this.emit('milestone', { count: this.plays }); // namespaced as plugin:play-counter:milestone
			}
		});
	}

	protected override getRuntimeState(): Record<string, unknown> {
		return { plays: this.plays };
	}
}

const player = tourPlayer('plugin-demo');
player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });

player.setup({ logLevel: 'info' });
await player.ready();

player.on('plugin:play-counter:milestone', ({ count }) => {
	console.log('milestone reached:', count);
});

await player.play();
await player.pause();
await player.play(); // second play() call — fires the milestone at everyNPlays: 2

const instance = player.getPlugin(PlayCounterPlugin);
console.log(instance?.state().runtime); // { plays: 2 }

await player.dispose();
