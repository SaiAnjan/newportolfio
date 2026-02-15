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

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        return;
      }

      if (images.length > 1 && event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }

      if (images.length > 1 && event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [images.length, isOpen]);

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

  const handleInlineKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (images.length <= 1) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showInlinePrev();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showInlineNext();
    }
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
        <div
          className={cn("space-y-3", className)}
          role="region"
          aria-label={`${title} carousel`}
          tabIndex={0}
          onKeyDown={handleInlineKeyDown}
        >
          <button
            type="button"
            onClick={() => openDrawer(inlineIndex)}
            className="group relative block w-full overflow-hidden rounded-lg border border-border/60 bg-muted/35"
          >
            <div className="relative aspect-video w-full">
              <Image src={images[inlineIndex].src} alt={images[inlineIndex].alt} fill className="object-cover" />
            </div>
            <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs text-foreground/75">
              <Expand className="h-3.5 w-3.5" />
              Open
            </span>
          </button>

          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showInlinePrev}
              className="h-8 w-8 rounded-full"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex max-w-full items-center justify-center gap-2 overflow-x-auto px-1 py-1">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-inline-thumb-${index}`}
                  type="button"
                  onClick={() => setInlineIndex(index)}
                  className={cn(
                    "relative h-12 w-20 shrink-0 overflow-hidden rounded-md border",
                    index === inlineIndex ? "border-primary" : "border-border/60",
                  )}
                >
                  <Image src={image.src} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={showInlineNext}
              className="h-8 w-8 rounded-full"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            aria-label="Close image viewer"
            onClick={closeDrawer}
            className="absolute inset-0 bg-black/50"
          />

          <div className="relative z-10 w-full max-w-5xl">
            <div className="relative overflow-hidden rounded-xl">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                onClick={closeDrawer}
                className="absolute top-3 left-3 z-20 h-8 w-8 rounded-full"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-xl">
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
              <div className="mt-3 flex justify-center gap-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={`${image.src}-modal-thumb-${index}`}
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
