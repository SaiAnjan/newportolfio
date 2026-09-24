import PreviewImage from "@/components/preview-image";
import {
  CaseStudyDeepDive,
  CaseStudyFigure,
  CaseStudyQuote,
  CaseStudySection,
  FlagshipCaseStudy,
} from "@/components/flagship-case-study";

const pickerVariants = [
  {
    title: "Circular time dial",
    src: "/images/projects/teaching-touch-interfaces/time-circular.webp",
    alt: "Android circular time picker with values arranged like an analog clock",
  },
  {
    title: "Vertical time spinner",
    src: "/images/projects/teaching-touch-interfaces/time-spinner.webp",
    alt: "Android time picker with vertically scrolling hour and minute values",
  },
  {
    title: "Numeric time input",
    src: "/images/projects/teaching-touch-interfaces/time-numeric.webp",
    alt: "Numeric time picker used in the Nike Running Club application",
  },
  {
    title: "Calendar grid",
    src: "/images/projects/teaching-touch-interfaces/date-grid.webp",
    alt: "Android calendar grid with horizontal month navigation",
  },
  {
    title: "Scrolling month list",
    src: "/images/projects/teaching-touch-interfaces/date-list.webp",
    alt: "Travel date picker with months arranged in a vertical list",
  },
  {
    title: "Fisheye date dials",
    src: "/images/projects/teaching-touch-interfaces/date-fisheye.webp",
    alt: "Date picker with separate fisheye dials for day, month, and year",
  },
] as const;

const auditProblems = [
  "Missing confirmation and system-status feedback",
  "Familiar interaction patterns disappearing between implementations",
  "Spoken labels not matching the control's actual behaviour",
  "A new spatial mental image being required for every variation",
  "Focus remaining on the parent screen after an overlay opened",
  "Excessive reliance on recall",
  "Available gestures never being explained",
] as const;

const prototypeStrategies = [
  {
    title: "Target axis",
    description:
      "Teach the geometry of a circular dial, the position of its values, and the gesture needed to select them.",
  },
  {
    title: "Guided flow",
    description:
      "Break date or time selection into goals, then provide recognition and confirmation after each action.",
  },
  {
    title: "Hot corners",
    description:
      "Let users replay separate explanations of layout, focus order, and gestures on demand.",
  },
] as const;

const navigation = [
  { href: "#problem", label: "Problem" },
  { href: "#research", label: "Research" },
  { href: "#audit", label: "Audit" },
  { href: "#teaching", label: "Teaching" },
  { href: "#prototypes", label: "Prototypes" },
  { href: "#evaluation", label: "Evaluation" },
  { href: "#reflection", label: "Looking back" },
];

