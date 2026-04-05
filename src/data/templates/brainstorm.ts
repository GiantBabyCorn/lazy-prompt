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
            "color": "yellow"
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
            "color": "yellow"
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
            "color": "yellow"
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
            "color": "yellow"
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
            "color": "yellow"
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
  }
];

export default templates;
