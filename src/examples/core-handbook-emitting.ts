// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: before* cancel/reshape via the shared dispatcher, then emit side effects.
 *
 * `runDispatchBefore` drives the cancellable pass. Container-class emit adds
 * playback classes and flips play state to error on `fatal` before listeners run.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type PlayState, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor, runDispatchBefore } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

const _instances = new Map<string, EmittingHandbookPlayer>();

class EmittingHandbookPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare playState: () => PlayState;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'EmittingHandbookPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'EmittingHandbookPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(EmittingHandbookPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-emitting';
mount.setAttribute('aria-label', 'Emitting handbook player');
document.body.appendChild(mount);

const player = new EmittingHandbookPlayer('handbook-emitting');
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.on('beforePlay', (e) => {
	e.data = { ...e.data, source: String(films[0].id) };
});

const reshaped = await runDispatchBefore<ActionOptions>(player, 'beforePlay', { source: 'app' });
console.log(reshaped.prevented, reshaped.data.source);

player.on('beforePlay', (e) => {
	e.preventDefault();
});

const blocked = await runDispatchBefore<ActionOptions>(player, 'beforePlay', { source: 'app' });
console.log(blocked.prevented, blocked.reason);

player.emit('play');
console.log(player.container.classList.contains('playing')); // true

player.emit('fatal');
console.log(player.playState()); // 'error', already set when fatal listeners run

await player.dispose();
