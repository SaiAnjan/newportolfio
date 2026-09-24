import {
  CaseStudyDeepDive,
  CaseStudyFigure,
  CaseStudyQuote,
  CaseStudySection,
  FlagshipCaseStudy,
} from "@/components/flagship-case-study";

const navigation = [
  { href: "#context", label: "Context" },
  { href: "#opportunity", label: "Opportunity" },
  { href: "#foundation", label: "Foundation" },
  { href: "#first-redesign", label: "First redesign" },
  { href: "#pricing", label: "Pricing system" },
  { href: "#compass", label: "Compass" },
  { href: "#reflection", label: "Looking back" },
];

const pricingModels = [
  { title: "Freemium", description: "Offer a basic service free and charge for premium capabilities or add-ons." },
  { title: "Flat rate", description: "Charge one fixed price independent of usage." },
  { title: "Pay per quantity", description: "Price by a known quantity such as seats or licences." },
  { title: "Per-unit", description: "Define a fixed price for each unit consumed." },
  { title: "Volume-based", description: "Change the unit price when usage reaches a volume threshold." },
  { title: "Tiered", description: "Calculate portions of usage across multiple price ranges." },
  { title: "Fixed + consumption", description: "Combine an included quota with metered overage." },
  { title: "Pay per active user", description: "Charge only for licences that were active in the billing period." },
] as const;

