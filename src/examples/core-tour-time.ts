// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: time reads, seek, and mediaReady.
 *
 * Position and duration are seconds. After a cursor move, slots are zero before
 * `item` fires, so wait for `mediaReady` before reading the new item's position.
 */

import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
	type ActionOptions,
	type BaseEventMap,
	type BasePlayerConfig,
	type TimeState,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, TimeTourPlayer>();

class TimeTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare time: {
		(): number;
		(seconds: number, opts?: ActionOptions): number | Promise<void>;
	};
	declare duration: () => number;
	declare timeData: () => TimeState;
	declare seekByPercentage: (pct: number, opts?: ActionOptions) => void;
	declare buffered: () => number;
	declare playbackRate: {
		(): number;
		(rate: number): number | Promise<void>;
	};
	declare playbackRates: () => number[];

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'TimeTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'TimeTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(TimeTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'time-tour';
mount.setAttribute('aria-label', 'Time tour player');
document.body.appendChild(mount);

const player = new TimeTourPlayer('time-tour');
player.setup({
	logLevel: 'info',
	itemEndingSoonThreshold: 30,
});
await player.ready();

player.on('mediaReady', () => {
	console.log(player.time(), player.duration());
});

console.log(player.time()); // 0
console.log(player.duration()); // 0

const snapshot: TimeState = player.timeData();
console.log(snapshot.position, snapshot.percentage);

player.seekByPercentage(50);
await player.time(10);

console.log(player.playbackRate()); // 1
console.log(player.playbackRates()); // [0.5, 0.75, 1, 1.25, 1.5, 2]
console.log(player.buffered()); // 0

await player.dispose();
