import Link from "next/link";
import { ChevronDown, Clock3 } from "lucide-react";
import type { ReactNode } from "react";

import PreviewImage from "@/components/preview-image";
import ButtonGroupTooltipDemo from "@/components/shadcn-studio/button-group/button-group-03";
import { cn } from "@/lib/utils";

export type CaseStudyFact = {
  label: string;
  value: string;
};

export type CaseStudyNavItem = {
  href: string;
  label: string;
};

interface FlagshipCaseStudyProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  summary: string;
  facts: CaseStudyFact[];
  navigation: CaseStudyNavItem[];
  readTime?: string;
  shareUrl: string;
  hero?: ReactNode;
  children: ReactNode;
}

export function FlagshipCaseStudy({
  eyebrow,
  title,
  subtitle,
  summary,
  facts,
  navigation,
  readTime = "8 minutes",
  shareUrl,
  hero,
  children,
}: FlagshipCaseStudyProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="space-y-8 pb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center text-sm text-foreground/65 transition-colors hover:text-foreground"
          >
            ← Back to Projects
          </Link>

          <div className="space-y-4 text-center">
            {eyebrow ? (
              <p className="text-xs font-medium tracking-[0.16em] text-foreground/55 uppercase">{eyebrow}</p>
            ) : null}
            <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
            <p className="mx-auto max-w-2xl text-[15px] leading-relaxed text-pretty text-foreground/75 sm:text-base">
              {subtitle}
            </p>
          </div>

          {hero}

          <p className="border-l-2 border-foreground/20 pl-4 text-base leading-relaxed text-pretty text-foreground/85 sm:text-[17px]">
            {summary}
          </p>

          <dl className="grid grid-cols-2 gap-x-5 gap-y-5 rounded-lg bg-card p-4 sm:grid-cols-3 sm:p-5">
            {facts.map((fact) => (
              <div key={`${fact.label}-${fact.value}`} className="space-y-1">
                <dt className="text-[11px] font-medium tracking-[0.12em] text-foreground/50 uppercase">
                  {fact.label}
                </dt>
                <dd className="text-sm leading-snug text-foreground/85">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Case study sections" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-foreground/60 hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-between border-b border-border/60 py-3 text-sm text-foreground/65">
            <p className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              Read time: {readTime}
            </p>
            <ButtonGroupTooltipDemo shareUrl={shareUrl} shareTitle={title} />
          </div>
        </header>

        <article>{children}</article>
      </div>
    </main>
  );
}

interface CaseStudySectionProps {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function CaseStudySection({ id, eyebrow, title, children, className }: CaseStudySectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 border-t border-border/60 py-10 sm:py-14", className)}>
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-xs font-medium tracking-[0.14em] text-foreground/50 uppercase">{eyebrow}</p>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-balance sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-6 space-y-5 text-[15px] leading-7 text-foreground/78">{children}</div>
    </section>
  );
}

interface CaseStudyFigureProps {
  src: string;
  alt: string;
  caption: string;
  aspect?: string;
  fit?: "contain" | "cover";
  wide?: boolean;
  imageClassName?: string;
  priority?: boolean;
}

export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect = "aspect-video",
  fit = "contain",
  wide = false,
  imageClassName,
  priority = false,
}: CaseStudyFigureProps) {
  return (
    <figure className={cn("space-y-3 py-2", wide && "lg:-mx-24 lg:w-[calc(100%+12rem)]")}>
      <div className={cn("relative overflow-hidden rounded-xl bg-white", aspect)}>
        <PreviewImage
          src={src}
          alt={alt}
          fill
          sizes={wide ? "(max-width: 1024px) 100vw, 960px" : "(max-width: 768px) 100vw, 736px"}
          className={cn(fit === "cover" ? "object-cover" : "object-contain", imageClassName)}
          priority={priority}
        />
      </div>
      <figcaption className="text-xs leading-relaxed text-foreground/55">{caption}</figcaption>
    </figure>
  );
}

export function CaseStudyQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <blockquote className="rounded-lg bg-card px-5 py-4 text-base leading-relaxed text-foreground/85">
      <p>“{children}”</p>
      {attribution ? <footer className="mt-2 text-xs text-foreground/50">{attribution}</footer> : null}
    </blockquote>
  );
}

export function CaseStudyDeepDive({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group rounded-lg bg-card open:pb-1">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-sm font-medium marker:content-none">
        {title}
        <ChevronDown className="h-4 w-4 shrink-0 text-foreground/55 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-border/60 px-4 py-4 text-sm leading-6 text-foreground/72">{children}</div>
    </details>
  );
}
