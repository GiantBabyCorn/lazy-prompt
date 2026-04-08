import type { PromptTemplate } from '../types';

const templates: PromptTemplate[] = [
  {
    "id": "writeEmail",
    "sections": [
      {
        "id": "we1",
        "textKey": "templates.writeEmail.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we1-purpose",
            "placeholder": "follow up on a meeting",
            "color": "yellow",
            "suggestions": ["follow up on a meeting", "request a deadline extension", "introduce yourself", "schedule a call", "thank someone", "share a project update", "ask for feedback"]
          }
        ]
      },
      {
        "id": "we2",
        "textKey": "templates.writeEmail.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we2-recipient",
            "placeholder": "colleague",
            "color": "green",
            "suggestions": [
              "colleague",
              "manager",
              "client",
              "vendor",
              "team",
              "HR",
              "customer support"
            ]
          }
        ]
      },
      {
        "id": "we3",
        "textKey": "templates.writeEmail.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "we3-tone",
            "placeholder": "professional",
            "color": "cyan",
            "suggestions": [
              "professional",
              "friendly",
              "formal",
              "apologetic",
              "urgent",
              "persuasive",
              "casual"
            ]
          }
        ]
      },
      {
        "id": "we4",
        "textKey": "templates.writeEmail.line4",
        "type": "fixed"
      },
      {
        "id": "we5",
        "textKey": "templates.writeEmail.line5",
        "type": "fixed"
      },
      {
        "id": "we6",
        "textKey": "templates.writeEmail.line6",
        "type": "fixed"
      },
      {
        "id": "we7",
        "textKey": "templates.writeEmail.line7",
        "type": "fixed"
      },
      {
        "id": "we8",
        "textKey": "templates.writeEmail.line8",
        "type": "fixed"
      },
      {
        "id": "we9",
        "textKey": "templates.writeEmail.line9",
        "type": "fixed"
      },
      {
        "id": "we10",
        "textKey": "templates.writeEmail.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeBlog",
    "sections": [
      {
        "id": "wb1",
        "textKey": "templates.writeBlog.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb1-topic",
            "placeholder": "the future of AI in healthcare",
            "color": "yellow",
            "suggestions": ["the future of AI in healthcare", "remote work best practices", "beginner's guide to investing", "sustainable living tips", "how to learn a new language", "productivity hacks for developers"]
          }
        ]
      },
      {
        "id": "wb2",
        "textKey": "templates.writeBlog.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb2-length",
            "placeholder": "1500 words",
            "color": "cyan",
            "suggestions": [
              "500 words",
              "800 words",
              "1000 words",
              "1500 words",
              "2000 words",
              "3000 words"
            ]
          }
        ]
      },
      {
        "id": "wb3",
        "textKey": "templates.writeBlog.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wb3-tone",
            "placeholder": "informative yet engaging",
            "color": "green",
            "suggestions": [
              "informative yet engaging",
              "conversational",
              "authoritative",
              "inspirational",
              "humorous",
              "technical"
            ]
          }
        ]
      },
      {
        "id": "wb4",
        "textKey": "templates.writeBlog.line4",
        "type": "fixed"
      },
      {
        "id": "wb5",
        "textKey": "templates.writeBlog.line5",
        "type": "fixed"
      },
      {
        "id": "wb6",
        "textKey": "templates.writeBlog.line6",
        "type": "fixed"
      },
      {
        "id": "wb7",
        "textKey": "templates.writeBlog.line7",
        "type": "fixed"
      },
      {
        "id": "wb8",
        "textKey": "templates.writeBlog.line8",
        "type": "fixed"
      },
      {
        "id": "wb9",
        "textKey": "templates.writeBlog.line9",
        "type": "fixed"
      },
      {
        "id": "wb10",
        "textKey": "templates.writeBlog.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeDocumentation",
    "sections": [
      {
        "id": "wd1",
        "textKey": "templates.writeDocumentation.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd1-project",
            "placeholder": "my REST API",
            "color": "yellow",
            "suggestions": ["my REST API", "my React component library", "my CLI tool", "my Python package", "my mobile app", "my microservice"]
          }
        ]
      },
      {
        "id": "wd2",
        "textKey": "templates.writeDocumentation.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd2-type",
            "placeholder": "API reference",
            "color": "cyan",
            "suggestions": [
              "API reference",
              "getting started guide",
              "tutorial",
              "README",
              "architecture docs",
              "changelog",
              "migration guide"
            ]
          }
        ]
      },
      {
        "id": "wd3",
        "textKey": "templates.writeDocumentation.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wd3-audience",
            "placeholder": "developers",
            "color": "green",
            "suggestions": [
              "developers",
              "end users",
              "DevOps engineers",
              "data scientists",
              "project managers",
              "beginners"
            ]
          }
        ]
      },
      {
        "id": "wd4",
        "textKey": "templates.writeDocumentation.line4",
        "type": "fixed"
      },
      {
        "id": "wd5",
        "textKey": "templates.writeDocumentation.line5",
        "type": "fixed"
      },
      {
        "id": "wd6",
        "textKey": "templates.writeDocumentation.line6",
        "type": "fixed"
      },
      {
        "id": "wd7",
        "textKey": "templates.writeDocumentation.line7",
        "type": "fixed"
      },
      {
        "id": "wd8",
        "textKey": "templates.writeDocumentation.line8",
        "type": "fixed"
      },
      {
        "id": "wd9",
        "textKey": "templates.writeDocumentation.line9",
        "type": "fixed"
      },
      {
        "id": "wd10",
        "textKey": "templates.writeDocumentation.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeProposal",
    "sections": [
      {
        "id": "wp1",
        "textKey": "templates.writeProposal.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wp1-project",
            "placeholder": "a new CRM system",
            "color": "yellow",
            "suggestions": ["a new CRM system", "a cloud migration plan", "a mobile app redesign", "an AI integration project", "a team expansion", "a process automation initiative"]
          }
        ]
      },
      {
        "id": "wp2",
        "textKey": "templates.writeProposal.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wp2-audience",
            "placeholder": "executive leadership",
            "color": "green",
            "suggestions": [
              "executive leadership",
              "investors",
              "clients",
              "board of directors",
              "government agency",
              "internal stakeholders"
            ]
          }
        ]
      },
      {
        "id": "wp3",
        "textKey": "templates.writeProposal.line3",
        "type": "fixed"
      },
      {
        "id": "wp4",
        "textKey": "templates.writeProposal.line4",
        "type": "fixed"
      },
      {
        "id": "wp5",
        "textKey": "templates.writeProposal.line5",
        "type": "fixed"
      },
      {
        "id": "wp6",
        "textKey": "templates.writeProposal.line6",
        "type": "fixed"
      },
      {
        "id": "wp7",
        "textKey": "templates.writeProposal.line7",
        "type": "fixed"
      },
      {
        "id": "wp8",
        "textKey": "templates.writeProposal.line8",
        "type": "fixed"
      },
      {
        "id": "wp9",
        "textKey": "templates.writeProposal.line9",
        "type": "fixed"
      },
      {
        "id": "wp10",
        "textKey": "templates.writeProposal.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeStory",
    "sections": [
      {
        "id": "ws1",
        "textKey": "templates.writeStory.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws1-genre",
            "placeholder": "science fiction",
            "color": "yellow",
            "suggestions": [
              "science fiction",
              "fantasy",
              "mystery",
              "romance",
              "horror",
              "literary fiction",
              "thriller",
              "historical fiction",
              "comedy"
            ]
          }
        ]
      },
      {
        "id": "ws2",
        "textKey": "templates.writeStory.line2",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws2-length",
            "placeholder": "2000 words",
            "color": "cyan",
            "suggestions": [
              "500 words (flash fiction)",
              "1000 words",
              "2000 words",
              "5000 words",
              "10000 words (novelette)"
            ]
          }
        ]
      },
      {
        "id": "ws3",
        "textKey": "templates.writeStory.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "ws3-pov",
            "placeholder": "third person limited",
            "color": "green",
            "suggestions": [
              "first person",
              "second person",
              "third person limited",
              "third person omniscient",
              "multiple POV"
            ]
          }
        ]
      },
      {
        "id": "ws4",
        "textKey": "templates.writeStory.line4",
        "type": "fixed"
      },
      {
        "id": "ws5",
        "textKey": "templates.writeStory.line5",
        "type": "fixed"
      },
      {
        "id": "ws6",
        "textKey": "templates.writeStory.line6",
        "type": "fixed"
      },
      {
        "id": "ws7",
        "textKey": "templates.writeStory.line7",
        "type": "fixed"
      },
      {
        "id": "ws8",
        "textKey": "templates.writeStory.line8",
        "type": "fixed"
      },
      {
        "id": "ws9",
        "textKey": "templates.writeStory.line9",
        "type": "fixed"
      },
      {
        "id": "ws10",
        "textKey": "templates.writeStory.line10",
        "type": "fixed"
      }
    ]
  },
  {
    "id": "writeSocialMedia",
    "sections": [
      {
        "id": "wsm1",
        "textKey": "templates.writeSocialMedia.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wsm1-platform",
            "placeholder": "Twitter/X",
            "color": "yellow",
            "suggestions": ["Twitter/X", "Instagram", "LinkedIn", "Facebook", "TikTok", "Threads", "Reddit"]
          }
        ]
      },
      {
        "id": "wsm2",
        "textKey": "templates.writeSocialMedia.line2",
        "type": "fixed",
        "editableSpans": [
          { "id": "wsm2-topic", "placeholder": "our new product launch", "color": "cyan", "suggestions": ["our new product launch", "a company milestone", "an upcoming event", "a behind-the-scenes look", "an industry trend", "a customer success story"] }
        ]
      },
      {
        "id": "wsm3",
        "textKey": "templates.writeSocialMedia.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wsm3-tone",
            "placeholder": "engaging and casual",
            "color": "green",
            "suggestions": ["engaging and casual", "professional", "witty", "inspirational", "informative", "provocative", "humorous"]
          }
        ]
      },
      { "id": "wsm4", "textKey": "templates.writeSocialMedia.line4", "type": "fixed" },
      { "id": "wsm5", "textKey": "templates.writeSocialMedia.line5", "type": "fixed" },
      { "id": "wsm6", "textKey": "templates.writeSocialMedia.line6", "type": "fixed" },
      { "id": "wsm7", "textKey": "templates.writeSocialMedia.line7", "type": "fixed" },
      { "id": "wsm8", "textKey": "templates.writeSocialMedia.line8", "type": "fixed" },
      { "id": "wsm9", "textKey": "templates.writeSocialMedia.line9", "type": "fixed" },
      { "id": "wsm10", "textKey": "templates.writeSocialMedia.line10", "type": "fixed" }
    ]
  },
  {
    "id": "writeResume",
    "sections": [
      {
        "id": "wr1",
        "textKey": "templates.writeResume.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wr1-type",
            "placeholder": "resume",
            "color": "yellow",
            "suggestions": ["resume", "cover letter", "LinkedIn summary", "CV"]
          }
        ]
      },
      {
        "id": "wr2",
        "textKey": "templates.writeResume.line2",
        "type": "fixed",
        "editableSpans": [
          { "id": "wr2-role", "placeholder": "Senior Software Engineer", "color": "cyan", "suggestions": ["Senior Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager", "Project Manager", "DevOps Engineer"] }
        ]
      },
      {
        "id": "wr3",
        "textKey": "templates.writeResume.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wr3-experience",
            "placeholder": "5 years",
            "color": "green",
            "suggestions": ["entry-level", "1-2 years", "3-5 years", "5-10 years", "10+ years"]
          }
        ]
      },
      { "id": "wr4", "textKey": "templates.writeResume.line4", "type": "fixed" },
      { "id": "wr5", "textKey": "templates.writeResume.line5", "type": "fixed" },
      { "id": "wr6", "textKey": "templates.writeResume.line6", "type": "fixed" },
      { "id": "wr7", "textKey": "templates.writeResume.line7", "type": "fixed" },
      { "id": "wr8", "textKey": "templates.writeResume.line8", "type": "fixed" },
      { "id": "wr9", "textKey": "templates.writeResume.line9", "type": "fixed" },
      { "id": "wr10", "textKey": "templates.writeResume.line10", "type": "fixed" }
    ]
  },
  {
    "id": "writeReport",
    "sections": [
      {
        "id": "wrp1",
        "textKey": "templates.writeReport.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wrp1-type",
            "placeholder": "quarterly business report",
            "color": "yellow",
            "suggestions": ["quarterly business report", "project status report", "research report", "annual review", "incident report", "feasibility study"]
          }
        ]
      },
      {
        "id": "wrp2",
        "textKey": "templates.writeReport.line2",
        "type": "fixed",
        "editableSpans": [
          { "id": "wrp2-topic", "placeholder": "Q1 2026 sales performance", "color": "cyan", "suggestions": ["Q1 2026 sales performance", "customer satisfaction trends", "product launch results", "team productivity metrics", "marketing campaign ROI", "system outage post-mortem"] }
        ]
      },
      {
        "id": "wrp3",
        "textKey": "templates.writeReport.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wrp3-audience",
            "placeholder": "executive team",
            "color": "green",
            "suggestions": ["executive team", "board of directors", "department heads", "stakeholders", "clients", "regulatory body"]
          }
        ]
      },
      { "id": "wrp4", "textKey": "templates.writeReport.line4", "type": "fixed" },
      { "id": "wrp5", "textKey": "templates.writeReport.line5", "type": "fixed" },
      { "id": "wrp6", "textKey": "templates.writeReport.line6", "type": "fixed" },
      { "id": "wrp7", "textKey": "templates.writeReport.line7", "type": "fixed" },
      { "id": "wrp8", "textKey": "templates.writeReport.line8", "type": "fixed" },
      { "id": "wrp9", "textKey": "templates.writeReport.line9", "type": "fixed" },
      { "id": "wrp10", "textKey": "templates.writeReport.line10", "type": "fixed" }
    ]
  },
  {
    "id": "writeCopy",
    "sections": [
      {
        "id": "wc1",
        "textKey": "templates.writeCopy.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wc1-type",
            "placeholder": "landing page copy",
            "color": "yellow",
            "suggestions": ["landing page copy", "ad copy", "product description", "email campaign", "tagline / slogan", "banner ad", "press release"]
          }
        ]
      },
      {
        "id": "wc2",
        "textKey": "templates.writeCopy.line2",
        "type": "fixed",
        "editableSpans": [
          { "id": "wc2-product", "placeholder": "our AI writing assistant", "color": "cyan", "suggestions": ["our AI writing assistant", "a fitness tracking app", "an online course platform", "a meal delivery service", "a project management tool", "a sustainable fashion brand"] }
        ]
      },
      {
        "id": "wc3",
        "textKey": "templates.writeCopy.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wc3-audience",
            "placeholder": "small business owners",
            "color": "green",
            "suggestions": ["small business owners", "tech professionals", "millennials", "parents", "students", "enterprise buyers", "creators"]
          }
        ]
      },
      { "id": "wc4", "textKey": "templates.writeCopy.line4", "type": "fixed" },
      { "id": "wc5", "textKey": "templates.writeCopy.line5", "type": "fixed" },
      { "id": "wc6", "textKey": "templates.writeCopy.line6", "type": "fixed" },
      { "id": "wc7", "textKey": "templates.writeCopy.line7", "type": "fixed" },
      { "id": "wc8", "textKey": "templates.writeCopy.line8", "type": "fixed" },
      { "id": "wc9", "textKey": "templates.writeCopy.line9", "type": "fixed" },
      { "id": "wc10", "textKey": "templates.writeCopy.line10", "type": "fixed" }
    ]
  },
  {
    "id": "writeSpeech",
    "sections": [
      {
        "id": "wsp1",
        "textKey": "templates.writeSpeech.line1",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wsp1-type",
            "placeholder": "conference keynote",
            "color": "yellow",
            "suggestions": ["conference keynote", "wedding toast", "graduation speech", "product demo script", "YouTube video script", "podcast intro", "TED-style talk"]
          }
        ]
      },
      {
        "id": "wsp2",
        "textKey": "templates.writeSpeech.line2",
        "type": "fixed",
        "editableSpans": [
          { "id": "wsp2-topic", "placeholder": "the future of remote work", "color": "cyan", "suggestions": ["the future of remote work", "AI and the creative industry", "building resilient teams", "sustainability in tech", "lessons from failure", "the power of storytelling"] }
        ]
      },
      {
        "id": "wsp3",
        "textKey": "templates.writeSpeech.line3",
        "type": "fixed",
        "editableSpans": [
          {
            "id": "wsp3-duration",
            "placeholder": "10 minutes",
            "color": "green",
            "suggestions": ["3 minutes", "5 minutes", "10 minutes", "15 minutes", "20 minutes", "30 minutes"]
          }
        ]
      },
      { "id": "wsp4", "textKey": "templates.writeSpeech.line4", "type": "fixed" },
      { "id": "wsp5", "textKey": "templates.writeSpeech.line5", "type": "fixed" },
      { "id": "wsp6", "textKey": "templates.writeSpeech.line6", "type": "fixed" },
      { "id": "wsp7", "textKey": "templates.writeSpeech.line7", "type": "fixed" },
      { "id": "wsp8", "textKey": "templates.writeSpeech.line8", "type": "fixed" },
      { "id": "wsp9", "textKey": "templates.writeSpeech.line9", "type": "fixed" },
      { "id": "wsp10", "textKey": "templates.writeSpeech.line10", "type": "fixed" }
    ]
  }
];

export default templates;
