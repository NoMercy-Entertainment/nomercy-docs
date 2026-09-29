// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Type helpers against CreateElement and call the five built-in helpers.
 * There is no element-factory setup slot.
 */

import {
	addClasses,
	createButton,
	createElement,
	createSVG,
	removeClasses,
} from '@nomercy-entertainment/nomercy-player-core/adapters/element-factory';
import type { CreateElement } from '@nomercy-entertainment/nomercy-player-core/adapters/element-factory';

function finishBadge(
	builder: CreateElement<HTMLDivElement>,
): HTMLDivElement {
	return builder.addClasses(['badge']).get();
}

const root = document.createElement('div');
root.id = 'adapter-element-factory';
document.body.appendChild(root);

const badge = finishBadge(createElement('div', 'demo-badge'));
root.appendChild(badge);
badge.textContent = 'LIVE';

const icon = createSVG('demo-icon', '0 0 24 24');
root.appendChild(icon);

const hide = createButton('demo-hide', 'Hide badge', () => {
	removeClasses(badge, ['badge']);
});
root.appendChild(hide);

addClasses(badge, ['badge']);

const again = createElement('div', 'demo-badge', true).get();
console.log(again === badge);
console.log(hide.type);
console.log(hide.getAttribute('aria-label'));
console.log(hide.title);
