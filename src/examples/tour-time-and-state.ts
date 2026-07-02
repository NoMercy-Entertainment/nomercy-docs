// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Time and coarse-state reads. `timeData()` bundles position, duration,
 * buffered, remaining, and percentage into one snapshot instead of four
 * separate calls. The state readers (`bufferState`, `networkState`, and
 * their siblings `streamState` / `visibilityState` / `qualityMode` /
 * `audioTrackMode`) return typed enum values instead of raw backend strings,
 * with safe defaults when no backend or platform monitor is registered.
 */

import { BufferState, NetworkState } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

const player = tourPlayer('time-state-demo');
player.setup({ logLevel: 'info' });
await player.ready();

console.log(player.timeData());
// { position: 0, duration: 0, buffered: 0, remaining: 0, percentage: 0 } — no media loaded yet

console.log(player.bufferState() === BufferState.IDLE); // true — no backend registered
console.log(player.networkState() === NetworkState.ONLINE); // true — no monitor configured, safe default

// playbackRate() dispatches beforePlaybackRate before applying the clamped rate.
player.on('beforePlaybackRate', (event) => {
	event.data.rate = Math.min(event.data.rate, 1.5); // clamp to a house limit below the kit's own [0.25, 2]
});

await player.playbackRate(2);
console.log(player.playbackRate()); // 1.5 — the listener's mutation won

await player.dispose();
