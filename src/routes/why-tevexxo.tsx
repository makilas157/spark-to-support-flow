import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, Users, Layers, Radar, Handshake, Timer } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Mascot } from "@/components/site/Mascot";

export const Route = createFileRoute("/why-tevexxo")({
  head: () => ({
    meta: [
      { title: "Why Tevexxo — Senior Engineering, Shipped Weekly" },
      {
        name: "description",
        content:
          "Why teams choose Tevexxo: senior-only squads, weekly production releases, transparent pricing and engineering measured against business outcomes.",
      },
      { property: "og:title", content: "Why Tevexxo — Senior Engineering, Shipped Weekly" },
      {
        property: "og:description",
        content: "Senior-only squads, weekly releases and outcome-driven engineering.",
      },
    ],
  }),
  component: WhyTevexxo,
});

const reasons = [
  { icon: Users, t: "Senior-only squads", d: "No juniors billed at expert rates. Every engineer has shipped at scale." },
  { icon: Timer, t: "Weekly releases", d: "Production deploys every week from day one, not a big-bang launch." },
  { icon: Layers, t: "Systems, not screens", d: "Design systems and architecture that make the tenth feature as fast as the first." },
  { icon: Gauge, t: "Performance obsessed", d: "Budgets for load time, cost and reliability agreed before we build." },
  { icon: Radar, t: "Transparent tracking", d: "Live boards, live previews and honest status — always." },
  { icon: Handshake, t: "Outcome pricing", d: "Fixed scope sprints with clear deliverables and no surprise invoices." },
];

const comparison = [
  { label: "Time to first release", them: "8-12 weeks", us: "7 days" },
  { label: "Team seniority", them: "Mixed / rotating", us: "Senior, dedicated" },
  { label: "Reporting", them: "Monthly slides", us: "Live dashboard" },
  { label: "Post-launch", them: "Handover and gone", us: "Scale partnership" },
];

function WhyTevexxo() {
  return (
    <>
      <PageHero
        eyebrow="Why Tevexxo"
        title={
          <>
            A studio built for <span className="text-primary text-glow">velocity</span>
          </>
        }
        subtitle="We combine senior engineering, product thinking and relentless delivery cadence so your roadmap stops slipping."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={i * 80}>
              <article className="glow-card h-full rounded-xl border border-border bg-card p-6">
                <span className="grid size-12 place-items-center rounded-lg bg-primary/15 text-primary">
                  <r.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{r.t}</h3>
                <p className="mt-3 text-muted-foreground">{r.d}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-surface/40">
        <div className="grid-circuit pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-5xl px-5 py-20">
          <SectionHeading
            eyebrow="Comparison"
            title="Tevexxo vs the typical agency"
            subtitle="The difference shows up in week one, not month six."
            center
          />
          <Reveal className="mt-12 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-secondary">
                <tr>
                  <th className="p-4 text-sm tracking-widest uppercase text-muted-foreground">Metric</th>
                  <th className="p-4 text-sm tracking-widest uppercase text-muted-foreground">Typical agency</th>
                  <th className="p-4 text-sm tracking-widest uppercase text-primary">Tevexxo</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr key={c.label} className="border-t border-border bg-card">
                    <td className="p-4 font-semibold">{c.label}</td>
                    <td className="p-4 text-muted-foreground">{c.them}</td>
                    <td className="p-4 font-bold text-primary">{c.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Our promise"
              title="If it does not ship, it does not count"
              subtitle="Every engagement starts with a measurable goal and a date. We hold ourselves to both."
            />
            <Link
              to="/contact"
              className="glow-btn mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
            >
              Start the conversation
            </Link>
          </Reveal>
          <Reveal delay={120} className="flex justify-center">
            <Mascot size={280} alt="Tevexxo mascot giving a confident thumbs up" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
