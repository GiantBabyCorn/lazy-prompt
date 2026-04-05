import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type ViewMode = 'dynamic' | 'bubble' | 'list';

const MODE_ORDER: ViewMode[] = ['dynamic', 'bubble', 'list'];

const MODE_LABELS: Record<ViewMode, string> = {
  dynamic: 'Dynamic',
  bubble: 'Bubble',
  list: 'List',
};

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, 18×18)                                          */
/* ------------------------------------------------------------------ */

function DynamicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" strokeWidth="1.3" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" strokeWidth="1.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" strokeWidth="1.3" transform="rotate(120 12 12)" />
    </svg>
  );
}

function BubbleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="18.5" cy="8" r="2" />
      <circle cx="18.5" cy="16" r="2" />
      <circle cx="12" cy="19.5" r="2" />
      <circle cx="5.5" cy="16" r="2" />
      <circle cx="5.5" cy="8" r="2" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="3" y="5" width="18" height="2.5" rx="1" />
      <rect x="3" y="10.75" width="18" height="2.5" rx="1" />
      <rect x="3" y="16.5" width="18" height="2.5" rx="1" />
    </svg>
  );
}

const MODE_ICONS: Record<ViewMode, () => React.ReactNode> = {
  dynamic: DynamicIcon,
  bubble: BubbleIcon,
  list: ListIcon,
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  const { t } = useTranslation('common');
  const [labelWidth, setLabelWidth] = useState<number | null>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isFirstRender = useRef(true);

  const label = t(`viewMode.${mode}`, MODE_LABELS[mode]);
  const Icon = MODE_ICONS[mode];

  // On mode change: show label, then retract
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Measure label width
    if (labelRef.current) {
      setLabelWidth(labelRef.current.scrollWidth);
    }

    // Start retracting after a short delay
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setLabelWidth(0);
    }, 2500);

    return () => clearTimeout(timerRef.current);
  }, [mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    const idx = MODE_ORDER.indexOf(mode);
    const next = MODE_ORDER[(idx + 1) % MODE_ORDER.length];
    onChange(next);
  };

  return (
    <button
      className="view-mode-toggle"
      onClick={handleClick}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        background: 'transparent',
        border: '1px solid var(--color-border)',
        borderRadius: 6,
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        fontSize: '0.75rem',
        padding: '3px 6px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
      }}
    >
      {/* Animated label */}
      <span
        ref={labelRef}
        style={{
          display: 'inline-block',
          maxWidth: labelWidth !== null ? labelWidth : 0,
          overflow: 'hidden',
          transition: 'max-width 0.4s ease-in-out',
          marginRight: labelWidth && labelWidth > 0 ? 4 : 0,
        }}
      >
        {label}
      </span>
      <Icon />
    </button>
  );
}
