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
    // Amber, not the emerald accent: a Callout informs, this section is where a
    // reader lands when something failed, so it must not read as either the body
    // text or a Callout. Each paragraph is one problem: its bold first line is the
    // symptom, the rest is the fix, and a rule separates one problem from the next.
    <section
      aria-label="Troubleshooting"
      className="not-prose my-10 overflow-hidden rounded-2xl border border-amber-500/40 bg-amber-50/70 dark:border-amber-400/30 dark:bg-amber-400/[0.06]"
    >
      <div className="flex items-center gap-2.5 border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 dark:border-amber-400/20 dark:bg-amber-400/10">
        <WrenchIcon className="h-4 w-4 flex-none stroke-amber-700 dark:stroke-amber-300" />
        <h2 className="m-0 text-sm font-semibold text-amber-950 dark:text-amber-100">
          When something is not right
        </h2>
      </div>
      <div className="px-4 text-sm/6 text-zinc-700 dark:text-zinc-300 [&>p]:my-0 [&>p]:py-3.5 [&>p+p]:border-t [&>p+p]:border-amber-500/20 dark:[&>p+p]:border-amber-400/15 [&_strong]:font-semibold [&_strong]:text-zinc-900 dark:[&_strong]:text-white">
        {children}
      </div>
    </section>
  )
}
