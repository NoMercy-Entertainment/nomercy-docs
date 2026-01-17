import { useState } from 'preact/hooks'
import clsx from 'clsx'

const navigationGroups = [
  {
    title: 'Guides',
    links: [
      { title: 'Getting Started', href: '/apps/getting-started' },
      { title: 'Installation', href: '/apps/installation' },
    ],
  },
  {
    title: 'MediaServer',
    links: [
      { title: 'Overview', href: '/mediaserver/overview' },
      { title: 'Configuration', href: '/mediaserver/configuration' },
    ],
  },
]

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md bg-zinc-100 p-2 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:hover:bg-zinc-800 lg:hidden"
        aria-label="Toggle navigation"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed left-0 top-14 w-full border-b border-zinc-900/10 bg-white dark:border-white/10 dark:bg-zinc-900">
          <nav className="space-y-6 p-6">
            {navigationGroups.map((group) => (
              <div key={group.title}>
                <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
                  {group.title}
                </h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
