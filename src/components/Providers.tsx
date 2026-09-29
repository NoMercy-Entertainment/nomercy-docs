'use client'

import { MotionConfig } from 'framer-motion'

// Theme is owned directly by the no-flash inline script (MarkdownLayout) and
// the reading settings menu (A11yMenu), not next-themes — its React context can't cross Astro islands.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
