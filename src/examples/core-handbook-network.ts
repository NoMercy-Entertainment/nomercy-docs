// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: one authenticated fetch through the shared pipeline.
 *
 * Shows typed JSON decode, an explicit retry budget, a hard timeout, silent
 * scope, and narrowing with isAuthError before isNetworkError.
 * The host below stands for your own backend.
 */

import { authFetch, isAuthError, isNetworkError } from '@nomercy-entertainment/nomercy-player-core';

const controller = new AbortController();

try {
	const item = await authFetch<{ id: string; title: string }>({
		url: 'https://api.example.com/catalog/item',
		signal: controller.signal,
		responseType: 'json',
		timeoutMs: 8_000,
		retry: { attempts: 2, backoff: 'exponential', baseMs: 500, maxMs: 8_000 },
		scope: 'silent',
	});
	console.log(item.title);
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
