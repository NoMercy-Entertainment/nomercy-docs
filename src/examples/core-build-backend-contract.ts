// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build: meet the media-element backend contract.
 *
 * Extends MediaElementBackend for the shared HTMLMediaElement surface, wires
 * backend() on a composed player, sets a sync auth header provider, and
 * bridges play / pause onto a local playing flag. No source is loaded here;
 * play resolves without calling the element so the snippet stays headless-safe.
 */

import {
	type AuthHeaderProvider,
	type BaseEventMap,
	type BasePlayerConfig,
	type MinimalBackendEventPayload,
	type PlayerPhase,
	BACKEND_STATE,
	bridgeBackendPlayState,
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	MediaElementBackend,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

class ContractBackend extends MediaElementBackend<HTMLVideoElement, MinimalBackendEventPayload> {
	private _backendState = BACKEND_STATE.IDLE;

	constructor(element: HTMLVideoElement) {
		super(element, true, 'html5');
		this.attachDomBridges(
			(next) => {
				this._backendState = next;
			},
			() => this._backendState,
		);
	}

	state(): typeof this._backendState {
		return this._backendState;
	}

	// Demo only: no media URL is attached in this snippet.
	override play(): Promise<void> {
		this.emit('play', undefined);
		return Promise.resolve();
	}

	override pause(): void {
		super.pause();
		this.emit('pause', undefined);
	}
}

const _instances = new Map<string, ContractPlayer>();

class ContractPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;
	private _backend: ContractBackend | undefined;
	private _playing = false;

	get id(): string {
		return this.playerId;
	}

	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => Promise<void>;
	declare phase: () => PlayerPhase;
	declare play: () => Promise<void>;
	declare pause: () => Promise<void>;
	declare volume: { (): number; (level: number): Promise<void> };

	backend(): ContractBackend {
		if (!this._backend) {
			const element = document.createElement('video');
			this._backend = new ContractBackend(element);
			const auth: AuthHeaderProvider = (url) =>
				url.startsWith('https://api.example.com') ? 'Bearer demo' : undefined;
			this._backend.setAuthHeaderProvider(auth);
			bridgeBackendPlayState(this._backend, {
				isPlaying: () => this._playing,
				setPlaying: (playing) => {
					this._playing = playing;
				},
				onPlay: () => {},
				onPlaying: () => {},
				onPause: () => {},
				onReset: () => {},
			});
		}
		return this._backend;
	}

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'ContractPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'ContractPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

composeMixins(ContractPlayer.prototype, ...playerCoreMethods);

const mount = document.createElement('div');
mount.id = 'backend-contract';
mount.setAttribute('aria-label', 'Backend contract player');
document.body.appendChild(mount);

const player = new ContractPlayer('backend-contract');
player.setup({ logLevel: 'info' });
await player.ready();

await player.play();
await player.volume(50);
await player.pause();

const element = player.backend().mediaElement();
element.dispatchEvent(new Event('play'));
element.dispatchEvent(new Event('pause'));

console.log(player.backend().state()); // 'paused'
console.log(element instanceof HTMLVideoElement); // true
console.log(player.backend().loaderState()); // 'running'

await player.dispose();
