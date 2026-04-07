/**
 * Physics simulation tuning constants.
 *
 * Organized into groups. All values are designed to be adjusted independently.
 * Change one at a time and observe the effect.
 */

export const PHYSICS = {

  /* ═══════════════════════════════════════════════════════════════════
     1. GROWTH — how fast bubbles expand and balance sizes
     ═══════════════════════════════════════════════════════════════════ */

  /** How fast bubbles grow (multiplier units/second). Higher = fill space faster. */
  BASE_GROWTH_RATE: 5,

  /** How fast the higher-multiplier bubble shrinks on collision (units/sec). */
  SHRINK_RATE: 0.4,

  /** Absolute cap on growth multiplier. Prevents infinite expansion. */
  MAX_GROWTH_MULTIPLIER: 1.15,

  /** Floor for growth multiplier. Squeeze shrink won't go below this. */
  MIN_GROWTH_MULTIPLIER: 0.65,

  /** Max visual radius as fraction of min(canvasW, canvasH). Caps size on wide screens. */
  MAX_VISUAL_RADIUS_FRACTION: 0.15,

  /**
   * If a bubble can only grow by less than this fraction of planned growth
   * (neighbor in the way), stop growing. Prevents oscillation.
   */
  GROWTH_CAP_FRACTION: 0.2,

  /**
   * Growth balance threshold. If bigger.mult > smaller.mult × this,
   * the higher-multiplier bubble shrinks. 1.05 = 5% tolerance.
   */
  GROWTH_BALANCE_THRESHOLD: 1.05,

  /**
   * When a bubble has no room to grow AND is overlapping neighbors (minGap < 0),
   * shrink by this rate (multiplier units/sec) to relieve pressure.
   * Prevents endless bouncing in tight spaces.
   */
  SQUEEZE_SHRINK_RATE: 0.3,

  /* ═══════════════════════════════════════════════════════════════════
     2. COLLISION — repulsion when bubbles overlap
     ═══════════════════════════════════════════════════════════════════ */

  /** Velocity multiplier on collision overlap. Higher = stronger push-apart. */
  REPULSION_STRENGTH: 1.5,

  /** Pixel tolerance before bubbles are considered "tangent". */
  BUFFER: 5,

  /* ═══════════════════════════════════════════════════════════════════
     3. SPRINGS — parent ↔ child distance & angle constraints
     ═══════════════════════════════════════════════════════════════════ */

  /** Spring stiffness for parent-child distance constraint. Higher = snappier. */
  SPRING_STIFFNESS: 0.04,

  /** Extra gap (px) between parent border and child border at rest. */
  SPRING_REST_GAP: 110,

  /** Multiplier for SPRING_REST_GAP on mobile (width < MOBILE_BREAKPOINT). */
  SPRING_REST_GAP_MOBILE_SCALE: 0.85,

  /**
   * Decay per depth level relative to focused node.
   * Focused's direct children get full gap; their children get gap × this; etc.
   */
  SPRING_REST_GAP_DEPTH_DECAY: 0.35,

  /**
   * Alternating distance variation for siblings.
   * 0.15 → odd children get gap × 1.15, even get gap × 0.85.
   */
  SPRING_REST_GAP_ALTERNATION: 0.15,

  /**
   * Angular spring stiffness pulling children back to their initial angle
   * around the parent. Higher = stronger snap-back after collision deflection.
   * Applies a tangential force proportional to angular deviation.
   */
  ANGULAR_SPRING_STIFFNESS: 0.02,

  /**
   * When a sibling is hovered, other siblings spread angularly to make room
   * for the hovered bubble's children. This controls the push strength.
   * Higher = siblings dodge further from the hovered bubble's angle.
   */
  ANGULAR_HOVER_SPREAD: 0.03,

  /* ═══════════════════════════════════════════════════════════════════
     4. PINNING & MOVEMENT — focused bubble center lock, go-back edge pull
     ═══════════════════════════════════════════════════════════════════ */

  /** Spring constant pulling focused bubble to canvas center. */
  PIN_STRENGTH: 0.15,

  /**
   * Vertical offset for the center pin target, as fraction of bubble's visual radius.
   * -0.5 shifts the center bubble upward by 50% of its radius (better mobile UX).
   */
  PIN_CENTER_Y_OFFSET: -0.35,

  /** Spring constant pulling go-back bubble toward canvas edge. */
  GOBACK_PULL_STRENGTH: 0.1,

  /** Max distance (fraction of min(canvasW,canvasH)) for go-back from center. */
  GOBACK_MAX_DISTANCE_FRACTION: 0.4,

  /* ═══════════════════════════════════════════════════════════════════
     5. DAMPING & SETTLING — friction, freeze thresholds
     ═══════════════════════════════════════════════════════════════════ */

  /** Velocity damping per frame (at 60fps). Lower = more friction = settle faster. */
  DAMPING: 0.82,

  /**
   * Extra damping multiplier applied when a bubble is near or touching a wall.
   * Stacks with DAMPING. Lower = more friction near edges. 0.5 = halve velocity each frame.
   */
  WALL_DAMPING: 0.5,

  /** Velocity (px/frame) below which a bubble is considered stationary. */
  VELOCITY_THRESHOLD: 0.5,

  /** Growth delta below which a bubble is considered done growing. */
  GROWTH_THRESHOLD: 0.15,

  /** Shrink delta below which a bubble skips shrinking. Prevents micro-jitter. */
  SHRINK_THRESHOLD: 0.05,

  /** Consecutive settled frames before a bubble freezes (stops all physics). */
  FREEZE_FRAMES: 10,

  /**
   * Position tolerance (px) for stuck detection.
   * If a bubble returns to a previously seen position (within this tolerance)
   * within 2 frames, it's considered stuck in a loop.
   */
  STUCK_POSITION_TOLERANCE: 2,

  /**
   * Exponential damping applied each frame while stuck.
   * Velocity is multiplied by this^(stuckFrames) until it drops below VELOCITY_THRESHOLD.
   * Lower = faster decay. 0.7 → after 5 stuck frames, velocity × 0.17.
   */
  STUCK_DAMPING: 0.7,

  /* ═══════════════════════════════════════════════════════════════════
     6. ACTIVATION — appear/disappear transition speed
     ═══════════════════════════════════════════════════════════════════ */

  /** How fast a bubble fades in (progress units/sec). 8 ≈ 125ms. */
  ACTIVATION_SPEED: 8.0,

  /** How fast a bubble fades out (progress units/sec). 6 ≈ 167ms. */
  DEACTIVATION_SPEED: 6.0,

  /* ═══════════════════════════════════════════════════════════════════
     7. HOVER — interaction priority and margin
     ═══════════════════════════════════════════════════════════════════ */

  /**
   * Mass multiplier for the directly hovered bubble (cursor is on it).
   * Highest priority — barely moves when its children pop out.
   */
  HOVERED_MASS_MULTIPLIER: 20.0,

  /**
   * Mass multiplier for hover-revealed children (of the hovered bubble).
   * Mid priority — pushes other siblings but yields to the hovered parent.
   */
  HOVER_REVEALED_MASS_MULTIPLIER: 6.0,

  /**
   * Hover exit margin as fraction of bubble radius.
   * Cursor must leave border + this fraction before hover ends.
   */
  HOVER_MARGIN_FRACTION: 0.45,

  /* ═══════════════════════════════════════════════════════════════════
     8. FRAME TIMING
     ═══════════════════════════════════════════════════════════════════ */

  /** Max delta-time per frame (seconds). Caps physics at 30fps minimum. */
  MAX_DT: 0.033,

} as const;

