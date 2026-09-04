import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bot,
  Activity,
  Server,
  Hammer,
  ScanEye,
  Share2,
  Boxes,
  RefreshCw,
  ArrowUpRight,
} from "lucide-react";
import { PageHero, SectionHeading } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";
import { useProducts } from "@/hooks/useTevexxoApi";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Orbit, Pulse, Grid & More | Tevexxo" },
      {
        name: "description",
        content:
          "Explore Tevexxo products: Orbit AI copilot orchestration, Pulse analytics, Grid cloud tooling, Forge workflow builder, Lens vision AI and Relay integrations.",
      },
      { property: "og:title", content: "Products — Orbit, Pulse, Grid & More | Tevexxo" },
      {
        property: "og:description",
        content: "Six Tevexxo products spanning AI, analytics, cloud, automation and integrations.",
      },
    ],
  }),
  component: Products,
});

const categoryIcons: Record<string, typeof Bot> = {
  "AI Platform": Bot,
  Analytics: Activity,
  Infrastructure: Server,
  "Internal Tools": Hammer,
  "Vision AI": ScanEye,
  Integrations: Share2,
};

const fallbackBody =
  "A Tevexxo product purpose-built to move your systems and workflows forward.";

function Products() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  return (
    <>
      <PageHero
        eyebrow="Our products"
        title={
          <>
            Platforms engineered by <span className="text-primary text-glow">Tevexxo</span>
          </>
        }
        subtitle="A product suite covering AI orchestration, analytics, cloud, automation and integrations."
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
            <h2 className="text-xl font-bold">Products are temporarily unavailable</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              {error instanceof Error ? error.message : "We couldn't load products right now."}
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

        {!isLoading && !isError && (!products || products.length === 0) && (
          <Reveal className="flex flex-col items-center py-16 text-center">
            <h2 className="text-xl font-bold">No products published yet</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Check back soon — new products are being added.
            </p>
          </Reveal>
        )}

        {!isLoading && !isError && products && products.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => {
              const Icon = categoryIcons[p.category || ""] || Boxes;
              const large = i % 3 === 0;
              return (
                <Reveal key={p.id} delay={i * 80} className={cn(large && "lg:col-span-2")}>
                  <article
                    className={cn(
                      "glow-card group flex h-full flex-col rounded-xl border border-border bg-card p-6",
                      large && "lg:p-8",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-lg bg-primary/15 text-primary">
                        <Icon className="size-6" />
                      </span>
                      <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary">
                        {p.category || "Product"}
                      </span>
                    </div>
                    <h3 className={cn("mt-5 text-xl font-bold", large && "lg:text-3xl")}>
                      {p.name}
                    </h3>
                    {p.amount && (
                      <span className="mt-2 inline-flex w-fit rounded-md border border-border bg-surface/60 px-2.5 py-0.5 text-xs font-bold tracking-wide text-muted-foreground uppercase">
                        {p.amount}
                      </span>
                    )}
                    <p className={cn("mt-3 text-muted-foreground", large && "lg:text-lg")}>
                      {p.body || p.detail || fallbackBody}
                    </p>
                    <Link
                      to="/contact"
                      className="glow-btn mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-border px-5 py-2 text-sm font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
                    >
                      Explore
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
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
            eyebrow="Get access"
            title="See any product in action"
            subtitle="Book a walkthrough and we will tailor the demo to your stack and your workflows."
            center
          />
          <Reveal delay={100} className="mt-8 flex justify-center">
            <Link
              to="/contact"
              className="glow-btn inline-flex rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
            >
              Request a demo
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
