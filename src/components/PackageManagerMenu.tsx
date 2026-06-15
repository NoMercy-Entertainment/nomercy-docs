'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Header control for the package manager. The rewrite engine lives in the
// global PackageManagerSwitcher script: it listens for clicks on any
// [data-pm-value] element, persists the `docs-pm` key, rewrites every
// npm/npx command on the page, and dispatches `pm:change`. This component is
// only the trigger and menu; the menu items carry data-pm-value so the engine
// drives them, and the trigger label follows the engine via the event.

const MANAGERS = ['npm', 'yarn', 'pnpm', 'bun'] as const;
type Manager = (typeof MANAGERS)[number];

function ChevronIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PackageManagerMenu() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState<Manager>('npm');

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('docs-pm') as Manager | null;
      if (stored && MANAGERS.includes(stored)) {
        setCurrent(stored);
      }
    } catch {
      // private mode etc. — falls back to npm
    }

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail as Manager;
      if (detail && MANAGERS.includes(detail)) {
        setCurrent(detail);
      }
    };
    document.addEventListener('pm:change', onChange);
    return () => document.removeEventListener('pm:change', onChange);
  }, []);

  const select = (manager: Manager) => {
    setCurrent(manager);
    // The engine's document-level click handler also fires on this click
    // (the button carries data-pm-value), persisting and rewriting. Setting
    // localStorage here too keeps the trigger correct even if that handler
    // has not attached yet.
    try {
      localStorage.setItem('docs-pm', manager);
    } catch {
      // ignore
    }
  };

  const triggerClassName =
    'flex h-6 cursor-pointer items-center gap-1 rounded-md px-1.5 font-mono text-2xs text-zinc-600 transition hover:bg-zinc-900/5 dark:text-zinc-400 dark:hover:bg-white/5';

  // Render a static trigger server-side and until hydration. Headless UI's
  // anchored Menu runs positioning hooks that are client-only, so mounting it
  // straight away triggers SSR hook warnings in dev. Gating on `mounted` keeps
  // the markup stable and defers the interactive menu to the client.
  if (!mounted) {
    return (
      <div className="relative">
        <button type="button" className={triggerClassName} aria-label="Select package manager">
          npm
          <ChevronIcon className="h-3 w-3 stroke-zinc-400" />
        </button>
      </div>
    );
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className={triggerClassName} aria-label="Select package manager">
        {current}
        <ChevronIcon className="h-3 w-3 stroke-zinc-400" />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-50 w-28 rounded-lg bg-white p-1 shadow-lg ring-1 ring-zinc-900/5 [--anchor-gap:0.5rem] focus:outline-none dark:bg-zinc-800 dark:ring-white/10"
      >
        {MANAGERS.map((manager) => (
          <MenuItem key={manager}>
            <button
              type="button"
              data-pm-value={manager}
              onClick={() => select(manager)}
              className={clsx(
                'flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 font-mono text-2xs transition data-focus:bg-zinc-900/5 dark:data-focus:bg-white/5',
                manager === current
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-700 dark:text-zinc-300',
              )}
            >
              {manager}
              {manager === current && (
                <span aria-hidden="true" className="text-emerald-500">
                  &#10003;
                </span>
              )}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
