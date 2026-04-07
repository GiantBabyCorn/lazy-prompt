#!/usr/bin/env npx tsx
/**
 * compare-i18n.ts — Deep-compare all i18n locale files against English (reference).
 *
 * Usage:
 *   npx tsx scripts/compare-i18n.ts            # compare all locales vs en
 *   npx tsx scripts/compare-i18n.ts zh-TW      # compare only zh-TW vs en
 *   npx tsx scripts/compare-i18n.ts --fix       # auto-copy missing keys from en (placeholder)
 *
 * Checks:
 *   1. Missing keys (exist in en but not in target)
 *   2. Extra keys (exist in target but not in en)
 *   3. Duplicate JSON keys within the same file
 *   4. Type mismatches (string vs object vs array)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = path.resolve(__dirname, '../src/i18n/locales');
const REFERENCE_LOCALE = 'en';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Flatten a nested object into dot-separated keys. */
function flattenKeys(obj: unknown, prefix = ''): Map<string, unknown> {
  const result = new Map<string, unknown>();
  if (obj === null || obj === undefined) return result;
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    result.set(prefix, obj);
    return result;
  }
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      for (const [k, v] of flattenKeys(value, fullKey)) {
        result.set(k, v);
      }
    } else {
      result.set(fullKey, value);
    }
  }
  return result;
}

/** Check for duplicate keys by parsing raw JSON text. */
function findDuplicateKeys(jsonText: string, filePath: string): string[] {
  const duplicates: string[] = [];
  const seen = new Map<string, number>();

  // Simple regex-based approach: find all "key": patterns at each nesting level
  // For a proper check, track nesting depth
  const lines = jsonText.split('\n');
  const stack: Map<string, number>[] = [new Map()];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Track nesting
    if (line.includes('{')) {
      stack.push(new Map());
    }
    // Match "key":
    const match = line.match(/^\s*"([^"]+)"\s*:/);
    if (match) {
      const key = match[1];
      const currentLevel = stack[stack.length - 1];
      const prevLine = currentLevel.get(key);
      if (prevLine !== undefined) {
        duplicates.push(`  "${key}" appears at lines ${prevLine + 1} and ${i + 1}`);
      }
      currentLevel.set(key, i);
    }
    if (line.includes('}') && stack.length > 1) {
      stack.pop();
    }
  }

  return duplicates;
}

