// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Build a Player, step 5 of 5: a now-playing panel (cover, title, artist)
 * plus a synced lyric line, completing the overlay this tutorial has been
 * building since Step 1.
 *
 * `LyricsPlugin` registers in `configure()` — before `setup()`, the only
 * point plugin registration is valid for any plugin in this trio.
 */

import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { PlayState, VolumeState } from '@nomercy-entertainment/nomercy-music-player';
import { LyricsPlugin } from '@nomercy-entertainment/nomercy-music-player/plugins/lyrics';
import { MUSIC_BASE, songs } from './media';

const config: MusicPlayerConfig = {
	baseUrl: MUSIC_BASE,
	playlist: songs,
};

function configure(player: IMusicPlayer): void {
	player.addPlugin(LyricsPlugin);
}

function buildBar(player: IMusicPlayer, container: HTMLElement): HTMLDivElement {
	if (!container.style.position)
		container.style.position = 'relative';

	const bar = player.createElement('div', 'nm-build-bar').appendTo(container).get();
	bar.style.cssText
		= 'position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;'
			+ 'gap:.75rem;padding:.75rem 1rem;background:linear-gradient(transparent,rgba(0,0,0,.85));';
	return bar;
}

function onReady(player: IMusicPlayer, container: HTMLElement): () => void {
	const bar = buildBar(player, container);

	// ── Step 1: play/pause ──────────────────────────────────────────────
	const playPause = player.createButton('nm-build-play-pause', 'Play', () => {
		void player.togglePlayback();
	});
	playPause.style.cssText
		= 'width:2.25rem;height:2.25rem;border:0;border-radius:9999px;background:#fff;'
			+ 'color:#000;font-size:.9rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(playPause);

	const syncPlayPause = (): void => {
		const playing = player.playState() === PlayState.PLAYING;
		playPause.textContent = playing ? '⏸' : '▶';
		playPause.setAttribute('aria-label', playing ? 'Pause' : 'Play');
	};
	player.on('play', syncPlayPause);
	player.on('pause', syncPlayPause);
	player.on('playing', syncPlayPause);
	syncPlayPause();

	// ── Step 2: scrubber ─────────────────────────────────────────────────
	const scrubber = player.createElement('input', 'nm-build-scrubber').appendTo(bar).get();
	scrubber.type = 'range';
	scrubber.min = '0';
	scrubber.max = String(player.duration() || 0);
	scrubber.step = '0.1';
	scrubber.value = '0';
	scrubber.style.cssText = 'flex:1;accent-color:#fff;cursor:pointer;';
	scrubber.setAttribute('aria-label', 'Seek');

	let dragging = false;
	const onPointerDown = (): void => { dragging = true; };
	const onChange = (): void => {
		dragging = false;
		void player.time(Number(scrubber.value));
	};
	scrubber.addEventListener('pointerdown', onPointerDown);
	scrubber.addEventListener('change', onChange);

	const onDuration = ({ duration }: { duration: number }): void => {
		scrubber.max = String(duration);
	};
	const onTime = ({ time }: { time: number }): void => {
		if (!dragging)
			scrubber.value = String(time);
	};
	player.on('duration', onDuration);
	player.on('time', onTime);

	// ── Step 3: volume + mute ────────────────────────────────────────────
	const muteButton = player.createButton('nm-build-mute', 'Mute', () => {
		player.toggleMute();
	});
	muteButton.style.cssText
		= 'width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;'
			+ 'color:#fff;font-size:1rem;line-height:1;cursor:pointer;flex:none;';
	bar.appendChild(muteButton);

	const volumeSlider = player.createElement('input', 'nm-build-volume').appendTo(bar).get();
	volumeSlider.type = 'range';
	volumeSlider.min = '0';
	volumeSlider.max = '100';
	volumeSlider.step = '1';
	volumeSlider.value = String(player.volume());
	volumeSlider.style.cssText = 'width:5rem;accent-color:#fff;cursor:pointer;flex:none;';
	volumeSlider.setAttribute('aria-label', 'Volume');

	const onVolumeInput = (): void => {
		void player.volume(Number(volumeSlider.value));
	};
	volumeSlider.addEventListener('input', onVolumeInput);

	const syncMute = (): void => {
		const muted = player.volumeState() === VolumeState.MUTED;
		muteButton.textContent = muted ? '🔇' : '🔊';
		muteButton.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
	};
	const onVolume = ({ level }: { level: number }): void => {
		volumeSlider.value = String(level);
	};
	player.on('mute', syncMute);
	player.on('volume', onVolume);
	syncMute();

	// ── Step 4: track list ────────────────────────────────────────────────
	const list = player.createElement('div', 'nm-build-track-list').appendTo(container).get();
	list.style.cssText
		= 'position:absolute;right:1rem;bottom:3.5rem;display:none;flex-direction:column;'
			+ 'gap:.25rem;padding:.5rem;border-radius:.5rem;background:rgba(0,0,0,.9);min-width:12rem;';

	const renderList = (): void => {
		list.replaceChildren();
		const items = player.queue();
		const activeIndex = player.index();

		items.forEach((item: MusicPlaylistItem, index) => {
			const option = player.createButton(`nm-build-track-${index}`, item.name, () => {
				player.item(index, { autoplay: true });
				renderList();
			});
			option.textContent = item.name;
			option.style.cssText
				= `display:block;width:100%;text-align:left;padding:.25rem .5rem;border:0;`
					+ `border-radius:.25rem;background:${index === activeIndex ? '#fff' : 'transparent'};`
					+ `color:${index === activeIndex ? '#000' : '#fff'};cursor:pointer;font-size:.85rem;`;
			list.appendChild(option);
		});
	};

	const trackListButton = player.createButton('nm-build-track-list-toggle', 'Track list', () => {
		const open = list.style.display === 'flex';
		if (open) {
			list.style.display = 'none';
			return;
		}
		renderList();
		list.style.display = 'flex';
	});
	trackListButton.textContent = '☰';
	trackListButton.style.cssText
		= 'height:2rem;padding:0 .6rem;border:0;border-radius:.4rem;background:transparent;'
			+ 'color:#fff;font-size:.9rem;cursor:pointer;flex:none;';
	bar.appendChild(trackListButton);

	// ── Step 5: now playing + lyrics ────────────────────────────────────────
	const nowPlaying = player.createElement('div', 'nm-build-now-playing').appendTo(container).get();
	nowPlaying.style.cssText
		= 'position:absolute;left:1rem;top:1rem;right:1rem;display:flex;align-items:center;'
			+ 'gap:.75rem;color:#fff;font-family:system-ui,sans-serif;';

	const cover = player.createElement('img', 'nm-build-cover').appendTo(nowPlaying).get();
	cover.style.cssText = 'width:2.75rem;height:2.75rem;border-radius:.4rem;object-fit:cover;flex:none;';
	cover.alt = '';

	const meta = player.createElement('div', 'nm-build-meta').appendTo(nowPlaying).get();
	meta.style.cssText = 'display:flex;flex-direction:column;gap:.15rem;min-width:0;';

	const title = player.createElement('span', 'nm-build-title').appendTo(meta).get();
	title.style.cssText = 'font-size:.9rem;font-weight:600;';

	const artist = player.createElement('span', 'nm-build-artist').appendTo(meta).get();
	artist.style.cssText = 'font-size:.75rem;opacity:.75;';

	const lyricLine = player.createElement('span', 'nm-build-lyric-line').appendTo(meta).get();
	lyricLine.style.cssText = 'font-size:.75rem;opacity:.9;font-style:italic;';

	const renderNowPlaying = (item?: MusicPlaylistItem): void => {
		const current = item ?? player.item();
		cover.src = current?.cover ?? '';
		cover.style.visibility = current?.cover ? 'visible' : 'hidden';
		title.textContent = current?.name ?? '';
		artist.textContent = current?.artist ?? '';
		lyricLine.textContent = '';
	};
	const onItem = ({ item }: { item?: MusicPlaylistItem }): void => renderNowPlaying(item);
	// LyricsPlugin's own events are auto-namespaced onto the player's event
	// bus as `plugin:lyrics:<event>` — there's no separate emitter on the
	// plugin instance to subscribe to directly.
	const onLyricLine = (payload: { text: string }): void => {
		lyricLine.textContent = payload.text;
	};
	player.on('item', onItem);
	player.on('plugin:lyrics:lineEnter', onLyricLine);
	renderNowPlaying();

	const onListItem = (): void => {
		if (list.style.display === 'flex')
			renderList();
	};
	player.on('item', onListItem);

	void player.mute();
	player.item(0, { autoplay: true });

	return () => {
		player.off('play', syncPlayPause);
		player.off('pause', syncPlayPause);
		player.off('playing', syncPlayPause);
		player.off('duration', onDuration);
		player.off('time', onTime);
		player.off('mute', syncMute);
		player.off('volume', onVolume);
		player.off('item', onItem);
		player.off('item', onListItem);
		player.off('plugin:lyrics:lineEnter', onLyricLine);
		scrubber.removeEventListener('pointerdown', onPointerDown);
		scrubber.removeEventListener('change', onChange);
		volumeSlider.removeEventListener('input', onVolumeInput);
		list.remove();
		nowPlaying.remove();
		bar.remove();
	};
}

export default { config, configure, onReady, player: 'music' as const };
