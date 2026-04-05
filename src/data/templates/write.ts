import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "writeEmail",
    "sections": [
      {
        "id": "we1",
        "textKey": "templates.writeEmail.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we1-purpose",
            "placeholder": "follow up on a meeting",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "we2",
        "textKey": "templates.writeEmail.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we2-recipient",
            "placeholder": "colleague",
            "color": "green",
            "suggestions": [
              "colleague",
              "manager",
              "client",
              "vendor",
              "team",
              "HR",
              "customer support"
            ]
          }
        ]
      },
      {
        "id": "we3",
        "textKey": "templates.writeEmail.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we3-tone",
            "placeholder": "professional",
            "color": "cyan",
            "suggestions": [
              "professional",
              "friendly",
              "formal",
              "apologetic",
              "urgent",
              "persuasive",
              "casual"
            ]
          }
        ]
      },
      {
        "id": "we4",
        "textKey": "templates.writeEmail.line4",
        "type": "fixed"
      },
      {
        "id": "we5",
        "textKey": "templates.writeEmail.line5",
        "type": "fixed"
      },
      {
        "id": "we6",
        "textKey": "templates.writeEmail.line6",
        "type": "fixed"
      },
      {
        "id": "we7",
        "textKey": "templates.writeEmail.line7",
        "type": "fixed"
      },
      {
        "id": "we8",
        "textKey": "templates.writeEmail.line8",
        "type": "fixed"
      },
      {
        "id": "we9",
        "textKey": "templates.writeEmail.line9",
        "type": "fixed"
      },
      {
        "id": "we10",
        "textKey": "templates.writeEmail.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeBlog",
    "sections": [
      {
        "id": "wb1",
        "textKey": "templates.writeBlog.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb1-topic",
            "placeholder": "the future of AI in healthcare",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "wb2",
        "textKey": "templates.writeBlog.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb2-length",
            "placeholder": "1500 words",
            "color": "cyan",
            "suggestions": [
              "500 words",
              "800 words",
              "1000 words",
              "1500 words",
              "2000 words",
              "3000 words"
            ]
          }
        ]
      },
      {
        "id": "wb3",
        "textKey": "templates.writeBlog.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb3-tone",
            "placeholder": "informative yet engaging",
            "color": "green",
            "suggestions": [
              "informative yet engaging",
              "conversational",
              "authoritative",
              "inspirational",
              "humorous",
              "technical"
            ]
          }
        ]
      },
      {
        "id": "wb4",
        "textKey": "templates.writeBlog.line4",
        "type": "fixed"
      },
      {
        "id": "wb5",
        "textKey": "templates.writeBlog.line5",
        "type": "fixed"
      },
      {
        "id": "wb6",
        "textKey": "templates.writeBlog.line6",
        "type": "fixed"
      },
      {
        "id": "wb7",
        "textKey": "templates.writeBlog.line7",
        "type": "fixed"
      },
      {
        "id": "wb8",
        "textKey": "templates.writeBlog.line8",
        "type": "fixed"
      },
      {
        "id": "wb9",
        "textKey": "templates.writeBlog.line9",
        "type": "fixed"
      },
      {
        "id": "wb10",
        "textKey": "templates.writeBlog.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeDocumentation",
    "sections": [
      {
        "id": "wd1",
        "textKey": "templates.writeDocumentation.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd1-project",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "wd2",
        "textKey": "templates.writeDocumentation.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd2-type",
            "placeholder": "API reference",
            "color": "cyan",
            "suggestions": [
              "API reference",
              "getting started guide",
              "tutorial",
              "README",
              "architecture docs",
              "changelog",
              "migration guide"
            ]
          }
        ]
      },
      {
        "id": "wd3",
        "textKey": "templates.writeDocumentation.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd3-audience",
            "placeholder": "developers",
            "color": "green",
            "suggestions": [
              "developers",
              "end users",
              "DevOps engineers",
              "data scientists",
              "project managers",
              "beginners"
            ]
          }
        ]
      },
      {
        "id": "wd4",
        "textKey": "templates.writeDocumentation.line4",
        "type": "fixed"
      },
      {
        "id": "wd5",
        "textKey": "templates.writeDocumentation.line5",
        "type": "fixed"
      },
      {
        "id": "wd6",
        "textKey": "templates.writeDocumentation.line6",
        "type": "fixed"
      },
      {
        "id": "wd7",
        "textKey": "templates.writeDocumentation.line7",
        "type": "fixed"
      },
      {
        "id": "wd8",
        "textKey": "templates.writeDocumentation.line8",
        "type": "fixed"
      },
      {
        "id": "wd9",
        "textKey": "templates.writeDocumentation.line9",
        "type": "fixed"
      },
      {
        "id": "wd10",
        "textKey": "templates.writeDocumentation.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeProposal",
    "sections": [
      {
        "id": "wp1",
        "textKey": "templates.writeProposal.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wp1-project",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "wp2",
        "textKey": "templates.writeProposal.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wp2-audience",
            "placeholder": "executive leadership",
            "color": "green",
            "suggestions": [
              "executive leadership",
              "investors",
              "clients",
              "board of directors",
              "government agency",
              "internal stakeholders"
            ]
          }
        ]
      },
      {
        "id": "wp3",
        "textKey": "templates.writeProposal.line3",
        "type": "fixed"
      },
      {
        "id": "wp4",
        "textKey": "templates.writeProposal.line4",
        "type": "fixed"
      },
      {
        "id": "wp5",
        "textKey": "templates.writeProposal.line5",
        "type": "fixed"
      },
      {
        "id": "wp6",
        "textKey": "templates.writeProposal.line6",
        "type": "fixed"
      },
      {
        "id": "wp7",
        "textKey": "templates.writeProposal.line7",
        "type": "fixed"
      },
      {
        "id": "wp8",
        "textKey": "templates.writeProposal.line8",
        "type": "fixed"
      },
      {
        "id": "wp9",
        "textKey": "templates.writeProposal.line9",
        "type": "fixed"
      },
      {
        "id": "wp10",
        "textKey": "templates.writeProposal.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeStory",
    "sections": [
      {
        "id": "ws1",
        "textKey": "templates.writeStory.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws1-genre",
            "placeholder": "science fiction",
            "color": "yellow",
            "suggestions": [
              "science fiction",
              "fantasy",
              "mystery",
              "romance",
              "horror",
              "literary fiction",
              "thriller",
              "historical fiction",
              "comedy"
            ]
          }
        ]
      },
      {
        "id": "ws2",
        "textKey": "templates.writeStory.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws2-length",
            "placeholder": "2000 words",
            "color": "cyan",
            "suggestions": [
              "500 words (flash fiction)",
              "1000 words",
              "2000 words",
              "5000 words",
              "10000 words (novelette)"
            ]
          }
        ]
      },
      {
        "id": "ws3",
        "textKey": "templates.writeStory.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws3-pov",
            "placeholder": "third person limited",
            "color": "green",
            "suggestions": [
              "first person",
              "second person",
              "third person limited",
              "third person omniscient",
              "multiple POV"
            ]
          }
        ]
      },
      {
        "id": "ws4",
        "textKey": "templates.writeStory.line4",
        "type": "fixed"
      },
      {
        "id": "ws5",
        "textKey": "templates.writeStory.line5",
        "type": "fixed"
      },
      {
        "id": "ws6",
        "textKey": "templates.writeStory.line6",
        "type": "fixed"
      },
      {
        "id": "ws7",
        "textKey": "templates.writeStory.line7",
        "type": "fixed"
      },
      {
        "id": "ws8",
        "textKey": "templates.writeStory.line8",
        "type": "fixed"
      },
      {
        "id": "ws9",
        "textKey": "templates.writeStory.line9",
        "type": "fixed"
      },
      {
        "id": "ws10",
        "textKey": "templates.writeStory.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
