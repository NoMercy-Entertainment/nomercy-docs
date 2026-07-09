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
 * Items use the canonical `VideoPlaylistItem` shape directly (`url`,
 * `subtitles`, `chapters`, `previewSpriteUrl`) rather than the v1/server wire
 * format (`file`, `tracks[]`) — `normalizePlaylistItem` only reshapes the
 * top-level media path (`file` -> `url`) and font descriptors on ingest, the
 * `chapters` and `subtitles` fields are read as typed straight off the item
 * (see [The Queue & Playlist](/nomercy-video-player/tour/queue) and
 * [Adapter: Chapter Source](/nomercy-video-player/plugins-adapters/adapter-chapter-source)),
 * so docs fixtures ship them pre-typed instead of nesting them under a wire
 * `tracks[]` array that nothing here actually reads.
 */

import type { FontTrackRef, VideoPlaylistItem } from '@nomercy-entertainment/nomercy-video-player';
import type { MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';

export const FILMS_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Films';
export const ANIME_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Anime';
export const MUSIC_BASE =
  'https://raw.githubusercontent.com/NoMercy-Entertainment/nomercy-media/master/Music';

const sintelItem: VideoPlaylistItem = {
	id: 'sintel',
	title: 'Sintel',
	description: 'A short fantasy film by the Blender Foundation. Sintel searches for a baby dragon she calls Scales.',
	url: '/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8',
	image: '/w780/q2bVM5z90tCGbmXYtq2J38T5hSX.jpg',
	duration: 888,
	year: 2010,
	subtitles: [
		{
			id: 'eng',
			label: 'English',
			language: 'eng',
			kind: 'subtitles',
			url: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.eng.full.vtt',
		},
		{
			id: 'dut',
			label: 'Dutch',
			language: 'dut',
			kind: 'subtitles',
			url: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.dut.full.vtt',
		},
		{
			id: 'fre',
			label: 'French',
			language: 'fre',
			kind: 'subtitles',
			url: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.fre.full.vtt',
		},
		{
			id: 'ger',
			label: 'German',
			language: 'ger',
			kind: 'subtitles',
			url: '/Sintel.(2010)/subtitles/Sintel.(2010).NoMercy.ger.full.vtt',
		},
	],
	chapters: [
		{ index: 0, start: 0, end: 107, title: 'Opening' },
		{ index: 1, start: 107, end: 207, title: 'A Dangerous Quest' },
		{ index: 2, start: 207, end: 338, title: 'Scales' },
		{ index: 3, start: 338, end: 445, title: 'The Attack' },
		{ index: 4, start: 445, end: 557, title: 'In Pursuit' },
		{ index: 5, start: 557, end: 621, title: 'The Cave' },
		{ index: 6, start: 621, end: 745, title: 'Eye to Eye' },
		{ index: 7, start: 745, end: 888, title: 'End Credits' },
	],
	previewSpriteUrl: '/Sintel.(2010)/thumbs_256x109.vtt',
};

export const cosmosLaundromatItem: VideoPlaylistItem = {
  id: 'cosmos-laundromat',
  title: 'Cosmos Laundromat',
  description: 'On a desolate island, a suicidal sheep meets his fate.',
  url: '/Cosmos.Laundromat.(2015)/Cosmos.Laundromat.(2015).NoMercy.m3u8',
  image: '/w780/f2wABsgj2lIR2dkDEfBZX8p4Iyk.jpg',
  duration: 724,
  year: 2015,
  subtitles: [
    {
      id: 'eng',
      label: 'English',
      language: 'eng',
      kind: 'subtitles',
      url: '/Cosmos.Laundromat.(2015)/subtitles/Cosmos.Laundromat.(2015).NoMercy.eng.full.vtt',
    },
  ],
};

export const bigBuckBunnyItem: VideoPlaylistItem = {
  id: 'big-buck-bunny',
  title: 'Big Buck Bunny',
  description: 'A giant rabbit with a heart bigger than himself.',
  url: '/Big.Buck.Bunny.(2008)/Big.Buck.Bunny.(2008).NoMercy.m3u8',
  image: '/w780/xtdybjRRZ15mCrPOvEld305myys.jpg',
  duration: 596,
  year: 2008,
  // Real chapter marks from the fixture's own `chapters.vtt`, in seconds.
  chapters: [
    { index: 0, start: 0, end: 65, title: 'Opening' },
    { index: 1, start: 65, end: 162, title: 'A Beautiful Day' },
    { index: 2, start: 162, end: 250, title: 'The Bullies' },
    { index: 3, start: 250, end: 350, title: 'Plotting Revenge' },
    { index: 4, start: 350, end: 495, title: 'The Traps' },
    { index: 5, start: 495, end: 596, title: 'End Credits' },
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

const noRinItem: VideoPlaylistItem = {
  id: 'no-rin-s00e00',
  title: 'No-Rin',
  show: 'No-Rin',
  season: 0,
  episode: 0,
  description:
    'ASS subtitle + embedded-font fixture episode from the nomercy-media test catalogue.',
  url: '/No-Rin.(2014)/No-Rin.S00E00/No-Rin.(2014).S00E00.NoMercy.m3u8',
  duration: 1420,
  year: 2014,
  subtitles: [
    {
      id: 'eng',
      label: 'English',
      language: 'eng',
      kind: 'subtitles',
      url: '/No-Rin.(2014)/No-Rin.S00E00/subtitles/No-Rin.(2014).S00E00.NoMercy.eng.full.ass',
    },
  ],
  fonts: fontsManifest('/No-Rin.(2014)/No-Rin.S00E00/fonts.json', 'No-Rin fonts manifest'),
};

const railWarsItem: VideoPlaylistItem = {
  id: 'rail-wars-s00e00',
  title: 'Rail Wars!',
  show: 'Rail Wars!',
  season: 0,
  episode: 0,
  description:
    'ASS subtitle + embedded-font fixture episode from the nomercy-media test catalogue.',
  url: '/Rail.Wars!.(2014)/Rail.Wars!.S00E00/Rail.Wars!.(2014).S00E00.NoMercy.m3u8',
  duration: 90,
  year: 2014,
  subtitles: [
    {
      id: 'eng',
      label: 'English',
      language: 'eng',
      kind: 'subtitles',
      url: '/Rail.Wars!.(2014)/Rail.Wars!.S00E00/subtitles/Rail.Wars!.(2014).S00E00.NoMercy.eng.full.ass',
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
 * `films`/`url` above. `cover` is a full URL rather than baseUrl-relative —
 * cover art resolves through the `'poster'` category (`baseImageUrl`, not
 * `baseUrl`), and these tracks don't ship a separate image origin.
 */
const whereDreamsDrift: MusicPlaylistItem = {
  id: 'ketsa-01-where-dreams-drift',
  name: 'Where Dreams Drift',
  url: '/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/01.Where.Dreams.Drift.mp3',
  cover: `${MUSIC_BASE}/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/cover.jpg`,
  artist: 'Ketsa',
  album: 'CC BY: Free to Use',
  lyricsUrl: `${MUSIC_BASE}/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/01.Where.Dreams.Drift.lrc`,
};

/** Single track for snippets that need exactly one playable song. */
export const firstSong: MusicPlaylistItem = whereDreamsDrift;

export const songs: MusicPlaylistItem[] = [
  whereDreamsDrift,
  {
    id: 'ketsa-02-saviour-above',
    name: 'Saviour Above',
    url: '/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/02.Saviour.Above.mp3',
    cover: `${MUSIC_BASE}/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/cover.jpg`,
    artist: 'Ketsa',
    album: 'CC BY: Free to Use',
    lyricsUrl: `${MUSIC_BASE}/K/Ketsa/CC.BY.FREE.TO.USE.FOR.ANYTHING.(2025)/02.Saviour.Above.lrc`,
  },
  {
    id: 'bent-wyre-01-ants-of-the-beat',
    name: 'Ants Of The Beat',
    url: '/B/bent.wyre/If.Only.Life.Was.This.Easy.Volume.5.The.Beat.Misdirect.(2025)/01.Ants.Of.The.Beat.mp3',
    cover: `${MUSIC_BASE}/B/bent.wyre/If.Only.Life.Was.This.Easy.Volume.5.The.Beat.Misdirect.(2025)/cover.jpg`,
    artist: 'bent wyre',
    album: 'If Only Life Was This Easy Vol. 5',
    lyricsUrl: `${MUSIC_BASE}/B/bent.wyre/If.Only.Life.Was.This.Easy.Volume.5.The.Beat.Misdirect.(2025)/01.Ants.Of.The.Beat.lrc`,
  },
];
