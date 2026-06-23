"use client";

import { ReactNode } from "react";

// Lenis disabled — incompatible with CSS scroll-snap.
// Native scroll handles all scrolling behaviour.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
