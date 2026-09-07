// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

/**
 * Named-import gate for the player-trio content trees.
 *
 * `check:doc-imports` proves a specifier resolves. It does NOT prove the SYMBOLS
 * exist: a fence reading `import { PluginEventMap } from '@nomercy-entertainment/
 * nomercy-player-core'` passes that gate even when the package root never re-exports
 * `PluginEventMap`, which is a real case in this repo (it is exported from
 * `core/plugin/index.ts` and nowhere a consumer can reach).
 *
 * A reader copying that line gets a build error the docs promised would not happen.
 *
 * This gate collects every named import from every hand-written fence in the trio's
 * `.mdx`, writes one probe file per specifier, and type-checks it against the LIVE
 * package sources with the same compiler settings `check:examples` uses. A symbol the
 * package does not export fails the build with the page and line that claimed it.
 *
 * Type-only and value imports are both emitted as plain imports; a type-only symbol
 * imported as a value still resolves for TS2305 purposes ("has no exported member"),
 * which is the error this gate exists to catch.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const CONTENT = path.join(ROOT, 'src', 'content');
const COLLECTIONS = ['nomercy-player-core', 'nomercy-video-player', 'nomercy-music-player'];
const TRIO = /^@nomercy-entertainment\/nomercy-(player-core|video-player|music-player)(\/|$)/;

/** `import { a, b as c } from 'spec'` and `import type { ... } from 'spec'`. */
const IMPORT_RE = /^\s*import\s+(?:type\s+)?\{([^}]*)\}\s*from\s*['"]([^'"]+)['"]/gm;

function mdxFiles() {
	const found = [];
	for (const collection of COLLECTIONS) {
		const base = path.join(CONTENT, collection, 'en');
		if (!fs.existsSync(base)) continue;
		const walk = (dir) => {
			for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
				const full = path.join(dir, entry.name);
				if (entry.isDirectory()) walk(full);
				else if (entry.name.endsWith('.mdx')) found.push(full);
			}
		};
		walk(base);
	}
	return found;
}

/** Every named import in a fenced block, with the line that wrote it. */
function claimsIn(file) {
	const source = fs.readFileSync(file, 'utf8');
	const lines = source.split('\n');
	const claims = [];
	let inFence = false;
	let buffer = '';
	let fenceStart = 0;
	lines.forEach((line, index) => {
		if (/^```/.test(line)) {
			if (inFence) {
				for (const match of buffer.matchAll(IMPORT_RE)) {
					const specifier = match[2];
					if (!TRIO.test(specifier)) continue;
					const names = match[1]
						.split(',')
						.map(part => part.trim().split(/\s+as\s+/)[0].trim())
						.filter(name => name && /^[A-Za-z_$][\w$]*$/.test(name));
					if (names.length) claims.push({ specifier, names, line: fenceStart + 1 });
				}
				buffer = '';
			}
			inFence = !inFence;
			fenceStart = index + 1;
			return;
		}
		if (inFence) buffer += `${line}\n`;
	});
	return claims;
}

const bySpecifier = new Map();
let claimCount = 0;
for (const file of mdxFiles()) {
	for (const claim of claimsIn(file)) {
		if (!bySpecifier.has(claim.specifier)) bySpecifier.set(claim.specifier, new Map());
		const symbols = bySpecifier.get(claim.specifier);
		for (const name of claim.names) {
			claimCount++;
			if (!symbols.has(name)) symbols.set(name, `${path.relative(ROOT, file).replace(/\\/g, '/')}:${claim.line}`);
		}
	}
}

if (bySpecifier.size === 0) {
	console.log('check-doc-symbols: no trio named imports found in prose fences.');
	process.exit(0);
}

const probeDir = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-symbols-'));
const probes = [];
let index = 0;
for (const [specifier, symbols] of bySpecifier) {
	const names = [...symbols.keys()];
	const probe = path.join(probeDir, `probe-${index++}.ts`);
	// Import only, never reference. TypeScript still reports TS2305 for a member the
	// module does not export, and not referencing them keeps a type-only export from
	// being misread as a missing value (TS2693), which is a different question.
	fs.writeFileSync(probe, `import { ${names.join(', ')} } from '${specifier}';\n`);
	probes.push({ probe, specifier, symbols });
}

const tsconfig = path.join(probeDir, 'tsconfig.json');
fs.writeFileSync(tsconfig, JSON.stringify({
	extends: path.join(ROOT, 'tsconfig.examples.json').replace(/\\/g, '/'),
	include: probes.map(p => p.probe.replace(/\\/g, '/')),
	compilerOptions: { noEmit: true, types: [] },
}, null, 2));

let output = '';
let failed = false;
try {
	execFileSync('npx', ['tsc', '-p', tsconfig], { cwd: ROOT, encoding: 'utf8', stdio: 'pipe', shell: true });
}
catch (error) {
	failed = true;
	output = `${error.stdout ?? ''}${error.stderr ?? ''}`;
}

fs.rmSync(probeDir, { recursive: true, force: true });

if (!failed) {
	console.log(`check-doc-symbols: ${claimCount} named import(s) across ${bySpecifier.size} specifier(s) all resolve.`);
	process.exit(0);
}

// TS2305: Module '"x"' has no exported member 'Y'.
const missing = [...output.matchAll(/error TS2(305|724)[^']*'([^']+)'[^']*'([^']+)'/g)]
	.map(match => ({ specifier: match[2], symbol: match[3] }));

console.error('check-doc-symbols: a documented import names a symbol the package does not export.\n');
if (missing.length) {
	for (const { specifier, symbol } of missing) {
		const where = bySpecifier.get(specifier)?.get(symbol)
			?? [...bySpecifier.values()].map(symbols => symbols.get(symbol)).find(Boolean)
			?? 'unknown page';
		console.error(`    ${symbol}  from  ${specifier}\n      claimed at ${where}`);
	}
	console.error('\n  Either export the symbol from that entry point, or correct the page.');
	console.error('  A symbol reachable only from a deep module is not reachable by a reader.\n');
}
else {
	console.error(output.trim().split('\n').slice(0, 25).join('\n'));
}
process.exit(1);
