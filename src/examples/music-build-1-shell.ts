// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 1 of 5: mount the real chrome.
 *
 * Music ships no UI plugin — there's no `DesktopUiPlugin` equivalent for
 * audio. `controls: true` is the real, complete music player: the browser's
 * native `<audio controls>` bar, the same one the
 * [Quickstart](/nomercy-music-player/quickstart) mounts.
 *
 * `item(0, { autoplay: false })` cues the first track so the bar has something
 * to play. Cued, not started: `item()` autoplays by default, and a browser
 * always refuses that without a gesture. Pressing play is the gesture.
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
