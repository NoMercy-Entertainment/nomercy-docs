// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Chapters: `sintel` carries real chapter marks (from the fixture's own
 * `chapters.vtt`) directly on its typed `chapters: ChapterRef[]` field.
 * `chapters()` lists them, `seekToChapter()`/`nextChapter()`/
 * `previousChapter()` navigate, and `playSegment()` loops or holds an
 * arbitrary time window — not just a chapter's own bounds.
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: [sintel],
};

export default { config };
