import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useBubbleNavigation } from '../hooks/useBubbleNavigation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { BubbleCanvas } from '../components/BubbleCanvas';
import { BubbleList } from '../components/BubbleList';
import PromptResult from '../components/PromptResult';
import { AIProviderLinks } from '../components/AIProviderLinks';
import { promptTemplates } from '../data/promptTemplates';
import { buildPromptString } from '../utils/promptBuilder';
import type { BubbleNode } from '../data/types';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);

  return isMobile;
}

export default function HomePage() {
  const { t } = useTranslation('common');
  const { t: tPrompts } = useTranslation('prompts');

  useDocumentHead(
    `${t('app.title')} — ${t('app.tagline')}`,
    'Build detailed AI prompts quickly with an interactive bubble-based interface.',
  );

  const {
    currentNode,
    currentChildren,
    navigationPath,
    navigateTo,
    goBack,
    reset,
    animationPhase,
    clickedNodeId,
    previousNode,
    parentNode,
  } = useBubbleNavigation();

  const isAtRoot = navigationPath.length === 0;
  const isMobile = useIsMobile();
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>(() => isMobile ? 'list' : 'bubble');

  // Leaf detection: if currentNode has a promptTemplateId and no children,
  // show the prompt interface. URL is just /read/document/ — no /prompt/ suffix.
  const leafTemplate = useMemo(() => {
    if (!currentNode.promptTemplateId) return null;
    if (currentNode.children && currentNode.children.length > 0) return null;
    return promptTemplates.find((tp) => tp.id === currentNode.promptTemplateId) ?? null;
  }, [currentNode]);

  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = useState<Record<string, string[]>>({});

  // Reset editable state when leaving a leaf (navigating back)
  useEffect(() => {
    if (!leafTemplate) {
      setEditedValues({});
      setAddedItems({});
    }
  }, [leafTemplate]);

  const handleLeafClick = useCallback(
    (node: BubbleNode) => {
      // Leaf click uses the normal navigateTo — the URL becomes /category/leaf/
      // and HomePage detects it's a leaf via currentNode.promptTemplateId.
      navigateTo(node.id);
    },
    [navigateTo],
  );

  const handleGoBackFromResult = useCallback(() => {
    goBack();
  }, [goBack]);

  const getPromptText = useCallback(() => {
    if (!leafTemplate) return '';
    return buildPromptString(leafTemplate, editedValues, addedItems, tPrompts);
  }, [leafTemplate, editedValues, addedItems, tPrompts]);

  // Show prompt result when at a leaf node
  if (leafTemplate) {
    const categoryLabel = tPrompts(currentNode.labelKey);
    return (
      <div className="prompt-result-page animate-slide-up">
        <PromptResult
          template={leafTemplate}
          categoryLabel={categoryLabel}
          onGoBack={handleGoBackFromResult}
          onEditedValuesChange={setEditedValues}
          onAddedItemsChange={setAddedItems}
        />
        <AIProviderLinks getPromptText={getPromptText} />
      </div>
    );
  }

  const showList = viewMode === 'list';

  // Show bubble canvas or list view for navigation
  return (
    <div className="bubble-view">
      <div className="bubble-view__subtitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
        <span>{t('bubble.clickToExplore')}</span>
        {/* View mode toggle */}
        <button
          onClick={() => setViewMode(showList ? 'bubble' : 'list')}
          style={{
            position: 'absolute',
            right: 16,
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '0.75rem',
            padding: '3px 8px',
          }}
          title={showList ? 'Bubble view' : 'List view'}
        >
          {showList ? '◉' : '☰'}
        </button>
      </div>

      <div className="bubble-view__content">
        {showList ? (
          <BubbleList
            currentNode={currentNode}
            currentChildren={currentChildren}
            isAtRoot={isAtRoot}
            onNavigate={navigateTo}
            onGoBack={isAtRoot ? reset : goBack}
            onLeafClick={handleLeafClick}
          />
        ) : (
          <BubbleCanvas
            currentNode={currentNode}
            currentChildren={currentChildren}
            navigationPath={navigationPath}
            isAtRoot={isAtRoot}
            onNavigate={navigateTo}
            onGoBack={isAtRoot ? reset : goBack}
            onLeafClick={handleLeafClick}
            animationPhase={animationPhase}
            clickedNodeId={clickedNodeId}
            previousNode={previousNode}
            parentNode={parentNode}
          />
        )}
      </div>
    </div>
  );
}
