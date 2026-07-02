// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: swap the storage adapter for IndexedDB.
 *
 * The default `LocalStorageBackend` is fine for small values (volume, quality
 * preference, a few flags), but it caps out around 5-10 MB per origin and is
 * synchronous, which can jank a hot path. `IndexedDBBackend` is fully async
 * and comfortable with much larger values (cached metadata, offline queues).
 * Swapping is one field at `setup()` — `IStorage`'s five methods are the same
 * shape on both, so a plugin's `this.storage` calls don't change at all.
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
	storage: new IndexedDBBackend({ dbName: 'my-app-player', storeName: 'kv' }), // swap happens here
});
await player.ready();

const recentlyPlayed = player.getPlugin(RecentlyPlayedPlugin);
await recentlyPlayed?.remember('sintel');
console.log(await recentlyPlayed?.recent()); // ['sintel'] — persisted through IndexedDB, not localStorage

await player.dispose();
