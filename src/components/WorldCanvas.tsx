import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { BubbleNode } from '../data/types';
import { useActivationState } from '../hooks/useActivationState';
import { usePhysicsSimulation } from '../hooks/usePhysicsSimulation';
import { WorldBubbleNode } from './WorldBubbleNode';
import { WorldConnectorLines } from './WorldConnectorLines';
import { PHYSICS } from '../physics/constants';
import type { PhysicsBubble } from '../physics/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface WorldCanvasProps {
  navigationPath: string[];
  onNavigate: (nodeId: string) => void;
  onGoBack: () => void;
  onLeafClick: (node: BubbleNode) => void;
  leafOverlayActive: boolean;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WorldCanvas({
  navigationPath,
  onNavigate,
  onGoBack,
  onLeafClick,
  leafOverlayActive,
}: WorldCanvasProps) {
  // Direct hover target (the bubble the cursor is actually over)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Ref to getBubble — declared early so useMemo below can access it.
  // Updated after usePhysicsSimulation returns.
  const getBubbleRef = useRef<((id: string) => PhysicsBubble | undefined) | null>(null);

  // Expanded hover set: includes ancestor chain so hovering sub-sub-bubble
  // also keeps sub-bubble's children visible
  const hoveredNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (!hoveredNodeId) return set;

    set.add(hoveredNodeId);
    let current = hoveredNodeId;
    const currentFocusedId =
      navigationPath.length > 0
        ? navigationPath[navigationPath.length - 1]
        : 'root';

    for (let i = 0; i < 10; i++) {
      const bubble = getBubbleRef.current?.(current);
      if (!bubble || !bubble.parentId || bubble.parentId === currentFocusedId) break;
      set.add(bubble.parentId);
      current = bubble.parentId;
    }

    return set;
  }, [hoveredNodeId, navigationPath]);

  // Compute desired activation state
  const { activeIds, focusedId, goBackId } = useActivationState(
    navigationPath,
    hoveredNodeIds,
    leafOverlayActive,
  );

  // Physics simulation
  const { containerRef, renderedIds, registerRef, getBubble } =
    usePhysicsSimulation(activeIds, focusedId, goBackId, hoveredNodeIds, leafOverlayActive);

  // Keep ref in sync
  getBubbleRef.current = getBubble;

  // -- Hover margin: track mouse position and check distance to hovered bubble --
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Track mouse position on the SVG
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  // Check hover margin: when SVG mouseLeave fires on a bubble, check if
  // the cursor is still within the margin zone
  const handleHoverEnd = useCallback(
    (nodeId: string) => {
      const bubble = getBubble(nodeId);
      if (!bubble) {
        setHoveredNodeId((prev) => (prev === nodeId ? null : prev));
        return;
      }

      const dx = mousePos.current.x - bubble.x;
      const dy = mousePos.current.y - bubble.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const margin = bubble.visualRadius * PHYSICS.HOVER_MARGIN_FRACTION;

      if (dist > bubble.visualRadius + margin) {
        // Cursor is outside margin — actually end hover
        setHoveredNodeId((prev) => (prev === nodeId ? null : prev));
      }
      // else: cursor still within margin, keep hovering
    },
    [getBubble],
  );

  // Periodically check if cursor has left the hover margin zone
  // (because SVG mouseLeave won't fire again if we suppressed it)
  useEffect(() => {
    if (!hoveredNodeId) return;

    const interval = setInterval(() => {
      const bubble = getBubbleRef.current?.(hoveredNodeId);
      if (!bubble) {
        setHoveredNodeId(null);
        return;
      }
      const dx = mousePos.current.x - bubble.x;
      const dy = mousePos.current.y - bubble.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const margin = bubble.visualRadius * PHYSICS.HOVER_MARGIN_FRACTION;

      if (dist > bubble.visualRadius + margin) {
        setHoveredNodeId(null);
      }
    }, 100); // check every 100ms

    return () => clearInterval(interval);
  }, [hoveredNodeId]);

  // Click handler
  const handleClick = useCallback(
    (nodeId: string) => {
      const bubble = getBubble(nodeId);
      if (!bubble) return;

      if (bubble.role === 'goBack') {
        onGoBack();
        return;
      }

      const { node } = bubble;
      const isLeaf =
        node.promptTemplateId !== undefined &&
        (!node.children || node.children.length === 0);

      if (isLeaf) {
        onLeafClick(node);
      } else if (node.children && node.children.length > 0) {
        onNavigate(nodeId);
      }
    },
    [getBubble, onNavigate, onGoBack, onLeafClick],
  );

  const handleHoverStart = useCallback((nodeId: string) => {
    setHoveredNodeId(nodeId);
  }, []);

  // Get active bubbles for connector lines
  const activeBubbles = useMemo(() => {
    return renderedIds
      .map((id) => getBubble(id))
      .filter((b): b is NonNullable<typeof b> => b !== undefined);
  }, [renderedIds, getBubble]);

  return (
    <div ref={containerRef} className="world-canvas">
      <svg
        width="100%"
        height="100%"
        style={{ display: 'block', overflow: 'visible' }}
        onMouseMove={handleMouseMove}
      >
        {/* Connector lines */}
        <WorldConnectorLines bubbles={activeBubbles} getBubble={getBubble} />

        {/* Bubble nodes */}
        {renderedIds.map((id) => {
          const bubble = getBubble(id);
          if (!bubble) return null;

          return (
            <WorldBubbleNode
              key={id}
              ref={(el) => registerRef(id, el)}
              bubble={bubble}
              onClick={() => handleClick(id)}
              onHoverStart={() => handleHoverStart(id)}
              onHoverEnd={() => handleHoverEnd(id)}
            />
          );
        })}
      </svg>
    </div>
  );
}
