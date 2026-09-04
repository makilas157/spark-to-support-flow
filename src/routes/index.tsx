import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, Boxes, ShieldCheck, Rocket, Sparkles, LineChart } from "lucide-react";
import hexBg from "@/assets/hex-bg.jpg";
import { Mascot } from "@/components/site/Mascot";
import { OrbitShowcase } from "@/components/site/OrbitShowcase";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tevexxo — Futuristic Web, AI & Automation Studio" },
      {
        name: "description",
        content:
          "Tevexxo builds high-performance web platforms, AI products and automation systems for ambitious teams. Explore our projects, insights and process.",
      },
      { property: "og:title", content: "Tevexxo — Futuristic Web, AI & Automation Studio" },
      {
        property: "og:description",
        content: "High-performance web platforms, AI products and automation, engineered by Tevexxo.",
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    icon: Cpu,
    title: "AI Engineering",
    body: "Custom copilots, RAG pipelines and model orchestration wired straight into your product.",
  },
  {
    icon: Boxes,
    title: "Product Platforms",
    body: "Scalable React and edge-rendered platforms with design systems built to last.",
  },
  {
    icon: Rocket,
    title: "Automation",
    body: "Workflow engines that remove manual work and give your operations real leverage.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Scale",
    body: "Hardened architecture, observability and performance budgets from day one.",
  },
];

const steps = [
  { n: "01", t: "Signal", d: "We map the problem, users and constraints in a focused discovery sprint." },
  { n: "02", t: "Blueprint", d: "Architecture, design system and roadmap agreed before a line ships." },
  { n: "03", t: "Build", d: "Weekly production releases with live previews and measurable progress." },
  { n: "04", t: "Scale", d: "Monitoring, iteration and growth engineering after launch." },
];

const stats = [
  { k: "120+", v: "Products shipped" },
  { k: "38", v: "Countries served" },
  { k: "99.98%", v: "Platform uptime" },
  { k: "4.9/5", v: "Client rating" },
];

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <img
          src={hexBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-30"
        />
        <div className="grid-circuit pointer-events-none absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase text-primary">
              <Sparkles className="size-3.5" /> Engineering the next web
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Build products that feel like <span className="text-primary text-glow">the future</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Tevexxo is a product engineering studio crafting AI-native platforms, automation systems
              and interfaces that move as fast as your ambition.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="glow-btn inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
              >
                Start a project <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/projects"
                className="glow-btn inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
              >
                View our work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140} className="flex justify-center">
            <OrbitShowcase size={420} />
          </Reveal>
        </div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-4 px-5 pb-16 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 80}>
              <div className="glow-card rounded-xl border border-border bg-card/70 p-5 text-center backdrop-blur">
                <p className="font-display text-2xl font-bold text-primary">{s.k}</p>
                <p className="mt-1 text-sm text-muted-foreground uppercase tracking-wide">{s.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Full-stack capability, one focused team"
          subtitle="From first prototype to global scale, we own the engineering so you can own the market."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="glow-card h-full rounded-xl border border-border bg-card p-6">
                <span className="grid size-12 place-items-center rounded-lg bg-primary/15 text-primary">
                  <s.icon className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-surface/40">
        <div className="grid-circuit pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 py-20">
          <SectionHeading
            eyebrow="Process"
            title="A build rhythm you can actually see"
            subtitle="Four phases, zero black boxes. You get demos, metrics and momentum every week."
            center
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="glow-card h-full rounded-xl border border-border bg-card p-6">
                  <span className="font-display text-3xl font-bold text-primary/40">{s.n}</span>
                  <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                  <p className="mt-2 text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal className="flex justify-center">
            <Mascot size={260} alt="Tevexxo mascot pointing at growth results" />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Outcomes"
              title="Engineering measured in business results"
              subtitle="We ship for conversion, retention and cost — not for applause."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Average 42% faster load times after our performance rebuilds",
                "AI workflows that cut manual ops time by up to 60%",
                "Design systems that shorten future feature delivery by weeks",
              ].map((li) => (
                <li key={li} className="flex items-start gap-3 text-muted-foreground">
                  <LineChart className="mt-1 size-5 shrink-0 text-primary" />
                  <span>{li}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8">
        <Reveal>
          <div className="glow-card relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-10 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{ background: "radial-gradient(circle at 50% 0%, var(--primary), transparent 60%)" }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to build something bold?</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Tell us where you want to be in twelve months. We will show you the shortest engineering
                path to get there.
              </p>
              <Link
                to="/contact"
                className="glow-btn mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 font-bold tracking-wide uppercase text-primary-foreground"
              >
                Talk to Tevexxo <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
