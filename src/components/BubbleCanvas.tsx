import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { BubbleNode as BubbleNodeType } from '../data/types';
import type { AnimationPhase } from '../hooks/useBubbleNavigation';
import { bubbleTree } from '../data/bubbleTree';
import { BubbleNodeSvg } from './BubbleNode';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SIZES = { hub: 100, primary: 60, secondary: 50, preview: 28, goBack: 35 } as const;
const REPULSION_STRENGTH = 50;
const POS_SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 };
const MORPH_SPRING = { type: 'spring' as const, stiffness: 150, damping: 20 };

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChildPosition {
  node: BubbleNodeType;
  cx: number;
  cy: number;
  radius: number;
}

interface Vec2 {
  x: number;
  y: number;
}

interface BubbleCanvasProps {
  currentNode: BubbleNodeType;
  currentChildren: BubbleNodeType[];
  navigationPath: string[];
  isAtRoot: boolean;
  onNavigate: (nodeId: string) => void;
  onGoBack: () => void;
  onLeafClick: (node: BubbleNodeType) => void;
  animationPhase: AnimationPhase;
  clickedNodeId: string | null;
  previousNode: BubbleNodeType | null;
  parentNode: BubbleNodeType | null;
}

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

function normalize(dx: number, dy: number): Vec2 {
  const len = Math.sqrt(dx * dx + dy * dy);
  return len > 0 ? { x: dx / len, y: dy / len } : { x: 1, y: 0 };
}

/** Place children in an ellipse around (centerX, centerY).
 *  radiusX and radiusY allow elliptical layout for portrait screens. */
function computeRadialPositions(
  centerX: number,
  centerY: number,
  children: BubbleNodeType[],
  radiusX: number,
  radiusY: number,
  sizes: { primary: number; secondary: number },
): ChildPosition[] {
  return children.map((child, index) => {
    const angle = (2 * Math.PI * index) / children.length - Math.PI / 2;
    const r = child.type === 'primary' ? sizes.primary : sizes.secondary;
    return {
      node: child,
      cx: centerX + radiusX * Math.cos(angle),
      cy: centerY + radiusY * Math.sin(angle),
      radius: r,
    };
  });
}

/** Push siblings away from the hovered bubble. */
function applyRepulsion(
  positions: ChildPosition[],
  hoveredId: string,
  strength: number,
): ChildPosition[] {
  const hovered = positions.find((p) => p.node.id === hoveredId);
  if (!hovered) return positions;

  return positions.map((pos) => {
    if (pos.node.id === hoveredId) return pos;
    const dx = pos.cx - hovered.cx;
    const dy = pos.cy - hovered.cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return pos;
    const push = strength * Math.max(0, 1 - dist / 500);
    return { ...pos, cx: pos.cx + (dx / dist) * push, cy: pos.cy + (dy / dist) * push };
  });
}

/** Push children away from the go-back button so they don't overlap. */
function applyGoBackRepulsion(
  positions: ChildPosition[],
  goBack: Vec2,
  goBackRadius: number,
): ChildPosition[] {
  return positions.map((pos) => {
    const dx = pos.cx - goBack.x;
    const dy = pos.cy - goBack.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = pos.radius + goBackRadius + 20;
    if (dist < minDist && dist > 0) {
      const push = minDist - dist;
      return { ...pos, cx: pos.cx + (dx / dist) * push, cy: pos.cy + (dy / dist) * push };
    }
    return pos;
  });
}

/** Arrange ALL preview children radially around the hovered bubble. */
function computePreviewPositions(
  parent: ChildPosition,
  children: BubbleNodeType[],
  previewSize: number,
): ChildPosition[] {
  const count = children.length;
  const previewRadius = parent.radius + 18 + previewSize;

  return children.map((child, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return {
      node: child,
      cx: parent.cx + previewRadius * Math.cos(angle),
      cy: parent.cy + previewRadius * Math.sin(angle),
      radius: previewSize,
    };
  });
}

/** Clamp parent position inward so the preview ring fits within canvas. */
function computeEdgeAwarePosition(
  parentCx: number,
  parentCy: number,
  previewRingRadius: number,
  canvasW: number,
  canvasH: number,
  margin: number,
): { cx: number; cy: number } {
  const needed = previewRingRadius + margin + 30;
  return {
    cx: Math.max(needed, Math.min(canvasW - needed, parentCx)),
    cy: Math.max(needed, Math.min(canvasH - needed, parentCy)),
  };
}

