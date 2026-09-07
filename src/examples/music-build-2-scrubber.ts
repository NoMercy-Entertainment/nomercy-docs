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
 * Nothing to add. `controls: true`'s native bar already carries a seek
 * scrubber, and unlike `DesktopUiPlugin` there is no options surface to
 * customize it with, because the browser owns its rendering entirely.
 *
 * That scrubber seeks the audio element directly rather than calling
 * `time()`. The player tracks the element's `timeupdate`, so it follows a
 * native seek and keeps publishing the `'time'` and `'duration'` events the
 * [Time & Seeking](/nomercy-music-player/tour/time) page documents. Build
 * your own scrubber against those methods and events, not against the
 * native bar.
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
