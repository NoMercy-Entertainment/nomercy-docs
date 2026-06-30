import { visit } from 'unist-util-visit';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import type { Root } from 'mdast';

// Build-time counterpart to VersionInjector. Rewrites the version tag in
// install / CDN snippets for OUR packages (e.g. `...@rc`) to the version
// resolved from npm and written to src/data/versions.json by
// scripts/resolve-versions.mjs at `astro:build:start`. This bakes the real
// version into the static HTML so it is correct without JavaScript and never
// flashes `@rc`. Third-party packages (hls.js) are pinned in the source and are
// never touched. VersionInjector keeps doing the same rewrite client-side to
// pick up releases published after the docs were built.

function loadVersions(): Record<string, string> {
	try {
		const here = dirname(fileURLToPath(import.meta.url));
		const file = resolve(here, '../../data/versions.json');
		return JSON.parse(readFileSync(file, 'utf8')) as Record<string, string>;
	} catch {
		return {};
	}
}

function buildReplacers(): { re: RegExp; to: string }[] {
	return Object.entries(loadVersions())
		.filter(([, version]) => Boolean(version))
		.map(([pkg, version]) => {
			const escaped = pkg.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
			return {
				re: new RegExp(`(${escaped})@(?:beta|rc|latest|\\d[\\w.-]*)`, 'g'),
				to: `$1@${version}`,
			};
		});
}

export function remarkVersionTags() {
	// Resolve lazily on the first transform: versions.json is written at
	// astro:build:start, which runs after the plugin list is constructed.
	let replacers: { re: RegExp; to: string }[] | null = null;
	return (tree: Root) => {
		if (replacers === null) replacers = buildReplacers();
		if (replacers.length === 0) return;
		visit(tree, ['code', 'inlineCode'], (node: { value?: string }) => {
			if (typeof node.value !== 'string' || !node.value.includes('@nomercy-entertainment/')) return;
			let out = node.value;
			for (const { re, to } of replacers!) out = out.replace(re, to);
			node.value = out;
		});
	};
}
