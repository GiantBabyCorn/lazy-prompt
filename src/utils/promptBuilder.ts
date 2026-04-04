import type { PromptTemplate } from '../data/types';

/**
 * Builds the final prompt string from a template, user edits, and added items.
 *
 * @param template - The prompt template to render
 * @param editedValues - Map of spanId -> user-edited value
 * @param addedItems - Map of sectionId -> user-added item texts
 * @param t - i18n translate function (for the 'prompts' namespace)
 * @returns The assembled prompt as a plain-text string
 */
export function buildPromptString(
  template: PromptTemplate,
  editedValues: Record<string, string>,
  addedItems: Record<string, string[]>,
  t: (key: string) => string
): string {
  const lines: string[] = [];

  template.sections.forEach((section, index) => {
    const sectionNumber = index + 1;

    // Build interpolation values from editable spans
    const interpolation: Record<string, string> = {};
    if (section.editableSpans) {
      for (const span of section.editableSpans) {
        // The placeholder in the i18n string uses the key from the template
        // e.g. "Build me a {{name}} Website" — we need to figure out which
        // interpolation key maps to this span.
        // The span placeholder is the default display value (e.g. "OOO", "React").
        // We use the edited value if available, otherwise the placeholder.
        const value = editedValues[span.id] || span.placeholder;
        interpolation[span.id] = value;
      }
    }

    // Translate the section text. The i18n template uses interpolation keys
    // like {{name}}, {{framework}}, etc. We need to map span IDs to those keys.
    // Since the text uses named keys from the template JSON (e.g. {{name}}, {{framework}}),
    // and spans have IDs like "bw1-name", "bw2-fw", we need to extract the interpolation
    // keys from the translated text and match them with span values.
    let text = t(section.textKey);

    // Replace interpolation placeholders {{key}} with span values
    if (section.editableSpans) {
      // Extract all {{key}} placeholders from the raw translation
      const placeholderRegex = /\{\{(\w+)\}\}/g;
      const placeholders: string[] = [];
      let match;
      while ((match = placeholderRegex.exec(text)) !== null) {
        placeholders.push(match[1]);
      }

      // Map placeholders to spans in order
      for (let i = 0; i < Math.min(placeholders.length, section.editableSpans.length); i++) {
        const span = section.editableSpans[i];
        const value = editedValues[span.id] || span.placeholder;
        text = text.replace(`{{${placeholders[i]}}}`, value);
      }
    }

    lines.push(`${sectionNumber}. ${text}`);

    // Add default items for extensible sections
    if (section.type === 'extensible' && section.defaultItems) {
      for (const item of section.defaultItems) {
        lines.push(`   - ${t(item.textKey)}`);
      }
    }

    // Add user-added items
    const added = addedItems[section.id];
    if (added) {
      for (const item of added) {
        lines.push(`   - ${item}`);
      }
    }
  });

  return lines.join('\n');
}
