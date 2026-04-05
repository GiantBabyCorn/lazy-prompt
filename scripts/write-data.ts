#!/usr/bin/env npx tsx
/**
 * CLI utility for writing/modifying data files without loading entire contents into context.
 *
 * Usage:
 *   npx tsx scripts/write-data.ts <target> <command> [...args]
 *
 * Targets: templates | tree | i18n
 *
 * === templates ===
 *   templates push <jsonFile|json>                        → append a template
 *   templates push-many <jsonFile>                        → append multiple templates from JSON array file
 *   templates pop                                         → remove last template
 *   templates unshift <jsonFile|json>                     → prepend a template
 *   templates shift                                       → remove first template
 *   templates splice <index> <deleteCount> [jsonFile]     → splice templates
 *   templates set <index|id> <dotPath> <value>            → set a nested value on a template
 *   templates set-json <index|id> <dotPath> <jsonFile|json> → set a nested value as parsed JSON
 *   templates remove <index|id>                           → remove template by index or id
 *   templates sort <expression>                           → sort templates by expression
 *   templates replace <index|id> <jsonFile|json>          → replace entire template
 *   templates replace-all <jsonFile>                      → replace ALL templates from JSON array file
 *   templates insert-after <index|id> <jsonFile|json>     → insert template after specified position
 *   templates merge <index|id> <jsonFile|json>            → spread/merge JSON into existing template
 *
 * === tree ===
 *   tree set <dotPath> <value>                            → set value at path
 *   tree set-json <dotPath> <jsonFile|json>               → set parsed JSON at path
 *   tree add-child <parentDotPath> <jsonFile|json>        → add child node
 *   tree remove-child <parentDotPath> <childIndex>        → remove child at index
 *   tree replace-node <dotPath> <jsonFile|json>           → replace node at path
 *
 * === i18n ===
 *   i18n <locale> set <dotPath> <value>                   → set string value
 *   i18n <locale> set-json <dotPath> <jsonFile|json>      → set parsed JSON value
 *   i18n <locale> delete <dotPath>                        → delete key
 *   i18n <locale> merge <jsonFile|json>                   → deep merge JSON into locale
 *   i18n <locale> copy-from <srcLocale> <dotPath>         → copy value from another locale
 *   i18n <locale> rename <oldPath> <newPath>              → rename a key
 *   i18n <locale> bulk-set <jsonFile>                     → set multiple keys from {key: value} JSON
 *
 * JSON arguments: if the value starts with '{' or '[' it's parsed as inline JSON.
 *   Otherwise it's treated as a file path. Use "-" for stdin.
 *
 * All writes are atomic (read → modify → write entire file).
 */

import fs from 'fs';
import path from 'path';

// --- File Paths ---
const TEMPLATES_DIR = path.resolve('src/data/templates');
const TREE_PATH = path.resolve('src/data/bubbleTree.ts');
const i18nPath = (locale: string) => path.resolve(`src/i18n/locales/${locale}/prompts.json`);

const CATEGORIES = ['build', 'translation', 'read', 'write', 'debug', 'explain', 'brainstorm', 'learn', 'organize', 'summarize'];

function getCategoryForId(templateId: string): string {
  const lower = templateId.toLowerCase();
  for (const cat of CATEGORIES) {
    if (lower.startsWith(cat)) return cat;
  }
  return 'build';
}

function categoryPath(cat: string): string {
  return path.join(TEMPLATES_DIR, `${cat}.ts`);
}

// --- Helpers ---

function parseJsonArg(arg: string): any {
  if (arg === '-') {
    return JSON.parse(fs.readFileSync('/dev/stdin', 'utf-8'));
  }
  if (arg.startsWith('{') || arg.startsWith('[') || arg.startsWith('"')) {
    return JSON.parse(arg);
  }
  // treat as file path
  const filePath = path.resolve(arg);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function resolve(obj: any, dotPath: string): any {
  const parts = dotPath.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) ? cur[Number(p)] : cur[p];
  }
  return cur;
}

function setNested(obj: any, dotPath: string, value: any): void {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = Array.isArray(cur) ? cur[Number(p)] : cur[p];
    if (next == null) {
      const newObj = /^\d+$/.test(parts[i + 1]) ? [] : {};
      if (Array.isArray(cur)) cur[Number(p)] = newObj;
      else cur[p] = newObj;
      cur = newObj;
    } else {
      cur = next;
    }
  }
  const lastKey = parts[parts.length - 1];
  if (Array.isArray(cur)) cur[Number(lastKey)] = value;
  else cur[lastKey] = value;
}

function deleteNested(obj: any, dotPath: string): boolean {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur?.[parts[i]];
    if (cur == null) return false;
  }
  const lastKey = parts[parts.length - 1];
  if (Array.isArray(cur)) {
    cur.splice(Number(lastKey), 1);
  } else if (typeof cur === 'object') {
    delete cur[lastKey];
  }
  return true;
}

