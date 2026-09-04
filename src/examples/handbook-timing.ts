// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * All five auto-cleaned timing primitives in one plugin: timeout() for a
 * delayed hide, interval() for a periodic save, frame() with its deltaMs
 * argument and stop function, abortable() for a signal-accepting API, and
 * lifecycle.observe() for a ResizeObserver. One dispose cancels everything.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

class PulsePlugin extends Plugin<IPlayer<BaseEventMap>> {
	static override readonly id = 'pulse';
	static override readonly version = '1.0.0';
	static override readonly description = 'Animates a pulse ring and saves progress on a timer.';

	private stopSpin?: () => void;
	private angle = 0;

	override use(): void {
		const root = this.mount('ring');

		// One-shot: cancelled on dispose if it has not fired yet.
		this.on('play', () => {
			this.timeout(() => {
				root.dataset.state = 'settled';
			}, 3_000);
		});

		// Repeating: cancelled on dispose; a throwing tick is caught and logged.
		this.interval(() => {
			this.storage.setJSON('pulse-state', { angle: this.angle });
		}, 30_000);

		// RAF loop: deltaMs keeps speed refresh-rate independent. The returned
		// stop function ends this loop alone; dispose ends it regardless.
		this.stopSpin = this.frame((deltaMs) => {
			this.angle = (this.angle + deltaMs * 0.09) % 360;
			root.style.setProperty('--pulse-angle', `${this.angle}deg`);
		});
		this.on('pause', () => this.stopSpin?.());

		// Aborted automatically on dispose. For signal-accepting APIs outside
		// the plugin's own fetch(), which wires this internally.
		const controller = this.abortable();
		controller.signal.addEventListener('abort', () => {
			root.dataset.state = 'stopped';
		});

		// Observer: registered for disconnect on dispose, returned unchanged
		// so the observe() call chains straight on.
		this.lifecycle.observe(new ResizeObserver((entries) => {
			const width = entries[0]?.contentRect.width ?? 0;
			root.style.setProperty('--pulse-size', `${Math.min(width, 240)}px`);
		})).observe(this.player.container);
	}
}

const player = tourPlayer('handbook-timing');
player.addPlugin(PulsePlugin);

player.setup({ logLevel: 'info' });
await player.ready();

await player.play();
await player.pause(); // stops the frame loop early; the rest keeps running

player.dispose(); // timer, interval, RAF, abort signal, observer: all released
