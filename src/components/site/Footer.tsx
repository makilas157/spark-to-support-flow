import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { LogoMark } from "./Logo";
import { Mascot } from "./Mascot";

export function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="relative mt-24 border-t border-border bg-surface/40">
      <div className="grid-circuit pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark size={32} />
            <span className="font-display text-lg font-bold tracking-widest uppercase">
              Tev<span className="text-primary">exxo</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Engineering futuristic digital products — web platforms, AI systems and automation built
            for teams that refuse to move slowly.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Linkedin, Github, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Tevexxo social link"
                className="glow-btn grid size-10 place-items-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm tracking-widest uppercase text-primary">Navigate</h4>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/products", label: "Products" },
              { to: "/projects", label: "Projects" },
              { to: "/why-tevexxo", label: "Why Tevexxo" },
              { to: "/blog", label: "Blog" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h4 className="font-display text-sm tracking-widest uppercase text-primary">Say hello</h4>
          <p className="text-muted-foreground">hello@tevexxo.com</p>
          <p className="text-muted-foreground">Remote-first · Worldwide</p>
          <Mascot size={110} className="-mt-2" alt="Tevexxo mascot waving in the footer" />
        </div>
      </div>

      <div className="relative border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © <span data-year>{year}</span> Tevexxo. All rights reserved.
          </p>
          <p className="tracking-wide uppercase">Built for the next decade of the web</p>
        </div>
      </div>
    </footer>
  );
}
