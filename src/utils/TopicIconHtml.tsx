/**
 * Renders a Lucide topic icon as an inline HTML <svg> element.
 * For use in HTML context (BubbleList), not inside SVG canvas.
 */

// Reuse the same raw imports as TopicIconSvg
const iconModules = import.meta.glob(
  '../assets/icons/topics/*.svg',
  { query: '?raw', import: 'default', eager: true },
) as Record<string, string>;

const iconCache = new Map<string, string>();

for (const [path, raw] of Object.entries(iconModules)) {
  const name = path.split('/').pop()?.replace('.svg', '') ?? '';
  const match = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
  if (match) {
    iconCache.set(name, match[1]);
  }
}

interface TopicIconHtmlProps {
  name: string;
  size?: number;
  className?: string;
}

export function TopicIconHtml({ name, size = 18, className }: TopicIconHtmlProps) {
  const inner = iconCache.get(name);
  if (!inner) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
