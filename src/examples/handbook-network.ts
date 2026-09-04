// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * The plugin network helpers. `fetch()` runs the kit's auth pipeline (URL
 * transform, bearer token, 401-refresh-once, retry) and aborts in-flight
 * requests on dispose. `websocket()` returns an `IRealtimeChannel` that the
 * lifecycle registry closes on dispose. This plugin syncs a chapter list over
 * HTTP and streams live position markers over a realtime channel.
 */

import type { IRealtimeChannel } from '@nomercy-entertainment/nomercy-player-core';
import { isAuthError, isNetworkError, Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { tourPlayer } from './tour-player';

interface Chapter {
	title: string;
	startSeconds: number;
}

class ChapterSyncPlugin extends Plugin {
	static override readonly id = 'chapter-sync';
	static override readonly version = '1.0.0';
	static override readonly description = 'Loads chapters over authenticated HTTP and streams markers over a realtime channel.';

	private chapters: Chapter[] = [];
	private channel?: IRealtimeChannel;

	override async use(): Promise<void> {
		// JSON body, typed by the generic. AuthConfig from setup() applies.
		this.chapters = await this.fetch<Chapter[]>('/api/chapters.json', {
			responseType: 'json',
		});

		// Text body plus a parser callback: one chapter title per line.
		const titles = await this.fetch<string[]>('/api/chapters.txt', {
			parser: raw => raw.split('\n').filter(Boolean),
			scope: 'silent', // no fetch:* telemetry for this call
		});
		this.logger.debug(`parsed ${titles.length} titles`);

		// Auto-closed on dispose. The factory comes from setup({ websocketFactory })
		// when configured; the native WebSocket adapter is the fallback.
		this.channel = this.websocket('wss://example.test/markers');
		this.channel.on('message', (data) => {
			this.logger.debug('marker frame', data);
		});
		this.channel.on('open', () => {
			this.channel?.send(JSON.stringify({ subscribe: 'markers' }));
		});
	}

	async refresh(): Promise<Chapter[]> {
		try {
			this.chapters = await this.fetch<Chapter[]>('/api/chapters.json', {
				responseType: 'json',
			});
		}
		catch (err) {
			if (isAuthError(err)) {
				// 403 lands here: never refreshed, never retried.
				this.report({ code: 'plugin:chapter-sync/forbidden', message: 'chapter feed rejected the token', cause: err });
			}
			else if (isNetworkError(err)) {
				// 5xx / timeout / network already retried per RetryConfig before this.
				this.report({ code: 'plugin:chapter-sync/unreachable', cause: err });
			}
		}
		return this.chapters;
	}
}

const player = tourPlayer('network-demo');
player.addPlugin(ChapterSyncPlugin);

player.setup({
	logLevel: 'info',
	auth: {
		bearerToken: () => 'demo-token',
		transformUrl: url => `https://media.example.test${url}`,
	},
});
await player.ready();

player.on('plugin:chapter-sync:fetch:retry', (info) => {
	console.log('retrying chapter fetch', info);
});

await player.dispose(); // aborts any in-flight fetch, closes the channel
