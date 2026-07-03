// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Recipe: React Integration — context provider for a shared instance. For a
 * layout where a persistent mini-player and a queue sidebar share one
 * instance, wrap it in a context instead of calling the hook twice.
 *
 * StrictMode: creation happens in the render body (the sanctioned
 * lazy-`useRef`-init pattern — `if (!playerRef.current)` makes it idempotent
 * across React's render-phase double-invoke); disposal happens in the
 * effect's cleanup. Those two live in DIFFERENT phases, so the render-body
 * guard alone doesn't know disposal ran — after React 18 StrictMode's dev
 * mount -> cleanup -> mount cycle disposes the instance the ref still
 * points at, nothing recreates it until the NEXT render. Checking
 * `setupState() === SetupState.DISPOSED` closes that gap on every
 * subsequent render (the common case — most trees re-render for unrelated
 * reasons), though a child mounted in the narrow dev-only window between
 * disposal completing and the next render can still see a disposed
 * instance; that window doesn't exist in production, where StrictMode's
 * double-invoke is stripped entirely.
 */

import type { ReactNode } from 'react';
import type { IMusicPlayer, MusicPlayerConfig } from '@nomercy-entertainment/nomercy-music-player';
import { SetupState } from '@nomercy-entertainment/nomercy-player-core';
import { createContext, useContext, useEffect, useRef } from 'react';
import nmplayer from '@nomercy-entertainment/nomercy-music-player';

const MusicPlayerContext = createContext<IMusicPlayer | null>(null);

export function MusicPlayerProvider({ config, children }: { config: MusicPlayerConfig; children: ReactNode }) {
	const playerRef = useRef<IMusicPlayer | null>(null);

	if (!playerRef.current || playerRef.current.setupState() === SetupState.DISPOSED) {
		const player = nmplayer('global-player');
		if (player.setupState() === SetupState.NOT_SETUP) {
			player.setup(config);
		}
		playerRef.current = player;
	}

	useEffect(() => () => { void playerRef.current?.dispose(); }, []);

	return (
		<MusicPlayerContext.Provider value={playerRef.current}>
			{children}
		</MusicPlayerContext.Provider>
	);
}

export function useMusicPlayerContext(): IMusicPlayer {
	const player = useContext(MusicPlayerContext);
	if (!player) throw new Error('useMusicPlayerContext must be used inside MusicPlayerProvider');
	return player;
}
