import * as readline from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { PromptTemplate } from '../src/data/types.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATEGORIES = ['build', 'translation', 'read', 'write', 'debug', 'explain', 'brainstorm', 'learn', 'organize', 'summarize'];

function getCategoryForId(id: string): string {
  const lower = id.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.startsWith(cat)) return cat;
  }
  return 'build';
}

function getTemplatesPath(templateId: string): string {
  return resolve(__dirname, `../src/data/templates/${getCategoryForId(templateId)}.ts`);
}

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const { loadAllTemplates } = await import('../src/data/templates/index.ts');
  const promptTemplates = await loadAllTemplates();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const templateId = await ask(rl, 'Template id to edit: ');
    const template = promptTemplates.find((t: PromptTemplate) => t.id === templateId);

    if (!template) {
      console.error(`Error: Template "${templateId}" not found.`);
      console.log('Available templates:', promptTemplates.map((t: PromptTemplate) => t.id).join(', '));
      process.exit(1);
    }

    console.log(`\nTemplate: ${template.id}`);
    console.log(`Sections (${template.sections.length}):`);
    for (const section of template.sections) {
      const spanInfo = section.editableSpans ? ` [${section.editableSpans.length} spans]` : '';
      const itemInfo = section.defaultItems ? ` [${section.defaultItems.length} items]` : '';
      console.log(`  ${section.id}: ${section.textKey} (${section.type})${spanInfo}${itemInfo}`);
    }

    console.log('\nOptions:');
    console.log('  1. Add a new section');
    console.log('  2. Remove a section');
    console.log('  3. Edit a section textKey');
    console.log('  4. Cancel');

    const choice = await ask(rl, '\nChoice (1-4): ');

    const TEMPLATES_PATH = getTemplatesPath(templateId);
    let source = readFileSync(TEMPLATES_PATH, 'utf-8');

    if (choice === '1') {
      const sectionId = await ask(rl, 'New section id: ');
      const textKey = await ask(rl, 'Text key (i18n): ');
      const sectionType = await ask(rl, 'Type (fixed/extensible): ');

      if (!sectionId || !textKey || !sectionType) {
        console.error('Error: All fields are required.');
        process.exit(1);
      }

      // Find the sections array for this template
      const templateIdPattern = new RegExp(`id:\\s*'${templateId}'`);
      const templateMatch = templateIdPattern.exec(source);

      if (!templateMatch) {
        console.error('Error: Could not find template in source file.');
        process.exit(1);
      }

      // Find the sections array closing bracket
      const afterTemplate = source.slice(templateMatch.index);
      const sectionsMatch = afterTemplate.match(/sections:\s*\[/);

      if (!sectionsMatch || sectionsMatch.index === undefined) {
        console.error('Error: Could not find sections array.');
        process.exit(1);
      }

      const sectionsStart = templateMatch.index + sectionsMatch.index + sectionsMatch[0].length;

      // Find closing bracket
      let depth = 1;
      let pos = sectionsStart;
      while (pos < source.length && depth > 0) {
        if (source[pos] === '[') depth++;
        if (source[pos] === ']') depth--;
        if (depth > 0) pos++;
      }

      const newSection = `      { id: '${sectionId}', textKey: '${textKey}', type: '${sectionType}' },\n    `;
      source = source.slice(0, pos) + newSection + source.slice(pos);

      writeFileSync(TEMPLATES_PATH, source, 'utf-8');
      console.log(`\n✓ Added section "${sectionId}" to template "${templateId}"`);

    } else if (choice === '2') {
      const sectionId = await ask(rl, 'Section id to remove: ');

      const sectionPattern = new RegExp(`\\{[^{}]*id:\\s*'${sectionId}'[^{}]*\\},?\\s*\\n?`);
      if (!sectionPattern.test(source)) {
        // Try multiline pattern for sections with nested objects
        const idPos = source.indexOf(`id: '${sectionId}'`);
        if (idPos === -1) {
          console.error(`Error: Section "${sectionId}" not found in source.`);
          process.exit(1);
        }

        // Walk back to opening brace
        let start = idPos;
        while (start > 0 && source[start] !== '{') start--;

        // Walk forward to matching closing brace
        let depth = 0;
        let end = start;
        for (let i = start; i < source.length; i++) {
          if (source[i] === '{') depth++;
          if (source[i] === '}') depth--;
          if (depth === 0) { end = i + 1; break; }
        }

        // Skip trailing comma and whitespace
        while (end < source.length && (source[end] === ',' || source[end] === ' ' || source[end] === '\n')) {
          end++;
          if (source[end - 1] === '\n') break;
        }

        source = source.slice(0, start) + source.slice(end);
      } else {
        source = source.replace(sectionPattern, '');
      }

      writeFileSync(TEMPLATES_PATH, source, 'utf-8');
      console.log(`\n✓ Removed section "${sectionId}" from template "${templateId}"`);

    } else if (choice === '3') {
      const sectionId = await ask(rl, 'Section id to edit: ');
      const newTextKey = await ask(rl, 'New textKey: ');

      if (!newTextKey) {
        console.error('Error: textKey is required.');
        process.exit(1);
      }

      source = source.replace(
        new RegExp(`(id:\\s*'${sectionId}'[^}]*textKey:\\s*)'[^']*'`),
        `$1'${newTextKey}'`
      );

      writeFileSync(TEMPLATES_PATH, source, 'utf-8');
      console.log(`\n✓ Updated section "${sectionId}" textKey to "${newTextKey}"`);

    } else {
      console.log('Cancelled.');
    }
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
