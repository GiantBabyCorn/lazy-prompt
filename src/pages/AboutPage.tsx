import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import xIcon from '../assets/icons/x.svg';
import telegramIcon from '../assets/icons/telegram.svg';
import githubIcon from '../assets/icons/github.svg';

const links = [
  { name: 'X', icon: xIcon, url: 'https://x.com/GiantBabyCorn' },
  { name: 'Telegram', icon: telegramIcon, url: 'https://t.me/GiantBabyCorn' },
  { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GiantBabyCorn/lazy-prompt' },
];

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
      <Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>
        ← {t('nav.home')}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' }}>
        <img src="/logo.svg" alt="Lazy Prompt" width={48} height={48} style={{ flexShrink: 0 }} />
        <div>
          <h1 style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.4rem' }}>
            {t('app.title')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '2px 0 0', fontSize: '0.85rem' }}>
            {t('app.tagline')}
          </p>
        </div>
      </div>

      <p style={{ color: 'var(--color-text)', lineHeight: 1.7, fontSize: '0.9rem' }}>
        {t('about.description')}
      </p>

      <h2 style={{ fontSize: '1rem', color: 'var(--color-cyan)', marginTop: 24, marginBottom: 8 }}>
        {t('about.features')}
      </h2>
      <ul style={{ paddingLeft: 18, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
        <li>{t('about.feature1')}</li>
        <li>{t('about.feature2')}</li>
        <li>{t('about.feature3')}</li>
        <li>{t('about.feature4')}</li>
        <li>{t('about.feature5')}</li>
      </ul>

      <h2 style={{ fontSize: '1rem', color: 'var(--color-cyan)', marginTop: 24, marginBottom: 8 }}>
        {t('about.contact')}
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              color: 'var(--color-text)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-cyan)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <img src={link.icon} alt={link.name} width={18} height={18} />
            {link.name}
          </a>
        ))}
      </div>

      <p style={{ marginTop: 32, color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>
        MIT License &copy; 2026 GiantBabyCorn
        <span style={{ marginLeft: 8, opacity: 0.5 }}>v{__APP_COMMIT_HASH__}</span>
      </p>
    </div>
  );
}
