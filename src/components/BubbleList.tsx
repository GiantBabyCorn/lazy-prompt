import { useTranslation } from 'react-i18next';
import type { BubbleNode } from '../data/types';
import { getTopicIcon } from '../utils/topicIcons';
import { TopicIconHtml } from '../utils/TopicIconHtml';
import { useCyclingText } from '../hooks/useCyclingText';

interface BubbleListProps {
  currentNode: BubbleNode;
  currentChildren: BubbleNode[];
  isAtRoot: boolean;
  onNavigate: (nodeId: string) => void;
  onGoBack: () => void;
  onLeafClick: (node: BubbleNode) => void;
}

export function BubbleList({
  currentNode,
  currentChildren,
  isAtRoot,
  onNavigate,
  onGoBack,
  onLeafClick,
}: BubbleListProps) {
  const { t } = useTranslation('prompts');
  const { t: tCommon } = useTranslation('common');

  // Cycling questions for root title
  const isRoot = currentNode.id === 'root';
  const questions = tCommon('bubble.questions', { returnObjects: true }) as string[];
  const cycling = useCyclingText(isRoot ? questions : []);

  const handleItemClick = (child: BubbleNode) => {
    if (child.children && child.children.length > 0) {
      onNavigate(child.id);
    } else if (child.promptTemplateId) {
      onLeafClick(child);
    }
  };

  return (
    <div className="bubble-list">
      {/* Header: current node */}
      <div className="bubble-list__header">
        {!isAtRoot && (
          <button
            className="bubble-list__back"
            onClick={onGoBack}
          >
            ← {tCommon('goBack', 'Go Back')}
          </button>
        )}
        <h2
          className="bubble-list__title"
          style={isRoot ? { opacity: cycling.opacity, transition: 'opacity 0.5s ease' } : undefined}
        >
          {isRoot ? cycling.text : t(currentNode.labelKey)}
        </h2>
        {currentNode.descriptionKeys && currentNode.descriptionKeys.length > 0 && (
          <p className="bubble-list__desc">
            {currentNode.descriptionKeys.map((k) => t(k)).join(', ')}
          </p>
        )}
      </div>

      {/* Children list */}
      <ul className="bubble-list__items">
        {currentChildren.map((child, index) => (
          <li
            key={child.id}
            className={`bubble-list__item bubble-list__item--${child.type}`}
            style={{ animationDelay: `${index * 60}ms` }}
            onClick={() => handleItemClick(child)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemClick(child);
              }
            }}
          >
            <span className="bubble-list__item-label">
              {getTopicIcon(child.id) && (
                <TopicIconHtml name={getTopicIcon(child.id)!} size={16} className="bubble-list__item-icon" />
              )}
              {' '}{t(child.labelKey)}
            </span>
            {child.descriptionKeys && child.descriptionKeys.length > 0 && (
              <span className="bubble-list__item-desc">
                {child.descriptionKeys.map((k) => t(k)).join(', ')}
              </span>
            )}
            <span className="bubble-list__item-arrow">›</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
