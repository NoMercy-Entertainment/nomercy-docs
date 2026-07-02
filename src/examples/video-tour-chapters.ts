// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Chapters: `sintel`'s wire item carries a `chapters.vtt` sidecar under
 * `tracks[]` (`kind: 'chapters'`), normalized into the canonical `chapters`
 * field on ingest. `chapters()` lists them, `seekToChapter()`/
 * `nextChapter()`/`previousChapter()` navigate, and `playSegment()` loops or
 * holds an arbitrary time window — not just a chapter's own bounds.
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
