// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Quality levels: `qualityLevels()` lists the HLS manifest's bitrate
 * renditions once the `'levels'` event fires; `quality()` reads the active
 * one, `quality(idx | 'auto')` picks it. `defaultQuality: 'auto'` below is
 * also the kit's own default — set explicitly here so the config field this
 * page describes is visible in the sample, not left implicit.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	defaultQuality: 'auto',
	playlist: [sintel],
};

export default { config };
