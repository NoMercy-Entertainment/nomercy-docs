'use client';

import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';

import { t } from '../lib/i18n';

// Read aloud with the browser's own speech engine: no service, no key, and
// the reader's system voices. The page is split into blocks (headings,
// paragraphs, list items, cells) and each block into sentences; one sentence
// is one utterance, because Chrome cuts a long utterance off after about 15
// seconds. Pause is a cancel that remembers the sentence: speechSynthesis
// .pause() is unreliable on Android Chrome.

const BLOCKS = 'h1, h2, h3, h4, p, li, dt, dd, th, td, figcaption';
// A block with one of these inside is read through them instead, so a list
// item that holds a paragraph is not read twice.
const INNER = 'p, h1, h2, h3, h4, dt, dd, figcaption';
const SKIP = 'pre, nav, header, footer, [aria-hidden="true"], [data-read-skip], .sr-only';
// Removed from a block's copy before its text is taken: code blocks, nested
// lists (read as their own items) and controls.
const STRIP = 'pre, ul, ol, table, svg, button, kbd, .sr-only, [aria-hidden="true"]';
const RATES = [0.75, 1, 1.25, 1.5];

type Status = 'idle' | 'playing' | 'paused';

let blocks: HTMLElement[] = [];
let sentences: string[] = [];
let blockIndex = 0;
let sentenceIndex = 0;
// Each speak() takes a new id; an utterance whose end arrives after a cancel
// or a skip carries an old id and is ignored.
let runId = 0;

export function readAloudSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function readRate(): number {
  try {
    const stored = Number(localStorage.getItem('read-aloud-rate'));
    return RATES.includes(stored) ? stored : 1;
  }
  catch {
    return 1;
  }
}

function textOf(element: HTMLElement): string {
  const copy = element.cloneNode(true) as HTMLElement;
  copy.querySelectorAll(STRIP).forEach(node => node.remove());
  return (copy.textContent ?? '').replace(/\s+/g, ' ').trim();
}

function collect(): HTMLElement[] {
  const main = document.getElementById('main-content');
  if (!main) return [];
  return [...main.querySelectorAll<HTMLElement>(BLOCKS)].filter(
    element => !element.closest(SKIP)
      && !element.querySelector(INNER)
      && element.getClientRects().length > 0
      && textOf(element) !== '',
  );
}

function split(text: string): string[] {
  const lang = document.documentElement.lang || 'en';
  if ('Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(lang, { granularity: 'sentence' });
    return [...segmenter.segment(text)].map(part => part.segment.trim()).filter(Boolean);
  }
  return text.match(/[^.!?]+[.!?]*/g)?.map(part => part.trim()).filter(Boolean) ?? [text];
}

function isSection(element: HTMLElement): boolean {
  return element.tagName === 'H1' || element.tagName === 'H2';
}

function mark(element: HTMLElement | undefined): void {
  document.querySelectorAll('[data-reading]').forEach(node => node.removeAttribute('data-reading'));
  if (!element) return;
  element.setAttribute('data-reading', '');
  const rect = element.getBoundingClientRect();
  if (rect.top < 80 || rect.bottom > window.innerHeight - 96) {
    // window.scrollTo, not scrollIntoView: a smooth scrollIntoView left the
    // page where it was (scrollY stayed 0 over six sections) while a smooth
    // window.scrollTo moved it. Centre the block, but never push its first
    // line up under the header when the block is taller than the screen.
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const offset = Math.max(96, (window.innerHeight - rect.height) / 2);
    window.scrollTo({ top: window.scrollY + rect.top - offset, behavior: smooth ? 'smooth' : 'auto' });
  }
}

interface ReadAloudState {
  status: Status;
  rate: number;
  start: () => void;
  toggle: () => void;
  stop: () => void;
  step: (delta: 1 | -1, unit: 'paragraph' | 'section') => void;
  cycleRate: () => void;
}

export const useReadAloud = create<ReadAloudState>()((set, get) => {
  function speak(): void {
    const id = ++runId;
    window.speechSynthesis.cancel();
    const block = blocks[blockIndex];
    if (!block) {
      get().stop();
      return;
    }
    if (sentenceIndex === 0 || sentences.length === 0) sentences = split(textOf(block));
    mark(block);
    const utterance = new SpeechSynthesisUtterance(sentences[sentenceIndex] ?? '');
    utterance.lang = document.documentElement.lang || 'en';
    utterance.rate = get().rate;
    utterance.onend = () => {
      if (id !== runId) return;
      if (sentenceIndex + 1 < sentences.length) {
        sentenceIndex += 1;
      }
      else {
        blockIndex += 1;
        sentenceIndex = 0;
      }
      speak();
    };
    utterance.onerror = (event) => {
      if (id !== runId || event.error === 'interrupted' || event.error === 'canceled') return;
      get().stop();
    };
    window.speechSynthesis.speak(utterance);
  }

  function jumpTo(index: number): void {
    blockIndex = Math.max(0, Math.min(index, blocks.length - 1));
    sentenceIndex = 0;
    sentences = [];
    if (get().status === 'playing') speak();
    else mark(blocks[blockIndex]);
  }

  return {
    status: 'idle',
    rate: 1,
    start: () => {
      if (!readAloudSupported()) return;
      blocks = collect();
      if (blocks.length === 0) return;
      // Start where the reader is looking, not at the top of the page.
      const first = blocks.findIndex(block => block.getBoundingClientRect().bottom > 96);
      blockIndex = Math.max(first, 0);
      sentenceIndex = 0;
      sentences = [];
      set({ status: 'playing', rate: readRate() });
      speak();
    },
    toggle: () => {
      const { status } = get();
      if (status === 'playing') {
        runId += 1;
        window.speechSynthesis.cancel();
        set({ status: 'paused' });
      }
      else if (status === 'paused') {
        set({ status: 'playing' });
        speak();
      }
    },
    stop: () => {
      runId += 1;
      if (readAloudSupported()) window.speechSynthesis.cancel();
      mark(undefined);
      blocks = [];
      sentences = [];
      set({ status: 'idle' });
    },
    step: (delta, unit) => {
      if (unit === 'paragraph') {
        jumpTo(blockIndex + delta);
        return;
      }
      let index = blockIndex + delta;
      while (index > 0 && index < blocks.length && !isSection(blocks[index]!)) index += delta;
      jumpTo(index);
    },
    cycleRate: () => {
      const rate = RATES[(RATES.indexOf(get().rate) + 1) % RATES.length]!;
      try {
        localStorage.setItem('read-aloud-rate', String(rate));
      }
      catch {
        /* the new rate still applies to this visit */
      }
      set({ rate });
      // The rate is fixed per utterance: restart the sentence at the new one.
      if (get().status === 'playing') speak();
    },
  };
});

