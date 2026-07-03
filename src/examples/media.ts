// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Canonical runnable media catalogue for docs examples. Every URL here
 * resolves against the public `nomercy-media` fixture repo and is verified
 * live by `e2e/media.spec.ts` (HTTP HEAD 200 on every referenced file) so
 * every snippet that imports from this module plays back for real, first
 * try, with no server or auth required.
 *
 * `films` items carry the v1/server "wire" shape (`file`, `tracks`) that
 * `NMVideoPlayer.setup({ playlist })` normalizes into the canonical
 * `VideoPlaylistItem` shape (`url`, `subtitles`, `chapters`) on ingest — the
 * same input format the real media server sends. `WirePlaylistItem` types
 * that wire shape explicitly so consumers get full property checking
 * instead of an `as VideoPlaylistItem` cast per item.
 */

import type { FontTrackRef, VideoPlaylistItem } from '@nomercy-entertainment/nomercy-video-player';
import type { MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';

export const FILMS_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Films';
export const ANIME_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Anime';
export const MUSIC_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Music';

/** One sidecar track entry in the wire `tracks` array — see `WirePlaylistItem`. */
export interface WireTrack {
  id: number;
  label?: string;
  file: string;
  language?: string;
  kind: 'subtitles' | 'chapters' | 'thumbnails' | 'sprite';
}

/**
 * The v1/server wire shape for a playlist item. `NMVideoPlayer` accepts this
 * directly (`file` normalizes to `url`, `tracks` normalizes to
 * `subtitles`/`chapters`/`previewSpriteUrl`) and it is what the real media
 * server sends, so docs examples ship data shaped exactly like production.
 */
export interface WirePlaylistItem extends VideoPlaylistItem {
  file: string;
  tracks?: WireTrack[];
}

const sintelItem: WirePlaylistItem = {
  id: 'sintel',
  title: 'Sintel',
  description:
    'A short fantasy film by the Blender Foundation. Sintel searches for a baby dragon she calls Scales.',
  file: '/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8',
  image: '/w780/q2bVM5z90tCGbmXYtq2J38T5hSX.jpg',
  duration: 888,
  year: 2010,
  tracks: [
    {
      id: 0,
      label: 'English',
      file: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.eng.full.vtt',
      language: 'eng',
      kind: 'subtitles',
    },
    {
      id: 1,
      label: 'Dutch',
      file: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.dut.full.vtt',
      language: 'dut',
      kind: 'subtitles',
    },
    {
      id: 2,
      label: 'French',
      file: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.fre.full.vtt',
      language: 'fre',
      kind: 'subtitles',
    },
    {
      id: 3,
      label: 'German',
      file: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.ger.full.vtt',
      language: 'ger',
      kind: 'subtitles',
    },
    {
      id: 4,
      file: '/Sintel.(2010)/chapters.vtt',
      kind: 'chapters',
    },
    {
      id: 5,
      file: '/Sintel.(2010)/thumbs_256x109.vtt',
      kind: 'thumbnails',
    },
    {
      id: 6,
      file: '/Sintel.(2010)/thumbs_256x109.webp',
      kind: 'sprite',
    },
  ],
};

const cosmosLaundromatItem: WirePlaylistItem = {
  id: 'cosmos-laundromat',
  title: 'Cosmos Laundromat',
  description: 'On a desolate island, a suicidal sheep meets his fate.',
  file: '/Cosmos.Laundromat.(2015)/Cosmos.Laundromat.(2015).NoMercy.m3u8',
  image: '/w780/f2wABsgj2lIR2dkDEfBZX8p4Iyk.jpg',
  duration: 724,
  year: 2015,
  tracks: [
    {
      id: 0,
      label: 'English',
      file: '/Cosmos.Laundromat.(2015)/subtitles/Cosmos.Laundromat.(2015).NoMercy.eng.full.vtt',
      language: 'eng',
      kind: 'subtitles',
    },
  ],
};

const bigBuckBunnyItem: WirePlaylistItem = {
  id: 'big-buck-bunny',
  title: 'Big Buck Bunny',
  description: 'A giant rabbit with a heart bigger than himself.',
  file: '/Big.Buck.Bunny.(2008)/Big.Buck.Bunny.(2008).NoMercy.m3u8',
  image: '/original/xtdybjRRZ15mCrPOvEld305myys.jpg',
  duration: 596,
  year: 2008,
  tracks: [
    {
      id: 0,
      file: '/Big.Buck.Bunny.(2008)/chapters.vtt',
      kind: 'chapters',
    },
  ],
};

/** Single Sintel item for snippets that need exactly one playable film. */
export const sintel: VideoPlaylistItem = sintelItem;

export const films: VideoPlaylistItem[] = [sintelItem, cosmosLaundromatItem, bigBuckBunnyItem];

/**
 * Font manifest for one anime episode's embedded-font ASS fixture. The
 * `fonts.json` manifest URL is a canonical `FontTrackRef` entry per the
 * `OctopusPlugin` contract — it expands to every real font file listed
 * inside the manifest, resolved relative to the manifest's own folder.
 */
function fontsManifest(file: string, label: string): FontTrackRef[] {
  return [{ file, label }];
}

const noRinItem: WirePlaylistItem = {
  id: 'no-rin-s00e00',
  title: 'No-Rin',
  show: 'No-Rin',
  season: 0,
  episode: 0,
  description:
    'ASS subtitle + embedded-font fixture episode from the nomercy-media test catalogue.',
  file: '/No-Rin.(2014)/No-Rin.S00E00/No-Rin.(2014).S00E00.NoMercy.m3u8',
  duration: 1420,
  year: 2014,
  tracks: [
    {
      id: 0,
      label: 'English',
      file: '/No-Rin.(2014)/No-Rin.S00E00/subtitles/No-Rin.(2014).S00E00.NoMercy.eng.full.ass',
      language: 'eng',
      kind: 'subtitles',
    },
  ],
  fonts: fontsManifest('/No-Rin.(2014)/No-Rin.S00E00/fonts.json', 'No-Rin fonts manifest'),
};

const railWarsItem: WirePlaylistItem = {
  id: 'rail-wars-s00e00',
  title: 'Rail Wars!',
  show: 'Rail Wars!',
  season: 0,
  episode: 0,
  description:
    'ASS subtitle + embedded-font fixture episode from the nomercy-media test catalogue.',
  file: '/Rail.Wars!.(2014)/Rail.Wars!.S00E00/Rail.Wars!.(2014).S00E00.NoMercy.m3u8',
  duration: 90,
  year: 2014,
  tracks: [
    {
      id: 0,
      label: 'English',
      file: '/Rail.Wars!.(2014)/Rail.Wars!.S00E00/subtitles/Rail.Wars!.(2014).S00E00.NoMercy.eng.full.ass',
      language: 'eng',
      kind: 'subtitles',
    },
  ],
  fonts: fontsManifest(
    '/Rail.Wars!.(2014)/Rail.Wars!.S00E00/fonts.json',
    'Rail Wars! fonts manifest',
  ),
};

export const anime: VideoPlaylistItem[] = [noRinItem, railWarsItem];

/**
 * Real Free Music Archive tracks from the `nomercy-media` fixture repo, same
 * source the player testbed uses (`tools/player-testbed/src/data/fmaDefaults.ts`).
 * `url` carries the baseUrl-relative shape (leading slash, no `MUSIC_BASE`
 * prefix) that `MusicPlayerConfig.baseUrl` resolves against, exactly like
 * `films`/`file` above. `cover` is a full URL rather than baseUrl-relative —
 * cover art resolves through the `'poster'` category (`baseImageUrl`, not
 * `baseUrl`), and these tracks don't ship a separate image origin.
 */
const whereDreamsDrift: MusicPlaylistItem = {
  id: 'ketsa-01-where-dreams-drift',
  name: 'Where Dreams Drift',
  url: '/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/01%20Where%20Dreams%20Drift.mp3',
  cover: `${MUSIC_BASE}/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/cover.jpg`,
  artist: 'Ketsa',
  album: 'CC BY: Free to Use',
  lyricsUrl: `${MUSIC_BASE}/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/01%20Where%20Dreams%20Drift.lrc`,
};

/** Single track for snippets that need exactly one playable song. */
export const firstSong: MusicPlaylistItem = whereDreamsDrift;

export const songs: MusicPlaylistItem[] = [
  whereDreamsDrift,
  {
    id: 'ketsa-02-saviour-above',
    name: 'Saviour Above',
    url: '/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/02%20Saviour%20Above.mp3',
    cover: `${MUSIC_BASE}/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/cover.jpg`,
    artist: 'Ketsa',
    album: 'CC BY: Free to Use',
    lyricsUrl: `${MUSIC_BASE}/K/Ketsa/%5B2025%5D%20CC%20BY%20-%20FREE%20TO%20USE%20FOR%20ANYTHING/02%20Saviour%20Above.lrc`,
  },
  {
    id: 'bent-wyre-01-ants-of-the-beat',
    name: 'Ants Of The Beat',
    url: '/B/bent%20wyre/%5B2025%5D%20If%20Only%20Life%20Was%20This%20Easy%20Volume%205%20-%20The%20Beat%20Misdirect/01%20Ants%20Of%20The%20Beat.mp3',
    cover: `${MUSIC_BASE}/B/bent%20wyre/%5B2025%5D%20If%20Only%20Life%20Was%20This%20Easy%20Volume%205%20-%20The%20Beat%20Misdirect/cover.jpg`,
    artist: 'bent wyre',
    album: 'If Only Life Was This Easy Vol. 5',
    lyricsUrl: `${MUSIC_BASE}/B/bent%20wyre/%5B2025%5D%20If%20Only%20Life%20Was%20This%20Easy%20Volume%205%20-%20The%20Beat%20Misdirect/01%20Ants%20Of%20The%20Beat.lrc`,
  },
];
