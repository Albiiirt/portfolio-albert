"use client";

import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project } from "@/data/projects";

// Used to be the same "glass" frame + gradient background pattern as
// components/proyectos/XuntaUnificadorVideo.tsx, with a Remotion-rendered
// walkthrough (remotion/madrid/) compositing real screenshots behind a
// synthetic browser-chrome frame and cursor. Albert dropped that look,
// 2026-10-15: no colored background, no decorative frame — matches the
// plain dark-background/rounded-corners treatment used everywhere else in
// this case study (the bento video grid, the mobile row). Source swapped
// from the Remotion render (madrid-walkthrough.mp4, carries its own fake
// browser chrome baked into the video) to the raw buscador.mp4 capture
// from the interficia material — no synthetic frame to begin with. Still
// hardcodes its own video path rather than reading project.video, which
// stays pointed at the hero's /covers/madrid.mp4 cover reel — a separate,
// already-approved asset this component must not touch.
const DARK_BG = "#12100e";

export default function MadridWalkthroughVideo({ project }: { project: Project }) {
  const { lang } = useLang();
  const tx = t[lang].projectPage;

  return (
    <section style={{ background: DARK_BG, padding: "var(--space-section-y) var(--space-section-x)" }}>
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
              borderRadius: 10,
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
              <source src="/videos/madrid-buscador.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
