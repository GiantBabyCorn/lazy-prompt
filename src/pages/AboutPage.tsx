import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import xIcon from '../assets/icons/x.svg';
import telegramIcon from '../assets/icons/telegram.svg';
import githubIcon from '../assets/icons/github.svg';

const links = [
  { name: 'X (Twitter)', icon: xIcon, url: 'https://x.com/GiantBabyCorn' },
  { name: 'Telegram', icon: telegramIcon, url: 'https://t.me/GiantBabyCorn' },
  { name: 'GitHub', icon: githubIcon, url: 'https://github.com/GiantBabyCorn/lazy-prompt' },
];

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px 24px' }}>
      <Link to="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>
        ← {t('nav.home')}
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
        <img src="/logo.svg" alt="Lazy Prompt" width={64} height={64} />
        <div>
          <h1 style={{ color: 'var(--color-text)', margin: 0, fontSize: '1.6rem' }}>
            {t('app.title')}
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '4px 0 0' }}>
            {t('app.tagline')}
          </p>
        </div>
      </div>

      <div style={{ color: 'var(--color-text)', lineHeight: 1.8, fontSize: '0.95rem' }}>
        <p>{t('about.description')}</p>

        <h2 style={{ fontSize: '1.1rem', color: 'var(--color-cyan)', marginTop: 32 }}>
          {t('about.features')}
        </h2>
        <ul style={{ paddingLeft: 20, color: 'var(--color-text-secondary)' }}>
          <li>{t('about.feature1')}</li>
          <li>{t('about.feature2')}</li>
          <li>{t('about.feature3')}</li>
          <li>{t('about.feature4')}</li>
          <li>{t('about.feature5')}</li>
        </ul>
      </div>

      <h2 style={{ fontSize: '1.1rem', color: 'var(--color-cyan)', marginTop: 32 }}>
        {t('about.contact')}
      </h2>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              color: 'var(--color-text)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-cyan)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
          >
            <img src={link.icon} alt={link.name} width={20} height={20} />
            {link.name}
          </a>
        ))}
      </div>

      <p style={{ marginTop: 40, color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
        MIT License &copy; 2026 GiantBabyCorn
      </p>
    </div>
  );
}