/** Shoot a ray from center in -dir direction; clamp to canvas edge. */
function computeEdgePosition(
  cx: number,
  cy: number,
  dir: Vec2,
  width: number,
  height: number,
  margin: number,
): Vec2 {
  const dx = -dir.x;
  const dy = -dir.y;
  let t = Infinity;

  if (dx > 0) t = Math.min(t, (width - margin - cx) / dx);
  else if (dx < 0) t = Math.min(t, (margin - cx) / dx);

  if (dy > 0) t = Math.min(t, (height - margin - cy) / dy);
  else if (dy < 0) t = Math.min(t, (margin - cy) / dy);

  if (!isFinite(t) || t < 0) t = 0;
  return { x: cx + t * dx, y: cy + t * dy };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function BubbleCanvas({
  currentNode,
  currentChildren,
  navigationPath,
  isAtRoot,
  onNavigate,
  onGoBack,
  onLeafClick,
  animationPhase,
  clickedNodeId,
  previousNode,
  parentNode,
}: BubbleCanvasProps) {
  const { t } = useTranslation('common');
  const { t: tPrompts } = useTranslation('prompts');
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [directionStack, setDirectionStack] = useState<Vec2[]>([]);

  /* --- Refs for morph animations --- */
  const clickedPositionRef = useRef<{ cx: number; cy: number; radius: number } | null>(null);
  // Cluster positions (around center) — used as initialPosition for new children
  const previewPositionsRef = useRef<Map<string, { cx: number; cy: number; radius: number }>>(
    new Map(),
  );
  // Original preview positions — used as starting point for phantom circles during exit
  const originalPreviewRef = useRef<Map<string, { cx: number; cy: number; radius: number }>>(
    new Map(),
  );
  const lastGoBackPosRef = useRef<Vec2 | null>(null);
  // First-render entrance animation: children expand from center
  const [initialEntrance, setInitialEntrance] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setInitialEntrance(false), 800);
    return () => clearTimeout(timer);
  }, []);

  /* --- Responsive container --- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* --- Reset direction stack when back at root (handles reset()) --- */
  useEffect(() => {
    if (isAtRoot) setDirectionStack([]);
  }, [isAtRoot]);

  /* --- Deep-link: compute direction stack from navigationPath if missing --- */
  useEffect(() => {
    if (navigationPath.length > 0 && directionStack.length === 0) {
      const dirs: Vec2[] = [];
      let node: BubbleNodeType = bubbleTree;
      for (const nodeId of navigationPath) {
        const siblings = node.children ?? [];
        const idx = siblings.findIndex((c) => c.id === nodeId);
        if (idx < 0) break;
        const angle = (2 * Math.PI * idx) / siblings.length - Math.PI / 2;
        dirs.push({ x: Math.cos(angle), y: Math.sin(angle) });
        node = siblings[idx];
      }
      if (dirs.length > 0) setDirectionStack(dirs);
    }
  }, [navigationPath]); // eslint-disable-line react-hooks/exhaustive-deps

  /* --- Clear hover during animations; clear morph refs when idle --- */
  useEffect(() => {
    if (animationPhase !== 'idle') {
      setHoveredNodeId(null);
    } else {
      clickedPositionRef.current = null;
      previewPositionsRef.current.clear();
      originalPreviewRef.current.clear();
      if (isAtRoot) lastGoBackPosRef.current = null;
    }
  }, [animationPhase, isAtRoot]);

  /* --- Core geometry with responsive scaling --- */
  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const isPortrait = dims.h > dims.w;
  // Wide screens: constrain to height-based square so bubbles don't sprawl
  // Portrait/mobile: scale based on width but allow vertical stretch (elliptical)
  const scaleBasis = isPortrait ? dims.w : Math.min(dims.w, dims.h);
  const scaleFactor = Math.min(1.3, Math.max(0.75, scaleBasis / 600));
  const S = {
    hub: Math.round(SIZES.hub * scaleFactor),
    primary: Math.round(SIZES.primary * scaleFactor),
    secondary: Math.round(SIZES.secondary * scaleFactor),
    preview: Math.round(SIZES.preview * scaleFactor),
    goBack: Math.round(SIZES.goBack * scaleFactor),
  };
  const maxChild = Math.max(S.primary, S.secondary);
  // Wide: circular (square-constrained). Portrait: elliptical (use full height)
  const layoutRadiusX = (isPortrait ? dims.w : Math.min(dims.w, dims.h)) / 2 - maxChild - 20;
  const layoutRadiusY = isPortrait
    ? dims.h / 2 - maxChild - 20   // Portrait: stretch vertically
    : layoutRadiusX;                // Landscape: circular

  const entryDirection =
    directionStack.length > 0
      ? directionStack[directionStack.length - 1]
      : null;

  /* --- Base radial positions --- */
  const basePositions = useMemo(
    () => computeRadialPositions(cx, cy, currentChildren, layoutRadiusX, layoutRadiusY, S),
    [cx, cy, currentChildren, layoutRadiusX, layoutRadiusY, S],
  );

  /* --- Go-back button position (no isAtRoot gate — needed during exit from root) --- */
  const goBackPos = useMemo(() => {
    if (!entryDirection) return null;
    return computeEdgePosition(cx, cy, entryDirection, dims.w, dims.h, 45);
  }, [entryDirection, cx, cy, dims]);

  if (goBackPos) lastGoBackPosRef.current = goBackPos;
  const effectiveGoBackPos = goBackPos ?? lastGoBackPosRef.current;

  /* --- Fix 1: Push children away from go-back button --- */
  const safeBasePositions = useMemo(() => {
    if (!effectiveGoBackPos || isAtRoot) return basePositions;
    return applyGoBackRepulsion(basePositions, effectiveGoBackPos, S.goBack);
  }, [basePositions, effectiveGoBackPos, isAtRoot]);

  /* --- Hover-derived data --- */
  const hoveredChild = hoveredNodeId
    ? currentChildren.find((c) => c.id === hoveredNodeId)
    : null;
  const hasPreview = !!(hoveredChild?.children?.length);

  const childPositions = useMemo(() => {
    if (!hasPreview || !hoveredNodeId) return safeBasePositions;
    let positions = applyRepulsion(safeBasePositions, hoveredNodeId, REPULSION_STRENGTH);

    // Edge-aware shift: move hovered node inward so its preview ring fits
    const hovIdx = positions.findIndex((p) => p.node.id === hoveredNodeId);
    if (hovIdx >= 0) {
      const previewRingRadius = positions[hovIdx].radius + 18 + S.preview;
      const adjusted = computeEdgeAwarePosition(
        positions[hovIdx].cx,
        positions[hovIdx].cy,
        previewRingRadius,
        dims.w,
        dims.h,
        10,
      );
      positions = positions.map((p, i) =>
        i === hovIdx ? { ...p, cx: adjusted.cx, cy: adjusted.cy } : p,
      );
    }

    return positions;
  }, [safeBasePositions, hasPreview, hoveredNodeId, dims]);

  const hoveredPos = hoveredNodeId
    ? childPositions.find((cp) => cp.node.id === hoveredNodeId)
    : null;

  const previewPositions = useMemo(() => {
    if (!hoveredPos || !hoveredChild?.children?.length) return [];
    const positions = computePreviewPositions(hoveredPos, hoveredChild.children, S.preview);
    // Safety clamp: ensure each preview stays within canvas bounds
    return positions.map((p) => ({
      ...p,
      cx: Math.max(p.radius + 5, Math.min(dims.w - p.radius - 5, p.cx)),
      cy: Math.max(p.radius + 5, Math.min(dims.h - p.radius - 5, p.cy)),
    }));
  }, [hoveredPos, hoveredChild, dims]);

  /* --- Handlers --- */
  const handleChildClick = useCallback(
    (child: BubbleNodeType) => {
      if (animationPhase !== 'idle') return;

      if (child.children && child.children.length > 0) {
        const pos = basePositions.find((cp) => cp.node.id === child.id);
        if (pos) {
          const dir = normalize(pos.cx - cx, pos.cy - cy);
          setDirectionStack((prev) => [...prev, dir]);
          clickedPositionRef.current = { cx: pos.cx, cy: pos.cy, radius: pos.radius };
        }

        // Fix 3: Snapshot preview positions for traveling animation
        previewPositionsRef.current.clear();
        originalPreviewRef.current.clear();
        if (hoveredNodeId === child.id && previewPositions.length > 0) {
          const count = previewPositions.length;
          const clusterR = S.hub + 15;
          previewPositions.forEach((pp, i) => {
            // Original position → phantom starting point
            originalPreviewRef.current.set(pp.node.id, {
              cx: pp.cx, cy: pp.cy, radius: pp.radius,
            });
            // Cluster position around center → phantom target + new child initialPosition
            const angle = (2 * Math.PI * i) / count - Math.PI / 2;
            previewPositionsRef.current.set(pp.node.id, {
              cx: cx + clusterR * Math.cos(angle),
              cy: cy + clusterR * Math.sin(angle),
              radius: pp.radius,
            });
          });
        }

        setHoveredNodeId(null);
        onNavigate(child.id);
      } else if (child.promptTemplateId) {
        onLeafClick(child);
      }
    },
    [animationPhase, basePositions, cx, cy, onNavigate, onLeafClick, hoveredNodeId, previewPositions],
  );

  const handleGoBack = useCallback(() => {
    setDirectionStack((prev) => prev.slice(0, -1));
    setHoveredNodeId(null);
    onGoBack();
  }, [onGoBack]);

  const isExiting = animationPhase === 'exiting';
  const isEntering = animationPhase === 'entering';
  const isGoingDeeper = isExiting && !!clickedNodeId;

  /* --- Go-back label: use previousNode during transitions for continuity --- */
  const goBackLabelNode = animationPhase === 'idle' ? parentNode : (previousNode ?? parentNode);
  const parentLabel = goBackLabelNode ? tPrompts(goBackLabelNode.labelKey) : t('nav.goBack');
  const truncLabel = parentLabel.length > 10 ? parentLabel.slice(0, 9) + '…' : parentLabel;

  /* --- Should we show the go-back button? --- */
  const showGoBack = !!effectiveGoBackPos && (
    isExiting ||
    isEntering ||
    (animationPhase === 'idle' && !isAtRoot)
  );

  /* --- Fix 3: Phantom preview circles that travel with clicked child during exit --- */
  const phantomPreviews = isGoingDeeper && originalPreviewRef.current.size > 0
    ? Array.from(originalPreviewRef.current.entries()).map(([nodeId, orig]) => {
        const cluster = previewPositionsRef.current.get(nodeId);
        return { nodeId, orig, cluster: cluster ?? orig };
      })
    : [];

  /* ================================================================ */
  /*  Render                                                           */
  /* ================================================================ */
  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* -------- Connector lines: hub → children -------- */}
        {childPositions.map((child, i) => (
          <motion.line
            key={`line-${child.node.id}`}
            x1={cx}
            y1={cy}
            stroke="var(--color-green)"
            strokeWidth={1.5}
            strokeDasharray="8 4"
            initial={
              (isEntering || initialEntrance)
                ? { opacity: 0, x2: child.cx, y2: child.cy }
                : false
            }
            animate={{
              x2: child.cx,
              y2: child.cy,
              opacity: isExiting
                ? clickedNodeId === child.node.id
                  ? 1
                  : 0
                : 1,
            }}
            transition={{
              x2: POS_SPRING,
              y2: POS_SPRING,
              opacity: {
                duration: isExiting ? 0.3 : 0.4,
                delay: (isEntering || initialEntrance) ? 0.1 + i * 0.04 : 0,
              },
            }}
            style={{
              animation:
                animationPhase === 'idle'
                  ? 'bubble-edge-dash 2s linear infinite'
                  : 'none',
            }}
          />
        ))}

        {/* -------- Preview connector lines -------- */}
        <AnimatePresence>
          {hoveredPos &&
            previewPositions.map((preview, i) => (
              <motion.line
                key={`pline-${preview.node.id}`}
                x1={hoveredPos.cx}
                y1={hoveredPos.cy}
                x2={preview.cx}
                y2={preview.cy}
                stroke="var(--color-cyan)"
                strokeWidth={1}
                strokeDasharray="4 3"
                strokeOpacity={0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: i * 0.02 }}
              />
            ))}
        </AnimatePresence>

        {/* -------- Fix 2.2: Dashed connector line from go-back to hub -------- */}
        {showGoBack && effectiveGoBackPos && (
          <motion.line
            x1={cx}
            y1={cy}
            stroke="var(--color-orange)"
            strokeWidth={1.5}
            strokeDasharray="6 3"
            initial={{ x2: cx, y2: cy, opacity: 0 }}
            animate={{
              x2: effectiveGoBackPos.x,
              y2: effectiveGoBackPos.y,
              opacity: 0.5,
            }}
            transition={{
              x2: MORPH_SPRING,
              y2: MORPH_SPRING,
              opacity: { duration: 0.3 },
            }}
            style={{
              animation:
                animationPhase === 'idle'
                  ? 'bubble-edge-dash 2s linear infinite'
                  : 'none',
            }}
          />
        )}

        {/* -------- Hub (center) bubble -------- */}
        {/* Fix 2.1: When going deeper, hub fades out quickly so go-back
            can eject cleanly from center. */}
        <BubbleNodeSvg
          cx={cx}
          cy={cy}
          radius={S.hub}
          labelKey={currentNode.labelKey}
          descriptionKeys={currentNode.descriptionKeys}
          variant="hub"
          isEntering={isEntering || initialEntrance}
          enterDelay={0}
          exitState={isExiting && !clickedNodeId ? 'fading' : 'none'}
          initialPosition={isEntering ? clickedPositionRef.current : null}
          morphTarget={
            isGoingDeeper
              ? { cx, cy, scale: 0.85, opacity: 0 }
              : null
          }
        />

        {/* -------- Child bubbles -------- */}
        {childPositions.map((child, i) => {
          const isClickedChild = isGoingDeeper && clickedNodeId === child.node.id;
          const previewOrigin = isEntering
            ? previewPositionsRef.current.get(child.node.id) ?? null
            : null;

          return (
            <BubbleNodeSvg
              key={child.node.id}
              cx={child.cx}
              cy={child.cy}
              radius={child.radius}
              labelKey={child.node.labelKey}
              descriptionKeys={child.node.descriptionKeys}
              variant={child.node.type}
              onClick={() => handleChildClick(child.node)}
              onMouseEnter={() => setHoveredNodeId(child.node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              isEntering={isEntering || initialEntrance}
              enterDelay={previewOrigin ? 0 : 0.15 + i * 0.05}
              exitState={
                isExiting && !isClickedChild
                  ? 'fading'
                  : 'none'
              }
              isHovered={hoveredNodeId === child.node.id}
              isLeaf={!!child.node.promptTemplateId && !child.node.children?.length}
              initialPosition={previewOrigin}
              morphTarget={
                isClickedChild
                  ? { cx, cy, scale: S.hub / child.radius, opacity: 1 }
                  : null
              }
            />
          );
        })}

        {/* -------- Preview children (hover — idle only) -------- */}
        <AnimatePresence>
          {previewPositions.map((preview, i) => (
            <BubbleNodeSvg
              key={`preview-${preview.node.id}`}
              cx={preview.cx}
              cy={preview.cy}
              radius={preview.radius}
              labelKey={preview.node.labelKey}
              variant="preview"
              enterDelay={i * 0.03}
              isEntering
              isPreview
            />
          ))}
        </AnimatePresence>

        {/* -------- Fix 3: Phantom previews that travel with clicked child -------- */}
        {/* During exit, these circles move from the original preview positions
            to cluster positions around center, matching the new children's
            initialPosition for a seamless handoff at data switch. */}
        {phantomPreviews.map(({ nodeId, orig, cluster }) => (
          <motion.g
            key={`phantom-${nodeId}`}
            initial={{ x: orig.cx, y: orig.cy, opacity: 1, scale: 1 }}
            animate={{ x: cluster.cx, y: cluster.cy, opacity: 0.8, scale: 1 }}
            transition={{
              x: POS_SPRING,
              y: POS_SPRING,
              opacity: { duration: 0.3 },
            }}
          >
            <circle
              cx={0}
              cy={0}
              r={S.preview - 1}
              fill="var(--color-bg)"
              stroke="var(--color-cyan)"
              strokeWidth={1.5}
            />
          </motion.g>
        ))}

        {/* -------- Go-back button -------- */}
        {showGoBack && effectiveGoBackPos && (
          <motion.g
            style={{ cursor: animationPhase === 'idle' ? 'pointer' : 'default' }}
            onClick={animationPhase === 'idle' ? handleGoBack : undefined}
            initial={{
              opacity: 0.7,
              scale: S.hub / S.goBack,
              x: cx,
              y: cy,
            }}
            animate={{
              opacity: 0.85,
              scale: 1,
              x: effectiveGoBackPos.x,
              y: effectiveGoBackPos.y,
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: MORPH_SPRING,
              x: MORPH_SPRING,
              y: MORPH_SPRING,
            }}
            whileHover={
              animationPhase === 'idle'
                ? {
                    opacity: 1,
                    scale: 1.12,
                    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))',
                  }
                : undefined
            }
          >
            <circle
              cx={0}
              cy={0}
              r={S.goBack}
              fill="var(--color-surface)"
              stroke="var(--color-orange)"
              strokeWidth={2.5}
              strokeDasharray="6 3"
            />
            <text
              x={0}
              y={-7}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-yellow)"
              fontSize={16}
              fontWeight={700}
              fontFamily="'Inter', sans-serif"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              ←
            </text>
            <text
              x={0}
              y={10}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-text-secondary)"
              fontSize={9}
              fontFamily="'Inter', sans-serif"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {truncLabel}
            </text>
          </motion.g>
        )}
      </svg>

      {/* Edge dash animation keyframes */}
      <style>{`
        @keyframes bubble-edge-dash {
          to { stroke-dashoffset: -12; }
        }
      `}</style>
    </div>
  );
}
