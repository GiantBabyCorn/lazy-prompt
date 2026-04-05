# CLAUDE.md

## Project Overview

Lazy Prompt — an interactive bubble-based web app that helps users build detailed, well-structured AI prompts quickly. Users navigate through visual bubble layers (categories → sub-categories → leaf) until their intent is clear, then the app generates a rich, editable prompt they can copy or send directly to AI providers.

**Live URL:** https://lazy-prompt.giantbabycorn.finance/

## Tech Stack

- **React 19** + **React Router 7** — component-based SPA with client-side routing
- **Vite 6** — build tool with hot module replacement
- **TypeScript** — type safety throughout
- **framer-motion** — spring-based morph animations for bubble transitions
- **i18next** — internationalization (6 languages: en, zh-CN, zh-TW, ja, ko, es)
- **CSS custom properties** — dark/light theming (no CSS framework)

## Project Structure

```
index.html              # Vite entry point with SEO meta tags + JSON-LD + OG tags
vite.config.ts          # Vite configuration
package.json            # Dependencies and npm scripts
CLAUDE.md               # THIS FILE — project-level agent instructions
LICENSE                 # MIT License
README.md               # Project documentation
.claude/
  settings.json         # Agent permissions
  commands/
    check-progress.md   # Progress checking command
public/
  logo.svg              # Logo and favicon
  og-image.png          # Open Graph preview image (1200x630)
scripts/
  add-bubble.ts         # CLI: add a new bubble node
  edit-bubble.ts        # CLI: edit an existing bubble node
  delete-bubble.ts      # CLI: remove a bubble node
  add-template.ts       # CLI: add a new prompt template
  edit-template.ts      # CLI: edit an existing prompt template
  list-data.ts          # CLI: list bubbles/templates with tree view
  validate-data.ts      # CLI: validate bubble tree + template integrity
  read-data.ts          # CLI: query data files without reading entire files
  write-data.ts         # CLI: modify data files via targeted operations
  generate-og-image.ts  # Generate OG preview image from SVG template
src/
  main.tsx              # React entry point, BrowserRouter + i18n setup
  App.tsx               # Root layout: ThemeProvider + routes (/*, /about)
  App.css               # Global styles, CSS custom properties, theme vars
  i18n/
    config.ts           # i18next setup (lazy-loaded locales)
    locales/            # 6 language directories, each with:
                        #   common.json — UI labels
                        #   prompts.json — navigation labels (categories, subcategories)
                        #   prompts-{category}.json — template text per category (lazy-loaded)
  contexts/
    ThemeContext.tsx     # Dark/light theme with localStorage persistence
  hooks/
    useDocumentHead.ts  # Dynamic <title>/<meta> for SEO
    useClipboard.ts     # Copy to clipboard utility
    useBubbleNavigation.ts  # Navigate bubble tree layers, track path, URL sync
  components/
    Header.tsx          # Logo, breadcrumb navigation, language/theme controls
    BubbleCanvas.tsx    # SVG canvas with radial bubble layout + morph animations
    BubbleNode.tsx      # Individual bubble (SVG circle + label + leaf tooltip)
    BubbleList.tsx      # List-based navigation (alternative view mode)
    GoBackButton.tsx    # (unused; go-back is inline in BubbleCanvas)
    PromptResult.tsx    # Prompt display with toggle hide/show, editable fields
    EditableText.tsx    # Inline-editable spans (text/number/date/time/labels + autocomplete)
    CopyButton.tsx      # Copy prompt to clipboard
    AIProviderLinks.tsx # Send-to buttons (copy+open fallback for Gemini/Copilot)
    AddItemButton.tsx   # "Click to add" for extensible prompt lists
    LanguageSelector.tsx # i18n language switcher
    ThemeToggle.tsx     # Dark/light theme switch
  pages/
    HomePage.tsx        # Main bubble navigation + prompt result (route: /*)
    AboutPage.tsx       # About page with social links (route: /about)
  data/
    types.ts            # TypeScript interfaces (BubbleNode, PromptTemplate, EditableSpan, etc.)
    bubbleTree.ts       # Complete bubble tree data structure (124 nodes)
    templates/          # Prompt templates split by category (lazy-loaded)
      index.ts          # Registry: loadTemplate(), loadAllTemplates(), getCategory()
      build.ts          # 10 build templates
      translation.ts    # 5 translation templates
      read.ts           # 9 read templates
      write.ts          # 10 write templates
      debug.ts          # 8 debug templates
      explain.ts        # 8 explain templates
      brainstorm.ts     # 10 brainstorm templates
      learn.ts          # 10 learn templates
      organize.ts       # 10 organize templates
      summarize.ts      # 8 summarize templates
  utils/
    aiProviders.ts      # AI provider definitions with SVG icons
    promptBuilder.ts    # Assembles final prompt from selections (respects hidden sections/items)
    bubbleRouting.ts    # URL ↔ navigationPath conversion for breadcrumb routing
  assets/
    icons/              # SVG icons: chatgpt, claude, gemini, perplexity, copilot, x, telegram, github
```

