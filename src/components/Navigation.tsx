'use client';

import clsx from 'clsx';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import { Button } from './protocol/Button';
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
  // top-level active link (not anchor sub-links — those would chase the
  // cursor while reading).
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (active && !isAnchorLink && ref.current) {
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!inView) {
        el.scrollIntoView({ block: 'center', behavior: 'auto' });
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

  return (
    <li className={clsx('relative mt-6', className)}>
      <motion.h2
        layout="position"
        className="text-xs font-semibold text-zinc-900 dark:text-white"
      >
        {group.title}
      </motion.h2>
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

// Fallback API groups for when no dynamic navigation is provided
const fallbackApiGroups: NavGroup[] = [
  {
    title: 'Guides',
    links: [
      { title: 'Introduction', href: '/' },
      { title: 'Quickstart', href: '/quickstart' },
      { title: 'SDKs', href: '/sdks' },
      { title: 'Authentication', href: '/authentication' },
      { title: 'Pagination', href: '/pagination' },
      { title: 'Errors', href: '/errors' },
      { title: 'Webhooks', href: '/webhooks' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Contacts', href: '/contacts' },
      { title: 'Conversations', href: '/conversations' },
      { title: 'Messages', href: '/messages' },
      { title: 'Groups', href: '/groups' },
      { title: 'Attachments', href: '/attachments' },
    ],
  },
];

// Fallback navigation for when no dynamic navigation is provided
const fallbackNavigation: NavSection[] = [
  {
    title: 'App',
    href: '/app',
    groups: [],
  },
  {
    title: 'Media Server',
    href: '/mediaserver',
    groups: [],
  },
];

function SectionLink({
  section,
  isActive,
}: {
  section: NavSection;
  isActive: boolean;
}) {
  return (
    <li>
      <CloseButton
        as={Link}
        href={section.href}
        className={clsx(
          'block py-1 text-sm transition',
          isActive
            ? 'font-semibold text-emerald-500'
            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        )}
      >
        {section.title}
      </CloseButton>
    </li>
  );
}

function ApiSectionLink({ isActive }: { isActive: boolean; }) {
  return (
    <li>
      <CloseButton
        as={Link}
        href="/"
        className={clsx(
          'block py-1 text-sm transition',
          isActive
            ? 'font-semibold text-emerald-500'
            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
        )}
      >
        API
      </CloseButton>
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

  // Use provided navigation or fallback
  const navSections = navigation.length > 0 ? navigation : fallbackNavigation;

  // Determine which section we're in. `isOnApiPage` is the fallback bucket
  // for the legacy API docs section — every content collection that has its
  // own nav (app, mediaserver, player, ...) must be excluded here, otherwise
  // the sidebar falls back to the API boilerplate instead of showing the
  // collection's own groups.
  const isOnAppPage = pathname.startsWith('/app');
  const isOnMediaServerPage = pathname.startsWith('/mediaserver');
  const isOnPlayerPage = pathname.startsWith('/player');
  const isOnApiPage = !isOnAppPage && !isOnMediaServerPage && !isOnPlayerPage;

  // Use provided API groups or fallback
  const apiNavGroups = apiGroups.length > 0 ? apiGroups : fallbackApiGroups;

  // Find the current section's groups
  const currentSection = navSections.find((section) => pathname.startsWith(section.href));
  const currentGroups = currentSection?.groups || [];

  return (
    <nav aria-label="Sidebar" className={className} {...props}>
      <ul role="list">
        {/* Section links at the top */}
        <li className="mb-6">
          <ul role="list" className="space-y-1">
            <ApiSectionLink isActive={isOnApiPage} />
            {navSections.map((section) => (
              <SectionLink
                key={section.href}
                section={section}
                isActive={pathname.startsWith(section.href)}
              />
            ))}
          </ul>
        </li>

        {/* Show current section's groups */}
        {isOnApiPage && apiNavGroups.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'mt-0' : ''}
          />
        ))}
        {!isOnApiPage && currentGroups.map((group, groupIndex) => (
          <NavigationGroup
            key={group.title}
            group={group}
            className={groupIndex === 0 ? 'mt-0' : ''}
          />
        ))}

        <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
          <Button href="#" variant="filled" className="w-full">
            Sign in
          </Button>
        </li>
      </ul>
    </nav>
  );
}

// Export for backward compatibility
export { fallbackNavigation as navigation, fallbackApiGroups };
