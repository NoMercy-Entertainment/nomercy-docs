import { getCollection } from 'astro:content';
import { navStructure } from './nav-structure';

export interface NavLink {
  title: string;
  href: string;
  order?: number;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
  order?: number;
}

export interface NavSection {
  title: string;
  href: string;
  groups: NavGroup[];
  order?: number;
}

export type Product =
  | 'nomercy-media-server'
  | 'nomercy-app-web'
  | 'nomercy-app-android'
  | 'nomercy-player-core'
  | 'nomercy-video-player'
  | 'nomercy-music-player'
  | 'nomercy-api';

export interface ProductNavigation {
  product: Product;
  label: string;
  href: string;
  sections: NavGroup[];
}

export interface NavigationResult {
  sections: NavSection[];
  apiGroups: NavGroup[];
  products: ProductNavigation[];
}

const PRODUCTS: Array<{ product: Product; label: string; collection: string; href: string; order: number; urlBase?: string }> = [
  { product: 'nomercy-media-server',  label: 'Server',    collection: 'nomercy-media-server',  href: '/nomercy-media-server/overview',  order: 1 },
  { product: 'nomercy-app-web',       label: 'Web App',   collection: 'nomercy-app-web',        href: '/nomercy-app-web/overview',        order: 2 },
  { product: 'nomercy-app-android',   label: 'Android',   collection: 'nomercy-app-android',    href: '/nomercy-app-android/overview',    order: 3 },
  { product: 'nomercy-player-core',   label: 'Core',      collection: 'nomercy-player-core',    href: '/nomercy-player-core/introduction',    order: 4 },
  { product: 'nomercy-video-player',  label: 'Video',     collection: 'nomercy-video-player',   href: '/nomercy-video-player/introduction',   order: 5 },
  { product: 'nomercy-music-player',  label: 'Music',     collection: 'nomercy-music-player',   href: '/nomercy-music-player/introduction',   order: 6 },
  { product: 'nomercy-api',           label: 'API',       collection: 'nomercy-api',            href: '/nomercy-api/overview',            order: 7 },
];

export async function getNavigation(): Promise<NavigationResult> {
  const results = await Promise.all(
    PRODUCTS.map(async (meta) => {
      try {
        const entries = await getCollection(meta.collection as any, ({ data }: any) => data.draft !== true);
        const groups = buildGroups(meta.collection, entries, meta.urlBase ?? meta.collection);
        return {
          product: meta.product,
          label: meta.label,
          href: meta.href,
          groups,
        };
      } catch {
        return { product: meta.product, label: meta.label, href: meta.href, groups: [] };
      }
    })
  );

  const sections: NavSection[] = results.map((r, i) => ({
    title: r.label,
    href: r.href,
    groups: r.groups,
    order: PRODUCTS[i].order,
  }));

  return {
    sections: sections.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    apiGroups: results.find(r => r.product === 'nomercy-api')?.groups ?? [],
    products: results.map((r) => ({
      product: r.product,
      label: r.label,
      href: r.href,
      sections: r.groups,
    })),
  };
}

function stripLocalePrefix(id: string): string {
  // Content Layer glob ids are like `en/overview.mdx` or `signalr/cast-hub.mdx`.
  // Strip the `en/` locale prefix and the file extension so the result matches
  // the manifest keys, which are stored without locale prefix or extension.
  const withoutExt = id.replace(/\.(md|mdx)$/, '');
  if (/^[a-z]{2}$/.test(withoutExt)) return '';
  return withoutExt.replace(/^[a-z]{2}\//, '');
}

// Build the sidebar groups for one collection from the manifest in nav-structure.ts.
// Group order and page order are the array order in the manifest — frontmatter `order`
// and `category` are not consulted. Titles come from each entry's frontmatter `title`.
// Any non-draft page not listed in the manifest is surfaced under "Other" so it never
// vanishes silently; `npm run check:nav` turns that case into a build failure.
function buildGroups(
  collection: string,
  docs: Array<{ id: string; data: { title: string } }>,
  urlBase: string
): NavGroup[] {
  const bySlug = new Map<string, { title: string }>();
  for (const doc of docs) {
    const slug = stripLocalePrefix(doc.id);
    if (slug === '' || slug === 'index' || slug.endsWith('/index')) continue;
    bySlug.set(slug, doc.data);
  }

  const used = new Set<string>();
  const groups: NavGroup[] = (navStructure[collection] ?? []).map((group, index) => ({
    title: group.group,
    order: index,
    links: group.pages.flatMap((slug) => {
      const data = bySlug.get(slug);
      if (!data) return [];
      used.add(slug);
      return [{
        title: data.title,
        href: `/${urlBase}/${slug}`.replace(/\/+/g, '/'),
      }];
    }),
  })).filter((group) => group.links.length > 0);

  const orphans = [...bySlug.keys()].filter((slug) => !used.has(slug));
  if (orphans.length > 0) {
    groups.push({
      title: 'Other',
      order: groups.length,
      links: orphans.map((slug) => ({
        title: bySlug.get(slug)!.title,
        href: `/${urlBase}/${slug}`.replace(/\/+/g, '/'),
      })),
    });
  }

  return groups;
}

export async function getNavigationForProduct(product: Product): Promise<NavGroup[]> {
  const meta = PRODUCTS.find(p => p.product === product);
  if (!meta) return [];

  try {
    const entries = await getCollection(meta.collection as any, ({ data }: any) => data.draft !== true) as Array<{ id: string; data: { title: string } }>;
    return buildGroups(meta.collection, entries, meta.urlBase ?? meta.collection);
  } catch {
    return [];
  }
}

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

export function getTocFromHeadings(headings: { depth: number; slug: string; text: string }[]): TocItem[] {
  return headings
    .filter(h => h.depth >= 2 && h.depth <= 3)
    .map(h => ({ id: h.slug, title: h.text, depth: h.depth }));
}
