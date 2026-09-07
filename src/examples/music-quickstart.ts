// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';

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

// Native <audio controls> never shows album art, so this paints the cover onto
// the container behind the bar. It reads `image` and falls back to the older
// `cover`, the order the preload strategy and the cast plugin both use.
function onReady(player: IMusicPlayer, container: HTMLElement): void {
  const first = Array.isArray(config.playlist) ? (config.playlist[0] as MusicPlaylistItem) : undefined;
  const cover = first?.image ?? first?.cover;
  if (cover) {
    container.style.backgroundImage = `url("${cover}")`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
  }
  void player.item(0, { autoplay: false });
}

export default { config, onReady, player: 'music' as const };
