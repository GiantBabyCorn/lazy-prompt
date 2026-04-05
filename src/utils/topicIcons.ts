/**
 * Maps bubble node IDs to Lucide icon file names (in src/assets/icons/topics/).
 * Icons are stroke-based SVGs using currentColor, 24x24 viewBox.
 */

const TOPIC_ICONS: Record<string, string> = {
  // Root
  root: 'lightbulb',

  // ── Primary categories ──
  translation: 'languages',
  read: 'book-open',
  build: 'hammer',
  organize: 'clipboard-list',

  // ── Secondary categories ──
  summarize: 'file-text',
  debug: 'bug',
  brainstorm: 'brain',
  learn: 'graduation-cap',
  write: 'pencil',
  explain: 'message-circle',

  // ── Translation sub-topics ──
  'translation-en-zh': 'globe',
  'translation-en-ja': 'globe',
  'translation-en-ko': 'globe',
  'translation-en-es': 'globe',
  'translation-custom': 'languages',

  // ── Read sub-topics ──
  'read-webpage': 'monitor',
  'read-document': 'file-text',
  'read-email': 'mail',
  'read-code': 'code',
  'read-research': 'book',
  'read-contract': 'scroll',
  'read-spreadsheet': 'table',
  'read-compare': 'scale',
  'read-factcheck': 'check-circle',

  // ── Build sub-topics ──
  'build-website': 'globe',
  'build-app': 'smartphone',
  'build-presentations': 'presentation',
  'build-api': 'plug',
  'build-database': 'database',
  'build-script': 'terminal',
  'build-bot': 'bot',
  'build-extension': 'puzzle',
  'build-game': 'gamepad-2',
  'build-cli': 'terminal',

  // ── Organize sub-topics ──
  'organize-reports': 'bar-chart-3',
  'organize-accounts': 'coins',
  'organize-products': 'package',
  'organize-schedule': 'calendar',
  'organize-notes': 'sticky-note',
  'organize-csv': 'table',
  'organize-database': 'database',
  'organize-summary': 'clipboard-list',
  'organize-timeline': 'clock',
  'organize-dashboard': 'layout-dashboard',

  // ── Summarize sub-topics ──
  'summarize-article': 'newspaper',
  'summarize-meeting': 'users',
  'summarize-video': 'video',
  'summarize-book': 'book',
  'summarize-research': 'book-open',
  'summarize-podcast': 'mic',
  'summarize-legal': 'gavel',
  'summarize-conversation': 'messages-square',

  // ── Debug sub-topics ──
  'debug-frontend': 'monitor',
  'debug-backend': 'terminal',
  'debug-database': 'database',
  'debug-api': 'plug',
  'debug-devops': 'rocket',
  'debug-performance': 'zap',
  'debug-security': 'shield',
  'debug-mobile': 'smartphone',

  // ── Brainstorm sub-topics ──
  'brainstorm-product': 'package',
  'brainstorm-marketing': 'megaphone',
  'brainstorm-content': 'pencil',
  'brainstorm-design': 'palette',
  'brainstorm-strategy': 'puzzle',
  'brainstorm-naming': 'tag',
  'brainstorm-event': 'party-popper',
  'brainstorm-problemSolving': 'lightbulb',
  'brainstorm-startup': 'rocket',
  'brainstorm-sideProject': 'hammer',

  // ── Learn sub-topics ──
  'learn-programming': 'code',
  'learn-language': 'languages',
  'learn-math': 'pie-chart',
  'learn-science': 'book-open',
  'learn-business': 'briefcase',
  'learn-history': 'landmark',
  'learn-design': 'palette',
  'learn-music': 'music',
  'learn-cooking': 'cooking-pot',
  'learn-finance': 'coins',

  // ── Write sub-topics ──
  'write-email': 'mail',
  'write-blog': 'pencil',
  'write-documentation': 'clipboard-list',
  'write-proposal': 'file-text',
  'write-story': 'book',
  'write-socialMedia': 'smartphone',
  'write-resume': 'briefcase',
  'write-report': 'bar-chart-3',
  'write-copy': 'pencil',
  'write-speech': 'presentation',

  // ── Explain sub-topics ──
  'explain-code': 'code',
  'explain-concept': 'lightbulb',
  'explain-process': 'clock',
  'explain-error': 'bug',
  'explain-architecture': 'layout-dashboard',
  'explain-data': 'bar-chart-3',
  'explain-math': 'pie-chart',
  'explain-legal': 'gavel',
};

/**
 * Get the Lucide icon filename for a node ID.
 * Returns null if no icon is mapped.
 */
export function getTopicIcon(nodeId: string): string | null {
  if (TOPIC_ICONS[nodeId]) return TOPIC_ICONS[nodeId];

  // Fallback: walk up parent chain (e.g. translation-en-zh-formal → translation-en-zh → translation)
  const parts = nodeId.split('-');
  while (parts.length > 1) {
    parts.pop();
    const parentId = parts.join('-');
    if (TOPIC_ICONS[parentId]) return TOPIC_ICONS[parentId];
  }

  return null;
}
