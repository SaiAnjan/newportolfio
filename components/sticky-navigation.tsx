"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { type MouseEvent, useEffect, useState } from "react";

import styles from "./sticky-navigation.module.css";

const navigationItems = [
  { href: "#top", label: "about" },
  { href: "#wip", label: "wip" },
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "#contact", label: "contact" },
] as const;

const sectionItems = navigationItems.filter((item) => item.href.startsWith("#"));

export function StickyNavigation() {
  const prefersReducedMotion = useReducedMotion();
  const [activeHref, setActiveHref] = useState("#top");

  useEffect(() => {
    let frame = 0;

    const updateNavigation = () => {
      frame = 0;
      const activationLine = window.scrollY + Math.min(180, window.innerHeight * 0.25);
      let nextActive = "#top";

      for (const item of sectionItems.slice(1)) {
        const section = document.querySelector<HTMLElement>(item.href);
        if (section && section.offsetTop <= activationLine) {
          nextActive = item.href;
        }
      }

      const reachedPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      if (reachedPageEnd) {
        nextActive = "#contact";
      }

      setActiveHref(nextActive);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateNavigation);
    };

    updateNavigation();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
    window.history.replaceState(null, "", href);
    setActiveHref(href);
  };

  return (
    <motion.nav
      className={styles.navigation}
      aria-label="Main navigation"
      initial={prefersReducedMotion ? false : { opacity: 0, x: "-50%", y: 14 }}
      animate={{ opacity: 1, x: "-50%", y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.scroller}>
        {navigationItems.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <Link
              key={item.href}
              className={styles.link}
              data-active={isActive ? "true" : "false"}
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              onClick={(event) => handleAnchorClick(event, item.href)}
            >
              {isActive && (
                <motion.span
                  className={styles.activeIndicator}
                  layoutId="homepage-navigation-active"
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 420,
                          damping: 38,
                          mass: 0.7,
                        }
                  }
                />
              )}
              <span className={styles.linkLabel}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
