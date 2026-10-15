"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type {
  InterficiaShowcase,
  InterficiaVideoStripBlock,
  InterficiaMobileRowBlock,
  InterficiaVideoGridBlock,
} from "@/data/projects";

// Literal port of 3 Interficia reference blocks for "Enoturismo Madrid"
// (prototype approved by Albert 2026-10-15 — see the 3 ref-*.html files in
// the approval scratchpad). Colors and breakpoint are the prototype's own
// literal values, not the site's theme tokens — same precedent as
// MadridPage's own Hero gradient, since this reproduces another site's
// design verbatim rather than adapting to the portfolio's own look.
// Renders all 3 blocks in order; shown between the Hero and "El proyecto"
// in place of the old ProjectDeviceShowcase/ProjectMobileFlowStrip pairing.
//
// Scope correction (Albert, 2026-10-15): "tal cual" meant the 3 reference
// mockups literally, not an invitation to add marketing copy or new UI
// chrome that wasn't in the reference. Removed: the eyebrow/heading/dek/
// "see all" text block in Bloque 1 (that was the real Comunidad de Madrid
// site's own marketing copy, not portfolio case-study content) and the
// pause/play button overlay on every video (my own addition, not part of
// what was shown). Just the plain autoplay videos + photos now.

const PAPER = "#f5f2ee";
const DARK_BG = "#12100e";
const CREAM = "#f5f1e8";
const CAPTION_LIGHT = "#cfc9bd";

// ── Bloque 1 — vídeo + franja de 3 fotos (ref-1-video-fondo.html) ──────────
function VideoStripBlock({ data }: { data: InterficiaVideoStripBlock }) {
  const { lang } = useLang();
  return (
    <section style={{ background: PAPER, padding: "56px var(--space-section-x) 120px" }}>
      <div className="site-content">
        <FadeInView>
          <div style={{ position: "relative", borderRadius: 4, overflow: "hidden" }}>
            <video autoPlay loop muted playsInline style={{ display: "block", width: "100%", height: "auto" }}>
              <source src={data.videoSrc} type="video/mp4" />
            </video>
          </div>
        </FadeInView>

        <FadeInView delay={0.08}>
          <div className="madrid-interficia-photo-strip" style={{ marginTop: 40 }}>
            {data.photos.map((photo) => (
              <div className="frame" key={photo.src}>
                <Image
                  src={photo.src}
                  alt={photo.alt[lang]}
                  fill
                  sizes="(max-width: 860px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

// ── Bloque 2 — 3 capturas de móvil en fila (ref-2-moviles-fila.html) ───────
function MobileRowBlock({ data }: { data: InterficiaMobileRowBlock }) {
  const { lang } = useLang();
  return (
    <section style={{ background: DARK_BG, padding: "88px var(--space-section-x) 120px" }}>
      <div className="site-content">
        <div className="madrid-interficia-mobile-row">
          {data.shots.map((shot) => (
            <div key={shot.src}>
              <div style={{ background: CREAM, borderRadius: 6, padding: "14px 14px 0", overflow: "hidden" }}>
                <div style={{ borderRadius: 3, overflow: "hidden" }}>
                  <Image
                    src={shot.src}
                    alt={shot.alt[lang]}
                    width={1170}
                    height={2532}
                    sizes="(max-width: 860px) 100vw, 33vw"
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </div>
              </div>
              <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.4, color: CAPTION_LIGHT }}>{shot.caption[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bloque 3 — grid desigual de 3 vídeos (ref-3-grid-desigual.html,
// versión corregida: A y B en fila 1, C en fila 2 bajo A, col. 2 fila 2
// vacía — zonas-mapa.mp4 es panorámico y se recortaba mal en vertical). ────
function VideoGridBlock({ data }: { data: InterficiaVideoGridBlock }) {
  const panelStyle: CSSProperties = {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    background: "#1c1a17",
  };
  const videoFillStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

  const panels: { className: string; src: string }[] = [
    { className: "panel-a", src: data.panelA.src },
    { className: "panel-b", src: data.panelB.src },
    { className: "panel-c", src: data.panelC.src },
  ];

  return (
    <section style={{ background: DARK_BG, padding: "0 var(--space-section-x) 120px" }}>
      <div className="site-content">
        <FadeInView>
          <div className="madrid-interficia-bento">
            {panels.map((panel) => (
              <div key={panel.className} className={panel.className} style={panelStyle}>
                <video autoPlay loop muted playsInline style={videoFillStyle}>
                  <source src={panel.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

export default function MadridInterficiaShowcase({ data }: { data?: InterficiaShowcase }) {
  if (!data) return null;
  return (
    <>
      <VideoStripBlock data={data.videoStrip} />
      <MobileRowBlock data={data.mobileRow} />
      <VideoGridBlock data={data.videoGrid} />
    </>
  );
}
