"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type MockupItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  context: string;
};

interface ProjectMockupShowcaseProps {
  items: MockupItem[];
}

function RenderMockupMedia({ item, eager = false }: { item: MockupItem; eager?: boolean }) {
  if (item.type === "video") {
    return <video src={item.src} className="h-full w-full object-cover" controls playsInline muted />;
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      className="object-cover"
      loading={eager ? "eager" : "lazy"}
      sizes="(max-width: 768px) 100vw, 700px"
    />
  );
}

export function ProjectMockupShowcase({ items }: ProjectMockupShowcaseProps) {
  const mediaItems = useMemo(() => items.filter(Boolean), [items]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex >= mediaItems.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, mediaItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (mediaItems.length < 2) return;
      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          const current = prev ?? 0;
          return (current - 1 + mediaItems.length) % mediaItems.length;
        });
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          const current = prev ?? 0;
          return (current + 1) % mediaItems.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, mediaItems.length]);

  if (mediaItems.length === 0) return null;

  const isCarousel = mediaItems.length > 1;
  const resolvedActiveIndex = Math.min(activeIndex, mediaItems.length - 1);
  const current = mediaItems[resolvedActiveIndex];
  const resolvedLightboxIndex =
    lightboxIndex === null ? null : Math.min(Math.max(lightboxIndex, 0), mediaItems.length - 1);
  const lightboxItem = resolvedLightboxIndex === null ? null : mediaItems[resolvedLightboxIndex];

  const showPrev = () => {
    setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const showNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const lightboxPrev = () => {
    setLightboxIndex((prev) => {
      const currentIndex = prev ?? 0;
      return (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    });
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => {
      const currentIndex = prev ?? 0;
      return (currentIndex + 1) % mediaItems.length;
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/15">
        <button
          type="button"
          onClick={() => setLightboxIndex(resolvedActiveIndex)}
          className="group relative block w-full cursor-zoom-in text-left"
          aria-label={`Open mockup: ${current.alt}`}
        >
          <div className="relative aspect-video w-full">
            <RenderMockupMedia item={current} eager />
          </div>
          {!isCarousel ? (
            <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs text-foreground/80">
              <Expand className="h-3.5 w-3.5" />
              Preview
            </span>
          ) : null}
        </button>

        {isCarousel ? (
          <>
            <button
              type="button"
              onClick={showPrev}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-1.5 text-foreground transition-colors hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-border/70 bg-background/90 p-1.5 text-foreground transition-colors hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </div>

      <p className="text-sm text-foreground/70">{current.context}</p>

      {isCarousel ? (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          {mediaItems.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-md border ${
                index === activeIndex ? "border-primary" : "border-border/60"
              }`}
              aria-label={`Select image ${index + 1}`}
            >
              <div className="relative h-full w-full">
                <RenderMockupMedia item={item} />
              </div>
            </button>
          ))}
        </div>
      ) : null}

      {lightboxItem ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-3 left-3 z-10 rounded-full bg-background/95 p-2 text-foreground shadow-sm"
              aria-label="Close image"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative aspect-video w-full">
                <RenderMockupMedia item={lightboxItem} eager />
              </div>
            </div>

            {isCarousel ? (
              <>
                <button
                  type="button"
                  onClick={lightboxPrev}
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-background/95 p-2 text-foreground shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={lightboxNext}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-background/95 p-2 text-foreground shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 overflow-x-auto">
                  {mediaItems.map((item, index) => (
                    <button
                      key={`${item.src}-lb-${index}`}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border ${
                        index === resolvedLightboxIndex ? "border-primary" : "border-border/60"
                      }`}
                      aria-label={`Open image ${index + 1}`}
                    >
                      <div className="relative h-full w-full">
                        <RenderMockupMedia item={item} />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
