import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "explainCode",
    "sections": [
      {
        "id": "ec1",
        "textKey": "templates.explainCode.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ec1-lang",
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
              "Kotlin",
              "C/C++"
            ]
          }
        ]
      },
      {
        "id": "ec2",
        "textKey": "templates.explainCode.line2",
        "type": "fixed"
      },
      {
        "id": "ec3",
        "textKey": "templates.explainCode.line3",
        "type": "fixed"
      },
      {
        "id": "ec4",
        "textKey": "templates.explainCode.line4",
        "type": "fixed"
      },
      {
        "id": "ec5",
        "textKey": "templates.explainCode.line5",
        "type": "fixed"
      },
      {
        "id": "ec6",
        "textKey": "templates.explainCode.line6",
        "type": "fixed"
      },
      {
        "id": "ec7",
        "textKey": "templates.explainCode.line7",
        "type": "fixed"
      },
      {
        "id": "ec8",
        "textKey": "templates.explainCode.line8",
        "type": "fixed"
      },
      {
        "id": "ec9",
        "textKey": "templates.explainCode.line9",
        "type": "fixed"
      },
      {
        "id": "ec10",
        "textKey": "templates.explainCode.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "explainConcept",
    "sections": [
      {
        "id": "ecn1",
        "textKey": "templates.explainConcept.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ecn1-concept",
            "placeholder": "the concept",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "ecn2",
        "textKey": "templates.explainConcept.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ecn2-level",
            "placeholder": "beginner-friendly",
            "color": "green",
            "suggestions": [
              "ELI5",
              "beginner-friendly",
              "intermediate",
              "technical",
              "expert-level"
            ]
          }
        ]
      },
      {
        "id": "ecn3",
        "textKey": "templates.explainConcept.line3",
        "type": "fixed"
      },
      {
        "id": "ecn4",
        "textKey": "templates.explainConcept.line4",
        "type": "fixed"
      },
      {
        "id": "ecn5",
        "textKey": "templates.explainConcept.line5",
        "type": "fixed"
      },
      {
        "id": "ecn6",
        "textKey": "templates.explainConcept.line6",
        "type": "fixed"
      },
      {
        "id": "ecn7",
        "textKey": "templates.explainConcept.line7",
        "type": "fixed"
      },
      {
        "id": "ecn8",
        "textKey": "templates.explainConcept.line8",
        "type": "fixed"
      },
      {
        "id": "ecn9",
        "textKey": "templates.explainConcept.line9",
        "type": "fixed"
      },
      {
        "id": "ecn10",
        "textKey": "templates.explainConcept.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "explainProcess",
    "sections": [
      {
        "id": "ep1",
        "textKey": "templates.explainProcess.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ep1-process",
            "placeholder": "the process",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "ep2",
        "textKey": "templates.explainProcess.line2",
        "type": "fixed"
      },
      {
        "id": "ep3",
        "textKey": "templates.explainProcess.line3",
        "type": "fixed"
      },
      {
        "id": "ep4",
        "textKey": "templates.explainProcess.line4",
        "type": "fixed"
      },
      {
        "id": "ep5",
        "textKey": "templates.explainProcess.line5",
        "type": "fixed"
      },
      {
        "id": "ep6",
        "textKey": "templates.explainProcess.line6",
        "type": "fixed"
      },
      {
        "id": "ep7",
        "textKey": "templates.explainProcess.line7",
        "type": "fixed"
      },
      {
        "id": "ep8",
        "textKey": "templates.explainProcess.line8",
        "type": "fixed"
      },
      {
        "id": "ep9",
        "textKey": "templates.explainProcess.line9",
        "type": "fixed"
      },
      {
        "id": "ep10",
        "textKey": "templates.explainProcess.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "explainError",
    "sections": [
      {
        "id": "ee1",
        "textKey": "templates.explainError.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ee1-error",
            "placeholder": "the error message",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "ee2",
        "textKey": "templates.explainError.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ee2-lang",
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
        "id": "ee3",
        "textKey": "templates.explainError.line3",
        "type": "fixed"
      },
      {
        "id": "ee4",
        "textKey": "templates.explainError.line4",
        "type": "fixed"
      },
      {
        "id": "ee5",
        "textKey": "templates.explainError.line5",
        "type": "fixed"
      },
      {
        "id": "ee6",
        "textKey": "templates.explainError.line6",
        "type": "fixed"
      },
      {
        "id": "ee7",
        "textKey": "templates.explainError.line7",
        "type": "fixed"
      },
      {
        "id": "ee8",
        "textKey": "templates.explainError.line8",
        "type": "fixed"
      },
      {
        "id": "ee9",
        "textKey": "templates.explainError.line9",
        "type": "fixed"
      },
      {
        "id": "ee10",
        "textKey": "templates.explainError.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "explainArchitecture",
    "sections": [
      {
        "id": "ea1",
        "textKey": "templates.explainArchitecture.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ea1-system",
            "placeholder": "this system/architecture",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "ea2",
        "textKey": "templates.explainArchitecture.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ea2-level",
            "placeholder": "high-level overview",
            "color": "green",
            "suggestions": [
              "high-level overview",
              "detailed deep-dive",
              "component-level",
              "data flow focus",
              "security focus"
            ]
          }
        ]
      },
      {
        "id": "ea3",
        "textKey": "templates.explainArchitecture.line3",
        "type": "fixed"
      },
      {
        "id": "ea4",
        "textKey": "templates.explainArchitecture.line4",
        "type": "fixed"
      },
      {
        "id": "ea5",
        "textKey": "templates.explainArchitecture.line5",
        "type": "fixed"
      },
      {
        "id": "ea6",
        "textKey": "templates.explainArchitecture.line6",
        "type": "fixed"
      },
      {
        "id": "ea7",
        "textKey": "templates.explainArchitecture.line7",
        "type": "fixed"
      },
      {
        "id": "ea8",
        "textKey": "templates.explainArchitecture.line8",
        "type": "fixed"
      },
      {
        "id": "ea9",
        "textKey": "templates.explainArchitecture.line9",
        "type": "fixed"
      },
      {
        "id": "ea10",
        "textKey": "templates.explainArchitecture.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
