// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Transport: play(), pause(), stop(), togglePlayback(), rewind()/forward(),
 * restart(), and seeking through time(seconds). `controls: true` renders the
 * browser's native play/pause button and scrubber below — they call exactly
 * these same methods internally, nothing more. Build a Player replaces this
 * native bar with your own, wired to the identical methods.
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
