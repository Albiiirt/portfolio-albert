"use client";

import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project } from "@/data/projects";

// Same pattern as components/proyectos/XuntaUnificadorVideo.tsx: a 16:9
// "glass" frame embedding a Remotion-rendered walkthrough. The difference
// here is the source material — enoturismo.comunidad.madrid is Albert's own
// real, live site, so remotion/madrid/ composites real screenshots of it
// (not a hand-built mockup) with a synthetic cursor on top, instead of
// recreating the UI as components. Hardcodes its own video path rather than
// reading project.video, which stays pointed at the hero's /covers/madrid.mp4
// cover reel — a separate, already-approved asset this component must not
// touch.
export default function MadridWalkthroughVideo({ project }: { project: Project }) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;

  return (
    <section style={{ background: project.gradient, padding: "var(--space-section-y) var(--space-section-x)" }}>
      <div className="site-content" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FadeInView>
          <p className="section-label" style={{ color: project.accentColor, marginBottom: "1.75rem", textAlign: "center" }}>
            {tx.sectionLabels.screens}
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
              aria-label={`${project.title[lang]} — recorrido por el sitio real`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/videos/madrid-walkthrough.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
