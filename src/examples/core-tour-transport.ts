// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: play, pause, stop, load, and relative seek.
 *
 * Transport forwards each call to `backend()`. A stub backend here proves the
 * wiring without a live media element. Await `load` before `play` when you
 * choose the item yourself.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type BasePlaylistItem, type IPlayerBackend, type LoadOptions, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

interface StubBackend extends IPlayerBackend {
	readonly calls: string[];
	play(): Promise<void>;
	pause(): void;
	stop(): void;
	load(url: string, opts?: { startTime?: number }): Promise<void>;
	currentTime(seconds: number): void;
}

class TransportStubBackend implements StubBackend {
	readonly calls: string[] = [];

	async play(): Promise<void> {
		this.calls.push('play');
	}

	pause(): void {
		this.calls.push('pause');
	}

	stop(): void {
		this.calls.push('stop');
	}

	async load(url: string, opts?: { startTime?: number }): Promise<void> {
		this.calls.push(opts?.startTime !== undefined
			? `load(${url}, ${opts.startTime})`
			: `load(${url})`);
	}

	currentTime(seconds: number): void {
		this.calls.push(`currentTime(${seconds})`);
	}
}

const _instances = new Map<string, TransportTourPlayer>();

class TransportTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;
	private readonly _backend = new TransportStubBackend();

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare play: (opts?: ActionOptions) => Promise<void>;
	declare pause: (opts?: ActionOptions) => Promise<void>;
	declare stop: (opts?: ActionOptions) => Promise<void>;
	declare togglePlayback: (opts?: ActionOptions) => Promise<void>;
	declare rewind: (seconds?: number, opts?: ActionOptions) => Promise<void>;
	declare forward: (seconds?: number, opts?: ActionOptions) => Promise<void>;
	declare restart: (opts?: ActionOptions) => Promise<void>;
	declare next: (opts?: LoadOptions) => Promise<void>;
	declare previous: (opts?: LoadOptions) => Promise<void>;
	declare load: (item: BasePlaylistItem, opts?: LoadOptions) => Promise<void>;
	declare queue: {
		(): ReadonlyArray<BasePlaylistItem>;
		(items: BasePlaylistItem[], opts?: ActionOptions): void;
	};

	backend(): StubBackend {
		return this._backend;
	}

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'TransportTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'TransportTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(TransportTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'transport-tour';
mount.setAttribute('aria-label', 'Transport tour player');
document.body.appendChild(mount);

const player = new TransportTourPlayer('transport-tour');
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.queue(films);

player.on('mediaReady', () => {
	console.log('mounted');
});

player.on('playPrevented', ({ reason }) => {
	console.log('play blocked:', reason);
});

// Await load before play when you choose the item yourself.
await player.load(films[0], { startAt: 5 });
await player.play();
await player.forward(10);
await player.pause();
await player.rewind(5);
await player.togglePlayback();
await player.stop();

console.log(player.backend().calls);

await player.dispose();
