import { mdxAnnotations } from 'mdx-annotations';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';
import { remarkButton } from './remark-button';
import { remarkRowCol } from './remark-row-col';
import { remarkProperties } from './remark-properties';
import { remarkCodeGroup } from './remark-code-group';
import { remarkIconCards } from './remark-icon-cards';
import { remarkHero } from './remark-hero';
import { remarkCallout } from './remark-callout';
import { remarkLogoCards } from './remark-logo-cards';
import { remarkCleanup } from './remark-cleanup';
import { remarkVersionTags } from './remark-version-tags';

// Plugin to extract title from code fence meta and store it for rehype
function remarkExtractCodeTitle() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code) => {
      if (node.meta) {
        // Extract title from meta like: {{ title: 'Example request' }}
        const titleMatch = node.meta.match(/\{\{\s*title:\s*['"]([^'"]+)['"]\s*\}\}/);
        if (titleMatch) {
          // Store title in node data so it's available in rehype
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          (node.data.hProperties as Record<string, any>)['data-title'] = titleMatch[1];
        }
      }
    });
  };
}

export const remarkPlugins = [
  mdxAnnotations.remark,
  remarkVersionTags, // rewrite our package version tags (@rc) to the resolved npm version at build time
  remarkButton, // transform ::button {{ ... }} to Button
  remarkProperties, // transform ::properties / ::property to Properties/Property
  remarkCodeGroup, // transform ::code-group to CodeGroup
  remarkIconCards, // transform ::IconCards to IconCards component
  remarkHero, // transform ::Hero to Hero component
  remarkCallout, // transform ::Callout to Callout component
  remarkLogoCards, // transform ::LogoCards to LogoCards component
  remarkRowCol, // transform ::row / ::col / ::col sticky / :: to Row/Col
  remarkCleanup, // strip orphaned ::/::end closers left over from directive plugins
  remarkExtractCodeTitle,
  remarkGfm,
];
