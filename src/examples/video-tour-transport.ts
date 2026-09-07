// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Transport: play(), pause(), stop(), togglePlayback(), rewind()/forward(),
 * restart(), and seeking through time(seconds).
 *
 * `controls: true` renders the browser's native play/pause button and
 * scrubber below. Those drive the video element directly and never enter
 * these methods, so a beforePlay or beforePause listener does not see them.
 * The player watches the element and keeps its own play state and position
 * in step, which is why playState() and time() stay correct while the
 * native bar is in use.
 *
 * Build a Player replaces the native bar with your own, wired to these
 * methods, where those listeners do run.
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
