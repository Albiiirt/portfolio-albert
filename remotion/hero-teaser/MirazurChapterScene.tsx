import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import type { CursorHop } from "../shared/Cursor";
import { FigmaChrome } from "../shared/FigmaChrome";
import { FlashCard } from "./FlashCard";
import { HeadlineText } from "./HeadlineText";
import { CHAPTER_GRADIENT } from "./tokens";

// ── Capítulo 4 — Mirazur, 90 frames (3.0s). public/covers/mirazur.mp4
// (already in the repo, reused as-is, nothing to process) with Mirazur's own
// olive gradient washed on top. A second FigmaChrome beat — the coupon
// form's own layer selected, properties panel showing the real
// accentColor — followed by its own separate ≤0.6s FlashCard of the real
// capture, unlike Bullipedia's nested thumbnail: the brief calls for the
// flash here as its OWN floating tilted card, "mismo patrón que Madrid".
export const MIRAZUR_GLIMPSE_DURATION = 90;

const SHOT_SRC = "screenshots/mirazur-cupon-walkthrough/15-formulario-cupon-escribiendo.jpg";
const SHOT_W = 1568;
const SHOT_H = 662;

const F = {
  headlineStart: 10, // wipe 10–22, tracks 22–34
  chromeIn: 20,
  chromeInEnd: 34,
  dragStart: 38,
  dragLand: 56,
  flashStart: 64,
  flashDuration: 18, // ≤0.6s budget, exact
};

const SELECTION = { xPct: 10, yPct: 54, wPct: 46, hPct: 24 };
const MIRAZUR_GREEN = "#7aad3a";

function LandingPreview() {
  const blocks: { label: string; active?: boolean; height: string }[] = [
    { label: "Hero", height: "26%" },
    { label: "Formulario cupón", active: true, height: "30%" },
    { label: "CTA", height: "18%" },
    { label: "Footer", height: "16%" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {blocks.map((b) => (
        <div
          key={b.label}
          style={{
            height: b.height,
            borderRadius: 6,
            background: b.active ? "rgba(122,173,58,0.18)" : "rgba(255,255,255,0.05)",
            border: b.active ? `1.5px solid ${MIRAZUR_GREEN}` : "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 600, color: b.active ? MIRAZUR_GREEN : "rgba(255,255,255,0.4)", fontFamily: "'Space Grotesk', sans-serif" }}>{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export function MirazurChapterScene() {
  const frame = useCurrentFrame();

  const bgDim = interpolate(frame, [F.chromeIn, F.chromeInEnd], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chromeOpacity = interpolate(frame, [F.chromeIn, F.chromeInEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chromeY = interpolate(frame, [F.chromeIn, F.chromeInEnd], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const handleTarget = { x: SELECTION.xPct + SELECTION.wPct, y: SELECTION.yPct + SELECTION.hPct };
  const hops: CursorHop[] = [
    { from: { x: 60, y: 30 }, to: { x: 60, y: 30 }, fromFrame: F.chromeInEnd, toFrame: F.dragStart },
    { from: { x: 60, y: 30 }, to: handleTarget, fromFrame: F.dragStart, toFrame: F.dragLand, click: true },
  ];

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <OffthreadVideo src={staticFile("covers/mirazur.mp4")} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
      <AbsoluteFill style={{ background: CHAPTER_GRADIENT.mirazur, opacity: 0.5, mixBlendMode: "multiply" }} />
      <AbsoluteFill style={{ background: "#0d1206", opacity: bgDim }} />

      <div style={{ position: "absolute", left: 80, top: 88, maxWidth: 1000 }}>
        <HeadlineText text="UNA LANDING RETOMADA A MEDIAS" startFrame={F.headlineStart} fontSize={46} color="#ffffff" textShadow="0 4px 24px rgba(0,0,0,0.6)" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 64,
          opacity: chromeOpacity,
          transform: `translateY(${chromeY}px)`,
          borderRadius: 14,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 40px 90px rgba(0,0,0,0.55)",
        }}
      >
        <FigmaChrome
          fileName="Mirazur — Landing cupón.fig"
          accentColor={MIRAZUR_GREEN}
          layers={[{ name: "Hero" }, { name: "Formulario cupón", active: true }, { name: "CTA" }, { name: "Footer" }]}
          properties={{ x: 96, y: 420, w: 420, h: 180, color: MIRAZUR_GREEN, radius: 8, opacity: 100 }}
          selection={SELECTION}
          cursorHops={hops}
        >
          <LandingPreview />
        </FigmaChrome>
      </div>

      <FlashCard startFrame={F.flashStart} durationFrames={F.flashDuration} targetWidth={820} nativeWidth={SHOT_W} nativeHeight={SHOT_H}>
        <Img
          src={staticFile(SHOT_SRC)}
          alt="Formulario del cupón de Mirazur, campo Nombre con texto escrito"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </FlashCard>
    </AbsoluteFill>
  );
}
