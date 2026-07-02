// -----------------------------------------------------------------------------
//  Copyright (c) NoMercy Entertainment
//
//  Licensed under the Apache License, Version 2.0. See LICENSE for details.
//
//  SPDX-License-Identifier: Apache-2.0
// -----------------------------------------------------------------------------

'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { t } from '@/lib/i18n';

type VideoPlayer = import('@nomercy-entertainment/nomercy-video-player').IVideoPlayer;
type MusicPlayer = import('@nomercy-entertainment/nomercy-music-player').IMusicPlayer;
type AnyPlayer = VideoPlayer | MusicPlayer;

type SnippetModule = {
  mountId?: string;
  /**
   * Which trio package this snippet mounts and previews live. Defaults to
   * `'video'` — every pre-existing snippet (none of which set this field)
   * keeps mounting `nomercy-video-player` exactly as before.
   */
  player?: 'video' | 'music';
  config:
    | import('@nomercy-entertainment/nomercy-video-player').VideoPlayerConfig
    | import('@nomercy-entertainment/nomercy-music-player').MusicPlayerConfig;
  /**
   * Optional pre-setup hook — called on the freshly-constructed instance
   * before `setup(config)` runs. The only place `addPlugin()` is valid
   * (registering after `setup()` misses the plugin's `use()` call during the
   * pipeline), so a "Build a Player" step that needs a plugin (e.g.
   * `SubtitleOverlayPlugin`) registers it here.
   */
  configure?: (player: AnyPlayer) => void;
  /**
   * Optional post-setup hook for "Build a Player" steps that construct a real
   * DOM overlay against the live instance (a button, a scrubber, ...) instead
   * of just supplying a config. Called once, synchronously, right after
   * `setup()` — the same moment a consumer's own app would start building UI
   * against the returned player. Return a cleanup function to tear down
   * whatever it added; every config-only snippet omits this and behaves
   * exactly as before.
   */
  onReady?: (player: AnyPlayer, container: HTMLElement) => void | (() => void);
};

type Status = 'loading' | 'ready' | 'error';

interface PlayerExampleProps {
  /** Basename (no extension) of a module under `src/examples/` — dynamically imported at mount. */
  snippet: string;
}

/**
 * Live player island for docs snippets. Both the player package and the
 * named example config are dynamically imported at mount so the HLS-carrying
 * player bundle never ships on a page that doesn't render one.
 */
export function PlayerExample({ snippet }: PlayerExampleProps) {
  const generatedId = useId().replace(/:/g, '');
  const containerId = `player-example-${generatedId}`;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let player: AnyPlayer | null = null;
    let cleanupOnReady: (() => void) | undefined;

    async function mount(): Promise<void> {
      try {
        // The target package isn't known until the snippet's own config is
        // read (`player: 'video' | 'music'`), so it can't join the snippet
        // import in one Promise.all the way the single-package version did.
        // Net effect is still a bundle-size win over eagerly loading both:
        // exactly one of the two heavy player packages ships per page.
        const snippetModule = await import(`../examples/${snippet}.ts`);
        if (cancelled) return;

        const { config, mountId, configure, onReady, player: playerKind }: SnippetModule = snippetModule.default;
        const kind = playerKind ?? 'video';
        const el = containerRef.current;
        if (!el) return;

        // Snippets normally mount into the id this component generates and
        // already rendered; `mountId` is an escape hatch for a snippet that
        // targets a specific element elsewhere on the page.
        const targetId = mountId ?? containerId;
        if (el.id !== targetId) el.id = targetId;

        // `title` (video) and `name` (music) are each library's canonical
        // display field. `BasePlaylistItem.title` is optional on both shapes,
        // so this one fallback chain covers either without branching on `kind`.
        const firstItem = Array.isArray(config.playlist) ? config.playlist[0] : undefined;
        const firstTitle = (firstItem as { title?: string; name?: string } | undefined)?.title
          ?? (firstItem as { title?: string; name?: string } | undefined)?.name;
        setLabel(
          firstTitle
            ? t('player.example.regionLabelNamed', { title: firstTitle })
            : t('player.example.regionLabel'),
        );

        if (kind === 'music') {
          const playerModule = await import('@nomercy-entertainment/nomercy-music-player');
          const built = playerModule.default(targetId);
          configure?.(built);
          const instance = built.setup(
            config as import('@nomercy-entertainment/nomercy-music-player').MusicPlayerConfig,
          );
          player = instance;
          cleanupOnReady = onReady?.(instance, el) ?? undefined;

          // Music has no consumer-facing `canplay` — that event is video-only
          // (see `IVideoPlayer`). `firstFrame` is the medium-neutral kit event
          // both packages emit once the backend can actually play, the true
          // readiness signal for an audio-only preview.
          instance.on('firstFrame', () => {
            if (!cancelled) setStatus('ready');
          });
        } else {
          const playerModule = await import('@nomercy-entertainment/nomercy-video-player');
          const built = playerModule.default(targetId);
          configure?.(built);
          const instance = built.setup(
            config as import('@nomercy-entertainment/nomercy-video-player').VideoPlayerConfig,
          );
          player = instance;
          cleanupOnReady = onReady?.(instance, el) ?? undefined;

          // `canplay` (not `ready`) is the proof the media itself loaded —
          // `ready` fires once the setup pipeline settles, before the first
          // segment request, so treating it as "ready" here could flip the
          // flag before the stream is confirmed playable.
          instance.on('canplay', () => {
            if (!cancelled) setStatus('ready');
          });
        }

        const activeInstance = player;
        if (!activeInstance) return;

        activeInstance.on('error', (payload) => {
          if (!cancelled) {
            setStatus('error');
            setErrorMessage(payload.error.message);
          }
        });

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
          activeInstance.once('playing', () => {
            void activeInstance.pause();
          });
        }
      } catch (err) {
        if (!cancelled) {
          setStatus('error');
          setErrorMessage(err instanceof Error ? err.message : String(err));
        }
      }
    }

    void mount();

    return () => {
      cancelled = true;
      cleanupOnReady?.();
      player?.dispose();
    };
  }, [snippet, containerId]);

  return (
    <div
      data-player-example={snippet}
      className="not-prose my-6 overflow-hidden rounded-2xl bg-black ring-1 ring-zinc-900/10 dark:ring-white/10"
    >
      <div
        ref={containerRef}
        id={containerId}
        role="region"
        aria-label={label ?? t('player.example.regionLabel')}
        data-player-ready={status === 'ready' ? 'true' : undefined}
        data-player-error={errorMessage ?? undefined}
        className="aspect-video w-full"
      />
      <p role="status" aria-live="polite" className="sr-only">
        {status === 'loading' && t('player.example.statusLoading')}
        {status === 'ready' && t('player.example.statusReady')}
        {status === 'error' && t('player.example.statusError', { message: errorMessage ?? '' })}
      </p>
    </div>
  );
}
