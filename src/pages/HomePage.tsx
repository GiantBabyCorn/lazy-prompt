import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBubbleNavigation } from '../hooks/useBubbleNavigation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { BubbleCanvas } from '../components/BubbleCanvas';
import { BubbleList } from '../components/BubbleList';
import PromptResult from '../components/PromptResult';
import { AIProviderLinks } from '../components/AIProviderLinks';
import { promptTemplates } from '../data/promptTemplates';
import { buildPromptString } from '../utils/promptBuilder';
import type { BubbleNode, PromptTemplate } from '../data/types';

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
  } = useBubbleNavigation();

  const isAtRoot = navigationPath.length === 0;
  const isMobile = useIsMobile();

  // When a leaf node is clicked, show its prompt template
  const [selectedLeaf, setSelectedLeaf] = useState<{
    node: BubbleNode;
    template: PromptTemplate;
  } | null>(null);

  // Track edited values for the prompt builder (used by AIProviderLinks)
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = useState<Record<string, string[]>>({});

  const handleLeafClick = useCallback(
    (node: BubbleNode) => {
      if (node.promptTemplateId) {
        const template = promptTemplates.find(
          (t) => t.id === node.promptTemplateId,
        );
        if (template) {
          setSelectedLeaf({ node, template });
        }
      }
    },
    [],
  );

  const handleGoBackFromResult = useCallback(() => {
    setSelectedLeaf(null);
    setEditedValues({});
    setAddedItems({});
  }, []);

  const getPromptText = useCallback(() => {
    if (!selectedLeaf) return '';
    return buildPromptString(
      selectedLeaf.template,
      editedValues,
      addedItems,
      tPrompts,
    );
  }, [selectedLeaf, editedValues, addedItems, tPrompts]);

  // Show prompt result when a leaf is selected
  if (selectedLeaf) {
    const categoryLabel = tPrompts(selectedLeaf.node.labelKey);
    return (
      <div className="prompt-result-page animate-slide-up">
        <PromptResult
          template={selectedLeaf.template}
          categoryLabel={categoryLabel}
          onGoBack={handleGoBackFromResult}
          onEditedValuesChange={setEditedValues}
          onAddedItemsChange={setAddedItems}
        />
        <AIProviderLinks getPromptText={getPromptText} />
      </div>
    );
  }

  // Show bubble canvas (desktop) or bubble list (mobile) for navigation
  return (
    <div className="bubble-view">
      {/* Subtitle */}
      <div className="bubble-view__subtitle">
        {t('bubble.clickToExplore')}
      </div>

      {/* Canvas or List */}
      <div className="bubble-view__content animate-fade-in" key={currentNode.id}>
        {isMobile ? (
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
            isAtRoot={isAtRoot}
            onNavigate={navigateTo}
            onGoBack={isAtRoot ? reset : goBack}
            onLeafClick={handleLeafClick}
          />
        )}
      </div>
    </div>
  );
}
