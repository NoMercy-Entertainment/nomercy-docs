// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 4 of 5: the real subtitle picker.
 *
 * Two plugins, two concerns: `DesktopUiPlugin`'s settings menu is the
 * SELECTION UI (`buttons.subtitles: true` turns the button on); painting
 * cue text onto the frame is a separate job, `SubtitleOverlayPlugin`'s alone
 * — the same split the Guided Tour's [Subtitles](/nomercy-video-player/tour/subtitles)
 * page describes. Neither plugin knows about the other; both react to the
 * same `subtitle()` selection state on the player.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { DesktopUiPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui';
import { SubtitleOverlayPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/subtitle-overlay';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	defaultSubtitleLanguage: 'eng',
	plugins: [
		{
			plugin: DesktopUiPlugin,
			opts: { buttons: { subtitles: true } },
		},
		SubtitleOverlayPlugin,
	],
	playlist: [sintel],
};

export default { config };
