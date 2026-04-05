import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "translationFormal",
    "sections": [
      {
        "id": "tf1",
        "textKey": "templates.translationFormal.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "tr1-source",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          },
          {
            "id": "tr1-target",
            "placeholder": "Chinese",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          }
        ]
      },
      {
        "id": "tf2",
        "textKey": "templates.translationFormal.line2",
        "type": "fixed"
      },
      {
        "id": "tf3",
        "textKey": "templates.translationFormal.line3",
        "type": "fixed"
      },
      {
        "id": "tf4",
        "textKey": "templates.translationFormal.line4",
        "type": "fixed"
      },
      {
        "id": "tf5",
        "textKey": "templates.translationFormal.line5",
        "type": "fixed"
      },
      {
        "id": "tf6",
        "textKey": "templates.translationFormal.line6",
        "type": "fixed"
      },
      {
        "id": "tf7",
        "textKey": "templates.translationFormal.line7",
        "type": "fixed"
      },
      {
        "id": "tf8",
        "textKey": "templates.translationFormal.line8",
        "type": "fixed"
      },
      {
        "id": "tf9",
        "textKey": "templates.translationFormal.line9",
        "type": "fixed"
      },
      {
        "id": "tf10",
        "textKey": "templates.translationFormal.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "translationCasual",
    "sections": [
      {
        "id": "tc1",
        "textKey": "templates.translationCasual.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "tr1-source",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          },
          {
            "id": "tr1-target",
            "placeholder": "Chinese",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          }
        ]
      },
      {
        "id": "tc2",
        "textKey": "templates.translationCasual.line2",
        "type": "fixed"
      },
      {
        "id": "tc3",
        "textKey": "templates.translationCasual.line3",
        "type": "fixed"
      },
      {
        "id": "tc4",
        "textKey": "templates.translationCasual.line4",
        "type": "fixed"
      },
      {
        "id": "tc5",
        "textKey": "templates.translationCasual.line5",
        "type": "fixed"
      },
      {
        "id": "tc6",
        "textKey": "templates.translationCasual.line6",
        "type": "fixed"
      },
      {
        "id": "tc7",
        "textKey": "templates.translationCasual.line7",
        "type": "fixed"
      },
      {
        "id": "tc8",
        "textKey": "templates.translationCasual.line8",
        "type": "fixed"
      },
      {
        "id": "tc9",
        "textKey": "templates.translationCasual.line9",
        "type": "fixed"
      },
      {
        "id": "tc10",
        "textKey": "templates.translationCasual.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "translationTechnical",
    "sections": [
      {
        "id": "tt1",
        "textKey": "templates.translationTechnical.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "tr1-source",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          },
          {
            "id": "tr1-target",
            "placeholder": "Chinese",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          }
        ]
      },
      {
        "id": "tt2",
        "textKey": "templates.translationTechnical.line2",
        "type": "fixed"
      },
      {
        "id": "tt3",
        "textKey": "templates.translationTechnical.line3",
        "type": "fixed"
      },
      {
        "id": "tt4",
        "textKey": "templates.translationTechnical.line4",
        "type": "fixed"
      },
      {
        "id": "tt5",
        "textKey": "templates.translationTechnical.line5",
        "type": "fixed"
      },
      {
        "id": "tt6",
        "textKey": "templates.translationTechnical.line6",
        "type": "fixed"
      },
      {
        "id": "tt7",
        "textKey": "templates.translationTechnical.line7",
        "type": "fixed"
      },
      {
        "id": "tt8",
        "textKey": "templates.translationTechnical.line8",
        "type": "fixed"
      },
      {
        "id": "tt9",
        "textKey": "templates.translationTechnical.line9",
        "type": "fixed"
      },
      {
        "id": "tt10",
        "textKey": "templates.translationTechnical.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "translationLiterary",
    "sections": [
      {
        "id": "tl1",
        "textKey": "templates.translationLiterary.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "tr1-source",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          },
          {
            "id": "tr1-target",
            "placeholder": "Chinese",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          }
        ]
      },
      {
        "id": "tl2",
        "textKey": "templates.translationLiterary.line2",
        "type": "fixed"
      },
      {
        "id": "tl3",
        "textKey": "templates.translationLiterary.line3",
        "type": "fixed"
      },
      {
        "id": "tl4",
        "textKey": "templates.translationLiterary.line4",
        "type": "fixed"
      },
      {
        "id": "tl5",
        "textKey": "templates.translationLiterary.line5",
        "type": "fixed"
      },
      {
        "id": "tl6",
        "textKey": "templates.translationLiterary.line6",
        "type": "fixed"
      },
      {
        "id": "tl7",
        "textKey": "templates.translationLiterary.line7",
        "type": "fixed"
      },
      {
        "id": "tl8",
        "textKey": "templates.translationLiterary.line8",
        "type": "fixed"
      },
      {
        "id": "tl9",
        "textKey": "templates.translationLiterary.line9",
        "type": "fixed"
      },
      {
        "id": "tl10",
        "textKey": "templates.translationLiterary.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "translationLocalized",
    "sections": [
      {
        "id": "tlo1",
        "textKey": "templates.translationLocalized.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "tr1-source",
            "placeholder": "English",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          },
          {
            "id": "tr1-target",
            "placeholder": "Chinese",
            "color": "cyan",
            "suggestions": [
              "English",
              "Chinese",
              "Japanese",
              "Korean",
              "Spanish",
              "French",
              "German",
              "Portuguese",
              "Russian",
              "Arabic"
            ]
          }
        ]
      },
      {
        "id": "tlo2",
        "textKey": "templates.translationLocalized.line2",
        "type": "fixed"
      },
      {
        "id": "tlo3",
        "textKey": "templates.translationLocalized.line3",
        "type": "fixed"
      },
      {
        "id": "tlo4",
        "textKey": "templates.translationLocalized.line4",
        "type": "fixed"
      },
      {
        "id": "tlo5",
        "textKey": "templates.translationLocalized.line5",
        "type": "fixed"
      },
      {
        "id": "tlo6",
        "textKey": "templates.translationLocalized.line6",
        "type": "fixed"
      },
      {
        "id": "tlo7",
        "textKey": "templates.translationLocalized.line7",
        "type": "fixed"
      },
      {
        "id": "tlo8",
        "textKey": "templates.translationLocalized.line8",
        "type": "fixed"
      },
      {
        "id": "tlo9",
        "textKey": "templates.translationLocalized.line9",
        "type": "fixed"
      },
      {
        "id": "tlo10",
        "textKey": "templates.translationLocalized.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
