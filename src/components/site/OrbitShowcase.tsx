import { Link } from "@tanstack/react-router";
import { Bot, Wallet, Factory, Truck, Palette, BarChart3 } from "lucide-react";
import { LogoMark } from "./Logo";

const orbitItems = [
  { name: "Full Stack", icon: Bot },
  { name: "Customized Projects", icon: Wallet },
  { name: "AI & Automations", icon: Factory },
  { name: "Android Application", icon: Truck },
  { name: "Docker", icon: Palette },
  { name: "Cloud & DevOps", icon: BarChart3 },
];

export function OrbitShowcase({ size = 420 }: { size?: number }) {
  const radius = size / 2 - 34;

  return (
    <div
      className="relative select-none"
      style={{ width: size, height: size }}
      aria-label="Tevexxo projects orbiting the Tevexxo logo"
    >
      <div
        aria-hidden="true"
        className="grid-circuit absolute inset-8 rounded-full border border-primary/20 opacity-70"
        style={{
          maskImage: "radial-gradient(circle, black 55%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle, black 55%, transparent 78%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-primary/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-16 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="grid size-24 place-items-center rounded-full border border-primary/40 bg-card/80 backdrop-blur shadow-[0_0_50px_-10px_var(--primary)]">
            <div className="scale-[1.35]">

          <LogoMark size={110} />
        </div>
      </div>
      </div>

      <div className="orbit-spin absolute inset-0">
        {orbitItems.map((item, i) => {
          const angle = (i / orbitItems.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <div
              key={item.name}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
            >
              <div className="orbit-counter">
                <Link
                  to="/projects"
                  className="glow-card flex items-center gap-3 rounded-full border border-border bg-card/90 px-5 py-3 text-xs font-bold tracking-wide uppercase backdrop-blur"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <item.icon className="size-5" />
                  </span>
                  <span className="whitespace-nowrap">{item.name}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
