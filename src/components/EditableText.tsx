import { useState, useRef, useEffect } from 'react';
import type { EditableSpan } from '../data/types';

const colorMap: Record<EditableSpan['color'], string> = {
  cyan: 'var(--color-cyan)',
  yellow: 'var(--color-yellow)',
  green: 'var(--color-green)',
};

interface EditableTextProps {
  span: EditableSpan;
  value: string;
  onChange: (spanId: string, value: string) => void;
}

export default function EditableText({ span, value, onChange }: EditableTextProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleClick = () => {
    setDraft(value);
    setEditing(true);
  };

  const handleSave = () => {
    const trimmed = draft.trim();
    if (trimmed) {
      onChange(span.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
    }
  };

  const color = colorMap[span.color];

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${color}`,
          color,
          fontFamily: 'inherit',
          fontSize: 'inherit',
          lineHeight: 'inherit',
          padding: '0 2px',
          outline: 'none',
          width: `${Math.max(draft.length, 3)}ch`,
          maxWidth: '100%',
        }}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      style={{
        color,
        cursor: 'pointer',
        borderBottom: `1px dashed ${color}`,
        paddingBottom: '1px',
      }}
      title="Click to edit"
    >
      {value}
    </span>
  );
}
