import logo from "@/assets/tevexxo-logo.png";
import { cn } from "@/lib/utils";

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-grid place-items-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-md opacity-60"
      />
      <img
        src={logo}
        alt="Tevexxo logo"
        width={size}
        height={size}
        className="block object-contain"
        style={{
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "1px",
    filter: "drop-shadow(0 0 0px var(--primary)) drop-shadow(0 0 2px var(--primary))",
  }}
      />
    </span>
  );
}
