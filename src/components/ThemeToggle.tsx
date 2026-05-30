'use client';

import { useEffect, useState } from 'react';

// Self-contained theme toggle. next-themes is NOT used: each Astro `client:load`
// island is its own React root, so a <ThemeProvider> in one island never reaches
// this button in another. Instead we own the `dark` class + the `theme` localStorage
// key directly (the no-flash inline script in MarkdownLayout sets the initial state
// from the same key). storageKey 'theme' holds 'light' | 'dark' | 'system'.

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
      <path
        strokeLinecap="round"
        d="M10 5.5v-1M13.182 6.818l.707-.707M14.5 10h1M13.182 13.182l.707.707M10 15.5v-1M6.11 13.889l.708-.707M4.5 10h1M6.11 6.111l.708.707"
      />
    </svg>
  );
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M15.224 11.724a5.5 5.5 0 0 1-6.949-6.949 5.5 5.5 0 1 0 6.949 6.949Z" />
    </svg>
  );
}

function isDark() {
  return document.documentElement.classList.contains('dark');
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(isDark());
  }, []);

  const handleClick = () => {
    const next = !isDark();
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // private mode etc. — class still flips for the session
    }
    setDark(next);
  };

  const label = mounted ? `Switch to ${dark ? 'light' : 'dark'} theme` : 'Toggle theme';

  return (
    <button
      type="button"
      className="flex size-6 cursor-pointer items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
      aria-label={label}
      onClick={handleClick}
      suppressHydrationWarning
    >
      <SunIcon className="h-5 w-5 stroke-zinc-900 dark:hidden" />
      <MoonIcon className="hidden h-5 w-5 stroke-white dark:block" />
    </button>
  );
}
