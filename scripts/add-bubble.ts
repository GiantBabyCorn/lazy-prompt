import * as readline from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUBBLE_TREE_PATH = resolve(__dirname, '../src/data/bubbleTree.ts');

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const parentId = await ask(rl, 'Parent node id (or "root"): ');
    const id = await ask(rl, 'New node id: ');
    const labelKey = await ask(rl, 'Label key (i18n key): ');
    const type = await ask(rl, 'Type (primary/secondary): ');
    const promptTemplateId = await ask(rl, 'Prompt template id (leave empty if not a leaf): ');

    if (!id || !labelKey || !type) {
      console.error('Error: id, labelKey, and type are required.');
      process.exit(1);
    }

    if (type !== 'primary' && type !== 'secondary') {
      console.error('Error: type must be "primary" or "secondary".');
      process.exit(1);
    }

    let source = readFileSync(BUBBLE_TREE_PATH, 'utf-8');

    // Build the new node string
    const templatePart = promptTemplateId ? `, promptTemplateId: '${promptTemplateId}'` : '';
    const newNode = `{ id: '${id}', labelKey: '${labelKey}', type: '${type}'${templatePart} }`;

    if (parentId === 'root') {
      // Add as a child of the root node, before the last closing bracket of children array
      const lastChildrenClose = source.lastIndexOf('],');
      if (lastChildrenClose === -1) {
        console.error('Error: Could not find children array in bubble tree.');
        process.exit(1);
      }
      source = source.slice(0, lastChildrenClose) + `    ${newNode},\n  ` + source.slice(lastChildrenClose);
    } else {
      // Find the parent node and add to its children
      const parentPattern = new RegExp(`id:\\s*'${parentId}'`);
      const match = parentPattern.exec(source);

      if (!match) {
        console.error(`Error: Could not find parent node "${parentId}" in bubble tree.`);
        process.exit(1);
      }

      const parentPos = match.index;

      // Check if parent already has children
      const afterParent = source.slice(parentPos);
      const childrenMatch = afterParent.match(/children:\s*\[/);

      if (childrenMatch && childrenMatch.index !== undefined) {
        // Find the closing bracket of children array
        const childrenStart = parentPos + childrenMatch.index + childrenMatch[0].length;
        const closingBracket = findMatchingBracket(source, childrenStart - 1);
        if (closingBracket === -1) {
          console.error('Error: Could not find closing bracket for children array.');
          process.exit(1);
        }
        source = source.slice(0, closingBracket) + `        ${newNode},\n      ` + source.slice(closingBracket);
      } else {
        // Parent has no children yet — need to add children array
        // Find the closing brace of the parent object
        const braceStart = source.indexOf('{', parentPos - 10);
        const braceEnd = findMatchingBrace(source, braceStart);
        if (braceEnd === -1) {
          console.error('Error: Could not find closing brace for parent node.');
          process.exit(1);
        }
        // Insert children before closing brace
        const insertPoint = braceEnd;
        source = source.slice(0, insertPoint) + `, children: [\n        ${newNode},\n      ]` + source.slice(insertPoint);
      }
    }

    writeFileSync(BUBBLE_TREE_PATH, source, 'utf-8');
    console.log(`\n✓ Added node "${id}" under "${parentId}"`);
  } finally {
    rl.close();
  }
}

function findMatchingBracket(source: string, openPos: number): number {
  let depth = 1;
  for (let i = openPos + 1; i < source.length; i++) {
    if (source[i] === '[') depth++;
    if (source[i] === ']') depth--;
    if (depth === 0) return i;
  }
  return -1;
}

function findMatchingBrace(source: string, openPos: number): number {
  let depth = 1;
  for (let i = openPos + 1; i < source.length; i++) {
    if (source[i] === '{') depth++;
    if (source[i] === '}') depth--;
    if (depth === 0) return i;
  }
  return -1;
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
