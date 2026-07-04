// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 8 of 10: Selectors.
 *
 * The v1 original swapped the hand-built plugin for the shipped one at this
 * exact step, and so does this translation: seven steps taught you every
 * concept the real plugin is made of, and the selector menus (quality,
 * subtitles, audio tracks) are where hand-building stops paying its way.
 * One `addPlugin(DesktopUiPlugin)` replaces the whole StepPlugin and brings
 * the menus, the playlist panel, tooltips, chapters, and the seek preview
 * with it. Every control you built by hand in steps 1-7 is in there,
 * running the same public methods you wired yourself.
 */

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { DesktopUiPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
	playlist: [sintel],
};

function configure(player: NMVideoPlayer): void {
	player.addPlugin(DesktopUiPlugin);
}

export default { config, configure };
