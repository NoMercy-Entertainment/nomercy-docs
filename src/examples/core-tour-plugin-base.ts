// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: subclass Plugin and register it.
 *
 * Extend Plugin, set static id and description, override use() to subscribe.
 * Pass the class to addPlugin before setup. The player constructs the instance,
 * awaits use(), then emits plugin:installed. getPlugin returns the live typed
 * instance; removePlugin runs dispose and emits plugin:disposed.
 */

import type {
	BaseEventMap,
	BasePlayerConfig,
	IPlayer,
	PluginCtorWithId,
} from '@nomercy-entertainment/nomercy-player-core';
import {
	Plugin,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

interface PlayCounterEvents {
	milestone: { count: number };
}

class PlayCounterPlugin extends Plugin<
	IPlayer<BaseEventMap>,
	{ everyNPlays?: number },
	PlayCounterEvents
> {
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

	protected override getRuntimeState(): Record<string, unknown> {
		return { plays: this.plays };
	}
}

const _instances = new Map<string, PluginTourPlayer>();

class PluginTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined;
	declare removePlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: { cascade?: boolean },
	) => void;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'PluginTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'PluginTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(PluginTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'plugin-base-tour';
mount.setAttribute('aria-label', 'Plugin base tour player');
document.body.appendChild(mount);

const player = new PluginTourPlayer('plugin-base-tour');
player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });
player.setup({ logLevel: 'info' });
await player.ready();

const instance = player.getPlugin(PlayCounterPlugin);
console.log(instance?.enabled()); // true
console.log(instance?.state().runtime); // { plays: 0 }

player.on('plugin:play-counter:milestone', ({ count }) => {
	console.log('milestone:', count);
});

player.removePlugin(PlayCounterPlugin);
console.log(player.getPlugin(PlayCounterPlugin)); // undefined

await player.dispose();
