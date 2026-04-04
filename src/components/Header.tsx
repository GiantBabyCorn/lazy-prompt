import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { bubbleTree } from '../data/bubbleTree';
import { urlToNavigationPath, navigationPathToUrl } from '../utils/bubbleRouting';
import type { BubbleNode } from '../data/types';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

function findNode(path: string[]): BubbleNode {
  let node: BubbleNode = bubbleTree;
  for (const id of path) {
    const child = node.children?.find((c) => c.id === id);
    if (!child) break;
    node = child;
  }
  return node;
}

export default function Header() {
  const { t } = useTranslation('common');
  const { t: tPrompts } = useTranslation('prompts');
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const navPath = urlToNavigationPath(location.pathname);
    if (navPath.length === 0) return [];

    const crumbs: { label: string; url: string }[] = [];
    for (let i = 0; i < navPath.length; i++) {
      const partialPath = navPath.slice(0, i + 1);
      const node = findNode(partialPath);
      crumbs.push({
        label: tPrompts(node.labelKey),
        url: navigationPathToUrl(partialPath),
      });
    }
    return crumbs;
  }, [location.pathname, tPrompts]);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/logo.svg" alt="Lazy Prompt" width={28} height={28} />
          <span
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--color-text)',
            }}
          >
            {t('app.title')}
          </span>
        </Link>

        {breadcrumbs.length > 0 && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', minWidth: 0, overflow: 'hidden' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.url} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>/</span>
                {i === breadcrumbs.length - 1 ? (
                  <span style={{ color: 'var(--color-cyan)', fontWeight: 500, whiteSpace: 'nowrap' }}>
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.url}
                    style={{
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <Link to="/about" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.8rem' }}>About</Link>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
