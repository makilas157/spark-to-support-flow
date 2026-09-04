import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { PageHero } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { Mascot } from "@/components/site/Mascot";
import { useCreateInquiry } from "@/hooks/useTevexxoApi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tevexxo — Start Your Product Build" },
      {
        name: "description",
        content:
          "Tell Tevexxo about your product, timeline and budget. We reply within one business day with a clear next step.",
      },
      { property: "og:title", content: "Contact Tevexxo — Start Your Product Build" },
      {
        property: "og:description",
        content: "Share your project brief and get a response within one business day.",
      },
    ],
  }),
  component: Contact,
});

const budgets = ["Under $25k", "$25k - $75k", "$75k - $150k", "$150k+"];

const details = [
  { icon: Mail, label: "Email", value: "hello@tevexxo.com" },
  { icon: Phone, label: "Phone", value: "+1 (415) 555-0148" },
  { icon: MapPin, label: "Studio", value: "Remote-first · Worldwide" },
];

function Contact() {
  const { mutateAsync, isPending, isError, error, reset } = useCreateInquiry();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: budgets[1],
    message: "",
  });

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const field =
    "w-full rounded-md border border-border bg-card px-4 py-3 outline-none placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_24px_-6px_var(--primary)] transition-shadow";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending || sent) return;
    try {
      await mutateAsync({
        name: form.name,
        email: form.email,
        category: form.budget || "Contact Form",
        message: form.message,
      });
      setSent(true);
    } catch {
      // error rendered via isError below
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let us build your <span className="text-primary text-glow">next move</span>
          </>
        }
        subtitle="Share a few details about the project. A senior engineer — not a sales bot — replies within one business day."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="glow-card rounded-2xl border border-border bg-card p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <Mascot size={200} alt="Tevexxo mascot celebrating a submitted message" />
                <h2 className="mt-4 inline-flex items-center gap-2 text-2xl font-bold text-primary">
                  <CheckCircle2 className="size-6" /> Message received
                </h2>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Thanks {form.name || "there"} — we will get back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    reset();
                    setForm({ name: "", email: "", company: "", budget: budgets[1], message: "" });
                  }}
                  className="glow-btn mt-6 rounded-md border border-border px-5 py-2.5 font-bold tracking-wide uppercase hover:border-primary hover:text-primary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-bold tracking-wide uppercase">
                    Name
                  </label>
                  <input id="name" required value={form.name} onChange={set("name")} placeholder="Ada Lovelace" className={field} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-bold tracking-wide uppercase">
                    Email
                  </label>
                  <input id="email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" className={field} />
                </div>
                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-bold tracking-wide uppercase">
                    Company
                  </label>
                  <input id="company" value={form.company} onChange={set("company")} placeholder="Tevexxo Inc." className={field} />
                </div>
                <div>
                  <label htmlFor="budget" className="mb-2 block text-sm font-bold tracking-wide uppercase">
                    Budget
                  </label>
                  <select id="budget" value={form.budget} onChange={set("budget")} className={field}>
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-bold tracking-wide uppercase">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are you building, and what does success look like?"
                    className={field}
                  />
                </div>
                {isError && (
                  <p className="sm:col-span-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error instanceof Error ? error.message : "Something went wrong sending your message. Please try again."}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="glow-btn inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 font-bold tracking-wide uppercase text-primary-foreground sm:col-span-2 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className="space-y-6">
          {details.map((d) => (
            <div key={d.label} className="glow-card flex items-start gap-4 rounded-xl border border-border bg-card p-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                <d.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm tracking-widest uppercase text-muted-foreground">{d.label}</p>
                <p className="mt-1 font-semibold">{d.value}</p>
              </div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-surface/60 p-6 text-center">
            <div className="grid-circuit pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative flex flex-col items-center">
              <Mascot size={170} alt="Tevexxo mascot waiting to hear from you" />
              <p className="mt-3 font-display text-sm tracking-widest uppercase text-primary">
YOUR NEXT IDEA STARTS HERE</p>
              <p className="text-2xl font-bold">Let's turn your vision into reality.</p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
