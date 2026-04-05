import { forwardRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { PhysicsBubble } from '../physics/types';
import { TEXT_MIN_FONT_SIZE, TEXT_DESC_FONT_SIZE } from '../physics/constants';
import { getTopicIcon } from '../utils/topicIcons';
import { TopicIconSvg } from '../utils/TopicIconSvg';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Bubbles in the top fraction of the canvas get tooltip below instead of above. */
const TOOLTIP_FLIP_THRESHOLD = 0.33;

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface WorldBubbleNodeProps {
  bubble: PhysicsBubble;
  canvasHeight: number;
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
/*  Chat Bubble Tooltip (SVG)                                          */
/* ------------------------------------------------------------------ */

function BuildPromptTooltip({ above, label }: { above: boolean; label: string }) {
  const w = 110;
  const h = 32;
  const arrowH = 7;
  const r = 8;

  if (above) {
    // Tooltip above bubble, arrow pointing down
    const y = -(h + arrowH);
    return (
      <g>
        <path
          d={`M${-w / 2 + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 ${-r},${r} h${-(w / 2 - 10)} l${-5},${arrowH} l${-5},${-arrowH} h${-(w / 2 - 10 - r)} a${r},${r} 0 0 1 ${-r},${-r} v${-(h - 2 * r)} a${r},${r} 0 0 1 ${r},${-r} z`}
          fill="var(--color-cyan)"
          opacity={0.92}
        />
        <text
          x={0}
          y={y + h / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-bg)"
          fontSize={13}
          fontWeight={700}
          fontFamily="'Inter', sans-serif"
        >
          {label}
        </text>
      </g>
    );
  }

  // Tooltip below bubble, arrow pointing up
  const y = arrowH;
  return (
    <g>
      <path
        d={`M${-5},0 l${5},${-arrowH} l${5},${arrowH} h${w / 2 - 10 - r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 ${-r},${r} h${-(w - 2 * r)} a${r},${r} 0 0 1 ${-r},${-r} v${-(h - 2 * r)} a${r},${r} 0 0 1 ${r},${-r} h${w / 2 - 10 - r} z`}
        fill="var(--color-cyan)"
        opacity={0.92}
      />
      <text
        x={-5}
        y={y + h / 3}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--color-bg)"
        fontSize={13}
        fontWeight={700}
        fontFamily="'Inter', sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export const WorldBubbleNode = forwardRef<SVGGElement, WorldBubbleNodeProps>(
  function WorldBubbleNode({ bubble, canvasHeight, onClick, onHoverStart, onHoverEnd }, ref) {
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

    const descKeys = node.descriptionKeys;
    const hasDesc = descKeys && descKeys.length > 0 && role !== 'goBack';
    const topicIcon = role !== 'goBack' ? getTopicIcon(node.id) : null;

    // Determine tooltip position: above or below based on bubble Y position
    const tooltipAbove = bubble.y > canvasHeight * TOOLTIP_FLIP_THRESHOLD;

    return (
      <g
        ref={ref}
        className={role === 'goBack' ? 'bubble-goback' : undefined}
        style={{
          cursor: isInteractive ? 'pointer' : 'default',
          pointerEvents: isInteractive ? 'auto' : 'none',
        }}
        onClick={handleClick}
        onPointerEnter={isInteractive ? (e) => { if (e.pointerType === 'mouse') onHoverStart(); } : undefined}
        onPointerLeave={isInteractive ? (e) => { if (e.pointerType === 'mouse') onHoverEnd(); } : undefined}
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
          {/* Topic icon (above label) */}
          {topicIcon && (
            <TopicIconSvg
              name={topicIcon}
              size={Math.round(TEXT_MIN_FONT_SIZE * (role === 'focused' ? 2.5 : 1.5))}
              x={0}
              y={hasDesc
                ? -TEXT_MIN_FONT_SIZE - (role === 'focused' ? 32 : 16)
                : -TEXT_MIN_FONT_SIZE - (role === 'focused' ? 16 : 2)}
            />
          )}

          {/* Main label */}
          <text
            className="bubble-label"
            x={0}
            y={topicIcon ? 6 : (hasDesc ? -4 : 0)}
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

          {/* Description sub-text */}
          {hasDesc && (
            <text
              className="bubble-desc"
              x={0}
              y={TEXT_MIN_FONT_SIZE / 2 + (topicIcon ? 8 : 4)}
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

        {/* Build Prompt chat bubble tooltip */}
        {isLeaf && isInteractive && (
          <g
            className="world-bubble-tooltip"
            style={{ pointerEvents: 'none' }}
            transform={`translate(0, ${tooltipAbove ? -(visualRadius - 4) : (visualRadius - 4)})`}
          >
            <BuildPromptTooltip
              above={tooltipAbove}
              label={tCommon('bubble.buildPrompt')}
            />
          </g>
        )}
      </g>
    );
  },
);
