// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Plugin i18n. Static `translations` bundles merge into the player's table at
 * registration and are removed again when the plugin is disposed. `this.t()`
 * prefixes every key with `plugin.<id>.`, and `loadTranslations()` fetches
 * bundles on demand for each language switch.
 */

import type { Translations } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

class LyricsPanelPlugin extends Plugin {
	static override readonly id = 'lyrics-panel';
	static override readonly version = '1.0.0';
	static override readonly description = 'Shows lyrics with translated empty-state and status text.';

	// Keys carry the full plugin.<id>. prefix in the static bundle.
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
		// t() adds the prefix itself: this resolves plugin.lyrics-panel.empty.
		this.logger.info(this.t('empty'));

		// {var} placeholders come from the vars map.
		this.logger.info(this.t('line-of', { current: '3', total: '42' }));
	}

	// Runtime source: called after use() resolves and again per language
	// switch. Returned keys are namespaced under plugin.lyrics-panel.* for you.
	protected override async loadTranslations(lang: string): Promise<Record<string, string> | undefined> {
		try {
			return await this.fetch<Record<string, string>>(`/i18n/lyrics/${lang}.json`, {
				responseType: 'json',
				scope: 'silent',
			});
		}
		catch {
			return undefined; // missing bundle is not an error; fallback chain covers it
		}
	}
}

const player = tourPlayer('i18n-demo');
player.addPlugin(LyricsPanelPlugin);

player.setup({ logLevel: 'info' });
await player.ready();

console.log(player.t('plugin.lyrics-panel.empty')); // "No lyrics available"

await player.language('nl');
console.log(player.t('plugin.lyrics-panel.empty')); // "Geen songtekst beschikbaar"

// nl-BE resolves through the BCP-47 chain: nl-BE, then nl, then en.
await player.language('nl-BE');
console.log(player.t('plugin.lyrics-panel.line-of', { current: '1', total: '9' }));

await player.dispose(); // removes every plugin.lyrics-panel.* key again
