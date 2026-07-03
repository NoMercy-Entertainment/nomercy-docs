// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { WirePlaylistItem } from '../src/examples/media';
import { expect, test } from '@playwright/test';
import { ANIME_BASE, anime, FILMS_BASE, films, MUSIC_BASE, songs } from '../src/examples/media';

for (const item of films) {
  const wireItem = item as WirePlaylistItem;

  test(`film "${item.title}" has a working file URL and required fields`, async ({ request }) => {
    expect(item.id, 'id must be set').toBeTruthy();
    expect(item.title, 'title must be set').toBeTruthy();
    expect(item.duration, 'duration must be set').toBeGreaterThan(0);

    const response = await request.head(`${FILMS_BASE}${wireItem.file}`);
    expect(response.status(), `${FILMS_BASE}${wireItem.file}`).toBe(200);
  });
}

for (const item of anime) {
  const wireItem = item as WirePlaylistItem;

  test(`anime "${item.title}" has a working file URL and required fields`, async ({ request }) => {
    expect(item.id, 'id must be set').toBeTruthy();
    expect(item.title, 'title must be set').toBeTruthy();

    const response = await request.head(`${ANIME_BASE}${wireItem.file}`);
    expect(response.status(), `${ANIME_BASE}${wireItem.file}`).toBe(200);
  });

  test(`anime "${item.title}" carries an ASS subtitle track`, async ({ request }) => {
    const assTrack = wireItem.tracks?.find(
      (track) => track.kind === 'subtitles' && track.file.endsWith('.ass'),
    );
    expect(assTrack, 'expected an ASS subtitle track').toBeTruthy();

    const response = await request.head(`${ANIME_BASE}${assTrack!.file}`);
    expect(response.status(), `${ANIME_BASE}${assTrack!.file}`).toBe(200);
  });

  test(`anime "${item.title}" carries a fonts entry`, async ({ request }) => {
    expect(item.fonts?.length ?? 0, 'expected at least one fonts entry').toBeGreaterThan(0);

    for (const fontEntry of item.fonts!) {
      const response = await request.head(`${ANIME_BASE}${fontEntry.file}`);
      expect(response.status(), `${ANIME_BASE}${fontEntry.file}`).toBe(200);
    }
  });
}

for (const item of songs) {
  test(`song "${item.name}" has a working file URL and required fields`, async ({ request }) => {
    expect(item.id, 'id must be set').toBeTruthy();
    expect(item.name, 'name must be set').toBeTruthy();
    expect(item.url, 'url must be set').toBeTruthy();

    const response = await request.head(`${MUSIC_BASE}${item.url}`);
    expect(response.status(), `${MUSIC_BASE}${item.url}`).toBe(200);
  });

  test(`song "${item.name}" has a working cover URL`, async ({ request }) => {
    expect(item.cover, 'cover must be set').toBeTruthy();

    const response = await request.head(item.cover!);
    expect(response.status(), item.cover!).toBe(200);
  });

  test(`song "${item.name}" has a working lyrics URL`, async ({ request }) => {
    expect(item.lyricsUrl, 'lyricsUrl must be set').toBeTruthy();

    const response = await request.head(item.lyricsUrl!);
    expect(response.status(), item.lyricsUrl!).toBe(200);
  });
}
