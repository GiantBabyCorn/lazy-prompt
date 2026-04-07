import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "brainstormProduct",
    "sections": [
      {
        "id": "bpr1",
        "textKey": "templates.brainstormProduct.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp1-product",
            "placeholder": "a mobile fitness app for seniors",
            "color": "yellow",
            "suggestions": ["a mobile fitness app for seniors", "an e-commerce platform", "a project management tool", "a social media app", "a learning platform", "a food delivery service"]
          }
        ]
      },
      {
        "id": "bpr2",
        "textKey": "templates.brainstormProduct.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp2-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 50
          }
        ]
      },
      {
        "id": "bpr3",
        "textKey": "templates.brainstormProduct.line3",
        "type": "fixed"
      },
      {
        "id": "bpr4",
        "textKey": "templates.brainstormProduct.line4",
        "type": "fixed"
      },
      {
        "id": "bpr5",
        "textKey": "templates.brainstormProduct.line5",
        "type": "fixed"
      },
      {
        "id": "bpr6",
        "textKey": "templates.brainstormProduct.line6",
        "type": "fixed"
      },
      {
        "id": "bpr7",
        "textKey": "templates.brainstormProduct.line7",
        "type": "fixed"
      },
      {
        "id": "bpr8",
        "textKey": "templates.brainstormProduct.line8",
        "type": "fixed"
      },
      {
        "id": "bpr9",
        "textKey": "templates.brainstormProduct.line9",
        "type": "fixed"
      },
      {
        "id": "bpr10",
        "textKey": "templates.brainstormProduct.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "brainstormMarketing",
    "sections": [
      {
        "id": "bm1",
        "textKey": "templates.brainstormMarketing.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bm1-product",
            "placeholder": "our new SaaS product",
            "color": "yellow",
            "suggestions": ["our new SaaS product", "our mobile app", "our e-commerce store", "our online course", "our consulting services", "our new restaurant"]
          }
        ]
      },
      {
        "id": "bm2",
        "textKey": "templates.brainstormMarketing.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bm2-budget",
            "placeholder": "moderate ($1K-10K/mo)",
            "color": "green",
            "suggestions": [
              "zero budget",
              "low ($0-1K/mo)",
              "moderate ($1K-10K/mo)",
              "high ($10K+/mo)"
            ]
          }
        ]
      },
      {
        "id": "bm3",
        "textKey": "templates.brainstormMarketing.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bm3-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 50
          }
        ]
      },
      {
        "id": "bm4",
        "textKey": "templates.brainstormMarketing.line4",
        "type": "fixed"
      },
      {
        "id": "bm5",
        "textKey": "templates.brainstormMarketing.line5",
        "type": "fixed"
      },
      {
        "id": "bm6",
        "textKey": "templates.brainstormMarketing.line6",
        "type": "fixed"
      },
      {
        "id": "bm7",
        "textKey": "templates.brainstormMarketing.line7",
        "type": "fixed"
      },
      {
        "id": "bm8",
        "textKey": "templates.brainstormMarketing.line8",
        "type": "fixed"
      },
      {
        "id": "bm9",
        "textKey": "templates.brainstormMarketing.line9",
        "type": "fixed"
      },
      {
        "id": "bm10",
        "textKey": "templates.brainstormMarketing.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "brainstormContent",
    "sections": [
      {
        "id": "bc1",
        "textKey": "templates.brainstormContent.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bc1-niche",
            "placeholder": "web development tutorials",
            "color": "yellow",
            "suggestions": ["web development tutorials", "personal finance tips", "cooking recipes", "fitness & health", "tech reviews", "travel guides", "productivity hacks"]
          }
        ]
      },
      {
        "id": "bc2",
        "textKey": "templates.brainstormContent.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bc2-platform",
            "placeholder": "blog + YouTube",
            "color": "cyan",
            "suggestions": [
              "blog",
              "YouTube",
              "blog + YouTube",
              "Twitter/X",
              "LinkedIn",
              "TikTok",
              "podcast",
              "newsletter"
            ]
          }
        ]
      },
      {
        "id": "bc3",
        "textKey": "templates.brainstormContent.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bc3-count",
            "placeholder": "20",
            "color": "cyan",
            "inputType": "number",
            "min": 5,
            "max": 100
          }
        ]
      },
      {
        "id": "bc4",
        "textKey": "templates.brainstormContent.line4",
        "type": "fixed"
      },
      {
        "id": "bc5",
        "textKey": "templates.brainstormContent.line5",
        "type": "fixed"
      },
      {
        "id": "bc6",
        "textKey": "templates.brainstormContent.line6",
        "type": "fixed"
      },
      {
        "id": "bc7",
        "textKey": "templates.brainstormContent.line7",
        "type": "fixed"
      },
      {
        "id": "bc8",
        "textKey": "templates.brainstormContent.line8",
        "type": "fixed"
      },
      {
        "id": "bc9",
        "textKey": "templates.brainstormContent.line9",
        "type": "fixed"
      },
      {
        "id": "bc10",
        "textKey": "templates.brainstormContent.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "brainstormDesign",
    "sections": [
      {
        "id": "bd1",
        "textKey": "templates.brainstormDesign.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bd1-project",
            "placeholder": "a task management app",
            "color": "yellow",
            "suggestions": ["a task management app", "an e-commerce website", "a social media platform", "a banking app", "a learning management system", "a portfolio website"]
          }
        ]
      },
      {
        "id": "bd2",
        "textKey": "templates.brainstormDesign.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bd2-users",
            "placeholder": "remote teams",
            "color": "green",
            "suggestions": [
              "remote teams",
              "students",
              "enterprise users",
              "casual consumers",
              "creators",
              "developers"
            ]
          }
        ]
      },
      {
        "id": "bd3",
        "textKey": "templates.brainstormDesign.line3",
        "type": "fixed"
      },
      {
        "id": "bd4",
        "textKey": "templates.brainstormDesign.line4",
        "type": "fixed"
      },
      {
        "id": "bd5",
        "textKey": "templates.brainstormDesign.line5",
        "type": "fixed"
      },
      {
        "id": "bd6",
        "textKey": "templates.brainstormDesign.line6",
        "type": "fixed"
      },
      {
        "id": "bd7",
        "textKey": "templates.brainstormDesign.line7",
        "type": "fixed"
      },
      {
        "id": "bd8",
        "textKey": "templates.brainstormDesign.line8",
        "type": "fixed"
      },
      {
        "id": "bd9",
        "textKey": "templates.brainstormDesign.line9",
        "type": "fixed"
      },
      {
        "id": "bd10",
        "textKey": "templates.brainstormDesign.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "brainstormStrategy",
    "sections": [
      {
        "id": "bst1",
        "textKey": "templates.brainstormStrategy.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bst1-business",
            "placeholder": "our startup",
            "color": "yellow",
            "suggestions": ["our startup", "our small business", "our agency", "our non-profit", "our freelance practice", "our SaaS company"]
          }
        ]
      },
      {
        "id": "bst2",
        "textKey": "templates.brainstormStrategy.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bst2-industry",
            "placeholder": "SaaS / technology",
            "color": "green",
            "suggestions": [
              "SaaS / technology",
              "e-commerce",
              "healthcare",
              "education",
              "fintech",
              "media",
              "manufacturing",
              "consulting"
            ]
          }
        ]
      },
      {
        "id": "bst3",
        "textKey": "templates.brainstormStrategy.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bst3-timeframe",
            "placeholder": "next 12 months",
            "color": "cyan",
            "suggestions": [
              "next quarter",
              "next 6 months",
              "next 12 months",
              "3-year plan",
              "5-year vision"
            ]
          }
        ]
      },
      {
        "id": "bst4",
        "textKey": "templates.brainstormStrategy.line4",
        "type": "fixed"
      },
      {
        "id": "bst5",
        "textKey": "templates.brainstormStrategy.line5",
        "type": "fixed"
      },
      {
        "id": "bst6",
        "textKey": "templates.brainstormStrategy.line6",
        "type": "fixed"
      },
      {
        "id": "bst7",
        "textKey": "templates.brainstormStrategy.line7",
        "type": "fixed"
      },
      {
        "id": "bst8",
        "textKey": "templates.brainstormStrategy.line8",
        "type": "fixed"
      },
      {
        "id": "bst9",
        "textKey": "templates.brainstormStrategy.line9",
        "type": "fixed"
      },
      {
        "id": "bst10",
        "textKey": "templates.brainstormStrategy.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "brainstormNaming",
    "sections": [
      {
        "id": "bn1",
        "textKey": "templates.brainstormNaming.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bn1-what",
            "placeholder": "a productivity app",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bn2",
        "textKey": "templates.brainstormNaming.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bn2-count",
            "placeholder": "20",
            "color": "cyan",
            "inputType": "number",
            "min": 5,
            "max": 100
          }
        ]
      },
      {
        "id": "bn3",
        "textKey": "templates.brainstormNaming.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bn3-vibe",
            "placeholder": "modern and playful",
            "color": "green",
            "suggestions": ["modern and playful", "professional and trustworthy", "minimalist and clean", "bold and edgy", "friendly and approachable", "techy and futuristic"]
          }
        ]
      },
      { "id": "bn4", "textKey": "templates.brainstormNaming.line4", "type": "fixed" },
      { "id": "bn5", "textKey": "templates.brainstormNaming.line5", "type": "fixed" },
      { "id": "bn6", "textKey": "templates.brainstormNaming.line6", "type": "fixed" },
      { "id": "bn7", "textKey": "templates.brainstormNaming.line7", "type": "fixed" },
      { "id": "bn8", "textKey": "templates.brainstormNaming.line8", "type": "fixed" },
      { "id": "bn9", "textKey": "templates.brainstormNaming.line9", "type": "fixed" },
      { "id": "bn10", "textKey": "templates.brainstormNaming.line10", "type": "fixed" }
    ]
  },
  {
    "id": "brainstormEvent",
    "sections": [
      {
        "id": "bev1",
        "textKey": "templates.brainstormEvent.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bev1-type",
            "placeholder": "team building event",
            "color": "yellow",
            "suggestions": ["team building event", "product launch party", "conference", "workshop", "networking mixer", "hackathon", "company retreat"]
          }
        ]
      },
      {
        "id": "bev2",
        "textKey": "templates.brainstormEvent.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bev2-size",
            "placeholder": "30-50 people",
            "color": "cyan",
            "suggestions": ["10-20 people", "30-50 people", "50-100 people", "100-300 people", "300+ people"]
          }
        ]
      },
      {
        "id": "bev3",
        "textKey": "templates.brainstormEvent.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bev3-budget",
            "placeholder": "moderate",
            "color": "green",
            "suggestions": ["minimal (under $500)", "low ($500-2K)", "moderate ($2K-10K)", "high ($10K-50K)", "premium ($50K+)"]
          }
        ]
      },
      { "id": "bev4", "textKey": "templates.brainstormEvent.line4", "type": "fixed" },
      { "id": "bev5", "textKey": "templates.brainstormEvent.line5", "type": "fixed" },
      { "id": "bev6", "textKey": "templates.brainstormEvent.line6", "type": "fixed" },
      { "id": "bev7", "textKey": "templates.brainstormEvent.line7", "type": "fixed" },
      { "id": "bev8", "textKey": "templates.brainstormEvent.line8", "type": "fixed" },
      { "id": "bev9", "textKey": "templates.brainstormEvent.line9", "type": "fixed" },
      { "id": "bev10", "textKey": "templates.brainstormEvent.line10", "type": "fixed" }
    ]
  },
  {
    "id": "brainstormProblemSolving",
    "sections": [
      {
        "id": "bps1",
        "textKey": "templates.brainstormProblemSolving.line1",
        "type": "fixed",
        "editableSpans": [
          { "id": "bps1-problem", "placeholder": "user retention is dropping month over month", "color": "yellow" }
        ]
      },
      {
        "id": "bps2",
        "textKey": "templates.brainstormProblemSolving.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bps2-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 50
          }
        ]
      },
      { "id": "bps3", "textKey": "templates.brainstormProblemSolving.line3", "type": "fixed" },
      { "id": "bps4", "textKey": "templates.brainstormProblemSolving.line4", "type": "fixed" },
      { "id": "bps5", "textKey": "templates.brainstormProblemSolving.line5", "type": "fixed" },
      { "id": "bps6", "textKey": "templates.brainstormProblemSolving.line6", "type": "fixed" },
      { "id": "bps7", "textKey": "templates.brainstormProblemSolving.line7", "type": "fixed" },
      { "id": "bps8", "textKey": "templates.brainstormProblemSolving.line8", "type": "fixed" },
      { "id": "bps9", "textKey": "templates.brainstormProblemSolving.line9", "type": "fixed" },
      { "id": "bps10", "textKey": "templates.brainstormProblemSolving.line10", "type": "fixed" }
    ]
  },
  {
    "id": "brainstormStartup",
    "sections": [
      {
        "id": "bsu1",
        "textKey": "templates.brainstormStartup.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bsu1-domain",
            "placeholder": "AI + education",
            "color": "yellow",
            "suggestions": ["AI + education", "health & wellness", "fintech", "sustainability", "remote work", "creator economy", "local services", "food & beverage"]
          }
        ]
      },
      {
        "id": "bsu2",
        "textKey": "templates.brainstormStartup.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bsu2-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 50
          }
        ]
      },
      { "id": "bsu3", "textKey": "templates.brainstormStartup.line3", "type": "fixed" },
      { "id": "bsu4", "textKey": "templates.brainstormStartup.line4", "type": "fixed" },
      { "id": "bsu5", "textKey": "templates.brainstormStartup.line5", "type": "fixed" },
      { "id": "bsu6", "textKey": "templates.brainstormStartup.line6", "type": "fixed" },
      { "id": "bsu7", "textKey": "templates.brainstormStartup.line7", "type": "fixed" },
      { "id": "bsu8", "textKey": "templates.brainstormStartup.line8", "type": "fixed" },
      { "id": "bsu9", "textKey": "templates.brainstormStartup.line9", "type": "fixed" },
      { "id": "bsu10", "textKey": "templates.brainstormStartup.line10", "type": "fixed" }
    ]
  },
  {
    "id": "brainstormSideProject",
    "sections": [
      {
        "id": "bsp1",
        "textKey": "templates.brainstormSideProject.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bsp1-skill",
            "placeholder": "web development",
            "color": "yellow",
            "suggestions": ["web development", "mobile development", "data science", "design", "writing", "hardware / IoT", "game development", "automation"]
          }
        ]
      },
      {
        "id": "bsp2",
        "textKey": "templates.brainstormSideProject.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bsp2-time",
            "placeholder": "a weekend",
            "color": "green",
            "suggestions": ["an evening", "a weekend", "one week", "one month", "ongoing hobby"]
          }
        ]
      },
      {
        "id": "bsp3",
        "textKey": "templates.brainstormSideProject.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bsp3-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 50
          }
        ]
      },
      { "id": "bsp4", "textKey": "templates.brainstormSideProject.line4", "type": "fixed" },
      { "id": "bsp5", "textKey": "templates.brainstormSideProject.line5", "type": "fixed" },
      { "id": "bsp6", "textKey": "templates.brainstormSideProject.line6", "type": "fixed" },
      { "id": "bsp7", "textKey": "templates.brainstormSideProject.line7", "type": "fixed" },
      { "id": "bsp8", "textKey": "templates.brainstormSideProject.line8", "type": "fixed" },
      { "id": "bsp9", "textKey": "templates.brainstormSideProject.line9", "type": "fixed" },
      { "id": "bsp10", "textKey": "templates.brainstormSideProject.line10", "type": "fixed" }
    ]
  }
];

export default templates;
