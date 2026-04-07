import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "summarizeArticle",
    "sections": [
      {
        "id": "sa1",
        "textKey": "templates.summarizeArticle.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sa1-topic",
            "placeholder": "the article topic",
            "color": "yellow",
            "suggestions": ["technology", "business", "health & wellness", "science", "politics", "culture", "personal finance", "climate & environment"]
          }
        ]
      },
      {
        "id": "sa2",
        "textKey": "templates.summarizeArticle.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sa2-length",
            "placeholder": "3-5 bullet points",
            "color": "cyan",
            "suggestions": [
              "1-2 sentences",
              "3-5 bullet points",
              "1 paragraph",
              "detailed summary"
            ]
          }
        ]
      },
      {
        "id": "sa3",
        "textKey": "templates.summarizeArticle.line3",
        "type": "fixed"
      },
      {
        "id": "sa4",
        "textKey": "templates.summarizeArticle.line4",
        "type": "fixed"
      },
      {
        "id": "sa5",
        "textKey": "templates.summarizeArticle.line5",
        "type": "fixed"
      },
      {
        "id": "sa6",
        "textKey": "templates.summarizeArticle.line6",
        "type": "fixed"
      },
      {
        "id": "sa7",
        "textKey": "templates.summarizeArticle.line7",
        "type": "fixed"
      },
      {
        "id": "sa8",
        "textKey": "templates.summarizeArticle.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "summarizeMeeting",
    "sections": [
      {
        "id": "sm1",
        "textKey": "templates.summarizeMeeting.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sm1-type",
            "placeholder": "team standup",
            "color": "yellow",
            "suggestions": [
              "team standup",
              "project review",
              "client call",
              "brainstorm session",
              "all-hands",
              "1-on-1",
              "board meeting"
            ]
          }
        ]
      },
      {
        "id": "sm2",
        "textKey": "templates.summarizeMeeting.line2",
        "type": "fixed"
      },
      {
        "id": "sm3",
        "textKey": "templates.summarizeMeeting.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sm3-length",
            "placeholder": "2-sentence",
            "color": "cyan",
            "suggestions": ["1-sentence", "2-sentence", "1-paragraph", "brief"]
          }
        ]
      },
      {
        "id": "sm4",
        "textKey": "templates.summarizeMeeting.line4",
        "type": "fixed"
      },
      {
        "id": "sm5",
        "textKey": "templates.summarizeMeeting.line5",
        "type": "fixed"
      },
      {
        "id": "sm6",
        "textKey": "templates.summarizeMeeting.line6",
        "type": "fixed"
      },
      {
        "id": "sm7",
        "textKey": "templates.summarizeMeeting.line7",
        "type": "fixed"
      },
      {
        "id": "sm8",
        "textKey": "templates.summarizeMeeting.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "summarizeVideo",
    "sections": [
      {
        "id": "sv1",
        "textKey": "templates.summarizeVideo.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sv1-type",
            "placeholder": "YouTube video",
            "color": "yellow",
            "suggestions": [
              "YouTube video",
              "podcast episode",
              "webinar",
              "lecture",
              "conference talk",
              "tutorial video"
            ]
          }
        ]
      },
      {
        "id": "sv2",
        "textKey": "templates.summarizeVideo.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sv2-length",
            "placeholder": "detailed with timestamps",
            "color": "cyan",
            "suggestions": [
              "brief (3-5 points)",
              "detailed with timestamps",
              "chapter-by-chapter",
              "key quotes only"
            ]
          }
        ]
      },
      {
        "id": "sv3",
        "textKey": "templates.summarizeVideo.line3",
        "type": "fixed"
      },
      {
        "id": "sv4",
        "textKey": "templates.summarizeVideo.line4",
        "type": "fixed"
      },
      {
        "id": "sv5",
        "textKey": "templates.summarizeVideo.line5",
        "type": "fixed"
      },
      {
        "id": "sv6",
        "textKey": "templates.summarizeVideo.line6",
        "type": "fixed"
      },
      {
        "id": "sv7",
        "textKey": "templates.summarizeVideo.line7",
        "type": "fixed"
      },
      {
        "id": "sv8",
        "textKey": "templates.summarizeVideo.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "summarizeBook",
    "sections": [
      {
        "id": "sb1",
        "textKey": "templates.summarizeBook.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sb1-title",
            "placeholder": "the book title",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "sb2",
        "textKey": "templates.summarizeBook.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sb2-length",
            "placeholder": "chapter-by-chapter",
            "color": "cyan",
            "suggestions": [
              "one-page overview",
              "chapter-by-chapter",
              "key themes only",
              "detailed analysis"
            ]
          }
        ]
      },
      {
        "id": "sb3",
        "textKey": "templates.summarizeBook.line3",
        "type": "fixed"
      },
      {
        "id": "sb4",
        "textKey": "templates.summarizeBook.line4",
        "type": "fixed"
      },
      {
        "id": "sb5",
        "textKey": "templates.summarizeBook.line5",
        "type": "fixed"
      },
      {
        "id": "sb6",
        "textKey": "templates.summarizeBook.line6",
        "type": "fixed"
      },
      {
        "id": "sb7",
        "textKey": "templates.summarizeBook.line7",
        "type": "fixed"
      },
      {
        "id": "sb8",
        "textKey": "templates.summarizeBook.line8",
        "type": "fixed"
      },
      {
        "id": "sb9",
        "textKey": "templates.summarizeBook.line9",
        "type": "fixed"
      },
      {
        "id": "sb10",
        "textKey": "templates.summarizeBook.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "summarizeResearch",
    "sections": [
      {
        "id": "sr1",
        "textKey": "templates.summarizeResearch.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sr1-field",
            "placeholder": "computer science",
            "color": "green",
            "suggestions": [
              "computer science",
              "medicine",
              "physics",
              "biology",
              "economics",
              "psychology",
              "engineering"
            ]
          }
        ]
      },
      {
        "id": "sr2",
        "textKey": "templates.summarizeResearch.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sr2-length",
            "placeholder": "structured abstract",
            "color": "cyan",
            "suggestions": [
              "one paragraph",
              "structured abstract",
              "detailed breakdown",
              "bullet points only"
            ]
          }
        ]
      },
      {
        "id": "sr3",
        "textKey": "templates.summarizeResearch.line3",
        "type": "fixed"
      },
      {
        "id": "sr4",
        "textKey": "templates.summarizeResearch.line4",
        "type": "fixed"
      },
      {
        "id": "sr5",
        "textKey": "templates.summarizeResearch.line5",
        "type": "fixed"
      },
      {
        "id": "sr6",
        "textKey": "templates.summarizeResearch.line6",
        "type": "fixed"
      },
      {
        "id": "sr7",
        "textKey": "templates.summarizeResearch.line7",
        "type": "fixed"
      },
      {
        "id": "sr8",
        "textKey": "templates.summarizeResearch.line8",
        "type": "fixed"
      },
      {
        "id": "sr9",
        "textKey": "templates.summarizeResearch.line9",
        "type": "fixed"
      },
      {
        "id": "sr10",
        "textKey": "templates.summarizeResearch.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "summarizePodcast",
    "sections": [
      {
        "id": "spc1",
        "textKey": "templates.summarizePodcast.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "spc1-name",
            "placeholder": "the podcast episode",
            "color": "yellow",
            "suggestions": ["the podcast episode", "this interview", "the panel discussion", "this week's episode", "the solo episode"]
          }
        ]
      },
      {
        "id": "spc2",
        "textKey": "templates.summarizePodcast.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "spc2-length",
            "placeholder": "concise (1 page)",
            "color": "cyan",
            "suggestions": ["bullet points", "concise (1 page)", "detailed (2-3 pages)", "tweet-length"]
          }
        ]
      },
      { "id": "spc3", "textKey": "templates.summarizePodcast.line3", "type": "fixed" },
      { "id": "spc4", "textKey": "templates.summarizePodcast.line4", "type": "fixed" },
      { "id": "spc5", "textKey": "templates.summarizePodcast.line5", "type": "fixed" },
      { "id": "spc6", "textKey": "templates.summarizePodcast.line6", "type": "fixed" },
      { "id": "spc7", "textKey": "templates.summarizePodcast.line7", "type": "fixed" },
      { "id": "spc8", "textKey": "templates.summarizePodcast.line8", "type": "fixed" },
      { "id": "spc9", "textKey": "templates.summarizePodcast.line9", "type": "fixed" },
      { "id": "spc10", "textKey": "templates.summarizePodcast.line10", "type": "fixed" }
    ]
  },
  {
    "id": "summarizeLegal",
    "sections": [
      {
        "id": "slg1",
        "textKey": "templates.summarizeLegal.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "slg1-type",
            "placeholder": "terms of service",
            "color": "yellow",
            "suggestions": ["terms of service", "privacy policy", "NDA", "employment contract", "lease agreement", "software license", "partnership agreement"]
          }
        ]
      },
      {
        "id": "slg2",
        "textKey": "templates.summarizeLegal.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "slg2-focus",
            "placeholder": "risks and obligations",
            "color": "green",
            "suggestions": ["risks and obligations", "key terms and conditions", "what I can and can't do", "financial implications", "termination clauses", "liability and indemnification"]
          }
        ]
      },
      { "id": "slg3", "textKey": "templates.summarizeLegal.line3", "type": "fixed" },
      { "id": "slg4", "textKey": "templates.summarizeLegal.line4", "type": "fixed" },
      { "id": "slg5", "textKey": "templates.summarizeLegal.line5", "type": "fixed" },
      { "id": "slg6", "textKey": "templates.summarizeLegal.line6", "type": "fixed" },
      { "id": "slg7", "textKey": "templates.summarizeLegal.line7", "type": "fixed" },
      { "id": "slg8", "textKey": "templates.summarizeLegal.line8", "type": "fixed" },
      { "id": "slg9", "textKey": "templates.summarizeLegal.line9", "type": "fixed" },
      { "id": "slg10", "textKey": "templates.summarizeLegal.line10", "type": "fixed" }
    ]
  },
  {
    "id": "summarizeConversation",
    "sections": [
      {
        "id": "scv1",
        "textKey": "templates.summarizeConversation.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "scv1-type",
            "placeholder": "Slack thread",
            "color": "yellow",
            "suggestions": ["Slack thread", "email chain", "forum discussion", "chat log", "comment section", "support ticket thread"]
          }
        ]
      },
      {
        "id": "scv2",
        "textKey": "templates.summarizeConversation.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "scv2-focus",
            "placeholder": "decisions and action items",
            "color": "green",
            "suggestions": ["decisions and action items", "key arguments for and against", "consensus points", "unresolved questions", "timeline of events"]
          }
        ]
      },
      { "id": "scv3", "textKey": "templates.summarizeConversation.line3", "type": "fixed" },
      { "id": "scv4", "textKey": "templates.summarizeConversation.line4", "type": "fixed" },
      { "id": "scv5", "textKey": "templates.summarizeConversation.line5", "type": "fixed" },
      { "id": "scv6", "textKey": "templates.summarizeConversation.line6", "type": "fixed" },
      { "id": "scv7", "textKey": "templates.summarizeConversation.line7", "type": "fixed" },
      { "id": "scv8", "textKey": "templates.summarizeConversation.line8", "type": "fixed" },
      { "id": "scv9", "textKey": "templates.summarizeConversation.line9", "type": "fixed" },
      { "id": "scv10", "textKey": "templates.summarizeConversation.line10", "type": "fixed" }
    ]
  },
  {
    "id": "summarizeEmail",
    "sections": [
      {
        "id": "sem1",
        "textKey": "templates.summarizeEmail.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sem1-type",
            "placeholder": "email thread",
            "color": "yellow",
            "suggestions": ["email thread", "newsletter", "email chain", "mailing list digest", "inbox batch", "customer email"]
          }
        ]
      },
      {
        "id": "sem2",
        "textKey": "templates.summarizeEmail.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "sem2-format",
            "placeholder": "bullet points",
            "color": "cyan",
            "suggestions": ["bullet points", "one paragraph", "TL;DR only", "structured with headers", "action items list"]
          }
        ]
      },
      { "id": "sem3", "textKey": "templates.summarizeEmail.line3", "type": "fixed" },
      { "id": "sem4", "textKey": "templates.summarizeEmail.line4", "type": "fixed" },
      { "id": "sem5", "textKey": "templates.summarizeEmail.line5", "type": "fixed" },
      { "id": "sem6", "textKey": "templates.summarizeEmail.line6", "type": "fixed" },
      { "id": "sem7", "textKey": "templates.summarizeEmail.line7", "type": "fixed" },
      { "id": "sem8", "textKey": "templates.summarizeEmail.line8", "type": "fixed" }
    ]
  },
  {
    "id": "summarizeReport",
    "sections": [
      {
        "id": "srp1",
        "textKey": "templates.summarizeReport.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "srp1-type",
            "placeholder": "quarterly business",
            "color": "yellow",
            "suggestions": ["quarterly business", "annual financial", "technical", "market research", "project status", "audit", "incident"]
          }
        ]
      },
      {
        "id": "srp2",
        "textKey": "templates.summarizeReport.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "srp2-audience",
            "placeholder": "executive leadership",
            "color": "green",
            "suggestions": ["executive leadership", "technical team", "investors", "board of directors", "general audience", "project stakeholders"]
          }
        ]
      },
      { "id": "srp3", "textKey": "templates.summarizeReport.line3", "type": "fixed" },
      { "id": "srp4", "textKey": "templates.summarizeReport.line4", "type": "fixed" },
      { "id": "srp5", "textKey": "templates.summarizeReport.line5", "type": "fixed" },
      { "id": "srp6", "textKey": "templates.summarizeReport.line6", "type": "fixed" },
      { "id": "srp7", "textKey": "templates.summarizeReport.line7", "type": "fixed" },
      { "id": "srp8", "textKey": "templates.summarizeReport.line8", "type": "fixed" },
      { "id": "srp9", "textKey": "templates.summarizeReport.line9", "type": "fixed" },
      { "id": "srp10", "textKey": "templates.summarizeReport.line10", "type": "fixed" }
    ]
  }
];

export default templates;
