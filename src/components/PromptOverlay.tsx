import { motion, AnimatePresence } from 'framer-motion';
import PromptResult from './PromptResult';
import { AIProviderLinks } from './AIProviderLinks';
import type { PromptTemplate, BubbleNode } from '../data/types';

interface PromptOverlayProps {
  visible: boolean;
  template: PromptTemplate | null;
  currentNode: BubbleNode;
  categoryLabel: string;
  onGoBack: () => void;
  onPromptTextChange: (getter: () => string) => void;
  getPromptText: () => string;
  isLoading: boolean;
}

export function PromptOverlay({
  visible,
  template,
  currentNode,
  categoryLabel,
  onGoBack,
  onPromptTextChange,
  getPromptText,
  isLoading,
}: PromptOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="prompt-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className="prompt-overlay__loading">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                className="spin"
                style={{ opacity: 0.5 }}
              >
                <circle
                  cx="14"
                  cy="14"
                  r="11"
                  stroke="var(--color-cyan)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="34 34"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ) : template ? (
            <div className="prompt-result-page animate-fade-in">
              <div className="prompt-result-page__scroll">
                <PromptResult
                  template={template}
                  categoryLabel={categoryLabel}
                  templateOverrides={currentNode.templateOverrides}
                  onGoBack={onGoBack}
                  onPromptTextChange={onPromptTextChange}
                />
              </div>
              <div className="prompt-result-page__footer">
                <AIProviderLinks getPromptText={getPromptText} />
              </div>
            </div>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
