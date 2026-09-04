import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tevexxo — Technology Studio for Intelligent Products" },
      {
        name: "description",
        content:
          "Tevexxo is a technology studio building intelligent digital products and AI solutions, with senior engineers working directly with every client.",
      },
      { property: "og:title", content: "About Tevexxo — Technology Studio for Intelligent Products" },
      {
        property: "og:description",
        content:
          "Who Tevexxo is, what we deliver for clients, and how we build software with engineering discipline and speed.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const sections = [
  {
    eyebrow: "Our Story",
    title: "A technology studio, not an agency",
    body: "Tevexxo is a technology studio that designs and builds intelligent digital products — web platforms, internal tools and AI-powered features. We work in small senior squads embedded directly with the client team, so decisions get made in the same conversation where the problem shows up. Every engagement starts with the product outcome, then the architecture, then the code.",
  },
  {
    eyebrow: "Our Mission",
    title: "Working software that moves the business",
    body: "Our mission is to get clients from idea to a production system their customers actually use. That means shipping releases continuously instead of a single distant launch, and measuring the work against business results — adoption, conversion, cost and reliability. What we hand over runs in production and is documented well enough for your team to own it.",
  },
  {
    eyebrow: "Our Vision",
    title: "Intelligence built into every product",
    body: "We believe software is moving from static screens to systems that reason, automate and adapt. Tevexxo is building toward being the long-term engineering partner clients keep as their products grow, from first release through scale. As AI becomes standard infrastructure, we want it to be a dependable layer of the products we build — not an experiment bolted on the side.",
  },
  {
    eyebrow: "Our Approach",
    title: "Engineering discipline at delivery speed",
    body: "We build on typed, tested codebases with design systems and clear architecture, so the tenth feature ships as fast as the first. Work moves in short cycles with live previews, so you see progress every week rather than reading a status report. Performance, security and cost budgets are agreed before we build and checked before we release.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Building <span className="text-primary text-glow">intelligent</span> digital products
          </>
        }
        subtitle="Tevexxo is a technology studio delivering AI-powered software with senior engineers, weekly releases and production-grade quality."
      />

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="space-y-16">
          {sections.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 80}>
              <article className="grid gap-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase text-primary">
                    {s.eyebrow}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{s.title}</h2>
                  <p className="mt-4 text-lg text-muted-foreground">{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-border bg-surface/40">
        <div className="grid-circuit pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">Have a product to build?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tell us what you're working on and a senior engineer will reply with a clear next step.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:scale-105"
            >
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
