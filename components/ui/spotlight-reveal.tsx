"use client";

// Flashlight-style reveal: the hero sits fully dark by default, and a soft,
// feathered circle of light follows the cursor, showing the "real"
// background underneath wherever it passes. Tracks the cursor on `window`
// (same pattern as CustomCursor.tsx) so it keeps working regardless of
// what's stacked on top of it, then lerps toward that target each frame and
// writes the result straight to CSS vars — no React re-renders on move.

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SpotlightRevealProps {
  className?: string;
  /** Base colour/gradient behind `revealContent` — also what shows on its
   * own if `revealContent` is left empty. */
  revealBackground?: string;
  /** What the light actually reveals — an image, a tiled grid, whatever.
   * Rendered full-bleed (absolute inset-0) above `revealBackground`. */
  revealContent?: ReactNode;
  /** Radius of the fully-revealed core before it starts feathering, in px. */
  radius?: number;
}

export function SpotlightReveal({
  className,
  revealBackground = "#000",
  revealContent,
  radius = 260,
}: SpotlightRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    let targetX = 0;
    let targetY = 0;
    let targetR = 0;
    let curX = 0;
    let curY = 0;
    let curR = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      targetX = x;
      targetY = y;
      targetR = inside ? radius : 0;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      curX = lerp(curX, targetX, 0.14);
      curY = lerp(curY, targetY, 0.14);
      curR = lerp(curR, targetR, 0.1);
      overlay.style.setProperty("--spot-x", `${curX}px`);
      overlay.style.setProperty("--spot-y", `${curY}px`);
      overlay.style.setProperty("--spot-r", `${Math.max(curR, 0)}px`);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [radius]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* The "real" background — only ever seen through the light. */}
      <div className="absolute inset-0" style={{ background: revealBackground }} />
      {revealContent && <div className="absolute inset-0 overflow-hidden">{revealContent}</div>}
      {/* Dark cover with a soft hole cut out at the cursor — feathered over
          most of its radius so there's no hard circle edge. */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle var(--spot-r, 0px) at var(--spot-x, 50%) var(--spot-y, 50%), transparent 0%, transparent 30%, #000 100%)",
        }}
      />
    </div>
  );
}
