import type { BubbleNode } from '../data/types';

export type BubbleActivation = 'inactive' | 'activating' | 'active' | 'deactivating';
export type BubbleRole = 'focused' | 'child' | 'goBack' | 'hoverRevealed' | 'hidden';

export interface PhysicsBubble {
  // Identity
  id: string;
  node: BubbleNode;
  depth: number;
  parentId: string | null;
  childIds: string[];

  // Physics state (mutated each frame)
  x: number;
  y: number;
  vx: number;
  vy: number;
  initialRadius: number;
  growthMultiplier: number;

  // Derived (recomputed each frame)
  visualRadius: number;

  // Lifecycle
  activation: BubbleActivation;
  activationProgress: number; // 0..1

  // Role
  role: BubbleRole;
  pinToCenter: boolean;
  isGoBack: boolean;
  goBackDirection: { x: number; y: number } | null; // unit vector away from focused

  // Sibling layout
  siblingIndex: number;         // index among siblings (for alternating gap)
  restAngle: number;            // initial angle (radians) relative to parent center

  // Settling
  settledFrames: number; // consecutive frames with low velocity + no growth
  frozen: boolean;       // true = skip physics until disturbed

  // Stuck detection: if position repeats within 2 frames, apply exponential damping
  prevPositions: [{ x: number; y: number }, { x: number; y: number }]; // ring buffer of last 2 positions
  stuckFrames: number;   // consecutive frames detected as stuck
}
