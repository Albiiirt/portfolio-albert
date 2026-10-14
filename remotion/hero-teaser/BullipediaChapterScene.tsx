import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { BULLIPEDIA, EASE, EASE_BOOK_HOVER, loadBullipediaFont } from "../bullipedia/tokens";
import { BookCover, fontStyle } from "../bullipedia/ui";
import type { CursorHop } from "../shared/Cursor";
import { FigmaChrome } from "../shared/FigmaChrome";
import { HeadlineText } from "./HeadlineText";

loadBullipediaFont();

// ── Capítulo 2 — Bullipedia, 105 frames (3.5s). The chapter that's
// DIFFERENT from Madrid/Xunta/Mirazur on purpose: instead of a glimpse of
// the shipped product, it shows the DESIGN PROCESS behind it — the new
// shared FigmaChrome hosting the BookCover (its own existing rotateY tilt,
// reused verbatim) as "what's being designed", with only a ≤0.4s thumbnail
// of the real shipped screen inside the canvas, never full-screen. The
// elBulli Foundation's own building (cover-elbulli.webp, Albert's preferred
// swap over the earlier generic food-plating stock) is the chapter's
// backdrop — panned/zoomed slowly (cameraAt's own scale+transformOrigin
// technique) and visible as a thin margin around the floating Figma window,
// never literally "inside" the tool.
export const BULLIPEDIA_GLIMPSE_DURATION = 105;

const PLAN_ORIGEN_COVER = "mockups/bullipedia-html/assets/portada_contra25_jpg_1_scaled_b6e15db3ee-4969fe.jpeg";
const REAL_SHOT_SRC = "projects/elbulli-marketplace/device-desktop.png";
const REAL_SHOT_W = 1440;
const REAL_SHOT_H = 662;

const F = {
  headlineStart: 0, // wipe 0–12, tracks 12–24
  chromeIn: 20,
  chromeInEnd: 34,
  hoverStart: 36,
  hoverEnd: 56,
  clickLand: 68,
  thumbStart: 90,
  thumbDuration: 12, // ≤0.4s budget, exact
};

const SELECTION = { xPct: 7, yPct: 12, wPct: 20, hPct: 60 };

export function BullipediaChapterScene() {
  const frame = useCurrentFrame();

  // cameraAt's own scale+transformOrigin pan/zoom technique, reapplied to
  // the elBulli building cover instead of a case-study screenshot — a slow
  // single push across the chapter's own full run (no in/out keyframes
  // needed, this is ambient background, not a shot with its own cut).
  const bgScale = interpolate(frame, [0, BULLIPEDIA_GLIMPSE_DURATION], [1, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const bgDim = interpolate(frame, [F.chromeIn, F.chromeInEnd], [0, 0.55], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chromeOpacity = interpolate(frame, [F.chromeIn, F.chromeInEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chromeY = interpolate(frame, [F.chromeIn, F.chromeInEnd], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const hoverProgress = interpolate(frame, [F.hoverStart, F.hoverEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_BOOK_HOVER });
  const rotateY = -34 * hoverProgress;
  const clickBounce =
    frame >= F.clickLand && frame <= F.clickLand + 5
      ? interpolate(frame, [F.clickLand, F.clickLand + 2, F.clickLand + 5], [1, 0.96, 1], { extrapolateRight: "clamp" })
      : 1;

  const thumbOpacity = interpolate(
    frame,
    [F.thumbStart, F.thumbStart + 4, F.thumbStart + F.thumbDuration - 4, F.thumbStart + F.thumbDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const handleTarget = { x: SELECTION.xPct + SELECTION.wPct, y: SELECTION.yPct + SELECTION.hPct };
  const hops: CursorHop[] = [
    { from: { x: 55, y: 30 }, to: { x: 55, y: 30 }, fromFrame: F.chromeInEnd, toFrame: F.hoverStart },
    { from: { x: 55, y: 30 }, to: handleTarget, fromFrame: F.hoverStart, toFrame: F.clickLand, click: true },
  ];

  return (
    <AbsoluteFill style={{ background: "#0a0a0a" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${bgScale})`, transformOrigin: "58% 40%" }}>
        <Img src={staticFile("covers/cover-elbulli.webp")} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <AbsoluteFill style={{ background: "#0a1420", opacity: bgDim }} />

      <div style={{ position: "absolute", left: 80, top: 88, maxWidth: 1000 }}>
        <HeadlineText text="UN ARCHIVO DE 40 AÑOS DE COCINA" startFrame={F.headlineStart} fontSize={46} color="#ffffff" textShadow="0 4px 24px rgba(0,0,0,0.6)" />
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
          fileName="Bullipedia — Plan Origen.fig"
          accentColor={BULLIPEDIA.green}
          layers={[
            { name: "Portada", active: true },
            { name: "Índice" },
            { name: "Capítulo 1 — Identidad" },
            { name: "Capítulo 2 — Plan" },
            { name: "Recursos" },
          ]}
          properties={{ x: 320, y: 180, w: 240, h: 320, color: BULLIPEDIA.green, radius: 4, opacity: 100 }}
          selection={SELECTION}
          cursorHops={hops}
        >
          <div style={{ ...fontStyle, position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", padding: "0 0 0 6%" }}>
            <div style={{ transform: `scale(${clickBounce})`, transformOrigin: "left center" }}>
              <BookCover width={210} rotateY={rotateY} badge="Comprado" coverSrc={PLAN_ORIGEN_COVER} shade={hoverProgress} />
            </div>

            {frame >= F.thumbStart - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: 28,
                  bottom: 24,
                  width: 220,
                  height: (220 * REAL_SHOT_H) / REAL_SHOT_W,
                  opacity: thumbOpacity,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.22)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Img src={staticFile(REAL_SHOT_SRC)} alt="Pantalla real del marketplace de Bullipedia" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            )}
          </div>
        </FigmaChrome>
      </div>
    </AbsoluteFill>
  );
}
