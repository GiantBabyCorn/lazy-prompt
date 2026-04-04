import { useTranslation } from 'react-i18next';

interface GoBackButtonProps {
  onClick: () => void;
  visible: boolean;
}

export function GoBackButton({ onClick, visible }: GoBackButtonProps) {
  const { t } = useTranslation('common');

  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 10,
        width: 60,
        height: 60,
        borderRadius: '50%',
        border: '2px dashed var(--color-cyan)',
        background: 'transparent',
        color: 'var(--color-yellow)',
        fontWeight: 700,
        fontSize: 12,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.borderColor = 'var(--color-yellow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'var(--color-cyan)';
      }}
    >
      {t('goBack', 'Go Back')}
    </button>
  );
}
