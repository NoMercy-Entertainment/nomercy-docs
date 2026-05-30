'use client';

import { useEffect, useState } from 'react';

// Toggles distraction-free reading. Owns the `reader` class on <html> and the
// `reader-mode` localStorage key directly (same island-safe pattern as the theme
// toggle); the no-flash inline script applies it on load. CSS in global.css does
// the rest (hides the sidebar, widens + centres the article).

function BookIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 5.5C8.7 4.6 7 4.2 4.8 4.2c-.4 0-.8.3-.8.7v8.6c0 .4.4.7.8.7 2.2 0 3.9.4 5.2 1.3 1.3-.9 3-1.3 5.2-1.3.4 0 .8-.3.8-.7V4.9c0-.4-.4-.7-.8-.7-2.2 0-3.9.4-5.2 1.3Zm0 0v9.8" />
    </svg>
  );
}

function isReader() {
  return document.documentElement.classList.contains('reader');
}

export function ReaderToggle() {
  const [mounted, setMounted] = useState(false);
  const [reader, setReader] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReader(isReader());
  }, []);

  const handleClick = () => {
    const next = !isReader();
    document.documentElement.classList.toggle('reader', next);
    try {
      localStorage.setItem('reader-mode', next ? '1' : '0');
    } catch {
      // private mode — still toggles for the session
    }
    setReader(next);
  };

  const label = mounted
    ? reader ? 'Exit reader mode' : 'Enter reader mode'
    : 'Toggle reader mode';

  return (
    <button
      type="button"
      className={
        'flex size-6 cursor-pointer items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 ' +
        (reader ? 'text-emerald-600 dark:text-emerald-400' : 'text-zinc-900 dark:text-white')
      }
      aria-label={label}
      aria-pressed={mounted ? reader : undefined}
      title={label}
      onClick={handleClick}
      suppressHydrationWarning
    >
      <BookIcon className="h-5 w-5" />
    </button>
  );
}
