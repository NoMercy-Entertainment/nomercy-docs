// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The queue. `queue()` / `queueAppend()` / `item()` and friends all delegate
 * to a single `MediaList<T>` per player — the cursor-aware ordered list both
 * real players share instead of maintaining parallel queue state. A real
 * backend additionally loads media on every cursor move; the queue mechanics
 * below (cursor tracking, events, peeking) are identical with or without one.
 */

import type { BasePlaylistItem } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface Episode extends BasePlaylistItem {
	id: string;
	title: string;
	durationSeconds: number;
}

const episodes: Episode[] = [
	{ id: 'ep-1', title: 'Episode 1: Pilot', durationSeconds: 1800 },
	{ id: 'ep-2', title: 'Episode 2: Follow-up', durationSeconds: 2100 },
	{ id: 'ep-3', title: 'Episode 3: Finale', durationSeconds: 1950 },
];

const player = tourPlayer('queue-demo');
player.setup({ logLevel: 'info' });
await player.ready();

player.on('queue', items => console.log('queue replaced:', items.length, 'items'));
player.on('queue:append', ({ items }) => console.log('appended:', items.length, 'item(s)'));

player.queue(episodes);

// Setting the queue seeds the cursor at index 0 — no separate item() call needed.
console.log(player.item()?.title); // 'Episode 1: Pilot'
console.log(player.peekNext()?.title); // 'Episode 2: Follow-up' — without moving the cursor
console.log(player.queueLength()); // 3

const bonus: Episode = { id: 'ep-4', title: 'Episode 4: Bonus', durationSeconds: 900 };
player.queueAppend(bonus);
console.log(player.queueIndexOf('ep-4')); // 3

player.queueMove(3, 1); // move the bonus episode right after the pilot
console.log(player.queue().map(item => item.id)); // ['ep-1', 'ep-4', 'ep-2', 'ep-3']

await player.dispose();
