export type PrincipleTone = "quiet" | "urgent" | "contrast" | "question" | "resolve";

export type Principle = {
  id: string;
  category: string;
  quote: string;
  phrases: {
    text: string;
    tone?: PrincipleTone;
  }[];
};

export type JournalDay = {
  date: string;
  principles: Principle[];
};

export const journalDays: JournalDay[] = [
  {
    date: "2026-06-18",
    principles: [
      {
        id: "cobra-effect",
        category: "Systems & incentives",
        quote:
          "AI fuels the cobra effect more than we think. Managers who confuse persuasion with leadership will compound this problem across the industry.",
        phrases: [
          { text: "AI fuels the " },
          { text: "cobra effect", tone: "urgent" },
          { text: " more than we think.", tone: "quiet" },
          { text: " Managers who confuse " },
          { text: "persuasion", tone: "contrast" },
          { text: " with " },
          { text: "leadership", tone: "resolve" },
          { text: " will compound this problem across the industry.", tone: "quiet" },
        ],
      },
      {
        id: "best-solution",
        category: "Problem framing",
        quote:
          "The question shouldn’t be, “Did we use the best and most powerful AI model?” It should be, “Did we use the best possible solution for the problem?”",
        phrases: [
          { text: "The question shouldn’t be, ", tone: "quiet" },
          { text: "“Did we use the " },
          { text: "best and most powerful AI model?", tone: "question" },
          { text: "” It should be, " },
          { text: "“Did we use the " },
          { text: "best possible solution", tone: "resolve" },
          { text: " for the problem?”", tone: "contrast" },
        ],
      },
    ],
  },
  {
    date: "2026-06-22",
    principles: [
      {
        id: "ux-inductive-reasoning",
        category: "Training data & perception",
        quote:
          "AI’s understanding of UX is largely inductive, shaped by the mass of graphical interfaces and UI media available online.",
        phrases: [
          { text: "AI’s understanding of UX", tone: "urgent" },
          { text: " is largely inductive,", tone: "quiet" },
          { text: " shaped by the mass of graphical interfaces and UI media available online.", tone: "quiet" },
        ],
      },
      {
        id: "ux-production-vs-innovation",
        category: "Practice & leadership",
        quote:
          "When UI and screen design are mistaken for UX, managers who learn through AI may reduce UX to production work instead of treating it as innovation work.",
        phrases: [
          { text: " When UI and screen design are mistaken for UX,", tone: "contrast" },
          { text: " managers who learn through AI " },
          { text: "may reduce UX to production work", tone: "urgent" },
          { text: " instead of treating it as " },
          { text: "innovation work.", tone: "resolve" },
        ],
      },
    ],
  },
  {
    date: "2026-06-24",
    principles: [
      {
        id: "ai-scales-bad-ux",
        category: "Quality debt",
        quote:
          "AI doesn’t just fuel bad UX; it scales it. The debt piles up until the next wave of UX designers and design engineers has to clean up the mess.",
        phrases: [
          { text: "AI doesn’t just fuel bad UX", tone: "urgent" },
          { text: "; it scales it.", tone: "contrast" },
          { text: " The debt piles up", tone: "urgent" },
          { text: " until the next wave of " },
          { text: "UX designers and design engineers", tone: "resolve" },
          { text: " has to clean up the mess.", tone: "quiet" },
        ],
      },
    ],
  },
];

export const previewPrinciples = [...journalDays]
  .reverse()
  .flatMap((day) => day.principles);

export function getQuoteScale(quote: string) {
  const wordCount = quote.trim().split(/\s+/).length;
  const lengthAdjustment = (22 - wordCount) * 0.012;

  return Math.min(1.04, Math.max(0.88, 1 + lengthAdjustment));
}

export function getPreviewQuoteSize(quote: string) {
  const wordCount = quote.trim().split(/\s+/).length;
  const lengthAdjustment = Math.max(0, wordCount - 22) * 0.015;

  return Math.min(1.18, Math.max(0.82, 1.18 - lengthAdjustment));
}
