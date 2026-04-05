/**
 * Renders a Lucide topic icon inline in SVG.
 * Uses Vite's ?raw import to load SVG strings, extracts inner paths.
 */

// Import all topic SVGs as raw strings
const iconModules = import.meta.glob(
  '../assets/icons/topics/*.svg',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;

// Build lookup: filename (without extension) → inner SVG content
const iconCache = new Map<string, string>();

for (const [path, raw] of Object.entries(iconModules)) {
  const name = path.split('/').pop()?.replace('.svg', '') ?? '';
  // Extract inner content between <svg...> and </svg>
  const match = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (match) {
    iconCache.set(name, match[1]);
  }
}

interface TopicIconSvgProps {
  /** Icon name (matches filename without .svg) */
  name: string;
  /** Size in SVG units */
  size?: number;
  /** Center X position */
  x?: number;
  /** Center Y position */
  y?: number;
}

export function TopicIconSvg({ name, size = 18, x = 0, y = 0 }: TopicIconSvgProps) {
  const inner = iconCache.get(name);
  if (!inner) return null;

  // Lucide icons are 24x24 viewBox, scale to desired size
  const scale = size / 24;
  const offset = -12 * scale; // center the 24x24 icon

  return (
    <g
      transform={`translate(${x + offset}, ${y + offset}) scale(${scale})`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pointerEvents: 'none' }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
