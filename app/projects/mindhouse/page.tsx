import Image from "next/image";

import { CaseStudyShell } from "@/components/case-study-shell";

export default function MindhousePage() {
  return (
    <CaseStudyShell
      title="Mindhouse Live Class Discovery"
      subtitle="Reworking class filtering so users can find and book relevant sessions faster."
      meta="2023 · Wellness Product · Interaction Design"
    >
      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Context</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Mindhouse offers a high volume of daily sessions across formats and instructors. Users needed faster ways
          to narrow options without losing context while booking.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Problem</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Filters were hidden behind extra steps and fragmented controls.</li>
          <li>Scheduling choices were harder to compare in a single flow.</li>
          <li>Instructor and timing preferences were not easy to combine.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Design Direction</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          The redesign focused on visible filtering controls, clearer time grouping, and a tighter booking flow that
          keeps key choices in one place.
        </p>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/50">
          <Image src="/images/mindhouse.png" alt="Mindhouse redesign preview" fill className="object-cover" />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Outcome</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          The new structure improves scanability and reduces decision effort by making class type, instructor, and
          time selection easier to combine in a single interaction path.
        </p>
      </section>
    </CaseStudyShell>
  );
}
