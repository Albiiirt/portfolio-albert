"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type {
  InterficiaShowcase,
  InterficiaMobileRowBlock,
  InterficiaVideoGridBlock,
} from "@/data/projects";

// Literal port of Interficia reference blocks for "Enoturismo Madrid"
// (prototype approved by Albert 2026-10-15 — see the ref-*.html files in
// the approval scratchpad). Colors and breakpoint are the prototype's own
// literal values, not the site's theme tokens — same precedent as
// MadridPage's own Hero gradient, since this reproduces another site's
// design verbatim rather than adapting to the portfolio's own look.
//
// Scope correction (Albert, 2026-10-15): "tal cual" meant the reference
// mockups literally, not an invitation to add marketing copy or new UI
// chrome that wasn't in the reference. Removed: the eyebrow/heading/dek/
// "see all" text block (that was the real Comunidad de Madrid site's own
// marketing copy, not portfolio case-study content) and the pause/play
// button overlay on every video (my own addition, not part of what was
// shown). Bloque 1 (vídeo + franja de 3 fotos, right under the Hero) was
// removed outright at Albert's request, 2026-10-15 — he didn't want that
// content at the top of the page at all. The cream phone-bezel background
// in Bloque 2 (the prototype's own literal color) was dropped the same
// day too — Albert flagged it as an unwanted colored frame around the 3
// mobile shots, not a deliberate part of the case-study presentation.

const DARK_BG = "#12100e";
const CAPTION_LIGHT = "#cfc9bd";

// ── Bloque 2 — 3 capturas de móvil en fila (ref-2-moviles-fila.html) ───────
function MobileRowBlock({ data }: { data: InterficiaMobileRowBlock }) {
  const { lang } = useLang();
  return (
    <section style={{ background: DARK_BG, padding: "88px var(--space-section-x) 120px" }}>
      <div className="site-content">
        <div className="madrid-interficia-mobile-row">
          {data.shots.map((shot) => (
            <div key={shot.src}>
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <Image
                  src={shot.src}
                  alt={shot.alt[lang]}
                  width={1170}
                  height={2532}
                  sizes="(max-width: 860px) 100vw, 28vw"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </div>
              <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.4, color: CAPTION_LIGHT }}>{shot.caption[lang]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Bloque 3 — grid de 3 vídeos a igual ancho (ref-3-grid-desigual.html,
// reajustado a petición de Albert: las 3 columnas miden lo mismo, y cada
// vídeo conserva su alto natural en vez de recortarse con object-fit:cover
// dentro de una caja fija — así ninguno queda cortado. Rendered as its own
// component so MadridPage can place it wherever it wants in the page
// (moved to just before "Aprendizajes" per Albert, 2026-10-15), separate
// from the videoStrip/mobileRow pairing at the top. ────────────────────────
function VideoGridBlock({ data }: { data: InterficiaVideoGridBlock }) {
  const panelStyle: CSSProperties = {
    borderRadius: 10,
    overflow: "hidden",
    background: "#1c1a17",
  };
  const videoStyle: CSSProperties = { display: "block", width: "100%", height: "auto" };
  // panel-b (zonas-mapa.mp4) is a raw capture of the real Comunidad de
  // Madrid page: the card + map sit inside a wide margin of the page's own
  // white background (unlike panel-a/c, which are full-bleed app screens),
  // so at natural size that margin reads as a light block against the dark
  // section. A centered scale (paint-only transform, doesn't affect the
  // box's own layout size) zooms past most of that margin on all 4 sides.
  // Kept deliberately short of the measured content edge (1.1, not the
  // ~1.21 the raw frame bbox implied) — at 1.21 the rendered video clipped
  // the first letter of the eyebrow/paragraph text on the left, so the
  // margin isn't fully gone, but nothing from the real content is cut.
  const videoStyleZoomed: CSSProperties = { ...videoStyle, transform: "scale(1.15)", transformOrigin: "center" };

  const renderVideo = (src: string, style: CSSProperties = videoStyle) => (
    <video autoPlay loop muted playsInline style={style}>
      <source src={src} type="video/mp4" />
    </video>
  );

  return (
    <section style={{ background: DARK_BG, padding: "var(--space-section-y) var(--space-section-x) 120px" }}>
      <div className="site-content">
        <FadeInView>
          {/* 2 independent masonry columns, not a single grid — the 3 videos
              have different native aspect ratios, so a shared grid row
              would size row 1 to its tallest cell, leaving uneven empty
              space under the shorter video before row 2 starts. Each
              column instead stacks its own videos with a fixed 24px gap
              between them (same gap value as the column gap), so the
              vertical rhythm matches the horizontal one regardless of how
              tall any individual video is. Column 1: A, then C below it.
              Column 2: B, then D below it — D is the buscador.mp4 capture
              (search → results → bodega detail), swapped in 2026-10-15 for
              the contenidos-s2 video that used to live here (that one moved
              next to the "El sistema" paragraph instead, see
              MadridInterficiaSystemVideo below). Both A/C and D are
              full-bleed app/page captures with no white margin to crop, so
              they render at natural size like A and C — no zoom needed. */}
          <div className="madrid-interficia-bento">
            <div className="madrid-interficia-bento-col">
              <div className="panel-a" style={panelStyle}>{renderVideo(data.panelA.src)}</div>
              <div className="panel-c" style={panelStyle}>{renderVideo(data.panelC.src)}</div>
            </div>
            <div className="madrid-interficia-bento-col">
              <div className="panel-b" style={panelStyle}>{renderVideo(data.panelB.src, videoStyleZoomed)}</div>
              {data.panelD && (
                <div className="panel-d" style={panelStyle}>{renderVideo(data.panelD.src)}</div>
              )}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}

export default function MadridInterficiaShowcase({ data }: { data?: InterficiaShowcase }) {
  if (!data) return null;
  return <MobileRowBlock data={data.mobileRow} />;
}

export function MadridInterficiaVideoGrid({ data }: { data?: InterficiaShowcase }) {
  if (!data) return null;
  return <VideoGridBlock data={data.videoGrid} />;
}

// Placed by MadridPage next to the "El sistema" paragraph (contenidos-s2.mp4
// moved here from the video grid's panel-d, 2026-10-15). Same crop as it had
// there: 1.06x centered scale — its content sits closer to the frame edges
// than panel-b's (the "Inicio" breadcrumb read "nicio" at 1.15x), so it
// can't reuse panel-b's heavier zoom.
export function MadridInterficiaSystemVideo({ data }: { data?: InterficiaShowcase }) {
  if (!data?.systemVideo) return null;
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", background: "#1c1a17" }}>
      <video autoPlay loop muted playsInline style={{ display: "block", width: "100%", height: "auto", transform: "scale(1.06)", transformOrigin: "center" }}>
        <source src={data.systemVideo.src} type="video/mp4" />
      </video>
    </div>
  );
}
