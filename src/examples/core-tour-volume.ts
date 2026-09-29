// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: volume position, mute, and perceptualGain.
 *
 * `volume()` speaks in 0..100 positions. While muted the getter returns 0.
 * `perceptualGain` squares a 0..1 position into the gain a backend writes.
 */

import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	perceptualGain,
	playerCoreMethods,
	resolvePlayerConstructor,
	type BaseEventMap,
	type BasePlayerConfig,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, VolumeTourPlayer>();

class VolumeTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare volume: {
		(): number;
		(level: number): number | Promise<void>;
	};
	declare volumeUp: (step?: number) => void;
	declare volumeDown: (step?: number) => void;
	declare mute: () => Promise<void>;
	declare unmute: () => Promise<void>;
	declare toggleMute: () => void;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'VolumeTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'VolumeTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(VolumeTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'tour-volume';
mount.setAttribute('aria-label', 'Volume tour player');
document.body.appendChild(mount);

const player = new VolumeTourPlayer('tour-volume');
player.setup({
	logLevel: 'info',
});
await player.ready();

player.on('volume', ({ level }) => {
	console.log('level', level);
});

player.on('mute', ({ muted }) => {
	console.log('muted', muted);
});

console.log(player.volume());
await player.volume(50);
console.log(player.volume()); // 50

player.volumeDown();
player.volumeUp(10);

console.log(perceptualGain(0.5)); // 0.25
console.log(perceptualGain(0.3)); // 0.09
console.log(perceptualGain(0)); // 0

await player.mute();
console.log(player.volume()); // 0 while muted
await player.unmute();
console.log(player.volume()); // restored position

player.toggleMute();

await player.dispose();
