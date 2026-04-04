import * as readline from 'readline';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { BubbleNode } from '../src/data/types.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUBBLE_TREE_PATH = resolve(__dirname, '../src/data/bubbleTree.ts');

function ask(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}

function findNode(node: BubbleNode, targetId: string): BubbleNode | null {
  if (node.id === targetId) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findNode(child, targetId);
      if (found) return found;
    }
  }
  return null;
}

async function main() {
  const { bubbleTree } = await import('../src/data/bubbleTree.ts');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  try {
    const nodeId = await ask(rl, 'Node id to edit: ');
    const node = findNode(bubbleTree, nodeId);

    if (!node) {
      console.error(`Error: Node "${nodeId}" not found.`);
      process.exit(1);
    }

    console.log('\nCurrent values:');
    console.log(`  id: ${node.id}`);
    console.log(`  labelKey: ${node.labelKey}`);
    console.log(`  type: ${node.type}`);
    console.log(`  promptTemplateId: ${node.promptTemplateId || '(none)'}`);

    const newLabelKey = await ask(rl, `New labelKey (enter to keep "${node.labelKey}"): `);
    const newType = await ask(rl, `New type (enter to keep "${node.type}"): `);
    const newTemplateId = await ask(rl, `New promptTemplateId (enter to keep, "remove" to remove): `);

    let source = readFileSync(BUBBLE_TREE_PATH, 'utf-8');

    if (newLabelKey) {
      source = source.replace(
        new RegExp(`(id:\\s*'${nodeId}'[^}]*labelKey:\\s*)'[^']*'`),
        `$1'${newLabelKey}'`
      );
    }

    if (newType && (newType === 'primary' || newType === 'secondary')) {
      source = source.replace(
        new RegExp(`(id:\\s*'${nodeId}'[^}]*type:\\s*)'[^']*'`),
        `$1'${newType}'`
      );
    }

    if (newTemplateId === 'remove') {
      source = source.replace(
        new RegExp(`(id:\\s*'${nodeId}'[^}]*),\\s*promptTemplateId:\\s*'[^']*'`),
        '$1'
      );
    } else if (newTemplateId) {
      if (node.promptTemplateId) {
        source = source.replace(
          new RegExp(`(id:\\s*'${nodeId}'[^}]*promptTemplateId:\\s*)'[^']*'`),
          `$1'${newTemplateId}'`
        );
      } else {
        source = source.replace(
          new RegExp(`(id:\\s*'${nodeId}'[^}]*type:\\s*'[^']*')`),
          `$1, promptTemplateId: '${newTemplateId}'`
        );
      }
    }

    writeFileSync(BUBBLE_TREE_PATH, source, 'utf-8');
    console.log(`\n✓ Updated node "${nodeId}"`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
