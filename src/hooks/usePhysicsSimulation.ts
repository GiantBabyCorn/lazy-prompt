import { useRef, useEffect, useCallback, useState } from 'react';
import { bubbleTree } from '../data/bubbleTree';
import { PhysicsEngine } from '../physics/PhysicsEngine';
import type { PhysicsBubble, BubbleRole } from '../physics/types';
import {
  TEXT_MIN_FONT_SIZE,
  TEXT_SHOW_DESC_RADIUS,
  TEXT_SCALE_UP_RADIUS,
  TEXT_MAX_FONT_SIZE,
} from '../physics/constants';

/* ------------------------------------------------------------------ */
/*  Hook: bridges PhysicsEngine with React + direct DOM updates        */
/* ------------------------------------------------------------------ */

export function usePhysicsSimulation(
  activeIdsMap: Map<string, BubbleRole>,
  focusedId: string,
  goBackId: string | null,
  hoveredNodeIds: Set<string>,
  leafOverlayActive: boolean,
) {
  const engineRef = useRef<PhysicsEngine | null>(null);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef(0);
  const svgRefsMap = useRef<Map<string, SVGGElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Cached line element refs (rebuilt when rendered set changes)
  const lineCacheRef = useRef<Map<string, SVGLineElement>>(new Map());
  const lineCacheDirtyRef = useRef(true);

  // Track canvas readiness (has been resized at least once)
  const [canvasReady, setCanvasReady] = useState(false);

  // Track which bubble IDs are in the DOM
  const [renderedIds, setRenderedIds] = useState<string[]>([]);

  // Initialize engine once
  if (!engineRef.current) {
    engineRef.current = new PhysicsEngine(bubbleTree);
  }
  const engine = engineRef.current;

  // Notify React when active set changes
  useEffect(() => {
    engine.setOnActiveSetChange(() => {
      setRenderedIds(Array.from(engine.activeBubbleIds));
      lineCacheDirtyRef.current = true;
    });
  }, [engine]);

  // Resize observer — MUST fire before activation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        engine.resize(width, height);
        setCanvasReady(true);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [engine]);

  // Sync activation state from React → engine (only after canvas is ready)
  useEffect(() => {
    if (!canvasReady) return;

    if (leafOverlayActive) {
      engine.deactivateAll();
      setRenderedIds([]);
      return;
    }

    const desiredIds = new Set(activeIdsMap.keys());
    const currentIds = engine.activeBubbleIds;

    // Deactivate bubbles no longer desired
    const toDeactivate: string[] = [];
    for (const id of currentIds) {
      if (!desiredIds.has(id)) {
        toDeactivate.push(id);
      }
    }
    if (toDeactivate.length > 0) {
      engine.deactivateBubbles(toDeactivate);
    }

    // Activate new bubbles
    const roleGroups = new Map<BubbleRole, string[]>();
    for (const [id, role] of activeIdsMap) {
      const existing = engine.getBubble(id);
      if (
        !currentIds.has(id) ||
        existing?.activation === 'deactivating' ||
        existing?.activation === 'inactive'
      ) {
        if (!roleGroups.has(role)) roleGroups.set(role, []);
        roleGroups.get(role)!.push(id);
      } else if (existing) {
        // Update role for already-active bubbles
        const wasGoBack = existing.isGoBack;
        existing.role = role;
        existing.pinToCenter = role === 'focused';
        existing.isGoBack = role === 'goBack';
        existing.frozen = false;
        existing.settledFrames = 0;
        existing.growthMultiplier = Math.max(existing.growthMultiplier, 1.0);

        // Recalculate initialRadius if goBack status changed
        // (goBack halves the radius; switching back needs full size)
        if (wasGoBack !== (role === 'goBack')) {
          existing.initialRadius = engine.computeInitialRadius(existing.depth, role === 'goBack');
        }
      }
    }

    for (const [role, ids] of roleGroups) {
      engine.activateBubbles(ids, role);
    }

    // Unfreeze everything on navigation change so physics resumes
    for (const id of engine.activeBubbleIds) {
      const b = engine.getBubble(id);
      if (b) { b.frozen = false; b.settledFrames = 0; }
    }
    engine.settled = false;

    // Set focused (updates focusedDepth, which affects radius computation)
    engine.setFocused(focusedId);

    // Recalculate initialRadius for all active bubbles (focusedDepth may have changed)
    for (const id of engine.activeBubbleIds) {
      const b = engine.getBubble(id);
      if (b) {
        b.initialRadius = engine.computeInitialRadius(b.depth, b.isGoBack);
      }
    }

    // Set go-back
    if (goBackId) {
      const focused = engine.getBubble(focusedId);
      const cx = engine.width / 2;
      const cy = engine.height / 2;
      engine.setGoBack(goBackId, focused?.x || cx, focused?.y || cy);
    }

    setRenderedIds(Array.from(engine.activeBubbleIds));
  }, [activeIdsMap, focusedId, goBackId, leafOverlayActive, engine, canvasReady]);

  // Sync hovered IDs to engine (for collision priority)
  useEffect(() => {
    engine.hoveredIds = hoveredNodeIds;
  }, [hoveredNodeIds, engine]);

  // rAF loop — direct DOM manipulation
  const tick = useCallback(
    (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      // Skip all work when simulation is settled (no movement)
      if (!engine.settled) {
        engine.tick(dt);

        // Direct DOM updates (bypass React)
        const activeBubbles = engine.getActiveBubbles();
        for (const b of activeBubbles) {
          const g = svgRefsMap.current.get(b.id);
          if (!g) continue;

          g.setAttribute('transform', `translate(${b.x}, ${b.y})`);
          g.style.opacity = String(Math.max(0, b.activationProgress));

          const r = Math.max(0, b.visualRadius);

          // Update visible border circle
          const border = g.querySelector('.bubble-border');
          if (border) border.setAttribute('r', String(r));

          // Dynamic text sizing
          const label = g.querySelector('.bubble-label') as SVGTextElement | null;
          const desc = g.querySelector('.bubble-desc') as SVGTextElement | null;

          if (label) {
            // Scale font when bubble is large enough
            let fontSize = TEXT_MIN_FONT_SIZE;
            if (r > TEXT_SCALE_UP_RADIUS) {
              const scale = Math.min(r / TEXT_SCALE_UP_RADIUS, TEXT_MAX_FONT_SIZE / TEXT_MIN_FONT_SIZE);
              fontSize = Math.round(TEXT_MIN_FONT_SIZE * scale);
            }
            label.setAttribute('font-size', String(fontSize));

            // Shift label up when descriptions are visible
            if (desc) {
              const showDesc = r > TEXT_SHOW_DESC_RADIUS;
              desc.style.display = showDesc ? '' : 'none';
              label.setAttribute('y', showDesc ? String(-fontSize * 0.4) : '0');
              if (showDesc) {
                desc.setAttribute('y', String(fontSize * 0.5 + 2));
              }
            }
          }
        }

        // Update connector lines via cached refs (avoids querySelectorAll per frame)
        if (lineCacheDirtyRef.current) {
          lineCacheRef.current.clear();
          const linesGroup = containerRef.current?.querySelector('.world-connector-lines');
          if (linesGroup) {
            const lines = linesGroup.querySelectorAll('line');
            lines.forEach((line) => {
              const childId = line.getAttribute('data-child-id');
              if (childId) lineCacheRef.current.set(childId, line);
            });
          }
          lineCacheDirtyRef.current = false;
        }

        for (const b of activeBubbles) {
          const line = lineCacheRef.current.get(b.id);
          if (!line) continue;
          const parent = b.parentId ? engine.getBubble(b.parentId) : null;
          if (parent) {
            line.setAttribute('x1', String(parent.x));
            line.setAttribute('y1', String(parent.y));
            line.setAttribute('x2', String(b.x));
            line.setAttribute('y2', String(b.y));
            const lineOpacity = Math.min(b.activationProgress, parent.activationProgress) * 0.5;
            line.setAttribute('stroke-opacity', String(lineOpacity));
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [engine],
  );

  // Start/stop rAF loop
  useEffect(() => {
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // Register/unregister SVG element refs
  const registerRef = useCallback((id: string, el: SVGGElement | null) => {
    if (el) {
      svgRefsMap.current.set(id, el);
    } else {
      svgRefsMap.current.delete(id);
    }
  }, []);

  const getBubble = useCallback(
    (id: string): PhysicsBubble | undefined => engine.getBubble(id),
    [engine],
  );

  return {
    containerRef,
    renderedIds,
    registerRef,
    getBubble,
    canvasHeight: engine.height,
  };
}
