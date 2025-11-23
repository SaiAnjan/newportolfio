export type PortfolioChatMessage = {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  suggestions?: string[];
};

export type SourceReference = {
  label: string;
  href: string;
  type: "project" | "book" | "article" | "other";
};

// Map source paths to readable labels and links
export function formatSource(source: string): SourceReference {
  // Project sources
  if (source.includes("projects/")) {
    const projectMatch = source.match(/projects\/([^/]+)/);
    if (projectMatch) {
      const projectId = projectMatch[1];
      const projectMap: Record<string, { label: string; href: string }> = {
        "gpay": { label: "Google Pay + Wallet", href: "/projects/gpay" },
        "mindhouse": { label: "Mindhouse Live Class Filtering", href: "/projects/mindhouse" },
        "chargeit": { label: "Chargeit — Enterprise Payment", href: "/projects/chargeit" },
        "ai-saas-dashboard": { label: "AI-Powered Enterprise Dashboard", href: "/projects/ai-saas-dashboard" },
        "tulasi": { label: "Tulasi — Conversational Railway Agent", href: "/projects/tulasi" },
        "note-m": { label: "Note-M — Currency Reader", href: "/projects/note-m" },
        "teaching-strategies": { label: "Teaching Strategies", href: "/projects/teaching-strategies" },
        "pepper": { label: "Pepper — Interaction Exploration", href: "/projects/pepper" },
        "anjani-font": { label: "Anjani Font — Typography", href: "/projects/anjani-font" },
        "summer-internship": { label: "Summer Internship Reflection", href: "/projects/summer-internship" },
        "evaahan": { label: "e-Vaahan — Campus Ride Sharing", href: "/projects/evaahan" },
      };
      const project = projectMap[projectId];
      if (project) {
        return { label: project.label, href: project.href, type: "project" };
      }
    }
  }
  
  // Resume
  if (source.includes("resume")) {
    return { label: "Resume", href: "/resume", type: "other" };
  }
  
  // Blog/Thought Leadership
  if (source.includes("blog") || source.includes("substack")) {
    return { label: "Thought Leadership", href: "/blog", type: "article" };
  }
  
  // Default: return formatted version
  return {
    label: source.replace(/^app\//, "").replace(/\.tsx$/, "").replace(/\//g, " "),
    href: "#",
    type: "other"
  };
}

type KnowledgeEntry = {
  id: string;
  title: string;
  type: "bio" | "project" | "process" | "logistics";
  summary: string;
  detail: string;
  keywords: string[];
  sources: string[];
};

const stopWords = new Set([
  "the",
  "a",
  "an",
  "and",
  "or",
  "of",
  "to",
  "in",
  "for",
  "with",
  "about",
  "how",
  "what",
  "who",
  "is",
  "are",
  "on",
  "at",
  "by",
  "i",
  "me",
  "you",
  "my",
  "your",
]);

const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "bio-overview",
    title: "Sai Anjan — AI-Driven UX Designer",
    type: "bio",
    summary:
      "AI-focused product designer based in Hyderabad with 5+ years of experience across SaaS, enterprise dashboards, and conversational interfaces.",
    detail:
      "I'm an AI-led product designer crafting conversational and data-rich experiences for SaaS and enterprise teams. I focus on Copilot-style interactions, automation, and clear dashboards that make complex systems feel intuitive.",
    keywords: [
      "ai designer",
      "ai-driven",
      "saas",
      "enterprise",
      "hyderabad",
      "ux designer",
      "product designer",
      "copilot",
      "conversational",
    ],
    sources: ["app/page.tsx", "app/globals.css"],
  },
  {
    id: "ai-approach",
    title: "Approach to AI & Conversational Design",
    type: "process",
    summary:
      "Uses Copilot Studio, vibe coding, and conversational patterns to blend natural language interfaces with enterprise workflows.",
    detail:
      "My workflow pairs research-driven IA with conversational patterns: intent mapping, safe fallback responses, and AI-assisted prototyping using Copilot Studio and vibe coding. I design for transparency, guardrails, and measurable impact on task completion.",
    keywords: [
      "copilot",
      "conversational",
      "ai approach",
      "automation",
      "nlp",
      "vibe coding",
      "studio",
      "patterns",
    ],
    sources: ["app/page.tsx", "app/projects/ai-saas-dashboard/page.tsx"],
  },
  {
    id: "skills-tools",
    title: "Core Skills & Tools",
    type: "process",
    summary:
      "Research, IA, data visualization, prototyping, and testing; tools include Figma, Framer, Copilot Studio, and AI-assisted coding.",
    detail:
      "Strengths: user research, information architecture for complex dashboards, conversational flows, and data visualization. Tools: Figma, Framer, Copilot Studio, vibe coding, Maze/Hotjar for testing, and AI coding assistants to accelerate iterations.",
    keywords: [
      "skills",
      "tools",
      "figma",
      "framer",
      "research",
      "testing",
      "copilot studio",
      "ai coding",
      "data viz",
    ],
    sources: ["app/projects/ai-saas-dashboard/page.tsx", "app/page.tsx"],
  },
  {
    id: "thought-leadership",
    title: "Writing & Thought Leadership",
    type: "process",
    summary:
      "Writes on AI ethics in design, SaaS UX, conversational AI, and enterprise software—publishes on Substack.",
    detail:
      "I publish essays on AI ethics, SaaS UX challenges, conversational AI patterns, and the future of enterprise software. You can explore more on Substack.",
    keywords: ["writing", "blog", "thought leadership", "substack", "ethics"],
    sources: ["app/page.tsx", "app/blog/page.tsx"],
  },
  {
    id: "ai-saas-dashboard",
    title: "AI-Powered Enterprise Dashboard (2024)",
    type: "project",
    summary:
      "Conversational analytics dashboard for a Fortune 500 tech company; Copilot-style querying and proactive insights for 5,000+ employees.",
    detail:
      "Led design for an enterprise analytics platform with natural language querying, predictive insights, and intelligent automation. Reduced navigation friction and enabled non-technical teams to ask questions in plain English with Copilot-style responses.",
    keywords: [
      "ai saas",
      "copilot",
      "dashboard",
      "analytics",
      "enterprise",
      "natural language",
      "conversational",
    ],
    sources: ["app/projects/ai-saas-dashboard/page.tsx"],
  },
  {
    id: "chargeit",
    title: "Chargeit — Enterprise Payment Solution (2024)",
    type: "project",
    summary:
      "Payment platform for enterprise clients with security, workflow management, and modern UI.",
    detail:
      "Designed Chargeit to help enterprise teams handle payments with strong security, approvals, and clear workflows. Focused on reliability, auditability, and ease of adoption for large teams.",
    keywords: [
      "chargeit",
      "payment",
      "enterprise",
      "security",
      "workflow",
      "2024",
    ],
    sources: ["app/projects/chargeit/page.tsx"],
  },
  {
    id: "gpay-wallet",
    title: "Google Pay + Wallet",
    type: "project",
    summary:
      "Addressing trust and usability barriers for Google Wallet adoption in India, informed by personal spending insights.",
    detail:
      "Explored how to make Google Wallet resonate in India—simplified onboarding, mindful spending nudges, smart insights, and security cues to build trust for users accustomed to UPI flows.",
    keywords: [
      "gpay",
      "google pay",
      "wallet",
      "india",
      "upi",
      "trust",
      "spending",
    ],
    sources: ["app/projects/gpay/page.tsx"],
  },
  {
    id: "mindhouse",
    title: "Mindhouse — Live Class Filtering",
    type: "project",
    summary:
      "Improved class discovery and booking for a meditation app that runs ~70 classes per day.",
    detail:
      "Redesigned filtering for Mindhouse so users can find classes by course type, instructor preference, and time—reducing friction in a dense schedule of live sessions.",
    keywords: [
      "mindhouse",
      "live classes",
      "filtering",
      "booking",
      "meditation",
      "discovery",
    ],
    sources: ["app/projects/mindhouse/page.tsx"],
  },
  {
    id: "tulasi",
    title: "Tulasi — Conversational Railway Agent",
    type: "project",
    summary:
      "Conversational AI to simplify railway enquiries with natural language access to schedules and info.",
    detail:
      "Designed Tulasi, a conversational agent that replaces complex railway enquiry flows with simple natural language prompts, focusing on clarity and quick answers.",
    keywords: [
      "tulasi",
      "railway",
      "conversational agent",
      "ai",
      "chatbot",
    ],
    sources: ["app/projects/tulasi/page.tsx"],
  },
  {
    id: "e-vaahan",
    title: "e-Vaahan — Campus Ride Sharing",
    type: "project",
    summary:
      "Greener ride-sharing concept for IIT Bombay campus to reduce reliance on auto-rickshaws.",
    detail:
      "Created e-Vaahan to make intra-campus travel safer and cheaper with shared electric rides, addressing long walking times and limited vehicle access.",
    keywords: [
      "e-vaahan",
      "campus",
      "ride sharing",
      "mobility",
      "iit bombay",
      "transport",
    ],
    sources: ["app/projects/evaahan/page.tsx"],
  },
  {
    id: "note-m",
    title: "Note-M — Currency Reader",
    type: "project",
    summary:
      "Assistive currency reader for visually impaired users to identify notes confidently.",
    detail:
      "Designed a currency reader to help visually impaired users recognize denominations quickly with accessible interactions and feedback.",
    keywords: [
      "note-m",
      "currency reader",
      "visually impaired",
      "accessibility",
    ],
    sources: ["app/projects/note-m/page.tsx"],
  },
  {
    id: "teaching-strategies",
    title: "Teaching Strategies — Android Pickers",
    type: "project",
    summary:
      "Improved Android time/date picker experience for an education context.",
    detail:
      "Explored better time and date picker patterns on Android to make scheduling intuitive in a teaching and learning environment.",
    keywords: [
      "teaching strategies",
      "android",
      "time picker",
      "date picker",
      "scheduling",
    ],
    sources: ["app/projects/teaching-strategies/page.tsx"],
  },
  {
    id: "pepper",
    title: "Pepper — Interaction Exploration",
    type: "project",
    summary:
      "Interaction design exploration focused on engaging UI patterns.",
    detail:
      "Pepper investigates playful interaction patterns and how small UI details can create memorable product moments.",
    keywords: ["pepper", "interaction", "ui", "design exploration"],
    sources: ["app/projects/pepper/page.tsx"],
  },
  {
    id: "anjani-font",
    title: "Anjani Font — Typography",
    type: "project",
    summary:
      "Created a Telugu font inspired by a Kannada novel using a slant calligraphic pen.",
    detail:
      "Designed the Anjani font as part of an advanced typography module, experimenting with Telugu letterforms and calligraphic strokes.",
    keywords: ["anjani", "font", "typography", "telugu", "calligraphy"],
    sources: ["app/projects/anjani-font/page.tsx"],
  },
  {
    id: "summer-internship",
    title: "Summer Internship — 9 Week Reflection",
    type: "project",
    summary:
      "Takeaways from a nine-week internship, focusing on process, collaboration, and craft.",
    detail:
      "Documented learnings around design process, collaborating with engineers, and maturing craft during a nine-week internship.",
    keywords: [
      "internship",
      "summer",
      "learn",
      "reflection",
      "collaboration",
      "process",
    ],
    sources: ["app/projects/summer-internship/page.tsx"],
  },
];

