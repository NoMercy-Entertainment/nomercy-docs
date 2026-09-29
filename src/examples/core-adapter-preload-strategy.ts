// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: IPreloadStrategy and DefaultPreloadStrategy.
 *
 * The default fires `leadSeconds` before the end and names no assets.
 * Extend it to name assets, or implement the interface to change when it fires.
 */

import type { BasePlayerConfig, BasePlaylistItem } from '@nomercy-entertainment/nomercy-player-core';
import type {
	IPreloadStrategy,
	PreloadAsset,
	PreloadContext,
} from '@nomercy-entertainment/nomercy-player-core/adapters/preload';
import { DefaultPreloadStrategy } from '@nomercy-entertainment/nomercy-player-core/adapters/preload';

const fallback = new DefaultPreloadStrategy(10);

console.log(fallback.shouldPreload({
	currentTime: 95,
	duration: 100,
	nextItem: { id: 'next' },
})); // true

class PosterPreload extends DefaultPreloadStrategy {
	override assetsToPreload(item: BasePlaylistItem): PreloadAsset[] {
		if (!item.image)
			return [];

		return [
			{
				url: item.image,
				category: 'poster',
			},
		];
	}
}

class LastTenPercent implements IPreloadStrategy {
	shouldPreload({ currentTime, duration, nextItem }: PreloadContext): boolean {
		if (nextItem === null || duration <= 0)
			return false;

		return currentTime / duration >= 0.9;
	}

	assetsToPreload(_item: BasePlaylistItem): PreloadAsset[] {
		return [];
	}

	cancel(): void {}
}

interface PreloadHost {
	setup: (config: BasePlayerConfig) => unknown;
	setPreloadStrategy: (strategy: IPreloadStrategy) => void;
	on: (event: 'preloadStart', fn: (data: { item: BasePlaylistItem; assets: Array<{ url: string; category: string }> }) => void) => void;
}

export function configure(player: PreloadHost): void {
	player.setup({
		// ...
		preloadStrategy: new PosterPreload(20),
	});

	player.on('preloadStart', ({ item, assets }) => {
		console.log(item.id, assets.length);
	});

	player.setPreloadStrategy(new LastTenPercent());
}
