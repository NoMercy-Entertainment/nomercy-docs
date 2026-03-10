import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

function pick<T>(obj: Record<string, T>, key: string, alt?: string): T | undefined {
  if (obj[key] != null) return obj[key];
  if (alt && obj[alt] != null) return obj[alt];
  return undefined;
}

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

function isIconCardsStart(text: string): boolean {
  const t = text.trim();
  return t === '::IconCards' || t === '::icon-cards' ||
         t.startsWith('::IconCards ') || t.startsWith('::icon-cards ');
}

function isIconCardStart(text: string): boolean {
  const t = text.trim();
  return t === '::IconCard' || t.startsWith('::IconCard ') ||
         t === '::icon-card' || t.startsWith('::icon-card ');
}

function isDirectiveEnd(text: string): boolean {
  const t = text.trim();
  return t === '::' || t === '::end';
}

function getAnnotationData(node: any): Record<string, any> {
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
 * Remark plugin: IconCards directive
 *
 * Usage:
 * ::IconCards {{ heading: 'Documentation' }}
 * ::IconCard {{ href: '/app', name: 'App Documentation', icon: 'app' }}
 * Description text for the app section.
 * ::IconCard {{ href: '/mediaserver', name: 'Media Server', icon: 'server' }}
 * Description text for the media server section.
 * ::
 *
 * Supported icons: app, server, api (defaults to api if not specified)
 */
export function remarkIconCards() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isIconCardsStart(text)) return;

      // Parse IconCards attributes (heading)
      const cardsAnnotation = getAnnotationData(node);
      const cardsTextPairs = parseAttributes(text);
      const cardsAttrs = { ...cardsTextPairs, ...cardsAnnotation };

      // Find closing :: among following siblings
      let endIdx = -1;
      for (let i = index + 1; i < parent.children.length; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);
          if (isDirectiveEnd(sibText)) {
            endIdx = i;
            break;
          }
        }
      }
      if (endIdx < 0) return;

      // Parse cards between start and end
      const cards: any[] = [];
      let currentCard: { attrs: Record<string, any>; description: string[] } | null = null;

      for (let i = index + 1; i < endIdx; i++) {
        const sib = parent.children[i];
        if (sib?.type === 'paragraph') {
          const sibText = getParagraphText(sib);

          if (isIconCardStart(sibText)) {
            // Save previous card if exists
            if (currentCard) {
              cards.push(currentCard);
            }
            // Start new card
            const annotationData = getAnnotationData(sib);
            const textPairs = parseAttributes(sibText);
            const attrs = { ...textPairs, ...annotationData };
            currentCard = { attrs, description: [] };
          } else if (currentCard) {
            // Add text to current card's description
            const descText = sibText
              .replace(/\{\{\s*[\s\S]*?\s*\}\}/g, '')
              .trim();
            if (descText) {
              currentCard.description.push(descText);
            }
          }
        }
      }

      // Don't forget the last card
      if (currentCard) {
        cards.push(currentCard);
      }

      // Build IconCard children
      const iconCardChildren = cards.map((card) => {
        const { attrs, description } = card;
        const href = pick(attrs, 'href', 'url') || '#';
        const name = pick(attrs, 'name', 'title') || 'Card';
        const icon = pick(attrs, 'icon') || 'api';
        const desc = description.join(' ');

        return {
          type: 'mdxJsxFlowElement',
          name: 'IconCard',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'href', value: href },
            { type: 'mdxJsxAttribute', name: 'name', value: name },
            { type: 'mdxJsxAttribute', name: 'icon', value: icon },
            { type: 'mdxJsxAttribute', name: 'description', value: desc },
          ],
          children: [],
        };
      });

      // Build IconCards attributes
      const iconCardsAttributes: any[] = [];
      const heading = pick(cardsAttrs, 'heading', 'title');
      if (heading) {
        iconCardsAttributes.push({ type: 'mdxJsxAttribute', name: 'heading', value: heading });
      }

      const iconCardsElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'IconCards',
        attributes: iconCardsAttributes,
        children: iconCardChildren,
      };

      replacements.push({ parent, start: index, end: endIdx, node: iconCardsElement });
    });

    // Apply in reverse order so indices remain valid
    replacements.sort((a, b) => b.start - a.start);
    for (const { parent, start, end, node } of replacements) {
      parent.children.splice(start, end - start + 1, node);
    }
  };
}
