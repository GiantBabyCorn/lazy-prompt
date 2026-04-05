#!/usr/bin/env npx tsx
/**
 * CLI utility for reading data files without loading entire contents into context.
 *
 * Usage:
 *   npx tsx scripts/read-data.ts <target> <command> [...args]
 *
 * Targets: templates | tree | i18n
 *
 * === templates ===
 *   templates length                           → number of templates
 *   templates ids                              → list all template IDs
 *   templates keys <index|id>                  → keys of template at index/id
 *   templates get <index|id> [key] [key2...]   → get template or nested value
 *   templates sections <index|id>              → compact section summary
 *   templates spans <index|id>                 → list all editable spans with suggestions status
 *   templates search <regex>                   → find matches with template index & section info
 *   templates find <expression>                → find first template matching expression (e.g., "id=buildWebsite")
 *   templates filter <expression>              → filter templates matching expression
 *   templates map <expression>                 → map templates to extracted values
 *   templates every <expression>               → check if all match
 *   templates some <expression>                → check if any match
 *   templates findIndex <expression>           → find index of first match
 *   templates includes <id>                    → check if template with id exists
 *   templates reduce <expression> <init>       → reduce over templates
 *   templates forEach <expression>             → print expression result for each
 *
 * === tree ===
 *   tree path <dotPath>                        → navigate tree (e.g., "children.0.children.2")
 *   tree flat                                  → flat list of all nodes with depth & path
 *   tree leaves                                → list all leaf nodes (with promptTemplateId)
 *   tree branches                              → list all branch nodes (with children)
 *   tree find <expression>                     → find first node matching expression
 *   tree filter <expression>                   → filter all nodes matching expression
 *   tree search <regex>                        → search node IDs matching regex
 *
 * === i18n ===
 *   i18n <locale> keys [prefix]                → list keys (optionally under prefix)
 *   i18n <locale> get <dotPath>                → get value at path
 *   i18n <locale> search <regex>               → search values matching regex
 *   i18n <locale> missing <otherLocale>        → find keys in otherLocale missing from locale
 *   i18n <locale> length [prefix]              → count keys under prefix
 *
 * Expressions use "t" as the current item, e.g.:
 *   "t.id === 'buildWebsite'"
 *   "t.sections.length"
 *   "t.id"
 */

import type { BubbleNode, PromptTemplate } from '../src/data/types.ts';
import fs from 'fs';
import path from 'path';

const NULL_RESULT = JSON.stringify({ exists: false, value: null });

// --- Helpers ---

function resolve(obj: any, dotPath: string): any {
  const parts = dotPath.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = Array.isArray(cur) ? cur[Number(p)] : cur[p];
  }
  return cur;
}

function safeEval(expr: string, t: any): any {
  // eslint-disable-next-line no-new-func
  const fn = new Function('t', `return (${expr})`);
  return fn(t);
}

function compact(val: any, maxDepth = 2, depth = 0): any {
  if (val == null || typeof val !== 'object') return val;
  if (depth >= maxDepth) return Array.isArray(val) ? `[Array(${val.length})]` : '{...}';
  if (Array.isArray(val)) return val.map((v) => compact(v, maxDepth, depth + 1));
  const out: any = {};
  for (const [k, v] of Object.entries(val)) out[k] = compact(v, maxDepth, depth + 1);
  return out;
}

function flattenTree(node: BubbleNode, parentPath = '', depth = 0): Array<{ id: string; path: string; depth: number; isLeaf: boolean; promptTemplateId?: string; type: string }> {
  const nodePath = parentPath ? `${parentPath}.${node.id}` : node.id;
  const isLeaf = !node.children || node.children.length === 0;
  const result = [{ id: node.id, path: nodePath, depth, isLeaf, promptTemplateId: node.promptTemplateId, type: node.type }];
  if (node.children) {
    for (const child of node.children) {
      result.push(...flattenTree(child, nodePath, depth + 1));
    }
  }
  return result;
}

function flattenJson(obj: any, prefix = ''): Array<{ key: string; value: any }> {
  const result: Array<{ key: string; value: any }> = [];
  if (obj == null || typeof obj !== 'object') {
    result.push({ key: prefix, value: obj });
    return result;
  }
  if (Array.isArray(obj)) {
    result.push({ key: prefix, value: `[Array(${obj.length})]` });
    return result;
  }
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      result.push(...flattenJson(v, fullKey));
    } else {
      result.push({ key: fullKey, value: v });
    }
  }
  return result;
}

