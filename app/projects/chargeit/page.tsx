import { CaseStudyShell } from "@/components/case-study-shell";
import { ProjectMockupShowcase } from "@/components/project-mockup-showcase";

export default function ChargeitPage() {
  const chargeitHeaderMockups = [
    {
      type: "image" as const,
      src: "/images/ChargeIT/header-placeholders/placeholder.png",
      alt: "Chargeit mockup 1",
      context: "Header mockup 1",
    },
    {
      type: "image" as const,
      src: "/images/ChargeIT/header-placeholders/placeholder-1.png",
      alt: "Chargeit mockup 2",
      context: "Header mockup 2",
    },
    {
      type: "image" as const,
      src: "/images/ChargeIT/header-placeholders/placeholder-2.png",
      alt: "Chargeit mockup 3",
      context: "Header mockup 3",
    },
    {
      type: "image" as const,
      src: "/images/ChargeIT/header-placeholders/placeholder-3.png",
      alt: "Chargeit mockup 4",
      context: "Header mockup 4",
    },
    {
      type: "image" as const,
      src: "/images/ChargeIT/header-placeholders/placeholder-4.png",
      alt: "Chargeit mockup 5",
      context: "Header mockup 5",
    },
  ];

  return (
    <CaseStudyShell
      title="Chargeit"
      subtitle="Enterprise billing and payment workflows designed for scale, compliance, and operational clarity."
      meta="Mar 04, 2025"
      readTime="2 minutes"
      shareUrl="/projects/chargeit"
      headerMedia={<ProjectMockupShowcase items={chargeitHeaderMockups} />}
    >
      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Overview</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Chargeit is a payment operating layer for enterprise teams managing approvals, reconciliation, and
          high-value transaction workflows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Scope</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Payment workflow architecture for enterprise operators.</li>
          <li>Status visibility across transaction lifecycle and exception states.</li>
          <li>Safer decision paths for approvals and financial controls.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Note</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          This project contains NDA-protected details. A full walkthrough can be shared in private with appropriate
          context and permissions.
        </p>
      </section>
    </CaseStudyShell>
  );
}
