// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: IFetch and defaultFetch.
 *
 * `IFetch` has the shape of the global `fetch` with a string URL.
 * `defaultFetch` forwards to the global. A helper typed against `IFetch`
 * takes the real transport in the app and a fake one in a test.
 */

import type { IFetch } from '@nomercy-entertainment/nomercy-player-core/adapters/fetch';
import { defaultFetch } from '@nomercy-entertainment/nomercy-player-core/adapters/fetch';

async function loadJson(transport: IFetch, url: string): Promise<unknown> {
	const response = await transport(url, {
		headers: {
			accept: 'application/json',
		},
	});

	return response.json();
}

export async function loadCatalog(): Promise<unknown> {
	return loadJson(defaultFetch, 'https://api.example.com/catalog.json');
}

// A test hands the same helper a transport that never touches the network.
const calls: string[] = [];

const fakeFetch: IFetch = async (url) => {
	calls.push(url);

	return new Response('{"items":[]}', {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};

console.log(await loadJson(fakeFetch, 'https://api.example.com/catalog.json'));
console.log(calls); // ['https://api.example.com/catalog.json']
