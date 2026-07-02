// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a player, step 4: add i18n.
 *
 * Same `KitPlayer` as step 3 (compose, backend, plugin), with translations
 * supplied at `setup()` time instead of bolted on afterward — `language` and
 * `translations` are ordinary `BasePlayerConfig` fields, resolved by the same
 * pipeline that wires everything else. The kit's English bundle is always
 * merged underneath whatever you pass, so an incomplete translation degrades
 * to English instead of a blank string. This is the last step: the class
 * below now composes every capability this tutorial covers.
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

	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined;

	// New in this step — the i18n surface, resolved by the same setup pipeline.
	declare t: (key: string, vars?: Record<string, string>) => string;
	declare language: { (): string; (lang: string): Promise<void> };

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
				this.emit('milestone', { count: this.plays });
			}
		});
	}
}

// Usage — translations passed straight into setup(), same config object that
// carries logLevel, plugins, and every adapter override from earlier steps.
const player = kitPlayer('build-step-4');
player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });

player.setup({
	logLevel: 'info',
	language: 'en',
	translations: {
		en: { 'app.welcome': 'Welcome, {name}!' },
		nl: { 'app.welcome': 'Welkom, {name}!' },
	},
});
await player.ready();

console.log(player.t('app.welcome', { name: 'Ada' })); // 'Welcome, Ada!'

await player.language('nl');
console.log(player.t('app.welcome', { name: 'Ada' })); // 'Welkom, Ada!'

await player.play();
console.log(player.backend().calls); // ['play'] — every capability from steps 1-4 composes onto one instance

await player.dispose();
