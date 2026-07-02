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
 */

import type { IVideoPlayer, QualityLevel, VideoPlayerConfig } from '@nomercy-entertainment/nomercy-video-player';
import { FILMS_BASE, sintel } from './media';

const config: VideoPlayerConfig = {
	baseUrl: FILMS_BASE,
	baseImageUrl: 'https://image.tmdb.org/t/p',
	muted: true,
	autoPlay: true,
	controls: true,
	defaultQuality: 'auto',
	playlist: [sintel],
};

function labelFor(level: QualityLevel): string {
	return level.height ? `${level.height}p` : level.label;
}

function onReady(player: IVideoPlayer, container: HTMLElement): () => void {
	if (!container.style.position)
		container.style.position = 'relative';

	const menu = player.createElement('select', 'nm-quality-select').appendTo(container).get();
	menu.style.cssText = 'position:absolute;right:1rem;bottom:1rem;padding:.3rem .5rem;border-radius:.4rem;';
	menu.setAttribute('aria-label', 'Quality');

	const renderOptions = (levels: readonly QualityLevel[]): void => {
		menu.replaceChildren();
		const autoOption = document.createElement('option');
		autoOption.value = 'auto';
		autoOption.textContent = 'Auto';
		menu.appendChild(autoOption);
		for (const level of levels) {
			const option = document.createElement('option');
			option.value = String(level.index);
			option.textContent = labelFor(level);
			menu.appendChild(option);
		}
	};

	const onLevels = ({ levels }: { levels: QualityLevel[] }): void => renderOptions(levels);
	player.on('levels', onLevels);
	renderOptions(player.qualityLevels());

	const syncSelection = (): void => {
		const current = player.quality();
		menu.value = current === 'auto' ? 'auto' : String(current.index);
	};
	player.on('level-switched', syncSelection);
	syncSelection();

	const onChange = (): void => {
		const value = menu.value;
		player.quality(value === 'auto' ? 'auto' : Number(value));
	};
	menu.addEventListener('change', onChange);

	return () => {
		player.off('levels', onLevels);
		player.off('level-switched', syncSelection);
		menu.removeEventListener('change', onChange);
		menu.remove();
	};
}

export default { config, onReady };
