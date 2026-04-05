import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "organizeReports",
    "sections": [
      {
        "id": "or1",
        "textKey": "templates.organizeReports.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "or1-type",
            "placeholder": "quarterly sales report",
            "color": "yellow",
            "suggestions": [
              "quarterly sales report",
              "monthly revenue data",
              "annual budget review",
              "customer feedback survey",
              "project status update",
              "market research findings"
            ]
          }
        ]
      },
      {
        "id": "or2",
        "textKey": "templates.organizeReports.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "or2-format",
            "placeholder": "structured document",
            "color": "cyan",
            "suggestions": [
              "structured document",
              "slide deck outline",
              "executive memo",
              "dashboard layout"
            ]
          }
        ]
      },
      {
        "id": "or3",
        "textKey": "templates.organizeReports.line3",
        "type": "fixed"
      },
      {
        "id": "or4",
        "textKey": "templates.organizeReports.line4",
        "type": "fixed"
      },
      {
        "id": "or5",
        "textKey": "templates.organizeReports.line5",
        "type": "fixed"
      },
      {
        "id": "or6",
        "textKey": "templates.organizeReports.line6",
        "type": "fixed"
      },
      {
        "id": "or7",
        "textKey": "templates.organizeReports.line7",
        "type": "fixed"
      },
      {
        "id": "or8",
        "textKey": "templates.organizeReports.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeAccounts",
    "sections": [
      {
        "id": "oa1",
        "textKey": "templates.organizeAccounts.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "oa1-type",
            "placeholder": "expense records",
            "color": "yellow",
            "suggestions": [
              "expense records",
              "invoices",
              "bank transactions",
              "budget tracking",
              "payroll",
              "tax documents"
            ]
          }
        ]
      },
      {
        "id": "oa2",
        "textKey": "templates.organizeAccounts.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "oa2-period",
            "placeholder": "this month",
            "color": "cyan",
            "suggestions": [
              "this week",
              "this month",
              "this quarter",
              "this year",
              "custom range"
            ]
          }
        ]
      },
      {
        "id": "oa3",
        "textKey": "templates.organizeAccounts.line3",
        "type": "fixed"
      },
      {
        "id": "oa4",
        "textKey": "templates.organizeAccounts.line4",
        "type": "fixed"
      },
      {
        "id": "oa5",
        "textKey": "templates.organizeAccounts.line5",
        "type": "fixed"
      },
      {
        "id": "oa6",
        "textKey": "templates.organizeAccounts.line6",
        "type": "fixed"
      },
      {
        "id": "oa7",
        "textKey": "templates.organizeAccounts.line7",
        "type": "fixed"
      },
      {
        "id": "oa8",
        "textKey": "templates.organizeAccounts.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeProducts",
    "sections": [
      {
        "id": "op1",
        "textKey": "templates.organizeProducts.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "op1-category",
            "placeholder": "electronics inventory",
            "color": "yellow",
            "suggestions": [
              "electronics inventory",
              "clothing catalog",
              "grocery stock",
              "office supplies",
              "software licenses",
              "furniture collection"
            ]
          }
        ]
      },
      {
        "id": "op2",
        "textKey": "templates.organizeProducts.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "op2-sort",
            "placeholder": "category",
            "color": "green",
            "suggestions": [
              "category",
              "price",
              "stock level",
              "date added",
              "popularity",
              "margin"
            ]
          }
        ]
      },
      {
        "id": "op3",
        "textKey": "templates.organizeProducts.line3",
        "type": "fixed"
      },
      {
        "id": "op4",
        "textKey": "templates.organizeProducts.line4",
        "type": "fixed"
      },
      {
        "id": "op5",
        "textKey": "templates.organizeProducts.line5",
        "type": "fixed"
      },
      {
        "id": "op6",
        "textKey": "templates.organizeProducts.line6",
        "type": "fixed"
      },
      {
        "id": "op7",
        "textKey": "templates.organizeProducts.line7",
        "type": "fixed"
      },
      {
        "id": "op8",
        "textKey": "templates.organizeProducts.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeSchedule",
    "sections": [
      {
        "id": "os1",
        "textKey": "templates.organizeSchedule.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "os1-range",
            "placeholder": "next 2 weeks",
            "color": "cyan",
            "suggestions": [
              "today",
              "this week",
              "next 2 weeks",
              "this month",
              "this quarter"
            ]
          }
        ]
      },
      {
        "id": "os2",
        "textKey": "templates.organizeSchedule.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "os2-sortOrder",
            "placeholder": "chronological",
            "color": "green",
            "suggestions": [
              "chronological",
              "priority",
              "category",
              "duration",
              "deadline"
            ]
          }
        ]
      },
      {
        "id": "os3",
        "textKey": "templates.organizeSchedule.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "os3-priorities",
            "placeholder": "urgent, high, medium, low",
            "color": "cyan",
            "suggestions": [
              "urgent, high, medium, low",
              "P0, P1, P2, P3",
              "must-do, should-do, nice-to-do",
              "critical, important, normal, optional"
            ]
          }
        ]
      },
      {
        "id": "os4",
        "textKey": "templates.organizeSchedule.line4",
        "type": "fixed"
      },
      {
        "id": "os5",
        "textKey": "templates.organizeSchedule.line5",
        "type": "fixed"
      },
      {
        "id": "os6",
        "textKey": "templates.organizeSchedule.line6",
        "type": "fixed"
      },
      {
        "id": "os7",
        "textKey": "templates.organizeSchedule.line7",
        "type": "fixed"
      },
      {
        "id": "os8",
        "textKey": "templates.organizeSchedule.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeNotes",
    "sections": [
      {
        "id": "on1",
        "textKey": "templates.organizeNotes.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "on1-source",
            "placeholder": "meeting notes",
            "color": "yellow",
            "suggestions": [
              "meeting notes",
              "lecture notes",
              "brainstorm notes",
              "research notes",
              "reading notes",
              "project notes"
            ]
          }
        ]
      },
      {
        "id": "on2",
        "textKey": "templates.organizeNotes.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "on2-groupBy",
            "placeholder": "topic or theme",
            "color": "green",
            "suggestions": [
              "topic or theme",
              "date",
              "person",
              "project",
              "priority",
              "action type"
            ]
          }
        ]
      },
      {
        "id": "on3",
        "textKey": "templates.organizeNotes.line3",
        "type": "fixed"
      },
      {
        "id": "on4",
        "textKey": "templates.organizeNotes.line4",
        "type": "fixed"
      },
      {
        "id": "on5",
        "textKey": "templates.organizeNotes.line5",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "on5-outputFormat",
            "placeholder": "structured outline",
            "color": "cyan",
            "suggestions": [
              "structured outline",
              "mind map",
              "bullet summary",
              "table of contents",
              "wiki page",
              "action plan"
            ]
          }
        ]
      },
      {
        "id": "on6",
        "textKey": "templates.organizeNotes.line6",
        "type": "fixed"
      },
      {
        "id": "on7",
        "textKey": "templates.organizeNotes.line7",
        "type": "fixed"
      },
      {
        "id": "on8",
        "textKey": "templates.organizeNotes.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeCsv",
    "sections": [
      {
        "id": "oc1",
        "textKey": "templates.organizeCsv.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "oc1-format",
            "placeholder": "CSV",
            "color": "cyan",
            "suggestions": [
              "CSV",
              "TSV",
              "Excel",
              "JSON",
              "XML"
            ]
          }
        ]
      },
      {
        "id": "oc2",
        "textKey": "templates.organizeCsv.line2",
        "type": "fixed"
      },
      {
        "id": "oc3",
        "textKey": "templates.organizeCsv.line3",
        "type": "fixed"
      },
      {
        "id": "oc4",
        "textKey": "templates.organizeCsv.line4",
        "type": "fixed"
      },
      {
        "id": "oc5",
        "textKey": "templates.organizeCsv.line5",
        "type": "fixed"
      },
      {
        "id": "oc6",
        "textKey": "templates.organizeCsv.line6",
        "type": "fixed"
      },
      {
        "id": "oc7",
        "textKey": "templates.organizeCsv.line7",
        "type": "fixed"
      },
      {
        "id": "oc8",
        "textKey": "templates.organizeCsv.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeDatabase",
    "sections": [
      {
        "id": "odb1",
        "textKey": "templates.organizeDatabase.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "odb1-db",
            "placeholder": "PostgreSQL",
            "color": "cyan",
            "suggestions": [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "SQLite",
              "Redis",
              "Elasticsearch"
            ]
          }
        ]
      },
      {
        "id": "odb2",
        "textKey": "templates.organizeDatabase.line2",
        "type": "fixed"
      },
      {
        "id": "odb3",
        "textKey": "templates.organizeDatabase.line3",
        "type": "fixed"
      },
      {
        "id": "odb4",
        "textKey": "templates.organizeDatabase.line4",
        "type": "fixed"
      },
      {
        "id": "odb5",
        "textKey": "templates.organizeDatabase.line5",
        "type": "fixed"
      },
      {
        "id": "odb6",
        "textKey": "templates.organizeDatabase.line6",
        "type": "fixed"
      },
      {
        "id": "odb7",
        "textKey": "templates.organizeDatabase.line7",
        "type": "fixed"
      },
      {
        "id": "odb8",
        "textKey": "templates.organizeDatabase.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeSummaryTable",
    "sections": [
      {
        "id": "ost1",
        "textKey": "templates.organizeSummaryTable.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ost1-group",
            "placeholder": "category",
            "color": "green",
            "suggestions": [
              "category",
              "date",
              "region",
              "department",
              "status",
              "product"
            ]
          }
        ]
      },
      {
        "id": "ost2",
        "textKey": "templates.organizeSummaryTable.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ost2-metrics",
            "placeholder": "total, average, count",
            "color": "cyan",
            "suggestions": [
              "total, average, count",
              "sum, min, max",
              "mean, median, mode",
              "count, percentage"
            ]
          }
        ]
      },
      {
        "id": "ost3",
        "textKey": "templates.organizeSummaryTable.line3",
        "type": "fixed"
      },
      {
        "id": "ost4",
        "textKey": "templates.organizeSummaryTable.line4",
        "type": "fixed"
      },
      {
        "id": "ost5",
        "textKey": "templates.organizeSummaryTable.line5",
        "type": "fixed"
      },
      {
        "id": "ost6",
        "textKey": "templates.organizeSummaryTable.line6",
        "type": "fixed"
      },
      {
        "id": "ost7",
        "textKey": "templates.organizeSummaryTable.line7",
        "type": "fixed"
      },
      {
        "id": "ost8",
        "textKey": "templates.organizeSummaryTable.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeTimeline",
    "sections": [
      {
        "id": "ot1",
        "textKey": "templates.organizeTimeline.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ot1-range",
            "placeholder": "project history",
            "color": "yellow",
            "suggestions": [
              "project history",
              "company milestones",
              "product development",
              "career progression",
              "historical events",
              "campaign timeline"
            ]
          }
        ]
      },
      {
        "id": "ot2",
        "textKey": "templates.organizeTimeline.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ot2-granularity",
            "placeholder": "monthly",
            "color": "cyan",
            "suggestions": [
              "daily",
              "weekly",
              "monthly",
              "quarterly",
              "yearly"
            ]
          }
        ]
      },
      {
        "id": "ot3",
        "textKey": "templates.organizeTimeline.line3",
        "type": "fixed"
      },
      {
        "id": "ot4",
        "textKey": "templates.organizeTimeline.line4",
        "type": "fixed"
      },
      {
        "id": "ot5",
        "textKey": "templates.organizeTimeline.line5",
        "type": "fixed"
      },
      {
        "id": "ot6",
        "textKey": "templates.organizeTimeline.line6",
        "type": "fixed"
      },
      {
        "id": "ot7",
        "textKey": "templates.organizeTimeline.line7",
        "type": "fixed"
      },
      {
        "id": "ot8",
        "textKey": "templates.organizeTimeline.line8",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "organizeDashboard",
    "sections": [
      {
        "id": "odash1",
        "textKey": "templates.organizeDashboard.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "odash1-type",
            "placeholder": "business performance",
            "color": "yellow",
            "suggestions": [
              "business performance",
              "marketing analytics",
              "engineering metrics",
              "sales pipeline",
              "customer health",
              "financial overview"
            ]
          }
        ]
      },
      {
        "id": "odash2",
        "textKey": "templates.organizeDashboard.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "odash2-range",
            "placeholder": "last 30 days",
            "color": "cyan",
            "suggestions": [
              "last 7 days",
              "last 30 days",
              "last quarter",
              "year to date",
              "all time"
            ]
          }
        ]
      },
      {
        "id": "odash3",
        "textKey": "templates.organizeDashboard.line3",
        "type": "fixed"
      },
      {
        "id": "odash4",
        "textKey": "templates.organizeDashboard.line4",
        "type": "fixed"
      },
      {
        "id": "odash5",
        "textKey": "templates.organizeDashboard.line5",
        "type": "fixed"
      },
      {
        "id": "odash6",
        "textKey": "templates.organizeDashboard.line6",
        "type": "fixed"
      },
      {
        "id": "odash7",
        "textKey": "templates.organizeDashboard.line7",
        "type": "fixed"
      },
      {
        "id": "odash8",
        "textKey": "templates.organizeDashboard.line8",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
