import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "buildWebsite",
    "sections": [
      {
        "id": "bw1",
        "textKey": "templates.buildWebsite.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bw1-name",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bw2",
        "textKey": "templates.buildWebsite.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bw2-fw",
            "placeholder": "React",
            "color": "cyan",
            "suggestions": [
              "React",
              "Vue",
              "Angular",
              "Svelte",
              "Next.js",
              "Nuxt",
              "Astro",
              "SolidJS",
              "Remix",
              "Gatsby"
            ]
          },
          {
            "id": "bw2-router",
            "placeholder": "React Router",
            "color": "cyan",
            "suggestions": [
              "React Router",
              "TanStack Router",
              "Vue Router",
              "SvelteKit",
              "Next.js App Router"
            ]
          }
        ]
      },
      {
        "id": "bw3",
        "textKey": "templates.buildWebsite.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bw3-langs",
            "placeholder": "English, Chinese, Japanese",
            "color": "green",
            "inputType": "labels",
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
              "Arabic",
              "Hindi",
              "Thai",
              "Vietnamese",
              "Italian",
              "Dutch"
            ]
          }
        ]
      },
      {
        "id": "bw4",
        "textKey": "templates.buildWebsite.line4",
        "type": "fixed"
      },
      {
        "id": "bw5",
        "textKey": "templates.buildWebsite.line5",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bw5-landing",
            "textKey": "templates.buildWebsite.pages.landing"
          },
          {
            "id": "bw5-about",
            "textKey": "templates.buildWebsite.pages.about"
          },
          {
            "id": "bw5-contact",
            "textKey": "templates.buildWebsite.pages.contact"
          },
          {
            "id": "bw5-blog",
            "textKey": "templates.buildWebsite.pages.blog"
          },
          {
            "id": "bw5-faq",
            "textKey": "templates.buildWebsite.pages.faq"
          },
          {
            "id": "bw5-privacy",
            "textKey": "templates.buildWebsite.pages.privacy"
          },
          {
            "id": "bw5-terms",
            "textKey": "templates.buildWebsite.pages.terms"
          }
        ]
      },
      {
        "id": "bw6",
        "textKey": "templates.buildWebsite.line6",
        "type": "fixed"
      },
      {
        "id": "bw7",
        "textKey": "templates.buildWebsite.line7",
        "type": "fixed"
      },
      {
        "id": "bw8",
        "textKey": "templates.buildWebsite.line8",
        "type": "fixed"
      },
      {
        "id": "bw9",
        "textKey": "templates.buildWebsite.line9",
        "type": "fixed"
      },
      {
        "id": "bw10",
        "textKey": "templates.buildWebsite.line10",
        "type": "fixed"
      },
      {
        "id": "bw11",
        "textKey": "templates.buildWebsite.line11",
        "type": "fixed"
      },
      {
        "id": "bw12",
        "textKey": "templates.buildWebsite.line12",
        "type": "fixed"
      },
      {
        "id": "bw13",
        "textKey": "templates.buildWebsite.line13",
        "type": "fixed"
      },
      {
        "id": "bw14",
        "textKey": "templates.buildWebsite.line14",
        "type": "fixed"
      },
      {
        "id": "bw15",
        "textKey": "templates.buildWebsite.line15",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildApp",
    "sections": [
      {
        "id": "ba1",
        "textKey": "templates.buildApp.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ba1-name",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "ba2",
        "textKey": "templates.buildApp.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ba2-fw",
            "placeholder": "React Native",
            "color": "cyan",
            "suggestions": [
              "React Native",
              "Flutter",
              "SwiftUI",
              "Kotlin Multiplatform",
              "Ionic",
              "Expo",
              ".NET MAUI",
              "Capacitor"
            ]
          }
        ]
      },
      {
        "id": "ba3",
        "textKey": "templates.buildApp.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ba3-platforms",
            "placeholder": "iOS, Android",
            "color": "green",
            "inputType": "labels",
            "suggestions": [
              "iOS",
              "Android",
              "Web",
              "macOS",
              "Windows",
              "Linux"
            ]
          }
        ]
      },
      {
        "id": "ba4",
        "textKey": "templates.buildApp.line4",
        "type": "fixed"
      },
      {
        "id": "ba5",
        "textKey": "templates.buildApp.line5",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "ba5-splash",
            "textKey": "templates.buildApp.screens.splash"
          },
          {
            "id": "ba5-login",
            "textKey": "templates.buildApp.screens.login"
          },
          {
            "id": "ba5-home",
            "textKey": "templates.buildApp.screens.home"
          },
          {
            "id": "ba5-profile",
            "textKey": "templates.buildApp.screens.profile"
          },
          {
            "id": "ba5-settings",
            "textKey": "templates.buildApp.screens.settings"
          },
          {
            "id": "ba5-notifications",
            "textKey": "templates.buildApp.screens.notifications"
          }
        ]
      },
      {
        "id": "ba6",
        "textKey": "templates.buildApp.line6",
        "type": "fixed"
      },
      {
        "id": "ba7",
        "textKey": "templates.buildApp.line7",
        "type": "fixed"
      },
      {
        "id": "ba8",
        "textKey": "templates.buildApp.line8",
        "type": "fixed"
      },
      {
        "id": "ba9",
        "textKey": "templates.buildApp.line9",
        "type": "fixed"
      },
      {
        "id": "ba10",
        "textKey": "templates.buildApp.line10",
        "type": "fixed"
      },
      {
        "id": "ba11",
        "textKey": "templates.buildApp.line11",
        "type": "fixed"
      },
      {
        "id": "ba12",
        "textKey": "templates.buildApp.line12",
        "type": "fixed"
      },
      {
        "id": "ba13",
        "textKey": "templates.buildApp.line13",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildPresentations",
    "sections": [
      {
        "id": "bp1",
        "textKey": "templates.buildPresentations.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp1-topic",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bp2",
        "textKey": "templates.buildPresentations.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp2-audience",
            "placeholder": "technical stakeholders",
            "color": "green",
            "suggestions": [
              "technical stakeholders",
              "executives",
              "investors",
              "general audience",
              "customers",
              "students",
              "team members"
            ]
          }
        ]
      },
      {
        "id": "bp3",
        "textKey": "templates.buildPresentations.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp3-count",
            "placeholder": "15",
            "color": "cyan",
            "inputType": "number",
            "min": 1,
            "max": 100
          }
        ]
      },
      {
        "id": "bp4",
        "textKey": "templates.buildPresentations.line4",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bp4-duration",
            "placeholder": "20 minutes",
            "color": "cyan",
            "suggestions": [
              "5 minutes",
              "10 minutes",
              "15 minutes",
              "20 minutes",
              "30 minutes",
              "45 minutes",
              "1 hour"
            ]
          }
        ]
      },
      {
        "id": "bp5",
        "textKey": "templates.buildPresentations.line5",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bp5-title",
            "textKey": "templates.buildPresentations.slides.title"
          },
          {
            "id": "bp5-agenda",
            "textKey": "templates.buildPresentations.slides.agenda"
          },
          {
            "id": "bp5-problem",
            "textKey": "templates.buildPresentations.slides.problem"
          },
          {
            "id": "bp5-solution",
            "textKey": "templates.buildPresentations.slides.solution"
          },
          {
            "id": "bp5-demo",
            "textKey": "templates.buildPresentations.slides.demo"
          },
          {
            "id": "bp5-timeline",
            "textKey": "templates.buildPresentations.slides.timeline"
          },
          {
            "id": "bp5-qa",
            "textKey": "templates.buildPresentations.slides.qa"
          }
        ]
      },
      {
        "id": "bp6",
        "textKey": "templates.buildPresentations.line6",
        "type": "fixed"
      },
      {
        "id": "bp7",
        "textKey": "templates.buildPresentations.line7",
        "type": "fixed"
      },
      {
        "id": "bp8",
        "textKey": "templates.buildPresentations.line8",
        "type": "fixed"
      },
      {
        "id": "bp9",
        "textKey": "templates.buildPresentations.line9",
        "type": "fixed"
      },
      {
        "id": "bp10",
        "textKey": "templates.buildPresentations.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildApi",
    "sections": [
      {
        "id": "bapi1",
        "textKey": "templates.buildApi.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bapi1-name",
            "placeholder": "OOO",
            "color": "yellow"
          },
          {
            "id": "bapi1-style",
            "placeholder": "REST",
            "color": "cyan",
            "suggestions": [
              "REST",
              "GraphQL",
              "gRPC",
              "WebSocket",
              "tRPC"
            ]
          }
        ]
      },
      {
        "id": "bapi2",
        "textKey": "templates.buildApi.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bapi2-lang",
            "placeholder": "Node.js with Express",
            "color": "cyan",
            "suggestions": [
              "Node.js with Express",
              "Node.js with Fastify",
              "Python with FastAPI",
              "Python with Django",
              "Go with Gin",
              "Go with Fiber",
              "Rust with Actix",
              "Java with Spring Boot",
              "C# with ASP.NET"
            ]
          }
        ]
      },
      {
        "id": "bapi3",
        "textKey": "templates.buildApi.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bapi3-db",
            "placeholder": "PostgreSQL",
            "color": "cyan",
            "suggestions": [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "Redis",
              "SQLite",
              "DynamoDB",
              "Supabase",
              "PlanetScale",
              "CockroachDB"
            ]
          }
        ]
      },
      {
        "id": "bapi4",
        "textKey": "templates.buildApi.line4",
        "type": "fixed"
      },
      {
        "id": "bapi5",
        "textKey": "templates.buildApi.line5",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bapi5-users",
            "textKey": "templates.buildApi.endpoints.users"
          },
          {
            "id": "bapi5-auth",
            "textKey": "templates.buildApi.endpoints.auth"
          },
          {
            "id": "bapi5-products",
            "textKey": "templates.buildApi.endpoints.products"
          },
          {
            "id": "bapi5-orders",
            "textKey": "templates.buildApi.endpoints.orders"
          },
          {
            "id": "bapi5-health",
            "textKey": "templates.buildApi.endpoints.health"
          }
        ]
      },
      {
        "id": "bapi6",
        "textKey": "templates.buildApi.line6",
        "type": "fixed"
      },
      {
        "id": "bapi7",
        "textKey": "templates.buildApi.line7",
        "type": "fixed"
      },
      {
        "id": "bapi8",
        "textKey": "templates.buildApi.line8",
        "type": "fixed"
      },
      {
        "id": "bapi9",
        "textKey": "templates.buildApi.line9",
        "type": "fixed"
      },
      {
        "id": "bapi10",
        "textKey": "templates.buildApi.line10",
        "type": "fixed"
      },
      {
        "id": "bapi11",
        "textKey": "templates.buildApi.line11",
        "type": "fixed"
      },
      {
        "id": "bapi12",
        "textKey": "templates.buildApi.line12",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildDatabase",
    "sections": [
      {
        "id": "bdb1",
        "textKey": "templates.buildDatabase.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bdb1-name",
            "placeholder": "OOO",
            "color": "yellow"
          },
          {
            "id": "bdb1-engine",
            "placeholder": "PostgreSQL",
            "color": "cyan",
            "suggestions": [
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "SQLite",
              "MariaDB",
              "Oracle",
              "SQL Server",
              "CockroachDB",
              "Supabase"
            ]
          }
        ]
      },
      {
        "id": "bdb2",
        "textKey": "templates.buildDatabase.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bdb2-domain",
            "placeholder": "e-commerce platform",
            "color": "green",
            "suggestions": [
              "e-commerce platform",
              "social media",
              "healthcare",
              "education",
              "fintech",
              "SaaS",
              "logistics",
              "CRM"
            ]
          }
        ]
      },
      {
        "id": "bdb3",
        "textKey": "templates.buildDatabase.line3",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bdb3-users",
            "textKey": "templates.buildDatabase.tables.users"
          },
          {
            "id": "bdb3-products",
            "textKey": "templates.buildDatabase.tables.products"
          },
          {
            "id": "bdb3-orders",
            "textKey": "templates.buildDatabase.tables.orders"
          },
          {
            "id": "bdb3-payments",
            "textKey": "templates.buildDatabase.tables.payments"
          },
          {
            "id": "bdb3-categories",
            "textKey": "templates.buildDatabase.tables.categories"
          }
        ]
      },
      {
        "id": "bdb4",
        "textKey": "templates.buildDatabase.line4",
        "type": "fixed"
      },
      {
        "id": "bdb5",
        "textKey": "templates.buildDatabase.line5",
        "type": "fixed"
      },
      {
        "id": "bdb6",
        "textKey": "templates.buildDatabase.line6",
        "type": "fixed"
      },
      {
        "id": "bdb7",
        "textKey": "templates.buildDatabase.line7",
        "type": "fixed"
      },
      {
        "id": "bdb8",
        "textKey": "templates.buildDatabase.line8",
        "type": "fixed"
      },
      {
        "id": "bdb9",
        "textKey": "templates.buildDatabase.line9",
        "type": "fixed"
      },
      {
        "id": "bdb10",
        "textKey": "templates.buildDatabase.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildScript",
    "sections": [
      {
        "id": "bs1",
        "textKey": "templates.buildScript.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bs1-task",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bs2",
        "textKey": "templates.buildScript.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bs2-lang",
            "placeholder": "Python",
            "color": "cyan",
            "suggestions": [
              "Python",
              "Bash",
              "PowerShell",
              "Node.js",
              "Go",
              "Rust",
              "Ruby",
              "Perl"
            ]
          }
        ]
      },
      {
        "id": "bs3",
        "textKey": "templates.buildScript.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bs3-input",
            "placeholder": "CSV files in a directory",
            "color": "green"
          }
        ]
      },
      {
        "id": "bs4",
        "textKey": "templates.buildScript.line4",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bs4-output",
            "placeholder": "consolidated report",
            "color": "green"
          }
        ]
      },
      {
        "id": "bs5",
        "textKey": "templates.buildScript.line5",
        "type": "fixed"
      },
      {
        "id": "bs6",
        "textKey": "templates.buildScript.line6",
        "type": "fixed"
      },
      {
        "id": "bs7",
        "textKey": "templates.buildScript.line7",
        "type": "fixed"
      },
      {
        "id": "bs8",
        "textKey": "templates.buildScript.line8",
        "type": "fixed"
      },
      {
        "id": "bs9",
        "textKey": "templates.buildScript.line9",
        "type": "fixed"
      },
      {
        "id": "bs10",
        "textKey": "templates.buildScript.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildBot",
    "sections": [
      {
        "id": "bb1",
        "textKey": "templates.buildBot.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bb1-name",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bb2",
        "textKey": "templates.buildBot.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bb2-platform",
            "placeholder": "Discord",
            "color": "cyan",
            "suggestions": [
              "Discord",
              "Telegram",
              "Slack",
              "LINE",
              "WhatsApp",
              "Microsoft Teams",
              "Facebook Messenger"
            ]
          }
        ]
      },
      {
        "id": "bb3",
        "textKey": "templates.buildBot.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bb3-lang",
            "placeholder": "Node.js",
            "color": "cyan",
            "suggestions": [
              "Node.js",
              "Python",
              "Go",
              "Rust",
              "Java",
              "TypeScript",
              "C#"
            ]
          }
        ]
      },
      {
        "id": "bb4",
        "textKey": "templates.buildBot.line4",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bb4-greet",
            "textKey": "templates.buildBot.features.greet"
          },
          {
            "id": "bb4-faq",
            "textKey": "templates.buildBot.features.faq"
          },
          {
            "id": "bb4-moderate",
            "textKey": "templates.buildBot.features.moderate"
          },
          {
            "id": "bb4-notify",
            "textKey": "templates.buildBot.features.notify"
          },
          {
            "id": "bb4-custom",
            "textKey": "templates.buildBot.features.customCommands"
          }
        ]
      },
      {
        "id": "bb5",
        "textKey": "templates.buildBot.line5",
        "type": "fixed"
      },
      {
        "id": "bb6",
        "textKey": "templates.buildBot.line6",
        "type": "fixed"
      },
      {
        "id": "bb7",
        "textKey": "templates.buildBot.line7",
        "type": "fixed"
      },
      {
        "id": "bb8",
        "textKey": "templates.buildBot.line8",
        "type": "fixed"
      },
      {
        "id": "bb9",
        "textKey": "templates.buildBot.line9",
        "type": "fixed"
      },
      {
        "id": "bb10",
        "textKey": "templates.buildBot.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildExtension",
    "sections": [
      {
        "id": "be1",
        "textKey": "templates.buildExtension.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "be1-name",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "be2",
        "textKey": "templates.buildExtension.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "be2-browser",
            "placeholder": "Chrome",
            "color": "cyan",
            "suggestions": [
              "Chrome",
              "Firefox",
              "Safari",
              "Edge",
              "Brave",
              "Arc"
            ]
          }
        ]
      },
      {
        "id": "be3",
        "textKey": "templates.buildExtension.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "be3-purpose",
            "placeholder": "enhance productivity on web pages",
            "color": "green"
          }
        ]
      },
      {
        "id": "be4",
        "textKey": "templates.buildExtension.line4",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "be4-popup",
            "textKey": "templates.buildExtension.features.popup"
          },
          {
            "id": "be4-content",
            "textKey": "templates.buildExtension.features.contentScript"
          },
          {
            "id": "be4-background",
            "textKey": "templates.buildExtension.features.background"
          },
          {
            "id": "be4-options",
            "textKey": "templates.buildExtension.features.optionsPage"
          },
          {
            "id": "be4-storage",
            "textKey": "templates.buildExtension.features.storage"
          }
        ]
      },
      {
        "id": "be5",
        "textKey": "templates.buildExtension.line5",
        "type": "fixed"
      },
      {
        "id": "be6",
        "textKey": "templates.buildExtension.line6",
        "type": "fixed"
      },
      {
        "id": "be7",
        "textKey": "templates.buildExtension.line7",
        "type": "fixed"
      },
      {
        "id": "be8",
        "textKey": "templates.buildExtension.line8",
        "type": "fixed"
      },
      {
        "id": "be9",
        "textKey": "templates.buildExtension.line9",
        "type": "fixed"
      },
      {
        "id": "be10",
        "textKey": "templates.buildExtension.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildGame",
    "sections": [
      {
        "id": "bg1",
        "textKey": "templates.buildGame.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bg1-name",
            "placeholder": "OOO",
            "color": "yellow"
          },
          {
            "id": "bg1-genre",
            "placeholder": "2D platformer",
            "color": "green",
            "suggestions": [
              "2D platformer",
              "3D action",
              "puzzle",
              "RPG",
              "strategy",
              "simulation",
              "racing",
              "horror",
              "sandbox",
              "tower defense"
            ]
          }
        ]
      },
      {
        "id": "bg2",
        "textKey": "templates.buildGame.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bg2-engine",
            "placeholder": "Unity",
            "color": "cyan",
            "suggestions": [
              "Unity",
              "Godot",
              "Unreal Engine",
              "Phaser",
              "Babylon.js",
              "PixiJS",
              "Construct 3",
              "RPG Maker"
            ]
          }
        ]
      },
      {
        "id": "bg3",
        "textKey": "templates.buildGame.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bg3-platform",
            "placeholder": "Web and Mobile",
            "color": "cyan",
            "suggestions": [
              "Web",
              "Mobile",
              "Web and Mobile",
              "Desktop",
              "Console",
              "Steam"
            ]
          }
        ]
      },
      {
        "id": "bg4",
        "textKey": "templates.buildGame.line4",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bg4-movement",
            "textKey": "templates.buildGame.mechanics.movement"
          },
          {
            "id": "bg4-combat",
            "textKey": "templates.buildGame.mechanics.combat"
          },
          {
            "id": "bg4-inventory",
            "textKey": "templates.buildGame.mechanics.inventory"
          },
          {
            "id": "bg4-scoring",
            "textKey": "templates.buildGame.mechanics.scoring"
          },
          {
            "id": "bg4-levels",
            "textKey": "templates.buildGame.mechanics.levels"
          }
        ]
      },
      {
        "id": "bg5",
        "textKey": "templates.buildGame.line5",
        "type": "fixed"
      },
      {
        "id": "bg6",
        "textKey": "templates.buildGame.line6",
        "type": "fixed"
      },
      {
        "id": "bg7",
        "textKey": "templates.buildGame.line7",
        "type": "fixed"
      },
      {
        "id": "bg8",
        "textKey": "templates.buildGame.line8",
        "type": "fixed"
      },
      {
        "id": "bg9",
        "textKey": "templates.buildGame.line9",
        "type": "fixed"
      },
      {
        "id": "bg10",
        "textKey": "templates.buildGame.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "buildCliTool",
    "sections": [
      {
        "id": "bcli1",
        "textKey": "templates.buildCliTool.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bcli1-name",
            "placeholder": "OOO",
            "color": "yellow"
          }
        ]
      },
      {
        "id": "bcli2",
        "textKey": "templates.buildCliTool.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bcli2-lang",
            "placeholder": "Go",
            "color": "cyan",
            "suggestions": [
              "Go",
              "Rust",
              "Python",
              "Node.js",
              "C++",
              "Java",
              "C#",
              "Ruby"
            ]
          }
        ]
      },
      {
        "id": "bcli3",
        "textKey": "templates.buildCliTool.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "bcli3-purpose",
            "placeholder": "manage project scaffolding",
            "color": "green"
          }
        ]
      },
      {
        "id": "bcli4",
        "textKey": "templates.buildCliTool.line4",
        "type": "extensible",
        "defaultItems": [
          {
            "id": "bcli4-init",
            "textKey": "templates.buildCliTool.commands.init"
          },
          {
            "id": "bcli4-create",
            "textKey": "templates.buildCliTool.commands.create"
          },
          {
            "id": "bcli4-list",
            "textKey": "templates.buildCliTool.commands.list"
          },
          {
            "id": "bcli4-config",
            "textKey": "templates.buildCliTool.commands.config"
          },
          {
            "id": "bcli4-help",
            "textKey": "templates.buildCliTool.commands.help"
          }
        ]
      },
      {
        "id": "bcli5",
        "textKey": "templates.buildCliTool.line5",
        "type": "fixed"
      },
      {
        "id": "bcli6",
        "textKey": "templates.buildCliTool.line6",
        "type": "fixed"
      },
      {
        "id": "bcli7",
        "textKey": "templates.buildCliTool.line7",
        "type": "fixed"
      },
      {
        "id": "bcli8",
        "textKey": "templates.buildCliTool.line8",
        "type": "fixed"
      },
      {
        "id": "bcli9",
        "textKey": "templates.buildCliTool.line9",
        "type": "fixed"
      },
      {
        "id": "bcli10",
        "textKey": "templates.buildCliTool.line10",
        "type": "fixed"
      }
    ]
  }
];

export default templates;
