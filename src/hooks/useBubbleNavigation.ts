import { useState, useCallback, useMemo, useRef } from 'react';
import { bubbleTree } from '../data/bubbleTree';
import type { BubbleNode } from '../data/types';

export type AnimationPhase = 'idle' | 'exiting' | 'entering';

export interface NavigationState {
  currentNode: BubbleNode;
  currentChildren: BubbleNode[];
  navigationPath: string[];
  isLeaf: boolean;
  animationPhase: AnimationPhase;
  clickedNodeId: string | null;
  previousNode: BubbleNode | null;
}

function findNode(path: string[]): BubbleNode {
  let node = bubbleTree;
  for (const id of path) {
    const child = node.children?.find((c) => c.id === id);
    if (!child) break;
    node = child;
  }
  return node;
}

export function useBubbleNavigation() {
  const [navigationPath, setNavigationPath] = useState<string[]>([]);
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);
  const [previousNode, setPreviousNode] = useState<BubbleNode | null>(null);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const currentNode = useMemo(() => findNode(navigationPath), [navigationPath]);
  const currentChildren = useMemo(() => currentNode.children ?? [], [currentNode]);
  const isLeaf = !currentNode.children || currentNode.children.length === 0;

  const navigateTo = useCallback(
    (nodeId: string) => {
      if (animationPhase !== 'idle') return;

      // Clear any pending timeout
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

      setPreviousNode(currentNode);
      setClickedNodeId(nodeId);
      setAnimationPhase('exiting');

      // After exit animation, switch data and enter
      animTimeoutRef.current = setTimeout(() => {
        setNavigationPath((prev) => [...prev, nodeId]);
        setAnimationPhase('entering');

        // After enter animation, go idle
        animTimeoutRef.current = setTimeout(() => {
          setAnimationPhase('idle');
          setClickedNodeId(null);
          setPreviousNode(null);
        }, 500);
      }, 350);
    },
    [animationPhase, currentNode],
  );

  const goBack = useCallback(() => {
    if (animationPhase !== 'idle') return;
    if (navigationPath.length === 0) return;

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

    setPreviousNode(currentNode);
    setClickedNodeId(null);
    setAnimationPhase('exiting');

    animTimeoutRef.current = setTimeout(() => {
      setNavigationPath((prev) => prev.slice(0, -1));
      setAnimationPhase('entering');

      animTimeoutRef.current = setTimeout(() => {
        setAnimationPhase('idle');
        setPreviousNode(null);
      }, 500);
    }, 350);
  }, [animationPhase, navigationPath, currentNode]);

  const reset = useCallback(() => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setNavigationPath([]);
    setAnimationPhase('idle');
    setClickedNodeId(null);
    setPreviousNode(null);
  }, []);

  return {
    currentNode,
    navigationPath,
    navigateTo,
    goBack,
    reset,
    isLeaf,
    currentChildren,
    animationPhase,
    clickedNodeId,
    previousNode,
  };
}
