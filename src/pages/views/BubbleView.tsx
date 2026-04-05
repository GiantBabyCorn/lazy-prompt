import { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useBubbleNavigation } from '../../hooks/useBubbleNavigation';
import { BubbleCanvas } from '../../components/BubbleCanvas';
import { PromptOverlay } from '../../components/PromptOverlay';
import { loadTemplate, getCategory } from '../../data/templates';
import type { BubbleNode, PromptTemplate } from '../../data/types';

export function BubbleView() {
  const { t: tPrompts } = useTranslation('prompts');

  const {
    currentNode,
    currentChildren,
    navigationPath,
    navigateTo,
    skipNavigateTo,
    goBack,
    reset,
    animationPhase,
    clickedNodeId,
    previousNode,
    parentNode,
  } = useBubbleNavigation();

  const isAtRoot = navigationPath.length === 0;

  // Template loading
  const [leafTemplate, setLeafTemplate] = useState<PromptTemplate | null>(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);
  const [leafOverlayActive, setLeafOverlayActive] = useState(false);

  useEffect(() => {
    const templateId = currentNode.promptTemplateId;
    const isLeaf = templateId && (!currentNode.children || currentNode.children.length === 0);
    if (!isLeaf) { setLeafTemplate(null); setLeafOverlayActive(false); return; }

    setLeafOverlayActive(true);
    let cancelled = false;
    setIsLoadingTemplate(true);
    const category = getCategory(templateId);
    const ns = `prompts-${category}`;
    Promise.all([loadTemplate(templateId), i18next.loadNamespaces(ns)]).then(([t]) => {
      if (!cancelled) { setLeafTemplate(t); setIsLoadingTemplate(false); }
    });
    return () => { cancelled = true; };
  }, [currentNode]);

  const handleLeafClick = useCallback((node: BubbleNode) => {
    navigateTo(node.id);
  }, [navigateTo]);

  const handleGoBack = useCallback(() => {
    goBack();
    setLeafOverlayActive(false);
  }, [goBack]);

  const promptTextGetterRef = useRef<() => string>(() => '');
  const getPromptText = useCallback(() => promptTextGetterRef.current(), []);
  const handlePromptTextChange = useCallback((getter: () => string) => {
    promptTextGetterRef.current = getter;
  }, []);

  return (
    <>
      <div className="bubble-view__content">
        <BubbleCanvas
          currentNode={currentNode}
          currentChildren={currentChildren}
          navigationPath={navigationPath}
          isAtRoot={isAtRoot}
          onNavigate={navigateTo}
          onSkipNavigate={skipNavigateTo}
          onGoBack={isAtRoot ? reset : goBack}
          onLeafClick={handleLeafClick}
          animationPhase={animationPhase}
          clickedNodeId={clickedNodeId}
          previousNode={previousNode}
          parentNode={parentNode}
        />
      </div>
      <PromptOverlay
        visible={leafOverlayActive}
        template={leafTemplate}
        currentNode={currentNode}
        categoryLabel={tPrompts(currentNode.labelKey)}
        onGoBack={handleGoBack}
        onPromptTextChange={handlePromptTextChange}
        getPromptText={getPromptText}
        isLoading={isLoadingTemplate}
      />
    </>
  );
}
