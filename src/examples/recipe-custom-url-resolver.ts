// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: provide a custom URL resolver.
 *
 * The default resolver applies `auth.transformUrl` and parses the result with
 * the kit's structured URL parser — fine for a single CDN with one signing
 * scheme. A resolver that needs to branch per asset category (sign media
 * URLs, leave poster images alone, route subtitles to a different host)
 * replaces the whole function via `setup({ urlResolver })`, and can still
 * delegate to the built-in behavior through `ctx.defaultResolve` for the
 * categories it doesn't care about.
 */

import type { IUrlResolver } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

const CDN_TOKEN = 'sig-abc123';

const cdnResolver: IUrlResolver = async (url, ctx) => {
	if (ctx.category !== 'media') {
		return ctx.defaultResolve(url); // poster, subtitle, sprite, ... — untouched
	}
	const resolved = await ctx.defaultResolve(url);
	const signed = new URL(resolved.href);
	signed.searchParams.set('token', CDN_TOKEN);
	return ctx.defaultResolve(signed.toString());
};

const player = tourPlayer('url-resolver-demo');

player.setup({
	logLevel: 'info',
	baseUrl: 'https://cdn.example.com',
	urlResolver: cdnResolver,
});
await player.ready();

const media = await player.resolveUrl('/Sintel.(2010)/Sintel.(2010).NoMercy.m3u8', 'media');
console.log(media.searchParams.get('token')); // 'sig-abc123' — signed by the custom resolver

const poster = await player.resolveUrl('/w780/poster.jpg', 'poster');
console.log(poster.searchParams.get('token')); // null — passed straight through to defaultResolve

// Swap it again at runtime the same way — urlResolver() also reads the active one back.
player.urlResolver(undefined); // revert to the built-in default
console.log(player.urlResolver()); // undefined — no custom resolver active

await player.dispose();
