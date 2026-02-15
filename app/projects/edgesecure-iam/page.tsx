import { CaseStudyShell } from "@/components/case-study-shell";
import { Video } from "@/components/ui/video";

export default function EdgeSecureIamPage() {
  return (
    <CaseStudyShell
      title="EdgeNexus IAM"
      subtitle="Redesigning identity and access management for an enterprise edge cloud platform with a visual-first workflow."
      meta="Mar 18, 2025"
      readTime="5 minutes"
      shareUrl="/projects/edgesecure-iam"
    >
      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Project Overview</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Role: Lead UX Designer</li>
          <li>Timeline: 1 month sprint</li>
          <li>Platform: Enterprise edge cloud services</li>
          <li>Team: Product manager, engineering, UX</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Product Walkthrough</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Initial visual walkthrough of the EdgeNexus IAM flow. Final polished UI screens will be added in the next
          update.
        </p>
        <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/15">
          <Video src="/videos/iam1.mp4" controls playsInline preload="metadata" className="h-auto w-full border-0 bg-transparent" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Challenge</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          IAM is the first trust-critical workflow administrators touch on cloud platforms. We had to design the
          entire experience from scratch under aggressive timelines, while handling complex entities such as users,
          roles, policies, and permission hierarchies.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Limited domain familiarity in security-heavy workflows.</li>
          <li>Need for intuitive UX in high-stakes admin actions.</li>
          <li>Pressure to ship quickly without reducing quality.</li>
          <li>Clear differentiation from legacy IAM experiences.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Research & Discovery</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Competitive analysis across AWS IAM, Azure AD, and Google Cloud IAM revealed a common pattern:
          form-heavy, page-heavy workflows that hide relationships users actually care about.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Forms increased cognitive overhead for assignment tasks.</li>
          <li>Multi-step journeys slowed down everyday changes.</li>
          <li>Permission relationships were hard to understand at a glance.</li>
          <li>UI patterns did not match mental models of access flow.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Core User Flows</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          We mapped complete journeys for three admin modes: create, manage, and exception handling (deletion,
          detachment, conflict states).
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>User management: create users/groups, assign roles/policies, manage status states.</li>
          <li>Role management: define custom roles, attach policies, resolve inheritance conflicts.</li>
          <li>Batch actions: apply changes across multiple users or groups safely.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Design Direction</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Instead of legacy forms, we designed a visual canvas approach aligned to how admins reason about IAM:
          entities and relationships, not isolated fields.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Pill-based entity assignment for users, roles, and policies.</li>
          <li>Drag-and-drop relationship mapping for fast configuration.</li>
          <li>Visual clarity on who gets what access and through which path.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Key Innovation</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Permission creation moved from a 5-7 step, multi-page path to a compact 1-2 step, in-context workflow with
          immediate validation feedback.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Fewer navigation jumps and less context switching.</li>
          <li>Faster edits with clear visual confirmation.</li>
          <li>Reduced assignment errors in security-critical tasks.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Impact</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Created a clear product differentiator versus legacy IAM patterns.</li>
          <li>Delivered end-to-end IAM UX within an aggressive 1-month timeline.</li>
          <li>Improved speed and confidence for permission administration.</li>
          <li>Strengthened first-touch trust for enterprise platform onboarding.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold tracking-tight text-primary">Design Learnings</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-foreground/80 marker:text-foreground/50">
          <li>Industry standards should be analyzed, not copied blindly.</li>
          <li>Competitive research is a strategic input when domain context is thin.</li>
          <li>Mental-model-aligned UI dramatically improves enterprise usability.</li>
          <li>Strong constraints can sharpen innovation instead of limiting it.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold tracking-tight text-primary">Note</h2>
        <p className="text-[15px] leading-relaxed text-foreground/80">
          Final UI visuals and design screens for EdgeNexus IAM will be added once the production-ready assets are
          finalized.
        </p>
      </section>
    </CaseStudyShell>
  );
}
