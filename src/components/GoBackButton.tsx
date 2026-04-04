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
      className="go-back-button"
      aria-label={t('nav.goBack')}
    >
      {t('nav.goBack')}
    </button>
  );
}
