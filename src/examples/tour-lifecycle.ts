// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The setup -> ready -> dispose lifecycle, straight from the kit.
 *
 * `setup()` runs a fixed pipeline (`setupStart` -> `configResolved` ->
 * `pluginsRegistering` -> `pluginsRegistered` -> `streamsReady` -> `authReady`
 * -> `playlistReady` -> `mediaReady` -> `ready`) and drives the phase machine
 * (`idle` -> `setup` -> `ready` -> ... -> `disposed`). `ready()` resolves once
 * that pipeline settles; `dispose()` tears every policy subscription down and
 * moves the player to `disposed`. `MinimalPlayer` has no media backend, so it
 * reaches `ready` without ever loading or playing anything — proof that setup
 * and lifecycle are pure kit behavior, not something a backend drives.
 */

import { minimalPlayer } from './minimal-player';

const player = minimalPlayer('lifecycle-demo');

// `phase` fires on every transition: idle -> setup -> ready -> ... -> disposed.
player.on('phase', ({ from, to }) => {
	console.log(`phase: ${from} -> ${to}`);
});

// Pipeline stage events fire in order as setup() resolves each of them.
player.on('pluginsRegistering', () => console.log('registering plugins'));
player.on('mediaReady', () => console.log('media ready'));

player.setup({ logLevel: 'info' });

await player.ready();
console.log(player.phase()); // 'ready'

await player.dispose();
console.log(player.phase()); // 'disposed'

// A second setup() call throws instead of leaving the instance half-configured.
try {
	player.setup({});
}
catch (err) {
	console.log((err as Error).message); // 'core:player/disposed: setup() called after dispose().'
}
