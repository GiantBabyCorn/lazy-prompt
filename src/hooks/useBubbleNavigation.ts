import { useState, useCallback, useMemo } from 'react';
import { bubbleTree } from '../data/bubbleTree';
import type { BubbleNode } from '../data/types';

export function useBubbleNavigation() {
  const [navigationPath, setNavigationPath] = useState<string[]>([]);

  const currentNode: BubbleNode = useMemo(() => {
    let node = bubbleTree;
    for (const id of navigationPath) {
      const child = node.children?.find((c) => c.id === id);
      if (!child) break;
      node = child;
    }
    return node;
  }, [navigationPath]);

  const currentChildren = useMemo(
    () => currentNode.children ?? [],
    [currentNode],
  );

  const isLeaf = !currentNode.children || currentNode.children.length === 0;

  const navigateTo = useCallback((nodeId: string) => {
    setNavigationPath((prev) => [...prev, nodeId]);
  }, []);

  const goBack = useCallback(() => {
    setNavigationPath((prev) => prev.slice(0, -1));
  }, []);

  const reset = useCallback(() => {
    setNavigationPath([]);
  }, []);

  return {
    currentNode,
    navigationPath,
    navigateTo,
    goBack,
    reset,
    isLeaf,
    currentChildren,
  };
}
