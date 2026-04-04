import { useTranslation } from 'react-i18next';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useTranslation('common');

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/logo.svg" alt="Lazy Prompt" width={32} height={32} />
        <h1
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            margin: 0,
          }}
        >
          {t('app.title')}
        </h1>
        <span
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-secondary)',
            display: 'none',
          }}
          className="header-tagline"
        >
          {t('app.tagline')}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <LanguageSelector />
        <ThemeToggle />
      </div>
    </header>
  );
}
