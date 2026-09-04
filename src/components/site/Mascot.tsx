import mascot from "@/assets/mascot.png";
import { cn } from "@/lib/utils";

export function Mascot({
  className,
  size = 280,
  float = true,
  priority = false,
  alt = "Tevexxo white and orange robot mascot",
}: {
  className?: string;
  size?: number;
  float?: boolean;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
      />
      <img
        src={mascot}
        alt={alt}
        width={size}
        height={size}
        loading={priority ? "eager" : "lazy"}
        style={{ width: size, height: size }}
        className={cn("select-none scale-x-[-1] drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]", float && "float-slow")}
      />
    </div>
  );
}
