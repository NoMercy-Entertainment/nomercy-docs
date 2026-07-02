// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Volume: volume(), mute()/unmute()/toggleMute(), volumeUp()/volumeDown(),
 * and volumeState(). There is no `volume` config field — a player always
 * starts at the backend's default gain, `muted: true` here only so autoplay
 * satisfies the browser's policy. Drag the native volume control below, or
 * see the code samples on this page for the same actions from your own UI.
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
