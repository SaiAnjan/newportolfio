"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ResolutionItem = {
  id: string;
  text: string;
  notes: string;
  emoji: string;
  expanded: boolean;
};

const STORAGE_KEY = "resolutions-2026";
const API = "/api/resolutions";

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
    if (keywords.some((keyword) => lower.includes(keyword))) return emoji;
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
    const toSave = items.map(({ id, text, notes, emoji }) => ({ id, text, notes, emoji }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.warn("Could not save resolutions to localStorage", error);
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
  const [syncErrorMessage, setSyncErrorMessage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [useApi, setUseApi] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid response");

        if (!cancelled) {
          const fromApi = data.map((row: { id: string; text: string; notes: string; emoji: string }) => toClientItem(row));
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
                body: JSON.stringify({ text: item.text, notes: item.notes, emoji: item.emoji }),
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
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)));
  }, []);

  const updateNotes = useCallback(
    async (id: string, notes: string) => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, notes } : item)));

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
    [useApi],
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
    [useApi],
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
    setSyncErrorMessage(null);

    try {
      for (const item of items) {
        const res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: item.text, notes: item.notes, emoji: item.emoji }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          const message = typeof errBody?.error === "string" ? errBody.error : "Upload failed";
          const isTableMissing =
            message.includes("does not exist") || message.includes("relation") || errBody?.code === "42P01";
          setSyncErrorMessage(
            isTableMissing
              ? "Database table missing. Run supabase/migrations/create_resolutions_2026_table.sql, then try again."
              : message,
          );
          setSyncStatus("error");
          setTimeout(() => setSyncStatus("idle"), 5000);
          return;
        }
      }

      const refetch = await fetch(API);
      if (!refetch.ok) {
        const errBody = await refetch.json().catch(() => ({}));
        setSyncErrorMessage(typeof errBody?.error === "string" ? errBody.error : "Could not load saved list.");
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 5000);
        return;
      }

      const data = await refetch.json();
      if (Array.isArray(data)) {
        setItems(data.map((row: { id: string; text: string; notes: string; emoji: string }) => toClientItem(row)));
        setUseApi(true);
        setHasUnsavedChanges(false);
        setSyncErrorMessage(null);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        setSyncStatus("done");
        setTimeout(() => setSyncStatus("idle"), 3000);
      } else {
        setSyncErrorMessage("Invalid response from server.");
        setSyncStatus("error");
        setTimeout(() => setSyncStatus("idle"), 5000);
      }
    } catch (error) {
      setSyncErrorMessage(error instanceof Error ? error.message : "Network or server error. Check connection and try again.");
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 5000);
    }
  }, [items]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <div className="mx-auto w-full max-w-2xl px-4 py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">← Back</Link>
          </Button>
          <Badge variant="outline">2026</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>2026 Resolutions</CardTitle>
            <p className="text-sm text-muted-foreground">Add a resolution and expand each item for notes.</p>
            <div>
              <Button
                type="button"
                onClick={copyForICloudNotes}
                disabled={items.length === 0}
                variant="outline"
                size="sm"
              >
                {copyStatus === "copied"
                  ? "Copied! Paste into Notes"
                  : copyStatus === "error"
                    ? "Copy failed"
                    : "Copy for iCloud Notes"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && addItem()}
                placeholder="Add a resolution..."
              />
              <Button type="button" onClick={addItem}>
                Add
              </Button>
            </div>

            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} className="rounded-lg border bg-card">
                  <div className="flex items-center gap-2 px-3 py-2">
                    <Button
                      type="button"
                      onClick={() => toggleExpand(item.id)}
                      variant="ghost"
                      className="h-auto flex-1 justify-start gap-3 p-1 text-left"
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className="truncate">{item.text}</span>
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(item.id)}>
                      ×
                    </Button>
                  </div>

                  {item.expanded && (
                    <div className="border-t px-3 pb-3 pt-2">
                      <Textarea
                        value={item.notes}
                        onChange={(event) => updateNotes(item.id, event.target.value)}
                        placeholder="Notes..."
                        rows={3}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {items.length === 0 && mounted && (
              <p className="py-6 text-center text-sm text-muted-foreground">No resolutions yet. Add one above.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {!useApi && hasUnsavedChanges && items.length > 0 && (
        <div className="fixed bottom-5 right-5 z-50 flex max-w-sm flex-col items-end gap-2">
          {syncStatus === "error" && syncErrorMessage && (
            <Card className="border-destructive/30 bg-background/95">
              <CardContent className="p-3 text-xs text-destructive">{syncErrorMessage}</CardContent>
            </Card>
          )}
          <Button type="button" onClick={uploadLocalListToCloud} disabled={syncStatus === "syncing"}>
            {syncStatus === "syncing"
              ? "Saving..."
              : syncStatus === "done"
                ? "Saved"
                : syncStatus === "error"
                  ? "Try again"
                  : "Save"}
          </Button>
        </div>
      )}
    </main>
  );
}
