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
            "color": "yellow"
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
        "type": "fixed"
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
  }
];

export default templates;
