"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  SendHorizontal,
  Sparkles,
  User,
  ChevronRight,
} from "lucide-react";
import {
  generatePortfolioAnswer,
  PortfolioChatMessage,
  formatSource,
} from "@/lib/portfolio-gpt";

const starterMessage: PortfolioChatMessage = {
  role: "assistant",
  content:
    "Welcome to GPT Mode—ask me anything about my work, AI design process, resume, or a specific project. I'll answer using only what lives in this portfolio.",
  suggestions: [
    "Show me your AI dashboard work.",
    "Summarize your background in 3 lines.",
    "How do you approach conversational design?",
    "Where can I grab your resume?",
  ],
};

const quickPrompts = [
  "Show me your AI dashboard work.",
  "Tell me about the Google Pay + Wallet case study.",
  "How do you design conversational interfaces?",
  "Share your contact info and location.",
  "Where can I drop photos for the site?",
  "Pick two projects that prove AI + UX depth.",
];

function TypingText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}

function MessageBubble({ 
  message, 
  isTyping = false
}: { 
  message: PortfolioChatMessage;
  isTyping?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-4 w-full max-w-4xl mx-auto ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/images/me.jpg"
              alt="Sai Anjan"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 min-w-0 ${isUser ? "text-right" : ""}`}>
        <p
          className={`whitespace-pre-wrap ${
            isUser
              ? "text-[rgba(23,26,26,0.4)] text-base"
              : "text-[var(--color-basil)]"
          }`}
          style={{
            fontFamily: isUser 
              ? "var(--font-archivo-narrow), 'Archivo Narrow', sans-serif"
              : "var(--font-bagnard), 'Bagnard', serif",
            fontSize: isUser ? "16px" : "32px",
            lineHeight: isUser ? "1.5" : "40px",
            letterSpacing: isUser ? "0" : "0%"
          }}
        >
          {isTyping && !isUser ? (
            <TypingText text={message.content} />
          ) : (
            message.content
          )}
        </p>

        {/* Sources/References */}
        {message.sources && message.sources.length > 0 && !isUser && (
          <div className={`mt-3 flex flex-wrap gap-2 ${isUser ? "justify-end" : ""}`}>
            {message.sources.map((source) => {
              const ref = formatSource(source);
              return (
                <Link
                  key={source}
                  href={ref.href}
                  className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-[rgba(15,91,70,0.15)] text-[var(--color-basil)] hover:bg-[rgba(15,91,70,0.25)] transition-colors"
                >
                  {ref.label.toUpperCase()}
                  <ChevronRight className="w-3 h-3" />
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default function GPTModePage() {
  const [messages, setMessages] = useState<PortfolioChatMessage[]>([
    starterMessage,
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = (prompt?: string) => {
    const question = (prompt ?? input).trim();
    if (!question) return;

    const userMessage: PortfolioChatMessage = { role: "user", content: question };
    const answer = generatePortfolioAnswer(question);

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Add assistant message with typing effect
    setTimeout(() => {
      const newMessageIndex = messages.length + 1; // Index after user message
      setMessages((prev) => [...prev, answer]);
      setIsThinking(false);
      setTypingMessageIndex(newMessageIndex);
      
      // Stop typing effect after message is fully displayed
      const typingDuration = answer.content.length * 30; // 30ms per character
      setTimeout(() => {
        setTypingMessageIndex(null);
      }, typingDuration);
    }, 300);
  };

  const footerHints = useMemo(
    () => [
      "No APIs used—answers are generated from on-site content only.",
      "Drop headshots or project photos into public/photo-library/ to reference them here.",
      "Looking for a quick shareable blurb? Ask me for a 3-line intro.",
    ],
    []
  );

  return (
    <main className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFE9A8, #FAFAFA)' }}>
      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="border-b border-[rgba(15,91,70,0.12)] bg-white px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-basil)] hover:text-[var(--color-coral)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <h1 className="text-sm font-medium text-[var(--color-charcoal)]">
              GPT Mode
            </h1>
            <Link
              href="/admin/gpt-knowledge"
              className="text-xs text-[var(--color-basil)] hover:text-[var(--color-coral)] transition-colors"
            >
              Manage Knowledge
            </Link>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {messages.map((message, index) => (
                <MessageBubble 
                  key={`${message.role}-${index}`} 
                  message={message}
                  isTyping={typingMessageIndex === index}
                />
              ))}

              {isThinking && (
                <div className="flex gap-4 w-full max-w-4xl mx-auto">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src="/images/me.jpg"
                      alt="Sai Anjan"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[var(--color-basil)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-[var(--color-basil)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-[var(--color-basil)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggestion Clouds - Only for latest assistant message */}
          {(() => {
            const latestAssistantMessage = [...messages].reverse().find(m => m.role === "assistant" && m.suggestions && m.suggestions.length > 0);
            return latestAssistantMessage && latestAssistantMessage.suggestions ? (
              <div className="px-4 pb-3">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-wrap gap-2.5 justify-center">
                    {latestAssistantMessage.suggestions.slice(0, 3).map((suggestion, idx) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSend(suggestion)}
                        className="cloud-bubble text-xs px-4 py-2.5 rounded-full border border-[rgba(15,91,70,0.2)] text-[var(--color-basil)] hover:border-[var(--color-basil)] hover:scale-105 transition-all duration-300"
                        style={{
                          animationDelay: `${idx * 80}ms`,
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null;
          })()}

          {/* Input Area */}
          <div className="px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                  inputRef.current?.focus();
                }}
                className="relative"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type to ask me questions related to my projects or experience...."
                  className="w-full text-sm bg-white border border-[rgba(15,91,70,0.1)] rounded-2xl px-5 py-5 pr-16 focus:outline-none focus:shadow-md focus:shadow-[rgba(15,91,70,0.08)] focus:border-[rgba(15,91,70,0.15)] transition-shadow"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-[var(--color-coral)] text-white p-2.5 hover:shadow-lg hover:shadow-[var(--color-coral)]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </form>
              <p className="text-xs text-[rgba(23,26,26,0.5)] mt-2 text-center">
                Check my{" "}
                <Link href="/#projects" className="text-[var(--color-basil)] hover:text-[var(--color-coral)] underline">
                  portfolio
                </Link>{" "}
                for deeper insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
