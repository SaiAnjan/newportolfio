import Link from "next/link";
import { Clock3, Link2 } from "lucide-react";
import type { ReactNode } from "react";

interface CaseStudyShellProps {
  title: string;
  subtitle: string;
  meta?: string;
  readTime?: string;
  shareUrl?: string;
  children: ReactNode;
}

export function CaseStudyShell({
  title,
  subtitle,
  meta,
  readTime = "3 minutes",
  shareUrl,
  children,
}: CaseStudyShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="space-y-8 pb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            ← Back to Projects
          </Link>

          <div className="space-y-4 text-center">
            {meta ? <p className="text-sm text-foreground/60">{meta}</p> : null}
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-foreground/80">{subtitle}</p>
          </div>

          <div className="flex items-center justify-between border-y border-border/60 py-3 text-sm text-foreground/65">
            <p className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Read time: {readTime}
            </p>
            <a
              href={shareUrl ?? "#"}
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
            >
              <Link2 className="h-4 w-4" />
              Share
            </a>
          </div>
        </header>

        <article className="space-y-0 [&>section]:border-t [&>section]:border-border/60 [&>section]:py-6 [&>section:first-child]:border-t-0 [&>section:first-child]:pt-0">
          {children}
        </article>
      </div>
    </main>
  );
}
