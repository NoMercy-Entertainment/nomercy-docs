// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Type helpers against IEventBus and drive a standalone EventEmitter.
 * Players inherit EventEmitter; there is no eventBus setup slot.
 */

import { EventEmitter } from '@nomercy-entertainment/nomercy-player-core';
import type { IEventBus } from '@nomercy-entertainment/nomercy-player-core/adapters/event-bus';

interface DemoEvents {
	ready: { id: string };
}

function listenReady(
	bus: IEventBus<DemoEvents>,
	fn: (data: DemoEvents['ready']) => void,
): void {
	bus.on('ready', fn);
}

const bus = new EventEmitter<DemoEvents>();

listenReady(bus, ({ id }) => {
	console.log(id);
});

bus.once('ready', ({ id }) => {
	console.log(`once: ${id}`);
});

bus.on('all', (event, data) => {
	console.log(event, data);
});

bus.emit('ready', { id: 'demo' });

console.log(bus.hasListeners('ready'));
console.log(bus.listenerCount());

bus.off('ready');
bus.off('all');
