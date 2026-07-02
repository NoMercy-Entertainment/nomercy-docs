// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * `EventEmitter` is the typed pub/sub primitive every kit mixin, plugin, and
 * player class is built on. `on` / `once` / `off` / `emit` are strongly typed
 * against an event map you supply as a generic; `on('all', fn)` is the
 * untyped firehose every debugging overlay and `player.on('all', console.log)`
 * call relies on. This example builds a standalone bus with no player
 * involved — the same class both `NMVideoPlayer` and `NMMusicPlayer` extend.
 */

import { EventEmitter } from '@nomercy-entertainment/nomercy-player-core';

interface DemoEvents {
	greeting: { name: string };
}

const bus = new EventEmitter<DemoEvents>();

bus.on('greeting', ({ name }) => console.log(`hello, ${name}`));

// once() self-removes after its first call — no manual off() needed to clean up.
bus.once('greeting', ({ name }) => console.log(`(once) hi, ${name}`));

// 'all' is the untyped firehose: called for every emit with (eventName, data).
bus.on('all', (event, data) => console.log('firehose:', event, data));

bus.emit('greeting', { name: 'Ada' });
bus.emit('greeting', { name: 'Grace' }); // the once() listener already fired and detached

console.log(bus.hasListeners('greeting')); // true — the typed listener is still registered
console.log(bus.listenerCount()); // 2: the typed listener + the firehose listener

bus.off('greeting');
console.log(bus.hasListeners('greeting')); // false
