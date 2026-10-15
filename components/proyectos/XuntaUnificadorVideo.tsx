"use client";

import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import { t } from "@/data/translations";
import type { Project } from "@/data/projects";

// Desktop counterpart of ProjectScreensShowcase, used only for this case: the
// real product is a desktop browser tool (a duplicate-record unifier), not a
// mobile app, so it doesn't fit that component's phone-shaped frame. Used to
// reuse the "glass" frame language (rgba border, --glass-shadow, radius) in
// a 16:9 desktop-browser proportion over a project.gradient background, same
// as ProjectWalkthroughVideo — dropped site-wide at Albert's request,
// 2026-10-15 (see MadridWalkthroughVideo's removal for the reference): flat
// dark background, plain rounded corners, no frame. Still embeds the
// Remotion-recreated walkthrough video (remotion/xunta/ — real UI copy/
// colors from the actual prototype, fictitious data).
const DARK_BG = "#12100e";

export default function XuntaUnificadorVideo({ project }: { project: Project }) {
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
              aria-label={`${project.title[lang]} — vista previa del producto`}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src="/videos/xunta-unificador.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
