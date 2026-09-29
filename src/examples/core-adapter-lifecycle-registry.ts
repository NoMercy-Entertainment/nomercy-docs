// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: ILifecycleRegistry and LifecycleRegistry.
 *
 * A registry records listeners, timers, observers, controllers and frame
 * loops, and one `dispose()` releases all of them. A helper typed against
 * the interface records its work on whatever registry it is handed.
 */

import { LifecycleRegistry } from '@nomercy-entertainment/nomercy-player-core';
import type { ILifecycleRegistry } from '@nomercy-entertainment/nomercy-player-core/adapters/lifecycle-registry';

function watchSize(lifecycle: ILifecycleRegistry, element: HTMLElement, onResize: () => void): void {
	lifecycle.observe(new ResizeObserver(onResize)).observe(element);
	lifecycle.listen(window, 'orientationchange', onResize);
}

const panel = document.createElement('div');
const lifecycle = new LifecycleRegistry();

watchSize(lifecycle, panel, () => {
	console.log(panel.clientWidth);
});

lifecycle.timeout(() => {
	console.log('hint hidden');
}, 3000);

const controller = lifecycle.abortable();
void fetch('https://api.example.com/catalog.json', { signal: controller.signal }).catch(() => {});

const stopMeter = lifecycle.frame((deltaMs) => {
	console.log(deltaMs);
});

lifecycle.addCleanup(() => {
	panel.remove();
});

stopMeter();

lifecycle.dispose();

console.log(lifecycle.isDisposed()); // true
console.log(lifecycle.timeout(() => {}, 10)); // -1
