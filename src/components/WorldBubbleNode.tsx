import { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { PhysicsBubble } from '../physics/types';
import { TEXT_MIN_FONT_SIZE, TEXT_DESC_FONT_SIZE } from '../physics/constants';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface WorldBubbleNodeProps {
  bubble: PhysicsBubble;
  onClick: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

/* ------------------------------------------------------------------ */
/*  Styling                                                            */
/* ------------------------------------------------------------------ */

function getStrokeColor(role: string): string {
  if (role === 'goBack') return 'var(--color-orange)';
  if (role === 'hoverRevealed') return 'var(--color-cyan)';
  return 'var(--color-green)';
}

function getBorderWidth(role: string): number {
  if (role === 'focused') return 3;
  if (role === 'goBack') return 2.5;
  return 2;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const WorldBubbleNode = forwardRef<SVGGElement, WorldBubbleNodeProps>(
  function WorldBubbleNode({ bubble, onClick, onHoverStart, onHoverEnd }, ref) {
    const { t } = useTranslation('prompts');
    const { t: tCommon } = useTranslation('common');

    const { node, role, visualRadius } = bubble;
    const isInteractive = role !== 'focused' && role !== 'hidden';
    const isLeaf =
      node.promptTemplateId !== undefined &&
      (!node.children || node.children.length === 0);

    const strokeColor = getStrokeColor(role);
    const borderWidth = getBorderWidth(role);

    const label =
      role === 'goBack'
        ? `\u2190 ${tCommon('bubble.goBack', 'Go Back')}`
        : t(node.labelKey);

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isInteractive) onClick();
      },
      [isInteractive, onClick],
    );

    // Description keys for sub-text
    const descKeys = node.descriptionKeys;
    const hasDesc = descKeys && descKeys.length > 0 && role !== 'goBack';

    return (
      <g
        ref={ref}
        className={role === 'goBack' ? 'bubble-goback' : undefined}
        style={{
          cursor: isInteractive ? 'pointer' : 'default',
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
        onClick={handleClick}
        onMouseEnter={isInteractive ? onHoverStart : undefined}
        onMouseLeave={isInteractive ? onHoverEnd : undefined}
      >
        {/* Circle border */}
        <circle
          className="bubble-border"
          cx={0}
          cy={0}
          r={Math.max(0, visualRadius - borderWidth / 2)}
          fill="var(--color-surface)"
          stroke={strokeColor}
          strokeWidth={borderWidth}
        />

        {/* Text block (overflow visible) */}
        <g>
          {/* Main label */}
          <text
            className="bubble-label"
            x={0}
            y={hasDesc ? -4 : 0}
            textAnchor="middle"
            dominantBaseline="central"
            fill={role === 'goBack' ? 'var(--color-orange)' : 'var(--color-text)'}
            fontSize={TEXT_MIN_FONT_SIZE}
            fontWeight={600}
            fontFamily="'Inter', sans-serif"
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {label}
          </text>

          {/* Description sub-text (initially hidden, shown by rAF when bubble is large enough) */}
          {hasDesc && (
            <text
              className="bubble-desc"
              x={0}
              y={TEXT_MIN_FONT_SIZE / 2 + 4}
              textAnchor="middle"
              dominantBaseline="hanging"
              fill="var(--color-text-secondary)"
              fontSize={TEXT_DESC_FONT_SIZE}
              fontFamily="'Inter', sans-serif"
              style={{ pointerEvents: 'none', userSelect: 'none', display: 'none' }}
            >
              {descKeys!.slice(0, 3).map((k, i) => (
                <tspan key={i} x={0} dy={i === 0 ? 0 : TEXT_DESC_FONT_SIZE + 1}>
                  {t(k)}
                  {i < descKeys!.length - 1 ? ',' : ''}
                </tspan>
              ))}
            </text>
          )}
        </g>

        {/* Leaf tooltip */}
        {isLeaf && isInteractive && (
          <g className="world-bubble-tooltip" style={{ pointerEvents: 'none' }}>
            <rect
              x={-42}
              y={-(visualRadius + 20)}
              width={84}
              height={18}
              rx={5}
              fill="var(--color-cyan)"
              opacity={0.9}
            />
            <text
              x={0}
              y={-(visualRadius + 11)}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-bg)"
              fontSize={9}
              fontWeight={700}
              fontFamily="'Inter', sans-serif"
            >
              {tCommon('bubble.buildPrompt')}
            </text>
          </g>
        )}
      </g>
    );
  },
);
