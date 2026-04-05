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
  },
  {
    "id": "learnHistory",
    "sections": [
      {
        "id": "lh1",
        "textKey": "templates.learnHistory.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lh1-topic",
            "placeholder": "the Industrial Revolution",
            "color": "yellow",
            "suggestions": ["the Industrial Revolution", "World War II", "Ancient Rome", "the Renaissance", "the Cold War", "Chinese dynasties", "the French Revolution", "the Space Race"]
          }
        ]
      },
      {
        "id": "lh2",
        "textKey": "templates.learnHistory.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lh2-level",
            "placeholder": "curious learner",
            "color": "green",
            "suggestions": ["curious learner", "high school", "undergraduate", "history enthusiast", "researcher"]
          }
        ]
      },
      { "id": "lh3", "textKey": "templates.learnHistory.line3", "type": "fixed" },
      { "id": "lh4", "textKey": "templates.learnHistory.line4", "type": "fixed" },
      { "id": "lh5", "textKey": "templates.learnHistory.line5", "type": "fixed" },
      { "id": "lh6", "textKey": "templates.learnHistory.line6", "type": "fixed" },
      { "id": "lh7", "textKey": "templates.learnHistory.line7", "type": "fixed" },
      { "id": "lh8", "textKey": "templates.learnHistory.line8", "type": "fixed" },
      { "id": "lh9", "textKey": "templates.learnHistory.line9", "type": "fixed" },
      { "id": "lh10", "textKey": "templates.learnHistory.line10", "type": "fixed" }
    ]
  },
  {
    "id": "learnDesign",
    "sections": [
      {
        "id": "lds1",
        "textKey": "templates.learnDesign.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lds1-topic",
            "placeholder": "UI/UX design fundamentals",
            "color": "yellow",
            "suggestions": ["UI/UX design fundamentals", "typography", "color theory", "responsive design", "design systems", "Figma", "logo design", "information architecture"]
          }
        ]
      },
      {
        "id": "lds2",
        "textKey": "templates.learnDesign.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lds2-level",
            "placeholder": "beginner",
            "color": "green",
            "suggestions": ["complete beginner", "beginner", "intermediate", "advanced"]
          }
        ]
      },
      { "id": "lds3", "textKey": "templates.learnDesign.line3", "type": "fixed" },
      { "id": "lds4", "textKey": "templates.learnDesign.line4", "type": "fixed" },
      { "id": "lds5", "textKey": "templates.learnDesign.line5", "type": "fixed" },
      { "id": "lds6", "textKey": "templates.learnDesign.line6", "type": "fixed" },
      { "id": "lds7", "textKey": "templates.learnDesign.line7", "type": "fixed" },
      { "id": "lds8", "textKey": "templates.learnDesign.line8", "type": "fixed" },
      { "id": "lds9", "textKey": "templates.learnDesign.line9", "type": "fixed" },
      { "id": "lds10", "textKey": "templates.learnDesign.line10", "type": "fixed" }
    ]
  },
  {
    "id": "learnMusic",
    "sections": [
      {
        "id": "lmu1",
        "textKey": "templates.learnMusic.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lmu1-topic",
            "placeholder": "music theory basics",
            "color": "yellow",
            "suggestions": ["music theory basics", "piano", "guitar", "music production", "songwriting", "audio mixing", "singing", "electronic music"]
          }
        ]
      },
      {
        "id": "lmu2",
        "textKey": "templates.learnMusic.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lmu2-level",
            "placeholder": "beginner",
            "color": "green",
            "suggestions": ["absolute beginner", "beginner", "intermediate", "advanced"]
          }
        ]
      },
      { "id": "lmu3", "textKey": "templates.learnMusic.line3", "type": "fixed" },
      { "id": "lmu4", "textKey": "templates.learnMusic.line4", "type": "fixed" },
      { "id": "lmu5", "textKey": "templates.learnMusic.line5", "type": "fixed" },
      { "id": "lmu6", "textKey": "templates.learnMusic.line6", "type": "fixed" },
      { "id": "lmu7", "textKey": "templates.learnMusic.line7", "type": "fixed" },
      { "id": "lmu8", "textKey": "templates.learnMusic.line8", "type": "fixed" },
      { "id": "lmu9", "textKey": "templates.learnMusic.line9", "type": "fixed" },
      { "id": "lmu10", "textKey": "templates.learnMusic.line10", "type": "fixed" }
    ]
  },
  {
    "id": "learnCooking",
    "sections": [
      {
        "id": "lck1",
        "textKey": "templates.learnCooking.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lck1-topic",
            "placeholder": "Italian cuisine",
            "color": "yellow",
            "suggestions": ["Italian cuisine", "Japanese cuisine", "baking", "French techniques", "Thai cuisine", "BBQ / grilling", "vegetarian cooking", "meal prep"]
          }
        ]
      },
      {
        "id": "lck2",
        "textKey": "templates.learnCooking.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lck2-level",
            "placeholder": "home cook",
            "color": "green",
            "suggestions": ["complete beginner", "home cook", "intermediate", "aspiring chef"]
          }
        ]
      },
      { "id": "lck3", "textKey": "templates.learnCooking.line3", "type": "fixed" },
      { "id": "lck4", "textKey": "templates.learnCooking.line4", "type": "fixed" },
      { "id": "lck5", "textKey": "templates.learnCooking.line5", "type": "fixed" },
      { "id": "lck6", "textKey": "templates.learnCooking.line6", "type": "fixed" },
      { "id": "lck7", "textKey": "templates.learnCooking.line7", "type": "fixed" },
      { "id": "lck8", "textKey": "templates.learnCooking.line8", "type": "fixed" },
      { "id": "lck9", "textKey": "templates.learnCooking.line9", "type": "fixed" },
      { "id": "lck10", "textKey": "templates.learnCooking.line10", "type": "fixed" }
    ]
  },
  {
    "id": "learnFinance",
    "sections": [
      {
        "id": "lf1",
        "textKey": "templates.learnFinance.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lf1-topic",
            "placeholder": "personal investing",
            "color": "yellow",
            "suggestions": ["personal investing", "budgeting", "stock market basics", "cryptocurrency", "retirement planning", "real estate investing", "tax optimization", "index funds"]
          }
        ]
      },
      {
        "id": "lf2",
        "textKey": "templates.learnFinance.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "lf2-level",
            "placeholder": "beginner",
            "color": "green",
            "suggestions": ["complete beginner", "beginner", "intermediate", "advanced"]
          }
        ]
      },
      { "id": "lf3", "textKey": "templates.learnFinance.line3", "type": "fixed" },
      { "id": "lf4", "textKey": "templates.learnFinance.line4", "type": "fixed" },
      { "id": "lf5", "textKey": "templates.learnFinance.line5", "type": "fixed" },
      { "id": "lf6", "textKey": "templates.learnFinance.line6", "type": "fixed" },
      { "id": "lf7", "textKey": "templates.learnFinance.line7", "type": "fixed" },
      { "id": "lf8", "textKey": "templates.learnFinance.line8", "type": "fixed" },
      { "id": "lf9", "textKey": "templates.learnFinance.line9", "type": "fixed" },
      { "id": "lf10", "textKey": "templates.learnFinance.line10", "type": "fixed" }
    ]
  }
];

export default templates;
