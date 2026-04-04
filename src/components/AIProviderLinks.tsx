import { useTranslation } from 'react-i18next';
import { aiProviders } from '../utils/aiProviders';

interface AIProviderLinksProps {
  getPromptText: () => string;
}

export function AIProviderLinks({ getPromptText }: AIProviderLinksProps) {
  const { t } = useTranslation('common');

  const handleClick = (buildUrl: (prompt: string) => string) => {
    const promptText = getPromptText();
    const url = buildUrl(promptText);
    window.open(url, '_blank');
  };

  return (
    <div style={{ marginTop: 16 }}>
      <span
        style={{
          color: 'var(--color-text)',
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 8,
          display: 'block',
        }}
      >
        {t('prompt.sendTo')}
      </span>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {aiProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleClick(provider.buildUrl)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              color: 'var(--color-text)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-cyan)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: 16 }}>{provider.icon}</span>
            {provider.name}
          </button>
        ))}
      </div>
    </div>
  );
}
