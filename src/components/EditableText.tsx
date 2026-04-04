import { useState, useRef, useEffect, useCallback } from 'react';
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
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  const inputType = span.inputType ?? 'text';
  const suggestions = span.suggestions ?? [];
  const step = span.step ?? (inputType === 'number' ? 1 : undefined);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  // Filter suggestions by current draft
  const filtered = suggestions.length > 0
    ? suggestions.filter((s) => s.toLowerCase().includes(draft.toLowerCase()))
    : [];

  const handleClick = () => {
    setDraft(value);
    setSelectedIdx(-1);
    setEditing(true);
  };

  const saveAndClose = useCallback((val: string) => {
    const trimmed = val.trim();
    if (trimmed) onChange(span.id, trimmed);
    setEditing(false);
    setSelectedIdx(-1);
  }, [onChange, span.id]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filtered.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      setSelectedIdx((prev) => {
        if (e.key === 'ArrowDown') return prev < filtered.length - 1 ? prev + 1 : 0;
        return prev > 0 ? prev - 1 : filtered.length - 1;
      });
      return;
    }

    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (selectedIdx >= 0 && selectedIdx < filtered.length) {
        // Accept selected suggestion
        saveAndClose(filtered[selectedIdx]);
      } else {
        saveAndClose(draft);
      }
      // Move focus to next editable span
      setTimeout(() => focusNextEditable(), 0);
      return;
    }

    if (e.key === 'Escape') {
      setDraft(value);
      setEditing(false);
      setSelectedIdx(-1);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Don't close if clicking within our container (e.g., suggestion list, buttons)
    if (containerRef.current?.contains(e.relatedTarget as Node)) return;
    saveAndClose(draft);
  };

  const focusNextEditable = () => {
    // Find all editable spans in the document and focus the next one
    const editables = document.querySelectorAll<HTMLElement>('[data-editable-span]');
    const arr = Array.from(editables);
    const currentIdx = arr.findIndex((el) => el.dataset.editableSpan === span.id);
    if (currentIdx >= 0 && currentIdx < arr.length - 1) {
      arr[currentIdx + 1].click();
    }
  };

  const handleNumberStep = (delta: number) => {
    const num = parseFloat(draft) || 0;
    const newVal = Math.max(span.min ?? -Infinity, Math.min(span.max ?? Infinity, num + delta));
    const str = Number.isInteger(newVal) ? String(newVal) : newVal.toFixed(1);
    setDraft(str);
    onChange(span.id, str);
  };

  const color = colorMap[span.color];

  // ── Labels mode (chip-based multi-value) ──
  if (inputType === 'labels') {
    const labels = value.split(',').map((s) => s.trim()).filter(Boolean);
    const [labelDraft, setLabelDraft] = useState('');
    const [labelSelIdx, setLabelSelIdx] = useState(-1);
    const labelInputRef = useRef<HTMLInputElement>(null);

    const labelFiltered = suggestions.filter(
      (s) => !labels.includes(s) && s.toLowerCase().includes(labelDraft.toLowerCase()),
    );

    const addLabel = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || labels.includes(trimmed)) return;
      const next = [...labels, trimmed].join(', ');
      onChange(span.id, next);
      setLabelDraft('');
      setLabelSelIdx(-1);
    };

    const removeLabel = (idx: number) => {
      const next = labels.filter((_, i) => i !== idx).join(', ');
      onChange(span.id, next || span.placeholder);
    };

    if (!editing) {
      return (
        <span
          onClick={() => { setEditing(true); setTimeout(() => labelInputRef.current?.focus(), 0); }}
          data-editable-span={span.id}
          style={{ color, cursor: 'pointer', borderBottom: `1px dashed ${color}`, paddingBottom: '1px' }}
          title="Click to edit"
        >
          {value}
        </span>
      );
    }

    return (
      <span
        ref={containerRef}
        style={{ position: 'relative', display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px', borderBottom: `1px solid ${color}`, paddingBottom: '2px' }}
        data-editable-span={span.id}
      >
        {labels.map((label, i) => (
          <span
            key={`${label}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2px',
              background: `${color}22`,
              border: `1px solid ${color}`,
              borderRadius: '4px',
              padding: '1px 6px',
              fontSize: '0.8em',
              color,
            }}
          >
            {label}
            <button
              tabIndex={-1}
              onMouseDown={(e) => { e.preventDefault(); removeLabel(i); }}
              style={{
                background: 'transparent',
                border: 'none',
                color,
                cursor: 'pointer',
                fontSize: '0.9em',
                padding: 0,
                lineHeight: 1,
                opacity: 0.7,
              }}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={labelInputRef}
          type="text"
          value={labelDraft}
          onChange={(e) => { setLabelDraft(e.target.value); setLabelSelIdx(-1); }}
          onBlur={(e) => {
            if (containerRef.current?.contains(e.relatedTarget as Node)) return;
            if (labelDraft.trim()) addLabel(labelDraft);
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (labelFiltered.length > 0 && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
              e.preventDefault();
              setLabelSelIdx((prev) => e.key === 'ArrowDown'
                ? (prev < labelFiltered.length - 1 ? prev + 1 : 0)
                : (prev > 0 ? prev - 1 : labelFiltered.length - 1));
              return;
            }
            if (e.key === 'Enter' || e.key === ',' || e.key === 'Tab') {
              e.preventDefault();
              if (labelSelIdx >= 0 && labelSelIdx < labelFiltered.length) {
                addLabel(labelFiltered[labelSelIdx]);
              } else if (labelDraft.trim()) {
                addLabel(labelDraft);
              } else if (e.key === 'Tab') {
                setEditing(false);
                setTimeout(() => focusNextEditable(), 0);
              }
              return;
            }
            if (e.key === 'Backspace' && !labelDraft && labels.length > 0) {
              removeLabel(labels.length - 1);
              return;
            }
            if (e.key === 'Escape') {
              setEditing(false);
            }
          }}
          placeholder="+"
          style={{
            background: 'transparent',
            border: 'none',
            color,
            fontFamily: 'inherit',
            fontSize: 'inherit',
            padding: '0 2px',
            outline: 'none',
            width: `${Math.max(labelDraft.length + 1, 2)}ch`,
            minWidth: '2ch',
          }}
        />
        {labelFiltered.length > 0 && labelDraft && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 100,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            marginTop: '4px',
            maxHeight: '160px',
            overflowY: 'auto',
            minWidth: '120px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}>
            {labelFiltered.map((s, i) => (
              <div
                key={s}
                onMouseDown={(e) => { e.preventDefault(); addLabel(s); }}
                onMouseEnter={() => setLabelSelIdx(i)}
                style={{
                  padding: '4px 10px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  color: i === labelSelIdx ? 'var(--color-bg)' : color,
                  background: i === labelSelIdx ? color : 'transparent',
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </span>
    );
  }

  // Display mode
  if (!editing) {
    return (
      <span
        onClick={handleClick}
        data-editable-span={span.id}
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

  // Edit mode (text/number/time/date)
  return (
    <span
      ref={containerRef}
      style={{ position: 'relative', display: 'inline-block' }}
      data-editable-span={span.id}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
        <input
          ref={inputRef}
          type={inputType === 'number' ? 'text' : inputType}
          value={draft}
          onChange={(e) => { setDraft(e.target.value); setSelectedIdx(-1); }}
          onBlur={handleBlur}
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
            width: inputType === 'time' ? '8ch'
              : inputType === 'date' ? '11ch'
              : `${Math.max(draft.length + 2, 4)}ch`,
            maxWidth: '100%',
          }}
        />

        {/* Number stepper buttons */}
        {inputType === 'number' && step != null && (
          <>
            <StepBtn label={`-${step > 1 ? step : ''}`} onClick={() => handleNumberStep(-step)} color={color} />
            <StepBtn label={`+${step > 1 ? step : ''}`} onClick={() => handleNumberStep(step)} color={color} />
            {step === 1 && (
              <>
                <StepBtn label="-10" onClick={() => handleNumberStep(-10)} color={color} />
                <StepBtn label="+10" onClick={() => handleNumberStep(10)} color={color} />
              </>
            )}
          </>
        )}
      </span>

      {/* Autocomplete dropdown */}
      {filtered.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 100,
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            marginTop: '4px',
            maxHeight: '160px',
            overflowY: 'auto',
            minWidth: '120px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          {filtered.map((suggestion, i) => (
            <div
              key={suggestion}
              tabIndex={-1}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur
                saveAndClose(suggestion);
              }}
              onMouseEnter={() => setSelectedIdx(i)}
              style={{
                padding: '4px 10px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                color: i === selectedIdx ? 'var(--color-bg)' : color,
                background: i === selectedIdx ? color : 'transparent',
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </span>
  );
}

/** Small stepper button for number inputs. */
function StepBtn({ label, onClick, color }: { label: string; onClick: () => void; color: string }) {
  return (
    <button
      tabIndex={-1}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      style={{
        background: 'transparent',
        border: `1px solid ${color}`,
        borderRadius: '3px',
        color,
        fontSize: '0.65rem',
        padding: '0 3px',
        cursor: 'pointer',
        lineHeight: '1.4',
        opacity: 0.7,
      }}
    >
      {label}
    </button>
  );
}
