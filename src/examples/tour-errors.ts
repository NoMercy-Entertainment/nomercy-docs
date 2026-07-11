// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Every kit and plugin error is a typed `PlayerError`, never a raw thrown
 * string. Subclasses (`AuthError`, `DrmError`, `MediaFormatError`,
 * `NetworkError`, `StateError`, `StreamError`, ...) narrow the `code` /
 * `severity` / `scope` contract so a `catch` block can branch on `instanceof`
 * instead of parsing message text. `DEFAULT_RETRY_POLICY` is a reference table of
 * per-code retry shapes; pass an entry as the per-call `retry` option on
 * `Plugin.fetch` (the fetch pipeline never consults it automatically, defaulting
 * to `{ attempts: 0 }`).
 */

import type { PlayerError } from '@nomercy-entertainment/nomercy-player-core';
import { AuthError, DEFAULT_RETRY_POLICY, NetworkError, PlayerError as PlayerErrorClass, StateError, stateError } from '@nomercy-entertainment/nomercy-player-core';

const notReady = stateError('core:player/not-ready', 'Player has not been setup() yet.');
console.log(notReady instanceof PlayerErrorClass); // true
console.log(notReady instanceof StateError); // true
console.log(notReady.code); // 'core:player/not-ready'
console.log(notReady.severity); // 'error'

// AuthError extends NetworkError, so a generic network handler still catches it.
function handle(error: PlayerError): void {
	if (error instanceof AuthError) {
		console.log('auth problem:', error.code);
	}
	else if (error instanceof NetworkError) {
		console.log('network problem:', error.code);
	}
	else {
		console.log('other error:', error.code, error.severity);
	}
}

handle(notReady); // 'other error: core:player/not-ready error'

// Retry policy lookup — forbidden never retries, a timeout retries with backoff.
console.log(DEFAULT_RETRY_POLICY['core:auth/forbidden']); // { attempts: 0 }
console.log(DEFAULT_RETRY_POLICY['core:network/timeout']); // { attempts: 5, backoff: 'exponential', ... }
