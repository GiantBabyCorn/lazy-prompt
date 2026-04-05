import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { ViewModeToggle, type ViewMode } from '../components/ViewModeToggle';
import { DynamicView } from './views/DynamicView';
import { BubbleView } from './views/BubbleView';
import { ListView } from './views/ListView';
import { TutorialTooltip } from '../components/TutorialTooltip';

/* ------------------------------------------------------------------ */
/*  Persistence                                                        */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'lazy-prompt-view-mode';

function getInitialMode(): ViewMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dynamic' || stored === 'bubble' || stored === 'list') return stored;
  } catch { /* localStorage unavailable */ }
  // Desktop defaults to dynamic, mobile to bubble
  return window.innerWidth < 768 ? 'bubble' : 'dynamic';
}

/* ------------------------------------------------------------------ */
/*  Tutorial steps                                                     */
/* ------------------------------------------------------------------ */

const tutorialSteps = [
  {
    targetSelector: '.view-mode-toggle',
    message: 'tutorial.viewModeSwitch',
    position: 'bottom' as const,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const { t } = useTranslation('common');

  useDocumentHead(
    `${t('app.title')} — ${t('app.tagline')}`,
    'Build detailed AI prompts quickly with an interactive bubble-based interface.',
  );

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialMode);

  // Persist mode choice
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, viewMode);
    } catch { /* ignore */ }
  }, [viewMode]);

  const modeHint =
    viewMode === 'dynamic'
      ? t('bubble.clickToExplore')
      : viewMode === 'bubble'
        ? t('bubble.clickToExplore')
        : t('bubble.selectFromList', 'Select a category');

  return (
    <div className="bubble-view">
      <div
        className="bubble-view__subtitle"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          position: 'relative',
        }}
      >
        <span>{modeHint}</span>
        <div style={{ position: 'absolute', right: 16 }}>
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {viewMode === 'dynamic' && <DynamicView />}
      {viewMode === 'bubble' && <BubbleView />}
      {viewMode === 'list' && <ListView />}

      {/* First-visit tutorial */}
      <TutorialTooltip steps={tutorialSteps} storageKey="view-mode" />
    </div>
  );
}
