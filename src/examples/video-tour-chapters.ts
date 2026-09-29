// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	playlist: [sintel],
};

/**
 * Chapter strip for the Chapters tour page: the current chapter with previous
 * and next buttons, and one segment per chapter sized by its length. Clicking
 * a segment calls `seekToChapter`; the lit segment follows `chapter()` on
 * every `time` tick, because crossing a boundary on its own emits nothing.
 */
class ChapterStripPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'nm-tour-chapters';
	static override readonly description = 'Chapter list and navigation for the Chapters tour page.';

	private label!: HTMLSpanElement;
	private segments!: HTMLDivElement;

	override use(): void {
		const strip = this.createElement('div', 'nm-tour-chapters')
			.addClasses(['absolute', 'inset-x-0', 'top-0', 'flex', 'flex-col', 'gap-2', 'p-3', 'bg-gradient-to-b', 'from-black/80', 'to-transparent', 'text-white'])
			.appendTo(this.mount('overlay'))
			.get();

		const row = this.createElement('div', 'nm-tour-chapters-row')
			.addClasses(['flex', 'items-center', 'gap-2', 'text-sm'])
			.appendTo(strip)
			.get();

		const previous = this.createButton('nm-tour-chapters-previous', 'Previous chapter', () => this.player.previousChapter());
		const next = this.createButton('nm-tour-chapters-next', 'Next chapter', () => this.player.nextChapter());
		for (const [button, glyph] of [[previous, '‹'], [next, '›']] as const) {
			button.textContent = glyph;
			this.addClasses(button, ['size-8', 'shrink-0', 'rounded-full', 'bg-white/15', 'text-lg', 'leading-none', 'hover:bg-white/30']);
		}

		this.label = this.createElement('span', 'nm-tour-chapters-label')
			.addClasses(['min-w-0', 'flex-1', 'truncate', 'text-center'])
			.get();
		this.label.setAttribute('aria-live', 'polite');
		row.append(previous, this.label, next);

		this.segments = this.createElement('div', 'nm-tour-chapters-segments')
			.addClasses(['flex', 'h-2', 'gap-0.5'])
			.appendTo(strip)
			.get();

		this.on('chapters', () => this.renderSegments());
		this.on('time', () => this.renderCurrent());
		this.renderSegments();
	}

	private renderSegments(): void {
		this.segments.replaceChildren(...this.player.chapters().map((chapter) => {
			const segment = this.createButton(`nm-tour-chapter-${chapter.index}`, chapter.title, () => this.player.seekToChapter(chapter.index));
			segment.title = chapter.title;
			segment.style.flexGrow = String(chapter.end - chapter.start);
			this.addClasses(segment, ['h-full', 'rounded-full', 'bg-white/30', 'hover:bg-white/60']);
			return segment;
		}));
		this.renderCurrent();
	}

	private renderCurrent(): void {
		const list = this.player.chapters();
		const current = this.player.chapter();
		this.label.textContent = current
			? `${current.index + 1} / ${list.length} · ${current.title}`
			: `${list.length} chapters`;
		for (const [i, segment] of [...this.segments.children].entries()) {
			const active = i === current?.index;
			segment.classList.toggle('bg-white', active);
			segment.classList.toggle('bg-white/30', !active);
			segment.toggleAttribute('aria-current', active);
		}
	}
}

function configure(player: NMVideoPlayer): void {
	player.addPlugin(ChapterStripPlugin);
}

export default { config, configure };
