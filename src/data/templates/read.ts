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
        "type": "fixed"
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
        "type": "fixed"
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
        "type": "fixed"
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
        "type": "fixed"
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
        "type": "fixed"
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
    "id": "readSummary",
    "sections": [
      {
        "id": "rs1",
        "textKey": "templates.readSummary.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rs1-length",
            "placeholder": "3-5 bullet points",
            "color": "cyan",
            "suggestions": [
              "1-2 sentences",
              "3-5 bullet points",
              "1 paragraph",
              "half page"
            ]
          }
        ]
      },
      {
        "id": "rs2",
        "textKey": "templates.readSummary.line2",
        "type": "fixed"
      },
      {
        "id": "rs3",
        "textKey": "templates.readSummary.line3",
        "type": "fixed"
      },
      {
        "id": "rs4",
        "textKey": "templates.readSummary.line4",
        "type": "fixed"
      },
      {
        "id": "rs5",
        "textKey": "templates.readSummary.line5",
        "type": "fixed"
      },
      {
        "id": "rs6",
        "textKey": "templates.readSummary.line6",
        "type": "fixed"
      },
      {
        "id": "rs7",
        "textKey": "templates.readSummary.line7",
        "type": "fixed"
      },
      {
        "id": "rs8",
        "textKey": "templates.readSummary.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readKeyPoints",
    "sections": [
      {
        "id": "rk1",
        "textKey": "templates.readKeyPoints.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "rk1-count",
            "placeholder": "10",
            "color": "cyan",
            "inputType": "number",
            "min": 3,
            "max": 30
          }
        ]
      },
      {
        "id": "rk2",
        "textKey": "templates.readKeyPoints.line2",
        "type": "fixed"
      },
      {
        "id": "rk3",
        "textKey": "templates.readKeyPoints.line3",
        "type": "fixed"
      },
      {
        "id": "rk4",
        "textKey": "templates.readKeyPoints.line4",
        "type": "fixed"
      },
      {
        "id": "rk5",
        "textKey": "templates.readKeyPoints.line5",
        "type": "fixed"
      },
      {
        "id": "rk6",
        "textKey": "templates.readKeyPoints.line6",
        "type": "fixed"
      },
      {
        "id": "rk7",
        "textKey": "templates.readKeyPoints.line7",
        "type": "fixed"
      },
      {
        "id": "rk8",
        "textKey": "templates.readKeyPoints.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "readFullAnalysis",
    "sections": [
      {
        "id": "rf1",
        "textKey": "templates.readFullAnalysis.line1",
        "type": "fixed"
      },
      {
        "id": "rf2",
        "textKey": "templates.readFullAnalysis.line2",
        "type": "fixed"
      },
      {
        "id": "rf3",
        "textKey": "templates.readFullAnalysis.line3",
        "type": "fixed"
      },
      {
        "id": "rf4",
        "textKey": "templates.readFullAnalysis.line4",
        "type": "fixed"
      },
      {
        "id": "rf5",
        "textKey": "templates.readFullAnalysis.line5",
        "type": "fixed"
      },
      {
        "id": "rf6",
        "textKey": "templates.readFullAnalysis.line6",
        "type": "fixed"
      },
      {
        "id": "rf7",
        "textKey": "templates.readFullAnalysis.line7",
        "type": "fixed"
      },
      {
        "id": "rf8",
        "textKey": "templates.readFullAnalysis.line8",
        "type": "fixed"
      },
      {
        "id": "rf9",
        "textKey": "templates.readFullAnalysis.line9",
        "type": "fixed"
      },
      {
        "id": "rf10",
        "textKey": "templates.readFullAnalysis.line10",
        "type": "fixed"
      }
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
        "type": "fixed"
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
        "type": "fixed"
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
        "type": "fixed"
      },
      {
        "id": "rfc10",
        "textKey": "templates.readFactCheck.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
