'use client';

import { useEffect } from 'react';

// Replaces the version tag in install / CDN snippets for OUR packages with the
// ACTUAL latest version pulled live from the npm registry at page-visit time,
// so the docs never show a stale or invented version for code we publish.
// Third-party dependencies (hls.js) are NOT touched here — they are pinned in
// the source to the exact version the player is built and tested against. A
// "newest in range" value would not be a value we have verified, so we never
// float it. Rewrites the copy payload (data-code, so paste is always correct)
// and the visible text. Cached per session.

const PACKAGES = [
  '@nomercy-entertainment/nomercy-player-core',
  '@nomercy-entertainment/nomercy-video-player',
  '@nomercy-entertainment/nomercy-music-player',
];

async function fetchVersion(pkg: string): Promise<string | null> {
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`);
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    return data.version ?? null;
  } catch {
    return null;
  }
}

async function resolveVersion(pkg: string): Promise<string | null> {
  const cacheKey = `npmver:${pkg}`;
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

      // `<pkg>@beta` / `@latest` / `@1.2.3` -> `<pkg>@<resolved>`
      const rewrite = (text: string): string => {
        let out = text;
        for (const [pkg, version] of Object.entries(versions)) {
          const escaped = pkg.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
          out = out.replace(new RegExp(`(${escaped})@(?:beta|latest|\\d[\\w.-]*)`, 'g'), `$1@${version}`);
        }
        return out;
      };

      const mentionsPkg = (text: string): boolean =>
        Object.keys(versions).some(pkg => text.includes(`${pkg}@`));

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
