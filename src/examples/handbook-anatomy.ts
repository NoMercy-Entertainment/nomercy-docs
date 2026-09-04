// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The full plugin contract in one file: the static identity fields, the
 * initialize -> use -> dispose order, enable/disable with a reason, and the
 * scoped logger and storage every subclass receives. The plugin counts
 * watched seconds while enabled and persists the total on dispose.
 */

import type { BaseEventMap, IPlayer, Translations } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface WatchTimerOpts {
	label?: string;
}

interface WatchTimerEvents {
	tick: { watchedSeconds: number };
}

class WatchTimerPlugin extends Plugin<IPlayer<BaseEventMap>, WatchTimerOpts, WatchTimerEvents> {
	static override readonly id = 'watch-timer';
	static override readonly version = '1.0.0';
	static override readonly description = 'Counts watched seconds while enabled and persists the total.';
	static override readonly priority = 10;
	static override readonly translations: Translations = {
		en: { 'plugin.watch-timer.label': 'Watch timer' },
	};

	private watchedSeconds = 0;

	override use(): void {
		// initialize() already ran: this.player, this.opts, this.logger and
		// this.storage all exist here. Logger lines carry [nmplayer][watch-timer].
		this.logger.info('starting as:', this.opts.label ?? this.t('label'));

		this.on('time', () => {
			// disable() does not detach listeners; guard with enabled().
			if (!this.enabled())
				return;
			this.watchedSeconds += 1;
			this.emit('tick', { watchedSeconds: this.watchedSeconds }); // plugin:watch-timer:tick
		});

		this.on('error', () => {
			this.disable('player-error');
		});
	}

	protected override getRuntimeState(): Record<string, unknown> {
		return { watchedSeconds: this.watchedSeconds };
	}

	override dispose(): void {
		// Only untracked resources belong here. Listeners are already gone.
		// Storage keys land as nmplayer-watch-timer-last-session.
		this.storage.set('last-session', String(this.watchedSeconds));
	}
}

const player = tourPlayer('handbook-anatomy');
player.addPlugin(WatchTimerPlugin, { label: 'Living room' });

player.setup({ logLevel: 'info' });
await player.ready();

const timer = player.getPlugin(WatchTimerPlugin);
console.log(timer?.enabled()); // true
console.log(timer?.state()); // { id, version, enabled, opts, runtime }

player.on('plugin:watch-timer:disabled', ({ reason }) => {
	console.log('disabled because:', reason);
});

player.dispose(); // runs dispose(): the total is persisted, listeners are released
