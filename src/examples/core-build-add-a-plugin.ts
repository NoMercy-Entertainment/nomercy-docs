// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build: ship a Plugin subclass onto a composed player.
 *
 * PlayCounterPlugin sets static id, version, and description, takes options,
 * and emits a namespaced milestone from use(). Register with addPlugin before
 * setup, or pass plugins on setup. getPlugin returns the live typed instance.
 * Core has no media backend here; play still emits so the counter can run.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type BasePlaylistItem, type IPlayer, type PluginCtorWithId, Plugin, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

interface PlayCounterEvents {
	milestone: { count: number };
}

class PlayCounterPlugin extends Plugin<
	IPlayer<BaseEventMap>,
	{ everyNPlays?: number },
	PlayCounterEvents
> {
	static override readonly id = 'play-counter';
	static override readonly version = '1.0.0';
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

const _instances = new Map<string, PluginBuildPlayer>();

class PluginBuildPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare play: (opts?: ActionOptions) => Promise<void>;
	declare queue: {
		(): ReadonlyArray<BasePlaylistItem>;
		(items: BasePlaylistItem[], opts?: ActionOptions): void;
	};
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'PluginBuildPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'PluginBuildPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(PluginBuildPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'build-add-a-plugin';
mount.setAttribute('aria-label', 'Add a plugin build player');
document.body.appendChild(mount);

const player = new PluginBuildPlayer('build-add-a-plugin');

player.addPlugin(PlayCounterPlugin, { everyNPlays: 2 });
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.queue(films);

player.on('plugin:play-counter:milestone', ({ count }) => {
	console.log('milestone:', count);
});

await player.play();
await player.play();

const instance = player.getPlugin(PlayCounterPlugin);
console.log(instance?.enabled()); // true
console.log(instance?.state().runtime); // { plays: 2 }

await player.dispose();
