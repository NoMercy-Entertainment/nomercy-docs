// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Cue parsers turn raw text into a `CueList`: a time-indexed, binary-searched
 * structure (`active(t)` / `next(t)` / `prev(t)`), not a plain array. The kit
 * ships VTT, sprite-VTT, and LRC parsers behind a `CueParserRegistry` that a
 * real player pre-seeds with all three; a bare `new CueParserRegistry()` (as
 * built here) starts empty, so custom formats can be demonstrated in isolation.
 */

import type { ICueParser } from '@nomercy-entertainment/nomercy-player-core';
import { CueParserRegistry, createCueList, parseLrc, parseVttSubtitles } from '@nomercy-entertainment/nomercy-player-core';

const vtt = `WEBVTT

00:00:01.000 --> 00:00:04.000
Hello there.

00:00:04.500 --> 00:00:07.000
<b>Bold</b> caption line.
`;

const subtitleCues = parseVttSubtitles(vtt);
console.log(subtitleCues.cues.length); // 2
console.log(subtitleCues.active(2)[0]?.payload.text); // 'Hello there.' — the cue covering t=2s
console.log(subtitleCues.next(4.2)?.payload.text); // 'Bold caption line.' — the next cue after t=4.2s

const lrc = `[00:12.50]First line
[00:16.00]Second line
`;

const lyricCues = parseLrc(lrc);
console.log(lyricCues.cues.length); // 2
console.log(lyricCues.active(13)[0]?.payload.text); // 'First line' — active until the next cue starts

// Custom formats register alongside the built-ins a real player seeds — most
// recently registered wins resolution for a given URL.
interface ChapterMarkerPayload {
	label: string;
}

const chapterMarkerParser: ICueParser<ChapterMarkerPayload> = {
	id: 'demo:chapter-markers',
	canParse: url => url.endsWith('.chapters.json'),
	parse: (raw) => {
		const marks = JSON.parse(raw) as { at: number; label: string }[];
		return createCueList(marks.map(mark => ({ start: mark.at, end: mark.at, payload: { label: mark.label } })));
	},
};

const registry = new CueParserRegistry();
registry.register(chapterMarkerParser);

console.log(registry.resolve('movie.chapters.json')?.id); // 'demo:chapter-markers'
console.log(registry.resolve('captions.vtt')); // undefined — this standalone registry has no VTT parser
