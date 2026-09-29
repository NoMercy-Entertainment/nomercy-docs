// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: supply your own URL resolver.
 *
 * Sign media URLs with a token query parameter.
 * Leave other categories on the built-in resolve.
 * The host below stands for your own backend.
 */

import type { IUrlResolver } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

const MEDIA_TOKEN = 'sig-from-your-backend';

const mediaSigner: IUrlResolver = async (url, ctx) => {
	if (ctx.category !== 'media') {
		return ctx.defaultResolve(url);
	}
	const resolved = await ctx.defaultResolve(url);
	const signed = new URL(resolved.href);
	signed.searchParams.set('token', MEDIA_TOKEN);
	return ctx.defaultResolve(signed.toString());
};

const player = tourPlayer('url-resolver-demo');

player.setup({
	logLevel: 'info',
	baseUrl: 'https://api.example.com/media',
	urlResolver: mediaSigner,
});
await player.ready();

const media = await player.resolveUrl('/films/sintel/playlist.m3u8', 'media');
console.log(media.searchParams.get('token')); // 'sig-from-your-backend'

const poster = await player.resolveUrl('https://api.example.com/art/poster.jpg', 'poster');
console.log(poster.searchParams.get('token')); // null

player.urlResolver(undefined);
console.log(player.urlResolver()); // undefined

await player.dispose();