## CLI Scripts

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # ESLint
npm run add-bubble       # Add a new bubble node to the tree
npm run edit-bubble      # Edit an existing bubble node
npm run delete-bubble    # Remove a bubble node
npm run add-template     # Add a new prompt template (auto-detects category file)
npm run edit-template    # Edit an existing prompt template
npm run list-data        # List bubbles/templates with tree view
npm run validate         # Validate bubble tree + template integrity
npm run read-data        # Query data files (templates, tree, i18n) — see below
npm run write-data       # Modify data files via targeted operations — see below
```

### read-data & write-data CLI (for agents and bulk operations)

These scripts allow querying and modifying data without reading entire files:

```bash
# --- READ ---
npx tsx scripts/read-data.ts templates length          # → 65
npx tsx scripts/read-data.ts templates ids             # → ["buildWebsite", ...]
npx tsx scripts/read-data.ts templates sections buildWebsite  # → compact section list
npx tsx scripts/read-data.ts templates spans buildWebsite     # → editable span details
npx tsx scripts/read-data.ts tree leaves               # → all leaf nodes with template IDs
npx tsx scripts/read-data.ts tree search "read"        # → nodes matching regex
npx tsx scripts/read-data.ts i18n en get templates.buildWebsite  # → i18n content
npx tsx scripts/read-data.ts i18n zh-TW missing en     # → keys missing vs English

