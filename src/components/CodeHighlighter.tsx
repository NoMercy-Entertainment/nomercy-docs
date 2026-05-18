'use client';

import { useEffect } from 'react';

/**
 * Client-side hookup for the static copy buttons that the React `CodeGroup`
 * component rendered as SSR HTML. The button text + SVG live in the static
 * tree; only the click → clipboard + ephemeral "Copied" affordance needs JS.
 *
 * No code-block wrapping happens here anymore. Chrome (rounded container,
 * ring, panel header, copy button) is owned by the React `CodeGroup` for
 * MDX pages and was previously double-emitted by this component + an old
 * rehype plugin, which produced visible nested boxes around every code
 * block. Both legacy wrappers are gone; this file only attaches behaviour.
 */
export function CodeHighlighter() {
  useEffect(() => {
    document.querySelectorAll<HTMLButtonElement>('button[data-code]').forEach((button) => {
      if ((button as unknown as { __copyAdded?: boolean }).__copyAdded) return;

      if (!button.hasAttribute('aria-label')) {
        button.setAttribute('aria-label', 'Copy code to clipboard');
      }

      button.addEventListener('click', () => {
        const code = button.getAttribute('data-code');
        if (!code) return;

        navigator.clipboard.writeText(code).catch(() => {});
        button.setAttribute('aria-label', 'Code copied to clipboard');

        const span = button.querySelector('span');
        if (span) {
          const original = span.innerHTML;
          span.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500"><path stroke-width="0" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"></path></svg>Copied';
          window.setTimeout(() => {
            span.innerHTML = original;
            button.setAttribute('aria-label', 'Copy code to clipboard');
          }, 2000);
        }
      });

      (button as unknown as { __copyAdded?: boolean }).__copyAdded = true;
    });
  }, []);

  return null;
}
