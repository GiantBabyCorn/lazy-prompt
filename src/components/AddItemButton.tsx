import { useState, useRef, useEffect } from 'react';

interface AddItemButtonProps {
  onAdd: (text: string) => void;
}

export default function AddItemButton({ onAdd }: AddItemButtonProps) {
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [adding]);

  const handleSubmit = () => {
    const trimmed = draft.trim();
    if (trimmed) {
      onAdd(trimmed);
    }
    setDraft('');
    setAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setDraft('');
      setAdding(false);
    }
  };

  if (adding) {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>{'   - '}</span>
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter"
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid var(--color-text-secondary)',
            color: 'var(--color-text)',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            lineHeight: 'inherit',
            padding: '0 2px',
            outline: 'none',
            width: '20ch',
          }}
        />
      </span>
    );
  }

  return (
    <span
      onClick={() => setAdding(true)}
      style={{
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        fontStyle: 'italic',
        marginLeft: '12px',
      }}
    >
      {'( click to add )'}
    </span>
  );
}
