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
import { MobileSearch, Search } from './Search';
import { ThemeToggle } from './ThemeToggle';
import { ReaderToggle } from './ReaderToggle';
import { CloseButton } from '@headlessui/react';

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
    <li>
      <Link
        href={href}
        className={clsx(
          'text-sm/5 transition',
          isActive
            ? 'text-emerald-500 dark:text-emerald-400'
            : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
        )}
      >
        {children}
      </Link>
    </li>
  );
}

interface HeaderProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  navigation?: NavSection[];
  apiGroups?: NavGroup[];
  initialPathname?: string;
}

export const Header = forwardRef<
  React.ComponentRef<'div'>,
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
    <motion.div
      {...props}
      ref={ref}
      className={clsx(
        className,
        'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
        !isInsideMobileNavigation &&
        'backdrop-blur-xs lg:left-72 xl:left-80 dark:backdrop-blur-sm',
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
      <Search />
      <div className="flex items-center gap-5 lg:hidden">
        <MobileNavigation navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
        <CloseButton as={Link} href="/" aria-label="Home">
          <Logo className="h-6" />
        </CloseButton>
      </div>
      <div className="flex items-center gap-5">
        <nav aria-label="Product sections" className="hidden md:block">
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
        <div className="flex gap-4">
          <MobileSearch />
          <ReaderToggle />
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
});
