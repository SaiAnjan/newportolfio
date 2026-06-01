import Image from "next/image";
import Link from "next/link";
import { Coffee, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

import { Button } from "@/components/ui/button";
import { WorkShowcaseGallery } from "@/components/work-showcase-gallery";
import { WritingSourceLogo } from "@/components/writing-source-logo";
import { formatDate, getAllWritingPosts, getFeaturedWritingPosts } from "@/lib/writing";

const featuredProjects = [
  {
    title: "EdgeNexus IAM",
    href: "/projects/edgesecure-iam",
    summary: "Visual-first IAM redesign for enterprise edge cloud security workflows.",
    thumbnail: "/images/ChargeIT/Thumbnail.png",
  },
  {
    title: "Gpay + Wallet",
    href: "/projects/gpay",
    summary: "Payment UX strategy and interaction systems for high-scale usage.",
    thumbnail: "/images/gpay.png",
  },
  {
    title: "Mindhouse",
    href: "/projects/mindhouse",
    summary: "Simplified class discovery for live meditation sessions.",
    thumbnail: "/images/mindhouse.png",
  },
  {
    title: "Mindhouse Filtering (Review)",
    href: "/projects/mindhouse-filtering-review",
    summary: "Before/after walkthrough of the class filtering redesign.",
    thumbnail: "/images/mindhouse/filters-new.png",
  },
  {
    title: "Chargeit",
    href: "/projects/chargeit",
    summary: "Enterprise billing and workflow architecture for modern SaaS teams.",
    thumbnail: "/images/ChargeIT/Thumbnail.png",
  },
] as const;

const showcaseImageDir = path.join(process.cwd(), "public", "images", "Showcase");
const showcaseVideoDir = path.join(process.cwd(), "public", "videos", "showcase");
const posterFilePattern = /\.poster\.(webp|png|jpe?g)$/i;
const allowedShowcaseExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".json",
  ".webm",
  ".mp4",
]);
const showcaseExtensionPriority = [".json", ".mp4", ".webm", ".avif", ".webp", ".jpg", ".jpeg", ".png", ".gif"] as const;

export type ShowcaseMediaType = "image" | "gif" | "lottie" | "video";

type ShowcaseImage = {
  src: string;
  alt: string;
  mediaType: ShowcaseMediaType;
  poster?: string;
};

async function getShowcaseImages(): Promise<ShowcaseImage[]> {
  const readEntries = async (directory: string, baseUrl: string) => {
    try {
      const entries = await readdir(directory, { withFileTypes: true });
      const files = entries
        .filter((entry) => entry.isFile())
        .filter((entry) => allowedShowcaseExtensions.has(path.extname(entry.name).toLowerCase()));

      return Promise.all(
        files.map(async (entry) => {
          const filePath = path.join(directory, entry.name);
          const stats = await stat(filePath);
          return { entry, baseUrl, mtimeMs: stats.mtimeMs };
        }),
      );
    } catch {
      return [] as { entry: { name: string }; baseUrl: string; mtimeMs: number }[];
    }
  };

  try {
    const mediaEntries = [
      ...(await readEntries(showcaseImageDir, "/images/Showcase")),
      ...(await readEntries(showcaseVideoDir, "/videos/showcase")),
    ];

    const mtimeByPath = new Map(mediaEntries.map(({ entry, baseUrl, mtimeMs }) => [`${baseUrl}/${entry.name}`, mtimeMs]));
    const fileLookup = new Set(mtimeByPath.keys());
    const withVersion = (filePath: string) => {
      const mtimeMs = mtimeByPath.get(filePath);
      if (!mtimeMs) return filePath;
      return `${filePath}?v=${Math.trunc(mtimeMs)}`;
    };

    // If the same basename has multiple formats, prefer JSON/Lottie or video first.
    const preferredByBasename = new Map<string, (typeof mediaEntries)[number]>();
    for (const item of mediaEntries) {
      if (posterFilePattern.test(item.entry.name)) continue;
      const extension = path.extname(item.entry.name).toLowerCase();
      const basename = item.entry.name.slice(0, -extension.length);
      const existing = preferredByBasename.get(basename);

      if (!existing) {
        preferredByBasename.set(basename, item);
        continue;
      }

      const existingExt = path.extname(existing.entry.name).toLowerCase();
      const existingPriority = showcaseExtensionPriority.indexOf(
        existingExt as (typeof showcaseExtensionPriority)[number],
      );
      const nextPriority = showcaseExtensionPriority.indexOf(
        extension as (typeof showcaseExtensionPriority)[number],
      );

      if (nextPriority !== -1 && (existingPriority === -1 || nextPriority < existingPriority)) {
        preferredByBasename.set(basename, item);
      }
    }

    return Array.from(preferredByBasename.values())
      .sort((a, b) => a.entry.name.localeCompare(b.entry.name, undefined, { numeric: true, sensitivity: "base" }))
      .map(({ entry, baseUrl }) => {
        const extension = path.extname(entry.name).toLowerCase();
        const basename = entry.name.slice(0, -extension.length);
        const decodedName = entry.name.replace(/\.[^/.]+$/, "");
        const readableName = decodedName.replace(/[_-]+/g, " ").trim();
        let mediaType: ShowcaseMediaType = "image";
        if (extension === ".gif") mediaType = "gif";
        if (extension === ".json") mediaType = "lottie";
        if (extension === ".webm" || extension === ".mp4") mediaType = "video";
        const shouldVersionSource = mediaType === "video" || mediaType === "lottie";
        const sourcePath = `${baseUrl}/${entry.name}`;

        const posterCandidates = [
          `${baseUrl}/${basename}.poster.webp`,
          `${baseUrl}/${basename}.poster.jpg`,
          `${baseUrl}/${basename}.poster.jpeg`,
          `${baseUrl}/${basename}.poster.png`,
        ];
        const posterPath = mediaType === "video" ? posterCandidates.find((candidate) => fileLookup.has(candidate)) : undefined;
        const poster = posterPath ? withVersion(posterPath) : undefined;

        return {
          src: shouldVersionSource ? withVersion(sourcePath) : sourcePath,
          alt: readableName || "Showcase work",
          mediaType,
          poster,
        };
      });
  } catch {
    return [];
  }
}

