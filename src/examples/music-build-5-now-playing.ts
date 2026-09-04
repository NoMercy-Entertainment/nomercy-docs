// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 5: now-playing (cover, title, artist) plus a
 * synced lyric line, completing the panel this tutorial has been building
 * since Step 4 — the native `controls: true` bar handles transport, this
 * handles everything it can't.
 *
 * `LyricsPlugin` registers through `addPlugin()` in `configure()`, exactly
 * like a plugin you wrote yourself (the `plugins` array in `setup()` config
 * is the declarative equivalent). Artwork reads the canonical `image`
 * field first, falling back to the deprecated `cover`, matching how
 * `MusicPreloadStrategy`/`CastSenderPlugin` resolve it inside the package
 * itself (see the [Quickstart](/nomercy-music-player/quickstart)).
 *
 * DOM construction (`createElement`) lives on the plugin, not the player —
 * `this.createElement(...)` inside `use()`, never `player.createElement(...)`
 * from the outside. `this.mount('root')` claims an auto-cleaned wrapper so
 * nothing has to be torn down by hand, and `this.on(LyricsPlugin, 'lineEnter', ...)`
 * subscribes to the sibling plugin's namespaced event through the typed
 * class-form listener instead of a raw `'plugin:lyrics:lineEnter'` string.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { Plugin } from '@nomercy-entertainment/nomercy-player-core';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	controls: true,
	playlist: songs,
};

class NowPlayingPanelPlugin extends Plugin<IMusicPlayer> {
	static override readonly id = 'nm-build-now-playing';
	static override readonly description = 'Now-playing panel + synced lyric line for the Build a Player tutorial.';
	static override readonly requires = [{ plugin: LyricsPlugin, optional: true }];

	private cover!: HTMLImageElement;
	private title!: HTMLSpanElement;
	private artist!: HTMLSpanElement;
	private lyricLine!: HTMLSpanElement;

	override use(): void {
		const container = this.player.container;
		if (!container.style.position)
			container.style.position = 'relative';

		const nowPlaying = this.createElement('div', 'nm-build-now-playing').appendTo(container).get();
		nowPlaying.style.cssText
			= 'position:absolute;left:.75rem;top:.75rem;right:3.5rem;display:flex;align-items:center;'
				+ 'gap:.75rem;color:#fff;font-family:system-ui,sans-serif;';

		this.cover = this.createElement('img', 'nm-build-cover').appendTo(nowPlaying).get();
		this.cover.style.cssText = 'width:2.75rem;height:2.75rem;border-radius:.4rem;object-fit:cover;flex:none;';
		this.cover.alt = '';

		const meta = this.createElement('div', 'nm-build-meta').appendTo(nowPlaying).get();
		meta.style.cssText = 'display:flex;flex-direction:column;gap:.15rem;min-width:0;';

		this.title = this.createElement('span', 'nm-build-title').appendTo(meta).get();
		this.title.style.cssText = 'font-size:.9rem;font-weight:600;';

		this.artist = this.createElement('span', 'nm-build-artist').appendTo(meta).get();
		this.artist.style.cssText = 'font-size:.75rem;opacity:.75;';

		this.lyricLine = this.createElement('span', 'nm-build-lyric-line').appendTo(meta).get();
		this.lyricLine.style.cssText = 'font-size:.75rem;opacity:.9;font-style:italic;';

		this.on('item', ({ item }) => this.renderNowPlaying(item));
		this.on(LyricsPlugin, 'lineEnter', ({ text }) => {
			this.lyricLine.textContent = text;
		});
		this.renderNowPlaying();
	}

	private renderNowPlaying(item?: MusicPlaylistItem): void {
		const current = item ?? this.player.item();
		const art = current?.image ?? current?.cover ?? '';
		this.cover.src = art;
		this.cover.style.visibility = art ? 'visible' : 'hidden';
		this.title.textContent = current?.name ?? '';
		this.artist.textContent = current?.artist ?? '';
		this.lyricLine.textContent = '';
	}
}

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
	player.addPlugin(NowPlayingPanelPlugin);
}

function onReady(player: IMusicPlayer): void {
	void player.item(0, { autoplay: false });
}

export default { config, configure, onReady, player: 'music' as const };
