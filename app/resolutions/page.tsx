"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

type ResolutionItem = {
  id: string;
  text: string;
  notes: string;
  emoji: string;
  expanded: boolean;
};

const STORAGE_KEY = "resolutions-2026";

// Keyword → emoji (order matters: more specific first)
const EMOJI_MAP: [string[], string][] = [
  [["run", "running", "marathon", "5k"], "🏃"],
  [["gym", "workout", "exercise", "fitness", "lift", "strength"], "💪"],
  [["read", "books", "reading"], "📚"],
  [["travel", "trip", "vacation", "explore"], "✈️"],
  [["save", "money", "budget", "invest"], "💰"],
  [["meditate", "meditation", "mindful", "yoga"], "🧘"],
  [["sleep", "rest", "wake"], "😴"],
  [["code", "program", "build", "ship", "developer"], "💻"],
  [["write", "blog", "journal"], "✍️"],
  [["family", "kids", "parent"], "👨‍👩‍👧"],
  [["relationship", "love", "partner"], "❤️"],
  [["career", "job", "promotion", "work"], "💼"],
  [["language", "learn french", "spanish", "japanese"], "🗣️"],
  [["music", "guitar", "piano", "instrument"], "🎵"],
  [["cook", "cooking", "recipe", "food"], "🍳"],
  [["art", "draw", "paint", "design"], "🎨"],
  [["green", "recycle", "environment", "sustainable"], "🌱"],
  [["learn", "study", "course"], "📖"],
  [["habit", "routine", "daily"], "📌"],
];

function getEmojiForText(text: string): string {
  const lower = text.toLowerCase();
  for (const [keywords, emoji] of EMOJI_MAP) {
    if (keywords.some((k) => lower.includes(k))) return emoji;
  }
  return "✨";
}

function loadItems(): ResolutionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((item: ResolutionItem & { emoji?: string }) => ({
          ...item,
          emoji: item.emoji ?? getEmojiForText(item.text),
          expanded: false,
        }))
      : [];
  } catch {
    return [];
  }
}

function saveItems(items: ResolutionItem[]) {
  if (typeof window === "undefined") return;
  try {
    const toSave = items.map(({ id, text, notes, emoji }) => ({
      id,
      text,
      notes,
      emoji,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn("Could not save resolutions to localStorage", e);
  }
}

function formatForNotes(items: ResolutionItem[]): string {
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const lines = [
    "2026 Resolutions",
    `Updated: ${date}`,
    "",
    ...items.map((item) => {
      const note = item.notes.trim();
      return `${item.emoji} ${item.text}${note ? `\n   ${note.replace(/\n/g, "\n   ")}` : ""}`;
    }),
  ];
  return lines.join("\n");
}

export default function ResolutionsPage() {
  const [items, setItems] = useState<ResolutionItem[]>([]);
  const [input, setInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  // Load from localStorage once on mount (client-only)
  useEffect(() => {
    setItems(loadItems());
    setMounted(true);
  }, []);

  // Persist to localStorage whenever items change (only after mount so we don't overwrite with [])
  useEffect(() => {
    if (!mounted) return;
    saveItems(items);
  }, [mounted, items]);

  // Also save when leaving the page (e.g. close tab, navigate away)
  useEffect(() => {
    const onBeforeUnload = () => saveItems(items);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [items]);

  const addItem = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setItems((prev) => {
      const next = [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: trimmed,
          notes: "",
          emoji: getEmojiForText(trimmed),
          expanded: false,
        },
      ];
      saveItems(next);
      return next;
    });
    setInput("");
  }, [input]);

  const toggleExpand = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  }, []);

  const updateNotes = useCallback((id: string, notes: string) => {
    setItems((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, notes } : item
      );
      saveItems(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      saveItems(next);
      return next;
    });
  }, []);

  const copyForICloudNotes = useCallback(async () => {
    const text = formatForNotes(items);
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  }, [items]);

  return (
    <main className="min-h-screen bg-[var(--color-linen)]">
      <div className="max-w-xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-basil)] hover:text-[var(--color-coral)] transition-colors mb-10"
        >
          <span>←</span>
          <span>Back</span>
        </Link>

        <h1 className="text-2xl font-light text-[var(--color-charcoal)] mb-2 tracking-tight">
          2026 Resolutions
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Add a resolution and expand to add notes.
        </p>

        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={copyForICloudNotes}
            disabled={items.length === 0}
            className="text-sm text-[var(--color-basil)] hover:text-[var(--color-coral)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
          >
            <span className="shrink-0">📋</span>
            <span>
              {copyStatus === "copied"
                ? "Copied! Paste into Notes (⌘V)"
                : copyStatus === "error"
                  ? "Copy failed"
                  : "Copy for iCloud Notes"}
            </span>
          </button>
        </div>

        <div className="flex gap-2 mb-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            placeholder="Add a resolution..."
            className="flex-1 px-4 py-3 rounded-lg border border-[rgba(15,91,70,0.2)] bg-[var(--color-ivory)] text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-basil)] focus:border-transparent text-sm"
          />
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-3 rounded-lg bg-[var(--color-basil)] text-white text-sm font-medium hover:bg-[var(--color-coral)] transition-colors whitespace-nowrap"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-[rgba(15,91,70,0.12)] bg-[var(--color-ivory)] overflow-hidden transition-colors"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  className="flex-1 flex items-center gap-3 px-4 py-3 text-left min-w-0 hover:bg-black/[0.03] transition-colors"
                >
                  <span
                    className="text-[var(--color-charcoal)] shrink-0 transition-transform"
                    aria-hidden
                  >
                    {item.expanded ? "−" : "+"}
                  </span>
                  <span className="shrink-0 text-base leading-none" aria-hidden>
                    {item.emoji}
                  </span>
                  <span className="text-[var(--color-charcoal)] text-sm truncate">
                    {item.text}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="shrink-0 px-3 py-3 text-gray-400 hover:text-[var(--color-coral)] transition-colors text-sm"
                  aria-label="Remove"
                >
                  ×
                </button>
              </div>
              {item.expanded && (
                <div className="px-4 pb-4 pt-0 border-t border-[rgba(15,91,70,0.08)]">
                  <textarea
                    value={item.notes}
                    onChange={(e) => updateNotes(item.id, e.target.value)}
                    placeholder="Notes..."
                    rows={3}
                    className="w-full mt-3 px-3 py-2 rounded-md border border-[rgba(15,91,70,0.15)] bg-white/80 text-[var(--color-charcoal)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-basil)] focus:border-transparent text-sm resize-y min-h-[80px]"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>

        {items.length === 0 && mounted && (
          <p className="text-sm text-gray-400 text-center py-8">
            No resolutions yet. Add one above.
          </p>
        )}
      </div>
    </main>
  );
}
