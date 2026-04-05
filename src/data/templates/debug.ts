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
  },
  {
    "id": "debugPerformance",
    "sections": [
      {
        "id": "dpf1",
        "textKey": "templates.debugPerformance.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dpf1-issue",
            "placeholder": "slow page load times",
            "color": "yellow",
            "suggestions": ["slow page load times", "memory leak", "high CPU usage", "slow database queries", "API response time", "rendering bottleneck", "bundle size too large"]
          }
        ]
      },
      {
        "id": "dpf2",
        "textKey": "templates.debugPerformance.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dpf2-env",
            "placeholder": "React web app",
            "color": "cyan",
            "suggestions": ["React web app", "Node.js backend", "Python API", "mobile app", "database", "microservices", "serverless functions"]
          }
        ]
      },
      { "id": "dpf3", "textKey": "templates.debugPerformance.line3", "type": "fixed" },
      { "id": "dpf4", "textKey": "templates.debugPerformance.line4", "type": "fixed" },
      { "id": "dpf5", "textKey": "templates.debugPerformance.line5", "type": "fixed" },
      { "id": "dpf6", "textKey": "templates.debugPerformance.line6", "type": "fixed" },
      { "id": "dpf7", "textKey": "templates.debugPerformance.line7", "type": "fixed" },
      { "id": "dpf8", "textKey": "templates.debugPerformance.line8", "type": "fixed" },
      { "id": "dpf9", "textKey": "templates.debugPerformance.line9", "type": "fixed" },
      { "id": "dpf10", "textKey": "templates.debugPerformance.line10", "type": "fixed" }
    ]
  },
  {
    "id": "debugSecurity",
    "sections": [
      {
        "id": "dsc1",
        "textKey": "templates.debugSecurity.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dsc1-issue",
            "placeholder": "potential XSS vulnerability",
            "color": "yellow",
            "suggestions": ["potential XSS vulnerability", "SQL injection risk", "authentication bypass", "CORS misconfiguration", "insecure API endpoint", "data leak", "CSRF vulnerability"]
          }
        ]
      },
      {
        "id": "dsc2",
        "textKey": "templates.debugSecurity.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dsc2-stack",
            "placeholder": "Node.js + Express",
            "color": "cyan",
            "suggestions": ["Node.js + Express", "React + Next.js", "Python + Django", "Java + Spring", "PHP + Laravel", "Go", "Ruby on Rails"]
          }
        ]
      },
      { "id": "dsc3", "textKey": "templates.debugSecurity.line3", "type": "fixed" },
      { "id": "dsc4", "textKey": "templates.debugSecurity.line4", "type": "fixed" },
      { "id": "dsc5", "textKey": "templates.debugSecurity.line5", "type": "fixed" },
      { "id": "dsc6", "textKey": "templates.debugSecurity.line6", "type": "fixed" },
      { "id": "dsc7", "textKey": "templates.debugSecurity.line7", "type": "fixed" },
      { "id": "dsc8", "textKey": "templates.debugSecurity.line8", "type": "fixed" },
      { "id": "dsc9", "textKey": "templates.debugSecurity.line9", "type": "fixed" },
      { "id": "dsc10", "textKey": "templates.debugSecurity.line10", "type": "fixed" }
    ]
  },
  {
    "id": "debugMobile",
    "sections": [
      {
        "id": "dmb1",
        "textKey": "templates.debugMobile.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dmb1-issue",
            "placeholder": "app crashes on launch",
            "color": "yellow",
            "suggestions": ["app crashes on launch", "UI rendering glitch", "network request failing", "push notifications not working", "battery drain", "memory warning", "layout broken on specific device"]
          }
        ]
      },
      {
        "id": "dmb2",
        "textKey": "templates.debugMobile.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "dmb2-platform",
            "placeholder": "iOS (Swift)",
            "color": "cyan",
            "suggestions": ["iOS (Swift)", "iOS (SwiftUI)", "Android (Kotlin)", "Android (Java)", "React Native", "Flutter", "Expo"]
          }
        ]
      },
      { "id": "dmb3", "textKey": "templates.debugMobile.line3", "type": "fixed" },
      { "id": "dmb4", "textKey": "templates.debugMobile.line4", "type": "fixed" },
      { "id": "dmb5", "textKey": "templates.debugMobile.line5", "type": "fixed" },
      { "id": "dmb6", "textKey": "templates.debugMobile.line6", "type": "fixed" },
      { "id": "dmb7", "textKey": "templates.debugMobile.line7", "type": "fixed" },
      { "id": "dmb8", "textKey": "templates.debugMobile.line8", "type": "fixed" },
      { "id": "dmb9", "textKey": "templates.debugMobile.line9", "type": "fixed" },
      { "id": "dmb10", "textKey": "templates.debugMobile.line10", "type": "fixed" }
    ]
  }
];

export default templates;
