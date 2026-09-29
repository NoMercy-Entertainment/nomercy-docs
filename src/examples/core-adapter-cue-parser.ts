// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Register and resolve an ICueParser on a bare CueParserRegistry.
 * Setup seeds LRC, VTT, and sprite-VTT by id; a bare registry starts empty.
 */

import {
	CueParserRegistry,
	createCueList,
	parseLrc,
} from '@nomercy-entertainment/nomercy-player-core';
import type { ICueParser, LrcPayload } from '@nomercy-entertainment/nomercy-player-core';

const beats: ICueParser<{ label: string }> = {
	id: 'demo:beats',
	canParse: (url, contentType) =>
		url.endsWith('.beats') || contentType === 'application/x-beats',
	parse: (raw) => {
		const rows = raw.split(/\r?\n/).filter(Boolean);
		return createCueList(
			rows.map((row) => {
				const [at, ...rest] = row.split(/\s+/);
				const start = Number(at);
				return {
					start,
					end: start,
					payload: { label: rest.join(' ') },
				};
			}),
		);
	},
};

const plainAsLrc: ICueParser<LrcPayload> = {
	id: 'demo:plain-as-lrc',
	canParse: url => url.endsWith('.lyrics.txt'),
	parse: (raw) => {
		const asLrc = raw
			.split(/\r?\n/)
			.filter(Boolean)
			.map((line, index) => {
				const seconds = index * 5;
				const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
				const ss = String(seconds % 60).padStart(2, '0');
				return `[${mm}:${ss}.00]${line}`;
			})
			.join('\n');
		return parseLrc(asLrc);
	},
};

const registry = new CueParserRegistry();
registry.register(beats);
registry.register(plainAsLrc);

console.log(registry.resolve('track.beats')?.id); // 'demo:beats'
console.log(registry.resolve('song.lyrics.txt')?.id); // 'demo:plain-as-lrc'
console.log(registry.resolve('captions.vtt')); // undefined

const beatCues = beats.parse('12.5 Drop\n24 Chorus\n');
console.log(beatCues.cues.length); // 2
console.log(beatCues.active(12.5)[0]?.payload.label); // 'Drop'

const lyricCues = plainAsLrc.parse('First line\nSecond line\n');
console.log(lyricCues.cues.length); // 2
console.log(lyricCues.active(1)[0]?.payload.text); // 'First line'
