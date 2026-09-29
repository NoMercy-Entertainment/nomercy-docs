'use client';

import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { forwardRef } from 'react';

import { Logo } from './Logo';
import {
  MobileNavigation,
  useIsInsideMobileNavigation,
  useMobileNavigationStore,
} from './MobileNavigation';
import { A11yMenu } from './A11yMenu';
import { PackageManagerMenu } from './PackageManagerMenu';
import { MobileSearch, Search } from './Search';
import { CloseButton, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

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

// Simple Link component to replace next/link
const Link = ({ href, className, children, ...props }: { href: string; className?: string; children: React.ReactNode; } & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} className={className} {...props}>
    {children}
  </a>
);

function TopLevelNavItem({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <li className="whitespace-nowrap">
      <Link
        href={href}
        className={clsx(
          'text-sm/5 transition',
          isActive
            ? 'text-(--color-accent)'
            : 'text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white',
        )}
      >
        {children}
      </Link>
    </li>
  );
}

function ChevronIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The eight product links need about 480px. In a header under 90rem, next to
// the logo, search and tools, they pushed the reading-settings button off the
// screen (1024-1250px, and wider once the reader enlarges the text). There
// they fold into one menu whose trigger names the current product.
function ProductsMenu({ navigation, pathname }: { navigation: NavSection[]; pathname: string }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isActive = (section: NavSection) => pathname.startsWith('/' + section.href.split('/')[1]);
  const current = navigation.find(isActive);
  const triggerClassName =
    'flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-sm/5 whitespace-nowrap text-zinc-700 transition hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white';
  const label = (
    <>
      {current?.title ?? 'Documentation'}
      <ChevronIcon className="h-3.5 w-3.5" />
    </>
  );

  // Static trigger until hydration, as in PackageManagerMenu: the anchored
  // Menu's positioning hooks are client-only.
  if (!mounted) {
    return (
      <button type="button" className={triggerClassName} aria-label="Documentation sections">
        {label}
      </button>
    );
  }

  return (
    <Menu as="div" className="relative">
      <MenuButton className={triggerClassName} aria-label="Documentation sections">
        {label}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="z-50 w-44 rounded-lg bg-white p-1 shadow-lg ring-1 ring-zinc-900/5 [--anchor-gap:0.5rem] focus:outline-none dark:bg-zinc-800 dark:ring-white/10"
      >
        {navigation.map((section) => (
          <MenuItem key={section.href}>
            <a
              href={section.href}
              aria-current={isActive(section) ? 'page' : undefined}
              className={clsx(
                'block rounded-md px-2 py-1.5 text-sm transition data-focus:bg-zinc-900/5 dark:data-focus:bg-white/5',
                isActive(section) ? 'text-(--color-accent)' : 'text-zinc-700 dark:text-zinc-300',
              )}
            >
              {section.title}
            </a>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

interface HeaderProps extends React.ComponentPropsWithoutRef<typeof motion.header> {
  navigation?: NavSection[];
  apiGroups?: NavGroup[];
  initialPathname?: string;
}

export const Header = forwardRef<
  React.ComponentRef<'header'>,
  HeaderProps
>(function Header({ className, navigation = [], apiGroups = [], initialPathname, ...props }, ref) {
  let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();
  let isInsideMobileNavigation = useIsInsideMobileNavigation();

  const [pathname, setPathname] = React.useState(initialPathname ?? '/');
  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  let { scrollY } = useScroll();
  let bgOpacityLight = useTransform(scrollY, [0, 72], ['50%', '90%']);
  let bgOpacityDark = useTransform(scrollY, [0, 72], ['20%', '80%']);

  return (
    <motion.header
      {...props}
      ref={ref}
      className={clsx(
        className,
        '@container fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-8 px-4 transition sm:px-6 lg:gap-12 lg:px-8',
        !isInsideMobileNavigation && 'backdrop-blur-xs dark:backdrop-blur-sm',
        isInsideMobileNavigation
          ? 'bg-white dark:bg-zinc-900'
          : 'bg-white/(--bg-opacity-light) dark:bg-zinc-900/(--bg-opacity-dark)',
      )}
      style={
        {
          '--bg-opacity-light': bgOpacityLight,
          '--bg-opacity-dark': bgOpacityDark,
        } as React.CSSProperties
      }
    >
      <div
        className={clsx(
          'absolute inset-x-0 top-full h-px transition',
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
          'bg-zinc-900/7.5 dark:bg-white/7.5',
        )}
      />
      {/* The Logo svg carries an inline `height: 100%`, so the anchor is what
          gives it a size. The slot is the width of the sidebar column beneath
          it, which lines the wordmark up with the page list. */}
      <div className="hidden lg:flex lg:w-64 lg:shrink-0 lg:items-center xl:w-72">
        <Link href="/" aria-label="Home" className="flex h-9 items-center">
          <Logo className="w-auto" />
        </Link>
      </div>
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
        <CloseButton as={Link} href="/" aria-label="Home">
          <Logo className="h-6" />
        </CloseButton>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        {/* A container query, not a 2xl media query: rem in a container
            query follows the reader's text size, so at 150% the links wait
            for a header 1.5 times as wide instead of pushing the reading
            settings off the right edge. */}
        <div className="hidden md:block @min-[90rem]:hidden">
          <ProductsMenu navigation={navigation} pathname={pathname} />
        </div>
        <nav aria-label="Product sections" className="hidden @min-[90rem]:block">
          <ul role="list" className="flex items-center gap-5">
            {navigation.map((section) => (
              <TopLevelNavItem
                key={section.href}
                href={section.href}
                isActive={pathname.startsWith('/' + section.href.split('/')[1])}
              >
                {section.title}
              </TopLevelNavItem>
            ))}
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex items-center gap-4">
          <MobileSearch />
          <PackageManagerMenu />
          <A11yMenu />
        </div>
      </div>
    </motion.header>
  );
});
