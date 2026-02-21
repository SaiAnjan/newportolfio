"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

type ShowcaseMediaType = "image" | "gif" | "lottie" | "video";

type ShowcaseItem = {
  src: string;
  alt: string;
  mediaType?: ShowcaseMediaType;
  poster?: string;
};

interface WorkShowcaseGalleryProps {
  items: ShowcaseItem[];
}

const isGifSource = (src: string) => /\.gif($|\?)/i.test(src);
const isJsonSource = (src: string) => /\.json($|\?)/i.test(src);
const isVideoSource = (src: string) => /\.(webm|mp4)($|\?)/i.test(src);
const isExploreModelsLottieSource = (src: string) => /(?:^|\/)ExploreModels\.json($|\?)/i.test(src);
const lottieCache = new Map<string, Record<string, unknown>>();

const getMediaType = (item: ShowcaseItem): ShowcaseMediaType => {
  if (item.mediaType) return item.mediaType;
  if (isVideoSource(item.src)) return "video";
  if (isJsonSource(item.src)) return "lottie";
  if (isGifSource(item.src)) return "gif";
  return "image";
};

function LottieFromUrl({ src, className }: { src: string; className: string }) {
  const [animationData, setAnimationData] = useState<Record<string, unknown> | null>(() => lottieCache.get(src) ?? null);

  useEffect(() => {
    if (lottieCache.has(src)) {
      setAnimationData(lottieCache.get(src) ?? null);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(src, { signal: controller.signal, cache: "force-cache" });
        if (!response.ok) throw new Error(`Unable to load animation: ${src}`);
        const json = (await response.json()) as Record<string, unknown>;
        lottieCache.set(src, json);
        if (!cancelled) setAnimationData(json);
      } catch {
        if (!cancelled) setAnimationData(null);
      }
    };

    load();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [src]);

  if (!animationData) {
    return <div className={`${className} animate-pulse bg-muted/30`} />;
  }

  return (
    <Lottie
      animationData={animationData}
      autoplay
      loop
      className={className}
      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
    />
  );
}

export function WorkShowcaseGallery({ items }: WorkShowcaseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const count = items.length;
  const hasItems = count > 0;
  const hasMultiple = count > 1;
  const cardWidthClass = hasMultiple
    ? "w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] xl:w-[calc(25%-0.5625rem)]"
    : "w-full max-w-3xl";

  const activeItem = useMemo(() => {
    if (activeIndex === null || activeIndex < 0 || activeIndex >= count) return null;
    return items[activeIndex];
  }, [activeIndex, count, items]);
  const activeMediaType = activeItem ? getMediaType(activeItem) : null;
  const activeIsLottie = activeMediaType === "lottie";
  const activeIsVideo = activeMediaType === "video";

  const showPrevious = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || count === 0) return prev;
      return (prev - 1 + count) % count;
    });
  }, [count]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null || count === 0) return prev;
      return (prev + 1) % count;
    });
  }, [count]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
        return;
      }

      if (!hasMultiple) return;

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, hasMultiple, showNext, showPrevious]);

  if (!hasItems) return null;

  return (
    <>
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {items.map((item, index) => {
            const mediaType = getMediaType(item);
            const isGif = mediaType === "gif";
            const isLottie = mediaType === "lottie";
            const isVideo = mediaType === "video";
            const forceWhiteCanvas = isLottie && isExploreModelsLottieSource(item.src);
            const lottieFrameClass = forceWhiteCanvas ? "p-[7%]" : "";
            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group relative block ${cardWidthClass} cursor-zoom-in overflow-hidden rounded-2xl bg-background/60 text-left`}
                aria-label={`Open work image ${index + 1}`}
              >
                <div
                  className={`relative w-full overflow-hidden rounded-2xl [aspect-ratio:2240/1610] ${
                    forceWhiteCanvas ? "bg-white" : "bg-muted/15"
                  }`}
                >
                  {isLottie ? (
                    <div
                      className={`h-full w-full transition-transform duration-300 group-hover:scale-[1.015] ${lottieFrameClass}`}
                    >
                      <LottieFromUrl
                        src={item.src}
                        className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
                      />
                    </div>
                  ) : isVideo ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      sizes="(max-width: 768px) 100vw, 768px"
                      unoptimized={isGif}
                      priority={!isGif && index < 3}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeItem ? (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4 backdrop-blur-[1px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Work preview: ${activeItem.alt}`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="relative w-full max-w-[min(96vw,1400px)]" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute top-3 left-3 z-10 rounded-full bg-background/95 p-2 text-foreground shadow-sm"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex h-[88vh] w-full items-center justify-center">
              {activeIsLottie ? (
                <div
                  className={`h-full w-full overflow-hidden rounded-[32px] shadow-2xl ${
                    isExploreModelsLottieSource(activeItem.src) ? "bg-white" : "bg-black/20"
                  }`}
                >
                  <div className={isExploreModelsLottieSource(activeItem.src) ? "h-full w-full p-[6%]" : "h-full w-full"}>
                    <LottieFromUrl
                      src={activeItem.src}
                      className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
                    />
                  </div>
                </div>
              ) : activeIsVideo ? (
                <video
                  src={activeItem.src}
                  poster={activeItem.poster}
                  className="max-h-full max-w-full rounded-[32px] bg-black object-contain shadow-2xl"
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="max-h-full max-w-full rounded-[32px] object-contain shadow-2xl"
                />
              )}
            </div>

            {hasMultiple ? (
              <div className="absolute top-1/2 right-3 flex -translate-y-1/2 flex-col overflow-hidden rounded-full border border-white/25 bg-black/70 text-white shadow-sm">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="inline-flex h-10 w-10 items-center justify-center border-b border-white/20 hover:bg-white/10"
                  aria-label="Previous image"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="inline-flex h-10 w-10 items-center justify-center hover:bg-white/10"
                  aria-label="Next image"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
