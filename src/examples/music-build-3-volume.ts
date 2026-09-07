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
 * The native bar's volume control and mute toggle are the browser's own,
 * not something to rebuild.
 *
 * They differ from the scrubber in one way worth knowing. A native seek
 * reaches the player, because it tracks the element's `timeupdate`. A
 * native volume change does not: nothing listens for `volumechange`, so
 * moving that slider sets the element's own volume and `volume()` still
 * reports what the player last set. Read the element if you need the
 * browser's value while the native bar is in use.
 *
 * `volume()` / `mute()` / `unmute()` and the `'volume'` / `'mute'` events
 * the [Volume](/nomercy-music-player/tour/volume) page describes are what
 * you build your OWN volume UI against, once you swap the native bar out
 * for a custom one.
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
