// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Handbook: build DOM with the element factory helpers.
 *
 * createElement returns a fluent builder. createButton and createSVG return
 * ready nodes. addClasses / removeClasses toggle class names. With unique
 * true, createElement reuses an existing id via document.querySelector.
 */

import {
	addClasses,
	createButton,
	createElement,
	createSVG,
	removeClasses,
} from '@nomercy-entertainment/nomercy-player-core/adapters/element-factory';

const root = document.createElement('div');
root.id = 'handbook-building-dom';
document.body.appendChild(root);

const label = createElement('span', 'badge-label')
	.addClasses(['badge-label'])
	.setAttribute('data-state', 'live')
	.appendTo(root)
	.get();
label.textContent = 'LIVE';

const icon = createSVG('badge-icon', '0 0 24 24');
root.appendChild(icon);

const hideBtn = createButton('badge-hide', 'Hide badge', () => {
	removeClasses(root, ['badge-visible']);
});
root.appendChild(hideBtn);

addClasses(root, ['badge-visible']);

const again = createElement('span', 'badge-label', true).get();
console.log(again === label); // true
console.log(root.classList.contains('badge-visible')); // true

hideBtn.click();
console.log(root.classList.contains('badge-visible')); // false
