export interface BubbleNode {
  id: string;
  labelKey: string;           // i18n key like "categories.build"
  descriptionKeys?: string[]; // i18n keys shown under bubble label
  type: 'primary' | 'secondary';
  children?: BubbleNode[];
  promptTemplateId?: string;  // leaf nodes reference a template
  templateOverrides?: Record<string, string>;  // pre-fill editable span values based on selected path
}

export interface PromptTemplate {
  id: string;
  sections: PromptSection[];
}

export interface PromptSection {
  id: string;
  textKey: string;            // i18n key for the line text
  editableSpans?: EditableSpan[];
  type: 'fixed' | 'extensible';
  defaultItems?: PromptDefaultItem[];
}

export interface PromptDefaultItem {
  id: string;
  textKey: string;
}

export interface EditableSpan {
  id: string;
  placeholder: string;
  color: 'cyan' | 'yellow' | 'green';
  /** Input type for specialized controls. Default: 'text'. */
  inputType?: 'text' | 'number' | 'time' | 'date' | 'labels';
  /** Autocomplete suggestions (filtered by user input). */
  suggestions?: string[];
  /** For number type: step for +/- buttons. Default: 1. */
  step?: number;
  /** For number type: min value. */
  min?: number;
  /** For number type: max value. */
  max?: number;
}

export interface AIProvider {
  id: string;
  name: string;
  icon: string;
  buildUrl: (prompt: string) => string;
  /** If false, prompt can't be injected via URL — will copy to clipboard + open site. */
  supportsPromptUrl?: boolean;
}
