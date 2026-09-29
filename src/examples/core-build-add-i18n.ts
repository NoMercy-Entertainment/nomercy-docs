// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build: English bundle plus plugin static translations.
 *
 * defaultTranslations wraps enTranslations for setup. A Plugin subclass
 * ships strings under plugin.<id>.* via static translations. this.t uses
 * the short key. player.t reads core.* and full plugin keys.
 */

import type {
	BaseEventMap,
	BasePlayerConfig,
	IPlayer,
	PluginCtorWithId,
	Translations,
} from '@nomercy-entertainment/nomercy-player-core';
import {
	Plugin,
	composeMixins,
	defaultTranslations,
	enTranslations,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

class StatusBannerPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'status-banner';
	static override readonly description = 'Shows a translated empty-state label.';

	static override readonly translations: Translations = {
		en: {
			'plugin.status-banner.empty': 'Nothing to show yet',
		},
	};

	override use(): void {
		console.log(this.t('empty')); // 'Nothing to show yet'
	}
}

const _instances = new Map<string, I18nBuildPlayer>();

class I18nBuildPlayer extends EventEmitter<BaseEventMap> {
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
	declare t: (key: string, vars?: Record<string, string>) => string;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'I18nBuildPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'I18nBuildPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(I18nBuildPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'build-i18n';
mount.setAttribute('aria-label', 'Build i18n player');
document.body.appendChild(mount);

console.log(Object.keys(defaultTranslations)); // ['en']
console.log(enTranslations['core.state.queueEmpty']); // 'There is nothing in the queue.'

const player = new I18nBuildPlayer('build-i18n');
player.addPlugin(StatusBannerPlugin);
player.setup({
	logLevel: 'info',
	language: 'en',
	translations: {
		en: {
			'demo.build.ready': 'Ready to play',
		},
	},
});
await player.ready();

console.log(player.t('core.state.queueEmpty')); // 'There is nothing in the queue.'
console.log(player.t('demo.build.ready')); // 'Ready to play'
console.log(player.t('plugin.status-banner.empty')); // 'Nothing to show yet'

await player.dispose();