export default async function Home() {
  const writingPosts = await getAllWritingPosts();
  const featuredWritingPosts = getFeaturedWritingPosts(writingPosts, 6);
  const showcaseImages = await getShowcaseImages();

  // Inspired by the overall layout direction of onurhan.dev, rewritten using project-specific content/components.
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="pb-10">
          <nav className="flex flex-col items-start gap-7 text-sm" aria-label="Main navigation">
            <div className="flex w-full items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-base font-semibold tracking-tight">Sai Anjan</p>
                <p className="text-sm text-primary/80">Product Designer · AI + SaaS</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 rounded-none border border-primary/20 bg-background/80 px-1 py-1 backdrop-blur">
              <Link className="rounded-none px-2 py-1 text-[15px] font-medium text-primary" href="/">
                about
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="#wip">
                wip
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="#work">
                work
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="#projects">
                projects
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="/blog">
                blog
              </Link>
              <Link className="rounded-none px-2 py-1 text-[15px] opacity-70 hover:bg-white hover:opacity-100" href="#contact">
                contact
              </Link>
            </div>
          </nav>
        </header>

        <section className="space-y-6 pb-12">
          <p className="text-xl font-semibold tracking-tight">Hi, I&apos;m Anjan.</p>
          <p className="text-[15px] leading-relaxed text-foreground/85">
            I design AI-driven product experiences for enterprise and SaaS teams. My work spans from
            product direction to production-ready interaction systems.
          </p>
          <p className="text-[15px] leading-relaxed text-foreground/80">
            I care about practical outcomes: clarity in complex workflows, faster decision-making, and
            strong collaboration between product, design, and engineering.
          </p>
          <div className="space-y-3 border-l-2 border-primary/30 bg-background/70 px-4 py-3">
            <p className="text-sm text-foreground/75">Currently building a portfolio-native GPT experience.</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/resume">View Resume</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/gpt-mode">Open GPT Mode</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="wip" className="space-y-4 pb-12">
          <h2 className="text-base font-semibold tracking-tight text-primary">Work in progress</h2>
          <article className="space-y-3 rounded-md border border-primary/20 bg-background/85 p-4 transition-colors hover:bg-white">
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-primary/5"
                aria-hidden
              >
                <Coffee className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">BrewCircle</p>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="secondary">In development</Badge>
                </div>
                <p className="text-xs leading-relaxed text-foreground/75">
                  India&apos;s social network and marketplace for home coffee brewers — share brews, discover gear,
                  and connect with your local brewing community.
                </p>
              </div>
            </div>
            <p className="border-t border-primary/10 pt-3 text-xs text-foreground/60">
              <a
                href="https://brew-circle.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                View live MVP →
              </a>
              {" · "}
              Coffee DNA, marketplace, sessions &amp; community Q&amp;A
            </p>
          </article>
        </section>

        <section
          id="work"
          className="relative mb-12 w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]"
        >
          <WorkShowcaseGallery items={showcaseImages} />
        </section>

        <section id="projects" className="space-y-4 pb-12">
          <h2 className="text-base font-semibold tracking-tight text-primary">Projects</h2>
          <div className="space-y-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group flex items-center gap-3 rounded-md bg-background/85 p-2 transition-colors hover:bg-white"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-sm">
                  <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary">{project.title}</p>
                  <p className="line-clamp-2 text-xs text-foreground/70">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4 pb-12">
          <h2 className="text-base font-semibold tracking-tight text-primary">Latest Writing</h2>
          <div className="space-y-3">
            {featuredWritingPosts.map((post, index) => (
              <Link
                key={`${post.source}-${post.guid || index}`}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md bg-background/85 p-3 text-sm transition-colors hover:bg-white"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium capitalize text-foreground/80">
                    <WritingSourceLogo source={post.source} />
                    {post.source}
                  </span>
                  {post.pubDate && <p className="text-xs text-foreground/60">{formatDate(post.pubDate)}</p>}
                </div>
                <p className="font-medium">{post.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-3 pb-10">
          <h2 className="text-base font-semibold tracking-tight text-primary">Get in touch</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <a
              href="mailto:saianjan.margani@gmail.com"
              className="inline-flex items-center gap-1.5 border border-primary/20 bg-background/85 px-2.5 py-1 hover:bg-white"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
            <a
              href="https://github.com/saianjan"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/20 bg-background/85 px-2.5 py-1 hover:bg-white"
            >
              Github
            </a>
            <a
              href="https://x.com/Dhaathre"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/20 bg-background/85 px-2.5 py-1 hover:bg-white"
            >
              X / Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/saianjan/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/20 bg-background/85 px-2.5 py-1 hover:bg-white"
            >
              LinkedIn
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