export default function TeachingStrategiesPage() {
  return (
    <FlagshipCaseStudy
      eyebrow="Accessibility · Interaction design"
      title="Teaching Unfamiliar Touch Interfaces to Blind Users"
      subtitle="How I studied the mental models of blind TalkBack users and designed voice-guided strategies for learning unfamiliar Android date and time pickers."
      summary="Screen readers can announce a control without explaining how its parts relate. I investigated how blind TalkBack users build mental models of unfamiliar Android widgets, then prototyped three audio-led teaching strategies and evaluated them with six participants."
      readTime="8 minutes"
      shareUrl="/projects/teaching-strategies"
      navigation={navigation}
      facts={[
        { label: "Context", value: "M.Des Interaction Design, IIT Bombay" },
        { label: "Project", value: "Individual academic thesis, Project II" },
        { label: "Year", value: "2020" },
        { label: "Guide", value: "Prof. Anirudha Joshi" },
        { label: "Research", value: "1 accessibility expert and 5 blind TalkBack users/instructors" },
        { label: "Evaluation", value: "6 completely blind participants" },
        { label: "Original title", value: "Teaching unfamiliar interaction techniques to the visually impaired" },
      ]}
      hero={
        <CaseStudyFigure
          src="/images/P2/cover/cover.001.jpeg"
          alt="Illustration of several people identifying different parts of an elephant as separate objects"
          caption="A partial description can be correct and still fail to communicate the whole. The project applied this mental-model problem to unfamiliar touch interfaces."
          aspect="aspect-[4/3]"
          priority
        />
      }
    >
      <CaseStudySection id="problem" eyebrow="01 · Framing" title="A label is not a mental model">
        <p>
          Sighted users can infer a widget&apos;s spatial structure from visual affordances. A switch looks tappable, a
          circular time picker resembles a clock, and a calendar reveals rows, columns, and available dates at a glance.
        </p>
        <p>
          TalkBack often presents the same interface as a sequence of labels, roles, and actions. That sequence can make
          each control technically reachable while leaving its layout, relationships, state changes, and gestures
          unexplained. When applications or Android versions implement the same widget differently, a strategy learned
          in one place may stop working in another.
        </p>

        <CaseStudyFigure
          src="/images/projects/teaching-touch-interfaces/talkback-comparison.webp"
          alt="The same Android Wi-Fi switch shown visually and with TalkBack focus"
          caption="A sighted user reads the switch and its state as one visual object. With TalkBack, the user encounters the state and control through sequential focus and spoken feedback."
          aspect="aspect-[29/22]"
        />

        <CaseStudyQuote attribution="Core research insight">
          Accessibility does not end when controls are announced. Users also need a way to understand the interface&apos;s
          structure, state, and interaction logic.
        </CaseStudyQuote>
      </CaseStudySection>

      <CaseStudySection id="research" eyebrow="02 · Field research" title="Learning from blind users and teachers">
        <p>
          I began with an expert discussion with Dr. Charudatta Jadhav, then Head of the Accessibility Center of
          Excellence at TCS. He described how exploring a complete screen increases cognitive load: a screen reader
          announces individual elements, but rarely provides a useful summary of how those elements form a whole.
        </p>
        <p>
          At Niwant Andh Mukt Vikasalaya, I interviewed five completely blind TalkBack users and instructors. The
          institute taught Marathi typing through Swalekhan, an in-house learning system that combined a tactile keyboard
          model with an eight-chapter course. Students first learned the keyboard&apos;s physical layout, then progressed
          through characters, words, sentences, and a typing test.
        </p>

        <CaseStudyFigure
          src="/images/projects/teaching-touch-interfaces/field-research.webp"
          alt="Swalekhan Marathi keyboard interface and a tactile printed keyboard used for instruction"
          caption="Niwant paired tactile spatial learning with structured software lessons. The combination became an important precedent for teaching unfamiliar mobile interactions."
          aspect="aspect-[92/33]"
          wide
        />

        <p>
          Students learned TalkBack gestures first and then specific applications such as WhatsApp, Zomato, Maps, and
          Uber Eats. New widgets were usually learned through exploration, peers, or a sighted person&apos;s explanation.
          Familiarity often remained tied to one application: when a picker appeared in another layout, the existing
          strategy no longer transferred cleanly.
        </p>

        <CaseStudyDeepDive title="What the fieldwork changed">
          <ul className="list-disc space-y-2 pl-5">
            <li>TalkBack onboarding taught gestures, but not the conceptual models of widgets.</li>
            <li>Users built mental images from partial information and previous experience.</li>
            <li>App-specific instruction created confidence, but did not always transfer to a different implementation.</li>
            <li>Peers and instructors were already acting as contextual voice guides.</li>
          </ul>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="audit" eyebrow="03 · Interface audit" title="Six versions of two familiar widgets">
        <p>
          I compared three time pickers and three date pickers. The widgets served the same underlying tasks, but exposed
          radically different structures: circular dials, vertical spinners, numeric entry, calendar grids, scrolling
          month lists, and fisheye dials.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {pickerVariants.map((variant) => (
            <figure key={variant.title} className="space-y-2">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white">
                <PreviewImage
                  src={variant.src}
                  alt={variant.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 240px"
                  className="object-contain"
                />
              </div>
              <figcaption className="text-xs text-foreground/60">{variant.title}</figcaption>
            </figure>
          ))}
        </div>

        <p>
          A heuristic audit, supported by recorded TalkBack sessions, reduced the failures to seven recurring problems:
        </p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {auditProblems.map((problem, index) => (
            <li key={problem} className="flex gap-3 rounded-lg bg-card px-4 py-3 text-sm leading-6 text-foreground/75">
              <span className="font-medium text-foreground/45">{String(index + 1).padStart(2, "0")}</span>
              <span>{problem}</span>
            </li>
          ))}
        </ol>

        <CaseStudyDeepDive title="The six audited implementations">
          <div className="space-y-4">
            <p>
              The time-picker set covered a Material-style circular dial, a vertically scrolling hour/minute/AM-PM
              spinner, and numeric hour/minute fields with a number pad.
            </p>
            <p>
              The date-picker set covered a grid with horizontal month controls, a vertically scrolling list of months,
              and independent fisheye dials for day, month, and year. Each demanded a different spatial and gesture model.
            </p>
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="teaching" eyebrow="04 · Synthesis" title="From onboarding to teaching">
        <p>
          The project reframed onboarding as a teaching problem. I explored an automated voice guide, a structured
          learning module, a voice assistant, Braille and embossed references, workshops, vibration patterns, hot
          corners, spatial audio, and tactile phone cases.
        </p>
        <p>
          Voice guidance moved forward because it matched how participants already learned from instructors and peers.
          It could describe layout, focus order, state, and gestures at the moment they became relevant, without requiring
          a separate physical reference for every new widget.
        </p>

        <CaseStudyFigure
          src="/images/projects/teaching-touch-interfaces/concept-sketches.webp"
          alt="Sketches exploring hot corners, spatial sound, a tactile phone case, and raised printing cards"
          caption="The concept pool explored audio, vibration, spatial, and tactile ways to communicate a widget's structure."
          aspect="aspect-[183/148]"
          wide
        />

        <CaseStudyDeepDive title="Ideas not taken forward">
          <ul className="list-disc space-y-2 pl-5">
            <li>Embossed cards could communicate shape but would require a new physical artefact for every widget.</li>
            <li>A tactile phone case introduced a second interaction surface and required a consistent mapping framework.</li>
            <li>Spatial audio could communicate position, but depended on hardware, orientation, and careful sound design.</li>
            <li>Vibration patterns could indicate hierarchy, but could not explain purpose or interaction by themselves.</li>
          </ul>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="prototypes" eyebrow="05 · Prototyping" title="Three ways to teach the model">
        <div className="grid gap-3 sm:grid-cols-3">
          {prototypeStrategies.map((strategy, index) => (
            <article key={strategy.title} className="rounded-lg bg-card p-4">
              <p className="text-xs font-medium text-foreground/45">0{index + 1}</p>
              <h3 className="mt-5 text-base font-medium text-foreground">{strategy.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground/68">{strategy.description}</p>
            </article>
          ))}
        </div>
        <p>
          The prototypes used recorded Indian-English guidance, vibration, and controlled interactive prototypes. They
          were deliberately medium fidelity: the study evaluated the teaching strategy, not a production TalkBack
          integration.
        </p>
      </CaseStudySection>

      <CaseStudySection id="evaluation" eyebrow="06 · Pilot study" title="What the pilot revealed">
        <p>
          Six completely blind participants first attempted alarm-setting and date-selection tasks. When a task could not
          be completed, I introduced a teaching strategy and observed completion time alongside qualitative feedback.
        </p>

        <CaseStudyFigure
          src="/images/projects/teaching-touch-interfaces/testing-prototype.webp"
          alt="Date and time picker interfaces used during the participant study"
          caption="Participants worked with date and time pickers using TalkBack while the teaching prototypes introduced layout, sequence, or gesture guidance."
          aspect="aspect-[167/100]"
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <article className="rounded-lg bg-card p-4">
            <p className="text-2xl font-semibold tracking-tight text-foreground">4:30</p>
            <p className="mt-1 text-xs text-foreground/50">Average guided-flow task time</p>
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              More effective for grid-based date selection; separate audio could not be controlled or replayed.
            </p>
          </article>
          <article className="rounded-lg bg-card p-4">
            <p className="text-2xl font-semibold tracking-tight text-foreground">7:00</p>
            <p className="mt-1 text-xs text-foreground/50">Average target-axis task time</p>
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              Helped communicate the circular dial as a spatial object rather than a flat sequence of values.
            </p>
          </article>
          <article className="rounded-lg bg-card p-4">
            <p className="text-2xl font-semibold tracking-tight text-foreground">12:30</p>
            <p className="mt-1 text-xs text-foreground/50">Average pre-teaching task time</p>
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              Required participants to remember the explanation before acting in the interface.
            </p>
          </article>
        </div>

        <CaseStudyQuote attribution="Participant after target-axis guidance">
          Oh! It means it&apos;s clockwise.
        </CaseStudyQuote>
        <CaseStudyQuote attribution="Participant after completing the task">
          Now I want to teach this to my friend in Malayalam.
        </CaseStudyQuote>

        <p className="text-sm text-foreground/60">
          These timings describe a small exploratory pilot, not comparative performance. The thesis did not include a
          controlled baseline or statistical analysis.
        </p>

        <CaseStudyDeepDive title="Detailed testing notes">
          <ul className="list-disc space-y-2 pl-5">
            <li>Guided flow worked better when the target followed a familiar row-and-column structure.</li>
            <li>Participants asked to replay instructions when the audio was played separately from the interface.</li>
            <li>One participant could locate the number 9 after learning the circular dial&apos;s spatial arrangement.</li>
            <li>Participants asked whether the method could teach applications and be shared in other languages.</li>
          </ul>
        </CaseStudyDeepDive>
      </CaseStudySection>

      <CaseStudySection id="reflection" eyebrow="07 · Reflection" title="Looking back">
        <p>
          The most important lesson is that accessible controls still need an understandable model. A stronger version
          would integrate guidance into the widget or screen-reader layer, make every instruction replayable, and teach
          progressively: purpose, layout, state, gesture, confirmation, and recovery.
        </p>
        <p>
          I would also test whether people can transfer the learned strategy to an unfamiliar application and recall it
          after time has passed. That would move the work from immediate task support toward durable interaction
          learning.
        </p>

        <div className="rounded-lg bg-card p-5">
          <h3 className="text-sm font-medium text-foreground">Limitations</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-foreground/68">
            <li>Small participant group and a narrow set of widgets.</li>
            <li>Medium-fidelity or externally controlled prototypes.</li>
            <li>No longitudinal measure of retention or transfer.</li>
            <li>No production-level TalkBack integration.</li>
          </ul>
        </div>

        <CaseStudyDeepDive title="Academic context and references">
          <div className="space-y-4">
            <p>
              Original thesis title: <cite>Teaching unfamiliar interaction techniques to the visually impaired</cite>,
              submitted as M.Des Project II at IDC School of Design, IIT Bombay in 2020 under Prof. Anirudha Joshi.
            </p>
            <p>
              The work drew on mental-model theory, Android TalkBack documentation, research on accessible date pickers,
              non-speech audio, and VizLens. The portfolio intentionally condenses that literature to keep the design
              argument readable.
            </p>
          </div>
        </CaseStudyDeepDive>
      </CaseStudySection>
    </FlagshipCaseStudy>
  );
}
