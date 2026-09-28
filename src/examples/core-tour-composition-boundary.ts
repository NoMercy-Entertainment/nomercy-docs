// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Tour: composition boundary.
 *
 * Shared modules stamp first. A later module overrides the same key.
 * That order is how your class adds or replaces behavior without rewriting
 * every shared method.
 */

import { composeMixins } from '@nomercy-entertainment/nomercy-player-core';

const sharedMethods = {
	role(): string {
		return 'shared';
	},
};

const specificMethods = {
	role(): string {
		return 'specific';
	},
};

class BoundaryPlayer {
	declare role: () => string;
}

composeMixins(BoundaryPlayer.prototype, sharedMethods, specificMethods);

const player = new BoundaryPlayer();
console.log(player.role()); // 'specific'
