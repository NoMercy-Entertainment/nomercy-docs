// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The i18n engine. `t(key, vars?)` resolves a key through the active
 * language's bundle, with `{var}` interpolation and a BCP-47 fallback chain
 * (`pt-BR` -> `pt` -> `en`). `addTranslations()` merges a bundle into the
 * live table; `language(tag)` switches languages and (for a real player)
 * loads every registered plugin's translation bundle for the new tag.
 */

import { tourPlayer } from './tour-player';

const player = tourPlayer('i18n-demo');
player.setup({ logLevel: 'info', language: 'en' });
await player.ready();

player.addTranslations({
	en: { 'demo.welcome': 'Welcome, {name}!' },
	nl: { 'demo.welcome': 'Welkom, {name}!' },
});

console.log(player.t('demo.welcome', { name: 'Ada' })); // 'Welcome, Ada!'

await player.language('nl');
console.log(player.language()); // 'nl'
console.log(player.t('demo.welcome', { name: 'Ada' })); // 'Welkom, Ada!'

console.log(player.t('demo.missing')); // 'demo.missing' — unresolved keys fall back to the key itself

await player.dispose();
