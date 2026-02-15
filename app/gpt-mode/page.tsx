"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUp, BriefcaseBusiness, ChevronDown, Mic, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { generatePortfolioAnswer, PortfolioChatMessage } from "@/lib/portfolio-gpt";

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionEventLike = {
  results?: ArrayLike<ArrayLike<{ transcript?: string }>>;
};

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
  const [messages, setMessages] = useState<PortfolioChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognitionCtor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setIsSpeechSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (!transcript) return;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsSpeechSupported(true);

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const sendQuestion = (question: string) => {
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

  const handleSend = () => {
    const question = input.trim();
    sendQuestion(question);
  };

  const handlePromptPick = (value: string) => {
    if (!value) return;
    setInput(value);
  };

  const handleMicToggle = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      return;
    }

    setIsListening(true);
    recognitionRef.current.start();
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 sm:mt-10 sm:mb-6">
        <section className="flex min-h-dvh min-w-0 flex-col sm:min-h-[calc(100vh-5rem)]">
          <header className="border-b">
            <div className="flex h-14 items-center justify-between px-1 sm:px-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
              <Badge variant="outline">GPT-Style Chat</Badge>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            <div className="flex w-full flex-col gap-4 px-1 py-6 sm:px-2">
              {messages.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 h-16 w-16 overflow-hidden rounded-full border border-border/70">
                    <Image src="/images/me.jpg" alt="Anjan avatar" width={64} height={64} className="h-full w-full object-cover" />
                  </div>
                  <h2 className="text-2xl font-semibold tracking-tight">Hi, I&apos;m Anjan</h2>
                  <p className="mt-2 max-w-xl text-sm text-foreground/70">
                    Ask anything about my projects, process, and experience. Pick a sample prompt to get started.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {starterMessage.suggestions?.slice(0, 4).map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => sendQuestion(prompt)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-zinc-600 bg-white px-3 py-1.5 text-xs text-zinc-900 transition-colors hover:bg-zinc-100"
                      >
                        <Sparkles className="h-3 w-3" />
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <MessageBubble key={`${message.role}-${index}`} message={message} />
                  ))}
                  {isThinking && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Sparkles className="h-4 w-4 animate-pulse" />
                      Thinking...
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 mt-auto border-t bg-background/95 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] backdrop-blur md:py-4">
            <div className="space-y-3 px-1 sm:px-2">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend();
                }}
                className="rounded-3xl border border-border/70 bg-muted/30 p-3 shadow-sm backdrop-blur"
              >
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask me what to design next, what to ship first, or how I think through UX tradeoffs..."
                  className="min-h-12 w-full resize-none border-0 bg-transparent px-1 py-1 text-[15px] leading-relaxed text-foreground outline-none placeholder:text-foreground/40"
                  rows={2}
                />
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-foreground/65">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-md px-2 py-1 hover:bg-background/80"
                        >
                          Sample prompts
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-72">
                        <DropdownMenuItem onClick={() => handlePromptPick("Summarize your background in 3 lines.")}>
                          Summarize your background in 3 lines
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePromptPick("Tell me about Google Pay + Wallet.")}>
                          Tell me about Google Pay + Wallet
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePromptPick("Which projects show strong AI + UX depth?")}>
                          Which projects show strong AI + UX depth?
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePromptPick("Share your contact information.")}>
                          Share your contact information
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/#work" className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-blue-600 hover:bg-background/80">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      Works
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleMicToggle}
                      disabled={!isSpeechSupported}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground/60 hover:bg-background/80 disabled:opacity-40"
                      aria-label="Voice input"
                      title={isSpeechSupported ? (isListening ? "Stop listening" : "Start speech-to-text") : "Speech-to-text not supported in this browser"}
                    >
                      <Mic className={`h-4 w-4 ${isListening ? "text-blue-600" : ""}`} />
                    </button>
                    <Button
                      type="submit"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      disabled={!input.trim() || isThinking}
                      aria-label="Send message"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognitionLike;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognitionLike;
    };
  }
}
