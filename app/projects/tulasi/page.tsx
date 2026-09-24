import {
  CaseStudyDeepDive,
  CaseStudyFigure,
  CaseStudyQuote,
  CaseStudySection,
  FlagshipCaseStudy,
} from "@/components/flagship-case-study";

const researchThemes = [
  {
    title: "Autonomy",
    description: "Passengers needed self-service access beyond the station entrance and its enquiry queue.",
  },
  {
    title: "Active conversation",
    description: "Existing chatbots returned answers but rarely helped people refine incomplete questions.",
  },
  {
    title: "Orientation",
    description: "People did not know which official or third-party service handled each kind of information.",
  },
  {
    title: "Governance",
    description: "Railway information was distributed across staff systems, displays, official services, and apps.",
  },
  {
    title: "Process",
    description: "Planning a journey required passengers to interpret options instead of simply stating their goal.",
  },
] as const;

const dialogueModel = [
  "Intent and alternative ways to invoke it",
  "Context carried between turns",
  "Implicit confirmation",
  "Explicit confirmation for low-confidence input",
  "Conversational markers and progress",
  "Error handling and recovery",
] as const;

const evaluationFindings = [
  "Participants generally saw value in the concept, especially for parents and people who benefit from voice.",
  "Voice reduced typing, but visual feedback remained important for reviewing railway details.",
  "The conversation felt natural to some participants and choppy to others.",
  "Repeated confirmations needed different phrasing instead of repeating the same prompt.",
  "Advice was meaningful inside the prototype's narrow scope, but users understood that it could not answer every query.",
  "The transition from Google Assistant to a specialised railway agent was confusing.",
  "Four of seven participants raised issues with Hindi speech and English or alphanumeric display content.",
] as const;

const navigation = [
  { href: "#context", label: "Context" },
  { href: "#research", label: "Research" },
  { href: "#synthesis", label: "Synthesis" },
  { href: "#architecture", label: "Architecture" },
  { href: "#dialogue", label: "Dialogue design" },
  { href: "#prototype", label: "Prototype" },
  { href: "#evaluation", label: "Evaluation" },
  { href: "#iteration", label: "Iteration" },
  { href: "#reflection", label: "Looking back" },
];

