import Image from "next/image";

import { cn } from "@/lib/utils";
import type { WritingSource } from "@/lib/writing";

interface WritingSourceLogoProps {
  source: WritingSource;
  className?: string;
}

export function WritingSourceLogo({ source, className }: WritingSourceLogoProps) {
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
