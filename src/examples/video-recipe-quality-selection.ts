// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Manual Quality Selection. A `<select>` populated from the `'levels'`
 * event (the manifest may not be parsed yet at `mediaReady`), an `'Auto'`
 * option that hands control back to ABR, and `'level-switched'` to keep the
 * menu in sync when ABR itself changes the rendition, not just when the user
 * picks one. `DesktopUiPlugin`'s own quality menu (see Plugin: Desktop UI)
 * is built from the exact same three primitives.
 *
 * DOM construction (`createElement`) lives on the plugin, not the player —
 * `this.createElement(...)` inside `use()`, never `player.createElement(...)`
 * from the outside. `this.mount('root')` claims an auto-cleaned wrapper, and
 * `this.listen()` detaches its DOM listener on dispose, so nothing has to be
 * torn down by hand.
 */

import type { IVideoPlayer, QualityLevel, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: false,
	controls: true,
	defaultQuality: 'auto',
	playlist: [sintel],
};

function labelFor(level: QualityLevel): string {
	return level.height ? `${level.height}p` : level.label;
}

class QualitySelectPlugin extends Plugin<IVideoPlayer> {
	static override readonly id = 'nm-recipe-quality-select';
	static override readonly description = 'Manual quality selector for the Manual Quality Selection recipe.';

	private menu!: HTMLSelectElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		this.menu = this.createElement('select', 'nm-quality-select').appendTo(this.mount('root')).get();
		this.menu.style.cssText = 'position:absolute;right:1rem;bottom:1rem;padding:.3rem .5rem;border-radius:.4rem;';
		this.menu.setAttribute('aria-label', 'Quality');

		this.on('levels', ({ levels }) => this.renderOptions(levels));
		this.renderOptions(this.player.qualityLevels());

		this.on('level-switched', () => this.syncSelection());
		this.syncSelection();

		this.listen(this.menu, 'change', () => {
			const value = this.menu.value;
			this.player.quality(value === 'auto' ? 'auto' : Number(value));
		});
	}

	private renderOptions(levels: readonly QualityLevel[]): void {
		this.menu.replaceChildren();
		const autoOption = document.createElement('option');
		autoOption.value = 'auto';
		autoOption.textContent = 'Auto';
		this.menu.appendChild(autoOption);
		for (const level of levels) {
			const option = document.createElement('option');
			option.value = String(level.index);
			option.textContent = labelFor(level);
			this.menu.appendChild(option);
		}
	}

	private syncSelection(): void {
		const current = this.player.quality();
		this.menu.value = current === 'auto' ? 'auto' : String(current.index);
	}
}

function configure(player: IVideoPlayer): void {
	player.addPlugin(QualitySelectPlugin);
}

export default { config, configure };
