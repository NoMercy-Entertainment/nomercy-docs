'use client';

import { MotionConfig, motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SectionProvider, type Section } from './SectionProvider';
import { t } from '@/lib/i18n';

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

// Hook to get current pathname (client-side only)
function usePathname(initialPathname?: string) {
  const [pathname, setPathname] = useState(() => {
    if (initialPathname) return initialPathname;
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return pathname;
}

export function Layout({
  children,
  allSections,
  navigation = [],
  apiGroups = [],
  initialPathname,
  landing = false,
}: {
  children: React.ReactNode;
  allSections: Record<string, Array<Section>>;
  navigation?: NavSection[];
  apiGroups?: NavGroup[];
  initialPathname?: string;
  landing?: boolean;
}) {
  let pathname = usePathname(initialPathname);

  // Try multiple pathname variations to find sections
  const sections = allSections[pathname] ??
    allSections[pathname.replace(/\/$/, '')] ??
    allSections[pathname + '/'] ??
    allSections['/'] ??
    [];

  // Landing route: no docs sidebar, full-width shell (just header + content + footer).
  if (landing) {
    return (
      <MotionConfig reducedMotion="user">
        <SectionProvider sections={[]}>
          <div className="h-full">
            <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-6xl">
                <Header navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
              </div>
              <main id="main-content" className="flex-auto">{children}</main>
              <Footer />
            </div>
          </div>
        </SectionProvider>
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <SectionProvider sections={sections}>
        <div className="h-full lg:ml-72 xl:ml-80">
          <motion.div
            layoutScroll
            className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
          >
            {/* On desktop the column is the frame and only the nav inside it
                scrolls, so the logo stays put while the page list moves under
                it. `contents` keeps both wrappers out of the way on mobile,
                where the sidebar is a drawer instead. */}
            <div className="contents lg:pointer-events-auto lg:flex lg:h-full lg:w-72 lg:flex-col lg:border-r lg:border-zinc-900/10 xl:w-80 lg:dark:border-white/10">
              <div className="hidden lg:flex lg:shrink-0 lg:items-center lg:px-6 lg:pt-4 lg:pb-4">
                <Link href="/" aria-label={t('nav.home')}>
                  <Logo className="min-h-11 w-auto" />
                </Link>
              </div>
              <Header navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
              {/* Navigation.tsx centres the active link by scrolling
                  `[data-sidebar-scroll]`, so the attribute has to sit on the
                  element that actually owns the overflow.

                  The mask fades the first 16px of the scroll region so a link
                  passing under the pinned logo dissolves instead of being cut
                  in half at a hard edge. Nothing sits in the fade at rest —
                  the nav's own top margin clears it. */}
              <div
                data-sidebar-scroll
                className="contents lg:block lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-6 lg:pb-8 lg:[mask-image:linear-gradient(to_bottom,transparent_0,black_1rem)]"
              >
                <Navigation className="hidden lg:mt-10 lg:block" navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
              </div>
            </div>
          </motion.div>
          <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
            <main id="main-content" className="flex-auto">{children}</main>
            <Footer />
          </div>
        </div>
      </SectionProvider>
    </MotionConfig>
  );
}
