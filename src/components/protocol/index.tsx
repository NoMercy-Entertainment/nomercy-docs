/**
 * MDX Components
 * 
 * Central export for all MDX components used in documentation.
 * Import as: import * as mdxComponents from '@/components/protocol'
 */

import { Heading } from '../Heading';
import { Prose } from './Prose';

// =============================================================================
// MDX Element Overrides
// =============================================================================

/** Custom anchor - standard link behavior */
export const a = ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a href={href} {...props}>{children}</a>
);

/** Custom h2 - adds anchor links and proper styling */
export const h2 = (props: Omit<React.ComponentPropsWithoutRef<typeof Heading>, 'level'>) => (
  <Heading level={2} {...props} />
);

/** Article wrapper — no flex stretching, no feedback widget. Footer chrome
 *  (prev/next nav, copyright) is owned by the page template / Layout. */
export function wrapper({ children }: { children: React.ReactNode; }) {
  return (
    <article className="pt-16 pb-10">
      <Prose>{children}</Prose>
    </article>
  );
}

// =============================================================================
// Re-exports
// =============================================================================

// Code components
export { Code as code, CodeGroup, Pre as pre } from './Code';

// Button component
export { Button } from './Button';

// Content components (used by directives)
export { Callout } from './Callout';
export { Row } from './Row';
export { Col } from './Col';
export { Properties, Property } from './Properties';

// Home page components
export { IconCards, IconCard } from './IconCards';
export { Hero } from './Hero';
export { LogoCards, LogoCard } from './LogoCards';
