'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { useIsInsideMobileNavigation } from './MobileNavigation';
import { useSectionStore, type Section } from './SectionProvider';
import { Tag } from './protocol/Tag';
import { remToPx } from '@/lib/remToPx';
import { CloseButton } from '@headlessui/react';

// Simple Link component to replace next/link
const Link = ({ href, className, children, ...props }: { href: string; className?: string; children: React.ReactNode; } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

// Hook to get current pathname (client-side only)
// Uses initialPathname from server to prevent flash of wrong content
function usePathname(initialPathname?: string) {
  const [pathname, setPathname] = useState(() => {
    // Use initial pathname if provided (from server)
    if (initialPathname) return initialPathname;
    // Try to get from window if available (client-side)
    if (typeof window !== 'undefined') return window.location.pathname;
    return '/';
  });

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
}

// Navigation types
interface NavLink {
  title: string;
  href: string;
  order?: number;
}

interface NavGroup {
  title: string;
  links: NavLink[];
  order?: number;
}

interface NavSection {
  title: string;
  href: string;
  groups: NavGroup[];
  order?: number;
}

function useInitialValue<T>(value: T, condition = true) {
  let initialValue = useRef(value).current;
  return condition ? initialValue : value;
}

function TopLevelNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li className="md:hidden">
      <CloseButton
        as={Link}
        href={href}
        className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </CloseButton>
    </li>
  );
}

function NavLinkItem({
  href,
  children,
  tag,
  active = false,
  isAnchorLink = false,
}: {
  href: string;
  children: React.ReactNode;
  tag?: string;
  active?: boolean;
  isAnchorLink?: boolean;
}) {
  // Scroll the active page link into view inside the sidebar on mount.
  // Without this, deep pages in long sections can have their nav entry
  // far off-screen when the sidebar first renders. Only scroll on the
  // top-level active link AND anchor sub-link both scroll the sidebar to
  // follow. Smooth scroll for anchor changes (gentle while reading), instant
  // for page navigation.
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (active && ref.current) {
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const sidebar = el.closest('[data-sidebar-scroll], aside, nav') as HTMLElement | null;
      const containerRect = sidebar?.getBoundingClientRect();
      const inView = containerRect
        ? rect.top >= containerRect.top && rect.bottom <= containerRect.bottom
        : rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!inView) {
        el.scrollIntoView({
          block: 'center',
          behavior: isAnchorLink ? 'smooth' : 'auto',
        });
      }
    }
  }, [active, isAnchorLink]);

  return (
    <CloseButton
      as={Link}
      ref={ref}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'flex justify-between gap-2 py-1 pr-3 text-sm transition',
        isAnchorLink ? 'pl-7' : 'pl-4',
        active
          ? isAnchorLink
            ? 'text-emerald-600 dark:text-emerald-400 font-medium'
            : 'text-zinc-900 dark:text-white'
          : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
      )}
    >
      <span className="truncate">{children}</span>
      {tag && (
        <Tag variant="small" color="zinc">
          {tag}
        </Tag>
      )}
    </CloseButton>
  );
}

// Sub-item active-on-scroll: subscribes to visibleSections from the
// SectionProvider so the currently-most-visible h2 in the article gets
// the active style. Kept as a child component so the subscription only
// fires when the parent page is the active nav link.
function AnchorSectionList({
  link,
  sections,
}: {
  link: NavLink;
  sections: Array<Section>;
}) {
  const visibleSections = useSectionStore((state) => state.visibleSections);
  // SectionProvider puts the active section (last heading scrolled past or
  // the first heading if none scrolled past yet) at index 0 — back to the
  // original convention.
  const activeSection = visibleSections[0];

  return (
    <motion.ul
      role="list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
    >
      {sections.map((section) => (
        <li key={section.id}>
          <NavLinkItem
            href={`${link.href}#${section.id}`}
            tag={section.tag}
            isAnchorLink
            active={section.id === activeSection}
          >
            {section.title}
          </NavLinkItem>
        </li>
      ))}
    </motion.ul>
  );
}

function VisibleSectionHighlight({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  let [sections, visibleSections] = useInitialValue(
    [
      useSectionStore((s) => s.sections),
      useSectionStore((s) => s.visibleSections),
    ],
    useIsInsideMobileNavigation(),
  );

  let isPresent = useIsPresent();
  let firstVisibleSectionIndex = Math.max(
    0,
    [{ id: '_top' }, ...sections].findIndex(
      (section) => section.id === visibleSections[0],
    ),
  );
  let itemHeight = remToPx(2);
  let height = isPresent
    ? Math.max(1, visibleSections.length) * itemHeight
    : itemHeight;
  let top =
    group.links.findIndex((link) => link.href === pathname) * itemHeight +
    firstVisibleSectionIndex * itemHeight;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
      style={{ borderRadius: 8, height, top }}
    />
  );
}

