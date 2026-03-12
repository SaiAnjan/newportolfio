import Image from "next/image";

import { cn } from "@/lib/utils";
import type { WritingSource } from "@/lib/writing";

interface WritingSourceLogoProps {
  source: WritingSource;
  className?: string;
}

export function WritingSourceLogo({ source, className }: WritingSourceLogoProps) {
  if (source === "portfolio") {
    return (
      <span
        className={cn(
          "inline-flex h-4 w-4 items-center justify-center rounded-[2px] bg-primary/15 text-[8px] font-semibold text-primary",
          className,
        )}
        aria-hidden="true"
      >
        SA
      </span>
    );
  }

  const src =
    source === "substack"
      ? "https://substack.com/favicon.ico"
      : "https://cdn-static-1.medium.com/_/fp/icons/Medium-Avatar-500x500.svg";
  const alt = source === "substack" ? "Substack logo" : "Medium logo";

  return (
    <Image
      src={src}
      alt={alt}
      width={16}
      height={16}
      className={cn("h-4 w-4 rounded-[2px]", className)}
      unoptimized
    />
  );
}
