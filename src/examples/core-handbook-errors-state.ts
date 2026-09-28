// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: plugin throw, report, recovery, state, and options.
 *
 * throw surfaces a PlayerError and aborts. report surfaces a warning and
 * returns. onError can disable the plugin. state snapshots runtime fields;
 * options reads a frozen copy or shallow-merges a partial update.
 */

import type { BaseEventMap, BasePlayerConfig, IPlayer, PluginState } from '@nomercy-entertainment/nomercy-player-core';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	Plugin,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

interface SpectrumOpts {
	bars?: number;
	smoothing?: number;
}

class SpectrumPlugin extends Plugin<IPlayer<BaseEventMap>, SpectrumOpts> {
	static override readonly id = 'spectrum';
	static override readonly version = '1.0.0';
	static override readonly description = 'Renders a spectrum; disables itself when the audio graph is unavailable.';

	static override readonly onError = {
		'plugin:spectrum/no-audio-graph': 'disable',
	} as const;

	private framesRendered = 0;

	override use(): void {
		const bars = this.opts.bars ?? 32;
		if (bars < 1) {
			this.throw({
				code: 'plugin:spectrum/bad-config',
				message: `bars must be at least 1, got ${bars}`,
				context: { bars },
				suggestion: 'Pass bars: 32 or omit the option.',
			});
		}

		this.on('play', () => {
			if (!this.enabled()) {
				return;
			}
			this.framesRendered += 1;
		});

		this.report({
			code: 'plugin:spectrum/no-audio-graph',
			message: 'no audio graph found, spectrum stays dark',
		});
	}

	protected override getRuntimeState(): Record<string, unknown> {
		return { framesRendered: this.framesRendered };
	}

	rememberPreset(name: string): void {
		this.storage.set('preset', name);
	}
}

const _instances = new Map<string, ErrorsStatePlayer>();

class ErrorsStatePlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: (new () => P) & { id: string },
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: (new () => P) & { id: string }) => P | undefined;

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'ErrorsStatePlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'ErrorsStatePlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(ErrorsStatePlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'handbook-errors-state';
mount.setAttribute('aria-label', 'Errors and state handbook player');
document.body.appendChild(mount);

const player = new ErrorsStatePlayer('handbook-errors-state');
player.addPlugin(SpectrumPlugin, { bars: 32 });

player.setup({ logLevel: 'info' });
await player.ready();

player.on('plugin:warning', ({ error }) => {
	console.log('plugin warning:', error.code);
});

const spectrum = player.getPlugin(SpectrumPlugin);
if (spectrum) {
	console.log(spectrum.enabled()); // false after onError disable
	spectrum.enable();

	const current = spectrum.options();
	spectrum.options({ smoothing: 0.8 });
	console.log(current.bars, spectrum.options().smoothing);

	const snapshot: PluginState<SpectrumOpts> = spectrum.state();
	console.log(snapshot.id, snapshot.enabled, snapshot.runtime);

	spectrum.rememberPreset('default');
}

await player.dispose();
