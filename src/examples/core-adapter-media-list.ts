// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: IMediaList and MediaList.
 *
 * A cursor-aware ordered list. Every mutation keeps the cursor on the same
 * item and fires its own event, then `change`.
 */

import type { BasePlaylistItem } from '@nomercy-entertainment/nomercy-player-core';
import type { IMediaList } from '@nomercy-entertainment/nomercy-player-core/adapters/media-list';
import { MediaList } from '@nomercy-entertainment/nomercy-player-core/adapters/media-list';

const list = new MediaList<BasePlaylistItem>();

list.on('item', ({ item, index }) => {
	console.log('current', index, item?.id);
});

list.on('change', ({ items }) => {
	console.log('length', items.length);
});

list.set([
	{
		id: 'intro',
	},
	{
		id: 'chapter-1',
	},
	{
		id: 'chapter-2',
	},
]);

list.setCurrent('chapter-1');
console.log(list.currentIndex()); // 1

list.prepend({
	id: 'trailer',
});
console.log(list.currentIndex()); // 2, still 'chapter-1'

console.log(list.peekNext()?.id); // 'chapter-2'

list.removeAt(2);
console.log(list.current()?.id); // 'chapter-2', and no 'item' event fired

function nextTitle(queue: IMediaList<BasePlaylistItem>): string | undefined {
	return queue.peekNext()?.title;
}

console.log(nextTitle(list));

list.dispose();
