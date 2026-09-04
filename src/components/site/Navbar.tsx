import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/products", label: "Products" },
  { to: "/projects", label: "Projects" },
  { to: "/why-tevexxo", label: "Why Tevexxo" },
  { to: "/blog", label: "Blog" },
  {to: "/about", label: "ABOUT" },
  { to: "/contact", label: "Contact" } 
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/40 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
          <LogoMark size={36} className="transition-transform duration-500 group-hover:scale-105" />
          <span className="font-display text-lg font-bold tracking-widest uppercase">
            Tev<span className="text-primary text-glow">exxo</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary bg-secondary" }}
                className="rounded-md px-4 py-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          to="/contact"
          className="glow-btn hidden rounded-md bg-primary px-5 py-2 text-sm font-bold tracking-wide uppercase text-primary-foreground md:inline-flex"
        >
          Start a project
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="rounded-md border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-primary" }}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-sm font-semibold tracking-wide uppercase text-muted-foreground hover:bg-secondary hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-md bg-primary px-3 py-3 text-center text-sm font-bold uppercase text-primary-foreground"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
