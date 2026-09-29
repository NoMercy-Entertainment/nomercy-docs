// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: IPlatform and browserPlatform.
 *
 * Read the default bundle, then replace one controller with a native one
 * and pass the bundle to `setup({ platform })`.
 */

import type { BasePlayerConfig } from '@nomercy-entertainment/nomercy-player-core';
import type { IWakeLock } from '@nomercy-entertainment/nomercy-player-core/adapters/platform';
import { browserPlatform } from '@nomercy-entertainment/nomercy-player-core/adapters/platform';

console.log(browserPlatform.network.isOnline());
console.log(browserPlatform.visibility.isVisible());

const decode = await browserPlatform.capabilities.canDecode({
	contentType: 'video/mp4; codecs="avc1.640028"',
	width: 1920,
	height: 1080,
	bitrate: 5_000_000,
	framerate: 24,
});

console.log(decode.supported, decode.smooth, decode.powerEfficient);

// The bridge your native shell exposes to the page.
interface KeepAwakeBridge {
	keepAwake: (on: boolean) => Promise<void>;
}

function nativeWakeLock(bridge: KeepAwakeBridge): IWakeLock {
	let held = false;

	return {
		async acquire(): Promise<void> {
			await bridge.keepAwake(true);
			held = true;
		},
		async release(): Promise<void> {
			await bridge.keepAwake(false);
			held = false;
		},
		isHeld(): boolean {
			return held;
		},
	};
}

export function configure(
	player: { setup: (config: BasePlayerConfig) => unknown },
	bridge: KeepAwakeBridge,
): void {
	player.setup({
		// ...
		platform: {
			...browserPlatform,
			wakeLock: nativeWakeLock(bridge),
		},
		wakeLock: 'auto',
	});
}
