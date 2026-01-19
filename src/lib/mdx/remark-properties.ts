import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

function getParagraphText(node: any): string {
  if (!node?.children) return '';
  return node.children
    .map((c: any) => {
      if (c.type === 'text') return c.value || '';
      if (c.type === 'mdxTextExpression') return `{{ ${c.value || ''} }}`;
      return '';
    })
    .join('')
    .trim();
}

function isPropertiesStart(text: string): boolean {
  const t = text.trim();
  return t === '::properties';
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

function getAnnotationData(node: any): Record<string, any> {
  // mdx-annotations stores annotation data in node.data._mdxAnnotation during remark phase
  const annotation = node?.data?._mdxAnnotation || node?.data?.hProperties?.annotation;
  if (annotation) {
    if (typeof annotation === 'object') return annotation;
    if (typeof annotation === 'string') {
      try {
        const parsed = new Function(`return ${annotation}`)();
        if (typeof parsed === 'object') return parsed;
      } catch {
        // ignore parse errors
      }
    }
  }
  return {};
}

function parseAttributes(text: string): Record<string, string> {
  const pairs: Record<string, string> = {};
  const braceRe = /\{\{\s*([\s\S]*?)\s*\}\}/g;
  let braceMatch;
  while ((braceMatch = braceRe.exec(text)) !== null) {
    const inner = braceMatch[1];
    const pairRe = /(\w+)\s*:\s*['"]([^'"]*)['"]/g;
    let m;
    while ((m = pairRe.exec(inner)) !== null) pairs[m[1]] = m[2];
  }
  return pairs;
}

/**
 * Parse ::property directive
 * Supports: ::property {{ name: 'starting_after', type: 'string' }}
 */
function parsePropertyDirective(text: string, node: any): { name: string; type?: string } | null {
  const t = text.trim();
  if (!t.startsWith('::property')) return null;
  // Make sure it's not ::properties (the container)
  if (t === '::properties' || t.startsWith('::properties ')) return null;
  
  // Get attributes from annotation (mdx-annotations parses {{ ... }})
  const annotationData = getAnnotationData(node);
  
  // Also parse {{ }} from text as fallback
  const textAttrs = parseAttributes(t);
  const attrs = { ...textAttrs, ...annotationData };
  
  const name = attrs.name;
  if (!name) return null;
  
  const type = attrs.type || undefined;
  
  return { name, type };
}

/**
 * Remark plugin: properties directives
 *
 * ::properties
 *
 * ::property {{ name: 'starting_after', type: 'string' }}
 *
 * Description text for this property.
 *
 * ::property {{ name: 'ending_before', type: 'string' }}
 *
 * Another description.
 *
 * ::
 *
 * Replaces these with Properties/Property components.
 */
export function remarkProperties() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isPropertiesStart(text)) return;

      // Find closing :: among following siblings
      // Stop at first :: that is not a ::property directive
      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          
          // Skip ::property directives
          if (sibText.trim().startsWith('::property') && !sibText.trim().startsWith('::properties')) {
            continue;
          }
          
          // Check for end marker
          if (isDirectiveEnd(sibText)) {
            endIdx = i;
            break;
          }
        }
      }
      if (endIdx < 0) return;

      // Parse all ::property directives and their content between start and end
      const properties: { name: string; type?: string; children: any[] }[] = [];
      let currentProperty: { name: string; type?: string; children: any[] } | null = null;

      for (let i = index + 1; i < endIdx; i++) {
        const sib = parent.children[i];
        
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          const parsed = parsePropertyDirective(sibText, sib);
          
          if (parsed) {
            // Start a new property
            if (currentProperty) {
              properties.push(currentProperty);
            }
            currentProperty = { name: parsed.name, type: parsed.type, children: [] };
            continue;
          }
        }
        
        // Add content to current property
        if (currentProperty) {
          currentProperty.children.push(sib);
        }
      }
      
      // Push the last property
      if (currentProperty) {
        properties.push(currentProperty);
      }

      // Build Property elements
      const propertyElements = properties.map(({ name, type, children }) => {
        const attrs: any[] = [
          { type: 'mdxJsxAttribute', name: 'name', value: name },
        ];
        if (type) {
          attrs.push({ type: 'mdxJsxAttribute', name: 'type', value: type });
        }
        
        return {
          type: 'mdxJsxFlowElement',
          name: 'Property',
          attributes: attrs,
          children: children,
        };
      });

      const propertiesElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'Properties',
        attributes: [],
        children: propertyElements,
      };

      replacements.push({ parent, start: index, end: endIdx, node: propertiesElement });
    });

    // Apply in reverse order by start index so indices remain valid
    replacements.sort((a, b) => {
      if (a.parent !== b.parent) return 0;
      return b.start - a.start;
    });
    for (const { parent, start, end, node } of replacements) {
      parent.children.splice(start, end - start + 1, node);
    }
  };
}
