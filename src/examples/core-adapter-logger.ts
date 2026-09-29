// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Catalog: ILogger and Logger.
 *
 * Build a `Logger`, add a sink, and hand it to `setup({ logger })`. A custom
 * `ILogger` wraps a logging library of your own.
 */

import type { BasePlayerConfig, LogLevel, LogSink } from '@nomercy-entertainment/nomercy-player-core';
import type { ILogger } from '@nomercy-entertainment/nomercy-player-core/adapters/logger';
import { Logger } from '@nomercy-entertainment/nomercy-player-core/adapters/logger';

const logger = new Logger({
	level: 'debug',
	prefix: 'my-app',
});

const lines: string[] = [];
const stopCollecting = logger.addSink((level, prefix, args) => {
	lines.push(`${level} ${prefix} ${args.join(' ')}`);
});

logger.info('player created');
logger.child('queue').debug('item added');

console.log(lines); // ['info [my-app] player created', 'debug [my-app][queue] item added']

logger.level('warn');
stopCollecting();

export function configure(player: { setup: (config: BasePlayerConfig) => unknown }): void {
	player.setup({
		// ...
		logger,
	});
}

// A custom logger forwards to any engine that takes a level and a message.
type Engine = (level: LogLevel, message: string) => void;

class EngineLogger implements ILogger {
	private threshold: LogLevel = 'info';
	private readonly sinks: LogSink[] = [];

	constructor(private readonly engine: Engine, private readonly prefix = '[nmplayer]') {}

	trace(...args: unknown[]): void {
		this.write('trace', args);
	}

	debug(...args: unknown[]): void {
		this.write('debug', args);
	}

	info(...args: unknown[]): void {
		this.write('info', args);
	}

	warn(...args: unknown[]): void {
		this.write('warn', args);
	}

	error(...args: unknown[]): void {
		this.write('error', args);
	}

	level(): LogLevel;
	level(value: LogLevel): void;
	level(value?: LogLevel): LogLevel | void {
		if (value === undefined)
			return this.threshold;

		this.threshold = value;
	}

	addSink(fn: LogSink): () => void {
		this.sinks.push(fn);

		return () => {
			this.sinks.splice(this.sinks.indexOf(fn), 1);
		};
	}

	child(suffix: string): ILogger {
		const child = new EngineLogger(this.engine, `${this.prefix}[${suffix}]`);
		child.level(this.threshold);

		return child;
	}

	private write(level: LogLevel, args: unknown[]): void {
		const rank: LogLevel[] = ['error', 'warn', 'info', 'debug', 'trace'];
		if (this.threshold === 'silent' || rank.indexOf(level) > rank.indexOf(this.threshold))
			return;

		this.engine(level, `${this.prefix} ${args.join(' ')}`);
		for (const sink of this.sinks) sink(level, this.prefix, args);
	}
}

const engineLogger = new EngineLogger((level, message) => {
	console.log(level, message);
});

engineLogger.warn('slow start'); // warn [nmplayer] slow start
