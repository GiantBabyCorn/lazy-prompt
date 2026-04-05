import type { BubbleNode } from '../data/types';
import type { PhysicsBubble, BubbleRole } from './types';
import { PHYSICS, RADIUS_SCALE, GOBACK_RADIUS_FACTOR, MOBILE_BREAKPOINT, MOBILE_SCALE_FACTOR } from './constants';

/* ------------------------------------------------------------------ */
/*  PhysicsEngine — growth, collision, spring links, settling          */
/* ------------------------------------------------------------------ */

export class PhysicsEngine {
  width = 0;
  height = 0;
  bubbles: Map<string, PhysicsBubble> = new Map();
  activeBubbleIds: Set<string> = new Set();
  hoveredIds: Set<string> = new Set();
  focusedDepth = 0; // depth of the currently focused node
  settled = false;

  private onActiveSetChange: (() => void) | null = null;

  constructor(root: BubbleNode) {
    this.initBubbles(root, null, 0);
  }

  private initBubbles(node: BubbleNode, parentId: string | null, depth: number) {
    const bubble: PhysicsBubble = {
      id: node.id,
      node,
      depth,
      parentId,
      childIds: node.children?.map((c) => c.id) ?? [],
      x: 0, y: 0, vx: 0, vy: 0,
      initialRadius: 0,
      growthMultiplier: 1.0,
      visualRadius: 0,
      activation: 'inactive',
      activationProgress: 0,
      role: 'hidden',
      pinToCenter: false,
      isGoBack: false,
      goBackDirection: null,
      siblingIndex: 0,
      restAngle: 0,
      settledFrames: 0,
      frozen: false,
      prevPositions: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
      stuckFrames: 0,
    };
    this.bubbles.set(node.id, bubble);
    if (node.children) {
      for (const child of node.children) {
        this.initBubbles(child, node.id, depth + 1);
      }
    }
  }

  setOnActiveSetChange(cb: () => void) {
    this.onActiveSetChange = cb;
  }

  /* ---- Resize ---- */

  resize(w: number, h: number) {
    const oldW = this.width || w;
    const oldH = this.height || h;
    this.width = w;
    this.height = h;

    for (const b of this.bubbles.values()) {
      b.initialRadius = this.computeInitialRadius(b.depth, b.isGoBack);
      if (b.activation === 'active' || b.activation === 'activating') {
        b.x = (b.x / oldW) * w;
        b.y = (b.y / oldH) * h;
        b.frozen = false;
        b.settledFrames = 0;
      }
    }
    this.settled = false;
  }

  computeInitialRadius(depth: number, isGoBack: boolean): number {
    // Use depth relative to focused node so the focused bubble always gets RADIUS_SCALE[0]
    const relativeDepth = Math.max(0, depth - this.focusedDepth);
    const scale = RADIUS_SCALE[relativeDepth] ?? RADIUS_SCALE[3];
    const mobileMult = this.width < MOBILE_BREAKPOINT ? MOBILE_SCALE_FACTOR : 1;
    const base = Math.min(this.width, this.height) * scale * mobileMult;
    return isGoBack ? base * GOBACK_RADIUS_FACTOR : base;
  }

  /** Max visual radius based on canvas size. Uses geometric mean + mobile boost. */
  private get maxVisualRadius(): number {
    const ref = Math.sqrt(this.width * this.height);
    const mobileMult = this.width < MOBILE_BREAKPOINT ? MOBILE_SCALE_FACTOR : 1;
    return ref * PHYSICS.MAX_VISUAL_RADIUS_FRACTION * mobileMult;
  }

  /* ---- Activation / Deactivation ---- */

