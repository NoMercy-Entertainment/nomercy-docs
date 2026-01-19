/**
 * Properties list container for API documentation
 * 
 * Directive: ::properties
 * 
 * Usage:
 * ```mdx
 * ::properties
 * ::property {{ name: 'id', type: 'string' }}
 * Unique identifier.
 * ::property {{ name: 'name', type: 'string' }}
 * Display name.
 * ::
 * ```
 */
export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(var(--container-lg)-(--spacing(8)))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  )
}

/**
 * Single property item within Properties
 * 
 * Directive: ::property {{ name: 'fieldName', type: 'string' }}
 * 
 * Props:
 * - name: Property name (required)
 * - type: Property type (optional)
 * - children: Description content
 */
export function Property({ name, children, type }: { name: string; children: React.ReactNode; type?: string }) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd><code>{name}</code></dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{type}</dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none *:first:mt-0 *:last:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  )
}
