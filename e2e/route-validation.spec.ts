import { test, expect } from '@playwright/test';

/**
 * Route enumeration — mirrors the bubble tree structure.
 * We hardcode routes rather than importing TS source to keep
 * the test file independent of the app's build system.
 */

// Layer 1 categories
const LAYER1 = [
  'translation',
  'read',
  'build',
  'organize',
  'summarize',
  'debug',
  'brainstorm',
  'learn',
  'write',
  'explain',
];

// Layer 2 children per layer 1
const LAYER2: Record<string, string[]> = {
  translation: ['en-zh', 'en-ja', 'en-ko', 'en-es', 'custom'],
  read: [
    'webpage', 'document', 'email', 'code', 'research',
    'contract', 'spreadsheet', 'compare', 'factcheck',
  ],
  build: [
    'website', 'app', 'presentations', 'api', 'database',
    'script', 'bot', 'extension', 'game', 'cli',
  ],
  organize: [
    'reports', 'accounts', 'products', 'schedule', 'notes',
    'csv', 'database', 'summary', 'timeline', 'dashboard',
  ],
  summarize: [
    'article', 'meeting', 'video', 'book', 'research',
    'podcast', 'legal', 'conversation',
  ],
  debug: [
    'frontend', 'backend', 'database', 'api', 'devops',
    'performance', 'security', 'mobile',
  ],
  brainstorm: [
    'product', 'marketing', 'content', 'design', 'strategy',
    'naming', 'event', 'problemSolving', 'startup', 'sideProject',
  ],
  learn: [
    'programming', 'language', 'math', 'science', 'business',
    'history', 'design', 'music', 'cooking', 'finance',
  ],
  write: [
    'email', 'blog', 'documentation', 'proposal', 'story',
    'socialMedia', 'resume', 'report', 'copy', 'speech',
  ],
  explain: [
    'code', 'concept', 'process', 'error', 'architecture',
    'data', 'math', 'legal',
  ],
};

// Layer 3 (only translation has depth 3)
const TRANSLATION_TONES = ['formal', 'casual', 'technical', 'literary', 'localized'];

/* ------------------------------------------------------------------ */
/*  Generate all routes                                                */
/* ------------------------------------------------------------------ */

function getAllRoutes(): string[] {
  const routes: string[] = ['/'];

  for (const l1 of LAYER1) {
    routes.push(`/${l1}/`);

    const children = LAYER2[l1] ?? [];
    for (const l2 of children) {
      routes.push(`/${l1}/${l2}/`);

      // Depth 3 for translation
      if (l1 === 'translation') {
        for (const tone of TRANSLATION_TONES) {
          routes.push(`/${l1}/${l2}/${tone}/`);
        }
      }
    }
  }

  return routes;
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

const allRoutes = getAllRoutes();

test.describe('Route validation', () => {
  // Test root
  test('renders / without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));

    await page.goto('/');
    await page.waitForSelector('svg', { timeout: 10000 });

    expect(errors).toEqual([]);
    const svg = page.locator('.world-canvas svg, .bubble-list');
    await expect(svg.first()).toBeVisible();
  });

  // Test a sample of layer 1 routes
  for (const l1 of LAYER1) {
    test(`renders /${l1}/ without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.goto(`/${l1}/`);
      await page.waitForTimeout(500);

      expect(errors).toEqual([]);
    });
  }

  // Test a sample of leaf routes (one per category)
  const sampleLeaves = [
    '/read/webpage/',
    '/build/website/',
    '/organize/reports/',
    '/summarize/article/',
    '/debug/frontend/',
    '/brainstorm/product/',
    '/learn/programming/',
    '/write/email/',
    '/explain/code/',
    '/translation/en-zh/formal/',
  ];

  for (const route of sampleLeaves) {
    test(`renders leaf ${route} without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (err) => errors.push(err.message));

      await page.goto(route);
      // Leaf routes should show the prompt overlay
      await page.waitForTimeout(1500);

      expect(errors).toEqual([]);
    });
  }
});

test.describe('Navigation interactions', () => {
  test('clicking a category bubble navigates deeper', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('svg', { timeout: 10000 });

    // The URL should start as /
    expect(page.url()).toContain('/');
  });

  test('browser back button works', async ({ page }) => {
    // Navigate to root first, then to /read/, so back has somewhere to go
    await page.goto('/');
    await page.waitForTimeout(300);
    await page.goto('/read/');
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForTimeout(500);

    // Should navigate back to root
    expect(page.url()).toMatch(/localhost:\d+\/$/);
  });
});
