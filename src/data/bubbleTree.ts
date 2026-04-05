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
        // Language pairs (branches → tone children)
        {
          id: 'translation-en-zh', labelKey: 'subcategories.translation.enZh', type: 'primary',
          descriptionKeys: ['subcategories.translation.formal', 'subcategories.translation.casual', 'subcategories.translation.technical'],
          children: [
            { id: 'translation-en-zh-formal', labelKey: 'subcategories.translation.formal', type: 'primary', promptTemplateId: 'translationFormal', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Chinese' } },
            { id: 'translation-en-zh-casual', labelKey: 'subcategories.translation.casual', type: 'primary', promptTemplateId: 'translationCasual', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Chinese' } },
            { id: 'translation-en-zh-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationTechnical', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Chinese' } },
            { id: 'translation-en-zh-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationLiterary', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Chinese' } },
            { id: 'translation-en-zh-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationLocalized', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Chinese' } },
          ],
        },
        {
          id: 'translation-en-ja', labelKey: 'subcategories.translation.enJa', type: 'primary',
          descriptionKeys: ['subcategories.translation.formal', 'subcategories.translation.casual', 'subcategories.translation.technical'],
          children: [
            { id: 'translation-en-ja-formal', labelKey: 'subcategories.translation.formal', type: 'primary', promptTemplateId: 'translationFormal', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Japanese' } },
            { id: 'translation-en-ja-casual', labelKey: 'subcategories.translation.casual', type: 'primary', promptTemplateId: 'translationCasual', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Japanese' } },
            { id: 'translation-en-ja-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationTechnical', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Japanese' } },
            { id: 'translation-en-ja-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationLiterary', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Japanese' } },
            { id: 'translation-en-ja-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationLocalized', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Japanese' } },
          ],
        },
        {
          id: 'translation-en-ko', labelKey: 'subcategories.translation.enKo', type: 'primary',
          descriptionKeys: ['subcategories.translation.formal', 'subcategories.translation.casual', 'subcategories.translation.technical'],
          children: [
            { id: 'translation-en-ko-formal', labelKey: 'subcategories.translation.formal', type: 'primary', promptTemplateId: 'translationFormal', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Korean' } },
            { id: 'translation-en-ko-casual', labelKey: 'subcategories.translation.casual', type: 'primary', promptTemplateId: 'translationCasual', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Korean' } },
            { id: 'translation-en-ko-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationTechnical', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Korean' } },
            { id: 'translation-en-ko-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationLiterary', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Korean' } },
            { id: 'translation-en-ko-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationLocalized', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Korean' } },
          ],
        },
        {
          id: 'translation-en-es', labelKey: 'subcategories.translation.enEs', type: 'primary',
          descriptionKeys: ['subcategories.translation.formal', 'subcategories.translation.casual', 'subcategories.translation.technical'],
          children: [
            { id: 'translation-en-es-formal', labelKey: 'subcategories.translation.formal', type: 'primary', promptTemplateId: 'translationFormal', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Spanish' } },
            { id: 'translation-en-es-casual', labelKey: 'subcategories.translation.casual', type: 'primary', promptTemplateId: 'translationCasual', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Spanish' } },
            { id: 'translation-en-es-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationTechnical', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Spanish' } },
            { id: 'translation-en-es-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationLiterary', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Spanish' } },
            { id: 'translation-en-es-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationLocalized', templateOverrides: { 'tr1-source': 'English', 'tr1-target': 'Spanish' } },
          ],
        },
        {
          id: 'translation-custom', labelKey: 'subcategories.translation.custom', type: 'primary',
          descriptionKeys: ['subcategories.translation.formal', 'subcategories.translation.casual', 'subcategories.translation.technical'],
          children: [
            { id: 'translation-custom-formal', labelKey: 'subcategories.translation.formal', type: 'primary', promptTemplateId: 'translationFormal' },
            { id: 'translation-custom-casual', labelKey: 'subcategories.translation.casual', type: 'primary', promptTemplateId: 'translationCasual' },
            { id: 'translation-custom-technical', labelKey: 'subcategories.translation.technical', type: 'secondary', promptTemplateId: 'translationTechnical' },
            { id: 'translation-custom-literary', labelKey: 'subcategories.translation.literary', type: 'secondary', promptTemplateId: 'translationLiterary' },
            { id: 'translation-custom-localized', labelKey: 'subcategories.translation.localized', type: 'secondary', promptTemplateId: 'translationLocalized' },
          ],
        },
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
        // Primary (source types)
        { id: 'read-webpage', labelKey: 'subcategories.read.webpage', type: 'primary', promptTemplateId: 'readWebpage' },
        { id: 'read-document', labelKey: 'subcategories.read.document', type: 'primary', promptTemplateId: 'readDocument' },
        { id: 'read-email', labelKey: 'subcategories.read.email', type: 'primary', promptTemplateId: 'readEmail' },
        { id: 'read-code', labelKey: 'subcategories.read.code', type: 'primary', promptTemplateId: 'readCode' },
        { id: 'read-research', labelKey: 'subcategories.read.researchPaper', type: 'primary', promptTemplateId: 'readResearch' },
        // Secondary (source types + cross-cutting analysis)
        { id: 'read-contract', labelKey: 'subcategories.read.contract', type: 'secondary', promptTemplateId: 'readContract' },
        { id: 'read-spreadsheet', labelKey: 'subcategories.read.spreadsheet', type: 'secondary', promptTemplateId: 'readSpreadsheet' },
        { id: 'read-compare', labelKey: 'subcategories.read.compare', type: 'secondary', promptTemplateId: 'readCompare' },
        { id: 'read-factcheck', labelKey: 'subcategories.read.factCheck', type: 'secondary', promptTemplateId: 'readFactCheck' },
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
        { id: 'organize-accounts', labelKey: 'subcategories.organize.accounts', type: 'primary', promptTemplateId: 'organizeAccounts' },
        { id: 'organize-products', labelKey: 'subcategories.organize.productLists', type: 'primary', promptTemplateId: 'organizeProducts' },
        { id: 'organize-schedule', labelKey: 'subcategories.organize.schedule', type: 'primary', promptTemplateId: 'organizeSchedule' },
        { id: 'organize-notes', labelKey: 'subcategories.organize.notes', type: 'primary', promptTemplateId: 'organizeNotes' },
        // Secondary
        { id: 'organize-csv', labelKey: 'subcategories.organize.csvExcel', type: 'secondary', promptTemplateId: 'organizeCsv' },
        { id: 'organize-database', labelKey: 'subcategories.organize.database', type: 'secondary', promptTemplateId: 'organizeDatabase' },
        { id: 'organize-summary', labelKey: 'subcategories.organize.summaryTable', type: 'secondary', promptTemplateId: 'organizeSummaryTable' },
        { id: 'organize-timeline', labelKey: 'subcategories.organize.timeline', type: 'secondary', promptTemplateId: 'organizeTimeline' },
        { id: 'organize-dashboard', labelKey: 'subcategories.organize.dashboard', type: 'secondary', promptTemplateId: 'organizeDashboard' },
      ],
    },

    // ── Secondary categories (6) ──
    {
      id: 'summarize',
      labelKey: 'categories.summarize',
      descriptionKeys: [
        'subcategories.summarize.article',
        'subcategories.summarize.meeting',
        'subcategories.summarize.video',
      ],
      type: 'secondary',
      children: [
        // Primary
        { id: 'summarize-article', labelKey: 'subcategories.summarize.article', type: 'primary', promptTemplateId: 'summarizeArticle' },
        { id: 'summarize-meeting', labelKey: 'subcategories.summarize.meeting', type: 'primary', promptTemplateId: 'summarizeMeeting' },
        { id: 'summarize-video', labelKey: 'subcategories.summarize.video', type: 'primary', promptTemplateId: 'summarizeVideo' },
        { id: 'summarize-book', labelKey: 'subcategories.summarize.book', type: 'secondary', promptTemplateId: 'summarizeBook' },
        { id: 'summarize-research', labelKey: 'subcategories.summarize.research', type: 'secondary', promptTemplateId: 'summarizeResearch' },
        // Secondary (new)
        { id: 'summarize-podcast', labelKey: 'subcategories.summarize.podcast', type: 'secondary', promptTemplateId: 'summarizePodcast' },
        { id: 'summarize-legal', labelKey: 'subcategories.summarize.legal', type: 'secondary', promptTemplateId: 'summarizeLegal' },
        { id: 'summarize-conversation', labelKey: 'subcategories.summarize.conversation', type: 'secondary', promptTemplateId: 'summarizeConversation' },
      ],
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
        // Primary
        { id: 'debug-frontend', labelKey: 'subcategories.debug.frontend', type: 'primary', promptTemplateId: 'debugFrontend' },
        { id: 'debug-backend', labelKey: 'subcategories.debug.backend', type: 'primary', promptTemplateId: 'debugBackend' },
        { id: 'debug-database', labelKey: 'subcategories.debug.database', type: 'primary', promptTemplateId: 'debugDatabase' },
        { id: 'debug-api', labelKey: 'subcategories.debug.api', type: 'primary', promptTemplateId: 'debugApi' },
        { id: 'debug-devops', labelKey: 'subcategories.debug.devops', type: 'primary', promptTemplateId: 'debugDevops' },
        // Secondary
        { id: 'debug-performance', labelKey: 'subcategories.debug.performance', type: 'secondary', promptTemplateId: 'debugPerformance' },
        { id: 'debug-security', labelKey: 'subcategories.debug.security', type: 'secondary', promptTemplateId: 'debugSecurity' },
        { id: 'debug-mobile', labelKey: 'subcategories.debug.mobile', type: 'secondary', promptTemplateId: 'debugMobile' },
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
        // Primary
        { id: 'brainstorm-product', labelKey: 'subcategories.brainstorm.product', type: 'primary', promptTemplateId: 'brainstormProduct' },
        { id: 'brainstorm-marketing', labelKey: 'subcategories.brainstorm.marketing', type: 'primary', promptTemplateId: 'brainstormMarketing' },
        { id: 'brainstorm-content', labelKey: 'subcategories.brainstorm.content', type: 'primary', promptTemplateId: 'brainstormContent' },
        { id: 'brainstorm-design', labelKey: 'subcategories.brainstorm.design', type: 'primary', promptTemplateId: 'brainstormDesign' },
        { id: 'brainstorm-strategy', labelKey: 'subcategories.brainstorm.strategy', type: 'primary', promptTemplateId: 'brainstormStrategy' },
        // Secondary
        { id: 'brainstorm-naming', labelKey: 'subcategories.brainstorm.naming', type: 'secondary', promptTemplateId: 'brainstormNaming' },
        { id: 'brainstorm-event', labelKey: 'subcategories.brainstorm.event', type: 'secondary', promptTemplateId: 'brainstormEvent' },
        { id: 'brainstorm-problemSolving', labelKey: 'subcategories.brainstorm.problemSolving', type: 'secondary', promptTemplateId: 'brainstormProblemSolving' },
        { id: 'brainstorm-startup', labelKey: 'subcategories.brainstorm.startup', type: 'secondary', promptTemplateId: 'brainstormStartup' },
        { id: 'brainstorm-sideProject', labelKey: 'subcategories.brainstorm.sideProject', type: 'secondary', promptTemplateId: 'brainstormSideProject' },
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
        // Primary
        { id: 'learn-programming', labelKey: 'subcategories.learn.programming', type: 'primary', promptTemplateId: 'learnProgramming' },
        { id: 'learn-language', labelKey: 'subcategories.learn.language', type: 'primary', promptTemplateId: 'learnLanguage' },
        { id: 'learn-math', labelKey: 'subcategories.learn.math', type: 'primary', promptTemplateId: 'learnMath' },
        { id: 'learn-science', labelKey: 'subcategories.learn.science', type: 'primary', promptTemplateId: 'learnScience' },
        { id: 'learn-business', labelKey: 'subcategories.learn.business', type: 'primary', promptTemplateId: 'learnBusiness' },
        // Secondary
        { id: 'learn-history', labelKey: 'subcategories.learn.history', type: 'secondary', promptTemplateId: 'learnHistory' },
        { id: 'learn-design', labelKey: 'subcategories.learn.design', type: 'secondary', promptTemplateId: 'learnDesign' },
        { id: 'learn-music', labelKey: 'subcategories.learn.music', type: 'secondary', promptTemplateId: 'learnMusic' },
        { id: 'learn-cooking', labelKey: 'subcategories.learn.cooking', type: 'secondary', promptTemplateId: 'learnCooking' },
        { id: 'learn-finance', labelKey: 'subcategories.learn.finance', type: 'secondary', promptTemplateId: 'learnFinance' },
      ],
    },
    {
      id: 'write',
      labelKey: 'categories.write',
      descriptionKeys: [
        'subcategories.write.email',
        'subcategories.write.blog',
        'subcategories.write.socialMedia',
      ],
      type: 'secondary',
      children: [
        // Primary
        { id: 'write-email', labelKey: 'subcategories.write.email', type: 'primary', promptTemplateId: 'writeEmail' },
        { id: 'write-blog', labelKey: 'subcategories.write.blog', type: 'primary', promptTemplateId: 'writeBlog' },
        { id: 'write-documentation', labelKey: 'subcategories.write.documentation', type: 'primary', promptTemplateId: 'writeDocumentation' },
        { id: 'write-proposal', labelKey: 'subcategories.write.proposal', type: 'primary', promptTemplateId: 'writeProposal' },
        { id: 'write-story', labelKey: 'subcategories.write.story', type: 'primary', promptTemplateId: 'writeStory' },
        // Secondary
        { id: 'write-socialMedia', labelKey: 'subcategories.write.socialMedia', type: 'secondary', promptTemplateId: 'writeSocialMedia' },
        { id: 'write-resume', labelKey: 'subcategories.write.resume', type: 'secondary', promptTemplateId: 'writeResume' },
        { id: 'write-report', labelKey: 'subcategories.write.report', type: 'secondary', promptTemplateId: 'writeReport' },
        { id: 'write-copy', labelKey: 'subcategories.write.copy', type: 'secondary', promptTemplateId: 'writeCopy' },
        { id: 'write-speech', labelKey: 'subcategories.write.speech', type: 'secondary', promptTemplateId: 'writeSpeech' },
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
        // Primary
        { id: 'explain-code', labelKey: 'subcategories.explain.code', type: 'primary', promptTemplateId: 'explainCode' },
        { id: 'explain-concept', labelKey: 'subcategories.explain.concept', type: 'primary', promptTemplateId: 'explainConcept' },
        { id: 'explain-process', labelKey: 'subcategories.explain.process', type: 'primary', promptTemplateId: 'explainProcess' },
        { id: 'explain-error', labelKey: 'subcategories.explain.error', type: 'primary', promptTemplateId: 'explainError' },
        { id: 'explain-architecture', labelKey: 'subcategories.explain.architecture', type: 'primary', promptTemplateId: 'explainArchitecture' },
        // Secondary
        { id: 'explain-data', labelKey: 'subcategories.explain.data', type: 'secondary', promptTemplateId: 'explainData' },
        { id: 'explain-math', labelKey: 'subcategories.explain.math', type: 'secondary', promptTemplateId: 'explainMath' },
        { id: 'explain-legal', labelKey: 'subcategories.explain.legal', type: 'secondary', promptTemplateId: 'explainLegal' },
      ],
    },
  ],
};
