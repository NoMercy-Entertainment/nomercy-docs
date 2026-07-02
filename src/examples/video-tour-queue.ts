// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The queue: a real three-item playlist. `queue()` reads it back, `item()`
 * moves the cursor, `next()`/`previous()` (Transport) step through it, and
 * `queueAppend()`/`queueRemove()`/`queueMove()`/`queueShuffle()` mutate it in
 * place. `films` is three real HLS items sharing one `baseUrl` — every path
 * inside each item stays relative, exactly the shape the media server sends.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, films } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	playlist: films,
};

export default { config };
