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
 * [Cue Parsers](/nomercy-player-core/tour/cue-parsers) demonstrated the
 * `ICueParser` shape against a bare, empty registry. This recipe wires the
 * same idea into an actual player: pass the parser via `setup({ cueParsers })`
 * so it's registered alongside the built-in VTT/sprite-VTT/LRC parsers a real
 * player pre-seeds, instead of replacing them.
 */

import type { ICueParser } from '@nomercy-entertainment/nomercy-player-core';
import { createCueList } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface ChapterMarkerPayload {
	label: string;
}

// A small proprietary chapter-marker format: one "seconds\tlabel" pair per line.
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
		return createCueList(marks.map(mark => ({ start: mark.start, end: mark.end, payload: { label: mark.label } })));
	},
};

const player = tourPlayer('custom-cue-parser-demo');

player.setup({
	logLevel: 'info',
	cueParsers: [chapterMarkerParser], // registered alongside the built-ins, not instead of them
});
await player.ready();

// The custom format resolves for its own extension...
console.log(player.resolveCueParser('movie.chapters.txt')?.id); // 'demo:chapter-markers'
// ...while .vtt still resolves to the kit's built-in parser, unaffected.
console.log(player.resolveCueParser('captions.vtt')?.id); // 'vtt'

// registerCueParser/unregisterCueParser are the runtime-facing equivalent of
// the setup()-time cueParsers list, for formats that aren't known upfront.
player.unregisterCueParser('demo:chapter-markers');
console.log(player.resolveCueParser('movie.chapters.txt')); // undefined — unregistered

await player.dispose();
