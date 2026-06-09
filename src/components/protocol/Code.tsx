'use client';

import { Tab, TabList, TabPanel, TabPanels } from '@headlessui/react';
import clsx from 'clsx';
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { create } from 'zustand';

import { Tag } from './Tag';

const languageNames: Record<string, string> = {
  js: 'JavaScript',
  ts: 'TypeScript',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  php: 'PHP',
  python: 'Python',
  ruby: 'Ruby',
  go: 'Go',
  bash: 'Bash',
  curl: 'cURL',
  sh: 'Shell',
  txt: 'Code',
};

function getPanelTitle({
  title,
  language,
}: {
  title?: string;
  language?: string;
}) {
  if (title) {
    return title;
  }
  if (language && language in languageNames) {
    return languageNames[language];
  }
  return 'Code';
}

function ClipboardIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path
        strokeWidth="0"
        d="M5.5 13.5v-5a2 2 0 0 1 2-2l.447-.894A2 2 0 0 1 9.737 4.5h.527a2 2 0 0 1 1.789 1.106l.447.894a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2Z"
      />
      <path
        fill="none"
        strokeLinejoin="round"
        d="M12.5 6.5a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2m5 0-.447-.894a2 2 0 0 0-1.79-1.106h-.527a2 2 0 0 0-1.789 1.106L7.5 6.5m5 0-1 1h-3l-1-1"
      />
    </svg>
  );
}

function CopyButton({ code }: { code: string; }) {
  let [copyCount, setCopyCount] = useState(0);
  let copied = copyCount > 0;

  useEffect(() => {
    if (copyCount > 0) {
      let timeout = setTimeout(() => setCopyCount(0), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyCount]);

  return (
    <button
      type="button"
      aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
      className={clsx(
        'group/button absolute top-3.5 right-4 overflow-hidden rounded-full py-1 pr-3 pl-2 text-2xs font-medium opacity-0 backdrop-blur-sm transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-emerald-500',
        copied
          ? 'bg-emerald-400/10 ring-1 ring-emerald-400/20 ring-inset'
          : 'bg-white/5 hover:bg-white/7.5 dark:bg-white/2.5 dark:hover:bg-white/5',
      )}
      onClick={() => {
        window.navigator.clipboard.writeText(code).then(() => {
          setCopyCount((count) => count + 1);
        });
      }}
    >
      <span
        aria-hidden={copied}
        className={clsx(
          'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
          copied && '-translate-y-1.5 opacity-0',
        )}
      >
        <ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
        Copy
      </span>
      <span
        aria-hidden={!copied}
        className={clsx(
          'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
          !copied && 'translate-y-1.5 opacity-0',
        )}
      >
        Copied!
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? 'Code copied to clipboard' : ''}
      </span>
    </button>
  );
}

function CodePanelHeader({ tag, label }: { tag?: string; label?: string; }) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className="flex h-9 items-center gap-2 border-y border-t-transparent border-b-zinc-200 bg-zinc-100 px-4 dark:border-b-white/5 dark:bg-white/1">
      {tag && (
        <div className="dark flex">
          <Tag variant="small">{tag}</Tag>
        </div>
      )}
      {tag && label && (
        <span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />
      )}
      {label && (
        <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">{label}</span>
      )}
    </div>
  );
}