/* ═══════════════════════════════════════════════════════════════════════
   BUBBLE SIZING — initial radius by depth level
   ═══════════════════════════════════════════════════════════════════════ */

/**
 * On small screens (width < MOBILE_BREAKPOINT), all bubble sizes are
 * multiplied by this factor. Increase to make mobile bubbles bigger.
 */
export const MOBILE_BREAKPOINT = 768;
export const MOBILE_SCALE_FACTOR = 1.65;

/** Initial radius as fraction of min(canvasW, canvasH) by depth. */
export const RADIUS_SCALE: Record<number, number> = {
  0: 0.12,   // root
  1: 0.065,  // category (Translation, Read, Build, ...)
  2: 0.045,   // subcategory (EN↔ZH, Webpage, ...)
  3: 0.035,  // leaf (Formal, Casual, ...)
};

/** Go-back button radius = normal radius × this factor. */
export const GOBACK_RADIUS_FACTOR = 0.5;

/* ═══════════════════════════════════════════════════════════════════════
   TEXT SIZING — label and description display rules
   ═══════════════════════════════════════════════════════════════════════ */

/** Minimum font size (px) for bubble labels. */
export const TEXT_MIN_FONT_SIZE = 15;

/** Visual radius (px) above which description sub-text appears. */
export const TEXT_SHOW_DESC_RADIUS = 45;

/** Visual radius (px) above which the entire text block scales up. */
export const TEXT_SCALE_UP_RADIUS = 60;

/** Max font size (px) the label can scale up to. */
export const TEXT_MAX_FONT_SIZE = 36;

/** Font size (px) for description sub-text. */
export const TEXT_DESC_FONT_SIZE = 11;