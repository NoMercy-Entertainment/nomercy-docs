// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 2 of 5: the scrubber.
 *
 * Nothing to add — `controls: true`'s native bar already carries a seek
 * scrubber, and unlike `DesktopUiPlugin` there's no options surface to
 * customize it with (the browser owns its rendering entirely). The scrubber
 * you see is driven by the exact same `time()` / `'time'` / `'duration'`
 * kit surface the [Time & Seeking](/nomercy-music-player/tour/time) page
 * documents — the native bar is just already wired to it for you.
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
