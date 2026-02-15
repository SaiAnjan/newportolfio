import Image from "next/image";

import { CaseStudyShell } from "@/components/case-study-shell";

export default function ChargeitPage() {
  return (
    <CaseStudyShell
      title="Chargeit"
      subtitle="Enterprise billing and payment workflows designed for scale, compliance, and operational clarity."
      meta="Mar 04, 2025"
      readTime="2 minutes"
      shareUrl="/projects/chargeit"
    >
      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Overview</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Chargeit is a payment operating layer for enterprise teams managing approvals, reconciliation, and
          high-value transaction workflows.
        </p>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/50">
          <Image src="/images/ChargeIT/Thumbnail.png" alt="Chargeit project preview" fill className="object-cover" />
        </div>
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
