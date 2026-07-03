// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 2 of 5: the scrubber's chapter segments.
 *
 * The progress bar Step 1 already mounted isn't a plain `<input type="range">`
 * — when the current item has chapters, `DesktopUiPlugin` splits it into one
 * segment per chapter with its own buffer fill, and gates the chapter-nav
 * buttons on their presence automatically (no chapters, no buttons). `sintel`
 * carries real chapter marks, so `buttons.chapterPrev` / `chapterNext` below
 * are shown explicitly even though both already default to `true` — the
 * point being made is the segmented scrubber, not the toggle.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { DesktopUiPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	plugins: [
		{
			plugin: DesktopUiPlugin,
			opts: {
				buttons: {
					chapterPrev: true,
					chapterNext: true,
				},
			},
		},
	],
	playlist: [sintel],
};

export default { config };
