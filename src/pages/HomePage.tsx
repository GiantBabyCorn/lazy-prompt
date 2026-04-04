import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useBubbleNavigation } from '../hooks/useBubbleNavigation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { BubbleCanvas } from '../components/BubbleCanvas';
import PromptResult from '../components/PromptResult';
import { AIProviderLinks } from '../components/AIProviderLinks';
import { promptTemplates } from '../data/promptTemplates';
import { buildPromptString } from '../utils/promptBuilder';
import type { BubbleNode, PromptTemplate } from '../data/types';

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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          minHeight: 'calc(100vh - 61px)',
        }}
      >
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

  // Show bubble canvas for navigation
  return (
    <div
      style={{
        height: 'calc(100vh - 61px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Subtitle */}
      <div
        style={{
          textAlign: 'center',
          padding: '16px 0 0',
          color: 'var(--color-text-secondary)',
          fontSize: '0.9rem',
        }}
      >
        {t('bubble.clickToExplore')}
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <BubbleCanvas
          currentNode={currentNode}
          currentChildren={currentChildren}
          isAtRoot={isAtRoot}
          onNavigate={navigateTo}
          onGoBack={isAtRoot ? reset : goBack}
          onLeafClick={handleLeafClick}
        />
      </div>
    </div>
  );
}
