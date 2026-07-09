// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';

const config: VideoPlayerConfig = {
  baseUrl: 'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Films',
  baseImageUrl: 'https://image.tmdb.org/t/p',
  muted: false,
  autoPlay: false,
  controls: true,
  playlist: [
    {
      id: 'sintel',
      title: 'Sintel',
      url: '/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8',
      image: '/w780/q2bVM5z90tCGbmXYtq2J38T5hSX.jpg',
    },
  ],
};

export default { config };
