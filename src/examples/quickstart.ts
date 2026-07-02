// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * First runnable snippet: Sintel over HLS, muted + autoplay so the live
 * `PlayerExample` island can reach a playing state headlessly (no user
 * gesture available in that context).
 */

import type { VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import type { WirePlaylistItem } from './media';
import { FILMS_BASE, sintel } from './media';

const sintelWire: WirePlaylistItem = sintel as WirePlaylistItem;

/**
 * The player resolves a relative item `url` against `baseUrl` with WHATWG
 * `new URL(relative, base)` semantics. Sintel's `file` (and its sidecar
 * `tracks[].file`) are root-relative (`/Sintel.(2010)/...`), so that
 * resolution keeps only `FILMS_BASE`'s origin and drops its `/Films` path —
 * a 404, not the fixture. Joining them as plain strings here (exactly how
 * `e2e/media.spec.ts` verifies the fixture is reachable) sidesteps that;
 * `baseImageUrl` below is unaffected because the player prepends it as a
 * raw string, not a URL base.
 */
const item: WirePlaylistItem = {
  ...sintelWire,
  url: `${FILMS_BASE}${sintelWire.file}`,
  tracks: sintelWire.tracks?.map((track) => ({ ...track, file: `${FILMS_BASE}${track.file}` })),
};

const config: VideoPlayerConfig = {
  baseImageUrl: 'https://image.tmdb.org/t/p',
  muted: true,
  autoPlay: true,
  controls: true,
  playlist: [item],
};

export default { config };
