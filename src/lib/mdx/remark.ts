import { mdxAnnotations } from 'mdx-annotations';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';
import { remarkButton } from './remark-button';
import { remarkRowCol } from './remark-row-col';
import { remarkProperties } from './remark-properties';
import { remarkCodeGroup } from './remark-code-group';

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
  remarkButton, // transform ::button {{ ... }} to Button
  remarkProperties, // transform ::properties / ::property to Properties/Property
  remarkCodeGroup, // transform ::code-group to CodeGroup
  remarkRowCol, // transform ::row / ::col / ::col sticky / :: to Row/Col
  remarkExtractCodeTitle,
  remarkGfm,
];
