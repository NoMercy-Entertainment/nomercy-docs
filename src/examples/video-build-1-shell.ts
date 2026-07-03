// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 1 of 5: mount the real desktop chrome.
 *
 * `DesktopUiPlugin` is the shipped v2 UI overlay — the same chrome every
 * NoMercy app mounts, not something this tutorial reinvents from `<div>`s.
 * `plugins` in `setup()` registers it declaratively: the config sugar over
 * `addPlugin()`, resolved before the setup pipeline's `pluginsRegistering`
 * stage, so there's no separate pre-setup call to remember or get the
 * timing of wrong.
 *
 * With zero options it already renders: play/pause, mute, volume, a
 * scrubber (with chapter segments — `sintel` carries real chapter marks),
 * fullscreen, and a settings button. Off by default: theater, PiP, speed,
 * quality, subtitles, audio-track, playlist, and aspect-ratio buttons —
 * this tutorial turns them on one at a time over the next four steps.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { DesktopUiPlugin } from '@nomercy-entertainment/nomercy-video-player/plugins/desktop-ui';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	plugins: [DesktopUiPlugin],
	playlist: [sintel],
};

export default { config };
