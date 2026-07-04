// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 10: Volume.
 *
 * Adds to step 4: a mute toggle with three state icons and a slide-out
 * volume bar, wired to `volume()` / `toggleMute()`, reacting to the
 * `volume` and `mute` events, seeded from `volume()` and `volumeState()`.
 */

import type { NMVideoPlayer, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { formatSeconds, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { VolumeState } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M7.60846 4.61586C7.1087 4.34394 6.5 4.7057 6.5 5.27466V18.727C6.5 19.2959 7.1087 19.6577 7.60846 19.3858L19.97 12.6596C20.4921 12.3755 20.4921 11.6261 19.97 11.342L7.60846 4.61586ZM5 5.27466C5 3.5678 6.82609 2.48249 8.32538 3.29828L20.687 10.0244C22.2531 10.8766 22.2531 13.125 20.687 13.9772L8.32538 20.7033C6.82609 21.5191 5 20.4338 5 18.727V5.27466Z"/></svg>';
const PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M6.25 3C5.00736 3 4 4.00736 4 5.25V18.75C4 19.9926 5.00736 21 6.25 21H8.75C9.99264 21 11 19.9926 11 18.75V5.25C11 4.00736 9.99264 3 8.75 3H6.25ZM5.5 5.25C5.5 4.83579 5.83579 4.5 6.25 4.5H8.75C9.16421 4.5 9.5 4.83579 9.5 5.25V18.75C9.5 19.1642 9.16421 19.5 8.75 19.5H6.25C5.83579 19.5 5.5 19.1642 5.5 18.75V5.25ZM15.25 3C14.0074 3 13 4.00736 13 5.25V18.75C13 19.9926 14.0074 21 15.25 21H17.75C18.9926 21 20 19.9926 20 18.75V5.25C20 4.00736 18.9926 3 17.75 3H15.25ZM14.5 5.25C14.5 4.83579 14.8358 4.5 15.25 4.5H17.75C18.1642 4.5 18.5 4.83579 18.5 5.25V18.75C18.5 19.1642 18.1642 19.5 17.75 19.5H15.25C14.8358 19.5 14.5 19.1642 14.5 18.75V5.25Z"/></svg>';
const SEEK_BACK_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M2.74999 2.5C2.33578 2.5 2 2.83579 2 3.25V8.75C2 9.16421 2.33578 9.5 2.74999 9.5H8.25011C8.66432 9.5 9.00011 9.16421 9.00011 8.75C9.00011 8.33579 8.66432 8 8.25011 8H4.34273C5.40077 6.60212 6.77033 5.4648 8.47169 4.93832C10.5381 4.29885 12.7232 4.35354 14.7384 5.10317C16.7673 5.85787 18.6479 7.38847 19.5922 9.11081C19.7914 9.47401 20.2473 9.607 20.6105 9.40785C20.9736 9.20871 21.1066 8.75284 20.9075 8.38964C19.7655 6.30687 17.5773 4.55877 15.2614 3.69728C12.9318 2.83072 10.4069 2.7693 8.02826 3.50536C6.14955 4.08673 4.65345 5.26153 3.49999 6.64949V3.25C3.49999 2.83579 3.1642 2.5 2.74999 2.5ZM8.95266 11.0278C9.27643 11.1186 9.50022 11.4138 9.50022 11.75V20.25C9.50022 20.6642 9.16443 21 8.75022 21C8.33601 21 8.00023 20.6642 8.00023 20.25V13.8328C7.61793 14.202 7.16004 14.5788 6.63611 14.8931C6.28093 15.1062 5.82024 14.9911 5.60713 14.6359C5.39402 14.2807 5.5092 13.82 5.86438 13.6069C6.53976 13.2017 7.10401 12.6421 7.50653 12.1678C7.70552 11.9334 7.85963 11.7261 7.96279 11.5793C8.01427 11.5061 8.05276 11.4483 8.07751 11.4103C8.08989 11.3913 8.0988 11.3772 8.10417 11.3687L8.10951 11.3602L8.11019 11.359C8.28503 11.072 8.629 10.9371 8.95266 11.0278ZM13.1988 12.629C13.7527 11.6377 14.6822 11 16.002 11C17.3218 11 18.2513 11.6377 18.8052 12.629C19.3266 13.5624 19.502 14.7762 19.502 16C19.502 17.2238 19.3266 18.4376 18.8052 19.371C18.2513 20.3623 17.3218 21 16.002 21C14.6822 21 13.7527 20.3623 13.1988 19.371C12.6774 18.4376 12.502 17.2238 12.502 16C12.502 14.7762 12.6774 13.5624 13.1988 12.629ZM14.5083 13.3606C14.1704 13.9654 14.002 14.8766 14.002 16C14.002 17.1234 14.1704 18.0346 14.5083 18.6394C14.8139 19.1863 15.2593 19.5 16.002 19.5C16.7447 19.5 17.1901 19.1863 17.4957 18.6394C17.8336 18.0346 18.002 17.1234 18.002 16C18.002 14.8766 17.8336 13.9654 17.4957 13.3606C17.1901 12.8137 16.7447 12.5 16.002 12.5C15.2593 12.5 14.8139 12.8137 14.5083 13.3606Z"/></svg>';
const SEEK_FORWARD_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M21.25 2.5C21.6642 2.5 22 2.83579 22 3.25V8.75C22 9.16421 21.6642 9.5 21.25 9.5H15.7499C15.3357 9.5 14.9999 9.16421 14.9999 8.75C14.9999 8.33578 15.3357 8 15.7499 8H19.6573C18.5992 6.60212 17.2297 5.4648 15.5283 4.93832C13.4619 4.29885 11.2768 4.35354 9.26156 5.10317C7.23271 5.85787 5.35214 7.38846 4.40776 9.11081C4.20861 9.47401 3.75274 9.607 3.38955 9.40785C3.02635 9.2087 2.89336 8.75283 3.09251 8.38964C4.23451 6.30687 6.42268 4.55877 8.73861 3.69728C11.0682 2.83072 13.5931 2.7693 15.9717 3.50536C17.8504 4.08673 19.3465 5.26153 20.5 6.64949V3.25C20.5 2.83579 20.8358 2.5 21.25 2.5ZM16.0018 11C14.6821 11 13.7525 11.6377 13.1987 12.629C12.6772 13.5624 12.5019 14.7762 12.5019 16C12.5019 17.2238 12.6772 18.4376 13.1987 19.371C13.7525 20.3623 14.6821 21 16.0018 21C17.3216 21 18.2512 20.3623 18.805 19.371C19.3265 18.4376 19.5018 17.2238 19.5018 16C19.5018 14.7762 19.3265 13.5624 18.805 12.629C18.2512 11.6377 17.3216 11 16.0018 11ZM14.0019 16C14.0019 14.8766 14.1703 13.9654 14.5082 13.3606C14.8137 12.8137 15.2591 12.5 16.0018 12.5C16.7446 12.5 17.19 12.8137 17.4955 13.3606C17.8334 13.9654 18.0018 14.8766 18.0018 16C18.0018 17.1234 17.8334 18.0346 17.4955 18.6394C17.19 19.1863 16.7446 19.5 16.0018 19.5C15.2591 19.5 14.8137 19.1863 14.5082 18.6394C14.1703 18.0346 14.0019 17.1234 14.0019 16ZM9.50005 11.75C9.50005 11.4138 9.27626 11.1186 8.9525 11.0278C8.62884 10.9371 8.28486 11.072 8.11003 11.359L8.10935 11.3602L8.10401 11.3687C8.09864 11.3772 8.08972 11.3913 8.07735 11.4103C8.05259 11.4483 8.0141 11.5061 7.96263 11.5793C7.85946 11.7261 7.70536 11.9334 7.50637 12.1678C7.10384 12.6421 6.5396 13.2016 5.86422 13.6069C5.50903 13.82 5.39386 14.2807 5.60697 14.6359C5.82008 14.9911 6.28077 15.1062 6.63595 14.8931C7.15988 14.5788 7.61776 14.202 8.00007 13.8328V20.25C8.00007 20.6642 8.33585 21 8.75006 21C9.16427 21 9.50005 20.6642 9.50005 20.25V11.75Z"/></svg>';
const VOLUME_HIGH_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M15 4.25049C15 3.17187 13.7255 2.59964 12.9195 3.31631L8.42794 7.30958C8.29065 7.43165 8.11333 7.49907 7.92961 7.49907H4.25C3.00736 7.49907 2 8.50643 2 9.74907V14.247C2 15.4896 3.00736 16.497 4.25 16.497H7.92956C8.11329 16.497 8.29063 16.5644 8.42793 16.6865L12.9194 20.6802C13.7255 21.397 15 20.8247 15 19.7461V4.25049ZM9.4246 8.43059L13.5 4.80728V19.1893L9.42465 15.5655C9.01275 15.1993 8.48074 14.997 7.92956 14.997H4.25C3.83579 14.997 3.5 14.6612 3.5 14.247V9.74907C3.5 9.33486 3.83579 8.99907 4.25 8.99907H7.92961C8.48075 8.99907 9.01272 8.79679 9.4246 8.43059ZM18.9916 5.89782C19.3244 5.65128 19.7941 5.72126 20.0407 6.05411C21.2717 7.71619 22 9.77439 22 12.0005C22 14.2266 21.2717 16.2848 20.0407 17.9469C19.7941 18.2798 19.3244 18.3497 18.9916 18.1032C18.6587 17.8567 18.5888 17.387 18.8353 17.0541C19.8815 15.6416 20.5 13.8943 20.5 12.0005C20.5 10.1067 19.8815 8.35945 18.8353 6.9469C18.5888 6.61404 18.6587 6.14435 18.9916 5.89782ZM17.143 8.36982C17.5072 8.17262 17.9624 8.30806 18.1596 8.67233C18.6958 9.66294 19 10.7973 19 12.0005C19 13.2037 18.6958 14.338 18.1596 15.3287C17.9624 15.6929 17.5072 15.8284 17.143 15.6312C16.7787 15.434 16.6432 14.9788 16.8404 14.6146C17.2609 13.8378 17.5 12.9482 17.5 12.0005C17.5 11.0528 17.2609 10.1632 16.8404 9.38642C16.6432 9.02216 16.7787 8.56701 17.143 8.36982Z"/></svg>';
const VOLUME_LOW_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M14.7041 3.44054C14.8952 3.66625 15 3.95238 15 4.24807V19.7497C15 20.4401 14.4404 20.9997 13.75 20.9997C13.4542 20.9997 13.168 20.8948 12.9423 20.7037L7.97513 16.4979H4.25C3.00736 16.4979 2 15.4905 2 14.2479V9.7479C2 8.50526 3.00736 7.4979 4.25 7.4979H7.97522L12.9425 3.29393C13.4694 2.84794 14.2582 2.91358 14.7041 3.44054ZM13.5 4.78718L8.52478 8.9979H4.25C3.83579 8.9979 3.5 9.33369 3.5 9.7479V14.2479C3.5 14.6621 3.83579 14.9979 4.25 14.9979H8.52487L13.5 19.2104V4.78718Z"/></svg>';
const VOLUME_MUTED_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.9195 3.31631C13.7255 2.59964 15 3.17187 15 4.25049V19.7461C15 20.8247 13.7255 21.397 12.9194 20.6802L8.42793 16.6865C8.29063 16.5644 8.11329 16.497 7.92956 16.497H4.25C3.00736 16.497 2 15.4896 2 14.247V9.74907C2 8.50643 3.00736 7.49907 4.25 7.49907H7.92961C8.11333 7.49907 8.29065 7.43165 8.42794 7.30958L12.9195 3.31631ZM13.5 4.80728L9.4246 8.43059C9.01272 8.79679 8.48075 8.99907 7.92961 8.99907H4.25C3.83579 8.99907 3.5 9.33486 3.5 9.74907V14.247C3.5 14.6612 3.83579 14.997 4.25 14.997H7.92956C8.48074 14.997 9.01275 15.1993 9.42465 15.5655L13.5 19.1893V4.80728ZM16.2197 9.22017C16.5126 8.92728 16.9874 8.92728 17.2803 9.22017L19 10.9398L20.7197 9.22017C21.0126 8.92728 21.4874 8.92728 21.7803 9.22017C22.0732 9.51307 22.0732 9.98794 21.7803 10.2808L20.0607 12.0005L21.7803 13.7202C22.0732 14.0131 22.0732 14.4879 21.7803 14.7808C21.4874 15.0737 21.0126 15.0737 20.7197 14.7808L19 13.0612L17.2803 14.7808C16.9874 15.0737 16.5126 15.0737 16.2197 14.7808C15.9268 14.4879 15.9268 14.0131 16.2197 13.7202L17.9393 12.0005L16.2197 10.2808C15.9268 9.98794 15.9268 9.51307 16.2197 9.22017Z"/></svg>';

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
	private currentTimeLabel!: HTMLSpanElement;
	private durationLabel!: HTMLSpanElement;
	private volumeSlider!: HTMLDivElement;

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
		this.createSkipButtons();
		this.createTimeDisplay();
		this.createVolumeControl();
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

	private createProgressBar(): void {
		this.sliderBar = this.player
			.createElement('div', 'slider-bar')
			.addClasses([
				'relative',
				'w-full',
				'h-1',
				'mx-2',
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

		this.on('time', ({ time }) => {
			if (this.isMouseDown)
				return;
			const duration = this.player.duration();
			const percentage = duration > 0 ? (time / duration) * 100 : 0;
			sliderProgress.style.width = `${percentage}%`;
			sliderNipple.style.left = `${percentage}%`;
		});

		this.on('item', () => {
			sliderBuffer.style.width = '0';
			sliderProgress.style.width = '0';
		});
	}

	private createSkipButtons(): void {
		const skipBack = this.createUiButton(this.bottomRow, 'skip-back', 'Skip back 10 seconds');
		skipBack.innerHTML = SEEK_BACK_ICON;
		this.listen(skipBack, 'click', (event) => {
			event.stopPropagation();
			void this.player.rewind(10);
		});

		const skipForward = this.createUiButton(this.bottomRow, 'skip-forward', 'Skip forward 10 seconds');
		skipForward.innerHTML = SEEK_FORWARD_ICON;
		this.listen(skipForward, 'click', (event) => {
			event.stopPropagation();
			void this.player.forward(10);
		});
	}

	private createTimeDisplay(): void {
		this.currentTimeLabel = this.player
			.createElement('span', 'current-time')
			.addClasses([
				'text-white',
				'text-xs',
				'tabular-nums',
				'ml-2',
			])
			.appendTo(this.bottomRow)
			.get();
		this.currentTimeLabel.textContent = '0:00';

		const separator = this.player
			.createElement('span', 'time-separator')
			.addClasses([
				'text-white/50',
				'text-xs',
				'mx-1',
			])
			.appendTo(this.bottomRow)
			.get();
		separator.textContent = '/';

		this.durationLabel = this.player
			.createElement('span', 'duration')
			.addClasses([
				'text-white',
				'text-xs',
				'tabular-nums',
			])
			.appendTo(this.bottomRow)
			.get();
		this.durationLabel.textContent = '0:00';

		this.on('time', ({ time }) => {
			this.currentTimeLabel.textContent = formatSeconds(time);
			this.durationLabel.textContent = formatSeconds(this.player.duration());
		});
	}

	private createVolumeControl(): void {
		const volumeContainer = this.player
			.createElement('div', 'volume-container')
			.addClasses([
				'flex',
				'items-center',
				'group/volume',
				'ml-1',
			])
			.appendTo(this.bottomRow)
			.get();

		const volumeButton = this.createUiButton(volumeContainer, 'volume', 'Mute');

		const volHigh = this.player
			.createElement('span', 'vol-high')
			.appendTo(volumeButton)
			.get();
		volHigh.innerHTML = VOLUME_HIGH_ICON;

		const volLow = this.player
			.createElement('span', 'vol-low')
			.appendTo(volumeButton)
			.get();
		volLow.innerHTML = VOLUME_LOW_ICON;
		volLow.style.display = 'none';

		const volMuted = this.player
			.createElement('span', 'vol-muted')
			.appendTo(volumeButton)
			.get();
		volMuted.innerHTML = VOLUME_MUTED_ICON;
		volMuted.style.display = 'none';

		this.listen(volumeButton, 'click', (event) => {
			event.stopPropagation();
			this.player.toggleMute();
		});

		this.volumeSlider = this.player
			.createElement('div', 'volume-slider')
			.addClasses([
				'relative',
				'h-1',
				'rounded-full',
				'bg-white/20',
				'cursor-pointer',
				'group/vol-slider',
				'w-0',
				'opacity-0',
				'group-hover/volume:w-20',
				'group-hover/volume:mx-2',
				'group-hover/volume:opacity-100',
				'group-focus-within/volume:w-20',
				'group-focus-within/volume:mx-2',
				'group-focus-within/volume:opacity-100',
				'hover:h-2',
				'transition-all',
				'duration-150',
			])
			.appendTo(volumeContainer)
			.get();

		const volumeProgress = this.player
			.createElement('div', 'volume-progress')
			.addClasses([
				'absolute',
				'top-0',
				'left-0',
				'h-full',
				'bg-white',
				'rounded-full',
				'pointer-events-none',
			])
			.appendTo(this.volumeSlider)
			.get();

		const volumeNipple = this.player
			.createElement('div', 'volume-nipple')
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
				'group-hover/vol-slider:flex',
				'pointer-events-none',
				'z-20',
			])
			.appendTo(this.volumeSlider)
			.get();

		const updateVolSliderUi = (vol: number): void => {
			const pct = Math.max(0, Math.min(vol, 100));
			volumeProgress.style.width = `${pct}%`;
			volumeNipple.style.left = `${pct}%`;
		};

		let volDragging = false;
		const getVolFromEvent = (event: MouseEvent | TouchEvent): number => {
			const rect = this.volumeSlider.getBoundingClientRect();
			const clientX = ('clientX' in event ? event.clientX : undefined)
				?? ('touches' in event ? event.touches?.[0]?.clientX : undefined)
				?? ('changedTouches' in event ? event.changedTouches?.[0]?.clientX : undefined)
				?? 0;
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
			return Math.round((x / rect.width) * 100);
		};

		for (const eventName of ['mousedown', 'touchstart']) {
			this.listen(this.volumeSlider, eventName, () => {
				volDragging = true;
			}, { passive: true });
		}
		this.listen(this.volumeSlider, 'click', (event) => {
			volDragging = false;
			const vol = getVolFromEvent(event as MouseEvent);
			this.player.volume(vol);
			updateVolSliderUi(vol);
		});
		for (const eventName of ['mousemove', 'touchmove']) {
			this.listen(this.volumeSlider, eventName, (event) => {
				if (!volDragging)
					return;
				const vol = getVolFromEvent(event as MouseEvent | TouchEvent);
				this.player.volume(vol);
				updateVolSliderUi(vol);
			}, { passive: true });
		}
		this.listen(this.volumeSlider, 'mouseleave', () => {
			volDragging = false;
		}, { passive: true });
		this.listen(document, 'mouseup', () => {
			volDragging = false;
		}, { passive: true });
		this.listen(document, 'touchend', () => {
			volDragging = false;
		}, { passive: true });

		let muted = this.player.volumeState() === VolumeState.MUTED;

		const updateVolumeIcon = (volume: number): void => {
			volHigh.style.display = 'none';
			volLow.style.display = 'none';
			volMuted.style.display = 'none';

			if (muted || volume === 0) {
				volMuted.style.display = 'flex';
			}
			else if (volume < 50) {
				volLow.style.display = 'flex';
			}
			else {
				volHigh.style.display = 'flex';
			}
		};

		this.on('volume', ({ level }) => {
			updateVolSliderUi(level);
			updateVolumeIcon(level);
		});
		this.on('mute', (payload) => {
			muted = payload.muted;
			updateVolumeIcon(this.player.volume());
		});

		const initialVol = this.player.volume();
		updateVolSliderUi(initialVol);
		updateVolumeIcon(initialVol);
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
