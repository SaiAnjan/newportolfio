import Link from "next/link";
import type { ReactNode } from "react";

interface CaseStudyShellProps {
  title: string;
  subtitle: string;
  meta?: string;
  children: ReactNode;
}

export function CaseStudyShell({ title, subtitle, meta, children }: CaseStudyShellProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="space-y-6 pb-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            ← Back to Projects
          </Link>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
            <p className="text-[15px] leading-relaxed text-foreground/80">{subtitle}</p>
            {meta ? <p className="text-xs uppercase tracking-wide text-foreground/60">{meta}</p> : null}
          </div>
        </header>

        <article className="space-y-10">
          {children}
        </article>
      </div>
    </main>
  );
}
