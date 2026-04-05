import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function deepMerge(target: any, source: any): any {
  const result = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (typeof v === 'object' && v !== null && !Array.isArray(v) && typeof result[k] === 'object') {
      result[k] = deepMerge(result[k], v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

async function main() {
  const { bubbleTree } = await import('../src/data/bubbleTree.ts');
  const { loadAllTemplates } = await import('../src/data/templates/index.ts');
  const promptTemplates = await loadAllTemplates();

  // Load all prompts*.json files and merge them
  const localeDir = resolve(__dirname, '../src/i18n/locales/en');
  const promptFiles = readdirSync(localeDir).filter(f => f.startsWith('prompts') && f.endsWith('.json'));
  let prompts: any = {};
  for (const file of promptFiles) {
    const data = JSON.parse(readFileSync(resolve(localeDir, file), 'utf-8'));
    prompts = deepMerge(prompts, data);
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const ids = new Set<string>();
  let totalNodes = 0;
  let leafNodes = 0;

  // Collect all template ids
  const templateIds = new Set(promptTemplates.map((t) => t.id));

  // Resolve a dotted key against the JSON object
  function resolveKey(obj: Record<string, unknown>, key: string): unknown {
    const parts = key.split('.');
    let current: unknown = obj;
    for (const part of parts) {
      if (current == null || typeof current !== 'object') return undefined;
      current = (current as Record<string, unknown>)[part];
    }
    return current;
  }

  // Walk the bubble tree
  function walk(node: typeof bubbleTree, path: string) {
    totalNodes++;

    // Check id
    if (!node.id) {
      errors.push(`Node at ${path} is missing an id`);
    } else if (ids.has(node.id)) {
      errors.push(`Duplicate node id: "${node.id}" at ${path}`);
    } else {
      ids.add(node.id);
    }

    // Check labelKey
    if (!node.labelKey) {
      errors.push(`Node "${node.id}" is missing a labelKey`);
    } else if (resolveKey(prompts, node.labelKey) === undefined) {
      errors.push(`Node "${node.id}" labelKey "${node.labelKey}" not found in en/prompts.json`);
    }

    // Check descriptionKeys
    if (node.descriptionKeys) {
      for (const dk of node.descriptionKeys) {
        if (resolveKey(prompts, dk) === undefined) {
          warnings.push(`Node "${node.id}" descriptionKey "${dk}" not found in en/prompts.json`);
        }
      }
    }

    // Leaf node checks
    if (!node.children || node.children.length === 0) {
      leafNodes++;
      if (!node.promptTemplateId) {
        errors.push(`Leaf node "${node.id}" is missing promptTemplateId`);
      } else if (!templateIds.has(node.promptTemplateId)) {
        errors.push(`Leaf node "${node.id}" references unknown template "${node.promptTemplateId}"`);
      }
    } else {
      // Non-leaf with promptTemplateId
      if (node.promptTemplateId) {
        warnings.push(`Non-leaf node "${node.id}" has a promptTemplateId (unusual)`);
      }
      for (const child of node.children) {
        walk(child, `${path} > ${child.id}`);
      }
    }
  }

  walk(bubbleTree, 'root');

  // Validate prompt templates
  const templateSectionIds = new Set<string>();

  for (const template of promptTemplates) {
    if (!template.id) {
      errors.push('Found template without an id');
      continue;
    }

    for (const section of template.sections) {
      if (!section.id) {
        errors.push(`Template "${template.id}" has a section without an id`);
      } else if (templateSectionIds.has(section.id)) {
        errors.push(`Duplicate section id: "${section.id}" in template "${template.id}"`);
      } else {
        templateSectionIds.add(section.id);
      }

      // Check textKey exists in prompts.json
      if (!section.textKey) {
        errors.push(`Template "${template.id}" section "${section.id}" is missing textKey`);
      } else if (resolveKey(prompts, section.textKey) === undefined) {
        errors.push(`Template "${template.id}" section "${section.id}" textKey "${section.textKey}" not found in en/prompts.json`);
      }

      // Check default items textKeys
      if (section.defaultItems) {
        for (const item of section.defaultItems) {
          if (resolveKey(prompts, item.textKey) === undefined) {
            errors.push(`Template "${template.id}" default item "${item.id}" textKey "${item.textKey}" not found in en/prompts.json`);
          }
        }
      }
    }
  }

  // Check for unused templates
  const referencedTemplates = new Set<string>();
  function collectRefs(node: typeof bubbleTree) {
    if (node.promptTemplateId) referencedTemplates.add(node.promptTemplateId);
    if (node.children) node.children.forEach(collectRefs);
  }
  collectRefs(bubbleTree);

  for (const tid of templateIds) {
    if (!referencedTemplates.has(tid)) {
      warnings.push(`Template "${tid}" is not referenced by any bubble node`);
    }
  }

  // Print summary
  console.log('\n=== Data Validation Report ===\n');
  console.log(`Total bubble nodes: ${totalNodes}`);
  console.log(`Leaf nodes: ${leafNodes}`);
  console.log(`Prompt templates: ${promptTemplates.length}`);
  console.log(`Unique node IDs: ${ids.size}`);
  console.log(`Unique section IDs: ${templateSectionIds.size}`);

  if (warnings.length > 0) {
    console.log(`\n⚠ Warnings (${warnings.length}):`);
    for (const w of warnings) console.log(`  - ${w}`);
  }

  if (errors.length > 0) {
    console.log(`\n✗ Errors (${errors.length}):`);
    for (const e of errors) console.log(`  - ${e}`);
    process.exit(1);
  } else {
    console.log('\n✓ All validations passed!');
  }
}

main().catch((err) => {
  console.error('Validation failed:', err);
  process.exit(1);
});
