// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: IIdGenerator and defaultIdGenerator.
 *
 * `defaultIdGenerator.next()` returns `crypto.randomUUID()`, or a time and
 * random string where that call is missing. A sequential generator gives
 * a test IDs it can assert on.
 */

import type { IIdGenerator } from '@nomercy-entertainment/nomercy-player-core/adapters/id-generator';
import { defaultIdGenerator } from '@nomercy-entertainment/nomercy-player-core/adapters/id-generator';

console.log(defaultIdGenerator.next()); // a UUID such as '3b241101-e2bb-4255-8caf-4136c566a962'

function sequentialIds(prefix: string): IIdGenerator {
	let count = 0;

	return {
		next(): string {
			count += 1;

			return `${prefix}-${count}`;
		},
	};
}

const ids = sequentialIds('track');

console.log(ids.next()); // 'track-1'
console.log(ids.next()); // 'track-2'
