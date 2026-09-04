import { useEffect, useRef } from "react";

const GRID = 46;
const RADIUS = 120;

export function CursorGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let target = { x: -9999, y: -9999 };
    let pos = { x: -9999, y: -9999 };
    let opacity = 0;
    let active = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (pos.x < -1000) pos = { ...target };
      active = true;
    };
    const onLeave = () => {
      active = false;
    };

    const draw = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      opacity += ((active ? 1 : 0) - opacity) * 0.08;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (opacity > 0.01 && pos.x > -1000) {
        const startX = Math.floor((pos.x - RADIUS) / GRID) * GRID;
        const endX = Math.ceil((pos.x + RADIUS) / GRID) * GRID;
        const startY = Math.floor((pos.y - RADIUS) / GRID) * GRID;
        const endY = Math.ceil((pos.y + RADIUS) / GRID) * GRID;

        for (let x = startX; x <= endX; x += GRID) {
          for (let y = startY; y <= endY; y += GRID) {
            const d = Math.hypot(x - pos.x, y - pos.y);
            if (d > RADIUS) continue;
            const a = (1 - d / RADIUS) * opacity;

            ctx.strokeStyle = `rgba(255, 106, 0, ${a * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.fillStyle = `rgba(255, 138, 51, ${a * 0.85})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 26);
        glow.addColorStop(0, `rgba(255, 122, 26, ${0.45 * opacity})`);
        glow.addColorStop(1, "rgba(255, 122, 26, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 26, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 106, 0, ${opacity})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] hidden md:block"
    />
  );
}
