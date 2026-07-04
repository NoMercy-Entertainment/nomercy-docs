// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 1 of 10: Shell & Layout.
 *
 * The v2 translation of the original examples.nomercy.tv tutorial step. You
 * are writing your own UI plugin, not mounting the shipped one: an overlay
 * root and two control bars that every later step fills with real controls.
 *
 * The bars key their visibility off the `.active` / `.paused` state classes
 * the PLAYER maintains on `.nomercyplayer` — activity tracking is a player
 * concern, so the plugin ships zero show/hide code. `inactivityMs` on the
 * config tunes the fade delay.
 *
 * There is no `dispose()` on purpose: `mount('overlay')` registers its own
 * teardown and the base cleans every `this.listen()` / `this.on()`
 * subscription, so the v1 original's manual `remove()` calls have nothing
 * left to do in v2.
 */

import type { NMVideoPlayer, VideoPlayerConfig, VideoPlaylistItem } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE } from './media';

class StepPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'tutorial-ui';

	private overlay!: HTMLElement;
	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;

	override use(): void {
		this.player.addClasses(this.player.container, ['group']);

		this.overlay = this.mount('overlay');
		this.player.addClasses(this.overlay, [
			'overlay',
			'absolute',
			'inset-0',
			'pointer-events-none',
		]);

		this.createTopBar();
		this.createBottomBar();
	}

	private createTopBar(): void {
		this.topBar = this.player
			.createElement('div', 'top-bar')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'right-0',
				'flex',
				'items-center',
				'gap-2',
				'p-4',
				'pb-12',
				'bg-gradient-to-b',
				'from-black/80',
				'to-transparent',
				'opacity-0',
				'transition-opacity',
				'duration-300',
				'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}

	private createBottomBar(): void {
		this.bottomBar = this.player
			.createElement('div', 'bottom-bar')
			.addClasses([
				'absolute',
				'bottom-0',
				'left-0',
				'right-0',
				'flex',
				'flex-col',
				'gap-1',
				'px-4',
				'pt-12',
				'pb-2',
				'bg-gradient-to-t',
				'from-black/80',
				'to-transparent',
				'opacity-0',
				'transition-opacity',
				'duration-300',
				'pointer-events-none',
				'group-[&.nomercyplayer.active]:opacity-100',
				'group-[&.nomercyplayer.active]:pointer-events-auto',
				'group-[&.nomercyplayer.paused]:opacity-100',
				'group-[&.nomercyplayer.paused]:pointer-events-auto',
			])
			.appendTo(this.overlay)
			.get();
	}
}

// One real film from the public nomercy-media fixture catalogue. The item
// carries everything the steps light up: `subtitles` (step 8's menu),
// `chapters` (step 9's ticks and tooltip titles), and `previewSpriteUrl`
// (step 9's thumbnail manifest). Media paths resolve against the config's
// `baseUrl`; the poster resolves against `baseImageUrl`.
const sintel: VideoPlaylistItem = {
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

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: false,
	playlist: [sintel],
};

function configure(player: NMVideoPlayer): void {
	player.addPlugin(StepPlugin);
}

export default { config, configure };
