import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { getTopicIcon } from '../utils/topicIcons';
import { TopicIconSvg } from '../utils/TopicIconSvg';
import {
  FONT_SIZE,
  DESC_FONT_SIZE,
  BORDER_WIDTH,
  HOVER_BORDER_EXTRA,
  DESC_MIN_RADIUS,
  ICON_SIZE_MULTIPLIER,
  ICON_SIZE_MULTIPLIER_HUB,
} from './bubbleConstants';

export type BubbleVariant = 'hub' | 'primary' | 'secondary' | 'preview';

export interface BubbleNodeProps {
  cx: number;
  cy: number;
  radius: number;
  labelKey: string;
  descriptionKeys?: string[];
  variant: BubbleVariant;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  exitState?: 'none' | 'fading' | 'clicked';
  enterDelay?: number;
  isEntering?: boolean;
  isHovered?: boolean;
  isPreview?: boolean;
  /** If set, the node morphs from this position/size instead of popping in. */
  initialPosition?: { cx: number; cy: number; radius: number } | null;
  /** If set during exit, overrides exitState — the node springs to this target. */
  morphTarget?: { cx: number; cy: number; scale: number; opacity: number } | null;
  /** Leaf node — shows "Build Prompt!" tooltip on hover. */
  isLeaf?: boolean;
  /** Node ID for topic icon lookup. */
  nodeId?: string;
  /** Override default interactivity (which is based on variant). */
  interactive?: boolean;
}

const POS_SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 };
const SCALE_SPRING = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
};

