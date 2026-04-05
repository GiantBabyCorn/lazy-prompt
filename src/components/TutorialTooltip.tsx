import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TutorialStep {
  /** CSS selector for the element to point at. */
  targetSelector: string;
  /** i18n key for the tooltip message. */
  message: string;
  /** Which side of the target to show the tooltip. */
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface TutorialTooltipProps {
  steps: TutorialStep[];
  /** localStorage key suffix for remembering dismissal. */
  storageKey: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TutorialTooltip({ steps, storageKey }: TutorialTooltipProps) {
  const { t } = useTranslation('common');
  const fullKey = `lazy-prompt-tutorial-${storageKey}-dismissed`;

  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(fullKey) === '1'; }
    catch { return false; }
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];
  const total = steps.length;

  // Position the tooltip relative to the target element
  useEffect(() => {
    if (dismissed || !step) return;

    const position = () => {
      const target = document.querySelector(step.targetSelector);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const tooltipEl = tooltipRef.current;
      const tw = tooltipEl?.offsetWidth ?? 200;
      const th = tooltipEl?.offsetHeight ?? 60;
      const gap = 10;

      let top = 0, left = 0;
      const side = step.position ?? 'bottom';

      switch (side) {
        case 'bottom':
          top = rect.bottom + gap;
          left = rect.left + rect.width / 2 - tw / 2;
          break;
        case 'top':
          top = rect.top - th - gap;
          left = rect.left + rect.width / 2 - tw / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2 - th / 2;
          left = rect.left - tw - gap;
          break;
        case 'right':
          top = rect.top + rect.height / 2 - th / 2;
          left = rect.right + gap;
          break;
      }

      // Clamp to viewport
      left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
      top = Math.max(8, top);

      setPos({ top, left });
    };

    // Delay slightly so target element has rendered
    const timer = setTimeout(position, 300);
    window.addEventListener('resize', position);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', position);
    };
  }, [dismissed, step, currentStep]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    try { localStorage.setItem(fullKey, '1'); }
    catch { /* ignore */ }
  }, [fullKey]);

  const prev = useCallback(() => setCurrentStep((s) => Math.max(0, s - 1)), []);
  const next = useCallback(() => {
    if (currentStep >= total - 1) {
      dismiss();
    } else {
      setCurrentStep((s) => s + 1);
    }
  }, [currentStep, total, dismiss]);

  if (dismissed || !step || !pos) return null;

  const message = t(step.message, step.message);

  return (
    <div
      ref={tooltipRef}
      className="tutorial-tooltip"
      style={{
        position: 'fixed',
        top: pos.top,
        left: pos.left,
        zIndex: 100,
      }}
    >
      {/* Arrow */}
      <div className="tutorial-tooltip__arrow" />

      {/* Message */}
      <div className="tutorial-tooltip__message">{message}</div>

      {/* Navigation (only if multiple steps) */}
      <div className="tutorial-tooltip__footer">
        {total > 1 ? (
          <>
            <button onClick={prev} disabled={currentStep === 0} className="tutorial-tooltip__nav">
              &lt;
            </button>
            <span className="tutorial-tooltip__counter">
              {currentStep + 1}/{total}
            </span>
            <button onClick={next} className="tutorial-tooltip__nav">
              {currentStep >= total - 1 ? t('tutorial.done', 'Done') : '>'}
            </button>
            <button onClick={dismiss} className="tutorial-tooltip__skip">
              {t('tutorial.skip', 'Skip')}
            </button>
          </>
        ) : (
          <button onClick={dismiss} className="tutorial-tooltip__skip">
            {t('tutorial.gotIt', 'Got it')}
          </button>
        )}
      </div>
    </div>
  );
}
