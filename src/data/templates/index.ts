import type { PromptTemplate } from '../types';

/**
 * Template category registry with dynamic imports for code splitting.
 * Templates are lazy-loaded per category — only fetched when a user navigates to a leaf node.
 * Once loaded, a category is cached in memory for the session.
 */

const categoryLoaders: Record<string, () => Promise<PromptTemplate[]>> = {
  build: () => import('./build').then(m => m.default),
  translation: () => import('./translation').then(m => m.default),
  read: () => import('./read').then(m => m.default),
  write: () => import('./write').then(m => m.default),
  debug: () => import('./debug').then(m => m.default),
  explain: () => import('./explain').then(m => m.default),
  brainstorm: () => import('./brainstorm').then(m => m.default),
  learn: () => import('./learn').then(m => m.default),
  organize: () => import('./organize').then(m => m.default),
  summarize: () => import('./summarize').then(m => m.default),
};

/** Map a templateId to its category name by prefix matching. */
export function getCategory(templateId: string): string {
  const lower = templateId.toLowerCase();
  for (const cat of Object.keys(categoryLoaders)) {
    if (lower.startsWith(cat)) return cat;
  }
  return 'build'; // fallback
}

/** In-memory cache of loaded categories. */
const cache = new Map<string, PromptTemplate[]>();

/** Load a single template by ID. Fetches the category chunk on first access. */
export async function loadTemplate(templateId: string): Promise<PromptTemplate | null> {
  const category = getCategory(templateId);
  if (!cache.has(category)) {
    const loader = categoryLoaders[category];
    if (!loader) return null;
    cache.set(category, await loader());
  }
  return cache.get(category)!.find(t => t.id === templateId) ?? null;
}

/** Load all templates (for CLI scripts and validation). */
export async function loadAllTemplates(): Promise<PromptTemplate[]> {
  const all = await Promise.all(
    Object.entries(categoryLoaders).map(async ([cat, loader]) => {
      if (!cache.has(cat)) cache.set(cat, await loader());
      return cache.get(cat)!;
    })
  );
  return all.flat();
}

/** List all available category names. */
export const categoryNames = Object.keys(categoryLoaders);
