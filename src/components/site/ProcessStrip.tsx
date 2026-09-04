import { Lightbulb, ClipboardEdit, Coffee, Code2, ClipboardCheck, Rocket, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const nodes: { icon: LucideIcon; label: string }[] = [
  { icon: Lightbulb, label: "Idea" },
  { icon: ClipboardEdit, label: "Plan" },
  { icon: Coffee, label: "Design" },
  { icon: Code2, label: "Develop" },
  { icon: ClipboardCheck, label: "Test" },
  { icon: Rocket, label: "Deploy" },
  { icon: Headset, label: "Support" },
];

export function ProcessStrip() {
  return (
    <div className="relative w-full overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="relative mx-auto flex min-w-[780px] items-start justify-between gap-2 px-4 py-6">
        {/* connecting line + travelling pulse */}
        <div className="pointer-events-none absolute top-[46px] right-8 left-8 h-px">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,var(--color-primary)_0_3px,transparent_3px_10px)] opacity-50" />
          <div className="process-pulse absolute top-1/2 h-[3px] w-24 -translate-y-1/2 rounded-full" />
        </div>

        {nodes.map(({ icon: Icon, label }) => (
          <div key={label} className="relative z-10 flex w-24 shrink-0 flex-col items-center">
            <span className="hex-node grid size-[68px] place-items-center text-primary">
              <Icon className="size-6" strokeWidth={1.6} />
            </span>
            <span className="mt-3 text-xs font-medium tracking-wide text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
