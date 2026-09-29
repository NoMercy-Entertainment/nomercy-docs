// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: the quality policy functions.
 *
 * Pure functions over a ladder of `QualityLevel` rungs. They take booleans
 * and pixel sizes, so a test can prove every branch without a screen.
 */

import type { DisplayRangeProbe, QualityLevel } from '@nomercy-entertainment/nomercy-player-core';
import {
	abrCeiling,
	detectDisplayHdr,
	hdrDecision,
	sizeAbrCeiling,
} from '@nomercy-entertainment/nomercy-player-core';

const ladder: QualityLevel[] = [
	{
		index: 0,
		label: '480p',
		height: 480,
		width: 854,
		bitrate: 1_200_000,
		dynamicRange: 'sdr',
	},
	{
		index: 1,
		label: '1080p',
		height: 1080,
		width: 1920,
		bitrate: 5_000_000,
		dynamicRange: 'sdr',
	},
	{
		index: 2,
		label: '2160p HDR',
		height: 2160,
		width: 3840,
		bitrate: 16_000_000,
		dynamicRange: 'hdr',
	},
];

const sdrScreen: DisplayRangeProbe = {
	matches: () => false,
};

const displayHdr = detectDisplayHdr(sdrScreen);
console.log(displayHdr); // false

const decision = hdrDecision(ladder, displayHdr, false, 'play');
console.log(decision); // { kind: 'cap-to', level: the 1080p rung }

const sizeCap = sizeAbrCeiling(ladder, 800, 450);
console.log(sizeCap?.label); // '480p'

const hdrCap = decision.kind === 'cap-to' ? decision.level : null;
console.log(abrCeiling(hdrCap, sizeCap)?.label); // '480p'
