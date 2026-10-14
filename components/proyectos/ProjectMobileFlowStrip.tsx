"use client";

import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type { Project } from "@/data/projects";

// Madrid-only: 3 mobile screens, static side by side — no autoplay, no
// drag, no dots. Deliberately a separate component rather than a variant of
// ProjectScreensShowcase (that component is a carousel state machine;
// forcing a static mode inside it would complicate it for one project).
// Reuses ProjectScreensShowcase's own mobile glass-frame tokens literally.
const MOBILE_OUTER_RADIUS = "2.75rem";
const MOBILE_INNER_RADIUS = "2.25rem";

export default function ProjectMobileFlowStrip({ project }: { project: Project }) {
  const { lang } = useLang();
  const strip = project.mobileFlowStrip;

  if (!strip?.screens.length) return null;

  return (
    <section style={{ background: project.gradient, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content" style={{ display: "flex", justifyContent: "center", gap: "var(--space-gap-lg)", flexWrap: "wrap" }}>
        {strip.screens.map((screen, i) => (
          <FadeInView key={screen.src} delay={i * 0.08}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div
                style={{
                  width: "clamp(200px, 22vw, 260px)",
                  aspectRatio: "9 / 19.5",
                  borderRadius: MOBILE_OUTER_RADIUS,
                  background: "rgba(255,255,255,0.09)",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 4px 20px rgba(0,0,0,0.5)",
                  padding: "10px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: MOBILE_INNER_RADIUS,
                    overflow: "hidden",
                    background: "#000",
                  }}
                >
                  <Image
                    src={screen.src}
                    alt={screen.alt[lang]}
                    fill
                    sizes="260px"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: 14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "34%",
                      height: 20,
                      borderRadius: "100px",
                      background: "rgba(0,0,0,0.85)",
                      pointerEvents: "none",
                    }}
                  />
                </div>
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
