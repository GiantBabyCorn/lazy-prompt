# CLAUDE.md

## Project Overview

Lazy Prompt — an interactive bubble-based web app that helps users build detailed, well-structured AI prompts quickly. Users navigate through visual bubble layers (categories → sub-categories → leaf) until their intent is clear, then the app generates a rich, editable prompt they can copy or send directly to AI providers.

## Tech Stack

- **React 19** + **React Router 7** — component-based SPA with client-side routing
- **Vite 6** — build tool with hot module replacement
- **TypeScript** — type safety throughout
- **@xyflow/react** — SVG-based bubble/node graph visualization
- **i18next** — internationalization (6 languages: en, zh-CN, zh-TW, ja, ko, es)
- **CSS custom properties** — dark/light theming (no CSS framework)

## Project Structure

```
index.html              # Vite entry point with SEO meta tags + JSON-LD
vite.config.ts          # Vite configuration
package.json            # Dependencies and npm scripts
CLAUDE.md               # THIS FILE — project-level agent instructions
.claude/
  settings.json         # Agent permissions
  commands/
    check-progress.md   # Progress checking command
public/
  logo.svg              # Logo and favicon
scripts/
  add-bubble.ts         # CLI: add a new bubble node
  edit-bubble.ts        # CLI: edit an existing bubble node
  delete-bubble.ts      # CLI: remove a bubble node
  add-template.ts       # CLI: add a new prompt template
  edit-template.ts      # CLI: edit an existing prompt template
  list-data.ts          # CLI: list bubbles/templates with tree view
  validate-data.ts      # CLI: validate bubble tree + template integrity
src/
  main.tsx              # React entry point, BrowserRouter + i18n setup
  App.tsx               # Root layout: ThemeProvider + routes
  App.css               # Global styles, CSS custom properties, theme vars
  i18n/
    config.ts           # i18next setup (lazy-loaded locales)
    locales/            # 6 language directories, each with common.json + prompts.json
  contexts/
    ThemeContext.tsx     # Dark/light theme with localStorage persistence
  hooks/
    useDocumentHead.ts  # Dynamic <title>/<meta> for SEO
    useClipboard.ts     # Copy to clipboard utility
    useBubbleNavigation.ts  # Navigate bubble tree layers, track path
  components/
    Header.tsx          # Logo, language selector, theme toggle
    BubbleCanvas.tsx    # React Flow canvas
    BubbleNode.tsx      # Custom React Flow node (circle bubbles)
    BubbleEdge.tsx      # Custom React Flow edge (dashed green lines)
    GoBackButton.tsx    # Navigate to previous layer
    PromptResult.tsx    # Final prompt display with editable sections
    EditableText.tsx    # Inline-editable colored text spans
    CopyButton.tsx      # Copy prompt to clipboard
    AIProviderLinks.tsx # Buttons to open AI providers with prompt
    AddItemButton.tsx   # "Click to add" for extensible prompt lists
    LanguageSelector.tsx # i18n language switcher
    ThemeToggle.tsx     # Dark/light theme switch
  pages/
    HomePage.tsx        # Main bubble navigation screen (route: /)
    ResultPage.tsx      # Final prompt result screen (route: /result)
  data/
    types.ts            # TypeScript interfaces (BubbleNode, PromptTemplate, etc.)
    bubbleTree.ts       # Complete bubble tree data structure
    promptTemplates.ts  # Prompt template definitions per leaf path
  utils/
    aiProviders.ts      # AI provider URL builders
    promptBuilder.ts    # Assembles final prompt from selections
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
npm run add-template     # Add a new prompt template
npm run edit-template    # Edit an existing prompt template
npm run list-data        # List bubbles/templates with tree view
npm run validate         # Validate bubble tree + template integrity
```

## Data Model

### BubbleNode
```typescript
{
  id: string;                        // Unique identifier
  labelKey: string;                  // i18n key for display label
  descriptionKeys?: string[];        // i18n keys for sub-items shown under bubble
  type: 'primary' | 'secondary';    // Determines bubble size
  children?: BubbleNode[];           // Next layer (undefined = leaf)
  promptTemplateId?: string;         // For leaf nodes: which template to use
}
```

### PromptTemplate
```typescript
{
  id: string;
  sections: PromptSection[];        // Ordered list of prompt lines
}
```

## Agent Rules (CRITICAL)

1. **Read CLAUDE.md first** — know the project structure and what's done
2. **Check Progress section below** — see what tasks are complete
3. **Commit + push after EVERY task** — prevents state loss
4. **Use CRUD scripts** for data changes when possible
5. **Run `npm run validate`** after data changes
6. **Follow commit format**: `[lazy-prompt] Task N: <brief description>`

## Supported Languages

| Code | Label | Status |
|------|-------|--------|
| `en` | English | Pending |
| `zh-CN` | 简体中文 | Pending |
| `zh-TW` | 繁體中文 | Pending |
| `ja` | 日本語 | Pending |
| `ko` | 한국어 | Pending |
| `es` | Español | Pending |

## Progress

- [x] Task 1: Project Scaffolding
- [ ] Task 2: Theme System
- [ ] Task 3: i18n Setup
- [ ] Task 4: Data Model + CRUD Scripts
- [ ] Task 5: Bubble Canvas with React Flow
- [ ] Task 6: Prompt Result + Editable Text
- [ ] Task 7: AI Provider Links
- [ ] Task 8: App Layout + Routing + Header
- [ ] Task 9: Responsive Layout (Mobile)
- [ ] Task 10: Polish + Animations
