// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: ship plugin CSS and read container state classes.
 *
 * appendInlineStyles injects CSS text once per styleId. A second call with the
 * same id is a no-op. setup stamps nomercyplayer on the container. mount names
 * the node nmplayer-<id>-<name>. subtitleStyle merges a patch and returns the
 * full style on read.
 */

import type {
	BaseEventMap,
	BasePlayerConfig,
	IPlayer,
	PluginCtorWithId,
	SubtitleStyle,
} from '@nomercy-entertainment/nomercy-player-core';
import {
	Plugin,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

class BadgePlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'badge';
	static override readonly version = '1.0.0';
	static override readonly description = 'Mounts a badge and ships its CSS inline.';

	override use(): void {
		this.appendInlineStyles(`
			.nmplayer-badge-root {
				position: absolute;
				inset-block-start: 1rem;
				inset-inline-start: 1rem;
			}
		`, 'plugin-badge-inline');

		// Same styleId: first call wins; this CSS never lands.
		this.appendInlineStyles('.never-applied { color: red; }', 'plugin-badge-inline');

		const root = this.mount('root');
		this.addClasses(root, ['is-ready']);
		root.textContent = 'Ready';
	}
}

const _instances = new Map<string, StylingHandbookPlayer>();

class StylingHandbookPlayer extends EventEmitter<BaseEventMap> {
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
	declare subtitleStyle: {
		(): SubtitleStyle;
		(patch: Partial<SubtitleStyle>): void;
	};

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'StylingHandbookPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'StylingHandbookPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(StylingHandbookPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-styling';
mount.setAttribute('aria-label', 'Styling handbook player');
document.body.appendChild(mount);

const player = new StylingHandbookPlayer('handbook-styling');
player.addPlugin(BadgePlugin);
player.setup({ logLevel: 'info' });
await player.ready();

console.log(player.container.classList.contains('nomercyplayer')); // true
console.log(document.getElementById('plugin-badge-inline') !== null); // true

player.subtitleStyle({ fontSize: 120 });
console.log(player.subtitleStyle().fontSize); // 120

await player.dispose();
// Mount node is gone; the style element stays for the next registration.
console.log(document.getElementById('plugin-badge-inline') !== null); // true
