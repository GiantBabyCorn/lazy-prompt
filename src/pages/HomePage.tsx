import { useState, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useBubbleNavigation } from '../hooks/useBubbleNavigation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { BubbleCanvas } from '../components/BubbleCanvas';
import { BubbleList } from '../components/BubbleList';
import PromptResult from '../components/PromptResult';
import { AIProviderLinks } from '../components/AIProviderLinks';
import { promptTemplates } from '../data/promptTemplates';
import type { BubbleNode } from '../data/types';

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
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>('bubble');

  // Leaf detection: if currentNode has a promptTemplateId and no children,
  // show the prompt interface. URL is just /read/document/ — no /prompt/ suffix.
  const leafTemplate = useMemo(() => {
    if (!currentNode.promptTemplateId) return null;
    if (currentNode.children && currentNode.children.length > 0) return null;
    return promptTemplates.find((tp) => tp.id === currentNode.promptTemplateId) ?? null;
  }, [currentNode]);


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

  // getPromptText is provided by PromptResult (respects hidden sections/items)
  const promptTextGetterRef = useRef<() => string>(() => '');
  const getPromptText = useCallback(() => promptTextGetterRef.current(), []);
  const handlePromptTextChange = useCallback((getter: () => string) => {
    promptTextGetterRef.current = getter;
  }, []);

  // Show prompt result when at a leaf node
  if (leafTemplate) {
    const categoryLabel = tPrompts(currentNode.labelKey);
    return (
      <div className="prompt-result-page animate-fade-in">
        <div className="prompt-result-page__scroll">
          <PromptResult
            template={leafTemplate}
            categoryLabel={categoryLabel}
            onGoBack={handleGoBackFromResult}
            onPromptTextChange={handlePromptTextChange}
          />
        </div>
        <div className="prompt-result-page__footer">
          <AIProviderLinks getPromptText={getPromptText} />
        </div>
      </div>
    );
  }

  const showList = viewMode === 'list';

  // Show bubble canvas or list view for navigation
  return (
    <div className="bubble-view">
      <div className="bubble-view__subtitle" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, position: 'relative' }}>
        <span>{showList ? t('bubble.selectFromList', 'Select a category') : t('bubble.clickToExplore')}</span>
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
