// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Vanilla Integration. No framework, no build-time component syntax,
 * just a small controller function that owns the player instance and exposes
 * a plain callback for state changes. This is the shape every framework
 * wrapper (Vue composable, React hook, Svelte store) is built around
 * underneath — see Recipes: Vue / React / Svelte for the same pattern
 * adapted to each framework's own reactivity primitive.
 *
 * DOM construction (`createElement`/`createButton`) lives on the plugin, not
 * the player — `this.createElement(...)` inside `use()`, never
 * `player.createElement(...)` from the outside.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState } from '@nomercy-entertainment/nomercy-music-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

interface PlayerSnapshot {
	playing: boolean;
	name: string;
	currentTime: number;
	duration: number;
}

/**
 * Builds the name, progress slider, and play/pause button directly on the
 * player's container — the same three controls every framework recipe in
 * this section renders, here addressed as plain DOM nodes instead of bound
 * through a template. Listens to the same events the lowest common
 * denominator every framework's reactivity system wraps: `onUnmounted`
 * (Vue), a cleanup function (React `useEffect`), or `onDestroy` (Svelte) —
 * here it's simply `use()`'s own scope, torn down automatically on dispose.
 */
class VanillaControlsPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-vanilla-controls';
	static override readonly description = 'Title, progress bar, and play/pause button for the Vanilla Integration recipe.';

	private title!: HTMLDivElement;
	private bar!: HTMLDivElement;
	private fill!: HTMLDivElement;
	private button!: HTMLButtonElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		const root = this.mount('root');

		this.title = this.createElement('div', 'nm-vanilla-title').appendTo(root).get();
		this.title.style.cssText
			= 'position:absolute;left:1rem;top:1rem;padding:.35rem .6rem;border-radius:.5rem;'
				+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;pointer-events:none;';

		this.bar = this.createElement('div', 'nm-vanilla-progress').appendTo(root).get();
		this.bar.style.cssText
			= 'position:absolute;left:1rem;right:1rem;bottom:3.5rem;height:.35rem;border-radius:999px;'
				+ 'background:rgba(255,255,255,.25);cursor:pointer;';
		this.bar.setAttribute('role', 'slider');
		this.bar.setAttribute('aria-valuemin', '0');
		this.bar.setAttribute('aria-valuemax', '100');
		this.bar.tabIndex = 0;

		this.fill = this.createElement('div', 'nm-vanilla-progress-fill').appendTo(this.bar).get();
		this.fill.style.cssText = 'height:100%;border-radius:999px;background:#fff;width:0%;';

		this.button = this.createButton('nm-vanilla-toggle', 'Play', () => void this.player.togglePlayback());
		this.button.style.cssText
			= 'position:absolute;left:1rem;bottom:1rem;padding:.35rem .75rem;border-radius:.5rem;border:0;'
				+ 'background:rgba(0,0,0,.65);color:#fff;font:600 .8rem system-ui,sans-serif;cursor:pointer;';
		root.appendChild(this.button);

		this.bar.addEventListener('click', (event) => this.seek(event));

		const emit = (): void => this.render(this.snapshot());
		this.on('play', emit);
		this.on('pause', emit);
		this.on('playing', emit);
		this.on('ended', emit);
		this.on('item', emit);
		this.on('time', emit);
		this.on('duration', emit);
		emit();
	}

	private snapshot(): PlayerSnapshot {
		return {
			playing: this.player.playState() === PlayState.PLAYING,
			name: this.player.item()?.name ?? '',
			currentTime: this.player.time(),
			duration: this.player.duration(),
		};
	}

	private seek(event: MouseEvent): void {
		const ratio = event.offsetX / this.bar.clientWidth;
		this.player.seekByPercentage(ratio * 100);
	}

	private render(snapshot: PlayerSnapshot): void {
		this.title.textContent = snapshot.name || 'Nothing playing';
		const progress = snapshot.duration > 0 ? (snapshot.currentTime / snapshot.duration) * 100 : 0;
		this.fill.style.width = `${progress}%`;
		this.bar.setAttribute('aria-valuenow', String(progress));
		this.button.textContent = snapshot.playing ? 'Pause' : 'Play';
		this.button.setAttribute('aria-label', snapshot.playing ? 'Pause' : 'Play');
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(VanillaControlsPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.mute();
	player.item(0, { autoplay: true });
}

export default { config, configure, onReady, player: 'music' as const };
