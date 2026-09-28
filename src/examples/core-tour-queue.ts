// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: queue cursor and race-free play.
 *
 * `item(target)` starts load without returning a promise. A separate `play()`
 * on the next line can run before the backend sets the element source.
 * `item(target, { autoplay: true })`, `playItem`, and `playNow` call `play`
 * only inside the resolved load continuation.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type BasePlaylistItem, type LoadOptions, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

const _instances = new Map<string, QueueTourPlayer>();

class QueueTourPlayer extends EventEmitter<BaseEventMap> {
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
	declare queueAppend: (item: BasePlaylistItem | BasePlaylistItem[], opts?: ActionOptions) => void;
	declare queueLength: () => number;
	declare peekNext: () => BasePlaylistItem | undefined;
	declare index: () => number;
	declare item: {
		(): BasePlaylistItem | undefined;
		(
			target: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean),
			opts?: LoadOptions,
		): void;
	};
	declare playItem: (
		target: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean),
		opts?: LoadOptions,
	) => void;
	declare playNow: (
		items: BasePlaylistItem[],
		start?: BasePlaylistItem | string | number | ((item: BasePlaylistItem) => boolean),
		opts?: LoadOptions,
	) => void;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'QueueTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'QueueTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(QueueTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'queue-tour';
mount.setAttribute('aria-label', 'Queue tour player');
document.body.appendChild(mount);

const player = new QueueTourPlayer('queue-tour');
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.on('item', ({ item, index }) => {
	console.log('cursor:', index, item?.id);
});

player.queue(films);
console.log(player.item()?.id); // 'sintel'
console.log(player.peekNext()?.id); // 'cosmos-laundromat'
console.log(player.queueLength()); // 3

// Do not write: player.item(1); player.play();
// item() starts load without awaiting it, so play() can run before the source is set.

// Safe: play runs only after load resolves.
player.item(1, { autoplay: true });
console.log(player.index()); // 1

player.queueAppend({
	id: 'encore',
	title: 'Encore',
	url: films[0].url,
});

player.playItem('encore');
player.playNow(films, 'big-buck-bunny');

await player.dispose();
