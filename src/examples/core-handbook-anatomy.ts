// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: shared method tuple, baseUrl, and audioContext.
 *
 * Spread playerCoreMethods onto the class, then read or write baseUrl and
 * read audioContext. Without a writer calling setPlayerAudioContext, the
 * audio context stays undefined.
 */

import { type BaseEventMap, type BasePlayerConfig, composeMixins, EventEmitter, initPlayerCoreState, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE } from './media';

const _instances = new Map<string, AnatomyPlayer>();

class AnatomyPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare baseUrl: {
		(): string | undefined;
		(url: string): void;
	};
	declare audioContext: () => AudioContext | undefined;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'AnatomyPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'AnatomyPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(AnatomyPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-anatomy';
mount.setAttribute('aria-label', 'Anatomy handbook player');
document.body.appendChild(mount);

const player = new AnatomyPlayer('handbook-anatomy');
player.setup({
	logLevel: 'info',
});
await player.ready();

player.baseUrl(FILMS_BASE);
console.log(player.baseUrl()); // FILMS_BASE
console.log(player.audioContext()); // undefined

player.baseUrl('https://api.example.com/files');
console.log(player.baseUrl()); // 'https://api.example.com/files'

await player.dispose();
