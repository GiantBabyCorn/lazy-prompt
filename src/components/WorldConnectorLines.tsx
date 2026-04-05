import type { PhysicsBubble } from '../physics/types';

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface WorldConnectorLinesProps {
  bubbles: PhysicsBubble[];
  getBubble: (id: string) => PhysicsBubble | undefined;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function WorldConnectorLines({ bubbles, getBubble }: WorldConnectorLinesProps) {
  return (
    <g className="world-connector-lines">
      {bubbles
        .filter((b) => b.parentId !== null && b.activationProgress > 0)
        .map((b) => {
          const parent = getBubble(b.parentId!);
          if (!parent || parent.activationProgress <= 0) return null;

          const isGoBack = b.role === 'goBack' || parent.role === 'goBack';
          const isHover = b.role === 'hoverRevealed' || parent.role === 'hoverRevealed';
          const color = isGoBack
            ? 'var(--color-orange)'
            : isHover
              ? 'var(--color-cyan)'
              : 'var(--color-green)';

          return (
            <line
              key={`line-${b.id}`}
              data-child-id={b.id}
              x1={parent.x}
              y1={parent.y}
              x2={b.x}
              y2={b.y}
              stroke={color}
              strokeWidth={1.5}
              strokeDasharray="6 4"
              strokeOpacity={0.5}
            />
          );
        })}
    </g>
  );
}
