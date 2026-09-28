// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: state readers and writable modes.
 *
 * `playState()` and friends are snapshots. Pair a read with the event that
 * changed the value. `repeatState(state)` and `shuffleState(state)` return a
 * promise because the write runs the cancellable before* cycle.
 */

import {
	type AudioTrackState,
	type BaseEventMap,
	type BasePlayerConfig,
	type BufferState,
	type NetworkState,
	type PlayState,
	type QualityState,
	RepeatState,
	type ShuffleState,
	type VisibilityState,
	type VolumeState,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, StateTourPlayer>();

class StateTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare playState: () => PlayState;
	declare volumeState: () => VolumeState;
	declare repeatState: {
		(): RepeatState;
		(state: RepeatState): Promise<void>;
	};
	declare shuffleState: {
		(): ShuffleState;
		(state: ShuffleState | boolean): Promise<void>;
	};
	declare bufferState: () => BufferState;
	declare networkState: () => NetworkState;
	declare streamState: () => string;
	declare visibilityState: () => VisibilityState;
	declare qualityMode: {
		(): QualityState;
		(target: number | 'auto'): void;
	};
	declare audioTrackMode: {
		(): AudioTrackState;
		(idx: number): void;
	};

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'StateTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'StateTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(StateTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'state-tour';
mount.setAttribute('aria-label', 'State tour player');
document.body.appendChild(mount);

const player = new StateTourPlayer('state-tour');
player.setup({
	logLevel: 'info',
});
await player.ready();

console.log(player.playState()); // 'idle'
console.log(player.volumeState()); // 'unmuted'
console.log(player.repeatState()); // 'off'
console.log(player.shuffleState()); // 'off'
console.log(player.bufferState()); // 'idle'
console.log(player.networkState()); // 'online'
console.log(player.streamState()); // 'idle'
console.log(player.visibilityState()); // 'visible'
console.log(player.qualityMode()); // 'auto'
console.log(player.audioTrackMode()); // 'default'

player.on('beforeMutation', (event) => {
	if (event.data.method === 'current')
		event.preventDefault();
});

await player.repeatState(RepeatState.ALL);
console.log(player.repeatState()); // 'all'

await player.dispose();
