// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: plugin listening helpers with auto-dispose.
 *
 * BeatPlugin emits only when hasListeners says a subscriber exists.
 * BeatLightPlugin uses the class form of on, once for first play, listen for
 * a DOM event, and off to detach a time handler early. Queue selection arrives
 * on `item`. Dispose releases every registration.
 */

import { type ActionOptions, type BaseEventMap, type BasePlayerConfig, type BasePlaylistItem, type IPlayer, type LoadOptions, type PluginCtorWithId, Plugin, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, films } from './media';

interface BeatEvents {
	beat: { at: number };
}

class BeatPlugin extends Plugin<IPlayer<BaseEventMap>, unknown, BeatEvents> {
	static override readonly id = 'beat';
	static override readonly version = '1.0.0';
	static override readonly description = 'Emits a beat only when someone is listening.';

	override use(): void {
		this.on('time', () => {
			if (!this.hasListeners(BeatPlugin, 'beat'))
				return;
			this.emit('beat', { at: Date.now() });
		});
	}
}

class BeatLightPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'beat-light';
	static override readonly version = '1.0.0';
	static override readonly description = 'Reacts to beats and cursor moves.';
	static override readonly requires = [BeatPlugin];
	static override readonly priority = 5;

	private readonly onTime = (): void => {
		this.logger.debug('still watching time');
	};

	override use(): void {
		this.on(BeatPlugin, 'beat', ({ at }) => {
			this.logger.debug('beat at', at);
		});

		this.on('item', ({ item, index }) => {
			this.logger.debug('cursor', index, item?.id);
		});

		this.once('play', () => {
			this.logger.info('first play of this session');
		});

		this.listen(document, 'visibilitychange', () => {
			if (document.hidden)
				this.logger.debug('tab hidden');
		});

		this.on('time', this.onTime);
		this.on('ended', () => this.off('time', this.onTime));
	}
}

const _instances = new Map<string, ListeningHandbookPlayer>();

class ListeningHandbookPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare enabledPlugins: () => ReadonlyArray<Plugin>;
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
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
		const resolved = resolvePlayerConstructor(id, _instances, 'ListeningHandbookPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'ListeningHandbookPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(ListeningHandbookPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-listening';
mount.setAttribute('aria-label', 'Handbook listening player');
document.body.appendChild(mount);

const player = new ListeningHandbookPlayer('handbook-listening');
player.addPlugin(BeatPlugin);
player.addPlugin(BeatLightPlugin);
player.setup({
	logLevel: 'info',
	baseUrl: FILMS_BASE,
});
await player.ready();

player.enabledPlugins(); // BeatLightPlugin (5) before plugins at the default 0

player.queue(films);
player.item(0, { autoplay: false });

await player.dispose();
