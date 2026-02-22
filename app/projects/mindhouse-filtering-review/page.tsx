import Link from "next/link";

import { CaseStudyShell } from "@/components/case-study-shell";
import Image from "@/components/preview-image";

type ComparisonItem = {
  title: string;
  oldSrc: string;
  newSrc: string;
  oldNote: string;
  newNote: string;
};

const comparisonItems: ComparisonItem[] = [
  {
    title: "Booking Overview",
    oldSrc: "/images/mindhouse/old_book.png",
    newSrc: "/images/mindhouse/new_book.png",
    oldNote: "Users needed more scanning effort before finding a suitable class.",
    newNote: "Information hierarchy is tighter, so key decisions surface earlier.",
  },
  {
    title: "Filter Entry Point",
    oldSrc: "/images/mindhouse/filters-old.png",
    newSrc: "/images/mindhouse/filters-new.png",
    oldNote: "Filter access was less discoverable in the class list flow.",
    newNote: "Filter entry is more direct and easier to reach repeatedly.",
  },
  {
    title: "Date Selection",
    oldSrc: "/images/mindhouse/date-old.png",
    newSrc: "/images/mindhouse/date-new.png",
    oldNote: "Date switching created extra friction while browsing sessions.",
    newNote: "Date controls are clearer, helping users jump days faster.",
  },
  {
    title: "Time Selection",
    oldSrc: "/images/mindhouse/time-old.png",
    newSrc: "/images/mindhouse/time-new.png",
    oldNote: "Time filtering needed more taps to narrow results.",
    newNote: "Time buckets are easier to scan and apply in one pass.",
  },
  {
    title: "Class Type Visibility",
    oldSrc: "/images/mindhouse/class-old.png",
    newSrc: "/images/mindhouse/class-new.png",
    oldNote: "Class-type differentiation was harder to compare quickly.",
    newNote: "Class-type options are grouped with better visual clarity.",
  },
  {
    title: "Instructor Selection",
    oldSrc: "/images/mindhouse/instructor-old.png",
    newSrc: "/images/mindhouse/instructor-new.png",
    oldNote: "Instructor preference was less explicit in the filtering flow.",
    newNote: "Instructor choice is clearer for repeat learners and favorites.",
  },
  {
    title: "Favourites Flow",
    oldSrc: "/images/mindhouse/favourites-old.png",
    newSrc: "/images/mindhouse/favourites-new.png",
    oldNote: "Saved preferences were not as easy to use while deciding quickly.",
    newNote: "Favourites are easier to apply and revisit during booking.",
  },
  {
    title: "Booked State",
    oldSrc: "/images/mindhouse/booked-old.png",
    newSrc: "/images/mindhouse/booked-new.png",
    oldNote: "Previously booked classes had weaker state clarity in the list.",
    newNote: "Booked-state visibility improves confidence before final selection.",
  },
  {
    title: "Mini-Class Context",
    oldSrc: "/images/mindhouse/mini-old.png",
    newSrc: "/images/mindhouse/mini-new.png",
    oldNote: "Mini classes were less distinguishable inside long class streams.",
    newNote: "Mini class options are easier to identify and compare.",
  },
];

function ComparisonBlock({ item }: { item: ComparisonItem }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold tracking-tight text-primary">{item.title}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <article className="space-y-2 rounded-md bg-background/85 p-3">
          <p className="text-xs font-medium tracking-wide text-foreground/55 uppercase">Before</p>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted/30">
            <Image src={item.oldSrc} alt={`${item.title} before redesign`} fill className="object-cover" />
          </div>
          <p className="text-sm leading-relaxed text-foreground/75">{item.oldNote}</p>
        </article>

        <article className="space-y-2 rounded-md bg-background/85 p-3">
          <p className="text-xs font-medium tracking-wide text-foreground/55 uppercase">After</p>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted/30">
            <Image src={item.newSrc} alt={`${item.title} after redesign`} fill className="object-cover" />
          </div>
          <p className="text-sm leading-relaxed text-foreground/75">{item.newNote}</p>
        </article>
      </div>
    </section>
  );
}

export default function MindhouseFilteringReviewPage() {
  return (
    <CaseStudyShell
      title="Mindhouse Filtering Redesign (Review)"
      subtitle="Recovered, image-by-image before/after walkthrough for reviewing the class filtering redesign."
      meta="Mindhouse · Review Draft"
      readTime="6 minutes"
      shareUrl="/projects/mindhouse-filtering-review"
    >
      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Review Scope</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          This page is a separate draft review of the filtering redesign. The current live Mindhouse page remains unchanged.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="/projects/mindhouse"
            className="inline-flex items-center border border-border/70 bg-background px-2.5 py-1 text-foreground/80 hover:bg-white"
          >
            Open Current Mindhouse Page
          </Link>
        </div>
      </section>

      {comparisonItems.map((item) => (
        <ComparisonBlock key={item.title} item={item} />
      ))}
    </CaseStudyShell>
  );
}
