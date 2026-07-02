import { type MDXComponents } from 'mdx/types';

import { PlayerExample } from './src/components/PlayerExample';
import * as mdxComponents from './src/components/protocol';

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    ...mdxComponents,
    PlayerExample,
  };
}
