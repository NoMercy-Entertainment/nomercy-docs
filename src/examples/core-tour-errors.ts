// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: catch typed PlayerError values by class.
 *
 * AuthError extends NetworkError, which extends PlayerError, so order the
 * instanceof checks from narrowest to widest.
 */

import {
	AuthError,
	NetworkError,
	PlayerError,
	stateError,
} from '@nomercy-entertainment/nomercy-player-core';

function report(error: PlayerError): void {
	console.log(error.code, error.severity, error.scope);
	console.log(error.suggestion ?? error.message);
	if (error.isHttp(4)) {
		console.log('HTTP 4xx in context');
	}
}

function handle(e: unknown): void {
	if (e instanceof AuthError) {
		console.log('sign in or refresh');
		report(e);
	}
	else if (e instanceof NetworkError) {
		console.log('retry or show offline');
		report(e);
	}
	else if (e instanceof PlayerError) {
		report(e);
	}
	else {
		throw e;
	}
}

handle(stateError('core:state/queue-empty', 'Queue has no items'));

handle(new AuthError({
	code: 'core:auth/forbidden',
	scope: { kind: 'auth' },
	severity: 'error',
	context: { httpStatus: 403 },
	suggestion: 'Your account does not have access to this content.',
}));
