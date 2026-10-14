import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// ── The brief "real screen, floating tilted card" treatment shared by the
// Madrid, Xunta and Mirazur chapters — generalized straight off BookCover's
// own rotateY tilt (remotion/bullipedia/ui.tsx), per the brief's instruction
// to reuse that exact pattern rather than inventing a new one. Renders
// `children` at their OWN native pixel size, then scales the whole thing
// down to `targetWidth` via a single CSS transform (scale composed with the
// -8°→-12° rotateY) — this is what lets the card host either a raster
// screenshot (native = the JPEG's own pixel size) or a live DOM mockup
// (native = 1920×1080, the mockup's own canvas) without it ever re-flowing
// at the smaller size: the transform only changes how large the already
// laid-out box reads on screen, never its internal layout math.
//
// Always capped well under full-screen (targetWidth, a card) and always
// brief (opacity ramps up/down over `fadeFrames` at each end) — the
// background stays visible in the margins around it, never a full-screen
// takeover, per the "máximo ~14% del total con pantalla real" budget.
export function FlashCard({
  startFrame,
  durationFrames,
  fadeFrames = 6,
  targetWidth,
  nativeWidth,
  nativeHeight,
  children,
}: {
  /** Local frame the card starts fading in. */
  startFrame: number;
  /** Frames the card is visible for, INCLUDING its own fade in/out. */
  durationFrames: number;
  fadeFrames?: number;
  targetWidth: number;
  nativeWidth: number;
  nativeHeight: number;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const endFrame = startFrame + durationFrames;
  if (frame < startFrame - 1 || frame > endFrame + 1) return null;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeFrames, endFrame - fadeFrames, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rotateY = interpolate(frame, [startFrame, endFrame], [-8, -12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (opacity <= 0.001) return null;

  const scale = targetWidth / nativeWidth;
  const targetHeight = nativeHeight * scale;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", zIndex: 30, pointerEvents: "none" }}>
      <div style={{ position: "relative", width: targetWidth, height: targetHeight, opacity, perspective: 1400 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: nativeWidth,
            height: nativeHeight,
            transformOrigin: "center center",
            transform: `scale(${scale}) rotateY(${rotateY}deg)`,
            borderRadius: 18 / scale,
            overflow: "hidden",
            border: `${1.5 / scale}px solid rgba(255,255,255,0.18)`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
            background: "#0a0a0a",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
}
