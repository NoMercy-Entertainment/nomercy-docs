// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Structured errors and plugin state. `throw()` surfaces a PlayerError and
 * aborts the flow; `report()` surfaces a warning and continues. `static
 * onError` maps error codes to recovery actions. `state()` snapshots id,
 * version, enabled flag, opts, and the plugin-defined runtime block, and
 * `options()` reads or shallow-merges runtime options.
 */

import type { BaseEventMap, IPlayer, PluginState } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface SpectrumOpts {
	bars?: number;
	smoothing?: number;
}

class SpectrumPlugin extends Plugin<IPlayer<BaseEventMap>, SpectrumOpts> {
	static override readonly id = 'spectrum';
	static override readonly version = '1.0.0';
	static override readonly description = 'Renders a spectrum; disables itself when the audio graph is unavailable.';

	// When this code is thrown or reported, the kit runs the mapped action.
	static override readonly onError = {
		'plugin:spectrum/no-audio-graph': 'disable',
	} as const;

	private framesRendered = 0;

	override use(): void {
		const bars = this.opts.bars ?? 32;
		if (bars < 1) {
			// error severity: emits 'error' + 'plugin:error', then throws.
			this.throw({
				code: 'plugin:spectrum/bad-config',
				message: `bars must be at least 1, got ${bars}`,
				context: { bars },
				suggestion: 'Pass bars: 32 or omit the option.',
			});
		}

		this.on('play', () => {
			if (!this.enabled())
				return; // listeners stay subscribed while disabled; short-circuit instead
			this.framesRendered += 1;
		});

		// warning severity, flow continues: emits 'warning' + 'plugin:warning'.
		this.report({
			code: 'plugin:spectrum/no-audio-graph',
			message: 'no audio graph found, spectrum stays dark',
		});
		// onError mapped that code to 'disable', so enabled() is false now.
	}

	protected override getRuntimeState(): Record<string, unknown> {
		return { framesRendered: this.framesRendered };
	}

	rememberPreset(name: string): void {
		this.storage.set('preset', name); // stored as nmplayer-spectrum-preset
	}
}

const player = tourPlayer('errors-state-demo');
player.addPlugin(SpectrumPlugin, { bars: 32 });

player.setup({ logLevel: 'info' });
await player.ready();

player.on('plugin:warning', ({ error }) => {
	console.log('plugin warning:', error.code);
});

const spectrum = player.getPlugin(SpectrumPlugin);
if (spectrum) {
	console.log(spectrum.enabled()); // false: the report above triggered 'disable'
	spectrum.enable(); // emits plugin:enabled and plugin:spectrum:enabled

	// Read: frozen shallow copy. Write: shallow merge + opts:changed events.
	const current = spectrum.options();
	spectrum.options({ smoothing: 0.8 });
	console.log(current.bars, spectrum.options().smoothing);

	const snapshot: PluginState<SpectrumOpts> = spectrum.state();
	console.log(snapshot.id, snapshot.enabled, snapshot.runtime);
}

await player.dispose();
