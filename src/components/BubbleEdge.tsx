import { BaseEdge, getStraightPath } from '@xyflow/react';
import type { EdgeProps } from '@xyflow/react';

export function BubbleEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{
        stroke: 'var(--color-green)',
        strokeWidth: 2,
        strokeDasharray: '8 4',
        animation: 'bubble-edge-dash 0.6s linear infinite',
      }}
    />
  );
}

export const bubbleEdgeTypes = {
  bubbleEdge: BubbleEdgeComponent,
} as const;
