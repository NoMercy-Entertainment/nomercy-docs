// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: call `authFetch` from outside a plugin.
 *
 * Pass your own `AuthConfig` and an `AbortSignal`.
 * `Authorization: Bearer …` is set only when `auth.bearerToken` resolves to a
 * non-empty value. The host below stands for your own backend.
 */

import type { AuthConfig } from '@nomercy-entertainment/nomercy-player-core';
import { authFetch, isAuthError, isNetworkError } from '@nomercy-entertainment/nomercy-player-core';

let accessToken = 'token-from-your-store';

const auth: AuthConfig = {
	bearerToken: () => accessToken,
	refreshOnUnauthenticated: async () => {
		// Exchange a refresh credential with your own backend, then store the result.
		accessToken = 'rotated-token-from-your-store';
	},
};

const controller = new AbortController();

try {
	const profile = await authFetch<{ id: string; name: string }>({
		url: 'https://api.example.com/profile', // your own backend
		auth,
		signal: controller.signal,
		responseType: 'json',
		timeoutMs: 8000,
	});
	console.log(profile.name);
}
catch (err) {
	if (isAuthError(err)) {
		console.log('auth failed:', err.code);
	}
	else if (isNetworkError(err)) {
		console.log('network failed:', err.code);
	}
	else {
		throw err;
	}
}

controller.abort();
