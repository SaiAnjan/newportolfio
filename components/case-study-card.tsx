"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NDAModal } from "./nda-modal";

interface CaseStudyCardProps {
  title: string;
  tagline: string;
  accentColor: string;
  imageSrc: string;
  href?: string;
  isProtected?: boolean;
  password?: string;
}

export function CaseStudyCard({
  title,
  tagline,
  accentColor,
  imageSrc,
  href,
  isProtected = false,
}: CaseStudyCardProps) {
  const [showNDA, setShowNDA] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isProtected) {
      e.preventDefault();
      setShowNDA(true);
    }
  };

  const handleNDAAccept = () => {
    setShowNDA(false);
    if (href) {
      window.location.href = href;
    }
  };

  const CardContent = (
    <div
      className="group relative h-full w-full rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      style={{
        borderTop: `4px solid ${accentColor}`,
      }}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
        <h3 className="text-2xl md:text-3xl font-light mb-2">{title}</h3>
        <p className="text-sm md:text-base text-white/90 max-w-md">{tagline}</p>
        {isProtected && (
          <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
            <svg
              className="w-4 h-4"
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
            <span>Password Protected</span>
          </div>
        )}
      </div>

      {/* Accent border bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );

  return (
    <>
      {isProtected ? (
        CardContent
      ) : href ? (
        <Link href={href} className="block h-full">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}

      {isProtected && (
        <NDAModal
          isOpen={showNDA}
          onClose={() => setShowNDA(false)}
          onAccept={handleNDAAccept}
        />
      )}
    </>
  );
}


