import { Handle, Position } from '@xyflow/react';
import type { NodeProps, Node } from '@xyflow/react';
import { useTranslation } from 'react-i18next';

export interface BubbleNodeData {
  labelKey: string;
  descriptionKeys?: string[];
  bubbleType: 'primary' | 'secondary';
  isHub: boolean;
  onClick?: () => void;
  [key: string]: unknown;
}

type BubbleFlowNode = Node<BubbleNodeData, 'bubble'>;

const sizeMap = {
  hub: 140,
  primary: 120,
  secondary: 80,
} as const;

export function BubbleNodeComponent({ data }: NodeProps<BubbleFlowNode>) {
  const { t } = useTranslation('prompts');

  const variant = data.isHub ? 'hub' : data.bubbleType;
  const size = sizeMap[variant];

  return (
    <div
      className={`bubble-node bubble-node--${variant}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `${variant === 'secondary' ? 2 : 3}px solid var(--color-green)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-surface)',
        cursor: data.isHub ? 'default' : 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        textAlign: 'center',
        padding: 8,
        overflow: 'hidden',
      }}
      onClick={() => {
        if (!data.isHub && data.onClick) {
          data.onClick();
        }
      }}
      onMouseEnter={(e) => {
        if (!data.isHub) {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow =
            '0 0 20px rgba(0, 255, 136, 0.4)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, pointerEvents: 'none' }}
      />
      <span
        style={{
          color: 'var(--color-text)',
          fontSize: variant === 'secondary' ? 10 : 12,
          fontWeight: 600,
          lineHeight: 1.2,
          wordBreak: 'break-word',
        }}
      >
        {t(data.labelKey)}
      </span>
      {data.descriptionKeys && data.descriptionKeys.length > 0 && (
        <span
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 8,
            lineHeight: 1.2,
            marginTop: 2,
          }}
        >
          {data.descriptionKeys.map((k) => t(k)).join(', ')}
        </span>
      )}
    </div>
  );
}

export const bubbleNodeTypes = {
  bubble: BubbleNodeComponent,
} as const;