function Icon({ d, filled = false }: { d: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-[20px] w-[20px]">
      <path
        d={d}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS = {
  prevSection: 'M5 5v10M15 5l-6 5 6 5',
  prevParagraph: 'M13 5l-6 5 6 5',
  nextParagraph: 'M7 5l6 5-6 5',
  nextSection: 'M15 5v10M5 5l6 5-6 5',
  play: 'M7 4.5v11l8.5-5.5z',
  pause: 'M7 5v10M13 5v10',
  stop: 'M5 5l10 10M15 5L5 15',
};

function Control({
  label,
  onClick,
  children,
  primary = false,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  primary?: boolean;
}) {
  // Pixels, not rem: at 150% text a rem-sized bar wrapped to two rows and
  // covered 135px of a phone screen. 44px meets the AAA target size. The
  // icons are not text; the speed label inside stays in rem and still grows
  // with the reader's text size.
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={clsx(
        'flex h-[44px] min-w-[44px] items-center justify-center rounded-full px-[10px] transition',
        primary
          ? 'bg-(--color-accent-soft) text-(--color-accent)'
          : 'text-zinc-700 hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white',
      )}
    >
      {children}
    </button>
  );
}

/**
 * The controls while the page is read aloud. Hidden until a reader starts it
 * from the reading settings; stopping hides it again. Escape stops, and
 * leaving the page stops, so speech never outlives the page it reads.
 *
 * A group, not a toolbar: the toolbar role promises one tab stop with arrow
 * keys between the buttons, and these are plain buttons reached with Tab.
 */
export function ReadAloudBar() {
  const { status, rate, toggle, stop, step, cycleRate } = useReadAloud();
  const group = useRef<HTMLDivElement>(null);
  const shown = status !== 'idle';

  // The popover returns focus to its own button as it closes; after that,
  // move it to Pause so a keyboard reader lands on the controls they just
  // opened instead of hunting for a bar at the bottom of the page.
  useEffect(() => {
    if (!shown) return;
    const timer = window.setTimeout(() => {
      group.current?.querySelectorAll('button')[2]?.focus({ preventScroll: true });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [shown]);

  useEffect(() => {
    if (status === 'idle') return;
    // Escape stops reading only when nothing else owns it: focus in the bar
    // or on the page itself. Escape in the settings popover or the search
    // dialog closes those and leaves the voice running.
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const active = document.activeElement;
      if (active === document.body || active === null || group.current?.contains(active)) stop();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pagehide', stop);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pagehide', stop);
    };
  }, [status, stop]);

  if (status === 'idle') return null;

  const playing = status === 'playing';
  return (
    <div
      ref={group}
      role="group"
      aria-label={t('readAloud.controls')}
      className={clsx(
        'fixed inset-x-0 z-50 mx-auto flex w-fit max-w-[calc(100vw-1rem)] flex-wrap items-center justify-center gap-0.5 rounded-full bg-white p-1 shadow-lg ring-1 ring-zinc-900/7.5 dark:bg-zinc-800 dark:ring-white/10',
        'bottom-[max(1rem,env(safe-area-inset-bottom))]',
      )}
    >
      <Control label={t('readAloud.prevSection')} onClick={() => step(-1, 'section')}>
        <Icon d={ICONS.prevSection} />
      </Control>
      <Control label={t('readAloud.prevParagraph')} onClick={() => step(-1, 'paragraph')}>
        <Icon d={ICONS.prevParagraph} />
      </Control>
      <Control label={playing ? t('readAloud.pause') : t('readAloud.play')} onClick={toggle} primary>
        <Icon d={playing ? ICONS.pause : ICONS.play} filled={!playing} />
      </Control>
      <Control label={t('readAloud.nextParagraph')} onClick={() => step(1, 'paragraph')}>
        <Icon d={ICONS.nextParagraph} />
      </Control>
      <Control label={t('readAloud.nextSection')} onClick={() => step(1, 'section')}>
        <Icon d={ICONS.nextSection} />
      </Control>
      <Control label={t('readAloud.speed', { rate: `${rate}×` })} onClick={cycleRate}>
        <span className="text-sm/5 font-medium tabular-nums">{`${rate}×`}</span>
      </Control>
      <Control label={t('readAloud.stop')} onClick={stop}>
        <Icon d={ICONS.stop} />
      </Control>
    </div>
  );
}
