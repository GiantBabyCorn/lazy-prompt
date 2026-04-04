import type { PromptTemplate } from '../data/types';

/**
 * Builds the final prompt string from a template, user edits, and added items.
 * Respects hidden sections and hidden list items.
 */
export function buildPromptString(
  template: PromptTemplate,
  editedValues: Record<string, string>,
  addedItems: Record<string, string[]>,
  t: (key: string) => string,
  hiddenSections?: Set<string>,
  hiddenItems?: Set<string>,
): string {
  const lines: string[] = [];
  let visibleNumber = 0;

  template.sections.forEach((section) => {
    // Skip hidden sections
    if (hiddenSections?.has(section.id)) return;

    visibleNumber++;

    let text = t(section.textKey);

    // Replace interpolation placeholders {{key}} with span values
    if (section.editableSpans) {
      const placeholderRegex = /\{\{(\w+)\}\}/g;
      const placeholders: string[] = [];
      let match;
      while ((match = placeholderRegex.exec(text)) !== null) {
        placeholders.push(match[1]);
      }

      for (let i = 0; i < Math.min(placeholders.length, section.editableSpans.length); i++) {
        const span = section.editableSpans[i];
        const value = editedValues[span.id] || span.placeholder;
        text = text.replace(`{{${placeholders[i]}}}`, value);
      }
    }

    lines.push(`${visibleNumber}. ${text}`);

    // Add default items for extensible sections (skip hidden items)
    if (section.type === 'extensible' && section.defaultItems) {
      for (const item of section.defaultItems) {
        const itemKey = `${section.id}:${item.id}`;
        if (hiddenItems?.has(itemKey)) continue;
        lines.push(`   - ${t(item.textKey)}`);
      }
    }

    // Add user-added items (skip hidden)
    const added = addedItems[section.id];
    if (added) {
      added.forEach((item, i) => {
        const itemKey = `${section.id}:added:${i}`;
        if (hiddenItems?.has(itemKey)) return;
        lines.push(`   - ${item}`);
      });
    }
  });

  return lines.join('\n');
}
