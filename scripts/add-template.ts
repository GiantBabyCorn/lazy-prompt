import * as readline from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_PATH = resolve(__dirname, '../src/data/promptTemplates.ts');

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const { promptTemplates } = await import('../src/data/promptTemplates.ts');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const id = await ask(rl, 'Template id: ');

    if (!id) {
      console.error('Error: Template id is required.');
      process.exit(1);
    }

    const existing = promptTemplates.find((t) => t.id === id);
    if (existing) {
      console.error(`Error: Template "${id}" already exists.`);
      process.exit(1);
    }

    let source = readFileSync(TEMPLATES_PATH, 'utf-8');

    // Find the last closing bracket of the array
    const lastBracket = source.lastIndexOf('];');
    if (lastBracket === -1) {
      console.error('Error: Could not find template array end in source file.');
      process.exit(1);
    }

    const newTemplate = `  {\n    id: '${id}',\n    sections: [],\n  },\n`;
    source = source.slice(0, lastBracket) + newTemplate + source.slice(lastBracket);

    writeFileSync(TEMPLATES_PATH, source, 'utf-8');
    console.log(`\n✓ Added empty template "${id}"`);
    console.log('  Use "npm run edit-template" to add sections.');
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
