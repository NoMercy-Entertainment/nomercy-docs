// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: React Integration — a useMusicPlayer hook mirroring player events
 * into state, plus a component using it. Copy both verbatim into your app.
 *
 * StrictMode: React 18 double-invokes effects in development (mount ->
 * cleanup -> mount, synchronously, before the fire-and-forget dispose()
 * below has actually resolved — a synchronous cleanup can't await it). The
 * second mount's nmplayer(containerId) call resolves the SAME
 * still-registered instance; calling setup() on it again throws
 * core:lifecycle/already-setup. Guarding on setupState() fixes the crash: a
 * re-adopted instance skips setup() and just reattaches listeners. This does
 * not eliminate every StrictMode-only edge case (a listener gap can still
 * occur in dev between the first mount's deferred dispose() clearing all
 * listeners and any code assuming they're still attached) — it is dev-only
 * double-invoke behavior, stripped from production builds, and the fix here
 * targets the crash, the failure mode that actually reaches users testing
 * the page.
 */

import type { MouseEvent } from 'react';
import type { IMusicPlayer, MusicPlayerConfig, MusicPlaylistItem } from '@nomercy-entertainment/nomercy-music-player';
import { SetupState } from '@nomercy-entertainment/nomercy-player-core';
import { useEffect, useMemo, useRef, useState } from 'react';
import nmplayer, { PlayState } from '@nomercy-entertainment/nomercy-music-player';

const DEFAULT_BASE_URL = 'https://your-server.example.com/api/files';

export function useMusicPlayer(containerId: string, config: MusicPlayerConfig) {
	const playerRef = useRef<IMusicPlayer | null>(null);
	const [currentItem, setCurrentItem] = useState<MusicPlaylistItem | undefined>(undefined);
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const player = nmplayer(containerId);
		if (player.setupState() === SetupState.NOT_SETUP) {
			player.setup(config);
		}
		playerRef.current = player;

		const onItem = ({ item }: { item: MusicPlaylistItem | undefined }): void => setCurrentItem(item);
		const onPlay = (): void => setIsPlaying(true);
		const onPause = (): void => setIsPlaying(false);
		const onTime = ({ time }: { time: number }): void => setCurrentTime(time);
		const onDuration = ({ duration: total }: { duration: number }): void => setDuration(total);

		player.on('item', onItem);
		player.on('play', onPlay);
		player.on('playing', onPlay);
		player.on('pause', onPause);
		player.on('ended', onPause);
		player.on('time', onTime);
		player.on('duration', onDuration);

		return () => {
			player.off('item', onItem);
			player.off('play', onPlay);
			player.off('playing', onPlay);
			player.off('pause', onPause);
			player.off('ended', onPause);
			player.off('time', onTime);
			player.off('duration', onDuration);
			void player.dispose();
			playerRef.current = null;
		};
		// config is intentionally captured once — see "Config identity" on the page.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerId]);

	return {
		player: playerRef,
		currentItem,
		isPlaying,
		currentTime,
		duration,
		playState: () => playerRef.current?.playState() === PlayState.PLAYING,
	};
}

export function MusicPlayerView({ playlist }: { playlist: MusicPlaylistItem[] }) {
	const config = useMemo<MusicPlayerConfig>(() => ({ baseUrl: DEFAULT_BASE_URL, playlist }), [playlist]);
	const { player, currentItem, isPlaying, currentTime, duration } = useMusicPlayer('player', config);
	const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

	function seek(event: MouseEvent<HTMLDivElement>): void {
		const bar = event.currentTarget;
		const ratio = event.nativeEvent.offsetX / bar.clientWidth;
		void player.current?.time(ratio * duration);
	}

	return (
		<div>
			<div id="player" />
			<p>{currentItem?.name ?? 'Nothing playing'}</p>
			<div role="slider" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} tabIndex={0} onClick={seek}>
				<div style={{ width: `${progress}%` }} />
			</div>
			<button type="button" onClick={() => void player.current?.togglePlayback()}>
				{isPlaying ? 'Pause' : 'Play'}
			</button>
		</div>
	);
}
