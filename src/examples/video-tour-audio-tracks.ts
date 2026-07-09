// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Audio tracks: `audioTracks()`, `audioTrack()`, `audioTrackMode()`, and
 * `cycleAudioTracks()`. Sintel's HLS manifest carries a single embedded audio
 * rendition, so `audioTracks()` returns one entry here instead of a language
 * list to switch between — the API is identical either way; a multi-language
 * dub only changes how many entries the same list holds.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: [sintel],
};

export default { config };
