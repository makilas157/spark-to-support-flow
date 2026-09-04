import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, Code2, Boxes, Workflow, Palette, Cloud, RefreshCw } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { useServices } from "@/hooks/useTevexxoApi";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AI, Web, Cloud & Automation | Tevexxo" },
      {
        name: "description",
        content:
          "Tevexxo services: AI solutions, web and software development, digital products, data automation, UI/UX design and cloud-scale engineering.",
      },
      { property: "og:title", content: "Services — AI, Web, Cloud & Automation | Tevexxo" },
      {
        property: "og:description",
        content:
          "Six engineering services covering AI, web platforms, digital products, automation, design and cloud.",
      },
    ],
  }),
  component: Services,
});

const iconMap = [Brain, Code2, Boxes, Workflow, Palette, Cloud];

const fallbackPoints = ["Custom delivery", "Senior engineering", "Measurable outcomes"];

function Services() {
  const { data: services, isLoading, isError, error, refetch } = useServices();

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Services built for <span className="text-primary text-glow">momentum</span>
          </>
        }
        subtitle="Six focused capabilities, one team — combined into whatever your product needs to ship and scale."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        {isLoading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl border border-border bg-card" />
            ))}
          </div>
        )}

        {!isLoading && isError && (
          <Reveal className="flex flex-col items-center py-16 text-center">
            <h2 className="text-xl font-bold">Services are temporarily unavailable</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              {error instanceof Error ? error.message : "We couldn't load services right now."}
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

        {!isLoading && !isError && (!services || services.length === 0) && (
          <Reveal className="flex flex-col items-center py-16 text-center">
            <h2 className="text-xl font-bold">No services published yet</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Check back soon — new capabilities are being added.
            </p>
          </Reveal>
        )}

        {!isLoading && !isError && services && services.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = iconMap[i % iconMap.length];
              const points =
                Array.isArray(s.points) && s.points.length > 0 ? s.points : fallbackPoints;
              return (
                <Reveal key={s.id} delay={i * 80}>
                  <article className="glow-card h-full rounded-xl border border-border bg-card p-6">
                    <span className="grid size-12 place-items-center rounded-lg bg-primary/15 text-primary">
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold">{s.name}</h3>
                    <p className="mt-3 text-muted-foreground">{s.detail || s.body}</p>
                    <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                      {points.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <SectionHeading
            eyebrow="Next step"
            title="Tell us what you are building"
            subtitle="Share the goal and the constraints — we will come back with a plan, a scope and a timeline."
            center
          />
          <Reveal delay={100} className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="glow-btn inline-flex rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
            >
              Start a project
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
