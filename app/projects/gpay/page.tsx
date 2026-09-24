import {
  CaseStudyDeepDive,
  CaseStudyFigure,
  CaseStudyQuote,
  CaseStudySection,
  FlagshipCaseStudy,
} from "@/components/flagship-case-study";

const navigation = [
  { href: "#question", label: "Question" },
  { href: "#research", label: "Research" },
  { href: "#framework", label: "Framework" },
  { href: "#focus", label: "Focus" },
  { href: "#pockets", label: "Pockets" },
  { href: "#interactions", label: "Interactions" },
  { href: "#reflection", label: "Looking back" },
];

const opportunityAreas = [
  {
    title: "Save during spending",
    description: "Turn spare change from everyday payments into a lightweight contribution to a chosen goal.",
  },
  {
    title: "Spend with intent",
    description: "Use budget pockets to make category limits visible before and during a purchase.",
  },
  {
    title: "Understand afterwards",
    description: "Group transactions and reflect patterns back without requiring manual expense tracking.",
  },
  {
    title: "Store what matters",
    description: "Bring tickets, identity documents, and renewal reminders into the wider wallet model.",
  },
] as const;

export default function GpayPage() {
  return (
    <FlagshipCaseStudy
      eyebrow="Independent concept · Financial behaviour"
      title="Designing GPay + Wallet for Everyday Financial Habits"
      subtitle="How I explored savings pockets, round-ups, transaction grouping, and lightweight budgeting as a behaviour layer around familiar UPI payments."
      summary="Google Wallet's India launch raised a product question for me: what would make a wallet useful in a market where UPI already owns the payment habit? I studied the surrounding behaviours, mapped a broad opportunity space, and designed a focused concept that helps people save, spend, and reflect without leaving the GPay flow they already understand."
      readTime="8 minutes"
      shareUrl="/projects/gpay"
      navigation={navigation}
      facts={[
        { label: "Type", value: "Independent product concept" },
        { label: "Context", value: "India-focused GPay + Wallet exploration" },
        { label: "Focus", value: "Savings, spending, and transaction awareness" },
        { label: "Research", value: "Desk research, app observation, interview framework" },
        { label: "Output", value: "Mobile interaction and visual design flows" },
        { label: "Status", value: "Speculative; not affiliated with Google" },
      ]}
      hero={
        <CaseStudyFigure
          src="/images/gpay.png"
          alt="GPay Wallet and savings-pocket interface concept"
          caption="The concept adds wallet behaviour to GPay while preserving familiar payment entry points and visual language."
          aspect="aspect-[824/516]"
          fit="cover"
          priority
        />
      }
    >
      <CaseStudySection id="question" eyebrow="01 · Product question" title="Why add a wallet when UPI already works?">
        <p>
          Google Wallet arrived in India with passes, tickets, loyalty cards, and document integrations. Those are
          useful utilities, but they do not automatically create a reason to revisit the product every day. GPay, by
          contrast, already sits inside a frequent and well-understood payment behaviour.
        </p>
        <p>
          I used that tension as the starting point for an independent concept: rather than asking people to adopt
          another standalone destination, could Wallet become the layer that helps GPay users organise what happens
          before, during, and after a transaction?
        </p>

        <CaseStudyQuote attribution="Concept framing">
          The opportunity was not to replace UPI. It was to use familiar payments as the moment where a healthier financial habit could begin.
        </CaseStudyQuote>
      </CaseStudySection>

      <CaseStudySection id="research" eyebrow="02 · Exploration" title="Mapping the behaviours around a digital wallet">
        <p>
          The project began with desk research into UPI, low-value transactions, offline payment constraints, document
          storage, account aggregation, and digital-wallet patterns. I also reviewed the Google Wallet Android
          experience and compared its proposition with behaviours already supported by payment, commerce, cloud-storage,
          and loyalty applications.
        </p>
        <p>
          I drafted an interview guide around wallet use, document management, travel, security, rewards, personal
          finance, and micro-transactions. The source material does not contain a completed participant study, so this
          case study treats those questions as a research plan rather than presenting them as validated findings.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["Frequency", "Payments happen often; many wallet utilities are occasional."],
            ["Trust", "Money movement and personal documents demand explicit privacy and control."],
            ["Connectivity", "Small-value payments become most frustrating when the network is unreliable."],
            ["Effort", "Heavy budgeting tools ask people to maintain a second system after every transaction."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-lg bg-card p-4">
              <h3 className="font-medium text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{description}</p>
            </article>
          ))}
        </div>

        <CaseStudyDeepDive title="The broader opportunity map">
          <p>
            Early exploration also covered ticket sharing, loyalty programmes, identity documents, renewal reminders,
            digital keys, parking, family health records, recurring merchant accounts, work documents, and privacy-aware
            data sharing. These ideas helped map the territory, but the designed narrative below deliberately narrows to
            everyday financial behaviour.
          </p>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="framework" eyebrow="03 · Behaviour model" title="A wallet could connect payment fragments into a useful picture">
        <p>
          A bank can see only the transactions that pass through its account. A payment application sees another slice,
          and cash remains outside both. The concept positioned Wallet as a place where a user could deliberately bring
          these fragments together, then direct money into small purpose-built pockets.
        </p>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/financial-behaviour-model.jpg"
          alt="Diagram contrasting fragmented payment visibility with a wallet that organises transactions into pockets"
          caption="The working model connected transaction awareness with personal pockets for saving and spending."
          aspect="aspect-[1200/658]"
          wide
        />

        <p>
          I separated pockets into two intentions. Savings pockets protect progress toward a goal. Budget pockets make a
          spending allowance visible and available at the moment of payment. The same model can support individual or
          shared goals without turning the wallet into a full accounting product.
        </p>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/pockets-framework.png"
          alt="Framework comparing savings and budget pockets before, during, and after payment"
          caption="Designing across the payment timeline made each pocket useful at the point where a decision occurs."
          aspect="aspect-[1200/454]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="focus" eyebrow="04 · Synthesis" title="Four opportunities formed one coherent direction">
        <div className="grid gap-3 sm:grid-cols-2">
          {opportunityAreas.map((area, index) => (
            <article key={area.title} className="rounded-lg bg-card p-4">
              <p className="text-xs font-medium text-foreground/45">0{index + 1}</p>
              <h3 className="mt-4 text-base font-medium text-foreground">{area.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{area.description}</p>
            </article>
          ))}
        </div>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/gpay-home.png"
          alt="Two GPay home-page concepts introducing Wallet and mindful savings goals"
          caption="Wallet is introduced from the existing GPay home rather than positioned as a separate mental model."
          aspect="aspect-[915/1101]"
        />
      </CaseStudySection>

      <CaseStudySection id="pockets" eyebrow="05 · Product structure" title="Pockets made goals available inside the payment flow">
        <p>
          The Wallet area organises savings pockets, tickets, identity documents, and tracked orders, then gives goals
          their own balance, progress, funding controls, and transaction history. A user can keep personal goals or
          contribute to a group pocket without mixing every purpose into the account balance.
        </p>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/wallet-structure.png"
          alt="GPay Wallet concepts for category navigation, a savings goal, and personal and group pockets"
          caption="The structure moves from a utility list to goal progress and finally to a visual pocket overview."
          aspect="aspect-[1200/849]"
          wide
        />

        <p>
          Pockets can also become payment sources. The selection sheet keeps bank accounts and wallet pockets in the
          same payment decision, so a budget is not a report checked later; it is an available balance when the user is
          about to buy.
        </p>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/pay-with-pockets.png"
          alt="Ecommerce checkout flow switching the payment source from a bank account to a shopping pocket"
          caption="A shopping pocket appears alongside existing bank accounts and remains switchable within the familiar checkout sheet."
          aspect="aspect-[1200/584]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="interactions" eyebrow="06 · Interaction design" title="Small interventions support the habit without taking over the payment">
        <p>
          The round-up interaction appears after a successful payment, when the amount and recipient are already clear.
          A user can save the difference immediately, choose a destination pocket, or allow spare change to accumulate
          before moving it. A second exploration places the choice before payment for people who prefer to decide the
          amount themselves.
        </p>

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/save-change-flow.png"
          alt="Post-payment flow for saving rounded spare change into a selected GPay pocket"
          caption="Save Change extends the completed-payment moment without obscuring confirmation of the original transfer."
          aspect="aspect-[1200/418]"
          wide
        />

        <CaseStudyFigure
          src="/images/projects/gpay-wallet/spare-change-payment.png"
          alt="UPI payment flow that adds a chosen spare-change amount before PIN confirmation"
          caption="The pre-payment alternative keeps the contribution explicit and tied to the account used for the transaction."
          aspect="aspect-[1200/903]"
          wide
        />

        <p>
          After payment, the same system can group repeated transactions into meaningful categories and turn those
          groups into budget pockets. This avoids asking users to categorise every line manually before the product can
          show anything useful.
        </p>

        <div className="grid gap-4 lg:-mx-24 lg:grid-cols-2">
          <CaseStudyFigure
            src="/images/projects/gpay-wallet/transaction-grouping.png"
            alt="GPay transaction history being grouped into food, travel, and other categories"
            caption="A swipe action starts grouping; the result remains editable in the transaction list."
            aspect="aspect-[1200/945]"
          />
          <CaseStudyFigure
            src="/images/projects/gpay-wallet/budgeting.png"
            alt="GPay budgeting concepts showing category balances and daily activity"
            caption="Category balances sit beside recent activity rather than becoming a separate finance dashboard."
            aspect="aspect-[1200/551]"
          />
        </div>

        <CaseStudyDeepDive title="A year-end reflection concept">
          <p>
            I also explored a story-like annual review that turns transaction data into an approachable summary of
            opening balance, closing balance, and memorable spending categories. It was an expressive concept, not a
            validated feature direction.
          </p>
          <CaseStudyFigure
            src="/images/projects/gpay-wallet/year-in-review.png"
            alt="Four story-style screens summarising annual spending and balances"
            caption="A playful review could make financial reflection more approachable, but its tone would need careful validation."
            aspect="aspect-[1200/743]"
          />
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="reflection" eyebrow="07 · Looking back" title="The strongest idea was continuity, not another finance app">
        <p>
          The exploration began too broadly. Tickets, documents, loyalty, identity, AI assistance, and payment all fit
          the word “wallet,” but combining them does not automatically produce a coherent product. The sharper direction
          came from choosing one repeated behaviour and designing around its timeline.
        </p>
        <p>
          Looking back, I would validate the pocket model with people who already use UPI Lite, recurring savings, and
          manual expense tracking; test whether round-ups feel motivating or intrusive; and work through consent,
          account custody, withdrawal, failure, and privacy states before treating the concept as viable financial
          functionality.
        </p>

        <div className="rounded-lg border-l-2 border-foreground/20 bg-card px-5 py-4">
          <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Evidence boundary</p>
          <p className="mt-3 text-sm leading-6 text-foreground/75">
            This is an independent concept study. It was not commissioned by Google, does not represent a shipped
            product, and does not claim tested adoption or behavioural impact.
          </p>
        </div>
      </CaseStudySection>
    </FlagshipCaseStudy>
  );
}
