"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
};

interface CaseStudyMediaGalleryProps {
  images: GalleryImage[];
  title?: string;
  className?: string;
}

export function CaseStudyMediaGallery({
  images,
  title = "Case Study Media",
  className,
}: CaseStudyMediaGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inlineIndex, setInlineIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (images.length === 0) return null;

  const openDrawer = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const showInlinePrev = () => {
    setInlineIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showInlineNext = () => {
    setInlineIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      {images.length === 1 ? (
        <button
          type="button"
          onClick={() => openDrawer(0)}
          className={cn(
            "group relative block w-full overflow-hidden rounded-lg border border-border/60 bg-muted/40",
            className,
          )}
        >
          <div className="relative aspect-video w-full">
            <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
          </div>
          <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs text-foreground/75">
            <Expand className="h-3.5 w-3.5" />
            Open
          </span>
        </button>
      ) : (
        <div className={cn("relative", className)}>
          <div className="relative overflow-hidden rounded-lg border border-border/60 bg-muted/35">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${inlineIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  onClick={() => openDrawer(index)}
                  className="group relative w-full shrink-0 overflow-hidden"
                >
                  <div className="relative aspect-video w-full">
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  </div>
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs text-foreground/75">
                    <Expand className="h-3.5 w-3.5" />
                    Open
                  </span>
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showInlinePrev}
              className="absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showInlineNext}
              className="absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2 rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background/90 to-transparent" />

            <div className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-background/90 px-2 py-1">
              {images.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    inlineIndex === index ? "bg-foreground" : "bg-foreground/35",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <button
            type="button"
            aria-label="Close media viewer"
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/45"
          />

          <div className="relative z-10 w-full rounded-t-2xl border border-border bg-background p-4 shadow-2xl sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-foreground/80">
                {title} {images.length > 1 ? `(${activeIndex + 1}/${images.length})` : ""}
              </p>
              <Button type="button" variant="ghost" size="icon" onClick={closeDrawer} aria-label="Close">
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-border/60 bg-muted/40">
              <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl">
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  className="object-contain"
                />
              </div>

              {images.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={showPrev}
                    className="absolute top-1/2 left-3 h-8 w-8 -translate-y-1/2 rounded-full"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    onClick={showNext}
                    className="absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2 rounded-full"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-thumb-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative h-14 w-24 shrink-0 overflow-hidden rounded-md border",
                      index === activeIndex ? "border-primary" : "border-border/60",
                    )}
                  >
                    <Image src={image.src} alt={image.alt} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
