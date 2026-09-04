function WrenchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10.5 2.5a3.5 3.5 0 0 0-3.2 4.9L2.6 12.1a1.2 1.2 0 0 0 1.7 1.7l4.7-4.7a3.5 3.5 0 0 0 4.3-4.6l-2 2-1.7-1.7 2-2a3.5 3.5 0 0 0-1.1-.3Z"
      />
    </svg>
  )
}

/**
 * Troubleshooting section — visually separated from the page's main flow so a
 * reader scanning for a fix can find it without reading the instructions again.
 *
 * Usage in MDX:
 * ```mdx
 * ::Troubleshooting
 *
 * **The thing went wrong.**
 * What to do about it.
 *
 * ::
 * ```
 */
export function Troubleshooting({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-label="Troubleshooting"
      className="not-prose my-10 overflow-hidden rounded-2xl border border-zinc-900/10 bg-zinc-50 dark:border-white/10 dark:bg-white/2.5"
    >
      <div className="flex items-center gap-2.5 border-b border-zinc-900/10 bg-zinc-900/2.5 px-4 py-3 dark:border-white/10 dark:bg-white/5">
        <WrenchIcon className="h-4 w-4 flex-none stroke-zinc-500 dark:stroke-zinc-400" />
        <h2 className="m-0 text-sm font-semibold text-zinc-900 dark:text-white">
          When something is not right
        </h2>
      </div>
      <div className="px-4 py-1 text-sm/6 text-zinc-700 [&_p]:my-3 [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:text-zinc-300 dark:[&_strong]:text-white">
        {children}
      </div>
    </section>
  )
}
