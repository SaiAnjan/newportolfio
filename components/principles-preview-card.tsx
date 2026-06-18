"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { latestPrinciples, type Principle } from "@/lib/principles";

import styles from "./principles-preview-card.module.css";

function CompactKineticQuote({
  principle,
  prefersReducedMotion,
}: {
  principle: Principle;
  prefersReducedMotion: boolean | null;
}) {
  let wordIndex = 0;

  return (
    <blockquote className={styles.quote}>
      <span className={styles.visuallyHidden}>{principle.quote}</span>
      <span aria-hidden="true">
        {principle.phrases.map((phrase, phraseIndex) => (
          <span
            className={`${styles.phrase} ${
              phrase.tone ? styles[`tone${phrase.tone[0].toUpperCase()}${phrase.tone.slice(1)}`] : ""
            }`}
            key={`${principle.id}-${phraseIndex}`}
          >
            {phrase.text.split(/(\s+)/).map((token, tokenIndex) => {
              if (!token) return null;
              if (/^\s+$/.test(token)) return token;

              const currentWordIndex = wordIndex;
              wordIndex += 1;

              return (
                <motion.span
                  className={styles.word}
                  key={`${principle.id}-${phraseIndex}-${tokenIndex}`}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: "0.2em", filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.025 + currentWordIndex * 0.012,
                    duration: prefersReducedMotion ? 0 : 0.34,
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

export function PrinciplesPreviewCard() {
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();
  const activePrinciple = latestPrinciples[principleIndex];

  if (!activePrinciple) return null;

  const changePrinciple = (nextDirection: number) => {
    setDirection(nextDirection);
    setPrincipleIndex(
      (currentIndex) =>
        (currentIndex + nextDirection + latestPrinciples.length) % latestPrinciples.length,
    );
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <Link href="/principles" className={styles.title}>
          AI design engineering
          <span>Field notes</span>
        </Link>

        <div className={styles.navigation}>
          <button type="button" onClick={() => changePrinciple(-1)} aria-label="Previous principle preview">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => changePrinciple(1)} aria-label="Next principle preview">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className={styles.quoteViewport} aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePrinciple.id}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: direction * -12 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <CompactKineticQuote principle={activePrinciple} prefersReducedMotion={prefersReducedMotion} />
          </motion.div>
        </AnimatePresence>
      </div>

      <Link href="/principles" className={styles.openLink}>
        Open field notes <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
