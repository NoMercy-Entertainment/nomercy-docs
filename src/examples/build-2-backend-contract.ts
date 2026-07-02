// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a player, step 2: wire a backend contract.
 *
 * Same three-ingredient shell as step 1 (extend `EventEmitter`, resolve the
 * constructor, `composeMixins(...playerCoreMethods)`), plus one new method:
 * `backend()`. This is the exact integration point `NMVideoPlayer` and
 * `NMMusicPlayer` use to attach a real `<video>`/`<audio>` element — the kit's
 * transport, time, and volume mixins already call `this.backend()` internally
 * and drive whatever it returns. Nothing about step 1's composition changes;
 * this step only gives the kit something to talk to.
 *
 * `FakeBackend` is not a mock of a real backend, it's the same minimal shape
 * (`play`, `pause`, `currentTime`, `volume`, ...) a real one satisfies, with
 * an in-memory `calls` log standing in for "a video frame decoded" or
 * "an AudioContext gain changed" so the wiring is provable without a DOM.
 */

import type { BaseEventMap, BasePlayerConfig, IPlayerBackend, PlayerPhase } from '@nomercy-entertainment/nomercy-player-core';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

/**
 * Structural contract the kit's mixins probe with optional chaining
 * (`this._resolveBackend()?.play?.()` and friends) — every member is a
 * capability the backend may or may not implement. `IPlayerBackend` (the
 * public type) only covers `mediaElement()` / `outputNode()`; the transport
 * fields below are the same names a real backend adds on top, structurally.
 */
interface FakeBackendShape extends IPlayerBackend {
	play(): void;
	pause(): void;
	currentTime(seconds: number): void;
	volume(level: number): void;
}

class FakeBackend implements FakeBackendShape {
	readonly calls: string[] = [];
	private playing = false;

	play(): void {
		this.playing = true;
		this.calls.push('play');
	}

	pause(): void {
		this.playing = false;
		this.calls.push('pause');
	}

	currentTime(seconds: number): void {
		this.calls.push(`currentTime(${seconds})`);
	}

	volume(level: number): void {
		this.calls.push(`volume(${level})`);
	}

	state(): 'playing' | 'idle' {
		return this.playing ? 'playing' : 'idle';
	}
}

const _instances = new Map<string, KitPlayer>();

class KitPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => void;
	declare phase: () => PlayerPhase;
	declare play: () => Promise<void>;
	declare pause: () => Promise<void>;
	declare time: { (): number; (seconds: number): Promise<void> };
	declare volume: { (): number; (level: number): Promise<void> };

	// New in this step. Lazily instantiated, same as a real player's backend
	// field — the kit never constructs your backend for you, it only calls
	// `backend()` once one exists.
	private _backend: FakeBackend | undefined;
	backend(): FakeBackend {
		if (!this._backend) {
			this._backend = new FakeBackend();
		}
		return this._backend;
	}

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'KitPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'KitPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(KitPlayer.prototype, ...playerCoreMethods);

export function kitPlayer(id?: string | number): KitPlayer {
	return new KitPlayer(id);
}

// Usage — play/seek/volume now reach the backend instead of being no-ops.
const player = kitPlayer('build-step-2');
player.setup({ logLevel: 'info' });
await player.ready();

await player.play();
await player.time(30);
await player.volume(50);

console.log(player.backend().calls); // ['play', 'currentTime(30)', 'volume(0.5)']
console.log(player.backend().state()); // 'playing'

await player.dispose();
