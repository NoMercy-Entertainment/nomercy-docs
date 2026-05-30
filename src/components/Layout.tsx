'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { SectionProvider, type Section } from './SectionProvider';

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
    );
  }

  return (
    <SectionProvider sections={sections}>
      <div className="h-full lg:ml-72 xl:ml-80" data-docs-shell>
        <motion.header
          layoutScroll
          data-docs-sidebar
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
            <div className="hidden lg:flex -mt-2.5">
              <Link href="/" aria-label="Home">
                <Logo className="min-h-11 w-auto" />
              </Link>
            </div>
            <Header navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
            <Navigation className="hidden lg:mt-10 lg:block" navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main id="main-content" className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  );
}
