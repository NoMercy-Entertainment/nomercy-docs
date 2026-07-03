// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';

const config: MusicPlayerConfig = {
  baseUrl: 'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Music',
  controls: true,
  playlist: [
    {
      id: 'where-dreams-drift',
      name: 'Where Dreams Drift',
      artist: 'Ketsa',
      album: 'CC BY: Free to Use',
      url: '/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/01.Where.Dreams.Drift.mp3',
      image:
        'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Music/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/cover.jpg',
    },
  ],
};

// Docs-preview only (stripped from the rendered snippet): load the first track
// so the native control bar has something to play. `controls: true` in the
// config renders the bar itself.
function onReady(player: IMusicPlayer): void {
  void player.item(0);
}

export default { config, onReady, player: 'music' as const };
