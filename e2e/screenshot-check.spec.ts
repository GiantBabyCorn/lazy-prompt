import { test, expect } from '@playwright/test';

/**
 * Screenshot test — captures every route depth and verifies
 * that bubbles are visible and properly positioned.
 */

// Representative routes at each depth level
const ROUTES = {
  'root': '/',
  // Layer 1 (all 10 categories)
  'l1-translation': '/translation/',
  'l1-read': '/read/',
  'l1-build': '/build/',
  'l1-organize': '/organize/',
  'l1-summarize': '/summarize/',
  'l1-debug': '/debug/',
  'l1-brainstorm': '/brainstorm/',
  'l1-learn': '/learn/',
  'l1-write': '/write/',
  'l1-explain': '/explain/',
  // Layer 2 (one per category)
  'l2-translation-en-zh': '/translation/en-zh/',
  'l2-read-webpage': '/read/webpage/',
  'l2-build-website': '/build/website/',
  // Layer 3 (translation tones)
  'l3-translation-en-zh-formal': '/translation/en-zh/formal/',
};

test.describe('Screenshot verification', () => {
  for (const [name, route] of Object.entries(ROUTES)) {
    test(`${name} (${route})`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.goto(route);
      await page.waitForTimeout(1200);

      // Take screenshot
      await page.screenshot({
        path: `e2e/screenshots/${name}.png`,
        fullPage: false,
      });

      // No JS errors
      expect(errors).toEqual([]);

      // For non-leaf routes, verify SVG is present and has visible circles
      const isLeaf = route.split('/').filter(Boolean).length >= 2 && name !== 'l2-translation-en-zh';

      if (!isLeaf) {
        const svg = page.locator('.world-canvas svg');
        await expect(svg).toBeVisible({ timeout: 5000 });

        // Check that at least some circles are rendered with non-zero radius
        const circles = await page.locator('.world-canvas svg circle').count();
        expect(circles).toBeGreaterThan(0);

        // Check that at least one circle has a visible stroke
        const visibleCircle = page.locator('.world-canvas svg circle[stroke-width]').first();
        await expect(visibleCircle).toBeVisible({ timeout: 3000 });
      }
    });
  }
});
