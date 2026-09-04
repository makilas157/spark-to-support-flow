import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Calendar, Clock, Send, CheckCircle2, RefreshCw } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Mascot } from "@/components/site/Mascot";
import { cn } from "@/lib/utils";
import { useBlogs } from "@/hooks/useTevexxoApi";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Tevexxo Engineering & AI Insights" },
      {
        name: "description",
        content:
          "Practical writing from the Tevexxo team on AI engineering, performance, design systems and shipping software faster.",
      },
      { property: "og:title", content: "Blog — Tevexxo Engineering & AI Insights" },
      {
        property: "og:description",
        content: "Essays on AI engineering, performance, design systems and delivery speed.",
      },
    ],
  }),
  component: Blog,
});

const BASE_TOPICS = ["AI", "Engineering", "Design", "Growth"] as const;

function Blog() {
  const { data: posts, isLoading, isError, error, refetch } = useBlogs();
  const fetchedTopics = Array.from(
    new Set((posts ?? []).map((p) => p.category || "").filter(Boolean)),
  );
  const topics = ["All", ...Array.from(new Set([...BASE_TOPICS, ...fetchedTopics]))];

  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (posts ?? []).filter(
      (p) =>
        (topic === "All" || p.category === topic) &&
        (q === "" || (p.name || "").toLowerCase().includes(q) || (p.detail || "").toLowerCase().includes(q)),
    );
  }, [topic, query, posts]);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Notes from the <span className="text-primary text-glow">build floor</span>
          </>
        }
        subtitle="Field reports on AI engineering, performance and product delivery — written by the people doing the work."
      />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {topics.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                className={cn(
                  "glow-btn rounded-full border px-5 py-2 text-sm font-bold tracking-wide uppercase",
                  topic === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <label className="sr-only" htmlFor="blog-search">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-md border border-border bg-card py-2.5 pl-10 pr-4 outline-none transition-shadow placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_24px_-6px_var(--primary)]"
            />
          </div>
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
            <h2 className="text-xl font-bold">Articles are temporarily unavailable</h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              {error instanceof Error ? error.message : "We couldn't load articles right now."}
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

        {!isLoading && !isError && posts && posts.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <article className="glow-card flex h-full cursor-pointer flex-col rounded-xl border border-border bg-card p-6">
                  <span className="w-fit rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary">
                    {p.category || "Insight"}
                  </span>
                  <h2 className="mt-4 text-xl font-bold leading-snug">{p.name}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{p.detail}</p>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    {p.date && (
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="size-4" /> {p.date}
                      </span>
                    )}
                    {p.createdAt && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-4" /> {formatDate(p.createdAt)}
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        {!isLoading && !isError && (!posts || posts.length === 0) && (
          <Reveal className="mt-16 flex flex-col items-center text-center">
            <Mascot size={190} alt="Tevexxo mascot shrugging because no articles matched" />
            <h2 className="mt-4 text-xl font-bold">No articles published yet</h2>
            <p className="mt-2 text-muted-foreground">
              New insights are on the way. Check back soon.
            </p>
          </Reveal>
        )}

        {!isLoading && !isError && posts && posts.length > 0 && filtered.length === 0 && (
          <Reveal className="mt-16 flex flex-col items-center text-center">
            <Mascot size={190} alt="Tevexxo mascot shrugging because no articles matched" />
            <h2 className="mt-4 text-xl font-bold">No articles matched that search</h2>
            <p className="mt-2 text-muted-foreground">Try a different keyword or clear the topic filter.</p>
          </Reveal>
        )}
      </section>

      <section className="border-t border-border bg-surface/40">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Get the <span className="text-primary">Tevexxo Signal</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              One email a month: what we shipped, what broke, and what we learned. No fluff, no spam.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
                setEmail("");
              }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="flex-1 rounded-md border border-border bg-card px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_24px_-6px_var(--primary)]"
              />
              <button
                type="submit"
                className="glow-btn inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground"
              >
                Subscribe <Send className="size-4" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-4 inline-flex items-center gap-2 text-primary">
                <CheckCircle2 className="size-5" /> You are on the list. Watch your inbox.
              </p>
            )}
          </Reveal>
          <Reveal delay={120} className="flex justify-center">
            <Mascot size={230} alt="Tevexxo mascot holding a newsletter envelope" />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
