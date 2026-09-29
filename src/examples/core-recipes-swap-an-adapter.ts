// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: swap the storage adapter for IndexedDBBackend.
 *
 * Pass `storage` on setup. Plugins keep calling `this.storage` the same way.
 * LocalStorageBackend is the default when you omit the field.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { IndexedDBBackend, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface CachedRecent {
	ids: string[];
}

class RecentlyPlayedPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'recently-played';

	async remember(itemId: string): Promise<void> {
		const existing = (await this.storage.getJSON<CachedRecent>('recent')) ?? { ids: [] };
		existing.ids = [itemId, ...existing.ids.filter(id => id !== itemId)].slice(0, 20);
		await this.storage.setJSON('recent', existing);
	}

	async recent(): Promise<string[]> {
		return (await this.storage.getJSON<CachedRecent>('recent'))?.ids ?? [];
	}
}

const player = tourPlayer('storage-swap-demo');
player.addPlugin(RecentlyPlayedPlugin);

player.setup({
	logLevel: 'info',
	storage: new IndexedDBBackend({ dbName: 'my-app-player', storeName: 'kv' }),
});
await player.ready();

const recentlyPlayed = player.getPlugin(RecentlyPlayedPlugin);
await recentlyPlayed?.remember('sintel');
console.log(await recentlyPlayed?.recent()); // ['sintel']

await player.dispose();
