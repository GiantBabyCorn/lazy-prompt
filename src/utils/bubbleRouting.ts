import type { BubbleNode } from '../data/types';
import { bubbleTree } from '../data/bubbleTree';

/**
 * Derive a URL-friendly slug from a node ID relative to its parent.
 * e.g., "translation-en-zh" under parent "translation" → "en-zh"
 *       "translation" under root → "translation"
 */
function getSlug(nodeId: string, parentId: string): string {
  const prefix = parentId + '-';
  if (parentId !== 'root' && nodeId.startsWith(prefix)) {
    return nodeId.slice(prefix.length);
  }
  return nodeId;
}

/**
 * Convert a navigation path (array of node IDs) to a URL string.
 * e.g., [] → "/"
 *       ["read"] → "/read/"
 *       ["read", "read-webpage"] → "/read/webpage/"
 */
export function navigationPathToUrl(path: string[]): string {
  if (path.length === 0) return '/';

  let parentId = 'root';
  const slugs: string[] = [];

  for (const nodeId of path) {
    slugs.push(getSlug(nodeId, parentId));
    parentId = nodeId;
  }

  return '/' + slugs.join('/') + '/';
}

/**
 * Convert a URL pathname to a navigation path (array of node IDs).
 * Walks the bubble tree matching slugs at each level.
 */
export function urlToNavigationPath(pathname: string): string[] {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return [];

  const segments = clean.split('/');
  const path: string[] = [];
  let currentNode: BubbleNode = bubbleTree;

  for (const slug of segments) {
    if (!currentNode.children) break;

    const match = currentNode.children.find(
      (child) => getSlug(child.id, currentNode.id) === slug,
    );

    if (!match) break;
    path.push(match.id);
    currentNode = match;
  }

  return path;
}
