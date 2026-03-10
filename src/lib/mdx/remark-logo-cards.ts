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

function isLogoCardsStart(text: string): boolean {
  const t = text.trim();
  return t === '::LogoCards' || t === '::logo-cards' ||
         t.startsWith('::LogoCards ') || t.startsWith('::logo-cards ');
}

function isLogoCardStart(text: string): boolean {
  const t = text.trim();
  return t === '::LogoCard' || t.startsWith('::LogoCard ') ||
         t === '::logo-card' || t.startsWith('::logo-card ');
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
 * Remark plugin: LogoCards directive
 *
 * Usage:
 * ::LogoCards {{ heading: 'Official libraries' }}
 * ::LogoCard {{ name: 'PHP', href: '#', logo: '/images/logos/php.svg' }}
 * A popular general-purpose scripting language that is especially suited to web development.
 * ::LogoCard {{ name: 'Ruby', href: '#', logo: '/images/logos/ruby.svg' }}
 * A dynamic, open source programming language with a focus on simplicity and productivity.
 * ::
 */
export function remarkLogoCards() {
  return (tree: Root) => {
    const replacements: { parent: any; start: number; end: number; node: any }[] = [];

    visit(tree, 'paragraph', (node: any, index, parent) => {
      if (!parent || typeof index !== 'number') return;
      const text = getParagraphText(node);
      if (!isLogoCardsStart(text)) return;

      // Parse LogoCards attributes (heading)
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

          if (isLogoCardStart(sibText)) {
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

      // Build LogoCard children
      const logoCardChildren = cards.map((card) => {
        const { attrs, description } = card;
        const name = pick(attrs, 'name', 'title') || 'Card';
        const href = pick(attrs, 'href', 'url') || '#';
        const logo = pick(attrs, 'logo', 'image') || '';
        const desc = description.join(' ');

        return {
          type: 'mdxJsxFlowElement',
          name: 'LogoCard',
          attributes: [
            { type: 'mdxJsxAttribute', name: 'name', value: name },
            { type: 'mdxJsxAttribute', name: 'href', value: href },
            { type: 'mdxJsxAttribute', name: 'logo', value: logo },
            { type: 'mdxJsxAttribute', name: 'description', value: desc },
          ],
          children: [],
        };
      });

      // Build LogoCards attributes
      const logoCardsAttributes: any[] = [];
      const heading = pick(cardsAttrs, 'heading', 'title');
      if (heading) {
        logoCardsAttributes.push({ type: 'mdxJsxAttribute', name: 'heading', value: heading });
      }

      const logoCardsElement: any = {
        type: 'mdxJsxFlowElement',
        name: 'LogoCards',
        attributes: logoCardsAttributes,
        children: logoCardChildren,
      };

      replacements.push({ parent, start: index, end: endIdx, node: logoCardsElement });
    });

    // Apply in reverse order so indices remain valid
    replacements.sort((a, b) => b.start - a.start);
    for (const { parent, start, end, node } of replacements) {
      parent.children.splice(start, end - start + 1, node);
    }
  };
}
