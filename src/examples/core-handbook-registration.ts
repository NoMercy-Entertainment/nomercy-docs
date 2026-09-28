// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: plugin registration timing, requires, and cascade remove.
 *
 * PeerPlugin registers first. FeaturePlugin declares a version-pinned require,
 * queues before setup, then a second plugin installs after ready. getPluginById
 * finds the peer by string id. removePlugin cascades dependents by default.
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

class PeerPlugin extends Plugin<IPlayer<BaseEventMap>, Record<string, never>> {
	static override readonly id = 'peer';
	static override readonly version = '2.1.0';
	static override readonly description = 'Peer that FeaturePlugin requires.';

	override use(): void {
		// no-op peer used only for requires / lookup
	}
}

class FeaturePlugin extends Plugin<
	IPlayer<BaseEventMap>,
	{ everyNPlays?: number }
> {
	static override readonly id = 'feature';
	static override readonly description = 'Depends on PeerPlugin at a minimum version.';
	static override readonly requires = [
		{ plugin: PeerPlugin, minVersion: '2.0.0' },
	];

	private plays = 0;

	override use(): void {
		const every = this.opts.everyNPlays ?? 2;
		this.on('play', () => {
			this.plays += 1;
			if (this.plays % every === 0) {
				console.log('milestone:', this.plays);
			}
		});
	}
}

class LatePlugin extends Plugin<IPlayer<BaseEventMap>, Record<string, never>> {
	static override readonly id = 'late';
	static override readonly description = 'Installed after setup.';

	override use(): void {
		// post-setup path
	}
}

const _instances = new Map<string, RegistrationHandbookPlayer>();

class RegistrationHandbookPlayer extends EventEmitter<BaseEventMap> {
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
	declare getPluginById: <P extends object = object>(id: string) => P | undefined;
	declare removePlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: { cascade?: boolean },
	) => void;
	declare plugins: () => ReadonlyArray<Plugin>;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'RegistrationHandbookPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'RegistrationHandbookPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(RegistrationHandbookPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-registration';
mount.setAttribute('aria-label', 'Registration handbook player');
document.body.appendChild(mount);

const player = new RegistrationHandbookPlayer('handbook-registration');

player.on('plugin:installed', ({ id }) => {
	console.log('installed:', id);
});
player.on('plugin:failed', ({ id, error }) => {
	console.log('failed:', id, error.message);
});

// Pre-setup: both are queued; requires sees PeerPlugin in the queue.
player.addPlugin(PeerPlugin);
player.addPlugin(FeaturePlugin, { everyNPlays: 2 });

player.setup({ logLevel: 'info' });
await player.ready();

console.log(player.getPlugin(FeaturePlugin)?.enabled()); // true
console.log(player.getPluginById<{ id: string }>('peer')?.id); // 'peer'
console.log(player.plugins().map(plugin => plugin.id)); // ['peer', 'feature']

// Post-setup: registration runs inline; ready() waits for it to settle.
player.addPlugin(LatePlugin);
await player.ready();
console.log(player.getPlugin(LatePlugin)?.id); // 'late'

player.removePlugin(PeerPlugin);
console.log(player.getPlugin(FeaturePlugin)); // undefined (cascaded)
console.log(player.getPlugin(LatePlugin)?.id); // 'late'

await player.dispose();
