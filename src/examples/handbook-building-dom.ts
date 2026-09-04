// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * A plugin building UI with all six DOM helpers: mount() claims a namespaced
 * root on the player container, createElement/createButton/createSVG build
 * into it, and addClasses/removeClasses toggle visibility. The mount node is
 * removed on dispose, taking every child (and the button's click handler)
 * with it.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

class BadgePlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'badge';
	static override readonly version = '1.0.0';
	static override readonly description = 'Shows a LIVE badge overlay while the player is playing.';

	private root?: HTMLDivElement;

	override use(): void {
		// <div class="nmplayer-badge-overlay"> on the player container.
		// Removed automatically on dispose.
		this.root = this.mount('overlay');

		// Fluent element factory: id, classes, attribute, parent, element.
		const label = this.createElement('span', 'badge-label')
			.addClasses(['badge-label'])
			.setAttribute('data-state', 'live')
			.appendTo(this.root)
			.get();
		label.textContent = 'LIVE';

		// SVG-namespaced element; children are appended directly.
		const icon = this.createSVG('badge-icon', '0 0 24 24');
		this.root.appendChild(icon);

		// Accessible button: type="button", aria-label, title, click handler.
		const hideBtn = this.createButton('badge-hide', 'Hide badge', () => {
			if (this.root)
				this.removeClasses(this.root, ['badge-visible']);
		});
		this.root.appendChild(hideBtn);

		this.on('play', () => {
			if (this.root)
				this.addClasses(this.root, ['badge-visible']);
		});
		this.on('pause', () => {
			if (this.root)
				this.removeClasses(this.root, ['badge-visible']);
		});
	}
}

const player = tourPlayer('handbook-building-dom');
player.addPlugin(BadgePlugin);

player.setup({ logLevel: 'info' });
await player.ready();

await player.play(); // badge becomes visible
await player.pause(); // badge hides again

player.dispose(); // the mount node and everything inside it are removed