export default function ChargeitPage() {
  return (
    <FlagshipCaseStudy
      eyebrow="Jio ChargeIT · Enterprise product design"
      title="Revolutionizing Subscription Management"
      subtitle="How I redesigned plan creation and built a flexible pricing model for businesses launching prepaid and postpaid subscription offerings."
      summary="Jio already had an API-based subscription engine, but operators still needed a usable interface for configuring and managing the business around it. As the product's sole designer, I started with plan creation, turned a long form into a guided flow, and then expanded the pricing experience to support currencies, frequencies, usage units, and multiple billing models in one place."
      readTime="8 minutes"
      shareUrl="/projects/chargeit"
      navigation={navigation}
      facts={[
        { label: "Product", value: "Jio ChargeIT" },
        { label: "Role", value: "Sole product designer" },
        { label: "Focus", value: "Plan creation and pricing" },
        { label: "Inputs", value: "Secondary research and internal sales feedback" },
        { label: "Scope", value: "Prepaid and postpaid subscriptions" },
        { label: "Additional work", value: "Product identity and launch illustrations" },
      ]}
      hero={
        <CaseStudyFigure
          src="/images/projects/chargeit/hero.jpg"
          alt="Jio ChargeIT screens arranged around a laptop"
          caption="ChargeIT brought subscription configuration, pricing, customer management, and operational reporting into one product experience."
          aspect="aspect-[16/9]"
          fit="cover"
          priority
        />
      }
    >
      <CaseStudySection id="context" eyebrow="01 · Context" title="The engine worked. The product experience did not exist yet.">
        <p>
          Jio had already tested a subscription engine through APIs. It could run recurring cycles, but the graphical
          management layer was still at an early stage. The team had a basic form for creating and editing plans, while
          much of the remaining work was handled from the backend.
        </p>
        <p>
          That made plan creation the natural starting point. A plan is the foundation of a subscription business: it
          connects what is being sold to its billing frequency, currency, price, usage rules, and lifecycle. Improving
          this flow would also establish the interaction language for the rest of the product.
        </p>

        <CaseStudyFigure
          src="/images/projects/chargeit/legacy-plan-form.jpg"
          alt="The earlier form-based ChargeIT plan configuration interface"
          caption="The starting point exposed configuration as a long administrative form rather than a guided product workflow."
          aspect="aspect-[1200/682]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="opportunity" eyebrow="02 · Motivation" title="A billing error made the service problem tangible">
        <p>
          Around the same time, I was renting furniture after moving to Hyderabad. A delivery-management issue led to
          an incorrect recurring charge for three months. Support eventually resolved it, but the experience made the
          cost of weak subscription operations concrete: a small mismatch can persist through every billing cycle.
        </p>
        <p>
          This was a personal catalyst, not a substitute for user research. It helped me look beyond the plan-creation
          screen and frame ChargeIT as an operating layer for people who need to launch, change, price, and monitor
          subscription offerings without relying on backend intervention.
        </p>

        <CaseStudyQuote attribution="Design objective">
          Make complex subscription rules manageable without hiding the information operators need to compare and verify.
        </CaseStudyQuote>
      </CaseStudySection>

      <CaseStudySection id="foundation" eyebrow="03 · Product model" title="Plan creation had to carry the business logic">
        <p>
          The automated engine handled recurring cycles, but the surrounding decisions still belonged to account
          owners and administrators. They needed to describe the offer, choose how it would be billed, configure
          currencies and frequencies, and understand how those choices worked together before publishing it.
        </p>
        <p>
          I treated the plan as a composition of three layers: essential product information, advanced rules, and
          pricing. This reduced the apparent size of the task while preserving the depth required by an enterprise
          subscription system.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["Basic", "Name, product, plan type, and the information required to identify the offer."],
            ["Advanced", "Optional controls and business rules that should not block the initial setup."],
            ["Pricing", "Billing model, frequency, currency, usage unit, and the price the customer pays."],
          ].map(([title, description], index) => (
            <article key={title} className="rounded-lg bg-card p-4">
              <p className="text-xs font-medium text-foreground/45">0{index + 1}</p>
              <h3 className="mt-5 text-base font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{description}</p>
            </article>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection id="first-redesign" eyebrow="04 · First release" title="From one long form to a guided creation flow">
        <p>
          The first redesign grouped the work into Basic, Advanced, and Pricing steps. It was a pragmatic intervention:
          improve the most important workflow quickly, establish a new visual direction, and create a base that could
          absorb more sophisticated pricing later.
        </p>
        <p>
          Pricing was kept visible as a comparison surface. Frequencies and currencies appeared together, flags made
          enabled currencies easier to locate, and an operator could edit a price in context instead of opening another
          page for every variation.
        </p>

        <CaseStudyFigure
          src="/images/projects/chargeit/guided-plan-creation.png"
          alt="ChargeIT explorations showing the guided plan creation steps and pricing interactions"
          caption="The initial redesign broke the configuration into a sequence while keeping the resulting plan visible and editable."
          aspect="aspect-[1200/567]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="pricing" eyebrow="05 · Pricing system" title="One pricing screen could not assume one pricing model">
        <p>
          Secondary research and feedback from internal sales teams exposed the limitation of the first pricing
          direction. Supporting several currencies and billing frequencies was useful, but it did not cover how
          differently prepaid and postpaid businesses calculate value.
        </p>
        <p>
          I mapped the recurring models the product would need to express, then reduced the design problem to three
          decisions: start with prepaid or postpaid, let the business define its own unit of consumption, and keep the
          operator in one coherent workspace instead of creating a separate interface for every model.
        </p>

        <CaseStudyDeepDive title="Pricing models considered">
          <div className="grid gap-3 sm:grid-cols-2">
            {pricingModels.map((model) => (
              <div key={model.title}>
                <h3 className="font-medium text-foreground">{model.title}</h3>
                <p className="mt-1">{model.description}</p>
              </div>
            ))}
          </div>
        </CaseStudyDeepDive>

        <CaseStudyFigure
          src="/images/projects/chargeit/postpaid-plan-flow.png"
          alt="ChargeIT postpaid plan creation flow across product details, billing model, and pricing"
          caption="The postpaid flow introduced the billing model and usage logic without turning every variation into a separate product path."
          aspect="aspect-[1200/567]"
          wide
        />

        <p>
          The hardest interaction was editing ranges and tiers while preserving frequency and currency context. The
          pricing table became the common surface for defining ranges, comparing variants, and making changes without
          losing sight of the complete model.
        </p>

        <CaseStudyFigure
          src="/images/projects/chargeit/pricing-table-explorations.png"
          alt="Explorations for editing tiers, ranges, currencies, and frequencies in a ChargeIT pricing table"
          caption="Pricing-table explorations tested how tier boundaries and values could remain editable at scale."
          aspect="aspect-[1200/767]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="compass" eyebrow="06 · Concept exploration" title="The larger delay happened before anyone opened the pricing tool">
        <p>
          Conversations with internal sales colleagues showed that defining a pricing strategy could require competitor
          research, investment and margin inputs, revenue projections, and repeated stakeholder reviews. One colleague
          described spending close to two weeks researching and reviewing pricing approaches.
        </p>
        <p>
          That led to Compass, a pricing-assistance concept rather than a shipped feature. The idea was to use a
          generative system to organise those inputs, surface comparable market information, and help teams explore the
          implications of a model before configuring it in ChargeIT.
        </p>

        <CaseStudyFigure
          src="/images/projects/chargeit/compass-copilot.png"
          alt="Concept map and interface exploration for the Compass pricing copilot"
          caption="Compass reframed the opportunity from faster data entry to better support for the reasoning that precedes pricing configuration."
          aspect="aspect-[1201/352]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="reflection" eyebrow="07 · Looking back" title="What this work established">
        <p>
          ChargeIT taught me to design the simple path and the underlying system at the same time. Grouping the initial
          form created immediate clarity, but the deeper value came from identifying a stable model that could absorb
          prepaid, postpaid, metered, multi-currency, and multi-frequency configurations.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-lg bg-card p-4">
            <h3 className="font-medium text-foreground">Contribution</h3>
            <p className="mt-2 text-sm leading-6 text-foreground/68">
              Plan-creation architecture, pricing interactions, postpaid model exploration, product identity, and launch illustrations.
            </p>
          </article>
          <article className="rounded-lg bg-card p-4">
            <h3 className="font-medium text-foreground">Evidence boundary</h3>
            <p className="mt-2 text-sm leading-6 text-foreground/68">
              This case study documents the design rationale and finalised direction. It does not claim measured launch-time or revenue impact.
            </p>
          </article>
        </div>

        <CaseStudyFigure
          src="/images/projects/chargeit/product-logo.png"
          alt="Final Jio ChargeIT logo"
          caption="I also explored and designed the product identity. Icons used inside the product were created by the JioDesign Central team."
          aspect="aspect-[1200/780]"
        />

        <CaseStudyDeepDive title="Credits and collaboration">
          <ul className="list-disc space-y-2 pl-5">
            <li>The business team initiated the product and the API-based subscription engine.</li>
            <li>I was the sole designer responsible for clarifying the user-facing problem and designing the product experience.</li>
            <li>Product storylines were refined with the product team for the company-conference launch.</li>
            <li>Product-interface icons were created by the JioDesign Central team.</li>
          </ul>
        </CaseStudyDeepDive>
      </CaseStudySection>
    </FlagshipCaseStudy>
  );
}
