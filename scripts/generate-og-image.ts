/**
 * Generate OG preview image (1200x630 PNG) from SVG template.
 * Run: npx tsx scripts/generate-og-image.ts
 */
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const WIDTH = 1200;
const HEIGHT = 630;

// Read the logo SVG and embed it inline
const logoSvg = readFileSync(resolve(import.meta.dirname, '../public/logo.svg'), 'utf-8');
// Extract the inner content (strip outer <svg> tag) and scale it
const logoInner = logoSvg
  .replace(/<\?xml[^?]*\?>\s*/g, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>/, '');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Background -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0d1117"/>

  <!-- Decorative circles (bubble theme) -->
  <circle cx="950" cy="120" r="180" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.15"/>
  <circle cx="1050" cy="400" r="120" fill="none" stroke="#00ff88" stroke-width="2" opacity="0.1"/>
  <circle cx="200" cy="500" r="90" fill="none" stroke="#00ccff" stroke-width="1.5" opacity="0.1"/>
  <circle cx="100" cy="150" r="60" fill="none" stroke="#00ccff" stroke-width="1.5" opacity="0.08"/>

  <!-- Dashed lines (matching bubble canvas style) -->
  <line x1="300" y1="315" x2="950" y2="120" stroke="#00ff88" stroke-width="1" stroke-dasharray="8 4" opacity="0.12"/>
  <line x1="300" y1="315" x2="1050" y2="400" stroke="#00ff88" stroke-width="1" stroke-dasharray="8 4" opacity="0.1"/>
  <line x1="300" y1="315" x2="200" y2="500" stroke="#00ccff" stroke-width="1" stroke-dasharray="8 4" opacity="0.1"/>

  <!-- Logo (scaled and positioned) -->
  <g transform="translate(80, 160) scale(1.8)">
    ${logoInner}
  </g>

  <!-- Title -->
  <text x="380" y="270" font-family="'Inter', 'Segoe UI', sans-serif" font-size="72" font-weight="700" fill="#ffffff">
    Lazy Prompt
  </text>

  <!-- Tagline -->
  <text x="380" y="340" font-family="'Inter', 'Segoe UI', sans-serif" font-size="32" font-weight="400" fill="#8b949e">
    Build AI Prompts Quickly
  </text>

  <!-- Description -->
  <text x="380" y="400" font-family="'Inter', 'Segoe UI', sans-serif" font-size="22" font-weight="400" fill="#58a6ff" opacity="0.8">
    Navigate visual bubbles → Generate detailed prompts
  </text>

  <!-- URL -->
  <text x="380" y="520" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="400" fill="#00ff88" opacity="0.6">
    lazy-prompt.giantbabycorn.finance
  </text>
</svg>`;

// Save SVG version
const svgPath = resolve(import.meta.dirname, '../public/og-image.svg');
writeFileSync(svgPath, ogSvg, 'utf-8');
console.log(`SVG saved: ${svgPath}`);
console.log(`\nTo convert to PNG, install sharp and run:`);
console.log(`  npm i -D sharp`);
console.log(`  Then re-run this script.`);

// Try to convert to PNG using sharp (if available)
try {
  // Dynamic import to avoid hard dependency
  const sharp = (await import('sharp')).default;
  const pngBuffer = await sharp(Buffer.from(ogSvg))
    .resize(WIDTH, HEIGHT)
    .png()
    .toBuffer();
  const pngPath = resolve(import.meta.dirname, '../public/og-image.png');
  writeFileSync(pngPath, pngBuffer);
  console.log(`PNG saved: ${pngPath}`);
} catch {
  console.log('\nsharp not installed — SVG saved, PNG skipped.');
  console.log('You can convert the SVG to PNG manually or install sharp.');
}