function ActivePageMarker({
  group,
  pathname,
}: {
  group: NavGroup;
  pathname: string;
}) {
  let itemHeight = remToPx(2);
  let offset = remToPx(0.25);
  let activePageIndex = group.links.findIndex((link) => link.href === pathname);
  let top = offset + activePageIndex * itemHeight;

  return (
    <motion.div
      layout
      className="absolute left-2 h-6 w-px bg-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.2 } }}
      exit={{ opacity: 0 }}
      style={{ top }}
    />
  );
}

function NavigationGroup({
  group,
  className,
}: {
  group: NavGroup;
  className?: string;
}) {
  // If this is the mobile navigation then we always render the initial
  // state, so that the state does not change during the close animation.
  // The state will still update when we re-open (re-render) the navigation.
  let isInsideMobileNavigation = useIsInsideMobileNavigation();
  let [pathname, sections] = useInitialValue(
    [usePathname(), useSectionStore((s) => s.sections)],
    isInsideMobileNavigation,
  );

  let isActiveGroup =
    group.links.findIndex((link) => link.href === pathname) !== -1;

  // Auto-open the group that contains the current page; otherwise honour the
  // user's per-group toggle (persisted in sessionStorage so collapses survive
  // page navigation within the same browsing session). Active group ignores
  // the stored collapse so the reader never lands on a hidden current page.
  const storageKey = `docs-nav-group:${group.title}`;
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isActiveGroup) {
      setIsCollapsed(false);
      return;
    }
    try {
      setIsCollapsed(sessionStorage.getItem(storageKey) === '1');
    } catch {
      // ignore — privacy modes, etc.
    }
  }, [isActiveGroup, storageKey]);

  const toggle = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(storageKey, next ? '1' : '0');
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2 layout="position">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={!isCollapsed}
          className="flex w-full items-center justify-between gap-2 text-left text-xs font-semibold text-zinc-900 dark:text-white"
        >
          <span>{group.title}</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className={clsx(
              'h-3 w-3 shrink-0 text-zinc-400 transition-transform dark:text-zinc-500',
              isCollapsed ? '-rotate-90' : 'rotate-0',
            )}
          >
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </motion.h2>
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="relative mt-3 pl-2">
              <AnimatePresence initial={!isInsideMobileNavigation}>
                {isActiveGroup && (
                  <VisibleSectionHighlight group={group} pathname={pathname} />
                )}
              </AnimatePresence>
              <motion.div
                layout
                className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
              />
              <AnimatePresence initial={false}>
                {isActiveGroup && (
                  <ActivePageMarker group={group} pathname={pathname} />
                )}
              </AnimatePresence>
              <ul role="list" className="border-l border-transparent">
                {group.links.map((link) => (
                  <motion.li key={link.href} layout="position" className="relative">
                    <NavLinkItem href={link.href} active={link.href === pathname}>
                      {link.title}
                    </NavLinkItem>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {link.href === pathname && sections.length > 0 && (
                        <AnchorSectionList link={link} sections={sections} />
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function NavigationSection({
  section,
  isFirst = false,
}: {
  section: NavSection;
  isFirst?: boolean;
}) {
  const pathname = usePathname();

  // Check if current page is in this section
  const isActiveSection = pathname.startsWith(section.href) ||
    (section.href === '/' && !pathname.startsWith('/app') && !pathname.startsWith('/mediaserver'));

  return (
    <li className={clsx('relative', isFirst ? 'mt-0' : 'mt-8')}>
      <Link
        href={section.href}
        className={clsx(
          'flex items-center gap-2 text-sm font-semibold transition',
          isActiveSection
            ? 'text-emerald-500'
            : 'text-zinc-900 hover:text-zinc-700 dark:text-white dark:hover:text-zinc-300'
        )}
      >
        {section.title}
      </Link>
      {isActiveSection && section.groups.length > 0 && (
        <ul role="list">
          {section.groups.map((group, groupIndex) => (
            <NavigationGroup
              key={group.title}
              group={group}
              className={groupIndex === 0 ? 'mt-4' : ''}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Navigation({
  className,
  navigation = [],
  apiGroups = [],
  initialPathname,
  ...props
}: React.ComponentPropsWithoutRef<'nav'> & { navigation?: NavSection[]; apiGroups?: NavGroup[]; initialPathname?: string; }) {
  const pathname = usePathname(initialPathname);

  // Product list is rendered in the header now; sidebar only renders the
  // active product's groups so the two surfaces don't duplicate.
  // Each section.href is the product landing page (e.g. `/nomercy-player-kit/overview`),
  // not the product PREFIX. Match by the first path segment so any page under
  // `/nomercy-player-kit/*` resolves to the kit section, not just `/overview`.
  const currentProductPrefix = `/${pathname.split('/').filter(Boolean)[0] ?? ''}`;
  const currentSection = navigation.find((section) => section.href.startsWith(currentProductPrefix + '/'));
  const currentGroups = currentSection?.groups || [];

  void apiGroups; // prop kept for back-compat; sidebar sources from currentGroups now

  return (
    <nav aria-label="Sidebar" className={className} {...props}>
      <ul role="list">
        {currentGroups.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'mt-0' : ''}
          />
        ))}
      </ul>
    </nav>
  );
}
