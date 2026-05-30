import clsx from 'clsx'

export function Prose<T extends React.ElementType = 'div'>({
  as,
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'> & {
  as?: T
  className?: string
}) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose max-w-none dark:prose-invert',
        // Readable measure on narrow viewports (max-w-3xl), widening to ~1280px on
        // large screens so wide tables and code don't waste the available column.
        // The lg offset left-aligns the block instead of centring it, which is why
        // it pairs the same size in the max-width and the mx calc.
        // `html :where(& > *)` selects direct children at base specificity.
        '[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-3xl lg:[html_:where(&>*)]:mx-[calc(50%-min(50%,80rem))] lg:[html_:where(&>*)]:max-w-7xl',
      )}
      {...props}
    />
  )
}
