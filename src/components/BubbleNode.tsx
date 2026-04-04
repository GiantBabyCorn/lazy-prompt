import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface BubbleNodeProps {
  cx: number;
  cy: number;
  radius: number;
  labelKey: string;
  descriptionKeys?: string[];
  variant: 'hub' | 'primary' | 'secondary';
  onClick?: () => void;
  exitState?: 'none' | 'fading' | 'clicked';
  enterDelay?: number;
  isEntering?: boolean;
}

export function BubbleNodeSvg({
  cx,
  cy,
  radius,
  labelKey,
  descriptionKeys,
  variant,
  onClick,
  exitState = 'none',
  enterDelay = 0,
  isEntering = false,
}: BubbleNodeProps) {
  const { t } = useTranslation('prompts');

  const borderWidth = variant === 'secondary' ? 2 : 3;
  const fontSize = variant === 'secondary' ? 10 : variant === 'hub' ? 14 : 12;
  const label = t(labelKey);
  const descriptions = descriptionKeys?.map((k) => t(k));

  // Compute animation props based on state
  const getMotionProps = () => {
    if (isEntering) {
      return {
        initial: { opacity: 0, scale: 0.6 } as const,
        animate: { opacity: 1, scale: 1 } as const,
        transition: {
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
          delay: enterDelay,
        },
      };
    }
    if (exitState === 'fading') {
      return {
        animate: { opacity: 0, scale: 0.85 } as const,
        transition: { duration: 0.3, ease: 'easeIn' as const },
      };
    }
    if (exitState === 'clicked') {
      return {
        animate: { opacity: 1, scale: 1.1 } as const,
        transition: { duration: 0.2 },
      };
    }
    return {
      animate: { opacity: 1, scale: 1 } as const,
      transition: { duration: 0.3 },
    };
  };

  const motionProps = getMotionProps();

  return (
    <motion.g
      style={{ cursor: variant === 'hub' ? 'default' : 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        if (variant !== 'hub' && onClick) onClick();
      }}
      {...motionProps}
      whileHover={
        variant !== 'hub'
          ? {
              scale: 1.08,
              filter: 'drop-shadow(0 0 12px rgba(0, 255, 136, 0.5))',
            }
          : undefined
      }
    >
      {/* Circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius - borderWidth / 2}
        fill="var(--color-surface)"
        stroke="var(--color-green)"
        strokeWidth={borderWidth}
      />

      {/* Label text */}
      <text
        x={cx}
        y={descriptions && descriptions.length > 0 ? cy - 6 : cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--color-text)"
        fontSize={fontSize}
        fontWeight={600}
        fontFamily="'Inter', sans-serif"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {wrapText(label, radius * 1.4, fontSize, cx)}
      </text>

      {/* Description text */}
      {descriptions && descriptions.length > 0 && (
        <text
          x={cx}
          y={cy + fontSize / 2 + 4}
          textAnchor="middle"
          dominantBaseline="hanging"
          fill="var(--color-text-secondary)"
          fontSize={8}
          fontFamily="'Inter', sans-serif"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {descriptions.map((desc, i) => (
            <tspan key={i} x={cx} dy={i === 0 ? 0 : 11}>
              {desc}{i < descriptions.length - 1 ? ',' : ''}
            </tspan>
          ))}
        </text>
      )}
    </motion.g>
  );
}

function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  anchorX: number,
): React.ReactNode {
  const charWidth = fontSize * 0.55;
  const maxChars = Math.floor(maxWidth / charWidth);

  if (text.length <= maxChars) {
    return text;
  }

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
        <tspan key={i} x={anchorX} dy={i === 0 ? startY : lineHeight}>
          {line}
        </tspan>
      ))}
    </>
  );
}
