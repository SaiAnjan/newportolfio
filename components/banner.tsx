"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NDAModal } from "./nda-modal";

export function Banner() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);
  const [showNDA, setShowNDA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate fade and blur based on scroll position
      // Start fading at 200px, fully faded at 600px
      const fadeStart = 200;
      const fadeEnd = 600;
      const scrollProgress = Math.min(
        Math.max(0, (currentScrollY - fadeStart) / (fadeEnd - fadeStart)),
        1
      );
      
      setOpacity(Math.max(0, 1 - scrollProgress));
      setBlur(Math.min(8, scrollProgress * 8));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCardClick = (href?: string, isProtected?: boolean) => {
    if (isProtected) {
      setShowNDA(true);
    } else if (href) {
      window.location.href = href;
    }
  };

  const handleNDAAccept = () => {
    setShowNDA(false);
    window.location.href = "/projects/chargeit";
  };

  return (
    <>
      <section
        className="relative min-h-screen w-full overflow-hidden bg-gradient-to-r from-lime-200 via-yellow-200 to-sky-300"
        style={{
          opacity,
          filter: `blur(${blur}px)`,
          transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
        }}
      >
        {/* background blobs */}
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-lime-300 via-emerald-200 to-white opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-gradient-to-tl from-sky-300 via-blue-200 to-white opacity-70 blur-3xl" />

        {/* Resume Link - Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <Link
            href="/resume"
            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-900 border border-white/50 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base"
          >
            View Resume
          </Link>
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-16">
          {/* === PORTRAIT + CIRCLES + FLOATING CARDS === */}
          <div className="relative z-20 mx-auto max-w-md">
            {/* portrait */}
            <div className="relative w-full">
              <Image
                src="/images/potrait_cutout.png"
                alt="Sai Anjan portrait"
                width={400}
                height={400}
                className="w-full h-auto"
                priority
              />

              {/* blurred circles over portrait */}
              <div className="pointer-events-none absolute -top-6 -left-4 h-20 w-20 rounded-full bg-gradient-to-tr from-white/80 via-lime-100 to-emerald-100 opacity-90 blur-xl md:h-28 md:w-28 md:blur-2xl" />
              <div className="pointer-events-none absolute -top-4 right-0 h-16 w-16 rounded-full bg-gradient-to-tr from-sky-100 via-white/80 to-sky-200 opacity-90 blur-xl md:h-24 md:w-24 md:blur-2xl" />
              <div className="pointer-events-none absolute bottom-10 -right-6 h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-100 via-white/70 to-lime-200 opacity-90 blur-xl md:h-24 md:w-24 md:blur-2xl" />
            </div>

            {/* floating cards (desktop) */}
            <div
              className="absolute -bottom-6 -left-10 z-40 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-xl transition-transform duration-300 hover:scale-[1.03] md:flex cursor-pointer"
              onClick={() => handleCardClick("/projects/tulasi", false)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-lime-300 to-emerald-400" />
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Tulasi</p>
                <p className="text-[11px] text-slate-500">Conversational AI for railways</p>
              </div>
            </div>

            <div
              className="absolute -bottom-14 left-1/2 z-40 hidden w-52 -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-xl transition-transform duration-300 hover:scale-[1.03] md:flex cursor-pointer"
              onClick={() => handleCardClick("/projects/teaching-strategies", false)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700">
                TS
              </span>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Teaching Strategies</p>
                <p className="text-[11px] text-slate-500">Dashboard · Analytics · Data</p>
              </div>
            </div>

            <div
              className="absolute top-6 -right-10 z-40 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-xl transition-transform duration-300 hover:scale-[1.03] md:flex cursor-pointer"
              onClick={() => handleCardClick("/projects/chargeit", true)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700">
                🔒
              </span>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Chargeit</p>
                <p className="text-[11px] text-slate-500">Enterprise · Payment · NDA</p>
              </div>
            </div>
          </div>

          {/* mobile cards (stacked) */}
          <div className="mt-6 flex w-full max-w-md flex-col gap-3 md:hidden">
            <div
              className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-md cursor-pointer"
              onClick={() => handleCardClick("/projects/tulasi", false)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-lime-300 to-emerald-400" />
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Tulasi</p>
                <p className="text-[11px] text-slate-500">Conversational AI for railways</p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-md cursor-pointer"
              onClick={() => handleCardClick("/projects/teaching-strategies", false)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-700">
                TS
              </span>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Teaching Strategies</p>
                <p className="text-[11px] text-slate-500">Dashboard · Analytics · Data</p>
              </div>
            </div>
            <div
              className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-3 shadow-md cursor-pointer"
              onClick={() => handleCardClick("/projects/chargeit", true)}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-100 text-[11px] font-semibold text-sky-700">
                🔒
              </span>
              <div className="text-xs">
                <p className="font-semibold text-slate-900">Chargeit</p>
                <p className="text-[11px] text-slate-500">Enterprise · Payment · NDA</p>
              </div>
            </div>
          </div>

          {/* text content */}
          <div className="relative z-30 mt-10 max-w-2xl text-center md:mt-16">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
              Sai Anjan
            </h1>
            <h2 className="mt-4 text-lg font-medium text-slate-800 md:text-xl">
              UX Designer Exploring AI, SaaS, and Conversational Interfaces
            </h2>
            <p className="mt-3 text-sm text-slate-700 md:text-base max-w-xl mx-auto">
              Driven by curiosity and collaboration to craft meaningful, data-driven
              enterprise experiences.
            </p>
            
            {/* About Button */}
            <button
              onClick={scrollToAbout}
              className="mt-8 px-6 py-2 bg-white/80 backdrop-blur-sm text-gray-900 border border-white/50 rounded-full hover:bg-white transition-all duration-300 hover:scale-105 text-sm md:text-base"
              aria-label="Scroll to About section"
            >
              About
            </button>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-float">
          <p className="text-slate-800 text-sm mb-3 font-medium">Scroll Down</p>
          <div className="flex flex-col items-center space-y-1">
            <svg
              className="w-5 h-5 text-slate-700 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <svg
              className="w-5 h-5 text-slate-700 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDelay: "0.2s" }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <svg
              className="w-5 h-5 text-slate-700 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDelay: "0.4s" }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      <NDAModal
        isOpen={showNDA}
        onClose={() => setShowNDA(false)}
        onAccept={handleNDAAccept}
      />
    </>
  );
}
