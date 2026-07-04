// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 2 of 10: Play / Pause.
 *
 * Adds to the step-1 shell: a big center play button, a buffering spinner
 * that is pure CSS riding the player's `.buffering` container class, a
 * bottom row inside the bottom bar, and a playback toggle button with a
 * play and a pause icon swapped by the `play` / `pause` events.
 */

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.60846 4.61586C7.1087 4.34394 6.5 4.7057 6.5 5.27466V18.727C6.5 19.2959 7.1087 19.6577 7.60846 19.3858L19.97 12.6596C20.4921 12.3755 20.4921 11.6261 19.97 11.342L7.60846 4.61586ZM5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z"/></svg>';
const PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V18.75C4 19.9926 5.00736 21 6.25 21H8.75C9.99264 21 11 19.9926 11 18.75V5.25C11 4.00736 9.99264 3 8.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H8.75C9.16421 4.5 9.5 4.83579 9.5 5.25V18.75C9.5 19.1642 9.16421 19.5 8.75 19.5H6.25C5.83579 19.5 5.5 19.1642 5.5 18.75V5.25ZM15.25 3C14.0074 3 13 4.00736 13 5.25V18.75C13 19.9926 14.0074 21 15.25 21H17.75C18.9926 21 20 19.9926 20 18.75V5.25C20 4.00736 18.9926 3 17.75 3H15.25ZM14.5 5.25C14.5 4.83579 14.8358 4.5 15.25 4.5H17.75C18.1642 4.5 18.5 4.83579 18.5 5.25V18.75C18.5 19.1642 18.1642 19.5 17.75 19.5H15.25C14.8358 19.5 14.5 19.1642 14.5 18.75V5.25Z"/></svg>';

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
			])
			.appendTo(this.overlay)
			.get();
		this.centerButton.ariaLabel = 'Play';
		this.centerButton.innerHTML = PLAY_ICON;

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
		playIcon.innerHTML = PLAY_ICON;

		const pauseIcon = this.player
			.createElement('span', 'playback-pause')
			.appendTo(this.playbackButton)
			.get();
		pauseIcon.innerHTML = PAUSE_ICON;
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
}

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
