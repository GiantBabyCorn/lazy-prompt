import * as readline from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CATEGORIES = ['build', 'translation', 'read', 'write', 'debug', 'explain', 'brainstorm', 'learn', 'organize', 'summarize'];

function getCategoryForId(id: string): string {
  const lower = id.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.startsWith(cat)) return cat;
  }
  return 'build';
}

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const { loadAllTemplates } = await import('../src/data/templates/index.ts');
  const allTemplates = await loadAllTemplates();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const id = await ask(rl, 'Template id: ');

    if (!id) {
      console.error('Error: Template id is required.');
      process.exit(1);
    }

    const existing = allTemplates.find((t) => t.id === id);
    if (existing) {
      console.error(`Error: Template "${id}" already exists.`);
      process.exit(1);
    }

    const category = getCategoryForId(id);
    const categoryPath = resolve(__dirname, `../src/data/templates/${category}.ts`);
    let source = readFileSync(categoryPath, 'utf-8');

    // Find the last closing bracket of the array
    const lastBracket = source.lastIndexOf('];');
    if (lastBracket === -1) {
      console.error('Error: Could not find template array end in source file.');
      process.exit(1);
    }

    const newTemplate = `  {\n    id: '${id}',\n    sections: [],\n  },\n`;
    source = source.slice(0, lastBracket) + newTemplate + source.slice(lastBracket);

    writeFileSync(categoryPath, source, 'utf-8');
    console.log(`\n✓ Added empty template "${id}" to ${category}.ts`);
    console.log('  Use "npm run edit-template" to add sections.');
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
