// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 5: the complete configuration.
 *
 * Everything the previous four steps turned on individually, plus the rest
 * of `DesktopUiButtonOptions`'s default-off set — theater, PiP, quality,
 * audio track, playlist, and aspect ratio — turned on together. `films` (the
 * same three-item fixture the [Queue](/nomercy-video-player/tour/queue) page
 * uses) gives the playlist button something real to list. `fullscreen()` and
 * `toggleFullscreen()` (the method names this step used to wire a hand-built
 * button to) now drive the shipped button directly — same methods, same
 * `'fullscreen'` event, no custom code left to write.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { DesktopUiPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui';
import { SubtitleOverlayPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/subtitle-overlay';
import { FILMS_BASE, films } from './media';

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
			opts: {
				buttons: {
					theater: true,
					pip: true,
					quality: true,
					audio: true,
					playlist: true,
					subtitles: true,
					aspectRatio: true,
				},
			},
		},
		SubtitleOverlayPlugin,
	],
	playlist: films,
};

export default { config };