export function BubbleNodeSvg({
  cx,
  cy,
  radius,
  labelKey,
  descriptionKeys,
  variant,
  onClick,
  onMouseEnter,
  onMouseLeave,
  exitState = 'none',
  enterDelay = 0,
  isEntering = false,
  isHovered = false,
  isPreview = false,
  initialPosition = null,
  morphTarget = null,
  isLeaf = false,
  nodeId,
  interactive,
}: BubbleNodeProps) {
  const { t } = useTranslation('prompts');
  const { t: tCommon } = useTranslation('common');

  const borderWidth = BORDER_WIDTH[variant] ?? BORDER_WIDTH.primary;
  const fontSize = FONT_SIZE[variant] ?? FONT_SIZE.primary;
  const descFontSize = DESC_FONT_SIZE[variant] ?? DESC_FONT_SIZE.primary;
  const label = t(labelKey);
  const showDesc = variant !== 'preview' && radius >= DESC_MIN_RADIUS;
  const descriptions = showDesc ? descriptionKeys?.map((k) => t(k)) : undefined;
  const topicIcon = nodeId && variant !== 'preview' ? getTopicIcon(nodeId) : null;
  const iconSizeMult = variant === 'hub' ? ICON_SIZE_MULTIPLIER_HUB : ICON_SIZE_MULTIPLIER;

  const strokeColor =
    variant === 'preview' || isHovered ? 'var(--color-cyan)' : 'var(--color-green)';
  const effectiveBorder = isHovered && variant !== 'preview' ? borderWidth + HOVER_BORDER_EXTRA : borderWidth;

  // --- Animation values ---
  const getAnimate = () => {
    // morphTarget completely overrides exit behavior
    if (morphTarget) {
      return {
        x: morphTarget.cx,
        y: morphTarget.cy,
        scale: morphTarget.scale,
        opacity: morphTarget.opacity,
      };
    }
    const base = { x: cx, y: cy };
    if (exitState === 'fading') return { ...base, opacity: 0, scale: 0.7 };
    if (exitState === 'clicked') return { ...base, opacity: 1, scale: 1.15 };
    return { ...base, opacity: 1, scale: 1 };
  };

  const getInitial = () => {
    if (initialPosition) {
      // Morph from the source position/size (full opacity, scaled proportionally)
      return {
        x: initialPosition.cx,
        y: initialPosition.cy,
        opacity: 1,
        scale: initialPosition.radius / radius,
      };
    }
    if (isEntering || isPreview)
      return { x: cx, y: cy, opacity: 0, scale: 0.4 };
    return false as const;
  };

  const getTransition = () => {
    // morphTarget uses spring physics for smooth morph
    if (morphTarget) {
      return {
        x: POS_SPRING,
        y: POS_SPRING,
        scale: SCALE_SPRING,
        // Quick fade for hub disappearing; normal for child morphing to center
        opacity: { duration: morphTarget.opacity === 0 ? 0.1 : 0.25 },
      };
    }
    if (isEntering || isPreview) {
      return {
        opacity: { duration: 0.3, delay: enterDelay },
        scale: { ...SCALE_SPRING, delay: enterDelay },
        x: POS_SPRING,
        y: POS_SPRING,
      };
    }
    if (exitState !== 'none') {
      return { duration: 0.3, ease: 'easeIn' as const };
    }
    return {
      x: POS_SPRING,
      y: POS_SPRING,
      opacity: { duration: 0.2 },
      scale: SCALE_SPRING,
    };
  };

  const isInteractive = interactive ?? (variant !== 'hub' && variant !== 'preview');

  return (
    <motion.g
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
      onClick={(e) => {
        e.stopPropagation();
        if (isInteractive && onClick) onClick();
      }}
      onMouseEnter={isInteractive ? onMouseEnter : undefined}
      onMouseLeave={isInteractive ? onMouseLeave : undefined}
      initial={getInitial()}
      animate={getAnimate()}
      exit={
        isPreview
          ? { opacity: 0, scale: 0.3, transition: { duration: 0.2 } }
          : undefined
      }
      transition={getTransition()}
      whileHover={
        isInteractive
          ? {
              scale: 1.08,
              filter: 'drop-shadow(0 0 12px rgba(0, 255, 136, 0.5))',
            }
          : undefined
      }
    >
      {/* Circle — rendered at local origin; motion.g handles position */}
      <circle
        cx={0}
        cy={0}
        r={radius - effectiveBorder / 2}
        fill={variant === 'preview' ? 'var(--color-bg)' : 'var(--color-surface)'}
        stroke={strokeColor}
        strokeWidth={effectiveBorder}
      />

      {/* Topic icon (above label) */}
      {topicIcon && (
        <TopicIconSvg
          name={topicIcon}
          size={Math.round(fontSize * iconSizeMult)}
          x={0}
          y={descriptions && descriptions.length > 0
            ? -(fontSize + (variant === 'hub' ? 32 : 6))
            : -(fontSize + (variant === 'hub' ? 20 : 0))}
        />
      )}

      {/* Label */}
      <text
        x={0}
        y={topicIcon ? 4 : (descriptions && descriptions.length > 0 ? -6 : 0)}
        textAnchor="middle"
        dominantBaseline="central"
        fill={variant === 'preview' ? 'var(--color-cyan)' : 'var(--color-text)'}
        fontSize={fontSize}
        fontWeight={600}
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {wrapText(label, radius * 1.4, fontSize)}
      </text>

      {/* Description text */}
      {descriptions && descriptions.length > 0 && (
        <text
          x={0}
          y={fontSize / 2 + (topicIcon ? 8 : 4)}
          textAnchor="middle"
          dominantBaseline="hanging"
          fill="var(--color-text-secondary)"
          fontSize={descFontSize}
          fontFamily="'Inter', sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {descriptions
            .slice(0, variant === 'secondary' ? 2 : 3)
            .map((desc, i) => (
              <tspan key={i} x={0} dy={i === 0 ? 0 : descFontSize + 2}>
                {desc}
                {i < descriptions.length - 1 ? ',' : ''}
              </tspan>
            ))}
        </text>
      )}

      {/* Leaf chat-bubble tooltip — "Build Prompt!" */}
      {isLeaf && isHovered && (() => {
        const tw = 110, th = 32, ta = 7, tr = 8;
        const ty = -(th + ta);
        return (
          <motion.g
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            style={{ pointerEvents: 'none' }}
            transform={`translate(0, ${-(radius + 6)})`}
          >
            <path
              d={`M${-tw/2 + tr},${ty} h${tw - 2*tr} a${tr},${tr} 0 0 1 ${tr},${tr} v${th - 2*tr} a${tr},${tr} 0 0 1 ${-tr},${tr} h${-(tw/2 - 10)} l${-5},${ta} l${-5},${-ta} h${-(tw/2 - 10 - tr)} a${tr},${tr} 0 0 1 ${-tr},${-tr} v${-(th - 2*tr)} a${tr},${tr} 0 0 1 ${tr},${-tr} z`}
              fill="var(--color-cyan)"
              opacity={0.92}
            />
            <text
              x={0}
              y={ty + th / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill="var(--color-bg)"
              fontSize={13}
              fontWeight={700}
              fontFamily="'Inter', sans-serif"
            >
              {tCommon('bubble.buildPrompt')}
            </text>
          </motion.g>
        );
      })()}
    </motion.g>
  );
}

// --- Utility: wrap long text into <tspan> lines ---
function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
): React.ReactNode {
  const charWidth = fontSize * 0.55;
  const maxChars = Math.floor(maxWidth / charWidth);

  if (text.length <= maxChars) return text;

  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxChars) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  const displayLines = lines.slice(0, 2);
  if (lines.length > 2) {
    displayLines[1] = displayLines[1].slice(0, -1) + '…';
  }

  const lineHeight = fontSize * 1.2;
  const totalHeight = displayLines.length * lineHeight;
  const startY = -(totalHeight / 2) + lineHeight / 2;

  return (
    <>
      {displayLines.map((line, i) => (
        <tspan key={i} x={0} dy={i === 0 ? startY : lineHeight}>
          {line}
        </tspan>
      ))}
    </>
  );
}
