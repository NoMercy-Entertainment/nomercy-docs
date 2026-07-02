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

type SnippetModule = {
  mountId?: string;
  config: import('@nomercy-entertainment/nomercy-video-player').VideoPlayerConfig;
};

type VideoPlayer = import('@nomercy-entertainment/nomercy-video-player').IVideoPlayer;

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
    let player: VideoPlayer | null = null;

    async function mount(): Promise<void> {
      try {
        const [snippetModule, playerModule] = await Promise.all([
          import(`../examples/${snippet}.ts`),
          import('@nomercy-entertainment/nomercy-video-player'),
        ]);
        if (cancelled) return;

        const { config, mountId }: SnippetModule = snippetModule.default;
        const el = containerRef.current;
        if (!el) return;

        // Snippets normally mount into the id this component generates and
        // already rendered; `mountId` is an escape hatch for a snippet that
        // targets a specific element elsewhere on the page.
        const targetId = mountId ?? containerId;
        if (el.id !== targetId) el.id = targetId;

        const firstTitle = Array.isArray(config.playlist) ? config.playlist[0]?.title : undefined;
        setLabel(
          firstTitle
            ? t('player.example.regionLabelNamed', { title: firstTitle })
            : t('player.example.regionLabel'),
        );

        const instance = playerModule.default(targetId).setup(config);
        player = instance;

        // `canplay` (not `ready`) is the proof the media itself loaded —
        // `ready` fires once the setup pipeline settles, before the first
        // segment request, so treating it as "ready" here could flip the
        // flag before the stream is confirmed playable.
        instance.on('canplay', () => {
          if (!cancelled) setStatus('ready');
        });

        instance.on('error', (payload) => {
          if (!cancelled) {
            setStatus('error');
            setErrorMessage(payload.error.message);
          }
        });

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
          instance.once('playing', () => {
            void instance.pause();
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
      player?.dispose();
    };
  }, [snippet, containerId]);

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl bg-black ring-1 ring-zinc-900/10 dark:ring-white/10">
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
