import type { BubbleNode } from './types';

export const bubbleTree: BubbleNode = {
  id: 'root',
  labelKey: 'bubble.whatYouWant',
  type: 'primary',
  children: [
    // ── Primary categories (4) ──
    {
      id: 'translation',
      labelKey: 'categories.translation',
      descriptionKeys: [
        'subcategories.translation.enZh',
        'subcategories.translation.enJa',
        'subcategories.translation.enKo',
      ],
      type: 'primary',
      children: [
        // Primary
        { id: 'translation-en-zh', labelKey: 'subcategories.translation.enZh', type: 'primary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-en-ja', labelKey: 'subcategories.translation.enJa', type: 'primary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-en-ko', labelKey: 'subcategories.translation.enKo', type: 'primary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-en-es', labelKey: 'subcategories.translation.enEs', type: 'primary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-custom', labelKey: 'subcategories.translation.custom', type: 'primary', promptTemplateId: 'translationGeneral' },
        // Secondary
        { id: 'translation-formal', labelKey: 'subcategories.translation.formal', type: 'secondary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-casual', labelKey: 'subcategories.translation.casual', type: 'secondary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationGeneral' },
        { id: 'translation-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationGeneral' },
      ],
    },
    {
      id: 'read',
      labelKey: 'categories.read',
      descriptionKeys: [
        'subcategories.read.webpage',
        'subcategories.read.document',
        'subcategories.read.email',
      ],
      type: 'primary',
      children: [
        // Primary
        { id: 'read-webpage', labelKey: 'subcategories.read.webpage', type: 'primary', promptTemplateId: 'readDocument' },
        { id: 'read-document', labelKey: 'subcategories.read.document', type: 'primary', promptTemplateId: 'readDocument' },
        { id: 'read-email', labelKey: 'subcategories.read.email', type: 'primary', promptTemplateId: 'readDocument' },
        { id: 'read-code', labelKey: 'subcategories.read.code', type: 'primary', promptTemplateId: 'readDocument' },
        { id: 'read-research', labelKey: 'subcategories.read.researchPaper', type: 'primary', promptTemplateId: 'readDocument' },
        // Secondary
        { id: 'read-summary', labelKey: 'subcategories.read.summaryMode', type: 'secondary', promptTemplateId: 'readDocument' },
        { id: 'read-keypoints', labelKey: 'subcategories.read.keyPoints', type: 'secondary', promptTemplateId: 'readDocument' },
        { id: 'read-full', labelKey: 'subcategories.read.fullAnalysis', type: 'secondary', promptTemplateId: 'readDocument' },
        { id: 'read-compare', labelKey: 'subcategories.read.compare', type: 'secondary', promptTemplateId: 'readDocument' },
        { id: 'read-factcheck', labelKey: 'subcategories.read.factCheck', type: 'secondary', promptTemplateId: 'readDocument' },
      ],
    },
    {
      id: 'build',
      labelKey: 'categories.build',
      descriptionKeys: [
        'subcategories.build.website',
        'subcategories.build.app',
        'subcategories.build.api',
      ],
      type: 'primary',
      children: [
        // Primary
        { id: 'build-website', labelKey: 'subcategories.build.website', type: 'primary', promptTemplateId: 'buildWebsite' },
        { id: 'build-app', labelKey: 'subcategories.build.app', type: 'primary', promptTemplateId: 'buildApp' },
        { id: 'build-presentations', labelKey: 'subcategories.build.presentations', type: 'primary', promptTemplateId: 'buildPresentations' },
        { id: 'build-api', labelKey: 'subcategories.build.api', type: 'primary', promptTemplateId: 'buildApi' },
        { id: 'build-database', labelKey: 'subcategories.build.database', type: 'primary', promptTemplateId: 'buildDatabase' },
        // Secondary
        { id: 'build-script', labelKey: 'subcategories.build.script', type: 'secondary', promptTemplateId: 'buildScript' },
        { id: 'build-bot', labelKey: 'subcategories.build.bot', type: 'secondary', promptTemplateId: 'buildBot' },
        { id: 'build-extension', labelKey: 'subcategories.build.extension', type: 'secondary', promptTemplateId: 'buildExtension' },
        { id: 'build-game', labelKey: 'subcategories.build.game', type: 'secondary', promptTemplateId: 'buildGame' },
        { id: 'build-cli', labelKey: 'subcategories.build.cliTool', type: 'secondary', promptTemplateId: 'buildCliTool' },
      ],
    },
    {
      id: 'organize',
      labelKey: 'categories.organize',
      descriptionKeys: [
        'subcategories.organize.reports',
        'subcategories.organize.accounts',
        'subcategories.organize.schedule',
      ],
      type: 'primary',
      children: [
        // Primary
        { id: 'organize-reports', labelKey: 'subcategories.organize.reports', type: 'primary', promptTemplateId: 'organizeReports' },
        { id: 'organize-accounts', labelKey: 'subcategories.organize.accounts', type: 'primary', promptTemplateId: 'organizeReports' },
        { id: 'organize-products', labelKey: 'subcategories.organize.productLists', type: 'primary', promptTemplateId: 'organizeReports' },
        { id: 'organize-schedule', labelKey: 'subcategories.organize.schedule', type: 'primary', promptTemplateId: 'organizeReports' },
        { id: 'organize-notes', labelKey: 'subcategories.organize.notes', type: 'primary', promptTemplateId: 'organizeReports' },
        // Secondary
        { id: 'organize-csv', labelKey: 'subcategories.organize.csvExcel', type: 'secondary', promptTemplateId: 'organizeReports' },
        { id: 'organize-database', labelKey: 'subcategories.organize.database', type: 'secondary', promptTemplateId: 'organizeReports' },
        { id: 'organize-summary', labelKey: 'subcategories.organize.summaryTable', type: 'secondary', promptTemplateId: 'organizeReports' },
        { id: 'organize-timeline', labelKey: 'subcategories.organize.timeline', type: 'secondary', promptTemplateId: 'organizeReports' },
        { id: 'organize-dashboard', labelKey: 'subcategories.organize.dashboard', type: 'secondary', promptTemplateId: 'organizeReports' },
      ],
    },

    // ── Secondary categories (6) ──
    {
      id: 'summarize',
      labelKey: 'categories.summarize',
      type: 'secondary',
      promptTemplateId: 'summarize',
    },
    {
      id: 'debug',
      labelKey: 'categories.debug',
      descriptionKeys: [
        'subcategories.debug.frontend',
        'subcategories.debug.backend',
        'subcategories.debug.api',
      ],
      type: 'secondary',
      children: [
        { id: 'debug-frontend', labelKey: 'subcategories.debug.frontend', type: 'primary', promptTemplateId: 'debugCode' },
        { id: 'debug-backend', labelKey: 'subcategories.debug.backend', type: 'primary', promptTemplateId: 'debugCode' },
        { id: 'debug-database', labelKey: 'subcategories.debug.database', type: 'primary', promptTemplateId: 'debugCode' },
        { id: 'debug-api', labelKey: 'subcategories.debug.api', type: 'primary', promptTemplateId: 'debugCode' },
        { id: 'debug-devops', labelKey: 'subcategories.debug.devops', type: 'primary', promptTemplateId: 'debugCode' },
      ],
    },
    {
      id: 'brainstorm',
      labelKey: 'categories.brainstorm',
      descriptionKeys: [
        'subcategories.brainstorm.product',
        'subcategories.brainstorm.marketing',
        'subcategories.brainstorm.content',
      ],
      type: 'secondary',
      children: [
        { id: 'brainstorm-product', labelKey: 'subcategories.brainstorm.product', type: 'primary', promptTemplateId: 'brainstormIdeas' },
        { id: 'brainstorm-marketing', labelKey: 'subcategories.brainstorm.marketing', type: 'primary', promptTemplateId: 'brainstormIdeas' },
        { id: 'brainstorm-content', labelKey: 'subcategories.brainstorm.content', type: 'primary', promptTemplateId: 'brainstormIdeas' },
        { id: 'brainstorm-design', labelKey: 'subcategories.brainstorm.design', type: 'primary', promptTemplateId: 'brainstormIdeas' },
        { id: 'brainstorm-strategy', labelKey: 'subcategories.brainstorm.strategy', type: 'primary', promptTemplateId: 'brainstormIdeas' },
      ],
    },
    {
      id: 'learn',
      labelKey: 'categories.learn',
      descriptionKeys: [
        'subcategories.learn.programming',
        'subcategories.learn.language',
        'subcategories.learn.math',
      ],
      type: 'secondary',
      children: [
        { id: 'learn-programming', labelKey: 'subcategories.learn.programming', type: 'primary', promptTemplateId: 'learnTopic' },
        { id: 'learn-language', labelKey: 'subcategories.learn.language', type: 'primary', promptTemplateId: 'learnTopic' },
        { id: 'learn-math', labelKey: 'subcategories.learn.math', type: 'primary', promptTemplateId: 'learnTopic' },
        { id: 'learn-science', labelKey: 'subcategories.learn.science', type: 'primary', promptTemplateId: 'learnTopic' },
        { id: 'learn-business', labelKey: 'subcategories.learn.business', type: 'primary', promptTemplateId: 'learnTopic' },
      ],
    },
    {
      id: 'write',
      labelKey: 'categories.write',
      descriptionKeys: [
        'subcategories.write.email',
        'subcategories.write.blog',
        'subcategories.write.documentation',
      ],
      type: 'secondary',
      children: [
        { id: 'write-email', labelKey: 'subcategories.write.email', type: 'primary', promptTemplateId: 'writeContent' },
        { id: 'write-blog', labelKey: 'subcategories.write.blog', type: 'primary', promptTemplateId: 'writeContent' },
        { id: 'write-documentation', labelKey: 'subcategories.write.documentation', type: 'primary', promptTemplateId: 'writeContent' },
        { id: 'write-proposal', labelKey: 'subcategories.write.proposal', type: 'primary', promptTemplateId: 'writeContent' },
        { id: 'write-story', labelKey: 'subcategories.write.story', type: 'primary', promptTemplateId: 'writeContent' },
      ],
    },
    {
      id: 'explain',
      labelKey: 'categories.explain',
      descriptionKeys: [
        'subcategories.explain.code',
        'subcategories.explain.concept',
        'subcategories.explain.process',
      ],
      type: 'secondary',
      children: [
        { id: 'explain-code', labelKey: 'subcategories.explain.code', type: 'primary', promptTemplateId: 'explainTopic' },
        { id: 'explain-concept', labelKey: 'subcategories.explain.concept', type: 'primary', promptTemplateId: 'explainTopic' },
        { id: 'explain-process', labelKey: 'subcategories.explain.process', type: 'primary', promptTemplateId: 'explainTopic' },
        { id: 'explain-error', labelKey: 'subcategories.explain.error', type: 'primary', promptTemplateId: 'explainTopic' },
        { id: 'explain-architecture', labelKey: 'subcategories.explain.architecture', type: 'primary', promptTemplateId: 'explainTopic' },
      ],
    },
  ],
};
