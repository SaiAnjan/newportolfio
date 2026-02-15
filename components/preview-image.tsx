"use client";

import NextImage, { type ImageProps } from "next/image";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type PreviewImageProps = ImageProps & {
  preview?: boolean;
};

export default function PreviewImage({
  preview = true,
  className,
  onClick,
  src,
  alt,
  ...props
}: PreviewImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const canPreview = preview && Boolean(src);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <NextImage
        src={src}
        alt={alt}
        className={canPreview ? `${className ?? ""} cursor-zoom-in` : className}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || !canPreview) return;
          setIsOpen(true);
        }}
        {...props}
      />

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${alt}`}
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-3 left-3 z-10 rounded-full bg-background/95 p-2 text-foreground shadow-sm"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-xl">
              <NextImage src={src} alt={alt} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 1280px" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
