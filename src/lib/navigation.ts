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

/**
 * Navigation result including sections and API groups
 */
export interface NavigationResult {
  sections: NavSection[];
  apiGroups: NavGroup[];
}

/**
 * Generate navigation structure from all content collections
 * Returns navigation organized by collection (App, Media Server) and separate API groups
 */
export async function getNavigation(): Promise<NavigationResult> {
  // Fetch all collections in parallel
  const [appDocs, mediaserverDocs, playerDocs, docs] = await Promise.all([
    getCollection('app', ({ data }) => data.draft !== true).catch(() => []),
    getCollection('mediaserver', ({ data }) => data.draft !== true).catch(() => []),
    getCollection('player', ({ data }) => data.draft !== true).catch(() => []),
    getCollection('docs', ({ data }) => data.draft !== true).catch(() => []),
  ]);

  const sections: NavSection[] = [];

  // App Documentation Section
  if (appDocs.length > 0) {
    const appGroups = groupByCategory(appDocs, '/app');
    sections.push({
      title: 'App',
      href: '/app',
      groups: appGroups,
      order: 1,
    });
  }

  // Media Server Documentation Section
  if (mediaserverDocs.length > 0) {
    const serverGroups = groupByCategory(mediaserverDocs, '/mediaserver');
    sections.push({
      title: 'Media Server',
      href: '/mediaserver',
      groups: serverGroups,
      order: 2,
    });
  }

  // Player SDK Documentation Section
  if (playerDocs.length > 0) {
    const playerGroups = groupByCategory(playerDocs, '/player');
    sections.push({
      title: 'Player SDK',
      href: '/player',
      groups: playerGroups,
      order: 3,
    });
  }

  // API Documentation groups (shown directly in sidebar, not as a section)
  const apiGroups = docs.length > 0 ? groupByCategory(docs, '') : [];

  return {
    sections: sections.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    apiGroups,
  };
}

/**
 * Group documents by category and sort them
 */
function groupByCategory(
  docs: Array<{ slug: string; data: { title: string; category?: string; order?: number } }>,
  baseHref: string
): NavGroup[] {
  // Group by category
  const groupedDocs = docs.reduce((acc, doc) => {
    // Skip index files from being listed as links (they're the section landing pages)
    if (doc.slug === 'index') return acc;

    const category = doc.data.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      title: doc.data.title,
      href: `${baseHref}/${doc.slug}`.replace(/\/+/g, '/'),
      order: doc.data.order || 999,
    });
    return acc;
  }, {} as Record<string, NavLink[]>);

  // Sort links within each group by order
  Object.keys(groupedDocs).forEach((key) => {
    groupedDocs[key].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  });

  // Define category order (customize as needed)
  const categoryOrder: Record<string, number> = {
    'Getting Started': 1,
    'Overview': 2,
    'Guides': 3,
    'General': 4,
    'Kit': 10,
    'Video Player': 20,
    'Video Plugins': 25,
    'Music Player': 30,
    'Music Plugins': 35,
    'Configuration': 40,
    'Adapters': 41,
    'Plugins': 42,
    'Recipes': 50,
    'Advanced': 60,
    'Resources': 70,
    'Reference': 80,
    'Plugin Standard': 85,
    'Migration': 90,
    'Other': 999,
  };

  // Convert to NavGroup array and sort
  const navigation: NavGroup[] = Object.keys(groupedDocs)
    .map((category) => ({
      title: category,
      links: groupedDocs[category],
      order: categoryOrder[category] ?? 50,
    }))
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

  return navigation;
}

/**
 * Get navigation for a specific section (for sidebar context)
 */
export async function getNavigationForSection(section: 'app' | 'mediaserver' | 'player' | 'docs'): Promise<NavGroup[]> {
  const collectionName = section;
  const baseHref = section === 'docs' ? '' : `/${section}`;

  try {
    const docs = await getCollection(collectionName, ({ data }) => data.draft !== true);
    return groupByCategory(docs, baseHref);
  } catch {
    return [];
  }
}

export interface TocItem {
  id: string;
  title: string;
  depth: number;
}

/**
 * Extract table of contents from markdown headings
 */
export function getTocFromHeadings(headings: { depth: number; slug: string; text: string }[]): TocItem[] {
  return headings
    .filter((heading) => heading.depth >= 2 && heading.depth <= 3)
    .map((heading) => ({
      id: heading.slug,
      title: heading.text,
      depth: heading.depth,
    }));
}
