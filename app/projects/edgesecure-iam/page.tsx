import {
  CaseStudyDeepDive,
  CaseStudyFigure,
  CaseStudyQuote,
  CaseStudySection,
  FlagshipCaseStudy,
} from "@/components/flagship-case-study";
import { Video } from "@/components/ui/video";

const navigation = [
  { href: "#brief", label: "Brief" },
  { href: "#scope", label: "Scope" },
  { href: "#model", label: "IAM model" },
  { href: "#access", label: "Access flow" },
  { href: "#walkthrough", label: "Walkthrough" },
  { href: "#platform", label: "Platform system" },
  { href: "#reflection", label: "Looking back" },
];

const workstreams = [
  {
    title: "Identity and access",
    description: "Journeys and interfaces for users, groups, roles, policies, permissions, and access levels.",
  },
  {
    title: "Operations dashboard",
    description: "Data-visualisation studies for infrastructure health, usage, incidents, and operational activity.",
  },
  {
    title: "Brand and marketing",
    description: "Product identity, brand applications, marketing imagery, and a launch-oriented product video.",
  },
] as const;

export default function EdgeSecureIamPage() {
  return (
    <FlagshipCaseStudy
      eyebrow="Jio Edge Cloud Services · Enterprise platform"
      title="Designing Jio Edge Cloud Services"
      subtitle="How I owned the experience across identity and access management, operational data visualisation, and product identity for an enterprise edge-cloud platform."
      summary="Jio Edge Cloud Services was a four-month design engagement spanning product UX and market-facing communication. The central product challenge was IAM: turning the relationships between users, groups, roles, policies, permissions, services, and locations into workflows an administrator could inspect and configure."
      readTime="7 minutes"
      shareUrl="/projects/edgesecure-iam"
      navigation={navigation}
      facts={[
        { label: "Client", value: "Jio Edge Cloud Services" },
        { label: "Role", value: "Design owner" },
        { label: "Responsibilities", value: "UX, flows, research, marketing, branding" },
        { label: "Industry", value: "Cloud services and 5G" },
        { label: "Period", value: "January 2024" },
        { label: "Timeline", value: "4 months" },
      ]}
      hero={
        <CaseStudyFigure
          src="/images/projects/jio-edge-cloud/create-access.jpg"
          alt="Create New Access workflow in Jio Edge Cloud Services"
          caption="The access pipeline connects user details, permissions, and access levels in one guided configuration."
          aspect="aspect-[1200/821]"
          priority
        />
      }
    >
      <CaseStudySection id="brief" eyebrow="01 · Brief" title="One product needed both operational clarity and a credible identity">
        <p>
          The engagement covered the experience of an enterprise edge-cloud platform and the material used to explain
          it. My role combined design ownership, UX flows, research, data visualisation, marketing, and branding over a
          four-month period beginning in January 2024.
        </p>
        <p>
          IAM became the deepest product workstream because every administrative action depends on understanding who
          receives access, through which role or policy, and at what level of the infrastructure. The work therefore
          started with relationships and journeys rather than isolated screens.
        </p>

        <CaseStudyQuote attribution="Design focus">
          Make access relationships visible enough to configure, review, and change without losing the surrounding context.
        </CaseStudyQuote>
      </CaseStudySection>

      <CaseStudySection id="scope" eyebrow="02 · Scope" title="Three connected workstreams shaped the platform">
        <div className="grid gap-3 sm:grid-cols-3">
          {workstreams.map((workstream, index) => (
            <article key={workstream.title} className="rounded-lg bg-card p-4">
              <p className="text-xs font-medium text-foreground/45">0{index + 1}</p>
              <h3 className="mt-5 text-base font-medium text-foreground">{workstream.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{workstream.description}</p>
            </article>
          ))}
        </div>
        <p>
          Keeping these workstreams connected mattered. The product interface established how the service behaved; the
          operational dashboard showed what it was doing; and the identity gave teams a consistent way to present it.
        </p>
      </CaseStudySection>

      <CaseStudySection id="model" eyebrow="03 · Journey architecture" title="Mapping IAM as a network of dependent objects">
        <p>
          I created end-to-end journey maps for users, roles, user groups, and policies. The maps followed creation,
          assignment, editing, and pending states across the system, revealing where one object depended on another and
          where an administrator needed context before proceeding.
        </p>

        <CaseStudyFigure
          src="/images/projects/jio-edge-cloud/iam-journey-map.png"
          alt="Extensive IAM journey map connecting users, roles, groups, policies, and pending flows"
          caption="The journey map uses orange to mark items that were still pending when the artefact was created."
          aspect="aspect-[1200/980]"
          wide
        />

        <p>
          This model informed both navigation and interaction. Instead of treating a role, policy, or user as a closed
          record, the interface keeps assignments and inherited relationships close to the object being managed.
        </p>
      </CaseStudySection>

      <CaseStudySection id="access" eyebrow="04 · Core workflow" title="A guided pipeline for creating and assigning access">
        <p>
          The Create New Access flow separates identity details from permissions and access level, while keeping the
          sequence visible. Permissions can be assembled from services, projects, locations, and other platform entities,
          then reviewed before the access definition is applied.
        </p>

        <CaseStudyFigure
          src="/images/projects/jio-edge-cloud/access-management.png"
          alt="Users and Access Management table with actions for assigning policy, roles, and groups"
          caption="The management view keeps status, current assignments, last login, access links, and common actions together."
          aspect="aspect-[1200/819]"
          wide
        />

        <p>
          Assignment stays contextual. A policy can be reviewed against the selected user and filtered before it is
          applied. The same entity language is reused when creating access, assigning policies, and reviewing an
          existing machine or account.
        </p>

        <div className="grid gap-4 lg:-mx-24 lg:grid-cols-2">
          <CaseStudyFigure
            src="/images/projects/jio-edge-cloud/assign-policy.png"
            alt="Assign Policy panel listing policies, services, permissions, locations, and projects"
            caption="Policy assignment keeps the affected user and each policy's scope visible."
            aspect="aspect-[912/803]"
          />
          <CaseStudyFigure
            src="/images/projects/jio-edge-cloud/entity-relationships.png"
            alt="Entity details showing users, roles, and groups associated with a machine"
            caption="Entity pages surface relationships directly instead of hiding them behind separate lookup flows."
            aspect="aspect-[1200/819]"
          />
        </div>
      </CaseStudySection>

      <CaseStudySection id="walkthrough" eyebrow="05 · Interaction" title="The access flow in motion">
        <p>
          The prototype below demonstrates the IAM pipeline for creating roles and permissions. It is included as a
          product walkthrough rather than evidence of measured task performance.
        </p>

        <figure className="space-y-3 py-2 lg:-mx-24 lg:w-[calc(100%+12rem)]">
          <div className="overflow-hidden rounded-xl bg-black">
            <Video
              src="/videos/iam1.mp4"
              controls
              playsInline
              preload="metadata"
              className="h-auto w-full border-0 bg-transparent"
            />
          </div>
          <figcaption className="text-xs leading-relaxed text-foreground/55">
            IAM prototype walkthrough showing how access definitions move through details, permissions, and access level.
          </figcaption>
        </figure>
      </CaseStudySection>

      <CaseStudySection id="platform" eyebrow="06 · System expression" title="Extending the same product thinking beyond IAM">
        <p>
          IAM was one part of the engagement. I also explored how operational information could be organised into a
          dashboard and how the service should present itself in product, launch, and marketing contexts.
        </p>

        <CaseStudyFigure
          src="/images/projects/jio-edge-cloud/operations-dashboard.png"
          alt="Long-form Jio Edge Cloud operations dashboard with infrastructure and activity visualisations"
          caption="The operations work assembled infrastructure health, usage, incidents, activity, and tabular detail into a single monitoring surface."
          aspect="aspect-[1200/2826]"
          wide
        />

        <CaseStudyDeepDive title="Branding and marketing system">
          <div className="space-y-4">
            <p>
              The visual-identity work included the product mark, brand applications, generated marketing explorations,
              and a product video created in Keynote. Logo motion was explored in Jitter and Figma.
            </p>
            <CaseStudyFigure
              src="/images/projects/jio-edge-cloud/brand-system.jpg"
              alt="Jio Edge Cloud brand applications across devices, apparel, cards, and promotional material"
              caption="Brand applications tested how the identity could remain recognisable across physical and digital touchpoints."
              aspect="aspect-[1200/803]"
            />
            <CaseStudyFigure
              src="/images/projects/jio-edge-cloud/product-logo.png"
              alt="Jio Edge Cloud product logo"
              caption="The final mark combines a cloud silhouette with a sparkle motif inside a circular blue field."
              aspect="aspect-[761/284]"
            />
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="reflection" eyebrow="07 · Looking back" title="The architecture is the strongest evidence">
        <p>
          The most durable part of this work is not a single screen. It is the model connecting people, groups, roles,
          policies, permissions, services, and access levels across the platform. Once those relationships were explicit,
          the interface could reuse the same language in creation, assignment, and review.
        </p>
        <p>
          Looking back, I would add task-based evaluation with cloud administrators, test high-risk recovery and bulk
          changes, document the source and freshness of every operational metric, and validate the product story with
          both technical buyers and day-to-day operators.
        </p>

        <div className="rounded-lg border-l-2 border-foreground/20 bg-card px-5 py-4">
          <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Evidence boundary</p>
          <p className="mt-3 text-sm leading-6 text-foreground/75">
            The available artefacts document design ownership, scope, workflows, and visual output. They do not provide
            measured usability results or production impact, so this case study does not claim either.
          </p>
        </div>
      </CaseStudySection>
    </FlagshipCaseStudy>
  );
}
