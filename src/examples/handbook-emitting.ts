// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Plugin events, both flavors. `BoostPlugin` fires plain `emit()` events for
 * outcomes and wraps its public mutation in `dispatchBefore()` so peers can
 * clamp or cancel it. `BoostGuardPlugin` listens with the class-typed
 * `on(BoostPlugin, ...)` form and mutates the payload before the action runs.
 */

import type { BaseEventMap, BeforeEvent, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface BoostEvents {
	beforeBoost: BeforeEvent<{ gain: number }>;
	boosted: { gain: number };
	boostPrevented: { reason: string };
}

class BoostPlugin extends Plugin<IPlayer<BaseEventMap>, { defaultGain?: number }, BoostEvents> {
	static override readonly id = 'boost';
	static override readonly version = '1.0.0';
	static override readonly description = 'Applies a gain boost, cancellable by peers via beforeBoost.';

	async boost(gain: number): Promise<void> {
		// Cancellable, mutable, async-aware. Listeners see plugin:boost:beforeBoost.
		const result = await this.dispatchBefore('beforeBoost', { gain });
		if (result.prevented) {
			this.emit('boostPrevented', { reason: result.reason ?? 'listener-prevented' });
			return;
		}
		// Use result.data, not the original: a listener may have reshaped it.
		this.logger.info(`applying gain ${result.data.gain}`);
		this.emit('boosted', { gain: result.data.gain }); // fires as plugin:boost:boosted
	}
}

class BoostGuardPlugin extends Plugin {
	static override readonly id = 'boost-guard';
	static override readonly version = '1.0.0';
	static override readonly description = 'Clamps boost gain to a safe ceiling.';
	static override readonly requires = [BoostPlugin];

	override use(): void {
		// Class form: event name and payload are typed from BoostPlugin's E map.
		this.on(BoostPlugin, 'beforeBoost', (beforeEvent) => {
			if (beforeEvent.data.gain > 6) {
				beforeEvent.data = { gain: 6 }; // mutate: clamp instead of cancel
			}
		});
	}
}

const player = tourPlayer('emitting-demo');
player.addPlugin(BoostPlugin);
player.addPlugin(BoostGuardPlugin);

player.setup({ logLevel: 'info' });
await player.ready();

// Consumer apps subscribe with the namespaced string form.
player.on('plugin:boost:boosted', (data: BoostEvents['boosted']) => {
	console.log('boost landed at', data.gain);
});

const boost = player.getPlugin(BoostPlugin);
await boost?.boost(12); // guard clamps 12 to 6; boosted fires with { gain: 6 }

await player.dispose();