  activateBubbles(ids: string[], role: BubbleRole) {
    let changed = false;

    // Collect siblings for radial placement
    const siblings: PhysicsBubble[] = [];
    let commonParentId: string | null = null;

    for (const id of ids) {
      const b = this.bubbles.get(id);
      if (!b) continue;
      if (b.activation === 'active' || b.activation === 'activating') {
        b.role = role;
        b.pinToCenter = role === 'focused';
        b.isGoBack = role === 'goBack';
        continue;
      }
      commonParentId = b.parentId;
      siblings.push(b);
    }

    if (siblings.length === 0) return;

    // Find parent for radial placement
    const parent = commonParentId ? this.bubbles.get(commonParentId) : null;
    const parentActive = parent && (parent.activation === 'active' || parent.activation === 'activating');
    const cx = parentActive ? parent!.x : this.width / 2;
    const cy = parentActive ? parent!.y : this.height / 2;
    const parentR = parentActive ? parent!.visualRadius : 0;

    // Place children radially around parent border
    const n = siblings.length;
    for (let i = 0; i < n; i++) {
      const b = siblings[i];
      const angle = (2 * Math.PI / n) * i - Math.PI / 2;
      const childR = this.computeInitialRadius(b.depth, role === 'goBack');
      const dist = parentR + childR + 2; // start touching parent border

      b.x = cx + Math.cos(angle) * dist;
      b.y = cy + Math.sin(angle) * dist;
      b.vx = 0;
      b.vy = 0;
      b.activation = 'activating';
      b.activationProgress = 0.01;
      b.growthMultiplier = 1.0;
      b.initialRadius = childR;
      b.role = role;
      b.isGoBack = role === 'goBack';
      b.pinToCenter = role === 'focused';
      b.siblingIndex = i;
      b.restAngle = angle;
      b.frozen = false;
      b.settledFrames = 0;
      this.activeBubbleIds.add(b.id);
      changed = true;
    }

    if (changed) {
      // Unfreeze all active bubbles when new ones appear
      for (const id of this.activeBubbleIds) {
        const b = this.bubbles.get(id)!;
        b.frozen = false;
        b.settledFrames = 0;
      }
      this.settled = false;
      this.onActiveSetChange?.();
    }
  }

  deactivateBubbles(ids: string[]) {
    let changed = false;
    for (const id of ids) {
      const b = this.bubbles.get(id);
      if (!b || b.activation === 'inactive' || b.activation === 'deactivating') continue;
      b.activation = 'deactivating';
      b.pinToCenter = false;
      b.isGoBack = false;
      b.role = 'hidden';
      b.frozen = false;
      changed = true;
    }
    if (changed) this.settled = false;
  }

  deactivateAll() {
    for (const id of this.activeBubbleIds) {
      const b = this.bubbles.get(id)!;
      b.activation = 'deactivating';
      b.pinToCenter = false;
      b.isGoBack = false;
      b.role = 'hidden';
      b.frozen = false;
    }
    this.settled = false;
  }

  setFocused(id: string) {
    const b = this.bubbles.get(id);
    if (!b) return;
    b.pinToCenter = true;
    b.role = 'focused';
    b.isGoBack = false;
    b.frozen = false;
    b.settledFrames = 0;
    this.focusedDepth = b.depth;
  }

  setGoBack(id: string, focusedX: number, focusedY: number) {
    const b = this.bubbles.get(id);
    if (!b) return;
    b.isGoBack = true;
    b.role = 'goBack';
    b.pinToCenter = false;
    b.initialRadius = this.computeInitialRadius(b.depth, true);
    b.frozen = false;
    b.settledFrames = 0;

    const dx = b.x - focusedX;
    const dy = b.y - focusedY;
    const len = Math.sqrt(dx * dx + dy * dy);
    b.goBackDirection = len > 0
      ? { x: dx / len, y: dy / len }
      : { x: 0, y: -1 };
  }

  /* ---- Simulation Tick ---- */

  tick(rawDt: number) {
    const dt = Math.min(rawDt, PHYSICS.MAX_DT);
    if (this.activeBubbleIds.size === 0) return;

    const active = this.getActiveBubbles();

    this.updateActivationTransitions(active, dt);
    this.updateGrowth(active, dt);
    this.resolveCollisions(active, dt);
    this.applySpringLinks(active);
    this.applyPinning(active);
    this.applyGoBackPull(active);
    this.applyBoundaryConstraints(active, dt);
    this.integrateVelocity(active, dt);

    // Update visual radius
    for (const b of active) {
      b.visualRadius = b.initialRadius * b.growthMultiplier * b.activationProgress;
    }

    this.updateSettling(active);
    this.cleanupDeactivated();
  }

