"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import FadeInView from "@/components/FadeInView";
import { useLang } from "@/lib/LanguageContext";
import type {
  InterficiaShowcase,
  InterficiaVideoStripBlock,
  InterficiaMobileRowBlock,
  InterficiaVideoGridBlock,
  LocalizedText,
} from "@/data/projects";

// Literal port of 3 Interficia reference blocks for "Enoturismo Madrid"
// (prototype approved by Albert 2026-10-15 — see the 3 ref-*.html files in
// the approval scratchpad). Colors and breakpoint are the prototype's own
// literal values, not the site's theme tokens — same precedent as
// MadridPage's own Hero gradient, since this reproduces another site's
// design verbatim rather than adapting to the portfolio's own look.
// Renders all 3 blocks in order; shown between the Hero and "El proyecto"
// in place of the old ProjectDeviceShowcase/ProjectMobileFlowStrip pairing.

const PAPER = "#f5f2ee";
const INK = "#17120f";
const INK_SOFT = "#544d46";
const RED = "#c8102e";

const DARK_BG = "#12100e";
const CREAM = "#f5f1e8";
const CAPTION_LIGHT = "#cfc9bd";

// ── Shared: autoplay video with a visible pause/play toggle (WCAG 2.2.2 —
// content in motion for more than 5s needs a way to pause it). ───────────────
function VideoWithToggle({
  src,
  accessibleLabel,
  pauseLabel,
  playLabel,
  style,
  videoStyle,
}: {
  src: string;
  accessibleLabel: string;
  pauseLabel: string;
  playLabel: string;
  style?: CSSProperties;
  videoStyle?: CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div style={{ position: "relative", ...style }}>
      <video ref={videoRef} autoPlay loop muted playsInline style={{ display: "block", width: "100%", ...videoStyle }}>
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${(playing ? pauseLabel : playLabel)}: ${accessibleLabel}`}
        aria-pressed={!playing}
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.75)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.55)")}
      >
        {playing ? (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <rect x="2.3" y="1.5" width="2.8" height="10" rx="0.8" fill="currentColor" />
            <rect x="7.9" y="1.5" width="2.8" height="10" rx="0.8" fill="currentColor" />
          </svg>
        ) : (
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M3 1.3 11 6.5 3 11.7Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}

// ── Bloque 1 — vídeo + franja de 3 fotos (ref-1-video-fondo.html) ──────────
function VideoStripBlock({
  data,
  pauseLabel,
  playLabel,
}: {
  data: InterficiaVideoStripBlock;
  pauseLabel: LocalizedText;
  playLabel: LocalizedText;
}) {
  const { lang } = useLang();
  return (
    <section style={{ background: PAPER, padding: "56px var(--space-section-x) 120px" }}>
      <div className="site-content">
        <FadeInView>
          <div style={{ position: "relative", borderRadius: 4, overflow: "hidden" }}>
            <VideoWithToggle
              src={data.videoSrc}
              accessibleLabel={data.videoLabel[lang]}
              pauseLabel={pauseLabel[lang]}
              playLabel={playLabel[lang]}
              videoStyle={{ height: "auto" }}
            />
          </div>
        </FadeInView>

        <FadeInView delay={0.08}>
          <div
            style={{
              marginTop: 96,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: 620 }}>
              <p
                style={{
                  color: RED,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  margin: "0 0 14px",
                }}
              >
                {data.eyebrow[lang]}
              </p>
              <h2
                style={{
                  fontFamily: 'Georgia, "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif',
                  fontWeight: 400,
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.12,
                  margin: "0 0 16px",
                  color: INK,
                }}
              >
                {data.heading[lang]} <em style={{ fontStyle: "italic" }}>{data.headingEmphasis[lang]}</em>
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: INK_SOFT, margin: 0, maxWidth: "48ch" }}>{data.dek[lang]}</p>
            </div>
            <a
              href={data.seeAllHref}
              style={{
                flexShrink: 0,
                color: RED,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {data.seeAllLabel[lang]}
            </a>
          </div>
        </FadeInView>

        <FadeInView delay={0.14}>
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
function VideoGridBlock({
  data,
  pauseLabel,
  playLabel,
}: {
  data: InterficiaVideoGridBlock;
  pauseLabel: LocalizedText;
  playLabel: LocalizedText;
}) {
  const { lang } = useLang();
  const panelStyle: CSSProperties = {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    background: "#1c1a17",
  };
  const videoFillStyle: CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

  const panels: { className: string; src: string; label: LocalizedText }[] = [
    { className: "panel-a", src: data.panelA.src, label: data.panelA.label },
    { className: "panel-b", src: data.panelB.src, label: data.panelB.label },
    { className: "panel-c", src: data.panelC.src, label: data.panelC.label },
  ];

  return (
    <section style={{ background: DARK_BG, padding: "0 var(--space-section-x) 120px" }}>
      <div className="site-content">
        <FadeInView>
          <div className="madrid-interficia-bento">
            {panels.map((panel) => (
              <div key={panel.className} className={panel.className} style={panelStyle}>
                <VideoWithToggle
                  src={panel.src}
                  accessibleLabel={panel.label[lang]}
                  pauseLabel={pauseLabel[lang]}
                  playLabel={playLabel[lang]}
                  style={{ position: "absolute", inset: 0 }}
                  videoStyle={videoFillStyle}
                />
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
      <VideoStripBlock data={data.videoStrip} pauseLabel={data.pauseLabel} playLabel={data.playLabel} />
      <MobileRowBlock data={data.mobileRow} />
      <VideoGridBlock data={data.videoGrid} pauseLabel={data.pauseLabel} playLabel={data.playLabel} />
    </>
  );
}
