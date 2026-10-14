import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BULLIPEDIA, EASE, EASE_BOOK_HOVER, loadBullipediaFont } from "../bullipedia/tokens";
import { BookCover, fontStyle, PageHeader } from "../bullipedia/ui";
import { SimCursor, type CursorHop } from "../shared/Cursor";

loadBullipediaFont();

// Same real cover asset remotion/bullipedia/scenes.tsx's CatalogScene uses.
const PLAN_ORIGEN_COVER = "mockups/bullipedia-html/assets/portada_contra25_jpg_1_scaled_b6e15db3ee-4969fe.jpeg";

export const BULLIPEDIA_GLIMPSE_DURATION = 55;

// ── Scene 3 — Bullipedia glimpse, 55 frames (~1.8s): the BookCover rotateY
// tilt already built in remotion/bullipedia/ui.tsx — the only "3D" (CSS,
// not WebGL) beat in the whole teaser, per spec. A condensed restaging of
// CatalogScene's hover+click (that scene's own timings assume its native
// 150-frame run), not a reuse of CatalogScene itself.
const F = { hoverEnd: 20, clickLand: 32 };

export function BullipediaGlimpseScene() {
  const frame = useCurrentFrame();
  const hoverProgress = interpolate(frame, [0, F.hoverEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_BOOK_HOVER });
  const rotateY = -40 * hoverProgress;
  const clickBounce = frame >= F.clickLand && frame <= F.clickLand + 5 ? interpolate(frame, [F.clickLand, F.clickLand + 2, F.clickLand + 5], [1, 0.96, 1], { extrapolateRight: "clamp" }) : 1;
  const camera = interpolate(frame, [0, F.hoverEnd], [1, 1.14], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });

  const hops: CursorHop[] = [
    { from: { x: 66, y: 90 }, to: { x: 66, y: 90 }, fromFrame: 0, toFrame: 10 },
    { from: { x: 66, y: 90 }, to: { x: 32, y: 44 }, fromFrame: 10, toFrame: F.clickLand, click: true },
  ];

  return (
    <AbsoluteFill style={{ ...fontStyle, background: BULLIPEDIA.white, color: BULLIPEDIA.ink }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", transform: `scale(${camera})`, transformOrigin: "32% 44%" }}>
        <PageHeader />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 40px 0" }}>
            <h1 style={{ margin: 0, maxWidth: 760, fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing: "0.01em", color: BULLIPEDIA.navy }}>
              Libros digitales Bullipedia
            </h1>
            <div style={{ marginTop: 44, transform: `scale(${clickBounce})`, display: "inline-block" }}>
              <BookCover width={240} rotateY={rotateY} badge="Comprado" coverSrc={PLAN_ORIGEN_COVER} shade={hoverProgress} />
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.25, color: BULLIPEDIA.navy }}>Plan Origen</div>
                <div style={{ marginTop: 4, fontSize: 13, color: BULLIPEDIA.muted }}>Plan de empresa para la restauración gastronómica</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SimCursor hops={hops} pointerFill={BULLIPEDIA.white} pointerStroke={BULLIPEDIA.navy} rippleColor={BULLIPEDIA.green} />
    </AbsoluteFill>
  );
}
