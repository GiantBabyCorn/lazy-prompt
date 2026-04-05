import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bubbleTree } from '../data/bubbleTree';
import type { BubbleNode } from '../data/types';
import { navigationPathToUrl, urlToNavigationPath } from '../utils/bubbleRouting';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function findNode(path: string[]): BubbleNode {
  let node = bubbleTree;
  for (const id of path) {
    const child = node.children?.find((c) => c.id === id);
    if (!child) break;
    node = child;
  }
  return node;
}

/** Find the full path from root to a node by ID (DFS). Returns [] if not found. */
function findPathToNode(targetId: string): string[] {
  function dfs(node: BubbleNode, path: string[]): string[] | null {
    if (node.id === targetId) return path;
    if (!node.children) return null;
    for (const child of node.children) {
      const result = dfs(child, [...path, child.id]);
      if (result) return result;
    }
    return null;
  }
  return dfs(bubbleTree, []) ?? [];
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useWorldNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const isInternalNavRef = useRef(false);

  const [navigationPath, setNavigationPath] = useState<string[]>(() =>
    urlToNavigationPath(location.pathname),
  );
  const [leafOverlayActive, setLeafOverlayActive] = useState(false);

  // Derived state
  const currentNode = useMemo(() => findNode(navigationPath), [navigationPath]);

  // Check if current node is a leaf on initial load (deep link to a leaf)
  useEffect(() => {
    if (
      currentNode.promptTemplateId &&
      (!currentNode.children || currentNode.children.length === 0)
    ) {
      setLeafOverlayActive(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // Sync URL → state for browser back/forward
  useEffect(() => {
    if (isInternalNavRef.current) {
      isInternalNavRef.current = false;
      return;
    }

    const path = urlToNavigationPath(location.pathname);
    const pathStr = path.join('/');
    const currentStr = navigationPath.join('/');

    if (pathStr !== currentStr) {
      setNavigationPath(path);
      // Check if new path leads to a leaf
      const node = findNode(path);
      const isLeaf =
        node.promptTemplateId &&
        (!node.children || node.children.length === 0);
      setLeafOverlayActive(!!isLeaf);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigateTo = useCallback(
    (nodeId: string) => {
      // Build full path from root to the target node.
      // This handles hover-revealed nodes that are deeper than direct children.
      const newPath = findPathToNode(nodeId);
      if (newPath.length === 0) return; // node not found
      setNavigationPath(newPath);
      isInternalNavRef.current = true;
      navigate(navigationPathToUrl(newPath));

      // Check if target is a leaf
      const node = findNode(newPath);
      if (
        node.promptTemplateId &&
        (!node.children || node.children.length === 0)
      ) {
        setLeafOverlayActive(true);
      }
    },
    [navigationPath, navigate],
  );

  const goBack = useCallback(() => {
    if (navigationPath.length === 0) return;

    const newPath = navigationPath.slice(0, -1);
    setNavigationPath(newPath);
    setLeafOverlayActive(false);
    isInternalNavRef.current = true;
    navigate(navigationPathToUrl(newPath));
  }, [navigationPath, navigate]);

  const reset = useCallback(() => {
    setNavigationPath([]);
    setLeafOverlayActive(false);
    isInternalNavRef.current = true;
    navigate('/');
  }, [navigate]);

  // Navigate to a leaf node directly (for click on leaf bubble)
  const openLeaf = useCallback(
    (node: BubbleNode) => {
      const newPath = findPathToNode(node.id);
      if (newPath.length === 0) return;
      setNavigationPath(newPath);
      setLeafOverlayActive(true);
      isInternalNavRef.current = true;
      navigate(navigationPathToUrl(newPath));
    },
    [navigationPath, navigate],
  );

  return {
    navigationPath,
    currentNode,
    leafOverlayActive,
    navigateTo,
    goBack,
    reset,
    openLeaf,
  };
}
