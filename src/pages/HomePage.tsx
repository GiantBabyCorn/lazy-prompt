import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useWorldNavigation } from '../hooks/useWorldNavigation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { WorldCanvas } from '../components/WorldCanvas';
import { BubbleList } from '../components/BubbleList';
import { PromptOverlay } from '../components/PromptOverlay';
import { loadTemplate, getCategory } from '../data/templates';
import type { BubbleNode, PromptTemplate } from '../data/types';

export default function HomePage() {
  const { t } = useTranslation('common');
  const { t: tPrompts } = useTranslation('prompts');

  useDocumentHead(
    `${t('app.title')} — ${t('app.tagline')}`,
    'Build detailed AI prompts quickly with an interactive bubble-based interface.',
  );

  const {
    navigationPath,
    currentNode,
    leafOverlayActive,
    navigateTo,
    goBack,
    reset,
    openLeaf,
  } = useWorldNavigation();

  const isAtRoot = navigationPath.length === 0;
  const [viewMode, setViewMode] = useState<'bubble' | 'list'>('bubble');

  // Async template loading
  const [leafTemplate, setLeafTemplate] = useState<PromptTemplate | null>(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  useEffect(() => {
    const templateId = currentNode.promptTemplateId;
    const isLeaf =
      templateId && (!currentNode.children || currentNode.children.length === 0);

    if (!isLeaf) {
      setLeafTemplate(null);
      return;
    }

    let cancelled = false;
    setIsLoadingTemplate(true);

    const category = getCategory(templateId);
    const ns = `prompts-${category}`;
    Promise.all([loadTemplate(templateId), i18next.loadNamespaces(ns)]).then(
      ([t]) => {
        if (!cancelled) {
          setLeafTemplate(t);
          setIsLoadingTemplate(false);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [currentNode]);

  const handleLeafClick = useCallback(
    (node: BubbleNode) => {
      openLeaf(node);
    },
    [openLeaf],
  );

  const handleGoBackFromResult = useCallback(() => {
    goBack();
  }, [goBack]);

  // Prompt text getter
  const promptTextGetterRef = useRef<() => string>(() => '');
  const getPromptText = useCallback(() => promptTextGetterRef.current(), []);
  const handlePromptTextChange = useCallback((getter: () => string) => {
    promptTextGetterRef.current = getter;
  }, []);

  const showList = viewMode === 'list';

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
        <span>
          {showList
            ? t('bubble.selectFromList', 'Select a category')
            : t('bubble.clickToExplore')}
        </span>
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
          {showList ? '\u25C9' : '\u2630'}
        </button>
      </div>

      <div className="bubble-view__content">
        {showList ? (
          <BubbleList
            currentNode={currentNode}
            currentChildren={currentNode.children ?? []}
            isAtRoot={isAtRoot}
            onNavigate={navigateTo}
            onGoBack={isAtRoot ? reset : goBack}
            onLeafClick={handleLeafClick}
          />
        ) : (
          <WorldCanvas
            navigationPath={navigationPath}
            onNavigate={navigateTo}
            onGoBack={isAtRoot ? reset : goBack}
            onLeafClick={handleLeafClick}
            leafOverlayActive={leafOverlayActive}
          />
        )}
      </div>

      {/* Prompt overlay for leaf nodes */}
      <PromptOverlay
        visible={leafOverlayActive}
        template={leafTemplate}
        currentNode={currentNode}
        categoryLabel={tPrompts(currentNode.labelKey)}
        onGoBack={handleGoBackFromResult}
        onPromptTextChange={handlePromptTextChange}
        getPromptText={getPromptText}
        isLoading={isLoadingTemplate}
      />
    </div>
  );
}
