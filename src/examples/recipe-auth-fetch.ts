// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: use authFetch directly.
 *
 * `authFetch` is the same auth-aware pipeline the kit uses internally for
 * setup-time playlist loads and that `Plugin.fetch()` wraps for plugin code —
 * exported standalone for consumer code that needs it without a plugin around
 * it (a data layer, a prefetch routine, a service worker message handler).
 * `auth.transformUrl` runs first, then `Authorization: Bearer <token>` is set
 * from `bearerToken`, then `auth.headers`, with 401 triggering one
 * `refreshOnUnauthenticated()` + retry and 403 propagating immediately.
 */

import type { AuthConfig } from '@nomercy-entertainment/nomercy-player-core';
import { authFetch, isAuthError, isNetworkError } from '@nomercy-entertainment/nomercy-player-core';

let cachedToken = 'stale-token';

const auth: AuthConfig = {
	bearerToken: () => cachedToken,
	refreshOnUnauthenticated: async () => {
		cachedToken = 'refreshed-token'; // real code exchanges a refresh token here
	},
};

const controller = new AbortController();

try {
	const profile = await authFetch<{ id: string; name: string }>({
		url: 'https://api.example.com/profile',
		auth,
		signal: controller.signal,
		responseType: 'json',
		timeoutMs: 8000,
	});
	console.log(profile.name);
}
catch (err) {
	if (isAuthError(err)) {
		console.log('auth failed even after refresh:', err.code); // e.g. 'core:auth/forbidden'
	}
	else if (isNetworkError(err)) {
		console.log('network exhausted its retry budget:', err.code);
	}
	else {
		throw err;
	}
}

// Cancel any in-flight authFetch call the same way you'd cancel a raw fetch.
controller.abort();
