// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Playback state & events: the typed coarse-state readers (`playState()`,
 * `bufferState()`, `networkState()`, `volumeState()`) and the event stream a
 * UI subscribes to instead of polling them. Every one of these comes
 * straight from `nomercy-player-core`; video adds only the video-specific
 * events layered on top (`levels`, `audioTracks`, `fullscreen`, `videoRect`,
 * and the rest listed on this page).
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	playlist: [sintel],
};

export default { config };
