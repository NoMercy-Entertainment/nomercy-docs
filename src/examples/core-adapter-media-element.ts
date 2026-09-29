// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: MediaElementBackend.
 *
 * The abstract base under every element-backed backend. A subclass passes
 * its element to `super`, wires the DOM bridge, and adds the methods its
 * own backend interface needs.
 */

import type {
	BackendState,
	MinimalBackendEventPayload,
} from '@nomercy-entertainment/nomercy-player-core/adapters/media-element';
import {
	BACKEND_STATE,
	MediaElementBackend,
} from '@nomercy-entertainment/nomercy-player-core/adapters/media-element';

class ClipBackend extends MediaElementBackend<HTMLAudioElement, MinimalBackendEventPayload> {
	private currentState: BackendState = BACKEND_STATE.IDLE;

	constructor(element: HTMLAudioElement) {
		super(element, false, 'audio-element');

		this.attachDomBridges(
			(state) => {
				this.currentState = state;
			},
			() => this.currentState,
		);
	}

	state(): BackendState {
		return this.currentState;
	}

	load(url: string): void {
		this.element.src = url;
		this.element.load();
	}

	dispose(): void {
		if (this.disposed)
			return;

		this.disposed = true;
		this.detachDomBridges();
		this.off('all');
	}
}

const backend = new ClipBackend(document.createElement('audio'));

backend.on('playing', () => {
	console.log(backend.state()); // 'playing'
});

backend.volume(0.5);
console.log(backend.volume()); // 0.25: the getter returns the element value after the curve

backend.dispose();
