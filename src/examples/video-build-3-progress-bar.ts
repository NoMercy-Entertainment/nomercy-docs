// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 3 of 10: Progress Bar.
 *
 * Adds to step 2: a slider bar above the button row with a buffer fill, a
 * progress fill, and a hover nipple. Click to seek via `seekByPercentage()`,
 * drag to scrub (the `time` listener skips updates while dragging so the
 * bar doesn't fight the pointer), all three fills painted from the
 * `timeData()` snapshot, and everything resets when the playlist moves to
 * another item.
 */

import type { NMVideoPlayer, VideoPlayerConfig, VideoPlaylistItem } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE } from './media';

interface TutorialIcon {
	title: string;
	normal: string;
	hover: string;
}

const icons = {
	play: {
		title: 'Pause',
		normal: 'M7.60846 4.61586C7.1087 4.34394 6.5 4.7057 6.5 5.27466V18.727C6.5 19.2959 7.1087 19.6577 7.60846 19.3858L19.97 12.6596C20.4921 12.3755 20.4921 11.6261 19.97 11.342L7.60846 4.61586ZM5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
		hover: 'M5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z',
	},
	pause: {
		title: 'Play',
		normal: 'M6.25 3C5.00736 3 4 4.00736 4 5.25V18.75C4 19.9926 5.00736 21 6.25 21H8.75C9.99264 21 11 19.9926 11 18.75V5.25C11 4.00736 9.99264 3 8.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H8.75C9.16421 4.5 9.5 4.83579 9.5 5.25V18.75C9.5 19.1642 9.16421 19.5 8.75 19.5H6.25C5.83579 19.5 5.5 19.1642 5.5 18.75V5.25ZM15.25 3C14.0074 3 13 4.00736 13 5.25V18.75C13 19.9926 14.0074 21 15.25 21H17.75C18.9926 21 20 19.9926 20 18.75V5.25C20 4.00736 18.9926 3 17.75 3H15.25ZM14.5 5.25C14.5 4.83579 14.8358 4.5 15.25 4.5H17.75C18.1642 4.5 18.5 4.83579 18.5 5.25V18.75C18.5 19.1642 18.1642 19.5 17.75 19.5H15.25C14.8358 19.5 14.5 19.1642 14.5 18.75V5.25Z',
		hover: 'M5.74609 3C4.7796 3 3.99609 3.7835 3.99609 4.75V19.25C3.99609 20.2165 4.7796 21 5.74609 21H9.24609C10.2126 21 10.9961 20.2165 10.9961 19.25V4.75C10.9961 3.7835 10.2126 3 9.24609 3H5.74609ZM14.7461 3C13.7796 3 12.9961 3.7835 12.9961 4.75V19.25C12.9961 20.2165 13.7796 21 14.7461 21H18.2461C19.2126 21 19.9961 20.2165 19.9961 19.25V4.75C19.9961 3.7835 19.2126 3 18.2461 3H14.7461Z',
	},
} satisfies Record<string, TutorialIcon>;

/**
 * Inline-SVG renderer for the icon table: both variants render stacked as
 * `icon-normal` + `icon-hover` paths, and the button's hover state swaps
 * which one is visible — the same mechanism the shipped plugin uses.
 */
function svgFromIcon(icon: TutorialIcon, size = 24): string {
	return `<svg viewBox="0 0 24 24" fill="currentColor" width="${size}" height="${size}" aria-hidden="true">`
		+ `<path class="icon-normal" d="${icon.normal}"/>`
		+ `<path class="icon-hover" d="${icon.hover}"/>`
		+ `</svg>`;
}

const SPINNER_SVG = `
	<svg class="animate-spin text-white" viewBox="0 0 100 101" fill="none">
		<path d="M100 50.59C100 78.2 77.6 100.59 50 100.59S0 78.2 0 50.59 22.39.59 50 .59s50 22.39 50 50z" fill="currentColor" opacity="0.25"/>
		<path d="M93.97 39.04c2.42-.64 3.89-3.13 3.04-5.49A50 50 0 0041.73 1.28c-2.47.41-3.92 2.92-3.28 5.34.66 2.43 3.14 3.85 5.62 3.48a40 40 0 0146.62 22.32c.9 2.24 3.36 3.7 5.79 3.06z" fill="currentColor"/>
	</svg>
`;

class StepPlugin extends Plugin<NMVideoPlayer> {
	static override readonly id = 'tutorial-ui';

	private overlay!: HTMLElement;
	private topBar!: HTMLDivElement;
	private bottomBar!: HTMLDivElement;
	private centerButton!: HTMLButtonElement;
	private spinner!: HTMLDivElement;
	private bottomRow!: HTMLDivElement;
	private playbackButton!: HTMLButtonElement;
	private sliderBar!: HTMLDivElement;
	private isMouseDown = false;

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
		this.createCenterButton();
		this.createSpinner();
		this.createBottomBar();
		this.createProgressBar();
		this.createBottomRow();
		this.createPlaybackButton();
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

	private createUiButton(parent: HTMLElement, id: string, label: string): HTMLButtonElement {
		const button = this.player
			.createElement('button', id)
			.addClasses([
				'w-10',
				'h-10',
				'rounded-full',
				'flex',
				'items-center',
				'justify-center',
				'text-white',
				'hover:bg-white/20',
				'cursor-pointer',
				'[&_.icon-hover]:hidden',
				'[&:hover_.icon-normal]:hidden',
				'[&:hover_.icon-hover]:block',
			])
			.appendTo(parent)
			.get();
		button.ariaLabel = label;
		return button;
	}

