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
const API = "/api/resolutions";

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

function toClientItem(row: { id: string; text: string; notes: string; emoji: string }): ResolutionItem {
  return {
    id: row.id,
    text: row.text,
    notes: row.notes ?? "",
    emoji: row.emoji ?? "✨",
    expanded: false,
  };
}

function loadFromStorage(): ResolutionItem[] {
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

function saveToStorage(items: ResolutionItem[]) {
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
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "done" | "error">("idle");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [useApi, setUseApi] = useState(true);

  // Load: try API first so everyone sees the same list; fallback to localStorage if API fails
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid response");
        if (!cancelled) {
          const fromApi = data.map((row: { id: string; text: string; notes: string; emoji: string }) =>
            toClientItem(row)
          );
          if (fromApi.length > 0) {
            setItems(fromApi);
            setHasUnsavedChanges(false);
            setMounted(true);
            return;
          }
          const fromStorage = loadFromStorage();
          if (fromStorage.length > 0) {
            setItems(fromStorage);
            setHasUnsavedChanges(true);
            setMounted(true);
            for (const item of fromStorage) {
              await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  text: item.text,
                  notes: item.notes,
                  emoji: item.emoji,
                }),
              });
            }
            const refetch = await fetch(API);
            if (refetch.ok) {
              const refetched = await refetch.json();
              if (Array.isArray(refetched) && refetched.length > 0 && !cancelled) {
                setItems(refetched.map((row: { id: string; text: string; notes: string; emoji: string }) => toClientItem(row)));
              }
            }
            try {
              localStorage.removeItem(STORAGE_KEY);
            } catch {
              // ignore
            }
            return;
          }
          setItems([]);
        }
      } catch {
        const fromStorage = loadFromStorage();
        if (!cancelled) {
          setItems(fromStorage);
          setUseApi(false);
          setHasUnsavedChanges(fromStorage.length > 0);
        }
      }
      if (!cancelled) setMounted(true);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mounted || !useApi) return;
    saveToStorage(items);
  }, [mounted, useApi, items]);

  useEffect(() => {
    const onBeforeUnload = () => saveToStorage(items);
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [items]);

  const addItem = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const emoji = getEmojiForText(trimmed);
    const newItem: ResolutionItem = {
      id: crypto.randomUUID(),
      text: trimmed,
      notes: "",
      emoji,
      expanded: false,
    };

    if (useApi) {
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed, notes: "", emoji }),
        });
        if (res.ok) {
          const created = await res.json();
          setItems((prev) => [...prev, toClientItem(created)]);
          setInput("");
          return;
        }
      } catch {
        setUseApi(false);
      }
    }

    setItems((prev) => {
      const next = [...prev, newItem];
      saveToStorage(next);
      return next;
    });
    setInput("");
    setHasUnsavedChanges(true);
  }, [input, useApi]);

  const toggleExpand = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  }, []);

  const updateNotes = useCallback(
    async (id: string, notes: string) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, notes } : item))
      );

      if (useApi) {
        try {
          const res = await fetch(`${API}?id=${encodeURIComponent(id)}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes }),
          });
          if (res.ok) return;
        } catch {
          // fall through to local
        }
        setHasUnsavedChanges(true);
        setUseApi(false);
        setItems((prev) => {
          const next = prev.map((item) => (item.id === id ? { ...item, notes } : item));
          saveToStorage(next);
          return next;
        });
      } else {
        setHasUnsavedChanges(true);
        setItems((prev) => {
          const next = prev.map((item) => (item.id === id ? { ...item, notes } : item));
          saveToStorage(next);
          return next;
        });
      }
    },
    [useApi]
  );

  const removeItem = useCallback(
    async (id: string) => {
      if (useApi) {
        try {
          const res = await fetch(`${API}?id=${encodeURIComponent(id)}`, { method: "DELETE" });
          if (res.ok) {
            setItems((prev) => prev.filter((item) => item.id !== id));
            return;
          }
        } catch {
          setUseApi(false);
        }
      }
      setItems((prev) => {
        const next = prev.filter((item) => item.id !== id);
        saveToStorage(next);
        return next;
      });
    },
    [useApi]
  );

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

  const uploadLocalListToCloud = useCallback(async () => {
    if (items.length === 0) return;
    setSyncStatus("syncing");
    try {
      for (const item of items) {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: item.text,
            notes: item.notes,
            emoji: item.emoji,
          }),
        });
        if (!res.ok) throw new Error("Upload failed");
      }
      const refetch = await fetch(API);
      if (!refetch.ok) throw new Error("Refetch failed");
      const data = await refetch.json();
      if (Array.isArray(data)) {
        setItems(data.map((row: { id: string; text: string; notes: string; emoji: string }) => toClientItem(row)));
        setUseApi(true);
        setHasUnsavedChanges(false);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        setSyncStatus("done");
        setTimeout(() => setSyncStatus("idle"), 3000);
      } else {
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 3000);
      }
    } catch {
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 3000);
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

        <div className="flex flex-wrap items-center gap-3 mb-10">
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
            className="primary-button inline-flex items-center justify-center text-sm whitespace-nowrap px-5 py-3"
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

      {!useApi && hasUnsavedChanges && items.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 flex justify-end max-w-xl mx-auto w-full px-4 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 sm:max-w-none">
          <button
            type="button"
            onClick={uploadLocalListToCloud}
            disabled={syncStatus === "syncing"}
            className="primary-button shadow-lg inline-flex items-center justify-center text-sm font-medium min-w-[120px] py-3 px-5 rounded-full"
          >
            {syncStatus === "syncing"
              ? "Saving…"
              : syncStatus === "done"
                ? "Saved"
                : syncStatus === "error"
                  ? "Try again"
                  : "Save"}
          </button>
        </div>
      )}
    </main>
  );
}
