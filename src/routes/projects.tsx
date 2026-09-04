import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Mascot } from "@/components/site/Mascot";
import { cn } from "@/lib/utils";
import { useProjects } from "@/hooks/useTevexxoApi";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Tevexxo Product Engineering Work" },
      {
        name: "description",
        content:
          "Selected Tevexxo projects across AI platforms, fintech, logistics and SaaS — with the outcomes each build delivered.",
      },
      { property: "og:title", content: "Projects — Tevexxo Product Engineering Work" },
      {
        property: "og:description",
        content: "AI platforms, fintech, logistics and SaaS products engineered by Tevexxo.",
      },
    ],
  }),
  component: Projects,
});

const BASE_CATEGORIES = ["AI", "SaaS", "Fintech", "Automation"] as const;

const categoryMetrics: Record<string, string> = {
  AI: "Case study available",
  SaaS: "Case study available",
  Fintech: "Case study available",
  Automation: "Case study available",
};

function Projects() {
  const { data: projects, isLoading, isError, error, refetch } = useProjects();
  const fetchedCategories = Array.from(
    new Set((projects ?? []).map((p) => p.category || "").filter(Boolean)),
  );
  const categories = Array.from(new Set([...BASE_CATEGORIES, ...fetchedCategories]));
  const [active, setActive] = useState<string>("All");
  const filtered =
    active === "All"
      ? (projects ?? [])
      : (projects ?? []).filter(
          (p) =>
            (p.category || "").toLowerCase() === active.toLowerCase() ||
            active === p.category,
        );

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={
          <>
            Products built to <span className="text-primary text-glow">outperform</span>
          </>
        }
        subtitle="A selection of platforms, copilots and automation systems we designed, engineered and scaled."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal className="flex flex-wrap gap-3">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "glow-btn rounded-full border px-5 py-2 text-sm font-bold tracking-wide uppercase",
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </Reveal>

        {isLoading && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <Reveal className="mt-16 flex flex-col items-center text-center">
            <h2 className="text-xl font-bold">Projects are temporarily unavailable</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              {error instanceof Error ? error.message : "We couldn't load projects right now."}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="glow-btn mt-6 inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
            >
              <RefreshCw className="size-4" /> Try again
            </button>
          </Reveal>
        )}

        {!isLoading && !isError && (!projects || projects.length === 0) && (
          <Reveal className="mt-16 flex flex-col items-center text-center">
            <Mascot size={190} alt="Tevexxo mascot noting there are no projects yet" />
            <h2 className="mt-4 text-xl font-bold">No projects published yet</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Our latest builds are being prepared. Check back soon.
            </p>
          </Reveal>
        )}

        {!isLoading && !isError && projects && projects.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => {
              const cat = p.category || "Project";
              const title = p.name || p.tag;
              const body = p.detail || p.body;
              const metric = p.metric || categoryMetrics[cat] || "Case study available";
              return (
                <Reveal key={p.id} delay={i * 80}>
                  <article className="glow-card group h-full rounded-xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary">
                        {cat}
                      </span>
                      <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{title}</h3>
                    {p.tag && (
                      <p className="mt-1 text-sm tracking-wide uppercase text-muted-foreground">
                        {p.tag}
                      </p>
                    )}
                    <p className="mt-4 text-muted-foreground">{body}</p>
                    <p className="mt-6 font-display text-lg font-bold text-primary">{metric}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <Reveal className="flex justify-center">
            <Mascot size={230} alt="Tevexxo mascot presenting project results" />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Next build"
              title="Your product could be the next case study"
              subtitle="Bring us a rough idea or a stalled roadmap — we will turn it into a shipping plan."
            />
            <Reveal delay={100}>
              <Link
                to="/contact"
                className="glow-btn mt-8 inline-flex rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
              >
                Book a discovery call
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
