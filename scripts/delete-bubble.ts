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
    const nodeId = await ask(rl, 'Node id to delete: ');

    if (nodeId === 'root') {
      console.error('Error: Cannot delete the root node.');
      process.exit(1);
    }

    const node = findNode(bubbleTree, nodeId);
    if (!node) {
      console.error(`Error: Node "${nodeId}" not found.`);
      process.exit(1);
    }

    const childCount = node.children ? node.children.length : 0;
    console.log(`\nNode: ${node.id} (${node.labelKey})`);
    if (childCount > 0) {
      console.log(`WARNING: This node has ${childCount} children that will also be removed.`);
    }

    const confirm = await ask(rl, 'Are you sure you want to delete? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Cancelled.');
      process.exit(0);
    }

    let source = readFileSync(BUBBLE_TREE_PATH, 'utf-8');

    // Find the node in source and remove it
    // Pattern: match from the opening { before the id to the closing } or },
    const idPattern = new RegExp(`id:\\s*'${nodeId}'`);
    const idMatch = idPattern.exec(source);

    if (!idMatch) {
      console.error(`Error: Could not find node "${nodeId}" in source file.`);
      process.exit(1);
    }

    // Walk backwards to find the opening brace
    let openBrace = idMatch.index;
    while (openBrace > 0 && source[openBrace] !== '{') {
      openBrace--;
    }

    // Walk forward to find the matching closing brace
    let depth = 0;
    let closeBrace = openBrace;
    for (let i = openBrace; i < source.length; i++) {
      if (source[i] === '{') depth++;
      if (source[i] === '}') depth--;
      if (depth === 0) {
        closeBrace = i;
        break;
      }
    }

    // Include trailing comma and whitespace
    let end = closeBrace + 1;
    while (end < source.length && (source[end] === ',' || source[end] === ' ' || source[end] === '\n' || source[end] === '\r')) {
      end++;
      if (source[end - 1] === '\n') break;
    }

    // Include leading whitespace
    let start = openBrace;
    while (start > 0 && (source[start - 1] === ' ' || source[start - 1] === '\t')) {
      start--;
    }

    source = source.slice(0, start) + source.slice(end);
    writeFileSync(BUBBLE_TREE_PATH, source, 'utf-8');
    console.log(`\n✓ Deleted node "${nodeId}"`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