  private updateActivationTransitions(active: PhysicsBubble[], dt: number) {
    for (const b of active) {
      if (b.activation === 'activating') {
        b.activationProgress += PHYSICS.ACTIVATION_SPEED * dt;
        if (b.activationProgress >= 1.0) {
          b.activationProgress = 1.0;
          b.activation = 'active';
        }
      } else if (b.activation === 'deactivating') {
        b.activationProgress -= PHYSICS.DEACTIVATION_SPEED * dt;
        if (b.activationProgress <= 0) {
          b.activationProgress = 0;
          b.activation = 'inactive';
        }
      }
    }
  }

  private updateGrowth(active: PhysicsBubble[], dt: number) {
    const maxR = this.maxVisualRadius;

    for (const b of active) {
      if (b.activation !== 'active' || b.frozen) continue;

      const depthFactor = 1 / (1 + b.depth * 0.3);
      const growthDelta = PHYSICS.BASE_GROWTH_RATE * depthFactor * dt;

      // Check if growth would overshoot — find min gap to any neighbor
      const currentR = b.visualRadius;
      const nextR = b.initialRadius * (b.growthMultiplier + growthDelta) * b.activationProgress;
      const growth = nextR - currentR;

      if (growth <= 0) continue;

      // Find minimum available space for growth
      let minGap = Infinity;
      for (const other of active) {
        if (other.id === b.id || other.activation === 'deactivating') continue;
        const dx = other.x - b.x;
        const dy = other.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const gap = dist - currentR - other.visualRadius;
        if (gap < minGap) minGap = gap;
      }

      // Also consider boundary
      const boundaryGap = Math.min(b.x, this.width - b.x, b.y, this.height - b.y) - currentR;
      if (boundaryGap < minGap) minGap = boundaryGap;

      // No room — shrink slightly to relieve pressure instead of bouncing
      if (minGap <= 0) {
        const shrink = PHYSICS.SQUEEZE_SHRINK_RATE * dt;
        if (shrink >= PHYSICS.SHRINK_THRESHOLD) {
          b.growthMultiplier -= shrink;
          if (b.growthMultiplier < PHYSICS.MIN_GROWTH_MULTIPLIER) b.growthMultiplier = PHYSICS.MIN_GROWTH_MULTIPLIER;
        }
        continue;
      }

      const allowedGrowth = Math.min(growth, minGap);
      if (allowedGrowth < growth * PHYSICS.GROWTH_CAP_FRACTION) {
        // Growth is negligible — stop trying
        continue;
      }

      b.growthMultiplier += growthDelta * (allowedGrowth / growth);

      // Cap at max
      if (b.growthMultiplier > PHYSICS.MAX_GROWTH_MULTIPLIER) {
        b.growthMultiplier = PHYSICS.MAX_GROWTH_MULTIPLIER;
      }

      // Cap at max visual radius
      const projectedR = b.initialRadius * b.growthMultiplier * b.activationProgress;
      if (projectedR > maxR) {
        b.growthMultiplier = maxR / (b.initialRadius * b.activationProgress);
      }
    }
  }

  private resolveCollisions(active: PhysicsBubble[], dt: number) {
    for (let i = 0; i < active.length; i++) {
      for (let j = i + 1; j < active.length; j++) {
        const a = active[i];
        const b = active[j];
        if (a.frozen && b.frozen) continue;

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const sumR = a.visualRadius + b.visualRadius;

        if (dist < sumR + PHYSICS.BUFFER) {
          this.handleCollision(a, b, dx, dy, dist, sumR, dt);
        }
      }
    }
  }

