'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import { motion } from 'framer-motion'
import { Suspense, createContext, useContext } from 'react'
import { create } from 'zustand'

import { Header } from './Header'
import { Navigation } from './Navigation'

// Navigation types
interface NavLink {
  title: string
  href: string
  order?: number
}

interface NavGroup {
  title: string
  links: NavLink[]
  order?: number
}

interface NavSection {
  title: string
  href: string
  groups: NavGroup[]
  order?: number
}

function MenuIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M.5 1h9M.5 8h9M.5 4.5h9" />
    </svg>
  )
}

function XIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 10 9"
      fill="none"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m1.5 1 7 7M8.5 1l-7 7" />
    </svg>
  )
}

const IsInsideMobileNavigationContext = createContext(false)

function MobileNavigationDialog({
  isOpen,
  close,
  navigation = [],
  apiGroups = [],
  initialPathname,
}: {
  isOpen: boolean
  close: () => void
  navigation?: NavSection[]
  apiGroups?: NavGroup[]
  initialPathname?: string
}) {
  return (
    <Dialog
      transition
      open={isOpen}
      onClose={close}
      className="fixed inset-0 z-50 lg:hidden"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 top-14 bg-zinc-400/20 backdrop-blur-xs data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-black/40"
      />

      <DialogPanel>
        <TransitionChild>
          <Header navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />
        </TransitionChild>

        <TransitionChild>
          <motion.div
            id="mobile-nav-panel"
            layoutScroll
            className="fixed top-14 bottom-0 left-0 w-full overflow-y-auto bg-white px-4 pt-6 pb-4 shadow-lg ring-1 shadow-zinc-900/10 ring-zinc-900/7.5 duration-500 ease-in-out data-closed:-translate-x-full min-[416px]:max-w-sm sm:px-6 sm:pb-10 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="mb-6 border-b border-zinc-200 pb-6 dark:border-white/10">
              <h3 className="mb-3 text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-white">
                Documentation
              </h3>
              <ul role="list" className="flex flex-col gap-3">
                {navigation.map((section) => {
                  const segment = section.href.split('/').filter(Boolean)[0]
                  const isActive =
                    (initialPathname ?? '').split('/').filter(Boolean)[0] === segment
                  return (
                    <li key={section.href}>
                      <a
                        href={section.href}
                        className={
                          isActive
                            ? 'text-sm font-medium text-emerald-700 dark:text-emerald-400'
                            : 'text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                        }
                      >
                        {section.title}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
            <Navigation navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
          </motion.div>
        </TransitionChild>
      </DialogPanel>
    </Dialog>
  )
}

export function useIsInsideMobileNavigation() {
  return useContext(IsInsideMobileNavigationContext)
}

export const useMobileNavigationStore = create<{
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export function MobileNavigation({ navigation = [], apiGroups = [], initialPathname }: { navigation?: NavSection[]; apiGroups?: NavGroup[]; initialPathname?: string }) {
  let isInsideMobileNavigation = useIsInsideMobileNavigation()
  let { isOpen, toggle, close } = useMobileNavigationStore()
  let ToggleIcon = isOpen ? XIcon : MenuIcon

  return (
    <IsInsideMobileNavigationContext.Provider value={true}>
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5"
        aria-label="Toggle navigation"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls="mobile-nav-panel"
        onClick={toggle}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <ToggleIcon className="w-2.5 stroke-zinc-900 dark:stroke-white" />
      </button>
      {!isInsideMobileNavigation && (
        <Suspense fallback={null}>
          <MobileNavigationDialog isOpen={isOpen} close={close} navigation={navigation} apiGroups={apiGroups} initialPathname={initialPathname} />
        </Suspense>
      )}
    </IsInsideMobileNavigationContext.Provider>
  )
}
