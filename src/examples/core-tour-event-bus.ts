// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: listen on the player with on, once, and off.
 * Queue selection arrives on `item`. Subscribing to `current` never fires.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type BasePlaylistItem, type LoadOptions, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

const _instances = new Map<string, EventBusTourPlayer>();

class EventBusTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare queue: {
		(): ReadonlyArray<BasePlaylistItem>;
		(items: BasePlaylistItem[], opts?: ActionOptions): void;
	};
	declare item: {
		(): BasePlaylistItem | undefined;
		(
			target: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean),
			opts?: LoadOptions,
		): void;
	};

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'EventBusTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'EventBusTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(EventBusTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'event-bus-tour';
mount.setAttribute('aria-label', 'Event bus tour player');
document.body.appendChild(mount);

const player = new EventBusTourPlayer('event-bus-tour');
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.on('item', ({ item, index }) => {
	console.log('item', index, item?.id);
});

player.once('item', ({ index }) => {
	console.log('once', index);
});

const logAll = (event: string, data: unknown): void => {
	console.log('all', event, data);
};
player.on('all', logAll);

player.queue(films);
player.item(1, { autoplay: false });

console.log(player.hasListeners('item'));
console.log(player.listenerCount());

player.off('all', logAll);
player.off('item');

await player.dispose();
