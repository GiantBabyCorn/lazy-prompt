# Lazy Prompt

An interactive bubble-based web app that helps users build detailed, well-structured AI prompts quickly. Navigate through visual bubble layers until your intent is clear, then customize and send the prompt directly to AI providers.

**Live:** [lazy-prompt.giantbabycorn.finance](https://lazy-prompt.giantbabycorn.finance/)

## Features

- **Visual bubble navigation** — explore prompt categories through an interactive radial bubble canvas with morph animations
- **Editable prompt templates** — customize colored text fields with autocomplete suggestions, number steppers, and label-style multi-value inputs
- **Toggle sections on/off** — hide/show individual prompt lines and list items; numbering adjusts automatically
- **Send to AI providers** — one-click send to ChatGPT, Claude, Gemini, Perplexity, and Copilot (copy+open fallback for unsupported providers)
- **6 languages** — English, 简体中文, 繁體中文, 日本語, 한국어, Español
- **Dark/Light theme** — with system preference detection and localStorage persistence
- **URL-based routing** — deep-linkable URLs with breadcrumb navigation (e.g., `/read/document/`)
- **Responsive** — bubble view and list view toggle, scales to any screen size

## Tech Stack

- **React 19** + **React Router 7** — SPA with client-side routing
- **Vite 6** — build tool with HMR
- **TypeScript** — type safety throughout
- **framer-motion** — spring-based morph animations for bubble transitions
- **i18next** — internationalization (6 languages, lazy-loaded)
- **CSS custom properties** — dark/light theming (no CSS framework)

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Production build
yarn build

# Preview production build
yarn preview

# Lint
yarn lint
```

## Project Structure

```
src/
  components/
    BubbleCanvas.tsx    # SVG canvas with radial bubble layout + morph animations
    BubbleNode.tsx      # Individual bubble (SVG circle + label + tooltip)
    BubbleList.tsx      # List-based navigation (alternative to canvas)
    PromptResult.tsx    # Prompt display with toggle, editable fields
    EditableText.tsx    # Inline editable spans (text/number/date/time/labels)
    AIProviderLinks.tsx # Send-to buttons for AI providers
    Header.tsx          # Logo, breadcrumb, language/theme controls
  pages/
    HomePage.tsx        # Bubble navigation + prompt result
    AboutPage.tsx       # About page with social links
  hooks/
    useBubbleNavigation.ts  # Navigation state + URL sync
  data/
    types.ts            # TypeScript interfaces
    bubbleTree.ts       # Bubble tree data structure
    promptTemplates.ts  # Prompt template definitions
  utils/
    bubbleRouting.ts    # URL ↔ navigation path conversion
    promptBuilder.ts    # Assembles final prompt string
    aiProviders.ts      # AI provider definitions + icons
  assets/icons/         # SVG icons (ChatGPT, Claude, Gemini, etc.)
  i18n/locales/         # 6 language directories (en, zh-CN, zh-TW, ja, ko, es)
```

## Data Model

### Adding/Editing Content

The app's content is defined in two data files:

#### Bubble Tree (`src/data/bubbleTree.ts`)

Hierarchical tree of navigation nodes. Each node:

```typescript
{
  id: string;                     // Unique ID (e.g., "build-website")
  labelKey: string;               // i18n key (e.g., "categories.build")
  descriptionKeys?: string[];     // i18n keys for sub-items shown under bubble
  type: 'primary' | 'secondary'; // Visual size/prominence
  children?: BubbleNode[];        // Next layer (undefined = leaf)
  promptTemplateId?: string;      // For leaf nodes: which template to use
}
```

#### Prompt Templates (`src/data/promptTemplates.ts`)

Each template defines the prompt lines for a leaf node:

```typescript
{
  id: string;
  sections: [{
    id: string;
    textKey: string;                // i18n key for the line text
    type: 'fixed' | 'extensible';  // extensible = has list items
    editableSpans?: [{
      id: string;
      placeholder: string;         // Default value
      color: 'cyan' | 'yellow' | 'green';
      inputType?: 'text' | 'number' | 'time' | 'date' | 'labels';
      suggestions?: string[];      // Autocomplete options
      step?: number;               // For number: +/- step
      min?: number; max?: number;  // For number: bounds
    }];
    defaultItems?: [{              // For extensible: list items
      id: string;
      textKey: string;
    }];
  }];
}
```

### CLI Scripts for Data Management

```bash
yarn add-bubble       # Add a new bubble node to the tree
yarn edit-bubble      # Edit an existing bubble node
yarn delete-bubble    # Remove a bubble node
yarn add-template     # Add a new prompt template
yarn edit-template    # Edit an existing prompt template
yarn list-data        # List bubbles/templates with tree view
yarn validate         # Validate bubble tree + template integrity
```

### Tuning Bubble Size & Text

All visual parameters are in two files:

**Bubble radii** — `src/components/BubbleCanvas.tsx` line 13:
```typescript
const SIZES = { hub: 70, primary: 55, secondary: 42, preview: 28, goBack: 35 };
```
These are base sizes (px). They're multiplied by a responsive `scaleFactor` (0.75x–1.3x) at runtime:
- `scaleBasis / 600` — where `scaleBasis` = screen width (portrait) or min(w,h) (landscape)
- Change `600` to a smaller number → bigger bubbles; larger number → smaller bubbles
- Change min/max (`0.75`/`1.3`) to widen or narrow the scaling range

**Font sizes** — `src/components/BubbleNode.tsx` line 59–61:
```typescript
const fontSize = variant === 'preview' ? 8 : variant === 'secondary' ? 11 : variant === 'hub' ? 14 : 12;
const descFontSize = variant === 'secondary' ? 9 : 10;
```
- `hub`: 14px, `primary`: 12px, `secondary`: 11px, `preview`: 8px
- Description sub-text: 10px (9px for secondary)
- Descriptions are hidden when bubble radius < 50px (mobile scaling)

**Layout radius** — same file, line ~280:
```typescript
const layoutRadiusX = (isPortrait ? dims.w : Math.min(dims.w, dims.h)) / 2 - maxChild - 20;
```
- The `- 20` is edge padding. Increase for more margin, decrease to push bubbles closer to edges.

### Adding a New Prompt Category (Manual Steps)

1. **Add bubble node** in `src/data/bubbleTree.ts` under the parent
2. **Add prompt template** in `src/data/promptTemplates.ts` with sections
3. **Add i18n translations** in all 6 locale files (`src/i18n/locales/*/prompts.json`)
4. **Validate**: `yarn validate`

## License

MIT License - see [LICENSE](LICENSE)

## Author

GiantBabyCorn — [X](https://x.com/GiantBabyCorn) | [Telegram](https://t.me/GiantBabyCorn) | [GitHub](https://github.com/GiantBabyCorn)
