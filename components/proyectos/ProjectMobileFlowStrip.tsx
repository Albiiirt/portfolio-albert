"use client";

import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type { MobileFlowStrip, Project } from "@/data/projects";

// Originally Madrid-only: N mobile screens, static side by side — no
// autoplay, no drag, no dots. Deliberately a separate component rather than
// a variant of ProjectScreensShowcase (that component is a carousel state
// machine; forcing a static mode inside it would complicate it for one
// project). Used to reuse ProjectScreensShowcase's own mobile glass-frame
// tokens (device bezel, dynamic-island notch) over a project.gradient
// background — dropped at Albert's request, 2026-10-15, same as everywhere
// else in the Madrid case study: flat dark background, plain rounded image,
// no device chrome.
// `data` (added for Mirazur's "cupon" tab, 2026-10-14) overrides
// `project.mobileFlowStrip` when passed, so Mirazur's own strip never mixes
// with Madrid's or with Mirazur's own "recetas" tab (which has none).
const DARK_BG = "#12100e";
const MOBILE_RADIUS = "1rem";

export default function ProjectMobileFlowStrip({ project, data }: { project: Project; data?: MobileFlowStrip }) {
  const { lang } = useLang();
  const strip = data ?? project.mobileFlowStrip;

  if (!strip?.screens.length) return null;

  return (
    <section style={{ background: DARK_BG, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content" style={{ display: "flex", justifyContent: "center", gap: "var(--space-gap-lg)", flexWrap: "wrap" }}>
        {strip.screens.map((screen, i) => (
          <FadeInView key={screen.src} delay={i * 0.08}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "clamp(200px, 22vw, 260px)",
                  aspectRatio: "9 / 19.5",
                  borderRadius: MOBILE_RADIUS,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt[lang]}
                  fill
                  sizes="260px"
                  style={{ objectFit: "cover", objectPosition: "top center" }}
                />
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: project.accentColor,
                  marginTop: "1rem",
                  textAlign: "center",
                }}
              >
                {screen.caption[lang]}
              </p>
            </div>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
