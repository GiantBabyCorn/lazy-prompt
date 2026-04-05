import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "learnProgramming",
    "sections": [
      {
        "id": "lp1",
        "textKey": "templates.learnProgramming.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lp1-topic",
            "placeholder": "React hooks",
            "color": "yellow",
            "suggestions": [
              "React hooks",
              "Python async/await",
              "TypeScript generics",
              "SQL joins",
              "Docker",
              "Git branching",
              "REST API design",
              "GraphQL"
            ]
          }
        ]
      },
      {
        "id": "lp2",
        "textKey": "templates.learnProgramming.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lp2-level",
            "placeholder": "intermediate",
            "color": "green",
            "suggestions": [
              "complete beginner",
              "beginner",
              "intermediate",
              "advanced",
              "expert"
            ]
          }
        ]
      },
      {
        "id": "lp3",
        "textKey": "templates.learnProgramming.line3",
        "type": "fixed"
      },
      {
        "id": "lp4",
        "textKey": "templates.learnProgramming.line4",
        "type": "fixed"
      },
      {
        "id": "lp5",
        "textKey": "templates.learnProgramming.line5",
        "type": "fixed"
      },
      {
        "id": "lp6",
        "textKey": "templates.learnProgramming.line6",
        "type": "fixed"
      },
      {
        "id": "lp7",
        "textKey": "templates.learnProgramming.line7",
        "type": "fixed"
      },
      {
        "id": "lp8",
        "textKey": "templates.learnProgramming.line8",
        "type": "fixed"
      },
      {
        "id": "lp9",
        "textKey": "templates.learnProgramming.line9",
        "type": "fixed"
      },
      {
        "id": "lp10",
        "textKey": "templates.learnProgramming.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "learnLanguage",
    "sections": [
      {
        "id": "ll1",
        "textKey": "templates.learnLanguage.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ll1-target",
            "placeholder": "Japanese",
            "color": "yellow",
            "suggestions": [
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Chinese (Mandarin)",
              "Italian",
              "Portuguese",
              "Arabic",
              "Russian"
            ]
          }
        ]
      },
      {
        "id": "ll2",
        "textKey": "templates.learnLanguage.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ll2-native",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish"
            ]
          }
        ]
      },
      {
        "id": "ll3",
        "textKey": "templates.learnLanguage.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ll3-level",
            "placeholder": "beginner (A1-A2)",
            "color": "green",
            "suggestions": [
              "absolute beginner",
              "beginner (A1-A2)",
              "intermediate (B1-B2)",
              "advanced (C1-C2)"
            ]
          }
        ]
      },
      {
        "id": "ll4",
        "textKey": "templates.learnLanguage.line4",
        "type": "fixed"
      },
      {
        "id": "ll5",
        "textKey": "templates.learnLanguage.line5",
        "type": "fixed"
      },
      {
        "id": "ll6",
        "textKey": "templates.learnLanguage.line6",
        "type": "fixed"
      },
      {
        "id": "ll7",
        "textKey": "templates.learnLanguage.line7",
        "type": "fixed"
      },
      {
        "id": "ll8",
        "textKey": "templates.learnLanguage.line8",
        "type": "fixed"
      },
      {
        "id": "ll9",
        "textKey": "templates.learnLanguage.line9",
        "type": "fixed"
      },
      {
        "id": "ll10",
        "textKey": "templates.learnLanguage.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "learnMath",
    "sections": [
      {
        "id": "lm1",
        "textKey": "templates.learnMath.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lm1-topic",
            "placeholder": "linear algebra",
            "color": "yellow",
            "suggestions": [
              "linear algebra",
              "calculus",
              "probability",
              "statistics",
              "discrete math",
              "differential equations",
              "number theory",
              "geometry"
            ]
          }
        ]
      },
      {
        "id": "lm2",
        "textKey": "templates.learnMath.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lm2-level",
            "placeholder": "undergraduate",
            "color": "green",
            "suggestions": [
              "high school",
              "undergraduate",
              "graduate",
              "self-study"
            ]
          }
        ]
      },
      {
        "id": "lm3",
        "textKey": "templates.learnMath.line3",
        "type": "fixed"
      },
      {
        "id": "lm4",
        "textKey": "templates.learnMath.line4",
        "type": "fixed"
      },
      {
        "id": "lm5",
        "textKey": "templates.learnMath.line5",
        "type": "fixed"
      },
      {
        "id": "lm6",
        "textKey": "templates.learnMath.line6",
        "type": "fixed"
      },
      {
        "id": "lm7",
        "textKey": "templates.learnMath.line7",
        "type": "fixed"
      },
      {
        "id": "lm8",
        "textKey": "templates.learnMath.line8",
        "type": "fixed"
      },
      {
        "id": "lm9",
        "textKey": "templates.learnMath.line9",
        "type": "fixed"
      },
      {
        "id": "lm10",
        "textKey": "templates.learnMath.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "learnScience",
    "sections": [
      {
        "id": "ls1",
        "textKey": "templates.learnScience.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ls1-topic",
            "placeholder": "quantum mechanics",
            "color": "yellow",
            "suggestions": [
              "quantum mechanics",
              "molecular biology",
              "organic chemistry",
              "astrophysics",
              "neuroscience",
              "climate science",
              "genetics",
              "thermodynamics"
            ]
          }
        ]
      },
      {
        "id": "ls2",
        "textKey": "templates.learnScience.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ls2-level",
            "placeholder": "curious beginner",
            "color": "green",
            "suggestions": [
              "curious beginner",
              "high school",
              "undergraduate",
              "graduate",
              "researcher"
            ]
          }
        ]
      },
      {
        "id": "ls3",
        "textKey": "templates.learnScience.line3",
        "type": "fixed"
      },
      {
        "id": "ls4",
        "textKey": "templates.learnScience.line4",
        "type": "fixed"
      },
      {
        "id": "ls5",
        "textKey": "templates.learnScience.line5",
        "type": "fixed"
      },
      {
        "id": "ls6",
        "textKey": "templates.learnScience.line6",
        "type": "fixed"
      },
      {
        "id": "ls7",
        "textKey": "templates.learnScience.line7",
        "type": "fixed"
      },
      {
        "id": "ls8",
        "textKey": "templates.learnScience.line8",
        "type": "fixed"
      },
      {
        "id": "ls9",
        "textKey": "templates.learnScience.line9",
        "type": "fixed"
      },
      {
        "id": "ls10",
        "textKey": "templates.learnScience.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "learnBusiness",
    "sections": [
      {
        "id": "lb1",
        "textKey": "templates.learnBusiness.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lb1-topic",
            "placeholder": "product management",
            "color": "yellow",
            "suggestions": [
              "product management",
              "startup fundraising",
              "financial modeling",
              "negotiation",
              "leadership",
              "marketing strategy",
              "operations management",
              "business analytics"
            ]
          }
        ]
      },
      {
        "id": "lb2",
        "textKey": "templates.learnBusiness.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lb2-level",
            "placeholder": "aspiring professional",
            "color": "green",
            "suggestions": [
              "student",
              "aspiring professional",
              "early career",
              "mid-career",
              "executive"
            ]
          }
        ]
      },
      {
        "id": "lb3",
        "textKey": "templates.learnBusiness.line3",
        "type": "fixed"
      },
      {
        "id": "lb4",
        "textKey": "templates.learnBusiness.line4",
        "type": "fixed"
      },
      {
        "id": "lb5",
        "textKey": "templates.learnBusiness.line5",
        "type": "fixed"
      },
      {
        "id": "lb6",
        "textKey": "templates.learnBusiness.line6",
        "type": "fixed"
      },
      {
        "id": "lb7",
        "textKey": "templates.learnBusiness.line7",
        "type": "fixed"
      },
      {
        "id": "lb8",
        "textKey": "templates.learnBusiness.line8",
        "type": "fixed"
      },
      {
        "id": "lb9",
        "textKey": "templates.learnBusiness.line9",
        "type": "fixed"
      },
      {
        "id": "lb10",
        "textKey": "templates.learnBusiness.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