function deepMerge(target: any, source: any): any {
  if (typeof source !== 'object' || source === null) return source;
  if (Array.isArray(source)) return source;
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

// --- TS File Read/Write ---
// We parse the TS file to extract the JSON-like data, modify it, then write back.

async function readTemplatesTs(): Promise<any[]> {
  const { loadAllTemplates } = await import('../src/data/templates/index.ts');
  return await loadAllTemplates();
}

async function readCategoryTs(cat: string): Promise<any[]> {
  const mod = await import(`../src/data/templates/${cat}.ts`);
  return JSON.parse(JSON.stringify(mod.default));
}

function writeCategoryTs(cat: string, templates: any[]): void {
  const jsonStr = JSON.stringify(templates, null, 2);
  const content = `import type { PromptTemplate } from '../types';\n\nconst templates: PromptTemplate[] = ${jsonStr};\n\nexport default templates;\n`;
  fs.writeFileSync(categoryPath(cat), content, 'utf-8');
}

/** Write all templates — groups by category and writes each category file. */
function writeTemplatesTs(templates: any[]): void {
  const byCategory = new Map<string, any[]>();
  for (const cat of CATEGORIES) byCategory.set(cat, []);
  for (const t of templates) {
    const cat = getCategoryForId(t.id);
    byCategory.get(cat)!.push(t);
  }
  for (const [cat, catTemplates] of byCategory) {
    if (catTemplates.length > 0) {
      writeCategoryTs(cat, catTemplates);
    }
  }
}

async function readTreeTs(): Promise<any> {
  const mod = await import('../src/data/bubbleTree.ts');
  return JSON.parse(JSON.stringify(mod.bubbleTree));
}

function writeTreeTs(tree: any): void {
  const jsonStr = JSON.stringify(tree, null, 2);
  const tsStr = jsonStr
    .replace(/(\}|\])\n(\s+)(\{|\[)/g, '$1,\n$2$3')
    .replace(/(["}\]\d])\n(\s+)(")/g, '$1,\n$2$3')
    .replace(/(\btrue\b|\bfalse\b|\bnull\b)\n(\s+)(")/g, '$1,\n$2$3');

  const content = `import type { BubbleNode } from './types';\n\nexport const bubbleTree: BubbleNode = ${tsStr};\n`;
  fs.writeFileSync(TREE_PATH, content, 'utf-8');
}

function readI18n(locale: string): any {
  const filePath = i18nPath(locale);
  if (!fs.existsSync(filePath)) throw new Error(`Locale not found: ${locale}`);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeI18n(locale: string, data: any): void {
  fs.writeFileSync(i18nPath(locale), JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

function resolveTemplateIndex(templates: any[], indexOrId: string): number {
  const num = Number(indexOrId);
  if (!isNaN(num) && num >= 0 && num < templates.length) return num;
  const idx = templates.findIndex((t: any) => t.id === indexOrId);
  if (idx === -1) throw new Error(`Template not found: ${indexOrId}`);
  return idx;
}

// --- Main ---

async function main() {
  const [target, command, ...args] = process.argv.slice(2);

  if (!target || !command) {
    console.log('Usage: npx tsx scripts/write-data.ts <templates|tree|i18n> <command> [...args]');
    process.exit(0);
  }

  // === TEMPLATES ===
  if (target === 'templates') {
    const templates = await readTemplatesTs();

    switch (command) {
      case 'push': {
        const item = parseJsonArg(args[0]);
        templates.push(item);
        break;
      }
      case 'push-many': {
        const items = parseJsonArg(args[0]);
        if (!Array.isArray(items)) throw new Error('Expected JSON array');
        templates.push(...items);
        break;
      }
      case 'pop': {
        const removed = templates.pop();
        console.log(`Removed: ${removed?.id || 'empty'}`);
        break;
      }
      case 'unshift': {
        const item = parseJsonArg(args[0]);
        templates.unshift(item);
        break;
      }
      case 'shift': {
        const removed = templates.shift();
        console.log(`Removed: ${removed?.id || 'empty'}`);
        break;
      }
      case 'splice': {
        const idx = Number(args[0]);
        const delCount = Number(args[1]);
        const newItems = args[2] ? parseJsonArg(args[2]) : [];
        const items = Array.isArray(newItems) ? newItems : [newItems];
        const removed = templates.splice(idx, delCount, ...items);
        console.log(`Removed ${removed.length}, inserted ${items.length}`);
        break;
      }
      case 'set': {
        const idx = resolveTemplateIndex(templates, args[0]);
        setNested(templates[idx], args[1], args[2]);
        break;
      }
      case 'set-json': {
        const idx = resolveTemplateIndex(templates, args[0]);
        const val = parseJsonArg(args[2]);
        setNested(templates[idx], args[1], val);
        break;
      }
      case 'remove': {
        const idx = resolveTemplateIndex(templates, args[0]);
        templates.splice(idx, 1);
        console.log(`Removed template at index ${idx}`);
        break;
      }
      case 'sort': {
        templates.sort((a: any, b: any) => {
          const va = new Function('t', `return (${args[0]})`)(a);
          const vb = new Function('t', `return (${args[0]})`)(b);
          return va < vb ? -1 : va > vb ? 1 : 0;
        });
        break;
      }
      case 'replace': {
        const idx = resolveTemplateIndex(templates, args[0]);
        const item = parseJsonArg(args[1]);
        templates[idx] = item;
        break;
      }
      case 'replace-all': {
        const items = parseJsonArg(args[0]);
        if (!Array.isArray(items)) throw new Error('Expected JSON array');
        templates.length = 0;
        templates.push(...items);
        break;
      }
      case 'insert-after': {
        const idx = resolveTemplateIndex(templates, args[0]);
        const item = parseJsonArg(args[1]);
        const items = Array.isArray(item) ? item : [item];
        templates.splice(idx + 1, 0, ...items);
        break;
      }
      case 'merge': {
        const idx = resolveTemplateIndex(templates, args[0]);
        const patch = parseJsonArg(args[1]);
        templates[idx] = { ...templates[idx], ...patch };
        break;
      }
      default:
        console.error(`Unknown templates command: ${command}`);
        process.exit(1);
    }

    writeTemplatesTs(templates);
    console.log(`OK. Templates count: ${templates.length}`);
  }

  // === TREE ===
  else if (target === 'tree') {
    const tree = await readTreeTs();

    switch (command) {
      case 'set': {
        setNested(tree, args[0], args[1]);
        break;
      }
      case 'set-json': {
        const val = parseJsonArg(args[1]);
        setNested(tree, args[0], val);
        break;
      }
      case 'add-child': {
        const parent = resolve(tree, args[0]);
        if (!parent) throw new Error(`Path not found: ${args[0]}`);
        if (!parent.children) parent.children = [];
        const child = parseJsonArg(args[1]);
        parent.children.push(child);
        break;
      }
      case 'remove-child': {
        const parent = resolve(tree, args[0]);
        if (!parent?.children) throw new Error(`No children at: ${args[0]}`);
        parent.children.splice(Number(args[1]), 1);
        break;
      }
      case 'replace-node': {
        const parts = args[0].split('.');
        const parentPath = parts.slice(0, -1).join('.');
        const lastKey = parts[parts.length - 1];
        const parent = parentPath ? resolve(tree, parentPath) : tree;
        if (!parent) throw new Error(`Path not found: ${parentPath}`);
        const val = parseJsonArg(args[1]);
        if (Array.isArray(parent)) parent[Number(lastKey)] = val;
        else parent[lastKey] = val;
        break;
      }
      default:
        console.error(`Unknown tree command: ${command}`);
        process.exit(1);
    }

    writeTreeTs(tree);
    console.log('OK. Tree updated.');
  }

  // === I18N ===
  else if (target === 'i18n') {
    const locale = command;
    const subCmd = args[0];
    const subArgs = args.slice(1);

    if (!subCmd) {
      console.log('Usage: npx tsx scripts/write-data.ts i18n <locale> <set|set-json|delete|merge|copy-from|rename|bulk-set> [...args]');
      process.exit(0);
    }

    const data = readI18n(locale);

    switch (subCmd) {
      case 'set': {
        setNested(data, subArgs[0], subArgs[1]);
        break;
      }
      case 'set-json': {
        const val = parseJsonArg(subArgs[1]);
        setNested(data, subArgs[0], val);
        break;
      }
      case 'delete': {
        deleteNested(data, subArgs[0]);
        break;
      }
      case 'merge': {
        const patch = parseJsonArg(subArgs[0]);
        const merged = deepMerge(data, patch);
        writeI18n(locale, merged);
        console.log(`OK. Merged into ${locale}.`);
        return;
      }
      case 'copy-from': {
        const srcData = readI18n(subArgs[0]);
        const val = resolve(srcData, subArgs[1]);
        if (val === undefined) throw new Error(`Key not found in ${subArgs[0]}: ${subArgs[1]}`);
        setNested(data, subArgs[1], val);
        break;
      }
      case 'rename': {
        const val = resolve(data, subArgs[0]);
        if (val === undefined) throw new Error(`Key not found: ${subArgs[0]}`);
        deleteNested(data, subArgs[0]);
        setNested(data, subArgs[1], val);
        break;
      }
      case 'bulk-set': {
        const entries = parseJsonArg(subArgs[0]);
        if (typeof entries !== 'object' || Array.isArray(entries)) throw new Error('Expected {key: value} object');
        for (const [key, value] of Object.entries(entries)) {
          setNested(data, key, value);
        }
        break;
      }
      default:
        console.error(`Unknown i18n command: ${subCmd}`);
        process.exit(1);
    }

    writeI18n(locale, data);
    console.log(`OK. ${locale} updated.`);
  }

  else {
    console.error(`Unknown target: ${target}. Use: templates, tree, i18n`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
