// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 3 of 5: the volume slider's display mode.
 *
 * `volumeSlider` controls how the mute button's slider presents:
 * `'horizontal'` (inline, expands on hover — the default), `'vertical'` (a
 * popup above the button, toggled on click), or `'auto'` (vertical under
 * ~520 px container width, horizontal above it). Switching to `'vertical'`
 * below trades the hover-reveal for an explicit click-to-open popup — useful
 * when the bar is too narrow for an inline slider to expand into.
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
			opts: { volumeSlider: 'vertical' },
		},
	],
	playlist: [sintel],
};

export default { config };