	private createCenterButton(): void {
		this.centerButton = this.player
			.createElement('button', 'center-play')
			.addClasses([
				'absolute',
				'top-1/2',
				'left-1/2',
				'-translate-x-1/2',
				'-translate-y-1/2',
				'w-16',
				'h-16',
				'rounded-full',
				'bg-black/50',
				'text-white',
				'flex',
				'items-center',
				'justify-center',
				'transition-opacity',
				'duration-300',
				'hover:bg-black/70',
				'hover:scale-110',
				'cursor-pointer',
				'pointer-events-auto',
				'[&_.icon-hover]:hidden',
				'[&:hover_.icon-normal]:hidden',
				'[&:hover_.icon-hover]:block',
			])
			.appendTo(this.overlay)
			.get();
		this.centerButton.ariaLabel = 'Play';
		this.centerButton.innerHTML = svgFromIcon(icons.play);

		this.listen(this.centerButton, 'click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
		});

		this.on('play', () => {
			this.centerButton.style.display = 'none';
		});
	}

	private createSpinner(): void {
		this.spinner = this.player
			.createElement('div', 'spinner')
			.addClasses([
				'absolute',
				'top-1/2',
				'left-1/2',
				'-translate-x-1/2',
				'-translate-y-1/2',
				'w-12',
				'h-12',
				'hidden',
				'group-[&.nomercyplayer.buffering]:block',
				'pointer-events-none',
			])
			.appendTo(this.overlay)
			.get();

		this.spinner.innerHTML = SPINNER_SVG;
	}

	private createBottomRow(): void {
		this.bottomRow = this.player
			.createElement('div', 'bottom-row')
			.addClasses([
				'flex',
				'items-center',
				'gap-1',
				'h-10',
			])
			.appendTo(this.bottomBar)
			.get();
	}

	private createPlaybackButton(): void {
		this.playbackButton = this.createUiButton(this.bottomRow, 'playback', 'Play');

		const playIcon = this.player
			.createElement('span', 'playback-play')
			.appendTo(this.playbackButton)
			.get();
		playIcon.innerHTML = svgFromIcon(icons.play);

		const pauseIcon = this.player
			.createElement('span', 'playback-pause')
			.appendTo(this.playbackButton)
			.get();
		pauseIcon.innerHTML = svgFromIcon(icons.pause);
		pauseIcon.style.display = 'none';

		this.listen(this.playbackButton, 'click', (event) => {
			event.stopPropagation();
			this.player.togglePlayback();
		});

		this.on('pause', () => {
			pauseIcon.style.display = 'none';
			playIcon.style.display = 'flex';
		});
		this.on('play', () => {
			playIcon.style.display = 'none';
			pauseIcon.style.display = 'flex';
		});
	}

	private createProgressBar(): void {
		this.sliderBar = this.player
			.createElement('div', 'slider-bar')
			.addClasses([
				'relative',
				'w-full',
				'h-1',
				'bg-white/20',
				'rounded-full',
				'cursor-pointer',
				'group/slider',
				'hover:h-2',
				'transition-all',
				'duration-150',
			])
			.appendTo(this.bottomBar)
			.get();

		const sliderBuffer = this.player
			.createElement('div', 'slider-buffer')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white/30',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderProgress = this.player
			.createElement('div', 'slider-progress')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.sliderBar)
			.get();

		const sliderNipple = this.player
			.createElement('div', 'slider-nipple')
			.addClasses([
				'absolute',
				'top-1/2',
				'-translate-y-1/2',
				'-translate-x-1/2',
				'w-3',
				'h-3',
				'rounded-full',
				'bg-white',
				'hidden',
				'group-hover/slider:flex',
				'pointer-events-none',
				'left-0',
				'z-20',
			])
			.appendTo(this.sliderBar)
			.get();

		// Converts a mouse or touch event's X position into a 0-100 percentage
		// relative to the slider bar, clamped so dragging past the edges holds.
		const getPercentFromEvent = (event: MouseEvent | TouchEvent): number => {
			const rect = this.sliderBar.getBoundingClientRect();
			const clientX = ('clientX' in event ? event.clientX : undefined)
				?? ('touches' in event ? event.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in event ? event.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return (x / rect.width) * 100;
		};

		for (const eventName of ['mousedown', 'touchstart']) {
			this.listen(this.sliderBar, eventName, () => {
				this.isMouseDown = true;
			}, { passive: true });
		}

		this.listen(this.sliderBar, 'click', (event) => {
			this.isMouseDown = false;
			const percent = getPercentFromEvent(event as MouseEvent);
			this.player.seekByPercentage(percent);
			sliderNipple.style.left = `${percent}%`;
		});

		for (const eventName of ['mousemove', 'touchmove']) {
			this.listen(this.sliderBar, eventName, (event) => {
				if (!this.isMouseDown)
					return;
				const percent = getPercentFromEvent(event as MouseEvent | TouchEvent);
				sliderNipple.style.left = `${percent}%`;
				sliderProgress.style.width = `${percent}%`;
			}, { passive: true });
		}

		this.listen(this.sliderBar, 'mouseleave', () => {
			this.isMouseDown = false;
		}, { passive: true });

		this.on('time', ({ position, duration, buffered, percentage }) => {
			if (this.isMouseDown)
				return;
			sliderProgress.style.width = `${percentage}%`;
			sliderNipple.style.left = `${percentage}%`;
			if (duration > 0)
				sliderBuffer.style.width = `${Math.min(100, ((position + buffered) / duration) * 100)}%`;
		});

		this.on('item', () => {
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
		});
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
