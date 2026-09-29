// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: ILanguageMatcher and bcp47FallbackChain.
 *
 * The default strips one trailing subtag at a time. A custom matcher
 * returns a different chain, for example one that always ends on English.
 */

import type { ILanguageMatcher } from '@nomercy-entertainment/nomercy-player-core/adapters/language-matcher';
import { bcp47FallbackChain } from '@nomercy-entertainment/nomercy-player-core/adapters/language-matcher';

console.log(bcp47FallbackChain('zh-Hant-TW')); // ['zh-Hant-TW', 'zh-Hant', 'zh']
console.log(bcp47FallbackChain('pt-BR')); // ['pt-BR', 'pt']
console.log(bcp47FallbackChain('')); // []

const endOnEnglish: ILanguageMatcher = (tag) => {
	const chain = bcp47FallbackChain(tag);

	return chain.includes('en') ? chain : [...chain, 'en'];
};

type Bundles = Record<string, Record<string, string>>;

function lookup(bundles: Bundles, matcher: ILanguageMatcher, tag: string, key: string): string {
	for (const language of matcher(tag)) {
		const value = bundles[language]?.[key];
		if (value !== undefined)
			return value;
	}

	return key;
}

const bundles: Bundles = {
	'en': {
		play: 'Play',
	},
	'nl': {
		play: 'Afspelen',
	},
};

console.log(lookup(bundles, endOnEnglish, 'nl-BE', 'play')); // 'Afspelen'
console.log(lookup(bundles, endOnEnglish, 'fr-CA', 'play')); // 'Play'
