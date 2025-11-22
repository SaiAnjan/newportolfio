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
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        style={{
          background: "radial-gradient(circle at 60% 40%, #F9F871 0%, #B2F2B6 100%)",
          opacity,
          filter: `blur(${blur}px)`,
          transition: "opacity 0.3s ease-out, filter 0.3s ease-out",
        }}
      >
        {/* Resume Link - Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <Link
            href="/resume"
            className="px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-900 border border-white/50 rounded-full hover:bg-white transition-all duration-300 text-sm md:text-base"
          >
            View Resume
          </Link>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-6xl mx-auto">
          {/* Portrait and Name Section */}
          <div className="mb-8 flex flex-col items-center">
            {/* Portrait */}
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6">
              <Image
                src="/images/potrait_cutout.png"
                alt="Sai Anjan"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Name */}
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-gray-900">
              Sai Anjan
            </h1>
          </div>

          {/* Headline */}
          <h2 className="text-xl md:text-3xl font-light mb-4 text-gray-800 max-w-3xl leading-tight mb-2">
            UX Designer Exploring AI, SaaS, and Conversational Interfaces
          </h2>

          {/* Tagline */}
          <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl">
            Driven by curiosity and collaboration to craft meaningful, data-driven enterprise experiences.
          </p>

          {/* About Button */}
          <button
            onClick={scrollToAbout}
            className="px-6 py-2 bg-white/80 backdrop-blur-sm text-gray-900 border border-white/50 rounded-full hover:bg-white transition-all duration-300 hover:scale-105 mb-12 text-sm md:text-base"
            aria-label="Scroll to About section"
          >
            About
          </button>

          {/* Floating Project Cards */}
          <div className="relative w-full max-w-5xl mt-8">
            {/* Tulasi Card - Top Left */}
            <div
              className="absolute top-0 left-0 md:left-4 w-64 md:w-72 bg-white rounded-xl shadow-lg p-4 md:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
              style={{
                top: "-20px",
                left: "10%",
              }}
              onClick={() => handleCardClick("/projects/tulasi", false)}
            >
              <h3 className="text-lg md:text-xl font-light mb-2 text-gray-900">Tulasi</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Conversational AI agent for railway enquiry, simplifying complex information access.
              </p>
            </div>

            {/* Chargeit Card - Top Right */}
            <div
              className="absolute top-0 right-0 md:right-4 w-64 md:w-72 bg-white rounded-xl shadow-lg p-4 md:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
              style={{
                top: "-20px",
                right: "10%",
              }}
              onClick={() => handleCardClick("/projects/chargeit", true)}
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg md:text-xl font-light text-gray-900">Chargeit</h3>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Enterprise payment solution with advanced security and workflow management.
              </p>
            </div>

            {/* Teaching Strategies Card - Bottom Center */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 md:w-72 bg-white rounded-xl shadow-lg p-4 md:p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
              style={{
                bottom: "-40px",
              }}
              onClick={() => handleCardClick("/projects/teaching-strategies", false)}
            >
              <h3 className="text-lg md:text-xl font-light mb-2 text-gray-900">Teaching Strategies</h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Educational platform dashboard with data visualization and analytics.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-float">
          <p className="text-gray-800 text-sm mb-3 font-medium">Scroll Down</p>
          <div className="flex flex-col items-center space-y-1">
            <svg
              className="w-5 h-5 text-gray-700 animate-bounce"
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
              className="w-5 h-5 text-gray-700 animate-bounce"
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
              className="w-5 h-5 text-gray-700 animate-bounce"
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
