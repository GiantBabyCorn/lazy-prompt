import { useState, useCallback } from 'react';
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
}

export default function PromptResult({ template, categoryLabel, onGoBack }: PromptResultProps) {
  const { t } = useTranslation('prompts');
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [addedItems, setAddedItems] = useState<Record<string, string[]>>({});

  const handleSpanChange = useCallback((spanId: string, value: string) => {
    setEditedValues((prev) => ({ ...prev, [spanId]: value }));
  }, []);

  const handleAddItem = useCallback((sectionId: string, text: string) => {
    setAddedItems((prev) => ({
      ...prev,
      [sectionId]: [...(prev[sectionId] || []), text],
    }));
  }, []);

  const getPromptText = useCallback(() => {
    return buildPromptString(template, editedValues, addedItems, t);
  }, [template, editedValues, addedItems, t]);

  /**
   * Renders a section's text with inline editable spans.
   * The i18n text contains {{placeholder}} markers that correspond to editable spans.
   */
  const renderSectionText = (section: PromptSection) => {
    const rawText = t(section.textKey);

    if (!section.editableSpans || section.editableSpans.length === 0) {
      return <span>{rawText}</span>;
    }

    // Find all {{key}} placeholders and split the text around them
    const placeholderRegex = /(\{\{\w+\}\})/g;
    const parts = rawText.split(placeholderRegex);

    // Collect placeholder keys in order
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
            aria-label="Go back"
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
          <span style={{ color: 'var(--color-text)', fontWeight: 600, fontSize: '1.1rem' }}>
            {categoryLabel}
          </span>
        </div>
        <CopyButton getText={getPromptText} />
      </div>

      {/* Prompt sections */}
      <div className="font-mono" style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
        {template.sections.map((section, index) => (
          <div key={section.id} style={{ marginBottom: '4px' }}>
            {/* Section line */}
            <div>
              <span style={{ color: 'var(--color-text-secondary)', marginRight: '8px' }}>
                {index + 1}.
              </span>
              {renderSectionText(section)}
            </div>

            {/* Default items for extensible sections */}
            {section.type === 'extensible' && section.defaultItems && (
              <div style={{ paddingLeft: '24px' }}>
                {section.defaultItems.map((item) => (
                  <div key={item.id} style={{ color: 'var(--color-text)' }}>
                    - {t(item.textKey)}
                  </div>
                ))}

                {/* User-added items */}
                {addedItems[section.id]?.map((text, i) => (
                  <div key={`added-${i}`} style={{ color: 'var(--color-text)' }}>
                    - {text}
                  </div>
                ))}

                <AddItemButton onAdd={(text) => handleAddItem(section.id, text)} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Hint text */}
      <div
        style={{
          marginTop: '16px',
          color: 'var(--color-text-secondary)',
          fontSize: '0.8rem',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        Click colored text to edit
      </div>
    </div>
  );
}
