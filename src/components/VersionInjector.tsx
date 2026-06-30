'use client';

import { useEffect } from 'react';

// Replaces the version tag in install / CDN snippets for OUR packages with the
// newest version published to npm — INCLUDING the v2 `rc` line — resolved live
// from the registry at page-visit time, so the docs never show a stale or
// invented version for code we publish. We take the highest semver across all
// published versions (NOT the `latest` dist-tag, which still points at the v1
// line for the players), so the current v2 rc surfaces correctly.
// Third-party dependencies (hls.js) are NOT touched here — they are pinned in
// the source to the exact version the player is built and tested against.
// Rewrites the copy payload (data-code, so paste is always correct) and the
// visible text. Cached per session.

const PACKAGES = [
	'@nomercy-entertainment/nomercy-player-core',
	'@nomercy-entertainment/nomercy-video-player',
	'@nomercy-entertainment/nomercy-music-player',
];

// Compare two semver strings. >0 if a is newer, <0 if b is newer, 0 if equal.
// Handles prerelease ordering (rc.19 > rc.2; release > prerelease).
function compareSemver(a: string, b: string): number {
	const parse = (v: string) => {
		const [core, pre] = v.split('-');
		const nums = core.split('.').map((n) => parseInt(n, 10) || 0);
		return { nums, pre: pre ? pre.split('.') : null };
	};
	const pa = parse(a);
	const pb = parse(b);
	for (let i = 0; i < 3; i++) {
		const d = (pa.nums[i] ?? 0) - (pb.nums[i] ?? 0);
		if (d !== 0) return d;
	}
	if (!pa.pre && pb.pre) return 1;
	if (pa.pre && !pb.pre) return -1;
	if (!pa.pre || !pb.pre) return 0;
	const len = Math.max(pa.pre.length, pb.pre.length);
	for (let i = 0; i < len; i++) {
		const ai = pa.pre[i];
		const bi = pb.pre[i];
		if (ai === undefined) return -1;
		if (bi === undefined) return 1;
		const an = /^\d+$/.test(ai);
		const bn = /^\d+$/.test(bi);
		if (an && bn) {
			const d = parseInt(ai, 10) - parseInt(bi, 10);
			if (d !== 0) return d;
		} else if (an) {
			return -1;
		} else if (bn) {
			return 1;
		} else if (ai !== bi) {
			return ai < bi ? -1 : 1;
		}
	}
	return 0;
}

async function fetchVersion(pkg: string): Promise<string | null> {
	try {
		const res = await fetch(`https://registry.npmjs.org/${pkg}`);
		if (!res.ok) return null;
		const data = (await res.json()) as {
			versions?: Record<string, unknown>;
			'dist-tags'?: Record<string, string>;
		};
		const all = Object.keys(data.versions ?? {});
		if (all.length > 0) {
			return all.reduce((best, v) => (compareSemver(v, best) > 0 ? v : best));
		}
		return data['dist-tags']?.latest ?? null;
	} catch {
		return null;
	}
}

async function resolveVersion(pkg: string): Promise<string | null> {
	const cacheKey = `npmver-rc:${pkg}`;
	try {
		const cached = sessionStorage.getItem(cacheKey);
		if (cached) return cached;
	} catch {
		// sessionStorage blocked — fetch anyway
	}
	const version = await fetchVersion(pkg);
	if (version) {
		try {
			sessionStorage.setItem(cacheKey, version);
		} catch {
			// ignore
		}
	}
	return version;
}

export function VersionInjector() {
	useEffect(() => {
		let cancelled = false;
		(async () => {
			const versions: Record<string, string> = {};
			await Promise.all(
				PACKAGES.map(async (pkg) => {
					const version = await resolveVersion(pkg);
					if (version) versions[pkg] = version;
				}),
			);
			if (cancelled || Object.keys(versions).length === 0) return;

			// `<pkg>@beta` / `@rc` / `@latest` / `@1.2.3` -> `<pkg>@<resolved>`
			const rewrite = (text: string): string => {
				let out = text;
				for (const [pkg, version] of Object.entries(versions)) {
					const escaped = pkg.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
					out = out.replace(new RegExp(`(${escaped})@(?:beta|rc|latest|\\d[\\w.-]*)`, 'g'), `$1@${version}`);
				}
				return out;
			};

			const mentionsPkg = (text: string): boolean =>
				Object.keys(versions).some((pkg) => text.includes(`${pkg}@`));

			// 1) Copy payloads — guarantees paste is correct regardless of how the
			//    syntax highlighter split the token across spans.
			document.querySelectorAll<HTMLButtonElement>('button[data-code]').forEach((button) => {
				const code = button.getAttribute('data-code');
				if (code && mentionsPkg(code)) {
					const next = rewrite(code);
					if (next !== code) button.setAttribute('data-code', next);
				}
			});
			document.querySelectorAll<HTMLPreElement>('pre[data-code-raw]').forEach((pre) => {
				const raw = pre.getAttribute('data-code-raw');
				if (raw && mentionsPkg(raw)) {
					const next = rewrite(raw);
					if (next !== raw) pre.setAttribute('data-code-raw', next);
				}
			});

			// 2) Visible text — best effort (works when the token is a single text
			//    node, the common case for install commands and CDN URLs).
			const root = document.querySelector('main') ?? document.body;
			const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
			const targets: Text[] = [];
			while (walker.nextNode()) {
				const node = walker.currentNode as Text;
				if (mentionsPkg(node.nodeValue ?? '')) targets.push(node);
			}
			targets.forEach((node) => {
				node.nodeValue = rewrite(node.nodeValue ?? '');
			});
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	return null;
}