# --- WRITE ---
npx tsx scripts/write-data.ts templates push '{"id":"newTemplate","sections":[]}'
npx tsx scripts/write-data.ts templates remove templateId
npx tsx scripts/write-data.ts templates set templateId sections.0.id newId
npx tsx scripts/write-data.ts i18n en set-json 'templates.newTemplate' '{"line1":"..."}'
npx tsx scripts/write-data.ts i18n zh-TW merge /tmp/translations.json
npx tsx scripts/write-data.ts tree set-json 'children.0' '{"id":"..."}'
```

## Data Model

### BubbleNode
```typescript
{
  id: string;                        // Unique identifier (e.g., "build-website")
  labelKey: string;                  // i18n key for display label
  descriptionKeys?: string[];        // i18n keys for sub-items shown under bubble
  type: 'primary' | 'secondary';    // primary = larger/prominent, secondary = smaller
  children?: BubbleNode[];           // Next layer (undefined = leaf node)
  promptTemplateId?: string;         // For leaf nodes: which template to use
  templateOverrides?: Record<string, string>;  // Pre-fill editable spans by ID
}
```

### PromptTemplate
```typescript
{
  id: string;
  sections: PromptSection[];        // Ordered list of prompt lines
}
```

### PromptSection
```typescript
{
  id: string;
  textKey: string;                   // i18n key for the line text
  type: 'fixed' | 'extensible';     // extensible = has default items + user can add more
  editableSpans?: EditableSpan[];    // Inline editable colored fields
  defaultItems?: PromptDefaultItem[];// For extensible: bullet-point items
}
```

### EditableSpan
```typescript
{
  id: string;
  placeholder: string;              // Default display value
  color: 'cyan' | 'yellow' | 'green';
  inputType?: 'text' | 'number' | 'time' | 'date' | 'labels';
  suggestions?: string[];           // Autocomplete dropdown options
  step?: number;                    // For number: +/- button step (default: 1)
  min?: number; max?: number;       // For number: bounds
}
```

## How to Add/Edit Content

### Adding a New Leaf Node (Prompt Category)

1. **Add the bubble node** in `src/data/bubbleTree.ts`:
   ```typescript
   // Under an existing parent's children array:
   { id: 'build-game', labelKey: 'subcategories.build.game', type: 'secondary', promptTemplateId: 'buildGame' },
   ```

2. **Add the prompt template** in the correct category file `src/data/templates/{category}.ts`:
   ```typescript
   // In src/data/templates/build.ts — add to the templates array:
   {
     id: 'buildGame',
     sections: [
       { id: 'bg1', textKey: 'templates.buildGame.line1', type: 'fixed',
         editableSpans: [{ id: 'bg1-name', placeholder: 'OOO', color: 'yellow' }] },
       // ... more sections
     ],
   },
   ```

3. **Add i18n translations** in ALL 6 locale files:
   - `src/i18n/locales/en/prompts.json` — add `subcategories.build.game` (navigation label)
   - `src/i18n/locales/en/prompts-build.json` — add `templates.buildGame.*` (template text)
   - Repeat for `zh-CN`, `zh-TW`, `ja`, `ko`, `es`
   - **Tip**: Use `npx tsx scripts/write-data.ts i18n <locale> set-json 'templates.buildGame' '<json>'` for bulk i18n writes

4. **Validate**: `npm run validate`

### Adding Suggestions to an Existing Editable Span

In `src/data/promptTemplates.ts`, find the span and add `suggestions`:
```typescript
{ id: 'bw2-fw', placeholder: 'React', color: 'cyan',
  suggestions: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'] }
```

### Changing Input Type

Set `inputType` on the span:
- `'number'` — shows +/- stepper buttons; set `min`, `max`, `step`
- `'labels'` — chip-based multi-value with autocomplete; comma-separated output
- `'time'` — native time picker
- `'date'` — native date picker

### Adding a New Sub-layer (Non-leaf Branch)

Add a node WITH `children` array (no `promptTemplateId`):
```typescript
{
  id: 'build-mobile',
  labelKey: 'subcategories.build.mobile',
  type: 'primary',
  children: [
    { id: 'build-mobile-ios', labelKey: '...', type: 'primary', promptTemplateId: 'buildIos' },
    { id: 'build-mobile-android', labelKey: '...', type: 'secondary', promptTemplateId: 'buildAndroid' },
  ],
}
```

## Agent Rules (CRITICAL)

1. **Read CLAUDE.md first** — know the project structure and what's done
2. **Check Progress section below** — see what tasks are complete
3. **Commit + push after EVERY task** — prevents state loss
4. **Use CRUD scripts** for data changes when possible
5. **Run `npm run validate`** after data changes
6. **Follow commit format**: `[lazy-prompt] Task N: <brief description>`
7. **All 6 locales must be updated together** — never add i18n keys to only some locales
8. **Node ID convention**: `{parentId}-{slug}` (e.g., `build-website`, `translation-en-zh`)
9. **Template ID convention**: camelCase matching the leaf purpose (e.g., `buildWebsite`, `readDocument`)

## Supported Languages

| Code | Label | Status |
|------|-------|--------|
| `en` | English | Complete |
| `zh-CN` | 简体中文 | Complete |
| `zh-TW` | 繁體中文 | Complete |
| `ja` | 日本語 | Complete |
| `ko` | 한국어 | Complete |
| `es` | Español | Complete |

## Progress

- [x] Task 1: Project Scaffolding
- [x] Task 2: Theme System
- [x] Task 3: i18n Setup (6 languages: en, zh-CN, zh-TW, ja, ko, es)
- [x] Task 4: Data Model + CRUD Scripts (initial 19 templates, 76 nodes, 7 scripts)
- [x] Task 5: Bubble Canvas (custom SVG + framer-motion)
- [x] Task 6: Prompt Result + Editable Text
- [x] Task 7: AI Provider Links (ChatGPT, Claude, Gemini, Perplexity, Copilot)
- [x] Task 8: App Layout + Routing + Header
- [x] Task 9: Responsive Layout (BubbleList + BubbleCanvas toggle)
- [x] Task 10: Polish + Animations (hover effects, entrance animations, focus-visible)
- [x] Task 11: Enhanced Navigation + URL Routing
  - Radial hover previews (all children), edge-aware positioning
  - Morph animations: child→hub, hub→go-back, previews→children
  - URL-based breadcrumb routing with deep linking
- [x] Task 12: UX Enhancements
  - Header breadcrumb navigation
  - Gemini/Copilot copy+open fallback
  - Section & list item toggle hide/show with renumbering
  - Autocomplete suggestions, number steppers, label-style multi-value inputs
  - Responsive scaling (0.8x–1.4x based on viewport)
  - SVG brand icons for AI providers (from glincker/thesvg)
  - OG preview image for social sharing
  - About page, MIT License
  - "Build Prompt!" tooltip on leaf node hover
- [x] Task 13: Data Optimization
  - 65 independent templates (was 19 shared), each tailored per sub-category
  - Translation restructured to 2-layer: language pair → tone (bidirectional conversation mode)
  - Summarize converted from leaf to branch with 5 sub-categories
  - templateOverrides for context-aware pre-filling from navigation path
  - Suggestions added to 37+ editable spans
  - Full i18n: all 65 templates translated across 6 locales
  - Templates split into 10 per-category files with lazy loading (dynamic import)
  - i18n split into nav-only + per-category template files (on-demand loading)
  - Main bundle reduced from 545KB to ~480KB
  - CLI scripts: read-data.ts and write-data.ts for efficient data operations
- [x] Task 14: Content Expansion (2026-04-05)
  - Expanded write (+5), brainstorm (+5), learn (+5), debug (+3), explain (+3), summarize (+3)
  - Restructured read: replaced analysis-mode leaves with source-type leaves (contract, spreadsheet)
  - 88 templates across 10 categories, 124 nodes total
  - Full i18n for all new content across 6 locales
  - Added .claude/content-audit-log.json for cross-session tracking

## Content Audit Log

Agents performing content audits should read and update `.claude/content-audit-log.json`.

- **Purpose**: Track which bubble categories have been reviewed, expanded, or restructured across sessions.
- **Fields per category**: `last_audited`, `audit_count`, `status` (good / needs-expansion / needs-restructure / well-structured), `notes`, `pending_improvements[]`.
- **`change_log[]`**: Append an entry after every batch of content changes with `{ date, agent_session, changes[] }`.
- **Priority guidance**: Categories with lower `audit_count` or `needs-expansion` status should be reviewed first. Categories marked `good` or `well-structured` can be deprioritized.