  private handleCollision(
    a: PhysicsBubble, b: PhysicsBubble,
    dx: number, dy: number, dist: number, sumR: number, dt: number,
  ) {
    const overlap = sumR - dist + PHYSICS.BUFFER;
    if (overlap <= 0) return;

    // Unfreeze on collision — but not if the bubble is pinned against a wall,
    // to prevent endless bounce loops at the boundary.
    const aTouchingWall = this.isTouchingWall(a);
    const bTouchingWall = this.isTouchingWall(b);
    if (!aTouchingWall) { a.frozen = false; a.settledFrames = 0; a.stuckFrames = 0; }
    if (!bTouchingWall) { b.frozen = false; b.settledFrames = 0; b.stuckFrames = 0; }

    // Direction (random if degenerate)
    let nx: number, ny: number;
    if (dist > 0.1) {
      nx = dx / dist; ny = dy / dist;
    } else {
      const angle = Math.random() * Math.PI * 2;
      nx = Math.cos(angle); ny = Math.sin(angle);
    }

    // Effective mass: visual radius × hover priority
    // Priority order: hovered (directly under cursor) > hover-revealed (children of hovered) > normal
    // Only ONE multiplier applies per bubble (highest wins)
    let massA = a.visualRadius;
    let massB = b.visualRadius;

    if (this.hoveredIds.has(a.id)) {
      massA *= PHYSICS.HOVERED_MASS_MULTIPLIER;
    } else if (a.role === 'hoverRevealed') {
      massA *= PHYSICS.HOVER_REVEALED_MASS_MULTIPLIER;
    }

    if (this.hoveredIds.has(b.id)) {
      massB *= PHYSICS.HOVERED_MASS_MULTIPLIER;
    } else if (b.role === 'hoverRevealed') {
      massB *= PHYSICS.HOVER_REVEALED_MASS_MULTIPLIER;
    }

    // Repulsion weight by inverse effective mass
    const totalMass = massA + massB;
    let wA = totalMass > 0 ? massB / totalMass : 0.5;
    let wB = totalMass > 0 ? massA / totalMass : 0.5;
    if (a.pinToCenter) { wA = 0; wB = 1; }
    if (b.pinToCenter) { wB = 0; wA = 1; }

    const force = overlap * PHYSICS.REPULSION_STRENGTH;
    a.vx -= nx * force * wA;
    a.vy -= ny * force * wA;
    b.vx += nx * force * wB;
    b.vy += ny * force * wB;

    // Growth balancing
    const biggerMult = Math.max(a.growthMultiplier, b.growthMultiplier);
    const smallerMult = Math.min(a.growthMultiplier, b.growthMultiplier);

    if (biggerMult > smallerMult * PHYSICS.GROWTH_BALANCE_THRESHOLD) {
      const higher = a.growthMultiplier > b.growthMultiplier ? a : b;
      const shrink = PHYSICS.SHRINK_RATE * dt;
      if (shrink >= PHYSICS.SHRINK_THRESHOLD) {
        higher.growthMultiplier -= shrink;
        if (higher.growthMultiplier < smallerMult) higher.growthMultiplier = smallerMult;
        if (higher.growthMultiplier < PHYSICS.MIN_GROWTH_MULTIPLIER) higher.growthMultiplier = PHYSICS.MIN_GROWTH_MULTIPLIER;
      }
    }
  }

