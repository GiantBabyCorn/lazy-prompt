/**
 * Bubble View (static radial layout) tuning constants.
 *
 * Equivalent to src/physics/constants.ts for the Dynamic View.
 * All values are designed to be adjusted independently.
 */

/* ═══════════════════════════════════════════════════════════════════
   1. BUBBLE SIZES — base radii (px) before responsive scaling
   ═══════════════════════════════════════════════════════════════════ */

export const BUBBLE_SIZES = {
  /** Center hub bubble radius. */
  hub: 100,
  /** Primary (larger) child bubble radius. */
  primary: 60,
  /** Secondary (smaller) child bubble radius. */
  secondary: 50,
  /** Preview bubble radius (hover-revealed children). */
  preview: 28,
  /** Go-back button radius. */
  goBack: 50,
} as const;

/* ═══════════════════════════════════════════════════════════════════
   2. RESPONSIVE SCALING — adapts bubble sizes to screen
   ═══════════════════════════════════════════════════════════════════ */

/**
 * Reference width for scale factor calculation.
 * scaleFactor = clamp(scaleBasis / this, SCALE_MIN, SCALE_MAX).
 * Lower = bigger bubbles on the same screen.
 */
export const SCALE_REFERENCE = 600;

/** Minimum scale factor (small screens). */
export const SCALE_MIN = 0.75;

/** Maximum scale factor (large screens). */
export const SCALE_MAX = 1.3;

/* ═══════════════════════════════════════════════════════════════════
   3. PHYSICS — repulsion and spring animation
   ═══════════════════════════════════════════════════════════════════ */

/** How strongly sibling bubbles push away from the hovered bubble. */
export const REPULSION_STRENGTH = 50;

/** Spring config for position transitions. */
export const POS_SPRING = { type: 'spring' as const, stiffness: 200, damping: 22 };

/** Spring config for morph (scale/opacity) transitions. */
export const MORPH_SPRING = { type: 'spring' as const, stiffness: 150, damping: 20 };

/* ═══════════════════════════════════════════════════════════════════
   4. TEXT — font sizes and border widths by variant
   ═══════════════════════════════════════════════════════════════════ */

/** Font size (px) by variant. */
export const FONT_SIZE = {
  hub: 20,
  primary: 12,
  secondary: 12.5,
  preview: 8,
} as const;

/** Description sub-text font size (px) by variant. */
export const DESC_FONT_SIZE = {
  hub: 10,
  primary: 10,
  secondary: 9,
  preview: 0,
} as const;

/** Border width (px) by variant. */
export const BORDER_WIDTH = {
  hub: 3,
  primary: 3,
  secondary: 2,
  preview: 1.5,
} as const;

/** Extra border width added on hover. */
export const HOVER_BORDER_EXTRA = 1;

/** Minimum radius (px) to show description text. Below this, descriptions are hidden. */
export const DESC_MIN_RADIUS = 50;

/* ═══════════════════════════════════════════════════════════════════
   5. ICON — topic icon sizing
   ═══════════════════════════════════════════════════════════════════ */

/** Icon size multiplier relative to font size. */
export const ICON_SIZE_MULTIPLIER = 1.5;

/** Hub variant icon size multiplier (larger center bubble). */
export const ICON_SIZE_MULTIPLIER_HUB = 2.0;
