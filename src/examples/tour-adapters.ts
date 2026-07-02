// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Adapter ports are swapped at `setup()` — no subclassing, no forking the
 * kit. This example replaces two of them: `storage` (default
 * `LocalStorageBackend`) with the in-memory backend, and `shuffleStrategy`
 * (default `FisherYatesShuffle`) with a deterministic strategy that's easy to
 * verify. Every other port (`IPlatform`, `IStreamSource`, `IUrlResolver`,
 * `ITranslator`, `ICueParser`, `IPreloadStrategy`, `ITransitionStrategy`,
 * `RealtimeFactory`) swaps the same way: name the field in `setup({...})`.
 */

import type { BasePlaylistItem, IShuffleStrategy } from '@nomercy-entertainment/nomercy-player-core';
import { MemoryStorageBackend } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

// A deterministic strategy is easy to demonstrate — reverses the queue
// instead of randomising it. Real strategies commonly pin the current item
// and shuffle only the remainder; the cursor-follow logic is handled by
// MediaList automatically for any IShuffleStrategy implementation.
const reverseShuffle: IShuffleStrategy = {
	order: items => [...items].reverse(),
};

const episodes: BasePlaylistItem[] = [
	{ id: 'ep-1', title: 'Episode 1' },
	{ id: 'ep-2', title: 'Episode 2' },
	{ id: 'ep-3', title: 'Episode 3' },
];

const player = tourPlayer('adapters-demo');

player.setup({
	logLevel: 'info',
	storage: new MemoryStorageBackend(), // no localStorage writes — safe for SSR and tests
	shuffleStrategy: reverseShuffle,
});
await player.ready();

player.queue(episodes);
player.queueShuffle();

console.log(player.queue().map(item => item.id)); // ['ep-3', 'ep-2', 'ep-1'] — the custom strategy ran

await player.dispose();
