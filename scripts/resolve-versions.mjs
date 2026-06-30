// Resolves the newest published version for OUR packages from npm — INCLUDING
// the v2 `rc` line — and writes it to src/data/versions.json. The build reads
// that file (via the remark-version-tags plugin) so install / CDN snippets ship
// the real version baked into the static HTML, instead of depending on the
// visitor's browser reaching npm at page-load. Mirrors the resolution logic in
// VersionInjector.tsx so build-time and client-time agree.
//
// We take the highest semver across the dist-tags (NOT the `latest` tag, which
// still points at the v1 line for the players), so the current v2 rc surfaces.
// Never throws: on a network failure we keep whatever versions.json already has
// so a flaky registry can never fail or regress the build.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const PACKAGES = [
	'@nomercy-entertainment/nomercy-player-core',
	'@nomercy-entertainment/nomercy-video-player',
	'@nomercy-entertainment/nomercy-music-player',
];

// >0 if a is newer, <0 if b is newer, 0 if equal. Handles prerelease ordering
// (rc.19 > rc.2; a release outranks any prerelease of the same core).
export function compareSemver(a, b) {
	const parse = (v) => {
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

async function fetchVersion(pkg) {
	const res = await fetch(`https://registry.npmjs.org/-/package/${pkg.replace('/', '%2F')}/dist-tags`);
	if (!res.ok) throw new Error(`npm ${res.status}`);
	const tags = await res.json();
	const values = Object.values(tags).filter(Boolean);
	if (values.length === 0) throw new Error('no dist-tags');
	return values.reduce((best, v) => (compareSemver(v, best) > 0 ? v : best));
}

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/versions.json');

export async function resolveVersions() {
	let versions = {};
	try {
		versions = JSON.parse(readFileSync(OUT, 'utf8'));
	} catch {
		// no cache yet
	}
	await Promise.all(
		PACKAGES.map(async (pkg) => {
			try {
				const v = await fetchVersion(pkg);
				if (v) versions[pkg] = v;
			} catch (err) {
				console.warn(`[resolve-versions] keeping cached ${pkg}: ${err.message}`);
			}
		}),
	);
	try {
		mkdirSync(dirname(OUT), { recursive: true });
	} catch {
		// dir exists
	}
	writeFileSync(OUT, JSON.stringify(versions, null, 2) + '\n');
	return versions;
}

// Allow running standalone: `node scripts/resolve-versions.mjs`
if (import.meta.url === `file://${process.argv[1]}`) {
	resolveVersions().then((v) => console.log(JSON.stringify(v, null, 2)));
}
