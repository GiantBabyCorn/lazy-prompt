import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "debugFrontend",
    "sections": [
      {
        "id": "df1",
        "textKey": "templates.debugFrontend.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "df1-fw",
            "placeholder": "React",
            "color": "cyan",
            "suggestions": [
              "React",
              "Vue",
              "Angular",
              "Svelte",
              "Next.js",
              "vanilla JS",
              "jQuery"
            ]
          }
        ]
      },
      {
        "id": "df2",
        "textKey": "templates.debugFrontend.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "df2-error",
            "placeholder": "describe the error or unexpected behavior",
            "color": "green"
          }
        ]
      },
      {
        "id": "df3",
        "textKey": "templates.debugFrontend.line3",
        "type": "fixed"
      },
      {
        "id": "df4",
        "textKey": "templates.debugFrontend.line4",
        "type": "fixed"
      },
      {
        "id": "df5",
        "textKey": "templates.debugFrontend.line5",
        "type": "fixed"
      },
      {
        "id": "df6",
        "textKey": "templates.debugFrontend.line6",
        "type": "fixed"
      },
      {
        "id": "df7",
        "textKey": "templates.debugFrontend.line7",
        "type": "fixed"
      },
      {
        "id": "df8",
        "textKey": "templates.debugFrontend.line8",
        "type": "fixed"
      },
      {
        "id": "df9",
        "textKey": "templates.debugFrontend.line9",
        "type": "fixed"
      },
      {
        "id": "df10",
        "textKey": "templates.debugFrontend.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "debugBackend",
    "sections": [
      {
        "id": "db1",
        "textKey": "templates.debugBackend.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "db1-stack",
            "placeholder": "Node.js/Express",
            "color": "cyan",
            "suggestions": [
              "Node.js/Express",
              "Python/Django",
              "Python/FastAPI",
              "Go/Gin",
              "Java/Spring Boot",
              "Ruby/Rails",
              "C#/ASP.NET",
              "Rust/Actix"
            ]
          }
        ]
      },
      {
        "id": "db2",
        "textKey": "templates.debugBackend.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "db2-error",
            "placeholder": "describe the error or unexpected behavior",
            "color": "green"
          }
        ]
      },
      {
        "id": "db3",
        "textKey": "templates.debugBackend.line3",
        "type": "fixed"
      },
      {
        "id": "db4",
        "textKey": "templates.debugBackend.line4",
        "type": "fixed"
      },
      {
        "id": "db5",
        "textKey": "templates.debugBackend.line5",
        "type": "fixed"
      },
      {
        "id": "db6",
        "textKey": "templates.debugBackend.line6",
        "type": "fixed"
      },
      {
        "id": "db7",
        "textKey": "templates.debugBackend.line7",
        "type": "fixed"
      },
      {
        "id": "db8",
        "textKey": "templates.debugBackend.line8",
        "type": "fixed"
      },
      {
        "id": "db9",
        "textKey": "templates.debugBackend.line9",
        "type": "fixed"
      },
      {
        "id": "db10",
        "textKey": "templates.debugBackend.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "debugDatabase",
    "sections": [
      {
        "id": "dd1",
        "textKey": "templates.debugDatabase.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dd1-db",
            "placeholder": "PostgreSQL",
            "color": "cyan",
            "suggestions": [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "Redis",
              "SQLite",
              "SQL Server",
              "DynamoDB",
              "Elasticsearch"
            ]
          }
        ]
      },
      {
        "id": "dd2",
        "textKey": "templates.debugDatabase.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dd2-error",
            "placeholder": "describe the issue",
            "color": "green"
          }
        ]
      },
      {
        "id": "dd3",
        "textKey": "templates.debugDatabase.line3",
        "type": "fixed"
      },
      {
        "id": "dd4",
        "textKey": "templates.debugDatabase.line4",
        "type": "fixed"
      },
      {
        "id": "dd5",
        "textKey": "templates.debugDatabase.line5",
        "type": "fixed"
      },
      {
        "id": "dd6",
        "textKey": "templates.debugDatabase.line6",
        "type": "fixed"
      },
      {
        "id": "dd7",
        "textKey": "templates.debugDatabase.line7",
        "type": "fixed"
      },
      {
        "id": "dd8",
        "textKey": "templates.debugDatabase.line8",
        "type": "fixed"
      },
      {
        "id": "dd9",
        "textKey": "templates.debugDatabase.line9",
        "type": "fixed"
      },
      {
        "id": "dd10",
        "textKey": "templates.debugDatabase.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "debugApi",
    "sections": [
      {
        "id": "da1",
        "textKey": "templates.debugApi.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "da1-method",
            "placeholder": "GET",
            "color": "cyan",
            "suggestions": [
              "GET",
              "POST",
              "PUT",
              "PATCH",
              "DELETE"
            ]
          },
          {
            "id": "da1-endpoint",
            "placeholder": "/api/users",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "da2",
        "textKey": "templates.debugApi.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "da2-status",
            "placeholder": "500 Internal Server Error",
            "color": "green",
            "suggestions": [
              "400 Bad Request",
              "401 Unauthorized",
              "403 Forbidden",
              "404 Not Found",
              "500 Internal Server Error",
              "502 Bad Gateway",
              "503 Service Unavailable",
              "CORS error",
              "timeout"
            ]
          }
        ]
      },
      {
        "id": "da3",
        "textKey": "templates.debugApi.line3",
        "type": "fixed"
      },
      {
        "id": "da4",
        "textKey": "templates.debugApi.line4",
        "type": "fixed"
      },
      {
        "id": "da5",
        "textKey": "templates.debugApi.line5",
        "type": "fixed"
      },
      {
        "id": "da6",
        "textKey": "templates.debugApi.line6",
        "type": "fixed"
      },
      {
        "id": "da7",
        "textKey": "templates.debugApi.line7",
        "type": "fixed"
      },
      {
        "id": "da8",
        "textKey": "templates.debugApi.line8",
        "type": "fixed"
      },
      {
        "id": "da9",
        "textKey": "templates.debugApi.line9",
        "type": "fixed"
      },
      {
        "id": "da10",
        "textKey": "templates.debugApi.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "debugDevops",
    "sections": [
      {
        "id": "dv1",
        "textKey": "templates.debugDevops.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dv1-tool",
            "placeholder": "Docker",
            "color": "cyan",
            "suggestions": [
              "Docker",
              "Kubernetes",
              "GitHub Actions",
              "GitLab CI",
              "Jenkins",
              "Terraform",
              "AWS",
              "Nginx",
              "systemd"
            ]
          }
        ]
      },
      {
        "id": "dv2",
        "textKey": "templates.debugDevops.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dv2-error",
            "placeholder": "describe the issue",
            "color": "green"
          }
        ]
      },
      {
        "id": "dv3",
        "textKey": "templates.debugDevops.line3",
        "type": "fixed"
      },
      {
        "id": "dv4",
        "textKey": "templates.debugDevops.line4",
        "type": "fixed"
      },
      {
        "id": "dv5",
        "textKey": "templates.debugDevops.line5",
        "type": "fixed"
      },
      {
        "id": "dv6",
        "textKey": "templates.debugDevops.line6",
        "type": "fixed"
      },
      {
        "id": "dv7",
        "textKey": "templates.debugDevops.line7",
        "type": "fixed"
      },
      {
        "id": "dv8",
        "textKey": "templates.debugDevops.line8",
        "type": "fixed"
      },
      {
        "id": "dv9",
        "textKey": "templates.debugDevops.line9",
        "type": "fixed"
      },
      {
        "id": "dv10",
        "textKey": "templates.debugDevops.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
