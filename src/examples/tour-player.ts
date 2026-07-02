// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Shared minimal player for the guided-tour examples. Same composition as
 * `minimal-player.ts` (three-form constructor + one `composeMixins(...,
 * ...playerCoreMethods)` call) — the difference is only which methods are
 * `declare`d. `composeMixins` always stamps the full `playerCoreMethods`
 * aggregate onto the prototype at runtime; `declare` merely tells TypeScript
 * what is already there. The guided tour exercises more of the kit than the
 * quickstart's narrower setup/ready/phase/dispose demo, so this file declares
 * a wider slice of the same real surface. The recipes collection reuses this
 * same scaffold and its `declare`d surface for the same reason.
 */

import type {
	ActionOptions,
	BaseEventMap,
	BasePlayerConfig,
	BasePlaylistItem,
	BufferState,
	ICueParser,
	IUrlResolver,
	NetworkState,
	Plugin,
	PluginCtorWithId,
	ResolvedUrl,
	TimeState,
	Translations,
	UrlCategory,
} from '@nomercy-entertainment/nomercy-player-core';
import {
	composeMixins,
	EventEmitter,
	initPlayerCoreState,
	playerCoreMethods,
	resolvePlayerConstructor,
} from '@nomercy-entertainment/nomercy-player-core';

const _instances = new Map<string, TourPlayer>();

class TourPlayer extends EventEmitter<BaseEventMap> {
	playerId = '';
	container: HTMLElement = {} as HTMLElement;

	get id(): string {
		return this.playerId;
	}

	// Declared surface used across the guided-tour examples — every one of
	// these is stamped onto the prototype below by composeMixins.
	declare setup: (config: BasePlayerConfig) => this;
	declare ready: () => Promise<void>;
	declare dispose: () => void;

	declare play: (opts?: ActionOptions) => Promise<void>;
	declare pause: (opts?: ActionOptions) => Promise<void>;
	declare rewind: (seconds?: number, opts?: ActionOptions) => Promise<void>;
	declare forward: (seconds?: number, opts?: ActionOptions) => Promise<void>;
	declare playbackRate: (rate?: number) => number | Promise<void>;

	declare timeData: () => TimeState;
	declare bufferState: () => BufferState;
	declare networkState: () => NetworkState;

	declare queue: {
		(): ReadonlyArray<BasePlaylistItem>;
		(items: BasePlaylistItem[], opts?: ActionOptions): void;
	};
	declare queueAppend: (item: BasePlaylistItem | BasePlaylistItem[], opts?: ActionOptions) => void;
	declare queueMove: (from: number, to: number, opts?: ActionOptions) => void;
	declare queueLength: () => number;
	declare queueIndexOf: (id: string | number) => number;
	declare queueShuffle: (opts?: ActionOptions) => void;
	declare peekNext: () => BasePlaylistItem | undefined;
	declare item: () => BasePlaylistItem | undefined;

	declare addPlugin: <P extends Plugin<any, any, any>>(
		PluginClass: PluginCtorWithId & (new () => P),
		opts?: P['opts'],
	) => this;
	declare getPlugin: <P extends object>(PluginClass: PluginCtorWithId & (new () => P)) => P | undefined;

	declare t: (key: string, vars?: Record<string, string>) => string;
	declare language: { (): string; (lang: string): Promise<void> };
	declare addTranslations: (bundle: Translations) => void;

	declare registerCueParser: (parser: ICueParser, prepend?: boolean) => void;
	declare unregisterCueParser: (id: string) => void;
	declare resolveCueParser: (url: string) => ICueParser | undefined;

	declare resolveUrl: (url: string, category?: UrlCategory) => Promise<ResolvedUrl>;
	declare urlResolver: { (): IUrlResolver | undefined; (resolver: IUrlResolver | undefined): void };

	constructor(id?: string | number) {
		super();
		const resolved = resolvePlayerConstructor(id, _instances, 'TourPlayer');
		if (resolved.kind === 'existing') {
			return resolved.instance as unknown as this;
		}

		initPlayerCoreState(this, { className: 'TourPlayer' });
		this.playerId = resolved.id;
		this.container = resolved.div;
		_instances.set(resolved.id, this);
	}
}

// Same aggregate the real players compose — nothing here is a cut-down subset.
composeMixins(TourPlayer.prototype, ...playerCoreMethods);

/** Mount (or retrieve) the tour's shared minimal player bound to a container `<div id="...">`. */
export function tourPlayer(id?: string | number): TourPlayer {
	return new TourPlayer(id);
}
