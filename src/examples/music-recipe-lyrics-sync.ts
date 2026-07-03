// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: Synced Lyrics UI. Renders every cue from `LyricsPlugin.all()` as a
 * scrollable list up front, instead of Lyrics' single-line tour example, and
 * highlights the active row on `plugin:lyrics:lineEnter` / `lineExit` by
 * object identity — `lineEnter`'s payload is the exact `cue.payload`
 * reference `all()` already handed out, so no text-matching or index
 * bookkeeping is needed to find the right row.
 */

import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { firstSong, MUSIC_BASE } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: [firstSong],
};

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
}

function buildPanel(container: HTMLElement): HTMLDivElement {
	if (!container.style.position)
		container.style.position = 'relative';

	const panel = document.createElement('div');
	panel.id = 'nm-recipe-lyrics-panel';
	panel.style.cssText
		= 'position:absolute;inset:0;overflow:auto;display:flex;flex-direction:column;'
			+ 'gap:.35rem;padding:1rem;color:#fff;font-family:system-ui,sans-serif;'
			+ 'background:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55));';
	container.appendChild(panel);
	return panel;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const panel = buildPanel(container);
	const rows = new Map<{ text: string }, HTMLDivElement>();

	const renderLines = (): void => {
		const lyrics = player.getPlugin(LyricsPlugin);
		panel.replaceChildren();
		rows.clear();

		const cues = lyrics?.all() ?? [];
		if (cues.length === 0) {
			panel.textContent = 'No synced lines in this file.';
			return;
		}

		for (const cue of cues) {
			const row = document.createElement('div');
			row.textContent = cue.payload.text;
			row.style.cssText = 'font-size:.9rem;opacity:.55;transition:opacity .15s,transform .15s;';
			panel.appendChild(row);
			rows.set(cue.payload, row);
		}
	};

	const onLineEnter = (payload: { text: string }): void => {
		const row = rows.get(payload);
		if (!row)
			return;
		row.style.opacity = '1';
		row.style.fontWeight = '700';
		row.style.transform = 'scale(1.03)';
		row.scrollIntoView({ block: 'center', behavior: 'smooth' });
	};
	const onLineExit = (payload: { text: string }): void => {
		const row = rows.get(payload);
		if (!row)
			return;
		row.style.opacity = '.55';
		row.style.fontWeight = '400';
		row.style.transform = 'none';
	};

	player.on('plugin:lyrics:loaded', renderLines);
	player.on('plugin:lyrics:lineEnter', onLineEnter);
	player.on('plugin:lyrics:lineExit', onLineExit);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('plugin:lyrics:loaded', renderLines);
		player.off('plugin:lyrics:lineEnter', onLineEnter);
		player.off('plugin:lyrics:lineExit', onLineExit);
		panel.remove();
	};
}

export default { config, configure, onReady, player: 'music' as const };
