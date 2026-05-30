'use client'

import type {
  AutocompleteApi,
  AutocompleteCollection,
  AutocompleteState,
} from '@algolia/autocomplete-core'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import clsx from 'clsx'
import {
  Fragment,
  Suspense,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { useMobileNavigationStore } from './MobileNavigation'

// Define Result type for our search
export interface Result {
  url: string
  title: string
  pageTitle?: string
  content?: string
  section?: string
}

// Search index document type
interface SearchDocument {
  id: string
  title: string
  description: string
  category: string
  section: string
  tags: string[]
  url: string
  content: string
  order: number
}

type EmptyObject = Record<string, never>

type Autocomplete = AutocompleteApi<
  Result,
  React.SyntheticEvent,
  React.MouseEvent,
  React.KeyboardEvent
>

// Dynamic import for createAutocomplete to avoid SSR issues
let createAutocompletePromise: Promise<typeof import('@algolia/autocomplete-core')['createAutocomplete']> | null = null

function getCreateAutocomplete() {
  if (typeof window === 'undefined') return null
  if (!createAutocompletePromise) {
    createAutocompletePromise = import('@algolia/autocomplete-core').then(mod => mod.createAutocomplete)
  }
  return createAutocompletePromise
}

// Cache for the search index
let searchIndexCache: SearchDocument[] | null = null
let searchIndexPromise: Promise<SearchDocument[]> | null = null

// Load search index (client-side only)
async function loadSearchIndex(): Promise<SearchDocument[]> {
  if (searchIndexCache) return searchIndexCache
  if (searchIndexPromise) return searchIndexPromise

  searchIndexPromise = fetch('/searchIndex.json')
    .then(res => res.json())
    .then(data => {
      searchIndexCache = data
      return data
    })
    .catch(err => {
      console.error('Failed to load search index:', err)
      return []
    })

  return searchIndexPromise
}

// Client-side search function
async function searchDocs(query: string, limit: number = 5): Promise<Result[]> {
  if (!query.trim()) return []

  const index = await loadSearchIndex()
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean)

  // Score each document
  const scored = index.map(doc => {
    let score = 0
    const titleLower = doc.title.toLowerCase()
    const descLower = doc.description.toLowerCase()

    for (const term of searchTerms) {
      // Title matches (highest weight)
      if (titleLower.includes(term)) {
        score += titleLower === term ? 100 : titleLower.startsWith(term) ? 50 : 25
      }
      // Description matches
      if (descLower.includes(term)) {
        score += 10
      }
      // Content matches
      if (doc.content.includes(term)) {
        score += 5
      }
      // Tag matches
      if (doc.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += 15
      }
      // Category matches
      if (doc.category.toLowerCase().includes(term)) {
        score += 8
      }
    }

    return { doc, score }
  })

  // Filter and sort by score
  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => ({
      url: item.doc.url,
      title: item.doc.title,
      pageTitle: item.doc.category,
      content: item.doc.description,
      section: item.doc.section,
    }))
}

function useAutocomplete({ onNavigate }: { onNavigate: () => void }) {
  let id = useId()
  let [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<Result> | EmptyObject
  >({})
  let [autocomplete, setAutocomplete] = useState<Autocomplete | null>(null)

  function navigate({ itemUrl }: { itemUrl?: string }) {
    if (itemUrl) {
      window.location.href = itemUrl
    }

    onNavigate()
  }

  useEffect(() => {
    const initAutocomplete = async () => {
      const createAutocomplete = await getCreateAutocomplete()
      if (!createAutocomplete) return

      const ac = createAutocomplete<
        Result,
        React.SyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        id,
        placeholder: 'Find something...',
        defaultActiveItemId: 0,
        onStateChange({ state }) {
          setAutocompleteState(state)
        },
        shouldPanelOpen({ state }) {
          return state.query !== ''
        },
        navigator: {
          navigate,
        },
        getSources({ query }) {
          return Promise.resolve([
            {
              sourceId: 'documentation',
              async getItems() {
                return searchDocs(query, 5)
              },
              getItemUrl({ item }) {
                return item.url
              },
              onSelect: navigate,
            },
          ])
        },
      })
      setAutocomplete(ac)
    }

    initAutocomplete()
  }, [id])

  return { autocomplete, autocompleteState }
}

function SearchIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.25 4.25 0 1 0-6.02-6 4.25 4.25 0 0 0 6.02 6Zm0 0 3.24 3.25"
      />
    </svg>
  )
}

function NoResultsIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.01 12a4.237 4.237 0 0 0 1.24-3c0-.62-.132-1.207-.37-1.738M12.01 12A4.237 4.237 0 0 1 9 13.25c-.635 0-1.237-.14-1.777-.388M12.01 12l3.24 3.25m-3.715-9.661a4.25 4.25 0 0 0-5.975 5.908M4.5 15.5l11-11"
      />
    </svg>
  )
}

function LoadingIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  let id = useId()

  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="5.5" strokeLinejoin="round" />
      <path
        stroke={`url(#${id})`}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.5 10a5.5 5.5 0 1 0-5.5 5.5"
      />
      <defs>
        <linearGradient
          id={id}
          x1="13"
          x2="9.5"
          y1="9"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Inline case-insensitive highlighter — replaces react-highlight-words (a CJS dep
// that pulled a second React copy into SSR and logged "Invalid hook call").
function HighlightQuery({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim()
  if (!trimmed) return <>{text}</>
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
          <mark key={index} className="bg-transparent text-emerald-600 underline dark:text-emerald-400">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

function SearchResult({
  result,
  resultIndex,
  autocomplete,
  collection,
  query,
}: {
  result: Result
  resultIndex: number
  autocomplete: Autocomplete
  collection: AutocompleteCollection<Result>
  query: string
}) {
  let id = useId()

  // Use section from result, or try to determine from URL
  let sectionTitle = result.section
  if (!sectionTitle) {
    const url = result.url.split('#')[0]
    if (url.startsWith('/app')) sectionTitle = 'App'
    else if (url.startsWith('/mediaserver')) sectionTitle = 'Media Server'
    else sectionTitle = 'API'
  }
  let hierarchy = [sectionTitle, result.pageTitle].filter(
    (x): x is string => typeof x === 'string' && x !== sectionTitle,
  )
  // Add section to beginning if we have other items
  if (sectionTitle && hierarchy.length > 0) {
    hierarchy = [sectionTitle, ...hierarchy]
  } else if (sectionTitle) {
    hierarchy = [sectionTitle]
  }

  return (
    <li
      className={clsx(
        'group block cursor-default px-4 py-3 aria-selected:bg-zinc-50 dark:aria-selected:bg-zinc-800/50',
        resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800',
      )}
      aria-labelledby={`${id}-hierarchy ${id}-title`}
      {...autocomplete.getItemProps({
        item: result,
        source: collection.source,
      })}
    >
      <div
        id={`${id}-title`}
        aria-hidden="true"
        className="text-sm font-medium text-zinc-900 group-aria-selected:text-emerald-500 dark:text-white"
      >
        <HighlightQuery text={result.title} query={query} />
      </div>
      {hierarchy.length > 0 && (
        <div
          id={`${id}-hierarchy`}
          aria-hidden="true"
          className="mt-1 truncate text-2xs whitespace-nowrap text-zinc-500"
        >
          {hierarchy.map((item, itemIndex, items) => (
            <Fragment key={itemIndex}>
              <HighlightQuery text={item} query={query} />
              <span
                className={
                  itemIndex === items.length - 1
                    ? 'sr-only'
                    : 'mx-2 text-zinc-300 dark:text-zinc-700'
                }
              >
                /
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </li>
  )
}

function SearchResults({
  autocomplete,
  query,
  collection,
}: {
  autocomplete: Autocomplete
  query: string
  collection: AutocompleteCollection<Result>
}) {
  if (collection.items.length === 0) {
    return (
      <div className="p-6 text-center">
        <NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
        <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
          Nothing found for{' '}
          <strong className="font-semibold wrap-break-word text-zinc-900 dark:text-white">
            &lsquo;{query}&rsquo;
          </strong>
          . Please try again.
        </p>
      </div>
    )
  }

  return (
    <ul {...autocomplete.getListProps()}>
      {collection.items.map((result, resultIndex) => (
        <SearchResult
          key={result.url}
          result={result}
          resultIndex={resultIndex}
          autocomplete={autocomplete}
          collection={collection}
          query={query}
        />
      ))}
    </ul>
  )
}

const SearchInput = forwardRef<
  React.ElementRef<'input'>,
  {
    autocomplete: Autocomplete | null
    autocompleteState: AutocompleteState<Result> | EmptyObject
    onClose: () => void
  }
>(function SearchInput({ autocomplete, autocompleteState, onClose }, inputRef) {
  let inputProps = autocomplete?.getInputProps({ inputElement: null })

  return (
    <div className="group relative flex h-12">
      <SearchIcon className="pointer-events-none absolute top-0 left-3 h-full w-5 stroke-zinc-500" />
      <input
        ref={inputRef}
        data-autofocus
        className={clsx(
          'flex-auto appearance-none bg-transparent pl-10 text-zinc-900 placeholder:text-zinc-500 focus:w-full focus:flex-none focus-visible:outline-2 focus-visible:outline-emerald-500 sm:text-sm dark:text-white [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden',
          (autocompleteState as any).status === 'stalled' ? 'pr-11' : 'pr-4',
        )}
        placeholder="Find something..."
        {...inputProps}
        onKeyDown={(event) => {
          if (
            event.key === 'Escape' &&
            !(autocompleteState as any).isOpen &&
            (autocompleteState as any).query === ''
          ) {
            if (document.activeElement instanceof HTMLElement) {
              document.activeElement.blur()
            }

            onClose()
          } else {
            inputProps?.onKeyDown(event)
          }
        }}
      />
      {(autocompleteState as any).status === 'stalled' && (
        <div className="absolute inset-y-0 right-3 flex items-center">
          <LoadingIcon className="h-5 w-5 animate-spin stroke-zinc-200 text-zinc-900 dark:stroke-zinc-800 dark:text-emerald-400" />
        </div>
      )}
    </div>
  )
})

function SearchDialog({
  open,
  setOpen,
  className,
  onNavigate = () => {},
}: {
  open: boolean
  setOpen: (open: boolean) => void
  className?: string
  onNavigate?: () => void
}) {
  let formRef = useRef<React.ElementRef<'form'>>(null)
  let panelRef = useRef<React.ElementRef<'div'>>(null)
  let inputRef = useRef<React.ElementRef<typeof SearchInput>>(null)
  let { autocomplete, autocompleteState } = useAutocomplete({
    onNavigate() {
      onNavigate()
      setOpen(false)
    },
  })
  let [pathname, setPathname] = useState('')

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  useEffect(() => {
    if (open) {
      return
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, setOpen])

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false)
        autocomplete?.setQuery('')
      }}
      className={clsx('fixed inset-0 z-50', className)}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-zinc-400/25 backdrop-blur-xs data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-black/40"
      />

      <div className="fixed inset-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-20 md:py-32 lg:px-8 lg:py-[15vh]">
        <DialogPanel
          transition
          className="mx-auto transform-gpu overflow-hidden rounded-lg bg-zinc-50 shadow-xl ring-1 ring-zinc-900/7.5 data-closed:scale-95 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:max-w-xl dark:bg-zinc-900 dark:ring-zinc-800"
        >
          <div {...(autocomplete?.getRootProps({}) ?? {})}>
            <form
              ref={formRef}
              {...(autocomplete?.getFormProps({
                inputElement: inputRef.current,
              }) ?? {})}
            >
              <SearchInput
                ref={inputRef}
                autocomplete={autocomplete}
                autocompleteState={autocompleteState}
                onClose={() => setOpen(false)}
              />
              <div
                ref={panelRef}
                className="border-t border-zinc-200 bg-white empty:hidden dark:border-zinc-100/5 dark:bg-white/2.5"
                {...(autocomplete?.getPanelProps({}) ?? {})}
              >
                {(autocompleteState as any).isOpen && autocomplete && (
                  <SearchResults
                    autocomplete={autocomplete}
                    query={(autocompleteState as any).query}
                    collection={(autocompleteState as any).collections[0]}
                  />
                )}
              </div>
            </form>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

function useSearchProps() {
  let buttonRef = useRef<React.ElementRef<'button'>>(null)
  let [open, setOpen] = useState(false)

  return {
    buttonProps: {
      ref: buttonRef,
      onClick() {
        setOpen(true)
      },
    },
    dialogProps: {
      open,
      setOpen: useCallback(
        (open: boolean) => {
          let { width = 0, height = 0 } =
            buttonRef.current?.getBoundingClientRect() ?? {}
          if (!open || (width !== 0 && height !== 0)) {
            setOpen(open)
          }
        },
        [setOpen],
      ),
    },
  }
}

export function Search() {
  let [modifierKey, setModifierKey] = useState<string>()
  let { buttonProps, dialogProps } = useSearchProps()

  useEffect(() => {
    setModifierKey(
      /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl ',
    )
  }, [])

  return (
    <div className="hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pr-3 pl-2 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 lg:flex dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20"
        {...buttonProps}
      >
        <SearchIcon className="h-5 w-5 stroke-current" />
        Find something...
        <kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">{modifierKey}</kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      <Suspense fallback={null}>
        <SearchDialog className="hidden lg:block" {...dialogProps} />
      </Suspense>
    </div>
  )
}

export function MobileSearch() {
  let { close } = useMobileNavigationStore()
  let { buttonProps, dialogProps } = useSearchProps()

  return (
    <div className="contents lg:hidden">
      <button
        type="button"
        className="relative flex size-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 lg:hidden dark:hover:bg-white/5"
        aria-label="Find something..."
        {...buttonProps}
      >
        <span className="absolute size-12 pointer-fine:hidden" />
        <SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
      </button>
      <Suspense fallback={null}>
        <SearchDialog
          className="lg:hidden"
          onNavigate={close}
          {...dialogProps}
        />
      </Suspense>
    </div>
  )
}
