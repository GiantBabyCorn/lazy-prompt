export interface BubbleNode {
  id: string;
  labelKey: string;           // i18n key like "categories.build"
  descriptionKeys?: string[]; // i18n keys shown under bubble label
  type: 'primary' | 'secondary';
  children?: BubbleNode[];
  promptTemplateId?: string;  // leaf nodes reference a template
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
}

export interface AIProvider {
  id: string;
  name: string;
  icon: string;
  buildUrl: (prompt: string) => string;
}
