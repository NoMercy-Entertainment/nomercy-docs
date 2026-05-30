'use client';

import { useEffect } from 'react';

// Replaces the version tag in install / CDN snippets with the ACTUAL latest
// version from the npm registry, at page-visit time. The docs can't hardcode a
// version (it goes stale) and `@beta` may not resolve — so we fetch the real
// `latest` for each package and rewrite both the copy payload (data-code, so
// paste is always correct) and the visible text. Cached per session.

const PACKAGES = [
  '@nomercy-entertainment/nomercy-player-core',
  '@nomercy-entertainment/nomercy-video-player',
  '@nomercy-entertainment/nomercy-music-player',
];

async function latestVersion(pkg: string): Promise<string | null> {
  const cacheKey = `npmver:${pkg}`;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached;
  } catch {
    // sessionStorage blocked — fetch anyway
  }
  try {
    const res = await fetch(`https://registry.npmjs.org/${pkg}/latest`);
    if (!res.ok) return null;
    const data = (await res.json()) as { version?: string };
    if (!data.version) return null;
    try {
      sessionStorage.setItem(cacheKey, data.version);
    } catch {
      // ignore
    }
    return data.version;
  } catch {
    return null;
  }
}

export function VersionInjector() {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const versions: Record<string, string> = {};
      await Promise.all(
        PACKAGES.map(async (pkg) => {
          const version = await latestVersion(pkg);
          if (version) versions[pkg] = version;
        }),
      );
      if (cancelled || Object.keys(versions).length === 0) return;

      // `<pkg>@beta` / `@latest` / `@1.2.3` -> `<pkg>@<real-latest>`
      const rewrite = (text: string): string => {
        let out = text;
        for (const [pkg, version] of Object.entries(versions)) {
          const escaped = pkg.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
          out = out.replace(new RegExp(`(${escaped})@(?:beta|latest|\\d[\\w.-]*)`, 'g'), `$1@${version}`);
        }
        return out;
      };

      const touchesUs = (text: string) => text.includes('@nomercy-entertainment/');

      // 1) Copy payloads — guarantees paste is correct regardless of how the
      //    syntax highlighter split the token across spans.
      document.querySelectorAll<HTMLButtonElement>('button[data-code]').forEach((button) => {
        const code = button.getAttribute('data-code');
        if (code && touchesUs(code)) {
          const next = rewrite(code);
          if (next !== code) button.setAttribute('data-code', next);
        }
      });
      document.querySelectorAll<HTMLPreElement>('pre[data-code-raw]').forEach((pre) => {
        const raw = pre.getAttribute('data-code-raw');
        if (raw && touchesUs(raw)) {
          const next = rewrite(raw);
          if (next !== raw) pre.setAttribute('data-code-raw', next);
        }
      });

      // 2) Visible text — best effort (works when the token is a single text node,
      //    which is the common case for install commands).
      const root = document.querySelector('main') ?? document.body;
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const targets: Text[] = [];
      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const value = node.nodeValue ?? '';
        if (/@nomercy-entertainment\/[\w-]+@(?:beta|latest|\d)/.test(value)) targets.push(node);
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
