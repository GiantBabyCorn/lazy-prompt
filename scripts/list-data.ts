import type { BubbleNode } from '../src/data/types.ts';

async function main() {
  const { bubbleTree } = await import('../src/data/bubbleTree.ts');
  const { promptTemplates } = await import('../src/data/promptTemplates.ts');

  console.log('\n=== Bubble Tree ===\n');

  function printTree(node: BubbleNode, indent: number) {
    const prefix = '  '.repeat(indent);
    const typeTag = node.type === 'primary' ? '[P]' : '[S]';
    const leafTag = node.promptTemplateId ? ` -> ${node.promptTemplateId}` : '';
    const childCount = node.children ? ` (${node.children.length} children)` : '';
    console.log(`${prefix}${typeTag} ${node.id} (${node.labelKey})${leafTag}${childCount}`);
    if (node.children) {
      for (const child of node.children) {
        printTree(child, indent + 1);
      }
    }
  }

  printTree(bubbleTree, 0);

  console.log('\n=== Prompt Templates ===\n');

  for (const template of promptTemplates) {
    const extensibleCount = template.sections.filter((s) => s.type === 'extensible').length;
    const editableCount = template.sections.filter((s) => s.editableSpans && s.editableSpans.length > 0).length;
    console.log(
      `  ${template.id} — ${template.sections.length} sections (${editableCount} editable, ${extensibleCount} extensible)`
    );
  }

  console.log(`\nTotal templates: ${promptTemplates.length}`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
