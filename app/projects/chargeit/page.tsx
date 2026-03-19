import Image from "@/components/preview-image";
import { CaseStudyShell } from "@/components/case-study-shell";

export default function ChargeitPage() {
  return (
    <CaseStudyShell
      title="Revolutionizing Subscription Management: A Case Study on User-Centric Plan Creation"
      subtitle="How I designed an end-to-end subscription management experience that helps enterprise teams launch new plans faster."
      meta="Mar 04, 2025"
      readTime="4 minutes"
      shareUrl="/projects/chargeit"
    >
      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Context</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Enterprise teams needed a faster way to create, configure, and launch subscription plans across currencies,
          billing cycles, and customer segments. The challenge was to reduce setup complexity while preserving control
          and compliance at every step of plan creation.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Overview</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Chargeit is a payment operating layer for enterprise teams managing approvals, reconciliation, and
          high-value transaction workflows. The subscription management module brings plan creation, pricing,
          entitlements, and lifecycle controls into one guided flow.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Pain Points</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Teams were forced to stitch together pricing, billing, and approvals in separate tools. The gaps created
          delays, rework, and inconsistent plan definitions across regions.
        </p>
        <div className="w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
          <div className="relative aspect-[12/5] w-full overflow-hidden bg-muted/20 sm:rounded-md">
            <Image
              src="/images/ChargeIT/pain_points.png"
              alt="Pain points in subscription plan creation"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Subscription Lifecycle Clarity</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          A clear lifecycle model was required to align sales, finance, and support teams. We mapped every state,
          from trial to renewal and churn, to ensure consistent triggers and reporting.
        </p>
        <div className="w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
          <div className="relative aspect-[3/1] w-full overflow-hidden bg-muted/20 sm:rounded-md">
            <Image
              src="/images/ChargeIT/Subscription_lifecycle.png"
              alt="Subscription lifecycle states"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">System Building Blocks</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Plan creation touches pricing, entitlements, billing cadence, tax rules, and compliance checks. We created
          a shared component map so teams could configure once and reuse safely.
        </p>
        <div className="w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
          <div className="mx-auto w-full max-w-4xl">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-muted/20 sm:rounded-md">
              <Image
                src="/images/ChargeIT/parts_of_sub_mgmt.png"
                alt="Key parts of subscription management"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Experience Flow</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          The flow keeps the operator in one place while surfacing the right configuration steps in sequence. Each
          step includes previews and validation so teams can launch with confidence.
        </p>
        <div className="w-screen max-w-none [margin-left:calc(50%-50vw)] [margin-right:calc(50%-50vw)]">
          <div className="relative aspect-[16/5] w-full overflow-hidden bg-muted/20 sm:rounded-md">
            <Image
              src="/images/ChargeIT/consumer_flow.png"
              alt="Subscription plan creation flow"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Design Principles</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Progressive disclosure to keep complex configuration manageable.</li>
          <li>Safe defaults with clear overrides for enterprise needs.</li>
          <li>Real-time validation to prevent costly billing errors.</li>
          <li>Fewer handoffs between sales, finance, and ops teams.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Impact</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Reduced time to launch new plans through a guided creation flow.</li>
          <li>Improved consistency in how plans are defined across regions.</li>
          <li>Higher confidence for operators through lifecycle visibility.</li>
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
