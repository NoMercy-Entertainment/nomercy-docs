// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Subtitles: `sintel` carries four real VTT subtitle tracks (English, Dutch,
 * French, German) directly on its typed `subtitles: SubtitleTrackRef[]`
 * field. `defaultSubtitleLanguage: 'eng'` below auto-selects the English
 * track once the manifest resolves, the same language-matching
 * `subtitle()`/`subtitles()` describe on this page. `SubtitleOverlayPlugin`
 * is what actually paints the cue text — selection and rendering are
 * separate concerns, see the page prose.
 */

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { SubtitleOverlayPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/subtitle-overlay';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	defaultSubtitleLanguage: 'eng',
	playlist: [sintel],
};

function configure(player: NMVideoPlayer): void {
	player.addPlugin(SubtitleOverlayPlugin);
}

export default { config, configure };
