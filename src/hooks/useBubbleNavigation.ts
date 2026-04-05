import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bubbleTree } from '../data/bubbleTree';
import type { BubbleNode } from '../data/types';
import { navigationPathToUrl, urlToNavigationPath } from '../utils/bubbleRouting';

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
  const navigate = useNavigate();
  const location = useLocation();
  const isInternalNavRef = useRef(false);

  // Initialize from URL on first render
  const [navigationPath, setNavigationPath] = useState<string[]>(() => {
    return urlToNavigationPath(location.pathname);
  });

  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>('idle');
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null);
  const [previousNode, setPreviousNode] = useState<BubbleNode | null>(null);
  const animTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const currentNode = useMemo(() => findNode(navigationPath), [navigationPath]);
  const currentChildren = useMemo(() => currentNode.children ?? [], [currentNode]);
  const isLeaf = !currentNode.children || currentNode.children.length === 0;
  const parentNode = useMemo(
    () => (navigationPath.length > 0 ? findNode(navigationPath.slice(0, -1)) : null),
    [navigationPath],
  );

  // Sync URL → state when browser back/forward is used
  useEffect(() => {
    if (isInternalNavRef.current) {
      isInternalNavRef.current = false;
      return;
    }

    // External navigation (browser back/forward)
    const path = urlToNavigationPath(location.pathname);
    const pathStr = path.join('/');
    const currentStr = navigationPath.join('/');

    if (pathStr !== currentStr) {
      // Skip animation for browser back/forward — snap instantly
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      setNavigationPath(path);
      setAnimationPhase('idle');
      setClickedNodeId(null);
      setPreviousNode(null);
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigateTo = useCallback(
    (nodeId: string) => {
      if (animationPhase !== 'idle') return;

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

      setPreviousNode(currentNode);
      setClickedNodeId(nodeId);
      setAnimationPhase('exiting');

      animTimeoutRef.current = setTimeout(() => {
        const newPath = [...navigationPath, nodeId];
        setNavigationPath(newPath);
        setAnimationPhase('entering');

        // Push URL
        isInternalNavRef.current = true;
        navigate(navigationPathToUrl(newPath));

        animTimeoutRef.current = setTimeout(() => {
          setAnimationPhase('idle');
          setClickedNodeId(null);
          setPreviousNode(null);
        }, 500);
      }, 350);
    },
    [animationPhase, currentNode, navigationPath, navigate],
  );

  const goBack = useCallback(() => {
    if (animationPhase !== 'idle') return;
    if (navigationPath.length === 0) return;

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

    setPreviousNode(currentNode);
    setClickedNodeId(null);
    setAnimationPhase('exiting');

    animTimeoutRef.current = setTimeout(() => {
      const newPath = navigationPath.slice(0, -1);
      setNavigationPath(newPath);
      setAnimationPhase('entering');

      // Push URL
      isInternalNavRef.current = true;
      navigate(navigationPathToUrl(newPath));

      animTimeoutRef.current = setTimeout(() => {
        setAnimationPhase('idle');
        setPreviousNode(null);
      }, 500);
    }, 350);
  }, [animationPhase, navigationPath, currentNode, navigate]);

  /** Navigate multiple levels at once (e.g., skip from parent to grandchild). */
  const skipNavigateTo = useCallback(
    (nodeIds: string[]) => {
      if (animationPhase !== 'idle' || nodeIds.length === 0) return;

      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

      setPreviousNode(currentNode);
      setClickedNodeId(nodeIds[0]);
      setAnimationPhase('exiting');

      animTimeoutRef.current = setTimeout(() => {
        const newPath = [...navigationPath, ...nodeIds];
        setNavigationPath(newPath);
        setAnimationPhase('entering');

        isInternalNavRef.current = true;
        navigate(navigationPathToUrl(newPath));

        animTimeoutRef.current = setTimeout(() => {
          setAnimationPhase('idle');
          setClickedNodeId(null);
          setPreviousNode(null);
        }, 500);
      }, 350);
    },
    [animationPhase, currentNode, navigationPath, navigate],
  );

  const reset = useCallback(() => {
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    setNavigationPath([]);
    setAnimationPhase('idle');
    setClickedNodeId(null);
    setPreviousNode(null);
    isInternalNavRef.current = true;
    navigate('/');
  }, [navigate]);

  return {
    currentNode,
    navigationPath,
    navigateTo,
    skipNavigateTo,
    goBack,
    reset,
    isLeaf,
    currentChildren,
    animationPhase,
    clickedNodeId,
    previousNode,
    parentNode,
  };
}
