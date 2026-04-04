import { useClipboard } from '../hooks/useClipboard';

interface CopyButtonProps {
  getText: () => string;
}

export default function CopyButton({ getText }: CopyButtonProps) {
  const { copied, copy } = useClipboard();

  const handleClick = () => {
    copy(getText());
  };

  return (
    <button
      onClick={handleClick}
      style={{
        background: 'transparent',
        border: `1px solid var(--color-cyan)`,
        borderRadius: '6px',
        color: copied ? 'var(--color-green)' : 'var(--color-cyan)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: '0.85rem',
        padding: '4px 12px',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? '✓' : 'Copy'}
    </button>
  );
}
