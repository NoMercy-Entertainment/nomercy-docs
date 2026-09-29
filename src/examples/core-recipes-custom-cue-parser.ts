// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: register a custom cue parser on a real player.
 *
 * Pass the parser via `setup({ cueParsers })` so it registers after the
 * built-in parsers. `resolveCueParser` proves the custom URL matches, and
 * that a `.vtt` URL still resolves to the built-in `vtt` parser.
 */

import type { ICueParser } from '@nomercy-entertainment/nomercy-player-core';
import { createCueList } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface ChapterMarkerPayload {
	label: string;
}

// One "seconds\tlabel" pair per line.
const chapterMarkerParser: ICueParser<ChapterMarkerPayload> = {
	id: 'demo:chapter-markers',
	canParse: url => url.endsWith('.chapters.txt'),
	parse: (raw) => {
		const marks = raw
			.trim()
			.split('\n')
			.map((line) => {
				const [at, label] = line.split('\t');
				return { start: Number(at), end: Number(at), label: label ?? '' };
			});
		return createCueList(marks.map(mark => ({
			start: mark.start,
			end: mark.end,
			payload: { label: mark.label },
		})));
	},
};

const player = tourPlayer('custom-cue-parser-demo');

player.setup({
	logLevel: 'info',
	cueParsers: [chapterMarkerParser],
});
await player.ready();

console.log(player.resolveCueParser('movie.chapters.txt')?.id); // 'demo:chapter-markers'
console.log(player.resolveCueParser('captions.vtt')?.id); // 'vtt'

player.unregisterCueParser('demo:chapter-markers');
console.log(player.resolveCueParser('movie.chapters.txt')); // undefined

await player.dispose();
