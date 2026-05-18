'use client'

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import { createStore, useStore, type StoreApi } from 'zustand'

import { remToPx } from '@/lib/remToPx'

export interface Section {
  id: string
  title: string
  offsetRem?: number
  tag?: string
  headingRef?: React.RefObject<HTMLHeadingElement | null>
}

interface SectionState {
  sections: Array<Section>
  visibleSections: Array<string>
  setVisibleSections: (visibleSections: Array<string>) => void
  registerHeading: ({
    id,
    ref,
    offsetRem,
  }: {
    id: string
    ref: React.RefObject<HTMLHeadingElement | null>
    offsetRem: number
  }) => void
}

function createSectionStore(sections: Array<Section>) {
  return createStore<SectionState>()((set) => ({
    sections,
    visibleSections: [],
    setVisibleSections: (visibleSections) =>
      set((state) =>
        state.visibleSections.join() === visibleSections.join()
          ? {}
          : { visibleSections },
      ),
    registerHeading: ({ id, ref, offsetRem }) =>
      set((state) => {
        return {
          sections: state.sections.map((section) => {
            if (section.id === id) {
              return {
                ...section,
                headingRef: ref,
                offsetRem,
              }
            }
            return section
          }),
        }
      }),
  }))
}

function useVisibleSections(sectionStore: StoreApi<SectionState>) {
  let setVisibleSections = useStore(sectionStore, (s) => s.setVisibleSections)
  let sections = useStore(sectionStore, (s) => s.sections)

  useEffect(() => {
    // Heading components are rendered server-side as plain HTML inside the
    // MDX slot — they never hydrate as React islands, so the per-Heading
    // `registerHeading` effect that would populate `headingRef.current` does
    // not run. Look the elements up directly via `document.getElementById`
    // instead. This makes section tracking entirely DOM-driven and
    // independent of the Heading component's effect lifecycle.
    function getEl(id: string): HTMLElement | null {
      if (typeof document === 'undefined') return null
      return document.getElementById(id)
    }

    function checkVisibleSections() {
      let { innerHeight, scrollY } = window
      let scrollHeight = document.documentElement.scrollHeight
      // Within ~120px of document bottom = treat the last heading in viewport
      // as active. Otherwise "See also" at the page tail never highlights
      // because there isn't enough content below it to push the heading past
      // the 72px header threshold.
      let atBottom = scrollY + innerHeight >= scrollHeight - 120

      // Fixed header sits ~72px tall — treat any heading scrolled above that
      // line as "passed" by the reader. Sidebar active-state = the last
      // heading scrolled past, or the first heading if none have been passed.
      let headerThreshold = scrollY + 72
      let newVisibleSections: Array<string> = []
      let lastPassedId: string | null = null
      let lastVisibleId: string | null = null

      for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
        let { id } = sections[sectionIndex]
        let el = getEl(id)
        if (!el) continue

        let top = el.getBoundingClientRect().top + scrollY

        if (top <= headerThreshold) {
          lastPassedId = id
        }

        // Heading anchor is anywhere in the viewport — track them all for
        // consumers that want every visible h2.
        if (top >= scrollY && top <= scrollY + innerHeight) {
          newVisibleSections.push(id)
          lastVisibleId = id
        }
      }

      // Decide the active section:
      //   - At document bottom → last heading currently visible (so the page
      //     tail like "See also" highlights once the reader reaches it).
      //   - Otherwise → last heading scrolled past the header threshold.
      //   - Fallback → first heading on the page.
      let activeId =
        (atBottom && lastVisibleId) ||
        lastPassedId ||
        (sections[0]?.id ?? null)

      if (activeId) {
        newVisibleSections = [activeId, ...newVisibleSections.filter((id) => id !== activeId)]
      }

      setVisibleSections(newVisibleSections)
    }

    let raf = window.requestAnimationFrame(() => checkVisibleSections())
    window.addEventListener('scroll', checkVisibleSections, { passive: true })
    window.addEventListener('resize', checkVisibleSections)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', checkVisibleSections)
      window.removeEventListener('resize', checkVisibleSections)
    }
  }, [setVisibleSections, sections])
}

const SectionStoreContext = createContext<StoreApi<SectionState> | null>(null)

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

export function SectionProvider({
  sections,
  children,
}: {
  sections: Array<Section>
  children: React.ReactNode
}) {
  let [sectionStore] = useState(() => createSectionStore(sections))

  useVisibleSections(sectionStore)

  useIsomorphicLayoutEffect(() => {
    sectionStore.setState({ sections })
  }, [sectionStore, sections])

  return (
    <SectionStoreContext.Provider value={sectionStore}>
      {children}
    </SectionStoreContext.Provider>
  )
}

// Default state for SSR when store is not available
const defaultState: SectionState = {
  sections: [],
  visibleSections: [],
  setVisibleSections: () => {},
  registerHeading: () => {},
}

export function useSectionStore<T>(selector: (state: SectionState) => T) {
  let store = useContext(SectionStoreContext)

  // Handle SSR case where store may not be available
  if (!store) {
    return selector(defaultState)
  }

  return useStore(store, selector)
}
