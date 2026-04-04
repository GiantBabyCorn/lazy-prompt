import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { PromptTemplate, PromptSection } from '../data/types';
import { buildPromptString } from '../utils/promptBuilder';
import EditableText from './EditableText';
import AddItemButton from './AddItemButton';
import CopyButton from './CopyButton';

interface PromptResultProps {
  template: PromptTemplate;
  categoryLabel: string;
  onGoBack: () => void;
  onEditedValuesChange?: (values: Record<string, string>) => void;
  onAddedItemsChange?: (items: Record<string, string[]>) => void;
}

export default function PromptResult({
  template,
  categoryLabel,
  onGoBack,
  onEditedValuesChange,
  onAddedItemsChange,
}: PromptResultProps) {
  const { t } = useTranslation('prompts');
  const { t: tCommon } = useTranslation('common');
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = useState<Record<string, string[]>>({});
  const [hiddenSections, setHiddenSections] = useState<Set<string>>(new Set());
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    onEditedValuesChange?.(editedValues);
  }, [editedValues, onEditedValuesChange]);

  useEffect(() => {
    onAddedItemsChange?.(addedItems);
  }, [addedItems, onAddedItemsChange]);

  const handleSpanChange = useCallback((spanId: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [spanId]: value }));
  }, []);

  const handleAddItem = useCallback((sectionId: string, text: string) => {
    setAddedItems((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), text],
    }));
  }, []);

  const toggleSection = useCallback((sectionId: string) => {
    setHiddenSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) next.delete(sectionId);
      else next.add(sectionId);
      return next;
    });
  }, []);

  const toggleItem = useCallback((key: string) => {
    setHiddenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const getPromptText = useCallback(() => {
    return buildPromptString(template, editedValues, addedItems, t, hiddenSections, hiddenItems);
  }, [template, editedValues, addedItems, t, hiddenSections, hiddenItems]);

  // Visible numbering skips hidden sections
  const sectionNumbers = useMemo(() => {
    let num = 0;
    return template.sections.map((s) => {
      if (hiddenSections.has(s.id)) return null;
      return ++num;
    });
  }, [template.sections, hiddenSections]);

  const renderSectionText = (section: PromptSection) => {
    const rawText = t(section.textKey);

    if (!section.editableSpans || section.editableSpans.length === 0) {
      return <span>{rawText}</span>;
    }

    const placeholderRegex = /(\{\{\w+\}\})/g;
    const parts = rawText.split(placeholderRegex);
    const keyRegex = /\{\{(\w+)\}\}/;
    let spanIndex = 0;

    return (
      <>
        {parts.map((part, i) => {
          const keyMatch = part.match(keyRegex);
          if (keyMatch && spanIndex < section.editableSpans!.length) {
            const span = section.editableSpans![spanIndex];
            spanIndex++;
            const value = editedValues[span.id] || span.placeholder;
            return (
              <EditableText
                key={span.id}
                span={span}
                value={value}
                onChange={handleSpanChange}
              />
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  };

  const toggleBtnStyle = (active: boolean, size: 'section' | 'item'): React.CSSProperties => ({
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: active ? (size === 'section' ? 'var(--color-cyan)' : 'var(--color-green)') : 'var(--color-text-secondary)',
    fontSize: size === 'section' ? '0.7rem' : '0.6rem',
    padding: size === 'section' ? '2px 4px' : '1px 3px',
    lineHeight: '1.8',
    flexShrink: 0,
    opacity: active ? 0.8 : 0.4,
  });

  return (
    <div
      style={{
        border: '1px solid var(--color-cyan)',
        borderRadius: '12px',
        backgroundColor: 'var(--color-surface)',
        padding: '24px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onGoBack}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              padding: '4px 8px',
            }}
            aria-label={tCommon('nav.goBack')}
          >
            ←
          </button>
          <span
            style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-cyan)',
            }}
          />
          <span
            style={{
              color: 'var(--color-text)',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            {categoryLabel}
          </span>
        </div>
        <CopyButton getText={getPromptText} />
      </div>

      {/* Prompt sections */}
      <div
        className="font-mono"
        style={{ fontSize: '0.9rem', lineHeight: '1.8' }}
      >
        {template.sections.map((section, index) => {
          const isHidden = hiddenSections.has(section.id);
          const num = sectionNumbers[index];

          return (
            <div key={section.id} style={{ marginBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2px' }}>
                <button
                  onClick={() => toggleSection(section.id)}
                  style={toggleBtnStyle(!isHidden, 'section')}
                  title={isHidden ? 'Show this line' : 'Hide this line'}
                >
                  {isHidden ? '○' : '●'}
                </button>

                {isHidden ? (
                  <span style={{ color: 'var(--color-text-secondary)', opacity: 0.4, fontStyle: 'italic' }}>
                    ( * {renderSectionText(section)} )
                  </span>
                ) : (
                  <div style={{ flex: 1 }}>
                    <span style={{ color: 'var(--color-text-secondary)', marginRight: '8px' }}>
                      {num}.
                    </span>
                    {renderSectionText(section)}
                  </div>
                )}
              </div>

              {/* Extensible items — only when section is visible */}
              {!isHidden && section.type === 'extensible' && section.defaultItems && (
                <div style={{ paddingLeft: '24px' }}>
                  {section.defaultItems.map((item) => {
                    const itemKey = `${section.id}:${item.id}`;
                    const itemHidden = hiddenItems.has(itemKey);
                    return (
                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <button
                          onClick={() => toggleItem(itemKey)}
                          style={toggleBtnStyle(!itemHidden, 'item')}
                          title={itemHidden ? 'Show this item' : 'Hide this item'}
                        >
                          {itemHidden ? '○' : '●'}
                        </button>
                        <span style={{
                          color: itemHidden ? 'var(--color-text-secondary)' : 'var(--color-text)',
                          opacity: itemHidden ? 0.35 : 1,
                          fontStyle: itemHidden ? 'italic' : 'normal',
                          textDecoration: itemHidden ? 'line-through' : 'none',
                        }}>
                          - {t(item.textKey)}
                        </span>
                      </div>
                    );
                  })}

                  {addedItems[section.id]?.map((text, i) => {
                    const itemKey = `${section.id}:added:${i}`;
                    const itemHidden = hiddenItems.has(itemKey);
                    return (
                      <div key={`added-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <button
                          onClick={() => toggleItem(itemKey)}
                          style={toggleBtnStyle(!itemHidden, 'item')}
                          title={itemHidden ? 'Show this item' : 'Hide this item'}
                        >
                          {itemHidden ? '○' : '●'}
                        </button>
                        <span style={{
                          color: itemHidden ? 'var(--color-text-secondary)' : 'var(--color-text)',
                          opacity: itemHidden ? 0.35 : 1,
                          fontStyle: itemHidden ? 'italic' : 'normal',
                          textDecoration: itemHidden ? 'line-through' : 'none',
                        }}>
                          - {text}
                        </span>
                      </div>
                    );
                  })}

                  <AddItemButton onAdd={(text) => handleAddItem(section.id, text)} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hint */}
      <div
        style={{
          marginTop: '16px',
          color: 'var(--color-text-secondary)',
          fontSize: '0.8rem',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        {tCommon('prompt.editHint')}
      </div>
    </div>
  );
}