function CodePanel({
  children,
  tag,
  label,
  code,
}: {
  children: React.ReactNode;
  tag?: string;
  label?: string;
  code?: string;
}) {
  let child = Children.only(children);

  if (isValidElement(child)) {
    const props = child.props as { tag?: string; label?: string; code?: string;[key: string]: any; };
    tag = props.tag ?? tag;
    label = props.label ?? label;
    code = props.code ?? code;

    // Fallback: Try to extract code from various sources
    // rehypeShiki sets code on properties.code, but Astro MDX may not pass it as props.code
    if (!code) {
      const childChildren = props.children;

      // Helper to extract text from React nodes recursively
      const extractText = (node: any): string => {
        if (typeof node === 'string') return node;
        if (Array.isArray(node)) return node.map(extractText).join('');
        if (node && typeof node === 'object') {
          // Check if it's a React element
          if (isValidElement(node)) {
            const nodeProps = (node as any).props;
            if (nodeProps?.dangerouslySetInnerHTML?.__html) {
              return nodeProps.dangerouslySetInnerHTML.__html.replace(/<[^>]*>/g, '').trim();
            }
            if (nodeProps?.children !== undefined) {
              return extractText(nodeProps.children);
            }
          }
          // Check for dangerouslySetInnerHTML or children on any object
          if ((node as any)?.props?.dangerouslySetInnerHTML?.__html) {
            return (node as any).props.dangerouslySetInnerHTML.__html.replace(/<[^>]*>/g, '').trim();
          }
          if ((node as any)?.props?.children !== undefined) {
            return extractText((node as any).props.children);
          }
          if ((node as any)?.dangerouslySetInnerHTML?.__html) {
            return (node as any).dangerouslySetInnerHTML.__html.replace(/<[^>]*>/g, '').trim();
          }
          if ((node as any)?.children !== undefined) {
            return extractText((node as any).children);
          }
        }
        return '';
      };

      // Try to extract from children (could be code element or nested structure)
      if (childChildren !== undefined) {
        const extracted = extractText(childChildren);
        if (extracted) {
          code = extracted.trim();
        }
      }

      // Fallback: Extract from dangerouslySetInnerHTML on pre element itself
      if (!code && props.dangerouslySetInnerHTML?.__html) {
        code = props.dangerouslySetInnerHTML.__html.replace(/<[^>]*>/g, '').trim();
      }

      // Last resort: Use empty string if we truly can't find code (for copy button compatibility)
      // This matches the template's behavior while preventing crashes
      if (!code) {
        code = '';
      }
    }
  }

  // Note: code might be empty string if extraction failed, which is acceptable for copy button
  // The original template throws here, but we allow empty string as fallback to prevent build failures
  if (code === undefined) {
    throw new Error(
      '`CodePanel` requires a `code` prop, or a child with a `code` prop.',
    );
  }

  return (
    <div className="group">
      <CodePanelHeader tag={tag} label={label} />
      <div className="relative">
        <pre className="shiki overflow-x-auto p-4 text-xs text-zinc-900 dark:text-white">{children}</pre>
        <CopyButton code={code} />
      </div>
    </div>
  );
}

function CodeGroupHeader({
  title,
  children,
  selectedIndex,
}: {
  title?: string;
  children: React.ReactNode;
  selectedIndex: number;
}) {
  let hasTabs = Children.count(children) > 1;

  if (!title && !hasTabs) {
    return null;
  }

  return (
    <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-transparent">
      {title && (
        <h3 className="mr-auto pt-3 text-xs font-semibold text-zinc-900 dark:text-white">
          {title}
        </h3>
      )}
      {hasTabs && (
        <TabList className="-mb-px flex gap-4 text-xs font-medium">
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                'border-b py-3 transition focus-visible:outline-2 focus-visible:outline-emerald-500 focus-visible:outline-offset-1',
                childIndex === selectedIndex
                  ? 'border-emerald-500 text-emerald-700 dark:text-emerald-400'
                  : 'border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300',
              )}
            >
              {getPanelTitle(
                isValidElement(child)
                  ? (child.props as { title?: string; language?: string; })
                  : {},
              )}
            </Tab>
          ))}
        </TabList>
      )}
    </div>
  );
}

