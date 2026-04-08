import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "readWebpage",
    "sections": [
      {
        "id": "rw1",
        "textKey": "templates.readWebpage.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rw1-url",
            "placeholder": "the webpage URL or content",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "rw2",
        "textKey": "templates.readWebpage.line2",
        "type": "fixed"
      },
      {
        "id": "rw3",
        "textKey": "templates.readWebpage.line3",
        "type": "fixed"
      },
      {
        "id": "rw4",
        "textKey": "templates.readWebpage.line4",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rw4-focus",
            "placeholder": "claims and arguments",
            "color": "green",
            "suggestions": ["claims and arguments", "data points and statistics", "recommendations", "opinions and analysis", "product details", "instructions and steps"]
          }
        ]
      },
      {
        "id": "rw5",
        "textKey": "templates.readWebpage.line5",
        "type": "fixed"
      },
      {
        "id": "rw6",
        "textKey": "templates.readWebpage.line6",
        "type": "fixed"
      },
      {
        "id": "rw7",
        "textKey": "templates.readWebpage.line7",
        "type": "fixed"
      },
      {
        "id": "rw8",
        "textKey": "templates.readWebpage.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readDocument",
    "sections": [
      {
        "id": "rd1",
        "textKey": "templates.readDocument.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rd1-type",
            "placeholder": "document",
            "color": "yellow",
            "suggestions": [
              "document",
              "report",
              "article",
              "book chapter",
              "whitepaper",
              "memo"
            ]
          }
        ]
      },
      {
        "id": "rd2",
        "textKey": "templates.readDocument.line2",
        "type": "fixed"
      },
      {
        "id": "rd3",
        "textKey": "templates.readDocument.line3",
        "type": "fixed"
      },
      {
        "id": "rd4",
        "textKey": "templates.readDocument.line4",
        "type": "fixed"
      },
      {
        "id": "rd5",
        "textKey": "templates.readDocument.line5",
        "type": "fixed"
      },
      {
        "id": "rd6",
        "textKey": "templates.readDocument.line6",
        "type": "fixed"
      },
      {
        "id": "rd7",
        "textKey": "templates.readDocument.line7",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rd7-count",
            "placeholder": "3",
            "color": "cyan",
            "inputType": "number",
            "min": 1,
            "max": 10
          }
        ]
      },
      {
        "id": "rd8",
        "textKey": "templates.readDocument.line8",
        "type": "fixed"
      },
      {
        "id": "rd9",
        "textKey": "templates.readDocument.line9",
        "type": "fixed"
      },
      {
        "id": "rd10",
        "textKey": "templates.readDocument.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readEmail",
    "sections": [
      {
        "id": "re1",
        "textKey": "templates.readEmail.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "re1-context",
            "placeholder": "work",
            "color": "green",
            "suggestions": ["work", "personal", "sales", "customer support", "recruitment", "legal"]
          }
        ]
      },
      {
        "id": "re2",
        "textKey": "templates.readEmail.line2",
        "type": "fixed"
      },
      {
        "id": "re3",
        "textKey": "templates.readEmail.line3",
        "type": "fixed"
      },
      {
        "id": "re4",
        "textKey": "templates.readEmail.line4",
        "type": "fixed"
      },
      {
        "id": "re5",
        "textKey": "templates.readEmail.line5",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "re5-tone",
            "placeholder": "professional",
            "color": "green",
            "suggestions": [
              "professional",
              "friendly",
              "apologetic",
              "urgent",
              "casual"
            ]
          }
        ]
      },
      {
        "id": "re6",
        "textKey": "templates.readEmail.line6",
        "type": "fixed"
      },
      {
        "id": "re7",
        "textKey": "templates.readEmail.line7",
        "type": "fixed"
      },
      {
        "id": "re8",
        "textKey": "templates.readEmail.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readCode",
    "sections": [
      {
        "id": "rc1",
        "textKey": "templates.readCode.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rc1-lang",
            "placeholder": "JavaScript/TypeScript",
            "color": "cyan",
            "suggestions": [
              "JavaScript/TypeScript",
              "Python",
              "Java",
              "Go",
              "Rust",
              "C#",
              "Ruby",
              "PHP",
              "Swift",
              "Kotlin"
            ]
          }
        ]
      },
      {
        "id": "rc2",
        "textKey": "templates.readCode.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rc2-focus",
            "placeholder": "bugs and security",
            "color": "cyan",
            "suggestions": ["bugs and security", "performance optimization", "code readability", "architecture and design patterns", "error handling", "test coverage"]
          }
        ]
      },
      {
        "id": "rc3",
        "textKey": "templates.readCode.line3",
        "type": "fixed"
      },
      {
        "id": "rc4",
        "textKey": "templates.readCode.line4",
        "type": "fixed"
      },
      {
        "id": "rc5",
        "textKey": "templates.readCode.line5",
        "type": "fixed"
      },
      {
        "id": "rc6",
        "textKey": "templates.readCode.line6",
        "type": "fixed"
      },
      {
        "id": "rc7",
        "textKey": "templates.readCode.line7",
        "type": "fixed"
      },
      {
        "id": "rc8",
        "textKey": "templates.readCode.line8",
        "type": "fixed"
      },
      {
        "id": "rc9",
        "textKey": "templates.readCode.line9",
        "type": "fixed"
      },
      {
        "id": "rc10",
        "textKey": "templates.readCode.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readResearch",
    "sections": [
      {
        "id": "rr1",
        "textKey": "templates.readResearch.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rr1-field",
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
        "id": "rr2",
        "textKey": "templates.readResearch.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rr2-depth",
            "placeholder": "comprehensive",
            "color": "cyan",
            "suggestions": ["comprehensive", "quick overview", "methodology-focused", "findings-focused", "critical analysis", "literature comparison"]
          }
        ]
      },
      {
        "id": "rr3",
        "textKey": "templates.readResearch.line3",
        "type": "fixed"
      },
      {
        "id": "rr4",
        "textKey": "templates.readResearch.line4",
        "type": "fixed"
      },
      {
        "id": "rr5",
        "textKey": "templates.readResearch.line5",
        "type": "fixed"
      },
      {
        "id": "rr6",
        "textKey": "templates.readResearch.line6",
        "type": "fixed"
      },
      {
        "id": "rr7",
        "textKey": "templates.readResearch.line7",
        "type": "fixed"
      },
      {
        "id": "rr8",
        "textKey": "templates.readResearch.line8",
        "type": "fixed"
      },
      {
        "id": "rr9",
        "textKey": "templates.readResearch.line9",
        "type": "fixed"
      },
      {
        "id": "rr10",
        "textKey": "templates.readResearch.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readContract",
    "sections": [
      {
        "id": "rct1",
        "textKey": "templates.readContract.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rct1-type",
            "placeholder": "employment contract",
            "color": "yellow",
            "suggestions": ["employment contract", "NDA", "SaaS agreement", "lease", "freelance contract", "partnership agreement", "terms of service"]
          }
        ]
      },
      {
        "id": "rct2",
        "textKey": "templates.readContract.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rct2-role",
            "placeholder": "the signing party",
            "color": "green",
            "suggestions": ["the signing party", "employer", "employee", "freelancer", "tenant", "vendor", "buyer"]
          }
        ]
      },
      { "id": "rct3", "textKey": "templates.readContract.line3", "type": "fixed" },
      { "id": "rct4", "textKey": "templates.readContract.line4", "type": "fixed" },
      { "id": "rct5", "textKey": "templates.readContract.line5", "type": "fixed" },
      { "id": "rct6", "textKey": "templates.readContract.line6", "type": "fixed" },
      { "id": "rct7", "textKey": "templates.readContract.line7", "type": "fixed" },
      { "id": "rct8", "textKey": "templates.readContract.line8", "type": "fixed" },
      { "id": "rct9", "textKey": "templates.readContract.line9", "type": "fixed" },
      { "id": "rct10", "textKey": "templates.readContract.line10", "type": "fixed" }
    ]
  },
  {
    "id": "readSpreadsheet",
    "sections": [
      {
        "id": "rss1",
        "textKey": "templates.readSpreadsheet.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rss1-type",
            "placeholder": "sales data spreadsheet",
            "color": "yellow",
            "suggestions": ["sales data spreadsheet", "financial report", "survey results", "inventory list", "project tracker", "analytics export"]
          }
        ]
      },
      {
        "id": "rss2",
        "textKey": "templates.readSpreadsheet.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rss2-goal",
            "placeholder": "identify trends and anomalies",
            "color": "green",
            "suggestions": ["identify trends and anomalies", "find errors or inconsistencies", "summarize key metrics", "prepare for a presentation", "create a report", "make a decision"]
          }
        ]
      },
      { "id": "rss3", "textKey": "templates.readSpreadsheet.line3", "type": "fixed" },
      { "id": "rss4", "textKey": "templates.readSpreadsheet.line4", "type": "fixed" },
      { "id": "rss5", "textKey": "templates.readSpreadsheet.line5", "type": "fixed" },
      { "id": "rss6", "textKey": "templates.readSpreadsheet.line6", "type": "fixed" },
      { "id": "rss7", "textKey": "templates.readSpreadsheet.line7", "type": "fixed" },
      { "id": "rss8", "textKey": "templates.readSpreadsheet.line8", "type": "fixed" },
      { "id": "rss9", "textKey": "templates.readSpreadsheet.line9", "type": "fixed" },
      { "id": "rss10", "textKey": "templates.readSpreadsheet.line10", "type": "fixed" }
    ]
  },
  {
    "id": "readCompare",
    "sections": [
      {
        "id": "rcm1",
        "textKey": "templates.readCompare.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rcm1-count",
            "placeholder": "2",
            "color": "cyan",
            "inputType": "number",
            "min": 2,
            "max": 10
          }
        ]
      },
      {
        "id": "rcm2",
        "textKey": "templates.readCompare.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rcm2-focus",
            "placeholder": "key dimensions",
            "color": "green",
            "suggestions": ["key dimensions", "features and capabilities", "pricing and costs", "methodology", "conclusions", "strengths and weaknesses"]
          }
        ]
      },
      {
        "id": "rcm3",
        "textKey": "templates.readCompare.line3",
        "type": "fixed"
      },
      {
        "id": "rcm4",
        "textKey": "templates.readCompare.line4",
        "type": "fixed"
      },
      {
        "id": "rcm5",
        "textKey": "templates.readCompare.line5",
        "type": "fixed"
      },
      {
        "id": "rcm6",
        "textKey": "templates.readCompare.line6",
        "type": "fixed"
      },
      {
        "id": "rcm7",
        "textKey": "templates.readCompare.line7",
        "type": "fixed"
      },
      {
        "id": "rcm8",
        "textKey": "templates.readCompare.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readFactCheck",
    "sections": [
      {
        "id": "rfc1",
        "textKey": "templates.readFactCheck.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rfc1-topic",
            "placeholder": "news article",
            "color": "yellow",
            "suggestions": ["news article", "social media post", "political speech", "blog post", "press release", "advertisement"]
          }
        ]
      },
      {
        "id": "rfc2",
        "textKey": "templates.readFactCheck.line2",
        "type": "fixed"
      },
      {
        "id": "rfc3",
        "textKey": "templates.readFactCheck.line3",
        "type": "fixed"
      },
      {
        "id": "rfc4",
        "textKey": "templates.readFactCheck.line4",
        "type": "fixed"
      },
      {
        "id": "rfc5",
        "textKey": "templates.readFactCheck.line5",
        "type": "fixed"
      },
      {
        "id": "rfc6",
        "textKey": "templates.readFactCheck.line6",
        "type": "fixed"
      },
      {
        "id": "rfc7",
        "textKey": "templates.readFactCheck.line7",
        "type": "fixed"
      },
      {
        "id": "rfc8",
        "textKey": "templates.readFactCheck.line8",
        "type": "fixed"
      },
      {
        "id": "rfc9",
        "textKey": "templates.readFactCheck.line9",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rfc9-count",
            "placeholder": "3",
            "color": "cyan",
            "inputType": "number",
            "min": 1,
            "max": 10
          }
        ]
      },
      {
        "id": "rfc10",
        "textKey": "templates.readFactCheck.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readResume",
    "sections": [
      {
        "id": "rrs1",
        "textKey": "templates.readResume.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rrs1-role",
            "placeholder": "software engineer",
            "color": "yellow",
            "suggestions": ["software engineer", "product manager", "data scientist", "designer", "marketing manager", "project manager", "sales representative"]
          }
        ]
      },
      {
        "id": "rrs2",
        "textKey": "templates.readResume.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rrs2-level",
            "placeholder": "mid-level",
            "color": "green",
            "suggestions": ["junior", "mid-level", "senior", "lead", "principal", "executive"]
          }
        ]
      },
      { "id": "rrs3", "textKey": "templates.readResume.line3", "type": "fixed" },
      { "id": "rrs4", "textKey": "templates.readResume.line4", "type": "fixed" },
      { "id": "rrs5", "textKey": "templates.readResume.line5", "type": "fixed" },
      { "id": "rrs6", "textKey": "templates.readResume.line6", "type": "fixed" },
      { "id": "rrs7", "textKey": "templates.readResume.line7", "type": "fixed" },
      { "id": "rrs8", "textKey": "templates.readResume.line8", "type": "fixed" },
      { "id": "rrs9", "textKey": "templates.readResume.line9", "type": "fixed" },
      { "id": "rrs10", "textKey": "templates.readResume.line10", "type": "fixed" }
    ]
  },
  {
    "id": "readTranscript",
    "sections": [
      {
        "id": "rtr1",
        "textKey": "templates.readTranscript.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rtr1-type",
            "placeholder": "meeting",
            "color": "yellow",
            "suggestions": ["meeting", "interview", "podcast", "webinar", "phone call", "deposition", "lecture"]
          }
        ]
      },
      { "id": "rtr2", "textKey": "templates.readTranscript.line2", "type": "fixed" },
      { "id": "rtr3", "textKey": "templates.readTranscript.line3", "type": "fixed" },
      { "id": "rtr4", "textKey": "templates.readTranscript.line4", "type": "fixed" },
      { "id": "rtr5", "textKey": "templates.readTranscript.line5", "type": "fixed" },
      {
        "id": "rtr6",
        "textKey": "templates.readTranscript.line6",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rtr6-count",
            "placeholder": "5",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 10
          }
        ]
      },
      { "id": "rtr7", "textKey": "templates.readTranscript.line7", "type": "fixed" },
      { "id": "rtr8", "textKey": "templates.readTranscript.line8", "type": "fixed" },
      { "id": "rtr9", "textKey": "templates.readTranscript.line9", "type": "fixed" },
      { "id": "rtr10", "textKey": "templates.readTranscript.line10", "type": "fixed" }
    ]
  }
];

export default templates;