const defaultSuggestions = [
  "What project best shows your AI + UX approach?",
  "How do you measure success on enterprise dashboards?",
  "Share a quick bio I can forward to a hiring manager.",
  "Can I get a link to your resume and portfolio shots?",
];

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token && !stopWords.has(token));
}

function scoreEntry(question: string, entry: KnowledgeEntry) {
  const normalized = question.toLowerCase();
  const tokens = tokenize(question);
  const keywordScore = entry.keywords.reduce((score, keyword) => {
    return score + (normalized.includes(keyword.toLowerCase()) ? 3 : 0);
  }, 0);

  const tokenScore = tokens.reduce((score, token) => {
    return score + (entry.summary.toLowerCase().includes(token) ? 1 : 0);
  }, 0);

  return keywordScore + tokenScore;
}

function buildSuggestions(entry?: KnowledgeEntry): string[] {
  if (!entry) return defaultSuggestions;

  if (entry.type === "project") {
    return [
      "How did you validate this concept with users?",
      "What metrics moved after the redesign?",
      "Show me another project that pairs well with this.",
    ];
  }

  if (entry.id === "bio-overview") {
    return [
      "What AI tools do you use day-to-day?",
      "Can you send your resume and availability?",
      "Which projects highlight conversational design?",
    ];
  }

  if (entry.type === "process") {
    return [
      "Give an example of this process in a project.",
      "How do you test and measure these decisions?",
      "What is your preferred stack for prototyping?",
    ];
  }

  return defaultSuggestions;
}

