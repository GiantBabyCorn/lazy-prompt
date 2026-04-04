import type { AIProvider } from '../data/types';
import chatgptIcon from '../assets/icons/chatgpt.svg';
import claudeIcon from '../assets/icons/claude.svg';
import geminiIcon from '../assets/icons/gemini.svg';
import perplexityIcon from '../assets/icons/perplexity.svg';
import copilotIcon from '../assets/icons/copilot.svg';

export const aiProviders: AIProvider[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: chatgptIcon,
    buildUrl: (prompt) => `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
    supportsPromptUrl: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: claudeIcon,
    buildUrl: (prompt) => `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
    supportsPromptUrl: true,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: geminiIcon,
    buildUrl: () => 'https://gemini.google.com/app',
    supportsPromptUrl: false,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    icon: perplexityIcon,
    buildUrl: (prompt) => `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
    supportsPromptUrl: true,
  },
  {
    id: 'copilot',
    name: 'Copilot',
    icon: copilotIcon,
    buildUrl: () => 'https://copilot.microsoft.com/',
    supportsPromptUrl: false,
  },
];