function CodeGroupPanels({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodePanel>) {
  let hasTabs = Children.count(children) > 1;

  if (hasTabs) {
    return (
      <TabPanels>
        {Children.map(children, (child) => (
          <TabPanel>
            <CodePanel {...props}>{child}</CodePanel>
          </TabPanel>
        ))}
      </TabPanels>
    );
  }

  return <CodePanel {...props}>{children}</CodePanel>;
}

function usePreventLayoutShift() {
  let positionRef = useRef<HTMLElement>(null);
  let rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (typeof rafRef.current !== 'undefined') {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return {
    positionRef,
    preventLayoutShift(callback: () => void) {
      if (!positionRef.current) {
        return;
      }

      let initialTop = positionRef.current.getBoundingClientRect().top;

      callback();

      rafRef.current = window.requestAnimationFrame(() => {
        let newTop =
          positionRef.current?.getBoundingClientRect().top ?? initialTop;
        window.scrollBy(0, newTop - initialTop);
      });
    },
  };
}

const usePreferredLanguageStore = create<{
  preferredLanguages: Array<string>;
  addPreferredLanguage: (language: string) => void;
}>()((set) => ({
  preferredLanguages: [],
  addPreferredLanguage: (language) =>
    set((state) => ({
      preferredLanguages: [
        ...state.preferredLanguages.filter(
          (preferredLanguage) => preferredLanguage !== language,
        ),
        language,
      ],
    })),
}));

function useTabGroupProps(availableLanguages: Array<string>) {
  let { preferredLanguages, addPreferredLanguage } = usePreferredLanguageStore();
  let [selectedIndex, setSelectedIndex] = useState(0);
  let activeLanguage = [...availableLanguages].sort(
    (a, z) => preferredLanguages.indexOf(z) - preferredLanguages.indexOf(a),
  )[0];
  let languageIndex = availableLanguages.indexOf(activeLanguage);
  let newSelectedIndex = languageIndex === -1 ? selectedIndex : languageIndex;
  if (newSelectedIndex !== selectedIndex) {
    setSelectedIndex(newSelectedIndex);
  }

  let { positionRef, preventLayoutShift } = usePreventLayoutShift();

  return {
    as: 'div' as const,
    ref: positionRef,
    selectedIndex,
    onChange: (newSelectedIndex: number) => {
      preventLayoutShift(() =>
        addPreferredLanguage(availableLanguages[newSelectedIndex]),
      );
    },
  };
}

const CodeGroupContext = createContext(false);

export function CodeGroup({
  children,
  title,
  ...props
}: React.ComponentPropsWithoutRef<typeof CodeGroupPanels> & { title?: string; }) {
  const groupId = useRef(`code-group-${Math.random().toString(36).substr(2, 9)}`).current;

  // Parse children directly to extract individual code blocks using regex (works in SSR)
  const codeBlocks = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const blocks: Array<{ html: string; title: string; language: string; code: string; }> = [];

    childrenArray.forEach((child) => {
      if (isValidElement(child)) {
        const childProps = child.props as any;
        // Astro passes HTML in 'value' prop, not dangerouslySetInnerHTML
        const html = childProps?.value || childProps?.dangerouslySetInnerHTML?.__html || '';

        if (html) {
          // Simple regex to match all pre elements
          const preRegex = /<pre[^>]*>([\s\S]*?)<\/pre>/gi;
          let match;
          let blockIndex = 0;

          while ((match = preRegex.exec(html)) !== null) {
            const preHTML = match[0];

            // Extract data-language attribute (from syntax highlighting)
            const dataLangMatch = preHTML.match(/data-language="([^"]*)"/);
            const dataLanguage = dataLangMatch ? dataLangMatch[1] : 'txt';

            // Extract data-title attribute (from mdx-annotations {{ title: 'cURL' }})
            const dataTitleMatch = preHTML.match(/data-title="([^"]*)"/);
            const titleAttr = dataTitleMatch ? dataTitleMatch[1] : null;

            // Extract data-display-lang attribute (from mdx-annotations {{ language: 'js' }})
            // This overrides the display language while keeping syntax highlighting as-is
            const displayLangMatch = preHTML.match(/data-display-lang="([^"]*)"/);
            const displayLangOverride = displayLangMatch ? displayLangMatch[1] : null;

            // Determine display language:
            // 1. If there's a display language override, use it
            // 2. Otherwise use data-language from code fence
            const displayLanguage = displayLangOverride || dataLanguage;

            // Extract text content from HTML and clean up the pre element
            const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
            let code = '';
            let cleanedHTML = preHTML;

            if (tempDiv) {
              tempDiv.innerHTML = preHTML;
              const preElement = tempDiv.querySelector('pre');

              if (preElement) {
                // Extract code text
                code = preElement.textContent || '';

                // Check if there's highlighted HTML stored in data attribute
                const highlightedHtml = preElement.getAttribute('data-highlighted');

                if (highlightedHtml) {
                  // Use the highlighted HTML from the data attribute
                  const codeElement = preElement.querySelector('code');
                  if (codeElement) {
                    codeElement.innerHTML = highlightedHtml;
                  }
                }

                // Replace classes and remove inline styles
                preElement.className = 'overflow-x-auto p-4 text-xs text-white';
                preElement.removeAttribute('style');
                preElement.removeAttribute('tabindex');
                preElement.removeAttribute('data-highlighted');
                preElement.removeAttribute('annotation');
                preElement.removeAttribute('language');
                preElement.removeAttribute('code');

                // Get the cleaned HTML
                cleanedHTML = tempDiv.innerHTML;
              }
            } else {
              code = preHTML.replace(/<[^>]*>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

              // Server-side: Use regex to clean up the HTML (only the pre tag)
              cleanedHTML = preHTML
                .replace(/<pre\s+class="[^"]*"/g, '<pre class="overflow-x-auto p-4 text-xs text-white"')
                .replace(/<pre([^>]*)\s+style="[^"]*"/g, '<pre$1')
                .replace(/<pre([^>]*)\s+tabindex="[^"]*"/g, '<pre$1');
            }

            // Fallback: detect language from code content when annotations don't work
            let detectedLanguage = displayLanguage;
            if (dataLanguage === 'bash' && !displayLangOverride) {
              if (code.includes('JavaScript SDK') || code.includes('npm install')) {
                detectedLanguage = 'js';
              } else if (code.includes('Python SDK') || code.includes('pip install')) {
                detectedLanguage = 'python';
              } else if (code.includes('PHP SDK') || code.includes('composer require')) {
                detectedLanguage = 'php';
              }
            }

            // Determine the title
            let blockTitle: string;
            if (titleAttr) {
              blockTitle = titleAttr;
            } else if (dataLanguage === 'bash' && blockIndex === 0) {
              // First bash block in a group is typically cURL
              blockTitle = 'cURL';
            } else {
              blockTitle = getPanelTitle({ language: detectedLanguage });
            }

            blocks.push({
              html: cleanedHTML,
              title: blockTitle,
              language: detectedLanguage,
              code,
            });
            blockIndex++;
          }
        }
      }
    });

    return blocks;
  }, [children]);

  const hasTabs = codeBlocks.length > 1;

  let containerClassName =
    'my-6 overflow-hidden rounded-2xl bg-zinc-50 ring-1 ring-zinc-200 shadow-md dark:bg-zinc-900 dark:ring-white/10';

  // If we have parsed code blocks, render radio button tabs (CSS-only switching)
  if (hasTabs) {
    return (
      <div className={containerClassName}>
        <div className="not-prose">
          {/* Hidden radio buttons at the top level so they're siblings to content */}
          {codeBlocks.map((_, index) => (
            <input
              key={`radio-${index}`}
              type="radio"
              id={`${groupId}-tab-${index}`}
              name={groupId}
              defaultChecked={index === 0}
              className="peer sr-only"
              data-index={index}
            />
          ))}

          {/* Tab headers */}
          <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-transparent">
            {title && (
              <h3 className="mr-auto pt-3 text-xs font-semibold text-zinc-900 dark:text-white">
                {title}
              </h3>
            )}
            <div className="flex gap-4 text-xs font-medium -mb-px">
              {codeBlocks.map((block, index) => (
                <label
                  key={index}
                  htmlFor={`${groupId}-tab-${index}`}
                  className="border-b py-3 transition cursor-pointer border-transparent text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-300"
                  data-tab-label={index}
                >
                  {block.title}
                </label>
              ))}
            </div>
          </div>

          {/* Tab content - shown/hidden based on radio state */}
          {codeBlocks.map((block, index) => (
            <div
              key={index}
              className={`group tab-content`}
              data-tab-content={index}
              style={{ display: index === 0 ? 'block' : 'none' }}
            >
              <div className="relative">
                <div
                  dangerouslySetInnerHTML={{ __html: block.html }}
                  className="[&>pre]:!m-0 [&>pre]:!border-0 group"
                />
                <CopyButton code={block.code} />
              </div>
            </div>
          ))}
        </div>

        {/* CSS to handle tab switching, active tab highlighting, and visible keyboard focus */}
        <style dangerouslySetInnerHTML={{
          __html: codeBlocks.map((_, index) => `
            #${groupId}-tab-${index}:checked ~ div label[data-tab-label="${index}"] {
              border-color: rgb(16 185 129) !important;
              color: rgb(4 120 87) !important;
            }
            .dark #${groupId}-tab-${index}:checked ~ div label[data-tab-label="${index}"] {
              color: rgb(52 211 153) !important;
            }
            #${groupId}-tab-${index}:focus-visible ~ div label[data-tab-label="${index}"] {
              outline: 2px solid rgb(16 185 129);
              outline-offset: -2px;
            }
            #${groupId}-tab-${index}:checked ~ div[data-tab-content="${index}"] {
              display: block !important;
            }
            #${groupId}-tab-${index}:checked ~ div[data-tab-content]:not([data-tab-content="${index}"]) {
              display: none !important;
            }
          `).join('\n')
        }} />
      </div>
    );
  }

  // Fallback: render single code block with title if present
  // Try to extract title from the first code block
  let singleBlockTitle: string | undefined;
  if (codeBlocks.length === 1 && codeBlocks[0].title !== 'Code') {
    singleBlockTitle = codeBlocks[0].title;
  }

  return (
    <CodeGroupContext.Provider value={true}>
      <div className={containerClassName}>
        <div className="not-prose">
          {singleBlockTitle && (
            <div className="flex min-h-[calc(--spacing(12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-200 bg-zinc-100 px-4 dark:border-zinc-800 dark:bg-transparent">
              <h3 className="mr-auto pt-3 text-xs font-semibold text-zinc-900 dark:text-white">
                {singleBlockTitle}
              </h3>
            </div>
          )}
          <div className="group">
            <div className="relative">
              {codeBlocks.length === 1 ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: codeBlocks[0].html }}
                    className="[&>pre]:!m-0 [&>pre]:!border-0"
                  />
                  <CopyButton code={codeBlocks[0].code} />
                </>
              ) : (
                <pre className="shiki overflow-x-auto p-4 text-xs text-zinc-900 dark:text-white">{children}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </CodeGroupContext.Provider>
  );
}

export function Code({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) {
  let isGrouped = useContext(CodeGroupContext);

  if (isGrouped) {
    if (typeof children !== 'string') {
      throw new Error(
        '`Code` children must be a string when nested inside a `CodeGroup`.',
      );
    }
    return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />;
  }

  return <code {...props}>{children}</code>;
}

// Pass-through. The code-block chrome (rounded container, optional title header,
// copy button) is added at HAST level by rehypeWrapCodeBlocks, so the React `pre`
// mapping only needs to render the highlighted <pre>. Wrapping in CodeGroup here
// would double the chrome. The `::code-group` directive still uses CodeGroup.
export function Pre({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'pre'>) {
  return <pre {...props}>{children}</pre>;
}