function loadI18n(locale: string): any {
  const filePath = path.resolve(`src/i18n/locales/${locale}/prompts.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`Locale file not found: ${filePath}`);
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function resolveTemplate(templates: PromptTemplate[], indexOrId: string): { template: PromptTemplate; index: number } | null {
  const num = Number(indexOrId);
  if (!isNaN(num) && num >= 0 && num < templates.length) {
    return { template: templates[num], index: num };
  }
  const idx = templates.findIndex((t) => t.id === indexOrId);
  if (idx >= 0) return { template: templates[idx], index: idx };
  return null;
}

// --- Main ---

async function main() {
  const [target, command, ...args] = process.argv.slice(2);

  if (!target || !command) {
    console.log('Usage: npx tsx scripts/read-data.ts <templates|tree|i18n> <command> [...args]');
    console.log('Run with --help for full docs (see top of script).');
    process.exit(0);
  }

  // === TEMPLATES ===
  if (target === 'templates') {
    const { loadAllTemplates } = await import('../src/data/templates/index.ts');
    const promptTemplates = await loadAllTemplates();

    switch (command) {
      case 'length':
        console.log(promptTemplates.length);
        break;

      case 'ids':
        console.log(JSON.stringify(promptTemplates.map((t) => t.id)));
        break;

      case 'keys': {
        const resolved = resolveTemplate(promptTemplates, args[0]);
        if (!resolved) { console.log(NULL_RESULT); break; }
        console.log(JSON.stringify(Object.keys(resolved.template)));
        break;
      }

      case 'get': {
        const resolved = resolveTemplate(promptTemplates, args[0]);
        if (!resolved) { console.log(NULL_RESULT); break; }
        let val: any = resolved.template;
        for (let i = 1; i < args.length; i++) {
          val = resolve(val, args[i]);
          if (val === undefined) { console.log(NULL_RESULT); break; }
        }
        if (val !== undefined) console.log(JSON.stringify(compact(val, 3), null, 2));
        break;
      }

      case 'sections': {
        const resolved = resolveTemplate(promptTemplates, args[0]);
        if (!resolved) { console.log(NULL_RESULT); break; }
        const summary = resolved.template.sections.map((s, i) => ({
          idx: i,
          id: s.id,
          textKey: s.textKey,
          type: s.type,
          spans: s.editableSpans?.map((sp) => sp.id) || [],
          items: s.defaultItems?.length || 0,
        }));
        console.log(JSON.stringify(summary, null, 2));
        break;
      }

      case 'spans': {
        const resolved = resolveTemplate(promptTemplates, args[0]);
        if (!resolved) { console.log(NULL_RESULT); break; }
        const spans = resolved.template.sections.flatMap((s) =>
          (s.editableSpans || []).map((sp) => ({
            id: sp.id,
            section: s.id,
            placeholder: sp.placeholder,
            color: sp.color,
            inputType: sp.inputType || 'text',
            hasSuggestions: !!(sp.suggestions && sp.suggestions.length > 0),
            suggestionsCount: sp.suggestions?.length || 0,
          }))
        );
        console.log(JSON.stringify(spans, null, 2));
        break;
      }

      case 'search': {
        const regex = new RegExp(args[0], 'gi');
        const results: any[] = [];
        promptTemplates.forEach((t, ti) => {
          const str = JSON.stringify(t);
          let match;
          while ((match = regex.exec(str)) !== null) {
            results.push({ templateIndex: ti, templateId: t.id, position: match.index, match: match[0], context: str.slice(Math.max(0, match.index - 30), match.index + match[0].length + 30) });
          }
        });
        console.log(JSON.stringify(results, null, 2));
        break;
      }

      case 'find': {
        const found = promptTemplates.find((t) => safeEval(args[0], t));
        console.log(found ? JSON.stringify({ id: found.id, sections: found.sections.length }) : NULL_RESULT);
        break;
      }

      case 'filter': {
        const filtered = promptTemplates.filter((t) => safeEval(args[0], t));
        console.log(JSON.stringify(filtered.map((t) => ({ id: t.id, sections: t.sections.length }))));
        break;
      }

      case 'map': {
        const mapped = promptTemplates.map((t) => safeEval(args[0], t));
        console.log(JSON.stringify(mapped));
        break;
      }

      case 'every': {
        console.log(promptTemplates.every((t) => safeEval(args[0], t)));
        break;
      }

      case 'some': {
        console.log(promptTemplates.some((t) => safeEval(args[0], t)));
        break;
      }

      case 'findIndex': {
        console.log(promptTemplates.findIndex((t) => safeEval(args[0], t)));
        break;
      }

      case 'includes': {
        console.log(promptTemplates.some((t) => t.id === args[0]));
        break;
      }

      case 'forEach': {
        promptTemplates.forEach((t, i) => {
          const val = safeEval(args[0], t);
          console.log(`[${i}] ${t.id}: ${JSON.stringify(val)}`);
        });
        break;
      }

      case 'reduce': {
        const result = promptTemplates.reduce((acc, t) => {
          // eslint-disable-next-line no-new-func
          return new Function('acc', 't', `return (${args[0]})`)(acc, t);
        }, JSON.parse(args[1] || '0'));
        console.log(JSON.stringify(result));
        break;
      }

      default:
        console.error(`Unknown templates command: ${command}`);
        process.exit(1);
    }
  }

  // === TREE ===
  else if (target === 'tree') {
    const { bubbleTree } = await import('../src/data/bubbleTree.ts');

    switch (command) {
      case 'path': {
        const val = resolve(bubbleTree, args[0]);
        if (val === undefined) { console.log(NULL_RESULT); break; }
        console.log(JSON.stringify(compact(val, 2), null, 2));
        break;
      }

      case 'flat': {
        const flat = flattenTree(bubbleTree);
        console.log(JSON.stringify(flat, null, 2));
        break;
      }

      case 'leaves': {
        const flat = flattenTree(bubbleTree);
        const leaves = flat.filter((n) => n.isLeaf);
        console.log(JSON.stringify(leaves, null, 2));
        break;
      }

      case 'branches': {
        const flat = flattenTree(bubbleTree);
        const branches = flat.filter((n) => !n.isLeaf);
        console.log(JSON.stringify(branches, null, 2));
        break;
      }

      case 'find': {
        const flat = flattenTree(bubbleTree);
        const found = flat.find((n) => safeEval(args[0], n));
        console.log(found ? JSON.stringify(found) : NULL_RESULT);
        break;
      }

      case 'filter': {
        const flat = flattenTree(bubbleTree);
        const filtered = flat.filter((n) => safeEval(args[0], n));
        console.log(JSON.stringify(filtered, null, 2));
        break;
      }

      case 'search': {
        const regex = new RegExp(args[0], 'gi');
        const flat = flattenTree(bubbleTree);
        const matches = flat.filter((n) => regex.test(n.id));
        console.log(JSON.stringify(matches, null, 2));
        break;
      }

      default:
        console.error(`Unknown tree command: ${command}`);
        process.exit(1);
    }
  }

  // === I18N ===
  else if (target === 'i18n') {
    const locale = command; // first arg after "i18n" is the locale
    const subCmd = args[0];
    const subArgs = args.slice(1);

    if (!subCmd) {
      console.log('Usage: npx tsx scripts/read-data.ts i18n <locale> <keys|get|search|missing|length> [...args]');
      process.exit(0);
    }

    const data = loadI18n(locale);

    switch (subCmd) {
      case 'keys': {
        const prefix = subArgs[0];
        const flat = flattenJson(data);
        const keys = prefix ? flat.filter((e) => e.key.startsWith(prefix)).map((e) => e.key) : flat.map((e) => e.key);
        console.log(JSON.stringify(keys, null, 2));
        break;
      }

      case 'get': {
        const val = resolve(data, subArgs[0]);
        if (val === undefined) { console.log(NULL_RESULT); break; }
        console.log(JSON.stringify(val, null, 2));
        break;
      }

      case 'search': {
        const regex = new RegExp(subArgs[0], 'gi');
        const flat = flattenJson(data);
        const matches = flat.filter((e) => typeof e.value === 'string' && regex.test(e.value));
        console.log(JSON.stringify(matches, null, 2));
        break;
      }

      case 'missing': {
        const otherLocale = subArgs[0];
        const otherData = loadI18n(otherLocale);
        const thisKeys = new Set(flattenJson(data).map((e) => e.key));
        const otherKeys = flattenJson(otherData).map((e) => e.key);
        const missing = otherKeys.filter((k) => !thisKeys.has(k));
        console.log(JSON.stringify(missing, null, 2));
        break;
      }

      case 'length': {
        const prefix = subArgs[0];
        const flat = flattenJson(data);
        const count = prefix ? flat.filter((e) => e.key.startsWith(prefix)).length : flat.length;
        console.log(count);
        break;
      }

      default:
        console.error(`Unknown i18n command: ${subCmd}`);
        process.exit(1);
    }
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