export function generatePortfolioAnswer(
  question: string
): PortfolioChatMessage {
  const trimmed = question.trim();
  const lower = trimmed.toLowerCase();

  if (!trimmed) {
    return {
      role: "assistant",
      content:
        "Ask me anything about my work, AI design approach, or a specific project. I can also share my resume or point you to photos.",
      suggestions: defaultSuggestions,
    };
  }

  if (/(resume|cv|pdf|download)/.test(lower)) {
    return {
      role: "assistant",
      content:
        "Here you go: my latest resume is available at `/resume.pdf`. You can also view it inside the site at `/resume`.",
      sources: ["public/resume.pdf", "app/resume/page.tsx"],
      suggestions: [
        "Summarize your background in three lines.",
        "Which projects should I check for AI work?",
        "Share contact details and location.",
      ],
    };
  }

  if (/(contact|email|reach|connect|availability|hire)/.test(lower)) {
    return {
      role: "assistant",
      content:
        "You can reach me at saianjan.margani@gmail.com. I'm based in Hyderabad and open to AI-driven SaaS and enterprise design roles.",
      sources: ["app/page.tsx"],
      suggestions: [
        "Send me a short blurb to forward to my team.",
        "What’s your availability for interviews?",
        "Show me one enterprise dashboard project.",
      ],
    };
  }

  if (/(photo|headshot|picture|library|portrait|image)/.test(lower)) {
    return {
      role: "assistant",
      content:
        "I've reserved `public/photo-library/` for portfolio shots. Drop your selected photos there (e.g., headshots, workshop photos). I can reference them in responses once added.",
      sources: ["public/photo-library/README.md"],
      suggestions: [
        "What photo themes would you pair with enterprise work?",
        "How many images should I add for the hero?",
        "Remind me where the photo folder lives.",
      ],
    };
  }

  if (/(ai|copilot|conversational|automation|nlp|llm)/.test(lower)) {
    const entry = knowledgeBase.find((item) => item.id === "ai-approach");
    return {
      role: "assistant",
      content:
        entry?.detail ||
        "I design AI-assisted, conversational experiences with a focus on clarity, guardrails, and measurable outcomes.",
      sources: entry?.sources,
      suggestions: buildSuggestions(entry),
    };
  }

  const scored = knowledgeBase
    .map((entry) => ({ entry, score: scoreEntry(trimmed, entry) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0) {
    const best = scored[0].entry;
    const secondary = scored[1]?.entry;
    const secondaryLine = secondary
      ? ` You might also like: ${secondary.title}.`
      : "";

    return {
      role: "assistant",
      content: `${best.detail}${secondaryLine}`,
      sources: best.sources,
      suggestions: buildSuggestions(best),
    };
  }

  return {
    role: "assistant",
    content:
      "I'm an AI-driven UX designer focused on conversational and data-heavy products. Ask about a project name (e.g., AI dashboard, Mindhouse, GPay wallet), my process, or request my resume.",
    suggestions: defaultSuggestions,
  };
}

// Get all existing knowledge sources
export function getAllKnowledgeSources() {
  const allSources = new Set<string>();
  
  knowledgeBase.forEach((entry) => {
    entry.sources.forEach((source) => allSources.add(source));
  });
  
  return Array.from(allSources).map((source) => {
    const ref = formatSource(source);
    const entry = knowledgeBase.find((e) => e.sources.includes(source));
    return {
      source,
      label: ref.label,
      href: ref.href,
      type: ref.type,
      category: entry?.type || "other",
      title: entry?.title || ref.label,
    };
  });
}

// Get all PDFs and books in the knowledge base
export function getPDFsAndBooks() {
  const pdfs: Array<{ name: string; path: string; type: "pdf" | "book" }> = [];
  const books: Array<{ name: string; author?: string; link?: string }> = [];
  
  // Resume PDF
  pdfs.push({
    name: "Resume",
    path: "/resume.pdf",
    type: "pdf"
  });
  
  // Master's Project Thesis PDF
  // TODO: Add your master's project PDF to public/ folder and update the path below
  // Example: If you add it as public/masters-thesis.pdf, change path to "/masters-thesis.pdf"
  // pdfs.push({
  //   name: "Master's Project Thesis — AI-Powered Enterprise Dashboard",
  //   path: "/masters-thesis.pdf",
  //   type: "pdf"
  // });
  
  // Book References
  // Add books you've read that inform your design work
  // Example:
  // books.push({
  //   name: "The Design of Everyday Things",
  //   author: "Don Norman",
  //   link: "https://..."
  // });
  
  return { pdfs, books };
}
