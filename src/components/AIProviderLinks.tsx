import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { aiProviders } from '../utils/aiProviders';
import type { AIProvider } from '../data/types';

interface AIProviderLinksProps {
  getPromptText: () => string;
}

export function AIProviderLinks({ getPromptText }: AIProviderLinksProps) {
  const { t } = useTranslation('common');
  const [toast, setToast] = useState<string | null>(null);

  const handleClick = useCallback(
    (provider: AIProvider) => {
      const promptText = getPromptText();

      if (provider.supportsPromptUrl !== false) {
        // Supported: open URL with prompt injected
        window.open(provider.buildUrl(promptText), '_blank');
      } else {
        // Unsupported: copy prompt to clipboard, then open site
        navigator.clipboard.writeText(promptText).then(() => {
          setToast(t('prompt.copiedAndOpening', { name: provider.name }));
          setTimeout(() => setToast(null), 3000);
          setTimeout(() => {
            window.open(provider.buildUrl(promptText), '_blank');
          }, 300);
        });
      }
    },
    [getPromptText, t],
  );

  return (
    <div style={{ marginTop: 16, position: 'relative' }}>
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
            onClick={() => handleClick(provider)}
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
            <img src={provider.icon} alt={provider.name} width={18} height={18} style={{ display: 'block' }} />
            {provider.name}
            {provider.supportsPromptUrl === false && (
              <span style={{ fontSize: 10, opacity: 0.5 }} title={t('prompt.copyAndOpen')}>📋</span>
            )}
          </button>
        ))}
      </div>

      {/* Toast notification for copy+open */}
      {toast && (
        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'var(--color-green)',
            fontSize: 13,
            fontWeight: 500,
            animation: 'fade-in 0.2s ease',
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
