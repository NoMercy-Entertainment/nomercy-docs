// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: set language and look up strings.
 *
 * `language(tag)` returns a promise that resolves after bundles for the tag
 * (and its BCP-47 parents) load. `t(key, vars?)` then reads from that language.
 * `addTranslations` merges your own keys before the first lookup.
 */

import { type BaseEventMap, type BasePlayerConfig, type IPlayer, type PluginCtorWithId, type Translations, composeMixins, EventEmitter, initPlayerCoreState, Plugin, playerCoreMethods, resolvePlayerConstructor } from '@nomercy-entertainment/nomercy-player-core';

class LyricsPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'lyrics';
	static override readonly version = '1.0.0';
	static override readonly description = 'Ships its own strings.';

	// Static keys carry the namespace themselves.
	static override readonly translations: Translations = {
		en: { 'plugin.lyrics.empty': 'No lyrics available' },
		nl: { 'plugin.lyrics.empty': 'Geen songtekst beschikbaar' },
	};

	// Hook keys are namespaced for you: 'empty' lands as 'plugin.lyrics.empty'.
	protected override async loadTranslations(lang: string): Promise<Record<string, string> | undefined> {
		return this.fetch<Record<string, string>>(`/i18n/lyrics/${lang}.json`, { responseType: 'json' });
	}
}

const _instances = new Map<string, I18nTourPlayer>();

class I18nTourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;

	declare t: (key: string, vars?: Record<string, string>) => string;
	declare language: {
		(): string;
		(lang: string): Promise<void>;
	};
	declare addTranslations: (bundle: Translations) => void;
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'I18nTourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'I18nTourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(I18nTourPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'i18n-tour';
mount.setAttribute('aria-label', 'i18n tour player');
document.body.appendChild(mount);

const player = new I18nTourPlayer('i18n-tour');
player.addPlugin(LyricsPlugin);
player.setup({
	logLevel: 'info',
	language: 'en',
});
await player.ready();

player.addTranslations({
	en: { 'demo.welcome': 'Welcome, {name}!' },
	nl: { 'demo.welcome': 'Welkom, {name}!' },
});

console.log(player.t('demo.welcome', { name: 'Ada' })); // 'Welcome, Ada!'
console.log(player.t('core.state.queueEmpty')); // 'There is nothing in the queue.'

await player.language('nl');
console.log(player.language()); // 'nl'
console.log(player.t('demo.welcome', { name: 'Ada' })); // 'Welkom, Ada!'

console.log(player.t('demo.missing')); // 'demo.missing'

await player.dispose();
