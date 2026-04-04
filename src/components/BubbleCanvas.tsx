import { useMemo } from 'react';
import { ReactFlow } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { bubbleNodeTypes } from './BubbleNode';
import type { BubbleNodeData } from './BubbleNode';
import { bubbleEdgeTypes } from './BubbleEdge';
import { GoBackButton } from './GoBackButton';
import type { BubbleNode as BubbleNodeType } from '../data/types';

const CENTER_X = 400;
const CENTER_Y = 300;
const RADIUS = 250;

interface BubbleCanvasProps {
  currentNode: BubbleNodeType;
  currentChildren: BubbleNodeType[];
  isAtRoot: boolean;
  onNavigate: (nodeId: string) => void;
  onGoBack: () => void;
  onLeafClick: (node: BubbleNodeType) => void;
}

export function BubbleCanvas({
  currentNode,
  currentChildren,
  isAtRoot,
  onNavigate,
  onGoBack,
  onLeafClick,
}: BubbleCanvasProps) {
  const { nodes, edges } = useMemo(() => {
    const hubSize = 140;
    const hubNode: Node<BubbleNodeData, 'bubble'> = {
      id: currentNode.id,
      type: 'bubble',
      position: { x: CENTER_X - hubSize / 2, y: CENTER_Y - hubSize / 2 },
      data: {
        labelKey: currentNode.labelKey,
        descriptionKeys: currentNode.descriptionKeys,
        bubbleType: currentNode.type,
        isHub: true,
      },
    };

    const childNodes: Node<BubbleNodeData, 'bubble'>[] = currentChildren.map(
      (child, index) => {
        const angle =
          (2 * Math.PI * index) / currentChildren.length - Math.PI / 2;
        const size = child.type === 'primary' ? 120 : 80;
        const x = CENTER_X + RADIUS * Math.cos(angle) - size / 2;
        const y = CENTER_Y + RADIUS * Math.sin(angle) - size / 2;

        return {
          id: child.id,
          type: 'bubble' as const,
          position: { x, y },
          data: {
            labelKey: child.labelKey,
            descriptionKeys: child.descriptionKeys,
            bubbleType: child.type,
            isHub: false,
            onClick: () => {
              if (child.children && child.children.length > 0) {
                onNavigate(child.id);
              } else if (child.promptTemplateId) {
                onLeafClick(child);
              }
            },
          },
        };
      },
    );

    const childEdges: Edge[] = currentChildren.map((child) => ({
      id: `edge-${currentNode.id}-${child.id}`,
      source: currentNode.id,
      target: child.id,
      type: 'bubbleEdge',
    }));

    return {
      nodes: [hubNode, ...childNodes],
      edges: childEdges,
    };
  }, [currentNode, currentChildren, onNavigate, onLeafClick]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <GoBackButton onClick={onGoBack} visible={!isAtRoot} />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={bubbleNodeTypes}
        edgeTypes={bubbleEdgeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: 'transparent' }}
      />
      <style>{`
        @keyframes bubble-edge-dash {
          to {
            stroke-dashoffset: -12;
          }
        }
      `}</style>
    </div>
  );
}
