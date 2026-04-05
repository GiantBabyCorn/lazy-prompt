import { useMemo } from 'react';
import { bubbleTree } from '../data/bubbleTree';
import type { BubbleNode } from '../data/types';
import type { BubbleRole } from '../physics/types';

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

/* ------------------------------------------------------------------ */
/*  Hook: computes which bubbles should be active and their roles      */
/* ------------------------------------------------------------------ */

export interface ActivationState {
  activeIds: Map<string, BubbleRole>; // id → role
  focusedId: string;
  goBackId: string | null;
}

export function useActivationState(
  navigationPath: string[],
  hoveredNodeIds: Set<string>,
  leafOverlayActive: boolean,
): ActivationState {
  return useMemo(() => {
    const activeIds = new Map<string, BubbleRole>();

    if (leafOverlayActive) {
      // All hidden when leaf overlay is showing
      return { activeIds, focusedId: 'root', goBackId: null };
    }

    const focusedId =
      navigationPath.length > 0
        ? navigationPath[navigationPath.length - 1]
        : 'root';

    const focusedNode = findNode(navigationPath);

    // 1. Focused node is always active
    activeIds.set(focusedId, 'focused');

    // 2. Children of focused node
    if (focusedNode.children) {
      for (const child of focusedNode.children) {
        activeIds.set(child.id, 'child');
      }
    }

    // 3. Parent as go-back
    let goBackId: string | null = null;
    if (navigationPath.length > 0) {
      goBackId =
        navigationPath.length > 1
          ? navigationPath[navigationPath.length - 2]
          : 'root';
      activeIds.set(goBackId, 'goBack');
    }

    // 4. Hover reveal chain
    addHoverRevealed(activeIds, hoveredNodeIds, focusedId);

    return { activeIds, focusedId, goBackId };
  }, [navigationPath, hoveredNodeIds, leafOverlayActive]);
}

/**
 * Recursively reveal children of hovered nodes that are themselves visible.
 */
function addHoverRevealed(
  activeIds: Map<string, BubbleRole>,
  hoveredNodeIds: Set<string>,
  _focusedId: string,
) {
  // Walk through hovered nodes and reveal their children
  for (const hoveredId of hoveredNodeIds) {
    const role = activeIds.get(hoveredId);
    // Only reveal if the hovered node is currently active as child or hoverRevealed
    if (role === 'child' || role === 'hoverRevealed') {
      const hoveredNode = findNodeById(hoveredId);
      if (hoveredNode?.children) {
        for (const child of hoveredNode.children) {
          if (!activeIds.has(child.id)) {
            activeIds.set(child.id, 'hoverRevealed');
          }
        }
      }
    }
  }
}

function findNodeById(id: string): BubbleNode | undefined {
  function search(node: BubbleNode): BubbleNode | undefined {
    if (node.id === id) return node;
    if (node.children) {
      for (const child of node.children) {
        const found = search(child);
        if (found) return found;
      }
    }
    return undefined;
  }
  return search(bubbleTree);
}
