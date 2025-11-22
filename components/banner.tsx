"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Banner() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

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

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{
        opacity,
        filter: `blur(${blur}px)`,
        transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
      }}
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/bannera.png"
          alt="Banner gradient background"
          fill
          className="object-cover"
          priority
        />
        {/* Fallback gradient overlay if image doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        {/* Portrait */}
        <div className="mb-8 relative w-48 h-48 md:w-64 md:h-64">
          <Image
            src="/images/potrait_cutout.png"
            alt="Sai Anjan"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-light mb-6 text-white drop-shadow-lg">
          Sai Anjan
        </h1>

        {/* Headline */}
        <h2 className="text-2xl md:text-4xl font-light mb-4 text-white drop-shadow-md max-w-4xl leading-tight">
          Experienced AI-Driven UX Designer Specializing in SaaS, Dashboards, and Conversational Interfaces
        </h2>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md max-w-2xl">
          Designing intelligent, data-driven experiences for complex workflows.
        </p>

        {/* About Button */}
        <button
          onClick={scrollToAbout}
          className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 mb-16"
          aria-label="Scroll to About section"
        >
          About
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-float">
        <p className="text-white/80 text-sm mb-2 drop-shadow-md">Scroll Down</p>
        <div className="flex flex-col items-center space-y-1">
          <svg
            className="w-6 h-6 text-white/80 animate-bounce"
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
            className="w-6 h-6 text-white/80 animate-bounce"
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
        </div>
      </div>
    </section>
  );
}

