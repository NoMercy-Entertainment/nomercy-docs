// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: plugin i18n exports from the package root.
 *
 * Static `translations` merge at registration under `plugin.<id>.*`.
 * `this.t` adds that prefix. `loadTranslations` returns bare keys for a tag.
 * `createNetworkTranslationLoader`, `bcp47FallbackChain`, and
 * `defaultTranslations` are the other public helpers this page names.
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
	bcp47FallbackChain,
	composeMixins,
	createNetworkTranslationLoader,
	defaultTranslations,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

class LyricsPanelPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'lyrics-panel';
	static override readonly description = 'Shows lyrics with translated empty-state and status text.';

	static override readonly translations: Translations = {
		en: {
			'plugin.lyrics-panel.empty': 'No lyrics available',
			'plugin.lyrics-panel.line-of': 'Line {current} of {total}',
		},
		nl: {
			'plugin.lyrics-panel.empty': 'Geen songtekst beschikbaar',
			'plugin.lyrics-panel.line-of': 'Regel {current} van {total}',
		},
	};

	override use(): void {
		console.log(this.t('empty')); // 'No lyrics available'
		console.log(this.t('line-of', { current: '3', total: '42' })); // 'Line 3 of 42'
	}

	protected override async loadTranslations(lang: string): Promise<Record<string, string> | undefined> {
		if (lang !== 'fr')
			return undefined;
		return {
			empty: 'Aucune parole',
			'line-of': 'Ligne {current} sur {total}',
		};
	}
}

console.log(bcp47FallbackChain('pt-BR')); // ['pt-BR', 'pt']
console.log(Object.keys(defaultTranslations)); // ['en']

const networkLoader = createNetworkTranslationLoader({
	url: 'https://api.example.com/i18n/{lang}.json',
});
console.log(typeof networkLoader); // 'function'

const _instances = new Map<string, HandbookI18nPlayer>();

class HandbookI18nPlayer extends EventEmitter<BaseEventMap> {
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
	declare language: {
		(): string;
		(lang: string): Promise<void>;
	};

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'HandbookI18nPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'HandbookI18nPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(HandbookI18nPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-i18n';
mount.setAttribute('aria-label', 'Handbook i18n player');
document.body.appendChild(mount);

const player = new HandbookI18nPlayer('handbook-i18n');
player.addPlugin(LyricsPanelPlugin);
player.setup({
	logLevel: 'info',
	language: 'en',
});
await player.ready();

console.log(player.t('plugin.lyrics-panel.empty')); // 'No lyrics available'

await player.language('nl');
console.log(player.t('plugin.lyrics-panel.empty')); // 'Geen songtekst beschikbaar'

await player.language('fr');
console.log(player.t('plugin.lyrics-panel.empty')); // 'Aucune parole'

await player.dispose();
