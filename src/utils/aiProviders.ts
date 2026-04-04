import type { AIProvider } from '../data/types';

export const aiProviders: AIProvider[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '💬',
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🤖',
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '✨',
    buildUrl: (prompt) => `https://gemini.google.com/app?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: '🔍',
    buildUrl: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
  },
  {
    id: 'copilot',
    name: 'Copilot',
    icon: '🪟',
    buildUrl: (prompt) => `https://copilot.microsoft.com/?q=${encodeURIComponent(prompt)}`,
  },
];
