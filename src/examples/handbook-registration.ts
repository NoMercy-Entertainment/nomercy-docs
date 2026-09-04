// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Registration mechanics. Plugins added before setup() queue and register
 * during the pipeline; plugins added after register inline. `static requires`
 * validates dependencies at addPlugin() time, `priority` orders
 * enabledPlugins(), and `derive()` / `export()` bake current options into a
 * reusable preset class.
 */

import type { BaseEventMap, IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

class AudioGraphLitePlugin extends Plugin {
	static override readonly id = 'audio-graph-lite';
	static override readonly version = '2.1.0';
	static override readonly description = 'Owns the demo audio node chain.';
	static override readonly priority = 10; // sorts before default-priority peers in enabledPlugins()
}

class EqualizerLitePlugin extends Plugin<IPlayer<BaseEventMap>, { preset?: string }> {
	static override readonly id = 'equalizer-lite';
	static override readonly version = '1.0.0';
	static override readonly description = 'Ten-band equalizer on top of the audio graph.';
	static override readonly minCoreVersion = '2.0.0'; // core:plugin/incompatible-core-version if the kit is older

	// Class-ref form is required; the object form pins a version or marks
	// a dependency optional. Missing required dep: core:plugin/missing-dep.
	// Version below minVersion: core:plugin/version-mismatch.
	static override readonly requires = [
		{ plugin: AudioGraphLitePlugin, minVersion: '2.0.0' },
	];

	override async use(): Promise<void> {
		// Async setup is awaited, bounded by setup({ pluginInitTimeoutMs }).
		await Promise.resolve();
		this.logger.info(`preset: ${this.opts.preset ?? 'flat'}`);
	}
}

const player = tourPlayer('registration-demo');

// Pre-setup: both calls queue; the pluginsRegistering stage drains the queue.
// Ordering here still matters for requires: the dependency must be added first.
player.addPlugin(AudioGraphLitePlugin);
player.addPlugin(EqualizerLitePlugin, { preset: 'rock' });

player.setup({
	logLevel: 'info',
	pluginInitTimeoutMs: 10_000, // per-plugin cap on awaiting use()
});
await player.ready(); // resolves after every queued use() settled

// Class lookup: fully typed instance (or undefined when not registered).
const equalizer = player.getPlugin(EqualizerLitePlugin);
console.log(equalizer?.state().version); // "1.0.0"

// export() is the serializable snapshot derive() and clone() build on.
console.log(equalizer?.export()); // { preset: 'rock' }

// Post-setup: registers inline, fire-and-forget. Listen for the outcome,
// or await ready() again, which drains in-flight registrations.
class OverlayPlugin extends Plugin {
	static override readonly id = 'overlay';
	static override readonly version = '1.0.0';
	static override readonly description = 'Late-added overlay.';
}

player.on('plugin:overlay:installed', ({ version }) => {
	console.log('overlay ready at', version);
});
player.addPlugin(OverlayPlugin);
await player.ready();

// derive() bakes options into a reusable preset class; registration opts
// still win over the baked-in defaults on collision.
const RockEqualizer = EqualizerLitePlugin.derive({ preset: 'rock' }, 'equalizer-rock');
console.log(RockEqualizer.id); // "equalizer-rock"

await player.dispose();
