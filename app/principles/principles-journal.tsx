"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, CornerUpLeft } from "lucide-react";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getQuoteScale, journalDays, type Principle } from "@/lib/principles";

import styles from "./principles.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatJournalDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

function getPaddedNumber(value: number) {
  return String(value).padStart(2, "0");
}

function KineticQuote({
  principle,
  prefersReducedMotion,
}: {
  principle: Principle;
  prefersReducedMotion: boolean | null;
}) {
  let wordIndex = 0;

  return (
    <blockquote>
      <span className={styles.visuallyHidden}>{principle.quote}</span>
      <span className={styles.kineticQuote} aria-hidden="true">
        {principle.phrases.map((phrase, phraseIndex) => (
          <span
            className={`${styles.quotePhrase} ${
              phrase.tone ? styles[`tone${phrase.tone[0].toUpperCase()}${phrase.tone.slice(1)}`] : ""
            }`}
            key={`${principle.id}-${phraseIndex}`}
          >
            {phrase.text.split(/(\s+)/).map((token, tokenIndex) => {
              if (!token) {
                return null;
              }

              if (/^\s+$/.test(token)) {
                return token;
              }

              const currentWordIndex = wordIndex;
              wordIndex += 1;

              return (
                <motion.span
                  className={styles.quoteWord}
                  key={`${principle.id}-${phraseIndex}-${tokenIndex}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: "0.22em", filter: "blur(4px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.04 + currentWordIndex * 0.018,
                    duration: prefersReducedMotion ? 0 : 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {token}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>
    </blockquote>
  );
}

export function PrinciplesJournal() {
  const [dayIndex, setDayIndex] = useState(journalDays.length - 1);
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  const activeDay = journalDays[dayIndex];
  const activePrinciple = activeDay.principles[principleIndex];
  const hasMultiplePrinciples = activeDay.principles.length > 1;
  const hasMultipleDays = journalDays.length > 1;

  const changeDay = useCallback(
    (nextDirection: number) => {
      if (!hasMultipleDays) return;

      setDirection(nextDirection);
      setDayIndex(
        (currentIndex) =>
          (currentIndex + nextDirection + journalDays.length) % journalDays.length,
      );
      setPrincipleIndex(0);
    },
    [hasMultipleDays],
  );

  const changePrinciple = useCallback(
    (nextDirection: number) => {
      if (!hasMultiplePrinciples) return;

      const principleCount = activeDay.principles.length;
      setDirection(nextDirection);
      setPrincipleIndex(
        (currentIndex) =>
          (currentIndex + nextDirection + principleCount) % principleCount,
      );
    },
    [activeDay.principles.length, hasMultiplePrinciples],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") changePrinciple(-1);
      if (event.key === "ArrowRight") changePrinciple(1);
      if (event.key === "ArrowUp") changeDay(-1);
      if (event.key === "ArrowDown") changeDay(1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDay, changePrinciple]);

  const principleMotion = useMemo(
    () => ({
      initial: prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, x: direction * 20 },
      animate: { opacity: 1, x: 0 },
      exit: prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, x: direction * -20 },
    }),
    [direction, prefersReducedMotion],
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.homeLink} href="/" aria-label="Back to home">
          <CornerUpLeft aria-hidden="true" />
          <span>Sai Anjan</span>
        </Link>

        <p className={styles.journalTitle}>
          AI design engineering
          <span>Field notes</span>
        </p>
      </header>

      <section className={styles.journal} aria-label="AI design engineering principles">
        <div className={styles.dateNavigation}>
          <button
            className={styles.dateButton}
            type="button"
            onClick={() => changeDay(-1)}
            disabled={!hasMultipleDays}
            aria-label="View previous day"
          >
            <ArrowLeft aria-hidden="true" />
          </button>

          <div className={styles.dateBlock} aria-live="polite">
            <span>Entry {getPaddedNumber(dayIndex + 1)}</span>
            <time dateTime={activeDay.date}>{formatJournalDate(activeDay.date)}</time>
          </div>

          <button
            className={styles.dateButton}
            type="button"
            onClick={() => changeDay(1)}
            disabled={!hasMultipleDays}
            aria-label="View next day"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>

        <div className={styles.quoteViewport}>
          <AnimatePresence mode="wait">
            <motion.article
              key={`${activeDay.date}-${activePrinciple.id}`}
              className={styles.principle}
              style={
                {
                  "--quote-scale": getQuoteScale(activePrinciple.quote),
                } as CSSProperties
              }
              initial={principleMotion.initial}
              animate={principleMotion.animate}
              exit={principleMotion.exit}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              drag={hasMultiplePrinciples ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) changePrinciple(1);
                if (info.offset.x > 60) changePrinciple(-1);
              }}
            >
              <p className={styles.category}>
                <span>{getPaddedNumber(principleIndex + 1)}</span>
                {activePrinciple.category}
              </p>
              <KineticQuote principle={activePrinciple} prefersReducedMotion={prefersReducedMotion} />
            </motion.article>
          </AnimatePresence>
        </div>

        <footer className={styles.controls}>
          <div className={styles.progress} aria-label={`Principle ${principleIndex + 1} of ${activeDay.principles.length}`}>
            <span>{getPaddedNumber(principleIndex + 1)}</span>
            <div className={styles.progressTrack} aria-hidden="true">
              {activeDay.principles.map((principle, index) => (
                <button
                  key={principle.id}
                  type="button"
                  className={index === principleIndex ? styles.progressActive : ""}
                  onClick={() => {
                    setDirection(index > principleIndex ? 1 : -1);
                    setPrincipleIndex(index);
                  }}
                  aria-label={`View principle ${index + 1}`}
                  aria-current={index === principleIndex ? "true" : undefined}
                />
              ))}
            </div>
            <span>{getPaddedNumber(activeDay.principles.length)}</span>
          </div>

          {hasMultiplePrinciples && (
            <div className={styles.quoteNavigation}>
              <button type="button" onClick={() => changePrinciple(-1)} aria-label="Previous principle">
                <span className={styles.navigationArrow} aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => changePrinciple(1)} aria-label="Next principle">
                <span className={styles.navigationArrow} aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </footer>
      </section>

      <p className={styles.hint}>Use arrow keys or swipe to explore</p>
    </main>
  );
}
