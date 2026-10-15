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
// content at the top of the page at all.

const DARK_BG = "#12100e";
const CREAM = "#f5f1e8";
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
    <section style={{ background: DARK_BG, padding: "0 var(--space-section-x) 120px" }}>
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
              Column 2: B. A future 4th video would go into column 2. */}
          <div className="madrid-interficia-bento">
            <div className="madrid-interficia-bento-col">
              <div className="panel-a" style={panelStyle}>{renderVideo(data.panelA.src)}</div>
              <div className="panel-c" style={panelStyle}>{renderVideo(data.panelC.src)}</div>
            </div>
            <div className="madrid-interficia-bento-col">
              <div className="panel-b" style={panelStyle}>{renderVideo(data.panelB.src, videoStyleZoomed)}</div>
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
