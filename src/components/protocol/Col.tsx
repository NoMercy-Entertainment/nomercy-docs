import clsx from 'clsx'

/**
 * Column within a Row layout
 * 
 * Directive: ::col or ::col sticky
 * 
 * Props:
 * - sticky: Makes the column sticky positioned on desktop (useful for code examples)
 * 
 * Usage:
 * ```mdx
 * ::row
 * ::col
 * Description content
 * ::col sticky
 * Code examples (stays visible while scrolling)
 * ::
 * ```
 */
export function Col({ children, sticky = false }: { children: React.ReactNode; sticky?: boolean }) {
  return (
    <div className={clsx('*:first:mt-0 *:last:mb-0', sticky && 'xl:sticky xl:top-24')}>
      {children}
    </div>
  )
}
