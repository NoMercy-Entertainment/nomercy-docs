// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { firstSong, MUSIC_BASE } from './media';

// baseUrl is the best-practice way to point the player at a content origin:
// items carry relative paths and the player resolves them against baseUrl, so
// one config value moves the whole catalogue between environments.
const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

// There is no music-level `autoPlay` config field — that sugar is video-only.
// `onReady` mutes the backend and loads the first item with `{ autoplay: true }`,
// the same call your own UI makes on a user gesture, so the live preview above
// reaches a playing state headlessly instead of sitting on a silent "loaded".
function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, onReady, player: 'music' as const };
