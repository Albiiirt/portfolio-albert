import { useRef } from "react";
import type { RefObject } from "react";
import { useScroll, useTransform, motionValue, animate, useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";

export const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

export const C_HIDDEN = "inset(0% 0% 100% 0%)";
export const C_OPEN   = "inset(0% 0% 0% 0%)";
export const C_EXIT   = "inset(100% 0% 0% 0%)";

export const fadeIn = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export function useSectionScroll(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 50%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);
  return { opacity, filter };
}

// Keep useStickySection for WorkSection scroll-tracking
export function useStickySection(
  ref: RefObject<HTMLElement | null>,
  { entryEnd = 0.18, exitStart = 0.72 }: { entryEnd?: number; exitStart?: number } = {}
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const exitEnd = Math.min(exitStart + 0.2, 1);
  const contentClip = useTransform(
    scrollYProgress,
    [0, entryEnd, exitStart, exitEnd],
    [
      "inset(0% 0% 100% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(100% 0% 0% 0%)",
    ]
  );
  return { scrollYProgress, contentClip };
}

// Per-element staggered opacity animation for sticky sections.
// Entry: each element fades in independently when section enters sticky phase.
// Exit: scroll-driven, each element fades out with staggered timing.
// No y-movement — elements appear and disappear in place.
export function useStaggeredStickySection(
  ref: RefObject<HTMLElement | null>,
  count: number,
  {
    exitStart = 0.72,
    exitStagger = 0.025,
    entryStagger = 0.1,
  }: { exitStart?: number; exitStagger?: number; entryStagger?: number } = {}
): MotionValue<number>[] {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const ops = useRef<MotionValue<number>[]>([]);
  if (ops.current.length !== count) {
    ops.current = Array.from({ length: count }, () => motionValue(0));
  }

  const hasEntered = useRef(false);
  const controls = useRef<Array<{ stop(): void }>>([]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Entry: fire staggered fade-in when section first becomes sticky
    if (v > 0.02 && !hasEntered.current) {
      hasEntered.current = true;
      controls.current.forEach(c => c.stop());
      controls.current = ops.current.map((op, i) =>
        animate(op, 1, { delay: i * entryStagger, duration: 0.55, ease: EASE })
      );
    }

    // Reset when scrolled back before section entry
    if (v < 0.01 && hasEntered.current) {
      hasEntered.current = false;
      controls.current.forEach(c => c.stop());
      ops.current.forEach(op => op.set(0));
    }

    // Scroll-driven exit: each element fades out at staggered scroll positions
    if (v >= exitStart) {
      ops.current.forEach((op, i) => {
        const start = exitStart + i * exitStagger;
        const end = start + 0.14;
        const p = Math.min(Math.max((v - start) / (end - start), 0), 1);
        op.set(1 - p);
      });
    } else if (v < exitStart && hasEntered.current) {
      ops.current.forEach(op => { if (op.get() < 1) op.set(1); });
    }
  });

  return ops.current;
}

export function useHeroScrollOut(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -12]);
  return { opacity, scale, y };
}
