// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build: compose shared methods onto a player class.
 *
 * Extends EventEmitter, resolves the three-form constructor with
 * resolvePlayerConstructor, seeds state with initPlayerCoreState, then stamps
 * playerCoreMethods with composeMixins. That is the same composition path
 * NMVideoPlayer and NMMusicPlayer use. This class has no media backend, so
 * transport calls have nothing to drive; setup, ready, dispose, phase, and
 * non-media reads still work.
 */

import {
	type BaseEventMap,
	type BasePlayerConfig,
	type PlayerPhase,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, ComposedPlayer>();

class ComposedPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	// declare tells TypeScript about methods composeMixins stamps at runtime.
	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare phase: () => PlayerPhase;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'ComposedPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'ComposedPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

// Later modules in the spread win on key collisions. playerCoreMethods is the
// as const tuple both real players compose; nothing here is a cut-down subset.
composeMixins(ComposedPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'compose-demo';
mount.setAttribute('aria-label', 'Composed player mount');
document.body.appendChild(mount);

const player = new ComposedPlayer('compose-demo');
player.setup({ logLevel: 'info' });
await player.ready();
console.log(player.phase()); // 'ready'
player.dispose();
