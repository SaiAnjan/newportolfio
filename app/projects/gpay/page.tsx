import Image from "next/image";

import { CaseStudyShell } from "@/components/case-study-shell";

export default function GpayPage() {
  return (
    <CaseStudyShell
      title="Google Pay + Wallet"
      subtitle="Driving wallet adoption in India by reducing trust friction and making spending behavior more visible."
      meta="2024 · Fintech UX · Consumer Payments"
    >
      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Context</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          UPI already offers fast, trusted transactions for Indian users. Introducing wallet behavior into that
          ecosystem requires clear value, simple setup, and confidence in control.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Challenge</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          The product had to fit existing UPI habits instead of forcing a new mental model. The focus was to reduce
          perceived complexity while improving day-to-day financial awareness.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Research Highlights</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Users trust direct bank-linked flows more than stored-wallet flows.</li>
          <li>Setup steps are often interpreted as risk, not convenience.</li>
          <li>People want quick spending visibility without heavy budgeting effort.</li>
          <li>Security cues strongly influence adoption decisions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Proposed Direction</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Low-friction onboarding with explicit trust checkpoints.</li>
          <li>Inline spending insights tied to real payment behavior.</li>
          <li>Wallet + UPI workflow continuity, not separate task paths.</li>
          <li>Strong security affordances with clear user feedback.</li>
        </ul>
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted/50">
          <Image src="/images/gpay.png" alt="Google Pay + Wallet overview" fill className="object-cover" />
        </div>
      </section>
    </CaseStudyShell>
  );
}
