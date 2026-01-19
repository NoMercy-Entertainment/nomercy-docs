'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Ensure the class is applied/removed when resolvedTheme changes
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else if (resolvedTheme === 'light') {
      root.classList.remove('dark');
    }
  }, [resolvedTheme, mounted]);

  // Calculate otherTheme based on current resolvedTheme
  // Use a fallback to check DOM if resolvedTheme is not available yet
  const getCurrentTheme = () => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      return resolvedTheme;
    }
    // Fallback to checking DOM
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  };

  const currentTheme = mounted ? getCurrentTheme() : 'light';
  const otherTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const handleClick = () => {
    // Recalculate theme at click time to ensure we have the latest value
    // Check the DOM directly to get the current state
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';

    console.log('ThemeToggle clicked, current:', isCurrentlyDark ? 'dark' : 'light', 'switching to:', nextTheme);

    // Disable transitions temporarily during theme change
    const style = document.createElement('style');
    style.textContent = '* { transition: none !important; }';
    document.head.appendChild(style);

    setTheme(nextTheme);

    // Immediately update the class for instant feedback
    if (nextTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Re-enable transitions after a brief delay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.head.removeChild(style);
      });
    });
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className="flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
        aria-label="Toggle theme"
        disabled
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <SunIcon className="h-5 w-5 stroke-zinc-900 dark:hidden" />
        <MoonIcon className="hidden h-5 w-5 stroke-white dark:block" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 cursor-pointer"
      aria-label={`Switch to ${otherTheme} theme`}
      onClick={handleClick}
      onMouseDown={(e) => e.preventDefault()}
      suppressHydrationWarning
      style={{ pointerEvents: 'auto' }}
    >
      <span className="absolute inset-0 size-12 pointer-fine:hidden" style={{ pointerEvents: 'none' }} />
      <SunIcon className="relative z-10 h-5 w-5 stroke-zinc-900 dark:hidden" style={{ pointerEvents: 'none' }} />
      <MoonIcon className="relative z-10 hidden h-5 w-5 stroke-white dark:block" style={{ pointerEvents: 'none' }} />
    </button>
  );
}
