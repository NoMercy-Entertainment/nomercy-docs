// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Compose a player class from `@nomercy-entertainment/nomercy-player-core`.
 *
 * Same shape `NMVideoPlayer` and `NMMusicPlayer` use: extend `EventEmitter`,
 * resolve the constructor with `resolvePlayerConstructor`, seed state with
 * `initPlayerCoreState`, then stamp `playerCoreMethods` onto the prototype with
 * `composeMixins`. This class has no media backend, so transport methods have
 * nothing to drive. `setup()`, `ready()`, and `dispose()` run without one.
 */

import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
	type BaseEventMap,
	type BasePlayerConfig,
	type PlayerPhase,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, CorePlayer>();

class CorePlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	// TypeScript cannot infer methods composeMixins stamps onto the prototype,
	// so declare the surface this sample calls.
	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare phase: () => PlayerPhase;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'CorePlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'CorePlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(CorePlayer.prototype, ...playerCoreMethods);

/** Mount (or retrieve) the player bound to a container `<div id="...">`. */
export function corePlayer(id?: string | number): CorePlayer {
	return new CorePlayer(id);
}

const mount = document.createElement('div');
mount.id = 'player';
mount.setAttribute('aria-label', 'Player');
document.body.appendChild(mount);

const player = corePlayer('player');
player.setup({ logLevel: 'info' });
await player.ready();
console.log(player.phase()); // 'ready'
await player.dispose();
