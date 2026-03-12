import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RunningLateTeamsMessagePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="mx-auto mt-6 mb-24 w-full max-w-3xl px-4 sm:mt-10">
        <header className="pb-10">
          <nav className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <Link href="/blog" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground">
              <span>{"<-"}</span>
              <span>Back to blog</span>
            </Link>
            <div className="inline-flex items-center gap-2">
              <Link href="/" className="text-foreground/70 hover:text-foreground">
                Home
              </Link>
              <span className="text-foreground/40">/</span>
              <span className="text-foreground/70">Writing</span>
            </div>
          </nav>
        </header>

        <article className="space-y-10">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">Product idea</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A Gentle &quot;Running Late&quot; Prompt for Microsoft Teams Meetings
            </h1>
            <p className="text-sm text-foreground/60">March 12, 2026</p>
            <p className="text-base leading-relaxed text-foreground/80">
              My manager is often late to our one-on-one. It is not because he does not care. He is usually
              wrapping up another stakeholder discussion that ran over. I understand that context, but I still
              end up waiting without any signal. The awkward part is not the delay. It is the silence.
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">The small moment that breaks trust</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              In fast meeting days, people stay in flow. When you are deep in a call, you do not remember to
              open the next meeting and type a quick note. Teams already has the place to send the message,
              but the action is easy to forget. The result is a tiny trust gap that repeats weekly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Idea: a gentle, well-timed prompt</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              Microsoft Teams could add a small, friendly prompt that appears when a meeting is about to
              start and the organizer is still active in another meeting. The prompt should be low pressure
              and one-tap, making the respectful thing the easy thing.
            </p>
            <div className="rounded-md border border-primary/20 bg-background/80 p-4 text-sm text-foreground/80">
              <p className="font-medium text-foreground">Suggested microcopy</p>
              <p className="mt-1">
                You have a meeting starting now. Want to let them know you are running late?
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">When it should appear</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
              <li>Two minutes before start time if the organizer is still in another meeting.</li>
              <li>At the moment the first participant joins, even if the organizer has not joined yet.</li>
              <li>Never for meetings that have not started and have zero participants.</li>
              <li>Dismissible with a single tap and a snooze option for five minutes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Template messages that respect privacy</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              The goal is clarity without oversharing. These templates should be short, neutral, and
              consistent with professional tone.
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
              <li>&quot;Running 5 minutes late. Wrapping up a prior call.&quot;</li>
              <li>&quot;Joining around 10:10. Please start without me.&quot;</li>
              <li>&quot;In another meeting. I will be there shortly.&quot;</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">What the flow could feel like</h2>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-foreground/80">
              <li>
                You are in a meeting and a small card appears: &quot;Next meeting is starting. Send a quick
                note?&quot;
              </li>
              <li>You tap one of the templates or type a short custom note.</li>
              <li>The message posts to the meeting chat, and the card disappears.</li>
            </ol>
            <p className="text-sm leading-relaxed text-foreground/80">
              For one-on-ones, this is especially helpful because the waiting person is usually alone. For
              group meetings, the note reduces the quiet waiting period and gives permission to start.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Safeguards and respect</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
              <li>Never reveal the other meeting title by default.</li>
              <li>Let users disable the prompt for a single meeting or for all meetings.</li>
              <li>Do not show the prompt when Do Not Disturb is enabled.</li>
              <li>Keep the default action as a draft, not auto-send.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">How I would measure success</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/80">
              <li>Increase in meeting chat messages posted within the first two minutes.</li>
              <li>Reduction in average wait time for one-on-ones.</li>
              <li>Improved sentiment in follow-up surveys about meeting respect.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight">Closing thought</h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              This is a small feature, but it changes the emotional temperature of meetings. The point is not
              to police lateness. It is to make everyday respect effortless, especially when people are busy
              and distracted. That is a product moment worth designing.
            </p>
          </section>
        </article>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">Back to blog</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
