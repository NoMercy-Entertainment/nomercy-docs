import { type MDXComponents } from 'mdx/types'

import * as mdxComponents from './src/components/protocol'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    ...mdxComponents,
  }
}
