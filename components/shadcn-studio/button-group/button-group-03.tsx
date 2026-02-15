"use client";

import { CopyIcon, LinkedinIcon, Share2Icon } from "lucide-react";
import type { SVGProps } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ButtonGroupTooltipDemoProps {
  shareUrl?: string;
  shareTitle?: string;
  className?: string;
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M18.901 1.154h3.68l-8.04 9.19 9.46 12.502h-7.406l-5.803-7.584-6.639 7.584H.471l8.602-9.83L0 1.154h7.594l5.246 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z"
      />
    </svg>
  );
}

function toAbsoluteUrl(input?: string) {
  if (!input) return "";
  if (input.startsWith("http://") || input.startsWith("https://")) return input;
  if (typeof window === "undefined") return "";
  return new URL(input, window.location.origin).toString();
}

const ButtonGroupTooltipDemo = ({ shareUrl, shareTitle, className }: ButtonGroupTooltipDemoProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = shareTitle ?? "Check this project";
  const absoluteShareUrl = toAbsoluteUrl(shareUrl);

  const openWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onLinkedInShare = () => {
    if (!absoluteShareUrl) return;
    openWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteShareUrl)}`);
    setOpen(false);
  };

  const onXShare = () => {
    if (!absoluteShareUrl) return;
    const query = new URLSearchParams({
      text,
      url: absoluteShareUrl,
    });
    openWindow(`https://x.com/intent/tweet?${query.toString()}`);
    setOpen(false);
  };

  const onCopy = async () => {
    if (!absoluteShareUrl) return;
    try {
      await navigator.clipboard.writeText(absoluteShareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
      setOpen(false);
    } catch {
      setCopied(false);
    }
  };

  const onNativeShare = async () => {
    if (!absoluteShareUrl) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: text, url: absoluteShareUrl });
        setOpen(false);
        return;
      }
      await onCopy();
    } catch {
      // User cancel or unavailable share target: no-op.
    }
  };

  return (
    <TooltipProvider delayDuration={80}>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn("h-8 rounded-md px-2.5 text-foreground/70 hover:text-foreground", className)}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Share2Icon className="h-4 w-4" />
            Share
          </Button>
        </TooltipTrigger>
        <TooltipContent
          align="end"
          sideOffset={8}
          showArrow={false}
          className="rounded-full border-0 bg-transparent p-0 shadow-none"
        >
          <div className="inline-flex items-center overflow-hidden rounded-full bg-zinc-900 text-white shadow-lg ring-1 ring-white/10">
            <Button
              className="h-9 w-10 rounded-none border-0 bg-transparent p-0 text-white/90 shadow-none hover:bg-white/10 hover:text-white"
              variant="ghost"
              size="icon-sm"
              onClick={onLinkedInShare}
              disabled={!absoluteShareUrl}
            >
              <LinkedinIcon className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
            <span className="h-5 w-px bg-white/20" aria-hidden />

            <Button
              className="h-9 w-10 rounded-none border-0 bg-transparent p-0 text-white/90 shadow-none hover:bg-white/10 hover:text-white"
              variant="ghost"
              size="icon-sm"
              onClick={onXShare}
              disabled={!absoluteShareUrl}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Share on X</span>
            </Button>
            <span className="h-5 w-px bg-white/20" aria-hidden />

            <Button
              className={cn(
                "h-9 w-10 rounded-none border-0 bg-transparent p-0 text-white/90 shadow-none hover:bg-white/10 hover:text-white",
                copied ? "text-emerald-300" : "",
              )}
              variant="ghost"
              size="icon-sm"
              onClick={onCopy}
              disabled={!absoluteShareUrl}
            >
              <CopyIcon className="h-4 w-4" />
              <span className="sr-only">Copy link</span>
            </Button>
            <span className="h-5 w-px bg-white/20" aria-hidden />

            <Button
              className="h-9 w-10 rounded-none border-0 bg-transparent p-0 text-white/90 shadow-none hover:bg-white/10 hover:text-white"
              variant="ghost"
              size="icon-sm"
              onClick={onNativeShare}
              disabled={!absoluteShareUrl}
            >
              <Share2Icon className="h-4 w-4" />
              <span className="sr-only">Open share menu</span>
            </Button>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ButtonGroupTooltipDemo;
