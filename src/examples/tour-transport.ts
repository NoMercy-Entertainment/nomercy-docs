// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Transport contract: play / pause / stop / seek all funnel through the same
 * cancellable `before*` pattern. Every action dispatches a `beforeX` event
 * carrying a mutable, preventable payload before it touches state; a listener
 * that calls `preventDefault()` blocks the action and the player emits
 * `xPrevented` instead. This is the same dispatcher `Plugin.dispatchBefore`
 * uses for plugin-defined events — see the Plugin base tour page.
 */

import { tourPlayer } from './tour-player';

const player = tourPlayer('transport-demo');
player.setup({ logLevel: 'info' });
await player.ready();

// Block remote-triggered playback before it ever reaches the backend.
player.on('beforePlay', (event) => {
	if (event.data.source === 'remote') {
		event.preventDefault();
	}
});

player.on('playPrevented', ({ reason }) => {
	console.log('play blocked:', reason);
});

await player.play({ source: 'remote' }); // prevented — playPrevented fires, state is untouched
await player.play({ source: 'user' }); // proceeds — play state flips to PLAYING

await player.rewind(10); // -10s through the same beforeSeek -> seek -> seeked cycle
await player.forward(5); // +5s

await player.pause();
await player.dispose();