  /** Spring links: pull children toward target distance from parent */
  private applySpringLinks(active: PhysicsBubble[]) {
    for (const b of active) {
      if (b.frozen || !b.parentId) continue;
      const parent = this.bubbles.get(b.parentId);
      if (!parent || parent.activation === 'inactive') continue;

      const dx = b.x - parent.x;
      const dy = b.y - parent.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 0.1) continue;

      // Gap decays by depth RELATIVE to focused node:
      // focused's direct children get full gap, their children get gap * decay, etc.
      const relativeDepth = Math.max(0, b.depth - this.focusedDepth - 1);
      const depthFactor = Math.pow(PHYSICS.SPRING_REST_GAP_DEPTH_DECAY, relativeDepth);
      // Alternation: odd siblings get +alt, even get -alt
      const alt = PHYSICS.SPRING_REST_GAP_ALTERNATION;
      const altFactor = b.siblingIndex % 2 === 0 ? (1 - alt) : (1 + alt);
      const mobileGapScale = this.width < MOBILE_BREAKPOINT ? PHYSICS.SPRING_REST_GAP_MOBILE_SCALE : 1;
      const gap = PHYSICS.SPRING_REST_GAP * depthFactor * altFactor * mobileGapScale;
      const targetDist = parent.visualRadius + b.visualRadius + gap;
      const diff = dist - targetDist;

      // Spring force
      const fx = (dx / dist) * diff * PHYSICS.SPRING_STIFFNESS;
      const fy = (dy / dist) * diff * PHYSICS.SPRING_STIFFNESS;

      // Apply to child only (parent is either pinned or has its own constraints)
      if (!b.pinToCenter) {
        b.vx -= fx;
        b.vy -= fy;
      }

      // Angular spring: pull child back toward its rest angle around parent
      if (!b.pinToCenter && PHYSICS.ANGULAR_SPRING_STIFFNESS > 0) {
        const currentAngle = Math.atan2(dy, dx);

        // Target angle = rest angle, but shifted if a sibling is hovered
        let targetAngle = b.restAngle;

        // Check if any sibling (same parent) is hovered — push away from its angle
        if (this.hoveredIds.size > 0 && !this.hoveredIds.has(b.id)) {
          for (const hovId of this.hoveredIds) {
            const hov = this.bubbles.get(hovId);
            if (!hov || hov.parentId !== b.parentId) continue;

            // Angular distance from hovered sibling
            let angToHovered = targetAngle - hov.restAngle;
            while (angToHovered > Math.PI) angToHovered -= 2 * Math.PI;
            while (angToHovered < -Math.PI) angToHovered += 2 * Math.PI;

            // Push ALL siblings away uniformly (not proximity-weighted)
            const pushDir = angToHovered >= 0 ? 1 : -1;
            targetAngle += pushDir * PHYSICS.ANGULAR_HOVER_SPREAD * Math.PI;
          }
        }

        // Shortest angular difference to target
        let angleDiff = targetAngle - currentAngle;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        // Tangential force (perpendicular to radial direction)
        const tangentX = -dy / dist;
        const tangentY = dx / dist;
        const angularForce = angleDiff * dist * PHYSICS.ANGULAR_SPRING_STIFFNESS;

        b.vx += tangentX * angularForce;
        b.vy += tangentY * angularForce;
      }
    }
  }

  private applyPinning(active: PhysicsBubble[]) {
    const cx = this.width / 2;
    const cy = this.height / 2;
    for (const b of active) {
      if (!b.pinToCenter) continue;
      b.vx += (cx - b.x) * PHYSICS.PIN_STRENGTH;
      b.vy += (cy - b.y) * PHYSICS.PIN_STRENGTH;
    }
  }

  private applyGoBackPull(active: PhysicsBubble[]) {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxDist = Math.min(this.width, this.height) * PHYSICS.GOBACK_MAX_DISTANCE_FRACTION;

    for (const b of active) {
      if (!b.isGoBack || !b.goBackDirection) continue;

      // Target: along goBack direction, clamped to maxDist from center
      const r = b.initialRadius * b.growthMultiplier;
      const rawDist = Math.min(this.width / 2 - r, this.height / 2 - r, maxDist);
      const targetX = cx + b.goBackDirection.x * rawDist;
      const targetY = cy + b.goBackDirection.y * rawDist;

      b.vx += (targetX - b.x) * PHYSICS.GOBACK_PULL_STRENGTH;
      b.vy += (targetY - b.y) * PHYSICS.GOBACK_PULL_STRENGTH;
    }
  }

  private isTouchingWall(b: PhysicsBubble): boolean {
    const r = b.visualRadius;
    return b.x - r <= 0 || b.x + r >= this.width || b.y - r <= 0 || b.y + r >= this.height;
  }

  private applyBoundaryConstraints(active: PhysicsBubble[], dt: number) {
    for (const b of active) {
      const r = b.visualRadius;
      if (r <= 0) continue;

      let touchingWall = false;

      // Clamp to boundary — absorb velocity on the clamped axis, apply extra damping
      if (b.x - r < 0) { b.x = r; b.vx = 0; touchingWall = true; }
      if (b.x + r > this.width) { b.x = this.width - r; b.vx = 0; touchingWall = true; }
      if (b.y - r < 0) { b.y = r; b.vy = 0; touchingWall = true; }
      if (b.y + r > this.height) { b.y = this.height - r; b.vy = 0; touchingWall = true; }

      // Extra friction near walls to prevent oscillation
      if (touchingWall) {
        b.vx *= PHYSICS.WALL_DAMPING;
        b.vy *= PHYSICS.WALL_DAMPING;
      }

      // If touching wall AND overlapping a neighbor, shrink to relieve pressure
      if (touchingWall && !b.frozen) {
        for (const other of active) {
          if (other.id === b.id) continue;
          const dx = other.x - b.x;
          const dy = other.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const overlap = b.visualRadius + other.visualRadius - dist;
          if (overlap > PHYSICS.BUFFER) {
            // Squeezed between wall and neighbor — shrink
            const shrink = PHYSICS.SQUEEZE_SHRINK_RATE * dt;
            if (shrink >= PHYSICS.SHRINK_THRESHOLD) {
              b.growthMultiplier -= shrink;
              if (b.growthMultiplier < PHYSICS.MIN_GROWTH_MULTIPLIER) b.growthMultiplier = PHYSICS.MIN_GROWTH_MULTIPLIER;
            }
            break; // one shrink per frame is enough
          }
        }
      }
    }
  }

  private integrateVelocity(active: PhysicsBubble[], dt: number) {
    const dtScale = dt / 0.016;
    const damping = Math.pow(PHYSICS.DAMPING, dtScale);
    const tol = PHYSICS.STUCK_POSITION_TOLERANCE;
    for (const b of active) {
      if (b.frozen) continue;

      // Stuck detection: check if current position matches either of the last 2 recorded positions
      const matchesPrev = b.prevPositions.some(
        (p) => Math.abs(b.x - p.x) < tol && Math.abs(b.y - p.y) < tol,
      );
      if (matchesPrev) {
        b.stuckFrames++;
        const stuckDamping = Math.pow(PHYSICS.STUCK_DAMPING, b.stuckFrames);
        b.vx *= stuckDamping;
        b.vy *= stuckDamping;
      } else {
        b.stuckFrames = 0;
      }

      // Record position history (ring buffer)
      b.prevPositions[1] = b.prevPositions[0];
      b.prevPositions[0] = { x: b.x, y: b.y };

      b.x += b.vx;
      b.y += b.vy;
      b.vx *= damping;
      b.vy *= damping;
    }
  }

  /** Track settling: freeze bubbles that have been still for N frames */
  private updateSettling(active: PhysicsBubble[]) {
    this.settled = true;
    for (const b of active) {
      if (b.activation === 'activating' || b.activation === 'deactivating') {
        this.settled = false;
        continue;
      }
      if (b.frozen) continue;

      const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (speed < PHYSICS.VELOCITY_THRESHOLD) {
        b.settledFrames++;
        if (b.settledFrames >= PHYSICS.FREEZE_FRAMES) {
          b.frozen = true;
          b.vx = 0;
          b.vy = 0;
        }
      } else {
        b.settledFrames = 0;
        this.settled = false;
      }
    }
  }

  private cleanupDeactivated() {
    let changed = false;
    for (const id of this.activeBubbleIds) {
      const b = this.bubbles.get(id)!;
      if (b.activation === 'inactive') {
        this.activeBubbleIds.delete(id);
        changed = true;
      }
    }
    if (changed) this.onActiveSetChange?.();
  }

  /* ---- Queries ---- */

  getActiveBubbles(): PhysicsBubble[] {
    const result: PhysicsBubble[] = [];
    for (const id of this.activeBubbleIds) {
      const b = this.bubbles.get(id);
      if (b) result.push(b);
    }
    return result;
  }

  getBubble(id: string): PhysicsBubble | undefined {
    return this.bubbles.get(id);
  }
}
