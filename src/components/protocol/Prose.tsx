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
        'prose dark:prose-invert',
        // Wider readable container — Stoney flagged narrow column wrapping pills
        // in tables. Bumped from max-w-3xl (768px) to max-w-5xl (1024px) on lg+.
        // Stays max-w-2xl on default for narrow viewports.
        // `html :where(& > *)` selects direct children at base specificity.
        '[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-3xl lg:[html_:where(&>*)]:mx-[calc(50%-min(50%,var(--container-lg)))] lg:[html_:where(&>*)]:max-w-5xl',
      )}
      {...props}
    />
  )
}
