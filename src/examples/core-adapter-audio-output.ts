// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Type helpers against IPlayer and drive the three audio-output methods.
 * Enumeration returns [] when mediaDevices is missing.
 * The picker and setSinkId paths need a browser that exposes them.
 */

import type { IPlayer } from '@nomercy-entertainment/nomercy-player-core';
import { StubPlayer } from '@nomercy-entertainment/nomercy-player-core/testing';

async function listOutputs(player: IPlayer): Promise<MediaDeviceInfo[]> {
	return player.audioOutputs();
}

async function pickAndRoute(player: IPlayer): Promise<string | null> {
	const chosen = await player.selectAudioOutput();
	if (!chosen) return null;
	await player.audioOutput(chosen.deviceId);
	return player.audioOutput();
}

export async function demoAudioOutput(player: IPlayer): Promise<void> {
	const devices = await listOutputs(player);
	for (const device of devices) {
		console.log(device.deviceId, device.label);
	}

	const active = await pickAndRoute(player);
	console.log(active);
}

export async function stubAudioOutput(): Promise<void> {
	const player = new StubPlayer();

	console.log(await player.audioOutputs()); // []
	console.log(await player.selectAudioOutput()); // null
	console.log(await player.audioOutput()); // null
	await player.audioOutput('speakers'); // resolves, routes nothing
}
