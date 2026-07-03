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
  playlist: [
    {
      id: 'where-dreams-drift',
      name: 'Where Dreams Drift',
      artist: 'Ketsa',
      album: 'CC BY: Free to Use',
      url: '/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/01%20Where%20Dreams%20Drift.mp3',
      cover:
        'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Music/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/cover.jpg',
    },
  ],
};

// The music player is headless with no video frame, so the preview paints the
// track cover as the backdrop (the audio equivalent of a video poster) instead
// of a black box. Playback: the player has no autoPlay config field, and
// onReady runs before the queue is populated, so wait for ready() then start
// the first item. Browsers block muted audio autoplay, so in a real app you
// call item(0, { autoplay: true }) from a user gesture (a click).
function onReady(player: IMusicPlayer, container: HTMLElement): void {
  const first = Array.isArray(config.playlist) ? (config.playlist[0] as MusicPlaylistItem) : undefined;
  if (first?.cover) {
    container.style.backgroundImage = `url("${first.cover}")`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';
  }
  void player.ready().then(async () => {
    await player.mute();
    await player.item(0, { autoplay: true });
  });
}

export default { config, onReady, player: 'music' as const };
