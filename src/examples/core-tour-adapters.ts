// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: IClock and systemClock.
 *
 * `systemClock.now()` delegates to `Date.now()`. A custom `IClock` supplies a
 * fixed millisecond value. Pass it into setup as `clockSource: () => clock.now()`
 * because `clockSource` is a function that returns the integer, not the object.
 */

import type { IClock } from '@nomercy-entertainment/nomercy-player-core/adapters/clock';
import { systemClock } from '@nomercy-entertainment/nomercy-player-core/adapters/clock';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
	type BaseEventMap,
	type BasePlayerConfig,
} from '@nomercy-entertainment/nomercy-player-core';

console.log(systemClock.now());

const fixed: IClock = {
	now: () => 1_700_000_000_000,
};

console.log(fixed.now()); // 1700000000000

const _instances = new Map<string, AdaptersTourPlayer>();

class AdaptersTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare now: () => number;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'AdaptersTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'AdaptersTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(AdaptersTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'adapters-tour';
mount.setAttribute('aria-label', 'Adapters tour player');
document.body.appendChild(mount);

const player = new AdaptersTourPlayer('adapters-tour');
player.setup({
	logLevel: 'info',
	clockSource: () => fixed.now(),
});
await player.ready();
console.log(player.now()); // 1700000000000
await player.dispose();
