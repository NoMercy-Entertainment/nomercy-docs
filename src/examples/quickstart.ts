// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

// baseUrl is the best-practice way to point the player at a content origin:
// items carry relative paths and the player resolves them against baseUrl, so
// one config value moves the whole catalogue between environments. muted +
// autoPlay let the live PlayerExample island reach a playing state headlessly.
const config: VideoPlayerConfig = {
  baseUrl: FILMS_BASE,
  baseImageUrl: 'https://image.tmdb.org/t/p',
  muted: true,
  autoPlay: true,
  controls: true,
  playlist: [sintel],
};

export default { config };
