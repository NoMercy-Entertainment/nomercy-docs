import { useEffect, useState } from 'preact/hooks'
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

export default function Navigation() {
  const [pathname, setPathname] = useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  return (
    <nav className="mt-10 hidden space-y-10 lg:block">
      {navigationGroups.map((group) => (
        <div key={group.title}>
          <h2 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-white">
            {group.title}
          </h2>
          <ul className="space-y-2 border-l border-zinc-100 dark:border-zinc-800/40">
            {group.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={clsx(
                    'block border-l py-1 pl-4 text-sm transition',
                    pathname === link.href
                      ? 'border-emerald-500 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                      : 'border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}
