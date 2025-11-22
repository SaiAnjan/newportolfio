"use client";

import Image from "next/image";
import { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: string;
}

export function ProjectImage({ src, alt, fallbackSrc = "/images/tulasi.png", placeholder }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-sm text-gray-500 mb-2">Image not found</p>
            {placeholder && (
              <p className="text-xs text-gray-400 italic">{placeholder}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              Please add the image to: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{src.replace('/images/', 'public/images/')}</code>
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className="object-contain rounded-lg"
          onError={() => {
            if (imgSrc !== fallbackSrc) {
              setImgSrc(fallbackSrc);
            } else {
              setHasError(true);
            }
          }}
        />
      )}
    </div>
  );
}

