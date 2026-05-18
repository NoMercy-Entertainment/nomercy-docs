import { getCollection } from 'astro:content';

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
  | 'nomercy-player-kit'
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

const PRODUCTS: Array<{ product: Product; label: string; collection: string; href: string; order: number }> = [
  { product: 'nomercy-media-server',  label: 'Server',    collection: 'nomercy-media-server',  href: '/nomercy-media-server/overview',  order: 1 },
  { product: 'nomercy-app-web',       label: 'Web App',   collection: 'nomercy-app-web',        href: '/nomercy-app-web/overview',        order: 2 },
  { product: 'nomercy-app-android',   label: 'Android',   collection: 'nomercy-app-android',    href: '/nomercy-app-android/overview',    order: 3 },
  { product: 'nomercy-player-kit',    label: 'Kit',       collection: 'nomercy-player-kit',     href: '/nomercy-player-kit/overview',     order: 4 },
  { product: 'nomercy-video-player',  label: 'Video',     collection: 'nomercy-video-player',   href: '/nomercy-video-player/overview',   order: 5 },
  { product: 'nomercy-music-player',  label: 'Music',     collection: 'nomercy-music-player',   href: '/nomercy-music-player/overview',   order: 6 },
  { product: 'nomercy-api',           label: 'API',       collection: 'nomercy-api',            href: '/nomercy-api/overview',            order: 7 },
];

const categoryOrder: Record<string, number> = {
  'Getting Started': 1,
  'Overview': 2,
  'Setup': 3,
  'Browsing': 4,
  'Watching & Listening': 5,
  'Watching Video': 6,
  'Listening to Music': 7,
  'Preferences': 8,
  'Dashboard (Admin)': 9,
  'Notifications & Background': 10,
  'Lifecycle': 11,
  'Playback Control': 12,
  'Queue': 13,
  'Tracks and Media': 14,
  'State': 15,
  'Auth and Fetch': 16,
  'Event System': 17,
  'Plugins': 18,
  'Adapter Ports': 19,
  'Internationalisation': 20,
  'Metrics and Diagnostics': 21,
  'Cast and Device': 22,
  'DOM Utilities': 23,
  'Types Reference': 24,
  'Configuration': 25,
  'API Methods': 26,
  'Events': 27,
  'Playlist Item': 28,
  'HLS': 29,
  'Framework Integration': 30,
  'Writing Plugins': 31,
  'Backends': 32,
  'Adapters': 33,
  'Recipes': 40,
  'The CLI': 41,
  'Media': 42,
  'Encoding': 43,
  'Remote Access & Sync': 44,
  'Maintenance': 45,
  'Troubleshooting': 50,
  'Advanced': 60,
  'Reference': 70,
  'Guides': 75,
  'General': 80,
  'Resources': 85,
  'Migration': 90,
  'Other': 999,
};

export async function getNavigation(): Promise<NavigationResult> {
  const results = await Promise.all(
    PRODUCTS.map(async (meta) => {
      try {
        const entries = await getCollection(meta.collection as any, ({ data }: any) => data.draft !== true);
        const groups = groupByCategory(entries, `/${meta.collection}`);
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

function groupByCategory(
  docs: Array<{ slug: string; data: { title: string; category?: string; order?: number } }>,
  baseHref: string
): NavGroup[] {
  const grouped = docs.reduce((acc, doc) => {
    if (doc.slug === 'index') return acc;

    const category = doc.data.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push({
      title: doc.data.title,
      href: `${baseHref}/${doc.slug}`.replace(/\/+/g, '/'),
      order: doc.data.order ?? 999,
    });
    return acc;
  }, {} as Record<string, NavLink[]>);

  Object.values(grouped).forEach(links => links.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));

  return Object.keys(grouped)
    .map(category => ({
      title: category,
      links: grouped[category],
      order: categoryOrder[category] ?? 50,
    }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getNavigationForProduct(product: Product): Promise<NavGroup[]> {
  const meta = PRODUCTS.find(p => p.product === product);
  if (!meta) return [];

  try {
    const entries = await getCollection(meta.collection as any, ({ data }: any) => data.draft !== true);
    return groupByCategory(entries, `/${meta.collection}`);
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
