// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * A plugin shipping its CSS: appendInlineStyles for rules that must apply
 * before the first paint, appendStyles for a stylesheet URL that Vite emits
 * and hashes. Both dedupe on the styleId, so a second call with the same id
 * is a no-op, and neither is removed on dispose.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

class ThemedToastPlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'themed-toast';
	static override readonly version = '1.0.0';
	static override readonly description = 'Shows a styled toast on play, with its CSS shipped by the plugin.';

	override use(): void {
		// Inline: applies before the next paint, so the toast never renders
		// an unstyled frame. The styleId dedupes across player instances.
		this.appendInlineStyles(`
			.nmplayer-themed-toast-toast {
				position: absolute;
				inset-block-end: 1rem;
				inset-inline-start: 1rem;
				padding: 0.5rem 1rem;
				border-radius: 0.5rem;
			}
		`, 'plugin-themed-toast-inline');

		// Calling again with the same styleId changes nothing: first call wins.
		this.appendInlineStyles('.never-applied { color: red; }', 'plugin-themed-toast-inline');

		// URL form: the literal new URL(...) expression lets Vite emit and
		// hash the sibling CSS file. Published dist builds rewrite this call
		// into appendInlineStyles with the CSS embedded.
		this.appendStyles(new URL('./styles.css', import.meta.url).href, 'plugin-themed-toast-styles');

		const toast = this.mount('toast');
		this.on('play', () => {
			toast.textContent = 'Now playing';
		});
	}
}

const player = tourPlayer('handbook-styling');
player.addPlugin(ThemedToastPlugin);

player.setup({ logLevel: 'info' });
await player.ready();

await player.play();

player.dispose();
// The mount node is gone, but both style elements stay in document.head:
// a plugin registered again on a new player finds them already present.
console.log(document.getElementById('plugin-themed-toast-inline') !== null); // true
