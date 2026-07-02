// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a player, step 3: add a plugin.
 *
 * Same `KitPlayer` as step 2 (compose the mixins, wire `backend()`), with one
 * addition: a `Plugin` subclass registered via `addPlugin()` before `setup()`.
 * Nothing about steps 1-2 changes to make this work — plugins are a runtime
 * extension point the kit already carries, not something the player class has
 * to opt into. `PlayCounterPlugin` reacts to the same `play` event the
 * backend wiring from step 2 now actually triggers, and emits its own
 * namespaced event when a threshold is crossed.
 */

import type { BaseEventMap, BasePlayerConfig, IPlayer, IPlayerBackend, PlayerPhase, PluginCtorWithId } from '@nomercy-entertainment/nomercy-player-core';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	Plugin,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

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

	// New in this step — the registration surface `addPlugin`/`getPlugin`
	// stamp onto every kit composition, same as the rest of playerCoreMethods.
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined;

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

// New in this step — a plugin, same shape as any third-party extension.
interface PlayCounterEvents {
	milestone: { count: number };
}

class PlayCounterPlugin extends Plugin<IPlayer<BaseEventMap>, { everyNPlays?: number }, PlayCounterEvents> {
	static override readonly id = 'play-counter';
	static override readonly description = 'Counts play() calls and reports a milestone every N plays.';

	private plays = 0;

	override use(): void {
		const every = this.opts.everyNPlays ?? 2;
		this.on('play', () => {
			this.plays += 1;
			if (this.plays % every === 0) {
				this.emit('milestone', { count: this.plays }); // namespaced as plugin:play-counter:milestone
			}
		});
	}
}

// Usage — register BEFORE setup() so the plugin's use() runs during the pipeline.
const player = kitPlayer('build-step-3');
player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });

player.setup({ logLevel: 'info' });
await player.ready();

player.on('plugin:play-counter:milestone', ({ count }) => {
	console.log('milestone reached:', count);
});

await player.play();
await player.pause();
await player.play(); // second play() — fires the milestone at everyNPlays: 2

console.log(player.backend().calls); // ['play', 'pause', 'play'] — backend wiring from step 2 still runs

await player.dispose();