export default function TulasiPage() {
  return (
    <FlagshipCaseStudy
      eyebrow="Tulasi · Conversation design"
      title="Designing a Conversational Railway Enquiry"
      subtitle="How I translated real passenger-staff conversations at Mumbai CSMT into a multilingual, multimodal self-service agent for railway information."
      summary="Railway information was split across enquiry staff, station displays, official services, and dozens of mobile applications. I mapped this service ecosystem, studied real enquiry conversations, designed Tulasi's dialogue system, and evaluated a Hindi conversational prototype with seven participants."
      readTime="9 minutes"
      shareUrl="/projects/tulasi"
      navigation={navigation}
      facts={[
        { label: "Context", value: "M.Des Interaction Design, IIT Bombay" },
        { label: "Project", value: "Individual academic thesis, Project III" },
        { label: "Year", value: "2020" },
        { label: "Guide", value: "Prof. Ravi Poovaiah" },
        { label: "Research", value: "Station observation, staff interviews, 3 passenger interviews, 5-person card sort" },
        { label: "Evaluation", value: "7 Android users" },
        { label: "Original title", value: "A conversational design approach to railway enquiry for Mumbai CSMT" },
      ]}
      hero={
        <CaseStudyFigure
          src="/images/P3/cover.png"
          alt="Tulasi conversational railway enquiry shown across five mobile screens"
          caption="Tulasi combined spoken dialogue with visual train, ticket, payment, and reminder cards."
          aspect="aspect-[947/351]"
          fit="cover"
          priority
        />
      }
    >
      <CaseStudySection id="context" eyebrow="01 · Context" title="Railway enquiry was a service ecosystem, not a screen">
        <p>
          In 2020, passengers pieced railway information together from enquiry staff, station displays, official
          services, and third-party applications. Each source covered only part of the journey. Enquiry counters remained
          trusted because they combined live information with a staff member&apos;s judgment, but queues made that help
          difficult to access when passengers were in a hurry.
        </p>
        <p>
          Displays could show arrivals, departures, platform numbers, or coach positions, but passengers still had to
          find the right display and interpret it. Mobile services helped with advance planning, yet the information was
          fragmented and people often returned to staff for an immediate answer on the station.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/app-ecosystem.webp"
          alt="A large set of railway-related mobile applications found during the 2020 competitive review"
          caption="A 2020 Play Store review revealed a crowded ecosystem of partially overlapping railway services rather than one clear source for enquiry."
          aspect="aspect-[76/43]"
          wide
        />

        <CaseStudyQuote attribution="Project framing">
          The opportunity was not another chatbot. It was a clearer way to coordinate railway information around a
          passenger&apos;s question.
        </CaseStudyQuote>
      </CaseStudySection>

      <CaseStudySection id="research" eyebrow="02 · Field research" title="Following the enquiry from counter to passenger">
        <p>
          I observed how the enquiry counter worked at Vijayawada Junction and interviewed enquiry staff at Mumbai CSMT.
          The staff used a railway enquiry system with approximately 30 categories, moving between live train
          information, reservation status, fares, platform information, and other station services according to the
          passenger&apos;s question.
        </p>
        <p>
          I also documented station displays, coach-position systems, navigation maps, and ticketing machines, then
          interviewed three passengers about planning, station enquiry, mobile applications, payment, and assistance
          from family members.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/station-research.webp"
          alt="Railway arrival displays and self-ticketing machines documented during station research"
          caption="The station already contained many information surfaces. The gap was helping a passenger locate, combine, and act on the right information."
          aspect="aspect-[92/33]"
          wide
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <article className="rounded-lg bg-card p-4">
            <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Staff pattern</p>
            <p className="mt-3 text-sm leading-6 text-foreground/72">
              Frequently asked questions repeated, but passengers phrased the same intent in many different ways.
            </p>
          </article>
          <article className="rounded-lg bg-card p-4">
            <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Passenger pattern</p>
            <p className="mt-3 text-sm leading-6 text-foreground/72">
              Queue pressure, digital-payment barriers, and unfamiliar apps often made family members or staff part of
              the interaction.
            </p>
          </article>
        </div>

        <CaseStudyDeepDive title="Station ecosystem and 2020 competitor review">
          <div className="space-y-4">
            <p>
              The review covered IRCTC Rail Connect, Ask DISHA, NTES, Where Is My Train, Ixigo, station displays,
              coach-position boards, station maps, and self-ticketing machines.
            </p>
            <p>
              Applications supported planning and booking, while the counter remained the most legible source for live,
              contextual questions. The project therefore focused on supporting the enquiry service rather than replacing
              every railway interface.
            </p>
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="synthesis" eyebrow="03 · Synthesis" title="Five themes defined the opportunity">
        <div className="grid gap-3 sm:grid-cols-2">
          {researchThemes.map((theme, index) => (
            <article key={theme.title} className="rounded-lg bg-card p-4 last:sm:col-span-2">
              <p className="text-xs font-medium text-foreground/45">0{index + 1}</p>
              <h3 className="mt-4 text-base font-medium text-foreground">{theme.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{theme.description}</p>
            </article>
          ))}
        </div>

        <div className="rounded-lg border-l-2 border-foreground/20 bg-card px-5 py-4">
          <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Design objective</p>
          <p className="mt-3 text-base leading-relaxed text-foreground/82">
            Create a self-service railway enquiry that uses authoritative station information, supports the enquiry staff
            rather than replacing them, and works through voice, touch, and text.
          </p>
        </div>

        <CaseStudyFigure
          src="/images/projects/tulasi/service-concept.webp"
          alt="Diagram combining a self-service kiosk, cloud service, and conversational agent"
          caption="Tulasi was conceived as one conversation model that could serve a station kiosk and personal mobile devices."
          aspect="aspect-[29/13]"
        />
      </CaseStudySection>

      <CaseStudySection id="architecture" eyebrow="04 · Service definition" title="Turning railway information into an architecture">
        <p>
          A remote card sort with five users grouped the enquiry system into reservation, booking and cancellation,
          station amenities, destination and fare, train arrivals, and booking status. The first prototype narrowed this
          system to trains to destination, platform number, arrivals and departures, delays, reservation, and fare.
        </p>
        <p>
          Those categories became more than navigation. They provided the foundation for intents, alternative
          utterances, conversation states, error handling, and the visual cards shown during the exchange.
        </p>

        <CaseStudyFigure
          src="/images/P3/process.png"
          alt="Process diagram connecting recorded enquiries to intents, conversation flow, Dialogflow, Google Assistant, and evaluation"
          caption="The working loop moved from real enquiry conversations to intents and flows, then into a deployed prototype and back through unhandled utterances discovered in evaluation."
          aspect="aspect-[1381/783]"
          wide
        />

        <CaseStudyDeepDive title="Full information architecture">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-foreground">Reservation and booking</h3>
              <p className="mt-1">Availability, waiting lists, berth types, cancellations, duplicate allotments, and current booking.</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground">Station and journey</h3>
              <p className="mt-1">Amenities, platform and coach position, destinations, fares, timetables, arrivals, and train status.</p>
            </div>
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="dialogue" eyebrow="05 · Conversation design" title="Designing from real conversations">
        <p>
          With permission from Central Railway, I used recorded enquiry-counter exchanges to study how passengers
          actually asked for information. The dialogue model documented the intent, the many ways it could be invoked,
          what context needed to survive between turns, and how Tulasi should confirm or repair an uncertain exchange.
        </p>

        <ul className="grid gap-2 sm:grid-cols-2">
          {dialogueModel.map((item) => (
            <li key={item} className="rounded-lg bg-card px-4 py-3 text-sm leading-6 text-foreground/72">
              {item}
            </li>
          ))}
        </ul>

        <div className="space-y-3 rounded-lg bg-card p-5">
          <p className="text-xs font-medium tracking-[0.12em] text-foreground/45 uppercase">Representative exchange</p>
          <div className="space-y-4 text-sm leading-6">
            <div>
              <p className="font-medium text-foreground">Passenger</p>
              <p className="text-foreground/70">Solapur jana hai. <span className="text-foreground/45">(I want to go to Solapur.)</span></p>
            </div>
            <div>
              <p className="font-medium text-foreground">Tulasi</p>
              <p className="text-foreground/70">
                The Sahyadri Express to Solapur leaves at 10:30 from platform 6.
              </p>
            </div>
          </div>
        </div>

        <p>
          When a passenger named a city instead of a station, the agent needed to disambiguate without sounding as if it
          had failed to hear. When several trains were available, they had to remain addressable as the first, second, or
          third option, or by departure time. The conversation also had to carry a selected train into ticketing rather
          than force the passenger to start again.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/conversation-flow.webp"
          alt="Detailed Tulasi conversation flow covering train discovery, clarification, ticketing, and recovery"
          caption="The flow mapped cooperative questions, explicit and implicit confirmation, ticketing branches, and recovery paths."
          aspect="aspect-[3205/1210]"
          wide
        />

        <CaseStudyDeepDive title="Dialogue grammar and scenario library">
          <ul className="list-disc space-y-2 pl-5">
            <li>One train available today, with optional ticket purchase and reminder.</li>
            <li>Multiple trains, retaining references such as first, second, or the 4:25 train.</li>
            <li>City and station disambiguation, including alternate or cluster stations.</li>
            <li>Platform number, arrival and departure, and delayed-train enquiries.</li>
            <li>Reservation details, passenger information, berth preference, and payment.</li>
          </ul>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="prototype" eyebrow="06 · Prototyping" title="Voice and visuals had to work together">
        <p>
          Voiceflow and Twine supported scenario and conversation prototyping. Dialogflow handled the natural-language
          layer, while Google Assistant supplied automatic speech recognition and text-to-speech. Whimsical supported the
          larger flow model.
        </p>
        <p>
          Voice was useful when typing was difficult, but a station is noisy and railway details are easy to forget. I
          therefore designed a multimodal interface with conversation starters, train-result cards, expanded journey
          details, tickets, payment choices, and onboarding for a preferred station, IRCTC account, and payment method.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/visual-system.webp"
          alt="Tulasi visual system with conversation starters, cards, chat bubbles, avatar, and ticket explorations"
          caption="The visual system translated spoken results into scan-friendly cards and touch targets for noisy or public environments."
          aspect="aspect-[70/47]"
          wide
        />

        <CaseStudyFigure
          src="/images/projects/tulasi/mobile-vui.webp"
          alt="Tulasi mobile voice interface screens showing onboarding, train results, ticketing, and payment"
          caption="The mobile VUI kept voice, text, and touch available throughout the same conversation."
          aspect="aspect-[322/253]"
        />

        <p>
          The station concept added a presence sensor, a directional or noise-cancelling microphone arrangement, and a
          visual display. A printed token acted as a cash fallback. These hardware details remained conceptual: COVID-19
          prevented deployment and evaluation on the station.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/kiosk-concept.webp"
          alt="Tulasi kiosk shown idle, active with a passenger, and positioned inside a railway concourse"
          caption="The kiosk concept made the shared conversation model available to passengers who could not or did not want to use a smartphone."
          aspect="aspect-[403/210]"
          wide
        />
      </CaseStudySection>

      <CaseStudySection id="evaluation" eyebrow="07 · Evaluation" title="Testing the Hindi conversational prototype">
        <p>
          Seven Android users completed a scenario on a device configured with Hindi Google Assistant. They had to find
          trains from Mumbai CSMT to Solapur and book a general ticket. Afterward, they answered fifteen seven-point
          Likert questions, each with a mandatory written reason.
        </p>
        <p>
          The questionnaire covered likeability, conversation flow, ease of use, advice, accuracy, concept, and the
          authenticity of the conversation. The study was qualitative and exploratory; it did not establish a commercial
          success rate or a production performance benchmark.
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {evaluationFindings.map((finding, index) => (
            <div key={finding} className="flex gap-3 rounded-lg bg-card px-4 py-3 text-sm leading-6 text-foreground/72">
              <span className="font-medium text-foreground/40">{String(index + 1).padStart(2, "0")}</span>
              <p>{finding}</p>
            </div>
          ))}
        </div>

        <CaseStudyQuote attribution="Participant feedback">
          I find that sometimes it becomes tricky just to use the voice assistant; visual feedback makes it a bit easy.
        </CaseStudyQuote>
        <CaseStudyQuote attribution="Participant feedback">
          I like the interaction of voice and I think my parents will use this more.
        </CaseStudyQuote>

        <CaseStudyDeepDive title="Questionnaire and evaluation scope">
          <p>
            The thesis reported category-level charts and participant explanations. This portfolio preserves the
            qualitative findings without converting the small sample into headline percentages or claiming a measured
            reduction in enquiry time.
          </p>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="iteration" eyebrow="08 · Iteration" title="The failures became design requirements">
        <p>
          The next iteration needed to carry context from train discovery into ticketing, vary confirmation language, and
          make the transition into a specialised railway agent more legible. Speech Synthesis Markup Language offered a
          way to separate spoken Hindi from English train names and alphanumeric details shown on screen.
        </p>
        <p>
          Discoverability could come from a station-aware prompt, an entry point in Maps, or a phone-call version for
          passengers without smartphones. Error paths were defined for unheard input, low confidence, unavailable
          destinations, and requests outside the prototype&apos;s scope.
        </p>

        <CaseStudyFigure
          src="/images/projects/tulasi/error-paths.webp"
          alt="Tulasi error states for unheard input, low confidence, unavailable destinations, and out-of-scope requests"
          caption="Error handling treated uncertainty as part of the conversation rather than as a generic failure message."
          aspect="aspect-[35/22]"
        />
      </CaseStudySection>

      <CaseStudySection id="reflection" eyebrow="09 · Reflection" title="Looking back">
        <p>
          The project&apos;s strongest contribution is the service and dialogue model, not the visual chatbot shell. Real
          enquiry conversations produced better intents, confirmation strategies, and repair paths than a generic FAQ
          structure could have.
        </p>
        <p>
          A production version would require a live railway data connection, language specialists, accessibility testing,
          privacy review, and field deployment. Voice and visual interaction would need to remain complementary because a
          station is public, noisy, multilingual, and time-sensitive.
        </p>

        <div className="rounded-lg bg-card p-5">
          <h3 className="text-sm font-medium text-foreground">Limitations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/68">
            <li>Seven-person remote evaluation and three passenger interviews.</li>
            <li>One primary station context and a narrow prototype dataset.</li>
            <li>No production railway feed or real payment integration.</li>
            <li>No station-based kiosk evaluation because of COVID-19.</li>
          </ul>
        </div>

        <CaseStudyDeepDive title="Academic context and references">
          <div className="space-y-4">
            <p>
              Original thesis title: <cite>A conversational design approach to railway enquiry for Mumbai CSMT</cite>,
              submitted as M.Des Project III at IDC School of Design, IIT Bombay in 2020 under Prof. Ravi Poovaiah.
            </p>
            <p>
              The thesis referenced conversational-agent research, voice-interface guidance, confirmation strategies,
              conversational search, and the design of natural-language systems. The original enquiry recordings remain
              private and are not published in this portfolio.
            </p>
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>
    </FlagshipCaseStudy>
  );
}
