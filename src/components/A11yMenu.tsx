'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Reading settings, owned the same way ThemeToggle owns `theme`: each Astro
// island is its own React root, so a provider in one never reaches a button in
// another. Every setting is one attribute on <html> plus one localStorage key,
// and the no-flash script in MarkdownLayout applies them before first paint.

type Option = { value: string; label: string; hint?: string };

const FONTS: Option[] = [
  { value: 'system', label: 'System', hint: 'The site default' },
  { value: 'hyperlegible', label: 'Hyperlegible', hint: 'Letters shaped to be told apart' },
  { value: 'lexend', label: 'Lexend', hint: 'Wider spacing, reduced crowding' },
  { value: 'mono', label: 'Monospace', hint: 'Even letter widths throughout' },
];

const THEMES: Option[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

// Each entry is a matched pair: the light theme and the dark theme are chosen
// together so a reader who switches mode keeps the same palette rather than
// landing on colors that were never checked against that background.
const SYNTAX: Option[] = [
  { value: 'vitesse', label: 'Vitesse', hint: 'Vitesse Light / Vitesse Dark' },
  { value: 'one', label: 'One', hint: 'One Light / One Dark Pro' },
  { value: 'github', label: 'GitHub', hint: 'GitHub Light / GitHub Dark' },
  { value: 'contrast', label: 'High contrast', hint: 'GitHub high contrast, light and dark' },
];

function read(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
  }
  catch {
    return fallback;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  }
  catch {
    /* private browsing, quota, blocked storage — the attribute still applies */
  }
}

function applyTheme(value: string): void {
  const root = document.documentElement;
  const dark = value === 'dark'
    || (value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.classList.toggle('dark', dark);
  write('theme', value);
}

function Group({
  label,
  options,
  value,
  onChange,
  row = false,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (next: string) => void;
  row?: boolean;
}) {
  return (
    <fieldset className="px-2 pb-2">
      <legend className="block px-1.5 pt-3.5 pb-2 text-[11px]/4 font-semibold tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
        {label}
      </legend>
      <div className={clsx('gap-0.5', row ? 'grid grid-cols-3' : 'flex flex-col')}>
        {options.map(option => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            title={option.hint}
            className={clsx(
              'rounded-md px-1.5 py-1 text-sm/5 transition',
              row ? 'text-center' : 'text-left',
              value === option.value
                ? 'bg-(--color-accent-soft) text-(--color-accent)'
                : 'text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/5',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Toggle({
  label,
  hint,
  on,
  onChange,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="px-2 py-2.5">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        title={hint}
        onClick={() => onChange(!on)}
        className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1 text-left transition hover:bg-zinc-50 dark:hover:bg-white/5"
      >
        <span
          aria-hidden="true"
          className={clsx(
            'h-5 w-9 shrink-0 rounded-full p-0.5 transition',
            on ? 'bg-(--color-accent)' : 'bg-zinc-300 dark:bg-zinc-600',
          )}
        >
          <span
            className={clsx(
              'block h-4 w-4 rounded-full bg-white transition',
              on && 'translate-x-4',
            )}
          />
        </span>
        <span className="text-sm/5 text-zinc-700 dark:text-zinc-300">{label}</span>
      </button>
    </div>
  );
}

/**
 * Holds the page still while the panel is open. An open Popover re-anchors on
 * every scroll frame and visibly lags a fast wheel, the way the package-manager
 * Menu never does because it closes instead. `scrollbar-gutter: stable` on the
 * root means removing the scrollbar shifts nothing.
 */
function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [locked]);
}

function Panel({ open, children }: { open: boolean; children: React.ReactNode }) {
  useScrollLock(open);
  return (
    <PopoverPanel
      anchor="bottom end"
      className="z-50 max-h-[80vh] w-60 divide-y divide-zinc-900/5 overflow-y-auto rounded-xl bg-white py-0.5 shadow-lg ring-1 ring-zinc-900/7.5 [--anchor-gap:0.75rem] dark:divide-white/5 dark:bg-zinc-800 dark:ring-white/10"
    >
      {children}
    </PopoverPanel>
  );
}

export function A11yMenu() {
  const [mounted, setMounted] = useState(false);
  const [font, setFont] = useState('system');
  const [theme, setTheme] = useState('system');
  const [syntax, setSyntax] = useState('vitesse');
  const [inline, setInline] = useState(true);

  useEffect(() => {
    setFont(read('reading-font', 'system'));
    setTheme(read('theme', 'system'));
    setSyntax(read('syntax-theme', 'vitesse'));
    setInline(read('inline-syntax', 'on') !== 'off');
    setMounted(true);
  }, []);

  const set = (
    key: string,
    attribute: string,
    value: string,
    apply: (next: string) => void,
  ): void => {
    apply(value);
    document.documentElement.setAttribute(attribute, value);
    write(key, value);
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
      <PopoverButton
        className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        aria-label="Reading settings"
      >
        {/* The universal accessibility symbol: a figure with its arms out,
            inside a ring. Readers look for this shape rather than for a gear. */}
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
          <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="5.85" r="1.3" fill="currentColor" />
          <path
            d="M5.6 8.5h8.8M10 8.9v3.3M10 12.2l-1.7 3.6M10 12.2l1.7 3.6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </PopoverButton>
      <Panel open={open}>
        {mounted && (
          <>
            <Group
              label="Text"
              options={FONTS}
              value={font}
              onChange={next => set('reading-font', 'data-font', next, setFont)}
            />
            <Group
              label="Appearance"
              options={THEMES}
              row
              value={theme}
              onChange={(next) => {
                setTheme(next);
                applyTheme(next);
              }}
            />
            <Group
              label="Syntax colors"
              options={SYNTAX}
              value={syntax}
              onChange={next => set('syntax-theme', 'data-syntax', next, setSyntax)}
            />
            <Toggle
              label="Color code inside sentences"
              hint="Off leaves inline code in the body text color"
              on={inline}
              onChange={(next) => {
                setInline(next);
                const value = next ? 'on' : 'off';
                document.documentElement.setAttribute('data-inline-syntax', value);
                write('inline-syntax', value);
              }}
            />
          </>
        )}
      </Panel>
        </>
      )}
    </Popover>
  );
}
