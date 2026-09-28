// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: setup, ready, and dispose.
 *
 * `setup(config)` returns at once and starts the async pipeline.
 * Await `ready()` before using the player. Await `dispose()` when finished.
 */

import {
	type BaseEventMap,
	type BasePlayerConfig,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, LifecycleTourPlayer>();

class LifecycleTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare bumpActivity: () => void;
	declare activityTracking: {
		(): boolean;
		(enabled: boolean): boolean;
	};

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'LifecycleTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'LifecycleTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(LifecycleTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'lifecycle-tour';
mount.setAttribute('aria-label', 'Lifecycle tour player');
document.body.appendChild(mount);

const player = new LifecycleTourPlayer('lifecycle-tour');

player.on('playlistReady', ({ length }) => {
	console.log('playlist length:', length);
});

player.on('activity', ({ active }) => {
	console.log('activity:', active);
});

player.setup({
	logLevel: 'info',
});

await player.ready();

player.bumpActivity();
console.log(player.activityTracking()); // true

await player.dispose();
