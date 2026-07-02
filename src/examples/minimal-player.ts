// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Composing a minimal player straight from `nomercy-player-core`.
 *
 * This is the same shape `NMVideoPlayer` and `NMMusicPlayer` are built from —
 * a class extending `EventEmitter`, a three-form constructor resolved by
 * `resolvePlayerConstructor`, and every shared behavior (lifecycle, setup,
 * transport, time, volume, queue, tracks, plugins, i18n, auth) stamped onto
 * the prototype in one `composeMixins` call. The only thing a real player adds
 * on top is a media backend — `MinimalPlayer` has none, so `play()` and
 * friends are wired but have nothing to drive; `setup()`/`ready()`/`dispose()`
 * and every non-media read (queue, volume, phase, i18n) work exactly as they
 * do in the trio.
 */

import type { BaseEventMap, BasePlayerConfig, PlayerPhase } from '@nomercy-entertainment/nomercy-player-core';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, MinimalPlayer>();

class MinimalPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	// Declared here so TypeScript sees the methods `composeMixins` stamps onto
	// the prototype below — the kit can't merge runtime mixin shapes into the
	// class type automatically, so the surface a consumer actually calls needs
	// a matching `declare`.
	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => void;
	declare phase: () => PlayerPhase;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'MinimalPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'MinimalPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

// One call stamps every shared mixin — lifecycle, transport, time, volume,
// queue, tracks, plugins, i18n, auth — onto the prototype. `playerCoreMethods`
// is the exact aggregate NMVideoPlayer and NMMusicPlayer compose; nothing here
// is a cut-down or reimplemented subset of what they use.
composeMixins(MinimalPlayer.prototype, ...playerCoreMethods);

/** Mount (or retrieve) the player bound to a container `<div id="...">`. */
export function minimalPlayer(id?: string | number): MinimalPlayer {
	return new MinimalPlayer(id);
}

// Usage — same call shape a consumer writes against the published package:
//
//   const player = minimalPlayer('player-container');
//   player.setup({ logLevel: 'info' });
//   await player.ready();
//   console.log(player.phase()); // 'ready'
//   player.dispose();
