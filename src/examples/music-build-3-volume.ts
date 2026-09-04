// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 3 of 5: volume and mute.
 *
 * Same story as the scrubber — the native bar's volume control and mute
 * toggle are the browser's own, not something to rebuild. They drive
 * `volume()` / `mute()` / `unmute()` under the hood, the same methods and
 * `'volume'` / `'mute'` events the [Volume](/nomercy-music-player/tour/volume)
 * page describes for building your OWN volume UI, should you ever swap the
 * native bar out for a custom one.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: songs,
};

function onReady(player: IMusicPlayer): void {
	void player.item(0, { autoplay: false });
}

export default { config, onReady, player: 'music' as const };
