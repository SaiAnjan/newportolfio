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
];

export const latestPrinciples = journalDays.at(-1)?.principles ?? [];

export function getQuoteScale(quote: string) {
  const wordCount = quote.trim().split(/\s+/).length;
  const lengthAdjustment = (22 - wordCount) * 0.012;

  return Math.min(1.04, Math.max(0.88, 1 + lengthAdjustment));
}
