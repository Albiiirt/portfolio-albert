"use client";

import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type { Project } from "@/data/projects";

// Generic counterpart of XuntaUnificadorVideo.tsx (same visual contract:
// "glass" frame — rgba border/background, --glass-shadow, 1.375rem radius —
// in a 16:9 desktop-browser proportion) for any sub-project that ships a
// real Remotion-recreated walkthrough video instead of static screens.
// Kept as a separate component rather than refactoring XuntaUnificadorVideo
// in place, since that file has unrelated work in flight elsewhere.
export default function ProjectWalkthroughVideo({
  project,
  videoSrc,
  sectionLabel,
}: {
  project: Project;
  videoSrc: string;
  sectionLabel: string;
}) {
  const { lang } = useLang();

  return (
    <section style={{ background: project.gradient, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FadeInView>
          <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem", textAlign: "center" }}>
            {sectionLabel}
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div
            style={{
              width: "min(1040px, 90vw)",
              aspectRatio: "16 / 9",
              borderRadius: "1.375rem",
              border: "1.5px solid rgba(255,255,255,0.16)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.14) inset, 0 6px 28px var(--glass-shadow)",
              background: "rgba(255,255,255,0.06)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label={`${project.title[lang]} — vista previa del producto`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
