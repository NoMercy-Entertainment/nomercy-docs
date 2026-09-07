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
        // Content blocks are centred (mx-auto) in the available column, widening
        // from max-w-3xl on narrow viewports to 64rem on large screens. This is
        // the one knob for the body's width: it caps every direct child, so a
        // code block, a table and a paragraph all stop at the same edge.
        // `html :where(& > *)` selects direct children at base specificity.
        '[html_:where(&>*)]:mx-auto [html_:where(&>*)]:max-w-3xl lg:[html_:where(&>*)]:max-w-5xl',
      )}
      {...props}
    />
  )
}