/** Get a nested value from an object by dot path. */
function getNestedValue(obj: Record<string, unknown>, dotPath: string): unknown {
  const parts = dotPath.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Set a nested value in an object by dot path. */
function setNestedValue(obj: Record<string, unknown>, dotPath: string, value: unknown): void {
  const parts = dotPath.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!(parts[i] in current) || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {};
    }
    current = current[parts[i]] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

function main() {
  const args = process.argv.slice(2);
  const fixMode = args.includes('--fix');
  const filterLocale = args.find(a => !a.startsWith('--'));

  // Discover locales
  const allLocales = fs.readdirSync(LOCALES_DIR)
    .filter(d => fs.statSync(path.join(LOCALES_DIR, d)).isDirectory() && d !== REFERENCE_LOCALE);

  const targetLocales = filterLocale
    ? allLocales.filter(l => l === filterLocale)
    : allLocales;

  if (filterLocale && targetLocales.length === 0) {
    console.error(`Locale "${filterLocale}" not found. Available: ${allLocales.join(', ')}`);
    process.exit(1);
  }

  // Discover all JSON files in reference locale
  const refDir = path.join(LOCALES_DIR, REFERENCE_LOCALE);
  const jsonFiles = fs.readdirSync(refDir).filter(f => f.endsWith('.json'));

  let totalMissing = 0;
  let totalExtra = 0;
  let totalDuplicates = 0;
  let totalTypeMismatch = 0;
  let totalFixed = 0;

  console.log(`\n  i18n Comparison: ${REFERENCE_LOCALE} (reference) → [${targetLocales.join(', ')}]\n`);
  console.log('─'.repeat(70));

  // Check reference files for duplicates too
  for (const file of jsonFiles) {
    const refPath = path.join(refDir, file);
    const refText = fs.readFileSync(refPath, 'utf-8');
    const dups = findDuplicateKeys(refText, refPath);
    if (dups.length > 0) {
      console.log(`\n  ⚠ DUPLICATE KEYS in ${REFERENCE_LOCALE}/${file}:`);
      dups.forEach(d => console.log(`    ${d}`));
      totalDuplicates += dups.length;
    }
  }

  for (const locale of targetLocales) {
    const localeDir = path.join(LOCALES_DIR, locale);
    console.log(`\n  ── ${locale} ${'─'.repeat(60 - locale.length)}`);

    let localeMissing = 0;
    let localeExtra = 0;

    for (const file of jsonFiles) {
      const refPath = path.join(refDir, file);
      const targetPath = path.join(localeDir, file);

      // Check if file exists
      if (!fs.existsSync(targetPath)) {
        console.log(`\n    ✗ ${file} — FILE MISSING`);
        const refFlat = flattenKeys(JSON.parse(fs.readFileSync(refPath, 'utf-8')));
        localeMissing += refFlat.size;
        if (fixMode) {
          fs.copyFileSync(refPath, targetPath);
          console.log(`      → copied from ${REFERENCE_LOCALE} (needs translation)`);
          totalFixed += refFlat.size;
        }
        continue;
      }

      const refText = fs.readFileSync(refPath, 'utf-8');
      const targetText = fs.readFileSync(targetPath, 'utf-8');

      // Check for duplicate keys in target
      const dups = findDuplicateKeys(targetText, targetPath);
      if (dups.length > 0) {
        console.log(`\n    ⚠ DUPLICATE KEYS in ${file}:`);
        dups.forEach(d => console.log(`      ${d}`));
        totalDuplicates += dups.length;
      }

      const refObj = JSON.parse(refText);
      const targetObj = JSON.parse(targetText);
      const refFlat = flattenKeys(refObj);
      const targetFlat = flattenKeys(targetObj);

      const missing: string[] = [];
      const extra: string[] = [];
      const typeMismatch: string[] = [];

      // Find missing keys
      for (const [key, refValue] of refFlat) {
        if (!targetFlat.has(key)) {
          missing.push(key);
        } else {
          // Type check
          const targetValue = targetFlat.get(key);
          const refType = Array.isArray(refValue) ? 'array' : typeof refValue;
          const targetType = Array.isArray(targetValue) ? 'array' : typeof targetValue;
          if (refType !== targetType) {
            typeMismatch.push(`${key}: en=${refType}, ${locale}=${targetType}`);
          }
        }
      }

      // Find extra keys
      for (const key of targetFlat.keys()) {
        if (!refFlat.has(key)) {
          extra.push(key);
        }
      }

      if (missing.length === 0 && extra.length === 0 && typeMismatch.length === 0) {
        console.log(`    ✓ ${file} — ${targetFlat.size} keys OK`);
      } else {
        console.log(`\n    ${file}:`);
      }

      if (missing.length > 0) {
        console.log(`      MISSING (${missing.length}):`);
        for (const key of missing) {
          const enValue = refFlat.get(key);
          const display = typeof enValue === 'string'
            ? enValue.length > 50 ? enValue.slice(0, 50) + '...' : enValue
            : JSON.stringify(enValue);
          console.log(`        - ${key}  (en: "${display}")`);
        }

        if (fixMode) {
          for (const key of missing) {
            const enValue = getNestedValue(refObj, key);
            setNestedValue(targetObj, key, enValue);
          }
          fs.writeFileSync(targetPath, JSON.stringify(targetObj, null, 2) + '\n', 'utf-8');
          console.log(`      → ${missing.length} keys copied from en (need translation)`);
          totalFixed += missing.length;
        }
      }

      if (extra.length > 0) {
        console.log(`      EXTRA (${extra.length}):`);
        for (const key of extra) {
          console.log(`        + ${key}`);
        }
      }

      if (typeMismatch.length > 0) {
        console.log(`      TYPE MISMATCH (${typeMismatch.length}):`);
        for (const m of typeMismatch) {
          console.log(`        ~ ${m}`);
        }
      }

      localeMissing += missing.length;
      localeExtra += extra.length;
      totalTypeMismatch += typeMismatch.length;
    }

    // Check for extra files in target that don't exist in reference
    const targetFiles = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
    const extraFiles = targetFiles.filter(f => !jsonFiles.includes(f));
    if (extraFiles.length > 0) {
      console.log(`\n    EXTRA FILES: ${extraFiles.join(', ')}`);
    }

    totalMissing += localeMissing;
    totalExtra += localeExtra;
  }

  // Summary
  console.log('\n' + '─'.repeat(70));
  console.log('\n  Summary:');
  console.log(`    Missing keys:    ${totalMissing}`);
  console.log(`    Extra keys:      ${totalExtra}`);
  console.log(`    Duplicate keys:  ${totalDuplicates}`);
  console.log(`    Type mismatches: ${totalTypeMismatch}`);
  if (fixMode) {
    console.log(`    Auto-fixed:      ${totalFixed} (copied from en — needs translation)`);
  }
  console.log();

  if (totalMissing > 0 || totalDuplicates > 0 || totalTypeMismatch > 0) {
    if (!fixMode) {
      console.log('  Tip: run with --fix to auto-copy missing keys from English.\n');
    }
    process.exit(1);
  }
}

main();
