'use client';

import { useEffect } from 'react';

export function CodeHighlighter() {
  useEffect(() => {
    // Process all pre elements
    const preElements = document.querySelectorAll('pre[data-highlighted]');
    
    preElements.forEach((preElement) => {
      const highlightedHtml = preElement.getAttribute('data-highlighted');
      const codeElement = preElement.querySelector('code');
      
      // Apply syntax highlighting
      if (highlightedHtml && codeElement) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = highlightedHtml;
        codeElement.innerHTML = textarea.value;
        preElement.removeAttribute('data-highlighted');
        preElement.removeAttribute('annotation');
        preElement.removeAttribute('language');
        preElement.removeAttribute('code');
      }
      
      // Wrap standalone pre elements
      const isWrapped = preElement.closest('.my-6.overflow-hidden.rounded-2xl') || 
                       preElement.closest('[data-tab-content]');
      
      if (!isWrapped) {
        const title = preElement.getAttribute('data-title');
        const code = preElement.textContent || '';
        
        const wrapper = document.createElement('div');
        wrapper.className = 'my-6 overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 shadow-md dark:bg-zinc-900 dark:ring-white/10';
        wrapper.style.opacity = '1';
        
        const notProseDiv = document.createElement('div');
        notProseDiv.className = 'not-prose';
        
        if (title) {
          const titleDiv = document.createElement('div');
          titleDiv.className = 'flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-transparent';
          const titleH3 = document.createElement('h3');
          titleH3.className = 'mr-auto pt-3 text-xs font-semibold text-zinc-700 dark:text-white';
          titleH3.textContent = title;
          titleDiv.appendChild(titleH3);
          notProseDiv.appendChild(titleDiv);
        }
        
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group dark:bg-white/2.5';
        const relativeDiv = document.createElement('div');
        relativeDiv.className = 'relative';
        const contentDiv = document.createElement('div');
        contentDiv.className = '[&>pre]:!m-0 [&>pre]:!border-0';
        
        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');
        copyButton.className = 'group/button absolute top-3.5 right-4 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-emerald-500 bg-zinc-900/5 hover:bg-zinc-900/10 dark:bg-white/5 dark:hover:bg-white/10';
        copyButton.innerHTML = '<span aria-hidden="true" class="pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300"><svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400"><path stroke-width="0" d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"></path></svg>Copy</span><span role="status" aria-live="polite" class="sr-only" data-copy-status></span>';

        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(code);
          copyButton.setAttribute('aria-label', 'Code copied to clipboard');
          const span = copyButton.querySelector('span:not([data-copy-status])');
          const status = copyButton.querySelector('[data-copy-status]');
          if (span && status) {
            const orig = span.innerHTML;
            span.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500"><path stroke-width="0" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16 Z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"></path></svg>Copied';
            status.textContent = 'Code copied to clipboard';
            setTimeout(() => {
              span.innerHTML = orig;
              status.textContent = '';
              copyButton.setAttribute('aria-label', 'Copy code to clipboard');
            }, 2000);
          }
        });
        
        const preClone = preElement.cloneNode(true) as HTMLElement;
        contentDiv.appendChild(preClone);
        relativeDiv.appendChild(contentDiv);
        relativeDiv.appendChild(copyButton);
        groupDiv.appendChild(relativeDiv);
        notProseDiv.appendChild(groupDiv);
        wrapper.appendChild(notProseDiv);
        
        preElement.parentNode?.replaceChild(wrapper, preElement);
      }
    });

    // Add copy functionality to existing copy buttons
    document.querySelectorAll('button[data-code]').forEach((button) => {
      if (!(button as any).__copyAdded) {
        if (!button.hasAttribute('aria-label')) {
          button.setAttribute('aria-label', 'Copy code to clipboard');
        }
        button.addEventListener('click', () => {
          const code = button.getAttribute('data-code');
          if (code) {
            navigator.clipboard.writeText(code);
            button.setAttribute('aria-label', 'Code copied to clipboard');
            const span = button.querySelector('span');
            if (span) {
              const orig = span.innerHTML;
              span.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true" class="h-5 w-5 fill-zinc-500/20 stroke-zinc-500"><path stroke-width="0" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" d="m6.75 10.813 2.438 2.437c1.218-4.469 4.062-6.5 4.062-6.5"></path></svg>Copied';
              setTimeout(() => {
                span.innerHTML = orig;
                button.setAttribute('aria-label', 'Copy code to clipboard');
              }, 2000);
            }
          }
        });
        (button as any).__copyAdded = true;
      }
    });
  }, []);

  return null;
}
