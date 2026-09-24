"use client";

import { useEffect, useState } from "react";

type TrackerItem = {
  href: string;
  label: string;
};

interface CaseStudyTrackerProps {
  items: TrackerItem[];
}

export function CaseStudyTracker({ items }: CaseStudyTrackerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.href.replace(/^#/, "")))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    let animationFrame = 0;

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.42;
      let nextIndex = 0;

      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= activationLine) {
          nextIndex = index;
        }
      });

      const reachedPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (reachedPageEnd) nextIndex = sections.length - 1;

      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [items]);

  const scrollToChapter = (event: React.MouseEvent<HTMLAnchorElement>, item: TrackerItem, index: number) => {
    const section = document.getElementById(item.href.replace(/^#/, ""));
    if (!section) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", item.href);
    setActiveIndex(index);
  };

  return (
    <nav
      aria-label="Case study chapters"
      className="fixed top-1/2 z-20 hidden w-36 -translate-y-1/2 xl:block"
      style={{ left: "max(1.5rem, calc(50vw - 38rem))" }}
    >
      <ol className="space-y-2 text-xs">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => scrollToChapter(event, item, index)}
                className={`flex items-center gap-1.5 py-0.5 outline-none transition-colors duration-200 ease-out focus-visible:underline focus-visible:underline-offset-4 ${
                  isActive
                    ? "font-medium text-foreground"
                    : isComplete
                      ? "text-foreground/55 hover:text-foreground"
                      : "text-foreground/35 hover:text-foreground/70"
                }`}
              >
                <span className="w-2 shrink-0" aria-hidden="true">
                  {isActive ? "•" : ""}
                </span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
