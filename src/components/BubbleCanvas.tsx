import { useMemo, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { BubbleNode as BubbleNodeType } from '../data/types';
import type { AnimationPhase } from '../hooks/useBubbleNavigation';
import { BubbleNodeSvg } from './BubbleNode';

const SIZES = { hub: 70, primary: 60, secondary: 40 } as const;

interface ChildPosition {
  node: BubbleNodeType;
  cx: number;
  cy: number;
  radius: number;
}

interface BubbleCanvasProps {
  currentNode: BubbleNodeType;
  currentChildren: BubbleNodeType[];
  isAtRoot: boolean;
  onNavigate: (nodeId: string) => void;
  onGoBack: () => void;
  onLeafClick: (node: BubbleNodeType) => void;
  animationPhase: AnimationPhase;
  clickedNodeId: string | null;
  previousNode: BubbleNodeType | null;
}

function computeRadialPositions(
  centerX: number,
  centerY: number,
  children: BubbleNodeType[],
  radius: number,
): ChildPosition[] {
  return children.map((child, index) => {
    const angle = (2 * Math.PI * index) / children.length - Math.PI / 2;
    const r = child.type === 'primary' ? SIZES.primary : SIZES.secondary;
    return {
      node: child,
      cx: centerX + radius * Math.cos(angle),
      cy: centerY + radius * Math.sin(angle),
      radius: r,
    };
  });
}

export function BubbleCanvas({
  currentNode,
  currentChildren,
  isAtRoot,
  onNavigate,
  onGoBack,
  onLeafClick,
  animationPhase,
  clickedNodeId,
}: BubbleCanvasProps) {
  const { t } = useTranslation('common');
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  // Responsive: measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const layoutRadius = Math.min(dims.w, dims.h) * 0.35;

  // Compute child positions
  const childPositions = useMemo(
    () => computeRadialPositions(cx, cy, currentChildren, layoutRadius),
    [cx, cy, currentChildren, layoutRadius],
  );

  // Handle child click
  const handleChildClick = (child: BubbleNodeType) => {
    if (animationPhase !== 'idle') return;
    if (child.children && child.children.length > 0) {
      onNavigate(child.id);
    } else if (child.promptTemplateId) {
      onLeafClick(child);
    }
  };

  const isExiting = animationPhase === 'exiting';
  const isEntering = animationPhase === 'entering';

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        style={{ display: 'block' }}
      >
        {/* Dashed connector lines */}
        <AnimatePresence>
          {childPositions.map((child, i) => (
            <motion.line
              key={`line-${child.node.id}`}
              x1={cx}
              y1={cy}
              x2={child.cx}
              y2={child.cy}
              stroke="var(--color-green)"
              strokeWidth={2}
              strokeDasharray="8 4"
              initial={isEntering ? { opacity: 0, pathLength: 0 } : false}
              animate={{
                opacity: isExiting
                  ? clickedNodeId === child.node.id
                    ? 1
                    : 0
                  : 1,
                pathLength: 1,
              }}
              transition={{
                duration: isExiting ? 0.3 : 0.4,
                delay: isEntering ? 0.1 + i * 0.04 : 0,
                ease: 'easeOut',
              }}
              style={{
                animation:
                  animationPhase === 'idle'
                    ? 'bubble-edge-dash 0.6s linear infinite'
                    : 'none',
              }}
            />
          ))}
        </AnimatePresence>

        {/* GoBack button (top-left, appears when not at root) */}
        {!isAtRoot && animationPhase === 'idle' && (
          <motion.g
            style={{ cursor: 'pointer' }}
            onClick={onGoBack}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            whileHover={{
              scale: 1.1,
              filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.5))',
            }}
          >
            <circle
              cx={50}
              cy={50}
              r={28}
              fill="transparent"
              stroke="var(--color-cyan)"
              strokeWidth={2}
              strokeDasharray="6 3"
            />
            <text
              x={50}
              y={50}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-yellow)"
              fontSize={10}
              fontWeight={700}
              fontFamily="'Inter', sans-serif"
              style={{ userSelect: 'none' }}
            >
              {t('nav.goBack')}
            </text>
          </motion.g>
        )}

        {/* Hub (center) bubble */}
        <BubbleNodeSvg
          cx={cx}
          cy={cy}
          radius={SIZES.hub}
          labelKey={currentNode.labelKey}
          descriptionKeys={currentNode.descriptionKeys}
          variant="hub"
          isEntering={isEntering}
          enterDelay={0}
          exitState={isExiting ? 'fading' : 'none'}
        />

        {/* Child bubbles */}
        {childPositions.map((child, i) => (
          <BubbleNodeSvg
            key={child.node.id}
            cx={child.cx}
            cy={child.cy}
            radius={child.radius}
            labelKey={child.node.labelKey}
            descriptionKeys={child.node.descriptionKeys}
            variant={child.node.type}
            onClick={() => handleChildClick(child.node)}
            isEntering={isEntering}
            enterDelay={0.15 + i * 0.05}
            exitState={
              isExiting
                ? clickedNodeId === child.node.id
                  ? 'clicked'
                  : 'fading'
                : 'none'
            }
          />
        ))}
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
