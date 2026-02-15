"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, SendHorizontal, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generatePortfolioAnswer, PortfolioChatMessage } from "@/lib/portfolio-gpt";

const starterMessage: PortfolioChatMessage = {
  role: "assistant",
  content:
    "Hi! I am your portfolio assistant. Ask about projects, case studies, process, or resume details.",
  suggestions: [
    "Show me your AI dashboard work.",
    "Summarize your background in 3 lines.",
    "How do you approach conversational design?",
    "Where can I grab your resume?",
  ],
};

const quickPrompts = [
  "Summarize your background in 3 lines",
  "Tell me about Google Pay + Wallet",
  "Which projects show strong AI + UX depth?",
  "Share your contact information",
];

function LinkifiedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);

  return (
    <p className="whitespace-pre-wrap">
      {parts.map((part, index) =>
        /^https?:\/\/[^\s]+$/.test(part) ? (
          <a
            key={`${part}-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {part}
          </a>
        ) : (
          <span key={`${part}-${index}`}>{part}</span>
        ),
      )}
    </p>
  );
}

function MessageBubble({ message }: { message: PortfolioChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-2xl rounded-2xl bg-muted px-4 py-3 text-sm leading-relaxed text-foreground">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      ) : (
        <div className="max-w-2xl text-sm leading-relaxed text-foreground">
          <LinkifiedText text={message.content} />
        </div>
      )}
    </div>
  );
}

export default function GPTModePage() {
  const [messages, setMessages] = useState<PortfolioChatMessage[]>([starterMessage]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (prompt?: string) => {
    const question = (prompt ?? input).trim();
    if (!question) return;

    const userMessage: PortfolioChatMessage = { role: "user", content: question };
    const answer = generatePortfolioAnswer(question);

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, answer]);
      setIsThinking(false);
    }, 180);
  };

  return (
    <main className="h-screen bg-background text-foreground">
      <section className="flex h-full min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b px-3 md:px-5">
          <Button asChild variant="ghost" size="sm">
            <Link href="/" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </Button>
          <Badge variant="outline">GPT-Style Chat</Badge>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6">
            {messages.map((message, index) => (
              <MessageBubble key={`${message.role}-${index}`} message={message} />
            ))}
            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Thinking...
              </div>
            )}
          </div>
        </div>

        <div className="border-t bg-background px-3 py-3 md:px-5 md:py-4">
          <div className="mx-auto w-full max-w-3xl space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <Button key={prompt} type="button" size="sm" variant="outline" onClick={() => handleSend(prompt)}>
                  {prompt}
                </Button>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Message GPT Mode"
                className="h-11"
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isThinking} aria-label="Send message">
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
